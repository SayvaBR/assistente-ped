# Design System V2 — Component Catalog

Este catálogo define a biblioteca que o Codex deve construir e usar. Nomes são recomendados; podem ser adaptados à estrutura do projeto, mas a responsabilidade semântica de cada componente deve permanecer clara.

## 1. AppShell

Responsabilidade:

- safe areas;
- largura máxima do preview web;
- fundo V2;
- espaço para bottom nav;
- regiões principais da aplicação.

Não deve controlar conteúdo específico de tela.

Props conceituais:

```ts
type AppShellProps = {
  children: React.ReactNode;
  navigation?: React.ReactNode;
  background?: 'brand' | 'surface';
};
```

## 2. Screen

Wrapper de conteúdo com gutter, scroll e semântica.

Variantes:

- `standard` — tela utilitária;
- `dense` — chamada, alunos, arquivos, notas;
- `narrative` — onboarding, sucesso, paywall;
- `calendar` — dia/semana/mês.

## 3. TopBar / ScreenHeader

Anatomia:

- back opcional;
- título;
- subtítulo/contexto opcional;
- ação trailing opcional.

Regras:

- não usar título gigante quando a tela já tem muita informação;
- ação trailing só quando realmente útil;
- back button 48×48;
- título truncável com accessible label completo.

## 4. BottomNavigation

Destinos principais recomendados:

- Início;
- Planejamento;
- Turmas;
- Arquivos;
- Mais.

Regras:

- label sempre visível;
- ativo em azul forte;
- inativo em azul/cinza discreto;
- não envolver todos os ícones em quadrados coloridos;
- indicador ativo pode ser mudança de cor/peso e pequena superfície, nunca glow excessivo;
- estado deve sobreviver à navegação interna de cada área.

## 5. Button

Variantes:

### Primary

CTA dominante. Azul V2, texto branco, 54–58px, weight 850–900, depth 3–4px.

### Secondary

Superfície branca, borda azul-clara, texto navy. Não competir com primary.

### Tertiary / Text

Sem container pesado; para ações de menor prioridade.

### Danger

Somente ações destrutivas reais. Vermelho semântico, texto explícito.

### IconButton

48×48 mínimo. Tooltip/acessible name obrigatório.

Estados:

- default;
- pressed com depth reduzido;
- loading preservando largura;
- disabled sem parecer selecionado;
- focus-visible forte.

Não permitir dois `Primary` lado a lado salvo decisão crítica binária claramente justificada.

## 6. SegmentedControl

Usos:

- Dia / Semana / Mês;
- abas compactas mutuamente exclusivas;
- filtro de agenda.

Anatomia:

- container suave;
- item selecionado azul;
- item não selecionado com superfície clara;
- hit target >=48px.

Não usar para mais de 4–5 itens extensos.

## 7. Tabs

Para subseções mais complexas, por exemplo Turma: Visão do dia / Alunos / Frequência / Registros.

Regras:

- horizontal scroll se necessário;
- ativo com contraste inequívoco;
- não esconder labels em ícones;
- preservar posição quando troca de conteúdo.

## 8. Chip

Tipos:

- FilterChip;
- ChoiceChip;
- InputChip;
- StatusChip.

StatusChip é semântico; não é decoração.

Exemplos:

- Presente;
- Falta;
- Pendente;
- Rascunho;
- Concluído;
- Premium.

Não usar chip para frases longas.

## 9. Badge

Somente contagens/estados curtos, como `3`, `Novo`, `Pro`. Evitar badge em toda seção.

## 10. Field / Input

Anatomia obrigatória:

- label visível;
- input;
- helper opcional;
- erro opcional;
- contador opcional.

Variantes:

- text;
- email;
- password;
- number;
- date;
- time;
- search.

Regras:

- altura >=54px;
- placeholder não substitui label;
- erro persistente até correção;
- password toggle com accessible label;
- keyboard type apropriado no Android.

## 11. Textarea

Usos: observação, objetivo, metodologia, justificativa.

- altura mínima 120px;
- contador quando houver limite;
- autosize apenas se não provocar saltos de layout agressivos;
- feedback de salvamento/autosave quando aplicável.

## 12. Select / Combobox

Preferir native select quando suficiente. Para listas grandes, usar searchable combobox/sheet.

