# Direção visual e UX — Caderno Vivo

Atualizada em 12/09/2026. Esta é a proposta de direção para transformar o Assistente Pedagógico em um produto único, profissional e reconhecível. O produto é **mobile-only**; navegador/desktop serve apenas para desenvolvimento, inspeção e testes automatizados, não como superfície de lançamento.

## Ideia central

O app deve parecer uma **mesa de preparo do professor**: abrir, entender o que pede atenção hoje, registrar rapidamente e retomar o restante depois. A metáfora aparece em marcadores, abas, divisores e estados de progresso; não em uma coleção de cartões decorativos ou em um claymorphism genérico.

Posicionamento:

> O espaço de trabalho local do professor para preparar, registrar e retomar a rotina pedagógica sem perder tempo entre aplicativos.

Promessa:

> Menos troca de contexto. Mais presença para ensinar.

## Personalidade e linguagem

- Acolhedora, sem infantilizar o professor.
- Confiável: sempre diferencia salvo no dispositivo, exportado, sincronizado e disponível na loja.
- Prática: uma ação principal por tela e captura rápida antes de organização detalhada.
- Pedagógica: explica o significado do registro e não transforma dados em métricas vazias.

Preferir “Salvo neste dispositivo”, “Você pode continuar offline”, “Revisar antes de exportar” e “Tentar novamente”. Evitar urgência comercial artificial, jargão de dashboard e mensagens genéricas de erro.

## Sistema visual de convergência

Usar uma base quente e neutra, com teal reservado para ação e foco, e azul/ciano apenas quando uma ilustração realmente precisar. O master indigo/Fredoka/claymorphism não será normativo.

| Token | Valor | Uso |
| --- | --- | --- |
| `ink-900` | `#172522` | títulos e texto principal |
| `ink-700` | `#38514B` | texto secundário prioritário |
| `ink-500` | `#687772` | metadados e ajuda |
| `canvas` | `#F7F7F4` | fundo |
| `surface` | `#FFFEFA` | cartões, campos e sheets |
| `surface-soft` | `#F0F1ED` | agrupamentos neutros |
| `action` | `#176B61` | CTA, foco e seleção |
| `brand-teal` | `#176B61` | links e estados ativos |
| `attention` | `#A56B32` | pendência |
| `success` | `#3D876B` | concluído/salvo |
| `danger` | `#B45F5F` | falha e exclusão |
| `border` | `#DDE5E1` | contornos e divisores |

Tipografia: system UI/SF Pro equivalente, com Nunito Sans como fallback de compatibilidade. Usar 30/36 para display, 22/28 para título, 18/24 para seção, 16/24 para corpo, 14/20 para labels e 12/18 apenas para metadados.

Forma: cartões 16px, controles 12px, sheets 24px, ritmo 4/8px e sombras curtas. Ícones Lucide com stroke consistente; emoji nunca é a única estrutura de interface.

## Hierarquia e navegação

1. Hoje antes de tudo: chamada, próximo compromisso e próximo plano.
2. Uma ação primária por tela.
3. Turma, data e estado de salvamento aparecem antes da ação.
4. Capturar agora, organizar depois.
5. Rascunho, salvo, pendente, concluído e erro permanecem legíveis sem depender apenas de cor.
6. Complexidade fica atrás de uma porta: BNCC, filtros avançados e relatórios personalizados entram progressivamente.

Manter cinco destinos móveis: **Arquivos · Planejamento · Início · Turma · Mais**. Não criar sidebar, rail ou layout desktop. O bloco duplicado “Acesso por área” em Mais deve ser removido ou convertido em busca de comandos. `Mais > Configurações` deve ser o caminho canônico para preferências.

Atalhos prioritários na Home: Registro, Chamada, Planejamento e Arquivos. A Home deve separar “Agora”, “Próximo” e “Acesso rápido”, reduzindo a sensação de lista contínua. Atalhos secundários permanecem acessíveis, mas em uma lista agrupada e sem oito cartões concorrendo entre si.

## Motion system

Motion explica causa e efeito, sem decorar cada toque:

| Token | Valor | Uso |
| --- | --- | --- |
| `motion-touch` | 120–150ms, ease-out | pressão e seleção |
| `motion-state` | 180–220ms, ease-out | seção/status/badge |
| `motion-screen` | 220–280ms | navegação entre telas |
| `motion-sheet` | 280–360ms, spring suave | modal e sheet |
| `motion-stagger` | 30–45ms por item | listas curtas, até 4–6 itens |
| `motion-exit` | 60–70% da entrada | fechar/remover/voltar |

Regras: feedback em até 100ms; transições canceláveis; transformar/opacidade em vez de animar layout; autosave comunica por status; presença usa confirmação de ícone sem deslocar layout; `prefers-reduced-motion` elimina parallax, stagger e deslocamentos, mantendo o feedback essencial.

## Fluxos prioritários para implementação

- **Rotina diária:** Início → chamada pendente → marcar status → concluir → resumo atualizado.
- **Preparar aula:** captura mínima → data/horário → momento → BNCC opcional → revisar → salvar rascunho/concluir.
- **Registrar:** Turma → aluno → observação/nota → autosave → histórico.
- **Relatório seguro:** tipo → período/conteúdo → prévia → revisar privacidade → PDF/CSV.
- **Materiais offline:** Arquivos → importar → permissão/seleção → progresso → abrir/compartilhar.

## Critérios de aceite visual

- Cada tela tem uma ação dominante e um estado vazio específico.
- Erro informa causa, impacto e recuperação; campos preenchidos permanecem.
- Áreas de toque têm pelo menos 48px e foco não fica escondido pela navegação/teclado.
- Texto normal atinge 4,5:1; status combina cor, ícone e texto.
- Fluxos preservam scroll, filtros e rascunho ao voltar.
- Validar 360–430px em Android real/emulador, portrait, TalkBack, teclado externo e predictive back. Larguras maiores só devem preservar o comportamento mobile sem introduzir uma versão desktop.

## Decisões pendentes

1. Caderno Vivo é a direção principal aprovada para a próxima rodada visual.
2. A duplicação de navegação em Mais foi removida; os cinco destinos principais permanecem exclusivamente na barra inferior.
3. Decidir se Escuro/OLED entra no primeiro lançamento ou após a validação do claro/sistema.
4. As ilustrações ficam restritas à entrada e a estados especiais; a nova peça editorial está em `public/reference-art/onboarding-editorial-v2.png`.
5. Manter explicitamente o escopo mobile-only; não há decisão pendente de rail/sidebar.
6. Confirmar responsável, canal de suporte, política final e fluxo de exclusão/exportação.

Auditoria completa gerada pela frente de design: `C:\Users\Usuário\Documents\Codex\2026-09-12\assistente-pedagogico-design\outputs\direcao-produto-ux-design-assistente-pedagogico.md`.
