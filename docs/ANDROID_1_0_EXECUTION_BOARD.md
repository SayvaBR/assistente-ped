# Android 1.0 Execution Board — Assistente Pedagógico

> **Função:** memória operacional da missão de conclusão do produto.
> **Atualizar continuamente.** Se a sessão cair, retomar daqui.

## Estado global

- Base de integração: `integration/android-1.0`
- Último PR integrado: `#14` (`bdb8f09` → `6ae981b`)
- North Star visual: Home V2
- Missão: `docs/CODEX_ANDROID_1_0_COMPLETION_MISSION.md`
- Estado do produto: **em construção — não pronto para release**

## Regra de status

Use apenas:

- `TODO`
- `IN PROGRESS`
- `READY FOR DESIGN REVIEW`
- `VISUAL DIRECTION APPROVED`
- `FUNCTIONAL HARDENING`
- `PRODUCTION GATE READY`
- `BLOCKED — <motivo>`
- `N/A — <decisão>`

O Codex pode marcar `READY FOR DESIGN REVIEW`, `FUNCTIONAL HARDENING` e `PRODUCTION GATE READY` quando os critérios objetivos forem atendidos.

`VISUAL DIRECTION APPROVED` exige aprovação externa de produto/design.

## Foco atual

1. Frequência / Fazer chamada V2 — `READY FOR DESIGN REVIEW`
2. Registrar observação — `READY FOR DESIGN REVIEW`
3. Compromissos / Agenda — `READY FOR DESIGN REVIEW`
4. Planejamento Dia/Semana/Mês — `FUNCTIONAL HARDENING`
   - Delivery Unit concluída: `Planejamento diário V2 — hardening funcional/responsivo`; PR `#14` integrado em `integration/android-1.0`.
   - Delivery Unit atual: `Planejamento semanal V2 — hardening funcional/responsivo`; branch `codex/delivery-planning-week-v2`; pronta para PR contra `integration/android-1.0`.
5. Turmas — `IN PROGRESS`
6. Perfil do professor — `IN PROGRESS`
7. Arquivos — `IN PROGRESS`
8. Mais — `IN PROGRESS`
9. BNCC — `IN PROGRESS`
10. Relatórios — `IN PROGRESS`
11. Configurações — `IN PROGRESS`
12. Aparência — `IN PROGRESS`
13. Onboarding — `IN PROGRESS`

## Milestone M1 — Primeiro anel da Home

