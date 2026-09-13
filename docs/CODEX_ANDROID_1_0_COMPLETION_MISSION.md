# Codex Mission — Assistente Pedagógico Android 1.0

> **Status:** missão principal de execução do produto
> **Branch ativa:** `codex/5-v2-clean-room`
> **Produto:** Assistente Pedagógico
> **Meta:** sair de uma V2 visual em construção e chegar a um **Android 1.0 completo, funcional, confiável, bonito e utilizável por um professor no trabalho real**.

---

## 0. A missão em uma frase

> **Continue desenvolvendo até que um professor brasileiro consiga instalar o aplicativo, passar pelo onboarding, configurar sua rotina, assinar/restaurar acesso quando aplicável, criar e administrar turmas/alunos, planejar aulas com BNCC, fazer chamada, registrar observações, organizar compromissos, usar arquivos e relatórios, trabalhar offline, recuperar-se de erros e concluir toda a jornada sem cair em UI V1, tela falsa, fluxo morto ou ação sem persistência.**

Esta missão é maior que “terminar telas”.

A condição de sucesso é **produto utilizável de ponta a ponta**.

---

# 1. Modo de execução autônoma

O Codex deve operar como **engenheiro de produto + visual builder + QA**, em ciclos curtos e verificáveis.

Loop obrigatório para UI:

```text
HIPÓTESE
-> EXPERIMENTO MÍNIMO
-> APP/PREVIEW REAL
-> SCREENSHOT
-> OBSERVAÇÃO
-> CORREÇÃO
-> NOVA SCREENSHOT
-> INTEGRAÇÃO FUNCIONAL
-> ESTADOS
-> TESTES
-> CHECKPOINT GIT
-> PRÓXIMA SUPERFÍCIE
```

Loop obrigatório para funcionalidade:

```text
CASO DE USO REAL
-> CONTRATO / DADOS
-> IMPLEMENTAÇÃO
-> PERSISTÊNCIA
-> OFFLINE / ERRO
-> TESTE
-> EXECUÇÃO REAL
-> VERIFICAÇÃO DE RESULTADO
-> CHECKPOINT GIT
```

## Regra de continuidade

**Não parar depois de cada tela apenas para pedir autorização.**

O agente continua para a próxima unidade da fila quando:

- a tela atual já possui uma direção visual convincente;
- o fluxo principal está implementado ou existe plano explícito de integração na mesma rodada;
- não há regressão visual evidente para V1;
- não existe blocker P0 de dados, segurança, privacidade ou billing.

O agente **não pode declarar a própria tela externamente aprovada**. Quando atingir a qualidade suficiente para revisão, registrar:

`READY FOR DESIGN REVIEW — <TELA>`

Depois, salvo instrução explícita para aguardar, **continuar a próxima unidade da fila**. A revisão humana pode aprovar, rejeitar ou pedir correção posteriormente.

Se uma tela for explicitamente rejeitada, ela volta à fila com prioridade alta.

## Não confundir continuidade com merge

Continuar desenvolvendo não autoriza:

- merge automático;
- publicação automática em produção;
- alteração irreversível de dados reais;
- alteração de billing/store sem credenciais e validação;
- uso de dados reais de alunos em screenshots/fixtures.

---

# 2. Fonte de verdade e ordem de leitura

Antes de iniciar ou retomar uma sessão longa:

1. `AGENTS.md`;
2. este documento;
3. `docs/ANDROID_1_0_EXECUTION_BOARD.md`;
4. `docs/DESIGN_AUTHORITY.md`;
5. `docs/CODEX_LOVABLE_MODE.md`;
6. `docs/V2_HOME_FLOW_VISUAL_RING.md`;
7. `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md`;
8. `docs/ANDROID_REAL_DEVICE_QA.md`;
9. skills em `.agents/skills/`;
10. specs da tela/fluxo atual.

Decisão explícita mais recente do produto sempre vence documentação antiga.

---

# 3. Resultado final obrigatório

Android 1.0 só pode ser considerado funcionalmente completo quando um professor consegue realizar, de ponta a ponta, pelo menos estas jornadas:

## Jornada A — Primeiro uso

1. abrir o app;
2. entender a proposta;
3. configurar perfil profissional mínimo;
4. criar ou configurar a primeira turma;
5. personalizar o necessário sem formulário excessivo;
6. visualizar valor real do produto;
7. ver paywall correto quando aplicável;
8. comprar/iniciar trial elegível ou restaurar compra;
9. entrar na Home;
10. continuar usando após reiniciar o app.

