# Variante Android de QA

Esta variante existe para validar fluxos destrutivos e permissões sem tocar nos dados do aplicativo de produção instalado no aparelho.

## Identidade

- Package: `br.com.assistentepedagogico.app.qa`
- Nome exibido: `Assistente Pedagógico`
- Versão: `0.3.0-qa` / `versionCode 30`
- APK: `android/app/build/outputs/apk/qa/app-qa.apk`
- SHA-256 atual: `6E3518954A6612959F359855E9350EC1F431AFE4B8287895D9A451960F1D17CA`
- A variante usa o build type `qa`, assinatura debug e armazenamento separado do package de produção.

## Reproduzir

```text
pnpm android:qa
adb -s <serial> install -r android/app/build/outputs/apk/qa/app-qa.apk
adb -s <serial> shell am start -n br.com.assistentepedagogico.app.qa/br.com.assistentepedagogico.app.MainActivity
```

O Android pode exigir confirmação física para instalação via USB. Se retornar
`INSTALL_FAILED_USER_RESTRICTED`, desbloqueie o aparelho, aceite a solicitação
de instalação/depuração e repita somente o comando `adb install`; não é preciso
limpar ou desinstalar `br.com.assistentepedagogico.app`.

O fluxo de câmera usa apenas o diretório `external-files-path` específico do
aplicativo. O caminho externo amplo (`external-path`) não é permitido.

## Estado desta rodada

`pnpm android:qa` passou e o APK foi auditado com `aapt`: package, atividade,
versão, SDK 36 e label foram confirmados. Após a autorização física solicitada
no aparelho `FMV455CMZXY5HYXS`, a instalação foi concluída e a rodada QA
validou onboarding, cadastro de aluno, chamada, planejamento, seletor de
arquivos, câmera, aparência, backup manual e persistência após reinício. Os
fluxos usaram somente dados sintéticos e o pacote de produção permaneceu
intocado.
