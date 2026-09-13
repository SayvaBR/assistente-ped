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

## Documentos deste sistema

- `FOUNDATIONS.md` — tokens, cor, tipografia, spacing, radius, depth, iconografia, motion, grid, acessibilidade e estados.
- `COMPONENTS.md` — catálogo de primitives e componentes de produto, anatomia, variantes, comportamento e anti-patterns.
- `SCREEN_PATTERNS_AND_FLOWS.md` — arquitetura dos fluxos, padrões de tela e blueprint das áreas principais.
- `IMPLEMENTATION_PLAYBOOK.md` — como o Codex deve migrar o app, organização de código, testes, evidências e gate de aprovação.
- `VISUAL_QA_CHECKLIST.md` — checklist obrigatória de revisão visual, acessibilidade, estados, privacidade, billing e aprovação.

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
- navegação inferior simples, estável e reconhecível.

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

Cards são permitidos quando representam uma unidade real de conteúdo, decisão ou ação. Eles não podem substituir hierarquia, ritmo ou arquitetura.

## Teste de identidade

Antes de aprovar uma tela, responder:

> Se o logotipo e o nome “Assistente Pedagógico” fossem removidos, a tela ainda pareceria parte de um produto com linguagem própria?

Se a resposta for “não”, a tela ainda não atingiu a V2.

## Regras não negociáveis

A reformulação visual não pode enfraquecer:

- LGPD e privacidade;
- proteção de dados de alunos e dados pedagógicos;
- funcionamento offline do núcleo do app;
- persistência e migração de dados;
- acessibilidade;
- integridade de assinatura/billing;
- clareza de ações destrutivas;
- estados de erro e recuperação.

Não usar mascote. Ilustração humana é recurso narrativo, não personagem permanente.

## Processo de evolução

O Design System V2 é um sistema vivo, mas não pode virar improvisação. Toda alteração sistêmica deve ser feita via token/componente, documentada e validada em telas reais antes de se espalhar.

A ordem de implementação recomendada é: foundations → primitives → shell/navegação → componentes de domínio → fluxos P0 → demais fluxos.
