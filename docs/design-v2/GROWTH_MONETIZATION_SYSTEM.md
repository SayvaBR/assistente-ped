# Assistente Pedagógico — Growth & Monetization System V1

Este documento é a fonte de verdade de produto para onboarding, ativação, hard paywall, assinatura, experimentação, retenção e win-back. Ele complementa o Design System V2 e o Motion System V2.

A meta não é maximizar conversão a qualquer custo. A meta é construir um produto de assinatura sustentável cuja monetização seja consequência de valor percebido, confiança, clareza e uso recorrente.

## 0. Decisões executivas

As oito decisões abaixo estão fechadas para a primeira versão. Não reabrir silenciosamente durante implementação; mudanças devem ocorrer por experimento ou decisão explícita de produto.

### D1 — Promessa do Pro

**Promessa principal:**

> Menos tempo organizando. Mais clareza para ensinar.

**Transformação que vendemos:**

> O Assistente Pedagógico transforma planejamento, chamada, registros, arquivos e acompanhamento da turma em um único fluxo de trabalho docente, para que o professor pare de espalhar a rotina entre cadernos, planilhas e aplicativos desconectados.

Não vender lista de features como proposta central. Feature prova a transformação; não a substitui.

Não prometer horas economizadas, melhora de desempenho de alunos ou resultados pedagógicos quantitativos sem evidência real.

### D2 — O que constitui o valor pago recorrente

O produto adota **hard paywall após ativação guiada**. Não existe um plano gratuito funcional equivalente ao app completo.

Com assinatura ativa, o professor recebe o núcleo operacional recorrente:

- Home/visão do dia;
- planejamento Dia/Semana/Mês;
- criação, edição e reaproveitamento de planos de aula;
- integração real com habilidades BNCC quando disponível;
- criação e gestão de turmas;
- chamada/frequência;
- observações e registros pedagógicos;
- agenda e compromissos;
- histórico e acompanhamento;
- arquivos/pastas e organização docente;
- relatórios e exportações profissionais;
- backup/sincronização quando o backend correspondente estiver realmente disponível;
- recursos premium futuros que ofereçam valor recorrente real.

Não vender como benefício premium:

- segurança básica;
- privacidade/LGPD;
- criptografia/proteção obrigatória;
- acesso a Termos/Privacidade;
- gerenciamento/cancelamento de assinatura;
- restauração de compras;
- exclusão de conta;
- exportação/portabilidade dos próprios dados quando necessária para direitos do usuário.

#### Usuário sem assinatura

Antes de assinar, pode acessar:

- splash;
- onboarding;
- configuração guiada necessária para personalização;
- preview demonstrativo/personalizado;
- paywall;
- login/conta quando real;
- suporte;
- privacidade/termos;
- restaurar compra.

Após uma assinatura expirar, o app **não pode fazer refém dos dados criados pelo usuário**. A experiência expirada deve fornecer, no mínimo, acesso seguro a gerenciamento de assinatura, exportação/portabilidade quando suportada, exclusão de conta/dados e informações necessárias para recuperação. Escrita e funcionalidades operacionais Pro ficam bloqueadas.

### D3 — Onde aparece o hard paywall

O hard paywall aparece **depois que o professor compreendeu o produto, forneceu apenas contexto útil, viu o espaço personalizado que será criado e percebeu valor; antes da primeira entrada na Home operacional real**.

Fluxo macro:

`Splash -> Valor -> Personalização -> Configuração mínima -> Preview personalizado -> Hard Paywall -> Compra/Trial -> Primeiro sucesso -> Home real`

O usuário não deve investir 15 minutos antes de descobrir que o produto exige assinatura. A necessidade de assinatura deve ser mencionada de forma clara durante o onboarding, sem interromper a narrativa.

O paywall deve possuir ação de voltar/fechar claramente visível. Como o produto é hard-paywall, fechar não abre a Home; retorna ao preview/onboarding ou a uma tela neutra explicando que a assinatura é necessária para usar o núcleo.

