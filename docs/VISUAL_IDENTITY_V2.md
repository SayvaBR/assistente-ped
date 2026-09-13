# Visual Identity V2 — Assistente Pedagógico

Este documento traduz a direção visual aprovada pelo usuário em regras implementáveis para Codex/Astra.

## Status da direção

A direção visual desta especificação foi aprovada pelo usuário como alvo desejável para o Assistente Pedagógico. A UI atual é baseline funcional, não baseline visual.

O objetivo não é copiar uma imagem literalmente. O objetivo é reproduzir a mesma sensação de produto: amigável, tátil, coerente, educacional, clara, moderna e reconhecível, sem aparência de dashboard genérico.

## Personalidade

O aplicativo deve parecer um assistente de trabalho feito para professores, não um template SaaS.

Palavras-chave:

- Friendly Professional
- Tactile
- Educational
- Playful sem infantilização
- Motion-led
- Dense enough for real work
- Calm, clear, optimistic
- Mobile-first

A interface pode ter personalidade forte. Não preservar composição, tokens, cards ou componentes do legado apenas por já existirem.

## Linguagem visual central

### 1. Fundo e superfícies

- Fundo geral muito claro com tom azul frio/suave, evitando branco puro em toda a tela.
- Superfícies principais brancas ou azul muito claro.
- Contraste entre fundo e superfície deve vir de cor, borda e profundidade tátil, não de sombras cinzas genéricas.
- Cards existem, mas não devem ser o único recurso de composição.
- Use seções abertas, grupos, faixas, headers contextuais e blocos de conteúdo sem container quando isso melhorar a hierarquia.

### 2. Azul como assinatura

O azul é a cor principal da marca e deve concentrar ações importantes, navegação ativa, estados selecionados e destaques.

Direção recomendada:

- azul principal vivo/ciano-azulado para CTA e seleção;
- azul mais escuro para pressed/depth;
- azul céu muito claro para background e superfícies auxiliares;
- navy/azul muito escuro para texto principal em vez de preto puro.

Verde, vermelho e amarelo podem aparecer apenas como cores semânticas de status quando necessário (ex.: presença, falta, alerta), não como paleta estrutural dominante.

### 3. Tipografia

- Sans-serif arredondada, geométrica e amigável.
- Títulos com peso forte e personalidade; evitar pesos finos/light.
- Texto de interface deve ser compacto e legível.
- Hierarquia precisa ser evidente sem depender apenas de tamanho gigante.
- Evitar headers desperdiçando viewport com títulos enormes.

A sensação desejada é próxima de uma tipografia "chunky"/rounded, com boa legibilidade móvel e forte presença visual.

### 4. Formas e raio

- Radius recorrente em torno de 16–20 px para superfícies importantes.
- Pills apenas quando semanticamente corretas (status, filtros, chips, seleção), não como decoração universal.
- Botões e controles devem parecer pressionáveis e táteis.
- Não transformar cada ícone em um quadrado/círculo pastel por padrão.

### 5. Profundidade tátil

A profundidade deve lembrar elementos físicos/pressionáveis.

Preferir:

- borda inferior sólida de 4–6 px em tom mais escuro do próprio elemento;
- deslocamento visual discreto no pressed;
- mudança de preenchimento/contraste ao pressionar;
- hierarquia de superfície clara.

Evitar:

- drop shadow cinza difusa em tudo;
- glassmorphism;
- blur decorativo;
- gradiente genérico azul/roxo;
- elevação Material genérica aplicada indiscriminadamente.

## Iconografia

Ícones devem ser simples, grossos, arredondados e visualmente consistentes.

Regras:

- stroke aproximadamente 2.25–2.75 px;
- cantos arredondados;
- tamanho confortável para mobile;
- ícone pode ser azul sobre fundo neutro ou fazer parte do próprio bloco;
- não colocar automaticamente todos os ícones em `IconTile` pastel;
- evitar dezenas de ícones com exatamente o mesmo container e peso visual;
- ícone deve ajudar a reconhecer a ação, não existir apenas como decoração.

Lucide pode ser usado como base técnica, mas sua apresentação precisa ser customizada para a identidade V2. O simples uso de Lucide + quadrado azul-claro não constitui design aprovado.

## Navegação inferior

A navegação principal deve parecer parte da identidade do app.

Direção:

- 5 destinos principais, quando a arquitetura exigir: Início, Planejamento, Turmas, Arquivos, Mais;
- ícone ativo preenchido ou com peso visual claramente maior;
- label ativo em azul principal;
- inativos em azul acinzentado;
- barra clara, limpa e integrada ao fundo;
- respeitar safe area;
- alvo de toque >= 48 px;
- não usar divisões ou contornos excessivos.

## Home

A Home precisa parecer uma superfície viva de trabalho, não uma grade de atalhos.

Ela deve responder rapidamente:

1. O que está acontecendo hoje?
2. O que precisa da minha atenção?
3. Qual é a próxima ação útil?

Estrutura preferida:

- saudação curta e humana;
- contexto do dia/turma;
- um bloco editorial ou contextual forte quando útil;
- aula do dia como elemento de destaque;
- ações rápidas secundárias com variação de composição, não oito cards idênticos;
- atividade recente em lista compacta;
- informação útil acima de decoração.

A Home NÃO deve ser reconstruída como:

`header -> grade 2xN de cards com ícone/título/subtítulo -> mais cards -> bottom nav`.

Se quatro ações rápidas forem necessárias, elas podem existir, mas precisam parecer parte de uma composição intencional e não um starter kit de dashboard.

## Planejamento / Aula do dia

Fluxos de planejamento devem ser mais densos e focados em execução.

Direção:

- header contextual com data;
- seletor de dias compacto e tátil;
- conteúdo da aula em superfície principal única ou poucas superfícies bem hierarquizadas;
- informações pedagógicas organizadas em seções claras;
- chips para materiais/habilidades quando realmente são itens selecionáveis;
- CTA principal forte no final do fluxo;
- próximas aulas em lista simples e escaneável.

Evitar transformar cada campo do plano em um card separado.

## Turma / Frequência

Telas de turma devem priorizar velocidade operacional.

Direção:

- título da turma + contexto;
- tabs compactas para Visão do dia / Alunos / Frequência / Registros quando fizer sentido;
- resumo de status com semântica visual clara;
- busca integrada;
- lista de alunos densa, legível e rápida de operar;
- status de presença/falta visível, mas sem transformar toda linha em um card;
- ações de salvar/adiar fixas ou claramente acessíveis quando necessário.

## Ilustração e personagens

- Não usar mascote permanente.
- Não usar coruja/personagem-mascote.
- Ilustração humana estilizada pode ser usada em momentos editoriais, onboarding, sucesso, ajuda e empty states importantes.
- Estilo desejado: Soft 3D Educational / Clay-like / stylized friendly character.
- Ilustração deve apoiar narrativa e emoção; não decorar cada tela utilitária.

## Anti-genérico — rejeição automática de direção

Uma solução visual deve ser revista se depender principalmente de qualquer combinação destes padrões:

- `ícone em quadrado pastel + título + subtítulo` repetido em série;
- grid 2xN de quick actions iguais;
- card branco arredondado para praticamente toda informação;
- título grande + subtítulo + cards + CTA como estrutura universal;
- bento grid decorativo;
- glassmorphism;
- gradiente roxo/azul genérico;
- excesso de badges/pills;
- sombra cinza em todo componente;
- ícones todos dentro do mesmo container colorido;
- grandes áreas vazias sem função;
- mesma composição visual em Home, Turma, Planejamento e Arquivos;
- componentes bonitos isoladamente, mas sem hierarquia de produto.

"Limpo", "moderno" e "consistente" não bastam. A tela precisa ter personalidade reconhecível.

## Ritmo e composição

- Priorizar uma ação ou informação dominante por estado.
- Variar escala e tratamento de superfícies de acordo com importância.
- Misturar blocos editoriais, listas, seções abertas, controles e cards intencionalmente.
- Evitar que todos os elementos tenham o mesmo radius, tamanho e preenchimento visual na mesma tela.
- Usar espaço em branco para separar hierarquia, não para esvaziar a tela.
- Telas utilitárias podem ser densas sem parecer desorganizadas.

## Motion

Motion deve comunicar causa e efeito.

Usar para:

- pressed state;
- seleção;
- confirmação;
- expansão/recolhimento;
- mudança de etapa;
- conclusão;
- feedback de salvamento;
- navegação contextual.

Evitar animação ornamental contínua. Respeitar `prefers-reduced-motion`.

## Controles

- Área de toque mínima: 48x48 px.
- Estados: default, pressed, focused, disabled e loading quando aplicável.
- Contraste suficiente.
- Foco visível.
- Não depender apenas de cor para estado.
- CTAs principais devem ter presença forte e tátil.

## Como Codex deve trabalhar

Para qualquer PR visual relevante:

1. Ler `AGENTS.md`, `docs/DESIGN_AUTHORITY.md`, `docs/DESIGN_SUPERVISION_WORKFLOW.md` e este arquivo.
2. Identificar quais partes da UI atual são apenas legado visual e podem ser descartadas.
3. Descrever rapidamente o problema visual/UX antes da implementação.
4. Implementar a nova composição, não apenas trocar tokens.
5. Capturar screenshots reais em 360, 390 e/ou 430 px conforme o fluxo.
6. Incluir antes/depois.
7. Mostrar estados relevantes.
8. Comparar contra a seção Anti-genérico.
9. Revisar acessibilidade e targets de 48 px.
10. Só considerar pronto após gate visual.

## Teste de aprovação rápida

Antes de aprovar uma tela, perguntar:

- Parece claramente um produto para professores?
- Parece o mesmo produto nas diferentes áreas sem todas as telas serem iguais?
- Há uma assinatura visual além de `cards arredondados + azul`?
- A informação importante aparece antes dos atalhos genéricos?
- A tela continuaria reconhecível sem o nome do app no topo?
- Há alguma parte que parece saída diretamente de um UI kit ou dashboard template?

Se a última resposta for "sim", revisar antes de aprovar.

## Precedência

1. Decisões explícitas do usuário.
2. `docs/DESIGN_AUTHORITY.md`.
3. Este `docs/VISUAL_IDENTITY_V2.md`.
4. `docs/DESIGN_SUPERVISION_WORKFLOW.md`.
5. Componentes e estilos existentes no código.

Nenhum componente legado tem autoridade para bloquear a V2.
