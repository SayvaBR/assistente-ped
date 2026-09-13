# Assistente Pedagógico — Matriz de Referências de Motion

Esta matriz registra o que deve ser adotado, adaptado, apenas estudado ou cortado das referências externas avaliadas. Ela existe para impedir que o projeto acumule efeitos sem direção e para manter o repertório útil acessível ao Codex/Astra.

## Régua

- **5/5 — Fundacional/assinatura:** merece virar parte do Motion System ou interação própria do produto.
- **4/5 — Muito útil:** implementar adaptado quando o fluxo exigir.
- **3/5 — Referência:** extrair princípio; não copiar diretamente.
- **2/5 — Experimental/backlog:** só depois do núcleo estar sólido.
- **1/5 — Cortar da V1:** pouco valor para o produto ou custo/risco desproporcional.

## Regras de uso de material externo

- referência visual não autoriza copiar código sem verificar licença;
- não copiar marca, assets, personagens ou identidade de outro produto;
- extrair princípio de interação e reimplementar na linguagem V2;
- não adicionar dependência apenas porque um demo é bonito;
- toda implementação precisa respeitar LGPD, acessibilidade, Reduced Motion e performance Android.

---

## A. Fundacionais / 5 de 5

### Animate UI — Primitives

URL: https://animate-ui.com/docs/primitives

**Decisão:** referência fundacional.

Usar como referência para primitives animadas acessíveis e para integração com Motion/Reduced Motion. Não importar estilo visual pronto.

### AnimateIcons

URL: https://animateicons.in/

**Decisão:** candidato forte para sistema de icon motion.

Validar licença, tree-shaking, peso e compatibilidade antes de instalar. Usar somente quando a animação do ícone comunica estado/ação.

### Kinetics

URL: https://kinetics.colorion.co/

**Decisão:** catálogo central de física/springs.

Usar como inspiração de comportamento, não como obrigação de dependência.

### Motion — Reorder Grid

URL: https://examples.motion.dev/react/reorder-grid

**Decisão:** assinatura de Arquivos.

Aplicar ao grid de pastas com reorder, drag lift, rearranjo espacial, persistência e alternativa acessível.

### Motion — Create Button

URL: https://examples.motion.dev/react/create-button

**Decisão:** base conceitual do Create Button/FAB contextual.

A expansão por shared geometry é especialmente relevante.

### Apple Calendar — Day/Month/Year zoom

URL: https://designspells.com/spells/animation-when-zooming-out-from-day-to-month-to-year-view-on-apple-calendar

**Decisão:** referência mais importante para Planejamento Dia/Semana/Mês.

Extrair continuidade espacial e preservação do contexto da data.

### Strava — conclusão de atividade

URL: https://designspells.com/spells/transition-animation-when-completing-an-activity-on-strava

**Decisão:** base de motion de conclusão.

Aplicar a chamada, setup, plano, backup e outros sucessos reais.

### Slack — Floating Action Button

URL: https://designspells.com/spells/floating-action-button-animations-in-slack

**Decisão:** referência forte para comportamento do botão central.

### Family — FAB icon animating across tabs

URL: https://designspells.com/spells/floating-action-buttons-icon-animates-when-switching-tabs-in-family

**Decisão:** candidata a assinatura da navegação principal.

O botão central pode preservar posição e morfar seu ícone/ação por contexto.

### Rare UI — Folder

URL: https://www.rareui.com/

**Decisão:** fortíssima referência para Arquivos.

Usar a materialidade de pasta, abertura/flap e cor como inspiração. Adaptar para toque; não depender de hover.

### Rare UI — Notification Bell

URL: https://www.rareui.com/

**Decisão:** referência de microfeedback para notificações.

Sino reage quando há evento real; badge numérico transiciona; sem loop infinito.

### Duration Picker / timer interaction

Referências:

- https://x.com/shariar_design/status/2045468038791913687
- https://www.rareui.com/

**Decisão:** 5/5 para conceito de ajuste temporal.

Aplicar a duração de aula, compromissos, lembretes e ferramentas de sala. Não depender de teclado numérico seco para ajustes simples.

---

## B. Muito úteis / 4 de 5

### Motion — Color Picker

URL: https://motion.dev/examples/react-color-picker

**Decisão:** adaptar para cor de pastas.

No mobile, usar toque/drag com preview em tempo real; não copiar comportamento baseado em cursor.

### Refero — Superr visual style

URL: https://styles.refero.design/style/cfd0fec1-f25a-4b9b-9bd0-d5b66960f2f2

**Decisão:** referência de materialidade, cor assinatura, tipografia forte e composição editorial.

Não copiar stickers/elementos infantis literalmente.

### Recent — Grok bot icon animation

URL: https://recent.design/i/60uda7e-grok-bot-icon-animation

**Decisão:** referência para status processando/sincronizando.

Status deve ser perceptível sem hover.

### Pico Cam — câmera abre a partir da Dynamic Island

URL: https://designspells.com/spells/camera-opens-from-the-dynamic-island-in-pico-cam

**Decisão:** adaptar causalidade e morph da origem para fullscreen.

Não simular Dynamic Island no Android.

### Bell wiggle / silent mode

URL: https://designspells.com/spells/bell-wiggles-together-with-the-dynamic-island-when-toggling-silent-mode-on

**Decisão:** referência de icon motion semântico.

### Amie — split Calendar/Todos

URL: https://designspells.com/spells/drag-to-adjust-the-split-view-of-calendar-and-todos-on-amie

**Decisão:** adaptar para planejamento + agenda.

No celular preferir regiões com snap points; split livre é mais apropriado para tablet/landscape.

