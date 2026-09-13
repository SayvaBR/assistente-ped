# AGENTS.md — Assistente Pedagógico

Este arquivo contém regras obrigatórias para qualquer agente de código que trabalhe neste repositório, incluindo Codex/Astra.

## Missão do produto

Levar o Assistente Pedagógico até uma versão Android 1.0 funcional, estável, segura, publicável e com identidade própria forte.

O aplicativo atual pode e deve ser profundamente reformulado quando isso melhorar clareza, personalidade, coerência e experiência de uso. A aparência existente não é uma restrição nem uma referência obrigatória.

## O que é imutável

- segurança;
- privacidade e LGPD;
- integridade de dados;
- proteção de dados de alunos e dados pedagógicos;
- funcionamento offline do núcleo do app;
- requisitos pedagógicos essenciais;
- acessibilidade;
- compatibilidade/migração de dados existentes quando aplicável;
- stack atual, salvo decisão explícita de produto.

## O que pode mudar radicalmente

Agentes têm liberdade para reconstruir:

- identidade visual;
- navegação;
- arquitetura de informação;
- composição das telas;
- componentes;
- hierarquia visual;
- tipografia;
- iconografia;
- espaçamento;
- densidade;
- microinterações;
- transições;
- gestos;
- haptics;
- ilustrações;
- fluxos de UX, quando houver justificativa clara e não houver perda funcional.

Não preservar componente, layout, padrão visual ou fluxo apenas porque já existe.

## Princípio de qualidade

“Funciona” não é critério suficiente para aprovação.

Uma implementação pode estar tecnicamente correta e ainda ser rejeitada se parecer genérica, inconsistente, sem personalidade, pouco legível, inacessível ou visualmente inferior ao padrão definido para o produto.

O objetivo é construir uma linguagem reconhecível como Assistente Pedagógico, e não uma coleção de telas React genéricas.

O mesmo vale para motion: “tem animação” não é critério de qualidade. Movimento pode ser rejeitado se for gratuito, lento, inconsistente, inacessível, pouco performático ou não explicar causalidade/estado.

## Stack obrigatória

- React
- TypeScript
- Vite
- Capacitor Android

Não migrar para Flutter, React Native, SwiftUI ou Kotlin sem uma decisão explícita de produto.

A sensação de motion nativo/polido deve ser obtida dentro da stack atual. SwiftUI é referência de princípios, não dependência/plataforma do produto Android.

## Regras de execução

1. Nunca trabalhar diretamente em `main` depois que a base do app estiver importada.
2. Cada milestone deve usar branch própria e PR próprio.
3. Nenhuma feature está concluída apenas porque a tela existe.
4. Uma feature só está pronta quando fluxo, persistência, validação, erro e testes essenciais funcionam.
5. Funcionalidade legada pode ser redesenhada, reorganizada ou substituída, desde que o valor funcional seja preservado ou a remoção seja explicitamente justificada.
6. Não quebrar dados existentes. Toda mudança de storage/schema deve ter migração.
7. Dados pedagógicos e dados de alunos não podem ser enviados a analytics.
8. Analytics deve ser opcional e limitado a métricas técnicas/uso permitidas.
9. Não adicionar SDK externo sem documentar finalidade, dados tratados e impacto em privacidade.
10. Não adicionar botão, CTA, menu ou opção sem comportamento real.
11. Corrigir bugs P0 antes de iniciar refinamentos P1/P2 que não sejam necessários para destravar o trabalho.
12. Testar recursos nativos em Android real quando aplicável.
13. Manter o Design System e o Motion System consistentes em todas as telas.
14. Recursos específicos da Educação Infantil não devem aparecer indevidamente em Fundamental ou Médio.
15. O núcleo do aplicativo deve continuar utilizável sem internet.
16. Para qualquer trabalho visual, ler `docs/DESIGN_SUPERVISION_WORKFLOW.md`, `docs/VISUAL_IDENTITY_V2.md` e `docs/design-v2/README.md`.
17. Antes de implementar ou redesenhar uma tela, localizar a tela em `docs/design-v2/SCREEN_SPEC_INDEX.md`, ler o volume `SCREEN_SPEC_*` correspondente e consultar `docs/design-v2/RUNTIME_RESOURCE_MAP.md`.
18. Não implementar UI importante apenas a partir de mockup/imagem. A especificação de tela define layout, comportamento, dados, estados, recursos, acessibilidade e critérios de aceite.
19. Se a implementação real exigir divergir da especificação, registrar a divergência e justificativa no PR; não reinterpretar silenciosamente.
20. Para qualquer animação, transição, shared geometry, gesto, reorder, icon motion ou haptic, ler `docs/design-v2/MOTION_SYSTEM_V2.md`.
21. Quando a interação se encaixar nas assinaturas do produto, ler `docs/design-v2/MOTION_SIGNATURE_INTERACTIONS.md` e não reinventar outra gramática.
22. Antes de copiar/adaptar uma referência externa, consultar `docs/design-v2/MOTION_REFERENCE_MATRIX.md`; materiais marcados como corte/backlog não entram em P0/P1 sem decisão explícita.
23. Todo PR relevante de motion deve cumprir `docs/design-v2/MOTION_QA_CHECKLIST.md`.
24. Não adicionar dependência visual/motion sem verificar licença, bundle, compatibilidade, manutenção e ausência de telemetria indevida.
25. Motion nunca pode antecipar sucesso: save, billing, backup, sincronização e exclusão só entram em estado visual final após confirmação real.
26. Gestos não podem ser a única forma de executar ação importante; fornecer alternativa acessível.
27. `prefers-reduced-motion` deve ser respeitado em toda interação espacial significativa.

