# GitHub Acceleration Stack — Assistente Pedagógico

> Objetivo: aproveitar ferramentas, skills e projetos open source que encurtem o caminho entre referência visual e app Android real, sem transformar o projeto em uma coleção de dependências.

## Princípio

Adotar apenas recursos que reduzam um destes tempos:

1. tempo até primeiro render convincente;
2. tempo de comparação visual;
3. tempo de correção responsiva;
4. tempo de validação acessível/funcional;
5. tempo de repetição de tarefas pelo agente.

Não migrar stack ou adicionar framework só porque outra ferramenta usa.

## Adotar agora

### 1. Playwright para loop visual do Codex

Fonte: Microsoft Playwright / Playwright CLI.

Uso no projeto:

- render real da V2;
- screenshots automáticas;
- matriz de viewports Android;
- interação e smoke tests;
- checagem de overflow/truncamento;
- futura comparação de screenshots.

O projeto já usa `@playwright/test`; priorizar isso antes de adicionar outra ferramenta de browser.

Quando o ambiente do Codex permitir, considerar instalar a skill oficial do `playwright-cli` para browser automation mais token-efficient.

### 2. Impeccable como revisor externo de design

Fonte: `pbakaus/impeccable` (Apache-2.0).

Valor:

- skill especializada em design frontend;
- responsive behavior;
- tipografia, cor, spacing, motion e interação;
- live browser iteration;
- detectores de padrões genéricos de UI feita por IA.

Uso recomendado:

- **não** substituir `DESIGN_AUTHORITY`;
- usar como segunda opinião/revisor de qualidade;
- especialmente útil em comandos de `audit`, `polish`, `adapt` e responsive review.

Antes de instalar, verificar a versão/licença atual e revisar arquivos gerados.

### 3. Skills oficiais / skill creator

Fontes: OpenAI Codex / OpenAI plugins/skills e convenção `SKILL.md`.

Uso:

- manter skills de projeto em `.agents/skills/<skill>/SKILL.md`;
- skills curtas e acionáveis;
- colocar procedimentos determinísticos em scripts;
- referências grandes devem ser carregadas sob demanda, não despejadas no contexto toda vez.

Aplicação direta aqui:

- `assistente-pedagogico-rapid-ui`;
- `assistente-pedagogico-ui-screen-craft`;
- `assistente-pedagogico-android-adaptive-ui`.

### 4. Vercel `skills` CLI para descobrir/instalar skills

Fonte: `vercel-labs/skills`.

Valor:

- instala skills de repositórios GitHub;
- suporta convenção universal de `SKILL.md`;
- permite manter skills versionadas por projeto.

Uso recomendado:

- descoberta e instalação controlada;
- nunca instalar em massa sem revisar licença e instruções;
- preferir skills de projeto, versionadas no Git, para manter comportamento reproduzível.

## Avaliar como ferramenta visual paralela

### 5. Onlook

Fonte: `onlook-dev/onlook` (open source, Apache-2.0 no projeto principal).

É um editor visual/AI-first para React e uma das opções mais próximas de “design sobre o código”.

Teste sugerido:

- usar uma cópia/protótipo da V2;
- avaliar se consegue editar nosso React visualmente sem exigir migração estrutural;
- se funcionar bem, usar para composição/estilo e devolver alterações ao Git.

Não entregar acesso a segredos/dados reais de produção durante experimento.

### 6. Dyad

Fonte: `dyad-sh/dyad`.

Builder local, semelhante a Lovable/v0/Bolt, com BYOK. Parte open-source usa Apache-2.0; revisar separadamente qualquer código `src/pro`/fair-source.

Uso possível:

- gerar protótipos visuais rápidos a partir das referências;
- comparar resultado com Codex;
- aproveitar padrões/composição no clean room.

Não substituir automaticamente o app principal.

### 7. Open Lovable

Fonte: `firecrawl/open-lovable` (MIT).

Projeto de referência para chat -> geração/recriação de apps React em sandbox.

Uso recomendado:

- estudar arquitetura de loop de geração/aplicação rápida;
- estudar separação entre prompt, sandbox e preview;
- não copiar dependências/serviços/API keys desnecessários para o app.

### 8. bolt.diy

Fonte: projeto open-source `bolt.diy`.

Valor principal:

- prompt -> execução -> preview -> edição;
- suporta diversos providers/modelos;
- histórico/revert e terminal integrados.

Uso sugerido:

- laboratório alternativo para gerar uma tela V2 e comparar produtividade/qualidade;
- não migrar produto para sua arquitetura.

## Não adotar automaticamente agora

### Tailwind / shadcn

Lovable usa/tem histórico forte com React + Tailwind e componentes do ecossistema, mas nosso resultado visual não depende disso.

Podem acelerar geração porque modelos conhecem muito bem Tailwind, porém também aumentam o risco de `starter look`.

Decisão atual:

- não migrar a Home para Tailwind no meio do experimento;
- reconsiderar somente se o clean room em CSS continuar significativamente mais lento que protótipos visual-first;
- se adotado, usar apenas na V2 e com tokens próprios.

### TanStack Start / Supabase / Cloudflare Workers

Lovable atual usa TanStack Start para projetos novos e Supabase para backend, mas isso resolve necessidades de app web full-stack/SSR.

Nosso produto é Android via Capacitor, offline-first e já possui domínio/persistência/billing. Migrar para essa stack agora não melhora a Home e criaria risco de custo, lock-in operacional e retrabalho.

## “Treinar” o Codex sem treinar um modelo

Para este projeto, a forma de especialização mais econômica é:

```text
TARGETS VISUAIS APROVADOS
+ DESIGN_AUTHORITY
+ SKILLS CURTAS
+ EXEMPLOS BONS
+ BROWSER/SCREENSHOT LOOP
+ EVALS AUTOMÁTICOS
+ FEEDBACK DE REVIEW
= agente progressivamente mais consistente
```

Não precisamos fazer fine-tuning de modelo para o Codex aprender o produto.

O que deve evoluir continuamente:

- `SKILL.md` quando erro se repete;
- scripts quando tarefa repetitiva pode ser automatizada;
- screenshots de referência aprovados;
- testes de responsividade;
- testes de acessibilidade/fluxo;
- componentes V2 somente depois que padrões forem provados em telas reais.

## Próximas automações de alto retorno

1. `test:v2-responsive` — já introduzido para matriz Android;
2. captura automática de target/resultado lado a lado;
3. visual diff com tolerância para detectar regressão grande;
4. relatório automático de overflow/truncamento;
5. smoke test da Home V2 em Android/Chromium;
6. accessibility scan das superfícies V2;
7. screenshot artifact em PR/CI para revisão sem procurar arquivo no repo.

## Regra de custo

Recursos são escassos. Portanto:

- priorizar open source e ferramentas já presentes;
- evitar SaaS pago quando Playwright/scripts locais resolverem;
- nenhuma dependência nova apenas por moda;
- nenhuma API paga deve ser colocada no app sem necessidade real;
- protótipos externos não recebem dados pedagógicos, PII de professor/aluno ou segredos do projeto.

## Resultado desejado

O Codex deve operar cada vez mais como um builder visual:

`referência -> render -> screenshot -> crítica -> correção -> responsividade -> integração -> QA`

Mas a produção continua com nossos requisitos de Android, offline, LGPD, billing e dados reais.
