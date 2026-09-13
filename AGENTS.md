# Regras de trabalho — Assistente Pedagógico

## Objetivo

Construir um aplicativo Android local-first para professores, com interface clara, acessível e consistente com o Design System do projeto. A base atual usa React, TypeScript, Vite e Capacitor.

## Antes de alterar código

1. Leia `README.md`, `docs/ROADMAP-DE-LANCAMENTO.md` e `docs/ESTADO-DA-ENTREGA.md`.
2. Identifique o módulo afetado e preserve os contratos de dados existentes.
3. Não substitua a base por telas estáticas ou dados fictícios.
4. Não adicione segredos, chaves de assinatura, tokens, dados pessoais ou credenciais.

## Regras de implementação

- Reutilize tokens e componentes de `src/styles/design-system.css` e `src/components`.
- Preserve a persistência local e trate falhas de armazenamento sem apagar dados.
- Toda ação de criação, edição ou exclusão precisa atualizar a interface e persistir o resultado.
- Toda tela precisa ter estados de carregamento, vazio, erro e sucesso quando aplicável.
- Controles de toque devem ter área mínima de 48 px e nome acessível.
- Não use emojis como ícones estruturais; use os ícones Lucide já instalados.
- Respeite safe areas, foco visível, contraste e `prefers-reduced-motion`.
- Não invente preços, compras, métricas ou disponibilidade de serviços.

## Verificação obrigatória

Antes de considerar uma alteração concluída, execute:

```text
pnpm test
pnpm build
node scripts/android-sync.mjs
cd android && gradlew.bat assembleDebug
```

Quando a alteração envolver interface, execute também os E2E relevantes e registre evidências no estado da entrega.

## Git e release

- Trabalhe em branch própria para cada milestone quando houver remoto configurado.
- Não faça merge automático em `main`.
- Não altere dados do usuário para facilitar testes.
- APK debug é apenas artefato de validação; publicação exige assinatura de produção e AAB.
