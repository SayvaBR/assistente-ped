# Assistente Pedagógico — Motion System V2

Este documento define a linguagem oficial de movimento do Assistente Pedagógico. Movimento não é decoração: ele deve explicar causalidade, continuidade espacial, estado e resposta à ação.

A meta é obter a sensação de interfaces nativas muito polidas — especialmente a continuidade e a física associadas a SwiftUI — sem migrar a stack React + TypeScript + Vite + Capacitor Android.

## 1. Princípio central

Toda animação deve responder a pelo menos uma destas perguntas:

1. O que acabou de acontecer?
2. De onde este elemento veio?
3. Para onde ele foi?
4. O que mudou de estado?
5. Minha ação funcionou?
6. Qual objeto estou manipulando?

Se a animação não responde nenhuma delas, provavelmente deve ser removida.

A sensação premium vem de dezenas de pequenos feedbacks coerentes, não de uma grande animação chamativa em cada tela.

## 2. Objetivos

O Motion System deve fazer o produto parecer:

- tátil;
- responsivo;
- contínuo;
- físico sem parecer brinquedo;
- expressivo sem comprometer eficiência;
- coerente em todas as áreas;
- rápido o suficiente para trabalho real de professor;
- acessível com movimento reduzido;
- estável em Android/WebView de hardware intermediário.

## 3. Stack de motion recomendada

### 3.1 Motion for React — engine principal

Usar como primeira opção para:

- springs;
- layout animation;
- shared geometry / `layoutId`;
- enter/exit com `AnimatePresence`;
- drag/gestures;
- reorder;
- microinterações de transform;
- animações interrompíveis.

Não adicionar transições diferentes em cada componente. Todos devem consumir os tokens deste documento.

### 3.2 CSS / Web Animations API — movimentos simples

Preferir CSS/WAAPI quando a animação for simples e não exigir física ou coordenação complexa:

- opacity;
- color;
- background-color;
- border-color;
- pequeno fade;
- estados hover/focus quando aplicável.

### 3.3 Animate UI — referência de primitives comportamentais

Pode orientar implementação de Dialog, Sheet, Tabs, Switch, Checkbox, Tooltip e primitives semelhantes. Não importar identidade visual pronta. O Assistente Pedagógico deve aplicar seus próprios tokens e componentes.

### 3.4 AnimateIcons — candidato para icon motion

Pode ser usado como fonte/biblioteca de ícones animados quando a licença, peso de bundle e compatibilidade forem validados na branch de implementação. O valor principal é animar os paths do ícone em vez de simplesmente trocar SVGs.

### 3.5 Kinetics — referência de física

Tratar Kinetics como catálogo de comportamento e inspiração para springs. Não é necessário importar a biblioteca inteira para produção.

### 3.6 Rive — somente momentos especiais

Rive é opcional e deve ser reservado para poucos momentos narrativos/interativos:

- onboarding;
- primeiro sucesso;
- paywall, quando fizer sentido;
- estados especiais;
- ilustrações controladas por state machine.

Não usar Rive para controles comuns.

### 3.7 Capacitor Haptics — feedback físico

Usar haptics de forma semântica e econômica em Android real. Nunca vibrar em toda interação.

## 4. Dependências externas e privacidade

Antes de adicionar qualquer nova dependência:

- verificar licença;
- verificar bundle size e tree-shaking;
- verificar compatibilidade com a versão de React/Capacitor/WebView do projeto;
- documentar impacto de manutenção;
- confirmar que não coleta dados nem adiciona analytics/telemetria;
- não incluir SDK externo apenas por efeito visual.

Bibliotecas visuais sem rede/telemetria são preferíveis. Nenhum componente de motion pode enviar dados de aluno, dados pedagógicos ou eventos de interação a terceiros.

## 5. Tokens oficiais de tempo

Durações são fallback para opacity/color/efeitos sem spring.

```ts
export const motionDuration = {
  instant: 90,
  fast: 140,
  normal: 220,
  slow: 320,
  narrative: 460,
} as const
```

Regras:

- `instant`: resposta imediata visual ao toque;
- `fast`: ícone, badge, pequeno estado;
- `normal`: enter/exit e mudanças locais;
- `slow`: expansão de superfície / sheet / composição;
- `narrative`: somente onboarding, sucesso e momentos especiais.

Não usar `narrative` em operações repetitivas como chamada, lista de alunos ou digitação.

## 6. Tokens oficiais de spring

