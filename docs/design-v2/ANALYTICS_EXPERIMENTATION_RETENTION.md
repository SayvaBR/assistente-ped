# Assistente Pedagógico — Analytics, Experimentação & Retenção V1

Este documento define como medir o funil sem transformar o Assistente Pedagógico em um sistema de vigilância.

## 1. Arquitetura aprovada

### RevenueCat

Usar para:

- offerings/packages;
- entitlement;
- trial;
- purchase;
- renewal;
- cancellation;
- refund;
- revenue;
- experiments de monetização;
- paywall placements quando aplicável.

RevenueCat é a fonte de verdade financeira.

### Aptabase EU

Usar como analytics de produto anônimo, manual e restrito.

Motivos da escolha:

- sem cookies;
- sem device identifiers;
- sem fingerprinting;
- sem identificação persistente de longo prazo;
- data residency EU;
- SDK React pequeno;
- nenhum autocapture necessário;
- eventos são enviados somente quando o app chama `trackEvent`.

Antes de produção, documentar DPA, região escolhida, app key handling, política de privacidade e revisão da versão do SDK.

### Adapter interno

Criar algo equivalente a:

`src/analytics/analytics.ts`

Nenhum componente deve importar `@aptabase/react` diretamente.

API sugerida:

```ts
track(event: AnalyticsEvent, props?: SafeAnalyticsProperties): void
```

O adapter deve:

- validar nome do evento;
- validar propriedades por allowlist;
- eliminar chaves desconhecidas;
- nunca aceitar objetos arbitrários;
- ser no-op quando analytics estiver desabilitado/indisponível;
- não bloquear UI;
- permitir testes unitários sem rede.

## 2. Política de dados

### Nunca coletar

- nome;
- email;
- telefone;
- escola;
- nome/ID de aluno;
- nome livre de turma;
- matrícula;
- notas;
- presença por aluno;
- observações;
- objetivos pedagógicos digitados;
- texto de planejamento;
- nomes de arquivos;
- conteúdo de documento;
- conteúdo de suporte;
- fotos/áudio;
- qualquer free text.

### Permitido

Somente enums/faixas previamente definidas, por exemplo:

- `stage_key: fundamental_1`;
- `class_count_band: 2_3`;
- `pain_key: planning`;
- `screen_key: onboarding_goal`;
- `plan: annual`;
- `error_category: store_unavailable`;
- `app_version`;
- `platform` quando o SDK fornecer de forma não identificável.

Não enviar timestamp customizado, localização, IP ou device ID pelo app.

## 3. Taxonomia inicial

### App

- app_opened;
- app_bootstrap_failed `{category}`;
- offline_mode_entered;

### Onboarding

- onboarding_started `{version}`;
- onboarding_step_viewed `{step_id, version}`;
- onboarding_step_completed `{step_id, version}`;
- onboarding_back_used `{step_id}`;
- onboarding_optional_skipped `{step_id}`;
- onboarding_pain_selected `{pain_key}`;
- onboarding_goal_selected `{goal_key}`;
- onboarding_class_count_band `{band}`;
- onboarding_completed `{version}`;
- personalized_preview_viewed `{variant}`.

### Paywall

- paywall_viewed `{placement, variant}`;
- paywall_plan_selected `{plan}`;
- trial_reminder_toggled `{enabled}`;
- paywall_cta_tapped `{plan}`;
- purchase_cancelled `{plan}`;
- purchase_error `{plan, category}`;
- restore_started;
- restore_result `{result}`.

### Ativação

- first_class_created;
- first_plan_completed;
- first_attendance_completed;
- first_observation_created;
- first_file_organized;
- first_value_action_completed `{action_key}`.

Nenhum evento carrega quantidade/nome de alunos ou conteúdo.

### Retenção de uso

Eventos de alto nível e baixa cardinalidade:

- daily_home_opened;
- planning_session_completed `{view: day|week|month}`;
- attendance_session_completed;
- weekly_preparation_completed;
- report_generated `{report_type}`;
- backup_completed `{result}`.

Não rastrear cada toque ou cada aluno marcado presente.

## 4. Funnel dashboard mínimo

Acompanhar por app version e onboarding version:

1. installs/first opens quando a fonte permitir sem identificação invasiva;
2. onboarding_started;
3. cada step viewed/completed;
4. personalized_preview_viewed;
5. paywall_viewed;
6. RevenueCat trial_started/purchase;
7. first_value_action_completed;
8. renewal/cancellation/refund.

Aptabase e RevenueCat não precisam ser unidos por identidade individual. Comparar tendências agregadas e usar RevenueCat Experiments para atribuição de variantes financeiras.

## 5. A/B testing — regra de ouro

Um teste altera uma hipótese principal por vez.

Template obrigatório:

- hipótese;
- variante controle;
- variante tratamento;
- população elegível;
- data de início;
- métrica primária;
- métricas guardrail;
- janela de decisão;
- resultado;
- decisão;
- aprendizado.

Não encerrar cedo apenas porque uma variante parece ganhar nos primeiros dias.

## 6. Roadmap de experimentação

### Fase 0 — Instrumentação

Nenhum experimento. Validar eventos, funil e billing.

### Fase 1 — Onboarding

Objetivo: aumentar chegada ao preview/paywall sem reduzir entendimento.

Testes possíveis:

- remover/combinar step com drop-off e baixa utilidade;
- ordem de perguntas;
- preview personalizada;
- nome na headline.

### Fase 2 — Paywall

