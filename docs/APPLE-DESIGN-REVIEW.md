# Auditoria visual e de interação — Assistente Pedagógico

**Plataforma auditada:** Android mobile, portrait, build QA `br.com.assistentepedagogico.app.qa`, `0.3.0-qa` / versionCode 30  
**Stack:** React + TypeScript + Vite + Capacitor  
**Evidências:** 15 capturas QA sintéticas descritas em `APPLE-DESIGN-REVIEW-BRIEF.md`  
**Escopo:** revisão visual, interação, acessibilidade, navegação, estados, dark mode e motion. Nenhuma alteração de código foi feita nesta rodada.

## Diagnóstico geral

**Classificação: Needs Work, com boa base visual e alguns problemas High que afetam diretamente a percepção de produto acabado.**

O app já tem uma linguagem reconhecível: canvas quente, teal como cor de ação, ícones Lucide, cartões de cantos contínuos, cinco destinos previsíveis e textos que normalmente explicam o próximo passo. Isso é uma base adequada para professores que precisam escanear a rotina rapidamente.

O acabamento ainda é prejudicado por três fatores sistêmicos: a barra inferior trunca “Planejamento”; o sistema visual está duplicado em camadas de CSS e em estilos inline, o que torna a consistência entre telas e temas frágil; e várias superfícies gastam o mesmo tratamento de cartão, borda e sombra para ações de importâncias diferentes. A direção recomendada é **Caderno Vivo**: editorial, calorosa e prática, com uma ação dominante por tela, listas agrupadas e teal reservado para ação, foco, seleção e progresso.

### Os cinco itens que mais elevam a percepção de qualidade

1. Corrigir a navegação inferior para que todos os nomes sejam legíveis e o estado ativo seja inequívoco, inclusive com safe area.
2. Consolidar os tokens semânticos e remover cores/estilos inline críticos, corrigindo o contraste do texto secundário e dos estados de erro.
3. Redesenhar o sistema de estados: pendente, salvo, rascunho, concluído, vazio, erro e offline precisam ter hierarquia distinta, sem transformar tudo em cartão grande.
4. Tornar câmera, arquivo, foto e restauração mais orientados: causa, impacto, próximo passo e confirmação devem estar no mesmo contexto.
5. Fazer uma passada de acessibilidade real no Android: TalkBack, escala de fonte de 200%, teclado, foco, contraste aumentado, redução de movimento e rotação.

## Critérios e referências HIG traduzidos para Android/Capacitor

- **Accessibility:** texto escalável; contraste mínimo de 4,5:1 para texto normal e 3:1 para texto grande/bold; alvo móvel ideal de 48 × 48 dp; informação não pode depender só de cor; controles precisam de nome acessível.
- **Color:** a mesma cor deve significar a mesma coisa; fornecer variantes de claro, escuro e alto contraste; usar ícone/texto além da cor.
- **Layout:** respeitar safe areas e evitar que conteúdo fique atrás de barras fixas; manter alinhamento, ritmo e hierarquia previsíveis.
- **Typography:** usar escala consistente, sentence case e tamanhos legíveis; não resolver falta de espaço com truncamento silencioso.
- **Feedback:** status deve ficar próximo do objeto que descreve; alertas devem ser reservados para consequências críticas; erro deve explicar como recuperar.
- **Modality:** modal deve ter tarefa curta, título claro e saída óbvia; não empilhar modais e evitar fechar com perda silenciosa.
- **Motion:** movimento tem propósito, é breve, cancelável e nunca é o único canal de feedback; respeitar `prefers-reduced-motion`.
- **Onboarding/Launching:** iniciar rapidamente; splash não deve virar anúncio; onboarding deve ser curto, opcional e ensinar no contexto.
- **Gestures:** gestos complementam, não substituem, botões e caminhos acessíveis; feedback deve ser imediato e previsível.

## Achados por evidência e tela

### 1. Início configurado — `android-qa-home-configured.png`

**High — ação principal pouco diferenciada.** “Cadastrar primeiro aluno” e “Ir para o início” têm peso visual próximo, embora uma seja a continuação recomendada e a outra seja uma saída.  
**Recomendação:** manter um único CTA preenchido (`Cadastrar primeiro aluno`) e transformar o segundo em botão textual/outlined de menor ênfase, com cópia “Continuar sem cadastrar”. Após a configuração, retornar à Home com foco no próximo passo e mensagem persistente curta.

**Medium — excesso de área vazia.** O sucesso ocupa a tela com uma ilustração grande, uma confirmação e dois botões, mas pouco conteúdo útil.  
**Recomendação:** reduzir o selo para 72–88 dp, usar título 28/34, descrição 16/24 e trazer uma linha de benefício concreto: “Você já pode registrar a rotina da QATurma”.

**Medium — confirmação é visualmente dependente do ícone.** O check comunica sucesso, mas a mensagem não informa claramente o que foi salvo localmente.  
**Recomendação:** incluir “Salvo neste dispositivo” como status secundário e expor o mesmo conteúdo em `aria-live`.

**Low — caps lock editorial.** “CONFIGURAÇÃO CONCLUÍDA” funciona como eyebrow, mas em escala menor e com tracking controlado; não deve virar padrão para títulos de seção.

