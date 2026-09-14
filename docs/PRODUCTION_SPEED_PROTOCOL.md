# Production Speed Protocol — Assistente Pedagógico

## Regra central

> **Rápido no loop, rigoroso no checkpoint.**

Não executar validação de release a cada ajuste visual. Não esperar a tela inteira terminar para descobrir que a composição estava errada. Não serializar trabalho independente.

## LOOP — segundos/minutos

Durante implementação/refino visual:

- manter Vite/HMR rodando;
- editar somente o necessário;
- usar `pnpm run check:fast`;
- usar teste diretamente relacionado quando útil;
- renderizar primeiro em 390px;
- tirar screenshot e comparar cedo.

Não rodar Android, E2E completo ou documentação extensa a cada microajuste.

## CANDIDATE

Quando a composição já estiver convincente:

- `pnpm run check:candidate`;
- validar 360/390/430;
- estados essenciais;
- teste E2E diretamente relacionado quando existir;
- comparação final com target/spec.

## PR / RELEASE

Uma vez por entrega, proporcionalmente ao risco:

- suíte completa necessária;
- build de produção;
- E2E relevante/completo;
- Android sync/build quando houver impacto nativo ou antes de merge/release;
- evidência final no PR.

## UI visual-first

Para tela com target/spec claro:

`TARGET -> COMPOSIÇÃO -> RENDER 390 -> SCREENSHOT -> CORRIGIR 3–5 MAIORES DIFERENÇAS -> CANDIDATE -> 360/430 -> INTEGRAÇÃO/ESTADOS -> QA`

Se a composição estiver errada, reescrever cedo. Não gastar tempo polindo CSS de uma arquitetura visual ruim.

## Paralelismo

Pode rodar em worktrees/agentes independentes:

- UI Compose;
- Integration;
- QA;
- Research/Assets;
- Native;
- DevEx/UI Lab.

### Anti-conflito

Apenas uma trilha por vez é dona de arquivos compartilhados como tokens globais, root shell, `package.json`, config central e primitives V2 centrais.

## Fast path

Usar para:

- spacing;
- copy;
- iconografia;
- composição;
- CSS;
- estados visuais locais;
- refinamentos sem mudança de contrato.

## Deep path

Usar para:

- migração de dados;
- billing;
- backup/restore;
- exclusão/exportação;
- permissões Android;
- criptografia;
- BNCC/regras pedagógicas;
- schema;
- segurança/LGPD.

## Regras removidas

Não é mais obrigatório:

- Android a cada rodada visual;
- E2E completo a cada ajuste;
- 360/390/430 antes de 390 estar bom;
- bloquear todo trabalho paralelo enquanto uma tela aguarda review;
- reler todos os documentos a cada sessão;
- criar Design System completo antes de provar telas reais.

## Evidência

Durante o loop, não produzir relatório longo.

Na candidata: screenshot principal + diferenças conhecidas + checks relevantes.

No PR: consolidar a evidência final uma vez.

## Regra final

> **Feedback rápido primeiro. Validação profunda no momento certo. Paralelismo quando não houver conflito.**
