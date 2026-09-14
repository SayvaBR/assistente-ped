# Verificação do Paywall em aparelho real

O paywall só deve ser considerado pronto depois de ser percorrido em um telefone
real, com a mesma sequência de estados que o usuário verá na publicação.

## Preparação

1. Gere o bundle web e sincronize o Android:

   ```bash
   pnpm build
   pnpm android:sync
   ```

2. Instale o APK de debug no telefone conectado e abra o app com o
   `agent-device`.

   ```bash
   pnpm android:device:check
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   agent-device open br.com.assistentepedagogico.app --foreground
   ```

   O primeiro comando precisa encontrar pelo menos um dispositivo no estado
   `device`. Ele falha intencionalmente para estados `unauthorized`, `offline`
   ou quando nenhum telefone está conectado.

3. Comece cada rodada com armazenamento limpo ou com um perfil de teste
   identificado. Nunca use dados reais nas capturas.

## Fluxos obrigatórios

- Cold start: o splash termina sem piscar uma tela errada ou travar o conteúdo.
- Onboarding em tela pequena: o primeiro CTA e a opção de pular ficam visíveis
  sem exigir zoom ou rolagem inesperada.
- Caminho até o paywall: Início → Mais → Seu plano.
- Estado local: o interesse pelo Pro é salvo e permanece após reabrir o app.
- Alternativa gratuita: continuar no gratuito é sempre possível e não parece
  uma ação quebrada.
- Offline: o app continua abrindo e o paywall não promete uma compra que não
  pode ser concluída.
- Rede lenta: a consulta de ofertas do billing deve mostrar estado de
  carregamento específico, sem bloquear a navegação inteira.
- Rotação, teclado e fonte ampliada: nenhum título, CTA ou texto legal fica
  cortado.
- Back físico/gesto: voltar sai do paywall e retorna ao contexto que o abriu.

## Evidência mínima

Para cada rodada, guardar screenshot de:

1. onboarding inicial;
2. Home;
3. paywall no estado inicial;
4. paywall após salvar interesse;
5. erro/offline ou estado equivalente;
6. retorno para a tela anterior.

Usar `snapshot -i` antes de cada ação, `press|click|scroll ... --settle` para
interagir e `wait text`/`is` para verificar o resultado. Encerrar a sessão com:

```bash
agent-device close
```

O skill é uma camada de verificação: ele não substitui preço real, produto na
loja, entitlement ou restauração implementados pelo provedor de billing.