## Jornada B — Preparar aula

1. abrir Planejamento;
2. navegar Dia/Semana/Mês;
3. criar plano de aula;
4. escolher turma/data/disciplina/duração;
5. preencher objetivo geral;
6. preencher objetivos específicos quando necessário;
7. definir conteúdo/objeto de conhecimento;
8. buscar/selecionar habilidades BNCC reais;
9. definir metodologia;
10. organizar Abertura → Desenvolvimento → Fechamento com tempos;
11. salvar rascunho automaticamente quando aplicável;
12. marcar plano pronto;
13. editar depois;
14. encontrar o plano novamente na Home/Planejamento.

## Jornada C — Dar aula

1. abrir Home;
2. identificar aula/turma do momento;
3. fazer chamada;
4. marcar presença/falta/pendência rapidamente;
5. salvar frequência;
6. confirmar persistência;
7. registrar observação pedagógica;
8. associar aluno opcionalmente;
9. salvar e reencontrar o registro;
10. consultar compromissos do dia.

## Jornada D — Acompanhar aluno

1. abrir Turmas;
2. escolher turma;
3. abrir lista de alunos;
4. abrir perfil de um aluno;
5. consultar frequência;
6. consultar registros pedagógicos;
7. consultar histórico;
8. consultar/registrar avaliação quando o módulo estiver previsto;
9. voltar sem perder contexto.

## Jornada E — Organizar materiais

1. abrir Arquivos;
2. navegar pastas;
3. ver recentes/favoritos;
4. importar/capturar arquivo quando suportado;
5. visualizar arquivo;
6. favoritar/desfavoritar;
7. mover para lixeira;
8. restaurar/excluir conforme regra;
9. compartilhar/exportar quando a capacidade já existir;
10. operar de forma segura offline quando possível.

## Jornada F — Administrar o produto

1. abrir Mais/Configurações;
2. editar perfil;
3. gerenciar turmas;
4. configurar notificações;
5. configurar aparência/acessibilidade quando aplicável;
6. consultar privacidade e segurança;
7. executar backup/sync quando real;
8. gerenciar assinatura;
9. restaurar compra;
10. alterar/cancelar plano através dos caminhos corretos;
11. logout quando aplicável;
12. exclusão de conta/dados com confirmação correta;
13. exportação/portabilidade quando exigida pelo produto/lei.

---

# 4. Mapa completo de superfícies Android 1.0

O objetivo é construir e integrar **todas** as superfícies abaixo. A lista é produto, não decoração.

## Volume 1 — Entrada, conta, ativação e assinatura

1. Splash
2. Onboarding / proposta de valor
3. Cadastro
4. Login / recuperação
5. Configuração do professor
6. Criação/configuração da primeira turma
7. Personalização inicial
8. Escolha de plano
9. Paywall
10. Confirmação de assinatura/trial/restauração
11. Primeiro sucesso / entrada na Home

### Regras

- onboarding alvo ~2–4 minutos;
- valor antes de perguntas;
- perguntas apenas quando mudam a experiência;
- sem diagnóstico falso;
- sem campos desnecessários;
- hard paywall após ativação/valor, conforme autoridade atual;
- mensal e anual reais via store/RevenueCat;
- anual recomendado quando essa decisão continuar vigente;
- trial apenas se elegível e retornado pelo sistema real;
- sem preço/trial hardcoded na UI;
- restore acessível;
- falha de compra nunca mostra sucesso;
- nenhum dado pedagógico enviado a analytics.

## Volume 2 — Home e rotina diária

12. Home / dia
13. Frequência / chamada
14. Registrar observação
15. Compromissos / agenda
16. Atividade recente

### Regras

- Home = mesa digital do professor;
- destinos diretos devem manter DNA V2;
- nenhuma ação da Home pode cair em UI V1 no produto final;
- frequência deve ser rápida em sala;
- observação precisa persistir de verdade;
- agenda deve refletir dados reais do app.

## Volume 3 — Planejamento

17. Visão geral de planejamento
18. Planejamento diário
19. Planejamento semanal
20. Planejamento mensal
21. Criar plano de aula
22. Editar plano de aula
23. Seleção BNCC
24. Criar atividade

