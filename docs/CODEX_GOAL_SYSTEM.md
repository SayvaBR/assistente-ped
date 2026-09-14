# Codex Goal System — Assistente Pedagógico

## Por que este sistema existe

O Codex não deve trabalhar sem objetivo, mas também não deve receber como objetivo operacional de uma única sessão algo tão amplo quanto `ANDROID 1.0 PRODUCT COMPLETION CANDIDATE`.

Uma meta infinita mantém o agente ocupado, porém depois de muitas horas tende a acumular contexto obsoleto, ampliar escopo silenciosamente, misturar mudanças independentes, produzir PRs gigantes e reduzir a qualidade das decisões visuais e técnicas.

A solução é separar **direção permanente** de **execução limitada**.

---

## 1. North Star permanente

Esta meta nunca muda durante o ciclo Android 1.0:

> **Um professor conseguiria confiar neste aplicativo amanhã durante uma aula real?**

Se a resposta for não, o produto ainda tem trabalho a fazer.

Isso é uma bússola de produto, não a tarefa de uma única sessão.

`ANDROID 1.0 PRODUCT COMPLETION CANDIDATE` continua sendo o estado final do produto, mas nunca deve ser usado como escopo ilimitado de um único chat/agente.

---

## 2. Milestone atual

A cada início de sessão, o orquestrador deve identificar o milestone P0/P1 mais prioritário e desbloqueado a partir de:

1. `docs/ANDROID_1_0_EXECUTION_BOARD.md`;
2. issues abertas;
3. PRs ativos que apontam para `integration/android-1.0`;
4. blockers reais já registrados.

Não replanejar o produto inteiro se a board já contém uma próxima ação válida.

---

## 3. Delivery Unit da sessão

Cada sessão principal deve possuir **uma única Delivery Unit**.

Uma Delivery Unit é pequena o bastante para ser revisável e grande o bastante para entregar valor real. Exemplos:

- uma tela/fluxo real V2;
- uma integração funcional entre duas superfícies;
- hardening de uma área já implementada;
- correção de um blocker P0;
- uma etapa de billing/restore;
- uma migração de storage;
- uma rodada de Android QA;
- uma melhoria de DevEx que reduz tempo de produção.

Uma Delivery Unit deve ter:

- objetivo explícito;
- arquivos/área de ownership previsíveis;
- critérios de aceite objetivos;
- testes/evidências proporcionais ao risco;
- branch própria;
- PR próprio para `integration/android-1.0`.

---

## 4. Regra de escopo

O orquestrador pode manter a visão do Android 1.0 inteiro, mas **não deve implementar várias áreas grandes dentro do mesmo PR/sessão apenas porque ainda há tempo disponível**.

Regra prática:

`NORTH STAR -> MILESTONE -> DELIVERY UNIT -> PR -> REVIEW -> MERGE NA INTEGRATION -> PRÓXIMA DELIVERY UNIT`

Quando uma Delivery Unit chegar a `READY FOR REVIEW`, a implementação daquela unidade deve parar, salvo:

- CI quebrado pela própria mudança;
- bug objetivo detectado pelo reviewer/QA;
- correção pequena necessária para completar os critérios já definidos.

Não aproveitar o mesmo PR para iniciar uma tela não relacionada.

---

## 5. Continuidade sem sessão infinita

A continuidade do projeto deve vir da documentação e do Git, não da memória de um chat de 10+ horas.

Ao concluir uma Delivery Unit:

1. commit pequeno e claro;
2. push;
3. abrir/atualizar PR para `integration/android-1.0`;
4. anexar evidências;
5. atualizar `docs/ANDROID_1_0_EXECUTION_BOARD.md`;
6. registrar blockers reais;
7. produzir um checkpoint curto;
8. encerrar ou renovar a sessão antes da próxima unidade importante.

Se o chat estiver longo, tiver atravessado múltiplas grandes decisões ou começar a citar instruções antigas, iniciar um novo chat/agente e retomar pela board e pelo PR atual.

---

## 6. Paralelismo controlado

Paralelizar apenas trabalho realmente independente.

Padrão recomendado:

- 1 orquestrador/Tech Lead;
- até 2 lanes com escrita em paralelo;
- reviewers/read-only adicionais podem trabalhar em paralelo sem limite rígido quando o custo fizer sentido.

Workers de escrita não devem editar simultaneamente os mesmos arquivos compartilhados.

Arquivos compartilhados — router, tokens globais, primitives, `package.json`, storage/billing contracts, app shell — têm um único owner por rodada.

---

## 7. Regra de Git

Base de desenvolvimento: `integration/android-1.0`.

- feature/fix nasce de `integration/android-1.0`;
- feature/fix abre PR de volta para `integration/android-1.0`;
- nenhuma feature nova diretamente em `main`;
- nenhuma feature nova diretamente na integration;
- PR #10 é o trem de integração da base consolidada para `main`;
- PRs #2, #4, #7 e #8 são históricos e não recebem trabalho novo.

---

## 8. Qualidade não negociável

Velocidade nunca autoriza relaxar:

- integridade de dados;
- LGPD/privacidade;
- segurança;
- billing/entitlement;
- backup/restore;
- BNCC e regras pedagógicas;
- offline essencial;
- acessibilidade;
- ausência de dead ends;
- nenhum CTA falso;
- nenhuma jornada principal retornando silenciosamente para UI V1.

Para UI, qualidade visual também é gate real: `funciona` não equivale a `está aprovado`.

---

## 9. Cadência visual

Durante construção visual:

`HIPÓTESE -> IMPLEMENTAÇÃO -> RENDER PRINCIPAL -> SCREENSHOT -> OBSERVAÇÃO -> CORREÇÃO -> NOVA SCREENSHOT`

Use o viewport principal definido na política Android atual para velocidade. Responsividade ampla é checkpoint automatizado/hardening, não ritual manual a cada ajuste.

A Home V2 é North Star visual, não um template para copiar mecanicamente.

---

## 10. Stop conditions

Uma sessão deve parar/renovar quando ocorrer qualquer um destes eventos:

- Delivery Unit chegou a `READY FOR REVIEW`;
- PR foi aberto e evidências anexadas;
- blocker externo/irreversível real exige decisão humana;
- contexto do chat ficou claramente obsoleto ou contraditório;
- a próxima tarefa exige ownership totalmente diferente;
- a sessão começou a expandir escopo sem relação com a Delivery Unit.

Não usar `continue until Android 1.0 is complete` como stop condition.

---

## 11. Resultado desejado

O agente deve ser **ambicioso no produto e limitado na execução**.

Ele sempre tenta aproximar o app da North Star, mas faz isso através de pequenas entregas fortes, revisáveis e integráveis.

A frase operacional é:

> **Continue avançando o Android 1.0 por uma Delivery Unit de cada vez, sem sacrificar qualidade nem acumular contexto e escopo indefinidamente.**
