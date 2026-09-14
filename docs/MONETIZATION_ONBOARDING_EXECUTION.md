# Monetização + Onboarding — Plano de execução Android 1.0

> Objetivo: concluir a entrada do Assistente Pedagógico como uma jornada de produto real, curta, convincente e monetizável, usando Google Play Billing como loja e RevenueCat como camada de entitlement/assinatura.

## Decisão de arquitetura

### Google Play

É a fonte da transação Android:

- produtos e base plans;
- preços localizados;
- cobrança;
- renovação;
- cancelamento;
- trial/ofertas;
- conta de pagamento;
- estado da compra na Play Store.

### RevenueCat

É a camada de produto/assinatura:

- Offering atual;
- packages mensal/anual;
- entitlement `pro`;
- compra via SDK;
- restore;
- `CustomerInfo`;
- leitura do acesso ativo;
- futura gestão de assinatura/Customer Center quando fizer sentido.

### Aplicativo

O app nunca decide acesso Pro por flag local de interesse.

A regra de produção é:

```text
Google Play confirma compra
-> RevenueCat atualiza CustomerInfo
-> entitlement `pro` ativo
-> aplicativo libera acesso
```

Nunca mostrar sucesso de compra antes de confirmar `pro` no `CustomerInfo`.

## Estado atual do código

O repositório já possui `@revenuecat/purchases-capacitor` e um adapter nativo em `src/data/subscriptionBilling.ts`.

Esse adapter já:

- configura RevenueCat via chave pública `VITE_REVENUECAT_API_KEY`;
- lê o entitlement configurável, default `pro`;
- consulta Offering atual;
- transforma packages da loja em ofertas exibíveis;
- consulta `CustomerInfo`;
- compra package;
- restaura compras;
- evita inventar preço no web/dev sem loja configurada.

Portanto: **não reimplementar billing do zero**. Endurecer o adapter existente e concluir a jornada.

## Produtos permitidos no Android 1.0

Somente:

- mensal;
- anual.

Direção comercial atual:

- mensal: referência de produto R$ 24,90/mês;
- anual: referência de produto R$ 149,90/ano;
- anual deve ser visualmente recomendado;
- trial de 7 dias no anual somente quando a loja/RevenueCat indicar elegibilidade/offer disponível.

### Proibido

- semanal;
- lifetime/vitalício;
- preço hardcoded apresentado como preço real da loja;
- trial prometido quando não houver elegibilidade confirmada;
- compra simulada apresentada como compra real.

Se RevenueCat retornar package não permitido para 1.0, não promovê-lo no paywall de produção.

## Configuração externa necessária

O Codex não deve inventar credenciais nem fingir que configurou consoles externos.

Registrar como configuração humana/externa quando ainda não estiver disponível:

### Google Play Console

1. app Android com package `br.com.assistentepedagogico.app`;
2. build enviado a uma faixa de teste adequada;
3. assinatura Pro criada;
4. base plan mensal;
5. base plan anual;
6. oferta de 7 dias no anual quando aplicável;
7. produtos ativados;
8. testadores/licence testing configurados.

IDs devem ser estáveis, legíveis e documentados. Não renomear depois de produção sem plano de migração.

### RevenueCat

1. projeto do Assistente Pedagógico;
2. app Google Play conectado;
3. credenciais Google Play configuradas no dashboard, nunca commitadas;
4. produtos importados;
5. entitlement `pro`;
6. mensal e anual anexados ao entitlement;
7. Offering de produção com packages mensal/anual;
8. chave pública Android disponibilizada ao build por ambiente/secret seguro.

Nenhuma chave secreta deve entrar no Git.

## Hardening obrigatório de billing

O Codex deve concluir:

- estado `unconfigured/preview` honesto para dev/QA;
- Offering ausente;
- loja indisponível;
- loading;
- erro de rede/SDK;
- usuário cancela compra;
- compra pendente;
- compra concluída mas entitlement ainda não ativo;
- entitlement ativo;
- restore com assinatura ativa;
- restore sem assinatura;
- assinatura expirada;
- app reiniciado com entitlement ativo;
- listener/refresh ao voltar da Play Store quando necessário;
- nenhuma regressão dos dados pedagógicos se assinatura expirar.

Acesso pedagógico/dados nunca deve ser apagado por expiração.

## Gestão da assinatura

Criar/terminar uma tela V2 de assinatura que permita:

- ver plano atual;
- ver estado real da assinatura;
- restaurar compras;
- abrir gestão da assinatura na Play Store ou Customer Center suportado;
- acessar termos e privacidade;
- lidar com indisponibilidade de loja sem dead end.

Não criar um painel financeiro falso.

---

# Onboarding

## Diagnóstico do fluxo V2 atual

Hoje existem duas camadas principais:

### `OnboardingV2`

5 páginas passivas/apresentacionais:

1. proposta geral;
2. planejamento;
3. acompanhamento;
4. materiais/offline;
5. encerramento.

Problema atual: a primeira página também pergunta `Gratuito` vs `Pro`, antes de o professor ter configurado o produto ou visto valor personalizado.

### `SetupWizardV2`

6 etapas funcionais:

1. tratamento;
2. nome;
3. etapa de ensino;
4. nome da primeira turma;
5. nível da turma;
6. turno.

Pontos positivos já implementados:

- rascunho persistente;
- retomada;
- erro de salvamento;
- confirmação ao sair;
- foco/acessibilidade;
- criação real de perfil/turma via callback;
- conclusão com caminho para primeiro aluno ou Home.

## Problema de UX

