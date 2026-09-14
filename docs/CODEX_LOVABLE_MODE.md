# Codex Lovable Mode — Fast Feedback V2

> **Objetivo:** aproximar o ciclo do projeto de builders rápidos: preview persistente, primeira renderização cedo, alterações pequenas, validação proporcional ao risco e trabalho paralelo em isolamento.

A referência operacional principal agora é `docs/PRODUCTION_SPEED_PROTOCOL.md`.

## Por que este modo existe

Builders rápidos não ganham velocidade porque ignoram qualidade. Eles reduzem o tempo entre:

`ideia -> alteração -> preview -> feedback -> próxima alteração`.

Nosso objetivo é fazer o mesmo sem abrir mão de dados, segurança, Android ou LGPD.

## Arquitetura

A UI V2 nasce em `src/v2/` e pode consumir domínio/dados do legado sem herdar a arquitetura visual antiga.

Reutilizar domínio, repositories, persistência, BNCC, billing e adapters nativos. Reconstruir shell, composição, componentes e estilo quando necessário.

## Loop visual

```text
target
-> implementação mínima da composição
-> render 390px
-> corrigir as maiores diferenças
-> repetir com HMR
-> candidata
-> 360/430 + estados
-> conectar/validar dados
-> testes relevantes
-> design review
```

### Mudança importante

**360/390/430, Android e E2E completo NÃO são obrigatórios durante cada microiteração.**

Eles entram quando existe uma candidata real ou quando o risco técnico exigir.

## Paralelismo

A antiga regra de impedir todo rollout enquanto uma única tela aguardava review está removida.

Podem existir várias trilhas independentes em worktrees/agentes:

- UI de uma tela;
- preparação de outra tela já especificada;
- integração de dados;
- QA/testes;
- Android/nativo;
- assets/research.

A única restrição é evitar edição concorrente dos mesmos arquivos compartilhados. Tokens, shell, package/config e primitives centrais têm um único owner por rodada.

## Preview persistente

Manter `pnpm dev` ativo durante trabalho visual. Vite/HMR é o caminho padrão.

Não reiniciar servidor, recompilar Android ou rodar toda a suíte quando uma alteração de CSS/composição pode ser validada instantaneamente no browser.

## Validação por risco

### Fast loop

```bash
pnpm run check:fast
```

Mais o teste diretamente relacionado quando necessário.

### Candidate

```bash
pnpm run check:candidate
```

Mais screenshot 360/390/430 e E2E relacionado para UI importante.

### PR/release

Suite profunda e Android conforme risco. CI roda checks em paralelo para tirar espera do loop local.

## Design System

Não construir Design System inteiro antes das telas.

Ordem:

1. fazer uma composição convincente;
2. observar padrões reais;
3. extrair primitives;
4. tokenizar o que se repetiu;
5. reutilizar.

## Screenshot aprovado

Mockup aprovado é target. Reproduzir hierarquia, proporção, densidade, tipografia, cor, superfícies, profundidade e personalidade.

Não reinterpretar automaticamente como dashboard SaaS, Material default, fintech, editorial corporativo ou Tailwind starter.

## Fast path

Pode ser agressivo em:

- composição;
- CSS;
- spacing;
- copy;
- iconografia;
- motion local;
- estados visuais sem mudança de contrato.

Pode inclusive refazer cedo uma composição ruim em vez de remendar.

## Deep path

Continua conservador em:

- dados/migração;
- storage;
- billing;
- backup/restore;
- criptografia;
- permissões;
- segurança/LGPD;
- BNCC e regras pedagógicas.

## Evidência

Durante o loop: mínima.

Na candidata: screenshot principal + diferenças + testes relevantes.

No PR: consolidar tudo uma única vez.

## Regra final

> **Acelerar o feedback, não cortar a qualidade. Paralelizar espera. Automatizar validação. Fazer o trabalho pesado somente no checkpoint certo.**