### Campos mínimos de plano

- título;
- turma;
- data;
- componente curricular/disciplina;
- duração/horário;
- status: rascunho / pronto / concluído / arquivado;
- objetivo geral;
- objetivos específicos opcionais;
- conteúdo/objeto de conhecimento;
- habilidades BNCC: código + descrição;
- justificativa/contextualização opcional;
- metodologia/estratégia;
- Abertura;
- Desenvolvimento;
- Fechamento;
- tempo estimado por momento;
- autosave seguro quando aplicável.

## Volume 4 — Turmas e alunos

25. Visão geral de turmas
26. Detalhe da turma
27. Lista de alunos
28. Perfil do aluno
29. Frequência da turma/aluno
30. Registros pedagógicos
31. Histórico do aluno
32. Notas/avaliação quando parte do escopo real

### Regras

- nomes completos não podem ser cortados por conveniência quando necessários à identificação;
- operações destrutivas precisam confirmação;
- frequência e registros devem reconciliar com dados reais;
- navegação deve preservar turma/aluno atual.

## Volume 5 — Arquivos, relatórios e hub Mais

33. Arquivos — visão geral
34. Pastas
35. Arquivos recentes
36. Favoritos
37. Importação/captura
38. Visualização de arquivo
39. Lixeira
40. Relatórios
41. Perfil profissional
42. Gerenciar turmas
43. Ferramentas de sala
44. Notificações
45. Mais — hub

## Volume 6 — Configurações, ciclo de vida e estados

46. Configurações
47. Aparência / acessibilidade
48. Privacidade / segurança
49. Backup / sincronização
50. Ajuda / suporte
51. Sobre
52. Gerenciar assinatura
53. Alterar plano
54. Cancelar assinatura
55. Loading states
56. Empty states
57. Error states
58. Success states
59. Offline / recuperação
60. Logout
61. Exclusão de conta
62. Confirmação final de exclusão

---

# 5. Ordem de construção recomendada

A ordem abaixo maximiza valor operacional e reaproveitamento visual/funcional.

## Milestone M1 — Primeiro anel da Home

- Home V2 — já é North Star;
- Frequência;
- Observação;
- Compromissos;
- Planejamento Dia/Semana/Mês;
- Turmas;
- Perfil;
- Arquivos;
- Mais.

Objetivo: nenhum clique principal da Home leva a um produto visualmente antigo.

## Milestone M2 — Planejamento profissional completo

- overview;
- criar/editar plano;
- BNCC;
- atividades;
- autosave;
- estados;
- conexão com Home e calendário.

Objetivo: professor consegue preparar a próxima aula sem ferramenta externa.

## Milestone M3 — Turma e acompanhamento do aluno

- lista de turmas;
- detalhe;
- alunos;
- perfil;
- frequência;
- registros;
- histórico;
- avaliação quando real.

Objetivo: professor consegue acompanhar aluno/turma durante a rotina.

## Milestone M4 — Arquivos e relatórios

- pastas;
- recentes;
- favoritos;
- captura/importação;
- visualização;
- lixeira;
- relatórios.

Objetivo: materiais e registros não dependem de organização externa para tarefas essenciais suportadas pelo app.

## Milestone M5 — Onboarding + monetização + conta

Construir o fluxo completo e real, não mockado.

Objetivo: novo usuário chega de instalação a Home com entitlement correto.

## Milestone M6 — Configurações, lifecycle e confiança

- perfil;
- notificações;
- acessibilidade;
- privacidade;
- backup/sync real;
- assinatura;
- restore;
- logout;
- exclusão;
- ajuda/sobre.

Objetivo: usuário consegue administrar o próprio produto e seus dados.

## Milestone M7 — Estados sistêmicos + offline

Aplicar loading/empty/error/success/offline de forma consistente em todas as jornadas críticas.

Objetivo: o app continua compreensível quando algo dá errado.

## Milestone M8 — Android release candidate

- responsividade multi-device;
- texto ampliado;
- teclado/safe areas;
- Reduced Motion;
- APK QA;
- POCO X7 Pro real device QA;
- emulador Android compacto adicional;
- CI verde;
- regressão de dados;
- billing/entitlement;
- privacidade/security review;
- smoke E2E;
- release checklist.

---

# 6. Visual: qualidade obrigatória em todas as telas

DNA:

