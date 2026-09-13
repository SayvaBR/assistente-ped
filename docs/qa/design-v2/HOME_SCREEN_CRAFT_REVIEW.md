# Home V2 — revisão de screen craft

## Target usado

O target desta rodada é a composição e os fluxos exportados do Lovable Pixel Perfect, conforme decisão explícita registrada em `docs/DESIGN_AUTHORITY.md`. A imagem anterior de referência continua anexada para histórico, mas a composição vigente é a fonte Lovable: saudação/data, aula em foco, metadados, ações da aula, atalhos do dia, agenda e navegação inferior.

Comparação visual: [home-target-side-by-side.png](home-target-side-by-side.png).

## Cinco diferenças de maior impacto verificadas

1. A Home anterior ainda dependia de uma composição própria com contexto e arte; a rodada atual removeu os dois elementos do fluxo principal e trouxe a sequência enxuta da fonte Lovable.
2. O foco tinha uma única chamada para planejamento; agora apresenta `Fazer chamada` e `Ver plano` juntos, com metadados visíveis.
3. Os comandos estavam tratados como resolução de pendências; agora são `Atalhos do dia` com `Registrar observação` e `Compromissos`, como no protótipo.
4. A tipografia usava Nunito Sans em toda a tela; Fredoka foi adicionada localmente para títulos e Nunito Sans permanece no corpo.
5. A agenda ficava abaixo da área inicial; a composição foi compactada para trazer o cabeçalho e o primeiro evento para o viewport de 390px.

## Autoavaliação

As notas avaliam a tela contra o target Lovable desta rodada, em escala de 0 a 10:

| Critério | Nota | Evidência |
| --- | ---: | --- |
| Fidelidade ao target | 8 | Ordem, foco, atalhos, agenda e navegação reproduzidos; dados vêm do app real. |
| Identidade | 8 | Azul claro, azul de ação, navy, Fredoka/Nunito e profundidade tátil. |
| Hierarquia | 9 | O foco domina e as ações principais aparecem sem busca. |
| Tipografia | 8 | Fredoka local em títulos; escala e quebras conferidas em 360/390/430. |
| Equilíbrio | 8 | Agenda volta ao primeiro viewport sem comprimir controles. |
| Tactilidade | 8 | Profundidade inferior e pressed states nos controles. |
| Clareza | 9 | Labels e destinos seguem o vocabulário do protótipo. |
| Densidade | 8 | Home enxuta, com agenda e estados preservados. |
| Acessibilidade | 9 | Focus visível, semântica, reduced motion e targets >=48px. |
| Consistência V2 | 9 | Usa primitives V2 e não usa Card/IconTile na Home. |
| Motion | 8 | Transições tokenizadas, seleção e resposta de toque com reduced motion. |
| Sensação premium | 8 | Tipografia, superfície clara e profundidade consistente. |

## Gate de implementação

- 360px, 390px e 430px: capturados sem overflow horizontal.
- Loading, empty, erro parcial recuperável, offline e agenda populada: capturados.
- Pressed e focus em Chamada/Frequência: capturados.
- Reduced motion da Splash e da Home: capturados.
- Targets interativos: verificados pelo script; nenhum abaixo de 48px.
- Build web e APK QA: passaram.
- Testes unitários: 12 arquivos, 46 testes passaram.
- E2E legado: há falhas conhecidas em `e2e/academic-saving.pw.ts`, fora do escopo desta rodada.

Esta revisão não representa aprovação de design. A marca READY FOR DESIGN REVIEW só deve ser usada no PR quando a revisão visual confirmar a aderência ao target vigente.
