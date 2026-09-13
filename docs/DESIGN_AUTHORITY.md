# DESIGN AUTHORITY — Assistente Pedagógico

Este documento registra decisões de design realmente aprovadas pelo usuário e regras que nenhum agente deve reinterpretar silenciosamente.

## Princípio central

O objetivo não é apenas deixar o aplicativo funcional. O Assistente Pedagógico deve parecer um produto móvel profissional, memorável, confiável e claramente pensado para a rotina real do professor.

A UI atual é **baseline funcional, não baseline visual**. Elementos existentes podem e devem ser substituídos quando produzirem aparência genérica, defasada ou sem personalidade.

## Personalidade visual aprovada

- Friendly Professional + Tactile + Motion-led + Educational.
- Acolhedor, mas nunca infantilizado.
- Visual expressivo sem sacrificar eficiência de trabalho.
- Hierarquia forte e superfícies variadas.
- Motion comunica causa e efeito; não deve ser decoração gratuita.
- Duolingo, iFood, Spotify, YouTube, OLX e outros produtos maduros podem inspirar princípios de conversão, clareza e interação, mas não devem ser clonados.

## Anti-genérico — regra explícita

Rejeitar como solução padrão qualquer tela que pareça um template de dashboard/SaaS mobile.

Em especial, evitar:

- sequência de cards coloridos/pastel com a mesma estrutura;
- bloco repetido `ícone + título + subtítulo` para tudo;
- grid de ações com aparência de starter kit;
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

Esses padrões não são proibidos individualmente; são rejeitados quando usados como linguagem dominante e deixam a interface sem identidade.

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

## Processo obrigatório

Grandes reformulações são permitidas quando tratadas como sistema.

1. Registrar o estado atual.
2. Identificar o que é requisito funcional e o que é apenas legado visual.
3. Definir a arquitetura da nova linguagem visual quando o escopo for sistêmico.
4. Implementar fundações e componentes-base.
5. Validar em fluxos reais, não em tela isolada artificial.
6. Capturar screenshots Android/mobile.
7. Comparar antes/depois.
8. Corrigir até atingir o gate visual.
9. Migrar os demais fluxos de forma controlada.

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
- ter screenshot real anexada ao PR.

## Prioridade visual P0

1. Fundação Visual V2 — tokens, tipografia, superfícies, controles, navegação, motion e shell.
2. Splash / bootstrap / recuperação de erro.
3. Onboarding completo.
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
15. Monetização / paywall.
16. Estados de erro, vazio e conclusão.

## Onboarding

O onboarding é `Guided Onboarding & Personalization Setup`, não um formulário quebrado em várias telas iguais.

Arquitetura desejada: Welcome/proposta de valor -> tratamento/nome mínimo -> primeira turma -> etapa da PRIMEIRA TURMA -> personalização relevante -> First Class Setup -> Guided First Success -> Home configurada.

Uma decisão por vez, com consequência visual/funcional perceptível. Evitar repetir `pergunta -> retângulo -> continuar`. Não usar mascote.

## Home

A Home não deve ser uma lista de cartões iguais nem um dashboard SaaS genérico.

Deve responder rapidamente: o que acontece agora, o que precisa de atenção e qual a próxima ação útil.

A arquitetura pode abandonar completamente o layout atual se houver uma solução melhor.

## Monetização

Fluxo crítico com três opções como hipótese inicial: Gratuito R$0, Pro referência R$19,90/mês e Vitalício referência R$349,90 uma vez. Valores reais devem vir da loja quando disponível.

O Pro vende economia de tempo e redução de trabalho repetido: reutilizar planos, transformar registros em relatórios, acompanhar notas/frequência/atividades/BNCC no mesmo fluxo, múltiplas turmas e exportações profissionais.

Oferta de saída pode usar desconto real e cronômetro somente com `expiresAt` persistido e promoção verdadeira. Nunca usar urgência falsa, cronômetro reiniciável, recusa escondida ou cobrança ambígua.

Segurança, LGPD e acesso aos próprios dados nunca são benefícios Pro.

## Sobre documentos conflitantes

Nenhum documento pode afirmar que uma direção visual foi `aprovada pelo usuário` apenas porque um agente a escreveu. Se outro documento conflitar com este ou declarar aprovação que não ocorreu explicitamente, este arquivo prevalece e o conflito deve ser registrado no PR.

## Definition of Done visual

Todo PR visual precisa de screenshot antes, screenshot depois, estados relevantes, justificativa da arquitetura, teste em viewport móvel, build/testes e limitações conhecidas.

Sem screenshot real e sem evidência de identidade própria, mudança de UI importante não está pronta.
