# Resolução do blocker de QA físico — 2026-09-14

## Problema

O POCO X7 Pro possui `br.com.assistentepedagogico.app.qa` instalado com assinatura incompatível com o APK atual da branch `codex/5-v2-clean-room`, causando `INSTALL_FAILED_UPDATE_INCOMPATIBLE`.

## Decisão

Não desinstalar o app QA antigo e não apagar dados locais existentes.

A variante `qa` do V2 passa a usar `applicationIdSuffix ".v2qa"`, resultando em:

`br.com.assistentepedagogico.app.v2qa`

Isso permite instalação lado a lado e remove o blocker sem operação destrutiva.

## Limite

Esse package V2 QA serve para validação física de UI, navegação, persistência local, teclado, safe areas e comportamento Android.

Google Play Billing/RevenueCat reais continuam exigindo o package canônico e a assinatura da faixa Internal/Closed Testing.

## Próximo passo

Quando o CI gerar o próximo APK:

1. instalar o novo artifact V2 QA;
2. confirmar o package `.v2qa`;
3. executar o ciclo físico no POCO;
4. anexar screenshots do HEAD atual;
5. concluir screenshot -> diferenças -> correção -> nova screenshot para ClassWorkspace antes de qualquer gate visual.
