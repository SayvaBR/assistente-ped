# Primeiro anel da Home V2

Branch ativa: `codex/5-v2-clean-room`  
PR: [#8](https://github.com/SayvaBR/assistente-ped/pull/8) (draft)

A Home V2 é a direção visual aprovada. Esta checklist registra a continuidade dos destinos diretos sem transformar a rodada em migração em massa.

## Auditoria rápida

| Entrada na Home | Rota/ação atual | Estado visual | Próximo passo |
| --- | --- | --- | --- |
| Fazer chamada | `chamada` | **READY FOR DESIGN REVIEW — FREQUÊNCIA V2** | revisão visual externa + Gate B |
| Ver plano | `plano` / `LessonPlanScreen` | V1 | Planejamento Dia |
| Registrar observação | `registro-rapido` / `observacao` | **READY FOR DESIGN REVIEW — ObservationV2** | revisão visual + hardening Android/Gate A |
| Compromissos / agenda | `compromissos` | V2 em construção | hardening + revisão visual |
| Abrir turma | aba `turmas-v2` / `ClassesV2` | V2 em construção | cadastro/perfil de aluno |
| Avatar / perfil | `perfil-professor` / `ProfileV2` | V2 em construção | evidência + revisão visual |
| Planejamento | aba `plano` / `PlanningScreen` | V1 | Planejamento Dia, Semana, Mês |
| Turmas | aba `turmas-v2` | V2 em construção | cadastro/perfil de aluno |
| Arquivos | aba `biblioteca` / `FilesV2` | V2 em construção | lixeira/visualização e hardening |
| Mais | aba `mais` / `MoreV2` | V2 em construção | hardening + migração das preferências secundárias |
| BNCC | `bncc` / `BnccV2` | V2 em construção | seleção assistida no editor de plano |

## Frequência V2 — contratos preservados

- dados: `alunos`, turma ativa e data selecionada;
- domínio: `AttendanceStatus` com `presente`, `falta`, `atrasado`, `falta_justificada` e `saida_antecipada`;
- persistência: `repository.carregarChamadaPorData` e `repository.salvarChamadaPorData`;
- offline: a tela informa que o registro será salvo no dispositivo;
- erros: carregamento e salvamento possuem feedback recuperável;
- analytics: nenhuma informação de aluno ou dado pedagógico é enviado;
- acessibilidade: labels, foco nativo, status não dependente apenas de cor e alvos mínimos de 48px.

## Checklist de continuidade

- [x] Home V2 → rota real `chamada` monta a carroceria `FrequencyV2`.
- [x] Frequência nasce em `src/v2/` sem importar visual V1.
- [x] Fixture pública usa apenas dados sintéticos.
- [x] Screenshot do target e primeiro render comparados em 390px.
- [ ] aprovação externa: `VISUAL DIRECTION APPROVED — FREQUÊNCIA V2`;
- [ ] Gate B: estados ampliados, Android real, motion gravado e CI final.

Depois da aprovação visual da Frequência, avançar um único item por vez na ordem documentada em `docs/V2_HOME_FLOW_VISUAL_RING.md`.
