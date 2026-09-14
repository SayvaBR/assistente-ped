# Fluxo de Supervisão de Design — Assistente Pedagógico

## Princípio

A UI atual é baseline funcional, não baseline visual. Grandes mudanças são permitidas quando preservam dados, segurança, privacidade, acessibilidade e contratos essenciais.

O processo de supervisão segue:

> **rápido no loop, rigoroso no checkpoint.**

Consulte `docs/PRODUCTION_SPEED_PROTOCOL.md`.

## Loop visual

Durante construção:

1. ler contexto mínimo (`WORKING_CONTEXT`, issue, target);
2. separar requisito funcional de legado visual;
3. implementar primeira composição;
4. renderizar 390 px;
5. comparar com target;
6. corrigir as maiores diferenças;
7. repetir via HMR.

Não exigir documentação longa, Android, E2E completo ou 360/430 a cada microiteração.

## Candidate gate

Quando a composição 390 estiver realmente convincente:

- validar 360/390/430;
- implementar estados relevantes;
- conferir touch targets, contraste, foco e texto;
- validar Reduced Motion quando houver animação;
- rodar `pnpm run check:candidate`;
- rodar E2E diretamente relacionado;
- capturar evidência candidata.

## PR gate

Antes de merge de UI relevante, o PR deve consolidar:

- target ou estado anterior quando fizer sentido;
- screenshot final;
- estados críticos;
- viewport/resolução;
- problema resolvido;
- decisões de UX importantes;
- testes finais proporcionais ao risco;
- limitações conhecidas.

Android completo entra quando houver impacto nativo ou no checkpoint de release/integração correspondente, não após cada ajuste visual.

## Paralelismo

Uma tela aguardando design review não deve paralisar todo o projeto.

Podem continuar em worktrees/agentes independentes:

- outra tela já especificada que não compartilhe os mesmos arquivos centrais;
- integração de dados;
- QA/testes;
- assets/research;
- Android/nativo.

Tokens globais, shell/navegação e primitives V2 centrais têm um único owner por rodada para evitar conflito.

## Gate de qualidade

Uma entrega não passa apenas porque compila ou ficou “mais bonita”.

Rejeitar UI genérica, dashboard SaaS, starter kit, Material default ou repetição de cards sem identidade.

Critérios finais continuam sendo função, identidade, hierarquia, acabamento, consistência e acessibilidade.

## Rollout

O rollout é guiado por risco e dependência, não por uma fila global estritamente serial.

Fundação compartilhada deve ser criada **just-in-time**, conforme telas reais provarem padrões. Não esperar um Design System completo para começar a produzir UI.

P0 técnico, segurança, privacidade e integridade de dados continuam acima de polish visual.

## Iteração

Mudanças dentro do mesmo escopo atualizam o mesmo PR. Abrir novo PR para milestone/risco independente.

Não criar novo PR a cada microajuste.
