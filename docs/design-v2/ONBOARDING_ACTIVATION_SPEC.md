# Assistente Pedagógico — Onboarding & Activation Spec V1

Este documento define o onboarding como fluxo de ativação e personalização, não como carrossel publicitário.

## 1. Objetivo

Ao chegar ao hard paywall, o professor precisa saber:

- qual problema o app resolve;
- por que ele é relevante para a própria rotina;
- como o espaço foi personalizado;
- qual será sua primeira ação útil;
- que o acesso operacional exige assinatura;
- quanto custa e o que acontecerá no trial.

Rota principal alvo: 2–4 minutos. O número de telas é secundário; densidade cognitiva, clareza e abandono são as métricas importantes.

## 2. Princípios

1. Valor antes de perguntas.
2. Uma decisão principal por tela.
3. Só perguntar algo se a resposta mudar conteúdo, setup ou comunicação.
4. Não coletar dados por curiosidade de marketing.
5. Não pedir dados de alunos no onboarding.
6. Não pedir gênero, idade ou outros atributos pessoais sem necessidade real.
7. Não pedir permissões do SO antes de explicar a utilidade contextual.
8. Personalização deve ser perceptível depois; pergunta sem consequência é ruído.
9. Progresso deve ser honesto; não usar barra falsa que desacelera.
10. Back deve preservar respostas.

## 3. Arquitetura de fases

### Fase A — Entender o valor

#### Tela 1 — Promessa

Objetivo: primeira impressão.

Conteúdo:

- marca discreta;
- headline `Menos tempo organizando. Mais clareza para ensinar.`;
- subtítulo curto explicando planejamento, turma e registros em um fluxo;
- ilustração humana/editorial V2;
- CTA `Começar`;
- link `Já tenho uma assinatura / Restaurar` quando necessário.

Não mostrar preço ainda. Pode existir microcopy discreta: `O acesso completo funciona por assinatura após a configuração inicial.`

#### Tela 2 — O fluxo conectado

Mostrar visualmente:

`Planejar -> Dar aula -> Registrar -> Acompanhar`

Evitar quatro cards iguais. Usar composição editorial/shared geometry.

CTA `Continuar`.

#### Tela 3 — Benefício recorrente

Headline exemplo:

`Sua rotina muda todos os dias. Seu espaço acompanha.`

Mostrar agenda, chamada, arquivos e planejamento como estados do mesmo sistema.

No final: `Agora vamos adaptar o Assistente à sua rotina.`

### Fase B — Configuração da sua rotina

Progress indicator real: por exemplo `1 de 6`, adaptável conforme branching.

#### Tela 4 — Nome de exibição

Pergunta: `Como você prefere ser chamado(a) aqui?`

Campo nome de exibição.

Uso permitido:

- saudação local;
- headline personalizada do paywall;
- perfil.

Nunca enviar o valor para analytics.

#### Tela 5 — Etapas de ensino

Pergunta: `Com quais etapas você trabalha?`

Opções multi-select:

- Educação Infantil;
- Fundamental I;
- Fundamental II;
- Ensino Médio;
- EJA/outros apenas quando o modelo pedagógico suportar.

A resposta altera formulários/turmas/recomendações internas.

#### Tela 6 — Contexto de disciplina

Mostrar somente quando relevante.

Pergunta: `Você trabalha principalmente com quais componentes?`

Multi-select com opção `Sou polivalente / multidisciplinar`.

Não obrigar lista completa.

#### Tela 7 — Quantidade aproximada de turmas

Pergunta: `Quantas turmas fazem parte da sua rotina?`

Faixas, não número exato se não necessário:

- 1;
- 2–3;
- 4–6;
- 7+.

Analytics pode receber apenas a faixa enum, nunca nome de turma.

#### Tela 8 — Principal atrito

Pergunta: `O que mais consome seu tempo hoje?`

Escolher até 2:

