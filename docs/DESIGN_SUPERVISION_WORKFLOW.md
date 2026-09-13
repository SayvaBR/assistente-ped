# Fluxo de Supervisão de Design — Assistente Pedagógico

Este documento define como Codex/Astra deve trabalhar durante a reformulação visual do produto.

## Regra principal

A UI atual é baseline funcional, não baseline visual. Grandes mudanças são permitidas quando fazem parte de uma reformulação sistêmica e preservam dados, segurança, privacidade, acessibilidade e comportamento essencial.

Não é obrigatório preservar layout, tokens, componentes, navegação visual ou padrões antigos apenas porque já existem.

## Tipos de mudança

### Fundação visual V2

Pode alterar em conjunto tokens, tipografia, iconografia, superfícies, controles, navegação, app shell, motion e componentes estruturais.

A fundação deve ser validada em mais de um contexto real antes de ser considerada pronta.

### Migração de fluxo

Depois da fundação, cada fluxo funcional deve ser migrado de forma controlada para evitar uma experiência permanentemente híbrida entre V1 e V2.

## Ciclo obrigatório

1. Ler `AGENTS.md`, `docs/DESIGN_AUTHORITY.md`, especificações funcionais e a issue.
2. Separar requisitos funcionais de legado visual.
3. Capturar o estado atual das áreas afetadas.
4. Descrever a nova arquitetura quando a mudança for estrutural.
5. Implementar no escopo definido.
6. Rodar em viewport Android realista ou dispositivo/emulador.
7. Capturar screenshots depois e estados relevantes.
8. Comparar antes/depois com critérios objetivos.
9. Corrigir até atingir o gate visual.

## Critérios visuais obrigatórios

- identidade perceptível e não genérica;
- hierarquia clara;
- personalidade amigável, profissional, tátil e educacional;
- densidade adequada à rotina docente;
- composição variada;
- componentes que parecem parte do mesmo produto;
- motion com função;
- tipografia legível e com presença;
- navegação previsível sem aparência de template;
- estados pressed/focus/disabled/loading/error/success quando aplicável;
- contraste, foco e alvo de toque acessíveis;
- teste em matriz Android adaptativa: 320, 360, 384/390, 411/412, 432, 480 e 600+ px quando a superfície tiver suporte relevante a tablet/foldable;
- teste de crescimento de texto equivalente a 100%, 115%, 130% e 150% nas superfícies críticas;
- nenhuma copy essencial cortada por `ellipsis`, `line-clamp`, `nowrap` ou altura rígida;
- nenhuma safe area cobrindo conteúdo ou interação;
- alvos de toque com pelo menos 48×48 px.

## Evidência obrigatória

Todo PR visual relevante precisa conter:

- screenshots antes;
- screenshots depois;
- estados relevantes;
- viewport/resolução;
- viewport-âncora usada para comparação e matriz Android adaptativa exercitada;
- problemas do legado que foram resolvidos;
- decisões de arquitetura visual/UX;
- componentes/tokens novos, reutilizados ou aposentados;
- build/testes;
- limitações conhecidas.

Para a matriz adaptativa, executar também `pnpm run test:v2-responsive`. Os pontos de largura são stress tests de uma composição fluida, não layouts independentes.

Caminhos locais sem imagem anexada não contam como evidência suficiente.

## Gate de aprovação

Uma entrega não passa apenas porque compila, funciona, reutiliza o design system existente ou está mais bonita que antes.

Ela passa quando função, identidade, hierarquia, acabamento, consistência, acessibilidade e experiência estiverem satisfatórios.

UI meramente funcional, genérica, parecida com dashboard SaaS, starter kit ou template de IA deve ser rejeitada.

## Rollout recomendado

1. Fundação Visual V2.
2. Splash/bootstrap/recuperação.
3. Onboarding.
4. Home e navegação principal.
5. Turmas e perfil do aluno.
6. Planejamento.
7. Chamada.
8. Notas/avaliações.
9. BNCC.
10. Arquivos.
11. Relatórios.
12. Configurações.
13. Monetização.
14. Estados vazios, erro, offline e refinamento transversal.

P0 técnico, segurança, privacidade e integridade de dados continuam tendo prioridade sobre qualquer refinamento visual.

## Iteração

Quando a revisão pedir mudanças no mesmo escopo, atualizar o mesmo PR e anexar novas evidências. Abrir novo PR quando houver mudança real de milestone, fundação ou risco técnico independente.
