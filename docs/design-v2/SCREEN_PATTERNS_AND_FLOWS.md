# Design System V2 — Screen Patterns & Flows

Este documento traduz a identidade V2 para fluxos reais. Ele não congela cada pixel; define a hierarquia, responsabilidade e composição que o Codex deve preservar.

## Regra geral de tela

Toda tela precisa deixar claro, em poucos segundos:

1. onde estou;
2. o que está acontecendo;
3. o que é mais importante;
4. qual é a ação principal;
5. como voltar/recuperar se algo falhar.

Não repetir a mesma composição em todas as telas. Onboarding, Home, chamada, calendário, arquivos e configurações devem parecer da mesma família, mas ter arquiteturas adequadas ao trabalho que realizam.

---

# A. Entrada, onboarding e conta

## 1. Splash e inicialização

Objetivo: abrir rápido, transmitir marca e lidar com bootstrap de forma robusta.

Composição:

- marca/livro ou símbolo principal;
- nome Assistente Pedagógico;
- microcopy curta;
- progresso discreto quando necessário.

Estados obrigatórios:

- bootstrap normal;
- migração local;
- recuperação de sessão;
- erro recuperável;
- timeout;
- offline normal.

Nunca ficar em spinner infinito. Não exigir rede para abrir o núcleo local.

## 2. Onboarding e apresentação do produto

O onboarding é integração + proposta de valor + configuração inicial, não apenas 3 slides de marketing.

Arquitetura recomendada:

- apresentação do valor;
- como o app organiza planejamento/turmas;
- como reduz trabalho repetido;
- passagem clara para cadastro/login;
- depois, setup guiado do professor e primeira turma.

Cada tela tem uma ideia dominante. Ilustração humana pode aparecer, mas não em todas as etapas.

Evitar o padrão repetitivo `título + ilustração + botão` por muitas telas sem consequência funcional.

## 3. Cadastro de conta

Prioridade: fricção baixa e confiança.

Conteúdo:

- nome;
- e-mail;
- senha;
- providers disponíveis quando reais;
- termos/privacidade quando exigidos.

Estados:

- validação inline;
- e-mail inválido;
- conta existente;
- senha fraca;
- loading;
- erro de rede;
- sucesso.

## 4. Login e recuperação de acesso

Login simples. Recuperação é fluxo próprio e não modal improvisado.

Estados:

- credencial inválida;
- recuperação enviada;
- link expirado;
- offline;
- loading.

## 5. Configuração inicial do perfil docente

Objetivo: coletar só o que melhora a experiência.

Campos possíveis:

- nome/tratamento;
- papel docente;
- etapas em que atua;
- foto opcional.

Não pedir dados sem consequência clara. Mostrar progresso da configuração.

## 6. Criação da primeira turma

Campos essenciais:

- nome da turma;
- etapa;
- turno;
- ano letivo;
- componente quando necessário.

Resultado deve ser perceptível: ao continuar, a turma passa a existir e será usada nas próximas telas.

## 7. Personalização inicial

Preferências úteis:

- tema claro/escuro/sistema quando suportado;
- tamanho de fonte quando suportado;
- notificações específicas;
- cor de acento apenas se houver decisão real de produto.

Não transformar personalização em escolha cosmética vazia.

## 8. Escolha de plano

Comparação simples entre Gratuito, Pro/Premium e Vitalício quando aplicável.

Precisa mostrar:

- para quem cada plano serve;
- benefício concreto;
- preço real da loja;
- periodicidade;
- restauração de compra;
- continuar no gratuito sem dark pattern.

## 9. Paywall / assinatura

Narrativa: economizar tempo e reduzir trabalho repetido.

Hierarquia:

- benefício principal;
- benefícios específicos;
- preço/periodicidade;
- CTA;
- restaurar compra;
- alternativa de sair/continuar quando permitido.

Sem urgência falsa, cronômetro reiniciável ou recusa escondida.

## 10. Confirmação de assinatura

Estado de sucesso forte, curto e claro.

Conteúdo:

- assinatura ativa;
- qual plano;
- próximos passos;
- CTA para entrar no app.

Não mostrar preço inventado; usar dados do billing quando necessário.

---

# B. Primeiro sucesso e Home

## 11. Primeiro sucesso / entrada na Home

Momento narrativo após setup.

Mostrar checklist real:

- perfil configurado;
- turma criada;
- preferências salvas;
- plano/status.

CTA único para Home.

## 12. Home / visão do dia

A Home é “mesa de trabalho digital” do professor, não dashboard de atalhos.

Ordem conceitual:

- saudação/contexto;
- aula/compromisso mais relevante;
- ação contextual dominante;
- atalhos realmente frequentes em pequena quantidade;
- agenda curta;
- atividade recente;
- pendências.

O conteúdo muda conforme o dia. Não renderizar blocos vazios só para manter layout.

