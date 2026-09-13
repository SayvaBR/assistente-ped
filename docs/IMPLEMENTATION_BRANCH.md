# Active V2 Implementation Branch

A branch ativa para a Issue #5 e para a reconstrução visual V2 é:

`codex/5-v2-clean-room`

`codex/1-import-baseline` permanece como baseline funcional de origem. Não continuar a Home V2 diretamente aqui.

Antes de implementar:

```bash
git fetch origin --prune
git switch codex/5-v2-clean-room
git pull --ff-only origin codex/5-v2-clean-room
```

A branch ativa contém `src/v2/`, o clean-room visual, a spec local da Home e o gate de fronteira contra imports visuais legados.
Toda nova UI V2 deve nascer em `src/v2/` seguindo `AGENTS.md`, `docs/CODEX_LOVABLE_MODE.md` e as skills Rapid UI/UI Screen Craft.

Não voltar a implementar visualmente em `codex/1-import-baseline` ou `codex/design-identity-v2`.
