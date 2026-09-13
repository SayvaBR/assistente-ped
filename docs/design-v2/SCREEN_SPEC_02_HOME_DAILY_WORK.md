# Volume 2 — Home e Rotina do Dia

Este volume define as telas 12–16.

## Recursos existentes a preservar/reusar

- `src/screens/HomeScreen.js`
- `src/screens/AttendanceScreen.js`
- `src/screens/ObservationScreen.js`
- `src/screens/QuickRecordScreen.js`
- `src/data/classes.js`
- `src/data/agenda-camera.js`
- `src/domain/attendance.ts`
- `src/data/localStore.ts`
- `@capacitor/local-notifications` quando compromissos gerarem lembretes reais

A Home atual não é baseline visual. Preservar comportamento útil, não a composição legada.

---

# 12. Home / visão do dia

## Objetivo

Funcionar como a mesa de trabalho digital do professor. Em poucos segundos responder:

- que dia/contexto estou vendo;
- qual turma/aula importa agora;
- o que exige ação;
- o que vem em seguida;
- o que mudou recentemente.

## Layout de cima para baixo

1. **Header contextual**
   - saudação curta (`Olá, Professora!` ou nome de exibição);
   - subtítulo contextual (`Quinta-feira, 28 de agosto` ou `Que bom ter você aqui hoje`);
   - avatar pequeno à direita abre Perfil/Configurações;
   - não usar título gigante `Início`.

2. **Hero do dia / próxima aula**
   - bloco dominante, largura total;
   - assunto/disciplina;
   - turma;
   - horário;
   - tema curto;
   - ação contextual: `Iniciar aula`, `Fazer chamada`, `Continuar plano` ou `Ver aula`;
   - se não houver aula: estado alternativo com agenda/planejamento útil, não card vazio genérico.

3. **Ações rápidas contextuais**
   - no máximo 2–3 ações realmente relevantes para o momento;
   - exemplos: `Fazer chamada`, `Registrar observação`, `Planejar aula`;
   - evitar grid fixo 2×N com oito atalhos.

4. **Agenda do dia**
   - timeline compacta com próximos compromissos/aulas;
   - horário à esquerda, conteúdo à direita;
   - `Ver agenda` como ação secundária.

5. **Planejamento próximo**
   - uma ou duas linhas de planos/aulas futuras;
   - mostrar status: rascunho/pronto/concluído;
   - `Ver semana` ou `Ver planejamento`.

6. **Pendências** quando existirem
   - chamada ainda não registrada;
   - observação pendente;
   - relatório/nota para concluir;
   - cada pendência deve explicar a ação, não apenas badge vermelho.

7. **Atividade recente**
   - 3–5 eventos compactos;
   - `Ver tudo` abre tela 16.

8. **BottomNavigation**
   - Início ativo;
   - Planejamento;
   - Turmas;
   - Arquivos;
   - Mais.

## Comportamento contextual

A Home deve mudar conforme estado do dia. Exemplo:

- antes da aula: próxima aula + `Fazer chamada`;
- chamada concluída: CTA vira `Registrar observação` ou `Abrir plano`;
- sem compromissos: não mostrar seção vazia extensa;
- sem turma: apresentar guided setup com ação `Criar minha primeira turma`.

## Dados

Compor dados de turma, agenda, frequência e planos a partir dos repositories já existentes. Não duplicar storage só para alimentar Home.

## Estados

- loading: skeleton apenas nos blocos dependentes; shell continua estável;
- parcial: se agenda falhar, restante da Home continua;
- erro de gravação: manter contexto e oferecer retry;
- offline: mostrar dados locais normalmente;
- empty inicial: guided action, não dashboard vazio.

## Aceite visual

A Home falha se parecer um dashboard de cards equivalentes.

---

# 13. Fazer chamada

## Objetivo

Permitir registrar frequência rapidamente, com mínimo de toques e clareza total sobre quem está presente/faltou.

## Layout

1. TopBar com voltar e título da turma (`5º Ano A`), subtítulo `24 alunos`.
2. Tab/context nav da turma opcional: `Visão do dia | Alunos | Frequência | Registros`; Frequência ativa.
3. DateSelector compacto logo abaixo.
4. `AttendanceSummary`: Presentes / Faltas / Pendentes em três métricas; cor semântica + texto/ícone, nunca só cor.
5. SearchField `Buscar aluno…`.
6. Lista de alunos em `StudentAttendanceRow`:
   - avatar/iniciais;
   - nome completo;
   - status clicável (`Presente`, `Falta`, `Justificada` quando existir regra);
   - overflow apenas para ações secundárias;
   - separador fino, não um card por aluno.
7. Sticky action area no rodapé da tela:
   - secundário `Registrar depois` somente se fluxo permitir;
   - primário `Salvar frequência`.

