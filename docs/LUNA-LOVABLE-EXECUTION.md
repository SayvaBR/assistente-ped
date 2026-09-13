# Luna Alto — replicar visual e fluxos do Lovable

## Decisão atual do produto

O usuário aprovou o visual e os fluxos do projeto Lovable Pixel Perfect e pediu para baixar o src e replicar. Esta decisão substitui a direção de continuar refinando a Home anterior. O foco é a interface inteira do fluxo em trabalho: composição, fontes, proporções, navegação e interações. Não gastar outra rodada gerando sol, água, avatar ou ilustração. Não reapresentar a implementação anterior como pronta.

Fonte: https://lovable.dev/projects/c5dd6084-a9c6-4ad2-a872-cb81ff407245?view=codeEditor

## Código original já disponível

Diretório: `C:/Users/Usuário/Desktop/ASSISTENTE 2/lovable-pixel-perfect-source/src`.

Foram baixados e organizados 22 arquivos reais pelo botão Download do editor: Home, chamada, observação, compromissos, planejamento diário/mensal, turmas, arquivos, mais, AppShell/TelaHeader, estilos, mock-data, hooks e infraestrutura. É uma exportação dos arquivos centrais, não um ZIP completo: faltam a biblioteca genérica components/ui e configurações da raiz. Não afirmar que o projeto inteiro foi exportado ou executado.

Começar lendo `styles.css`, `components/app-shell.tsx`, `routes/index.tsx`, `routes/chamada.tsx`, `routes/observacao.tsx`, `routes/compromissos.tsx`, `routes/planejamento/index.tsx` e `routes/planejamento/mensal.tsx`.

## O que copiar fielmente

- Fredoka para títulos e Nunito para corpo; não substituir por uma única fonte e esperar o mesmo resultado. Disponibilizar fontes locais para offline.
- Cores OKLCH e hierarquia de styles.css; azul de ação, fundo claro, navy, contraste entre título e apoio.
- Escala do shell (máximo 430px), gutters de 16px, ritmos, raios, profundidade de 3–5px e tamanho dos controles.
- Home original: data/saudação; foco com metadados e Fazer chamada/Ver plano; duas ações Registrar observação/Compromissos; agenda em linha temporal.
- Navegação inferior e seu indicador; aproveitar o desenho original, com adaptação ao Android e safe areas reais.
- A aparência e a ordem das interações de cada tela aprovada. Não misturar a Home antiga com o Lovable para criar uma terceira direção.

## Integração funcional

Trabalhar em `C:/Users/Usuário/Desktop/ASSISTENTE 2/assistente-ped-v2-issue5`, branch `codex/5-design-identity-v2`. Inspecionar git status antes de agir: existe trabalho não commitado e evidências de uma proposta anterior, preservar para comparação.

Ler AGENTS.md, DESIGN_AUTHORITY e documentos V2 aplicáveis. Usar integralmente a skill fornecida em `C:/Users/Usuário/Downloads/ASSISTENTE_PEDAGOGICO_UI_SCREEN_SKILL.md`. Registrar a nova decisão explícita do produto na autoridade de design sem pedir novamente autorização para escolhas visuais já aprovadas.

O Lovable usa TanStack Router e Tailwind v4; o app existente tem navegação, persistência e Capacitor próprios. Portar os componentes de apresentação preservando a aparência; adaptar links às rotas/callbacks existentes. Não substituir o app inteiro pelo scaffolding SSR do Lovable.

Ligar a UI aos repositories/domain existentes. Mock-data é apenas fixture de comparação. Os botões Salvar chamada e Salvar observação do protótipo não têm persistência; implementar usando os contratos reais. Mapear `atraso` do protótipo para o status real `atrasado`, preservando também os demais estados suportados. Não remover funcionalidades acadêmicas existentes para encaixar a demo.

Não importar error reporting, telemetria ou infraestrutura de servidor do protótipo para produção. Preservar billing, LGPD, offline e armazenamento. Não inventar progresso da aula: mostrar apenas se houver dado real, ou documentar a ausência.

## Ordem executável

1. Auditar fontes, estilos e dependências baixados. Documentar os contratos reais da Home e rotas de destino.
2. Reproduzir tokens, tipografia e shell do Lovable em escopo próprio, evitando vazamento de estilos para telas ainda não migradas. Consolidar CSS; não acumular uma nova camada de overrides da proposta reprovada.
3. Portar a Home original e ligar dados/ações reais. Capturar Lovable e app no mesmo viewport e estado; comparar lado a lado. A fonte original é o ponto de partida do layout.
4. Verificar os destinos da Home e o retorno mantendo contexto. Mapear chamada, observação, compromissos e planejamento como próximos lotes; respeitar o gate de revisão da Home antes de expandir para áreas importantes.
5. Validar 360/390/430px, teclado/focus, alvos >=48px, contraste, estados vazios/loading/erro/offline e reduced motion. Tokens oficiais de motion governam a implementação; o nome ease-spring no CSS do protótipo é uma curva Bézier, não uma spring física.
6. Executar build e testes relevantes. Capturar antes/depois e gravação das interações reais. Não reutilizar evidências antigas como se fossem da nova implementação.
7. Commit e PR sem merge em main. Publicar apenas quando a comparação cumprir a skill; escrever READY FOR DESIGN REVIEW — HOME V2 e aguardar revisão, sem declarar aprovação.

## Critério do trabalho

O usuário deve reconhecer imediatamente o visual que aprovou no Lovable. Não basta azul, radius e uma ilustração nova. A comparação precisa demonstrar equivalência de composição, tipografia, densidade, componentes e navegação. Listar diferenças reais e corrigir as cinco de maior impacto; não atribuir notas mínimas artificiais para passar no gate.

## Estado do handoff

Astra baixou os arquivos centrais, leu Home, estilos, chamada e observação, registrou a decisão na autoridade de design e iniciou a porta da composição da Home para o runtime V2. A proposta anterior de ilustração não é critério de conclusão. O trabalho do Luna se refere a este handoff documental; não declarar uma tarefa paralela iniciada ou concluída sem confirmação da ferramenta de tarefas.
