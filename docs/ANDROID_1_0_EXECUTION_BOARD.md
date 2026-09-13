# Android 1.0 Execution Board — Assistente Pedagógico

> **Função:** memória operacional da missão de conclusão do produto.
> **Atualizar continuamente.** Se a sessão cair, retomar daqui.

## Estado global

- Branch ativa: `codex/5-v2-clean-room`
- PR ativo: `#8`
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
3. Compromissos / Agenda — `IN PROGRESS`
4. Planejamento Dia/Semana/Mês — `IN PROGRESS`
5. Turmas — `IN PROGRESS`
6. Perfil do professor — `IN PROGRESS`
7. Arquivos — `IN PROGRESS`
8. Mais — `IN PROGRESS`
9. BNCC — `IN PROGRESS`
10. Relatórios — `IN PROGRESS`
11. Configurações — `IN PROGRESS`
12. Aparência — `IN PROGRESS`

## Milestone M1 — Primeiro anel da Home

- Home V2 — `VISUAL DIRECTION APPROVED`
- Frequência — `READY FOR DESIGN REVIEW`
- Registrar observação — `READY FOR DESIGN REVIEW`
- Compromissos / Agenda — `IN PROGRESS`
- Planejamento diário — `IN PROGRESS`
- Planejamento semanal — `IN PROGRESS`
- Planejamento mensal — `IN PROGRESS`
- Turmas — `IN PROGRESS`
- Perfil — `IN PROGRESS`
- Arquivos — `IN PROGRESS`
- Mais — `IN PROGRESS`

### Critério M1

Nenhuma ação principal da Home cai em V1 e todos os destinos parecem o mesmo produto.

## Milestone M2 — Planejamento profissional completo

- Planejamento overview — `TODO`
- Criar plano — `IN PROGRESS`
- Editar plano — `IN PROGRESS`
- BNCC — `IN PROGRESS`
- Criar atividade — `TODO`
- Autosave — `TODO`
- Status rascunho/pronto/concluído/arquivado — `TODO`
- Integração Home/calendário — `TODO`

## Milestone M3 — Turmas e alunos

- Visão geral de turmas — `TODO`
- Detalhe da turma — `TODO`
- Lista de alunos — `TODO`
- Perfil do aluno — `TODO`
- Frequência — `TODO`
- Registros pedagógicos — `TODO`
- Histórico — `TODO`
- Notas/avaliação — `TODO`

## Milestone M4 — Arquivos e relatórios

- Arquivos overview — `TODO`
- Pastas — `TODO`
- Recentes — `TODO`
- Favoritos — `TODO`
- Importação/captura — `TODO`
- Visualização — `TODO`
- Lixeira — `TODO`
- Relatórios — `IN PROGRESS`

## Milestone M5 — Onboarding, conta e monetização

- Splash — `TODO`
- Onboarding — `TODO`
- Cadastro — `TODO`
- Login / recuperação — `TODO`
- Configuração professor — `TODO`
- Primeira turma — `TODO`
- Personalização — `TODO`
- Escolha de plano — `TODO`
- Paywall — `TODO`
- Purchase/trial/restore — `TODO`
- Confirmação — `TODO`
- Entrada na Home — `TODO`

## Milestone M6 — Mais, configurações e lifecycle

- Perfil profissional — `TODO`
- Gerenciar turmas — `TODO`
- Ferramentas de sala — `TODO`
- Notificações — `TODO`
- Mais hub — `TODO`
- Configurações — `IN PROGRESS`
- Aparência/acessibilidade — `IN PROGRESS`
- Privacidade/segurança — `TODO`
- Backup/sync — `TODO`
- Ajuda/suporte — `TODO`
- Sobre — `TODO`
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

- Data/hora: 13/09/2026
- Branch: `codex/5-v2-clean-room`
- HEAD: `2235960`
- Tela/fluxo: BNCC → editor por `prefill`, Relatórios V2 e Configurações/Aparência V2 integrados às rotas reais
- Screenshot/evidência: renders reais no Visual Lab em 412px: `?v2-preview=bncc`, `?v2-preview=reports`, `?v2-preview=settings`, `?v2-preview=appearance`
- Testes executados: boundary, TypeScript, 46 E2E V2, 50 testes unitários, build, `android-sync` e `android:qa`; APK QA gerado
- Resultado: `IN PROGRESS`; Frequência/Observação continuam `READY FOR DESIGN REVIEW`, Gate B ainda pendente
- Próxima ação: migrar subfluxos de conta/dados e planejamento restante sem regressão funcional

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
