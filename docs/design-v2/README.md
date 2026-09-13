# Assistente Pedagógico — Design System V2

Este diretório é a especificação implementável da identidade visual V2 do Assistente Pedagógico. Ele existe para transformar a direção visual aprovada em regras que Codex/Astra consigam aplicar no produto real sem voltar ao padrão genérico de dashboard, starter kit ou UI de IA.

## Autoridade e precedência

Quando houver conflito, obedecer nesta ordem:

1. decisão explícita mais recente do usuário;
2. `docs/DESIGN_AUTHORITY.md`;
3. este diretório `docs/design-v2/`;
4. `docs/VISUAL_IDENTITY_V2.md`;
5. `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
6. componentes/tokens existentes no código legado.

O código atual é baseline funcional, não baseline visual. Componentes existentes podem ser substituídos quando impedirem a identidade V2.

## Leitura obrigatória antes de implementar UI

1. `FOUNDATIONS.md`
2. `COMPONENTS.md`
3. `MOTION_SYSTEM_V2.md`
4. `MOTION_SIGNATURE_INTERACTIONS.md` quando a tela possuir interação relevante
5. `SCREEN_SPEC_INDEX.md`
6. volume `SCREEN_SPEC_*` correspondente à tela
7. `RUNTIME_RESOURCE_MAP.md`
8. `IMPLEMENTATION_PLAYBOOK.md`
9. `VISUAL_QA_CHECKLIST.md`
10. `MOTION_QA_CHECKLIST.md` quando houver motion/gesto/haptic

Não implementar uma tela V2 apenas olhando um mockup. A especificação de tela define comportamento, posição, dados, serviços, estados e critérios de aceite. Da mesma forma, não implementar animação apenas olhando um vídeo de referência: o Motion System define causalidade, física, acessibilidade, haptics, performance e fallback de Reduced Motion.

## Documentos deste sistema

### Fundamentos e componentes

- `FOUNDATIONS.md` — tokens, cor, tipografia, spacing, radius, depth, iconografia, grid, acessibilidade e estados.
- `COMPONENTS.md` — catálogo de primitives e componentes de produto, anatomia, variantes, comportamento e anti-patterns.
- `SCREEN_PATTERNS_AND_FLOWS.md` — arquitetura geral dos fluxos e padrões de tela.

### Motion System

- `MOTION_SYSTEM_V2.md` — filosofia, engine, tokens de duração/spring, shared geometry, icon motion, haptics, gestos, Reduced Motion, performance e anti-patterns.
- `MOTION_SIGNATURE_INTERACTIONS.md` — receitas das interações assinatura: calendário espacial, Create Button/FAB, pastas/reorder, conclusão, chamada, duration picker, câmera, notificações, paywall e descarte.
- `MOTION_REFERENCE_MATRIX.md` — triagem das referências externas: o que adotar, adaptar, estudar, colocar em backlog ou cortar.
- `MOTION_QA_CHECKLIST.md` — evidência obrigatória, gravações, Android real, interrupção, Reduced Motion, haptics, gestos, performance e gate final.

### Especificação completa das 62 telas/fluxos

- `SCREEN_SPEC_INDEX.md` — índice mestre e regras globais.
- `SCREEN_SPEC_01_ENTRY_ACCOUNT_SUBSCRIPTION.md` — Splash, onboarding, cadastro, login, setup, plano, paywall, confirmação e primeiro sucesso.
- `SCREEN_SPEC_02_HOME_DAILY_WORK.md` — Home, chamada, observação, agenda e atividade recente.
- `SCREEN_SPEC_03_PLANNING.md` — visão geral, dia, semana, mês, plano de aula, BNCC e atividades.
- `SCREEN_SPEC_04_CLASSES_STUDENTS_ACADEMIC.md` — turmas, alunos, frequência, registros, histórico, notas e avaliações.
- `SCREEN_SPEC_05_FILES_REPORTS_MORE.md` — arquivos, pastas, importação, lixeira, relatórios, perfil, ferramentas, notificações e Mais.
- `SCREEN_SPEC_06_SETTINGS_LIFECYCLE_SYSTEM_STATES.md` — configurações, acessibilidade, privacidade, backup, suporte, assinatura, estados, logout e exclusão de conta.
- `RUNTIME_RESOURCE_MAP.md` — quais screens, repositories, domains, plugins Capacitor, RevenueCat e testes usar em cada área.

### Implementação e QA

- `IMPLEMENTATION_PLAYBOOK.md` — como o Codex deve migrar o app, organização de código, testes, evidências e gate de aprovação.
- `VISUAL_QA_CHECKLIST.md` — checklist obrigatória de revisão visual, acessibilidade, estados, privacidade, billing e aprovação.
- `MOTION_QA_CHECKLIST.md` — checklist obrigatória para qualquer PR com animação, transição, gesto ou haptic.

## Objetivo de identidade

O Assistente Pedagógico deve parecer um produto criado especificamente para professores: acolhedor, profissional, tátil, claro e expressivo. A interface precisa ter personalidade suficiente para continuar reconhecível mesmo se o nome do produto for removido da tela.

A estética aprovada até aqui combina:

- azul e branco como assinatura dominante;
- fundo azul-claro respirável;
- tipografia arredondada e forte;
- superfícies claras e muito legíveis;
- elementos táteis com borda/depth controlada;
- ilustração humana suave em momentos narrativos;
- iconografia simples e consistente;
- densidade organizada nas telas de trabalho;
- grande diferença de peso entre conteúdo principal, secundário e utilitário;
- navegação inferior simples, estável e reconhecível;
- movimento causal e contínuo, com springs coerentes, shared geometry e feedback físico discreto.

## Regra principal anti-genérico

Não resolver arquitetura de informação com uma coleção de cards iguais.

É motivo de rejeição quando uma tela usa de forma dominante:

- grid 2×N de atalhos;
- ícone em quadrado/círculo pastel + título + subtítulo + chevron;
- card branco arredondado para toda e qualquer informação;
- todos os blocos com o mesmo peso visual;
- excesso de pills/badges;
- título grande + subtítulo + vários cards + CTA como fórmula repetida em todas as telas;
- gradiente decorativo, glassmorphism, bento sem função, sombra genérica ou ícones decorativos repetidos;
- layout que poderia pertencer a qualquer app de produtividade.

Também é motivo de rejeição usar motion como maquiagem:

- bounce em tudo;
- fade genérico em todas as rotas;
- partículas/confete universal;
- hover effects de desktop em fluxo mobile;
- cursor trail, spotlight, matrix ou parallax gratuito;
- falsa Dynamic Island;
- animação que atrasa a tarefa;
- sucesso animado antes da operação real concluir.

Cards são permitidos quando representam uma unidade real de conteúdo, decisão ou ação. Eles não podem substituir hierarquia, ritmo ou arquitetura. Motion é permitido quando explica causalidade, continuidade ou estado; ele não pode substituir clareza.

## Teste de identidade

Antes de aprovar uma tela, responder:

> Se o logotipo e o nome “Assistente Pedagógico” fossem removidos, a tela ainda pareceria parte de um produto com linguagem própria?

Antes de aprovar uma interação, responder:

> Se a animação fosse removida, ainda entenderíamos a tarefa — e, com ela, a relação entre ação e resultado ficou mais clara e prazerosa?

Se a primeira resposta for “não”, a tela ainda não atingiu a V2. Se a segunda resposta for “não”, o motion precisa ser simplificado ou removido.

## Regras não negociáveis

A reformulação visual e de motion não pode enfraquecer:

- LGPD e privacidade;
- proteção de dados de alunos e dados pedagógicos;
- funcionamento offline do núcleo do app;
- persistência e migração de dados;
- acessibilidade;
- Reduced Motion;
- integridade de assinatura/billing;
- clareza de ações destrutivas;
- estados de erro e recuperação.

Não usar mascote. Ilustração humana é recurso narrativo, não personagem permanente.

## Processo de evolução

O Design System V2 é um sistema vivo, mas não pode virar improvisação. Toda alteração sistêmica deve ser feita via token/componente, documentada e validada em telas reais antes de se espalhar.

A ordem de implementação recomendada é: foundations → motion primitives → shell/navegação → componentes de domínio → fluxos P0 → interações assinatura → demais fluxos.

As interações assinatura devem ser implementadas progressivamente e validadas em Android real; não tentar colocar todo o repertório de motion no primeiro PR.