### 2. Home após cadastro — `android-qa-after-student.png`

**High — toast intrusivo e possivelmente temporizado.** A faixa “Novo Aluno Adicionado com Sucesso” cobre o cumprimento e compete com o conteúdo principal. O HIG recomenda não depender de elementos que desaparecem por timer para informação importante.  
**Recomendação:** usar uma confirmação inline próxima ao fluxo de cadastro ou snackbar não bloqueante com duração de 4–6 s, ação “Desfazer” quando aplicável, foco acessível e persistência até ser lido em TalkBack.

**High — “Planejame...” truncado na navegação.** O nome do destino principal fica incompleto na captura. Isso reduz compreensão e acabamento.  
**Recomendação:** usar o rótulo curto “Plano” na barra e manter “Planejamento” no título da tela, ou permitir duas linhas controladas. Não usar `text-overflow: ellipsis` para um destino primário conhecido.

**High — o estado de chamada pendente é o mais importante, mas não parece suficientemente urgente.** A cor suave e o cartão grande não explicitam que a frequência é a tarefa da rotina.  
**Recomendação:** usar uma faixa lateral `attention`/ochre de 3–4 dp, ícone de clipboard e texto “Chamada pendente”; manter CTA “Fazer chamada” como ação textual forte. O estado concluído deve trocar ícone, texto e resumo, não só cor.

**Medium — Home longa e repetitiva.** “Agora”, “Agenda desta semana”, “Planos de hoje”, “Lembretes”, “Atividade recente” e “Atalhos” podem formar uma sequência contínua de cartões.  
**Recomendação:** ordenar em `Agora → Próximo → Acesso rápido`; mostrar no máximo uma prévia por grupo e levar detalhes à tela de origem. Evitar repetir o mesmo plano em “Agora” e “Planos de hoje”.

**Medium — empty state de planejamento recebe peso excessivo.** O cartão “Seu dia ainda está livre” ocupa mais espaço que a chamada e pode parecer uma tarefa obrigatória.  
**Recomendação:** usar uma linha compacta no primeiro acesso e um CTA de plano somente quando não houver chamada pendente.

### 3. Chamada concluída / Home persistida — `android-qa-attendance-complete.png` e `android-qa-restart-ready.png`

**High — sucesso e persistência são bons, mas pouco explícitos.** “Chamada concluída” e “1 presente · 0 faltas” aparecem, porém não há indicação de quando foi salvo nem de que o estado sobreviveu ao reinício.  
**Recomendação:** após concluir, mostrar “Salvo neste dispositivo · agora” junto do resumo; após reinício, não exibir um loading vazio antes da Home. Se houver restauração de estado, manter scroll, aba e turma ativa quando seguro.

**Medium — “Agora” e “Agenda desta semana” usam cards neutros demais.** Depois de concluir a chamada, o próximo passo é planejamento, mas a Home não cria uma transição clara de prioridade.  
**Recomendação:** promover “Ver planejamento” como ação da seção `Próximo`, com uma linha de contexto (“1 plano disponível hoje”) e sem duplicar o mesmo conteúdo abaixo.

**Medium — contadores circulares parecem decorativos.** Os badges “1” e “3” não dizem o que contam para quem faz uma leitura rápida ou usa TalkBack.  
**Recomendação:** associar semanticamente o valor ao título (`aria-label="1 aluno na turma"`, `aria-label="3 atividades recentes"`) e usar texto explícito em telas estreitas quando necessário.

**Low — saudação depende de nome e horário.** “Boa noite” é acolhedor, mas deve ter fallback claro para locale/timezone e não ocupar duas linhas de forma desbalanceada em nomes longos.

### 4. Planejamento salvo — `android-qa-planning-saved.png`

**High — quatro visualizações competem no mesmo controle.** “Agenda do dia”, “Quadro”, “Semana” e “Mês” funcionam como tabs, mas ocupam quase toda a largura e podem ficar difíceis de tocar/ler com fonte ampliada.  
**Recomendação:** manter tabs em duas linhas ou usar um seletor de visualização com a opção atual claramente nomeada; cada tab deve manter alvo mínimo de 48 dp e `aria-controls`. Em 360 dp, evitar compressão e truncamento.

**High — FAB invade a barra inferior e encobre “Mais”.** Na captura, o botão `+` flutua sobre a área da navegação; a ação é importante, mas a composição parece acidental.  
**Recomendação:** ancorar o FAB a `bottom: calc(nav-height + safe-bottom + 16px)`, reservar espaço de rolagem equivalente e fechar o menu ao navegar. Se houver uma ação primária única, considerar botão “Criar plano” no topo para reduzir disputa espacial.

**Medium — capitalização inconsistente.** “Sábado, 12 De Setembro” usa “De” em maiúscula; títulos, tabs e status alternam sentence case e caps.  
**Recomendação:** aplicar locale `pt-BR` e sentence case: “sábado, 12 de setembro”. Reservar uppercase para eyebrows de 12–14 px.

