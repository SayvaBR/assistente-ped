# AGENTS.md — Assistente Pedagógico

Este arquivo contém regras obrigatórias para qualquer agente de código que trabalhe neste repositório, incluindo Codex/Astra.

## Missão

Levar o Assistente Pedagógico até Android 1.0 funcional, estável, seguro, publicável e com identidade visual própria forte.

A aplicação legada é **baseline funcional, não baseline de design**. A V2 trabalha em modo **visual-first + clean room**, seguindo `docs/CODEX_LOVABLE_MODE.md`, `docs/V2_HOME_FLOW_VISUAL_RING.md` e as skills do projeto.

## Stack

- React
- TypeScript
- Vite
- Capacitor Android

Não migrar de stack sem decisão explícita de produto. A stack atual é suficiente para reproduzir os targets aprovados e adaptar a interface a diferentes Androids.

## Autoridade

Para UI/UX, obedecer nesta ordem:

1. decisão explícita mais recente do usuário/produto;
2. `docs/DESIGN_AUTHORITY.md`;
3. este `AGENTS.md`;
4. `docs/CODEX_LOVABLE_MODE.md` e `docs/V2_HOME_FLOW_VISUAL_RING.md`;
5. skills do projeto em `.agents/skills/`;
6. `docs/design-v2/` e screen spec correspondente;
7. `docs/VISUAL_IDENTITY_V2.md`;
8. legado.

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

Toda evidência visual deve informar branch e commit.

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

A UI de produção deve ser fluida e funcionar entre larguras de Android, sem depender de um modelo específico de aparelho.

Durante o trabalho visual, 390 pode ser usado como **anchor** para comparar rapidamente com a referência. Antes do gate de produção, validar uma matriz representativa:

- 320 px — stress test estreito;
- 360 px — Android compacto comum;
- 384/390 px — faixa intermediária e viewport de referência;
- 411/412 px — Android amplo comum;
- 432 px — Android amplo moderno;
- 480 px — stress test de telefone largo;
- 600 px ou maior quando a tela também precisar funcionar em tablet/foldable.

Não criar layouts especiais para cada número. Construir **um layout responsivo contínuo** que se comporte corretamente entre eles.

### Texto e conteúdo

- conteúdo essencial não pode ser cortado com `ellipsis`, `line-clamp` ou altura fixa;
- títulos, nomes de aula, labels, CTAs e mensagens de estado devem quebrar linha quando necessário;
- truncamento só é aceitável para metadata secundária quando a informação completa estiver acessível por outro caminho;
- botão deve acomodar texto real em PT-BR sem cortar palavras;
- não reduzir fonte até ficar ilegível para “fazer caber”;
- testar crescimento de texto equivalente a pelo menos 100%, 115%, 130% e 150% nas superfícies críticas;
- evitar `white-space: nowrap` em conteúdo essencial;
- nenhum fluxo principal pode depender de uma frase artificialmente curta para não quebrar o layout.

### Layout

Preferir:

- `flex`, `grid`, `minmax()`, `clamp()` e container/media queries quando úteis;
- largura relativa com `max-width` apenas quando houver razão de leitura/composição;
- altura automática para superfícies com texto;
- `min-width: 0` em filhos flex/grid quando necessário;
- `env(safe-area-inset-*)` para safe areas;
- componentes que mudam composição quando falta espaço, em vez de apenas encolher.

Proibido:

- root da aplicação com largura fixa de 390 px;
- cards/hero com alturas rígidas que cortem copy;
- scroll horizontal acidental;
- esconder ação essencial porque a tela ficou estreita;
- tratar screenshot como moldura fixa da aplicação.

## Fluxo visual-first obrigatório

Para tela com target claro:

```text
TARGET
-> HIPÓTESE VISUAL
-> EXPERIMENTO MÍNIMO
-> RENDER NO VIEWPORT-ÂNCORA DO TARGET
-> SCREENSHOT
-> OBSERVAÇÃO / COMPARAÇÃO
-> CORREÇÃO DA MAIOR DIFERENÇA
-> REPETIR ATÉ CONVERGIR
-> VALIDAR MATRIZ ANDROID RESPONSIVA
-> CONECTAR DADOS REAIS
-> ESTADOS/OFFLINE/ERROS
-> MOTION/HAPTICS
-> TESTES/ANDROID REAL
-> GATE DE PRODUÇÃO
```

