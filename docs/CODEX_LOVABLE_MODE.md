# Codex Lovable Mode — V2 Clean Room

> **Status:** regra operacional obrigatória para trabalho visual V2
> **Objetivo:** fazer o Codex trabalhar visual-first: alvo claro, primeira renderização cedo, comparação imediata e integração profunda somente depois que a composição estiver correta.

## 1. Decisão

O legado do Assistente Pedagógico deixa de ser autoridade visual. Ele é tratado como **backend funcional local**: dados, regras de domínio, persistência, integrações e contratos.

A V2 é construída em clean room dentro da stack atual.

## 2. Stack

- React;
- TypeScript;
- Vite;
- Capacitor Android.

Não migrar apenas para obter mudança visual. O diferencial que queremos reproduzir de builders visual-first é o ciclo de design/preview, não copiar backend ou framework.

## 3. Diretório V2 isolado

Toda nova interface V2 nasce em `src/v2/`.

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

Pode reutilizar `src/domain/**`, `src/data/**`, repositories, persistência, adapters nativos/Capacitor, billing real, BNCC, modelos, validações e utilitários sem responsabilidade visual.

Não usar como dependência visual da V2 `src/screens/**`, `src/components/**` legados, `src/core/recovered.js` para UI, CSS/tokens V1, `Card`, `IconTile` e abstrações visuais equivalentes.

Se regra de negócio estiver presa a componente V1, extrair para camada neutra.

## 4. Git é obrigatório

Antes de implementar:

```bash
git status
git branch --show-current
git fetch origin --prune
git log -1 --oneline
git log -1 --oneline origin/<branch-atual>
```

Sincronizar se estiver atrás. Antes de encerrar, registrar `git status`, `git diff --stat`, branch e commit usados nas evidências.

## 5. O que significa “390 px”

390 px **não é a largura alvo do aplicativo**.

É apenas um **viewport-âncora de comparação** quando a referência aprovada foi produzida nessa largura. Ele acelera o loop de fidelidade porque target e implementação podem ser comparados na mesma geometria.

A UI real precisa se adaptar continuamente ao Android.

### Matriz de stress antes do Gate B

Validar pelo menos:

- 320 px;
- 360 px;
- 384/390 px;
- 411/412 px;
- 432 px;
- 480 px;
- 600+ px quando houver suporte relevante a tablet/foldable.

Não construir sete versões. Construir **uma composição fluida** e usar esses pontos para encontrar falhas.

### Copy sem cortes

Conteúdo essencial deve sobreviver a telas estreitas e texto ampliado:

- sem `ellipsis`/`line-clamp` para título, CTA, label ou mensagem essencial;
- sem altura rígida em containers de copy;
- permitir wrap natural;
- adaptar disposição de ações quando faltar espaço;
- não usar fonte minúscula para fazer texto caber;
- truncar apenas metadata secundária quando houver acesso à informação completa;
- testar crescimento de texto em 100%, 115%, 130% e 150% nas superfícies críticas.

## 6. Fluxo Visual Builder obrigatório

```text
TARGET / NORTH STAR
  ↓
HIPÓTESE VISUAL
  ↓
EXPERIMENTO MÍNIMO
  ↓
RENDER NO VIEWPORT-ÂNCORA
  ↓
SCREENSHOT
  ↓
OBSERVAÇÃO / COMPARAÇÃO
  ↓
CORRIGIR A MAIOR DIFERENÇA
  ↓
REPETIR ATÉ CONVERGIR
  ↓
VALIDAR MATRIZ ANDROID
  ↓
CONECTAR DADOS REAIS
  ↓
ESTADOS / OFFLINE / ERROS
  ↓
MOTION / HAPTICS
  ↓
TESTES / ANDROID REAL
```

Durante iteração rápida não é necessário recapturar toda a matriz a cada ajuste. Use o viewport-âncora para velocidade; rode a matriz após mudanças estruturais e antes do gate de produção.

Não iniciar com maratona de refatoração ampla, abstrações para dezenas de telas, migração global ou Design System especulativo. Primeiro provar visualmente a superfície.

## 7. Screenshot aprovado é target

Reproduzir com alta fidelidade proporção, hierarquia, densidade, balanço de cor, superfícies, radius, tipografia, escala de ícones, profundidade, posição relativa, sensação tátil e personalidade.

