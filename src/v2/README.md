# V2 Clean Room

`src/v2/` é a nova camada de experiência do Assistente Pedagógico.

Ela existe para impedir que decisões visuais da V1 contaminem a V2.

## Estrutura

```text
src/v2/
  components/   primitives e componentes visuais V2
  screens/      telas V2
  styles/       tokens e foundations V2
  motion/       recipes de motion/haptics
  hooks/        hooks específicos de experiência V2
  adapters/     tradução entre domain/data e view models V2
  assets/       recursos visuais V2 aprovados
```

## Regra de dependência

Fluxo permitido:

```text
src/domain + src/data + adapters nativos
                 ↓
            src/v2/adapters
                 ↓
          src/v2/screens/hooks
                 ↓
          src/v2/components
```

Fluxo proibido:

```text
src/screens (V1) ─┐
src/components V1 ├──> src/v2
recovered.js UI ──┘
```

A V2 pode consumir contratos e dados reais. Não pode consumir a arquitetura visual antiga.

## Princípios

- screenshot aprovado é target;
- primeira renderização cedo;
- 390px primeiro, depois 360/430;
- composição antes de abstração;
- primitives só são extraídas depois que uma tela comprova a necessidade;
- nenhuma nova feature visual entra na V1 quando já existe equivalente V2 aprovado;
- lógica presa a componente legado deve ser extraída para camada neutra.

## CSS

Os tokens V2 começam em `styles/tokens.css`.

Evite importar estilos V1 em componentes V2. Se um reset global existente for inevitável durante a transição, não use seus tokens/component classes como autoridade de design.

## Revisão

Toda tela importante deve terminar em:

`READY FOR DESIGN REVIEW — <TELA>`

Nunca fazer rollout em massa antes da tela piloto passar pelo gate visual.
