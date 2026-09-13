# Volume 4 — Turmas, Alunos e Acadêmico

Este volume define as telas 25–32.

## Recursos existentes a preservar/reusar

- `src/screens/ClassesScreen.js`
- `src/screens/ClassScreen.js`
- `src/screens/ClassManager.tsx`
- `src/screens/StudentScreen.js`
- `src/screens/NewStudentScreen.js`
- `src/screens/StudentImportScreen.tsx`
- `src/screens/AttendanceScreen.js`
- `src/screens/ObservationScreen.js`
- `src/screens/AcademicScreen.tsx`
- `src/data/classes.js`
- `src/data/academicRepository.ts`
- `src/data/studentCleanup.ts`
- `src/domain/academic.ts`
- `src/domain/attendance.ts`
- `src/domain/studentImport.ts`
- `src/domain/models.ts`

Dados de alunos são sensíveis e não podem ser enviados a analytics.

---

# 25. Turmas — visão geral

## Objetivo

Mostrar turmas ativas, contexto rápido e permitir entrar na rotina da turma sem parecer um grid genérico.

## Layout

1. Header `Turmas` + seletor de ano letivo se necessário.
2. Context strip com quantidade de turmas/alunos e próxima aula; compacto.
3. Lista vertical de `ClassRow`/`ClassSummaryBlock`:
   - nome da turma forte;
   - etapa/ano;
   - quantidade de alunos;
   - próxima aula/horário quando existir;
   - pequeno status de frequência do dia se útil;
   - ação principal implícita ao tocar a linha.
4. CTA `Criar turma` no topo ou FAB, não ambos sem necessidade.
5. BottomNavigation com Turmas ativo.

## Empty

Mostrar guided state com explicação + `Criar primeira turma`; sem quatro cards vazios.

---

# 26. Detalhe da turma

## Objetivo

Ser o hub contextual da turma.

## Layout

1. TopBar com `5º Ano A`, subtítulo `24 alunos`, ação configurações da turma.
2. TabBar `Visão do dia | Alunos | Frequência | Registros`.
3. Em `Visão do dia`:
   - próxima aula/tema;
   - resumo de frequência atual;
   - registros recentes relevantes;
   - pendências;
   - ações contextuais `Fazer chamada` / `Registrar observação`.
4. Sem grid de atalhos fixo.

## Ação de configurações

Abre edição da turma: nome, etapa, ano/série, turno, disciplina, ano letivo, arquivar. Excluir turma exige fluxo destrutivo forte e considerar dados vinculados.

---

# 27. Lista de alunos

## Objetivo

Localizar e gerenciar alunos com rapidez.

## Layout

1. Tab `Alunos` dentro da turma.
2. SearchField.
3. Filter/sort secundário: A–Z, frequência, pendências quando houver necessidade real.
4. `StudentRow` vertical:
   - avatar/iniciais;
   - nome;
   - metadata curta opcional;
   - indicador contextual (ex.: falta recente), sem expor excesso de dados;
   - tocar abre perfil.
5. CTA `Adicionar aluno` visível.
6. Importar lista disponível no menu/ação secundária.

## Adicionar aluno

Form com nome obrigatório e campos mínimos úteis. Evitar coletar informação pessoal que o produto não usa.

## Importar

Reusar `StudentImportScreen.tsx` e `domain/studentImport.ts`. Preview antes de confirmar importação; mostrar duplicidades/erros por linha.

---

# 28. Perfil do aluno

## Objetivo

Concentrar informações pedagógicas relevantes de um aluno sem parecer prontuário clínico ou expor dado desnecessário.

## Layout

1. TopBar voltar + overflow.
2. Identity header compacto: avatar, nome, turma.
3. Tabs/sections: `Resumo | Frequência | Registros | Avaliações` quando aplicável.
4. Resumo:
   - frequência recente;
   - últimos registros pedagógicos;
   - próximas avaliações/atividades;
   - notas/indicadores acadêmicos apenas se módulo ativo.
5. Ações contextuais: `Registrar observação`, `Ver frequência`, `Adicionar avaliação`.

## Privacidade

- não mostrar informação sensível fora do necessário;
- não enviar dados a analytics;
- exclusão/remoção do aluno deve considerar relações e usar `studentCleanup.ts`.

