# SCREEN SPEC — Onboarding Entry V2

## Status

Autoridade visual específica para a primeira tela após o Splash.

Esta tela **não está aprovada no estado atual**. A captura revisada em 14/09/2026 deve ser tratada como **baseline/anti-target**, não como referência a preservar.

## Diagnóstico da tela atual

A composição atual tem alguns elementos da paleta V2, mas ainda parece genérica e pouco trabalhada:

- headline grande demais domina a experiência e ocupa 3 linhas sem benefício proporcional;
- existe espaço vazio excessivo entre conteúdo e bloco inferior;
- o ícone azul isolado funciona como placeholder e não comunica rotina docente;
- progresso/top bar parecem utilitários, sem personalidade tátil;
- o bloco inferior branco está desconectado da narrativa e parece filler;
- falta um objeto visual forte que dê identidade imediatamente;
- falta sensação de profundidade/tato da linguagem Candy UI;
- a tela não mostra, visualmente, o que o Assistente Pedagógico organiza;
- a ação principal não deve depender de scroll nem ficar fora do primeiro viewport;
- o conjunto se aproxima de `título grande + subtítulo + card`, padrão explicitamente rejeitado em `DESIGN_AUTHORITY.md`.

## Objetivo perceptivo

Em 2–3 segundos o professor deve perceber:

1. este é um produto feito para rotina docente;
2. é amigável e profissional, não corporativo e não infantil;
3. a configuração será rápida;
4. suas respostas terão consequência real no aplicativo;
5. existe uma identidade visual própria e tátil.

## Estrutura desejada

A tela deve caber confortavelmente no primeiro viewport móvel, incluindo CTA principal.

### 1. Topo compacto

- marca `Assistente Pedagógico` pequena, mas com presença;
- ação secundária `Responder depois` claramente tocável;
- progresso discreto e integrado à composição;
- evitar barra longa genérica ocupando largura inteira sem caráter.

### 2. Hero visual dominante

Substituir o ícone azul solto por uma composição pedagógica reconhecível.

Direção preferida: **mini workspace docente tátil**, composto por 2–4 objetos de UI que representam o produto, por exemplo:

- card/folha de `Aula de hoje`;
- chamada com pequenos status de presença;
- calendário/plano;
- caderno/arquivo/lápis como apoio visual.

Esses objetos podem se sobrepor levemente, ter depth físico por borda inferior/offset e parecer elementos reais do aplicativo, não ilustração genérica de banco.

Uma ilustração humana Soft 3D Educational pode ser usada somente se melhorar a narrativa; não usar mascote/coruja.

### 3. Copy

Eyebrow opcional curto. Não usar para preencher espaço.

Headline alvo: 2 linhas em 390 px. Preferir uma mensagem de valor/construção, por exemplo:

> **Vamos montar seu assistente para a sua rotina.**

ou uma variação igualmente curta e forte.

Subcopy: 2–3 linhas no máximo, explicando que são poucas escolhas e que elas mudam o app de verdade.

Não usar texto corporativo ou explicar o próprio formulário em excesso.

### 4. Prova de consequência

Em vez de um card grande de texto no rodapé, usar uma pequena evidência integrada à composição, por exemplo:

`Suas escolhas ajustam Home, atalhos e planejamento.`

Pode usar um mini indicador visual/linha com ícone, sem virar mais um card genérico.

### 5. CTA principal visível

CTA primário precisa aparecer no primeiro viewport.

Texto sugerido:

- `Preparar meu assistente`
- ou `Começar configuração`

Tratamento: botão tátil, chunky, radius alto, azul vivo, depth sólido/pressed state e feedback imediato.

A ação secundária permanece no topo; não duplicar muitos CTAs.

## Linguagem visual

Obrigatório:

- Friendly Professional + Candy UI + Tactile + Educational + Motion-led;
- fundo azul-claro;
- superfícies brancas/azul muito claro;
- azul vivo para foco/ação;
- navy para texto;
- tipografia arredondada forte;
- depth físico controlado, sem sombra difusa genérica;
- iconografia rounded/chunky;
- hierarquia clara;
- densidade suficiente para a tela parecer produto real.

Evitar:

- minimalismo editorial corporativo;
- um único ícone gigante como hero;
- enorme vazio central;
- card branco solitário no rodapé;
- headline maior que o necessário;
- uppercase excessivo;
- pills decorativas;
- gradiente genérico;
- Material default;
- aparência de template de onboarding gerado por IA.

## Motion

No primeiro render, motion não deve atrasar composição.

Depois da composição aprovada:

- objetos do mini workspace podem entrar com stagger leve de 30–45ms;
- CTA tem press depth em 120–150ms;
- progresso muda com transform/opacidade;
- transição para a próxima etapa usa continuidade espacial curta;
- `prefers-reduced-motion` remove stagger/deslocamento e mantém apenas feedback essencial.

## Fast path obrigatório

Para esta tela:

1. montar composição V2;
2. renderizar 390 px;
3. tirar screenshot;
4. comparar com este spec;
5. corrigir as 3–5 maiores diferenças;
6. repetir até a composição estar convincente;
7. só então validar 360/430, estados e integração.

Durante os ciclos visuais usar `pnpm run check:fast`. Não rodar Android/full E2E por ajuste de CSS.

## Gate de qualidade

Rejeitar se:

- o CTA não estiver visível no primeiro viewport;
- ainda houver grande vazio sem função;
- a tela continuar parecendo `ícone + título + subtítulo + card`;
- não houver objeto visual relacionado à rotina docente;
- não houver sensação tátil perceptível;
- a identidade não for reconhecível como Assistente Pedagógico sem ler o logo.

Para candidata:

- screenshot 390 px;
- screenshot 360 e 430 px;
- pressed/focus/reduced motion;
- `pnpm run check:candidate`;
- E2E do onboarding diretamente relacionado, se existente.

Finalizar com:

`READY FOR DESIGN REVIEW — ONBOARDING ENTRY V2`
