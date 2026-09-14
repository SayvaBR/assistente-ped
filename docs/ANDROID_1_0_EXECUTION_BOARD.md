# Android 1.0 Execution Board — Assistente Pedagógico

> **Função:** memória operacional da missão de conclusão do produto.
> **Atualizar continuamente.** Se a sessão cair, retomar daqui.

## Estado global

- Base de integração: `integration/android-1.0`
- Último PR integrado: `#48` (`cdb1213` → `d4df7fc`)
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

0. DevEx — UI Lab MVP — `FUNCTIONAL HARDENING`
   - Delivery Unit concluída: `UI Lab dev-only — registry de superfícies, fixtures sintéticas, scroll interno e screenshot direto`; PR `#39` integrado em `integration/android-1.0`.
1. Onboarding Entry V2 — `FUNCTIONAL HARDENING`
   - Delivery Unit concluída: `first-viewport hardening — headline em até três linhas, CTA no viewport inicial, preview direto Live Design e gate responsivo`; PR `#41` integrado em `integration/android-1.0`.
   - Delivery Unit em revisão: `WindowInsets reais + clearance de primeiro viewport e Discovery`; PR `#47` aberto no head `23215a9`; CI verde e revisão independente `PASS`, aguardando reteste físico pós-correção quando o aparelho voltar a aparecer no ADB.
2. DevEx — WindowInsets Android reais para WebView — `FUNCTIONAL HARDENING`
   - Delivery Unit concluída: `ponte de barras de sistema/display cutout para --android-safe-* em CSS logical px, com fallback web e reaplicação após carregamento`; PR `#43` integrado em `integration/android-1.0`.
3. Frequência / Fazer chamada V2 — `READY FOR DESIGN REVIEW`
4. Registrar observação — `READY FOR DESIGN REVIEW`
5. Compromissos / Agenda — `READY FOR DESIGN REVIEW`
6. Planejamento Dia/Semana/Mês — `FUNCTIONAL HARDENING`
   - Delivery Unit concluída: `Planejamento diário V2 — hardening funcional/responsivo`; PR `#14` integrado em `integration/android-1.0`.
   - Delivery Unit concluída: `Planejamento semanal V2 — hardening funcional/responsivo`; PR `#20` integrado em `integration/android-1.0`.
   - Delivery Unit concluída: `Planejamento mensal V2 — hardening funcional`; PR `#31` integrado em `integration/android-1.0`.
7. Turmas — `IN PROGRESS`
8. Perfil do professor — `FUNCTIONAL HARDENING`
   - Delivery Unit concluída: `Perfil profissional V2 — hardening de salvar/recuperar dados textuais`; PR `#35` integrado em `integration/android-1.0`.
9. Arquivos — `IN PROGRESS`
10. Mais — `IN PROGRESS`
   - Delivery Unit concluída: `Ferramentas de sala V2 — hardening de timer, cronômetro e calculadora`; PR `#37` integrado em `integration/android-1.0`.
11. BNCC — `IN PROGRESS`
12. Relatórios — `IN PROGRESS`
13. Configurações — `IN PROGRESS`
14. Aparência — `IN PROGRESS`
15. Onboarding — `FUNCTIONAL HARDENING`

16. Home V2 — `FUNCTIONAL HARDENING`
   - Delivery Unit concluída: `bottom navigation — label Plano sem quebra artificial, navegação do preview, touch targets, altura curta e escala de texto 200%`; PR `#48` integrado em `integration/android-1.0`.

## Milestone M1 — Primeiro anel da Home