## Excluir/remover aluno

Menu overflow -> `Remover da turma` / `Excluir dados` conforme modelo. Confirmar impacto, listar dados que serão removidos, e nunca apagar silenciosamente registros de outra turma.

---

# 29. Frequência

Esta é a visão histórica/analítica, distinta da chamada rápida da tela 13.

## Layout

1. Tab Frequência.
2. Period selector: mês/período.
3. Summary metrics: presença %, faltas, justificadas.
4. Calendar/heatmap acessível ou lista por data; cor nunca única forma de comunicar.
5. Lista de dias com sessão registrada; tocar abre detalhe daquela chamada.
6. Filtro por aluno quando partindo da turma; no perfil do aluno, contexto já fixo.

## Cálculo

Usar `domain/attendance.ts`; percentuais devem ter denominador correto e não contar dias sem sessão registrada como falta.

## Exportação

Se disponível, ação `Exportar frequência` usa export/PDF existente; verificar se não inclui dados além do necessário.

---

# 30. Registros pedagógicos

## Objetivo

Navegar observações e registros da turma/aluno cronologicamente.

## Layout

1. Tab `Registros`.
2. Filtros: todos, comportamento, participação, aprendizagem, outro; aluno opcional.
3. Timeline/lista por data.
4. `ObservationRow`:
   - tipo;
   - aluno quando contexto é turma;
   - excerpt de 1–2 linhas;
   - data/hora;
   - indicador de anexo se houver.
5. FAB/CTA `Nova observação`.

## Detalhe

Tocar abre detalhe com texto completo, metadata e ações editar/excluir se permitido. Excluir exige confirmação e atualiza histórico/Home.

---

# 31. Histórico do aluno

## Objetivo

Unificar eventos importantes do aluno em ordem cronológica sem misturar tudo em uma tabela difícil.

## Layout

1. Header/contexto do aluno.
2. Filter chips: `Todos | Frequência | Registros | Avaliações | Atividades`.
3. Timeline cronológica com agrupamento por mês/data.
4. Cada evento usa ícone pequeno + título + contexto + data; visual diferenciado por tipo, mas sem arco-íris decorativo.
5. `Carregar mais`/paginação se histórico extenso.

## Regras

- manter estabilidade cronológica;
- evento removido não deve gerar link quebrado;
- eventos de dados sensíveis não vão para logs externos.

---

# 32. Notas e avaliações

## Objetivo

Registrar avaliações e resultados com cálculo acadêmico correto e rastreável.

## Layout da turma

1. Header `Avaliações` + período/bimestre/trimestre quando aplicável.
2. Summary do período: avaliações cadastradas, média/regras configuradas.
3. Lista de avaliações:
   - título;
   - data;
   - peso/valor;
   - componente;
   - status de lançamento (`12/24 notas lançadas`).
4. CTA `Nova avaliação`.

## Criar avaliação

- nome;
- data;
- turma/disciplina;
- valor máximo;
- peso se sistema usar;
- período;
- descrição opcional;
- vínculo com atividade/plano opcional;
- salvar.

## Lançar notas

Tela densa:

1. header da avaliação;
2. row por aluno: nome + numeric input/status;
3. navegação de teclado eficiente;
4. autosave ou batch save claramente indicado;
5. validação `0 <= nota <= valor máximo`;
6. ausente/não avaliado deve ser estado explícito, não nota zero automática.

## Cálculo

Usar `domain/academic.ts` e `academicRepository.ts`. Não duplicar fórmulas na UI. Qualquer mudança de fórmula exige teste unitário e documentação.

## Perfil do aluno

Em `Avaliações`, mostrar resultados, média e evolução apenas de forma pedagogicamente responsável. Não usar ranking competitivo por padrão.

## Gate deste volume

Screenshots: lista de turmas com/sem dados, detalhe da turma, lista de alunos, perfil, frequência histórica, registros, histórico, avaliações e lançamento de notas com teclado. Testes: `tests/academic.test.ts`, `tests/domain.test.ts`, E2E `academic-saving.pw.ts`, importação e novos fluxos V2. Validar limpeza/exclusão com `studentCleanup.test.ts`.