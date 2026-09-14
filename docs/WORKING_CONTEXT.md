# Working Context — Assistente Pedagógico

Leia este arquivo primeiro. Ele existe para reduzir contexto e acelerar o Codex.

## Produto

Assistente Pedagógico é um app Android local-first para professores.

Stack: React + TypeScript + Vite + Capacitor Android.

App ID: `br.com.assistentepedagogico.app`.

## Missão atual

Transformar a base funcional recuperada em Android 1.0 profissional, estável, publicável e visualmente forte.

O legado é autoridade de dados/regras/contratos, não de design.

## UI V2

Nova UI nasce em `src/v2/`.

Pode reutilizar domínio, repositories, storage, BNCC, billing e adapters nativos. Não herdar composição/CSS/componentes visuais V1 como autoridade.

Linguagem desejada: **Friendly Professional + Candy UI + Tactile + Educational + Motion-led**.

Base visual: azul-claro + superfícies brancas + azul vivo para ação + navy para texto.

Sem mascote permanente. Sem coruja. Ilustração humana apenas quando narrativamente útil.

Evitar Material default, dashboard SaaS, card para tudo, gradiente genérico, glassmorphism e grids de atalhos repetitivos.

## Autoridade para UI

1. decisão explícita mais recente do usuário;
2. screenshot/mockup aprovado;
3. `docs/DESIGN_AUTHORITY.md`;
4. screen spec atual;
5. `docs/PRODUCTION_SPEED_PROTOCOL.md`;
6. legado apenas para comportamento/contratos.

## Prioridade imediata

1. reconstruir a primeira tela pós-Splash como `Onboarding Entry V2` usando `docs/SCREEN_SPEC_ONBOARDING_ENTRY_V2.md`;
2. construir em paralelo o MVP do `UI Lab` de `docs/UI_LAB_SPEC.md` quando não houver conflito;
3. trabalhar em loop visual curto: `edit -> HMR -> render 390 -> screenshot -> compare -> corrigir`;
4. não expandir para outras telas antes de uma candidata visual convincente.

## Velocidade

Regra: **rápido no loop, rigoroso no checkpoint**.

Durante iteração: Vite/HMR + `pnpm run check:fast` + render 390px.

Somente em candidata: 360/390/430, estados essenciais, `pnpm run check:candidate` e teste relacionado.

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
- não usar reset destrutivo;
- preservar mudanças locais;
- branch/worktree por entrega relevante;
- PR pequeno e revisável;
- não fazer merge automático.

## Tela visual

Fluxo padrão:

`target -> primeiro render 390 -> corrigir composição -> candidata -> 360/430 -> integrar estados/dados -> testes relevantes -> review`.

## Documentação por exceção

Abra documentos especializados apenas quando a tarefa tocar o tema. Não reler o repositório inteiro a cada sessão.