Os valores abaixo são referência inicial para Motion. Ajustes sistêmicos devem ser feitos no token, não espalhados pelo código.

```ts
export const motionSpring = {
  press: {
    type: 'spring',
    stiffness: 560,
    damping: 38,
    mass: 0.5,
  },
  snappy: {
    type: 'spring',
    stiffness: 440,
    damping: 32,
    mass: 0.7,
  },
  smooth: {
    type: 'spring',
    stiffness: 320,
    damping: 30,
    mass: 0.9,
  },
  expressive: {
    type: 'spring',
    stiffness: 280,
    damping: 24,
    mass: 0.85,
  },
  settle: {
    type: 'spring',
    stiffness: 220,
    damping: 28,
    mass: 1,
  },
} as const
```

### Quando usar

- `press`: botão afundar/soltar, chip, item selecionável;
- `snappy`: tabs, segmented controls, ícones, toggles, counters;
- `smooth`: layout e shared geometry;
- `expressive`: criação, sucesso, pasta abrindo, CTA especial;
- `settle`: reorder/drag quando um objeto encontra sua posição final.

Bounce exagerado é proibido em fluxos densos. A física deve transmitir materialidade, não comicidade.

## 7. Press response oficial

Todo controle primário tátil deve responder ao toque antes da ação terminar.

Padrão recomendado:

- `pointer down`: scale entre `0.97` e `0.985` conforme tamanho;
- reduzir temporariamente a profundidade/bottom-border tátil;
- retorno por `motionSpring.press`;
- nunca bloquear a ação esperando a animação terminar.

Botões destrutivos não recebem bounce festivo.

## 8. Continuidade espacial / shared geometry

Quando o mesmo objeto existe conceitualmente em duas telas/estados, preferir continuidade espacial.

Exemplos:

- card da próxima aula na Home → detalhe da aula;
- pasta → visualização da pasta;
- FAB central → menu de criação;
- dia selecionado → semana/mês;
- plano resumido → editor do plano;
- miniatura de arquivo → viewer.

Regras:

- usar `layoutId`/shared geometry quando a continuidade for compreensível;
- preservar posição/escala/forma em vez de desmontar e montar com fade;
- não aplicar shared geometry se resultar em distorção visual difícil de ler;
- a navegação deve continuar acessível mesmo com motion desativado.

## 9. Enter/exit

### Entradas comuns

- opacity `0 → 1`;
- translateY pequeno, normalmente 6–12 px;
- scale apenas quando o objeto representa algo material/tátil.

### Saídas comuns

- opacity `1 → 0`;
- movimento menor que a entrada;
- saída deve parecer consequência, não fuga teatral.

Evitar animar telas inteiras com `slide-left/slide-right` por padrão. A transição depende da relação espacial entre origem e destino.

## 10. Layout motion

Use layout animation quando elementos mudam posição por causa de:

- filtros;
- inserção/remoção de item;
- expansão;
- reorder;
- mudança Dia/Semana/Mês;
- alteração de status;
- reagrupamento de componentes.

Os itens ao redor devem ceder espaço de forma contínua, não saltar.

## 11. Motion de números

Números que mudam como consequência direta de uma ação podem animar:

- quantidade de presentes/faltas;
- duração;
- número de alunos;
- nota/percentual quando editado;
- contadores de arquivos/notificações.

Usar rolling/hopping somente quando melhorar leitura. Não animar todos os valores de relatórios ao abrir a tela.

## 12. Animated icon language

Ícones importantes podem comunicar a própria ação.

Exemplos:

- sino oscila ao ativar lembrete;
- check se desenha ao concluir;
- seta gira/morfa ao alterar direção;
- `+` se transforma nas ações do FAB;
- sincronização gira apenas enquanto realmente sincroniza;
- salvar assume check quando persistência confirma.

Não executar animação infinita sem estado real que a justifique.

## 13. Haptics Language

### Selection

Usar para:

- mudar tab/segmento;
- selecionar dia;
- alternar presença/falta;
- escolher turma;
- ajustar um controle discreto.

### Light impact

Usar para:

- pressionar CTA importante;
- soltar objeto após reorder;
- abrir menu central de criação;
- snap de sheet/controle.

### Success

Usar para:

- chamada salva/concluída;
- plano salvo quando é uma confirmação explícita;
- setup concluído;
- backup concluído;
- compra confirmada.

### Warning/Error

Somente quando existe condição real de atenção/erro.