- planejar aulas;
- fazer chamada e acompanhar frequência;
- organizar registros dos alunos;
- encontrar arquivos e materiais;
- acompanhar avaliações/notas;
- lembrar compromissos e prazos.

A resposta muda a ordem de benefícios do preview/paywall e, se seguro, a prioridade da primeira Home.

#### Tela 9 — Ritmo de planejamento

Pergunta: `Como você costuma planejar?`

- no dia anterior;
- por semana;
- por quinzena;
- por mês;
- varia bastante.

Isso pode sugerir a visão inicial Dia/Semana/Mês.

#### Tela 10 — Objetivo imediato

Pergunta: `O que faria o app valer a pena para você já nesta semana?`

Opções fechadas derivadas das funções reais. Não usar campo livre nesta fase.

Exemplos:

- entrar na aula com o plano pronto;
- concluir a chamada sem papel;
- centralizar registros;
- preparar a semana mais rápido;
- organizar materiais.

Essa resposta pode ser relembrada no preview/paywall de modo factual.

### Fase C — Transformar respostas em contexto real

#### Tela 11 — Resumo personalizado

Não é “diagnóstico”.

Headline:

`Entendi sua rotina.`

Copy dinâmica, exemplo:

`Vamos priorizar planejamento semanal e frequência para suas turmas do Fundamental I.`

Mostrar 2–3 consequências concretas das respostas.

CTA `Preparar meu espaço`.

#### Tela 12 — Primeira turma opcional/recomendada

Perguntar apenas contexto mínimo:

- nome/apelido local da turma;
- etapa/ano;
- componente, se aplicável;
- turno.

Não pedir aluno, matrícula, escola ou dados sensíveis.

Se usuário não quiser criar agora, oferecer `Criar depois`. O preview deve continuar funcional com dados demonstrativos explicitamente marcados como exemplo.

#### Tela 13 — Preferência de aparência essencial

Somente se já suportado:

- sistema;
- claro;
- escuro.

Não atrasar onboarding com customização cosmética extensa.

### Fase D — Conta e persistência

A posição exata depende da autenticação real existente.

Regra:

- se conta remota estiver pronta e for necessária para sincronização/recuperação, pedir criação/login aqui;
- se não estiver pronta, não criar tela falsa; usar perfil local e RevenueCat anonymous identity conforme arquitetura existente.

Conta não deve apagar respostas já fornecidas.

### Fase E — Preview personalizado

#### Tela 14 — “Seu espaço está pronto”

Esta é uma das telas mais importantes do funil.

Mostrar uma preview V2 da Home baseada em respostas:

- saudação pelo nome somente localmente;
- foco principal alinhado ao atrito escolhido;
- primeira turma real, se criada;
- agenda/planejamento demonstrativos claramente distinguíveis quando forem exemplo;
- 2–3 benefícios que o usuário acaba de configurar.

Não permitir interação que pareça salvar dados se estiver em demo.

Motion: elementos do setup podem se reorganizar via shared geometry para formar a preview.

CTA `Continuar`.

#### Tela 15 — Primeira ação imaginada

Em vez de outro marketing slide, mostrar uma micro-preview da primeira ação útil:

- planejamento se esse foi o objetivo;
- chamada se frequência foi o atrito;
- arquivos se organização foi prioridade.

Copy:

`Quando você entrar amanhã, é daqui que começa.`

CTA `Ver acesso Pro`.

### Fase F — Hard paywall

Seguir `PAYWALL_SUBSCRIPTION_SPEC.md`.

## 4. Personalização permitida

Pode personalizar:

- headline do paywall com nome de exibição local;
- ordem dos benefícios;
- exemplo visual do preview;
- CTA pós-compra;
- primeira ação sugerida na Home;
- visão inicial de Planejamento;
- lembretes sugeridos.

Não personalizar preço com base em perfil pessoal. Pricing varia apenas por store/geo/experimento legítimo.

## 5. Microcopy psicológica permitida