### D4 — Planos, preço, trial e oferta inicial

#### Baseline de lançamento no Brasil

- **Pro Mensal:** R$ 24,90/mês.
- **Pro Anual:** R$ 149,90/ano.
- **Trial:** 7 dias no plano anual.
- **Sem trial no mensal** no baseline.
- **Sem plano semanal** no lançamento.
- **Sem plano vitalício** no lançamento.

O anual é o plano recomendado e selecionado por padrão. O preço anual total precisa ser o elemento de preço mais evidente. Pode haver uma linha secundária `equivale a aproximadamente R$ 12,49/mês`, mas nunca mais destacada que `R$ 149,90/ano`.

Economia vs. 12 meses do mensal: aproximadamente 50%. Só exibir o percentual calculado a partir dos preços reais retornados pela loja; nunca hardcode de desconto.

#### Fonte da verdade de preço

Todos os preços, moedas, trials, eligibility e packages exibidos vêm do Google Play/RevenueCat. Os valores acima são decisão de configuração inicial, não strings para hardcode.

#### Oferta inicial

Não usar toggle performático de “Oferta Exclusiva”, desconto falso, preço riscado inventado ou remoção da opção mensal depois de uma interação.

No lançamento, priorizar oferta simples e legível. Promoções futuras só entram se forem ofertas reais configuradas na loja e sempre com preço futuro/renovação claramente apresentados.

### D5 — Arquitetura do onboarding

O onboarding deve durar aproximadamente **2–4 minutos na rota principal**, dividido em telas pequenas e adaptativas, não em um formulário longo.

Não perseguir número arbitrário de 30+ telas. O comprimento é função da utilidade e do abandono medido.

A ordem é:

1. comunicar valor antes de perguntar;
2. obter contexto profissional mínimo;
3. perguntar dores/objetivos apenas quando mudarem a experiência;
4. personalizar linguagem e preview;
5. criar contexto operacional mínimo (ex.: primeira turma, se o usuário escolher);
6. apresentar o espaço preparado;
7. apresentar assinatura.

Não chamar de “diagnóstico” ou “avaliação” se não houver diagnóstico real. A linguagem oficial é **Configuração da sua rotina**.

### D6 — Analytics e A/B testing

Arquitetura aprovada:

- **RevenueCat**: fonte de verdade para assinatura, entitlement, trial, receita, cancelamento e experimentos de monetização.
- **Aptabase EU**: analytics de produto anônimo e explicitamente instrumentado, com autocapture inexistente/desativado e allowlist estrita de eventos/propriedades.
- **Adapter interno `analytics`**: nenhuma tela chama SDK externo diretamente.

Aptabase foi escolhido porque oferece analytics anônimo, sem cookies/device identifiers/fingerprinting/long-term user identification, com data residency EU e tracking manual. Essa escolha deve passar por revisão final de privacidade/licença antes do merge da implementação.

Não enviar para analytics:

- nomes de professores;
- e-mails;
- nomes/IDs de alunos;
- nomes identificáveis de turmas;
- notas;
- observações pedagógicas;
- textos de planos;
- conteúdo de arquivos;
- nome de escola;
- documentos;
- qualquer texto livre digitado pelo usuário.

Experimentos de preço/trial/paywall devem usar RevenueCat Offerings/Experiments quando disponível. Não construir plataforma própria de A/B antes de haver necessidade concreta.

### D7 — Retenção

A retenção será baseada em utilidade profissional, não em culpa ou vício.

Pilares:

1. **ativação rápida:** levar o usuário a uma primeira ação útil na primeira sessão após compra;
2. **Home contextual:** próxima aula, chamada pendente, agenda e planejamento devem produzir valor diário;
3. **rituais escolhidos pelo usuário:** lembretes de planejamento, compromissos e chamada configuráveis;
4. **resumo semanal útil:** preparar a próxima semana sem streak punitivo;
5. **feedback de conclusão:** motion/haptic para ações concluídas reais;
6. **suporte humano:** canal simples para falar com a equipe/desenvolvedor sem ticket burocrático;
7. **billing recovery:** orientar atualização de pagamento durante grace period sem bloquear prematuramente;
8. **win-back respeitoso:** comunicação factual e limitada após cancelamento/expiração.

