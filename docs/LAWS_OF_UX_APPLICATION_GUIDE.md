# Laws of UX — Guia de aplicação no Assistente Pedagógico

> Fonte estudada: https://lawsofux.com/
>
> Este documento é uma **adaptação aplicada ao produto**, não uma cópia do site. As leis são tratadas como heurísticas de decisão e revisão, não como regras absolutas.

## 1. Objetivo

Usar princípios de psicologia cognitiva e interação reunidos em Laws of UX para aumentar a qualidade do Assistente Pedagógico sem transformar o produto em um conjunto de “truques de UX”.

A pergunta central continua sendo:

> **Um professor conseguiria confiar neste aplicativo amanhã durante uma aula real?**

As leis abaixo ajudam a responder questões como:

- o professor entende rapidamente o que deve fazer?;
- consegue agir com poucos passos e pouca memória de curto prazo?;
- sabe onde está e como voltar?;
- o sistema assume a complexidade que pode assumir?;
- ações importantes têm prioridade visual adequada?;
- o app responde rápido e dá feedback imediato?;
- a interface mantém identidade própria sem exigir aprendizado desnecessário?;
- o produto reduz trabalho administrativo em vez de criar mais trabalho?;

## 2. Ordem de autoridade

Este guia **não substitui** decisões de produto nem o design system.

Em caso de conflito, obedecer nesta ordem:

1. decisão explícita mais recente do usuário/produto;
2. `docs/PRODUCT_UX_AUTHORITY.md`;
3. `docs/DESIGN_AUTHORITY.md`;
4. regras de privacidade/LGPD, acessibilidade e segurança;
5. este guia;
6. referências externas genéricas.

Uma “lei de UX” nunca autoriza:

- dark patterns;
- urgência falsa;
- progresso falso que engane;
- esconder preço, cancelamento ou consequências;
- coleta desnecessária de dados;
- reduzir acessibilidade para “simplificar”;
- trocar decisões pedagógicas por padrões genéricos de apps.

## 3. Princípios prioritários para este produto

### 3.1 Reduzir carga cognitiva antes de adicionar recursos

Antes de adicionar uma nova ação, perguntar:

- ela precisa aparecer agora?;
- pode ser revelada no contexto certo?;
- pode ser inferida ou preenchida pelo sistema?;
- pode ser agrupada com algo que o professor já entende?;
- pode ser opcional sem comprometer o resultado?;

O professor está frequentemente usando o aplicativo em contexto de interrupção, sala de aula, deslocamento e pouco tempo. O produto deve preservar foco.

### 3.2 Reconhecimento acima de memorização

O app deve lembrar contexto para o usuário.

Exemplos:

- manter turma/data/componente visíveis ao longo do fluxo;
- mostrar breadcrumbs em Arquivos;
- preservar rascunhos e estado de formulários;
- mostrar nomes completos das ações, não depender de ícones obscuros;
- oferecer recentes/favoritos quando isso realmente reduz procura;
- manter navegação consistente entre telas.

### 3.3 Uma ação principal por momento

Não significa “uma ação por tela”. Significa que o próximo passo mais provável precisa ser perceptível sem competir com cinco CTAs equivalentes.

Quando houver várias ações legítimas:

- definir hierarquia primária/secundária/terciária;
- usar progressive disclosure;
- colocar opções raras em contexto, não na primeira camada;
- evitar menus enormes sem busca, filtros ou agrupamento.

### 3.4 O sistema assume complexidade sempre que possível

Se uma informação puder ser derivada com segurança, reutilizada ou preenchida pelo contexto, não obrigar o professor a repetir trabalho.

Exemplos:

- turma implícita ao cadastrar aluno dentro de uma turma;
- data atual preselecionada quando apropriado;
- disciplina/componente herdado quando o contexto for inequívoco;
- “marcar todos” + editar exceções em tarefas repetitivas;
- guardar preferências de visualização;
- reaproveitar plano/atividade como modelo sem reescrever tudo.

### 3.5 Feedback perceptível é obrigatório

Toda ação importante deve responder imediatamente em nível perceptivo, mesmo que o processamento final demore.

Exemplos:

- estado pressionado ao tocar;
- salvar → “Salvo” ou estado equivalente;
- exportar → progresso/estado claro;
- erro → mensagem próxima da ação + próximo passo;
- operação longa → indicador de progresso honesto;
- offline → estado explícito sem bloquear o que ainda pode funcionar localmente.

