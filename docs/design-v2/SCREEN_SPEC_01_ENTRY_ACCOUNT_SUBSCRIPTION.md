# Volume 1 — Entrada, Conta, Setup Inicial e Assinatura

Este volume define exatamente como construir as telas 1–11.

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
- Capacitor App quando necessário para ciclo de vida

A UI desses arquivos pode ser profundamente reescrita. Contratos de persistência/billing devem ser preservados ou migrados explicitamente.

---

# 1. Splash e inicialização

## Objetivo

Abrir o app de forma rápida, confiável e elegante; decidir se o destino é onboarding, setup incompleto, Home ou recuperação de erro.

## Layout

1. Safe area superior vazia.
2. Centro visual: símbolo/livro da marca, 88–112px.
3. Nome `Assistente Pedagógico` logo abaixo, display forte.
4. Microcopy curta opcional: `Organizando o que importa para sua rotina.`
5. Terço inferior: barra/progresso discreto somente quando inicialização exceder ~400ms.
6. Rodapé: mensagem de estado apenas quando necessário (`Preparando seus dados…`, `Atualizando estrutura local…`).

Não usar vários cards, botões ou navegação.

## Lógica

Sequência esperada:

`Native splash -> App shell -> carregar storage -> validar/migrar schema -> recuperar preferências/sessão -> recuperar entitlement -> decidir rota`.

Não bloquear o núcleo local aguardando internet. RevenueCat pode atualizar em background; entitlement local/cache deve ser usado até confirmação.

## Estados

- rápido: transição sem mostrar progresso;
- carregando: barra curta indeterminada/progressiva;
- migração local: texto específico;
- offline: segue normalmente se storage íntegro;
- erro recuperável: tela substitui splash com `Tentar novamente` e opção `Abrir em modo local` quando seguro;
- corrupção/migração impossível: nunca apagar automaticamente; mostrar ação segura e orientação.

## Motion

Logo pode entrar com fade + scale 0.96→1 em 180–240ms. Respeitar `prefers-reduced-motion`.

## Aceite

Nunca spinner infinito. Timeout tratável. Nenhuma perda de dados para “resolver” bootstrap.

---

# 2. Onboarding e apresentação do produto

## Objetivo

Explicar valor e iniciar integração. Não é carrossel publicitário de 3 slides; é uma sequência curta de narrativa + passagem para criação/login + setup guiado.

## Estrutura recomendada

### Tela A — proposta de valor

- topo direito: `Pular` somente se isso não impedir configuração mínima;
- heading grande: `Mais tempo para ensinar.`
- subtítulo: benefício claro;
- ilustração humana principal, central, ocupando ~35–40% da altura útil;
- dois benefícios em formato editorial, não grid de quatro cards;
- CTA primário no rodapé: `Continuar`.

### Tela B — organização real

- heading: `Tudo o que você precisa, no mesmo fluxo.`
- composição visual com agenda/plano/turma conectados;
- texto curto explicando planejamento + chamada + registros;
- CTA `Continuar`.

### Tela C — trabalho que se adapta ao professor

- heading focado em personalização;
- demonstração de rotina/dia/semana;
- CTA final `Começar agora`;
- link secundário `Já tenho uma conta`.

## Regras

- cada etapa deve comunicar uma ideia diferente;
- não repetir exatamente `título + imagem + botão` sem variação de composição;
- não usar mascote;
- ilustração humana é narrativa, não personagem persistente;
- indicadores de progresso devem ser discretos e acessíveis.

## Persistência

Salvar `onboardingSeen` somente quando a etapa final for concluída ou quando houver skip válido. Não marcar setup docente como concluído aqui.

---

# 3. Cadastro de conta

## Objetivo

Criar identidade de acesso sem misturar todo o setup pedagógico na mesma tela.

## Layout de cima para baixo

1. `TopBar` com voltar.
2. Heading `Crie sua conta`.
3. Texto auxiliar `É rápido e gratuito.`
4. Bloco de provedores externos, se realmente configurados: Google / Apple.
5. Separador `ou`.
6. `TextField` Nome completo.
7. `TextField` E-mail.
8. `PasswordField` Senha + mostrar/ocultar.
9. Microcopy de requisitos de senha.
10. Checkbox/consentimento apenas quando juridicamente necessário; links para Termos/Privacidade.
11. CTA primário `Criar conta`.
12. Link `Já tem uma conta? Entrar`.

