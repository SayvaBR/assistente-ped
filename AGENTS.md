# AGENTS.md — Assistente Pedagógico

Este arquivo contém regras obrigatórias para qualquer agente de código que trabalhe neste repositório, incluindo Codex/Astra.

## Missão

Levar o Assistente Pedagógico até Android 1.0 funcional, estável, seguro, publicável e com identidade visual própria forte.

A missão de conclusão de produto é definida em:

- `docs/CODEX_ANDROID_1_0_COMPLETION_MISSION.md`;
- `docs/ANDROID_1_0_EXECUTION_BOARD.md`.

A aplicação legada é **baseline funcional, não baseline de design**. A V2 trabalha em modo **visual-first + clean room**, seguindo `docs/CODEX_LOVABLE_MODE.md`, `docs/V2_HOME_FLOW_VISUAL_RING.md` e as skills do projeto.

## Modo de continuidade

O objetivo não é encerrar uma tarefa isolada; é avançar continuamente até uma candidata real de Android 1.0.

Durante uma sessão longa, o agente deve:

1. executar a unidade atual;
2. renderizar/testar;
3. registrar evidência;
4. fazer checkpoint Git;
5. atualizar `docs/ANDROID_1_0_EXECUTION_BOARD.md`;
6. continuar para a próxima unidade segura da fila.

**Não parar depois de cada tela apenas para pedir autorização**, salvo blocker real.

O agente nunca aprova a própria tela. Quando atingir candidata visual, registrar `READY FOR DESIGN REVIEW — <TELA>` e, salvo instrução explícita para aguardar, continuar a próxima unidade. `VISUAL DIRECTION APPROVED` continua reservado à revisão externa.

Pausar para input apenas quando houver dependência realmente externa ou irreversível, como credencial indispensável, decisão legal/privacidade não definida, operação destrutiva em dados reais, catálogo real de billing ausente, conflito de Git que exija escolha humana ou hardware físico indispensável. Mesmo nesses casos, registrar o blocker e continuar tarefas independentes.

## Stack

- React
- TypeScript
- Vite
- Capacitor Android

Não migrar de stack sem decisão explícita de produto. A stack atual é suficiente para reproduzir os targets aprovados e adaptar a interface a diferentes Androids.

## Autoridade

Para UI/UX e execução de produto, obedecer nesta ordem:

1. decisão explícita mais recente do usuário/produto;
2. `docs/DESIGN_AUTHORITY.md`;
3. este `AGENTS.md`;
4. `docs/CODEX_ANDROID_1_0_COMPLETION_MISSION.md`;
5. `docs/ANDROID_1_0_EXECUTION_BOARD.md`;
6. `docs/CODEX_LOVABLE_MODE.md` e `docs/V2_HOME_FLOW_VISUAL_RING.md`;
7. `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md` e `docs/ANDROID_REAL_DEVICE_QA.md`;
8. skills do projeto em `.agents/skills/`;
9. `docs/design-v2/` e screen spec correspondente;
10. `docs/VISUAL_IDENTITY_V2.md`;
11. legado.

Screenshot/mockup explicitamente aprovado é **target visual**, não inspiração vaga.

## Git preflight obrigatório

Antes de implementar:

```bash
git status
git branch --show-current
git fetch origin --prune
git log -1 --oneline
git log -1 --oneline origin/$(git branch --show-current)
```

Se a branch local estiver atrás, sincronizar primeiro. Não trabalhar por horas em estado local desatualizado.

Antes de encerrar uma rodada:

```bash
git status
git diff --stat
git log -1 --oneline
```

Toda evidência visual deve informar branch e commit. Em sessões longas, fazer commits pequenos e push regular para evitar horas de trabalho apenas local.

## V2 Clean Room

Toda nova interface V2 nasce em `src/v2/`.

A V2 pode consumir lógica e dados do legado, mas não sua arquitetura visual.

### Pode reutilizar

- `src/domain/**`;
- `src/data/**`;
- repositories e persistência;
- modelos/validações;
- adapters Capacitor;
- BNCC;
- billing real;
- utilitários sem responsabilidade visual.

### Não pode ser autoridade/dependência visual

- `src/screens/**`;
- `src/components/**` legados;
- `src/core/recovered.js` para composição/UI;
- CSS visual V1;
- tokens V1;
- `Card`, `IconTile` ou equivalentes herdados da V1.

Se lógica estiver presa a componente V1, extrair a lógica para camada neutra e conectar à V2. Não deformar a V2 para caber no legado.

## Android adaptativo — regra obrigatória

**390 px é apenas um viewport de comparação visual quando o target foi produzido nessa largura. Não é a largura do aplicativo.**