Não usar streaks que culpabilizam professor, notificações de vergonha, urgência emocional ou gamificação que conflite com trabalho profissional.

### D8 — Ética de monetização

Permitido:

- personalização baseada em respostas reais;
- relembrar objetivos que o próprio usuário escolheu;
- mostrar preview do espaço configurado;
- destacar anual por economia factual;
- usar progressão e compromisso consciente;
- mostrar benefícios em linguagem de resultado;
- transparência sobre trial e cobrança;
- lembrete de trial configurável;
- social proof apenas verificável;
- experimentar copy/layout/preço/trial de forma controlada.

Proibido:

- desconto falso;
- cronômetro falso;
- “últimas vagas” falsa;
- preço original inventado;
- esconder plano mais barato após interação;
- confirmshaming (`Não, prefiro continuar desorganizado`);
- dificultar cancelamento;
- X/voltar invisível;
- omitir renovação automática;
- destacar `grátis` escondendo o preço posterior;
- preselecionar consentimentos legais não necessários;
- pedir permissões antes de explicar valor;
- diagnóstico falso;
- depoimento inventado;
- uso de dados sensíveis para persuasão;
- reter dados do usuário como forma de pressão;
- criar medo de perda pedagógica para forçar renovação.

---

## 1. Por que hard paywall

O State of Subscription Apps 2026 da RevenueCat reporta mediana D35 download->paid de 10,7% para hard paywall contra 2,1% para freemium, aproximadamente 5x. O mesmo relatório alerta que a variância é ampla e a execução importa muito; isso é benchmark, não promessa de resultado.

Referência: https://www.revenuecat.com/state-of-subscription-apps

A estratégia oficial é portanto **hard paywall depois do valor**, não paywall instantâneo sem contexto.

## 2. Racional de preço

RevenueCat 2026 reporta Education como categoria de pricing relativamente premium, aproximadamente US$ 9,99/mês e US$ 44,99/ano em medianas globais, enquanto América Latina tende a preços inferiores aos mercados de maior renda.

O baseline brasileiro R$ 24,90 / R$ 149,90 posiciona o produto abaixo da equivalência nominal do benchmark global de Education, preserva espaço para custo de loja/infra e mantém o anual claramente vantajoso.

Preço deve ser tratado como hipótese de produto mensurável. Não reduzir por medo nem aumentar sem dados.

## 3. Racional de trial

RevenueCat 2026 indica:

- trials de 5–9 dias são a faixa mais comum em Education;
- trials mais longos podem ter maior trial-to-paid em mediana geral;
- conversões/trials são fortemente concentrados no D0;
- 7-day trials criam janela rápida para aprendizado experimental.

A decisão inicial é 7 dias porque corresponde a um ciclo semanal real do professor e permite experimentar o produto em dias de aula e planejamento.

Primeiro experimento de duração, após volume suficiente: **7 dias vs. 14 dias**. Não iniciar vários testes simultâneos sem baseline estável.

## 4. Regra do lembrete de trial

O paywall pode prometer:

> Ative o lembrete e avisaremos antes do fim do seu teste.

Se o usuário ativar:

- pedir permissão de notificações apenas nesse contexto;
- agendar notificação local para 48h antes do fim do trial, usando a data real do entitlement/offer;
- revalidar/agendar ao retornar ao app;
- cancelar o lembrete se trial/subscription mudar;
- exibir também aviso in-app quando a janela for atingida.

Não dizer que a notificação do app é garantida, pois o SO pode restringir entrega. Informar que o Google Play também pode enviar comunicação própria do trial.

Copy sugerida:

`Lembrete ativado. Vamos agendar um aviso no seu dispositivo 2 dias antes do fim do teste. O Google Play também pode enviar comunicações sobre sua assinatura.`