Não reinterpretar como fintech, dashboard corporativo, minimalismo editorial, Material default, starter Tailwind ou grid SaaS.

A referência define a linguagem; responsividade preserva essa linguagem em outros tamanhos, não congela pixels.

## 8. Primeiro render antes de abstração

A primeira implementação pode ser específica da tela, desde que limpa e acessível. Depois de validada, extrair apenas primitives realmente provadas pelo uso.

## 9. Home aprovada como North Star; migrar o primeiro anel

A Home V2 está aprovada como **direção visual** e pode alimentar a próxima etapa sem esperar todo o hardening final da Home.

O próximo objetivo não é “fazer mais telas aleatórias”. É eliminar a quebra visual nos destinos diretos da Home.

Ordem:

1. Frequência / Fazer chamada;
2. Registrar observação;
3. Compromissos / Agenda;
4. Planejamento — Dia, Semana e Mês;
5. Turmas;
6. Perfil do professor;
7. Arquivos;
8. Mais.

Uma tela por vez dentro desta fila. Assim que uma tela atingir o Gate A de direção visual, iniciar a próxima enquanto o hardening da anterior continua.

Para cada item, testar **o caminho real partindo da Home** e comparar a tela de destino com a Home lado a lado. O professor não deve sentir que saiu de um produto e entrou em outro.

Seguir `docs/V2_HOME_FLOW_VISUAL_RING.md`.

## 10. Linguagem positiva

> **Friendly Professional + Candy UI + Tactile + Educational + Motion-led**

Balanço: fundo azul-claro, superfícies de trabalho majoritariamente brancas, azul vivo para foco/ação e navy para texto.

Anti-card não significa anti-surface. Profissional não significa corporativo. Playful não significa infantil.

## 11. Velocidade com qualidade

Ordem de correção visual:

1. composição;
2. proporção;
3. hierarquia;
4. tipografia;
5. cor;
6. superfícies;
7. iconografia;
8. spacing;
9. microdetalhes.

Se a composição estiver errada, refazer. Não salvar arquitetura ruim com CSS fino.

## 12. Legado após equivalência V2

Quando tela V2 for aprovada e funcionalmente equivalente, a V1 correspondente entra em `deprecated`. Remover apenas após navegação, persistência, testes e migração estarem confirmados.

## 13. Segurança funcional

Clean room visual não autoriza quebrar dados, storage, offline, billing/RevenueCat, LGPD, segurança, backup, exportação, acessibilidade, BNCC ou regras pedagógicas.

## 14. Ferramentas de feedback

Preferir ciclos automatizados de browser/render. O projeto já usa Playwright e deve evoluir para:

- captura rápida do viewport-âncora;
- matriz de viewports Android;
- detecção de overflow horizontal;
- detecção de truncamento indevido em copy essencial;
- screenshots de estados;
- comparação visual antes/depois;
- abertura do destino real a partir da Home para auditoria de continuidade.

Ferramentas externas/skills podem complementar esse loop, mas não substituem `DESIGN_AUTHORITY`, os targets aprovados e os contratos do produto.

## 15. Dois gates

### Gate A — Visual Direction Approved

Exige:

- target específico ou North Star identificado;
- screenshot real;
- composição convincente;
- DNA V2 correto;
- fluxo principal compreensível;
- ausência de regressão evidente para estética V1/genérica;
- aprovação externa de produto/design.

Ao atingir:

`VISUAL DIRECTION APPROVED — <TELA>`

Isso libera a próxima tela da fila.

### Gate B — Production / Merge Ready

Exige:

- repositories/dados reais;
- estados essenciais;
- offline quando aplicável;
- acessibilidade;
- touch targets;
- texto ampliado;
- matriz Android;
- motion + Reduced Motion quando aplicável;
- build/testes/CI;
- Android QA;
- fronteira V2 íntegra.

Ao atingir:

`PRODUCTION GATE READY — <TELA>`

Isso é pré-condição para merge, não para começar a próxima prova visual.

## 16. Princípio final

A V2 não deve parecer uma versão mais bonita da aplicação antiga. Ela deve parecer um produto novo construído com a maturidade funcional existente por baixo.

> **Preservar os motores. Construir uma carroceria nova — adaptativa em qualquer Android e coerente de ponta a ponta.**