Exemplos:

- turma;
- etapa de ensino;
- componente curricular;
- turno;
- ano letivo.

## 13. SearchField

Usos: alunos, arquivos, BNCC.

- ícone de busca pode existir inline;
- clear button quando há texto;
- debounce quando busca for pesada;
- não esconder filtros essenciais atrás da busca.

## 14. Toggle / Checkbox / Radio

Usar componentes semanticamente corretos. Toggles para estado persistente binário; checkbox para múltiplas escolhas; radio para uma escolha em grupo.

## 15. SectionHeader

Anatomia:

- título;
- ação opcional `Ver tudo`, `Ver semana`, etc.

Sem card ao redor. Serve para criar ritmo e reduzir containers.

## 16. HeroBanner

Componente narrativo de destaque para Home/onboarding/contextos especiais.

Pode conter:

- copy curta;
- ilustração;
- CTA opcional;
- informação contextual.

Não usar em toda tela. É assinatura, não template obrigatório.

## 17. TodayLessonCard

Componente de domínio para “Sua aula de hoje”.

Conteúdo:

- disciplina;
- tema/resumo;
- turma;
- horário;
- status;
- ação principal contextual.

Deve ser mais expressivo que um card genérico e possuir hierarquia clara entre disciplina, tema e metadata.

## 18. QuickActionRow

Para 2–4 ações realmente frequentes, como Fazer chamada / Registrar observação.

Não virar grid 2×N permanente. Cada ação deve ter label curta e tratamento coerente; usar apenas onde reduz passos reais.

## 19. ActivityRow

Linha de atividade recente.

Anatomia:

- tipo de evento;
- título;
- contexto;
- tempo/data;
- affordance opcional.

Preferir lista com divisores a card por item.

## 20. Timeline

Base para agenda diária e planejamento diário.

Anatomia:

- coluna de horário;
- eixo visual;
- item/evento;
- status;
- conflito quando existir.

Precisa suportar scroll e itens sobrepostos sem perder leitura.

## 21. AgendaEvent

Variantes:

- aula;
- reunião;
- planejamento;
- atendimento;
- lembrete.

Cores podem diferenciar tipo apenas como apoio; ícone/label devem manter significado sem cor.

## 22. DateStrip

Faixa semanal horizontal.

- dia da semana;
- número;
- selecionado;
- hoje;
- indicador de conteúdo opcional.

Hit target >=48px.

## 23. CalendarMonth

Grade mensal.

Estados:

- dia atual;
- selecionado;
- fora do mês;
- com eventos;
- indisponível.

Não comprimir texto/eventos dentro da célula; usar dots/count e lista abaixo quando necessário.

## 24. WeekGrid

Planejamento semanal em grade temporal.

- horários no eixo vertical;
- dias no eixo horizontal;
- blocos de aula;
- drag/drop só se tiver alternativa acessível e persistência segura.

Em 360px pode usar scroll horizontal controlado em vez de esmagar conteúdo.

## 25. AttendanceSummary

Três métricas principais:

- presentes;
- faltas;
- pendentes.

Pode usar superfícies semânticas suaves. Números têm prioridade visual; cor não é único indicador.

## 26. StudentRow

Anatomia:

- avatar/fallback;
- nome;
- status/ação;
- menu opcional.

Na chamada, status deve mudar com toque rápido e ser reversível antes de salvar.

Nunca expor dados além do necessário na lista.

## 27. AttendanceStatusControl

Estados:

- presente;
- falta;
- justificado, se produto suportar;
- pendente.

Precisa de label textual e feedback imediato.

## 28. ObservationTypeSelector

Opções possíveis:

- comportamento;
- participação;
- aprendizagem;
- outro.

Usar choice chips/cards compactos; não grandes cards repetidos.

## 29. LessonPlanSummary

Mostra disciplina, turma, horário, tema, objetivo, materiais e BNCC de forma escaneável.

Quando editável, edição deve ser explícita, não esconder toda a tela em tiny edit icons.

## 30. MaterialChip / ResourceToken

Representa material curto: Texto impresso, Caderno, Lápis. Chips são adequados porque são unidades compactas reais.

## 31. BNCCSkillRow

Anatomia:

