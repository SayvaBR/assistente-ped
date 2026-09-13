# Assistente Pedagógico — Interações Assinatura V2

Este documento transforma referências externas em receitas próprias do Assistente Pedagógico. A intenção não é copiar produtos existentes, mas criar uma linguagem reconhecível e consistente.

## 1. Calendário espacial — assinatura de Planejamento

### Objetivo

Fazer Dia, Semana e Mês parecerem níveis do mesmo objeto temporal, e não três telas independentes.

### Comportamento

- o dia selecionado deve persistir conceitualmente entre visões;
- ao ir de Dia → Semana, a coluna do dia se comprime e as demais datas entram para formar a semana;
- Semana → Mês reduz eventos para marcadores/linhas resumidas e reorganiza as células em grade mensal;
- retorno Mês → Semana → Dia faz o caminho inverso a partir da data selecionada;
- eventos devem manter identidade visual quando possível por shared geometry;
- a barra/indicador de visão pode deslizar com `layoutId`.

### Motion

- layout: `smooth`;
- seleção de data: `snappy`;
- expansão do dia: `smooth`;
- conteúdo secundário: fade curto;
- sem bounce forte.

### Haptic

- selection ao trocar de dia/visão;
- light impact apenas em snap importante, não em cada frame.

### Reduced Motion

Trocar por crossfade curto, mantendo a mesma data e foco lógico.

### Não fazer

- três rotas com fade genérico;
- zoom exagerado;
- animar todos os eventos individualmente por muito tempo;
- perder contexto da data atual.

---

## 2. Create Button central — assinatura de criação

### Objetivo

Criar um ponto de ação reconhecível, contextual e vivo, sem virar um FAB genérico.

### Contextos possíveis

- Início: registrar observação / compromisso / chamada rápida;
- Planejamento: novo plano / atividade;
- Turmas: novo aluno / registro;
- Arquivos: importar / câmera / nova pasta;
- Mais: sem ação central se não houver função clara.

### Comportamento

- botão permanece em posição estável no shell quando a arquitetura pedir;
- ícone pode morfar ao trocar de aba para representar a ação primária daquele contexto;
- toque comprime o botão;
- abertura expande a superfície usando shared geometry;
- ações secundárias surgem em sequência curta e previsível;
- toque fora fecha sem apagar estado;
- ao executar ação, o menu colapsa imediatamente e navega.

### Motion

- press: `press`;
- morph de ícone: `snappy`;
- expansão: `expressive` com bounce mínimo;
- itens filhos: stagger muito curto, máximo ~30–40 ms entre itens;
- fechamento: mais rápido que abertura.

### Haptic

- light impact ao abrir;
- selection ao navegar entre ações somente se houver controle discreto;
- não vibrar em cada item só por aparecer.

### Acessibilidade

- todas as ações precisam ser botões reais com label;
- abertura por toque normal, não long-press;
- foco vai para primeira ação ao abrir em teclado;
- Escape/back fecha.

---

## 3. Pastas como objetos — assinatura de Arquivos

### Objetivo

Tornar a área Arquivos material e reconhecível sem sacrificar produtividade.

### Abrir pasta

- flap/forma da pasta reage ao toque;
- superfície da pasta pode se expandir em direção ao conteúdo;
- arquivos internos entram como continuidade, não como tela desconectada;
- breadcrumb/top bar assume o nome da pasta.

### Reorganizar grid

- long press ou handle inicia drag;
- item levanta levemente (`scale 1.02–1.04`) e ganha contraste, não sombra pesada;
- demais pastas cedem espaço com `settle`;
- ao soltar, pasta encaixa com light haptic;
- ordem salva imediatamente em repository apropriado;
- falha de persistência reverte ordem e mostra erro.

### Cor da pasta

- seletor abre próximo ao contexto;
- preview reage em tempo real;
- confirmação persiste a cor;
- cores não devem codificar status crítico sem texto;
- paleta deve respeitar identidade V2.

### Acessibilidade

- oferecer “Mover para antes/depois” ou menu equivalente;
- não depender apenas de drag;
- labels e nomes permanecem legíveis.

