# Home — evidências de entrega visual

## Escopo

Este PR entrega somente a Home. A composição foi reorganizada para uma superfície clara, branca e azul: cabeçalho, turma ativa, frequência, foco do dia, agenda, planos, atividade recente, atalhos e navegação inferior.

A direção usa tipografia de sistema, margens de 16 px, cartões brancos com borda fria, azul de ação `#0066CC`, ícones Lucide e seleção azul na navegação. Não há superfície preta nem identidade teal/creme na Home.

## Correções funcionais incluídas

- IDs únicos nos títulos de seção e associações `aria-labelledby` válidas.
- Linhas de “Planos de hoje” acionam a navegação real para o planejamento e aceitam teclado.
- Agenda vazia aparece mesmo quando existem eventos fora da semana visível.
- Chamada, agenda, planos, lembretes e atividade recente continuam carregando do armazenamento local.
- Conteúdo inferior permanece alcançável com o contêiner real de rolagem, inclusive em viewport menor.

## Evidências visuais

As capturas foram feitas em Chrome isolado, com dados sintéticos locais e `colorScheme: light`; nenhum dado do navegador do usuário foi alterado.

| Cenário | Capturas |
| --- | --- |
| Baseline antes da mudança | `docs/qa/home-pr/home-before.png` |
| Home vazia — topo, meio e fim | `home-after-top.png`, `home-after-middle.png`, `home-after-end.png` |
| Chamada pendente | `home-after-pending-top.png` |
| Chamada concluída, plano e agenda | `home-after-data-top.png`, `home-after-data-agenda.png`, `home-after-data-plans.png`, `home-after-data-recent.png`, `home-after-data-end.png` |
| Agenda carregada com eventos fora da semana | `home-after-other-week-agenda.png` |
| Agenda com erro e recuperação por retry | `home-after-agenda-error.png`, `home-after-agenda-retry.png` |
| Chamada pendente com agenda e atalhos | `home-after-pending-top.png`, `home-after-pending-agenda.png`, `home-after-pending-end.png` |
| Viewport menor 375×812 | `home-after-data-small-end.png` |
| Foco, zoom de texto e reduced-motion | `home-after-large-text.png` |

Viewports principais: `393×873` (aproximação CSS para o Poco X7) e `375×812` (regressão de viewport menor). A navegação inferior foi verificada no fim da rolagem, sem ultrapassar a largura do viewport.

## Validação

- `pnpm test` — aprovado: 46 testes unitários.
- `pnpm build` — aprovado.
- `node scripts/android-sync.mjs` — aprovado.
- `android/gradlew.bat assembleDebug` — aprovado com JDK 21 e SDK Android local; APK em `android/app/build/outputs/apk/debug/app-debug.apk`.
- `pnpm test:e2e` — aprovado: 25 testes.
- Auditoria DOM: 7 títulos de seção com IDs únicos; cartões de turma, frequência e foco com fundo branco e acento azul; rolagem `scrollHeight` maior que o viewport e `paddingBottom` para a barra inferior.
- Fluxo de agenda: abrir confirmação, concluir compromisso, exibir “Compromisso concluído.” e renderizar ação “Reabrir” após salvar.
- Falha de agenda: alerta visível com retry; após corrigir a fixture, o mesmo retry renderizou o evento recuperado.
- Acessibilidade: elemento de plano focado exibiu outline azul de 3 px, `tabIndex=0`; com reduced-motion, transição/animação computadas em `0.01ms`; zoom de 125% não criou overflow horizontal.

## Limites da evidência

As imagens usam fixtures sintéticas e não representam dados pessoais. O dispositivo físico Poco X7 não foi instalado nem alterado. O PR não faz merge em `main` e aguarda revisão da Home antes de qualquer outra área visual importante.