O viewport-âncora existe para acelerar comparação, não para limitar responsividade.

Não fazer antes do primeiro render:

- refatoração ampla do app;
- migração de dezenas de telas;
- Design System completo especulativo;
- abstrações para problemas ainda não vistos;
- auditoria visual do legado inteiro.

Primeiro fazer uma tela convincente. Depois extrair primitives comprovadas.

## Migração visual — primeiro anel da Home

A Home V2 foi aceita como **direção visual V2** e não bloqueia mais o início das telas diretamente alcançadas a partir dela.

Migrar uma tela por vez, mas sem esperar o hardening final da Home para começar a próxima. Ordem atual:

1. Frequência / Fazer chamada;
2. Registrar observação;
3. Compromissos / Agenda;
4. Planejamento — Dia, Semana e Mês;
5. Turmas;
6. Perfil do professor;
7. Arquivos;
8. Mais.

Ao tocar uma ação na Home, o destino deve parecer o **mesmo produto**. Se o destino ainda usa carroceria visual V1, ele entra imediatamente no backlog V2.

Para cada fluxo Home -> destino, abrir o destino real, capturar screenshot e comparar a continuidade visual. Seguir `docs/V2_HOME_FLOW_VISUAL_RING.md`.

## Dois gates diferentes

### Gate A — Visual Direction Approved

Libera a próxima tela visual quando composição, DNA V2 e screenshot real estiverem convincentes e a direção tiver sido aprovada por produto/design.

Não exige que todo o hardening final daquela tela já esteja terminado.

### Gate B — Production / Merge Ready

Exige dados reais, estados, offline quando aplicável, acessibilidade, texto ampliado, responsividade, motion/Reduced Motion quando aplicável, testes, CI e Android QA.

**Gate A libera a próxima tela. Gate B libera merge.**

Não voltar a bloquear a produção visual inteira esperando detalhes finais de uma tela cuja direção visual já foi aprovada.

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

## Motion

- motion explica causalidade/estado;
- nada de animação gratuita;
- `prefers-reduced-motion` obrigatório;
- gesto importante precisa de alternativa;
- haptic apenas quando tem significado;
- nunca mostrar sucesso antes de confirmação real.

## O que é imutável

Não quebrar integridade/migração de dados, privacidade/LGPD, segurança, dados pedagógicos/alunos, billing/RevenueCat, storage, backup/restauração, funcionamento offline, regras pedagógicas, BNCC, acessibilidade e direitos de exportação/portabilidade/exclusão.

Dados pedagógicos e de alunos não podem ser enviados a analytics.

## Growth/billing

- hard paywall após ativação guiada;
- mensal e anual visíveis;
- preço/trial vindos da store/RevenueCat, nunca hardcoded na UI;
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

- target ou North Star identificado;
- screenshot no viewport-âncora para fidelidade;
- screenshots de iteração suficientes para provar o loop Visual Builder;
- matriz Android responsiva representativa antes do Gate B;
- estados relevantes;
- loading/empty/error/offline quando aplicável;
- gravação de motion relevante;
- Reduced Motion;
- branch e commit;
- build/testes executados;
- confirmação de ausência de overflow horizontal e truncamento de copy essencial.

## Aprovação

O agente nunca aprova a própria tela.

Quando houver candidata visual real, solicitar revisão. Após aprovação externa, registrar:

`VISUAL DIRECTION APPROVED — <NOME DA TELA>`

Isso autoriza iniciar a próxima tela prevista sem significar merge.

Quando todos os gates técnicos estiverem fechados, registrar:

`PRODUCTION GATE READY — <NOME DA TELA>`

## Git e release

- não trabalhar diretamente em `main`;
- não fazer merge automático;
- durante o primeiro anel V2, evitar criar uma branch por tela enquanto `codex/5-v2-clean-room` for a integração ativa, salvo necessidade explícita de isolamento;
- não alterar dados reais para facilitar teste;
- não adicionar CTA falso;
- não inventar backend, preço ou serviço;
- APK debug não é release de produção.

## Regra final

> **Preservar domínio, dados e contratos. Reconstruir a experiência.**

A V2 deve parecer um produto novo construído sobre uma base funcional madura — não uma maquiagem da aplicação antiga.