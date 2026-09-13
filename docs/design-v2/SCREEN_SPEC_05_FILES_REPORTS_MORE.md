# Volume 5 — Arquivos, Relatórios, Perfil e Hub Mais

Este volume define as telas 33–45.

## Recursos existentes a preservar/reusar

- `src/screens/LibraryScreen.js` / `LibraryScreen.jsx`
- `src/screens/DocumentsScreen.js`
- `src/screens/TrashScreen.jsx`
- `src/data/files.js`
- `src/data/notebookAttachments.ts`
- `@capacitor/filesystem`
- `@capacitor/file-viewer`
- `@capacitor/camera`
- `@capacitor/share`
- `src/screens/ReportsScreen.js`
- `src/screens/ReportsModule.tsx`
- `src/screens/ReportBuilder.tsx`
- `src/data/pdfExport.ts`
- `src/data/export.ts`
- `jspdf`
- `src/screens/TeacherProfileScreen.js`
- `src/screens/ClassManager.tsx`
- `src/screens/ToolsScreen.js`
- `@capawesome/capacitor-torch`
- `src/screens/NotificationsScreen.js`
- `src/data/notifications.js`
- `@capacitor/local-notifications`
- `src/screens/MoreScreen.js`

---

# 33. Arquivos — visão geral

## Objetivo

Dar acesso rápido a materiais pedagógicos sem parecer gerenciador de arquivos genérico de desktop.

## Layout

1. Header `Arquivos` + ação secundária de opções.
2. SearchField `Buscar arquivos…`.
3. Filter tabs `Todos | Recentes | Favoritos`.
4. Seção `Pastas` horizontal/vertical compacta apenas para pastas reais mais usadas.
5. Seção `Recentes` com `FileRow`:
   - ícone por tipo de arquivo;
   - nome;
   - metadata curta: tamanho/data/pasta;
   - favorito opcional;
   - overflow para mover/renomear/excluir/compartilhar.
6. Sticky/FAB `+` abre menu `Importar arquivo | Capturar foto | Criar pasta` quando suportado.
7. BottomNavigation com Arquivos ativo.

## Regras

- lista principal não deve usar cards enormes por arquivo;
- operações devem atualizar storage imediatamente e refletir na UI;
- arquivos locais devem continuar disponíveis offline.

---

# 34. Pastas

## Layout

1. TopBar `Pastas`.
2. breadcrumb compacto quando navegando em subpastas; em mobile não exibir caminho enorme.
3. lista de pastas com nome + quantidade de itens + data de alteração.
4. botão `Nova pasta`.
5. ao entrar, mostrar conteúdo daquele diretório com rows de arquivo.

## Operações

Criar, renomear, mover e excluir apenas quando implementadas em `files.js`/Filesystem. Excluir pasta com conteúdo exige confirmação explícita e deve explicar impacto.

---

# 35. Arquivos recentes

## Objetivo

Listar arquivos acessados/criados/modificados recentemente.

## Layout

- header `Recentes`;
- filtros opcionais por tipo;
- lista cronológica agrupada por Hoje / Ontem / Esta semana;
- row idêntica ao componente global `FileRow`.

## Regras

`Recente` deve ter definição clara: último acesso ou modificação. Não misturar critérios sem explicação.

---

# 36. Favoritos

## Layout

- header `Favoritos`;
- lista de arquivos/pastas favoritados;
- remover favorito por ação rápida sem excluir o arquivo;
- empty state: `Nenhum favorito ainda` + orientação curta.

Persistir flag em metadata do arquivo; não criar cópia do arquivo.

---

# 37. Importar / capturar arquivo

## Entry point

Bottom sheet a partir de `+` com opções reais:

- `Escolher arquivo`;
- `Tirar foto`;
- `Digitalizar` somente se fluxo real existir;
- `Criar pasta`.

## Escolher arquivo

Usar picker/Filesystem compatível. Após seleção:

1. preview de nome/tipo/tamanho;
2. selecionar pasta de destino;
3. renomear opcional;
4. `Importar`.

## Tirar foto

Usar `@capacitor/camera` apenas após ação explícita. Fluxo:

1. explicar permissão quando necessário;
2. abrir câmera;
3. preview;
4. `Usar foto` / `Refazer`;
5. nome e pasta;
6. salvar.

## Erros

- permissão negada: explicar e permitir escolher arquivo;
- storage insuficiente: não perder referência ao original;
- formato inválido: mensagem específica;
- cancelamento não é erro.

## Privacidade

Fotos/documentos podem conter dados de alunos. Nada é enviado externamente sem ação explícita do usuário.

---

# 38. Visualização de arquivo

## Layout

1. TopBar com nome truncado de forma segura + overflow.
2. preview nativo quando suportado via `file-viewer` ou preview interno para imagens/PDF.
3. action bar: `Compartilhar`, `Favoritar`, `Mover`, `Mais`.
4. metadata acessível em sheet `Detalhes`.

## Regras

Se o formato não puder ser previewado, mostrar ícone/tipo e CTA `Abrir em outro app`. Nunca travar carregando arquivo enorme sem feedback.

Compartilhar usa `@capacitor/share` e exige ação explícita.

---

# 39. Lixeira

## Objetivo

Evitar exclusão irreversível imediata.

## Layout

1. TopBar `Lixeira`.
2. texto curto sobre retenção se houver política real.
3. lista de itens excluídos com data de exclusão.
4. ação por item: `Restaurar` / `Excluir permanentemente`.
5. `Esvaziar lixeira` apenas no menu ou rodapé, com confirmação forte.

