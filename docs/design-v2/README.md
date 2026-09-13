# Design V2 — implementação clean-room

Esta pasta no branch `codex/5-v2-clean-room` contém somente o contexto necessário para implementação rápida da V2.

## Autoridade

1. decisão explícita mais recente do usuário;
2. `docs/DESIGN_AUTHORITY.md`;
3. `AGENTS.md`;
4. `docs/CODEX_LOVABLE_MODE.md`;
5. skills UI do projeto;
6. este diretório.

## Regra de trabalho

A V2 nasce em `src/v2/` e não herda UI V1.

Use o legado somente para domain/data/repositories/adapters nativos.

## Referência visual

Screenshot/mockup aprovado é target.

Reproduzir primeiro a composição em 390px. Depois comparar lado a lado, corrigir as cinco diferenças mais importantes e somente então conectar profundamente dados/estados.

## Contexto histórico

A documentação extensa anterior continua disponível em `origin/codex/design-identity-v2`.

Quando precisar de um documento que ainda não foi promovido para esta branch, consulte o remoto explicitamente após `git fetch origin --prune`, por exemplo:

```bash
git show origin/codex/design-identity-v2:docs/design-v2/MOTION_SYSTEM_V2.md
```

Nunca assumir que a cópia local antiga é mais atual que o remoto.
