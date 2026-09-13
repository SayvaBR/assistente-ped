# Home V2 Clean Room — primeiro render

Branch: `codex/5-v2-clean-room`

PR: [#8](https://github.com/SayvaBR/assistente-ped/pull/8)

Esta captura registra uma iteração do render real da Home V2 no Visual Lab, em 390px — o viewport-âncora do target Lovable. A composição foi construída em `src/v2/` sem importar a arquitetura visual V1.

## O que este marco prova

- saudação/data e avatar de contexto;
- aula em foco como objeto dominante;
- ações `Fazer chamada` e `Ver plano`;
- dois comandos contextuais, sem grid de oito atalhos;
- agenda em timeline com estados de cor semânticos;
- navegação inferior com indicador de seleção;
- tipografia local Fredoka para títulos e Nunito Sans para corpo;
- ausência de truncamento essencial e overflow nos 7 stress points responsivos;
- adapter de produção que transforma perfil, turma, planos, frequência e agenda local em view-model V2;
- estado sem aula e agenda vazia preservado quando os dados reais não existem.

## Limite deste marco

O screenshot usa fixture sintética somente para comparação visual pública, sem dados de alunos. A Home no fluxo principal já recebe dados locais reais através do controlador existente, incluindo o estado sem aula/agenda observado no navegador. Persistência de ações e demais estados operacionais continuam sob o controlador/repositórios existentes e precisam de uma rodada específica de QA antes de `READY FOR DESIGN REVIEW — HOME V2`.

![Home V2 Clean Room — 390px](home-v2-clean-room-390.png)

## Frequência V2 — primeiro fluxo do anel

O target operacional é a referência aprovada de Frequência: contexto da turma, tab Frequência selecionada, data, resumo semântico, busca, rows densas, status acionável, salvar e bottom navigation. A primeira implementação foi renderizada em `390px` e depois conectada à rota real `chamada` no `App`.

![Frequência V2 — 390px](frequency-v2-clean-room-390.png)

Evidência de continuidade usando fixture sintética:

- antes: [Home V2](home-to-frequency-before-390.png);
- depois de tocar `Fazer chamada`: [Frequência V2](home-to-frequency-after-390.png).

A captura pública não usa os dados locais do aparelho. A auditoria dos destinos restantes está em [V2_HOME_FLOW_MIGRATION_CHECKLIST.md](../../V2_HOME_FLOW_MIGRATION_CHECKLIST.md).

Estados exercitados no mesmo harness: [loading](frequency-v2-loading-390.png), [erro recuperável](frequency-v2-error-390.png), [offline](frequency-v2-offline-390.png) e [vazio](frequency-v2-empty-390.png).