Não adicionar atraso artificial para “parecer importante”.

## 4. Aplicação das 30 Laws of UX

### 4.1 Aesthetic-Usability Effect — alta relevância

**Ideia aplicada:** uma interface visualmente refinada aumenta a percepção de facilidade e confiança, mas beleza pode esconder problemas reais.

**No Assistente Pedagógico:**

- manter alto padrão visual da V2;
- consistência de tipografia, espaçamento, profundidade e componentes;
- nunca considerar uma tela “boa” apenas porque está bonita;
- QA funcional e QA visual continuam independentes;
- testar tarefas reais mesmo quando o visual parecer excelente.

**Gate:** `DESIGN APPROVED` não substitui testes de fluxo, persistência, offline e acessibilidade.

### 4.2 Choice Overload — alta relevância

**Ideia aplicada:** excesso de escolhas aumenta hesitação e piora a experiência.

**No produto:**

- onboarding com uma decisão por microetapa;
- evitar telas iniciais com dezenas de configurações;
- filtros servem para reduzir conjuntos grandes;
- destacar opção recomendada quando houver justificativa real;
- comparação lado a lado apenas quando a comparação ajuda a decidir.

**Exemplo:** mensal vs anual pode ser comparado claramente; não adicionar planos semanais/lifetime só para aumentar variedade.

### 4.3 Chunking — altíssima relevância

**Ideia aplicada:** agrupar informações relacionadas melhora escaneabilidade e compreensão.

**No produto:**

- plano de aula em blocos pedagógico, metodológico, recursos, avaliação etc.;
- perfil do aluno em informações essenciais, dados adicionais, apoios e histórico;
- configurações agrupadas por significado;
- relatórios agrupados por período/turma/aluno;
- evitar “card para tudo”; agrupamento pode ser feito por espaço, título, fundo ou divisor.

### 4.4 Cognitive Bias — média/alta relevância

**Ideia aplicada:** designers, desenvolvedores e usuários tomam decisões influenciados por atalhos e vieses.

**No produto:**

- não presumir que uma preferência interna representa professores;
- não tratar “eu usaria assim” como evidência;
- revisar linguagem que possa rotular aluno ou induzir julgamento;
- testar decisões importantes com professores reais;
- distinguir observação pedagógica de inferência/diagnóstico.

### 4.5 Cognitive Load — altíssima relevância

**Ideia aplicada:** interface exige recursos mentais limitados; informação desnecessária compete com a tarefa.

**No produto:**

- remover informação ornamental que não ajuda decisão;
- evitar telas com muitos blocos visualmente equivalentes;
- preservar contexto ao navegar;
- explicar termos pedagógicos apenas quando necessário;
- formulários longos usam seções e progressão;
- estados e ações devem ser compreendidos sem releitura constante.

### 4.6 Doherty Threshold — alta relevância

**Ideia aplicada:** feedback rápido mantém ritmo e percepção de produtividade.

**No produto:**

- feedback perceptível idealmente em até ~400 ms;
- operações locais devem parecer instantâneas;
- processamento mais longo recebe feedback imediato;
- não bloquear interação por operações que podem ocorrer em segundo plano com segurança;
- animação não pode mascarar lentidão recorrente.

### 4.7 Fitts’s Law — altíssima relevância em Android

**Ideia aplicada:** alvos maiores e mais próximos são mais rápidos e confiáveis de tocar.

**No produto:**

- alvo de toque mínimo de referência: ~48 unidades lógicas para ações principais;
- não depender de ícone minúsculo como único alvo;
- espaçamento suficiente entre ações destrutivas e comuns;
- ações frequentes próximas ao contexto em que são necessárias;
- evitar colocar ação crítica somente em cantos difíceis quando houver alternativa contextual.

### 4.8 Flow — alta relevância

**Ideia aplicada:** pessoas mantêm foco quando desafio, feedback e capacidade estão equilibrados.

**No produto:**

- chamada deve ser um fluxo contínuo e rápido;
- registrar observação não deve retirar o professor de contexto sem necessidade;
- planejamento deve permitir avançar por blocos sem perder o que já foi feito;
- feedback claro do que foi concluído;
- reduzir interrupções, modais e confirmações desnecessárias.

