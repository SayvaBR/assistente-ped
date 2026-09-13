# Volume 1 — Entrada, Conta, Setup Inicial e Assinatura

Este volume define como construir as telas/estados 1–11 e deve ser lido junto com:

- `GROWTH_MONETIZATION_SYSTEM.md`;
- `ONBOARDING_ACTIVATION_SPEC.md`;
- `PAYWALL_SUBSCRIPTION_SPEC.md`;
- `ANALYTICS_EXPERIMENTATION_RETENTION.md`;
- `MONETIZATION_ETHICS.md`;
- `MOTION_SYSTEM_V2.md`.

As decisões de Growth são vinculantes. O baseline V1 usa hard paywall após ativação guiada; não existe plano gratuito funcional do núcleo.

## Recursos existentes a preservar/reusar

- `src/screens/SplashScreen.js` + `SplashScreen.css`
- `src/screens/Onboarding.tsx`
- `src/screens/SetupWizard.js`
- `src/screens/WelcomeScreen.js`
- `src/screens/TeacherProfileScreen.js`
- `src/screens/ClassManager.tsx` / `ClassesScreen.js`
- `src/screens/SubscriptionScreen.tsx`
- `src/data/classes.js`
- `src/data/localStore.ts`
- `src/data/subscriptionRepository.ts`
- `src/data/subscriptionBilling.ts`
- `src/domain/subscription.ts`
- `src/domain/subscriptionBilling.ts`
- RevenueCat via `@revenuecat/purchases-capacitor`
- Capacitor App/Local Notifications quando aplicável

A UI pode ser profundamente reescrita. Contratos de persistência/billing devem ser preservados ou migrados explicitamente. Se algum recurso listado não existir na branch de implementação, não criar UI fictícia para simular funcionalidade.

---

# 1. Splash e inicialização

## Objetivo

Abrir o app rápido e decidir corretamente entre onboarding, setup incompleto, hard paywall, Home ou recuperação de erro.

## Layout

1. Safe area superior vazia.
2. Centro visual: marca/símbolo 88–112px.
3. `Assistente Pedagógico` abaixo.
4. Microcopy opcional: `Organizando o que importa para sua rotina.`
5. Progresso discreto apenas se bootstrap exceder ~400ms.
6. Rodapé de estado somente quando necessário.

## Lógica de bootstrap

`Native splash -> storage -> migração -> preferências/setup -> entitlement cache -> refresh RevenueCat em background -> decisão de rota`

Regras:

- usuário com entitlement válido/cache seguro pode entrar offline;
- ausência temporária de rede não derruba assinante legítimo;
- usuário novo segue para onboarding;
- setup concluído + entitlement ausente/expirado segue para paywall/expired state, não Home operacional;
- corrupção/migração nunca autoriza apagar dados automaticamente.

## Estados

- rápido;
- loading;
- migração;
- offline seguro;
- erro recuperável;
- erro de storage/migração;
- RevenueCat indisponível com cache válido;
- entitlement expirado.

## Motion

Fade + scale discreto, sem loop. Reduced Motion.

---

# 2. Onboarding e apresentação do produto

A implementação detalhada vive em `ONBOARDING_ACTIVATION_SPEC.md`.

## Objetivo

Levar o professor de `não conheço o produto` para `entendo o valor, vejo que foi adaptado à minha rotina e sei o que poderei fazer`, antes do hard paywall.

Não é carrossel de 3 slides.

## Arquitetura resumida

1. promessa de valor;
2. fluxo conectado `Planejar -> Dar aula -> Registrar -> Acompanhar`;
3. benefício recorrente;
4. nome de exibição;
5. etapas de ensino;
6. disciplinas/contexto quando relevante;
7. quantidade aproximada de turmas;
8. principal atrito;
9. ritmo de planejamento;
10. objetivo imediato;
11. resumo personalizado;
12. primeira turma opcional/recomendada;
13. preferência essencial de aparência quando suportada;
14. conta/persistência quando realmente disponível;
15. preview personalizado;
16. micro-preview da primeira ação útil;
17. hard paywall.

Branching pode reduzir a rota. Alvo: 2–4 minutos na rota principal.

## Regras

- valor antes de perguntas;
- uma decisão principal por tela;
- nenhuma pergunta sem consequência real;
- não pedir dados de aluno;
- não pedir gênero/idade sem necessidade;
- não usar “diagnóstico” falso;
- mencionar antes do fim que o acesso completo funciona por assinatura;
- back preserva respostas;
- app kill retoma fluxo;
- não pedir notificações/câmera/arquivos/microfone sem contexto.

