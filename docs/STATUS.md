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
- `pnpm run check:v2-boundary`, testes Vitest, `pnpm run test:v2-responsive` e build aprovados;
- matriz responsiva da Home validada em 320 / 360 / 390 / 412 / 432 / 480 / 600 px;
- Android sync/Gradle/APK QA já passaram na rodada funcional;
- workflow `V2 validation` está verde no head `8e8a2e1`;
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

A Frequência V2 foi implementada e possui evidência pública de 390 px, before/after Home→Frequência e estados loading/error/offline/empty. O head `8e8a2e1` está com `V2 validation` verde. **Ainda não está `VISUAL DIRECTION APPROVED`.**

Bloqueios confirmados na revisão:

1. `Configurar turma` e a seta `Mais detalhes de <aluno>` são controles focáveis sem ação real;
2. tabs de contexto dependem de `onContextChange`, mas a integração real em `App.js` não fornece esse handler;
3. opções do seletor de status usam `min-height: 44px`, abaixo do mínimo obrigatório de 48 px;
4. abaixo de 360 px a composição reduz tabs/status/bottom nav para `0.65rem` / `0.64rem` / `0.61rem`, sacrificando legibilidade em vez de adaptar layout;
5. `e2e/v2-frequency-responsive.pw.ts` existe e foi reportado como aprovado localmente, mas `pnpm run test:v2-responsive`/CI executa apenas `e2e/v2-responsive.pw.ts` e portanto não cobre a Frequência;
6. a suíte específica ainda não mede touch targets >=48 px nem crescimento de texto 115/130/150%;
7. após as correções, anexar nova evidência representativa em 390 px e 320 px com texto ampliado.

Próximo ciclo obrigatório:

`CORRIGIR AFFORDANCES -> TOUCH TARGETS -> LEGIBILIDADE -> RENDER -> SCREENSHOT 390 -> SCREENSHOT 320/150% -> OBSERVAÇÃO -> CORREÇÃO -> NOVA SCREENSHOT`

Não avançar para **Registrar observação** antes de `VISUAL DIRECTION APPROVED — FREQUÊNCIA`.

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