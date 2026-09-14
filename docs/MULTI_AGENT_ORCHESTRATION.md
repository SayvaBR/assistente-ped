# Multi-Agent Orchestration — Assistente Pedagógico

## Objetivo

Usar o Codex como orquestrador de uma pequena equipe de agentes especializados, reduzindo tempo de ciclo sem aumentar conflitos ou degradar qualidade.

Regra central:

> **paralelizar leitura, análise, QA e tarefas de escrita isoladas; serializar arquivos compartilhados.**

## Agente principal

O chat principal é o orquestrador. Mantém requisitos, decisões, integração final e ownership de arquivos compartilhados.

## Agentes do projeto

- `visual_director` — Luna High, read-only: crítica de screenshots, composição e identidade.
- `code_mapper` — Luna Medium, read-only: mapeia entry points, dados e arquivos mínimos.
- `ui_worker` — Luna High, workspace-write: implementa uma única tela V2 isolada.
- `ui_lab_worker` — Luna High, workspace-write: implementa `src/v2/lab/**`, previews e fixtures.
- `qa_reviewer` — Luna High, read-only: regressões, responsividade, acessibilidade e testes faltantes.

## Paralelismo recomendado

Para UI:

1. `visual_director` analisa target/anti-target;
2. `code_mapper` mapeia a integração mínima;
3. `ui_worker` implementa a tela em worktree isolada;
4. `ui_lab_worker` implementa o UI Lab em outra worktree;
5. `qa_reviewer` entra quando existir candidata 390px.

## Arquivos compartilhados

Somente o orquestrador altera por padrão:

- `package.json`;
- tokens globais;
- root router/navigation;
- app shell;
- primitives V2 centrais;
- configs de build;
- storage/billing/schema.

Dois agentes nunca editam o mesmo arquivo compartilhado simultaneamente.

## Worktrees

Usar worktrees para duas frentes com escrita paralela. Read-only reviewers não precisam de ownership de escrita.

## Estratégia de modelo

Luna High é indicado para tarefas rápidas, delimitadas e paralelas. O agente principal deve continuar no modelo mais forte disponível para arquitetura, integração e mudanças críticas.

## Rodada atual

- Worktree A: Onboarding Entry V2;
- Worktree B: UI Lab;
- visual_director e code_mapper em paralelo no início;
- qa_reviewer somente após primeira candidata.

## Regra final

> Paralelize investigação e trabalho isolado; centralize decisões e arquivos compartilhados.