O onboarding completo está ficando longo porque temos:

- splash muito informativo;
- 5 telas de apresentação;
- 6 telas de configuração;
- assinatura/paywall ainda separada.

Isso cria sensação de "apresentação antes de poder trabalhar".

A meta não é ter poucas telas a qualquer custo. É chegar ao valor em **2–4 minutos**, com cada tela justificando sua existência.

## Nova cadência recomendada

### Etapa 0 — Splash

Curto, premium, silencioso.

### Etapa 1 — Apresentação

Máximo de **3 páginas**:

1. promessa principal — menos tempo organizando, mais clareza para ensinar;
2. planejamento + turma — mostrar utilidade concreta;
3. offline/privacidade + CTA `Configurar meu espaço`.

Não perguntar plano aqui.

### Etapa 2 — Setup guiado

Manter perguntas úteis, mas combinar quando isso reduzir fricção sem virar formulário pesado.

Target inicial:

1. nome + tratamento;
2. etapa de ensino;
3. primeira turma — nome + nível;
4. turno;
5. confirmação/personalização.

Campos opcionais de escola/cidade não devem bloquear primeira entrada. Podem ser completados depois no Perfil.

### Etapa 3 — Preview personalizado

Mostrar uma tela curta do tipo:

- "Seu espaço está pronto";
- nome do professor;
- turma criada;
- o que já pode fazer: planejar, chamada, registros;

Isso prova que as respostas tiveram efeito.

### Etapa 4 — Paywall

Somente depois de o valor estar contextualizado.

Fluxo:

```text
Splash
-> 3 telas de valor
-> setup guiado
-> preview personalizado
-> paywall real
-> compra/trial/restore
-> Home
```

Se a autoridade de produto vigente exigir hard paywall, não oferecer caminho visual enganoso de "gratuito" na jornada de produção. Preview/dev pode possuir bypass explícito de desenvolvimento, nunca disfarçado de produto final.

## Paywall V2

Deve:

- manter DNA da Home;
- mostrar mensal e anual vindos do Offering;
- recomendar anual sem manipulação;
- mostrar economia apenas se calculada com preços reais;
- mostrar trial somente quando realmente disponível/elegível;
- ter `Restaurar compras` visível;
- termos/privacidade acessíveis;
- explicar renovação/cobrança de forma clara;
- manter CTA estável durante loading;
- não usar countdown, dark pattern ou urgência falsa.

## Splash V2 — redesign obrigatório

O splash atual está visualmente ocupado demais e simula progresso baseado em tempo.

Remover da versão final:

- `ANDROID · 1.0`;
- porcentagem decorativa 0–100%;
- quatro dots de onboarding;
- lista `Planejar / Acompanhar / Transformar`;
- excesso de copy;
- progress bar que não corresponde a trabalho real.

### Novo splash

Queremos uma entrada memorável e simples:

- background sky-blue da marca;
- símbolo próprio/wordmark Assistente Pedagógico;
- movimento curto e tátil do símbolo;
- nome do produto;
- opcionalmente uma única frase curta;
- transição suave para próximo estado;
- Reduced Motion respeitado.

O splash deve sair assim que a inicialização necessária terminar. Não atrasar artificialmente a entrada para completar uma animação.

Se houver inicialização que realmente demore, mostrar um estado de loading honesto após o splash, não uma porcentagem falsa.

## Meta visual do splash

Sensação desejada:

`calmo + premium + educacional + reconhecível + rápido`

Não:

`loader de dashboard + tela de marketing + onboarding ao mesmo tempo`.

---

# Ordem de execução

1. preservar o restante da missão Android 1.0 em andamento;
2. endurecer `subscriptionBilling.ts`, sem reescrever do zero;
3. remover suporte visual a weekly/lifetime para produção;
4. criar contratos/testes para Offering mensal/anual + entitlement `pro`;
5. revisar `SubscriptionV2` para paywall real;
6. revisar onboarding: 5 páginas passivas -> máximo 3;
7. mover escolha de monetização para depois do setup/preview;
8. melhorar o setup, preservando persistência e retomada;
9. criar preview personalizado de conclusão;
10. redesenhar Splash V2;
11. conectar jornada completa;
12. E2E da entrada;
13. gerar APK QA;
14. validar em Android real.

## E2E obrigatório da jornada

```text
instalação limpa
-> splash
-> onboarding
-> configuração professor
-> primeira turma
-> preview personalizado
-> paywall
-> compra/trial OU restore real em ambiente de teste
-> entitlement pro
-> Home
-> matar app
-> reabrir
-> acesso continua correto
```

Também cobrir:

- compra cancelada;
- loja indisponível;
- Offering vazio;
- restore sem compra;
- app sem chave RevenueCat em dev;
- reduced motion;
- teclado;
- Android compacto;
- POCO X7 Pro no gate físico.

## Regra de evidência

Para onboarding/splash/paywall:

`HIPÓTESE -> RENDER 412 -> SCREENSHOT -> OBSERVAÇÃO -> CORREÇÃO`

Não gastar horas em abstração sem render.

## Linha de chegada desta frente

Somente considerar esta frente pronta quando:

- splash estiver visualmente aprovado;
- onboarding levar à configuração real;
- configuração criar perfil/turma reais;
- preview refletir dados reais;
- paywall usar dados reais da loja;
- compra liberar apenas por entitlement `pro`;
- restore funcionar;
- reinício preservar estado correto;
- nenhum preço/trial fictício aparecer em produção;
- jornada estiver coberta por E2E e APK QA.
