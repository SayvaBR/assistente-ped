# Onboarding Discovery Conversation — Assistente Pedagógico

> Objetivo: transformar o onboarding em uma conversa guiada que conhece a realidade do professor antes de pedir dados pessoais. O professor deve sentir que o produto entende seu cotidiano, reconhece suas dores e vai se adaptar a elas.

## Princípio central

O onboarding não deve parecer um formulário.

Ele deve parecer uma conversa curta, respeitosa e progressiva entre o Assistente Pedagógico e o professor.

A sequência psicológica desejada é:

`reconhecimento -> identificação -> aprofundamento -> normalização -> esperança concreta -> personalização -> pertencimento -> valor demonstrado -> identidade -> configuração -> paywall`

Antes de perguntar nome, escola ou turma, o produto deve primeiro perguntar:

> "Como está a sua rotina?"

## Regra de produto

Não limitar o onboarding por número arbitrário de telas.

É aceitável existir um catálogo de 30–40 microtelas/perguntas se a experiência for adaptativa e cada pergunta tiver uma função real.

Porém, **não fazer 40 telas lineares obrigatórias para todo mundo**.

Construir um fluxo ramificado:

- cada professor vê somente as perguntas relevantes;
- perguntas simples devem exigir 1–2 toques;
- perguntas profundas aparecem somente quando a resposta anterior justifica;
- permitir voltar;
- permitir `Prefiro responder depois` em perguntas não essenciais;
- salvar progresso localmente;
- respostas devem reaparecer depois na personalização.

Meta de experiência: parecer uma conversa, não uma entrevista cansativa.

---

# Fase 1 — Acolhimento e reconhecimento

## Tela 1 — abertura da conversa

Copy-base:

**"Antes de configurar seu espaço, queremos entender um pouco da sua rotina."**

Subcopy:

"Nada de formulário longo. Algumas respostas rápidas ajudam o Assistente Pedagógico a começar do jeito mais útil para você."

CTA: `Vamos conversar`

## Tela 2 — dor principal

Pergunta:

**"O que mais pesa na sua rotina hoje?"**

Opções:

- Planejar aulas
- Fazer chamada e acompanhar frequência
- Registrar o que acontece com os alunos
- Organizar turmas
- Encontrar arquivos e materiais
- Dar conta de tudo ao mesmo tempo

Guardar como `primaryPain`.

A resposta define a ramificação principal.

## Tela 3 — sensação operacional

Pergunta:

**"No fim de um dia de aula, o que mais costuma ficar para depois?"**

Opções:

- Terminar planejamento
- Atualizar registros
- Organizar materiais
- Rever frequência
- Preparar o dia seguinte
- Quase tudo

Objetivo: compreender backlog operacional, não diagnosticar saúde mental.

## Tela 4 — momento de reconhecimento

Não pedir nova informação.

Refletir a resposta anterior de forma humana.

Exemplo se `primaryPain=planejamento`:

**"Planejamento não deveria consumir o tempo que sobra depois da escola."**

Subcopy:

"Vamos entender onde esse processo costuma travar para organizar o seu espaço de forma mais útil."

---

# Fase 2 — Diagnóstico adaptativo por dor

## Trilha Planejamento

### P1 — tempo gasto

**"Quanto tempo você costuma levar para preparar uma aula comum?"**

- Até 15 min
- 15–30 min
- 30–60 min
- Mais de 1 hora
- Varia muito

Guardar `planningTimeBand`.

### P2 — principal dificuldade

**"Em qual parte do planejamento você mais perde tempo?"**

- Transformar ideia em objetivo claro
- Encontrar habilidade BNCC
- Organizar abertura, desenvolvimento e fechamento
- Criar atividades
- Separar materiais
- Estimar tempo
- Começar do zero

Guardar `planningBlocker`.

### P3 — reaproveitamento

**"Quando uma aula funciona bem, você consegue reaproveitar esse planejamento depois?"**

- Sim, facilmente
- Às vezes
- Quase nunca
- Normalmente não encontro mais

Guardar `planningReuse`.

### P4 — solução contextual

Mostrar consequência real:

**"Vamos priorizar planejamento rápido, BNCC e reaproveitamento para você."**

Explicar em uma frase como o app ajuda, sem prometer economia não comprovada.

## Trilha Frequência

### F1

