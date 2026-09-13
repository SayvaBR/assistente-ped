# DESIGN AUTHORITY — Assistente Pedagógico

Este documento registra decisões de design e produto explicitamente aprovadas pelo usuário e regras que nenhum agente deve reinterpretar silenciosamente.

## Precedência

Quando houver conflito, obedecer nesta ordem:

1. decisão explícita mais recente do usuário;
2. este `docs/DESIGN_AUTHORITY.md`;
3. `AGENTS.md`;
4. `docs/design-v2/` e a especificação de tela/fluxo correspondente;
5. `docs/VISUAL_IDENTITY_V2.md`;
6. `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
7. implementação legada.

Documento mais antigo não pode bloquear uma decisão explícita mais recente. Quando uma decisão mudar, atualizar a documentação em vez de manter hipóteses históricas como regra ativa.

## Princípio central

O objetivo não é apenas deixar o aplicativo funcional. O Assistente Pedagógico deve parecer um produto móvel profissional, memorável, confiável e claramente pensado para a rotina real do professor.

A UI atual é **baseline funcional, não baseline visual**. Elementos existentes podem e devem ser substituídos quando produzirem aparência genérica, defasada ou sem personalidade, desde que requisitos funcionais, privacidade, dados, acessibilidade e comportamento offline sejam preservados.

## Personalidade visual aprovada

- Friendly Professional + Tactile + Motion-led + Educational.
- Acolhedor, mas nunca infantilizado.
- Visual expressivo sem sacrificar eficiência de trabalho.
- Hierarquia forte e superfícies variadas.
- Azul e branco como assinatura dominante, com fundo azul-claro, azul vivo de ação e texto navy.
- Tipografia arredondada e forte.
- Profundidade tátil por borda/depth controlada, não sombra genérica difusa.
- Motion comunica causa e efeito; não deve ser decoração gratuita.
- SwiftUI/Apple HIG, Duolingo, iFood, Spotify, YouTube, OLX e outros produtos maduros podem inspirar princípios de qualidade, clareza, conversão e interação, mas não devem ser clonados.
- Apple HIG é referência de princípio, não autoridade de plataforma: o produto é Android/Capacitor e não deve copiar padrões iOS que conflitem com Android, acessibilidade ou a identidade V2.

## Anti-genérico — regra explícita

Rejeitar como solução padrão qualquer tela que pareça um template de dashboard/SaaS mobile.

Em especial, evitar como linguagem dominante:

- sequência de cards coloridos/pastel com a mesma estrutura;
- bloco repetido `ícone + título + subtítulo` para tudo;
- grid 2×N de ações com aparência de starter kit;
- card branco arredondado como resposta para qualquer agrupamento;
- ícone Lucide dentro de círculo ou quadrado colorido em todos os itens;
- pills/badges usados apenas para preencher espaço;
- combinação previsível `título grande + texto auxiliar + cards + CTA` em toda tela;
- bento decorativo sem função real;
- gradiente roxo/azul genérico;
- glassmorphism gratuito;
- sombras suaves genéricas em excesso;
- grandes áreas vazias sem propósito;
- hierarquia onde todos os blocos têm peso visual parecido;
- aparência de template gerado por IA ou biblioteca pronta sem adaptação forte.

Esses padrões não são proibidos individualmente; são rejeitados quando deixam a interface sem identidade.

## O que a nova identidade precisa fazer

A linguagem visual deve ser reconhecível como **Assistente Pedagógico** e não intercambiável com qualquer app de produtividade.

Isso significa trabalhar intencionalmente:

- composição e ritmo próprios;
- contraste entre áreas principais e secundárias;
- formas/superfícies com função, não decoração;
- padrões de ação que façam sentido para rotina docente;
- navegação com caráter;
- tipografia com presença;
- motion e feedback próprios;
- componentes que não pareçam apenas versões customizadas de um kit genérico.

## Ilustrações

- NÃO usar mascotes.
- NÃO usar coruja ou personagem-mascote de qualquer tipo.
- Quando ilustração humana realmente melhorar a experiência, preferir `Soft 3D Educational Character Illustration` / `Stylized 3D Character` / `Clay-style 3D`.
- Ilustrações humanas devem aparecer com parcimônia em onboarding, sucesso, ajuda ou estados especiais.
- Telas utilitárias devem permanecer funcionais e densas na medida certa.

## Proibição de redesign cosmético

Um redesign não está concluído quando o agente apenas muda cores, radius, sombra e tipografia mantendo a mesma arquitetura ruim.

Quando o problema for estrutural, o agente deve reconsiderar hierarquia, quantidade de informação simultânea, agrupamento, ordem das ações, prioridade visual, navegação, estados, feedback, densidade e ritmo.

## Motion — autoridade aprovada

O Motion System V2 é parte da identidade do produto.

- Motion for React é a engine principal quando física/shared layout/gestos forem necessários.
- CSS/WAAPI podem ser usados para transições simples.
- Kinetics, Animate UI, AnimateIcons, Rare UI e referências externas são repertório; não substituem os tokens/receitas internos.
- A sensação desejada é de interface nativa extremamente polida, inspirada em princípios de SwiftUI, sem migrar a stack.
- Toda animação relevante deve explicar causalidade, continuidade espacial, manipulação ou estado.
- Respeitar `prefers-reduced-motion`.
- Gestos não podem ser a única forma de executar ação importante.
- Haptics devem ser discretos e sem uso indiscriminado.
- Sucesso visual de save, billing, backup, sincronização ou exclusão só acontece após confirmação real da operação.

As interações assinatura aprovadas incluem calendário espacial Dia/Semana/Mês, Create Button/FAB contextual, arquivos/pastas com comportamento físico, conclusão de tarefas e microfeedback vivo de controles/ícones/contadores.

## Processo obrigatório

Grandes reformulações são permitidas quando tratadas como sistema.

1. Registrar o estado atual.
2. Identificar requisito funcional versus legado visual.
3. Definir arquitetura da nova linguagem quando o escopo for sistêmico.
4. Implementar fundações e componentes-base.
5. Validar em fluxos reais, não em tela artificial isolada.
6. Capturar screenshots Android/mobile e gravações quando houver motion relevante.
7. Comparar antes/depois.
8. Corrigir até atingir o gate visual.
9. Migrar demais fluxos de forma controlada.

## Gate visual

Uma tela NÃO passa apenas porque compila ou funciona.

Ela precisa:

- ter objetivo dominante claro;
- ter hierarquia reconhecível em poucos segundos;
- reduzir repetição visual;
- ter personalidade visual perceptível;
- não parecer template genérico;
- ter estados vazio/carregando/erro/sucesso quando aplicável;
- funcionar em 360–430 px;
- manter áreas de toque >= 48 px;
- ter contraste e legibilidade adequados;
- não depender apenas de cor para comunicar estado;
- ter screenshot real anexada ao PR;
- ter gravação suficiente para revisar motion relevante.

## Prioridade visual P0

1. Fundação Visual V2 — tokens, tipografia, superfícies, controles, navegação, motion e shell.
2. Splash / bootstrap / recuperação de erro.
3. Onboarding completo e ativação.
4. Home.
5. Shell de navegação.
6. Turma.
7. Perfil do aluno.
8. Planejamento.
9. Chamada.
10. Notas / avaliação.
11. BNCC.
12. Arquivos.
13. Relatórios.
14. Configurações.
15. Monetização/paywall e Growth, depois que a Fundação V2 e billing estiverem estáveis conforme a issue P0 correspondente.
16. Estados sistêmicos de erro, vazio e conclusão ao longo de todos os fluxos.

P0 anterior não deve ser atropelado por refinamento P1/P2.

## Onboarding — decisão atual

O onboarding é **Guided Onboarding & Personalization Setup**, com aproximadamente 2–4 minutos na rota principal. Não é carrossel de 3 slides e não deve perseguir 30+ telas por moda.

Arquitetura aprovada:

`Splash -> proposta de valor -> configuração da rotina -> contexto profissional mínimo -> dores/objetivos com consequência real -> configuração operacional mínima/primeira turma quando fizer sentido -> preview personalizado -> hard paywall -> trial/compra -> primeiro sucesso -> Home real`.

Regras:

- mostrar valor antes de pedir informação;
- uma decisão pequena por etapa quando isso reduzir carga cognitiva;
- perguntas só permanecem se tiverem consequência funcional/personalização real;
- não chamar questionário de diagnóstico se não houver diagnóstico real;
- não pedir aluno/PII no onboarding sem necessidade concreta;
- não pedir permissões do sistema antes de explicar por que são necessárias;
- retomar onboarding interrompido sem perder progresso;
- assinatura necessária deve ser comunicada com clareza antes de o usuário investir tempo excessivo.

## Home

A Home não deve ser uma lista de cartões iguais nem um dashboard SaaS genérico.

Deve responder rapidamente: o que acontece agora, o que precisa de atenção e qual a próxima ação útil.

Direção aprovada: contexto do professor -> próxima aula como elemento dominante -> ações contextuais -> agenda/planejamento -> pendências -> atividade recente -> navegação inferior. A arquitetura pode abandonar completamente o layout atual se houver solução melhor.

### Override explícito mais recente — replicação Lovable

Em 13/09/2026, o usuário aprovou o visual e os fluxos observados no projeto Lovable Pixel Perfect e determinou a replicação no app existente. Para a Home em implementação, essa decisão redefine a composição de referência: saudação e data, `Aula em foco` com metadados e ações `Fazer chamada`/`Ver plano`, `Atalhos do dia` com `Registrar observação`/`Compromissos`, agenda temporal e BottomNavigation com cinco destinos. O código baixado em `lovable-pixel-perfect-source` é referência de composição, tipografia, escala, proporções e interação.

Essa decisão não autoriza substituir repositories, persistência, domínio, offline, billing, LGPD ou navegação funcional pelo scaffolding do Lovable. A apresentação deve ser portada e ligada aos contratos reais do Assistente Pedagógico. Não usar uma ilustração gerada como substituto da composição nem gastar iterações de design em arte enquanto a equivalência estrutural, tipográfica e de fluxo não estiver validada.

## Monetização — decisão atual

A hipótese antiga `Gratuito / Pro R$19,90 / Vitalício` está **revogada** e não pode bloquear a implementação atual.

Estratégia aprovada para V1: **hard paywall depois de valor percebido**, antes da Home operacional real.

Baseline comercial para configuração inicial no Brasil:

- Pro Mensal: **R$ 24,90/mês**;
- Pro Anual: **R$ 149,90/ano**;
- anual recomendado/selecionado por padrão;
- trial de **7 dias no anual**, quando elegível;
- sem trial mensal no baseline;
- sem plano semanal no lançamento;
- sem vitalício no lançamento.

Esses valores são hipótese/configuração de lançamento. UI deve exibir preço, moeda, trial e eligibility reais vindos de Google Play/RevenueCat; nunca hardcode comercial como fonte da verdade.

O hard paywall não autoriza dark patterns. Mensal deve permanecer visível quando ofertado. Não usar desconto falso, urgência falsa, timer falso, preço riscado inventado, confirmshaming, X/voltar invisível, diagnóstico falso ou cobrança futura escondida.

A promessa principal do Pro é:

> **Menos tempo organizando. Mais clareza para ensinar.**

O Pro vende a transformação de planejamento, chamada, registros, arquivos e acompanhamento em um fluxo docente coerente. Segurança básica, LGPD, cancelamento, restore e direitos de acesso/portabilidade dos próprios dados nunca são benefícios premium.

Após expiração, os dados do usuário não podem virar reféns. Manter caminhos necessários de gerenciamento, privacidade, exclusão e portabilidade/recuperação aplicável; funcionalidades operacionais Pro podem ficar bloqueadas conforme a especificação de Growth.

## Analytics e experimentação

- RevenueCat é fonte de verdade para billing, entitlement e experimentos comerciais.
- Analytics de produto deve passar por adapter interno e allowlist estrita.
- Aptabase EU é candidato aprovado para implementação após revisão final de privacidade/licença/SDK.
- Não enviar PII, dados de aluno, turmas identificáveis, notas, frequência, observações, planos, arquivos ou texto livre para analytics.
- A/B tests devem ter hipótese, métrica primária, guardrails e decisão registrada; CTR isolado não define vencedor.

## Retenção

Retenção deve nascer de utilidade profissional, não de culpa ou vício.

Aprovado: Home contextual, primeira ação útil rápida, lembretes escolhidos pelo professor, resumo semanal útil, feedback de conclusão, suporte humano, billing recovery e win-back respeitoso.

Não usar streaks punitivos, notificações de vergonha ou medo de perda pedagógica para pressionar renovação.

## Sobre documentos conflitantes

Nenhum documento pode afirmar que uma direção foi `aprovada pelo usuário` apenas porque um agente a escreveu. Se outro documento conflitar com este ou declarar aprovação que não ocorreu explicitamente, este arquivo prevalece **exceto quando houver uma decisão explícita mais recente do usuário**, que deve então ser incorporada aqui.

Referências externas (`ui-ux-pro-max`, Apple HIG, bibliotecas, showcases, posts do X etc.) são auxiliares. Elas não podem revogar decisões do produto.

## Definition of Done visual

Todo PR visual precisa de screenshot antes, screenshot depois, estados relevantes, justificativa da arquitetura, teste em viewport móvel, build/testes e limitações conhecidas. Todo PR com motion relevante precisa de gravação, Reduced Motion e evidência suficiente para avaliar comportamento.

Sem evidência real e sem identidade própria, mudança de UI importante não está pronta.
