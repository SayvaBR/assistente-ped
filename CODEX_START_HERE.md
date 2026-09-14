# CODEX — START HERE

Se você é o Codex/Astra trabalhando neste repositório, siga esta ordem antes de qualquer alteração:

1. Leia `AGENTS.md`.
2. Leia `docs/STATUS.md`.
3. Leia `docs/DESIGN_AUTHORITY.md`.
4. Leia `docs/DESIGN_SUPERVISION_WORKFLOW.md`.
5. Trabalhe na branch indicada pela issue/PR atual.
6. Nunca faça merge automático em `main`.

## Tarefa atual — finalizar PR #2 / Issue #1

O baseline já foi importado para `codex/1-import-baseline` e o PR #2 está aberto.

Antes de qualquer redesign, finalize corretamente esse PR.

### Correções obrigatórias do PR #2

- Ajustar `docs/DIRECAO-VISUAL-UX.md`: a direção “Caderno Vivo” NÃO foi explicitamente aprovada pelo usuário. Trate-a como proposta experimental/local e declare `docs/DESIGN_AUTHORITY.md` como autoridade visual.
- Corrigir a inconsistência em `docs/STATUS.md` sobre a quantidade de testes Vitest (há números divergentes). Registrar somente o número real reproduzido pelo comando atual.
- Garantir que nenhum mascote/coruja seja usado no aplicativo. O usuário rejeitou mascotes explicitamente.
- Se `public/reference-art/splash-mascots.png` não tiver uso real, remover ou deixar claramente documentado como asset legado não utilizado.
- Atualizar o corpo do PR #2 com os comandos realmente executados e seus resultados: instalação, Vitest, E2E, build web, Capacitor sync, Android build, limitações conhecidas e riscos.
- Não iniciar redesign em massa neste PR.

### Verificação obrigatória antes de marcar o PR #2 pronto

Execute e registre o resultado real dos comandos disponíveis no ambiente:

```text
pnpm install --frozen-lockfile
pnpm test
pnpm test:e2e
pnpm build
node scripts/android-sync.mjs
cd android && gradlew.bat assembleDebug
```

Se algum comando não puder rodar, documente o bloqueio de forma reproduzível. Não invente PASS.

## Próxima tarefa visual — Issue #3

Somente depois do baseline estar revisável, inicie a Issue #3: `P0 Visual — Redesenhar Splash + Onboarding com gate de screenshots`.

A Issue #3 é um redesign estrutural, não um reskin. Antes de codificar, leia `docs/DESIGN_AUTHORITY.md`.

Regras fundamentais:

- NÃO usar mascote, coruja ou personagem-mascote.
- Não repetir `título grande + card + botão inferior` em todas as etapas.
- Não alterar dezenas de telas de uma vez.
- Trabalhar somente Splash + Onboarding.
- Capturar screenshots antes/depois e dos estados relevantes.
- Testar 360, 390 e 430 px.
- Uma tela que apenas compila não passa no gate visual.

## Processo de trabalho visual

1. Capturar a tela atual.
2. Descrever problemas reais de hierarquia, densidade, navegação e feedback.
3. Definir a nova arquitetura do fluxo.
4. Implementar em uma branch própria da Issue #3.
5. Rodar app e testes.
6. Capturar screenshots reais.
7. Abrir PR com antes/depois e justificativa.
8. Parar e aguardar revisão antes de seguir para Home ou outras áreas.

## Definition of Done

Nenhum trabalho visual importante está pronto sem screenshot real, build/testes e evidência de que o fluxo funciona no viewport móvel alvo.
