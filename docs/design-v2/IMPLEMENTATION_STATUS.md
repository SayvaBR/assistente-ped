# Issue #5 — Fundação Visual V2: quebra explícita da Home

Status: `READY FOR DESIGN REVIEW — HOME V2` (não aprovada)

Esta branch parte do baseline funcional `codex/1-import-baseline` e integra a autoridade e o documento de quebra visual mais recentes. A branch `codex/design-identity-v2` continua sendo tratada como fonte documental; não foi usada como base única de implementação.

## Escopo entregue

- tokens V2 de cor, tipografia, spacing, radius, profundidade, estados e motion;
- primitives de `AppShell`, `Screen`, `TopBar`, `BottomNavigation`, `Button`, `IconButton`, `Field`, `SearchField`, `SelectField`, `SegmentedControl`, `Chip`, `Surface`, `Row` e estados de loading/empty/error/success;
- resposta tátil visual com profundidade por borda e estado pressed;
- `prefers-reduced-motion` centralizado em CSS e hook React;
- adaptador de haptics opt-in, sem vibração por scroll, digitação ou montagem;
- iconografia Lucide sem caixas pastel como padrão;
- três provas reais: Splash/entrada, Home diária e Chamada/Frequência;
- Home V2 portada para a composição do Lovable: saudação/data, foco azul com metadados e `Fazer chamada`/`Ver plano`, atalhos de observação/compromissos, agenda temporal e navegação inferior;
- Home sem `Card`, `IconTile`, grid 2×N legado ou composição derivada de `recovered.js`;
- captura automatizada de screenshots e verificação de overflow/targets em 360, 390 e 430 CSS px.

A decisão explícita mais recente de replicar o visual/fluxos do Lovable está registrada em `docs/DESIGN_AUTHORITY.md` e operacionalizada em `docs/LUNA-LOVABLE-EXECUTION.md`. A comparação e a autoavaliação de screen craft ficam em `docs/qa/design-v2/HOME_SCREEN_CRAFT_REVIEW.md`.

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

As imagens reais e a gravação ficam em `docs/qa/design-v2/`. Todas usam fixtures sintéticas e não dados reais de alunos. O script `scripts/capture-v2-evidence.mjs` cobre Home populada, agenda, erro parcial, offline, Splash/reduced-motion, Chamada/loading, foco e mudança de status; registra os viewports e falha se encontrar overflow horizontal ou target interativo menor que 48px.

O uso de Apple HIG e `ui-ux-pro-max` foi apenas auxiliar para hierarquia, feedback, causalidade e reduced-motion. A composição final segue a autoridade do produto e as convenções Android/Capacitor.