> **Friendly Professional + Candy UI + Tactile + Educational + Motion-led**

Balanço:

> **fundo azul-claro + superfícies de trabalho majoritariamente brancas + azul vivo para foco/ação + navy para texto**

## Proibido como linguagem dominante

- dashboard SaaS;
- fintech/editorial corporativo;
- Material default;
- starter Tailwind;
- glassmorphism;
- gradiente genérico;
- bento decorativo;
- grid de atalhos por conveniência;
- card branco para todo objeto;
- ícone dentro de círculo colorido repetido em todos os itens;
- uppercase excessivo;
- sombras suaves genéricas como identidade;
- composição idêntica para módulos diferentes.

## Regra de continuidade

Ao navegar entre telas:

> **o usuário deve sentir que continua no mesmo produto.**

Comparar destino com Home e com a superfície anterior:

- tipografia;
- radius;
- profundidade;
- iconografia;
- densidade;
- navegação;
- cor;
- microcopy;
- motion.

---

# 7. Visual Builder — ritmo obrigatório

Durante iteração visual ativa:

- render cedo;
- screenshot cedo;
- comparar cedo;
- corrigir poucas diferenças de alto impacto;
- repetir.

Não acumular meia hora de CSS não observado.

## Para cada tela

1. identificar target/North Star;
2. formular hipótese;
3. implementar mínimo;
4. renderizar;
5. capturar screenshot;
6. listar 3–5 maiores diferenças;
7. corrigir a maior;
8. repetir;
9. integrar dados reais;
10. implementar estados;
11. validar responsividade;
12. testar fluxo real de entrada e saída da tela;
13. commit/push;
14. atualizar execution board.

---

# 8. Android multi-device: produto para muitos celulares

Seguir obrigatoriamente:

- `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md`;
- `.agents/skills/assistente-pedagogico-android-adaptive-ui/SKILL.md`;
- `docs/ANDROID_REAL_DEVICE_QA.md`.

O POCO X7 Pro é aparelho de referência física, **não o único alvo**.

Stress mínimo lógico:

- 320;
- 360;
- 390;
- 412;
- 432;
- 480;
- 600 quando aplicável;
- 720/840 em experiências relevantes de tela grande.

Também testar alturas curtas e teclado.

## Texto

Falha imediata se:

- palavra humana essencial quebra no meio;
- CTA perde palavra;
- título é cortado;
- nome necessário à identificação vira ellipsis sem motivo;
- texto ampliado torna tarefa impossível;
- layout depende de 390px ou de um aparelho.

Fixtures devem usar copy PT-BR realista e comprida.

---

# 9. Funcionalidade real: regra contra telas cenográficas

Nenhuma tela é “pronta” apenas porque parece certa.

Toda ação visível deve ser classificada como uma destas:

1. **funcional e persistida**;
2. **funcional sem persistência por natureza**;
3. **indisponível conscientemente com estado explicativo**.

Proibido:

- botão que não faz nada;
- toast falso de sucesso;
- dado mockado aparecendo em produção como se fosse real;
- salvar somente em memória quando o produto promete persistência;
- loading infinito;
- CTA de serviço/backend inexistente apresentado como operacional;
- compra visualmente concluída sem entitlement real.

Fixtures sintéticas só no Visual Lab/dev e claramente isoladas.

---

# 10. Dados, persistência e offline

O app deve preservar dados pedagógicos com segurança.

Para cada feature persistente, verificar:

- criar;
- ler;
- editar;
- excluir/arquivar conforme regra;
- reiniciar app e reencontrar dado;
- trabalhar offline quando a arquitetura suporta;
- reconciliar após retorno;
- erro de storage;
- migração de schema quando existir;
- ausência de perda silenciosa.

Nunca alterar storage/migração destrutivamente apenas para facilitar UI.

---

# 11. BNCC

BNCC precisa ser integração funcional e verificável.

Requisitos mínimos:

- busca útil;
- seleção de habilidade;
- código + descrição;
- associação ao plano;
- persistência;
- reabertura/edição;
- estados vazios/erro;
- performance aceitável;
- sem inventar códigos.

---

# 12. Billing / RevenueCat

Billing é área crítica.

Regras:

- preço e moeda da store;
- entitlement real;
- restore real;
- trial somente quando elegível;
- mensal/anual conforme catálogo real;
- sucesso somente após confirmação real;
- erro/cancelamento compreensíveis;
- assinatura expirada não apaga dados;
- gerenciamento/cancelamento acessível;
- segurança, privacidade, exclusão, restore e gerenciamento não podem ficar presos atrás de paywall.

Não inventar produto/price ID.

Se credencial/configuração externa estiver ausente, implementar tudo que não depende dela, testar com mocks isolados apenas em teste e registrar blocker exato no execution board.

---

# 13. Analytics e privacidade

Analytics nunca recebe:

- nome de aluno;
- observação pedagógica;
- notas;
- frequência individual identificável;
- texto livre pedagógico;
- conteúdo de arquivo;
- PII desnecessária.

Eventos devem passar por adapter/allowlist.

LGPD, exportação, exclusão, privacidade e segurança são gates de release.

---

# 14. Acessibilidade

Obrigatório em todas as superfícies:

- touch target >= 48 px lógicos;
- labels acessíveis;
- foco perceptível;
- contraste adequado;
- estado não comunicado apenas por cor;
- texto escalável;
- ordem de leitura coerente;
- Reduced Motion;
- alternativa para gesto;
- teclado não bloqueia CTA;
- safe areas;
- conteúdo crítico íntegro em texto aumentado.

---

# 15. Motion e haptics

Motion explica:

- causalidade;
- entrada/saída;
- mudança de estado;
- confirmação;
- hierarquia espacial.

Não usar animação para mascarar layout ruim.

Preferir:

- transições curtas e físicas;
- microfeedback de pressão;
- morph contextual quando realmente ajuda;
- calendário espacial Dia/Semana/Mês;
- Files com sensação física;
- haptic semântico.

Sempre respeitar Reduced Motion.

---

# 16. Testes obrigatórios por camada

## A cada vertical slice relevante

Executar o conjunto aplicável:

```bash
pnpm run check:v2-boundary
pnpm run test:v2-responsive
pnpm test
pnpm build
node scripts/android-sync.mjs
```

Quando houver E2E da jornada atual, rodar também.

## Antes de milestone

- testes unitários;
- integração;
- responsividade;
- E2E das jornadas do milestone;
- build;
- Android sync;
- APK QA quando aplicável;
- screenshots.

## Antes de release candidate

Cobrir as jornadas A–F deste documento.

---

# 17. CI e falhas

CI vermelho não deve ser ignorado.

Classificar falha:

- regressão introduzida agora;
- falha preexistente;
- flake;
- ambiente;
- credencial externa.

Corrigir regressões próprias antes de seguir muito adiante.

Falhas preexistentes relevantes ao fluxo atual devem ser tratadas quando impedirem confiabilidade.

Não “resolver” teste removendo cobertura útil.

---

# 18. Git para sessão longa

## Início

```bash
git status
git branch --show-current
git fetch origin --prune
git log -1 --oneline
git log -1 --oneline origin/$(git branch --show-current)
```

Sincronizar se seguro e necessário.

## Durante

Fazer commits pequenos e semanticamente claros.

Exemplos:

- `feat(v2): build attendance screen visual slice`
- `feat(v2): persist attendance changes`
- `fix(v2): keep attendance labels intact on narrow screens`
- `test(v2): cover attendance offline state`

Push regular para não deixar horas de trabalho apenas local.

## Não fazer

- trabalhar em `main`;
- force push destrutivo sem necessidade explícita;
- merge automático;
- reescrever histórico remoto por conveniência;
- misturar refactor não relacionado no mesmo commit.

---

# 19. Execution Board obrigatório

Manter `docs/ANDROID_1_0_EXECUTION_BOARD.md` atualizado.

Ele deve responder rapidamente:

- onde estamos;
- o que acabou de ficar pronto;
- qual é a próxima unidade;
- quais blockers externos existem;
- quais telas ainda são V1;
- quais jornadas E2E já passam;
- qual foi o último commit/teste/screenshot relevante.

Atualizar no mínimo a cada milestone e preferencialmente a cada tela/fluxo concluído.

A board é o mecanismo de retomada se uma sessão for interrompida.

---

# 20. Quando o Codex pode realmente parar

Uma sessão pode parar por limite técnico da ferramenta, mas o **trabalho não é considerado concluído**.

Ao retomar, ler a execution board e continuar.

