# Professor Real-Device QA — Assistente Pedagógico

## Objetivo

Validar o Assistente Pedagógico no Android físico como um professor real usaria o produto, antes de considerar o Android 1.0 pronto.

O teste não é uma simples checagem técnica. A pergunta central é:

> Um professor conseguiria confiar neste aplicativo amanhã durante uma aula real, sem ajuda de desenvolvedor?

## Agente

Usar `professor_real_device_tester` (`gpt-5.6-luna`, reasoning high, read-only).

O agente age primeiro como usuário black-box. Só depois de observar um problema pode recorrer a inspeção técnica para diagnóstico. Ele não corrige o próprio finding e não se autoaprova.

Fluxo:

`Professor Tester -> finding reproduzível -> orchestrator classifica -> worker corrige -> build/instala -> Professor Tester repete a jornada`

## Dispositivo e instalação

Preferir o APK QA atual com package:

`br.com.assistentepedagogico.app.v2qa`

Esse package é isolado do QA legado e não deve substituir/apagar o aplicativo anterior.

Antes de instalar:

1. `adb devices` deve mostrar o aparelho como `device`, nunca `unauthorized`.
2. confirmar que o artefato corresponde ao SHA candidato;
3. não executar uninstall, `pm clear`, limpeza de dados, alteração global de fonte, Wi-Fi/dados ou permissões sem autorização humana explícita.

Para um primeiro uso realmente fresco, preferir a primeira instalação do package `.v2qa`. Se já houver dados nesse package, pedir autorização antes de qualquer reset destrutivo.

## Dados

Somente fixtures/dados sintéticos. Nunca cadastrar nome, telefone, escola, aluno ou qualquer dado pessoal real.

Exemplos neutros:
- Professora: Marina Souza
- Escola: Escola Municipal Horizonte
- Turmas: Infantil 5, 5º Ano A, 2º Ano B
- Alunos: Ana Lima, Bruno Rocha, Carla Mendes, Diego Alves

## Jornadas obrigatórias

### A — Primeiro uso

Splash -> onboarding -> perfil docente -> primeira turma -> personalização/preview -> paywall/entrada disponível -> Home.

Observar especialmente:
- CTA principal sempre visível/alcançável;
- teclado não encobre campos ou CTA;
- voltar do Android não quebra o fluxo;
- progresso e textos fazem sentido sem explicação externa;
- primeira Home reflete as escolhas feitas.

### B — Preparar aula

Home -> Planejamento Dia/Semana/Mês -> criar plano -> editar -> BNCC -> salvar/autosave -> sair -> reabrir -> exportar/compartilhar quando disponível.

### C — Dar aula

Home -> fazer chamada -> alterar estados -> salvar -> registrar observação -> compromissos -> ferramentas de sala -> retorno à Home.

### D — Acompanhar aluno

Turma -> alunos -> perfil -> registros -> frequência/histórico -> avaliação/notas quando disponível.

### E — Organizar materiais

Arquivos -> nova pasta -> entrar/voltar -> importar -> abrir -> favorito -> renomear/mover -> excluir/restaurar quando disponível.

### F — Administrar produto

Perfil -> Configurações -> Aparência/Acessibilidade -> Ajuda -> Backup/Privacidade -> assinatura quando disponível.

## Matriz de professor

Repetir jornadas relevantes em três contextos, quando o produto já suportar o modelo:

- Educação Infantil;
- Ensino Fundamental com ano 1º–9º;
- Ensino Médio.

O agente deve registrar divergências ou capacidades ausentes; não inventar suporte que ainda não existe.

## Android físico — checks obrigatórios

Em cada fluxo relevante verificar:

- status bar, display cutout e navigation bar;
- ponte de WindowInsets / safe areas;
- bottom navigation sem cobrir conteúdo;
- scroll vertical até o último conteúdo;
- ausência de scroll horizontal acidental;
- teclado/IME e foco;
- gesto/botão Back;
- touch targets e legibilidade;
- rotação quando suportada;
- sair para outra aplicação e voltar;
- fechar/reabrir sem perda silenciosa;
- erros, loading, vazio, sucesso e recuperação quando encontrados;
- nenhum fallback visual V1 em jornada V2;
- nenhum botão sem efeito, dead end ou texto de implementação.

Mudanças globais de dispositivo (font scale, Wi-Fi/dados, permissões) precisam de autorização explícita antes do teste.

## Severidade

- `P0`: impede jornada central, perda/corrupção de dados, crash, segurança/privacidade grave.
- `P1`: jornada central continua inviável ou seriamente confusa; conteúdo/CTA oculto; safe area/teclado bloqueia uso.
- `P2`: problema moderado, há workaround claro.
- `P3`: polimento sem impacto relevante na conclusão da tarefa.

## Gate

`PROFESSOR QA PASS` só pode ser declarado quando:

- todas as jornadas atualmente suportadas foram executadas no Android físico;
- zero P0/P1 permanecem abertos;
- safe areas, scroll, teclado e Back não impedem tarefas;
- não houve perda silenciosa de dados;
- capacidades adiadas foram listadas explicitamente;
- qualquer correção foi retestada pela mesma jornada que a encontrou.

Esse gate não substitui billing real via Google Play, LGPD review, CI ou release checklist. Ele complementa esses gates com evidência de uso real.