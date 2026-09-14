# Codex Goal System — Assistente Pedagógico

## Objetivo

O Android 1.0 é uma missão contínua. O erro não é deixar o Codex trabalhar por horas; o erro é fazer **um único contexto, branch e PR** tentarem carregar o aplicativo inteiro.

A regra passa a ser:

> **North Star longa, orquestrador contínuo, workers descartáveis, Delivery Units pequenas.**

A continuidade deve vir do Git, da execution board e do orquestrador — não de uma única conversa ficando cada vez maior.

---

## 1. North Star permanente

> **Um professor conseguiria confiar neste aplicativo amanhã durante uma aula real?**

Estado final:

`ANDROID 1.0 PRODUCT COMPLETION CANDIDATE`

O orquestrador pode perseguir esta meta por muitas horas. Nenhum worker individual recebe o Android 1.0 inteiro como seu escopo.

---

## 2. Dois níveis de agente

### Orquestrador contínuo

É o chat principal/Tech Lead.

Pode permanecer ativo por horas e deve:

- ler a board e o estado real do GitHub;
- priorizar P0/P1 desbloqueado;
- criar workers/subagentes/worktrees frescos;
- acompanhar PRs, CI e reviewers;
- integrar unidades seguras em `integration/android-1.0` conforme política de risco;
- atualizar a board;
- seguir para a próxima unidade independente.

Ele **não implementa o produto inteiro no mesmo branch/PR**.

### Worker de Delivery Unit

É um contexto temporário com uma única missão.

Ele:

- nasce de `integration/android-1.0` atualizada;
- trabalha em branch/worktree próprio;
- entrega um único resultado revisável;
- abre PR para `integration/android-1.0`;
- produz evidências/testes;
- para de expandir escopo em `READY FOR REVIEW`;
- pode ser descartado depois da integração/checkpoint.

Isso preserva contexto fresco sem interromper a missão geral.

---

## 3. Delivery Unit

Uma Delivery Unit é pequena o bastante para ser revisável e grande o bastante para gerar valor real.

Exemplos:

- uma tela/fluxo V2 real;
- uma integração entre tela e dados;
- hardening funcional de uma superfície;
- um bug P0/P1;
- uma etapa de billing/restore;
- uma melhoria de storage/backup;
- uma rodada de QA/DevEx.

Cada unidade deve ter:

- objetivo claro;
- ownership previsível;
- critérios de aceite;
- evidência/testes proporcionais ao risco;
- branch própria;
- PR próprio para `integration/android-1.0`.

Não usar a mesma branch para começar uma área não relacionada só porque ainda há tempo de execução disponível.

---

## 4. Loop contínuo do Android 1.0

Enquanto houver trabalho seguro e útil:

`BOARD/GITHUB -> ESCOLHER UNIT -> WORKER NOVO -> IMPLEMENTAR -> RENDER/TESTAR -> PR -> REVIEWERS -> CORRIGIR -> GATE -> INTEGRAR NA INTEGRATION QUANDO SEGURO -> ATUALIZAR BOARD -> PRÓXIMA UNIT`

O marco `READY FOR REVIEW` pertence à **Delivery Unit**, não à missão inteira.

O orquestrador não deve encerrar a missão porque um worker chegou a esse ponto.

Se o PR atual estiver aguardando CI/review e a próxima unidade for independente, o orquestrador pode iniciar outro worker sem misturar branches/arquivos.

---

## 5. Autoridade obrigatória para UI

Quando uma Delivery Unit tocar UI/UX, o worker deve ler antes de editar:

