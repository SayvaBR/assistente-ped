# SCREEN SPEC — Onboarding Entry V2

## Status

Autoridade visual específica para a primeira tela após o Splash.

A captura revisada em 14/09/2026 é **baseline/anti-target**. Não preservar sua composição por inércia.

## Problemas da tela atual

- headline grande demais;
- grande vazio central;
- ícone azul isolado parece placeholder;
- pouca identidade pedagógica;
- card inferior desconectado;
- pouca profundidade/tato;
- CTA principal não domina a decisão;
- aproxima-se do padrão genérico `ícone + título + subtítulo + card`.

## Objetivo perceptivo

Em 2–3 segundos o professor deve perceber que:

1. o produto foi feito para rotina docente;
2. é amigável e profissional, sem infantilização;
3. a configuração será rápida;
4. suas respostas terão consequência real;
5. existe identidade tátil própria.

## Estrutura desejada

### Topo compacto

- marca pequena com presença;
- `Responder depois` tocável;
- progresso discreto, integrado à composição.

### Hero visual dominante

Substituir o ícone solto por um **mini workspace docente tátil** com 2–4 objetos de UI, por exemplo:

- `Aula de hoje`;
- pequena chamada/presença;
- calendário/plano;
- caderno/arquivo/material.

Pode haver leve sobreposição e depth físico por borda inferior/offset. Deve parecer parte do produto, não ilustração genérica.

Sem mascote. Sem coruja.

### Copy

Headline alvo: aproximadamente 2 linhas em 390px.

Direção sugerida:

> **Vamos montar seu assistente para a sua rotina.**

Subcopy curta, 2–3 linhas no máximo, explicando que poucas escolhas mudam o app de verdade.

### Prova de consequência

Em vez de card grande no rodapé, usar evidência integrada, por exemplo:

`Suas escolhas ajustam Home, atalhos e planejamento.`

### CTA principal

Precisa estar visível no primeiro viewport, sem scroll.

Texto sugerido: `Preparar meu assistente`.

Tratamento: azul vivo, chunky, tátil, radius alto, depth sólido e pressed state claro.

## Linguagem

Obrigatório:

- Friendly Professional + Candy UI + Tactile + Educational + Motion-led;
- fundo azul-claro;
- superfícies brancas/azul muito claro;
- azul vivo para ação;
- navy para texto;
- tipografia arredondada forte;
- depth físico controlado, não sombra difusa genérica;
- iconografia rounded/chunky;
- densidade suficiente para parecer produto real.

Evitar:

- minimalismo corporativo;
- hero com um único ícone gigante;
- vazio central sem função;
- card branco solitário no rodapé;
- Material default;
- gradiente genérico;
- template de onboarding de IA.

## Motion

Motion não deve atrasar o primeiro render.

Depois da composição aprovada:

- stagger leve nos objetos do workspace;
- press depth do CTA;
- progresso com transform/opacidade;
- transição curta e causal;
- Reduced Motion remove stagger/deslocamento.

## Fast path

1. montar composição V2;
2. renderizar 390px;
3. screenshot;
4. comparar;
5. corrigir 3–5 maiores diferenças;
6. repetir até convincente;
7. só então 360/430, estados e integração.

Durante os ciclos use `pnpm run check:fast`. Não rodar Android/full E2E por ajuste de CSS.

## Gate

Rejeitar se:

- CTA não estiver no primeiro viewport;
- houver grande vazio sem função;
- continuar parecendo `ícone + título + subtítulo + card`;
- não houver objeto visual docente;
- não houver tato perceptível;
- não parecer Assistente Pedagógico sem depender do logo.

Candidata:

- screenshot 390px;
- depois 360/430;
- pressed/focus/Reduced Motion;
- `pnpm run check:candidate`;
- teste relacionado.

Finalizar com:

`READY FOR DESIGN REVIEW — ONBOARDING ENTRY V2`
