# Status operacional

Atualizado em 13/09/2026.

## Frente ativa — P0 Visual #5 / PR #8

O PR #8 (`codex/5-v2-clean-room`) continua como a única frente visual V2 e permanece em **draft**. Não fazer merge automático.

A **Home V2 está VISUAL DIRECTION APPROVED**. Isso libera a migração sequencial das superfícies diretamente alcançadas pela Home, mas não significa que o PR esteja pronto para merge nem que a Fundação Visual V2 #5 esteja concluída.

### Progresso confirmado

- V2 visual isolada em `src/v2/`, sem usar a arquitetura visual V1 como autoridade;
- fluxo Visual Builder formalizado: `HIPÓTESE -> EXPERIMENTO -> OBSERVAÇÃO -> CORREÇÃO`;
- regra Android adaptativa alinhada entre `AGENTS.md` e `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
- Home V2 renderizada e refinada no viewport-âncora de 390 px com evidência pública no PR;
- Home principal conectada a perfil, turma, planos do dia, frequência e agenda local por adapter V2; fixtures sintéticas permanecem restritas ao Visual Lab/evidência pública;
- avatar e itens da agenda possuem ação/semântica interativa real;
- matriz responsiva da Home validada em 320 / 360 / 390 / 412 / 432 / 480 / 600 px;
- Android sync/Gradle/APK QA já passaram na rodada funcional;
- workflow `V2 validation` está verde no head `159112e`;
- Gate adicional de aparelho real documentado em `docs/ANDROID_REAL_DEVICE_QA.md`, usando POCO X7 Pro como referência física de aceitação sem transformá-lo em breakpoint de layout.

### Gate de produção/merge ainda pendente

A aprovação visual da Home não fecha o Gate B. Antes de `PRODUCTION GATE READY`, ainda é obrigatório:

1. fechar a matriz relevante de estados (pressed/focus/loading/error/offline/success quando aplicável);
2. validar crescimento de texto 115/130/150% sem sacrificar copy, hierarquia ou navegação;
3. validar touch targets, safe areas e comportamento de teclado nas superfícies aplicáveis;
4. validar motion e Reduced Motion;
5. remover/ajustar qualquer sombra difusa que conflite com a física tátil V2 ou registrar exceção deliberada;
6. executar QA de edge cases e persistência das ações reais;
7. executar QA em aparelho Android real conforme `docs/ANDROID_REAL_DEVICE_QA.md` quando o POCO X7 Pro estiver disponível, sem inventar evidência se não houver acesso físico;
8. manter CI verde no head que vier a ser candidato ao Gate B.

## Superfície P0 em Design Review — Frequência / Fazer chamada

A Frequência V2 foi implementada e endurecida. No head `159112e`, os bloqueios técnicos apontados na revisão anterior foram corrigidos: handlers reais foram conectados para Configurar turma, detalhes do aluno e tabs de contexto; os alvos do seletor passaram para 48 px; a composição estreita passou a reflow em vez de reduzir agressivamente a tipografia; `pnpm run test:v2-responsive` agora inclui a suíte da Frequência; e a suíte verifica touch targets e texto ampliado em 115/130/150%. O CI `V2 validation` está verde.

Há evidência versionada de 390 px, before/after Home→Frequência, estados loading/error/offline/empty e stress em 320 px com texto 150%. O trabalho está marcado como **`READY FOR DESIGN REVIEW — FREQUÊNCIA V2`**, mas isso ainda **não é** `VISUAL DIRECTION APPROVED`.

Bloqueio atual do Gate A:

1. anexar diretamente ao PR a evidência pós-hardening de 390 px e 320 px / 150% para revisão visual lado a lado; referência de arquivo no repositório não substitui evidência inspecionável no gate;
2. registrar uma rodada Visual Builder pós-hardening com observação explícita das 3–5 diferenças perceptivas restantes e nova captura após a correção principal;
3. não iniciar `Registrar observação V2` antes de `VISUAL DIRECTION APPROVED — FREQUÊNCIA`, conforme a fila P0 da Issue #5.

Próximo ciclo obrigatório:

`RENDER PÓS-HARDENING -> SCREENSHOT 390 ANEXADA -> SCREENSHOT 320/150% ANEXADA -> OBSERVAÇÃO 3–5 DIFERENÇAS -> CORREÇÃO PRINCIPAL -> NOVA SCREENSHOT -> REVISÃO VISUAL`

Gate B da Frequência continuará exigindo motion/Reduced Motion, QA Android real quando disponível, persistência/recovery e estados finais, mesmo após eventual aprovação visual.

## Prioridade e dependências

- **P0 técnico / segurança / privacidade / integridade de dados** continuam acima de refinamento visual.
- **P0 Visual #5** continua aberto até a fundação estar demonstrada nos contextos reais exigidos e os gates de produção estarem fechados.
- **P0 Growth #6** permanece bloqueado até a Fundação Visual V2 estar aprovada no nível exigido pela issue e a base de billing estar estável.
- Splash/Onboarding, P1 e P2 não devem atropelar a fila sequencial do primeiro anel da Home.

## Superfície em construção — Registrar observação V2

O fluxo `registro-rapido` agora monta `ObservationV2` em `src/v2/`: picker de aluno, contexto da turma, participação semântica, anotação livre, áudio opcional, salvamento com feedback confirmado e navegação V2. O controlador preserva `repository.carregarObservacoes` / `salvarObservacoes` e grava áudio através do armazenamento de mídia existente quando o professor opta por usar o microfone.

Evidências locais: `docs/qa/clean-room/observation-picker-412.png` e `observation-form-412.png`. O E2E `e2e/v2-observation-flow.pw.ts` cobre escolha, preenchimento, salvamento e texto ampliado a 130%. Estado atual: **`IN PROGRESS`**; ainda falta hardening Android real, estados finais e revisão visual externa.

## Superfície em construção — Compromissos / Agenda V2

O destino contextual `compromissos` da Home agora monta `CommitmentsV2` em `src/v2/`: timeline diária, seletor de semana, estados sem agenda/loading/erro/offline, criação/edição, conclusão/reabertura e exclusão. A persistência usa os contratos locais `Cp`/`Xf` por turma; o Planejamento legado continua acessível separadamente pela navegação enquanto o próximo lote migra Dia/Semana/Mês.

Evidência local: `docs/qa/clean-room/commitments-v2-412.png`. O E2E `e2e/v2-commitments-flow.pw.ts` cobre render, criação e texto ampliado a 130%. Estado atual: **`IN PROGRESS`**; ainda falta hardening Android real, revisão completa de estados e revisão visual externa.

## Superfície em construção — Planejamento diário V2

O destino `Home V2 -> Ver plano` agora monta `PlanningDayV2` em `src/v2/`, com timeline de momentos, troca de dia, estados loading/empty/error/offline, abertura do editor de plano existente e criação pelo domínio `newLessonPlan`. A leitura usa `loadPlansByDate`; Dia/Semana/Mês permanecem explicitamente em migração sequencial.

Evidências locais: `docs/qa/clean-room/planning-day-v2-412.png`, `planning-week-v2-412.png` e `planning-month-v2-412.png`. O E2E `e2e/v2-planning-day-flow.pw.ts` cobre render, Dia/Semana/Mês e texto ampliado a 130%. Estado atual: **`IN PROGRESS`**; ainda falta hardening Android real, validação completa de edição/autosave e revisão visual externa.

## Superfície em construção — Turmas V2

O destino do BottomNavigation `turmas-v2` agora monta `ClassesV2` em `src/v2/`, usando a lista real de turmas, turma ativa e alunos do controlador. A superfície oferece ações reais para chamada, observação, perfil do aluno, cadastro e ativação de outra turma, sem substituir as rotas acadêmicas existentes.

## Superfície em construção — Perfil profissional V2

O destino `perfil-professor` agora monta `ProfileV2` em `src/v2/`, com identidade do professor, tratamento, escola, cidade/UF e etapa de ensino em composição V2. O salvamento continua usando `repository.salvarPerfil`; troca de foto usa seletor nativo do Android e o armazenamento local de mídia existente, incluindo limpeza da mídia anterior quando aplicável. O fluxo ainda está em construção e não é aprovação visual.

## Superfície em construção — Arquivos V2

O destino `biblioteca` agora monta `FilesV2` em `src/v2/`, com biblioteca local, pastas, busca, filtros, favoritos, importação, captura e lixeira em composição V2. A leitura e escrita usam os contratos locais de `data/files.js` (`Ch`, `bs`, `Jf`, `$l`, `gp`, `trashDocument`), sem importar a UI legada. O overview está em construção; visualização/compartilhamento e hardening Android continuam na fila.

## Superfície em construção — Mais V2

O destino `mais` agora monta `MoreV2` em `src/v2/`, com hub organizado por sala, conta, preferências, dados e suporte. Cada item mantém o callback para a rota funcional existente; a navegação inferior também permanece na linguagem V2. As telas secundárias ainda serão migradas sequencialmente e o hub não é aprovação visual.

## Superfície em construção — Editor de plano V2

O destino `plano-aula` agora monta `LessonPlanV2` em `src/v2/`, preservando o contrato `LessonPlan` e o salvamento via `repository.salvarPlano`. O editor cobre tema, data, horários, objetivo geral, objetivos específicos, códigos BNCC, momentos, recursos, metodologia, avaliação, inclusão e rascunho/conclusão; o retorno do Planejamento Dia mantém o contexto. BNCC com seleção assistida, autosave completo e hardening Android permanecem na fila.

Evidência local: `docs/qa/clean-room/classes-v2-412.png`. O E2E `e2e/v2-classes-flow.pw.ts` cobre render, entrada em Frequência e texto ampliado a 130%. Estado atual: **`IN PROGRESS`**; ainda falta hardening Android real e revisão visual externa.

## Superfície em construção — BNCC V2

O destino `bncc` agora monta `BnccV2` em `src/v2/`, com catálogo real de `src/domain/bncc.ts`, etapa, busca por código/descrição, favoritos, histórico, detalhe, loading, erro recuperável, vazio e offline. A persistência usa `bncc:favoritos` e `bncc:historico` através do `StoragePort`; nenhum código curricular é inventado e nenhuma UI legada é importada. O detalhe pode abrir o editor de plano com o código real selecionado via `prefill`; descrição estruturada e seleção múltipla seguem como hardening do editor.

## Superfície em construção — Relatórios V2

O destino `relatorios` agora monta `ReportsV2` em `src/v2/`, com leitura de chamadas reais via `StoragePort`, recorte por turma/aluno/período, estados sem registros/sem turma/loading/erro, cálculo usando `buildAttendanceReport` e exportação CSV via `exportText`. A tela não importa componentes visuais V1; exportação PDF e hardening de filtros/estados continuam na fila.

## Superfície em construção — Configurações V2

O destino `configuracoes` agora monta `SettingsV2` em `src/v2/`, com grupos de perfil/trabalho, preferências, dados/segurança, ajuda e experiência. Sons continuam ligados ao estado persistido do App; cada item mantém seu callback de rota existente. A aparência e os subfluxos acessados permanecem na fila de migração individual.

## Superfície em construção — Aparência V2

O destino `tema` agora monta `AppearanceV2`, preservando os callbacks reais de tema/cor do App e incluindo modo claro/sistema/escuro, cor de ação, focus visible e reduced motion. A superfície continua propositalmente clara por padrão; validação de contraste e comportamento Android dark mode permanecem no hardening.

## Baseline funcional preservado

A branch base contém React + TypeScript + Vite + Capacitor Android, persistência/local-first, BNCC, backup, billing/RevenueCat e demais contratos funcionais. Esses motores podem ser reutilizados pela V2, mas o legado não é baseline visual.

Guardrails imutáveis:

- LGPD e privacidade;
- nenhum dado pedagógico/aluno em analytics;
- integridade e migração de dados;
- funcionamento offline do núcleo;
- billing/entitlements reais;
- backup/restauração/exportação/exclusão;
- acessibilidade e Reduced Motion;
- nenhuma credencial, segredo ou dado real em evidência visual.

## Release

Ainda não há release comercial pronta. Não gerar expectativa de produção até existirem, no mínimo, assinatura de release, billing real validado, revisão de privacidade/jurídica, QA Android final e gates P0 concluídos.
## Android 1.0 — onboarding V2 em andamento

- `src/v2/screens/OnboardingV2.tsx` iniciou a migração da apresentação de primeiro uso sem mascote e sem o grid visual legado.
- As cinco etapas, escolha `gratuito`/`pro`, persistência de `assinatura:interesse`, pular, voltar e entrada no wizard permanecem conectadas ao fluxo existente.
- O Visual Lab expõe `?v2-preview=onboarding&width=390` para comparação em larguras Android.
- Estado: `IN PROGRESS`; falta validar o fluxo completo de primeiro uso com o wizard, conta e billing reais.

## Android 1.0 — splash V2 em andamento

- `src/v2/screens/SplashV2.tsx` remove a composição baseada em mascote e apresenta a marca com símbolo editorial, progresso local e princípios do produto.
- O roteamento real continua chamando `onDone` para respeitar Home, wizard ou onboarding já configurados.
- O Visual Lab expõe `?v2-preview=splash&width=390`; a entrada de teste segue para o onboarding V2.
- Estado: `IN PROGRESS`; falta validar a cadeia completa de primeiro uso no Android com restauração de estado.

## Android 1.0 — configuração inicial V2 em andamento

- `src/v2/screens/SetupWizardV2.tsx` substitui a composição do wizard legado sem substituir seus contratos: rascunho `onboarding:rascunho:v2`, seis etapas, validação, retorno, confirmação de saída, estado de salvamento e sucesso.
- A conclusão continua delegada ao callback real do App, que persiste perfil/turma nos repositories existentes e mantém o caminho para cadastrar o primeiro aluno ou entrar na Home.
- O Visual Lab expõe `?v2-preview=wizard&width=390` e a suíte cobre conclusão em 390px e compactação em 320px.
- Estado: `IN PROGRESS`; falta validar a jornada real completa com cadastro de aluno, assinatura e reinício do aplicativo.

## Android 1.0 — cadastro de aluno V2 em andamento

- `src/v2/screens/NewStudentV2.tsx` substitui o destino visual V1 do botão `Cadastrar primeiro aluno` e preserva `onSalvo`, `onConcluido` e `onDirtyChange`.
- Nome e nascimento são obrigatórios; responsável e telefone são opcionais, com validação real do contrato de dados antes de delegar a persistência ao App.
- Estado: `IN PROGRESS`; foto do aluno, perfil/histórico e importação seguem como unidades posteriores da jornada de turmas.
