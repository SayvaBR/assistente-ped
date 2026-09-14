---
name: assistente-pedagogico-ui-screen-craft
description: >
  Skill obrigatória para criar, reconstruir e revisar telas do Assistente Pedagógico
  no nível visual V2 aprovado. Use sempre que implementar UI, redesign, layout,
  componentes visuais, estados, motion ou quando houver screenshot/referência visual.
version: 1.0.0
language: pt-BR
---

# Assistente Pedagógico — UI Screen Craft Skill

Esta skill existe por um motivo simples:

> **“Funciona” não basta.**

O Assistente Pedagógico precisa atingir um nível visual, tátil e comportamental próximo das referências aprovadas pelo produto. A implementação não pode recair em dashboard genérico, starter kit, Material default, SaaS mobile ou “UI correta porém sem alma”.

Esta skill deve ser usada como **procedimento operacional de geração de telas** pelo Codex.

---

# 0. Regra de autoridade

Antes de criar qualquer tela, obedecer esta ordem:

1. decisão explícita mais recente do usuário/produto;
2. `docs/DESIGN_AUTHORITY.md`;
3. `AGENTS.md`;
4. esta skill;
5. `docs/design-v2/` e a especificação de tela correspondente;
6. `docs/VISUAL_IDENTITY_V2.md`;
7. `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
8. código legado.

Referências externas como Apple HIG, SwiftUI, `ui-ux-pro-max`, Duolingo, Rare UI, Animate UI, Kinetics, screenshots de outros apps e bibliotecas são **repertório auxiliar**, não autoridade.

Quando houver screenshot/mockup explicitamente aprovado pelo usuário, ele se torna **referência visual positiva prioritária** para aquela tela ou família de telas.

---

# 1. Objetivo visual

Cada tela precisa parecer parte de um produto com linguagem própria.

A pergunta de controle é:

> **Se removermos o nome “Assistente Pedagógico”, esta tela ainda parece pertencer ao mesmo produto das referências aprovadas?**

Se a resposta for “não”, a tela ainda não está pronta.

A segunda pergunta é:

> **Se colocarmos a implementação ao lado da referência aprovada, a diferença parece apenas de conteúdo/estado ou parece que foram feitas por dois produtos diferentes?**

Se parecer outro produto, refazer.

---

# 2. DNA visual positivo — o que construir

A direção não é apenas “evitar o genérico”. Existe uma linguagem positiva que deve aparecer.

## 2.1 Personalidade

A interface deve parecer:

- amigável;
- profissional;
- tátil;
- arredondada;
- otimista;
- expressiva;
- limpa;
- altamente legível;
- feita especificamente para professores;
- divertida sem infantilizar;
- polida sem parecer luxuosa/financeira;
- moderna sem parecer experimental.

Palavras-chave:

> **Friendly Professional + Tactile + Candy UI + Motion-led + Educational**

Evitar interpretação “editorial corporativa”, “fintech”, “enterprise productivity” ou “minimalismo suíço”.

---

# 3. Paleta e equilíbrio de cor

## 3.1 Base

A assinatura visual é:

- ambiente/fundo: azul céu muito claro;
- superfícies de trabalho: principalmente branco;
- superfícies secundárias: azul muito claro;
- ação primária: azul vivo;
- profundidade/pressed: azul mais escuro;
- texto: navy forte;
- semânticas: verde, vermelho e amarelo somente quando têm significado real.

Referência conceitual da família V2:

- background próximo de `#DDF4FF`;
- primary próximo de `#1CB0F6`;
- primary depth/pressed próximo de `#1899D6`;
- surfaces brancas;
- texto navy profundo.

Não usar esses valores como hardcode isolado se tokens oficiais já existirem. Consumir tokens.

## 3.2 Regra de balanço

A tela deve parecer majoritariamente:

> **azul-claro do ambiente + superfícies brancas + azul vivo em pontos de foco**

Não pintar grandes áreas da interface inteira de azul sem necessidade.

O azul forte deve criar foco, não saturar a tela.

## 3.3 Cor semântica

Pode usar:

