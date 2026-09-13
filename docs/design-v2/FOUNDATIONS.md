# Design System V2 — Foundations

Este arquivo define os valores-base que o Codex deve centralizar em tokens. Magic numbers espalhados por componentes são proibidos quando o valor representa uma decisão sistêmica.

## 1. Cor

A marca é azul/branco. Cores semânticas adicionais só aparecem quando carregam significado real de status, alerta ou feedback.

### Brand

```css
:root {
  --v2-blue-50: #eef9ff;
  --v2-blue-100: #ddf4ff;
  --v2-blue-200: #b8e8ff;
  --v2-blue-300: #7fd5ff;
  --v2-blue-400: #42c1fb;
  --v2-blue-500: #1cb0f6;
  --v2-blue-600: #1899d6;
  --v2-blue-700: #137ab3;
  --v2-blue-800: #0d5d8b;
  --v2-blue-900: #0b3b63;

  --v2-navy-900: #0b2f66;
  --v2-navy-800: #123f7a;
  --v2-navy-700: #1b4f8d;

  --v2-white: #ffffff;
  --v2-bg: #ddf4ff;
  --v2-surface: #ffffff;
  --v2-surface-soft: #eef9ff;
  --v2-border: #c8e7f7;
  --v2-text: #0b2f66;
  --v2-text-muted: #5d7695;
  --v2-text-subtle: #7f95ad;
}
```

### Semânticas

```css
:root {
  --v2-success: #16b97f;
  --v2-success-soft: #dff8ee;
  --v2-danger: #e84c5b;
  --v2-danger-soft: #ffe8eb;
  --v2-warning: #d98b16;
  --v2-warning-soft: #fff3d8;
  --v2-info: var(--v2-blue-500);
}
```

Regras:

- não usar cores semânticas como decoração;
- não usar cor como único canal de status;
- azul deve dominar CTAs, seleção e identidade;
- gradientes são exceção e precisam de função narrativa clara; por padrão usar cor sólida;
- fundo principal não deve virar branco puro em todas as telas; o azul-claro da marca cria a atmosfera V2.

## 2. Tipografia

A base atual já possui `@fontsource/nunito-sans`. Manter `Nunito Sans` como família principal na primeira implementação V2 para evitar dependência nova e preservar desempenho/offline.

```css
:root {
  --v2-font: "Nunito Sans", system-ui, -apple-system, sans-serif;

  --v2-display-size: clamp(32px, 8vw, 40px);
  --v2-display-line: 1.05;
  --v2-display-weight: 900;

  --v2-h1-size: clamp(27px, 6.8vw, 32px);
  --v2-h1-line: 1.12;
  --v2-h1-weight: 900;

  --v2-h2-size: 22px;
  --v2-h2-line: 1.2;
  --v2-h2-weight: 850;

  --v2-h3-size: 18px;
  --v2-h3-line: 1.25;
  --v2-h3-weight: 800;

  --v2-body-size: 16px;
  --v2-body-line: 1.5;
  --v2-body-weight: 600;

  --v2-label-size: 14px;
  --v2-label-line: 1.35;
  --v2-label-weight: 800;

  --v2-caption-size: 12px;
  --v2-caption-line: 1.35;
  --v2-caption-weight: 700;
}
```

Princípios:

- títulos fortes e curtos;
- corpo nunca fino;
- evitar `font-weight: 400` como padrão estrutural;
- labels e números críticos podem usar 800–900;
- evitar centralização de texto em telas utilitárias;
- centralizar apenas onboarding, sucesso, vazio e estados narrativos quando fizer sentido.

## 3. Espaçamento

Escala em múltiplos de 4:

```css
:root {
  --v2-space-1: 4px;
  --v2-space-2: 8px;
  --v2-space-3: 12px;
  --v2-space-4: 16px;
  --v2-space-5: 20px;
  --v2-space-6: 24px;
  --v2-space-7: 32px;
  --v2-space-8: 40px;
  --v2-space-9: 48px;
}
```

Padrão mobile:

- gutter lateral: 20px; 16px apenas em 360 px quando necessário;
- gap interno compacto: 8–12px;
- gap entre blocos relacionados: 12–16px;
- gap entre seções: 24–32px;
- não criar espaços vazios grandes só para “respirar”; espaço deve comunicar agrupamento.

## 4. Radius

```css
:root {
  --v2-radius-xs: 10px;
  --v2-radius-sm: 14px;
  --v2-radius-md: 18px;
  --v2-radius-lg: 24px;
  --v2-radius-xl: 30px;
  --v2-radius-pill: 999px;
}
```

