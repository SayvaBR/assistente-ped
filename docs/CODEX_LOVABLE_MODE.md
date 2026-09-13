# Codex Lovable Mode — V2 Clean Room

> **Status:** regra operacional obrigatória para trabalho visual V2
> **Objetivo:** fazer o Codex trabalhar visual-first, com o mesmo princípio que torna builders como Lovable rápidos: alvo claro, primeira renderização cedo, comparação visual imediata e integração profunda somente depois que a composição estiver correta.

## 1. Decisão

O legado do Assistente Pedagógico deixa de ser autoridade visual.

A partir desta regra, o legado é tratado como **backend funcional local**: fonte de dados, regras de domínio, persistência, integrações e contratos. Layouts, componentes, CSS, shell, composição e padrões visuais antigos não devem ser preservados por inércia.

A V2 deve ser construída em **clean room** dentro da stack atual.

## 2. Stack

A stack permanece:

- React;
- TypeScript;
- Vite;
- Capacitor Android.

Não migrar para React Native, Flutter, SwiftUI ou outra stack apenas para obter uma mudança visual. A stack atual é suficiente para reproduzir os targets aprovados.

O ganho de velocidade virá da arquitetura e do fluxo de trabalho, não de uma migração total.

## 3. Diretório V2 isolado

Toda nova interface V2 deve nascer em `src/v2/`.

Estrutura esperada:

```text
src/v2/
  components/
  screens/
  styles/
  motion/
  hooks/
  adapters/
  assets/
```

### Permitido reutilizar do legado

- `src/domain/**`;
- `src/data/**`;
- repositories e serviços de persistência;
- adapters nativos/Capacitor;
- billing real;
- regras BNCC;
- modelos e validações;
- utilitários sem responsabilidade visual.

### Proibido como dependência visual da V2

- `src/screens/**`;
- `src/components/**` legados;
- `src/core/recovered.js` para composição/UI;
- classes CSS antigas;
- tokens visuais antigos;
- `Card`, `IconTile` ou abstrações equivalentes quando vierem da camada visual V1.

Se uma regra de negócio estiver presa a um componente legado, extrair a lógica para uma camada neutra e conectá-la à V2.

## 4. Git é obrigatório, não opcional

Antes de qualquer sessão de implementação:

```bash
git status
git branch --show-current
git fetch origin --prune
git log -1 --oneline
git log -1 --oneline origin/<branch-atual>
```

O agente deve confirmar que está trabalhando na branch correta e que conhece o estado remoto mais recente.

Se a branch local estiver atrás, sincronizar antes de implementar. Não trabalhar horas em estado local obsoleto.

Antes de encerrar a rodada:

```bash
git status
git diff --stat
git log -1 --oneline
```

O PR/issue deve informar branch e commit usados nas evidências.

## 5. Fluxo visual-first obrigatório

Para tela com screenshot/mockup aprovado:

```text
TARGET
  ↓
COMPOSIÇÃO V2 CLEAN ROOM
  ↓
PRIMEIRO RENDER 390px
  ↓
COMPARAÇÃO LADO A LADO
  ↓
CORRIGIR AS 5 MAIORES DIFERENÇAS
  ↓
RENDER 360 / 390 / 430
  ↓
CONECTAR DADOS REAIS
  ↓
ESTADOS / OFFLINE / ERROS
  ↓
MOTION / HAPTICS
  ↓
TESTES / ANDROID
  ↓
DESIGN REVIEW
```

### Proibido

Não executar primeiro uma maratona de:

- refatoração ampla;
- criação de abstrações para dezenas de telas;
- migração de todos os componentes;
- auditoria estética do legado inteiro;
- criação de Design System completo antes de existir uma tela convincente.

Primeiro provar uma tela. Generalizar somente o que a tela provar ser necessário.

## 6. Screenshot aprovado é target

Quando o usuário fornecer uma referência aprovada, ela é a autoridade positiva da composição.

Reproduzir com alta fidelidade:

- proporção;
- hierarquia;
- densidade;
- balanço de branco/azul;
- superfícies;
- radius;
- tipografia;
- escala de ícones;
- profundidade;
- posição relativa;
- sensação tátil;
- personalidade.

Não é permitido reinterpretar o target como:

- fintech;
- dashboard corporativo;
- minimalismo editorial;
- Material default;
- Tailwind starter;
- grid SaaS.

A referência ganha de um padrão genérico da biblioteca.

## 7. Primeiro render antes de abstração

A primeira implementação pode ser específica da tela, desde que limpa e acessível.

Depois que o visual for aprovado:

1. identificar padrões realmente repetidos;
2. extrair primitives;
3. tokenizar;
4. conectar estados reais;
5. reutilizar nas próximas telas.

Não criar abstração especulativa.

## 8. Uma tela por vez

Enquanto a Home V2 não passar pelo Design Review, não fazer rollout visual em massa.

Sequência atual:

1. Home V2;
2. Frequência;
3. Registrar observação;
4. Compromissos;
5. Planejamento diário;
6. Planejamento mensal.

Cada tela validada alimenta o sistema de componentes da seguinte.

## 9. Regra de composição positiva

A linguagem deve ser:

> **Friendly Professional + Candy UI + Tactile + Educational + Motion-led**

Balanço visual:

> **fundo azul-claro + superfícies de trabalho majoritariamente brancas + azul vivo para foco/ação + navy para texto**

Anti-card não significa anti-surface.

Profissional não significa corporativo.

Playful não significa infantil.

## 10. Velocidade com qualidade

A prioridade de uma rodada visual é reduzir tempo até algo revisável.

Não gastar esforço com detalhes invisíveis antes de validar:

1. composição;
2. proporção;
3. hierarquia;
4. tipografia;
5. cor;
6. superfícies;
7. iconografia;
8. spacing;
9. microdetalhes.

Se composição estiver errada, refazer a composição. Não tentar salvá-la com CSS fino.

## 11. Legado após equivalência V2

Quando uma tela V2 for aprovada e funcionalmente equivalente:

- a tela V1 correspondente entra em estado `deprecated`;
- nenhuma nova feature visual deve ser adicionada à V1;
- correções críticas podem ser feitas enquanto a migração não terminou;
- remover V1 somente após confirmar navegação, persistência, testes e migração.

Não fazer big-bang destrutivo dos dados ou regras de negócio.

## 12. Segurança funcional continua obrigatória

Clean room visual NÃO autoriza quebrar:

- dados;
- storage;
- offline;
- billing;
- RevenueCat;
- LGPD;
- segurança;
- backup;
- exportação;
- acessibilidade;
- BNCC;
- regras pedagógicas.

A liberdade é sobre a camada de experiência e apresentação.

## 13. Definition of Ready para Design Review

Para tela importante:

- target identificado;
- screenshot 390px;
- screenshots 360px e 430px;
- comparação visual executada;
- dados reais conectados ou claramente delimitados como protótipo visual da rodada;
- estados essenciais implementados quando a fase já for de integração;
- build e testes relevantes;
- sem imports visuais proibidos do legado em `src/v2`;
- branch/commit informados.

Finalizar com:

`READY FOR DESIGN REVIEW — <TELA>`

Nunca declarar aprovação por conta própria.

## 14. Princípio final

A V2 não deve parecer uma versão mais bonita da aplicação antiga.

Ela deve parecer um produto novo construído com a maturidade funcional que já existe por baixo.

> **Preservar os motores. Construir uma carroceria nova.**
