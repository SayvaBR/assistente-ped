# Fluxo de Supervisão de Design — Assistente Pedagógico

Este documento define como Codex/Astra deve trabalhar em mudanças visuais. O objetivo agora não é conservar a aparência atual: é substituir uma identidade genérica por uma linguagem visual própria, coerente, acessível e claramente reconhecível como Assistente Pedagógico.

## Regra principal

A UI existente não é baseline visual obrigatório. Fluxos e telas podem ser redesenhados profundamente quando a mudança melhora identidade, hierarquia, usabilidade e coerência.

O que não pode ser sacrificado em nome do redesign: segurança, privacidade, integridade de dados, requisitos pedagógicos, acessibilidade, funcionamento essencial e compatibilidade de dados.

## Estratégia de reformulação

Mudanças sistêmicas são permitidas e desejáveis nesta fase. Ainda assim, devem ser organizadas em blocos revisáveis.

A sequência esperada é:

1. definir foundations e tokens;
2. definir shell/navegação global;
3. definir componentes estruturais;
4. aplicar em um fluxo principal de referência;
5. revisar visualmente em profundidade;
6. expandir para os demais fluxos de forma consistente.

Não é necessário preservar layouts antigos por cautela. Também não é aceitável redesenhar dezenas de telas sem evidência suficiente para revisão.

## Ciclo obrigatório para UI

1. Ler `AGENTS.md`, `docs/VISUAL_IDENTITY_V2.md`, especificações de produto e este arquivo.
2. Identificar quais padrões sistêmicos a tarefa introduz ou altera.
3. Implementar o escopo da issue sem copiar automaticamente os componentes legados.
4. Rodar o app em viewport Android realista ou dispositivo/emulador.
5. Capturar screenshots antes/depois.
6. Capturar estados relevantes: loading, empty, erro, disabled, pressed, offline e overflow quando aplicável.
7. Anexar screenshots diretamente no PR ou comentário do PR.
8. Explicar decisões visuais, componentes novos/reutilizados e impacto no design system.
9. Rodar build, lint e testes disponíveis.
10. Só marcar pronto quando o gate funcional e o gate visual estiverem satisfeitos.

## Critérios visuais obrigatórios

- personalidade reconhecível e consistente;
- hierarquia clara e ação principal evidente;
- tipografia legível e intencional;
- espaçamento e ritmo coerentes;
- componentes com função clara, sem “cardificar” tudo;
- superfícies, controles e estados com sensação tátil e deliberada;
- evitar aparência genérica de dashboard/template/UI gerada por IA;
- evitar gradientes decorativos gratuitos, glassmorphism, bento genérico, excesso de sombras e ícones circulares repetitivos;
- identidade educacional profissional, amigável e contemporânea;
- não usar mascotes como solução automática de personalidade;
- ilustração deve ter função, não apenas preencher espaço;
- componentes recorrentes devem obedecer tokens e padrões do Design System;
- estados pressed/focus/disabled/loading/error devem ser pensados quando aplicável;
- contraste, legibilidade e alvos de toque devem atender acessibilidade;
- a versão mobile Android é referência prioritária para composição e ergonomia.

## Regra anti-genericidade

Um PR deve ser revisado negativamente se entregar UI que seja apenas:

- Material/Bootstrap/shadcn-like sem adaptação suficiente;
- um conjunto padrão de cards brancos com ícones coloridos;
- dashboard com seções intercambiáveis sem identidade do produto;
- visual “bonito” mas sem relação com o trabalho docente;
- réplica direta de outro produto;
- tela tecnicamente correta, porém sem hierarquia, ritmo ou personalidade.

## Evidência obrigatória para revisão

Todo PR visual precisa conter:

- screenshot antes;
- screenshot depois;
- screenshots dos estados relevantes;
- resolução/viewport usado;
- resumo do que mudou;
- decisões de design;
- componentes/tokens introduzidos ou alterados;
- limitações ou problemas conhecidos;
- confirmação de build/testes.

Para revisão pelo ChatGPT, preferir anexar as imagens diretamente no corpo/comentário do PR no GitHub.

## Gate de aprovação

Uma tela não está aprovada porque:

- compila;
- funciona no happy path;
- usa os componentes corretos;
- ficou parecida com outra tela;
- está apenas “melhor que antes”.

Ela só avança quando função, hierarquia, identidade, acabamento, consistência, acessibilidade e experiência estiverem satisfatórios.

## Ordem recomendada da transformação V2

1. Foundations: cores, tipografia, spacing, radius, elevation/depth, motion, iconografia
2. Shell: app bar, bottom navigation, navegação secundária, page scaffold
3. Home como tela-piloto de identidade
4. Planejamento e plano de aula
5. Turmas e visão do dia
6. Perfil do aluno
7. Chamada/frequência
8. BNCC
9. Arquivos
10. Relatórios
11. Configurações
12. Onboarding, empty, erro, offline e estados de sistema
13. Monetização/paywall apenas quando produto e política permitirem

## Regra de iteração

Se a revisão pedir mudanças, o mesmo PR deve ser atualizado e novas screenshots devem ser anexadas, salvo quando a mudança exigir uma refatoração sistêmica separada.

Quando um padrão criado para uma tela passar no gate visual, ele deve ser promovido para foundation/componente compartilhado antes de ser copiado para muitas outras telas.