### 4.9 Goal-Gradient Effect — alta relevância em onboarding e tutoriais

**Ideia aplicada:** progresso visível aumenta motivação conforme a pessoa se aproxima do fim.

**No produto:**

- onboarding/tutoriais mostram progresso real;
- setup inicial sinaliza etapas concluídas;
- não usar porcentagem fictícia;
- não transformar tarefas administrativas recorrentes em “gamificação” forçada.

### 4.10 Hick’s Law — altíssima relevância

**Ideia aplicada:** mais opções e maior complexidade aumentam tempo de decisão.

**No produto:**

- quebrar tarefas complexas em passos menores;
- esconder complexidade avançada até ser necessária;
- priorizar escolhas recomendadas com justificativa;
- onboarding progressivo;
- não simplificar a ponto de esconder consequências importantes.

### 4.11 Jakob’s Law — alta relevância

**Ideia aplicada:** usuários transferem expectativas aprendidas em outros produtos.

**No produto:**

Manter convenções conhecidas para:

- botão voltar;
- navegação inferior;
- busca;
- filtros;
- campos de formulário;
- seleção de data;
- criar/editar/salvar;
- desfazer/confirmar exclusão.

A identidade visual pode ser própria sem inventar um novo modelo mental para ações básicas.

### 4.12 Law of Common Region — alta relevância

**Ideia aplicada:** elementos dentro de uma mesma região são percebidos como relacionados.

**No produto:**

- agrupar metadados que formam uma unidade;
- usar superfícies/bordas/fundos quando realmente comunicam agrupamento;
- evitar criar um card separado para cada linha;
- regiões devem refletir relações semânticas reais.

### 4.13 Law of Proximity — altíssima relevância

**Ideia aplicada:** elementos próximos parecem pertencer ao mesmo grupo.

**No produto:**

- label próximo do campo;
- mensagem de erro próxima do campo que falhou;
- ação relacionada próxima do conteúdo;
- spacing maior entre grupos diferentes;
- não depender apenas de bordas para explicar relações.

### 4.14 Law of Prägnanz — alta relevância

**Ideia aplicada:** pessoas tendem a interpretar estruturas visuais pela forma mais simples e organizada possível.

**No produto:**

- hierarquia deve ser perceptível em segundos;
- telas densas precisam de ritmo e estrutura;
- ícones não devem ser excessivamente detalhados;
- evitar decoração competindo com informação pedagógica.

### 4.15 Law of Similarity — alta relevância

**Ideia aplicada:** elementos visualmente semelhantes são percebidos como relacionados.

**No produto:**

- botões primários compartilham aparência/semântica;
- estados iguais usam padrões iguais;
- links devem parecer links/ações;
- não usar a mesma aparência para ações com consequências muito diferentes;
- componentes similares não precisam ser literalmente idênticos quando a hierarquia exige diferença.

### 4.16 Law of Uniform Connectedness — média/alta relevância

**Ideia aplicada:** conexão visual comunica relação.

**No produto:**

- timeline do planejamento;
- progresso de tutorial;
- sequência de momentos da aula;
- breadcrumbs em Arquivos;
- conexão não deve gerar linhas/ornamentos sem significado.

### 4.17 Mental Model — altíssima relevância

**Ideia aplicada:** pessoas usam modelos internos de como esperam que o sistema funcione.

**Modelo mental do professor deve dominar o produto:**

- turma contém alunos;
- aula tem planejamento;
- chamada pertence a uma turma/data;
- registros pertencem a aluno/turma/contexto;
- arquivos têm localização;
- relatório resume dados já registrados;
- BNCC se relaciona ao planejamento, não existe como ilha abstrata.

Evitar arquitetura visível que reflita apenas como o código foi organizado.

### 4.18 Miller’s Law — média relevância; usar com cuidado

**Ideia aplicada:** memória de curto prazo é limitada.

**Regra do projeto:**

- **não** usar “7 ± 2” como limite mágico de itens;
- usar chunking e reconhecimento;
- listas podem ter mais itens quando são escaneáveis, pesquisáveis e agrupadas;
- reduzir a necessidade de memorizar conteúdo entre telas.

### 4.19 Occam’s Razor — alta relevância