Uso:

- inputs/controles: 14–18px;
- cards de conteúdo: 18–24px;
- hero/ilustração: 24–30px;
- pills apenas para status, filtro curto ou seleção compacta;
- evitar transformar tudo em pill.

## 5. Bordas, depth e sombras

A V2 prioriza sensação tátil por borda/depth de cor relacionada ao elemento. Sombras suaves genéricas não devem dominar.

```css
:root {
  --v2-border-width: 1px;
  --v2-depth-primary: 0 4px 0 #1899d6;
  --v2-depth-surface: 0 3px 0 #d2eafa;
  --v2-shadow-floating: 0 10px 30px rgba(11, 47, 102, 0.14);
}
```

Regras:

- botão primário pode usar bottom depth 3–4px;
- pressed reduz/zera depth e move o conteúdo 2–3px para baixo;
- cards comuns não precisam de sombra;
- sombra floating só para modal, sheet e elementos realmente elevados.

## 6. Tamanhos de toque

- mínimo absoluto: 48×48px;
- botão principal: 54–58px de altura;
- icon button: 48×48px;
- bottom nav item: mínimo 64px de altura total;
- chips interativos: mínimo 48px de altura quando forem ações principais; filtros compactos podem parecer menores visualmente, mas hit area deve continuar >=48px.

Nunca reduzir hit target para “caber melhor”.

## 7. Grid e viewport

Viewport alvo de validação:

- 360px;
- 390px;
- 430px.

App shell:

- largura fluida até ~560px em web preview;
- em Android ocupa 100% do viewport;
- respeitar safe-area top/bottom;
- sem overflow horizontal em 200% zoom;
- bottom navigation fixa pode existir, mas o conteúdo deve reservar espaço real para ela.

## 8. Iconografia

Base inicial: Lucide, já instalado, mas com regras V2.

- stroke visual consistente em torno de 2.25–2.5px;
- tamanho padrão 20–24px;
- não colocar ícone dentro de quadrado pastel por padrão;
- icon container existe somente quando cria hierarquia real, como identidade de uma aula ou estado;
- ações ambíguas sempre têm label ou accessible name;
- ícone nunca substitui texto crítico como “Excluir conta”, “Salvar frequência” ou “Cancelar assinatura”.

## 9. Motion

```css
:root {
  --v2-motion-fast: 120ms;
  --v2-motion-base: 180ms;
  --v2-motion-screen: 240ms;
  --v2-ease-out: cubic-bezier(.2,.8,.2,1);
  --v2-ease-spring: cubic-bezier(.2,1.15,.35,1);
}
```

Usar motion para:

- pressed;
- seleção;
- expansão/colapso;
- entrada/saída de sheet/dialog;
- mudança de etapa do onboarding;
- confirmação de ação;
- progresso.

`prefers-reduced-motion` deve reduzir transform/animação para praticamente zero sem esconder informação.

## 10. Estados interativos

Todo controle precisa prever:

- default;
- hover quando aplicável no web preview;
- pressed;
- focus-visible;
- selected;
- disabled;
- loading;
- error quando aplicável;
- success/confirmed quando aplicável.

Focus-visible recomendado: outline azul escuro 3px com offset 2–3px.

## 11. Acessibilidade

Obrigatório:

- WCAG AA para texto e controles;
- labels reais para campos;
- erros associados ao campo (`aria-describedby`);
- status assíncronos em `role=status` e erros importantes em `role=alert`;
- não usar placeholder como label;
- navegação completa por teclado no web preview;
- ordenação DOM coerente com ordem visual;
- text scaling sem corte;
- touch target >=48px;
- reduced motion;
- contraste de focus visível;
- não comunicar falta/presença, sucesso/erro ou premium apenas por cor.

## 12. Ilustração

Ilustração humana pode aparecer em:

- onboarding;
- primeiro sucesso;
- confirmação de assinatura;
- empty states especiais;
- ajuda/contexto excepcional.

Não usar como mascote permanente. Não colocar a mesma personagem em todas as telas utilitárias. Telas densas como chamada, notas, arquivos e planejamento devem priorizar informação.

Direção: soft 3D / clay-like / cartoon suave, expressiva, limpa, sem excesso de detalhes.

## 13. Densidade

A V2 não é minimalismo vazio. Em telas de trabalho:

- preferir listas compactas;
- usar divisores e alinhamento em vez de card para cada linha;
- manter contexto visível;
- evitar scroll excessivo causado por containers altos;
- status rápidos devem ser escaneáveis em segundos.
