# AGENTS.md — Assistente Pedagógico

## Missão

Levar o Assistente Pedagógico até Android 1.0 estável, seguro, publicável e visualmente forte.

A base legada é **autoridade funcional, não visual**.

## Leia primeiro

Para quase toda tarefa, leia apenas:

1. `docs/WORKING_CONTEXT.md`;
2. a issue/tarefa atual;
3. o target/screen spec da tarefa.

Abra documentos especializados somente quando o trabalho tocar aquele domínio. Não releia todo o repositório por rotina.

## Stack

React + TypeScript + Vite + Capacitor Android.

Não migrar de stack sem decisão explícita de produto.

## Regra operacional principal

> **Rápido no loop, rigoroso no checkpoint.**

Seguir `docs/PRODUCTION_SPEED_PROTOCOL.md`.

Durante implementação visual, priorizar Vite/HMR, mudanças pequenas e `pnpm run check:fast`. Full build, E2E amplo e Android ficam para candidata/PR conforme risco.

## Paralelismo

O Codex deve usar agentes/worktrees paralelos quando as tarefas forem independentes.

Pode paralelizar:

- composição UI;
- integração de dados/adapters;
- QA/testes;
- pesquisa/assets;
- trabalho Android nativo.

Evitar conflito: somente um agente por vez deve editar tokens globais, shell/navegação, `package.json`, configs compartilhadas ou primitives V2 centrais.

## V2 Clean Room

Nova UI nasce em `src/v2/`.

Pode reutilizar:

- `src/domain/**`;
- `src/data/**`;
- repositories/storage;
- BNCC;
- billing real;
- adapters Capacitor;
- validações e utilitários sem responsabilidade visual.

Não usar como autoridade visual:

- `src/screens/**` V1;
- `src/components/**` V1;
- CSS/tokens V1;
- composição recuperada/legada.

Se lógica útil estiver presa à V1, extrair para camada neutra.

## Autoridade de UI

1. decisão explícita mais recente do usuário;
2. screenshot/mockup aprovado;
3. `docs/DESIGN_AUTHORITY.md`;
4. screen spec atual;
5. `docs/WORKING_CONTEXT.md`;
6. legado apenas para comportamento.

Screenshot aprovado é target, não inspiração vaga.

## Linguagem visual

**Friendly Professional + Candy UI + Tactile + Educational + Motion-led**.

Base: azul-claro + superfícies majoritariamente brancas + azul vivo para ação + navy para texto.

Sem mascote permanente. Sem coruja.

Evitar Material default, dashboard SaaS, card para tudo, grid de atalhos repetitivo, glassmorphism, gradiente genérico e estética de template de IA.

## Fluxo de UI

```text
target
-> primeiro render 390px
-> corrigir composição/hierarquia
-> candidata
-> 360/390/430
-> integrar dados/estados
-> motion/acessibilidade
-> testes relevantes
-> design review
```

Não criar Design System completo antes de provar telas reais. Extraia primitives apenas depois que padrões se repetirem.

## Fast path

Para CSS, spacing, copy, iconografia, composição e refinamento visual sem mudança de contrato:

- manter Vite/HMR rodando;
- `pnpm run check:fast`;
- screenshot 390 quando necessário;
- teste diretamente relacionado.

Não rodar Android ou E2E completo a cada ajuste.

## Deep path

Para storage, migração, billing, backup/restore, criptografia, permissões, BNCC, regras pedagógicas, segurança ou LGPD:

- validação profunda obrigatória;
- testes completos relevantes;
- Android quando aplicável;
- evidência detalhada.

## Imutável

Não quebrar:

- integridade/migração de dados;
- privacidade/LGPD;
- segurança;
- billing/RevenueCat;
- storage/offline;
- backup/restauração;
- BNCC/regras pedagógicas;
- acessibilidade;
- exportação/portabilidade/exclusão.

Dados de alunos e conteúdo pedagógico não podem entrar em analytics.

## Git

- não trabalhar em `main`;
- branch/worktree por entrega relevante;
- PR pequeno e revisável;
- commits pequenos;
- não fazer merge automático;
- não misturar baseline, redesign, infra e feature sem necessidade.

Git preflight completo só quando iniciar uma nova worktree/tarefa ou houver risco de branch desatualizada. Não repetir comandos de fetch/log a cada microiteração visual.

## Testes

Durante loop:

```text
pnpm run check:fast
```

Candidata:

```text
pnpm run check:candidate
```

PR/release: usar a validação proporcional ao risco descrita em `docs/PRODUCTION_SPEED_PROTOCOL.md`.

## Design review

O agente não declara a própria tela aprovada.

Quando houver candidata real, registrar:

`READY FOR DESIGN REVIEW — <TELA>`

Isso bloqueia apenas a **expansão daquele trabalho visual dependente**, não outras trilhas independentes.

## Regra final

> **Preservar motores e contratos. Reconstruir experiência. Fazer feedback chegar cedo. Paralelizar o que não conflita.**