**Ideia aplicada:** se duas soluções resolvem igualmente bem, preferir a menos complexa.

**No produto:**

- remover elementos que não mudam decisão/ação;
- evitar duplicar caminhos equivalentes;
- não criar configurações sem necessidade comprovada;
- não criar features só porque são tecnicamente fáceis.

Não confundir simplicidade com ausência de capacidade profissional.

### 4.20 Paradox of the Active User — altíssima relevância

**Ideia aplicada:** usuários preferem começar a fazer sua tarefa em vez de estudar um manual antes.

**No produto:**

- tutoriais devem ser guiados dentro da tarefa real;
- ajuda contextual em BNCC, chamada, planejamento e Arquivos;
- permitir pular explicações e retomá-las depois;
- “Aprender enquanto faço” > manual longo obrigatório;
- seção Ajuda/Tutoriais continua disponível para repetição.

### 4.21 Pareto Principle — alta relevância em priorização

**Ideia aplicada:** uma parte relativamente pequena dos fluxos tende a concentrar grande parte do valor.

**No produto:**

Priorizar excelência nos fluxos de alta frequência/alto impacto:

- Home/visão do dia;
- chamada;
- planejamento;
- registros;
- alunos/turmas;
- atividades;
- arquivos/relatórios essenciais.

Não usar “80/20” como estatística literal sem dados do produto.

### 4.22 Parkinson’s Law — média/alta relevância

**Ideia aplicada:** tarefas podem expandir até consumir todo o tempo disponível.

**No produto:**

- reduzir duração real de tarefas administrativas;
- defaults contextuais;
- reaproveitamento de dados;
- batch actions;
- evitar formulários que pedem tudo “porque há espaço”.

### 4.23 Peak-End Rule — alta relevância

**Ideia aplicada:** momentos mais intensos e o final da experiência pesam na lembrança geral.

**Momentos que merecem atenção especial:**

- primeira turma criada;
- primeira chamada concluída;
- plano pronto;
- PDF exportado;
- restauração/backup concluído;
- compra/restore de assinatura;
- erro crítico de dados/offline.

Finalizações devem transmitir clareza e confiança, não confete infantil ou mascote.

### 4.24 Postel’s Law — alta relevância em formulários e dados

**Ideia aplicada:** aceitar variação razoável de entrada e produzir saída consistente.

**No produto:**

- não exigir data de nascimento sem necessidade;
- aceitar telefone com formatação humana e normalizar internamente;
- lidar com nomes longos;
- campos opcionais realmente opcionais;
- mensagens explicam limites em vez de punir input válido;
- importação deve ser tolerante sem comprometer integridade.

Privacidade, segurança e validação semântica continuam limites obrigatórios.

### 4.25 Selective Attention — altíssima relevância

**Ideia aplicada:** pessoas filtram grande parte dos estímulos para focar no objetivo atual.

**No produto:**

- destacar o que importa naquele momento;
- não fazer cinco elementos “gritarem” simultaneamente;
- mudanças importantes precisam de cue visual claro;
- banners não podem parecer publicidade;
- alertas recorrentes perdem força se tudo for alerta.

### 4.26 Serial Position Effect — média relevância

**Ideia aplicada:** início e fim de uma sequência tendem a ser mais lembrados.

**No produto:**

- manter ações de navegação críticas em posições estáveis;
- início e conclusão de onboarding precisam ser particularmente claros;
- ordenar listas por utilidade/frequência, não apenas estética;
- não reorganizar navegação frequentemente.

### 4.27 Tesler’s Law — altíssima relevância

**Ideia aplicada:** certa complexidade é inerente; alguém precisa assumi-la.

**No produto:**

O sistema deve assumir complexidade técnica, burocrática e repetitiva sempre que puder sem inventar dados.

Exemplos:

- formatação de PDF;
- persistência/autosave;
- organização de status;
- filtros BNCC;
- datas/períodos;
- cálculo de frequência;
- reaproveitamento de dados entre planejamento e relatório.

O professor mantém o que exige julgamento pedagógico.

### 4.28 Von Restorff Effect — alta relevância

**Ideia aplicada:** um elemento diferente entre muitos similares tende a receber mais atenção.

**No produto:**

