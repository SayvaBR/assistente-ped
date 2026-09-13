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
