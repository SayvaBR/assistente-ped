# AGENTS.md — Assistente Pedagógico

Este arquivo contém regras obrigatórias para qualquer agente de código que trabalhe neste repositório, incluindo Codex/Astra.

## Objetivo

Levar o Assistente Pedagógico até uma versão Android 1.0 funcional, estável, segura, visualmente consistente e publicável. A base atual usa React, TypeScript, Vite e Capacitor Android.

## Antes de alterar código

1. Leia `README.md`, `docs/STATUS.md`, `docs/ROADMAP-DE-LANCAMENTO.md`, `docs/ESTADO-DA-ENTREGA.md`, `docs/DESIGN_SUPERVISION_WORKFLOW.md` e `docs/DESIGN_AUTHORITY.md` quando houver UI.
2. Identifique o módulo afetado e preserve contratos de dados e migrações existentes.
3. Não substitua a base por telas estáticas ou dados fictícios.
4. Não adicione segredos, keystores privados, tokens, dados pessoais, dados de alunos ou credenciais.

## Regras de execução

1. Nunca trabalhar diretamente em `main` depois do baseline.
2. Cada milestone deve usar branch própria e PR próprio.
3. Nenhuma feature está concluída apenas porque a tela existe.
4. Uma feature só está pronta quando fluxo, persistência, validação, erro e testes essenciais funcionam.
5. Não remover funcionalidades úteis do app legado sem justificativa documentada.
6. Não quebrar dados existentes. Toda mudança de storage/schema deve ter migração ou estratégia explícita de compatibilidade.
7. Dados pedagógicos e dados de alunos não podem ser enviados a analytics.
8. Analytics deve ser opcional e limitado a métricas técnicas/uso permitidas.
9. Não adicionar SDK externo sem documentar finalidade, dados tratados e impacto em privacidade.
10. Não adicionar botão, CTA, menu ou opção sem comportamento real.
11. Corrigir P0 antes de iniciar refinamentos P1/P2.
12. Testar recursos nativos em Android real quando aplicável.
13. Manter Design System e Motion System consistentes em todas as telas.
14. Recursos específicos da Educação Infantil não devem aparecer indevidamente em Fundamental ou Médio.
15. O núcleo do aplicativo deve continuar utilizável sem internet.
16. Não declarar como “aprovada pelo usuário” nenhuma direção visual sem aprovação explícita registrada.
17. Não usar mascote/coruja/personagem-mascote no produto. Ilustração humana só quando prevista pela autoridade de design.
18. Não fazer redesign em massa. Trabalhar uma tela/fluxo por vez e respeitar o gate visual.

## Regras de implementação

- Reutilize tokens e componentes de `src/styles/design-system.css` e `src/components` quando forem compatíveis com a direção aprovada.
- Preserve a persistência local e trate falhas de armazenamento sem apagar dados.
- Toda ação de criação, edição ou exclusão precisa atualizar a interface e persistir o resultado.
- Toda tela precisa ter estados de carregamento, vazio, erro e sucesso quando aplicável.
- Controles de toque devem ter área mínima de 48 px e nome acessível.
- Não use emojis como ícones estruturais; use os ícones Lucide já instalados.
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
- fluxo essencial sem saída.

### P1 — alta prioridade

- regressão importante de UX;
- lentidão grave;
- layout quebrado;
- permissão tratada incorretamente;
- erro funcional sem perda de dados.

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

Para mudanças de interface, execute também os E2E relevantes e registre screenshots antes/depois e estados importantes conforme `docs/DESIGN_SUPERVISION_WORKFLOW.md`.

## Evidência obrigatória no PR

- o que mudou;
- arquivos/módulos principais;
- comandos/testes executados;
- resultado do build;
- screenshots antes/depois para UI;
- bugs conhecidos;
- riscos de migração/persistência;
- impacto em LGPD/analytics/billing quando aplicável.

## Git e release

- Não faça merge automático em `main`.
- Não altere dados do usuário para facilitar testes.
- APK debug é apenas artefato de validação; publicação exige assinatura de produção e AAB.
- Quando houver conflito entre documentos, sinalize no PR em vez de inventar uma decisão silenciosa.
