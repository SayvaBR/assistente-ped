# Onboarding Zero-Typing Interaction Policy — Assistente Pedagógico

> Objetivo: garantir que a jornada de descoberta do onboarding pareça uma conversa rápida e acolhedora, nunca um formulário. Fora dados de identidade/contexto que realmente exigem texto, o professor responde tocando em opções prontas.

## Regra principal

Durante a fase de descoberta comportamental e pedagógica do onboarding:

**NÃO pedir texto livre.**

O professor deve responder por seleção, preferencialmente em **um toque**.

Campos digitáveis ficam reservados para informações que naturalmente não podem ser inferidas por opções, como:

- nome da pessoa;
- nome da escola, quando realmente necessário;
- nome da turma;
- eventualmente cidade/endereço ou informação administrativa que exija valor aberto.

Mesmo nesses casos, perguntar somente quando houver consequência real no produto.

## Quantidade de opções

Perguntas de descoberta devem oferecer normalmente **4 a 6 opções úteis**.

Mínimo recomendado: **4 opções**.

Exceções aceitáveis:

- perguntas binárias realmente naturais;
- confirmação simples;
- escala curta quando o conceito exige progressão clara.

Não criar opções artificiais apenas para atingir um número.

## Formato preferido

Cada tela deve ter:

1. uma pergunta principal curta;
2. uma frase opcional de contexto;
3. 4–6 respostas em botões/cards táteis;
4. seleção instantânea;
5. avanço rápido, com CTA somente quando necessário;
6. opção `Prefiro responder depois` apenas para perguntas não essenciais.

Evitar teclado, textarea, campos longos e formulários durante a conversa de descoberta.

## Por que isso é obrigatório

Digitar durante o onboarding aumenta esforço, desacelera a conversa e transforma descoberta em burocracia.

Queremos que a experiência produza:

`pergunta -> reconhecimento -> toque -> pequena resposta do app -> próxima pergunta`

Não:

`pergunta -> teclado -> escrever frase -> revisar -> confirmar`.

## Exemplos corretos

### Dor principal

**O que mais pesa na sua rotina hoje?**

- Planejar aulas
- Fazer chamada e frequência
- Registrar o que acontece com os alunos
- Organizar turmas
- Encontrar arquivos e materiais
- Dar conta de tudo ao mesmo tempo

### Tempo de planejamento

**Quanto tempo você costuma levar para preparar uma aula comum?**

- Até 15 min
- 15–30 min
- 30–60 min
- Mais de 1 hora
- Varia muito

### Principal bloqueio no planejamento

**Em qual parte você mais perde tempo?**

- Transformar a ideia em objetivo
- Encontrar habilidades BNCC
- Organizar os momentos da aula
- Criar atividades
- Separar materiais
- Começar do zero

### Frequência

**O que mais atrapalha na chamada?**

- Demora durante a aula
- Corrigir depois
- Consultar histórico
- Justificar faltas
- Informação espalhada

### Sala de aula

**O que mais quebra seu ritmo durante a aula?**

- Procurar informação
- Fazer chamada
- Registrar algo importante
- Encontrar material
- Lembrar o que vem depois
- Resolver várias coisas ao mesmo tempo

## Exemplos incorretos

Não fazer:

- `Conte com suas palavras qual é sua maior dificuldade.`
- `Explique como você costuma planejar.`
- `Descreva o que deixa sua rotina pesada.`
- `Escreva o que gostaria que o aplicativo resolvesse.`

Mesmo que essas respostas pareçam mais ricas, elas criam fricção e dificultam personalização consistente.

## Exceções de texto livre

Texto livre é permitido apenas quando o valor precisa ser específico do professor.

Exemplos:

### Nome

**Como você gostaria que o Assistente chamasse você?**

Campo de texto.

### Turma

**Qual turma você quer preparar primeiro?**

Campo de texto para nome da turma, seguido por opções prontas de nível/turno.

### Escola

Se necessário para uma função concreta:

**Qual é o nome da sua escola?**

Campo de texto.

Não pedir escola apenas para "conhecer melhor" se ela não alterar o produto.

## Opções adaptativas

As opções podem mudar com base em respostas anteriores.

Exemplo:

Se `primaryPain = planning`, a próxima pergunta deve mostrar dificuldades de planejamento.

Se `primaryPain = attendance`, a próxima pergunta deve mostrar dificuldades de frequência.

Isso reforça a sensação de conversa inteligente.

## Seleção simples vs múltipla

Preferir **single-select** para perguntas que definem prioridade.

Usar **multi-select** somente quando várias respostas forem verdadeiramente úteis para personalização.

Quando multi-select:

- limitar quantidade quando necessário;
- explicar `Escolha até 3`;
- não forçar seleção máxima;
- CTA `Continuar` fica ativo após pelo menos uma escolha.

## Microfeedback após seleção

Quando adequado, após a escolha mostrar uma resposta curta do Assistente antes da próxima pergunta.

Exemplo:

Professor seleciona `Encontrar habilidade BNCC`.

Resposta:

**Entendi. Vamos deixar a BNCC mais perto do momento em que você realmente precisa dela.**

Depois avançar.

O feedback não precisa aparecer após todas as perguntas; usar nos momentos emocionalmente importantes para evitar lentidão.

## Velocidade

Uma pergunta comum deve poder ser respondida em aproximadamente um toque.

Não colocar `Continuar` após toda opção se o avanço automático ficar claro, acessível e reversível.

Quando auto-advance for usado:

- atraso muito curto apenas para feedback visual;
- botão Voltar sempre disponível;
- não avançar enquanto houver ambiguidade de seleção;
- Reduced Motion respeitado.

## Acessibilidade

Opções devem:

- ter touch target >= 48px;
- possuir label textual completo;
- não depender só de cor;
- permitir foco por teclado/tecnologia assistiva;
- manter texto inteiro sem truncamento;
- suportar texto ampliado;
- preservar seleção ao voltar.

## Dados e privacidade

Respostas de descoberta devem ser estruturadas em enums/IDs, não texto livre.

Vantagens:

- menos risco de capturar informação sensível acidental;
- personalização previsível;
- analytics futuro mais seguro;
- agregação estatística viável;
- menos necessidade de processar linguagem natural.

Não coletar automaticamente texto sobre alunos, saúde, situações familiares ou informações sensíveis durante onboarding.

## Regra para social proof futuro

Como as respostas serão estruturadas, futuramente poderemos calcular agregados honestos, por exemplo:

`38% dos professores que escolheram planejamento apontaram BNCC como principal bloqueio`

Somente exibir depois de:

- base suficiente;
- metodologia definida;
- revisão LGPD;
- anonimização/agregação;
- fonte e período claros.

Nunca inventar números.

## Critério de qualidade

A descoberta falha se o professor precisar digitar para responder sobre:

- dor;
- rotina;
- dificuldade;
- frequência;
- planejamento;
- observação;
- arquivos;
- organização;
- prioridades;
- hábitos de trabalho.

Para esses temas, oferecer opções prontas e boas.

## Mantra

> **Conhecer o professor sem fazê-lo preencher um formulário.**

> **Tocar para responder. Digitar somente quando o dado realmente pertence à identidade dele.**