A UI de produção deve ser fluida e funcionar entre larguras de Android, sem depender de um modelo específico de aparelho. O POCO X7 Pro é um aparelho físico de referência, não o único alvo.

Seguir `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md` e `.agents/skills/assistente-pedagogico-android-adaptive-ui/SKILL.md`.

Durante o trabalho visual, 390 pode ser usado como anchor para comparar rapidamente com a referência. Antes do gate de produção, validar uma matriz representativa:

- 320 px;
- 360 px;
- 384/390 px;
- 411/412 px;
- 432 px;
- 480 px;
- 600 px ou maior quando aplicável;
- 720/840 quando houver layout relevante para tablet/foldable.

Não criar layouts especiais para cada número. Construir **um layout responsivo contínuo**.

### Texto e conteúdo

- conteúdo essencial não pode ser cortado com `ellipsis`, `line-clamp` ou altura fixa;
- títulos, nomes de aula, labels, CTAs e mensagens de estado devem quebrar entre palavras quando necessário;
- não quebrar palavras humanas no meio para salvar layout;
- truncamento só é aceitável para metadata secundária quando o valor completo estiver acessível;
- botão deve acomodar texto real em PT-BR sem cortar palavras;
- não reduzir fonte até ficar ilegível para “fazer caber”;
- testar crescimento de texto 100%, 115%, 130%, 150% e, em fluxos críticos, 200% quando viável;
- nenhum fluxo principal pode depender de frase artificialmente curta.

### Layout

Preferir:

- `flex`, `grid`, `minmax()`, `clamp()` e container/media queries quando úteis;
- largura relativa com `max-width` apenas quando houver razão;
- altura automática para superfícies com texto;
- `min-width: 0` em filhos flex/grid;
- `env(safe-area-inset-*)`;
- componentes que mudam composição quando falta espaço.

Proibido:

- root com largura fixa de 390 px;
- cards/hero com alturas rígidas que cortem copy;
- scroll horizontal acidental;
- esconder ação essencial em tela estreita;
- tratar screenshot como moldura fixa;
- otimizar exclusivamente para o POCO X7 Pro.

## Fluxo visual-first obrigatório

Para tela com target claro:

```text
TARGET
-> HIPÓTESE VISUAL
-> EXPERIMENTO MÍNIMO
-> RENDER NO VIEWPORT-ÂNCORA
-> SCREENSHOT
-> OBSERVAÇÃO / COMPARAÇÃO
-> CORREÇÃO DA MAIOR DIFERENÇA
-> REPETIR ATÉ CONVERGIR
-> VALIDAR MATRIZ ANDROID
-> CONECTAR DADOS REAIS
-> ESTADOS/OFFLINE/ERROS
-> MOTION/HAPTICS
-> TESTES/ANDROID REAL
-> CHECKPOINT GIT
-> PRÓXIMA UNIDADE
```

Não fazer antes do primeiro render:

- refatoração ampla do app;
- migração global;
- Design System especulativo;
- abstrações para problemas ainda não vistos.

Primeiro fazer uma superfície convincente. Depois extrair primitives comprovadas.

## Ordem de execução

A fila completa e os milestones estão em `docs/CODEX_ANDROID_1_0_COMPLETION_MISSION.md` e `docs/ANDROID_1_0_EXECUTION_BOARD.md`.

Prioridade imediata atual:

1. Frequência / Fazer chamada;
2. Registrar observação;
3. Compromissos / Agenda;
4. Planejamento — Dia, Semana e Mês;
5. Turmas;
6. Perfil do professor;
7. Arquivos;
8. Mais;
9. Planejamento profissional completo;
10. Turmas/alunos completos;
11. Arquivos/relatórios completos;
12. onboarding/conta/paywall;
13. configurações/lifecycle;
14. estados/offline;
15. Android release candidate.

Ao tocar uma ação na Home, o destino deve parecer o **mesmo produto**. Se o destino ainda usa carroceria V1, ele entra no backlog V2.

## Gates

### Ready for Design Review

O agente pode registrar:

`READY FOR DESIGN REVIEW — <TELA>`

quando a candidata visual é forte e existe evidência suficiente.

Isso **não é autoaprovação**, mas também **não obriga a parar a sessão**. Salvo ordem explícita, continuar para a próxima unidade segura enquanto a revisão externa pode ocorrer em paralelo.

### Visual Direction Approved

Somente revisão externa de produto/design pode registrar:

`VISUAL DIRECTION APPROVED — <TELA>`

### Production / Merge Ready