## Segurança

Não excluir permanentemente automaticamente sem política implementada/documentada. Restaurar deve tentar devolver à pasta original; se ela não existir, pedir destino seguro.

---

# 40. Relatórios

## Objetivo

Transformar dados locais em relatórios úteis sem forçar dashboard analítico genérico.

## Layout

1. Header `Relatórios`.
2. Context selector: turma / aluno / período.
3. `ReportTypeList` em rows:
   - Frequência;
   - Desempenho/avaliações;
   - Registros pedagógicos;
   - Relatório individual;
   - outros realmente implementados.
4. seção `Relatórios recentes` com documentos gerados.
5. CTA contextual `Criar relatório`.

## Builder

Reusar `ReportsModule.tsx`/`ReportBuilder.tsx`. Fluxo:

1. selecionar tipo;
2. escolher contexto/período;
3. preview dos dados incluídos;
4. opções de seções;
5. gerar preview;
6. exportar PDF/compartilhar.

## PDF

Usar `pdfExport.ts`/jsPDF. Garantir tipografia legível, paginação e ausência de corte. Não incluir dado além do selecionado.

## Premium

Se algum relatório for Pro, bloquear com explicação honesta + CTA para assinatura; segurança/exportação básica de dados próprios não deve ser bloqueada indevidamente.

---

# 41. Perfil profissional

## Objetivo

Editar identidade docente usada no app e em documentos gerados.

## Layout

1. TopBar `Perfil profissional`.
2. avatar/foto opcional.
3. nome de exibição;
4. forma de tratamento;
5. etapas em que atua;
6. componentes curriculares;
7. instituição opcional, apenas se útil;
8. assinatura/identificação de relatório apenas se funcional;
9. CTA `Salvar alterações`.

## Dados

Reusar `TeacherProfileScreen.js` e persistência existente. Alteração deve refletir imediatamente em Home/relatórios.

---

# 42. Gerenciar turmas

## Objetivo

Área administrativa para criar, editar, arquivar e reativar turmas, distinta da rotina diária da aba Turmas.

## Layout

1. TopBar `Gerenciar turmas`.
2. filtros `Ativas | Arquivadas`.
3. lista de turmas com metadata e overflow.
4. CTA `Nova turma`.
5. ações: Editar, Duplicar quando útil, Arquivar/Reativar, Excluir.

## Excluir

Antes de excluir, calcular dados relacionados e explicar o impacto. Preferir arquivamento. Usar limpeza segura e migração conforme domínio existente.

---

# 43. Ferramentas de sala

## Objetivo

Agrupar utilidades realmente úteis em aula sem virar um hub de tiles genéricos sem identidade.

## Layout

1. Header `Ferramentas de sala`.
2. seção `Durante a aula` com ferramentas em rows/blocos de função distinta.
3. exemplos somente se implementados:
   - cronômetro;
   - sorteio de aluno;
   - lanterna;
   - contador;
   - modo foco.
4. ferramentas frequentes podem ter destaque maior; demais ficam em lista.

## Recursos nativos

Lanterna usa `@capawesome/capacitor-torch`. Tratar indisponibilidade de hardware. Cronômetro deve sobreviver a re-render; lifecycle do app precisa preservar estado quando apropriado.

## Privacidade

Sorteio usa apenas alunos da turma local e não transmite dados.

---

# 44. Notificações

## Objetivo

Mostrar caixa de entrada de avisos do próprio app e gerenciar ações relacionadas.

## Layout

1. Header `Notificações`.
2. filter tabs `Todas | Não lidas | Importantes` quando suportado.
3. lista por data.
4. NotificationRow:
   - tipo/ícone;
   - título;
   - resumo;
   - data/hora;
   - unread indicator sem depender só de cor;
   - tocar abre destino quando houver.
5. ação `Marcar todas como lidas` no menu.

## Dados

Usar `src/data/notifications.js`. Não misturar com notificações push externas inexistentes.

## Permissão de sistema

Configuração de alertas locais usa `@capacitor/local-notifications`; esta tela não deve pedir permissão apenas por ser aberta.

---

# 45. Mais / hub de ferramentas

## Objetivo

Servir como hub secundário para áreas que não pertencem às 4 tabs principais, mantendo personalidade e hierarquia.

## Layout

1. Header `Mais` + subtítulo curto.
2. hero editorial opcional, pequeno, com mensagem útil; não obrigatório em toda visita se ocupar viewport demais.
3. grupos semânticos em vez de grid 2×4 idêntico:
   - **Conta e trabalho**: Perfil profissional, Gerenciar turmas;
   - **Pedagógico**: BNCC, Relatórios;
   - **Ferramentas**: Ferramentas de sala;
   - **Dados**: Importar dados, Backup;
   - **Suporte**: Ajuda, Feedback;
   - `Configurações` como row de destaque/rodapé.
4. cada item é `HubRow` ou composição variada; não `ícone pastel + título + subtítulo + chevron` repetido como grade dominante.
5. BottomNavigation com Mais ativo.

## Gate deste volume

Screenshots obrigatórias: Arquivos normal/empty/import/photo/permissão negada/preview/lixeira; relatório builder + PDF preview; perfil; gerenciar turmas; ferramentas com hardware indisponível; notificações lida/não lida; Mais em 360/390/430px. Testes: `tests/files.test.ts`, E2E `library-access.pw.ts`, `more-navigation.pw.ts`, testes de relatórios e permissões nativas quando aplicável.