- verde para presença/sucesso;
- vermelho para falta/erro;
- amarelo para pendência/atenção;
- roxo apenas quando houver uma categoria real que precise ser distinguida.

Nunca usar cor sem significado apenas para “deixar bonito”.

---

# 4. Tipografia

## 4.1 Direção

Usar tipografia:

- arredondada;
- geométrica;
- robusta;
- amigável;
- com presença;
- excelente leitura mobile.

A família deve lembrar o caráter de Duolingo/Feather/Nunito Sans bem trabalhado, sem copiar marca externa.

## 4.2 Hierarquia

Hierarquia típica:

- display/hero: forte, expressivo;
- título de tela: grande e amigável;
- heading de seção: forte, direto;
- body: legível, sem excesso de peso;
- metadata: menor e mais suave.

## 4.3 Proibido como linguagem dominante

Evitar:

- títulos finos;
- typography “enterprise”;
- excesso de CAIXA ALTA;
- micro-labels com tracking exagerado;
- títulos corporativos como `FOCO DA ROTINA`, `COMANDOS DO DIA`, `MESA DE TRABALHO` em toda tela;
- estética de relatório/fintech.

Pequenos labels em uppercase podem existir pontualmente, mas não podem definir o tom do app.

Prefira linguagem humana:

- `Sua aula de hoje`
- `Para resolver agora`
- `Sua agenda`
- `Atividade recente`
- `Fazer chamada`
- `Registrar observação`

---

# 5. Superfícies e profundidade

## 5.1 Anti-card NÃO significa anti-surface

Cards são permitidos e desejáveis quando representam um objeto real:

- uma aula;
- uma turma;
- um bloco de agenda;
- um seletor;
- um formulário;
- um agrupamento significativo.

O problema é usar o mesmo card para tudo.

## 5.2 Anatomia tátil

Superfícies principais podem usar:

- radius aproximadamente 16–20 px;
- botão/pill totalmente arredondado quando apropriado;
- borda/depth inferior sólida de 4–6 px em elementos pressionáveis relevantes;
- contorno suave;
- superfícies brancas claras;
- sombra somente se necessária e discreta.

A sensação deve ser:

> **“isso parece tocável”**

E não:

> “isso tem uma sombra genérica de template”.

## 5.3 Variedade controlada

Na mesma tela podem coexistir:

- hero dominante;
- pequenos botões táteis;
- rows densas;
- calendário;
- timeline;
- surface branca de formulário;
- chips semânticos;
- lista simples.

Não transformar tudo no mesmo retângulo arredondado.

---

# 6. Iconografia

## 6.1 Direção

Ícones devem ser:

- rounded stroke;
- espessura consistente;
- chunky;
- simples;
- reconhecíveis;
- com presença visual.

## 6.2 Não repetir o padrão starter kit

Evitar como linguagem universal:

> ícone Lucide → quadrado pastel → título → subtítulo → chevron

Esse padrão pode aparecer isoladamente, mas nunca dominar a tela.

## 6.3 Ícones ilustrativos

Em momentos importantes, o objeto pode ser mais rico que um line icon:

- livro;
- tubo de ensaio;
- calendário;
- pasta;
- grupo;
- sino;
- documento.

Pode usar pequenos objetos 3D/soft-clay/illustrative quando fizer sentido e quando a referência visual pedir isso.

---

# 7. Ilustrações

## 7.1 Permitido

Ilustração humana estilizada pode aparecer em:

- onboarding;
- primeiro sucesso;
- ajuda;
- empty state importante;
- hero editorial;
- momento de boas-vindas.

## 7.2 Proibido

Não criar:

- mascote permanente;
- coruja;
- personagem que aparece em todas as telas;
- identidade dependente de personagem.

A marca precisa funcionar sem mascote.

## 7.3 Estilo

Quando houver ilustração:

- soft 3D;
- stylized 3D;
- clay-like;
- limpa;
- amigável;
- coerente com azul/branco.

---

# 8. Arquitetura visual

Antes de escrever JSX, definir:

1. qual é o objeto dominante da tela;
2. qual é a ação principal;
3. quais informações precisam ser vistas em 3 segundos;
4. quais informações são secundárias;
5. quais estados mudam a composição;
6. qual padrão de interação melhor representa o domínio.

Não começar pelo componente. Começar pela tarefa.

---

# 9. Método obrigatório de criação de uma tela

## Etapa A — entender a função

Antes de codificar, responder internamente:

- O que o professor veio fazer aqui?
- Qual é o momento da rotina?
- Qual é a decisão mais importante?
- Qual é o dado mais importante?
- O que pode esperar?
- Qual erro pode acontecer?
- O que precisa funcionar offline?

## Etapa B — localizar autoridade

Ler:

- spec da tela;
- componentes V2;
- Motion System;
- Runtime Resource Map;
- reference screenshot, se houver.

## Etapa C — separar legado funcional do visual

### Preservar

- repositories;
- domain logic;
- dados;
- validações;
- storage;
- offline;
- navegação funcional;
- billing;
- privacidade;
- estados.

### Pode reconstruir

- JSX;
- layout;
- CSS;
- componente visual;
- composição;
- hierarquia;
- agrupamentos;
- iconografia;
- motion.

## Etapa D — definir composição antes do código

Descrever em 5–10 linhas:

- topo;
- objeto dominante;
- ações contextuais;
- conteúdo;
- navegação;
- estados.

Se a descrição parece `title + subtitle + 4 cards + CTA`, parar e repensar.

## Etapa E — implementar com primitives V2

Não criar styling ad hoc se já existe token/primitive equivalente.

## Etapa F — renderizar cedo

Após a primeira composição funcional, gerar screenshot.

Não continuar refinando às cegas no código.

## Etapa G — comparar com referência

Fazer revisão visual lado a lado.

Perguntar:

- escala está correta?
- densidade está correta?
- identidade está correta?
- cor está equilibrada?
- parece tátil?
- parece amigável?
- parece o mesmo produto?
- o objeto dominante realmente domina?

## Etapa H — refinar

Refazer layout se necessário.

Não tentar salvar arquitetura ruim com CSS.

---

# 10. Quando existir screenshot de referência

Screenshot aprovado é target visual, não inspiração vaga.

## 10.1 O que reproduzir

Reproduzir com alta fidelidade:

- hierarquia;
- proporção;
- distribuição;
- peso visual;
- ritmo;
- radius;
- densidade;
- balanço de cor;
- posição relativa de elementos;
- sensação de profundidade;
- presença de ícones;
- tipo de superfície;
- comportamento esperado.

## 10.2 O que NÃO fazer

Não:

- “interpretar livremente” a referência;
- transformá-la em outra tendência visual;
- simplificar até virar layout genérico;
- trocar cards táteis por linhas corporativas;
- trocar tipografia amigável por uppercase editorial;
- remover elementos expressivos só porque não são estritamente necessários;
- usar default Material/Tailwind se isso mudar o DNA.

## 10.3 Não usar a imagem como implementação

Não inserir screenshot inteiro como background/imagem da UI.

A tela precisa ser implementada em React/CSS/componentes reais.

---

# 11. Home — regra especial

A Home é a “mesa de trabalho digital do professor”.

Ela deve responder:

1. qual é meu contexto?
2. o que acontece agora?
3. o que devo fazer primeiro?
4. o que tenho depois?
5. o que ficou pendente?

Estrutura típica:

- greeting/contexto;
- turma/contexto atual;
- próxima aula ou próxima ação dominante;
- ações úteis;
- agenda;
- pendências;
- atividade recente;
- bottom navigation.

## 11.1 O hero da Home

O hero principal deve parecer um **objeto de trabalho importante**.

Pode incluir:

- assunto da aula;
- turma;
- status;
- ilustração/objeto relacionado;
- CTA tátil;
- progress/status semanticamente útil.

Não transformar o hero em:

- KPI;
- card corporativo;
- gráfico abstrato;
- bloco SaaS com círculos decorativos.

---

# 12. Telas densas

Chamada, alunos, arquivos e planejamento não devem perder eficiência para ficarem bonitas.

