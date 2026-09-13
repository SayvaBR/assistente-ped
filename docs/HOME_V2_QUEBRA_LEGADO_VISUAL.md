# HOME V2 — Quebra explícita com o legado visual

> **Status:** decisão de produto aprovada  
> **Prioridade:** P0 Visual / Fundação V2  
> **Escopo imediato:** Home como prova principal da Fundação Visual V2  
> **Objetivo:** preservar o produto funcional e romper deliberadamente com a arquitetura visual antiga

---

## 1. Decisão executiva

A **Home atual está formalmente reprovada como baseline visual**.

Ela pode continuar sendo usada para entender e preservar:

- dados;
- repositories;
- domain logic;
- ações;
- estados;
- persistência;
- comportamento offline;
- navegação funcional;
- requisitos de acessibilidade;
- integrações existentes;
- regras de negócio.

Ela **não deve ser usada como referência de**:

- layout;
- composição;
- hierarquia;
- ritmo;
- arquitetura visual;
- padrão de cards;
- iconografia;
- spacing;
- densidade;
- linguagem de superfície;
- identidade.

A V2 não é um facelift da Home existente.  
É uma **reconstrução estrutural da interface**, conectada à lógica real do produto.

---

## 2. Precedência de autoridade

Em caso de conflito, obedecer nesta ordem:

