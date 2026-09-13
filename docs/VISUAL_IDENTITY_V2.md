# Assistente Pedagógico — Visual Identity V2

## Objetivo

Transformar o Assistente Pedagógico de uma interface genérica em um produto com personalidade própria, memorável, acolhedora e profissional, sem perder clareza nem eficiência.

A referência não é “parecer com outro app”. A referência é criar uma linguagem que faça sentido para a rotina docente e seja reconhecível como Assistente Pedagógico.

## Anti-referência explícita

A composição abaixo é considerada um anti-pattern para a V2:

- grade de cards brancos arredondados;
- um ícone colorido no topo;
- um título curto;
- subtítulo cinza;
- uma seta/chevron;
- todos os cards com o mesmo peso visual;
- espaçamento e hierarquia praticamente idênticos entre funções diferentes.

Esse padrão pode até ser funcional, mas deixa o produto com aparência de template genérico. Não deve ser usado como linguagem principal da Home, navegação ou hubs de funcionalidades.

Cards continuam permitidos quando representarem uma unidade real de conteúdo ou interação, mas não devem substituir arquitetura de informação, hierarquia ou personalidade.

## Princípios de personalidade

### 1. Acolhedor, não infantilizado

O produto pode ser amigável, tátil e expressivo sem parecer brinquedo. O usuário é professor: a interface deve respeitar sua carga de trabalho e transmitir organização, confiança e leveza.

### 2. Táctil e evidente

Ações devem parecer acionáveis. Botões, tabs, chips e elementos interativos precisam ter estados claros e sensação física suficiente para reduzir ambiguidade.

### 3. Pedagógico sem clichê

Evitar lousa, lápis, maçã, mascote e decoração escolar como substitutos de identidade. A personalidade vem do sistema visual, do ritmo, da linguagem e da organização da informação.

### 4. Calmo, mas não neutro

A base deve ser limpa e respirável, porém com contraste, hierarquia e assinatura suficientes para não parecer um template.

### 5. Denso quando necessário

Professor lida com muita informação. Nem toda tela deve ser “minimalista”. O objetivo é densidade organizada, com progressão visual clara.

## Direção visual

A direção-base é uma evolução da linguagem já explorada para o projeto:

- superfícies claras;
- predominância de azuis e branco como assinatura principal;
- formas arredondadas, mas não excessivamente fofas;
- componentes táteis;
- contraste de profundidade por borda/estado quando fizer sentido;
- tipografia forte, amigável e muito legível;
- iconografia consistente e de traço claro;
- uso comedido de ilustração.

Isso não é uma obrigação de copiar o design antigo. É uma fundação para uma identidade nova e mais madura.

## Composição: o que fazer no lugar do dashboard genérico

### Home narrativa, não grade de atalhos

A Home deve funcionar como a “mesa de trabalho digital” do professor. Em vez de apresentar seis funções com o mesmo peso, deve contar a situação do dia.

A composição pode combinar:

- cabeçalho/contexto do dia;
- próximo compromisso ou aula com maior destaque;
- ação primária contextual;
- lista cronológica compacta;
- blocos de status com pesos diferentes;
- ações rápidas inline;
- informações recentes sem obrigatoriamente usar card;
- navegação contextual embutida no conteúdo.

A tela precisa ter áreas com ritmo e função diferentes. Não repetir seis vezes o mesmo container apenas trocando ícone e texto.

### Peso visual variável

Itens prioritários devem parecer prioritários. Informação secundária deve ser visualmente secundária.

Evitar:

- seis cards 1:1 iguais;
- todos os CTAs com o mesmo tamanho;
- todos os títulos com o mesmo peso;
- chevron em todo item;
- ícone decorativo em toda seção;
- excesso de containers apenas para “organizar”.

### Componentes com assinatura

A V2 deve criar componentes próprios para padrões recorrentes, por exemplo:

- bloco de “Próxima aula”;
- faixa de agenda do dia;
- chamada rápida;
- registro rápido de observação;
- bloco de pendências;
- atividade recente;
- seletor de turma/contexto.