- CTA principal pode ser distintivo;
- erro destrutivo precisa de diferença sem virar espetáculo;
- item “recomendado” pode ter ênfase justificada;
- se tudo estiver destacado, nada estará destacado;
- não depender apenas de cor para transmitir diferença.

### 4.29 Working Memory — altíssima relevância

**Ideia aplicada:** memória operacional é limitada e temporária; o sistema deve carregar contexto.

**No produto:**

- breadcrumbs em Arquivos;
- manter turma/data durante subfluxos;
- resumo contextual antes de confirmar;
- mostrar seleção BNCC já feita;
- evitar pedir ao professor para lembrar valores vistos em tela anterior;
- reconhecimento > recall.

### 4.30 Zeigarnik Effect — média/alta relevância

**Ideia aplicada:** tarefas incompletas tendem a permanecer cognitivamente salientes.

**No produto:**

- indicar rascunhos e pendências reais;
- permitir retomar de onde parou;
- mostrar progresso de setup/tutorial;
- não criar ansiedade artificial com contadores e badges desnecessários;
- pendência deve ser acionável ou deixar de competir por atenção.

## 5. Regras concretas por fluxo

### 5.1 Home / Visão do dia

Deve responder rapidamente:

1. o que tenho agora?;
2. o que está pendente?;
3. qual é a próxima ação provável?;
4. existe algo importante que exige atenção hoje?

Aplicar:

- Selective Attention;
- Hick;
- Pareto;
- Von Restorff;
- Proximity;
- Cognitive Load.

Evitar dashboard de cards equivalentes.

### 5.2 Fazer chamada

Objetivo: registrar uma turma com o mínimo de esforço e sem erro.

Aplicar:

- Fitts: alvos grandes;
- Flow: sequência rápida;
- Doherty: toque responde imediatamente;
- Tesler/Parkinson: batch action + exceções;
- Peak-End: conclusão clara;
- Working Memory: data/turma sempre visíveis.

### 5.3 Planejamento

Objetivo: suportar planejamento profissional sem parecer formulário burocrático infinito.

Aplicar:

- Chunking;
- Hick;
- Cognitive Load;
- Tesler;
- Working Memory;
- Goal Gradient quando houver fluxo multipasso.

Campos avançados/opcionais entram por progressive disclosure quando possível.

### 5.4 Alunos e apoios pedagógicos

Objetivo: informação relevante, respeitosa e minimizada.

Aplicar:

- Cognitive Bias: evitar rótulos como identidade visual do aluno;
- Selective Attention: indicador discreto de apoio, não diagnóstico chamativo;
- Postel: campos opcionais aceitam ausência;
- Tesler: adaptar visibilidade por etapa;
- Proximity/Common Region: agrupar apoios pelo que o professor precisa fazer.

### 5.5 Arquivos

Objetivo: biblioteca pedagógica navegável sem desorientação.

Aplicar:

- Mental Model: pasta funciona como pasta conhecida;
- Working Memory: breadcrumb sempre informa localização;
- Jakob: voltar/subir nível seguem convenções;
- Chunking: smart views + pastas manuais;
- Selective Attention: ações principais “Nova pasta” e “Adicionar arquivo”;
- Occam: sem câmera onde não existe razão pedagógica.

### 5.6 Tutoriais

Objetivo: ensinar sem obrigar o professor a estudar antes de trabalhar.

Aplicar:

- Active User;
- Goal Gradient;
- Flow;
- Peak-End;
- Working Memory.

Tutorial ideal = ação real na interface + feedback + próximo passo.

### 5.7 Paywall / assinatura

Aplicar Choice Overload, Hick e Peak-End de forma ética.

- mensal + anual somente;
- comparação clara;
- anual recomendado quando realmente oferece melhor valor;
- preço/trial real vindo da loja;
- sem urgência falsa;
- restore/cancelamento compreensíveis;
- não usar isolamento visual para esconder custo/condições.

## 6. Gate de revisão UX para Design Supervisor / Visual Gate

Antes de declarar uma superfície candidata, responder:

### Clareza

- Em 3–5 segundos, dá para entender a tarefa principal?
- Existe uma ação claramente prioritária?
- Há opções que deveriam aparecer apenas depois?

### Carga cognitiva

- Alguma informação exige memória desnecessária?
- O sistema poderia carregar contexto?
- Há excesso de decisões simultâneas?
- Conteúdo está agrupado por significado?

