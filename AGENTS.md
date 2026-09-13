# AGENTS.md — Assistente Pedagógico

Este arquivo contém regras obrigatórias para qualquer agente de código que trabalhe neste repositório, incluindo Codex/Astra.

## Missão

Levar o Assistente Pedagógico até Android 1.0 funcional, estável, seguro, publicável e com identidade visual própria forte.

A aplicação legada é **baseline funcional, não baseline de design**.

A partir da V2, o objetivo é trabalhar em modo **visual-first + clean room**, seguindo `docs/CODEX_LOVABLE_MODE.md` e as skills do projeto.

## Stack

- React
- TypeScript
- Vite
- Capacitor Android

Não migrar de stack sem decisão explícita de produto.

A stack atual é suficiente para reproduzir os targets visuais aprovados. Não usar a stack como justificativa para manter layout antigo ou UI genérica.

## Autoridade

Para UI/UX, obedecer nesta ordem:

1. decisão explícita mais recente do usuário/produto;
2. `docs/DESIGN_AUTHORITY.md`;
3. este `AGENTS.md`;
4. `docs/CODEX_LOVABLE_MODE.md`;
5. skills `.agents/skills/assistente-pedagogico-rapid-ui/` e `.agents/skills/assistente-pedagogico-ui-screen-craft/`;
6. `docs/design-v2/` e screen spec correspondente;
7. `docs/VISUAL_IDENTITY_V2.md`;
8. legado.

Screenshot/mockup explicitamente aprovado é **target visual**, não inspiração vaga.

## Git preflight obrigatório

O Codex deve consultar o Git remoto antes de começar a implementar.

Executar:

```bash
git status
git branch --show-current
git fetch origin --prune
git log -1 --oneline
git log -1 --oneline origin/$(git branch --show-current)
```

Se a branch local estiver atrás, sincronizar primeiro.

Não implementar por horas em estado local desatualizado.

Antes de encerrar uma rodada:

```bash
git status
git diff --stat
git log -1 --oneline
```

Toda evidência visual deve informar branch e commit.

## V2 Clean Room

Toda nova interface V2 deve nascer em `src/v2/`.

A camada V2 pode consumir lógica/dados do legado, mas não sua arquitetura visual.

### Pode reutilizar

- `src/domain/**`;
- `src/data/**`;
- repositories e persistência;
- modelos/validações;
- adapters Capacitor;
- BNCC;
- billing real;
- utilitários sem responsabilidade visual.

### Não pode ser autoridade/dependência visual

- `src/screens/**`;
- `src/components/**` legados;
- `src/core/recovered.js` para composição/UI;
- CSS visual V1;
- tokens V1;
- `Card`, `IconTile` ou equivalentes herdados da V1.

Se lógica estiver presa a componente V1, extrair a lógica para camada neutra e conectar à V2.

Não deformar a V2 para caber no legado.

## Fluxo visual-first obrigatório

Para tela com target claro:

```text
TARGET
-> PRIMEIRA COMPOSIÇÃO V2
-> PRIMEIRO RENDER 390px
-> COMPARAÇÃO LADO A LADO
-> CORRIGIR AS 5 MAIORES DIFERENÇAS
-> 360/390/430
-> CONECTAR DADOS REAIS
-> ESTADOS/OFFLINE/ERROS
-> MOTION/HAPTICS
-> TESTES/ANDROID
-> DESIGN REVIEW
```

Não fazer antes do primeiro render:

- refatoração ampla do app;
- migração de dezenas de telas;
- Design System completo especulativo;
- abstrações para problemas ainda não vistos;
- auditoria visual do legado inteiro.

Primeiro fazer uma tela convincente. Depois extrair primitives comprovadas.

## Uma tela por vez

Enquanto a Home V2 não passar por Design Review, não fazer rollout visual em massa.

Ordem atual:

1. Home V2;
2. Frequência;
3. Registrar observação;
4. Compromissos;
5. Planejamento diário;
6. Planejamento mensal.

