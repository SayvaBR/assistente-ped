# APK QA — Assistente Pedagógico V2

Este diretório documenta como baixar a compilação de teste do Android.

## Onde fica o APK

O APK não é versionado diretamente no Git para evitar inflar o histórico com binários a cada iteração.

Cada execução bem-sucedida do workflow **V2 validation** gera um artifact chamado:

`assistente-pedagogico-v2-qa`

Dentro dele ficam:

- `Assistente-Pedagogico-V2-QA.apk`
- `build-info.txt`

## Como baixar no GitHub

1. Abra a aba **Actions** do repositório.
2. Abra a execução mais recente de **V2 validation** na branch `codex/5-v2-clean-room`.
3. Confirme que os jobs `validate` e `Build Android QA APK` estão verdes.
4. Role até **Artifacts**.
5. Baixe `assistente-pedagogico-v2-qa`.
6. Extraia o ZIP e instale `Assistente-Pedagogico-V2-QA.apk` no Android.

## Segurança de teste

A variante QA usa `applicationIdSuffix ".qa"`, portanto pode ser instalada separadamente da futura versão de produção. Ela é destinada exclusivamente a testes e não deve ser publicada na Play Store.

## Antes de reportar bugs visuais

Ao testar no aparelho real, anote:

- modelo do aparelho;
- versão do Android;
- tamanho/escala de exibição;
- escala de fonte;
- tela/fluxo afetado;
- screenshot ou gravação curta;
- se o problema aparece após reiniciar o app.

Para o POCO X7 Pro, registrar também problemas de safe area, barra de gestos, teclado e bottom navigation.