## Fluxo esperado para cada tarefa

1. Ler a issue e os documentos relevantes.
2. Para UI, localizar a especificação exata da tela antes de codificar.
3. Para motion, localizar token/receita oficial antes de criar easing/spring próprio.
4. Criar branch `codex/<numero-issue>-<slug>` ou equivalente.
5. Identificar quais componentes V2, repositories, domain modules e plugins nativos serão reutilizados.
6. Implementar em mudanças pequenas e rastreáveis.
7. Rodar build, lint e testes disponíveis.
8. Atualizar documentação afetada.
9. Abrir PR contra `main` com resumo, testes executados, riscos, screenshots e gravações quando houver motion.
10. Não fazer merge por conta própria salvo instrução explícita.

## Severidade

### P0 — bloqueia release

- perda/corrupção de dados;
- app não abre ou fica preso no splash;
- crash recorrente;
- compra cobra e não desbloqueia;
- backup/restauração destrói dados;
- dados de aluno enviados indevidamente;
- cálculo acadêmico crítico incorreto;
- fluxo essencial sem saída;
- regressão visual/UX que impeça uso de fluxo essencial;
- animação/transição que bloqueie fluxo essencial ou cause estado incorreto/destrutivo.

### P1 — alta prioridade

- regressão importante de UX;
- lentidão grave;
- layout quebrado;
- inconsistência visual sistêmica;
- tela funcional porém genérica em área principal do produto;
- permissão tratada incorretamente;
- erro funcional sem perda de dados;
- jank perceptível em interação principal;
- motion sem Reduced Motion em interação espacial relevante;
- gesto importante sem alternativa acessível.

### P2 — refinamento

- polish visual localizado;
- microanimações secundárias;
- microcopy;
- espaçamento isolado;

## Evidência obrigatória no PR

- o que mudou;
- especificação `SCREEN_SPEC_*` usada;
- componentes V2 utilizados/criados;
- repositories/domain/plugins utilizados;
- arquivos/módulos principais;
- comandos/testes executados;
- resultado do build;
- screenshots antes/depois para UI;
- estados relevantes (loading, empty, error, disabled, offline quando aplicável);
- bugs conhecidos;
- riscos de migração/persistência;
- impacto em LGPD/analytics/billing quando aplicável.

Quando houver motion relevante, incluir também:

- gravação curta mostrando a interação real;
- token de spring/duração utilizado;
- comportamento Reduced Motion;
- haptic associado, se houver;
- ida/volta para shared transitions;
- observação de performance em Android real quando aplicável.

PR visual sem evidência visual suficiente não pode ser marcado como pronto. PR de motion sem gravação suficiente para revisar a interação também não pode ser marcado como pronto.

## Fonte de verdade

Os documentos de produto e release em `docs/` devem ser respeitados. Quando houver conflito, sinalizar no PR em vez de inventar uma decisão silenciosa.

A identidade visual atual do app não é fonte de verdade. A fonte de verdade visual passa a ser a especificação V2 aprovada e os componentes derivados dela.

Para motion, a fonte de verdade é `docs/design-v2/MOTION_SYSTEM_V2.md`, complementada pelas receitas e pelo QA do mesmo diretório. Referências externas são repertório; não substituem a linguagem própria do produto.