---

# 3. Cadastro de conta

## Objetivo

Criar identidade de acesso somente se a infraestrutura de conta existir de verdade.

## Posição no fluxo

Preferência V1: depois que o usuário já entendeu valor e forneceu contexto de personalização, antes da compra quando conta for necessária para sync/recuperação.

Se backend/auth ainda não existir, não construir cadastro falso. Manter perfil local e arquitetura de identidade RevenueCat conforme suporte real.

## Layout

1. TopBar/back;
2. `Crie sua conta`;
3. explicação curta do benefício de recuperação/sincronização;
4. providers externos somente se configurados;
5. separador `ou`;
6. nome;
7. email;
8. senha;
9. requisitos;
10. Termos/Privacidade;
11. CTA `Criar conta`;
12. `Já tenho uma conta`.

Não usar `É rápido e gratuito` porque o núcleo do produto é por assinatura; conta pode ser gratuita, mas a frase cria ambiguidade comercial.

## Privacidade

Nunca enviar nome/email/senha a analytics. Senha nunca em storage local plaintext.

---

# 4. Login e recuperação de acesso

## Login

1. voltar;
2. `Bem-vindo(a) de volta`;
3. email;
4. senha;
5. `Esqueceu a senha?`;
6. CTA `Entrar`;
7. providers reais;
8. `Criar conta`.

Depois do login:

- recuperar perfil/setup;
- recuperar entitlement;
- se entitlement válido, seguir para setup restante/Home;
- se não, seguir para preview/paywall sem apagar dados.

## Recuperação

- resposta neutra para evitar enumeração;
- cooldown de reenvio;
- nunca simular email enviado.

---

# 5. Configuração inicial do perfil docente

Parte integrante do onboarding adaptativo; detalhes em `ONBOARDING_ACTIVATION_SPEC.md`.

## Coletar

- nome de exibição;
- etapas de atuação;
- componente/disciplina quando relevante;
- contexto profissional estritamente necessário.

## Não coletar no onboarding

- escola;
- endereço;
- CPF;
- gênero;
- data de nascimento;
- dados de alunos;
- foto obrigatória.

Avatar/foto, se houver, é opcional e a permissão só aparece depois de ação explícita.

---

# 6. Criação da primeira turma

## Objetivo

Criar contexto real para a preview e primeira ação, sem transformar onboarding em cadastro administrativo longo.

## Campos mínimos

- nome/apelido local;
- etapa/ano;
- turno;
- componente quando necessário.

Não pedir alunos aqui.

## Comportamento

- `Criar turma` recomendado;
- `Criar depois` permitido;
- se pular, preview usa dados demonstrativos claramente marcados como exemplo;
- turma real criada deve aparecer depois da compra sem recriação.

Analytics não recebe nome da turma.

---

# 7. Personalização inicial do app

No onboarding, personalização significa **rotina**, não customização cosmética extensa.

## V1

- tema Sistema/Claro/Escuro, se já suportado;
- prioridade derivada de objetivo/atrito;
- visão inicial de planejamento sugerida pelo ritmo informado.

## Adiar

- cor de destaque livre;
- dezenas de preferências visuais;
- notificações genéricas.

Permissões de notificação só aparecem no contexto de uma função real, como lembrete de trial ou ritual semanal opt-in.

---

# 8. Escolha de plano

## Decisão de UX

**Não criar uma tela separada obrigatória antes do paywall.**

A escolha Anual/Mensal é um componente do próprio hard paywall. Manter o item 8 como estado conceitual/documental para arquitetura, mas a rota V1 deve reduzir fricção e apresentar seleção + benefícios + termos em uma única superfície.

Uma tela separada só pode surgir por experimento posterior.

## Baseline Brasil

- Pro Anual: R$ 149,90/ano, recomendado;
- Pro Mensal: R$ 24,90/mês;
- trial: 7 dias no anual quando elegível;
- sem weekly;
- sem lifetime;
- sem free tier funcional.

A UI nunca hardcode esses valores: ler package/store/RevenueCat.

---

# 9. Hard Paywall / assinatura

A anatomia completa vive em `PAYWALL_SUBSCRIPTION_SPEC.md`.

## Ordem de cima para baixo