**"Como você faz a chamada hoje?"**

- Papel/caderno
- Planilha
- Sistema da escola
- Outro aplicativo
- Memória e anotações depois

### F2

**"Quando precisa conferir a frequência de um aluno semanas depois, é fácil encontrar?"**

- Sim
- Mais ou menos
- Dá trabalho
- Muitas vezes não

### F3

**"O que mais incomoda na chamada?"**

- Demora durante a aula
- Corrigir depois
- Consultar histórico
- Justificar faltas
- Ter informação espalhada

### F4 — solução contextual

**"Vamos deixar a chamada em primeiro plano e manter o histórico fácil de reencontrar."**

## Trilha Observações / acompanhamento

### O1

**"Quando algo importante acontece com um aluno durante a aula, você consegue registrar na hora?"**

- Quase sempre
- Às vezes
- Raramente
- Registro só depois

### O2

**"O que mais dificulta esse registro?"**

- Falta de tempo
- Não quero interromper a aula
- Não tenho onde anotar rapidamente
- Depois não encontro a anotação
- Informação fica espalhada

### O3

**"Quando precisa lembrar a evolução de um aluno, onde procura primeiro?"**

- Caderno
- Mensagens/notas no celular
- Planilha
- Memória
- Mais de um lugar

### O4 — solução contextual

**"Vamos deixar registros rápidos ligados diretamente ao aluno e à turma."**

## Trilha Arquivos e materiais

### A1

**"Onde ficam seus materiais de aula hoje?"**

- Pastas no celular
- Google Drive/serviço em nuvem
- Computador
- WhatsApp
- Vários lugares

### A2

**"Já aconteceu de saber que tinha um arquivo, mas não conseguir encontrar quando precisava?"**

- Frequentemente
- Às vezes
- Raramente
- Nunca

### A3 — solução contextual

**"Vamos organizar seus materiais pelo contexto em que você realmente usa: turma, aula e planejamento."**

## Trilha "Tudo ao mesmo tempo"

Não repetir todas as perguntas de todas as trilhas.

Fazer um diagnóstico curto transversal:

1. tempo de planejamento;
2. facilidade de fazer chamada;
3. facilidade de registrar observações;
4. dificuldade de encontrar materiais.

Depois identificar automaticamente as duas dores mais relevantes e priorizá-las.

---

# Fase 3 — Relação com a rotina de sala

Após a trilha principal, perguntar somente informações que alteram o produto.

## R1

**"Durante a aula, qual dessas situações mais costuma quebrar seu ritmo?"**

- Procurar informação
- Fazer chamada
- Registrar algo importante
- Encontrar material
- Lembrar o que vem depois
- Outra coisa

## R2

**"O que você mais gostaria de abrir no celular e resolver em poucos segundos?"**

- Chamada
- Próxima etapa da aula
- Observação de aluno
- Arquivo/material
- Agenda
- Tudo da turma

Essa resposta pode influenciar ordem de atalhos/contexto da Home.

## R3

**"Quando você prepara o dia seguinte, o que mais gostaria de já encontrar pronto e organizado?"**

- Planejamento
- Agenda
- Materiais
- Turmas
- Pendências
- Um resumo do dia

Guardar como `desiredMorningState`.

---

# Fase 4 — Normalização e social proof

## Regra crítica

**Nunca inventar números.**

Frases como:

- "72% dos professores passam por isso";
- "8 em cada 10 professores...";
- "a maioria dos professores..."

somente podem aparecer se houver fonte verificável ou dado agregado próprio com metodologia suficiente.

Cada social proof numérico deve possuir:

- fonte;
- ano;
- contexto da pesquisa;
- wording compatível com o dado real;
- revisão de produto antes de entrar em produção.

### Antes de termos números confiáveis

Usar normalização qualitativa honesta, por exemplo:

- "Você não é a única pessoa que sente esse peso na rotina escolar."
- "Planejamento, registros e materiais espalhados são problemas recorrentes no trabalho docente."
- "Por isso o Assistente Pedagógico reúne essas tarefas no mesmo fluxo."

Sem números falsos.

### Depois de termos base própria suficiente

Podemos gerar insights anônimos e agregados, nunca dados individuais, por exemplo:

`"Entre professores que escolheram planejamento como principal dificuldade, BNCC aparece entre os bloqueios mais selecionados."`

