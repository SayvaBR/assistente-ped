# V2 Visual Lab

Ambiente de preview visual direto, inspirado no ciclo de builders visual-first.

## Uso

```bash
pnpm dev
```

Abra:

```text
http://127.0.0.1:5173/?v2-preview=home&width=390
```

Larguras rápidas:

- `width=360`
- `width=390`
- `width=430`

O toolbar também permite trocar a largura.

## Objetivo

Permitir que o Codex renderize e refine a V2 sem atravessar onboarding, navegação ou shell legado a cada alteração.

A primeira tarefa é substituir o placeholder por `src/v2/screens/HomeV2.tsx` e iterar visualmente até a composição ficar convincente.

O Visual Lab só é ativado em `import.meta.env.DEV`; produção continua iniciando o app real.
