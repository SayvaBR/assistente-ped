# Onboarding de Conversão + Behavioral Design — Assistente Pedagógico

> Objetivo: transformar a primeira abertura do Assistente Pedagógico em uma experiência que crie identificação, confiança, compromisso e percepção concreta de valor — sem dark patterns, culpa, urgência falsa ou infantilização do professor.

## Princípio central

O onboarding não existe para explicar funcionalidades.

Ele existe para levar o professor de:

`"mais um aplicativo"`

para:

`"isso entende minha rotina, já está ficando com a minha cara e pode realmente me ajudar amanhã"`.

A conversão vem depois dessa mudança de percepção.

## Benchmark mental

Aprender com produtos como Duolingo não significa copiar mascote, streak, confete ou linguagem infantil.

O que importa é copiar os mecanismos fortes de onboarding:

- identificação rápida;
- perguntas simples de um toque;
- progresso visível;
- microcompromissos sucessivos;
- personalização que reaparece depois;
- sensação de construção conjunta;
- pequenas confirmações de avanço;
- redução da distância entre "baixei" e "isso já é meu";
- paywall apresentado depois de contexto suficiente para a oferta fazer sentido.

Para o Assistente Pedagógico, isso deve ser traduzido de forma adulta, profissional, acolhedora e respeitosa com a realidade docente.

---

# Psicologia que queremos usar

## 1. Self-reference effect — "isso fala comigo"

O professor presta mais atenção quando a experiência usa contexto que ele próprio informou.

Exemplo:

- ele escolhe que sua maior dor é `planejar aulas`;
- depois vê `Vamos deixar seu planejamento mais leve`;
- cria `5º Ano A`;
- a preview mostra `5º Ano A` de verdade;
- Home nasce com aquela turma/contexto.

Pergunta que não altera nada depois é desperdício e quebra confiança.

## 2. Commitment & consistency — pequenos "sins"

Não pedir um formulário grande.

Pedir pequenas decisões relevantes e rápidas.

Cada escolha aumenta investimento psicológico sem parecer burocracia:

- "Como prefere ser chamada?"
- "O que mais pesa na sua rotina hoje?"
- "Em qual etapa você trabalha?"
- "Vamos criar sua primeira turma?"

O importante é que cada resposta tenha consequência visível.

## 3. Endowment effect — "já é meu espaço"

Antes do paywall, o usuário deve sentir que já construiu algo:

- perfil;
- primeira turma;
- preferência de rotina;
- contexto pedagógico;
- preview personalizado.

Não usar isso para ameaçar perda de dados no paywall.

O efeito deve vir de pertencimento, não medo.

## 4. Goal-gradient — proximidade do resultado

Progresso deve deixar claro que o professor está se aproximando de uma recompensa concreta.

Evitar `Etapa 1 de 11` como sensação de burocracia.

Preferir fases semânticas:

- `Conhecendo sua rotina`
- `Preparando sua turma`
- `Montando seu espaço`

Dentro de cada fase, microprogresso simples.

## 5. Immediate payoff — cada bloco precisa devolver valor

Depois de uma pergunta importante, devolver uma confirmação curta:

- `Boa. Vamos adaptar o planejamento para os Anos Iniciais.`
- `5º Ano A criado. Agora já sabemos onde organizar chamada e registros.`

Não usar elogios vazios como `Incrível!`, `Perfeito!` a cada toque.

## 6. Pain recognition — reconhecer a dor sem dramatizar

Dores legítimas que podemos acolher:

- planejamento toma tempo fora da escola;
- informações ficam espalhadas;
- chamada e registros viram retrabalho;
- detalhes sobre alunos são difíceis de reencontrar;
- arquivos e planos se perdem entre aplicativos/pastas;
- burocracia concorre com o tempo de ensinar.

Tom correto:

`"Seu trabalho já exige atenção demais. Organizar a rotina não deveria pesar tanto."`

Tom proibido:

- culpa;
- medo de ser um professor pior;
- ameaça de perder aluno/informação;
- pressão moral;
- manipulação baseada em exaustão.

## 7. Autonomia e confiança

Conversão profissional depende de confiança.

Deixar claro, no momento certo:

- dados pedagógicos permanecem do professor;
- funcionamento offline quando aplicável;
- preço vem da loja;
- restauração de compra existe;
- sem urgência falsa;
- sem contagem regressiva inventada.

---

# Regra sobre quantidade de telas

**Muitas telas não são o problema. Muitas telas passivas são.**

Duolingo consegue usar várias microtelas porque quase cada uma pede uma decisão, personaliza ou recompensa progresso.

Para nosso produto, é aceitável ter aproximadamente **9–12 microetapas** antes da Home se:

- 2–3 no máximo forem puramente apresentacionais;
- a maioria exigir um toque simples ou criar algo real;
- a jornada completa ficar idealmente em 2–4 minutos;
- não houver formulários longos;
- o teclado não aparecer desnecessariamente;
- respostas anteriores forem reaproveitadas;
- o valor percebido aumentar a cada tela.

Não reduzir artificialmente tudo para 3 telas se isso destruir vínculo/personalização.

