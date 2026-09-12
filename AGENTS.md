# AGENTS.md — Assistente Pedagógico

Este arquivo contém regras obrigatórias para qualquer agente de código que trabalhe neste repositório, incluindo Codex/Astra.

## Objetivo

Levar o Assistente Pedagógico até uma versão Android 1.0 funcional, estável, segura, visualmente consistente e publicável.

## Stack obrigatória

- React
- TypeScript
- Vite
- Capacitor Android

Não migrar para Flutter, React Native ou Kotlin sem uma decisão explícita de produto.

## Regras de execução

1. Nunca trabalhar diretamente em `main` depois que a base do app estiver importada.
2. Cada milestone deve usar branch própria e PR próprio.
3. Nenhuma feature está concluída apenas porque a tela existe.
4. Uma feature só está pronta quando fluxo, persistência, validação, erro e testes essenciais funcionam.
5. Não remover funcionalidades úteis do app legado sem justificativa documentada.
6. Não quebrar dados existentes. Toda mudança de storage/schema deve ter migração.
7. Dados pedagógicos e dados de alunos não podem ser enviados a analytics.
8. Analytics deve ser opcional e limitado a métricas técnicas/uso permitidas.
9. Não adicionar SDK externo sem documentar finalidade, dados tratados e impacto em privacidade.
10. Não adicionar botão, CTA, menu ou opção sem comportamento real.
11. Corrigir bugs P0 antes de iniciar refinamentos P1/P2.
12. Testar recursos nativos em Android real quando aplicável.
13. Manter o Design System e o Motion System consistentes em todas as telas.
14. Recursos específicos da Educação Infantil não devem aparecer indevidamente em Fundamental ou Médio.
15. O núcleo do aplicativo deve continuar utilizável sem internet.

## Fluxo esperado para cada tarefa

1. Ler a issue e os documentos relevantes.
2. Criar branch `codex/<numero-issue>-<slug>` ou equivalente.
3. Implementar em mudanças pequenas e rastreáveis.
4. Rodar build, lint e testes disponíveis.
5. Atualizar documentação afetada.
6. Abrir PR contra `main` com resumo, testes executados, riscos e screenshots quando houver UI.
7. Não fazer merge por conta própria salvo instrução explícita.

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

## Evidência obrigatória no PR

- o que mudou;
- arquivos/módulos principais;
- comandos/testes executados;
- resultado do build;
- screenshots antes/depois para UI;
- bugs conhecidos;
- riscos de migração/persistência;
- impacto em LGPD/analytics/billing quando aplicável.

## Fonte de verdade

Os documentos de produto e release em `docs/` devem ser respeitados. Quando houver conflito, sinalizar no PR em vez de inventar uma decisão silenciosa.