Pausar para input humano apenas quando houver blocker real que não possa ser resolvido com as decisões já registradas, por exemplo:

- chave/credencial externa indispensável;
- decisão legal/privacidade não definida;
- operação irreversível em dados reais;
- catálogo de billing/store ausente quando necessário para avançar;
- conflito de Git que exija decidir qual trabalho humano preservar;
- hardware físico indispensável para um gate que não pode ser simulado;
- decisão de produto com duas opções incompatíveis e sem autoridade existente.

Mesmo nesses casos:

1. registrar blocker;
2. continuar tarefas independentes;
3. não ficar ocioso esperando se houver trabalho seguro na fila.

---

# 21. Não pedir confirmação para decisões triviais

O Codex deve usar a autoridade de design/produto existente para decidir:

- espaçamento;
- organização responsiva;
- microcopy não estratégica;
- estados de loading/empty/error;
- extração de componente já comprovado;
- pequenos ajustes de motion;
- testes adicionais;
- correções de acessibilidade;
- refactors locais necessários.

Não interromper o fluxo por decisões reversíveis de baixo risco.

---

# 22. Definition of Done por tela

Uma tela só entra como concluída no board quando, conforme aplicável:

- V2, não V1;
- visual coerente;
- navegação de entrada/saída real;
- dados reais ou fonte real conectada;
- ação principal funciona;
- persistência funciona;
- loading;
- empty;
- error;
- offline;
- acessibilidade;
- responsividade;
- texto ampliado;
- sem corte de copy essencial;
- testes relevantes;
- screenshot;
- commit/push.

Se algum item não se aplica, registrar N/A implicitamente pela natureza da tela, não fabricar estado inútil.

---

# 23. Definition of Done por fluxo

Fluxo completo significa:

- entrada correta;
- todas as etapas navegáveis;
- back/close corretos;
- validação de formulário;
- persistência;
- retomada após reinício quando aplicável;
- erro recuperável;
- offline coerente;
- feedback verdadeiro;
- acessibilidade;
- sem dead end;
- sem cair em V1;
- E2E ou teste de integração cobrindo happy path e erro principal.

---

# 24. Definition of Done Android 1.0

Só marcar:

`ANDROID 1.0 PRODUCT COMPLETION CANDIDATE`

quando:

- todas as 62 superfícies foram implementadas, substituídas ou explicitamente classificadas como N/A por decisão de produto;
- jornadas A–F são executáveis;
- nenhuma rota principal cai em V1;
- nenhum CTA principal é falso;
- dados críticos persistem;
- offline core funciona conforme arquitetura;
- BNCC funciona;
- billing/restore/entitlement funciona em ambiente apropriado;
- responsividade multi-device passa;
- texto ampliado passa;
- acessibilidade crítica passa;
- CI verde;
- build Android e sync passam;
- APK QA passa;
- POCO X7 Pro testado ou único gate físico claramente pendente;
- ao menos um perfil Android compacto adicional foi testado por emulador ou aparelho;
- privacidade/LGPD revisadas;
- exclusão/portabilidade/restore/gerenciamento disponíveis conforme requisito;
- execution board não contém blocker P0 não reconhecido.

Depois disso, **não fazer merge/release automático**. Entregar relatório final com:

- branch;
- head SHA;
- CI;
- APK/build;
- jornadas E2E;
- blockers restantes;
- riscos conhecidos;
- checklist de publicação Play Store.

---

# 25. Princípio de produto

Este aplicativo deve ser suficientemente confiável para um professor abrir durante uma aula real.

Isso significa que a régua não é:

> “parece bonito na screenshot”.

Nem:

> “o build passou”.

A régua é:

> **“Eu confiaria minha rotina de aula, minha chamada, meus registros e meu planejamento a este aplicativo amanhã de manhã?”**

Se a resposta ainda for não, continue.

---

# 26. Princípio final de execução

> **Não construa um protótipo eterno. Construa o produto.**

> **Não pare porque uma tela ficou bonita. Conecte-a.**

> **Não pare porque um fluxo funciona no happy path. Torne-o recuperável.**

> **Não pare porque funciona no seu viewport. Faça funcionar no Android real de professores diferentes.**

> **Não pare porque uma sessão acabou. Registre o estado e retome pela board.**

A meta permanente é:

# `ASSISTENTE PEDAGÓGICO — ANDROID 1.0 PRONTO PARA USO REAL`