Somente após revisão de privacidade/LGPD e tamanho de amostra adequado.

## Modelo de componente

`InsightCard`

Campos:

- `headline`
- `body`
- `sourceLabel?`
- `sourceYear?`
- `sourceUrl?`
- `segment?`

Sem fonte -> sem porcentagem.

---

# Fase 5 — Diagnóstico personalizado

Antes de perguntar nome, fazer uma pequena devolutiva.

Exemplo:

**"Entendemos melhor a sua rotina."**

Cards ou resumo curto:

- `Planejamento leva mais tempo do que você gostaria`
- `BNCC é um dos pontos em que você mais trava`
- `Você quer encontrar sua próxima aula rapidamente`

Depois:

**"Vamos preparar seu espaço com isso em mente."**

CTA: `Personalizar meu espaço`

Este é o ponto de transição entre conversa e configuração.

---

# Fase 6 — Identidade e configuração

Somente agora começar dados pessoais/contextuais:

1. como prefere ser chamada/o;
2. nome;
3. etapa de ensino;
4. primeira turma;
5. nível;
6. turno.

Não fazer essas perguntas parecerem cadastro administrativo.

Exemplo:

Em vez de:

`Nome`

usar:

**"Como você gostaria que o Assistente chamasse você?"**

Em vez de:

`Turma`

usar:

**"Vamos criar o primeiro espaço que você vai usar amanhã. Qual turma vem primeiro?"**

---

# Fase 7 — Consequência visível

Depois de cada bloco de configuração, reutilizar respostas anteriores.

Exemplo:

Professor respondeu:

- principal dor: planejamento;
- tempo: mais de 1h;
- bloqueio: BNCC;
- nome: Marina;
- turma: 5º Ano A.

Preview:

**"Marina, seu espaço está tomando forma."**

Mostrar:

`5º Ano A`

`Planejamento em primeiro plano`

`BNCC pronta para consultar`

`Chamada acessível em um toque`

A Home inicial também deve refletir prioridades quando possível.

Pergunta sem consequência visível = candidata a remoção.

---

# Fase 8 — Momento de alívio / valor

Antes do paywall, mostrar uma pequena simulação real usando dados da pessoa.

Não uma imagem estática genérica.

Exemplo:

**"Amanhã, quando abrir o Assistente, você já vai encontrar isso."**

Mini-preview da Home com:

- nome;
- turma;
- dor priorizada;
- ação principal relevante;
- agenda/planejamento real quando já houver dados.

Objetivo psicológico:

`eu já consigo me imaginar usando isso na escola`.

---

# Fase 9 — Paywall contextual

O paywall não deve dizer apenas "Assine Pro".

Ele deve conectar o valor às respostas do professor.

Exemplo para planejamento:

**"Seu espaço foi preparado para reduzir o atrito entre ideia, BNCC e aula pronta."**

Depois mostrar oferta real da loja.

Para frequência:

**"Sua chamada e o histórico da turma ficam no mesmo fluxo para você não precisar reconstruir isso depois."**

Ainda assim:

- sem culpa;
- sem medo;
- sem ameaça de perder o que configurou;
- sem urgência falsa;
- sem desconto inventado;
- preço/trial sempre reais da loja.

---

# Arquitetura de ramificação

Criar um modelo de `TeacherDiscoveryProfile` local-first.

Campos sugeridos:

```ts
type TeacherDiscoveryProfile = {
  primaryPain?: 'planning' | 'attendance' | 'observations' | 'classes' | 'files' | 'everything';
  endOfDayBacklog?: string;
  planningTimeBand?: string;
  planningBlocker?: string;
  planningReuse?: string;
  attendanceMethod?: string;
  attendanceHistoryDifficulty?: string;
  attendancePain?: string;
  observationCaptureFrequency?: string;
  observationBlocker?: string;
  observationStorage?: string;
  materialsLocation?: string;
  materialsFindDifficulty?: string;
  inClassInterruption?: string;
  quickAccessPriority?: string;
  desiredMorningState?: string;
  completedAt?: string;
};
```

Não enviar automaticamente respostas para analytics.

Se no futuro respostas forem usadas para analytics/agregação:

- definir finalidade;
- minimizar dados;
- não incluir nomes/alunos/textos livres;
- revisar LGPD;
- anonimizar/agregar;
- documentar retenção.

