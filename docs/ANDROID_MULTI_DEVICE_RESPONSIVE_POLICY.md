# Android Multi-Device Responsive Policy — Assistente Pedagógico V2

> **Status:** obrigatório para toda UI V2 Android
> **Objetivo:** garantir que o Assistente Pedagógico funcione e permaneça visualmente coerente em celulares Android de tamanhos, densidades, proporções e escalas de texto diferentes — sem texto cortado, palavras quebradas de forma ruim, ações escondidas ou layouts dependentes de um aparelho específico.

## 1. Princípio central

O aplicativo não é desenhado para um modelo de celular.

O POCO X7 Pro é um aparelho físico de referência disponível para QA, mas **não é o alvo único do produto**. O Assistente Pedagógico precisa funcionar em aparelhos Android menores, médios, grandes e, quando aplicável, tablets/foldables.

A regra é:

> **uma referência visual pode ter uma largura; o produto deve sobreviver a uma família de viewports.**

Nunca transformar resolução física de um aparelho em breakpoint CSS.

## 2. Pixels físicos não são viewport CSS

Resolução do painel, densidade e viewport lógico são coisas diferentes.

Não usar valores como `1220px`, `1080px` ou `1440px` de resolução física como largura de layout.

O React/Capacitor deve responder ao espaço lógico realmente disponível no WebView, considerando:

- densidade do aparelho;
- escala de exibição do Android;
- escala de fonte;
- status bar;
- área de gesto/barra de navegação;
- recortes/câmera;
- teclado;
- orientação;
- WebView e `visualViewport`.

## 3. Faixas mínimas de validação

Toda superfície V2 importante deve ser exercitada como uma única composição responsiva nos seguintes pontos de stress lógico:

### Telefones

- `320px` — telefone estreito / stress mínimo;
- `360px` — compacto comum;
- `384px` / `390px` — intermediário e viewport-âncora frequente;
- `411px` / `412px` — telefone amplo comum;
- `432px` — telefone amplo moderno;
- `480px` — stress de telefone muito largo.

### Telas maiores

- `600px` — limite importante para tela grande/foldable;
- `720px` e/ou `840px` quando a superfície tiver layout relevante para tablet/foldable.

Esses números **não criam oito layouts separados**. Eles são pontos para encontrar falhas em um layout fluido.

## 4. Altura também é parte da responsividade

Não validar apenas largura.

Superfícies críticas devem ser verificadas também em alturas reduzidas e altas, porque teclados, barras do sistema e proporções de tela mudam o espaço útil.

Stress mínimo recomendado em telefone:

- altura curta: aproximadamente `640–720px` lógicos;
- altura média: aproximadamente `780–850px`;
- altura alta: `900px+`.

Nenhuma ação principal pode existir apenas porque a captura de referência era alta.

## 5. Regra absoluta de texto

Texto essencial precisa permanecer **legível, completo e semanticamente íntegro**.

É falha de produto se um label natural em português quebrar no meio da palavra apenas para caber em um card.

Exemplos de falha:

- `Presentes` → `Present` + `es`;
- `Pendentes` → `Pendent` + `es`;
- `Planejamento` quebrado em fragmentos artificiais;
- CTA com palavra cortada;
- nome de aula escondido por ellipsis sem necessidade.

Para copy humana essencial, usar como padrão:

```css
word-break: normal;
overflow-wrap: normal;
white-space: normal;
```

`overflow-wrap: anywhere` **não deve ser usado em labels, CTAs, títulos, status, navegação ou frases naturais**. Ele só é aceitável em tokens realmente não quebráveis, como IDs/URLs/códigos longos, e ainda assim com justificativa.

Se uma palavra não cabe, a solução preferida é **mudar a composição**, não destruir a palavra.

## 6. Conteúdo que nunca pode ser truncado por conveniência

Proibido usar `text-overflow: ellipsis`, `line-clamp`, `nowrap`, `overflow: hidden` ou altura fixa para esconder:

- título de tela;
- nome de aula/plano;
- nome da turma quando principal;
- CTA;
- label de formulário;
- status operacional;
- mensagem de erro/sucesso;
- instrução necessária para concluir tarefa;
- item principal de navegação;
- nome de aluno quando a identificação completa for necessária para a ação.

Truncamento só pode existir em metadata secundária quando:

1. não afeta entendimento/ação;
2. o valor completo está acessível por outro caminho;
3. existe decisão explícita de design.

## 7. Estratégia de layout quando falta espaço

Quando a largura diminui, preferir nesta ordem:

1. permitir wrap entre palavras;
2. aumentar altura do container;
3. reduzir gaps/paddings moderadamente;
4. empilhar ações horizontais;
5. mudar grid de 3 colunas para 2 ou 1;
6. mover metadata secundária para outra linha;
7. substituir composição, mantendo prioridade visual.

Evitar como primeira solução:

- fonte minúscula;
- palavra quebrada no meio;
- esconder ação;
- scroll horizontal;
- reduzir touch target;
- cortar conteúdo.

## 8. CSS adaptativo preferido

Preferir:

- `display: flex` e `display: grid`;
- `minmax()`;
- `auto-fit` / `auto-fill` quando apropriado;
- `flex-wrap`;
- `min-width: 0` em filhos flex/grid;
- `clamp()` para escala moderada;
- media/container queries para mudança estrutural;
- `width: 100%` + `max-width` apenas quando houver razão de leitura/composição;
- altura automática para conteúdo textual;
- `env(safe-area-inset-*)`;
- `100dvh`/viewport dinâmico quando necessário, sem aprisionar conteúdo em altura fixa.

Evitar:

