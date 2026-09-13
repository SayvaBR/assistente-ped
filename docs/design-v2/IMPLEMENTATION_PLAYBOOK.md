# Design System V2 — Implementation Playbook for Codex/Astra

Este documento define como implementar a V2 no repositório sem transformar a reformulação em um reskin frágil, um rewrite desnecessário ou uma coleção de componentes genéricos.

## 1. Princípio de implementação

Preservar contratos funcionais e reconstruir a camada visual/UX quando necessário.

O Codex deve separar:

- **domínio e dados**: preservar quando corretos;
- **persistência/migrações**: preservar e testar;
- **serviços/billing/permissões**: preservar guardrails;
- **componentes visuais V1**: podem ser aposentados;
- **layout/composição V1**: não é autoridade.

Não reescrever storage, serviços ou lógica de negócio só para facilitar CSS.

## 2. Estrutura sugerida

```text
src/
  design-system/
    tokens.css
    primitives/
      Button.tsx
      IconButton.tsx
      Field.tsx
      Input.tsx
      Select.tsx
      Textarea.tsx
      Chip.tsx
      SegmentedControl.tsx
      Tabs.tsx
      Dialog.tsx
      BottomSheet.tsx
      Snackbar.tsx
    layout/
      AppShell.tsx
      Screen.tsx
      TopBar.tsx
      BottomNavigation.tsx
      SectionHeader.tsx
    states/
      LoadingState.tsx
      EmptyState.tsx
      ErrorState.tsx
      SuccessState.tsx
  features/
    home/components/
    planning/components/
    classes/components/
    files/components/
    settings/components/
    subscription/components/
```

A estrutura real pode variar, mas evitar um único `components/` plano com dezenas de componentes sem domínio.

## 3. Tokens

Criar `tokens.css` (ou equivalente) como fonte única para cor, spacing, radius, type scale, depth e motion.

Proibido:

- duplicar hex da marca em dezenas de arquivos;
- usar `style={{ ... }}` com valores sistêmicos repetidos;
- criar tokens específicos de uma tela quando o conceito é global;
- alterar um token global para corrigir uma exceção local.

## 4. Primitives versus componentes de domínio

Primitive responde “como interage/aparece”.

Exemplos:

- Button;
- Input;
- Tabs;
- Chip.

Componente de domínio responde “o que significa no Assistente Pedagógico”.

Exemplos:

- TodayLessonCard;
- AttendanceSummary;
- StudentRow;
- BNCCSkillRow;
- AgendaEvent;
- PaywallPlanCard.

Não usar `Card` como resposta universal.

## 5. Política para componentes existentes

### `src/components/Controls.tsx`

- `Select`: migrar para Select V2;
- `Notice`: separar por semântica;
- `Card`: não expandir uso; marcar como legacy após primitives V2;
- `ActionBar`: substituir por padrões nomeados por contexto.

### `src/components/Fields.tsx`

- preservar comportamento útil;
- mover visual/state handling para Field/Input V2;
- adicionar helper/error/disabled/loading e a11y consistente.

### `ScreenHeader.tsx`

Pode ser refatorado para TopBar V2.

### `PlanningBoard.tsx`

Não aumentar o monólito. Decompor gradualmente em componentes de calendário/planejamento.

## 6. Migração sem big-bang destrutivo

A V2 permite mudança profunda, mas rollout deve ser controlado.

Ordem recomendada:

1. tokens;
2. Button/Input/Select/Chip/Segmented/Tabs;
3. AppShell/Screen/TopBar/BottomNav;
4. feedback states;
5. componentes de domínio necessários para o fluxo piloto;
6. fluxo piloto;
7. ajustar foundations com evidência real;
8. expandir para outros fluxos.

Não migrar 50 telas antes de aprovar foundations em 3 contextos distintos.

## 7. Três contextos mínimos para validar foundations

A fundação V2 precisa ser provada em:

- uma tela narrativa: onboarding/sucesso/paywall;
- uma tela operacional densa: chamada/alunos/arquivos;
- uma tela híbrida: Home/planejamento/configurações.

Se tokens/componentes funcionarem apenas em uma Home bonita, ainda não são um design system.

## 8. CSS

Preferir classes semânticas e tokens.

Exemplo:

```css
.v2-primary-button {
  min-height: 56px;
  border-radius: var(--v2-radius-md);
  background: var(--v2-blue-500);
  color: var(--v2-white);
  box-shadow: var(--v2-depth-primary);
  font: inherit;
  font-weight: 900;
  transition:
    transform var(--v2-motion-fast) var(--v2-ease-out),
    box-shadow var(--v2-motion-fast) var(--v2-ease-out);
}

.v2-primary-button:active:not(:disabled) {
  transform: translateY(3px);
  box-shadow: 0 1px 0 var(--v2-blue-600);
}
```

Não usar soft shadow em tudo para simular qualidade.

## 9. Responsividade

Testar no mínimo 360, 390 e 430px.

Para cada fluxo:

- sem overflow horizontal inesperado;
- sem texto cortado;
- sem CTA fora da viewport sem motivo;
- bottom nav não cobre conteúdo;
- teclado virtual não bloqueia campo/CTA crítico;
- landscape não precisa ser layout principal, mas não pode quebrar de forma catastrófica.

## 10. Acessibilidade automatizável

Adicionar testes quando prático para:

- accessible name de botões;
- labels de fields;
- `aria-current` em navegação/step;
- `aria-selected` em tabs;
- `role=alert/status`;
- foco inicial de dialog;
- retorno de foco ao fechar;
- keyboard navigation;
- reduced motion.

## 11. Testes visuais/E2E

Para PR de UI:

- screenshot antes;
- screenshot depois;
- estado principal;
- estado vazio;
- loading;
- erro;
- sucesso/confirmado quando existir;
- viewport menor;
- text scaling/focus quando relevante.

Screenshots devem vir da implementação real, não de mockup gerado.

O mockup serve como referência; o gate é o app executando.

## 12. Testes funcionais

Não aceitar regressão funcional em nome do redesign.

Rodar quando aplicável:

```text
pnpm test
pnpm build
pnpm test:e2e
node scripts/android-sync.mjs
cd android && gradlew.bat assembleDebug
```

Registrar resultado real no PR.

## 13. Android real

Quando um fluxo depender de:

- câmera;
- notificações;
- filesystem;
- share;
- billing;
- safe area/teclado;
- back nativo;

validar em Android real ou documentar bloqueio reproduzível.

## 14. Billing/paywall

RevenueCat/loja são fonte de verdade para produto, preço, entitlement e renovação.

Nunca:

- liberar premium apenas por state local visual;
- inventar preço;
- simular promoção falsa;
- esconder restaurar compra quando necessário;
- apresentar assinatura confirmada antes da confirmação real.

## 15. Privacidade

Redesign não autoriza telemetria extra.

Nunca incluir em analytics/logs remotos:

- nome de aluno;
- observação pedagógica;
- nota;
- frequência individual;
- conteúdo de arquivo do professor;
- dados sensíveis de turma.

Fixtures de screenshot/teste devem ser sintéticas.

## 16. Estados de persistência

Toda ação de criação/edição/exclusão deve tratar:

- salvando;
- salvo;
- falha ao salvar;
- retry quando possível;
- conflito/migração quando aplicável.

Não fechar formulário e perder dado após erro.

## 17. Navegação

Não adicionar CTA sem destino real.

BottomNavigation mantém cinco áreas estáveis. Fluxos internos usam back/contextual navigation. Evitar transformar o app em árvore profunda de telas sem breadcrumbs/contexto.

Android hardware back deve:

- fechar modal/sheet primeiro;
- voltar etapa interna quando seguro;
- confirmar saída se houver alterações não persistidas;
- não sair do app no meio de um fluxo sem intenção.

## 18. Motion

Todo motion deve ter fallback reduced-motion.

Não usar:

- delay artificial para parecer premium;
- bounce em listas de trabalho;
- parallax decorativo;
- animações que movem controles enquanto usuário tenta tocar.

## 19. Conteúdo e microcopy

Português brasileiro, claro e humano.

Preferir:

- “Salvar frequência” a “Confirmar”;
- “Criar plano de aula” a “Adicionar item”;
- “Tentar novamente” a “Retry”;
- “Excluir conta” a “Remover”.

Ações destrutivas devem nomear o objeto.

Evitar copy infantilizada e entusiasmo excessivo em tarefas administrativas.

## 20. Definition of Done de componente

Um componente V2 está pronto quando:

- API é simples;
- estados estão implementados;
- keyboard/touch funcionam;
- tokens são usados;
- não depende de contexto acidental;
- tem uso real em pelo menos uma tela;
- não introduz padrão genérico dominante;
- visual funciona em 360–430px.

## 21. Definition of Done de fluxo

Um fluxo está pronto quando:

- critérios da issue estão cumpridos;
- dados persistem;
- erro/empty/loading estão tratados;
- não há ação falsa;
- build/testes passam;
- Android é validado quando aplicável;
- screenshots reais estão anexados;
- visual passa pelo gate de identidade;
- acessibilidade básica está verificada;
- docs foram atualizadas se novos patterns/tokens surgiram.

## 22. Review checklist para Codex antes do PR

Responder no próprio PR:

- Qual problema de UX foi resolvido?
- O que foi preservado do fluxo antigo e por quê?
- O que foi descartado por ser apenas legado visual?
- Quais tokens/componentes V2 foram usados?
- Foi criado componente novo? Por que não reutilizar outro?
- Quais estados foram testados?
- Quais viewports?
- Quais comandos passaram?
- Há risco de dados/migração?
- Há impacto LGPD/billing/permissão?
- O resultado ainda parece genérico? Se não, qual é a assinatura perceptível?

## 23. Critérios automáticos de rejeição

Solicitar mudanças se houver qualquer um destes casos:

- screenshot ausente em PR visual relevante;
- UI nova baseada majoritariamente em cards genéricos iguais;
- target de toque <48px;
- CTA sem comportamento;
- erro que apaga formulário/dado;
- preços hardcoded como verdade comercial;
- regressão offline do núcleo;
- student/pedagogical data em analytics/log remoto;
- contraste insuficiente;
- sem label acessível;
- componente legado expandido quando deveria ser aposentado;
- “funciona” usado como justificativa para baixa qualidade visual.

## 24. Critério para expandir V2 ao app inteiro

Somente depois de foundations aprovadas em três contextos reais e do shell/navegação estabilizados.

Depois disso, migrar por domínio: Home → Planejamento → Turmas → Arquivos → Mais/Configurações → relatórios/monetização, sempre respeitando P0 antes de P1/P2.