1. TopBar com voltar/fechar >=48px;
2. restaurar compras claramente encontrável;
3. headline personalizada localmente quando possível: `{Nome}, seu espaço docente está pronto.`;
4. subheadline de transformação;
5. 3–5 benefícios reais, ordenados pelo contexto do onboarding;
6. seletor Anual/Mensal;
7. timeline clara do trial quando aplicável;
8. controle opt-in `Lembrar 2 dias antes do fim do teste`;
9. CTA de compra específico ao estado;
10. microcopy de preço posterior/renovação;
11. Termos/Privacidade/como cancelar;
12. link de suporte humano.

## Regras comerciais

- anual selecionado por padrão;
- mensal sempre visível;
- anual total mais destacado que equivalente mensal;
- economia calculada em runtime;
- trial eligibility real;
- sem desconto falso;
- sem esconder plano após toggle;
- sem timer/urgência falsa;
- sem confirmshaming;
- sem benefício ainda não implementado;
- sem segurança/LGPD como feature premium.

## Purchase

1. load offerings;
2. selecionar package;
3. CTA bloqueia double submit;
4. purchase real;
5. cancelamento pelo usuário = estado neutro;
6. erro = retry seguro;
7. sucesso somente após entitlement confirmado;
8. persistir snapshot conforme repository/domain;
9. então seguir para confirmação.

## Trial reminder

Só agendar após trial confirmado. Se o usuário ativou lembrete:

- pedir permissão contextual;
- agendar 48h antes com data real;
- revalidar ao retornar;
- oferecer aviso in-app;
- não prometer entrega garantida pelo SO.

---

# 10. Confirmação de assinatura

## Objetivo

Transformar compra confirmada em confiança + próxima ação útil.

## Layout

1. success visual V2;
2. heading:
   - trial: `Seu acesso Pro começou!`;
   - compra direta: `Assinatura confirmada!`;
   - restore: `Compra restaurada!`;
3. resumo factual do plano/estado;
4. se reminder ativo, confirmação do agendamento;
5. `Agora você pode…` com 2–3 itens;
6. CTA **personalizado pela meta do onboarding**.

Exemplos:

- `Criar meu primeiro plano`;
- `Organizar minha semana`;
- `Fazer minha primeira chamada`.

Não usar `Ir para o início` como único CTA se já conhecemos uma ação de valor melhor.

## Lógica

Tela só aparece com entitlement real ativo.

Motion de sucesso não pode antecipar billing.

---

# 11. Primeiro sucesso / entrada na Home

## Objetivo

Fazer o preview virar produto real e levar à ativação.

## Transição

Preferir continuidade espacial: preview do onboarding se reorganiza/transforma no shell real quando possível. Reduced Motion usa fade/estado simples.

## Home inicial

Deve refletir:

- turma criada, se houver;
- objetivo/atrito principal;
- visão de planejamento preferida;
- primeira ação recomendada.

Não exibir marketing para assinante recém-convertido. Entregar valor.

## Métrica de ativação

Compra não é ativação. Registrar `first_value_action_completed` somente após uma ação docente real definida em `GROWTH_MONETIZATION_SYSTEM.md`.

---

# 12. Estados de assinatura que este volume precisa cobrir

Mesmo que telas de gerenciamento apareçam no Volume 6, entrada precisa rotear corretamente:

- active paid;
- trial active;
- cancelled but active until date;
- grace period/payment issue;
- expired;
- restore pending/success/none;
- offline cache valid;
- RevenueCat unavailable;
- offering unavailable.

Nunca apagar dados por mudança de estado de assinatura.

---

# 13. Analytics deste volume

Seguir exclusivamente `ANALYTICS_EXPERIMENTATION_RETENTION.md`.

Proibido free text/PII/student data.

RevenueCat = verdade financeira/experiment attribution.

Aptabase EU = produto anônimo por allowlist, via adapter interno, após revisão final da implementação.

---

# 14. Gate deste volume

Antes de considerar entrada/onboarding/assinatura prontos, anexar:

- splash rápido/loading/error;
- gravação do onboarding principal;
- retomada após fechar/reabrir app;
- preview personalizada;
- 360/390/430;
- keyboard/focus;
- Reduced Motion;
- offline;
- paywall offering loading/error;
- anual com trial elegível;
- anual sem trial;
- mensal;
- purchase user-cancelled;
- purchase error;
- entitlement success;
- restore success/none;
- cancelled-but-active;
- expired/read-only recovery;
- reminder permission allow/deny;
- evidência de preço/moeda reais da store;
- lista de eventos analytics + properties;
- confirmação de zero PII/student/free-text em analytics;
- Android real.

O volume falha mesmo funcionalmente correto se o onboarding parecer interrogatório, o paywall parecer genérico/manipulativo ou a compra não tiver clareza suficiente.