---

# Motor de conversa

Evitar implementar a jornada como dezenas de componentes hardcoded independentes.

Criar estrutura declarativa de perguntas, branching e reflections, por exemplo:

```ts
type DiscoveryStep = {
  id: string;
  question?: string;
  options?: { id: string; label: string; value: string }[];
  insight?: (profile: TeacherDiscoveryProfile) => InsightContent;
  next: (profile: TeacherDiscoveryProfile) => string | 'done';
  optional?: boolean;
};
```

Isso permite:

- mudar copy sem quebrar navegação;
- testar ordem de perguntas;
- criar branches;
- pular perguntas irrelevantes;
- reaproveitar respostas;
- instrumentar funil futuramente sem duplicar lógica.

---

# Duração e progressão

Não mostrar `3 de 40`.

Usar capítulos psicológicos:

1. `Sua rotina`
2. `O que mais pesa`
3. `Como podemos ajudar`
4. `Seu espaço`

A pessoa pode responder muitas microtelas, mas percebe avanço por capítulos.

Cada microtela deve ser leve:

- uma pergunta;
- poucas opções;
- tap grande;
- transição rápida;
- nenhum scroll quando evitável;
- retorno simples;
- autosave.

Target: conversa profunda sem parecer longa.

---

# Linguagem

Tom:

- acolhedor;
- adulto;
- profissional;
- pedagógico;
- concreto;
- respeitoso.

Evitar:

- produtividade corporativa;
- "maximize sua performance";
- tratar professor como criança;
- dramatizar sofrimento;
- linguagem terapêutica;
- prometer eliminar trabalho docente;
- assumir que toda dificuldade é individual.

Preferir:

- "Entendi. Vamos organizar isso melhor."
- "Isso costuma ficar espalhado em mais de um lugar."
- "Vamos deixar essa informação mais fácil de reencontrar."
- "Você continua no controle; o Assistente organiza o caminho."

---

# Visual da conversa

Usar a referência de onboarding enviada pelo produto apenas como inspiração de **imersão, foco único e transição de estado**, não como cópia literal de estética.

Manter DNA Assistente Pedagógico:

- céu azul claro + branco + azul vivo;
- tipografia arredondada;
- superfícies táteis;
- uma pergunta dominante por tela;
- muito espaço para foco;
- motion curto e suave;
- ilustrações/abstrações humanas ou educacionais quando ajudarem a narrativa;
- sem dashboard durante a conversa;
- sem mascote permanente.

A tela deve parecer uma conversa premium, não um formulário de cadastro.

---

# Critérios de qualidade

O fluxo falha se:

- começa pedindo nome antes de criar identificação;
- faz perguntas que não alteram nada depois;
- exibe estatística sem fonte;
- força todos a responder a mesma sequência longa;
- usa dor para pressionar compra;
- parece pesquisa de marketing;
- parece cadastro burocrático;
- paywall aparece antes de existir valor demonstrado;
- respostas desaparecem sem consequência;
- dados sensíveis viram analytics por padrão.

O fluxo passa quando o professor consegue dizer:

> "Esse aplicativo entendeu o que mais me atrapalha, organizou meu espaço com base nisso e eu consigo me imaginar usando amanhã."

---

# Ordem de implementação para Codex

1. não quebrar a missão Android 1.0 em andamento;
2. criar `TeacherDiscoveryProfile` local-first;
3. criar engine declarativa de perguntas/branching;
4. implementar capítulo `Sua rotina`;
5. implementar branches Planejamento/Frequência/Observações/Arquivos/Tudo;
6. implementar reflections e insights sem números inventados;
7. implementar diagnóstico resumido;
8. somente então entrar no SetupWizard de identidade;
9. reaproveitar respostas no preview personalizado;
10. contextualizar paywall com `primaryPain`;
11. E2E de pelo menos 3 branches diferentes;
12. autosave/retomada;
13. reduced motion;
14. screenshot 412 do caminho principal;
15. APK QA e validação física em checkpoint.

## Regra final

> Primeiro conheça o professor. Depois peça para ele configurar o produto.

> Primeiro mostre que entendemos a rotina. Depois mostre o que o Assistente faz.

> Conversão não vem de pressionar. Vem de o professor reconhecer a própria realidade dentro do produto e perceber valor concreto antes da oferta.
