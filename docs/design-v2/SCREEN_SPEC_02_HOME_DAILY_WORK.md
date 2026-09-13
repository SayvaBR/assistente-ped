# Screen Spec 02 — Home / trabalho diário

## Status

A Home V1 está reprovada como arquitetura visual.

A Home V2 deve ser criada em `src/v2/screens/` como implementação nova, usando a V1 apenas para descobrir dados, ações, estados e contratos.

## North Star

A Home é a **mesa de trabalho digital do professor**.

Ela deve responder em poucos segundos:

1. qual é meu contexto hoje;
2. qual é a próxima aula/ação principal;
3. o que preciso resolver agora;
4. o que vem depois;
5. o que aconteceu recentemente.

## Composição alvo

- greeting humano e data;
- contexto de turma/professor;
- `Sua aula de hoje` / próxima aula como objeto dominante;
- CTA primário tátil;
- poucas ações contextuais, não grid de 8 atalhos;
- agenda compacta;
- pendências quando existirem;
- atividade recente em peso visual menor;
- bottom navigation V2.

## Visual

- fundo azul-claro;
- superfícies de trabalho predominantemente brancas;
- azul vivo em foco/ação;
- navy no texto;
- radius 16–20px;
- depth tátil controlado;
- tipografia forte, arredondada e amigável;
- ícones chunky/rounded;
- ilustração/objeto visual apenas quando ajuda a dar identidade ao conteúdo.

## Não usar

- hero corporativo/KPI;
- círculos abstratos decorativos de SaaS;
- títulos sistemáticos em caixa alta;
- `FOCO DA ROTINA`, `COMANDOS DO DIA`, `MESA DE TRABALHO` como gramática dominante;
- grid uniforme de atalhos;
- cards iguais para tudo;
- Material/Tailwind default;
- aparência fintech/editorial.

## Estados mínimos

- próxima aula presente;
- sem próxima aula;
- chamada pendente;
- chamada concluída;
- agenda vazia;
- agenda populada;
- loading;
- erro parcial recuperável;
- offline;
- Reduced Motion.

## Fluxo de implementação

1. usar screenshot aprovado como target;
2. primeiro render em 390px;
3. comparação lado a lado;
4. corrigir cinco maiores diferenças;
5. validar 360/390/430;
6. conectar domain/data real;
7. estados;
8. motion/haptics;
9. testes;
10. `READY FOR DESIGN REVIEW — HOME V2`.

Nenhum rollout para outras telas antes dessa revisão.
