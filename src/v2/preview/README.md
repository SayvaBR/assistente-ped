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
- `width=412`
- `width=480`

O toolbar também permite trocar a largura.

## Objetivo

Permitir que o Codex renderize e refine a V2 sem atravessar onboarding, navegação ou shell legado a cada alteração.

O preview já monta as superfícies V2 com fixtures sintéticas; novas superfícies devem entrar pela mesma rota direta e passar pelo loop de observação antes da conexão profunda com dados reais.

O Visual Lab só é ativado em `import.meta.env.DEV`; produção continua iniciando o app real.