- Home V2 — `VISUAL DIRECTION APPROVED`
- Frequência — `READY FOR DESIGN REVIEW`
- Registrar observação — `READY FOR DESIGN REVIEW`
- Compromissos / Agenda — `READY FOR DESIGN REVIEW`
- Planejamento diário — `FUNCTIONAL HARDENING` (PR #14 integrado; filtros de arquivados, erro/retry de atividades, momentos sem horário e evidência 320/412 px cobertos)
- Planejamento semanal — `IN PROGRESS`
- Planejamento mensal — `IN PROGRESS`
- Turmas — `IN PROGRESS`
- Perfil — `IN PROGRESS`
- Arquivos — `IN PROGRESS`
- Mais — `IN PROGRESS`

### Critério M1

Nenhuma ação principal da Home cai em V1 e todos os destinos parecem o mesmo produto.

## Milestone M2 — Planejamento profissional completo

- Planejamento overview — `READY FOR DESIGN REVIEW`
- Criar plano — `IN PROGRESS` (campos profissionais e fluxo de rascunho/pronto/concluído implementados; falta endurecer reabertura/arquivamento e QA Android)
- Editar plano — `IN PROGRESS` (editor V2 real com campos profissionais e estado Pronto; falta completar o ciclo de edição/arquivamento)
- BNCC — `IN PROGRESS`
- Criar atividade — `FUNCTIONAL HARDENING` (editor V2 vinculado a turma/data, valida título/instruções e persiste localmente/offline)
- Autosave — `FUNCTIONAL HARDENING` (rascunho local por turma/data, recuperação após saída/reabertura e limpeza após salvamento oficial)
- Status rascunho/pronto/concluído/arquivado — `IN PROGRESS` (rascunho, pronto, concluído e arquivado via `arquivadoEm`; o editor agora arquiva sem apagar o registro, falta validar restauração/descoberta do arquivado em todos os pontos de entrada)
- Integração Home/calendário — `IN PROGRESS` (Home já deriva planos e compromissos reais; Planning overview e calendários de Dia/Semana/Mês exibem atividades pedagógicas salvas, marcam dias com preparo e permitem reabri-las para edição)

## Milestone M3 — Turmas e alunos

- Visão geral de turmas — `IN PROGRESS` (Classes V2 exibe contexto ativo, alunos e ações reais; troca de turma foi corrigida e coberta no app real; agora encaminha também para AcademicV2 sem retornar à carroceria V1)
- Detalhe da turma — `IN PROGRESS` (ClassWorkspaceV2 substitui ClassScreen V1 no caminho real; abas Hoje, Alunos, Registros, Histórico e Gestão preservam callbacks de chamada, observação, perfil, relatórios, BNCC/avaliações, importação e configuração; Registros agora lê contagem/data dos registros pedagógicos reais)
- Lista de alunos — `IN PROGRESS`
- Perfil do aluno — `IN PROGRESS`
- Frequência — `IN PROGRESS` (Frequência V2 já é o destino real da chamada; o workspace mantém o retorno contextual e o acesso por histórico)
- Registros pedagógicos — `IN PROGRESS` (workspace V2 encaminha cada aluno para registros reais e mantém a criação de observação; falta aprofundar leitura agregada por turma)
- Histórico — `IN PROGRESS` (workspace V2 mostra resumo local por aluno, linha do tempo compacta dos últimos registros pedagógicos reais e chamadas salvas agrupadas por data; ainda falta ampliar cobertura de eventos de presença por data e validar o APK atual no POCO)
- Notas/avaliação — `IN PROGRESS` (AcademicV2 substitui a carroceria AcademicScreen V1 no caminho real da turma; preserva load/save acadêmico, médias, recuperação, exportação CSV, lançamento por aluno e criação de avaliação; falta fechar QA responsivo/estados e aprofundar o ciclo de avaliação)

## Milestone M4 — Arquivos e relatórios

- Arquivos overview — `IN PROGRESS` (FilesV2 é a rota real V2, com filtros, estados, criação de pasta, importação/captura e ações locais; abertura de documento e retorno entre níveis de pasta foram corrigidos neste lote)
- Pastas — `IN PROGRESS` (criação, entrada e retorno hierárquico locais cobertos; mover/renomear e visualização profunda ainda faltam)
- Recentes — `IN PROGRESS` (filtro existe e ordena por atualização; falta QA completo com dados persistidos)
- Favoritos — `IN PROGRESS` (pastas e arquivos podem ser marcados localmente; falta fechar cobertura de restauração/edge cases)
- Importação/captura — `IN PROGRESS` (input de arquivos e captura usam contratos Capacitor existentes; falta validar no Android real)
- Visualização — `IN PROGRESS` (ação de abrir usa `vp`/FileViewer existente; falta evidência em WebView/Android real)
- Lixeira — `IN PROGRESS`
- Relatórios — `IN PROGRESS`

## Milestone M5 — Onboarding, conta e monetização

- Splash — `IN PROGRESS`
- Onboarding — `IN PROGRESS`
- Cadastro — `IN PROGRESS`
- Login / recuperação — `BLOCKED — não há provedor/contrato de autenticação no repositório; não simular login remoto. Recuperação local por backup permanece disponível e precisa ser apresentada como tal.`
- Configuração professor — `IN PROGRESS`
- Primeira turma — `IN PROGRESS`
- Personalização — `IN PROGRESS`
- Escolha de plano — `IN PROGRESS`
- Paywall — `TODO`
- Purchase/trial/restore — `TODO`
- Confirmação — `TODO`
- Entrada na Home — `TODO`

## Milestone M6 — Mais, configurações e lifecycle

- Perfil profissional — `TODO`
- Gerenciar turmas — `IN PROGRESS`
- Ferramentas de sala — `IN PROGRESS`
- Notificações — `IN PROGRESS`
- Mais hub — `TODO`
- Configurações — `IN PROGRESS`
- Aparência/acessibilidade — `IN PROGRESS`
- Privacidade/segurança — `IN PROGRESS`
- Backup/sync — `IN PROGRESS`
- Ajuda/suporte — `IN PROGRESS`
- Sobre — `IN PROGRESS`
- Gerenciar assinatura — `TODO`
- Alterar plano — `TODO`
- Cancelar — `TODO`
- Logout — `TODO`
- Exclusão de conta — `TODO`
- Confirmação final de exclusão — `TODO`

## Milestone M7 — Estados sistêmicos e offline

- Loading — `TODO`
- Empty — `TODO`
- Error — `TODO`
- Success — `TODO`
- Offline/recovery — `TODO`
- Reinício do app/persistência — `TODO`

## Milestone M8 — Android release candidate

- Multi-device responsive — `TODO`
- Text scale 100/130/150% — `TODO`
- 200% em fluxos críticos — `TODO`
- Safe areas — `TODO`
- Teclado — `TODO`
- Reduced Motion — `TODO`
- Boundary V2 — `TODO`
- Testes unitários — `TODO`
- Testes integração — `TODO`
- E2E jornadas A–F — `TODO`
- Build — `TODO`
- Android sync — `TODO`
- APK QA — `TODO`
- POCO X7 Pro real device QA — `TODO`
- Android compacto adicional/emulador — `TODO`
- Billing/entitlement — `TODO`
- Privacy/LGPD review — `TODO`
- Release checklist Play Store — `TODO`

## Jornada A — Primeiro uso

Status: `TODO`

## Jornada B — Preparar aula

Status: `TODO`

## Jornada C — Dar aula

Status: `IN PROGRESS`

## Jornada D — Acompanhar aluno

Status: `TODO`

## Jornada E — Organizar materiais

Status: `TODO`

## Jornada F — Administrar produto

Status: `TODO`

## Blockers externos atuais

- Nenhum blocker externo deve ser inventado.
- Registrar aqui apenas dependências reais: credenciais, store, hardware, decisão legal, conflito humano de Git etc.

## Último checkpoint

Atualizar a cada rodada significativa:

- Data/hora: 14/09/2026 — checkpoint do hardening semanal V2
- Base: `origin/integration/android-1.0` em `c54bf01`; branch `codex/delivery-planning-week-v2`
- Tela/fluxo: a visão semanal mantém planos e atividades reais do dia selecionado, exclui arquivados, preserva planos sem momentos, ordena horários e mostra `Sem horário` de forma explícita; o card semanal estreito mantém a label inteira em 320px.
- Escopo não tocado: visão mensal, outras telas, billing, auth e migração de storage.
- Screenshot/evidência: `docs/qa/clean-room/planning-week-v2-hardening-412.png`, `docs/qa/clean-room/planning-week-v2-hardening-390.png`, `docs/qa/clean-room/planning-week-v2-hardening-320.png`; baseline `docs/qa/clean-room/planning-week-v2-412.png`.
- Testes executados: `pnpm test` (53/53), jornada semanal Playwright (9/9), `check:fast` e `git diff --check` passaram; matriz semanal cobre 320/360/390/412/432/480/600px e texto 130%.
- Commit: `1a164c6` (`Harden weekly planning V2`)
- PR: pendente de abertura após push desta branch.
- Blocker externo: o POCO X7 Pro foi encontrado via SDK ADB direto (`FMV455CMZXY5HYXS`, `2412DPC0AG`, `1220x2712`, density `520`), mas a instalação do APK deste branch falhou com `INSTALL_FAILED_UPDATE_INCOMPATIBLE` porque o pacote `br.com.assistentepedagogico.app.qa` já instalado usa outra assinatura. Não foi feito uninstall, `pm clear` ou exclusão de dados. As capturas físicas existentes são do pacote instalado `0.3.0-qa`, não deste HEAD; validação física do artefato atual permanece bloqueada até keystore compatível ou autorização explícita para remover o pacote.
- QA físico não destrutivo: abertura, navegação, rolagem, teclado, descarte seguro e reabertura passaram no pacote instalado. Pendências encontradas no instalado (a reproduzir no APK do branch): landscape com composição estreita/sobra de espaço, cobertura de conteúdo pela barra inferior em Perfil, atalho superior de perfil com navegação inesperada e ação de câmera terminando no DocumentsUI. Escala de texto conclusiva ficou bloqueada porque o app reiniciou durante a captura. Relatório do agente: `C:\Users\Usuário\Documents\Codex\2026-09-13\luna-alto-poco-qa\outputs\auditoria-fisica-poco-x7-pro.md`. Desempenho preliminar do instalado: 427 frames, 3 janky (0,70%), PSS total aproximado de 260 MB.
- Resultado: `IN PROGRESS`; nenhuma aprovação visual adicional foi declarada
- Próxima ação: validar no APK atual o fluxo de turma/histórico e continuar auditando superfícies profundas que ainda dependem de V1 antes de marcar M3 concluído

### BNCC — evidência e contratos

- A tela V2 não importa `BnccCatalogScreen`, `SkillPicker`, `ScreenHeader`, `Input` ou `Select`.
- A fonte curricular é `src/domain/bncc.ts`; favoritos e histórico permanecem em `bncc:favoritos`/`bncc:historico`.
- Nenhum código BNCC foi inventado; o catálogo é preservado localmente e funciona offline.

## Dívida visual conhecida

- Remover/evitar qualquer retorno para UI V1 em fluxos já migrados.
- Garantir palavras inteiras e copy PT-BR realista em todas as larguras.
- Preservar DNA Home V2 em cada destino.

## Dívida funcional conhecida

Registrar somente itens concretos encontrados durante implementação/teste.

## Regra de retomada

Ao reiniciar uma sessão:

1. sincronizar Git;
2. ler `AGENTS.md`;
3. ler `docs/CODEX_ANDROID_1_0_COMPLETION_MISSION.md`;
4. ler esta board;
5. localizar primeiro item `IN PROGRESS`; se não houver, pegar primeiro `TODO` da fila de menor milestone ainda incompleto;
6. continuar sem replanejar o produto do zero.

## Linha de chegada

Somente quando os critérios do documento de missão forem atendidos, registrar:

`ANDROID 1.0 PRODUCT COMPLETION CANDIDATE`
