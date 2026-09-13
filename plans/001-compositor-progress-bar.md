# 001 — Mover a barra de progresso do wizard no compositor

- **Status**: DONE
- **Commit**: changeset `test: validate current Android build on real device`
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 2 files, 10 linhas

## Problem

O indicador de progresso do primeiro cadastro anima a largura do preenchimento,
o que força recálculo de layout enquanto o usuário avança pelas etapas:

```css
/* src/styles/recovered.css:447-451 — atual */
.guided-progress > span {
  display: block;
  height: 100%;
  border-radius: inherit;
  transition: width 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}
```

```js
// src/screens/SetupWizard.js:536-539 — atual
style: {
  width: `${((v + 1) / Oe) * 100}%`,
  background: colors.primary,
},
```

Esse fluxo é visto em toda primeira configuração e a largura animada compete
com a atualização do conteúdo da etapa. O movimento é simples e deve continuar,
mas pode ser executado somente com `transform`.

## Target

Manter o trilho ocupando toda a área e animar apenas a escala horizontal a partir
da borda esquerda:

```css
/* src/styles/recovered.css — alvo */
.guided-progress > span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transform: scaleX(1);
  transform-origin: left center;
  transition: transform 0.24s var(--ease-out);
}
```

```js
// src/screens/SetupWizard.js — alvo
style: {
  background: colors.primary,
  transform: `scaleX(${(v + 1) / Oe})`,
},
```

O valor acessível `aria-valuenow` permanece igual e a barra continua crescendo
da esquerda para a direita. Não animar `width`, `height`, margem ou padding.

## Repo conventions to follow

- Curvas compartilhadas ficam em `src/styles/design-system.css:17-21`; use
  `var(--ease-out)` em vez de repetir uma curva local.
- Estados de pressão existentes usam `transform` e transições curtas no mesmo
  arquivo, e o app já usa a media query global de redução de movimento.

## Steps

1. Em `src/styles/recovered.css`, substituir a transição de `width` por
   `width: 100%`, `transform: scaleX(1)`, `transform-origin: left center` e
   `transition: transform 0.24s var(--ease-out)`.
2. Em `src/screens/SetupWizard.js`, remover a largura percentual inline e passar
   `transform: \`scaleX(${(v + 1) / Oe})\`` junto da cor de fundo.
3. Atualizar este plano para `DONE` somente depois dos comandos de verificação.

## Boundaries

- Não alterar o markup ou a semântica do progressbar.
- Não alterar a duração ou o número de etapas do wizard.
- Não adicionar dependências e não tocar no splash screen.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit`, `pnpm test -- --run`, `pnpm build` e
  `pnpm exec playwright test --trace=off --reporter=line` devem passar.
- **Feel check**: abrir o wizard, avançar e voltar etapas e confirmar que o
  preenchimento cresce pela borda esquerda sem salto de layout; em DevTools,
  reduzir a velocidade para 10% e confirmar que somente `transform` é animado.
- **Accessibility**: ativar `prefers-reduced-motion` e confirmar que a mudança
  continua compreensível sem deslocamento adicional.
- **Done when**: não existir mais `transition: width` para `.guided-progress` e
  o DOM mantiver `role="progressbar"` com valores ARIA corretos.
