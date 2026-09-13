# V2 Adapters

Esta camada traduz contratos funcionais existentes para view models da V2.

Use adapters quando uma tela precisar de dados do legado, para que `src/v2/screens` não dependa de detalhes de implementação visual/estrutural da V1.

Exemplos de responsabilidade:

- próxima aula -> `HomeLessonViewModel`;
- resumo de frequência -> `AttendanceSummaryViewModel`;
- agenda -> `AgendaItemViewModel`;
- estados offline/error/loading -> estados explícitos para a view.

Adapters não devem importar componentes, CSS ou screens V1.
