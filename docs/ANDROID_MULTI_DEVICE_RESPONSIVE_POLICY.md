# Android Multi-Device Responsive Policy — Assistente Pedagógico V2

> **Status:** obrigatório para toda UI V2 Android
> **Objetivo:** garantir robustez em Androids diferentes sem transformar cada microiteração em uma bateria manual de resoluções.

## 1. Princípio

O aplicativo não é desenhado para um modelo de celular.

O POCO X7 Pro é aparelho físico de referência de QA, não target exclusivo.

A decisão de layout deve partir do **espaço lógico disponível para o app**, não da resolução física do painel.

Referências obrigatórias:

- `docs/ANDROID_LOGICAL_UNITS_AND_INSETS.md`;
- `docs/ANDROID_ADAPTIVE_DEVELOPMENT_CADENCE.md`.

## 2. Pixels físicos, dp e CSS px são coisas diferentes

- `1220 x 2712`, `1080 x 2400` etc. são pixels físicos do painel e não entram diretamente no CSS.
- `dp`/`sp` são unidades da UI nativa Android.
- a UI React/Capacitor usa CSS logical `px`, `rem`, `%`, flex/grid e viewport/insets.

Nunca criar breakpoint a partir da resolução física de um aparelho.

## 3. Desenvolvimento x checkpoint x gate

### Desenvolvimento visual

Use somente **412 CSS px** como viewport-âncora, salvo target específico aprovado.

Não testar manualmente várias larguras por mudança.

### Checkpoint local da Delivery Unit

Quando a candidata estiver forte:

- 360px — compacto;
- 412px — âncora;
- 480px — amplo.

Use:

```bash
pnpm run test:v2-responsive:checkpoint -- <preview> "<texto esperado>"
```

Esse checkpoint é um smoke test da superfície alterada, não a prova final Android.

### Gate completo / CI

A matriz ampla fica em:

- CI;
- Gate B;
- release;
- mudança estrutural importante;
- bug responsivo real.

Use:

```bash
pnpm run test:v2-responsive:full
```

O CI deve continuar rodando a matriz completa mesmo que o Codex não a repita localmente.

## 4. Matriz de produção

No gate completo, cobrir pontos lógicos representativos.

### Telefones

- 320px — stress estreito;
- 360px — compacto comum;
- 390px — intermediário;
- 412px — telefone amplo/âncora;
- 432px — amplo moderno;
- 480px — stress largo.

### Telas maiores

- 600px — transição importante para telas grandes/foldable;
- 720/840px quando a superfície tiver layout relevante para tablet/foldable.

Esses números não representam aparelhos específicos e não criam oito layouts separados.

## 5. Altura não é fixa

Não existe “altura útil padrão” universal entre status bar e navigation bar.

A altura muda com:

- gestos x 3 botões;
- cutout;
- Android/ROM;
- escala de exibição;
- teclado;
- orientação;
- multi-window.

Regras:

- raiz pode usar `min-height: 100dvh`;
- conteúdo usa altura automática;
- ação final permanece alcançável por scroll normal;
- nunca fixar `830px`, `840px`, `915px` etc. como altura útil da aplicação.

## 6. Safe areas / WindowInsets

Nenhum conteúdo/CTA essencial pode ficar encoberto por:

- status bar;
- display cutout/câmera;
- navigation/gesture bar;
- teclado/IME.

Na camada web, usar `env(safe-area-inset-*)` e tokens de inset do projeto.

Se isso não representar corretamente o Android/WebView suportado, publicar WindowInsets reais da camada nativa. Nunca hardcodear altura das barras.

## 7. Texto essencial

Texto essencial deve permanecer completo e legível.

Falhas:

- `Presentes` -> `Present` + `es`;
- `Pendentes` -> `Pendent` + `es`;
- `Planejamento` fragmentado artificialmente;
- CTA cortado;
- fonte reduzida demais para caber.

Padrão para copy humana:

```css
word-break: normal;
overflow-wrap: normal;
white-space: normal;
```

Se não couber, mudar composição.

Não esconder título, CTA, label, status, erro ou ação principal com `ellipsis`, `line-clamp`, `nowrap`, `overflow:hidden` ou altura fixa por conveniência.

## 8. Estratégia quando falta espaço

Preferir, nesta ordem conforme o caso:

1. wrap entre palavras;
2. altura automática;
3. reduzir gaps/padding moderadamente;
4. empilhar ações;
5. reduzir colunas;
6. mover metadata secundária;
7. trocar a composição preservando prioridade.

Evitar fonte minúscula, scroll horizontal, ação escondida e touch target reduzido.

## 9. CSS adaptativo preferido

Preferir:

- flex/grid;
- `minmax()`;
- `auto-fit`/`auto-fill` quando útil;
- `flex-wrap`;
- `min-width:0`;
- `clamp()` moderado;
- container/media queries para mudança estrutural real;
- `width:100%` e `max-width` quando fizer sentido;
- altura automática;
- `env(safe-area-inset-*)`;
- `100dvh` quando necessário.

Evitar CSS específico por aparelho ou screenshot.

## 10. Escala de texto

Texto ampliado é Gate B/hardening, não microiteração constante.

Cobrir no mínimo 100%, 130% e 150% em superfícies críticas; 200% quando viável em fluxos críticos.

O objetivo é preservar leitura, hierarquia, ação, touch targets e ausência de overflow horizontal — não manter pixel-perfect.

## 11. Conteúdo realista

Fixtures devem usar PT-BR realista e dados fictícios:

- `Experimento do ciclo da água`;
- `Língua Portuguesa`;
- `Registrar observação`;
- `Planejamento semanal`;
- `Avaliação diagnóstica de aprendizagem`;
- nomes completos fictícios;
- quantidades/datas/códigos BNCC variados.

Nunca usar dados reais de professores/alunos em fixtures públicas.

## 12. Touch targets e legibilidade

- touch target crítico >= 48px lógicos;
- fontes não encolhem apenas para caber;
- ícones preservam legibilidade;
- estados não dependem só de cor.

## 13. Android real

Validar em marcos importantes:

- status/navigation bars;
- gesture/3-button quando possível;
- cutout;
- teclado aberto;
- foco/scroll até último campo/CTA;
- bottom nav;
- modal/sheet;
- rotação/landscape sem quebra catastrófica.

O POCO X7 Pro é referência disponível; aprovação nele não equivale a aprovação Android geral.

## 14. Gate A

Para direção visual:

- composição convincente em 412/target;
- nenhuma falha óbvia de adaptação;
- sem copy essencial cortada;
- sem largura/altura fixa de aparelho;
- fluxo principal coerente.

Não exigir matriz manual completa.

## 15. Gate B

Para produção:

- matriz completa no CI;
- alturas de stress quando aplicável;
- texto ampliado;
- sem overflow horizontal;
- sem quebra intrapalavra;
- safe areas corretas;
- teclado não bloqueia fluxo;
- touch targets adequados;
- loading/empty/error/offline responsivos;
- Android real ou pendência explícita;
- evidências vinculadas ao commit/PR.

## 16. Falha imediata

Voltar para correção se:

- copy essencial corta/quebra;
- botão perde label;
- ação fica escondida;
- layout exige scroll horizontal acidental;
- funciona apenas em uma largura/aparelho;
- fonte ficou ilegível;
- texto ampliado torna a tarefa impossível;
- barra do sistema/teclado cobre conteúdo essencial.

## 17. Princípio final

> **Fidelidade visual no viewport-âncora. Robustez automática na família Android.**

> **Microiteração barata; CI forte; nenhum layout amarrado a pixels físicos.**