### Family — hopping commas / number editing

URL: https://designspells.com/spells/hopping-commas-when-editing-currency-values-in-family

**Decisão:** adaptar princípio a contadores, duração, notas e estatísticas.

### Inspora — sistema de anotações / descarte

URL: https://www.inspora.design/posts/9-4

**Decisão:** referência para anotações e descarte reversível.

### UIinspoo

URL: https://uiinspoo.com/

**Decisão:** radar contínuo de repertório.

Não é dependência nem fonte de verdade.

### Recent.design — Interface

URL: https://recent.design/?category=interface

**Decisão:** radar contínuo de repertório.

### Recent — Bills date picker

URL: https://recent.design/i/709j04v-bills-date-picker-widget

**Decisão:** adaptar conceito para agenda e recorrência depois de validar a mídia/interação exata.

### Recent — OTP input

URL: https://recent.design/i/tr9wgma-otp-input-component

**Decisão:** usar apenas se autenticação realmente exigir OTP.

### Recent — Gooey speed dial

URL: https://recent.design/i/cmgrg7l-gooey-speed-dial

**Decisão:** o conceito de speed dial é útil; o “gooey” não deve dominar a estética.

### Recent — CSS anchor filter dot

URL: https://recent.design/i/qvrzk65-css-anchor-filter-dot

**Decisão:** usar o princípio de indicador móvel; para produção, shared layout do Motion é preferível até a compatibilidade da técnica CSS ser validada no WebView alvo.

---

## C. Referências / 3 de 5

### Animata — biblioteca geral

URL: https://animata.design/components

**Decisão:** banco de ideias.

Garimpar primitives/interações úteis. Cortar gradients, cursor effects, bento decorativo e efeitos de landing page que não pertencem ao produto.

### Animata — Product Features

URL: https://animata.design/docs/hero/product-features

**Decisão:** inspirar composição/progressão do onboarding, não copiar o hero web.

### Refero — Discord visual style

URL: https://styles.refero.design/style/faec4b0c-cf93-4150-97de-0a8e7eed1840

**Decisão:** extrair coragem de cor, tipografia e cenografia. Não usar estética gamer, mascotes ou dark como linguagem do Assistente Pedagógico.

### Motion — Warp Overlay

URL: https://examples.motion.dev/vue/warp-overlay

**Decisão:** somente inspiração para descarte reversível. Não usar em exclusão de conta/dados sensíveis.

### Pull to refresh — Snapchat

URL: https://designspells.com/spells/pull-to-refresh-animation-in-snapchat

**Decisão:** usar apenas onde houver sincronização/refresh real.

### Instagram — exclusão de voice message

URL: https://designspells.com/spells/animation-when-deleting-a-voice-message-on-instagram

**Decisão:** guardar para um futuro fluxo real de áudio. Não criar recurso de áudio só pela animação.

### Hugeicons post no X

URL: https://x.com/huge_icons/status/2090318160159559955/photo/1

**Decisão:** provisória. Material específico deve ser reavaliado se a mídia for fornecida localmente. Não adotar uma segunda família de ícones sem necessidade.

### Recent — Family inspired trash

URL: https://recent.design/i/ci0kue8-family-inspired-trash-interaction

**Decisão:** referência redundante; não criar uma nova gramática de exclusão por causa dela.

---

## D. Experimental / 2 de 5

### Volt UI

URL: https://volt-ui-two.vercel.app/

**Decisão:** quase todo fora do produto.

Pode servir como repertório técnico pontual, mas TiltCard, cursor trail, spotlight, matrix/background e efeitos semelhantes não devem orientar a UI Android.

### Card flip — Abode

URL: https://designspells.com/spells/card-flip-animation-in-abode

**Decisão:** usar apenas se um objeto realmente tiver semântica frente/verso.

### Recent — Paper crumple discard

URL: https://recent.design/i/p5zcex6-paper-crumple-discard-interaction

**Decisão:** backlog de efeito especial. Pode ser interessante para descartar um rascunho no futuro, mas não é gramática padrão de exclusão e não entra no P0/P1 visual inicial.

---

## E. Cortar da V1 / 1 de 5

### iOS native video skip arrow

URL: https://designspells.com/spells/arrow-spins-when-skipping-forward-or-backward-on-ios-native-video-player

**Decisão:** cortar enquanto o produto não tiver player de vídeo real.

### Efeitos genéricos a cortar mesmo quando aparecem em bibliotecas

- cursor trails;
- spotlight following mouse;
- matrix rain/background;
- hover tilt como interação principal;
- partículas permanentes;
- parallax gratuito;
- glassmorphism chamativo;
- gradientes animados genéricos;
- cards flutuando em loop;
- faux Dynamic Island;
- hover-only actions;
- bounce universal;
- confete universal;
- efeitos 3D apenas para provar capacidade técnica.

---

## Síntese oficial

O Motion System do Assistente Pedagógico deve se apoiar principalmente em:

1. **Motion for React** — engine de motion e shared layout;
2. **Animate UI** — referência de primitives acessíveis;
3. **AnimateIcons** — icon motion quando validado;
4. **Kinetics** — repertório de física/springs;
5. **Capacitor Haptics** — feedback físico semântico;
6. **Rive** — poucos momentos narrativos complexos;
7. **Rare UI / Design Spells / Recent / Inspora / Refero / UIinspoo** — referências de comportamento e repertório, não identidade a ser copiada.

A pergunta para cada efeito deve ser:

> Isto faz a interação parecer mais causal, contínua e compreensível — ou apenas mais chamativa?

Se for apenas chamativa, cortar.
