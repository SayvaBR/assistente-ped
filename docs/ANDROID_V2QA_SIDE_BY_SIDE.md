# Android V2 QA — instalação lado a lado

## Decisão

O build `qa` da branch V2 Clean Room passa a usar o package:

`br.com.assistentepedagogico.app.v2qa`

em vez de:

`br.com.assistentepedagogico.app.qa`

## Motivo

O POCO X7 Pro já possui um APK antigo com `br.com.assistentepedagogico.app.qa` assinado por outra chave. Tentar instalar o APK atual sobre esse pacote produz `INSTALL_FAILED_UPDATE_INCOMPATIBLE`.

Não remover automaticamente o app QA antigo e não apagar os dados locais existentes apenas para validar o HEAD atual.

## Regra de QA físico

Para validar o V2 atual:

1. gerar o APK normalmente com `pnpm run android:qa`;
2. instalar o APK gerado;
3. confirmar via `adb shell pm list packages | grep assistentepedagogico` que `br.com.assistentepedagogico.app.v2qa` está instalado;
4. abrir especificamente o app V2 QA;
5. registrar commit/branch, screenshot física e diferenças preview x WebView;
6. manter o pacote QA antigo intacto, salvo autorização humana explícita para removê-lo.

## Importante sobre billing

O package `br.com.assistentepedagogico.app.v2qa` existe para QA físico, layout, navegação, persistência local e comportamento Android.

Ele NÃO substitui validação real de Google Play Billing/RevenueCat.

Billing real deve ser validado em Internal/Closed Testing usando o package canônico da Play Store e a cadeia de assinatura correta.

## Visual gate

Resolver a instalação não aprova nenhuma tela visualmente.

ClassWorkspace e demais superfícies continuam exigindo:

`render -> screenshot -> 3–5 diferenças -> corrigir a maior -> nova screenshot`

além de estados e checkpoints responsivos aplicáveis antes do gate.

## Segurança

- não desinstalar pacote existente automaticamente;
- não usar `adb uninstall` sem autorização explícita quando houver risco de perda de dados;
- não tentar contornar assinatura Android;
- não reutilizar keystore desconhecida;
- não publicar `v2qa` na Google Play.