## 13. Fazer chamada

Prioridade: velocidade e reversibilidade.

Composição:

- turma/data;
- tabs da turma;
- resumo presentes/faltas/pendentes;
- busca;
- lista de alunos;
- status de cada aluno;
- CTA salvar frequência.

Interação:

- toque rápido muda estado;
- ação pode ser desfeita antes de salvar;
- confirmação de saída com alterações não salvas;
- feedback de persistência.

## 14. Registrar observação

Formulário focado.

Campos:

- aluno opcional ou obrigatório conforme contexto;
- turma;
- tipo;
- descrição;
- visibilidade/compartilhamento quando existir;
- anexos quando suportados.

Evitar telas cheias de cards; usar form layout com agrupamento simples.

## 15. Compromissos e agenda

Dia/semana/mês via SegmentedControl.

Visão diária preferencialmente timeline.

Eventos precisam mostrar tipo, horário, título e contexto. Conflitos/atrasos devem ser perceptíveis sem depender só de cor.

## 16. Atividade recente

Feed cronológico compacto.

Agrupar por Hoje / Ontem / período. Filtros curtos podem existir. Cada linha deve mostrar o que mudou e em qual contexto.

---

# C. Planejamento

## 17. Planejamento — visão geral

Objetivo: mostrar saúde do planejamento, próximos conteúdos e atalhos de criação.

Componentes:

- métricas compactas;
- próximas aulas;
- rascunhos relevantes;
- ações Novo plano / Nova atividade;
- acesso BNCC.

Não usar 4 cards enormes para métricas.

## 18. Planejamento diário

Timeline com aulas, compromissos e blocos de planejamento.

Precisa permitir:

- adicionar aula;
- abrir detalhe;
- identificar conflito;
- navegar dias;
- pular para hoje.

## 19. Planejamento semanal

WeekGrid com eixo horário. Em telas estreitas pode rolar horizontalmente.

Aulas devem ser blocos compactos; não tentar colocar descrição completa dentro da grade.

## 20. Planejamento mensal

CalendarMonth com indicadores de eventos. O dia selecionado abre lista detalhada abaixo.

Não sobrecarregar cada célula com cards miniaturizados.

## 21. Criar plano de aula

Estrutura por seções, não por dezenas de cards.

Campos essenciais:

- título;
- turma;
- data;
- componente curricular;
- duração/horário;
- status.

Bloco pedagógico:

- objetivo geral;
- objetivos específicos;
- conteúdo/objeto de conhecimento;
- habilidades BNCC;
- justificativa/contextualização.

Bloco metodológico:

- metodologia;
- momentos da aula: abertura, desenvolvimento e fechamento;
- tempo estimado por momento;
- materiais/recursos;
- avaliação/registro.

Autosave deve ter feedback discreto e confiável.

## 22. Editar plano de aula

Mesma arquitetura do criar, com status, autosave, histórico quando houver e ações arquivar/duplicar/excluir devidamente protegidas.

## 23. Habilidades BNCC

Busca + filtros por etapa/componente/ano + lista de skills.

Selecionadas ficam acessíveis sem perder contexto. Código e descrição sempre juntos.

## 24. Criar atividade

Campos variam por tipo, mas usar Progressive Disclosure. Não mostrar todas as opções avançadas desde o início.

---

# D. Turmas e alunos

## 25. Turmas — visão geral

Lista de turmas com contexto útil: etapa, alunos, próxima aula/pendência. Não grid de tiles iguais.

## 26. Detalhe da turma

Tabs: Visão do dia / Alunos / Frequência / Registros.

Contexto da turma deve permanecer visível sem ocupar metade da tela.

## 27. Lista de alunos

Busca, ordenação/filtro quando necessário e StudentRow. Ações em massa só quando seguras.

## 28. Perfil do aluno

Organizar por blocos semânticos:

- resumo;
- frequência;
- observações;
- avaliações;
- histórico.

Dados sensíveis precisam de exposição mínima.

## 29. Frequência

Pode reutilizar o padrão Fazer chamada, mas com visão histórica e filtros.

## 30. Registros pedagógicos

Feed/lista por aluno/turma/data/tipo. Evitar card por registro quando lista densa funcionar melhor.

## 31. Histórico do aluno

Timeline pedagógica com eventos relevantes e filtros.

## 32. Notas e avaliações

Tabelas/listas responsivas, cabeçalhos fixos quando útil e edição com confirmação. Não sacrificar legibilidade para evitar scroll horizontal; pode haver scroll controlado.

---

# E. Arquivos

## 33. Arquivos — visão geral

Busca + atalhos para Recentes/Favoritos/Pastas + conteúdo principal. Evitar hub em grid 2×N.

## 34. Pastas

FolderRow/List; ações criar, renomear, mover, excluir.

## 35. Arquivos recentes

