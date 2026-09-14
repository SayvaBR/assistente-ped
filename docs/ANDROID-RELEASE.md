# Release Android

Este projeto usa Android App Bundle (AAB) para a Google Play. O
`targetSdkVersion` é 36, necessário para novas submissões a partir de
31/08/2026 segundo os requisitos atuais do Play Console.

## Assinatura

A chave privada não deve ser versionada, colocada em `.env` ou embutida no
projeto. Para o primeiro envio, use uma upload key própria e habilite Play App
Signing no Play Console. O Google usará a app signing key para assinar os APKs
distribuídos; o arquivo enviado pelo desenvolvedor deve ser assinado com a
upload key.

O Gradle lê estas variáveis somente no ambiente de build:

```text
AP_RELEASE_STORE_FILE=C:\caminho\seguro\assistente-upload.jks
AP_RELEASE_STORE_PASSWORD=...
AP_RELEASE_KEY_ALIAS=assistente-upload
AP_RELEASE_KEY_PASSWORD=...
```

O caminho pode ser absoluto. As senhas devem ser fornecidas pelo gerenciador de
segredos do ambiente de CI ou pela sessão local, nunca por commit.

## Comandos

Release assinada — falha antes do build se a chave não estiver configurada:

```powershell
$env:AP_RELEASE_STORE_FILE = 'C:\segredos\assistente-upload.jks'
$env:AP_RELEASE_STORE_PASSWORD = '...'
$env:AP_RELEASE_KEY_ALIAS = 'assistente-upload'
$env:AP_RELEASE_KEY_PASSWORD = '...'
pnpm android:release
```

O artefato esperado é:

`android/app/build/outputs/bundle/release/app-release.aab`

Para validação local sem chave, use explicitamente:

```powershell
pnpm android:release:unsigned
```

Esse arquivo serve apenas para verificar compilação e não pode ser enviado à
Google Play. Antes do envio, conferir a assinatura do AAB e configurar o Play
App Signing no Console.

## Checklist antes do upload

- [ ] Identidade e conta de desenvolvedor verificadas no Play Console.
- [ ] Upload key guardada fora do repositório e com backup seguro.
- [ ] AAB assinado gerado pelo comando de release.
- [ ] `versionCode` incrementado em relação ao último envio.
- [ ] Política de privacidade pública e ficha Data safety coerentes com a versão.
- [ ] Teste interno concluído com câmera, áudio, arquivos, compartilhamento,
  notificações, restauração e back button.
