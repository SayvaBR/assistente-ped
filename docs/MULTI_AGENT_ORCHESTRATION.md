# Multi-Agent Orchestration — Assistente Pedagógico

## Objetivo

Usar o Codex como orquestrador de uma pequena equipe de agentes especializados, reduzindo tempo de ciclo sem aumentar conflitos ou degradar qualidade.

Regra central:

> **paralelizar leitura, análise, QA e tarefas de escrita isoladas; serializar arquivos compartilhados.**

## Papel do agente principal

O chat principal é o **orquestrador**. Ele mantém requisitos, decisões, trade-offs e integração final.

Ele não deve gastar contexto fazendo toda exploração, todos os testes e toda revisão sozinho.

Responsabilidades do orquestrador:

- entender a meta da rodada;
- dividir o trabalho;
- iniciar subagentes apropriados;
- atribuir ownership de arquivos;
- evitar dois agentes editando o mesmo arquivo compartilhado;
- reunir resultados;
- fazer integração mínima entre worktrees;
- decidir quando uma candidata está pronta para review;
- nunca fazer merge automático.

## Agentes do projeto

Configurados em `.codex/config.toml` e `.codex/agents/`.

### `visual_director` — Luna High, read-only

Usar para:

- criticar screenshots;
- comparar composição com screen spec;
- identificar aparência genérica;
- priorizar as 3 maiores diferenças perceptivas.

Não edita código.

### `code_mapper` — Luna Medium, read-only

Usar antes de mudanças funcionais/integrativas para:

- mapear entry points;
- localizar estado/dados;
- listar somente arquivos realmente necessários;
- apontar riscos de fronteira V1/V2.

Não edita código.

### `ui_worker` — Luna High, workspace-write

Usar para uma única tarefa visual isolada.

Ownership típico:

- screen V2 da rodada;
- CSS local daquela screen;
- componentes locais ainda não compartilhados.

Não deve editar tokens globais, root shell, `package.json` ou primitives compartilhadas sem delegação explícita.

### `ui_lab_worker` — Luna High, workspace-write

Ownership:

- `src/v2/lab/**`;
- `src/v2/preview/**`;
- fixtures do Lab;
- scripts exclusivos do Lab.

Mudanças em `package.json`/root routing devem ser sugeridas ao orquestrador se houver risco de conflito.

### `qa_reviewer` — Luna High, read-only

Usar quando existir candidata para:

- regressões;
- acessibilidade;
- 360/390/430;
- text scale;
- reduced motion;
- estados faltantes;
- teste mínimo necessário.

Não edita código.

## Limite de paralelismo

Máximo configurado: 6 threads de subagentes por sessão.

Não significa que 6 devem ser usadas sempre.

Padrão recomendado para UI:

1. `visual_director` — análise do target/anti-target;
2. `code_mapper` — mapa mínimo;
3. `ui_worker` — implementação da tela;
4. `ui_lab_worker` — UI Lab em worktree separada;
5. `qa_reviewer` — entra quando a primeira candidata existir.

Normalmente 3–5 agentes bastam.

## Regras anti-conflito

Somente o orquestrador pode alterar, por padrão:

- `package.json`;
- tokens globais;
- root navigation/router;
- app shell compartilhado;
- primitives V2 centrais;
- configs de build;
- schemas/storage/billing.

Um subagente pode tocar esses arquivos apenas quando receber ownership explícito.

Dois agentes nunca devem editar o mesmo arquivo compartilhado simultaneamente.

## Worktrees

Para duas frentes com escrita em paralelo, usar worktrees isoladas.

Exemplo atual:

- Worktree A: `Onboarding Entry V2`;
- Worktree B: `UI Lab`.

Agentes read-only podem operar sem ownership de escrita.

## Estratégia de modelos

Luna High é excelente para tarefas rápidas, delimitadas e paralelas, especialmente revisão, exploração focada e UI isolada.

O agente principal deve permanecer no modelo mais forte disponível para:

- arquitetura;
- integração de resultados;
- decisões ambíguas;
- mudanças de domínio/dados/billing/segurança.

Não usar Luna como substituto automático do orquestrador em mudanças críticas.

## Rodada atual

### Frente A — Onboarding Entry V2

- `visual_director`: critique o anti-target atual e o primeiro render;
- `code_mapper`: localize integração mínima;
- `ui_worker`: reconstrua a composição em `src/v2/`;
- orquestrador: mantém ownership de qualquer shared token/router.

### Frente B — UI Lab

- `ui_lab_worker`: constrói MVP dev-only em worktree separada;
- orquestrador: faz apenas a integração compartilhada necessária.

### Frente C — QA

- `qa_reviewer`: só após existir candidata visual.

## Loop recomendado

```text
ORCHESTRATOR
  ├─ visual_director (read-only)
  ├─ code_mapper (read-only)
  ├─ ui_worker (worktree A)
  └─ ui_lab_worker (worktree B)

ui_worker -> render 390
visual_director -> crítica curta
ui_worker -> correção principal
qa_reviewer -> candidata
orchestrator -> integração/checkpoint
```

## Stop condition

O orquestrador deve parar expansão quando existir uma candidata forte e retornar um resumo consolidado, em vez de continuar gerando trabalho por inércia.