Também não manter 11 telas só porque já existem.

---

# Jornada alvo recomendada

## 0 — Splash

Muito curto e premium.

Função psicológica: reconhecimento de marca e sensação de qualidade.

Não vender ainda.

## 1 — Dor / acolhimento

Objetivo: `"eles entendem meu dia"`.

Exemplo de direção de copy:

**Seu trabalho já exige muito.**

`Organizar planejamento, turmas e registros não deveria consumir o tempo que você queria dedicar a ensinar.`

CTA: `Quero uma rotina mais leve`

Uma única ideia. Sem lista de features.

## 2 — Promessa concreta

Objetivo: apresentar transformação.

**Menos tempo organizando. Mais clareza para ensinar.**

Visual deve mostrar rapidamente a relação:

`planejamento -> aula -> turma -> registro`

Não uma grade de funcionalidades.

## 3 — Pergunta de intenção / dor principal

Pergunta:

**O que mais pesa na sua rotina hoje?**

Opções sugeridas:

- Planejar aulas
- Fazer chamada e acompanhar frequência
- Registrar observações dos alunos
- Organizar turmas
- Encontrar materiais e arquivos
- Um pouco de tudo

Um toque para avançar.

Persistir localmente como preferência de onboarding.

Usar a resposta na preview e, se fizer sentido, na primeira experiência da Home.

Não enviar texto livre nem dados pessoais para analytics.

## 4 — Identidade profissional

Combinar quando visualmente confortável:

- tratamento: Professora / Professor / Docente;
- nome.

Objetivo: começar a transformar `o app` em `meu espaço`.

Após avançar, microcopy contextual:

`Certo, Professora Marina. Vamos preparar seu espaço.`

## 5 — Contexto pedagógico

**Em qual etapa você trabalha?**

Isso precisa ter consequência real na BNCC, níveis e planejamento.

Não é coleta decorativa.

## 6 — Primeira turma

Em uma composição clara, criar:

- nome da turma;
- nível.

A criação deve usar domínio/repositório real.

Quando concluir:

`5º Ano A já tem um lugar no seu espaço.`

## 7 — Rotina da turma

Turno com opções rápidas.

Se houver evidência de que não agrega conversão/configuração suficiente, combinar com a etapa anterior.

Não manter etapa apenas para aumentar número de telas.

## 8 — Montando seu espaço

Transição curta baseada em trabalho real, não porcentagem falsa.

Pode mostrar 2–3 confirmações conforme operações concluam:

- `Perfil preparado`
- `5º Ano A criado`
- `Planejamento ajustado para Anos Iniciais`

Esses itens só aparecem após sucesso real da operação correspondente.

## 9 — Preview personalizado / momento "aha"

Esta é uma das telas mais importantes do onboarding.

Mostrar uma mini Home ou composição de preview usando dados reais recém-criados:

- `Boa noite, Professora Marina`;
- `5º Ano A`;
- contexto da etapa de ensino;
- 2–3 ações diretamente relacionadas à dor escolhida.

Se a pessoa escolheu `Planejar aulas`, destacar:

`Seu primeiro planejamento pode começar por aqui.`

Se escolheu frequência:

`Quando a aula começar, a chamada do 5º Ano A estará aqui.`

Objetivo psicológico:

`"eu toquei em algumas coisas e o produto já virou meu"`.

CTA:

`Quero usar meu espaço`

## 10 — Paywall contextualizado

Agora a oferta tem contexto.

Headline deve vender o resultado, não uma lista de recursos.

Exemplo de direção:

**Leve essa organização para todos os seus dias de aula.**

Subcopy adaptável à intenção selecionada, sem exagerar promessa.

Mostrar:

- mensal;
- anual recomendado;
- preço real Google Play/RevenueCat;
- trial somente quando elegível;
- 3 benefícios ligados às dores docentes;
- restore;
- termos/privacidade;
- renovação clara.

Se houver hard paywall como direção oficial, ele deve ser honesto e elegante — não coercitivo.

## 11 — Confirmação de acesso

Só depois de entitlement `pro` ativo.

Evitar tela genérica de sucesso.

Transformar em continuidade da história:

`Seu espaço está pronto.`

`5º Ano A, seus planejamentos e seus registros já podem começar.`

CTA: `Ir para minha Home`

---

# Microinterações de vínculo

Usar:

- seleção com resposta tátil imediata;
- haptic leve onde apropriado no Android;
- check físico/pressionável;
- transições espaciais curtas;
- progressão que pareça avanço, não formulário;
- microcopy contextual usando respostas reais;
- confirmação de criação real;
- preview crescendo conforme configuração avança.

Evitar:

- confete constante;
- streak;
- moedas/pontos;
- mascote permanente;
- bounce excessivo;
- badges infantis;
- elogio a cada clique;
- gamificação incompatível com ambiente profissional.

---

# Conversão: narrativa em vez de feature dump

A sequência psicológica deve ser:

```text
EU ME IDENTIFICO
-> O APP ENTENDE MINHA DOR
-> EU FAÇO PEQUENAS ESCOLHAS
-> O PRODUTO MUDA COM BASE NELAS
-> EU CRIO MINHA PRIMEIRA TURMA
-> VEJO MEU ESPAÇO PRONTO
-> ENTENDO O QUE VOU GANHAR
-> VEJO O PREÇO
-> DECIDO ASSINAR
```

Não:

```text
LOGO
-> 18 FEATURES
-> PREÇO
```

---

# Copywriting

## Voz

- humana;
- respeitosa;
- brasileira;
- profissional;
- otimista sem negar dificuldades;
- próxima da linguagem de professores;
- curta.

## Fórmula

Sempre que possível:

`dor reconhecida -> transformação -> evidência concreta`.

Exemplo:

`Planejamento não precisa começar do zero toda vez.`

`Organize objetivo, BNCC e momentos da aula no mesmo fluxo.`

## Não prometer sem evidência

Evitar claims como:

- `economize 10 horas por semana`;
- `melhore o desempenho dos seus alunos`;
- `usado por milhares de professores`;

até termos dados reais que sustentem isso.

Social proof só entra quando verdadeiro e mensurável.

---

# Instrumentação de funil

Precisamos saber onde a conversão melhora ou quebra.

Eventos permitidos devem ser abstratos e sem PII/dados pedagógicos:

- `onboarding_started`
- `onboarding_value_step_viewed` com enum de etapa
- `onboarding_pain_selected` com categoria fechada, nunca texto livre
- `setup_started`
- `setup_step_completed` com enum de etapa
- `setup_completed`
- `personalized_preview_viewed`
- `paywall_viewed`
- `offer_selected` mensal/anual
- `trial_started`
- `purchase_started`
- `purchase_cancelled`
- `entitlement_activated`
- `restore_started`
- `restore_succeeded`
- `restore_empty`
- `home_first_view`

Proibido enviar:

- nome do professor;
- escola;
- turma;
- nome/ID de aluno;
- observações;
- conteúdo de plano;
- texto livre;
- arquivos;
- códigos que possam identificar usuário individual fora da necessidade técnica do provedor.

Analytics deve passar pelo adapter/privacy allowlist já previsto no produto.

---

# Métricas de produto

Não otimizar apenas `paywall -> compra`.

Acompanhar funil completo:

1. instalação -> onboarding iniciado;
2. onboarding iniciado -> setup iniciado;
3. setup iniciado -> setup concluído;
4. setup concluído -> preview visto;
5. preview -> paywall;
6. paywall -> trial/compra;
7. trial -> pago;
8. pago -> primeira ação útil;
9. D1/D7 retorno;
10. ação pedagógica real concluída.

Uma conversão que compra e abandona o produto não é sucesso sustentável.

---

# Experimentos futuros

Não criar dez variantes agora.

Primeiro lançar uma baseline excelente.

Depois testar uma variável por vez, por exemplo:

- headline de dor vs transformação;
- pergunta de intenção antes/depois da promessa;
- preview personalizado mais visual vs mais operacional;
- anual como card principal vs comparação lado a lado;
- trial messaging;
- ordem de dois passos de setup.

RevenueCat pode ser usado para experimentos de monetização quando a configuração externa estiver pronta.

Não usar experimentos para dark patterns.

---

# Critérios para aprovação do onboarding

Não aprovar porque `todas as telas existem`.

Aprovar quando um professor em primeira instalação conseguir sentir:

1. `eles entendem minha rotina`;
2. `isso não parece mais uma burocracia`;
3. `já está ficando com a minha cara`;
4. `eu entendo exatamente o que isso vai me ajudar a fazer`;
5. `o preço apareceu no momento certo e está claro`;
6. `eu confio que meus dados e minha compra serão tratados corretamente`.

## Teste qualitativo interno

Após cada versão, responder:

- Qual dor foi reconhecida?
- Qual microcompromisso aconteceu?
- O que ficou personalizado por causa disso?
- Qual foi o primeiro momento de valor?
- O professor viu algo criado por ele antes do paywall?
- A oferta fala de resultado ou lista features?
- Existe qualquer pressão que pareça manipulativa?
- Existe alguma tela que poderíamos apagar sem perder valor? Se sim, provavelmente ela não merece existir.

---

# Prioridade para o Codex

Esta especificação complementa `docs/MONETIZATION_ONBOARDING_EXECUTION.md`.

Ao refatorar o onboarding:

1. não apenas reduzir número de telas;
2. transformar telas passivas em momentos de identificação/personalização quando isso tiver função real;
3. persistir intenção/dor principal localmente;
4. reaproveitar contexto informado na preview e primeira Home;
5. criar vínculo profissional, não gamificação infantil;
6. renderizar cedo em 412px;
7. revisar copy tão seriamente quanto layout;
8. testar jornada completa;
9. não bloquear desenvolvimento por matriz manual de resoluções;
10. não autoaprovar direção visual.

## Linha de chegada

O onboarding está pronto quando deixa de parecer uma sequência de formulários e passa a parecer:

> **o Assistente Pedagógico sendo montado junto com o professor, para a rotina daquele professor.**