Esses componentes não devem ser apenas variações de um `Card` genérico.

## Sistema de composição

### Hierarquia

Cada tela deve deixar evidente:

1. onde o usuário está;
2. qual é a informação principal;
3. qual é a ação principal;
4. quais são as ações secundárias;
5. o que pode esperar.

### Estrutura

Preferir agrupamentos semânticos e ritmo vertical a empilhar cards por padrão.

Cards devem existir quando há uma unidade real de conteúdo ou interação. Separadores, títulos de seção, listas, superfícies agrupadas e blocos inline são igualmente válidos.

### Ação principal

Uma ação primária por estado sempre que possível. Evitar competir com múltiplos CTAs de mesmo peso.

## Foundations a implementar

A primeira implementação da V2 deve criar ou consolidar tokens para:

- cores semânticas;
- tipografia;
- spacing;
- radius;
- bordas;
- estados interativos;
- elevação/depth;
- motion;
- tamanhos de toque;
- iconografia;
- grid/layout mobile.

Valores exatos podem evoluir durante o primeiro fluxo-piloto. O importante é centralizar e documentar, não espalhar magic numbers.

## Cor

Azul e branco continuam como assinatura principal da marca. O sistema pode usar neutros e cores semânticas estritamente funcionais para erro, alerta e sucesso quando necessário para acessibilidade e compreensão.

Evitar arco-íris decorativo e color coding sem significado.

## Tipografia

A tipografia deve:

- ter personalidade suficiente em títulos;
- permanecer excelente em textos longos e dados;
- funcionar bem em Android;
- evitar pesos excessivamente finos;
- usar escala clara entre display, heading, body, label e caption.

Não escolher fonte apenas por “parecer moderna”. Priorizar legibilidade e assinatura visual.

## Iconografia

- família única ou claramente compatível;
- espessura de traço consistente;
- ícone não deve substituir label em ações ambíguas;
- evitar ícones decorativos em círculos por toda a interface;
- evitar o padrão ícone + título + subtítulo + chevron repetido em grade;
- ícone deve ajudar orientação e reconhecimento, não apenas preencher espaço.

## Motion

Motion deve reforçar causalidade e estado:

- pressed;
- seleção;
- expansão;
- navegação;
- confirmação;
- progresso.

Evitar animação ornamental que atrase o fluxo do professor.

## Home como fluxo-piloto

A Home será a primeira tela usada para provar a V2.

Ela deve responder rapidamente:

- O que tenho hoje?
- Qual turma/aula vem agora?
- O que exige ação?
- Como registro chamada/observação rapidamente?
- O que mudou recentemente?

A Home não deve parecer dashboard SaaS genérico. Deve parecer a mesa de trabalho digital de um professor.

## Critérios de rejeição visual

Rejeitar se o resultado:

- puder ser confundido com template genérico;
- usar cards iguais para conteúdos diferentes;
- apresentar uma grade de atalhos como solução principal de arquitetura;
- repetir ícone + título + subtítulo + chevron em série;
- depender de decoração em vez de hierarquia;
- copiar outro produto de maneira evidente;
- esconder função atrás de estética;
- tiver contraste insuficiente;
- usar componentes inconsistentes;
- parecer infantil sem motivo;
- parecer corporativo/frio demais para a proposta;
- não apresentar screenshots reais dos estados relevantes.

## Critérios de aprovação

Um fluxo V2 está pronto para expansão quando:

- funciona ponta a ponta;
- tem hierarquia clara;
- possui assinatura visual consistente;
- é acessível;
- reutiliza foundations/tokens;
- resolve estados não ideais;
- não parece genérico;
- screenshots reais demonstram qualidade em Android;
- componentes aprovados podem ser reutilizados sem perder coerência.

## Regra de evolução

A V2 não é um mockup fechado. É um sistema vivo.

Mudanças são permitidas quando melhorarem o produto, mas qualquer alteração sistêmica deve atualizar tokens/documentação e ser validada no fluxo-piloto antes de se espalhar para o restante do app.