## Identidade visual V2

A linguagem é:

> **Friendly Professional + Candy UI + Tactile + Educational + Motion-led**

Balanço:

> **fundo azul-claro + superfícies majoritariamente brancas + azul vivo para foco/ação + navy para texto**

Regras:

- tipografia arredondada, forte e amigável;
- superfícies táteis;
- depth físico controlado;
- iconografia chunky/rounded;
- ilustrações humanas apenas quando narrativamente úteis;
- sem mascote permanente;
- boa densidade operacional;
- hierarquia clara;
- cards apenas quando representam objetos reais.

Rejeitar como linguagem dominante:

- dashboard SaaS;
- fintech/editorial corporativo;
- grid 2×N de atalhos;
- card branco para tudo;
- uppercase excessivo;
- Material default;
- Tailwind starter look;
- glassmorphism;
- gradiente genérico;
- bento decorativo;
- `ícone + título + subtítulo + chevron` repetido;
- estética de template de IA.

Anti-card não significa anti-surface.
Profissional não significa corporativo.
Playful não significa infantil.

## Motion

Para motion, consultar os documentos V2 correspondentes.

Regras mínimas:

- motion explica causalidade/estado;
- nada de animação gratuita;
- `prefers-reduced-motion` obrigatório;
- gesto importante precisa de alternativa;
- haptic apenas quando tem significado;
- nunca mostrar sucesso antes de confirmação real.

## O que é imutável

Não quebrar:

- integridade e migração de dados;
- privacidade/LGPD;
- segurança;
- dados de alunos e dados pedagógicos;
- billing/RevenueCat;
- storage;
- backup/restauração;
- funcionamento offline do núcleo;
- regras pedagógicas;
- BNCC;
- acessibilidade;
- direitos de exportação/portabilidade/exclusão;
- fluxo de assinatura legítimo.

Dados pedagógicos e de alunos não podem ser enviados a analytics.

## Growth/billing

Seguir os documentos Growth V2 quando disponíveis.

Baseline atual:

- hard paywall após ativação guiada;
- mensal e anual visíveis;
- preço/trial vindos da store/RevenueCat, nunca hardcoded na UI;
- sem weekly/lifetime no lançamento sem decisão explícita;
- compra só conclui visualmente após entitlement real;
- restore/cancelamento/gerenciamento acessíveis;
- expiração nunca autoriza apagar dados.

## Acessibilidade

Obrigatório:

- touch target >= 48px;
- contraste adequado;
- foco perceptível;
- texto escalável;
- estado não comunicado só por cor;
- safe areas;
- Reduced Motion;
- alternativa para gesto;
- labels acessíveis.

## Testes e evidência

Antes de marcar pronto, executar o que se aplicar:

```text
pnpm run check:v2-boundary
pnpm test
pnpm build
node scripts/android-sync.mjs
```

Para UI importante, evidência mínima:

- target;
- screenshot antes/depois;
- 360px;
- 390px;
- 430px;
- estados relevantes;
- loading/empty/error/offline quando aplicável;
- gravação de motion relevante;
- Reduced Motion;
- branch e commit;
- build/testes executados.

## Aprovação

O agente nunca aprova a própria tela.

Ao chegar em uma candidata real, escrever:

`READY FOR DESIGN REVIEW — <NOME DA TELA>`

Depois parar expansão visual e aguardar revisão.

## Git e release

- não trabalhar diretamente em `main`;
- não fazer merge automático;
- cada milestone relevante usa branch/PR;
- não alterar dados reais para facilitar teste;
- não adicionar CTA falso;
- não inventar backend, preço ou serviço;
- APK debug não é release de produção.

## Regra final

> **Preservar domínio, dados e contratos. Reconstruir a experiência.**

A V2 deve parecer um produto novo construído sobre uma base funcional madura — não uma maquiagem da aplicação antiga.