Usar:

- rows compactas;
- agrupamento claro;
- status semântico;
- busca;
- filtros;
- seleção;
- sticky actions quando necessário.

A identidade V2 precisa sobreviver em tela operacional real.

---

# 13. Formulários

Formulário não precisa parecer backoffice.

Usar:

- sections claras;
- labels amigáveis;
- inputs grandes o bastante;
- selected states expressivos;
- radio/segment/toggle com feedback visual;
- CTA forte;
- validação inline.

Evitar uma pilha monótona de inputs idênticos quando escolhas visuais melhoram compreensão.

---

# 14. Calendário e planejamento

Dia/Semana/Mês fazem parte do mesmo objeto mental.

A implementação deve favorecer continuidade:

- seleção de data;
- indicador que se move;
- layouts coerentes;
- transições de shared geometry quando viável.

Evitar três telas visualmente desconectadas.

---

# 15. Bottom Navigation

Destinos oficiais:

- Início;
- Planejamento;
- Turmas;
- Arquivos;
- Mais.

Regras:

- estado ativo óbvio;
- ícones consistentes;
- área tocável >= 48 px;
- boa safe area;
- não parecer Material default;
- não parecer barra de website.

O item ativo pode usar:

- cor;
- background sutil;
- micro-motion;
- mudança de peso do ícone.

Sem bounce exagerado.

---

# 16. Motion

Motion é parte da arquitetura.

## 16.1 Sempre responder

Uma animação deve explicar:

- causa;
- destino;
- origem;
- mudança;
- confirmação;
- manipulação.

## 16.2 Interações esperadas

Quando aplicável:

- button press com compressão discreta;
- tabs com indicador móvel;
- selected states com spring;
- cards/objetos abrindo com continuidade;
- FAB contextual;
- contador mudando suavemente;
- success state transformando o próprio controle.

## 16.3 Reduced Motion

Toda interação espacial relevante precisa de fallback.

Nunca bloquear função por motion.

---

# 17. Haptics

Usar somente quando houver significado:

- selection;
- light impact;
- success;
- warning/error.

Não vibrar a cada toque.

Haptic nunca deve antecipar sucesso real.

---

# 18. Acessibilidade

Obrigatório:

- touch target >= 48×48;
- contraste adequado;
- texto escalável;
- foco perceptível;
- estado não comunicado apenas por cor;
- teclado quando aplicável;
- Reduced Motion;
- gestures com alternativa;
- labels acessíveis.

Uma tela visualmente linda que falha acessibilidade não passa.

---

# 19. Mobile primeiro

A referência é mobile real.

Testar no mínimo:

- 360 px;
- 390 px;
- 430 px.

Verificar:

- safe areas;
- teclado;
- scroll;
- bottom nav;
- CTA fixo;
- textos longos;
- notch/status bar;
- orientação quando relevante.

Nunca construir desktop e “encolher” depois.

---

# 20. Anti-patterns de rejeição imediata

Uma tela deve ser refeita se usa de forma dominante:

- grid 2×N de cards;
- card branco arredondado para tudo;
- icon tile repetido;
- `ícone + título + subtitle + chevron` em sequência;
- uppercase editorial em todas as seções;
- hero corporativo;
- KPI dashboard;
- bento;
- glassmorphism;
- gradient roxo/azul;
- soft shadow universal;
- default Tailwind;
- default Material;
- excesso de pills;
- excesso de whitespace;
- falta de objeto dominante;
- falta de contraste de hierarquia;
- visual que poderia pertencer a qualquer productivity app;
- aparência de template gerado por IA.

---

# 21. Checklist de autoavaliação visual — antes de mostrar ao usuário

Dar nota de 0 a 10 para cada item:

| Critério | Mínimo |
|---|---:|
| Fidelidade à referência aprovada | 8 |
| Identidade própria do produto | 8 |
| Hierarquia | 8 |
| Tipografia | 8 |
| Balanço de cor | 8 |
| Tatilidade | 8 |
| Clareza funcional | 9 |
| Densidade mobile | 8 |
| Acessibilidade | 9 |
| Consistência com V2 | 9 |
| Motion/reação ao toque, quando aplicável | 8 |
| Sensação de produto premium | 8 |