## Comportamento

- validação inline após blur/submissão;
- e-mail normalizado sem alterar visualmente dados do usuário de forma destrutiva;
- botão mostra loading durante envio;
- erro de rede não apaga formulário;
- duplicidade de e-mail oferece `Entrar`/`Recuperar acesso`.

## Privacidade

Não logar senha/e-mail em analytics. Não guardar senha em storage local em texto puro.

## Observação técnica

Se autenticação remota ainda não existir de fato, não criar UI falsa. Implementar somente métodos reais ou manter fluxo local explicitamente documentado.

---

# 4. Login e recuperação de acesso

## Tela Login

Layout:

1. voltar;
2. heading `Bem-vinda de volta!`;
3. e-mail;
4. senha;
5. linha `Lembrar de mim` somente se comportamento real + `Esqueceu a senha?`;
6. CTA `Entrar`;
7. provedores externos reais;
8. link `Criar uma conta`.

Estados: loading, credenciais inválidas, offline, conta inexistente, provider cancelado.

## Recuperação — etapa 1

- heading `Recuperar acesso`;
- campo e-mail;
- CTA `Enviar instruções`;
- resposta neutra para evitar enumeração de contas quando aplicável.

## Recuperação — sucesso

- ícone/check discreto;
- texto `Confira seu e-mail`;
- `Reenviar` com cooldown;
- `Voltar para entrar`.

Nunca simular envio se backend não existir.

---

# 5. Configuração inicial do perfil docente

## Objetivo

Coletar somente o que personaliza a experiência e não pode ser inferido depois.

## Layout

1. topo: back + progress `1 de 3` ou step indicator;
2. heading `Conte um pouco sobre você`;
3. texto explicando consequência da personalização;
4. avatar/foto opcional em componente compacto;
5. nome de exibição;
6. forma de tratamento/identificação profissional quando necessário;
7. `StageMultiSelect` para etapas de atuação: Infantil / Fundamental / Médio;
8. componentes/disciplina opcional se relevante;
9. CTA `Continuar`.

## Regras

- foto nunca obrigatória;
- câmera/galeria apenas após ação explícita e permissão contextual;
- etapa de atuação do professor pode ser múltipla;
- não confundir etapa do professor com etapa de uma turma específica.

## Persistência

Salvar rascunho progressivamente em `localStore`/estrutura já usada pelo setup; commit final da etapa ao avançar.

---

# 6. Criação da primeira turma

## Objetivo

Criar contexto real para Home, chamada, planejamento e aluno.

## Layout

1. progress `2 de 3`;
2. heading `Vamos criar sua primeira turma`;
3. `TextField` nome da turma;
4. `Select` etapa de ensino;
5. campos condicionais à etapa: ano/série/faixa etária;
6. turno em `SegmentedControl`;
7. ano letivo;
8. componente curricular quando a turma precisar desse contexto;
9. CTA `Criar turma e continuar`;
10. secundário `Agora não` somente se app continuar funcional sem turma.

## Comportamento

Campos mudam conforme etapa. Educação Infantil não deve exibir estruturas próprias de Médio/Fundamental sem necessidade.

## Dados

Usar/adaptar `src/data/classes.js`, `ClassManager.tsx`, modelos de educação em `src/domain/education.ts`.

## Aceite

Ao concluir, a turma aparece de verdade em `Classes`, Home e seletores; nada de fixture temporária.

---

# 7. Personalização inicial do app

## Objetivo

Definir preferências úteis, não pedir escolhas cosméticas sem impacto.

## Layout

1. progress `3 de 3`;
2. heading `Deixe o app com a sua cara`;
3. seção `Tema`: Claro / Escuro / Sistema;
4. seção `Tamanho do texto`: padrão / maior; evitar controles irrelevantes;
5. seção `Notificações`: lembretes de compromissos, resumo diário, novidades do app separadas;
6. cor de destaque somente se realmente suportada; a identidade base continua azul;
7. CTA `Finalizar configuração`.

## Regras