### Toque e navegação

- Alvos importantes têm tamanho e espaçamento adequados?
- Voltar/cancelar/continuar são previsíveis?
- Não existe dead end?
- Conteúdo longo pode ser percorrido integralmente?

### Feedback

- Toda ação importante responde imediatamente?
- loading/error/success/offline são compreensíveis?
- sucesso final comunica exatamente o que ocorreu?

### Hierarquia visual

- O elemento de maior destaque é realmente o mais importante?
- Elementos visualmente iguais têm função semelhante?
- Há competição excessiva por atenção?
- A tela está bonita sem mascarar problema de usabilidade?

### Contexto docente

- A tela reduz trabalho ou adiciona trabalho?
- A linguagem é de professor, não de banco de dados?
- O comportamento respeita Educação Infantil, Fundamental e Médio quando necessário?
- A interface exige dados que não são essenciais?

### Resultado do gate

Usar:

- `PASS` — nenhuma violação material;
- `ITERATE` — listar no máximo os **3 problemas de maior impacto**;
- `BLOCK` — apenas quando existe risco sério de dados, privacidade, acessibilidade, dead end ou regra de produto.

Não gerar uma lista de 30 microajustes por rodada. Corrigir primeiro o problema de maior impacto, observar via HMR e revisar novamente.

## 7. Anti-padrões específicos que este guia pretende evitar

- cadastro que exige dado não essencial;
- tela com muitas ações de mesma hierarquia;
- “Mais” usado como depósito sem organização;
- card para cada pedaço de informação;
- ícones sem texto em ações pouco familiares;
- breadcrumb ausente em hierarquia profunda;
- progresso falso;
- spinner sem contexto em ação longa;
- sucesso que não deixa claro o que foi salvo;
- aviso tão frequente que vira ruído;
- formulário que obriga reentrada de dado já conhecido;
- menu reordenado entre telas;
- CTA pequeno em ação frequente;
- elemento bonito que parece clicável mas não é;
- opção importante escondida por abstração excessiva;
- tutorial separado do fluxo real quando poderia ser contextual.

## 8. Como usar este documento no desenvolvimento

Este arquivo deve servir como referência para:

- auditoria de Produto/UX;
- Design Supervisor;
- Visual Gate;
- revisão de PRs com alteração de interface;
- revisão de fluxos completos antes do Android 1.0;
- criação de testes de usabilidade com professores.

Não transformar cada lei em teste automatizado literal.

O fluxo recomendado é:

```text
REQUISITO REAL DO PROFESSOR
→ PRODUCT_UX_AUTHORITY
→ DESIGN_AUTHORITY
→ IMPLEMENTAÇÃO
→ LIVE DESIGN
→ AUDITORIA COM ESTE GUIA
→ CORRIGIR 1–3 MAIORES PROBLEMAS
→ CHECKPOINT 360 / 412 / 480
→ QA FUNCIONAL
→ QA ANDROID
```

## 9. Métricas/heurísticas que podem virar checks concretos

Quando aplicável:

- touch target principal: referência mínima ~48 unidades lógicas;
- feedback perceptível: idealmente <400 ms;
- nenhuma rolagem horizontal acidental;
- nenhuma informação essencial cortada;
- CTA primário não compete visualmente com múltiplos equivalentes;
- nenhum campo obrigatório sem justificativa de produto;
- nenhum fluxo principal depende de o usuário memorizar dado visto anteriormente;
- progresso mostrado deve corresponder a progresso real;
- operações repetitivas devem avaliar possibilidade de batch/default/reuse;
- estados loading/empty/error/success/offline definidos para fluxos críticos.

Esses valores são guias de projeto, não justificativa para quebrar o contexto real da interface.

## 10. Nota final

O maior valor de Laws of UX para o Assistente Pedagógico não é “aplicar 30 leis”.

É manter uma disciplina de produto:

> **reduzir esforço mental, preservar contexto, assumir complexidade repetitiva, dar feedback rápido, respeitar modelos mentais familiares e usar a identidade visual para guiar atenção — sem manipular o professor.**

Quando uma solução parecer mais bonita, mais técnica ou mais “inteligente”, mas exigir mais pensamento, mais toques ou mais memorização para cumprir a mesma tarefa, ela provavelmente está indo na direção errada.
