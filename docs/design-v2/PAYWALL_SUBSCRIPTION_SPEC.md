# Assistente Pedagógico — Hard Paywall & Subscription Spec V1

Este documento define a primeira experiência de monetização do Assistente Pedagógico.

## 1. Estratégia

O produto usa **hard paywall depois de uma ativação guiada**, não freemium.

O usuário chega ao paywall depois de:

- entender a proposta de valor;
- responder apenas perguntas úteis à personalização;
- opcionalmente criar sua primeira turma;
- ver um preview personalizado do espaço que será usado.

O usuário não entra na Home operacional sem entitlement válido/trial ativo.

## 2. Planos de lançamento

### Pro Anual — recomendado

- R$ 149,90/ano no baseline brasileiro;
- 7 dias de trial, sujeito à eligibility real da loja;
- selecionado por padrão;
- mostrar preço anual total com maior destaque;
- linha secundária pode informar equivalência mensal aproximada;
- mostrar economia vs. 12 meses do mensal apenas calculada em runtime.

### Pro Mensal — flexível

- R$ 24,90/mês no baseline brasileiro;
- sem trial no baseline;
- alternativa visível e legítima.

### Não oferecer no lançamento

- semanal;
- vitalício;
- moedas/créditos;
- “oferta exclusiva” falsa;
- desconto inventado.

## 3. Anatomia da tela

### Topo

1. `TopBar` mínima.
2. Ação voltar/fechar claramente visível e >=48x48.
3. `Restaurar compras` disponível no topo ou logo abaixo, nunca escondido no rodapé ilegível.

Fechar não dá acesso ao app completo; volta ao preview/explicação de assinatura.

### Hero

Headline deve refletir a personalização quando houver nome localmente disponível.

Baseline:

`{Nome}, seu espaço docente está pronto.`

Fallback:

`Seu espaço docente está pronto.`

Subheadline:

`Planejamento, turmas, registros e arquivos em um único fluxo para a sua rotina.`

Não usar coroa genérica como símbolo dominante. Preferir composição editorial V2 derivada do preview/onboarding.

### Benefícios

Mostrar 3–5 benefícios, ordenados conforme objetivo/atrito selecionado no onboarding, mas sempre baseados em recursos reais.

Biblioteca aprovada de benefícios:

- `Planeje sua semana com mais clareza` — Dia, Semana, Mês, planos e BNCC em um fluxo.
- `Faça a chamada sem depender de papel` — frequência integrada à turma e histórico.
- `Centralize registros pedagógicos` — observações e acompanhamento no contexto certo.
- `Pare de procurar materiais espalhados` — arquivos, pastas e favoritos no mesmo espaço.
- `Acompanhe o que aconteceu sem refazer trabalho` — histórico e relatórios a partir dos registros existentes.

Não usar benefícios que ainda não existam na implementação.

### Seletor de plano

Duas opções sempre visíveis:

#### Anual

- label `Anual`;
- badge textual discreto `Recomendado`;
- preço real `R$ X/ano`;
- se elegível, `7 dias grátis`;
- economia factual calculada em runtime;
- equivalente mensal secundário.

#### Mensal

- label `Mensal`;
- `R$ X/mês`;
- sem linguagem depreciativa.

Selecionar anual por padrão é permitido. Esconder mensal, desabilitá-lo artificialmente ou removê-lo após ativar um toggle é proibido.

### Timeline do trial

Quando anual com trial estiver selecionado, mostrar uma timeline curta e explícita:

`Hoje` — acesso Pro começa

`Em 5 dias` — lembrete, se ativado

`Em 7 dias` — R$ X/ano, renovação automática, salvo cancelamento anterior

As datas reais devem ser calculadas quando possível. Se o store fornecer apenas duração e a data exata depender da compra, usar linguagem relativa sem inventar data.

### Lembrete antes da cobrança

Controle:

`Lembrar 2 dias antes do fim do teste`

Default: **off** até o usuário escolher, para não pedir permissão sem contexto.

Ao ativar:

1. explicar que será usado um lembrete local;
2. pedir permissão do SO;
3. se negada, manter informação in-app e explicar que o Google Play também pode enviar comunicação;
4. após compra/trial confirmado, agendar com a data real;
5. não agendar antes de existir trial real.

### CTA

Se anual elegível ao trial:

`Começar 7 dias grátis`

Subcopy imediatamente abaixo:

`Depois, R$ X/ano. Renovação automática até você cancelar.`

Se anual sem eligibility de trial:

`Assinar por R$ X/ano`

Se mensal:

`Assinar por R$ X/mês`

Nunca usar CTA genérico `Continuar` quando ele inicia uma compra.

### Rodapé legal e confiança

Mostrar de forma legível:

- renovação automática;
- como cancelar;
- links Termos e Privacidade;
- `Gerenciar assinatura` quando aplicável;
- `Restaurar compras` se não estiver no topo.

Não esconder texto em 10px/cinza sem contraste.

## 4. Psicologia aprovada

### Personalização

Permitido:

`{Nome}, você escolheu priorizar planejamento semanal. O Pro deixa essa rotina pronta para usar.`

Somente se a escolha foi real.

### Reciprocidade/endowment

O usuário viu um espaço configurado de verdade. É válido dizer `Seu espaço está pronto`.

Não ameaçar perda do trabalho caso não compre.

### Ancoragem de valor

É permitido comparar anual e mensal:

`Economize 50% em relação a 12 meses no plano mensal.`

Somente se o cálculo for verdadeiro para preços atuais.

Não usar preço semanal hipotético para fabricar um desconto de 95%.

### Redução de ansiedade