- Home V2 — `VISUAL DIRECTION APPROVED`
- Frequência — `READY FOR DESIGN REVIEW`
- Registrar observação — `READY FOR DESIGN REVIEW`
- Compromissos / Agenda — `READY FOR DESIGN REVIEW`
- Planejamento diário — `FUNCTIONAL HARDENING` (PR #14 integrado; filtros de arquivados, erro/retry de atividades, momentos sem horário e evidência 320/412 px cobertos)
- Planejamento semanal — `FUNCTIONAL HARDENING` (PR #20 integrado; jornada semanal e matriz 320/360/390/412/432/480/600px cobertas)
- Planejamento mensal — `FUNCTIONAL HARDENING` (PR #31 integrado; seleção mensal, clamp de dias inválidos, planos sem momento, filtros arquivados e matriz 360/412/480px cobertos)
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
- Histórico — `IN PROGRESS` (workspace V2 mostra resumo local por aluno, linha do tempo compacta dos últimos registros pedagógicos reais e chamadas salvas agrupadas por data; PR #33 extrai a agregação read-only, ordena datas mais recentes primeiro, conta presente/falta/falta justificada/atrasado/saída antecipada, limita a seis datas e preserva o `dataKey` ao abrir Frequência; ainda falta validar o APK atual no POCO)
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

- Perfil profissional — `FUNCTIONAL HARDENING` (PR #35 cobre normalização, recuperação do draft após erro, sincronização segura do perfil recebido e feedback acessível; foto/câmera permanece fora do escopo)
- Gerenciar turmas — `IN PROGRESS`
- Ferramentas de sala — `IN PROGRESS` (timer com presets/pausa/reset/estado concluído, cronômetro isolado e calculadora com decimal, erro de divisão por zero e limpeza; Lanterna permanece separada por depender de hardware)
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

- `adb devices` ficou vazio após a instalação do APK QA do PR #47; reteste físico pós-correção está bloqueado até o telefone reaparecer como `device`. Não executar uninstall, `pm clear` ou exclusão de dados.
- Registrar aqui apenas dependências reais: credenciais, store, hardware, decisão legal, conflito humano de Git etc.

## Último checkpoint

Atualizar a cada rodada significativa:

- Data/hora: 14/09/2026 — checkpoint Home V2 bottom navigation + onboarding WindowInsets
- Base: `origin/integration/android-1.0` em `d4df7fc`; Home worker `codex/home-nav-polish`; onboarding PR `#47` ainda aberto
- Tela/fluxo: Home V2 mantém `Plano` visível em uma linha, aria-label completo `Planejamento`, navegação por toque no preview, targets >=48px, clearance em 412x720 e separação em 360px/200%; PR #48 integrado. Onboarding usa os tokens `--v2-safe-*`, mantém rolagem e cobre Entry → Discovery em runtime; PR #47 aguarda apenas reteste físico pós-correção.
- Evidência visual: Live Design/HMR em `?v2-preview=home&width=412`; crítica perceptiva final `PASS`; checkpoints 360/390/412 e altura curta executados. A aba visível foi mantida na Home.
- Escopo não tocado: regras de produto/UX em discussão, Issue #28 Design Supervisor, alunos, deficiência/apoios, atividades de casa, Arquivos, três etapas, fotos, BNCC Computação, PRODUCT_UX_AUTHORITY, billing, auth, notificações, backup e `main`.
- Evidência formal anterior preservada: `docs/qa/ui-lab/home-v2-412.png` e screenshots de Onboarding Entry; E2E do UI Lab e matriz visual continuam cobertos pelos PRs anteriores.
- Testes executados nesta unidade: `pnpm run check:fast`, `pnpm run build`, `pnpm run android:sync`, `./gradlew :app:assembleQa`, `git diff --check`; o teste unitário Android compilou, mas o executor local falhou antes de rodar por `ClassNotFoundException: worker.org.gradle.process.internal.worker.GradleWorkerMain`; CI exato `34855675784` verde, incluindo `validate` e `Build Android QA APK`.
- Revisão: Cicero encontrou e o worker corrigiu race de publicação pós-load e guarda do fallback sem WebView; re-revisão final `PASS` no SHA `55e1eb6`.
- Commit/PR: `cdb1213` (`Keep Home nav readable at large text scale`), PR [#48](https://github.com/SayvaBR/assistente-ped/pull/48) integrado em `d4df7fc`. PR [#47](https://github.com/SayvaBR/assistente-ped/pull/47) permanece aberto para reteste físico do onboarding.
- Blocker externo: o POCO X7 Pro apareceu inicialmente como `FMV455CMZXY5HYXS device` e o APK `br.com.assistentepedagogico.app.v2qa` foi instalado com `adb install -r` sem tocar nos pacotes antigos. Após o build QA da correção de onboarding, `adb devices` ficou vazio; não foi feito uninstall, `pm clear` ou exclusão de dados. O reteste físico pós-correção permanece bloqueado até reconexão do aparelho.
- QA físico não destrutivo: abertura, navegação, rolagem, teclado, descarte seguro e reabertura passaram no pacote instalado. Pendências encontradas no instalado (a reproduzir no APK do branch): landscape com composição estreita/sobra de espaço, cobertura de conteúdo pela barra inferior em Perfil, atalho superior de perfil com navegação inesperada e ação de câmera terminando no DocumentsUI. Escala de texto conclusiva ficou bloqueada porque o app reiniciou durante a captura. Relatório do agente: `C:\Users\Usuário\Documents\Codex\2026-09-13\luna-alto-poco-qa\outputs\auditoria-fisica-poco-x7-pro.md`. Desempenho preliminar do instalado: 427 frames, 3 janky (0,70%), PSS total aproximado de 260 MB.
- Resultado: `FUNCTIONAL HARDENING`; a ponte de safe areas Android foi implementada sem mudança de tela, sem mudança de semântica pedagógica ou das decisões de produto adiadas.
- Próxima ação: sincronizar a integration, conferir issues/PRs ativos e escolher a próxima DU P0/P1 estreita e segura; não tratar o Issue #28 ou o PR documental #26 como bloqueadores, nem iniciar em massa as decisões do `PRODUCT_UX_AUTHORITY.md`.

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
