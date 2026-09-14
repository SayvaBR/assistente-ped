# Android Logical Units & Insets — Assistente Pedagógico

## Decisão

O Assistente Pedagógico não desenha a interface a partir da resolução física do painel.

A camada visual principal é React/Vite dentro de um WebView do Capacitor. Por isso:

- na camada web, usar **CSS logical pixels**, `rem`, `%`, flex/grid, viewport dinâmico e queries estruturais;
- na camada nativa Android, quando houver Views/recursos nativos, usar `dp` para geometria e `sp` para texto;
- nunca converter `1220 x 2712` do painel em tamanhos fixos de CSS;
- nunca fixar a altura útil do app em algo como `830px`, `830dp` ou equivalente para “caber” em um aparelho específico.

## CSS px x Android dp

`dp` é uma unidade da UI nativa Android. CSS não possui unidade `dp`.

Dentro do WebView, `px` é um **pixel CSS lógico**, não um pixel físico do painel. Com o viewport configurado como `width=device-width`, a página trabalha com a largura lógica disponível ao app, enquanto densidade/escala do dispositivo são tratadas pelo browser/WebView.

Portanto, no nosso stack:

- `412 CSS px` pode ser uma boa régua visual para um telefone Android amplo;
- isso **não** quer dizer 412 pixels físicos;
- isso **não** quer dizer que o app deva ter 412px de largura;
- isso **não** deve virar breakpoint por modelo de aparelho.

A equivalência mental correta é:

> Android nativo: dp/sp.
> React/Capacitor WebView: CSS logical px/rem + viewport + insets.

## Viewport

O `index.html` deve continuar usando viewport baseado no device:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

`viewport-fit=cover` permite edge-to-edge, mas não autoriza conteúdo importante a ficar atrás de status bar, navigation bar, gesture area ou cutout.

## Altura

A tela deve preencher o espaço disponível, não uma altura fixa.

Preferir:

- `min-height: 100dvh` para raízes de tela;
- altura automática para conteúdo;
- scroll normal quando o conteúdo exceder o viewport;
- `min-height: 0` em filhos flexíveis quando necessário;
- nenhum CTA essencial preso a coordenada vertical fixa.

Evitar:

- `height: 830px` para tela inteira;
- cálculo baseado na altura conhecida do POCO;
- posicionamento absoluto de conteúdo principal para “encaixar” entre barras.

## Safe areas e WindowInsets

Android moderno pode desenhar edge-to-edge. A interface deve respeitar as áreas ocupadas por:

- status bar;
- navigation bar/gesture area;
- display cutout/câmera;
- teclado/IME quando aberto.

Na camada CSS, preferir variáveis como:

```css
padding-top: max(var(--space), env(safe-area-inset-top, 0px));
padding-bottom: max(var(--space), env(safe-area-inset-bottom, 0px));
```

Quando o WebView não expuser um inset Android necessário com fidelidade, a camada nativa deve publicar o WindowInset real para CSS/JS. Não hardcodear a altura da status/navigation bar.

`WindowInsetsCompat` entrega dimensões em pixels físicos. A ponte Android deve
convertê-las pela densidade da tela antes de publicar os valores como `px` CSS;
publicar o valor físico diretamente inflaria o safe area em aparelhos de alta
densidade.

### Bridge implementada

`MainActivity` instala um listener de `WindowInsetsCompat` no decor view,
considera barras de sistema e display cutout, converte pixels físicos pela
densidade para CSS logical px e publica `--android-safe-top/right/bottom/left`
no documento do WebView. O preview web continua usando os valores zero de
fallback; o APK QA é o gate para validar os valores nativos em dispositivo.

## Cadência de desenvolvimento

### Microiteração visual

Use apenas o viewport-âncora de `412 CSS px`:

`implementar -> render 412 -> screenshot -> observar -> corrigir`

Não executar matriz completa.

### Checkpoint local da Delivery Unit

Quando a tela estiver convincente:

- 360 CSS px — compacto;
- 412 CSS px — âncora;
- 480 CSS px — amplo.

Isso é smoke check, não redesign.

### Gate completo

A matriz completa, escalas de texto, alturas de stress, 600+ quando aplicável e Android real pertencem a:

- CI;
- Gate B / production hardening;
- release;
- mudanças estruturais de layout;
- investigação de bug responsivo real.

## Regra operacional para o Codex

Em Delivery Units comuns de UI:

- não rodar `pnpm run test:v2-responsive` completo localmente por padrão;
- usar `check:fast` durante iteração;
- usar teste funcional da superfície;
- usar checkpoint 360/412/480 apenas quando a candidata estiver pronta;
- deixar a matriz completa para CI, salvo risco estrutural explícito.

## Princípio final

> **A interface responde ao espaço lógico disponível; não ao modelo do aparelho.**

> **O POCO é aparelho de QA, não régua de layout.**