Exige dados reais, estados, offline quando aplicável, acessibilidade, texto ampliado, responsividade, motion/Reduced Motion quando aplicável, testes, CI e Android QA.

`PRODUCTION GATE READY — <TELA>` não autoriza merge automático.

## Identidade visual V2

A linguagem é:

> **Friendly Professional + Candy UI + Tactile + Educational + Motion-led**

Balanço:

> **fundo azul-claro + superfícies majoritariamente brancas + azul vivo para foco/ação + navy para texto**

Regras:

- tipografia arredondada, forte e amigável;
- superfícies táteis;
- depth físico controlado;
- iconografia chunky/rounded;
- ilustrações humanas apenas quando narrativamente úteis;
- sem mascote permanente;
- boa densidade operacional;
- hierarquia clara;
- cards apenas quando representam objetos reais.

Rejeitar como linguagem dominante dashboard SaaS, fintech/editorial corporativo, grid 2×N de atalhos, card branco para tudo, uppercase excessivo, Material default, Tailwind starter look, glassmorphism, gradiente genérico, bento decorativo e o padrão repetido `ícone + título + subtítulo + chevron`.

Anti-card não significa anti-surface. Profissional não significa corporativo. Playful não significa infantil.

## Funcionalidade real

Tela bonita sem função não está pronta.

Proibido:

- CTA que não faz nada;
- toast falso de sucesso;
- dados mockados em produção como se fossem reais;
- salvar só em memória quando há promessa de persistência;
- purchase visualmente concluída sem entitlement;
- rota principal terminando em UI V1 no produto final.

Cada fluxo deve ser funcional de ponta a ponta, com persistência, recuperação de erro e estados reais quando aplicável.

## Motion

- motion explica causalidade/estado;
- nada de animação gratuita;
- `prefers-reduced-motion` obrigatório;
- gesto importante precisa de alternativa;
- haptic apenas quando significativo;
- nunca mostrar sucesso antes de confirmação real.

## O que é imutável

Não quebrar integridade/migração de dados, privacidade/LGPD, segurança, dados pedagógicos/alunos, billing/RevenueCat, storage, backup/restauração, funcionamento offline, regras pedagógicas, BNCC, acessibilidade e direitos de exportação/portabilidade/exclusão.

Dados pedagógicos e de alunos não podem ser enviados a analytics.

## Growth/billing

- hard paywall após ativação guiada;
- mensal e anual visíveis;
- preço/trial vindos da store/RevenueCat, nunca hardcoded;
- sem weekly/lifetime no lançamento sem decisão explícita;
- compra só conclui visualmente após entitlement real;
- restore/cancelamento/gerenciamento acessíveis;
- expiração nunca autoriza apagar dados.

## Acessibilidade

Obrigatório:

- touch target >= 48 px;
- contraste adequado;
- foco perceptível;
- texto escalável;
- estado não comunicado só por cor;
- safe areas;
- Reduced Motion;
- alternativa para gesto;
- labels acessíveis;
- nenhuma ação essencial perdida por responsividade.

## Testes e evidência

Antes do Gate B, executar o que se aplicar:

```text
pnpm run check:v2-boundary
pnpm run test:v2-responsive
pnpm test
pnpm build
node scripts/android-sync.mjs
```

Para UI importante, evidência mínima:

- target/North Star;
- screenshot no viewport-âncora;
- screenshots suficientes para provar o loop Visual Builder;
- matriz Android representativa;
- estados relevantes;
- loading/empty/error/offline quando aplicável;
- motion/Reduced Motion;
- branch e commit;
- build/testes;
- confirmação de ausência de overflow e truncamento de copy essencial.

## Git e release

- não trabalhar diretamente em `main`;
- não fazer merge automático;
- manter checkpoints regulares na branch de integração enquanto ela for autoridade;
- não alterar dados reais para facilitar teste;
- não adicionar CTA falso;
- não inventar backend, preço ou serviço;
- APK debug não é release de produção.

## Linha de chegada

A linha de chegada e as jornadas obrigatórias estão em `docs/CODEX_ANDROID_1_0_COMPLETION_MISSION.md`.

Somente quando os critérios forem cumpridos, registrar:

`ANDROID 1.0 PRODUCT COMPLETION CANDIDATE`

Depois parar antes de merge/release automático e entregar relatório final de branch, SHA, CI, APK/build, E2E, blockers, riscos e checklist de publicação.

## Regra final

> **Preservar domínio, dados e contratos. Reconstruir a experiência.**

> **Não construa um protótipo eterno. Construa o produto.**

A V2 deve parecer um produto novo construído sobre uma base funcional madura e precisa ser confiável o suficiente para um professor usar em uma aula real.