**Medium — cartão de plano mistura ação de abrir com ações secundárias.** Estrela e menu de três pontos ficam próximos, com pouco contexto visual.  
**Recomendação:** toda a área principal abre o plano; ações secundárias têm 48 dp, labels acessíveis e menu ancorado com `role="menu"`, foco inicial e fechamento por Back/tap fora.

**Low — espaço vertical desproporcional quando há um único plano.** O conteúdo parece vazio após o cartão.  
**Recomendação:** usar a área para um resumo do objetivo ou “Próximo momento”, não para mais caixas decorativas.

### 5. Biblioteca vazia — `android-qa-files.png`

**High — tabs horizontais cortadas.** “Favoritos” aparece parcialmente na borda direita, sem affordance suficiente de rolagem horizontal.  
**Recomendação:** preferir quatro filtros essenciais (“Tudo”, “Recentes”, “Pastas”, “Arquivos”) e mover Favoritos para filtro com ícone/mais ações; se o scroll permanecer, indicar overflow e manter o tab selecionado sempre visível.

**High — estado vazio e FAB competem com as ações do topo.** Existem “Adicionar arquivo”, “Capturar foto” e um FAB circular que parece outra porta de entrada.  
**Recomendação:** escolher uma ação primária (“Adicionar arquivo”) e uma secundária (“Capturar foto”); transformar o FAB em menu somente quando houver uma lista de arquivos ou ocultá-lo no empty state.

**Medium — ícone de lixeira no cabeçalho é ambíguo.** Na captura, parece uma ação primária sem título e pode ser confundido com apagar toda a biblioteca.  
**Recomendação:** usar label “Lixeira” com badge de itens ou colocar a ação no menu secundário; qualquer exclusão precisa explicar escopo e recuperação.

**Medium — descrição do empty state fica atrás da área inferior em alguns momentos do fluxo.** O conteúdo deve terminar acima da barra fixa e do safe area, inclusive com fonte ampliada.  
**Recomendação:** calcular padding inferior com uma constante única (`nav-height + safe-bottom + 24px`) e validar no fim da rolagem, não somente na posição inicial.

**Low — filtro ativo em teal preenchido e botão de ação em teal preenchido no mesmo viewport.** Ambos são corretos isoladamente, mas competem por atenção.  
**Recomendação:** usar seleção do filtro com superfície suave e borda; reservar preenchimento para a ação primária.

### 6. Falha ao abrir câmera — `android-qa-camera.png`

**Critical — erro interrompe uma ação essencial sem diagnóstico técnico útil.** “Não foi possível abrir a câmera” não diferencia permissão negada, câmera ocupada, indisponibilidade do aparelho ou falha do plugin. Para o professor, a recuperação é tentativa cega.  
**Recomendação:** mapear o erro do Capacitor para estados: “Permissão da câmera desativada”, “Câmera indisponível” e “Não foi possível iniciar”. Oferecer “Abrir configurações”, “Tentar novamente” e sempre manter “Escolher da galeria”. Nunca apagar a intenção do usuário.

**High — estado de erro usa vermelho grande e centralizado.** O texto vermelho ocupa mais espaço que o conteúdo e a cor é o principal indicador.  
**Recomendação:** usar `danger` apenas no ícone/borda curta; texto principal em `ink-900`, título “A câmera não está disponível” e descrição em `ink-700`. Combinar ícone, título e ação.

**Medium — o segundo botão perde o rótulo durante o erro.** A captura mostra uma grande área preenchida sem texto ao lado de “Adicionar arquivo”, sugerindo um estado de carregamento/erro visualmente quebrado.  
**Recomendação:** garantir que o estado do botão secundário seja sempre determinístico: “Capturar foto”, “Abrindo câmera…” com spinner acessível ou “Escolher da galeria”.

### 7. Foto adicionada à biblioteca — `android-qa-camera-added.png`

**High — confirmação verde aparece isolada e temporária.** “Foto adicionada à biblioteca” não informa onde a foto está nem oferece abrir o item.  
**Recomendação:** usar confirmação inline “Foto adicionada” com ação “Abrir biblioteca”/“Ver foto”; anunciar em `aria-live="polite"` e manter o status até mudança de contexto.

**High — item de arquivo tem truncamento agressivo.** “Foto 12/09/2026…” e “Tamanho nã...” eliminam informação útil.  
**Recomendação:** priorizar tipo, data e tamanho em duas linhas estáveis; permitir abrir detalhes para nome completo. Não truncar labels de ação.

**Medium — três botões quadrados juntos têm affordance fraca.** Estrela, menu e uma ação adicional aparecem como caixas próximas sem separação clara.  
**Recomendação:** usar uma área principal clicável e dois botões de ação secundária com labels acessíveis; reservar o terceiro para o menu contextual.

### 8. Visualização de foto — `android-qa-photo-open.png`

**High — modal não parece adequado para conteúdo visual.** A imagem ocupa quase todo o sheet, mas a captura mostra uma foto essencialmente preta/sem feedback de carregamento ou falha.  
**Recomendação:** incluir estado de carregamento, erro de decodificação e `object-fit: contain`; para uma foto, preferir experiência full-screen com “Fechar”, zoom acessível e compartilhamento no menu inferior.

