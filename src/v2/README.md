# V2 Clean Room

Esta pasta é a superfície visual nova do Assistente Pedagógico.

Ela pode consumir domínio, dados, repositories, persistência, adapters nativos, BNCC e billing reais, mas não deve herdar a arquitetura visual V1.

## Estrutura

```text
src/v2/
  adapters/     -> traduz contratos/dados existentes para view models V2
  components/   -> primitives comprovadas por telas reais
  preview/      -> Visual Lab para iteração rápida
  screens/      -> telas V2 novas
  styles/       -> tokens/foundation V2
```

## Android responsivo

A largura de `390px` no Visual Lab é apenas um viewport-âncora para comparar com targets produzidos nessa geometria.

A UI real deve adaptar-se continuamente a Androids diferentes. O Visual Lab oferece stress points em 320, 360, 390, 412, 432, 480 e 600 px.

Regras:

- sem root de app fixo em 390 px;
- sem truncamento de copy essencial;
- sem scroll horizontal acidental;
- alturas de cards/hero devem crescer com texto;
- ações devem reorganizar quando faltar espaço;
- safe areas e touch targets precisam sobreviver em todos os tamanhos.

Antes de Design Review, rode `pnpm run test:v2-responsive`.

## Regra visual

Target aprovado é referência positiva prioritária. Use o viewport correspondente para comparação lado a lado, corrija composição/hierarquia primeiro e só depois valide a matriz responsiva.

## Fronteira

O build executa `pnpm run check:v2-boundary` para impedir imports visuais proibidos do legado em `src/v2/`.
