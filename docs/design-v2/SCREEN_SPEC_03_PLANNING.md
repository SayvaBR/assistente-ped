# Volume 3 — Planejamento

Este volume define as telas 17–24.

## Recursos existentes a preservar/reusar

- `src/screens/PlanningScreen.jsx`
- `src/components/PlanningBoard.tsx`
- `src/screens/LessonPlanScreen.js`
- `src/screens/PedagogicalPlanningScreen.js`
- `src/screens/SkillPicker.js`
- `src/screens/BnccCatalogScreen.tsx`
- `src/screens/BnccInfantilScreen.js`
- `src/data/planRepository.ts`
- `src/components/usePlanAutosave.ts`
- `src/domain/lessonPlans.ts`
- `src/domain/bncc.ts`
- `src/data/bncc.json`
- `src/data/bncc-fundamental-medio.json`
- `references/bncc-extracted.json` e proveniência oficial como referência de conteúdo

A V2 deve decompor `PlanningBoard` em componentes menores quando isso melhorar manutenção e consistência.

---

# 17. Planejamento — visão geral

## Objetivo

Ser o hub de trabalho do planejamento, mostrando o que vem agora e permitindo criar plano/atividade sem transformar a tela em grid de atalhos.

## Layout

1. Header `Planejamento` + contexto de período atual.
2. Tabs/segmented: `Visão geral | Planos de aula | Atividades | BNCC`.
3. Resumo curto em linha: planos da semana, rascunhos, concluídos, atividades próximas. Não usar quatro cards iguais grandes; preferir métricas compactas.
4. Seção dominante `Próximas aulas` com 3–5 rows contendo disciplina, turma, data/hora, status do plano.
5. Seção `Planejamento rápido` com duas ações explícitas: `Novo plano de aula` e `Nova atividade`; podem ser botões largos lado a lado ou stacked, não tiles genéricos.
6. Seção opcional `Rascunhos recentes`.
7. BottomNavigation com Planejamento ativo.

## Comportamento

- tocar em aula com plano abre edição;
- aula sem plano abre criação pré-preenchida com turma/data/horário;
- filtros preservam seleção ao voltar;
- dados vêm de `planRepository`, não de cópia local para UI.

---

# 18. Planejamento diário

## Objetivo

Mostrar o dia como timeline de trabalho e permitir inserir/editar aulas rapidamente.

## Layout

1. TopBar com data (`Quinta-feira, 28 de agosto`) e botão calendário.
2. Segmented `Dia | Semana | Mês`, Dia ativo.
3. Date strip de 5–7 dias com atual selecionado.
4. Timeline vertical:
   - coluna de hora fixa/estreita;
   - linha temporal;
   - blocos de aula alinhados ao horário;
   - aula mostra disciplina, turma e tema/status;
   - compromisso não-aula tem estilo secundário.
5. Entre blocos, `Adicionar aula` contextual ou FAB único.
6. Rodapé de conteúdo opcional `Precisa de inspiração?` somente se houver recurso real, sem poluir a timeline.

## Comportamento

- tocar bloco abre detalhe/edição;
- long press não deve ser obrigatório para ação importante;
- criar aula pré-preenche data e, se acionado em slot, horário;
- conflitos de horário devem ser sinalizados, não silenciosamente sobrepostos.

## Acessibilidade

A timeline precisa manter ordem DOM cronológica. Não depender da posição gráfica para comunicar horário.

---

# 19. Planejamento semanal

## Objetivo

Dar visão comparativa dos dias sem perder legibilidade em mobile.

## Layout

1. TopBar com intervalo/semana e setas anterior/próxima.
2. Segmented `Dia | Semana | Mês`, Semana ativo.
3. Header de dias horizontal, hoje destacado.
4. Grade/timeline semanal:
   - horários na lateral;
   - colunas dos dias ou, em 360px, scroll horizontal controlado;
   - blocos de aula com cor semântica discreta por tipo/estado, não arco-íris decorativo;
   - planejamento/compromisso diferenciado por ícone/label além da cor.
5. FAB `+` para criar item.

## Responsividade

- 430px pode mostrar 5 dias úteis com blocos compactos;
- 360px pode usar 3 dias por viewport com snap/scroll horizontal;
- nunca reduzir texto a ilegível para “caber tudo”.

## Comportamento

Swipe/scroll horizontal não deve conflitar com back gesture. Navegação por setas sempre disponível.

---

# 20. Planejamento mensal

## Objetivo

Mostrar carga do mês e permitir localizar dias com aulas/planos rapidamente.

## Layout

1. TopBar `Agosto de 2024` + navegação mês anterior/próximo.
2. Segmented `Dia | Semana | Mês`, Mês ativo.
3. CalendarGrid com 7 colunas.
4. Cada dia:
   - número;
   - até 2–3 marcadores compactos de eventos/planos;
   - destaque de hoje e selecionado distintos.
5. Abaixo do calendário: seção do dia selecionado com lista cronológica.
6. FAB `+` para criar aula/compromisso, abrindo chooser simples se necessário.

## Regras

Não colocar texto completo de várias aulas dentro de cada célula. A célula comunica densidade; detalhes ficam na lista do dia.

---