Notificação só deve pedir permissão do sistema no momento em que o usuário ativa um tipo que a exige; não pedir permissão no primeiro launch sem contexto.

Persistir preferências e aplicá-las imediatamente.

---

# 8. Escolha de plano

## Objetivo

Explicar opções sem pressão enganosa e antes do paywall detalhado.

## Layout

1. TopBar/back quando aplicável;
2. heading `Escolha seu plano`;
3. toggle Mensal/Anual somente se ambos existirem na loja;
4. `PlanChoiceRow` Gratuito;
5. `PlanChoiceCard` Pro com preço real da offering;
6. Vitalício somente se produto real existir;
7. comparação curta de benefícios;
8. CTA `Continuar`;
9. secundário `Comparar planos` ou `Continuar no gratuito` com visibilidade honesta.

## Billing

Fonte de preço: RevenueCat/loja. `subscriptionBilling.ts` deve fornecer offering/package/price. Não renderizar R$19,90 como verdade se loja retornar outro valor.

## Estados

- loading de offerings: skeleton;
- falha de loja: opção gratuita continua disponível; botão tentar novamente para premium;
- restore disponível em local apropriado.

---

# 9. Paywall / assinatura

## Objetivo

Vender benefício real sem dark pattern.

## Layout

1. hero compacto com ícone/coroa abstrata, não mascote;
2. heading `Leve sua prática docente mais longe`;
3. subtítulo orientado a economia de tempo;
4. lista de 4–6 benefícios concretos, cada um em linha, sem cards individuais;
5. plano selecionado com preço/periodicidade real;
6. informação de renovação/cobrança clara;
7. CTA principal `Assinar por {preço}`;
8. `Restaurar compras`;
9. links Termos / Privacidade;
10. ação de recusa/voltar claramente acessível.

## Benefícios válidos

- planos sem limite artificial relevante;
- relatórios/exportações profissionais;
- reaproveitar planejamento;
- ferramentas premium reais;
- múltiplas turmas quando essa for a regra comercial.

Nunca vender segurança, LGPD ou acesso aos próprios dados.

## Compra

Ao tocar CTA:

- desabilitar duplo toque;
- iniciar purchase no package selecionado;
- manter contexto se usuário cancelar;
- erro de billing com mensagem específica e retry;
- sucesso só após entitlement confirmado;
- persistir snapshot seguro via repository existente.

## Anti-dark-pattern

Sem cronômetro falso, urgência falsa, X escondido, botão gratuito invisível, preço ambíguo ou desconto inventado.

---

# 10. Confirmação de assinatura

## Objetivo

Confirmar resultado e orientar próximo passo.

## Layout

1. grande ícone de sucesso sem ocupar metade da tela;
2. heading `Assinatura confirmada!`;
3. texto com nome do plano e status;
4. lista curta `Agora você pode…`;
5. CTA `Ir para o início`;
6. opcional `Criar meu primeiro plano` se setup ainda estiver incompleto.

## Lógica

A tela só aparece após confirmação real de entitlement. Em restore, microcopy deve dizer `Compra restaurada` em vez de fingir nova assinatura.

---

# 11. Primeiro sucesso / entrada na Home

## Objetivo

Encerrar onboarding/setup mostrando que as decisões anteriores tiveram efeito.

## Layout

1. ilustração humana leve ou check expressivo;
2. heading `Tudo pronto!`;
3. resumo em lista de conclusão:
   - perfil configurado;
   - primeira turma criada, se criada;
   - preferências salvas;
   - plano atual;
4. cada linha usa check sem virar quatro cards;
5. CTA principal `Ir para minha Home`.

## Comportamento

Ao tocar:

- marcar setup como concluído;
- garantir flush/persistência;
- navegar para Home sem voltar ao wizard via back stack normal.

Se turma não foi criada, Home deve abrir em estado útil de setup pendente, não quebrar.

## Gate deste volume

Antes de considerar entrada/onboarding prontos, anexar screenshots de: splash rápido/carregando/erro, principais etapas do onboarding, cadastro/login, setup perfil, primeira turma, personalização, escolha de plano, paywall loading/erro/sucesso e primeiro sucesso. Testar 360/390/430px, teclado, erro de storage, offline e reduced motion.