FileRow denso com tipo, nome, data e contexto.

## 36. Favoritos

Mesmo padrão de lista; filtro de favoritos não deve criar linguagem nova.

## 37. Importar / capturar arquivo

Sheet ou fluxo dedicado: câmera, arquivo, galeria quando permitido. Explicar permissões.

## 38. Visualização de arquivo

Priorizar conteúdo. Toolbar compacta para compartilhar, favorito, mover, excluir.

## 39. Lixeira

Mostrar retenção/efeito da exclusão e opções restaurar/excluir definitivamente.

---

# F. Mais, relatórios e configurações

## 40. Relatórios

Entrada por relatórios reais, não grid decorativo. Mostrar geração, filtros, estado e exportação.

## 41. Perfil profissional

Dados docentes e preferências profissionais. Editar em seções simples.

## 42. Gerenciar turmas

Lista, criar, arquivar, editar. Destrutivo claramente separado.

## 43. Ferramentas de sala

Somente ferramentas implementadas. Se houver várias, organizar por frequência/categoria, não cards homogêneos.

## 44. Notificações

Feed de notificações e preferências são telas distintas.

## 45. Mais / hub

Hub secundário. Pode usar grupos de settings/list rows e destaques, mas não voltar ao padrão grid de cards genéricos.

## 46. Configurações

SettingsGroup + SettingsRow.

Grupos sugeridos:

- Conta e perfil;
- Notificações;
- Turmas;
- Aparência;
- Privacidade e segurança;
- Sincronização/backup;
- Sobre.

Sair da conta e exclusão ficam separados das preferências comuns.

## 47. Aparência e acessibilidade

Tema, fonte, reduced motion quando exposto, contraste/ajustes reais. Preview pode existir se ajudar.

## 48. Privacidade e segurança

Explicar dados locais, sincronização, exportação, permissões e exclusão com linguagem compreensível.

## 49. Backup e sincronização

Status atual, último backup, ação manual, falha e recuperação. Nunca sugerir backup concluído se não foi realmente persistido.

## 50. Ajuda e suporte

Busca, tópicos frequentes, contato real e diagnóstico seguro. Não expor dados de alunos em logs enviados.

## 51. Sobre o aplicativo

Versão, licenças, termos, política de privacidade e créditos.

---

# G. Assinatura

## 52. Gerenciar assinatura

Plano atual, status, renovação/expiração e link para gerenciamento correto da loja.

## 53. Alterar plano

Comparação clara, proration quando aplicável e confirmação.

## 54. Cancelar assinatura

Explicar consequência e data de fim do acesso premium. Sem manipulação ou atrito artificial.

---

# H. Estados de sistema

## 55. Carregamento

Skeleton contextual preferido. Timeout e recuperação quando operação puder falhar.

## 56. Vazio

Explicar o que falta e oferecer a próxima ação útil.

## 57. Erro

Mensagem humana + retry + alternativa. Preservar contexto/dados já digitados.

## 58. Sucesso

Usar tela cheia apenas em marcos; ações rotineiras usam feedback inline/snackbar.

## 59. Offline

O núcleo local continua funcional. Indicar o que está indisponível e quando sincronizará.

## 60. Logout

Confirmar apenas se houver risco de perder trabalho local/não sincronizado; caso contrário fluxo simples.

## 61. Exclusão de conta

Fluxo em etapas:

- explicar o que será removido;
- diferenciar conta de dados locais quando necessário;
- oferecer exportação quando aplicável;
- confirmar identidade;
- confirmação destrutiva explícita.

## 62. Confirmação final de exclusão

Tela curta, sem ambiguidade: conta/dados removidos, o que ainda pode existir por obrigação legal quando aplicável, e caminho para saída/início.

---

# Regras de composição por categoria

## Telas narrativas

Splash, onboarding, sucesso e paywall podem usar mais ilustração, mais espaço e alinhamento central.

## Telas operacionais

Chamada, alunos, arquivos, notas e planning usam densidade alta, alinhamento à esquerda, listas e controles compactos.

## Telas de configuração

Settings usam grupos, rows e hierarquia textual; não exigem hero ou ilustração.

## Telas de calendário

O calendário é o protagonista. Controles e labels devem ocupar pouco espaço e preservar área útil.

## Telas de formulário

Agrupar campos por significado, não por card. Uma seção pode ter título + campos; evitar card para cada grupo pequeno.

# Gate de aprovação por fluxo

Um fluxo visual só está pronto quando:

- estados principal/vazio/loading/error foram tratados quando aplicável;
- ação principal é inequívoca;
- não há CTA sem comportamento;
- persistência é real;
- screenshot antes/depois existe;
- viewport 360/390/430 foi validado;
- acessibilidade básica foi testada;
- identidade V2 é reconhecível;
- o fluxo não parece template genérico;
- testes relevantes passam.