## Interação

- primeiro toque no status abre/alternar opções de frequência de maneira previsível;
- ação em massa opcional `Marcar todos presentes`, seguida de edição das exceções;
- mudanças ficam em estado draft até salvar;
- sair com alterações não salvas pede confirmação;
- salvar persiste uma sessão de frequência real e atualiza Home/turma.

## Dados

Usar domínio `src/domain/attendance.ts` e storage atual relacionado à turma. Não inferir falta automaticamente só porque aluno ficou pendente.

## Acessibilidade

Status deve ser anunciado por leitor de tela (`Ana Clara, Presente, botão`). Alvo de toque >=48px.

---

# 14. Registrar observação

## Objetivo

Criar registro pedagógico rápido, objetivo e associável a aluno/turma/data sem transformar a tela em formulário burocrático.

## Layout

1. TopBar `Nova observação`.
2. `StudentPicker` opcional — busca aluno; escolha fica visível em chip/row removível.
3. `ClassSelector` obrigatório quando contexto não vier da Home/turma.
4. `ObservationTypeSelector` horizontal/segmented:
   - Comportamento;
   - Participação;
   - Aprendizagem;
   - Outro.
5. `TextArea` grande com label `Descrição` e contador de caracteres se houver limite real.
6. Data/hora automática com opção `Alterar` em linha secundária.
7. Anexo opcional somente se funcionalidade real existir; usar câmera/arquivo contextual, não pedir permissão antecipadamente.
8. Toggle `Visível para família` apenas se houver fluxo real de compartilhamento; se não houver, remover da UI.
9. CTA `Salvar observação`.

## Comportamento

- autosave local de rascunho opcional se já houver infraestrutura segura;
- salvar sem aluno cria observação de turma quando permitido;
- validação exige descrição significativa;
- sucesso retorna ao contexto anterior e atualiza atividade recente.

## Privacidade

Observações podem conter dado sensível. Nunca analytics. Evitar preview excessivo em notificações de sistema.

---

# 15. Compromissos e agenda

## Objetivo

Mostrar agenda pedagógica e pessoal de trabalho sem virar calendário genérico desconectado das aulas.

## Layout

1. TopBar `Compromissos` + botão `+`.
2. Segmented control `Dia | Semana | Mês`.
3. Strip de datas quando em Dia/Semana.
4. Conteúdo principal:
   - Dia: timeline vertical por horário;
   - Semana: grid leve com colunas/dias e blocos;
   - Mês: calendário + lista do dia selecionado.
5. FAB `+` apenas se não competir com CTA sticky e se criar compromisso rapidamente.

## Card/bloco de evento

- hora;
- tipo (aula, reunião, planejamento, atendimento etc.);
- título;
- turma/local quando relevante;
- estado concluído/pendente;
- tocar abre detalhe/edição.

## Criar compromisso

Sheet/tela com:

- título;
- data;
- início/fim;
- tipo;
- turma opcional;
- local/observação opcional;
- lembrete opcional;
- salvar.

Se lembrete ativado, usar `@capacitor/local-notifications` após permissão contextual.

## Erros

Falha ao salvar não deve remover draft. Falha de permissão de notificação salva compromisso sem lembrete e explica o que ocorreu.

---

# 16. Atividade recente

## Objetivo

Ser um histórico legível das ações do professor, útil para contexto e retorno rápido ao item alterado.

## Layout

1. TopBar `Atividade recente`.
2. Filtros horizontais: `Todos | Aulas | Turmas | Arquivos | Registros` — somente categorias que realmente existem.
3. Conteúdo agrupado por data: `Hoje`, `Ontem`, `Esta semana`.
4. `ActivityRow`:
   - ícone semântico pequeno;
   - título (`Chamada registrada`);
   - contexto (`5º Ano A`);
   - horário/data;
   - chevron apenas se há destino navegável.
5. Infinite/paginated local list se necessário; não carregar centenas de itens na montagem sem razão.

## Comportamento

Tocar deve abrir o recurso relacionado quando ele ainda existir. Se o item foi apagado, mostrar informação segura e não quebrar navegação.

## Privacidade

Activity log local deve evitar expor detalhes sensíveis em texto desnecessário. Ex.: `Observação registrada — João Pedro` pode ser aceitável no app protegido, mas não deve virar analytics/log externo.

## Gate deste volume

Capturar screenshots da Home em pelo menos: sem turma, rotina normal, chamada pendente, chamada concluída, erro parcial e offline. Chamada: pendente e salva. Observação: formulário e sucesso/erro. Agenda: dia/semana/mês e empty. Atividade recente: com dados e vazia. Testar 360/390/430px, teclado, scroll, safe area e targets >=48px.