---
name: assistente-pedagogico-android-adaptive-ui
description: >
  Use em toda implementação ou revisão de UI do Assistente Pedagógico para garantir
  adaptação real a diferentes Androids sem transformar a construção de cada tela em
  uma bateria manual de múltiplos tamanhos.
---

# Assistente Pedagógico — Android Adaptive UI

Autoridade complementar obrigatória:

- `docs/ANDROID_LOGICAL_UNITS_AND_INSETS.md`;
- `docs/ANDROID_ADAPTIVE_DEVELOPMENT_CADENCE.md`;
- `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md`;
- `docs/ANDROID_REAL_DEVICE_QA.md`.

## 1. Modelo de unidade correto

A UI principal roda em React/Vite dentro do WebView do Capacitor.

- Android nativo: `dp` para geometria e `sp` para texto.
- UI web: CSS logical `px`, `rem`, `%`, flex/grid, viewport dinâmico e insets.
- Nunca usar resolução física (`1220`, `1080`, `1440`) como largura de layout.
- CSS não possui unidade `dp`; não simular `dp` convertendo resolução física manualmente.

Com `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">`, o WebView trabalha no espaço lógico disponível.

`412 CSS px` é somente a régua visual principal de telefone Android. Não é largura fixa nem breakpoint de aparelho.

## 2. Loop rápido obrigatório

Durante construção visual normal:

```text
HIPÓTESE
-> IMPLEMENTAÇÃO
-> RENDER 412
-> SCREENSHOT
-> OBSERVAÇÃO
-> CORREÇÃO
-> REPETIR
```

Não recapturar 320/360/390/412/432/480/600 a cada mudança.

Durante microiteração, normalmente use:

```bash
pnpm run check:fast
```

Não rode a matriz completa responsiva localmente a cada Delivery Unit comum.

## 3. Layout deve se adaptar por estrutura

Preferir:

- `display: flex` / `grid`;
- `minmax()`;
- `flex-wrap`;
- largura relativa;
- altura automática;
- `min-width: 0`;
- `clamp()` com moderação;
- container/media queries apenas para mudança estrutural real;
- `100dvh` para raiz quando apropriado;
- safe areas e WindowInsets;
- scroll normal quando conteúdo exceder a altura.

Evitar:

- root com largura fixa;
- tela inteira com altura fixa;
- `height: 830px`/valor calculado para um aparelho;
- CSS por modelo de celular;
- breakpoint para 390/412/432 apenas para fazer screenshot passar;
- posicionamento absoluto de conteúdo principal.

A pergunta correta é:

> Como este componente reage ao espaço que recebeu?

Não:

> Qual CSS preciso para cada celular?

## 4. Safe areas e barras do sistema

Nenhuma ação importante pode ficar atrás de:

- status bar;
- cutout/câmera;
- gesture/navigation bar;
- teclado/IME.

Na camada web, usar `env(safe-area-inset-*)` e tokens de inset do projeto.

Se o WebView não fornecer o inset Android necessário, a camada nativa deve publicar WindowInsets reais. Nunca hardcodear altura das barras.

Existe gap técnico conhecido: `foundation.css` menciona `--android-safe-bottom`, mas o `MainActivity` atual precisa ser auditado para provar/publicar esse valor.

## 5. Copy essencial nunca é sacrificada

Não usar `ellipsis`, `line-clamp`, `nowrap`, `overflow: hidden` ou altura fixa para esconder título, CTA, label, status, erro, navegação ou identificação essencial.

Padrão para copy humana:

```css
word-break: normal;
overflow-wrap: normal;
white-space: normal;
```

Se não couber, mudar a composição.

Nunca produzir quebras como `Present` + `es`, `Pendent` + `es` ou `Planeja` + `mento`.

## 6. Três níveis de validação

### Microiteração

Somente 412 CSS px + screenshot frequente.

### Checkpoint local da Delivery Unit

Quando a candidata estiver forte:

```bash
pnpm run test:v2-responsive:checkpoint -- <preview> "<texto esperado>"
```

O checkpoint exercita somente a superfície indicada em:

- 360px — compacto;
- 412px — âncora;
- 480px — amplo.

Exemplo:

```bash
pnpm run test:v2-responsive:checkpoint -- planning-day "Planejamento diário"
```

Isso é smoke check, não matriz de produção.

### Gate completo

`pnpm run test:v2-responsive:full` pertence principalmente a:

- CI;
- Gate B;
- release;
- mudança estrutural relevante;
- investigação de bug responsivo real.

Não gastar recursos locais repetindo o mesmo gate completo que o CI executará, salvo justificativa de risco.

## 7. Texto ampliado

No hardening crítico, validar escalas relevantes. Não testar todos os níveis em toda microalteração visual.

Objetivo: preservar leitura, palavras completas, ordem lógica, ações e ausência de overflow horizontal.

## 8. POCO X7 Pro

O POCO é aparelho físico de QA, não target de layout.

Não instalar APK a cada ajuste pequeno. Use-o em checkpoints Android reais, mudanças de insets/teclado/native e antes do release.

## 9. Gate visual

Uma tela falha se:

- funciona só em uma largura;
- copy essencial corta/quebra artificialmente;
- CTA desaparece;
- há scroll horizontal acidental;
- safe area/teclado cobre interação;
- UI ficou genérica/inconsistente para “caber”;
- foi necessário CSS específico por aparelho.

## 10. Regra final

> **Desenvolva em espaço lógico, não em pixels físicos.**

> **412 é régua de trabalho; flexibilidade é propriedade do código; matriz ampla é trabalho do CI/gate.**
