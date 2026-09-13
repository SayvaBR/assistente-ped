# Issue #5 — Fundação Visual V2: implementação inicial

Status: `READY FOR DESIGN REVIEW` (não aprovada)

Esta branch parte de `codex/1-import-baseline` porque `codex/design-identity-v2` é uma branch de documentação e não contém o código executável. Os documentos V2 foram trazidos dessa branch. `docs/DESIGN_AUTHORITY.md` foi preservada do baseline, pois não está presente na branch de especificações.

## Escopo entregue

- tokens V2 de cor, tipografia, spacing, radius, profundidade, estados e motion;
- primitives de `AppShell`, `Screen`, `TopBar`, `BottomNavigation`, `Button`, `IconButton`, `Field`, `SearchField`, `SelectField`, `SegmentedControl`, `Chip`, `Surface`, `Row` e estados de loading/empty/error/success;
- resposta tátil visual com profundidade por borda e estado pressed;
- `prefers-reduced-motion` centralizado em CSS e hook React;
- adaptador de haptics opt-in, sem vibração por scroll, digitação ou montagem;
- iconografia Lucide sem caixas pastel como padrão;
- três provas reais: Splash/entrada, Home diária e Chamada/Frequência;
- captura automatizada de screenshots e verificação de overflow/targets em 360, 390 e 430 CSS px.

## Contratos preservados

As telas piloto continuam usando `repository`, `storage`, `domain/attendance.ts`, dados de turmas e agenda existentes. Não houve alteração de schema, billing, LGPD ou analytics. O salvamento local da chamada continua sendo delegado ao callback do `App`; o offline permanece legível como estado local.

## V1 a aposentar/migrar depois da aprovação

- `src/screens/HomeScreen.js`: migrar/remover após a prova V2 e os estados de Home serem aceitos;
- `src/screens/AttendanceScreen.js`: migrar/remover após validar justificativas e todos os estados no Android;
- `src/screens/SplashScreen.js` e `SplashScreen.css`: aposentar quando a entrada V2 substituir o legado;
- `src/screens/BottomNavigation.js`: substituir definitivamente pela navegação V2;
- `src/components/Controls.tsx` (`Card`, `Notice`, `ActionBar`) e `src/components/Fields.tsx`: migrar gradualmente para primitives V2;
- `src/components/ScreenHeader.tsx`: migrar para `TopBar` V2;
- `Card`/`IconTile` de `src/core/recovered.js`: manter somente para telas ainda não migradas; não expandir seu uso.

## Evidências

As imagens reais ficam em `docs/qa/design-v2/`. Todas usam fixtures sintéticas e não dados reais de alunos. O script `scripts/capture-v2-evidence.mjs` registra os viewports e falha se encontrar overflow horizontal ou target interativo menor que 48px.
