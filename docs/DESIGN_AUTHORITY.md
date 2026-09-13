# DESIGN AUTHORITY — Assistente Pedagógico

Este documento registra decisões de design realmente aprovadas pelo usuário e regras que nenhum agente deve reinterpretar silenciosamente.

## Princípio central

O objetivo não é apenas deixar o aplicativo funcional. O Assistente Pedagógico deve parecer um produto móvel profissional, memorável, confiável e claramente pensado para a rotina real do professor.

A implementação visual deve evitar o aspecto comum de interface gerada por IA: mesma composição repetida em todas as telas, título grande centralizado, cartões brancos empilhados, gradientes genéricos, ícone dentro de círculo em todo item, bento sem função, glassmorphism, excesso de badges, sombras genéricas e grandes áreas vazias sem intenção.

## Personalidade visual aprovada

- Friendly Professional + Tactile + Motion-led + Educational.
- Acolhedor, mas nunca infantilizado.
- Visual expressivo sem sacrificar eficiência de trabalho.
- Hierarquia forte e superfícies variadas, não uma sequência de cartões idênticos.
- Motion comunica causa e efeito; não deve ser decoração gratuita.
- Duolingo, iFood, Spotify, YouTube, OLX e outros produtos maduros podem inspirar princípios de conversão, clareza e interação, mas não devem ser clonados.

## Ilustrações

- NÃO usar mascotes.
- NÃO usar coruja ou personagem-mascote de qualquer tipo.
- Quando ilustração humana realmente melhorar a experiência, preferir `Soft 3D Educational Character Illustration` / `Stylized 3D Character` / `Clay-style 3D`.
- Ilustrações humanas devem aparecer com parcimônia em onboarding, sucesso, ajuda ou estados especiais.
- Telas utilitárias devem permanecer funcionais e densas na medida certa.

## Proibição de redesign cosmético

Um redesign não está concluído quando o agente apenas muda cores, radius, sombra e tipografia mantendo a mesma arquitetura ruim.

Quando o problema for estrutural, o agente deve reconsiderar hierarquia, quantidade de informação simultânea, agrupamento, ordem das ações, prioridade visual, navegação, estados, feedback, densidade e ritmo.

## Processo obrigatório

Nunca redesenhar dezenas de telas em lote.

1. Escolher um único fluxo prioritário.
2. Capturar o estado atual.
3. Explicar os problemas visuais/UX observados.
4. Propor a nova arquitetura antes de codificar quando a mudança for grande.
5. Implementar.
6. Capturar screenshot real Android/mobile.
7. Comparar antes/depois.
8. Corrigir até atingir o gate visual.
9. Só então seguir para outro fluxo importante.

## Gate visual

Uma tela NÃO passa apenas porque compila. Ela precisa ter objetivo dominante claro, hierarquia reconhecível em poucos segundos, reduzir repetição visual, ter estados relevantes, funcionar em 360–430 px, manter áreas de toque >= 48 px, ter contraste adequado e screenshot real anexada ao PR.

## Prioridade visual P0

1. Splash / bootstrap / recuperação de erro.
2. Onboarding completo.
3. Home.
4. Shell de navegação.
5. Turma.
6. Perfil do aluno.
7. Planejamento.
8. Chamada.
9. Notas / avaliação.
10. BNCC.
11. Arquivos.
12. Relatórios.
13. Configurações.
14. Monetização / paywall.
15. Estados de erro, vazio e conclusão.

## Onboarding

O onboarding é `Guided Onboarding & Personalization Setup`, não um formulário quebrado em várias telas iguais.

Arquitetura desejada: Welcome/proposta de valor -> tratamento/nome mínimo -> primeira turma -> etapa da PRIMEIRA TURMA -> personalização relevante -> First Class Setup -> Guided First Success -> Home configurada.

Uma decisão por vez, com consequência visual/funcional perceptível. Evitar repetir `pergunta -> retângulo -> continuar`. Não usar mascote.

## Home

A Home não deve ser uma lista de cartões brancos iguais. Deve responder rapidamente: o que acontece agora, o que precisa de atenção e qual a próxima ação útil. Usar saudação/contexto, turma, ação principal dinâmica, agenda, próximo planejamento, pendências e acessos rápidos com hierarquia visual diferente.

## Monetização

Fluxo crítico com três opções como hipótese inicial: Gratuito R$0, Pro referência R$19,90/mês e Vitalício referência R$349,90 uma vez. Valores reais devem vir da loja quando disponível.

O Pro vende economia de tempo e redução de trabalho repetido: reutilizar planos, transformar registros em relatórios, acompanhar notas/frequência/atividades/BNCC no mesmo fluxo, múltiplas turmas e exportações profissionais.

Oferta de saída pode usar desconto real e cronômetro somente com `expiresAt` persistido e promoção verdadeira. Nunca usar urgência falsa, cronômetro reiniciável, recusa escondida ou cobrança ambígua.

Segurança, LGPD e acesso aos próprios dados nunca são benefícios Pro.

## Sobre documentos conflitantes

Nenhum documento pode afirmar que uma direção visual foi `aprovada pelo usuário` apenas porque um agente a escreveu. Se outro documento conflitar com este ou declarar aprovação que não ocorreu explicitamente, este arquivo prevalece e o conflito deve ser registrado no PR.

## Definition of Done visual

Todo PR visual precisa de screenshot antes, screenshot depois, estados relevantes, justificativa da arquitetura, teste em viewport móvel, build/testes e limitações conhecidas. Sem screenshot real, mudança de UI importante não está pronta.