Se qualquer item estrutural ficar abaixo do mínimo, não marcar como pronto.

Não inflar nota para encerrar tarefa.

---

# 22. Teste de comparação lado a lado

Quando houver screenshot target:

1. abrir target;
2. abrir implementação;
3. comparar visualmente;
4. observar em 3 segundos;
5. listar 5 maiores diferenças;
6. corrigir as diferenças de maior impacto;
7. repetir.

Ordem de impacto:

1. composição;
2. proporção;
3. hierarquia;
4. tipografia;
5. cor;
6. superfícies;
7. iconografia;
8. spacing;
9. microdetalhes.

Não gastar tempo afinando 2 px se a composição inteira está errada.

---

# 23. Evidências obrigatórias

Para UI relevante:

- screenshot antes;
- screenshot depois;
- 360;
- 390;
- 430;
- estados relevantes;
- loading;
- empty;
- error;
- offline quando aplicável;
- disabled;
- focus;
- pressed.

Para motion:

- gravação curta;
- Reduced Motion;
- token/spring usado;
- ida e volta de shared transition;
- performance em Android real quando aplicável.

---

# 24. Nunca declarar aprovação própria

Ao finalizar uma tela importante:

> **READY FOR DESIGN REVIEW — <NOME DA TELA>**

Depois parar a expansão visual e aguardar revisão.

O agente não pode declarar a tela “aprovada” apenas porque compila ou porque cumpriu seu próprio checklist.

---

# 25. Regras técnicas

- React + TypeScript + Vite + Capacitor Android permanecem stack.
- Não migrar para SwiftUI/Flutter/React Native sem decisão explícita.
- Preservar domínio e repositories.
- Não duplicar lógica já existente sem necessidade.
- Não quebrar storage.
- Não quebrar offline.
- Não alterar billing sem spec.
- Não enviar aluno/dados pedagógicos para analytics.
- Não criar UI falsa para backend inexistente.
- Não usar mock data em produção quando existe fonte real.
- Não mostrar sucesso antes de operação confirmar.

---

# 26. Como agir quando o legado impede a V2

Se uma abstração legada impedir fidelidade visual:

1. mapear o comportamento funcional que ela entrega;
2. separar lógica da apresentação;
3. criar nova primitive/componente V2;
4. conectar a mesma lógica;
5. testar;
6. aposentar o componente visual antigo progressivamente.

Não deformar a V2 para caber no legado.

---

# 27. Como agir quando a documentação conflita

Não escolher silenciosamente.

Aplicar a precedência da seção 0.

Se a decisão explícita mais recente já está clara:

- seguir a decisão;
- atualizar/documentar conflito no PR.

Se houver risco em:

- billing;
- segurança;
- privacidade;
- perda de dados;
- migração;
- LGPD;

parar e pedir decisão.

---

# 28. Qualidade esperada

A tela deve atingir a sensação:

> **“isso foi desenhado, não montado.”**

Ela deve parecer:

- intencional;
- viva;
- amigável;
- controlada;
- coerente;
- polida.

O objetivo não é fazer a UI “bonita o suficiente”.

O objetivo é atingir o nível de referência visual aprovado para que o Assistente Pedagógico tenha uma linguagem reconhecível.

---

# 29. Regra final

Quando houver dúvida entre:

- preservar um layout antigo funcional;
- reconstruir visualmente mantendo a lógica;

preferir:

> **preservar a lógica e reconstruir o visual.**

Quando houver dúvida entre:

- uma solução genérica segura;
- uma solução autoral coerente com a V2;

preferir:

> **a solução autoral, desde que acessível, clara, performática e funcional.**

E sempre lembrar:

> **Anti-genérico não significa austero.  
> Anti-card não significa anti-surface.  
> Profissional não significa corporativo.  
> Playful não significa infantil.  
> Polido não significa cheio de efeitos.  
> Referência aprovada não é sugestão vaga.**