Mostrar timeline e cancelamento antes do CTA. Confiança tem prioridade sobre copy agressiva.

## 5. Fluxo de compra

### Estado inicial

`loadOffering()` / equivalente carrega packages reais.

Enquanto carrega:

- skeleton de preços;
- benefícios podem aparecer;
- CTA de compra desabilitado;
- nunca usar preço placeholder que parece real.

### Seleção

Ao trocar plano:

- shared indicator/spring V2;
- atualizar CTA, termos e timeline;
- preservar acessibilidade e Reduced Motion.

### Purchase

Ao tocar CTA:

1. bloquear duplo submit;
2. registrar evento sem PII;
3. iniciar purchase do package exato;
4. mostrar loading no próprio CTA;
5. não navegar até CustomerInfo/entitlement confirmar acesso;
6. tratar user-cancelled como cancelamento neutro, não como erro vermelho;
7. tratar falha de loja/rede com retry seguro.

### Sucesso

Só mostrar sucesso quando entitlement Pro estiver ativo.

Ir para `SubscriptionSuccess`, depois Home/primeira ação útil.

### Restore

`Restaurar compras`:

- executa restore real;
- se encontrado, confirma entitlement;
- copy `Compra restaurada`;
- se nada encontrado, mensagem neutra;
- não duplicar assinatura.

## 6. Estados obrigatórios

- offerings loading;
- offering indisponível;
- anual elegível a trial;
- anual não elegível;
- mensal selecionado;
- compra em progresso;
- cancelado pelo usuário;
- erro de pagamento;
- entitlement pendente;
- restore sucesso;
- restore sem compra;
- offline com cache de assinante ativo;
- assinatura cancelada mas ainda válida;
- grace period/payment issue;
- expirada.

## 7. Assinatura expirada

Não apagar dados.

Tela de expiração:

Headline:

`Seu acesso Pro terminou.`

Ações:

- `Reativar Pro`;
- `Gerenciar assinatura`;
- `Exportar meus dados` quando suportado;
- `Privacidade e exclusão de conta`.

Pode mostrar preview/read-only seguro de metadados necessários para orientar usuário, mas não reabrir funcionalidades Pro de escrita.

Não usar:

`Seus dados serão perdidos!`

## 8. Cancelamento

Dentro de Configurações > Assinatura:

- plano atual;
- próxima cobrança ou data final de acesso;
- estado cancelado/renovação ativa;
- link direto para gerenciamento Google Play;
- explicar que desinstalar não cancela;
- sem fluxo de retenção bloqueando o link de cancelamento.

É permitido oferecer uma tela de feedback opcional **depois** de tornar o cancelamento acessível, nunca como gate.

## 9. Suporte humano

Paywall pode incluir link discreto:

`Tem dúvida antes de assinar? Fale com a equipe.`

Fluxo deve avisar:

`Não envie nomes, notas ou informações identificáveis de alunos.`

O suporte não pode receber payload automático com conteúdo pedagógico.

## 10. Motion

Interações aprovadas:

- plano selecionado com indicador compartilhado;
- número/preço muda com transição numérica sutil;
- CTA press tactile;
- timeline entra de forma coordenada;
- purchase success transforma CTA em confirmação somente após entitlement;
- haptic `selection` ao trocar plano e `success` após confirmação real.

Não usar confete universal, glow contínuo, bounce excessivo ou animação que torne preço mais difícil de ler.

## 11. Analytics

Aptabase/event adapter:

- paywall_viewed `{placement, variant}`;
- paywall_plan_selected `{plan: annual|monthly}`;
- trial_reminder_toggled `{enabled}`;
- paywall_cta_tapped `{plan}`;
- purchase_cancelled `{plan, reason_category}`;
- purchase_error `{plan, error_category}`;
- restore_started;
- restore_result `{result}`.

RevenueCat é fonte para:

- trial_started;
- subscription_started;
- revenue;
- renewal;
- cancellation;
- refund;
- entitlement lifecycle;
- experiment attribution.

Não duplicar customer identifiers sensíveis no Aptabase.

## 12. Primeiro conjunto de experimentos

Não iniciar antes de baseline estável.

### E1 — Paywall copy

A: `Seu espaço docente está pronto.`

B: headline personalizada pelo objetivo selecionado.

Métrica: trial/subscription conversion; guardrails cancel/refund.

### E2 — Trial

A: 7 dias

B: 14 dias

Métrica: realized revenue / payer e trial-to-paid, não apenas trial start.

### E3 — Preço anual

Somente após volume suficiente e configuração correta de produtos/offers.

Não alterar preço mensal simultaneamente.

## 13. Política e compliance

O Google Play exige comunicação clara de:

- custo;
- frequência;
- renovação;
- trial;
- cobrança após trial;
- necessidade de assinatura;
- cancelamento/gerenciamento.

O hard paywall é permitido, mas o app deve deixar claro que assinatura é necessária para usar o núcleo.

Referência: https://support.google.com/googleplay/android-developer/answer/9900533

## 14. Definition of Done

- preços e moeda vêm da loja;
- annual/monthly reais;
- trial eligibility real;
- anual selecionado por padrão sem esconder mensal;
- cálculo de economia testado;
- terms/cancelamento legíveis;
- restore funcional;
- cancelamento de purchase neutro;
- entitlement confirmado antes de sucesso;
- trial reminder agendado somente após trial real;
- no fake discount/urgency;
- analytics allowlist;
- screenshots 360/390/430;
- recording do fluxo de seleção/compra/sucesso;
- Android real;
- Reduced Motion;
- acessibilidade TalkBack/foco/touch targets;
- sem PII/student data em eventos ou suporte.