## 5. Critério de ativação

`purchase_completed` não é ativação.

Para V1, considerar usuário ativado quando, após assinatura/trial, completar ao menos uma ação operacional significativa dentro de 24h, por exemplo:

- criar/finalizar um plano;
- concluir uma chamada real;
- criar primeira turma + próximo planejamento;
- registrar primeiro compromisso/observação dentro de contexto real.

Métrica principal de ativação deve ser definida por comportamento útil, não tempo de sessão.

## 6. North Star e métricas

### Produto

North Star operacional inicial:

**Professores assinantes que completam pelo menos 2 ações docentes úteis em 7 dias distintos dentro de uma janela de 28 dias.**

A métrica pode evoluir quando houver dados reais.

### Funil principal

- onboarding_started
- onboarding_completed
- personalized_preview_viewed
- paywall_viewed
- trial_started / subscription_started
- first_value_action_completed
- activated_24h
- retained_week_1
- renewal / cancellation (RevenueCat)

Aptabase não deve ser usado para reconstruir identidade individual. Métricas de retenção financeira e lifecycle de assinatura vêm de RevenueCat.

## 7. Ordem dos experimentos

Não testar tudo ao mesmo tempo.

1. estabilidade e clareza do onboarding;
2. drop-off por etapa;
3. copy/estrutura do paywall;
4. 7 vs. 14 dias de trial;
5. preço anual;
6. ordem/ênfase anual vs. mensal;
7. personalização de headline;
8. win-back/ofertas reais.

Um experimento deve ter hipótese, métrica primária, guardrails e decisão documentada.

## 8. Guardrails de experimento

Mesmo que aumente receita, uma variante perde se causar regressão relevante em:

- reembolsos;
- cancelamento imediato;
- reclamações de cobrança surpresa;
- suporte negativo;
- abandono do onboarding por manipulação;
- privacidade;
- acessibilidade;
- clareza do preço;
- estabilidade de billing.

Nunca declarar vencedor apenas por CTR do CTA.

## 9. Compatibilidade offline

Assinante ativo deve conseguir usar o núcleo offline com entitlement cacheado de forma segura, respeitando o comportamento suportado pelo RevenueCat/Google Play. Falha temporária de rede não pode expulsar assinante legítimo do app.

Ao expirar entitlement confirmado, mudar para estado bloqueado/read-only seguro sem apagar dados.

## 10. Estado de cancelamento

Cancelar não significa perder acesso imediatamente quando a loja mantém o período já pago.

Mostrar:

`Sua assinatura está cancelada e continua ativa até {data}.`

Não mostrar `Você perdeu o Pro` antes da expiração real.

## 11. Fonte externa e políticas

- RevenueCat State of Subscription Apps 2026: https://www.revenuecat.com/state-of-subscription-apps
- RevenueCat Experiments: https://www.revenuecat.com/docs/tools/experiments
- RevenueCat Paywalls: https://www.revenuecat.com/docs/tools/paywalls
- Google Play Subscriptions Policy: https://support.google.com/googleplay/android-developer/answer/9900533
- Google Play subscription management/cancellation: https://support.google.com/googleplay/answer/7018481
- Aptabase: https://aptabase.com/

Dados de benchmark envelhecem. Antes de mudar pricing/política por um número deste documento, verificar fonte atual.

## 12. Definition of Done de monetização

Nenhum fluxo de assinatura está pronto sem:

- offering real carregada;
- preço localizado real;
- trial eligibility real;
- termos claros;
- restore funcional;
- cancelamento/gerenciamento acessível;
- sucesso apenas após entitlement confirmado;
- cancelamento pelo usuário tratado sem erro falso;
- falha de billing tratada;
- offline/grace period testados;
- analytics dentro da allowlist;
- screenshots 360/390/430;
- gravação das transições relevantes;
- Reduced Motion;
- testes em Android real;
- nenhuma alegação ou desconto inventado.