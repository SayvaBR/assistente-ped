# Apple-inspired Design Application Guide — Assistente Pedagógico

> **Objetivo:** traduzir princípios maduros de design da Apple para o Assistente Pedagógico sem copiar a aparência do iOS e sem transformar Android/Capacitor em um clone de SwiftUI.
>
> **Precedência:** decisão explícita mais recente do usuário > `docs/DESIGN_AUTHORITY.md` > este guia > referências externas.
>
> **Frase-guia:** **Interface familiar. Conteúdo próprio. Movimento físico. Linguagem humana. Marca discreta. Detalhes impecáveis.**

## 1. O que estamos adotando — e o que não estamos

O Assistente Pedagógico é Android/React/Vite/Capacitor. Apple HIG e WWDC são referência de disciplina de produto, craft e comportamento, não autoridade de plataforma.

Adotar:

- clareza de propósito;
- familiaridade em controles utilitários;
- identidade forte no conteúdo do domínio;
- agência do usuário;
- continuidade e preservação de contexto;
- motion com causalidade;
- feedback imediato e proporcional;
- tipografia e nomenclatura conscientes;
- acessibilidade como parte do design;
- branding discreto e reconhecível sem depender de logo repetido;
- cuidado obsessivo com detalhes, estados e transições.

Não adotar automaticamente:

- Liquid Glass;
- padrões iOS quando conflitam com Android;
- blur/translucência como estética dominante;
- SF Symbols como linguagem principal;
- navegação iOS específica;
- materiais ou controles Apple apenas por parecerem premium;
- animações decorativas sem função;
- “Apple-like” como substituto da identidade V2.

## 2. Emoção alvo

O produto deve transmitir três sensações principais:

1. **Calma** — o professor entende onde está e o que fazer sem excesso de estímulo.
2. **Competência** — o aplicativo parece conhecer a rotina docente e responde de forma previsível.
3. **Controle** — ações, dados e estado nunca parecem desaparecer ou acontecer sem confirmação clara.

Durante review, perguntar:

- Entendo onde estou em poucos segundos?
- Sei qual é a próxima ação útil?
- Confio que o que fiz foi salvo?
- O app está me ajudando ou me dando trabalho adicional?

## 3. UI layer vs. content layer

Separar mentalmente duas camadas.

### UI layer — familiaridade primeiro

Controles e comportamentos utilitários devem ser reconhecíveis para quem já usa Android:

- voltar;
- pesquisar;
- compartilhar;
- editar;
- excluir;
- mais opções;
- sheets/dialogs;
- permissões;
- teclado/IME;
- date/time pickers;
- seletor de arquivos;
- gestos de sistema;
- navegação Back.

Não transformar esses elementos em branding gratuito.

### Content layer — identidade forte

Investir personalidade onde o produto é único:

- Aula em foco;
- Planejamento Dia/Semana/Mês;
- timeline de aula;
- chamada/frequência;
- turma e contexto docente;
- registro pedagógico;
- BNCC;
- acompanhamento do aluno;
- organização pedagógica de arquivos;
- onboarding;
- estados de conclusão e recuperação;
- visualizações de frequência e progresso pedagógico.

Esses elementos podem ser visualmente reconhecíveis como Assistente Pedagógico.

## 4. Branding

Marca não significa repetir logo, nome e slogan em toda tela.

Regras:

- não repetir logo onde o contexto do app já está claro;
- não ocupar espaço útil com versão, slogan ou assinatura de marca sem função;
- branding deve aparecer por tipografia, cor, ritmo, formas, iconografia própria, motion e linguagem;
- uma tela deve parecer Assistente Pedagógico mesmo se o logo estiver oculto;
- conteúdo pedagógico é protagonista; branding nunca deve competir com ele.

### Launch/Splash

Separar:

`native Android launch splash -> app pronta -> first-run/welcome ou contexto restaurado`

Launch splash deve ser curta e simples. Não usar:

- slogan;
- porcentagem;
- barra de progresso artificial;
- Android 1.0;
- chips de marketing;
- múltiplos ícones auxiliares;
- texto duplicando o logotipo.

Se houver carregamento perceptível, usar estado de loading dentro da aplicação, não prolongar a splash para exibir marketing.

## 5. App icon

O ícone deve nascer de uma única ideia forte.

Critérios:

- reconhecível em tamanho pequeno;
- memorável em monocromático;
- sem texto;
- sem excesso de detalhes;
- não depender de duas metáforas concorrentes;
- funcionar como Android Adaptive Icon;
- prever foreground, background e monochrome/themed icon;
- respeitar safe zone de máscaras Android.

O atual conceito `livro aberto + check` não deve ser considerado definitivo apenas por já existir.

Tratar redesign do ícone como Delivery Unit própria de identidade.

## 6. Cor como semântica

Paleta atual é identidade e deve ser preservada salvo decisão explícita contrária.

