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
4. Planejamento Dia/Semana/Mês — `TODO`
5. Turmas — `TODO`
6. Perfil do professor — `TODO`
7. Arquivos — `TODO`
8. Mais — `TODO`

## Milestone M1 — Primeiro anel da Home

- Home V2 — `VISUAL DIRECTION APPROVED`
- Frequência — `READY FOR DESIGN REVIEW`
- Registrar observação — `READY FOR DESIGN REVIEW`
- Compromissos / Agenda — `IN PROGRESS`
- Planejamento diário — `TODO`
- Planejamento semanal — `TODO`
- Planejamento mensal — `TODO`
- Turmas — `TODO`
- Perfil — `TODO`
- Arquivos — `TODO`
- Mais — `TODO`

### Critério M1

Nenhuma ação principal da Home cai em V1 e todos os destinos parecem o mesmo produto.

## Milestone M2 — Planejamento profissional completo

- Planejamento overview — `TODO`
- Criar plano — `TODO`
- Editar plano — `TODO`
- BNCC — `TODO`
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
- Relatórios — `TODO`

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
- Configurações — `TODO`
- Aparência/acessibilidade — `TODO`
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
- HEAD: `159112e` + Observação V2 local ainda não commitada
- Tela/fluxo: Compromissos / Agenda V2 — timeline e editor local
- Screenshot/evidência: `docs/qa/clean-room/commitments-v2-412.png`; Observação `observation-picker-412.png` / `observation-form-412.png`
- Testes executados: boundary, TypeScript, matriz V2, E2E Home/Frequência/Observação/Agenda, texto ampliado
- Resultado: `IN PROGRESS`; Observação `READY FOR DESIGN REVIEW — OBSERVAÇÃO V2`; Frequência continua `READY FOR DESIGN REVIEW`, Gate B ainda pendente
- Próxima ação: fechar QA de estados/persistência da Agenda, checkpoint Git e iniciar Planejamento Dia

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