**High — botão “X” tem affordance visual de botão HTML padrão.** A borda cinza e o retângulo não seguem o restante do sistema.  
**Recomendação:** usar `IconButton` de 48 dp, ícone Lucide `X`, sem aparência nativa não tematizada, com fundo de superfície e label “Fechar”.

**Medium — “Compartilhar” e “Fechar” têm peso equivalente.** Fechar é navegação; compartilhar é ação contextual.  
**Recomendação:** fechar no topo; compartilhar como ação secundária no rodapé ou menu. Evitar dois CTAs grandes competindo.

**Medium — overlay escuro e sheet branco precisam de variantes dark/OLED.** A cor está escrita em mais de uma camada e pode não acompanhar o tema em todos os modais.  
**Recomendação:** `--scrim`, `--surface-elevated` e `--text-primary` semânticos, com teste de contraste em ambos os temas.

### 9. Mais — `android-qa-more.png`

**High — seção de conta começa cortada pelo bottom navigation.** “Meu perfil” aparece parcialmente na captura, reduzindo a percepção de controle e completude.  
**Recomendação:** garantir scroll container correto, `padding-bottom` da barra e foco/âncora que nunca terminem atrás da navegação.

**Medium — “Mais” concentra muitos domínios em uma lista longa.** Recursos rápidos, conta e suporte são adequados como lista agrupada, mas o primeiro bloco introdutório ocupa altura sem ação própria.  
**Recomendação:** manter grupos curtos, mover configurações para a primeira linha de conta e usar busca de comandos somente se a lista crescer; não reintroduzir “Acesso por área” duplicado.

**Medium — descrições pequenas demais para informação operacional.** Textos como “Frequência da turma ou de um aluno, com exportação” ficam em corpo secundário e exigem esforço de leitura.  
**Recomendação:** 14/20 para descrição importante, 12/18 apenas para metadados; esconder detalhes menos frequentes atrás da tela de destino.

**Low — ícones têm tratamento consistente, mas falta diferenciação de prioridade.** Ferramentas, BNCC e Documentos começam com o mesmo peso visual.  
**Recomendação:** manter ícones neutros; usar teal somente no destino/estado ativo, não em todos os tiles.

### 10. Configurações — `android-qa-settings.png`

**High — lista tem aparência de muitos cartões independentes.** Cada linha tem raio, borda e sombra próprios, criando “card soup” e aumentando a carga visual.  
**Recomendação:** converter cada grupo em uma superfície única com divisores de 1 px; manter 48–72 dp por linha, ícone em tile neutro e chevron alinhado.

**High — “Sons do Aplicativo” usa ícones `ToggleRight/ToggleLeft` em vez de controle de switch.** O usuário pode entender, mas a affordance não se comporta como um switch Android padrão.  
**Recomendação:** usar um switch semântico (`role="switch"`, `aria-checked`, suporte a teclado/TalkBack) e manter a linha inteira como alvo de toque; evitar clicar numa linha que parece navegação e alterna imediatamente sem confirmação textual.

**Medium — uppercase excessivo nos títulos de grupo.** “PERFIL E TRABALHO”, “PREFERÊNCIAS” e outros blocos usam caps com tracking.  
**Recomendação:** usar sentence case/semibold (`Perfil e trabalho`) ou manter uppercase apenas para eyebrow menor, com contraste validado.

**Medium — ordem dos grupos pode seguir a frequência de uso.** A estrutura está correta, mas “Aparência” e “Sons” aparecem antes de dados de segurança, enquanto ações de trabalho são mais frequentes.  
**Recomendação:** manter Perfil e trabalho primeiro; preferências; dados e segurança; ajuda; sobre. Dentro de cada grupo, ordenar pela tarefa mais frequente.

### 11. Aparência claro — `android-qa-appearance.png`

**High — controle de aparência customizado duplica uma preferência do sistema.** “Claro”, “Escuro”, “OLED” e “Seguir sistema” são compreensíveis, mas a opção app-specific pode divergir do sistema e aumenta a decisão.  
**Recomendação:** default “Seguir sistema”; manter override manual apenas se houver necessidade comprovada de produto, explicando que ele vale somente para o app. Não apresentar OLED como escolha de primeiro nível sem validação de consumo/legibilidade.

**Medium — “Cor do aplicativo” apresenta swatches grandes sem estado selecionado evidente na captura.** A cor comunica preferência, mas não há check/contorno inequívoco.  
**Recomendação:** cada cor deve ter nome, `aria-checked`, foco visível e indicador não cromático; usar o teal como default aprovado, com azul/coral apenas como acentos sem alterar semântica de erro/sucesso.

**Medium — botão voltar é azul enquanto o sistema usa teal.** O azul funciona como contraste, mas introduz uma cor sem papel claro no restante da interface. O contraste medido de `#157BB0` sobre `#E4F0EC` é aproximadamente 4,00:1.  
**Recomendação:** usar `action`/teal para navegação e reservar azul para ilustrações ou estados explicitamente informativos.

**Low — preview de tema usa gradiente.** A direção Caderno Vivo proíbe gradientes decorativos; aqui o preview dividido é funcional, porém precisa de fallback de cor sólida quando gradientes não forem suportados.