Uso recomendado:

- **azul forte:** ação principal, seleção, estado ativo, foco;
- **azul claro:** ambiente, contexto, agrupamento;
- **branco:** superfície de trabalho;
- **navy:** hierarquia e conteúdo textual;
- cores de success/warning/danger apenas quando comunicam estado real.

Regra: **se tudo chama atenção, nada chama atenção**.

## 7. Tipografia como identidade

Manter a família aprovada, mas tratar tipografia como sistema de papéis e não apenas tamanhos.

Papéis mínimos:

- Display;
- Screen title;
- Section title;
- Body;
- Label/control;
- Metadata/supporting text.

Regras:

- display/headings podem ter tracking mais fechado;
- texto pequeno precisa de legibilidade acima de personalidade;
- line-height deve acompanhar o papel;
- peso + tamanho + leading definem hierarquia juntos;
- não diminuir texto apenas para esconder problema de layout;
- testar 130%, 150% e 200% nos fluxos críticos;
- truncamento de ação/navegação é finding, não solução.

## 8. Nomenclatura e UX Writing

Texto é parte do design.

Preferir linguagem:

- curta;
- concreta;
- contextual;
- orientada à ação;
- sem slogans corporativos dentro da interface;
- sem linguagem artificialmente “inspiradora”.

Preferir:

- `Sua próxima aula`
- `Chamada salva`
- `Adicionar aluno`
- `Mover para outra pasta`
- `Este plano foi salvo neste aparelho.`

Evitar copy vaga como:

- `Seu espaço de trabalho` quando não acrescenta contexto;
- slogans repetidos;
- trios abstratos como `Planejar · Acompanhar · Transformar` usados como decoração;
- frases promocionais dentro de fluxos operacionais.

### Naming gate

Quando uma label não cabe, não reduzir fonte automaticamente. Primeiro perguntar se o nome é o melhor para o contexto.

Exemplo: `Planejamento` na bottom navigation deve ser avaliado também como problema de naming (`Planejar`, `Planos` etc.), não apenas de CSS.

## 9. Onboarding: aprender fazendo

Onboarding não deve ser manual disfarçado.

Regras:

- mostrar valor antes de pedir informação;
- uma decisão pequena por etapa quando reduz carga cognitiva;
- ensinar através de tarefas reais;
- não explicar todas as abas antes do uso;
- usar dicas contextuais no primeiro uso de uma função;
- preservar progresso quando interrompido;
- não pedir PII/aluno sem necessidade;
- não pedir permissão Android antes de explicar por quê;
- o professor deve conseguir concluir a jornada sem roteiro externo de cliques.

Mental model:

`entender rotina -> configurar contexto -> criar primeira turma quando necessário -> ver consequência real -> continuar`

## 10. Motion System — comportamento antes de animação

Motion deve comunicar:

- causalidade;
- continuidade espacial;
- mudança de estado;
- manipulação direta;
- prioridade;
- confirmação.

### Resposta imediata

- pressables devem responder no toque/press-down;
- feedback não deve esperar o fim da ação para começar;
- evitar latência artificial.

### Continuidade espacial

- elemento entra e sai de forma coerente com sua origem;
- transições reversíveis devem parecer reversíveis;
- quando uma mudança deriva de um elemento tocado, preservar relação espacial quando isso realmente ajuda compreensão.

### Springs

Usar springs para elementos físicos/gestuais quando houver benefício. Não usar bounce por decoração.

Ponto de partida experimental, não lei:

- damping próximo de crítico para UI normal;
- resposta rápida (~0,3–0,4 s) para sheets/reposition;
- overshoot apenas quando a interação teve momentum real.

Testar sensação em Android físico.

### Interrupção

- não bloquear input durante transições sem necessidade;
- animações gestuais devem poder ser redirecionadas quando tecnicamente viável;
- drag deve acompanhar o dedo de forma contínua.

## 11. Reduced Motion

`prefers-reduced-motion` não deve significar ausência total de feedback.

Normal:

- translate/shared layout/spring quando útil.

Reduced Motion:

- crossfade curto;
- sem bounce;
- sem parallax;
- sem grandes deslocamentos;
- feedback visual continua presente.

Evitar reduzir todos os tempos a ~1 ms como solução universal quando isso remove compreensão de estado.

## 12. Haptics

Haptic é semântico, não decorativo.

Usar com parcimônia em eventos reais:

- chamada salva;
- plano salvo;
- backup concluído;
- compra concluída;
- erro importante;
- snap/selection quando realmente físico.

Não vibrar em cada botão.

Visual + haptic devem parecer causados pelo mesmo evento.

## 13. Feedback e confiança

Preferir feedback contextual perto da ação em vez de modal genérico de sucesso.

Exemplos:

- `Plano salvo agora ✓`
- `28 presentes · salva às 08:14`

Regras:

- sucesso só após operação confirmada;
- erro deve explicar recuperação possível;
- estado salvo/sincronizado/offline deve ser compreensível;
- não usar animação de sucesso para mascarar operação ainda pendente.

## 14. Continuidade e restauração de contexto

Fluxos críticos devem preservar contexto quando o app vai para background/reabre, quando tecnicamente seguro.

Prioridades:

- chamada no aluno/status atual;
- plano aberto;
- pasta de Arquivos;
- perfil do aluno;
- onboarding em progresso;
- scroll/seleção quando relevante.

Voltar para Home por padrão após interrupção é regressão quando o usuário claramente estava no meio de uma tarefa.

## 15. Componentes customizados que merecem investimento

Investir craft especial em componentes de domínio:

- Aula em foco;
- Planning Day/Week/Month;
- timeline de aula;
- chamada;
- turma;
- BNCC;
- acompanhamento pedagógico;
- biblioteca de arquivos;
- estados de conclusão importantes.

Não gastar o mesmo nível de customização em menus utilitários como `Renomear / Mover / Excluir`.

## 16. Safe areas, teclado e Android real

Safe areas fazem parte do design, não apenas infraestrutura.

Todo fluxo candidato deve considerar:

- status bar;
- cutout;
- navigation/gesture bar;
- bottom navigation;
- IME/teclado;
- Android Back;
- scroll até o último controle;
- touch target;
- reabertura;
- orientação quando suportada.

Browser/UI Lab encontra muitos problemas; Android físico continua necessário para release confidence.

## 17. Professor QA como gate de produto

Critério final não é apenas `testes passaram`.

Pergunta final:

> **Um professor consegue realizar sozinho o trabalho que o aplicativo promete, sem conhecer a implementação?**

Professor Real Device Tester deve começar black-box e registrar como finding também:

- confusão;
- falta de confirmação;
- ação difícil de descobrir;
- navegação inesperada;
- dead end;
- perda de contexto;
- layout coberto;
- teclado escondendo ação;
- inconsistência entre promessa e comportamento.

## 18. Revisão de telas existentes

Este guia **não autoriza redesign massivo em um único PR**.

Aplicação correta:

1. escolher uma Delivery Unit real;
2. observar estado atual via Live Design/Android;
3. identificar no máximo 1–3 problemas de maior impacto;
4. decidir se o problema é de hierarquia, linguagem, componente, motion ou plataforma;
5. corrigir o principal;
6. re-observar;
7. repetir até candidata forte;
8. validar 360/412/480 + acessibilidade proporcional ao risco;
9. registrar evidência.

Não reabrir uma tela apenas porque este documento existe. Priorizar P0/P1, jornadas críticas e findings reais do Professor QA.

## 19. Gate Apple-inspired de craft

Antes de PASS visual/UX, responder:

1. **Purpose:** cada elemento importante tem função clara?
2. **Agency:** o professor sente controle e consegue voltar/cancelar quando apropriado?
3. **Familiarity:** controles utilitários seguem expectativas Android?
4. **Simplicity:** existe algo que pode ser removido sem perder entendimento?
5. **Craft:** nomes, alinhamentos, estados, feedback e transições parecem deliberados?
6. **Continuity:** a interface preserva contexto entre ações e interrupções?
7. **Accessibility:** texto, motion, toque, contraste, safe areas e teclado continuam utilizáveis?
8. **Identity:** a tela parece Assistente Pedagógico sem precisar repetir logo/slogan?
9. **Delight:** há prazer por resposta, clareza e acabamento — não por decoração gratuita?

Se um problema relevante falhar nesses pontos, retornar `ITERATE`.

## 20. Prioridade Android 1.0

Adotar antes da 1.0 quando ainda faltar ou houver finding real:

- novo app icon/adaptive icon;
- launch/splash correta;
- naming/navigation pass;
- UX Writing pass;
- Motion System Core;
- Reduced Motion apropriado;
- haptics essenciais;
- feedback de save/error;
- preservação de contexto em jornadas críticas;
- safe-area/keyboard/Back QA;
- Professor Real Device QA.

Não atrasar 1.0 apenas para:

- motion sofisticado em toda tela;
- drag-and-drop avançado;
- efeitos decorativos;
- temas adicionais;
- tablet completo se não fizer parte do gate atual;
- widgets/live activities equivalentes;
- customização extrema de componentes utilitários.

## 21. Fontes de referência

Referências oficiais Apple estudadas:

- https://developer.apple.com/ios/
- https://developer.apple.com/ios/get-started/
- https://developer.apple.com/swiftui/
- https://developer.apple.com/documentation/
- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/app-store/marketing/guidelines/
- https://developer.apple.com/library/archive/navigation/

Referência comunitária complementar, não autoridade oficial:

- https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md

Use essas fontes para princípios de craft, motion e linguagem. Sempre adaptar ao Android/Capacitor e ao `DESIGN_AUTHORITY.md`.