- `AGENTS.md`;
- `docs/WORKING_CONTEXT.md`;
- `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
- `docs/DESIGN_AUTHORITY.md`;
- spec específica da tela/fluxo quando existir;
- skills relevantes em `.agents/skills/`.

As regras visuais não são opcionais em nome de velocidade.

---

## 6. Cadência visual obrigatória

Para UI:

`HIPÓTESE -> IMPLEMENTAÇÃO -> APP REAL -> SCREENSHOT -> OBSERVAÇÃO -> CORREÇÃO -> NOVA SCREENSHOT`

Durante uma rodada visual significativa, gerar screenshot fresca do app realmente executando aproximadamente a cada 5–10 minutos quando isso for prático.

Não vale apenas versionar um PNG no final sem olhar o resultado durante a construção.

Após feedback visual:

1. registrar 3–5 diferenças/problemas perceptivos de maior impacto;
2. corrigir pelo menos o principal;
3. gerar nova screenshot após a correção.

Uma UI não pode chegar a `READY FOR REVIEW` apenas porque funciona.

Rejeitar entrega visual:

- genérica;
- inconsistente;
- inacessível;
- claramente abaixo da Home V2/North Star;
- parecendo dashboard SaaS/fintech/Material default/template de IA;
- com card para tudo;
- com mascote/coruja;
- com CTA falso ou jornada cenográfica.

Identidade:

Friendly Professional + Candy UI + Tactile + Educational + Motion-led.

---

## 7. Responsividade sem travar produção

Durante composição, usar o viewport Android principal atual (412 CSS px), salvo target específico em outra largura para comparação.

O layout deve nascer fluido/adaptativo.

Não fazer benchmark manual de todas as resoluções a cada microajuste.

Responsividade ampla entra em checkpoint/hardening automatizado.

A regra é:

- microiteração: render principal + screenshot;
- candidata: compacto + principal + largo quando necessário;
- gate de produção: matriz automatizada completa.

Texto essencial não pode ser truncado ou reduzido até ficar ilegível para caber.

---

## 8. Profundidade de validação proporcional ao risco

Velocidade não significa rodar Android/full E2E a cada mudança de CSS.

Use:

- checks rápidos durante iteração;
- testes direcionados durante a unidade;
- candidate checks no checkpoint;
- Android/QA profundo em mudanças nativas, marcos importantes, integração e release.

Nunca relaxar:

- integridade de dados;
- LGPD/privacidade;
- segurança;
- billing/entitlement;
- backup/restore;
- BNCC/regras pedagógicas;
- offline essencial;
- acessibilidade;
- ausência de dead ends;
- nenhum CTA falso;
- nenhuma jornada principal retornando silenciosamente para UI V1.

---

## 9. Reviewers independentes

O autor da unidade não deve ser o único juiz da própria entrega.

Usar reviewers independentes conforme o tipo de trabalho:

- UI: `visual_director` e/ou `qa_reviewer`;
- código/dados: reviewer independente;
- domínio sensível: reviewer especializado.

O reviewer deve apontar problemas concretos. O worker corrige no mesmo PR e atualiza evidência.

A prática recomendada é iterar reviewer -> correção -> reviewer até não haver finding bloqueante relevante.

---

## 10. Política de integração automática

### Baixo risco

Pode ser integrado automaticamente em `integration/android-1.0` pelo orquestrador quando:

- PR mergeable;
- CI verde no SHA exato;
- testes relevantes verdes;
- reviewer independente sem finding bloqueante;
- evidência visual completa se aplicável.

Exemplos: correção visual isolada, copy, espaçamento, DevEx, testes, bug não destrutivo com regressão coberta.

### Médio risco

Pode integrar na integration apenas depois de revisão independente mais forte e teste de jornada.

Exemplos: feature normal, navegação entre fluxos reais, persistência local sem migração, offline/recovery.

### Alto risco

Não fazer auto-integração. Exige checkpoint humano antes de merge.

Inclui:

- billing/purchase/trial/entitlement/restore;
- migração de schema/storage;
- backup/restore que pode sobrescrever dados;
- auth/exclusão de conta;
- LGPD/privacidade/segurança;
- permissões, secrets, keystore, signing;
- operação destrutiva;
- mudança de semântica BNCC/pedagógica;
- merge/release para `main` / Play Store.

Enquanto uma unidade de alto risco espera humano, continuar outras Delivery Units independentes seguras.

---

## 11. Git

Base operacional:

`integration/android-1.0`

- feature/fix nasce da integration;
- PR retorna para integration;
- feature não entra diretamente em main;
- feature não é desenvolvida diretamente na integration;
- PR #10 é o trem de consolidação para `main`;
- PRs #2/#4/#7/#8 são históricos.

PRs pequenos são parte da qualidade, não burocracia.

---

## 12. Paralelismo

Padrão:

- 1 orquestrador contínuo;
- até 2 lanes de escrita simultâneas com ownership disjunto;
- reviewers/mappers read-only adicionais quando útil.

Não permitir dois writers editando ao mesmo tempo router, tokens globais, primitives, package/build config, storage/billing contracts ou app shell sem ownership explícito.

---

## 13. Stop conditions do worker

Um worker para de expandir escopo quando:

- sua Delivery Unit chegou a `READY FOR REVIEW`;
- blocker específico exige decisão externa;
- o escopo começou a escapar da unidade;
- o trabalho deve ser entregue a outro especialista.

Isso não encerra o orquestrador.

---

## 14. Stop conditions do orquestrador

A missão contínua só deve parar quando:

1. `ANDROID 1.0 PRODUCT COMPLETION CANDIDATE` foi objetivamente atingido; ou
2. todo trabalho restante está bloqueado por decisão humana/externa/alto risco e não existe nenhuma unidade segura independente para continuar; ou
3. ocorreu incidente sério de segurança/integridade de dados; ou
4. Git/CI/repositório ficou inconsistente e precisa ser reconciliado antes de continuar; ou
5. ambiente/rate limit impede execução.

Não parar apenas porque uma Delivery Unit chegou a `READY FOR REVIEW`.

---

## 15. Regra de contexto

O orquestrador pode ser longo; os workers não devem ser.

Quando um worker acumular decisões demais, fechar/checkpoint e criar worker novo.

A execução ideal é:

> **contexto longo para direção, contextos curtos para implementação.**

Se o próprio orquestrador começar a citar instruções obsoletas, replanejar tudo do zero ou perder o estado real do GitHub, fazer checkpoint do orquestrador e iniciar outro a partir desta documentação + board.

---

## 16. Resultado desejado

O Codex pode trabalhar a noite inteira sem transformar o projeto em um PR de 500 arquivos.

Cada resultado continua pequeno, testado, visualmente revisado e rastreável, enquanto a missão geral continua avançando.

Frase operacional:

> **Continue a missão Android 1.0 sem parar em READY FOR REVIEW: encerre apenas o worker atual, revise/integrar a unidade conforme risco e inicie uma nova Delivery Unit independente até a North Star ou um blocker real.**
