# Working Context — Assistente Pedagógico

Leia este arquivo primeiro. Ele existe para evitar reler dezenas de documentos a cada tarefa.

## Produto

Assistente Pedagógico é um app Android local-first para professores.

Stack: React + TypeScript + Vite + Capacitor Android.

App ID: `br.com.assistentepedagogico.app`.

## Missão atual

Transformar a base funcional recuperada em um Android 1.0 profissional, estável, publicável e visualmente forte.

O legado é autoridade de **dados/regras/contratos**, não de design.

## UI V2

Nova UI nasce em `src/v2/`.

Pode reutilizar domínio, repositories, storage, BNCC, billing e adapters nativos. Não herdar composição/CSS/componentes visuais V1 como autoridade.

Linguagem desejada:

**Friendly Professional + Candy UI + Tactile + Educational + Motion-led**.

Base visual: azul-claro + superfícies brancas + azul vivo para ação + navy para texto.

Sem mascote permanente. Sem coruja. Ilustração humana somente quando narrativamente útil.

Evitar visual genérico de IA, Material default, dashboard SaaS, card para tudo, gradiente genérico, glassmorphism e grids de atalhos repetitivos.

## Autoridade para UI

1. decisão explícita mais recente do usuário;
2. screenshot/mockup aprovado;
3. `docs/DESIGN_AUTHORITY.md`;
4. screen spec atual;
5. `docs/PRODUCTION_SPEED_PROTOCOL.md`;
6. legado somente para comportamento/contratos.

## Velocidade

Regra operacional: **rápido no loop, rigoroso no checkpoint**.

Durante iteração: Vite/HMR + `pnpm run check:fast` + screenshot 390 quando UI.

Somente em candidata: 360/390/430, estados, build e teste relacionado.

Somente em PR/release: suíte profunda, Android e evidência final conforme risco.

Trabalho paralelo em worktrees/agentes é desejado quando arquivos não conflitam.

## Não quebrar

- dados e migrações;
- LGPD/privacidade;
- billing/RevenueCat;
- backup/restauração;
- storage/offline;
- BNCC e regras pedagógicas;
- acessibilidade;
- exportação/exclusão de dados;
- segurança.

Dados de alunos e conteúdo pedagógico não entram em analytics.

## Git

- não trabalhar em `main`;
- branch/worktree por entrega relevante;
- PR pequeno e revisável;
- não fazer merge automático;
- não misturar redesign, infra e feature sem necessidade.

## Tela visual

Fluxo padrão:

`target -> primeiro render 390 -> corrigir composição -> candidata -> 360/430 -> integrar estados/dados -> testes relevantes -> review`.

## Quando abrir docs especializados

Apenas quando a tarefa tocar o tema:

- UI detalhada -> `docs/DESIGN_AUTHORITY.md` e screen spec;
- velocidade/processo -> `docs/PRODUCTION_SPEED_PROTOCOL.md`;
- billing -> docs de billing;
- LGPD -> docs de privacidade;
- Android -> docs Android;
- release -> roadmap/release docs.

## Estado atual

O baseline real está no PR #2 / branch `codex/1-import-baseline` e já contém código web, Android, testes e documentação. O próximo objetivo é estabilizar o baseline e avançar V2 em entregas pequenas.
