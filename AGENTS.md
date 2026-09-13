# AGENTS.md — Assistente Pedagógico

Este arquivo contém regras obrigatórias para qualquer agente de código que trabalhe neste repositório, incluindo Codex/Astra.

## Missão

Levar o Assistente Pedagógico até uma versão Android 1.0 funcional, estável, segura, publicável e com identidade própria. A base atual usa React, TypeScript, Vite e Capacitor Android.

O estado visual atual é **baseline funcional, não baseline de design**. O aplicativo está em processo de reformulação de identidade e agentes têm autorização explícita para substituir padrões visuais, layouts, navegação, componentes e arquitetura de interface quando isso produzir uma experiência claramente melhor.

## O que deve ser preservado

Estas regras não são negociáveis:

- integridade e migração dos dados existentes;
- privacidade/LGPD e proteção de dados pedagógicos e de alunos;
- segurança, billing e contratos de persistência;
- funcionamento offline do núcleo do aplicativo;
- regras pedagógicas e diferenciação correta por etapa de ensino;
- acessibilidade, áreas de toque, foco, contraste e reduced motion;
- stack principal, salvo decisão explícita de produto;
- nenhuma feature falsa, CTA sem comportamento ou dado comercial inventado.

## O que PODE mudar profundamente

Não preservar por inércia:

- layout atual;
- estrutura de cards;
- navegação visual;
- shell do aplicativo;
- tokens antigos;
- tipografia visual;
- iconografia;
- hierarquia das telas;
- padrões de componentes existentes;
- motion antigo;
- composição de fluxos;
- densidade, agrupamento e ordem das ações.

`src/styles/design-system.css`, componentes atuais e documentos visuais legados são referências de implementação, **não autoridade estética**. Podem ser substituídos ou refatorados quando incompatíveis com `docs/DESIGN_AUTHORITY.md`.

## Antes de alterar código

1. Leia `README.md`, `docs/STATUS.md`, `docs/ROADMAP-DE-LANCAMENTO.md`, `docs/ESTADO-DA-ENTREGA.md`, `docs/DESIGN_SUPERVISION_WORKFLOW.md` e `docs/DESIGN_AUTHORITY.md` quando houver UI.
2. Identifique contratos funcionais e de dados que precisam ser preservados.
3. Separe deliberadamente o que é requisito funcional do que é apenas legado visual.
4. Não substitua fluxos reais por telas estáticas ou dados fictícios.
5. Não adicione segredos, keystores privados, tokens, dados pessoais, dados de alunos ou credenciais.

## Regras de execução

1. Nunca trabalhar diretamente em `main` depois do baseline.
2. Cada milestone deve usar branch própria e PR próprio.
3. Nenhuma feature está concluída apenas porque a tela existe.
4. Uma feature só está pronta quando fluxo, persistência, validação, erro e testes essenciais funcionam.
5. Funcionalidade útil do legado deve ser preservada ou substituída por solução equivalente/superior; a aparência antiga não precisa ser preservada.
6. Toda mudança de storage/schema deve ter migração ou estratégia explícita de compatibilidade.
7. Dados pedagógicos e dados de alunos não podem ser enviados a analytics.
8. Analytics deve ser opcional e limitado a métricas técnicas/uso permitidas.
9. Não adicionar SDK externo sem documentar finalidade, dados tratados e impacto em privacidade.
10. Não adicionar botão, CTA, menu ou opção sem comportamento real.
11. Corrigir P0 técnico, segurança, privacidade ou perda de dados antes de refinamentos P1/P2.
12. Testar recursos nativos em Android real quando aplicável.
13. O Design System e o Motion System podem ser substituídos como parte da nova identidade; durante a migração, evitar misturar arbitrariamente linguagem antiga e nova na mesma experiência.
14. Recursos específicos da Educação Infantil não devem aparecer indevidamente em Fundamental ou Médio.
15. O núcleo do aplicativo deve continuar utilizável sem internet.
16. Não declarar como “aprovada pelo usuário” nenhuma direção visual sem aprovação explícita registrada.
17. Não usar mascote/coruja/personagem-mascote no produto. Ilustração humana somente quando coerente com a autoridade de design.
18. Mudanças visuais grandes são permitidas. Devem ser tratadas como reformulação sistêmica com arquitetura, evidência visual e rollout controlado — não como reskin cosmético.

## Regra especial: identidade visual V2

O objetivo não é fazer o app “parecer melhor que antes”; é criar uma linguagem visual reconhecível como **Assistente Pedagógico**.

Uma reformulação pode alterar múltiplas fundações de uma vez — tokens, tipografia, shell, navegação, superfícies, componentes e motion — quando a issue explicitar esse escopo. Depois disso, os fluxos devem migrar de forma coordenada para evitar uma experiência híbrida permanente.

“Funciona” não é critério suficiente. Uma UI funcional pode ser rejeitada se for genérica, sem personalidade, inconsistente, excessivamente baseada em cards, parecida com template de IA ou visualmente inferior ao padrão definido.

## Regras de implementação

- Reutilize componentes antigos apenas quando forem compatíveis com a nova direção.
- É permitido criar uma nova camada de tokens/componentes e aposentar gradualmente a antiga.
- Preserve a persistência local e trate falhas de armazenamento sem apagar dados.
- Toda ação de criação, edição ou exclusão precisa atualizar a interface e persistir o resultado.
- Toda tela precisa ter estados de carregamento, vazio, erro e sucesso quando aplicável.
- Controles de toque devem ter área mínima de 48 px e nome acessível.
- Não use emojis como ícones estruturais.
- Respeite safe areas, foco visível, contraste e `prefers-reduced-motion`.
- Não invente preços, compras, métricas ou disponibilidade de serviços.

## Severidade

### P0 — bloqueia release

- perda/corrupção de dados;
- app não abre ou fica preso no splash;
- crash recorrente;
- compra cobra e não desbloqueia;
- backup/restauração destrói dados;
- dados de aluno enviados indevidamente;
- cálculo acadêmico crítico incorreto;
- fluxo essencial sem saída;
- regressão grave de segurança ou privacidade.

### P1 — alta prioridade

- regressão importante de UX;
- lentidão grave;
- layout quebrado;
- permissão tratada incorretamente;
- erro funcional sem perda de dados;
- inconsistência relevante durante a migração para a identidade V2.

### P2 — refinamento

- polish visual;
- microanimações secundárias;
- microcopy;
- espaçamento isolado.

## Verificação obrigatória

Antes de considerar uma alteração concluída, execute quando aplicável:

```text
pnpm test
pnpm build
node scripts/android-sync.mjs
cd android && gradlew.bat assembleDebug
```

Para UI, execute também os E2E relevantes e siga `docs/DESIGN_SUPERVISION_WORKFLOW.md`.

## Evidência obrigatória no PR

- o que mudou;
- problemas do legado que motivaram a mudança;
- arquitetura visual/UX adotada;
- arquivos/módulos principais;
- comandos/testes executados;
- resultado do build;
- screenshots antes/depois para UI;
- estados relevantes e viewports testados;
- bugs conhecidos;
- riscos de migração/persistência;
- impacto em LGPD/analytics/billing quando aplicável.

## Git e release

- Não faça merge automático em `main`.
- Não altere dados do usuário para facilitar testes.
- APK debug é apenas artefato de validação; publicação exige assinatura de produção e AAB.
- Quando houver conflito entre documentos, `docs/DESIGN_AUTHORITY.md` prevalece para decisões de design aprovadas; conflitos funcionais, de segurança ou produto devem ser sinalizados em vez de resolvidos silenciosamente.