### 12. Aparência escura — `android-qa-appearance-dark.png`

**High — dark mode é uma paleta paralela, não ainda um sistema semântico.** O contraste da captura é confortável, mas várias telas usam `colors.white`, `colors.dark`, cores inline e bordas definidas fora dos tokens. Isso cria risco de superfícies claras, overlays claros ou textos errados em subfluxos não capturados.  
**Recomendação:** mapear todos os papéis para tokens (`canvas`, `surface`, `surface-elevated`, `text-primary`, `text-secondary`, `border`, `action`, `danger`, `attention`, `success`) e substituir estilos inline críticos. Testar Home, formulários, sheets, menus, câmera e empty states em escuro/OLED.

**High — “contraste suave” não deve reduzir legibilidade.** O token atual `#B4B0BD` sobre `#18171D` tem contraste amplo, mas os mesmos papéis precisam permanecer distintos em `surface` e `surface-elevated`.  
**Recomendação:** usar fundo base `#17161C`, superfície elevada `#24222B`, texto primário `#F7F5FA`, secundário mínimo `#C8C4CF` e borda `#3A3743`; medir cada combinação usada em texto de 14–16 px.

**Medium — status bar e navegação do Android devem seguir o tema.** O app atual altera `colorScheme` e meta `theme-color`, mas isso não substitui a configuração explícita da janela Capacitor.  
**Recomendação:** sincronizar status/navigation bar com `canvas`, escolher ícones claros/escuros e validar recortes em Android 16, inclusive após trocar tema sem reiniciar.

### 13. Aparência restaurada — `android-qa-appearance-restored.png`

**Medium — troca de tema parece instantânea demais para uma preferência global.** A atualização imediata é correta, mas falta feedback discreto de que a preferência foi salva.  
**Recomendação:** aplicar o tema sem bloquear e anunciar “Tema claro aplicado”; atualizar status bar e componentes no mesmo frame lógico. Não usar transição que pisque ou anime grandes áreas.

**Low — a tela não mostra claramente qual cor de aplicativo está ativa.** Se “Azul”, “Verde” ou “Coral” forem selecionáveis, o estado deve persistir e ser visível sem depender apenas da tonalidade.

### 14. Backup e dados — `android-qa-backup.png`

**Critical — restauração substitui dados locais e exige uma confirmação proporcional.** O texto alerta corretamente, mas a consequência é alta e o fluxo precisa proteger contra erro de seleção e senha.  
**Recomendação:** mostrar prévia com data, versão, quantidade de registros e arquivos; deixar explícito “substituirá os dados deste aparelho”; exigir ação destrutiva diferenciada; manter os dados atuais até validação criptográfica e confirmação final. Em erro, preservar arquivo selecionado e campos preenchidos.

**High — senha do backup é uma decisão de alto risco com pouco suporte.** O campo usa placeholder “Pelo menos 8 caracteres”, mas a regra e o fato de a senha não ser recuperável ficam abaixo, em texto pequeno.  
**Recomendação:** usar label persistente, indicador mínimo de senha, botão mostrar/ocultar, mensagem inline e cópia curta: “A senha não é armazenada. Sem ela, não será possível restaurar esta cópia.”

**High — área de backup e área destrutiva precisam de separação de segurança.** Exportar, restaurar e apagar aparecem como cartões do mesmo sistema visual.  
**Recomendação:** separar “Cópia manual” de “Dados deste aparelho”; usar `danger` somente na seção de apagar, com explicação de irreversibilidade e confirmação em duas etapas.

**Medium — “sem nuvem” pode criar falsa expectativa.** O subtítulo é claro, mas deve distinguir “local”, “exportado” e “compartilhado”.  
**Recomendação:** incluir status operacional: “Nada é enviado automaticamente. O arquivo exportado fica sob sua responsabilidade.”

**Medium — botões parecem maiores que o conteúdo necessário.** A captura tem corpo em escala grande e bastante padding; isso ajuda no toque, mas alonga a tela e empurra restauração para baixo.  
**Recomendação:** manter mínimo 48 dp, reduzir padding vertical, usar 16/24 para corpo e 14/20 para ajuda, e permitir rolagem com âncora para o resultado.

### 15. Splash/loading e persistência — `android-qa-restart-ready.png`

**High — o restart-ready prova persistência, mas não prova a percepção durante o carregamento.** A Home aparece corretamente com chamada e plano persistidos; a evidência não mostra duração, transição ou estado intermediário.  
**Recomendação:** instrumentar cold start com três estados: launch screen mínimo, shell pronto, dados locais carregados. Usar skeleton apenas onde a espera for perceptível; não deixar tela vazia por tempo indeterminado.

**Medium — a Home recomeça em posição superior.** Para uso diário, após reinício o professor deve voltar à turma e ao contexto atual; a captura não confirma restauração granular de scroll/aba.  
**Recomendação:** persistir somente estado de navegação não sensível e restaurar de forma segura: aba, turma e data; não persistir modal aberto nem campos destrutivos.

## Achados sistêmicos do código e do sistema visual

### Critical