- widths rígidos para composição inteira;
- heights rígidos em cards com copy;
- posicionamento absoluto de conteúdo principal;
- breakpoints baseados em modelo de aparelho;
- CSS criado apenas para uma screenshot específica.

## 9. Escala de texto e acessibilidade

Toda superfície crítica deve sobreviver a aumento de texto.

Validar no mínimo:

- `100%`;
- `115%`;
- `130%`;
- `150%`.

Nos fluxos críticos de produção, também testar `200%` quando viável.

O objetivo em texto ampliado **não é preservar a screenshot pixel-perfect**. É preservar:

- leitura;
- hierarquia;
- ordem lógica;
- acesso às ações;
- touch targets;
- palavras completas;
- ausência de scroll horizontal acidental.

Se 200% exigir mudança de composição, a composição deve mudar.

## 10. Conteúdo brasileiro real deve ser usado nos testes

Não testar responsividade apenas com frases curtas artificiais.

Fixtures de UI devem incluir exemplos realistas em PT-BR, como:

- `Experimento do ciclo da água`;
- `Língua Portuguesa`;
- `Registrar observação`;
- `Planejamento semanal`;
- `Avaliação diagnóstica de aprendizagem`;
- nomes completos de pessoas fictícias;
- turmas e descrições com comprimentos variados.

Também testar números e estados que alteram largura:

- `1 aluno` / `38 alunos`;
- `1 pendente` / `12 pendentes`;
- datas longas;
- códigos BNCC.

Nunca usar dados reais de professores/alunos em fixtures públicas.

## 11. Densidade e tamanho físico

A UI não deve ficar minúscula em tela de alta densidade nem enorme em aparelho menor.

Regras mínimas:

- touch target >= `48px` lógicos;
- não reduzir fonte de navegação a tamanhos ilegíveis para fazê-la caber;
- ícones mantêm proporção e legibilidade;
- espaçamento pode adaptar, mas não colapsar;
- estados não dependem apenas de cor.

## 12. Safe areas, barras e teclado

No Android real validar:

- status bar;
- câmera/recorte quando relevante;
- navegação por gestos e por botões;
- barra inferior V2;
- teclado aberto;
- scroll até o último campo/CTA;
- foco de inputs;
- modais/sheets;
- conteúdo não escondido por elementos fixos.

Nenhum CTA crítico pode ficar atrás do teclado ou da área de gesto.

## 13. Orientação

O produto é **portrait-first** em telefones, mas não deve quebrar catastroficamente em landscape.

Para telas de trabalho mais densas (calendário, planejamento, arquivos), considerar aproveitamento de landscape/tablet quando isso melhorar produtividade.

Não criar suporte landscape complexo antes de a experiência portrait estar correta, salvo requisito explícito da tela.

## 14. Real device QA

O POCO X7 Pro continua como principal dispositivo físico disponível, seguindo `docs/ANDROID_REAL_DEVICE_QA.md`.

Mas aprovação no POCO **não equivale** a aprovação Android geral.

A sequência correta é:

```text
Visual Lab rápido
-> matriz lógica multi-device
-> texto ampliado
-> testes automáticos
-> APK/WebView Android real no POCO X7 Pro
-> quando possível, smoke test em pelo menos um Android compacto adicional
```

Se não houver segundo aparelho físico, usar emulador com perfil compacto para complementar o POCO.

## 15. Gate automático obrigatório

`pnpm run test:v2-responsive` deve evoluir para cobrir, no mínimo:

- larguras da matriz;
- alturas representativas;
- ausência de overflow horizontal;
- elementos essenciais dentro do viewport/scroll normal;
- copy crítica sem clipping;
- labels essenciais sem quebra intrapalavra;
- texto ampliado;
- touch targets críticos;
- screenshots de evidência.

O teste automático **não substitui inspeção visual**. Ele elimina regressões óbvias antes da revisão humana.

## 16. Checklist por tela antes do Gate A

Para `VISUAL DIRECTION APPROVED`:

- a composição funciona no viewport-âncora;
- não existe quebra intrapalavra evidente;
- não existe corte de copy essencial;
- a tela ainda pertence ao mesmo DNA V2;
- não existe dependência óbvia de um único aparelho.

## 17. Checklist por tela antes do Gate B

Para `PRODUCTION GATE READY`:

- matriz 320–480 executada;
- 600+ executado quando aplicável;
- alturas de stress executadas;
- texto 100/130/150% executado, 200% em fluxos críticos quando viável;
- sem overflow horizontal acidental;
- sem word-break inadequado;
- sem CTA escondido;
- safe areas corretas;
- teclado não bloqueia fluxo;
- touch targets >= 48px;
- estados loading/empty/error/offline responsivos;
- Android real testado ou marcado explicitamente como pendente;
- screenshots/branch/commit registrados.

## 18. Critério de falha imediata

Uma tela deve voltar para correção se qualquer um ocorrer:

- palavra essencial quebrada artificialmente no meio;
- texto essencial cortado;
- botão sem label completo;
- conteúdo inacessível sem scroll horizontal;
- ação escondida por falta de espaço;
- layout só funciona em 390px;
- layout só funciona no POCO X7 Pro;
- fonte foi reduzida a ponto de prejudicar leitura;
- texto aumentado torna a tarefa impossível;
- bottom nav, teclado ou safe area cobre conteúdo essencial.

## 19. Princípio final

> **O Assistente Pedagógico não é um mockup de 390px e não é um app para um POCO. É um produto Android para professores brasileiros usando aparelhos diferentes.**

A interface deve preservar intenção, leitura e ação em diferentes tamanhos antes de preservar pixels.

> **Fidelidade visual no target. Robustez em toda a família Android.**
