# Status operacional

Atualizado em 13/09/2026.

## Frente ativa — P0 Visual #5 / PR #8

O PR #8 (`codex/5-v2-clean-room`) continua como a única frente visual V2 e permanece em **draft**. Não fazer merge automático.

A **Home V2 está VISUAL DIRECTION APPROVED**. Isso libera a migração sequencial das superfícies diretamente alcançadas pela Home, mas não significa que o PR esteja pronto para merge nem que a Fundação Visual V2 #5 esteja concluída.

### Progresso confirmado

- V2 visual isolada em `src/v2/`, sem usar a arquitetura visual V1 como autoridade;
- fluxo Visual Builder formalizado: `HIPÓTESE -> EXPERIMENTO -> OBSERVAÇÃO -> CORREÇÃO`;
- regra Android adaptativa alinhada entre `AGENTS.md` e `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
- Home V2 renderizada e refinada no viewport-âncora de 390 px com evidência pública no PR;
- Home principal conectada a perfil, turma, planos do dia, frequência e agenda local por adapter V2; fixtures sintéticas permanecem restritas ao Visual Lab/evidência pública;
- avatar e itens da agenda possuem ação/semântica interativa real;
- matriz responsiva da Home validada em 320 / 360 / 390 / 412 / 432 / 480 / 600 px;
- Android sync/Gradle/APK QA já passaram na rodada funcional;
- workflow `V2 validation` está verde no head `159112e`;
- Gate adicional de aparelho real documentado em `docs/ANDROID_REAL_DEVICE_QA.md`, usando POCO X7 Pro como referência física de aceitação sem transformá-lo em breakpoint de layout.

### Gate de produção/merge ainda pendente

A aprovação visual da Home não fecha o Gate B. Antes de `PRODUCTION GATE READY`, ainda é obrigatório:

1. fechar a matriz relevante de estados (pressed/focus/loading/error/offline/success quando aplicável);
2. validar crescimento de texto 115/130/150% sem sacrificar copy, hierarquia ou navegação;
3. validar touch targets, safe areas e comportamento de teclado nas superfícies aplicáveis;
4. validar motion e Reduced Motion;
5. remover/ajustar qualquer sombra difusa que conflite com a física tátil V2 ou registrar exceção deliberada;
6. executar QA de edge cases e persistência das ações reais;
7. executar QA em aparelho Android real conforme `docs/ANDROID_REAL_DEVICE_QA.md` quando o POCO X7 Pro estiver disponível, sem inventar evidência se não houver acesso físico;
8. manter CI verde no head que vier a ser candidato ao Gate B.

## Superfície P0 em Design Review — Frequência / Fazer chamada

A Frequência V2 foi implementada e endurecida. No head `159112e`, os bloqueios técnicos apontados na revisão anterior foram corrigidos: handlers reais foram conectados para Configurar turma, detalhes do aluno e tabs de contexto; os alvos do seletor passaram para 48 px; a composição estreita passou a reflow em vez de reduzir agressivamente a tipografia; `pnpm run test:v2-responsive` agora inclui a suíte da Frequência; e a suíte verifica touch targets e texto ampliado em 115/130/150%. O CI `V2 validation` está verde.

Há evidência versionada de 390 px, before/after Home→Frequência, estados loading/error/offline/empty e stress em 320 px com texto 150%. O trabalho está marcado como **`READY FOR DESIGN REVIEW — FREQUÊNCIA V2`**, mas isso ainda **não é** `VISUAL DIRECTION APPROVED`.

Bloqueio atual do Gate A:

1. anexar diretamente ao PR a evidência pós-hardening de 390 px e 320 px / 150% para revisão visual lado a lado; referência de arquivo no repositório não substitui evidência inspecionável no gate;
2. registrar uma rodada Visual Builder pós-hardening com observação explícita das 3–5 diferenças perceptivas restantes e nova captura após a correção principal;
3. não iniciar `Registrar observação V2` antes de `VISUAL DIRECTION APPROVED — FREQUÊNCIA`, conforme a fila P0 da Issue #5.

Próximo ciclo obrigatório:

`RENDER PÓS-HARDENING -> SCREENSHOT 390 ANEXADA -> SCREENSHOT 320/150% ANEXADA -> OBSERVAÇÃO 3–5 DIFERENÇAS -> CORREÇÃO PRINCIPAL -> NOVA SCREENSHOT -> REVISÃO VISUAL`

Gate B da Frequência continuará exigindo motion/Reduced Motion, QA Android real quando disponível, persistência/recovery e estados finais, mesmo após eventual aprovação visual.

## Prioridade e dependências

- **P0 técnico / segurança / privacidade / integridade de dados** continuam acima de refinamento visual.
- **P0 Visual #5** continua aberto até a fundação estar demonstrada nos contextos reais exigidos e os gates de produção estarem fechados.
- **P0 Growth #6** permanece bloqueado até a Fundação Visual V2 estar aprovada no nível exigido pela issue e a base de billing estar estável.
- Splash/Onboarding, P1 e P2 não devem atropelar a fila sequencial do primeiro anel da Home.

## Baseline funcional preservado

A branch base contém React + TypeScript + Vite + Capacitor Android, persistência/local-first, BNCC, backup, billing/RevenueCat e demais contratos funcionais. Esses motores podem ser reutilizados pela V2, mas o legado não é baseline visual.

Guardrails imutáveis:

- LGPD e privacidade;
- nenhum dado pedagógico/aluno em analytics;
- integridade e migração de dados;
- funcionamento offline do núcleo;
- billing/entitlements reais;
- backup/restauração/exportação/exclusão;
- acessibilidade e Reduced Motion;
- nenhuma credencial, segredo ou dado real em evidência visual.

## Release

Ainda não há release comercial pronta. Não gerar expectativa de produção até existirem, no mínimo, assinatura de release, billing real validado, revisão de privacidade/jurídica, QA Android final e gates P0 concluídos.