# 21. Criar plano de aula

## Objetivo

Criar plano pedagógico completo com progressão clara, sem formulário infinito confuso.

## Campos essenciais

- Título da aula;
- Turma;
- Data;
- Componente curricular/disciplina;
- Duração ou horário;
- Status: rascunho/pronto/concluído/arquivado.

## Bloco pedagógico — o que ensinar

- Objetivo geral;
- Objetivos específicos opcionais;
- Conteúdo/objeto de conhecimento;
- Habilidades BNCC: código + descrição;
- Justificativa/contextualização opcional.

## Bloco metodológico — como dar a aula

- Metodologia/estratégia;
- Momentos da aula: abertura, desenvolvimento, fechamento;
- cada momento possui descrição + tempo estimado;
- materiais/recursos;
- avaliação/registro quando aplicável.

## Layout recomendado

1. TopBar `Novo plano de aula` + status de salvamento (`Rascunho salvo`).
2. Section `Identificação` com título/turma/data/disciplina/horário.
3. Section `O que vou ensinar`.
4. BNCC picker inline com habilidades selecionadas e botão `Selecionar habilidades`.
5. Section `Como vou dar a aula`.
6. `LessonMomentEditor` repetível para Abertura/Desenvolvimento/Fechamento; default três momentos, mas permitir editar tempos e adicionar etapas se modelo permitir.
7. Section `Materiais` usando chips/lista editável.
8. Section `Avaliação e fechamento`.
9. Action footer: `Salvar rascunho` secundário / `Marcar como pronto` primário quando válido.

## Autosave

Usar `usePlanAutosave.ts` e `planRepository.ts`. Autosave deve ser debounceado, indicar salvamento e nunca sobrescrever silenciosamente uma versão mais nova sem estratégia.

## Validação

Rascunho aceita campos incompletos. `Pronto` exige essenciais definidos. Erro de storage preserva edição em memória e mostra estado recuperável.

---

# 22. Editar plano de aula

## Objetivo

Editar o mesmo modelo da tela 21 sem criar duas arquiteturas diferentes.

## Diferenças da criação

- título `Plano de aula` + menu overflow;
- badge/status atual;
- `Última edição` discreta;
- campos preenchidos;
- ação `Duplicar plano` disponível no menu;
- `Arquivar` no menu, destrutivo leve com confirmação;
- `Excluir` apenas se regra de produto permitir e com confirmação forte;
- `Iniciar aula` contextual quando data/estado fizer sentido.

## Conflitos/persistência

Se o plano foi atualizado externamente/por restauração, não sobrescrever sem detectar versão quando infraestrutura permitir. Ao menos recarregar conscientemente e alertar usuário.

---

# 23. Habilidades BNCC

## Objetivo

Selecionar habilidades de forma confiável, filtrável e adequada à etapa/ano/componente, usando dados oficiais locais.

## Layout

1. TopBar `Habilidades BNCC` + ação `Concluir` quando em modo picker.
2. Context summary da turma/plano: etapa, ano/série, componente.
3. SearchField por código ou palavra-chave.
4. Filtros em chips/controls: etapa, ano, componente/unidade temática quando aplicável.
5. Lista de `BNCCSkillRow`:
   - checkbox/selection control;
   - código forte (`EF15LP03`);
   - descrição em 2–4 linhas;
   - metadata secundária se útil;
   - expandir para texto completo, se truncado.
6. Sticky selection summary: `3 habilidades selecionadas` + `Adicionar ao plano`.

## Dados

Usar `src/domain/bncc.ts`, `src/data/bncc*.json` e manter proveniência. Não inventar códigos/descrições.

## Educação Infantil

Usar modelo próprio quando necessário (`BnccInfantilScreen.js`/dados correspondentes); não forçar estrutura de habilidades do Fundamental/Médio em Infantil.

## Performance

Dataset grande deve usar filtragem eficiente; não renderizar milhares de rows simultaneamente sem virtualização/paginação lógica.

---

# 24. Criar atividade

## Objetivo

Criar atividade ligada a turma/plano/BNCC com foco em aplicação prática.

## Layout

1. TopBar `Nova atividade`.
2. Identificação: título, turma, data prevista, disciplina.
3. Tipo: exercício, tarefa, produção, avaliação formativa, atividade prática etc.; só categorias úteis.
4. Instruções/descritivo principal em TextArea.
5. Materiais/anexos opcionais.
6. BNCC associada com picker reutilizado da tela 23.
7. Critério de acompanhamento/avaliação opcional.
8. CTA `Salvar atividade`.

## Integração

Se iniciada de um plano, pré-preencher turma/disciplina/BNCC e manter vínculo. Atividade salva deve aparecer no planejamento e atividade recente.

## Anexos

Usar fluxo de arquivos existente; não guardar Base64 gigante em state. Integrar com `files.js`/Filesystem quando aplicável.

## Gate deste volume

Capturar visão geral, Dia/Semana/Mês em 360/390/430px, criação e edição de plano com teclado aberto, autosave normal/erro, BNCC com busca/seleção/empty e criação de atividade. Testes: `tests/planning.test.ts`, E2E `planning-board.pw.ts`, `bncc.pw.ts` e novos testes específicos para V2.