- código;
- descrição;
- componente/etapa quando necessário;
- selected state;
- ação de ver detalhes.

Descrições longas precisam de wrap; nunca cortar código/descrição crítica sem acesso ao conteúdo completo.

## 32. PlanningMetrics

Resumo de quantidade de planos, atividades, rascunhos e concluídos. Deve ser compacto; não usar quatro cards grandes com ícones decorativos.

## 33. FileRow / FolderRow

Anatomia:

- ícone de tipo;
- nome;
- metadata;
- favorito/status;
- menu.

Listas densas com divisores; cards apenas para destaques especiais.

## 34. EmptyState

Anatomia:

- ilustração ou ícone opcional;
- título;
- explicação curta;
- CTA real.

Não dizer apenas “Nada aqui”. Explicar como preencher o estado.

## 35. LoadingState

Preferir skeleton contextual ou progress discreto. Spinner infinito sem timeout/recuperação é proibido.

## 36. ErrorState

Anatomia:

- mensagem humana;
- consequência;
- ação de tentar novamente;
- alternativa quando necessário.

Erros técnicos detalhados ficam em logs, não na UI final.

## 37. SuccessState

Usar com parcimônia em marcos: onboarding concluído, assinatura confirmada, conta excluída, importação concluída. Ações rotineiras preferem toast/snackbar.

## 38. Snackbar / Toast

Para confirmação transitória, com live region acessível. Não esconder erros críticos em toast que desaparece.

## 39. Dialog

Para confirmação curta/decisão crítica.

- título objetivo;
- consequência clara;
- primary/secondary;
- danger quando destrutivo.

## 40. BottomSheet

Para seleção, filtros e ações contextuais mobile. Respeitar safe area, scroll e foco.

## 41. PaywallPlanCard

Conteúdo:

- nome do plano;
- preço vindo da loja;
- período;
- benefícios reais;
- seleção;
- badge “Mais escolhido” apenas se decisão de produto justificar.

Não hardcode preço comercial como fonte final quando RevenueCat/loja fornecer valor.

## 42. PaywallFeatureList

Benefícios concretos, não “recursos avançados”. Ícone check pode reforçar; texto deve ser a fonte de significado.

## 43. SubscriptionStatusCard

Para configurações/meu plano:

- plano atual;
- renovação/expiração;
- preço quando disponível;
- gerenciar/cancelar conforme regras da loja.

## 44. ProfileSummary

Avatar, nome, papel e ação de edição. Não precisa ser um card enorme; usar destaque proporcional.

## 45. SettingsGroup / SettingsRow

SettingsGroup agrupa semântica; SettingsRow contém label, descrição opcional, valor/controle e affordance.

Não aplicar ícone em quadradinho colorido em todas as linhas. Ícones são opcionais e devem ajudar orientação.

## 46. DestructiveActionPanel

Para exclusão de conta/dados.

- linguagem explícita;
- consequência irreversível;
- etapas de confirmação;
- autenticação quando aplicável;
- alternativa de exportar dados quando cabível.

## 47. Componentes que NÃO devem existir como abstração dominante

Evitar criar:

- `GenericFeatureCard` usado em toda tela;
- `DashboardTile` 2×N para qualquer função;
- `IconTile` obrigatório em todo row;
- `UniversalCard` que força conteúdo diferente na mesma anatomia;
- `Badge` decorativo automático;
- `GenericHero` em todas as telas.

O sistema deve ter primitives reutilizáveis e componentes de domínio com intenção própria.

## 48. Mapeamento do legado

`Card` atual: manter apenas como primitive temporária; novos fluxos devem preferir componentes semânticos acima.

`Input`: evoluir para Field/Input V2 com label, helper, error, loading/disabled e states padronizados.

`Select`: evoluir para Field/Select V2.

`Notice`: dividir semanticamente em InlineNotice, FieldError e StatusMessage.

`ActionBar`: substituir por padrões explícitos de StickyActionBar, FormActions ou ScreenActions conforme contexto.

`ScreenHeader`: pode evoluir para TopBar V2 mantendo API simples.

`PlanningBoard`: decompor progressivamente em DateStrip, Timeline, WeekGrid, CalendarMonth, LessonBlock e PlanningToolbar, evitando componente monolítico.
