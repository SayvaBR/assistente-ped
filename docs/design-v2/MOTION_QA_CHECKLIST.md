# Assistente Pedagógico — Motion QA Checklist

Esta checklist é obrigatória para PRs que adicionem ou alterem animações, transições, gestos, haptics, icon motion, shared layout ou estados animados.

## 1. Evidência obrigatória no PR

Para cada interação nova relevante, anexar:

- gravação curta em Android real ou emulação confiável do viewport alvo;
- estado normal;
- estado durante a interação quando relevante;
- estado final;
- versão com Reduced Motion quando a animação espacial for significativa;
- screenshots antes/depois quando houver mudança visual permanente;
- descrição do token de motion usado;
- descrição de haptic usado, se houver;
- observação de performance/limitações conhecidas.

Screenshots sozinhos não são evidência suficiente para motion.

## 2. Gravação recomendada

- duração curta e focada, idealmente 5–15 segundos por interação;
- evitar gravações longas de tela inteira sem foco;
- mostrar toque/ação e resultado;
- se possível, capturar em 60 fps;
- para shared transitions, mostrar ida e volta;
- para drag/reorder, mostrar início, deslocamento, snap e persistência;
- para erro, demonstrar falha sem perda de dados;
- para success, demonstrar que a animação ocorre após a confirmação real.

## 3. Gate visual

Perguntas obrigatórias:

- o movimento explica uma mudança real?
- a origem e o destino do elemento são compreensíveis?
- a interação parece parte da V2 ou parece demo externo colado no app?
- existe bounce gratuito?
- a animação chama mais atenção que o conteúdo?
- a duração atrasa o trabalho?
- a tela continua clara sem motion?
- há consistência com interações já aprovadas?

Se o movimento for apenas “legal”, sem valor causal, reprovar ou simplificar.

## 4. Gate de física

- usa `motionSpring`/`motionDuration` oficial;
- não cria `duration`, easing, stiffness ou damping arbitrários sem justificativa;
- press response acontece imediatamente;
- fechamento normalmente é mais rápido que abertura;
- movimentos repetitivos usam springs firmes, não bouncy;
- motion narrativo não vazou para tela operacional densa.

## 5. Interrupção

Testar mudanças rápidas de decisão:

- trocar tabs rapidamente;
- abrir/fechar FAB antes de terminar;
- mudar de data durante transição;
- interromper drag;
- alternar toggle rapidamente;
- arrastar sheet e inverter direção.

A animação deve continuar do estado atual. Não pode travar esperando sequência anterior terminar.

## 6. Reduced Motion

Verificar `prefers-reduced-motion`.

Obrigatório:

- sem grandes zooms/morphs/parallax;
- sem deslocamentos que possam causar desconforto;
- estado e feedback permanecem visíveis;
- foco não se perde;
- nenhuma informação desaparece;
- a tarefa continua totalmente executável.

## 7. Haptics

Quando houver haptic:

- disparar somente por evento real;
- não disparar múltiplas vezes por um único toque;
- não usar em scroll;
- não usar em cada tecla;
- não usar success antes da persistência/entitlement/operação confirmar;
- verificar comportamento em Android real.

## 8. Gestos

Para drag, swipe, long press e sheets:

- existe alternativa visível/acessível para função importante;
- gesto não conflita com scroll principal;
- touch target >= 48 px quando houver handle/controle;
- estado de drag é visualmente claro;
- cancelar gesto não perde dados;
- back do Android fecha/cancela no nível correto;
- leitor de tela não depende do gesto visual.

## 9. Shared geometry

Verificar:

- objeto de origem e destino são conceitualmente o mesmo;
- não há stretch/distorção feia de texto/ícone;
- conteúdo que não deve morphar faz crossfade;
- ida e volta preservam contexto;
- navegação continua correta com Reduced Motion;
- foco semântico vai para o destino apropriado.

## 10. Performance

Em interação complexa:

- testar Android real quando aplicável;
- observar jank perceptível;
- preferir transform/opacity;
- evitar blur/shadow animados pesados;
- não animar dezenas de elementos sem necessidade;
- listas grandes animam apenas região afetada;
- loops contínuos param quando estado acaba;
- componentes desmontados não deixam timers/listeners/animations vivos.

Se houver jank visível, o PR não passa por “estar bonito”. Simplificar ou otimizar.

## 11. Estados assíncronos

### Save

- press imediato;
- loading verdadeiro;
- success somente após persistência;
- falha mantém dados editados e oferece retry.

### Billing

- compra em andamento claramente indicada;
- não simular sucesso;
- confirmation motion somente após entitlement confirmado;
- restore possui estados próprios.

### Backup/import/sync

- progress corresponde ao processo real quando possível;
- erro recuperável;
- nenhuma animação esconde perda/ausência de dados.

## 12. Motion em exclusão

### Reversível

- item sai de forma compreensível;
- espaço fecha suavemente;
- Undo aparece quando previsto;
- persistência/rollback testados.

### Irreversível/sensível

- sem humor/bounce/confete;
- confirmação clara;
- consequências textuais;
- animação final só após operação real.

## 13. Calendário

Para Dia/Semana/Mês:

- data selecionada persiste;
- transição não perde eventos;
- eventos não saltam sem explicação;
- navegação rápida é interrompível;
- Reduced Motion possui fallback;
- 360/390/430 px testados;
- long labels/eventos não quebram a grade.

## 14. Arquivos

Para pasta/reorder/cor:

- drag tem alternativa acessível;
- reorder persiste;
- falha reverte corretamente;
- abrir pasta preserva contexto;
- cor não é a única forma de transmitir status;
- grandes quantidades não animam tudo ao mesmo tempo.

## 15. Create Button/FAB

- ação central é contextual e faz sentido naquela aba;
- menu não cobre ação crítica sem saída;
- back/toque fora fecha;
- ícone morfa sem virar ruído;
- itens são acessíveis por foco;
- Reduced Motion mantém o menu funcional;
- não existe apenas para parecer sofisticado.

## 16. Icon motion

- animação comunica a ação/estado;
- não roda em loop sem estado real;
- stroke/visual combina com iconografia V2;
- não mistura famílias inconsistentes;
- label acessível independe do movimento.

## 17. Critério final de aprovação

Um PR com motion só pode ser marcado como visualmente pronto quando:

- comportamento está correto;
- gravação foi revisada;
- visual gate passou;
- acessibilidade passou;
- Reduced Motion passou;
- performance é aceitável;
- haptics correspondem aos eventos reais;
- não há regressão funcional/persistência;
- o resultado parece Assistente Pedagógico e não uma colagem de demos.
