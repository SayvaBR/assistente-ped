# Live Design Mode — Assistente Pedagógico

## Objetivo

O Live Design Mode transforma a iteração visual em um loop quase em tempo real:

`editar -> Vite HMR -> navegador aberto -> observar -> corrigir -> HMR`

Screenshots continuam sendo evidência de candidate/PR/review, mas deixam de ser o mecanismo principal para enxergar cada microajuste.

A meta é reduzir o intervalo entre uma decisão visual ruim e sua correção de minutos para segundos, sem transformar IA em analisador de vídeo frame a frame.

## 1. Stack

O app usa React + Vite + Capacitor.

O equivalente prático de hot reload já existe via Vite HMR / React Fast Refresh. Não migrar para Kotlin/Compose para obter esse comportamento.

O gargalo principal é observação: o agente precisa manter uma superfície real aberta e inspecioná-la após mudanças relevantes.

## 2. Comando principal

Use:

```bash
pnpm run live:design -- <preview>
```

Exemplos:

```bash
pnpm run live:design -- home
pnpm run live:design -- planning-day
pnpm run live:design -- frequency
```

O comando inicia um Vite dev server local e imprime a URL direta da superfície em 412 CSS px.

O preview precisa ser uma superfície V2 suportada e a largura precisa estar na matriz do Visual Lab (`320`, `360`, `390`, `412`, `432`, `480` ou `600`). Entradas inválidas falham explicitamente para não abrir uma tela diferente da solicitada.

Por padrão o servidor fica preso em `127.0.0.1`. Não expor na LAN durante o MVP.

## 3. Browser-first

Se o Codex tiver navegador integrado / Computer Use disponível:

1. abrir a URL emitida por `live:design`;
2. manter a página aberta durante toda a microiteração;
3. após uma alteração visual significativa, esperar o HMR estabilizar;
4. observar a superfície já atualizada;
5. inspecionar DOM/computed styles/console quando a dúvida for objetiva;
6. usar visão quando a dúvida for perceptiva;
7. aplicar a correção;
8. observar a mesma página novamente sem reiniciar a jornada.

Não navegar pelo Splash/Home até a tela toda vez. Use preview/UI Lab direto quando a Delivery Unit permitir.

## 4. O que usar para cada tipo de dúvida

### DOM/CDP/browser inspection

Preferir para fatos objetivos:

- overflow horizontal;
- bounding boxes;
- tamanho de botão/touch target;
- padding/gap;
- computed styles;
- largura/altura efetivas;
- texto truncado;
- aria/roles;
- console errors;
- loading de assets;
- elemento fora do viewport.

### Visão

Usar para julgamento perceptivo:

- hierarquia visual;
- equilíbrio da composição;
- proporções;
- peso do CTA;
- excesso de vazio;
- aparência genérica;
- coerência com a identidade;
- sensação tátil;
- legibilidade percebida;
- ritmo/agrupamento visual.

Não gastar uma análise visual cara para descobrir algo que o DOM responde objetivamente.

## 5. Regra de eventos

Não analisar vídeo contínuo, 30 fps ou 60 fps.

Disparar uma nova observação visual principalmente quando:

- um arquivo visual relevante mudou;
- o HMR concluiu;
- o estado/fixture mudou;
- o `live_visual_director` pediu uma correção;
- o worker diz que uma composição importante foi alterada;
- a candidata está chegando ao gate.

Microajustes objetivos consecutivos podem ser confirmados pelo DOM sem nova visão completa.

## 6. Agentes

### `ui_worker`

Escreve código da superfície/Delivery Unit.

Responsabilidades:

- manter HMR rodando;
- editar somente seu ownership;
- aplicar a correção de maior impacto;
- evitar arquitetura invisível antes de provar a composição.

### `live_visual_director`

Read-only.

Responsabilidades:

- observar a superfície viva quando browser access estiver disponível;
- usar DOM/CDP para fatos objetivos;
- usar visão para julgamento visual;
- apontar no máximo 3 problemas perceptivos por rodada;
- escolher uma correção de maior impacto;
- rejeitar UI genérica/Material/SaaS/card-everything/mascote/coruja;
- não editar código.

### `qa_reviewer`

Entra no candidate gate, não em cada microajuste.

## 7. Loop recomendado

```text
ui_worker edita
-> Vite HMR
-> browser atualiza
-> live_visual_director observa
-> DOM/CDP confirma fatos objetivos
-> diretor retorna top 3 + correção principal
-> ui_worker corrige
-> Vite HMR
-> diretor reobserva
```

Durante esse loop:

```bash
pnpm run check:fast
```

Não rodar Android/full E2E/matriz responsiva completa a cada ajuste.

## 8. Viewport

Viewport-âncora de criação visual:

`412 CSS px`

Isso é apenas uma régua de design, não largura fixa do produto.

Quando a candidata estiver forte:

```bash
pnpm run test:v2-responsive:checkpoint -- <preview> "<texto esperado>"
```

Esse checkpoint cobre 360/412/480.

A matriz completa fica no CI/Gate B/release.

## 9. Screenshots

Screenshots não desaparecem.

Usá-las para:

- registrar candidata visual;
- comparar antes/depois importante;
- anexar ao PR;
- revisão assíncrona;
- QA/release;
- fallback quando browser/computer-use não estiver disponível.

Não exigir arquivo PNG novo para cada mudança de 4px se o agente consegue observar a página viva.

## 10. Fallback

Se navegador integrado/Computer Use/CDP não estiver disponível na sessão:

`editar -> HMR -> screenshot on-demand -> review -> corrigir`

O fallback nunca bloqueia o desenvolvimento.

## 11. Segurança

Live Design é estritamente dev-only.

- servidor em `127.0.0.1` por padrão;
- não usar dados reais de aluno/professor nas fixtures;
- não adicionar chave/token no frontend;
- não alterar comportamento de produção para facilitar preview;
- não apontar build de produção para dev server;
- não expor LAN/telefone real nesta primeira fase.

## 12. Android físico — fase 2

Depois do browser loop estabilizado, pode-se avaliar live reload no POCO via ADB/dev server.

Isso deve ser uma Delivery Unit separada, dev-only, com atenção a:

- ADB reverse/rede;
- WindowInsets;
- WebView;
- segurança de origem;
- nenhuma configuração dev vazando para release.

## 13. Gate visual

`READY FOR REVIEW` de uma UI exige:

- superfície real observada após as mudanças relevantes;
- pelo menos uma rodada de crítica independente;
- correção da maior falha perceptiva identificada;
- evidência final anexável;
- `check:fast` verde;
- checkpoint responsivo barato quando candidata;
- qualidade no padrão Friendly Professional + Candy UI + Tactile + Educational + Motion-led.

## Princípio final

> **Código muda ao vivo; o agente observa ao vivo; a evidência formal fica para o checkpoint.**

> **Não maximize o número de screenshots. Minimize o tempo entre erro visual e correção.**
