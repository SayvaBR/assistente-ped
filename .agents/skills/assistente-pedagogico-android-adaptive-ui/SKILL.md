---
name: assistente-pedagogico-android-adaptive-ui
description: >
  Use em toda implementação ou revisão de UI do Assistente Pedagógico para garantir
  adaptação real a diferentes larguras Android, safe areas e crescimento de texto,
  sem truncar copy essencial nem transformar screenshots de referência em layouts fixos.
---

# Assistente Pedagógico — Android Adaptive UI

Use esta skill junto com as skills visual-first do projeto.

## Regra principal

Uma screenshot tem uma largura. O aplicativo não.

Se o target foi capturado em 390 px, use 390 px para comparar fidelidade visual, mas implemente a tela de forma fluida para Androids menores, maiores, tablets/foldables quando aplicável e crescimento de texto.

## Matriz mínima

Antes de Design Review, exercite:

- 320 px;
- 360 px;
- 384/390 px;
- 411/412 px;
- 432 px;
- 480 px;
- 600+ px quando a superfície tiver suporte relevante a tablet/foldable.

Não escreva CSS específico para cada largura. Os pontos são stress tests de uma composição contínua.

## Copy essencial nunca é sacrificada

Não use `text-overflow: ellipsis`, `line-clamp`, `white-space: nowrap` ou altura fixa para:

- título de tela;
- título de aula/plano;
- CTA;
- label de formulário;
- item principal de navegação;
- erro/sucesso importante;
- instrução necessária para concluir fluxo.

Permita wrap, aumente altura e reorganize ações. Se necessário, passe botões horizontais para stack vertical ou mude a composição.

Truncamento só é aceitável em metadata secundária se o valor completo continuar acessível.

## Ferramentas CSS preferidas

Use quando ajudarem:

- flex/grid;
- `minmax()`;
- `clamp()` para escala moderada, não para esconder problemas;
- `min-width: 0` em itens flex/grid;
- container queries para componentes reutilizáveis;
- media queries para mudanças estruturais;
- `env(safe-area-inset-top/right/bottom/left)`;
- `overflow-wrap`/wrap natural para strings reais em PT-BR.

Evite root com largura fixa, altura rígida em cards com texto e posicionamento absoluto de copy principal.

## Crescimento de texto

Em superfícies críticas, validar comportamento equivalente a 100%, 115%, 130% e 150%.

O teste não é “ficou idêntico”. O teste é:

- conteúdo continua disponível;
- nenhuma ação ficou inacessível;
- hierarquia continua compreensível;
- não surgiu scroll horizontal;
- touch targets continuam adequados;
- bottom navigation não colapsa de forma ilegível.

## Preview rápido versus gate

Durante ajuste visual rápido:

1. renderize no viewport-âncora do target;
2. compare lado a lado;
3. corrija as maiores diferenças.

Depois de mudança estrutural e antes do Design Review:

1. rode a matriz Android;
2. corrija overflow/truncamento;
3. teste texto ampliado;
4. capture evidência representativa.

Não obrigue o agente a recapturar sete larguras a cada alteração de 2 px; isso mata a velocidade sem aumentar qualidade.

## Critério de falha

A tela falha se:

- houver scroll horizontal não intencional;
- copy essencial estiver cortada;
- botão/label perder palavras;
- conteúdo depender de largura exata;
- uma tela estreita esconder funcionalidade essencial;
- crescimento de texto tornar o fluxo impossível;
- safe area cobrir conteúdo/interação;
- o layout parecer simplesmente uma screenshot encolhida.

## Saída esperada

Ao reportar validação, informar:

- viewport-âncora usado para fidelidade;
- larguras de stress verificadas;
- comportamento de texto ampliado;
- overflow encontrado/corrigido;
- qualquer exceção deliberada de truncamento de metadata.
