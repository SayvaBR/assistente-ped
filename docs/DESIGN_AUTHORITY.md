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

Quando o problema for estrutural, o agente deve reconsiderar:

- hierarquia;
- quantidade de informação simultânea;
- agrupamento;
- ordem das ações;
- prioridade visual;
- comportamento de navegação;
- estados;
- feedback;
- densidade;
- ritmo da tela.

## Processo obrigatório

Nunca redesenhar dezenas de telas em lote.

Fluxo correto:

1. Escolher um único fluxo prioritário.
2. Capturar o estado atual.
3. Explicar os problemas visuais/UX observados.
4. Propor a nova arquitetura da tela antes de codificar quando a mudança for grande.
5. Implementar.
6. Capturar screenshot real Android/mobile após a implementação.
7. Comparar antes/depois.
8. Corrigir até atingir o gate visual.
9. Só então seguir para outro fluxo importante.

## Gate visual

Uma tela NÃO passa apenas porque compila.

Ela precisa:

- ter um objetivo dominante claro;
- ter hierarquia reconhecível em poucos segundos;
- reduzir repetição visual;
- ter estados vazio/carregando/erro/sucesso quando aplicável;
- funcionar em 360–430 px;
- manter áreas de toque >= 48 px;
- ter contraste e legibilidade adequados;
- não depender apenas de cor para comunicar estado;
- ter screenshot real anexada ao PR;
- não parecer template genérico ou reskin do legado.

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

Arquitetura desejada:

- Welcome / proposta de valor.
- Preferência de tratamento/nome quando necessário.
- Profile Setup mínimo.
- Primeira turma.
- Etapa da PRIMEIRA TURMA, não etapa global do professor.
- Personalização relevante.
- First Class Setup.
- Guided First Success.
- Handoff para Home já configurada.

Regras:

- uma decisão por vez;
- cada resposta deve produzir consequência visual ou funcional perceptível;
- evitar repetir `pergunta -> retângulo -> continuar` em todas as etapas;
- usar progressão e contexto;
- não usar mascote;
- ilustração humana 3D suave apenas quando ajudar a narrativa.

## Home

A Home não deve ser uma lista de cartões brancos iguais.

Deve responder rapidamente:

- O que está acontecendo agora?
- O que precisa da minha atenção?
- Qual é a próxima ação útil?

Estrutura recomendada:

- saudação/contexto do dia sem título gigante desperdiçando viewport;
- contexto da turma quando existir;
- ação principal dinâmica (ex.: chamada pendente);
- agenda/próximo compromisso;
- próximo planejamento/aula;
- pendências relevantes;
- acessos rápidos secundários com tratamento visual diferente do conteúdo principal.

## Monetização

A monetização é parte crítica do produto e deve ter fluxo próprio.

Planos de produto em estudo/aprovados como hipótese inicial:

- Gratuito — R$ 0.
- Pro — referência inicial R$ 19,90/mês.
- Vitalício — referência inicial R$ 349,90 uma vez.

Esses valores devem ser tratados como hipótese até a configuração real da loja; nunca hardcode preço comercial como verdade se a loja fornecer outro valor.

Narrativa:

- Gratuito: começar e organizar o essencial.
- Pro: economizar tempo toda semana e reduzir trabalho repetido.
- Vitalício: pagar uma vez pelo núcleo premium permanente.

O Pro deve vender benefício real, não `recursos avançados` genéricos. Exemplos de valor:

- planejar uma vez e reaproveitar;
- transformar registros em relatórios;
- notas/frequência/atividades/BNCC no mesmo fluxo;
- múltiplas turmas sem limites artificiais;
- exportações e relatórios profissionais.

Oferta de saída pode existir com desconto real (ex.: 20%) e cronômetro SOMENTE se houver `expiresAt` persistido e condição promocional verdadeira. Nunca criar cronômetro que reinicia ou falsa escassez.

Segurança, LGPD, acesso aos próprios dados, exclusão e proteção básica nunca são benefícios Pro.

## Anti-dark-pattern

É permitido otimizar conversão com:

- boa ancoragem de valor;
- comparação clara;
- benefício concreto;
- prova de economia verdadeira;
- destaque de plano recomendado;
- promoção real e limitada;
- microcopy persuasiva honesta.

Não usar:

- urgência falsa;
- desconto eterno disfarçado;
- contador reiniciável;
- botão de recusa escondido;
- wording enganoso;
- cobrança pouco clara;
- dificuldade deliberada para permanecer no gratuito ou cancelar.

## Sobre documentos conflitantes

Nenhum documento pode afirmar que uma direção visual foi `aprovada pelo usuário` apenas porque um agente a escreveu.

Se `docs/DIRECAO-VISUAL-UX.md`, `MASTER.md` ou outro arquivo conflitar com este documento ou declarar uma aprovação que não ocorreu explicitamente, este `DESIGN_AUTHORITY.md` prevalece e o conflito deve ser registrado no PR.

## Definition of Done visual

Para cada PR visual, anexar:

- screenshot antes;
- screenshot depois;
- estados relevantes (vazio, carregando, erro, sucesso, modal etc.);
- breve justificativa da arquitetura;
- teste em viewport móvel;
- resultado de build e testes;
- limitações conhecidas.

Sem screenshot real, mudança de UI importante não está pronta para aprovação.