- **Acessibilidade ainda não está comprovada no Android real.** Há bons `aria-label`, `aria-live` e `role` em partes do código, mas isso não garante ordem de foco, foco em modal, TalkBack, escala de fonte ou `role="switch"` correto. O próximo milestone deve incluir uma matriz real de acessibilidade.
- **A restauração e exclusão são operações de alto impacto.** A implementação possui confirmação e backup protegido, mas a auditoria visual precisa exigir prévia, escopo e recuperação no mesmo fluxo.

### High

- **Contraste secundário abaixo do mínimo em light mode.** `#687772` sobre `#F7F7F4` mede aproximadamente 4,38:1; `#B45F5F` sobre o canvas mede aproximadamente 4,13:1. Substituir texto normal por `#38514B` (ou equivalente com pelo menos 4,5:1) e usar `danger-700` mais escuro para texto; a cor clara pode permanecer como fundo/ícone grande.
- **Tokens e CSS duplicados.** `src/styles/design-system.css` possui várias camadas históricas de `:root` e overrides posteriores; `src/core/recovered.js` fornece outra fonte de cores e as telas usam estilos inline. Isso torna previsível uma regressão de tema. Consolidar antes de polir telas individuais.
- **Safe area parcialmente centralizada.** Existem variáveis `--safe-*`, mas alturas de bottom nav, FAB, sheets e conteúdo são definidas em lugares diferentes. Criar `--nav-height`, `--content-bottom-inset` e um único container de viewport.
- **Truncamento de labels primários.** A barra usa `white-space: nowrap` e ellipsis, e filtros/itens de arquivo também truncam. Truncar nomes de arquivos é aceitável com acesso a detalhes; truncar navegação e ações não é.
- **Todos os cartões interativos precisam de semântica coerente.** Alguns `Card` recebem `onClick` e comportamento de botão por CSS/implementação; outros são `article`. Preferir `<button>`/`<a>` quando a ação é o objetivo, ou tornar o cartão um grupo com botão interno.

### Medium

- **Tipografia está inconsistente entre telas recuperadas e telas modernizadas.** A direção aprovada deve ser: display 30/36, título 22/28, seção 18/24, corpo 16/24, label 14/20 e metadado 12/18. Evitar pesos arbitrários como 650/750/850 sem uma escala de tokens.
- **Sombra e raio variam sem papel claro.** Usar card 16 px, controle 12 px, sheet 24 px; sombra curta somente onde houver elevação real. A superfície base não precisa de sombra em todos os blocos.
- **Uppercase e tracking aparecem em excesso.** Usar sentence case no conteúdo principal; caps apenas em eyebrows curtos.
- **Feedback de sucesso é repetido como toast.** Status importante deve permanecer próximo do objeto; toasts ficam para confirmação breve e não crítica.
- **`prefers-reduced-motion` reduz duração para quase zero, mas não define comportamento semântico.** Também é necessário remover stagger, parallax, scale/zoom, deslocamento de sheets e animações decorativas, mantendo feedback de estado por cor/ícone/texto.

### Low

- **A direção visual já é própria, mas alguns previews e assets ainda carregam linguagem de splash/ilustração.** Reservar arte para onboarding e estados especiais; a rotina deve continuar editorial e funcional.
- **A experiência é mobile-only e deve permanecer assim.** O max-width do shell é útil para QA, mas não deve introduzir affordances desktop nem alterar a ordem de navegação no aparelho.

## Direção visual recomendada — Caderno Vivo

### Princípios

1. **Hoje antes de tudo:** chamada, próximo compromisso e próximo plano.
2. **Uma ação dominante por tela:** CTA preenchido é raro e explícito.
3. **Capturar agora, organizar depois:** registro rápido não deve exigir atravessar múltiplos cartões.
4. **A estrutura é editorial:** divisores, marcadores, abas e progresso; não uma coleção de cards decorativos.
5. **Professor, não criança:** acolhimento por linguagem e ritmo, sem mascotes/cores infantis na rotina principal.

### Tokens de convergência

| Papel | Claro | Escuro/OLED | Uso |
| --- | --- | --- | --- |
| `canvas` | `#F7F7F4` | `#17161C` / `#000000` | fundo base |
| `surface` | `#FFFEFA` | `#24222B` / `#101014` | cartões e campos |
| `surface-soft` | `#F0F1ED` | `#2C2933` | grupos e filtros |
| `ink-900` | `#172522` | `#F7F5FA` | título/texto principal |
| `ink-700` | `#38514B` | `#D8D3DE` | texto secundário importante |
| `ink-500` | ajustar para ≥4,5:1 | `#B4B0BD` | ajuda/metadado |
| `action` | `#176B61` | `#5CC8B7` ou equivalente validado | CTA, foco e seleção |
| `attention` | `#8A5A24` texto / `#F2E4CB` fundo | variante adaptada | pendência |
| `success` | `#2E7058` texto / fundo suave | variante adaptada | concluído/salvo |
| `danger` | `#8E4141` texto / fundo suave | variante adaptada | erro/exclusão |
| `border` | `#DDE5E1` | `#3A3743` | contorno/divisor |

Os valores finais precisam ser validados por contraste automatizado. Não usar teal para significar simultaneamente ação, sucesso e decoração; combinar sempre com ícone e label.

