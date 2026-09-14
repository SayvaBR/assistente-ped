# Production Speed Protocol — Assistente Pedagógico

## Objetivo

Maximizar velocidade de produção **sem reduzir qualidade**. A regra central passa a ser:

> **rápido no loop, rigoroso no checkpoint.**

Não executar validação de release a cada ajuste visual. Não esperar uma tela inteira terminar para descobrir que a composição estava errada. Não serializar trabalho que pode ocorrer em paralelo.

## 1. Três níveis de validação

### LOOP — segundos/minutos

Usado durante implementação e refinamento visual.

- manter Vite/HMR rodando;
- alterar somente o necessário;
- `pnpm run check:fast`;
- teste unitário diretamente relacionado quando aplicável;
- render principal em 390 px para UI.

Não rodar Android, suíte E2E completa ou documentação extensa a cada microajuste.

### CANDIDATE — quando algo já está visual/funcionalmente convincente

- `pnpm run check:candidate`;
- screenshot 360/390/430 para UI importante;
- estados essenciais;
- comparação com target;
- teste E2E diretamente relacionado quando existir.

### PR/RELEASE — uma vez por entrega

- suíte completa necessária;
- build de produção;
- E2E relevante/completo conforme risco;
- Android sync/build quando houver impacto nativo ou antes do merge/release;
- evidência final no PR.

## 2. Meta de tempo para UI

Para uma tela com target visual claro:

1. primeiro render em 390 px o mais cedo possível;
2. corrigir composição/hierarquia antes de microdetalhes;
3. só depois conectar todos os estados e contratos;
4. 360/430 somente quando a direção em 390 estiver candidata.

Se a composição estiver errada, reescrever cedo. Não gastar 40 minutos polindo CSS de uma estrutura ruim.

## 3. Paralelismo por worktrees/agentes

Usar agentes/worktrees independentes para trabalhos que não editam os mesmos arquivos centrais.

### Trilhas que podem rodar em paralelo

- **UI Compose:** tela/fluxo visual alvo;
- **Integration:** adapters, domínio e dados reais;
- **QA:** testes, regressões, screenshots, acessibilidade;
- **Research/Assets:** referências, assets, microcopy, documentação externa;
- **Native:** Capacitor/Android quando não conflitar com a tela em construção.

### Regra anti-conflito

Apenas uma trilha por vez é dona de:

- tokens globais;
- navegação/root shell;
- `package.json`;
- arquivos de configuração compartilhados;
- primitives V2 centrais.

As demais trilhas trabalham em arquivos independentes e integram depois.

## 4. UI: isolamento rápido

A V2 continua em `src/v2/`, mas o objetivo é permitir trabalho de clean room sem carregar a arquitetura visual legada.

Durante a primeira composição:

- pode usar conteúdo mockado localmente na própria tela;
- não criar Design System especulativo;
- não extrair componente antes de ele provar repetição;
- não conectar toda persistência antes de validar hierarquia/composição;
- não reescrever backend que já funciona.

Depois da aprovação visual, conectar dados e extrair primitives comprovadas.

## 5. HMR como ferramenta principal

O servidor Vite deve permanecer rodando durante uma rodada visual. Reiniciar somente quando configuração/dependência exigir.

Objetivo: alteração -> HMR -> inspeção -> nova alteração em segundos.

## 6. Evidência enxuta

Durante o loop, não produzir relatório longo.

Na candidata, registrar apenas:

- target;
- screenshot principal;
- diferenças conhecidas;
- testes relevantes.

No PR, consolidar a evidência final uma única vez.

## 7. Documentação por exceção

Não obrigar o agente a reler todos os documentos do projeto em cada tarefa.

Leitura padrão:

1. `docs/WORKING_CONTEXT.md`;
2. issue atual;
3. screen spec/target da tarefa;
4. documento especializado somente se a tarefa tocar aquele domínio.

Exemplos:

- billing -> docs de billing;
- LGPD -> docs de privacidade;
- Android nativo -> docs Android;
- UI -> Design Authority + screen spec.

## 8. Git sem burocracia excessiva

- worktree/branch por tarefa relevante;
- commits pequenos e claros;
- não criar PR para cada microajuste visual;
- um PR pode conter várias iterações da **mesma entrega**;
- evitar PR gigantes misturando baseline + redesign + feature + infra;
- depois que o baseline estiver aceito, todas as próximas PRs devem ser pequenas/revisáveis.

## 9. Fast path x deep path

### Fast path

Usar para:

- spacing;
- copy;
- iconografia;
- composição;
- CSS;
- estados visuais locais;
- refinamentos sem alteração de contrato.

### Deep path

Usar para:

- migração de dados;
- billing;
- backup/restore;
- exclusão/exportação de dados;
- permissões Android;
- criptografia;
- BNCC/regras pedagógicas;
- mudanças de schema;
- segurança/LGPD.

Fast path nunca relaxa integridade de dados ou segurança. Ele apenas evita validação pesada em alterações de baixo risco.

## 10. Definition of Done por risco

A profundidade da validação deve ser proporcional ao risco.

- mudança puramente visual: visual + typecheck + build candidato + E2E relacionado;
- mudança funcional local: unit + E2E relacionado + build;
- mudança nativa/dados/billing: suíte completa + Android + evidência detalhada.

## 11. Regras removidas

A partir deste protocolo deixam de ser obrigatórias:

- rodar Android a cada rodada visual;
- rodar a suíte E2E completa a cada ajuste;
- produzir 360/390/430 antes de a composição 390 estar boa;
- impedir todo trabalho paralelo enquanto uma única tela aguarda revisão;
- reler todos os documentos do projeto em toda sessão;
- esperar um Design System completo antes de produzir telas.

## 12. Regra final

> **Feedback rápido primeiro. Validação profunda no momento certo. Paralelismo sempre que não houver conflito.**
