# Billing nativo do Assistente Pro

O app agora possui um adaptador RevenueCat para Capacitor. Ele só sai do modo
preview quando estiver em uma build nativa com uma chave pública configurada e
quando a loja retornar uma oferta disponível.

## Configuração

1. Crie produtos de assinatura no Google Play Console e/ou App Store Connect.
2. Cadastre os produtos em um Offering no RevenueCat e associe o entitlement
   `pro` (ou o identificador definido em `VITE_REVENUECAT_PRO_ENTITLEMENT`).
3. Copie `.env.example` para `.env.local` e preencha somente a chave pública do
   SDK em `VITE_REVENUECAT_API_KEY`.
4. Gere e sincronize o app:

   ```bash
   pnpm build
   pnpm android:sync
   ```

5. Teste com conta de sandbox/teste da loja em um aparelho real.

O paywall lê título, preço e período diretamente do produto retornado pela
loja. A compra usa `purchasePackage`; a restauração só é disparada pelo botão
“Restaurar compra”. Builds web, sem chave ou sem Offering continuam exibindo a
prévia honesta, sem inventar preço ou simular ativação.