---

## 4. Conclusão de tarefa — assinatura de sucesso

### Aplicações

- finalizar chamada;
- concluir setup;
- salvar/finalizar plano;
- concluir backup;
- compra confirmada;
- importar turma com sucesso.

### Comportamento

1. ação primária responde ao toque;
2. entra estado de processamento real;
3. após confirmação real, o próprio controle se transforma;
4. check/estado concluído se desenha ou surge;
5. composição ao redor se reorganiza para o próximo passo;
6. success haptic curto;
7. nunca bloquear por animação longa.

### Motion

- processing: discreto, sem loop chamativo;
- confirmação: `expressive` curta;
- reorganização de layout: `smooth`;
- duração total percebida idealmente abaixo de ~700 ms depois que o backend/storage confirma.

### Não fazer

- confete universal;
- modal “Sucesso!” para cada save;
- success antes da persistência.

---

## 5. Chamada — microfísica operacional

### Seleção de presença

- tocar em status comprime o controle;
- indicador troca com `snappy`;
- contador superior atualiza com motion numérico;
- summary boxes mudam apenas o necessário;
- lista não deve saltar verticalmente;
- selection haptic leve.

### Marcar todos

- ação deve mostrar claramente que afeta o conjunto;
- itens podem atualizar em cascata muito rápida, mas sem dezenas de animações demoradas;
- permitir desfazer quando apropriado.

### Salvar chamada

Seguir receita de conclusão apenas depois de persistência real.

---

## 6. Duration Picker / ajuste de horário

### Aplicações

- duração da aula;
- horário de compromisso;
- lembrete;
- intervalo entre aulas;
- timer de ferramenta de sala.

### Comportamento preferido

- horas/minutos formam um controle composto;
- ao editar uma parte, segmentos podem se separar levemente;
- ajuste por stepper, wheel ou drag deve ter snaps claros;
- cada snap pode usar selection haptic discreto;
- valores inválidos retornam ao intervalo válido com reação curta, nunca com mensagem agressiva;
- ao finalizar, segmentos se reagrupam.

### Não fazer

- exigir teclado numérico para toda alteração simples;
- slider contínuo sem valores claros;
- haptic a cada pixel de arraste.

---

## 7. Bottom Navigation

### Comportamento

- indicador ativo se move entre destinos, em vez de nascer de novo;
- label/ícone ganham peso/cor no estado ativo;
- ícone pode ter microanimação específica ao entrar no estado ativo;
- conteúdo da tela troca sem slide genérico obrigatório;
- o botão central, se presente, pode morfar conforme o contexto.

### Motion

- indicador: `snappy`;
- ícone: 120–220 ms ou spring curta;
- conteúdo: depende da relação entre módulos, normalmente fade + pequena transição de layout.

---

## 8. Tabs e segmented controls

### Comportamento

- usar um único indicador móvel por `layoutId`;
- texto não pula;
- permitir troca rápida e interrompível;
- seleção responde imediatamente.

### Motion

`snappy`.

### Haptic

selection em mobile quando a troca é explícita.

---

## 9. Notificações / bell

### Comportamento

- ao ativar lembrete, sino faz movimento curto de oscilação;
- chegada de nova notificação pode produzir uma única reação visual;
- badge numérico usa transição de dígitos quando o valor muda;
- ao chegar a zero, badge colapsa de forma limpa;
- estado silencioso/desabilitado precisa ser visualmente distinto.

### Não fazer

- sino balançando continuamente;
- badge pulsando para sempre;
- chamar atenção para notificação não importante.

---

## 10. Câmera e captura

### Objetivo

Dar continuidade entre a ação “Capturar” e a interface de câmera.

### Comportamento

- botão/ação de câmera inicia press response;
- superfície de origem pode expandir/morfar em direção ao preview fullscreen;
- pedir permissão no momento adequado;
- se permissão negar, voltar ao mesmo contexto com explicação clara;
- após captura, preview nasce da câmera e pode colapsar para miniatura/anexo salvo.

### Android