- copy orientada a objetivo;
- hierarquia visual;
- timeline do trial;
- posição de benefícios.

### Fase 3 — Trial

7 vs. 14 dias.

Não julgar por trial-start apenas. Considerar paid conversion, revenue, cancel/refund.

### Fase 4 — Pricing

Testar anual mantendo mensal fixo.

Não rodar price test sem quantidade de usuários suficiente para decisão minimamente confiável.

### Fase 5 — Retenção/win-back

Somente depois que ativação e produto estiverem estáveis.

## 7. Métricas principais

### Onboarding completion

`onboarding_completed / onboarding_started`

### Paywall reach

`paywall_viewed / onboarding_started`

### Trial start

RevenueCat.

### Download/first-open -> paid

RevenueCat/store benchmark quando disponível.

### Activation 24h

Usuário com trial/assinatura que executa uma ação operacional significativa em até 24h.

### Trial-to-paid

RevenueCat.

### Refund/cancel guardrails

RevenueCat.

### Retenção

Financeira: RevenueCat.

Produto: usar métricas agregadas de ações úteis e frequência semanal sem construir fingerprint/ID persistente no Aptabase.

## 8. Estratégia de retenção

### Dia 0

Objetivo: primeira ação real logo após compra.

SubscriptionSuccess deve oferecer CTA personalizado:

- `Criar meu primeiro plano`;
- `Fazer minha primeira chamada`;
- `Organizar minha semana`.

Escolher com base no objetivo do onboarding.

### Dias 1–7

Home deve sempre responder:

- o que tenho hoje;
- o que precisa de ação;
- qual é o próximo passo.

Não mostrar banners de marketing para assinante recém-convertido; entregar produto.

### Ritual semanal

Oferecer, de forma opt-in:

`Preparar minha semana`

Pode agendar lembrete em horário escolhido pelo professor.

Exemplo:

`Domingo, 18h — revisar aulas da semana`

Nunca presumir domingo/horário; perguntar.

### Lembretes úteis

Categorias separadas:

- agenda/compromissos;
- planejamento;
- chamada pendente;
- backup/sincronização importante;
- trial;
- novidades/marketing.

Marketing deve ser separado de lembretes operacionais.

### Sem streak punitivo

Não usar:

- `Você perdeu sua sequência!`;
- fogo apagando;
- culpa;
- ameaças de atraso.

É permitido celebrar consistência de forma profissional quando útil:

`Semana organizada: 5 aulas planejadas.`

Somente se factual.

## 9. Trial reminder

Se usuário opt-in:

- schedule 48h antes;
- in-app banner também disponível;
- copy clara;
- link para gerenciar/cancelar.

Exemplo:

`Seu teste Pro termina em 2 dias. Depois disso, o plano anual será renovado por R$ X/ano, salvo cancelamento anterior.`

Sem `Última chance!`.

## 10. Billing recovery

RevenueCat/Google Play podem indicar grace period/payment issue.

Durante grace period:

- não fingir expiração se entitlement ainda estiver válido;
- mostrar aviso discreto e acionável;
- `Atualizar forma de pagamento` / `Gerenciar assinatura`;
- preservar dados e contexto.

Métrica: billing issue recovered, quando RevenueCat suportar.

## 11. Cancelamento

Quando cancelado, mas ainda ativo:

`Sua assinatura continua ativa até {data}.`

Não insistir com modal a cada abertura.

Pode haver um único card discreto em Configurações/Assinatura com `Reativar renovação`, se a loja permitir.

Feedback de cancelamento é opcional e sem dados pedagógicos.

## 12. Win-back

Depois da expiração:

- paywall de retorno pode reconhecer `Bem-vindo de volta`;
- mostrar o que mudou desde então somente se factual;
- oferta de win-back apenas se configurada na loja/RevenueCat;
- não inventar `50% por hoje`;
- limitar frequência de exibição.

Usuário sempre mantém acesso a gerenciamento/privacidade/portabilidade.

## 13. Suporte humano

Adicionar canal `Falar com a equipe` em:

- paywall;
- Configurações > Ajuda;
- erros de billing relevantes.

Antes do campo de mensagem:

`Para proteger sua turma, não envie nomes, notas, fotos ou outras informações identificáveis de alunos.`

Não anexar automaticamente logs com conteúdo do usuário.

Analytics pode registrar `support_opened {source}` sem conteúdo da mensagem.

## 14. Feedback in-app

Perguntar em momentos apropriados, não durante tarefa crítica.

Exemplos:

- depois de 3–5 usos relevantes;
- após primeira semana;
- após conclusão de workflow.

Perguntas curtas. Campo livre é dado potencialmente pessoal e não vai para analytics.

## 15. Privacidade e consentimento

Analytics deve ser explicado na política de privacidade e, quando juridicamente/estrategicamente necessário, controlável em `Privacidade e segurança`.

Desligar analytics não pode afetar produto, assinatura, sincronização ou suporte.

RevenueCat/billing necessário ao serviço deve ser tratado separadamente de analytics opcional.

## 16. QA

Validar:

- nenhum evento com free text;
- nenhum evento com student data;
- nenhum email/nome em payload;
- eventos não duplicados em re-render;
- fluxo offline não bloqueado por analytics;
- SDK failure nunca quebra UI;
- app key não é tratada como segredo capaz de autorizar operações sensíveis;
- experiment variant exibida corresponde ao offering RevenueCat;
- cancel/refund não contam como sucesso;
- notification permissions são contextuais.