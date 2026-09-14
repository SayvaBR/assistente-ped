# Android Adaptive Development Cadence — Assistente Pedagógico V2

> **Status:** regra operacional obrigatória para desenvolvimento visual Android
> **Decisão de produto:** responsividade é requisito do produto, mas não pode dominar nem atrasar o ciclo de construção.

## 1. Unidade correta no nosso stack

O app usa React/Vite dentro do WebView do Capacitor.

Por isso, na UI web usamos **CSS logical pixels**, `rem`, `%`, flex/grid, viewport dinâmico e insets. `dp`/`sp` continuam corretos para UI nativa Android, mas não são unidades CSS.

Nunca transformar a resolução física do painel em largura/altura de layout.

Referência obrigatória: `docs/ANDROID_LOGICAL_UNITS_AND_INSETS.md`.

## 2. Regra central

O aplicativo deve se adaptar à tela. O desenvolvimento não deve redesenhar e recapturar a mesma tela em várias larguras a cada alteração.

### Viewport-âncora

Use **412 CSS px** como viewport principal de criação visual em telefone Android, salvo target aprovado específico.

412 é:

- uma régua de trabalho;
- aproximadamente representativo de um telefone Android amplo em espaço lógico;
- útil para screenshots e comparação.

412 **não é**:

- largura fixa do app;
- breakpoint obrigatório;
- conversão direta de pixels físicos;
- target exclusivo do POCO.

## 3. Loop de microiteração

```text
hipótese
-> implementar
-> render 412
-> screenshot
-> observar
-> corrigir
-> repetir
```

Durante esse loop, normalmente use apenas:

```bash
pnpm run check:fast
```

Não rodar matriz multi-device, Android build ou E2E completo em cada ajuste de composição/CSS.

## 4. Responsividade nasce da implementação

Preferir:

- flex/grid;
- `minmax()`;
- `flex-wrap`;
- width relativa;
- altura automática;
- `min-width: 0`;
- `clamp()` com moderação;
- media/container queries apenas para mudança estrutural real;
- `100dvh`/viewport dinâmico onde adequado;
- safe areas/WindowInsets;
- reorganizar conteúdo em vez de cortar.

Evitar:

- largura raiz fixa;
- altura fixa da tela;
- `height: 830px` ou equivalente por aparelho;
- breakpoints 390/412/432 só para fazer screenshots passarem;
- posicionamento absoluto do conteúdo principal.

A regra mental é:

> **o componente se adapta ao espaço que recebeu.**

## 5. Texto nunca é sacrificado

Proibido para copy essencial:

- cortar texto;
- `ellipsis` por conveniência;
- `line-clamp` em título/CTA/status importante;
- quebrar palavra artificialmente;
- reduzir fonte até ficar pequena demais;
- esconder ação porque faltou espaço.

Se não couber, mude a composição.

## 6. Safe areas e altura útil

Não calcular manualmente “quanto sobra entre as barras”.

A tela deve preencher o viewport lógico disponível e respeitar insets dinâmicos de:

- status bar;
- navigation/gesture bar;
- cutout;
- teclado/IME.

Não existe uma altura útil universal em dp/CSS px para o POCO ou qualquer outro Android.

Usar `env(safe-area-inset-*)` e, quando necessário, WindowInsets reais publicados pela camada nativa.

## 7. Checkpoint local barato

Quando a candidata estiver visualmente forte em 412, faça apenas um smoke check representativo da superfície alterada:

```bash
pnpm run test:v2-responsive:checkpoint -- <preview> "<texto esperado>"
```

Esse checkpoint exercita:

- 360 CSS px — compacto;
- 412 CSS px — âncora;
- 480 CSS px — amplo.

Exemplo:

```bash
pnpm run test:v2-responsive:checkpoint -- planning-day "Planejamento diário"
```

Não redesenhar a tela para cada um desses pontos. O objetivo é detectar overflow/corte estrutural óbvio.

## 8. Matriz completa é gate, não rotina

A matriz completa multi-device permanece obrigatória, mas fica principalmente em:

- CI;
- Gate B / production hardening;
- release;
- mudanças estruturais relevantes;
- investigação de bug responsivo real.

Comando explícito:

```bash
pnpm run test:v2-responsive:full
```

`pnpm run test:v2-responsive` continua alias de compatibilidade para o gate completo.

Uma Delivery Unit comum **não deve repetir localmente a matriz inteira** se o CI já a executará, salvo justificativa de risco.

## 9. POCO X7 Pro

O POCO é o principal aparelho físico disponível para QA.

Ele valida realidade do Android, mas não define o layout.

Fluxo normal:

```text
construir em 412 lógico
-> validar visual/funcional
-> checkpoint local 360/412/480
-> abrir PR
-> CI roda matriz completa
-> Android real em marcos relevantes
```

Não instalar APK no aparelho a cada microajuste.

## 10. Gate A x Gate B

### Gate A — direção visual

Exigir:

- composição forte no viewport-âncora/target;
- nenhuma falha responsiva óbvia;
- sem copy essencial cortada;
- sem dependência de largura/altura fixa;
- fluxo principal coerente.

Não exigir matriz completa manual.

### Gate B — produção

Exigir:

- matriz responsiva completa no CI;
- texto ampliado nas superfícies críticas;
- safe areas;
- teclado;
- Android real quando disponível;
- ausência de overflow/corte;
- validação de faixas diferentes.

## 11. Regra final

> **Desenvolva em espaço lógico, com um viewport-âncora. Faça o código ser fluido. Deixe o CI provar a família Android.**

> **O app se adapta à tela; o time não redesenha o app para cada tela.**

Esta regra supersede instruções antigas que exigiam testar manualmente várias larguras em cada ciclo visual.
