---
name: assistente-pedagogico-android-adaptive-ui
description: >
  Use em toda implementação ou revisão de UI do Assistente Pedagógico para garantir
  adaptação real a diferentes larguras Android, safe areas e crescimento de texto,
  sem truncar copy essencial nem transformar screenshots de referência em layouts fixos.
---

# Assistente Pedagógico — Android Adaptive UI

Use esta skill junto com as skills visual-first do projeto.

Autoridade complementar obrigatória:

- `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md`;
- `docs/ANDROID_REAL_DEVICE_QA.md`.

## Regra principal

Uma screenshot tem uma largura. O aplicativo não.

Se o target foi capturado em 390 px, use 390 px para comparar fidelidade visual, mas implemente a tela de forma fluida para Androids menores, maiores, tablets/foldables quando aplicável e crescimento de texto.

O POCO X7 Pro é apenas um aparelho físico de referência de QA. A UI não pode ser otimizada exclusivamente para ele.

## Matriz mínima

Antes do Gate B, exercite como uma única composição fluida:

- 320 px;
- 360 px;
- 384/390 px;
- 411/412 px;
- 432 px;
- 480 px;
- 600+ px quando a superfície tiver suporte relevante a tablet/foldable.

Quando a tela tiver layout relevante em tablet/foldable, exercite também 720/840 px.

Não escreva CSS específico para cada largura. Os pontos são stress tests de uma composição contínua.

Também validar alturas curtas/médias/altas quando a superfície depender muito do espaço vertical, especialmente com teclado e barras do sistema.

## Copy essencial nunca é sacrificada

Não use `text-overflow: ellipsis`, `line-clamp`, `white-space: nowrap`, `overflow: hidden` ou altura fixa para:

- título de tela;
- título de aula/plano;
- CTA;
- label de formulário;
- item principal de navegação;
- status operacional;
- erro/sucesso importante;
- instrução necessária para concluir fluxo;
- identificação principal do aluno/professor quando necessária para a ação.

Permita wrap, aumente altura e reorganize ações. Se necessário, passe botões horizontais para stack vertical ou mude a composição.

Truncamento só é aceitável em metadata secundária se o valor completo continuar acessível.

## Nunca quebrar palavras humanas para salvar layout

Para copy natural em PT-BR — labels, títulos, CTAs, status, navegação, nomes e frases — o padrão é:

```css
word-break: normal;
overflow-wrap: normal;
white-space: normal;
```

`overflow-wrap: anywhere` não pode ser usado para texto humano essencial. Reserve-o apenas para tokens realmente não quebráveis, como URLs/IDs/códigos longos, e ainda assim com justificativa.

Exemplos de falha:

- `Presentes` renderizado como `Present` + `es`;
- `Pendentes` renderizado como `Pendent` + `es`;
- CTA quebrado no meio de uma palavra;
- `Planejamento` fragmentado porque o card foi desenhado estreito demais.

Se uma palavra não cabe, **mude a composição**. Não destrua a palavra.

## Ferramentas CSS preferidas

Use quando ajudarem:

- flex/grid;
- `minmax()`;
- `auto-fit` / `auto-fill` quando apropriado;
- `flex-wrap`;
- `clamp()` para escala moderada, não para esconder problemas;
- `min-width: 0` em itens flex/grid;
- container queries para componentes reutilizáveis;
- media queries para mudanças estruturais;
- `env(safe-area-inset-top/right/bottom/left)`;
- altura automática para containers de copy;
- viewport dinâmico (`dvh`) quando necessário.

Evite root com largura fixa, altura rígida em cards com texto e posicionamento absoluto de copy principal.

## Estratégia quando falta espaço

Preferir nesta ordem:

1. wrap entre palavras;
2. aumentar altura do container;
3. reduzir gaps/paddings moderadamente;
4. empilhar ações;
5. reduzir número de colunas;
6. mover metadata secundária para outra linha;
7. mudar a composição preservando prioridade visual.

Não resolver primeiro com fonte minúscula, quebra intrapalavra, esconder ação ou scroll horizontal.

## Crescimento de texto

Em superfícies críticas, validar comportamento equivalente a:

- 100%;
- 115%;
- 130%;
- 150%.

Em fluxos críticos, testar também 200% quando viável.

O teste não é “ficou idêntico”. O teste é:

- conteúdo continua disponível;
- nenhuma ação ficou inacessível;
- hierarquia continua compreensível;
- não surgiu scroll horizontal;
- touch targets continuam adequados;
- bottom navigation não colapsa de forma ilegível;
- palavras continuam semanticamente inteiras.

## Conteúdo realista para stress

Não teste apenas com strings curtas artificiais.

Use fixtures fictícias e realistas em PT-BR, incluindo:

- nomes completos;
- `Registrar observação`;
- `Planejamento semanal`;
- `Experimento do ciclo da água`;
- `Avaliação diagnóstica de aprendizagem`;
- `1 aluno` e `38 alunos`;
- `1 pendente` e `12 pendentes`;
- datas longas;
- códigos BNCC.

Nunca use dados reais de professor/aluno em fixtures públicas.

## Preview rápido versus gate

Durante ajuste visual rápido:

1. renderize no viewport-âncora do target;
2. compare lado a lado;
3. corrija as maiores diferenças.

Depois de mudança estrutural e antes do Gate B:

1. rode a matriz Android;
2. corrija overflow/truncamento/quebra intrapalavra;
3. teste alturas relevantes;
4. teste texto ampliado;
5. capture evidência representativa;
6. valide Android real quando disponível.

Não obrigue o agente a recapturar toda a matriz a cada alteração de 2 px; isso mata a velocidade sem aumentar qualidade.

## Critério de falha

A tela falha se:

- houver scroll horizontal não intencional;
- copy essencial estiver cortada;
- palavra essencial estiver quebrada artificialmente no meio;
- botão/label perder palavras;
- conteúdo depender de largura exata;
- uma tela estreita esconder funcionalidade essencial;
- crescimento de texto tornar o fluxo impossível;
- safe area ou teclado cobrir conteúdo/interação;
- o layout parecer simplesmente uma screenshot encolhida;
- a solução funcionar apenas no POCO X7 Pro ou apenas em 390 px.

## Saída esperada

Ao reportar validação, informar:

- viewport-âncora usado para fidelidade;
- larguras de stress verificadas;
- alturas de stress quando relevantes;
- comportamento de texto ampliado;
- overflow encontrado/corrigido;
- quebra intrapalavra encontrada/corrigida;
- qualquer exceção deliberada de truncamento de metadata;
- estado do QA em aparelho real.