Não imitar Dynamic Island. A referência é causalidade/continuidade, não a forma específica de hardware da Apple.

---

## 11. Salvar e autosave

### Autosave silencioso

- não mostrar toast a cada alteração;
- pequeno status `Salvando…` pode aparecer somente quando demora o suficiente para ser percebido;
- após persistência, status vira `Salvo` de forma discreta;
- nenhum haptic em autosave rotineiro.

### Save explícito

- botão comprime;
- loading real;
- check final após persistência;
- success haptic apenas em ação importante.

---

## 12. Exclusão e descarte

O produto terá uma única gramática oficial de descarte.

### A. Reversível / lixeira

Exemplos: arquivo para lixeira, rascunho descartado, anotação removida.

- item se contrai/desloca em direção ao contexto de descarte;
- lista fecha o espaço com `smooth`;
- mostrar Undo quando útil;
- pode existir uma animação física levemente expressiva;
- Warp/Paper Crumple ficam apenas como inspiração para um futuro momento assinatura, não padrão obrigatório.

### B. Destrutivo importante

Exemplos: apagar aluno com dados associados, excluir conta, apagar backup.

- sem animação divertida;
- confirmação clara;
- consequências textuais;
- motion sóbrio;
- resultado visual apenas após operação real.

### Regra

Não criar cinco estilos de lixeira/exclusão diferentes.

---

## 13. Pull to refresh / sync

Só usar onde existe dado remoto/sincronização real.

- gesto acompanha dedo;
- indicador reage progressivamente;
- ao cruzar threshold, snap + haptic leve;
- sincronização real inicia;
- success/error corresponde ao resultado;
- não usar como decoração em conteúdo totalmente local.

---

## 14. Sheets, modais e menus

### Sheet

- nasce do contexto inferior quando fizer sentido;
- acompanha drag;
- snap points previsíveis;
- `smooth`/`settle`;
- backdrop usa fade simples;
- teclado/foco precisam continuar corretos.

### Modal crítico

- entrada curta e sóbria;
- sem bounce expressivo em privacidade/exclusão.

### Context menu

- escala pequena a partir da origem + opacity;
- nunca depender de hover em mobile.

---

## 15. Onboarding

Onboarding é integração funcional, não slideshow.

### Motion permitido

- ilustração humana com movimentos curtos e localizados;
- continuidade entre etapas;
- progress indicator vivo;
- campos/objetos criados em uma etapa podem sobreviver visualmente à próxima;
- setup da primeira turma deve parecer construção real do ambiente do professor.

### Rive

Pode ser usado em 1–3 momentos se agregar narrativa real. Evitar uma animação complexa em todas as etapas.

---

## 16. Paywall

### Objetivo

Parecer premium e claro, não manipulativo.

### Motion

- mensal/anual: indicador compartilhado se move;
- preço troca com motion numérico discreto;
- card/plano selecionado responde com `snappy`;
- CTA usa press response;
- compra inicia estado de processamento real;
- confirmação segue receita de conclusão após entitlement confirmado.

### Proibições

- countdown falso;
- pulsação infinita do CTA;
- urgência artificial;
- fogos/confete antes de confirmação real.

---

## 17. Estados de erro

Erro deve reagir, não sacudir a tela inteira.

- campo inválido: pequena resposta local + mensagem;
- operação falhou: conteúdo permanece estável;
- botão de retry aparece no local relevante;
- error haptic somente em falha explícita importante;
- nunca perder texto/dados por causa da animação.

---

## 18. Prioridade de implementação

### Fase 1 — primitives

- press response;
- shared indicator tabs;
- button states;
- icon motion;
- counters;
- sheets;
- reduced motion;
- haptics abstraction.

### Fase 2 — assinaturas

1. Calendar spatial transition;
2. Create Button/FAB contextual;
3. Files folder/reorder/color;
4. Completion transition;
5. Bell/notification status.

### Fase 3 — refinamentos

- duration picker;
- camera morph;
- richer discard interaction;
- onboarding/Rive;
- advanced number transitions.

Não implementar toda a Fase 3 antes das assinaturas principais estarem aprovadas em Android real.