### Proibições

- haptic em cada tecla;
- haptic durante scroll contínuo;
- vibração repetida em animação decorativa;
- success antes de a persistência/compra realmente confirmar.

## 14. Gesture System

Gestos devem ser opcionais, nunca a única forma de executar tarefa importante.

### Drag/reorder

- iniciar após intenção clara de arrastar;
- visualmente levantar o objeto;
- itens vizinhos reorganizam com spring;
- fornecer alternativa acessível por menu/controles;
- não bloquear scroll vertical acidentalmente.

### Swipe

Usar com parcimônia para ações reversíveis. Sempre fornecer ação equivalente visível/menu.

### Long press

Pode revelar contexto, mas nunca esconder função essencial exclusivamente atrás dele.

### Sheet drag

Sheet deve acompanhar o dedo e usar snap points previsíveis. Fechar por gesto não deve descartar dados não salvos silenciosamente.

## 15. Reduced Motion

`prefers-reduced-motion` é obrigatório.

Quando reduzido:

- remover springs espaciais complexos;
- evitar zoom, morph, parallax e grandes deslocamentos;
- substituir shared transitions por fade curto quando necessário;
- manter mudança de cor/opacity para preservar feedback;
- não remover informação;
- não alterar ordem lógica do fluxo;
- manter foco e leitura estáveis.

Implementar política global equivalente a `MotionConfig reducedMotion="user"` quando Motion for React estiver disponível.

## 16. Performance budget

Meta: motion deve parecer fluido em Android intermediário, não apenas no desktop do desenvolvedor.

Preferir:

- `transform` e `opacity`;
- springs/layout calculados pela engine apropriada;
- SVG simples;
- poucas superfícies animando simultaneamente;
- listas grandes com animação limitada ao item afetado.

Evitar:

- blur animado pesado;
- sombras difusas grandes em movimento;
- filtros CSS caros;
- animação de dezenas de cards simultaneamente;
- reflow contínuo manual em JavaScript;
- loops permanentes sem necessidade.

Para interações complexas, usar Chrome DevTools Performance e Android real. O alvo perceptivo é 60 fps sem jank visível.

## 17. Motion por densidade da tela

### Narrativa

Splash, onboarding, sucesso, paywall: permite movimento mais expressivo, ainda curto.

### Operacional

Chamada, alunos, notas, arquivos: movimento menor, rápido e informativo.

### Planejamento

Permite continuidade espacial forte, especialmente calendário e editor.

### Destrutiva/sensível

Privacidade, cancelamento, exclusão de conta: motion sóbrio, previsível, sem celebração.

## 18. Anti-patterns de motion

Rejeitar:

- fade em tudo sem relação causal;
- bounce em todo botão;
- hover-only em função mobile;
- parallax decorativo;
- cards flutuando continuamente;
- partículas e confete como padrão universal;
- tilt de mouse em Android;
- cursor trail;
- spotlight seguindo ponteiro;
- matrix/background animado;
- faux Dynamic Island;
- glassmorphism animado;
- delays que impedem o trabalho;
- animação que precisa terminar para a ação responder;
- spinner infinito;
- skeleton usado para esconder lentidão local evitável;
- múltiplas gramáticas de exclusão sem motivo.

## 19. Regra de interrupção

Animações interativas devem ser interrompíveis. Se o usuário muda de ideia no meio da transição, o movimento deve continuar do estado atual em direção ao novo estado, e não aguardar a sequência anterior acabar.

Essa regra é especialmente importante para:

- tabs;
- calendário;
- FAB;
- drag/reorder;
- sheets;
- seleção de presença;
- toggles.

## 20. Regra de verdade de estado

Motion nunca pode antecipar um sucesso que ainda não aconteceu.

- compra: só anima sucesso após entitlement confirmado;
- salvamento: check final somente após persistência;
- exclusão: confirmação somente após resultado real;
- backup: success somente após arquivo/processo válido;
- sincronização: ícone de concluído somente após término.

## 21. Critério de aceite

Uma interação V2 só está pronta quando:

- o movimento tem propósito claro;
- usa token oficial;
- não atrasa a ação;
- é interrompível quando necessário;
- funciona com Reduced Motion;
- possui alternativa acessível se depender de gesto;
- não causa jank perceptível em Android real;
- haptic, se houver, corresponde ao evento real;
- a UI continua compreensível sem animação;
- a gravação de evidência foi revisada no PR.