### Layout e componentes

- Margens laterais de 20 dp no conteúdo principal; 16 dp em listas densas.
- Ritmo 4/8 dp; seção entre 24–32 dp; não criar um cartão para cada frase.
- Cards: 16 dp de raio e 1 px de borda; sombra apenas em superfícies elevadas.
- Controles: mínimo 48 × 48 dp, com 8–12 dp de separação entre ações.
- Bottom nav: altura tokenizada de 76 dp + `safe-bottom`; labels sem truncamento, idealmente “Arquivos · Plano · Início · Turma · Mais”.
- FAB: 56–64 dp, sempre acima da navegação e nunca sobre o rótulo de outro destino.
- Sheets: 24 dp no topo, scrim semântico, título da tarefa e botão de fechar/Back previsível.
- Inputs: label persistente, foco visível de 2–3 px, erro abaixo do campo e valor preservado.

### Mapa de componentes a consolidar

| Componente | Contrato recomendado |
| --- | --- |
| `ScreenHeader` | título, subtítulo, Back, ação; safe top e foco consistentes |
| `BottomNavigation` | 5 destinos, labels curtos, `aria-current`, 48 dp, safe bottom |
| `PrimaryButton` / `SecondaryButton` / `TextButton` | uma escala de 48/52 dp, estados disabled/loading/focus |
| `ListRow` | ícone, título, descrição opcional, chevron/switch, divisor; sem card por linha |
| `StatusBanner` | tone, ícone, título, descrição, ação opcional; inline e `aria-live` |
| `EmptyState` | ícone, título, motivo, próximo passo; compacto ou destacado por prioridade |
| `SearchField` / `FilterTabs` | label acessível, overflow controlado, estado selecionado não cromático |
| `Modal` / `BottomSheet` | focus trap, Escape/Back, scrim, título, ação destrutiva diferenciada |
| `FileRow` | nome completo em detalhes, tipo/tamanho/date estáveis, menu contextual |
| `ThemeTokens` | única fonte de verdade para CSS e inline; claro/escuro/OLED/alto contraste |

## Plano de motion

Motion deve explicar causa e efeito, não animar cada toque.

| Token | Valor | Uso |
| --- | --- | --- |
| `motion-touch` | 120–150 ms, `cubic-bezier(.22,1,.36,1)` | pressão, seleção, toggle |
| `motion-state` | 180–220 ms, ease-out | badge, status, troca de conteúdo |
| `motion-screen` | 220–280 ms, ease-out | navegação entre telas |
| `motion-sheet` | 280–360 ms, spring suave, damping 0.86–0.92 | sheet/FAB menu |
| `motion-stagger` | 30–45 ms por item, máximo 4–6 itens | entrada de lista curta |
| `motion-exit` | 60–70% da entrada | fechar/remover/voltar |

Comportamentos concretos:

- Press feedback deve começar imediatamente, usar `scale(0.98)` ou mudança de superfície e nunca deslocar layout.
- Troca de tela deve usar fade + 8–12 dp de deslocamento; a direção só deve seguir a hierarquia real de navegação.
- Sucesso de chamada deve animar apenas check/badge em 180–220 ms; manter resumo estável para não provocar salto.
- Autosave deve atualizar um status próximo ao título: “Salvando…” → “Salvo neste dispositivo”, sem toast repetido.
- FAB/menu deve abrir em 280–340 ms com spring moderado; itens não devem saltar por trás da barra.
- Modal de foto deve entrar em 240–300 ms; fechar em 160–210 ms; permitir Back imediatamente, sem esperar animação.
- Troca de tema deve ser crossfade curto de 120–160 ms, ou atualização imediata sem animação em aparelhos de baixo desempenho; nunca animar uma inversão de cor longa.
- Câmera nativa não deve receber animação interna do app; usar estado de transição curto antes da chamada Capacitor e estado de retorno após seleção.

Para `prefers-reduced-motion: reduce` / preferência equivalente do Android:

- remover parallax, stagger, bounce, zoom, scale de entrada e deslocamento em eixo Z;
- renderizar o estado final em até 1 ms ou usar fade máximo de 100 ms;
- manter feedback essencial com texto, ícone, borda e `aria-live`;
- não usar animação contínua para loading sem alternativa textual;
- respeitar também economia de bateria e aparelhos lentos.

## Acessibilidade e validação de interação

### Checklist obrigatório

- TalkBack: ordem lógica de leitura, nome de cada ícone, estado de switch/radio/tab, anúncio de erro/sucesso.
- Escala de fonte Android em 200%: nenhum título, CTA, tab ou label primário truncado; rolagem vertical preservada.
- Contraste: automatizar combinações de texto, ícone, borda de foco e estados em claro, escuro, OLED e alto contraste.
- Touch: todos os controles em 48 × 48 dp; separar estrela/menu/excluir para evitar toque errado.
- Foco: foco visível em inputs, tabs, menu, modal e sheet; foco retorna ao acionador ao fechar.
- Teclado: Enter/Space acionam botões, Tab percorre grupos e Back fecha modal/menu antes de sair da tela.
- Cor: sucesso, pendência, erro e favorito usam cor + ícone + texto.
- Safe area: status bar, home indicator, bottom nav, FAB, sheets e teclado não encobrem conteúdo.
- Orientation: validar portrait em 360, 390 e 430 dp; se rotação não for suportada, bloquear/documentar de forma explícita.
- Conteúdo sensível: TalkBack e logs não devem anunciar/expor mais dados pedagógicos que o necessário.