1. decisão explícita mais recente do produto/usuário;
2. `docs/DESIGN_AUTHORITY.md`;
3. `AGENTS.md`;
4. documentação `docs/design-v2/` e a spec correspondente;
5. `docs/VISUAL_IDENTITY_V2.md`;
6. `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
7. implementação legada.

Uma regra antiga não pode bloquear uma decisão mais recente.

Se algum documento histórico ainda sugerir preservação de arquitetura visual antiga, mascote, grid genérico, monetização antiga ou onboarding superado, registrar a divergência e seguir a autoridade atual.

---

## 3. Proibição de redesign incremental

Não tratar a Home atual como algo a ser “modernizado” mantendo a mesma estrutura.

É insuficiente alterar somente:

- cores;
- radius;
- sombra;
- fonte;
- spacing;
- ícones;
- bordas;
- pequenos detalhes de CSS.

Se a arquitetura continuar igual, o redesign falhou.

A V2 deve reconsiderar:

- prioridade das informações;
- ordem das ações;
- agrupamento;
- densidade;
- contraste de peso visual;
- composição;
- navegação;
- estados;
- feedback;
- comportamento;
- motion.

---

## 4. Componentes e padrões legados não têm autoridade visual

Elementos como:

- `Card`;
- `IconTile`;
- composições herdadas de `recovered.js`;
- grids de atalhos;
- listas lineares repetitivas;
- cards brancos para toda informação;

podem continuar existindo temporariamente por compatibilidade funcional, mas **não devem ditar a linguagem da V2**.

Não reutilizar uma abstração apenas porque ela já existe.

Se uma primitive antiga força a interface a parecer genérica, substituí-la por uma primitive V2.

### Aposentar progressivamente como linguagem dominante

- grid 2×N de atalhos;
- oito atalhos equivalentes na Home;
- repetição de `Card`;
- repetição de `IconTile`;
- `ícone + título + subtítulo + chevron` como padrão universal;
- dashboard SaaS;
- todos os blocos com peso visual semelhante;
- listas lineares como única forma de composição;
- mascote na Splash;
- herança visual direta do layout contido em `recovered.js`.

---

## 5. A nova Home: “mesa de trabalho digital do professor”

A Home não é uma tela de atalhos.

Ela deve responder rapidamente:

1. Onde estou e qual é meu contexto?
2. O que acontece agora?
3. Qual é a próxima ação mais importante?
4. O que preciso resolver hoje?
5. O que vem depois?

### Estrutura conceitual aprovada

`Header/contexto`
→ `Próxima aula ou próxima ação dominante`
→ `Ações contextuais`
→ `Agenda / planejamento`
→ `Pendências`
→ `Atividade recente com peso reduzido`
→ `BottomNavigation V2`

Essa estrutura é conceitual. Não transformar cada item em um card.

Variar intencionalmente:

- superfície;
- densidade;
- altura;
- alinhamento;
- ritmo;
- peso tipográfico;
- forma de interação;
- profundidade.

---

## 6. Direção visual obrigatória

A Home V2 deve expressar a identidade aprovada:

- azul e branco como assinatura dominante;
- fundo azul-claro respirável;
- azul vivo para ações;
- navy para texto;
- tipografia arredondada, forte e expressiva;
- superfícies claras e táteis;
- profundidade via borda/depth controlada;
- iconografia consistente e arredondada;
- hierarquia visual forte;
- caráter amigável e profissional;
- boa densidade para trabalho real;
- identidade própria reconhecível.

### Rejeitar

- aparência de template React;
- dashboard SaaS genérico;
- starter kit mobile;
- grid de cards repetidos;
- bento decorativo;
- glassmorphism;
- gradiente genérico;
- sombra difusa universal;
- excesso de pills;
- ícones Lucide em quadradinhos coloridos repetidos;
- áreas vazias sem função;
- composição que poderia pertencer a qualquer app de produtividade.

---

## 7. Referências externas

Apple HIG, SwiftUI, `ui-ux-pro-max`, Duolingo, Kinetics, Animate UI, AnimateIcons, Rare UI e demais referências podem orientar princípios de qualidade.

Elas **não substituem a autoridade do produto**.

Apple HIG é referência de princípio, não de plataforma.  
O produto continua sendo Android/Capacitor.

Usar referências para melhorar:

- continuidade;
- causalidade;
- feedback;
- motion;
- clareza;
- hierarquia;
- acessibilidade.

Não copiar padrões iOS que entrem em conflito com Android ou com a identidade V2.

---

## 8. Motion na Home

A Home deve ser a primeira prova real do Motion System V2.

Implementar de forma controlada:

- resposta física discreta de botões;
- navegação com indicador coerente;
- transições causais;
- shared geometry quando fizer sentido;
- microfeedback de estado;
- Reduced Motion;
- haptic apenas onde definido;
- animações interrompíveis quando aplicável.

Motion não é decoração.

Toda animação precisa explicar pelo menos um destes pontos:

- causalidade;
- continuidade espacial;
- mudança de estado;
- manipulação;
- confirmação.

Não usar:

- bounce em tudo;
- fade universal em rotas;
- partículas permanentes;
- efeitos de showcase;
- movimento que atrase a tarefa.

---

## 9. Splash

A Splash com mascote está reprovada.

Não usar:

- coruja;
- mascote;
- personagem recorrente como identidade permanente.

Se houver ilustração humana, ela é narrativa e eventual.

A marca precisa funcionar sem personagem.

---

## 10. Estratégia de implementação

A implementação deve acontecer em branch da Issue #5 que reúna:

- baseline funcional mais recente;
- Android;
- testes;
- repositories/domain;
- persistência;
- billing;
- documentação V2;
- Motion System;
- Growth System;
- autoridade de design atualizada.

Não implementar sobre branch somente-documentação.

### Processo recomendado

1. `git fetch origin`;
2. partir do baseline funcional mais recente;
3. integrar documentação V2 atual;
4. resolver conflitos deliberadamente;
5. garantir que `package.json`, `src/`, `android/`, `tests/`, `docs/DESIGN_AUTHORITY.md` e documentação V2 coexistam;
6. rodar build/testes antes de alterar UI;
7. construir/ajustar primitives V2 necessárias;
8. criar a nova Home V2;
9. conectar dados e lógica reais;
10. validar estados;
11. anexar evidências;
12. parar para Design Review.

Não fazer merge automático em `main`.

---

## 11. Opção técnica preferida

Se reformar a Home legado internamente continuar impondo restrições estruturais, criar uma **nova implementação de Home V2 separada** e conectar progressivamente:

- repositories;
- selectors;
- dados;
- navegação;
- estados;
- offline;
- loading;
- erros.

Isso é preferível a deformar indefinidamente a arquitetura antiga.

A lógica funcional sobrevive.  
A arquitetura visual antiga, não.

---

## 12. Estados obrigatórios da Home

A prova da Home V2 deve incluir, quando aplicável:

- próxima aula;
- sem próxima aula;
- chamada pendente;
- chamada concluída;
- agenda populada;
- agenda vazia;
- pendências;
- atividade recente;
- loading;
- erro parcial recuperável;
- offline;
- dados incompletos;
- Reduced Motion;
- texto maior/acessibilidade quando suportado.

Nenhum estado pode depender somente de cor.

---

## 13. Gate visual

A Home só pode ser apresentada como candidata à aprovação quando houver:

- screenshot antes;
- screenshot depois;
- 360 px;
- 390 px;
- 430 px;
- estados principais;
- gravação das microinterações relevantes;
- Reduced Motion;
- touch targets >= 48 px;
- contraste adequado;
- build;
- testes;
- observação de Android real quando aplicável;
- lista de componentes V1 aposentados ou em migração.

### Pergunta obrigatória

> Se retirarmos o nome “Assistente Pedagógico” da tela, esta interface ainda possui identidade própria suficiente para ser reconhecida como parte deste produto?

Se a resposta for **não**, continuar refinando.

“Funciona” não basta.

---

## 14. Critério de conclusão desta rodada

Quando a Home V2 estiver implementada e as evidências estiverem no PR, publicar exatamente:

> **READY FOR DESIGN REVIEW — HOME V2**

Depois disso:

- não expandir o redesign para todas as telas;
- não declarar aprovação visual;
- não fazer merge em `main`;
- aguardar revisão.

---

## 15. Intenção final

Esta mudança é deliberada:

> **Preservar o produto funcional, mas romper com a arquitetura visual antiga.**

A Home V2 é a prova principal de que a Fundação Visual V2 consegue produzir uma interface autoral, tátil, clara, profissional e reconhecível — sem depender dos padrões genéricos do legado.