### Compromisso consciente

Relembrar escolha real:

`Você disse que quer preparar a semana com mais clareza.`

Não dizer:

`Você se comprometeu a ser um professor melhor.`

### Endowment / propriedade

Permitido:

`Seu espaço está pronto.`

Porque o sistema realmente foi configurado.

Não permitido:

`Tudo isso será perdido em 5 minutos.`

### Progresso

Mostrar `4 de 6` somente se restarem duas etapas reais.

### Confiança

Explicar o que acontece depois:

`Hoje: 7 dias de acesso Pro. Em {data}: R$ X/ano se você não cancelar antes.`

## 6. Permissões

Não pedir no onboarding genérico:

- câmera;
- arquivos;
- notificações;
- microfone.

Pedir somente ao acionar função correspondente.

Exceção: trial reminder pode pedir notificação no paywall/confirmation se usuário ativar voluntariamente `Lembrar antes da cobrança`.

## 7. Analytics por etapa

Eventos permitidos:

- onboarding_started;
- onboarding_step_viewed `{step_id, version}`;
- onboarding_step_completed `{step_id, version}`;
- onboarding_back_used `{step_id}`;
- onboarding_skipped_optional `{step_id}`;
- onboarding_goal_selected `{goal_key}`;
- onboarding_pain_selected `{pain_key}`;
- onboarding_stage_selected `{stage_key}`;
- onboarding_class_count_band `{band}`;
- onboarding_completed `{version}`;
- personalized_preview_viewed `{variant}`.

Não enviar valores livres, nome, disciplina digitada, turma digitada ou conteúdo pedagógico.

## 8. Métricas de onboarding

Primárias:

- start -> preview completion;
- drop-off por step;
- tempo mediano total;
- preview -> paywall;
- paywall -> trial/purchase.

Guardrails:

- back rate;
- permission denial;
- crash/error;
- suporte reclamando de pergunta invasiva;
- abandono depois de revelar assinatura.

## 9. Regra de redução

Se uma tela tiver abandono relevante e sua informação não causar personalização comprovável, remover/combinar.

Onboarding longo só é permitido quando cada etapa paga seu custo cognitivo.

## 10. Experimentos iniciais aprovados

Depois de baseline estável, um por vez:

1. 3 telas de valor vs. 2;
2. ordem de `principal atrito` e `ritmo de planejamento`;
3. preview simples vs. preview interativa controlada;
4. headline personalizada com nome vs. sem nome;
5. primeira turma antes vs. depois da compra, se houver evidência de drop-off.

Não experimentar perguntas sensíveis para “ver se converte”.

## 11. Estados e recuperação

- fechar app no step 8 -> retomar no step 8 com respostas locais;
- falha de storage -> não avançar fingindo persistência;
- offline -> onboarding funciona, exceto ações realmente remotas;
- RevenueCat indisponível -> concluir preview e mostrar estado recuperável no paywall;
- package não carregou -> nunca inventar preço;
- usuário já assinante -> pular hard paywall após confirmação/cache seguro e concluir setup necessário.

## 12. Motion

Motion deve reforçar continuidade:

- progress indicator via shared element;
- opção selecionada com indicador viajando, não flash;
- respostas podem alimentar composição da preview;
- preview se transforma no shell real após compra;
- nada de transição longa entre todas as perguntas;
- Reduced Motion substitui translação/scale grande por opacity/estado instantâneo legível.

Seguir `MOTION_SYSTEM_V2.md`.

## 13. Definition of Done

- rota principal em 2–4 min em teste interno;
- nenhuma pergunta sem uso documentado;
- back preserva estado;
- resume após app kill;
- offline testado;
- nenhuma permissão prematura;
- analytics respeita allowlist;
- screenshots 360/390/430;
- gravação do fluxo principal;
- Reduced Motion;
- preview claramente derivada de respostas;
- assinatura não é surpresa ao final;
- hard paywall segue política e spec.