## Backlog executável por milestones

### M0 — Fundamentos de qualidade (Critical/High, primeiro)

1. Consolidar `ThemeTokens` e remover duplicidade de `:root`/overrides.
2. Corrigir `ink-500`, `danger` e todos os textos normais para contraste ≥4,5:1.
3. Centralizar safe area, altura da navegação e padding inferior.
4. Corrigir rótulo “Planejamento”/“Plano” e remover truncamento de navegação.
5. Garantir semântica de botão, switch, radio, tab e foco em todos os controles.
6. Validar modal de restauração e exclusão com prévia, escopo, confirmação e preservação de dados.

**Aceite:** nenhuma label primária truncada; contraste automatizado aprovado; TalkBack consegue concluir chamada, criar plano, adicionar arquivo e iniciar backup.

### M1 — Rotina diária: Home, Turma e Chamada

1. Reorganizar Home em `Agora → Próximo → Acesso rápido`.
2. Dar prioridade visual à chamada pendente e feedback persistente à chamada concluída.
3. Compactar empty states e remover duplicação de planos.
4. Padronizar rows/cartões interativos e estados loading/erro/offline.

**Aceite:** um professor identifica a próxima ação em até 3 segundos; chamada concluída não depende de toast; nenhum conteúdo fica atrás da nav.

### M2 — Planejamento

1. Refazer tabs para 360–430 dp com fonte ampliada.
2. Corrigir posicionamento do FAB e menu contextual.
3. Padronizar card de plano, status, favorito, duplicar, arquivar e excluir.
4. Implementar autosave visível e transições de tela/estado da tabela.

**Aceite:** criar, editar, salvar rascunho e voltar preserva data, scroll e foco; menu é navegável por TalkBack e Back.

### M3 — Arquivos, câmera e foto

1. Simplificar filtros e remover overflow cortado.
2. Definir uma ação primária e uma secundária no empty state.
3. Mapear erros de câmera/permissão e oferecer galeria/configurações.
4. Padronizar `FileRow`, preview, loading, falha, compartilhar e fechar.

**Aceite:** qualquer falha de câmera tem causa e recuperação; foto adicionada oferece caminho para abrir; item completo é acessível sem depender de truncamento.

### M4 — Configurações, aparência, backup e lançamento

1. Converter configurações em listas agrupadas com divisores.
2. Implementar switch semântico e tema com tokens claros/escuros/OLED.
3. Validar status/navigation bar, scrims, sheets e modais em todos os temas.
4. Medir cold start e ajustar splash/loading sem tela vazia.
5. Repetir testes de persistência após restart, Back, mudança de tema e escala de fonte.

**Aceite:** tema não produz superfície ilegível; backup destrutivo tem confirmação proporcional; app volta à rotina sem retrabalho após reinício.

## Microcopy recomendada

| Situação | Texto recomendado |
| --- | --- |
| salvar | “Salvo neste dispositivo” |
| autosave | “Salvando…” → “Salvo agora” |
| offline | “Você está offline. As alterações ficam salvas neste dispositivo.” |
| câmera sem permissão | “A câmera está desativada para este app. Abra as configurações ou escolha uma foto da galeria.” |
| câmera indisponível | “Não foi possível usar a câmera agora. Tente novamente ou escolha uma foto da galeria.” |
| empty arquivos | “Sua biblioteca começa aqui” / “Adicione um arquivo ou capture uma foto para guardar materiais da turma.” |
| empty planejamento | “Nenhum plano nesta data” / “Crie um plano quando quiser organizar objetivos e momentos.” |
| sucesso chamada | “Chamada salva neste dispositivo” |
| restauração | “Esta cópia substituirá os dados atuais deste aparelho. Revise o resumo antes de restaurar.” |
| senha backup | “A senha não é armazenada. Sem ela, não será possível restaurar esta cópia.” |
| exclusão | “Isso remove perfil, turmas, registros e arquivos locais. Para continuar, digite APAGAR.” |

## Conclusão

O Assistente Pedagógico não precisa de uma reinvenção visual. Ele precisa de convergência: uma única fonte de tokens, uma hierarquia mais econômica, estados mais explícitos e uma rotina de acessibilidade real no aparelho. A proposta **Caderno Vivo** preserva o calor e a identidade escolar já presentes, mas transforma o app em uma mesa de trabalho do professor: silenciosa quando nada exige atenção, clara quando há uma tarefa e confiável quando dados estão sendo salvos, exportados ou apagados.

Os ganhos mais visíveis virão de M0 e M1: navegação legível, contraste corrigido, safe areas previsíveis, chamada como prioridade e menos repetição de cartões. Só depois vale investir em microanimações e variações de arte; motion e ilustração devem reforçar um sistema já confiável, não mascarar suas inconsistências.
