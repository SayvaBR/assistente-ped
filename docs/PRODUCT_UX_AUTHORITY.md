# Assistente Pedagógico — Autoridade de Produto e UX

**Versão:** 0.1 — consolidação das decisões atuais  
**Objetivo:** servir como referência de produto, UX, design e implementação do Android 1.0.  
**Status:** autoridade de decisão atual; evolui por revisão deliberada. Não deve ser convertido em um mega-PR.

> **Princípio central:** o Assistente Pedagógico não deve ser apenas um aplicativo com funções para professores. Ele deve entender o contexto real do trabalho docente e adaptar a experiência sem transformar o professor em operador de formulário.

## 1. North Star

Pergunta permanente:

> **Um professor conseguiria confiar neste aplicativo amanhã durante uma aula real?**

Uma funcionalidade só deve ser considerada realmente pronta quando faz sentido pedagogicamente, é simples de descobrir e usar, não exige dados desnecessários, preserva dados, funciona offline quando pertence ao núcleo local, respeita a etapa da turma, não cria dead ends/CTAs falsos, funciona em diferentes tamanhos Android e se conecta ao restante do fluxo docente.

## 2. Etapas do produto

O aplicativo terá exatamente três etapas visíveis:

1. **Educação Infantil**
2. **Ensino Fundamental**
3. **Ensino Médio**

No Ensino Fundamental, 1º–9º ano continua existindo como atributo da turma para BNCC, planejamento, filtros e regras pedagógicas. Não apresentar Anos Iniciais e Anos Finais como etapas separadas.

A etapa deve alterar capacidades e prioridades sem criar três aplicativos diferentes. Centralizar regras em algo equivalente a `capabilitiesFor(stage, grade?)` e evitar condicionais pedagógicas espalhadas por telas.

### Educação Infantil

Priorizar rotina, observações de desenvolvimento, documentação pedagógica, contato familiar opcional, experiências propostas, campos de experiência, objetivos de aprendizagem e desenvolvimento e registros visuais opcionais.

### Ensino Fundamental

Priorizar planejamento, BNCC, frequência, atividades, avaliações, registros pedagógicos, acompanhamento, relatórios e materiais.

### Ensino Médio

Priorizar componente curricular, planejamento, frequência, atividades, avaliações, registros, materiais, relatórios e organização por turma/série.

## 3. Cadastro mínimo de aluno

Para criar um aluno, exigir somente:

- **nome**;
- vínculo com a turma, normalmente implícito.

Não bloquear cadastro por data de nascimento, telefone, responsável, foto, endereço, diagnóstico ou dado familiar adicional.

> **Criar aluno deve ser rápido. Completar informações deve ser opcional e progressivo.**

### Dados familiares

Usar **Responsáveis / contato familiar**, nunca campos rígidos Pai/Mãe.

- Educação Infantil: bloco opcional de maior visibilidade.
- Fundamental: `Dados adicionais`, opcional.
- Médio: `Dados adicionais`, opcional e discreto.

Data de nascimento é sempre opcional.

## 4. Avatar e fotos

Padrão: primeira letra/iniciais ou avatar neutro escolhido manualmente.

Não exigir foto, não inferir gênero automaticamente e não usar foto como requisito para chamada/perfil.

- Educação Infantil: registro visual pode existir como capability opcional, com finalidade pedagógica clara e privacidade adequada.
- Fundamental/Médio: foto não deve ser superfície principal do perfil.

## 5. Apoios e adaptações pedagógicas

Não transformar diagnóstico em rótulo visual. Evitar badges como `AUTISTA`, `PCD`, `TDAH`, `DEFICIÊNCIA` na listagem comum.

Criar a área:

> **Apoios e adaptações**

Na lista, um indicador discreto pode significar apenas:

> “Há informações pedagógicas importantes para apoiar este aluno.”

Exemplos de apoio: instruções visuais, tempo adicional, material ampliado, apoio de leitura, comunicação alternativa, redução de estímulos, acessibilidade física, divisão em etapas menores, adaptações de avaliação e observações pedagógicas.

Diagnóstico/condição, se existir, deve ser opcional, separado dos apoios, sensível, não exibido em listagens comuns e nunca exportado/enviado a terceiros automaticamente.

No planejamento, o app pode lembrar:

> “Há 2 alunos nesta turma com apoios cadastrados. Revisar adaptações desta aula?”

O foco é na ação pedagógica, não no rótulo.

## 6. Atividades e atividade de casa

Uma atividade deve poder ter acompanhamento individual por aluno:

- Realizou;
- Parcial;
- Não realizou;
- Justificado;
- Não registrado.

Para turmas grandes, fornecer ação em lote como **Marcar todos como realizou** e permitir alterar apenas exceções.

Entrega de atividade não vira automaticamente nota.

- Fundamental/Médio: recurso relevante.
- Infantil: não protagonista, salvo quando a turma realmente usa propostas para casa/família.

## 7. Frequência

### Chamada diária

Presente, Falta, Atrasado, Falta justificada, Saída antecipada e Pendente.

### Histórico e análise

Não limitar frequência a totais do dia. Incluir leitura temporal simples e útil.

Na turma: evolução semanal/mensal e percentual.  
No aluno: percentual, faltas, justificadas, atrasos e linha do tempo/calendário.

Preferir visualizações simples e pedagógicas a gráficos decorativos.

## 8. Plano de aula profissional

### Identificação

- título/tema;
- professor;
- escola opcional/configurável;
- turma;
- etapa;
- ano/série quando aplicável;
- data;
- componente curricular/disciplina quando aplicável;
- duração/horário;
- status interno.

### O que será ensinado

- objetivo geral;
- objetivos específicos opcionais;
- conteúdo/objeto de conhecimento;
- habilidades/objetivos BNCC;
- justificativa/contextualização opcional.

### Como será ensinado

- metodologia/estratégia;
- momentos da aula;
- descrição e tempo estimado de cada momento;
- recursos/materiais;
- avaliação/critério/evidências de aprendizagem;
- inclusão/adaptações.

### Depois da aula

Observações e reflexão pós-aula ficam disponíveis ao professor, mas não precisam entrar no PDF enviado antes da aula.

### Adaptação por etapa

Educação Infantil não deve ser forçada a linguagem disciplinar tradicional. Quando aplicável, priorizar campos de experiência, objetivos de aprendizagem/desenvolvimento, intencionalidade pedagógica, experiências/propostas, ambiente/materiais e observação/documentação.

Fundamental/Médio mantêm componente, objeto/conteúdo, BNCC, metodologia, momentos e avaliação.

## 9. PDF institucional do plano

O documento deve parecer produzido pelo professor/escola, não pelo software.

**Não incluir:** logo do Assistente Pedagógico, nome do app em cabeçalho/rodapé, slogan, publicidade, marca d’água ou branding do produto.

Usar A4, tipografia profissional, hierarquia clara, paginação discreta, quebra multipágina correta e PT-BR/acento corretos.

Cabeçalho opcional: escola, professor, turma, componente, data e duração.

Permitir escolher se inclui observações, reflexão pós-aula, adaptações sensíveis e campos complementares. Informação sensível de aluno nunca entra automaticamente.

## 10. BNCC

BNCC deve funcionar offline com catálogo oficial versionado.

- nunca inventar código/descrição;
- pesquisa por código/texto;
- filtro por etapa/ano;
- favoritos/histórico;
- integração com plano;
- proveniência registrada.

### BNCC Computação

Incorporar o Complemento à BNCC de Computação a partir da fonte oficial, cobrindo as etapas previstas e os eixos relevantes:

- Pensamento Computacional;
- Mundo Digital;
- Cultura Digital.

Permitir pesquisar, filtrar, selecionar no plano, exportar no PDF e contabilizar cobertura curricular.

## 11. Arquivos

`Arquivos` é uma **biblioteca pedagógica**, não um explorador genérico.

Organiza materiais, planos exportados, atividades, relatórios, PDFs, apresentações, imagens e documentos pessoais do professor.

Ações principais:

- **Nova pasta**;
- **Adicionar arquivo**.

Remover câmera/captura como CTA principal de Arquivos.

### Hierarquia e orientação

Subpastas são permitidas, mas a localização precisa ser explícita com breadcrumb:

`Meus arquivos › 7º B › Ciências › Projeto Água`

Quando longo:

`Meus arquivos › … › Ciências › Projeto Água`

Cada nível relevante deve ser tocável. Ao criar pasta, mostrar claramente onde ela será criada. Resultado de busca deve mostrar contexto/caminho.

> **Liberdade de organização sem desorientação.**

Considerar smart views: Planos exportados, Atividades, Relatórios, Materiais, Recentes e Favoritos.

## 12. Tutoriais e ajuda

A ajuda deve ensinar o professor **fazendo**, não apenas explicando.

Modelo:

`mensagem curta → destaque do controle real → professor executa → tutorial confirma → próximo passo`

Guias prioritários:

- Conhecendo o Assistente Pedagógico;
- primeira turma;
- cadastro de alunos;
- primeira chamada;
- primeiro plano;
- seleção BNCC;
- atividade;
- observação;
- consulta de frequência;
- organização de Arquivos;
- exportação PDF;
- backup/restauração.

Oferecer ajuda contextual `just-in-time` e permitir repetir qualquer tutorial em **Ajuda e tutoriais**.

## 13. IA e APIs

IA **não é requisito do Android 1.0**. O produto precisa ser excelente sem IA.

No futuro, IA deve ser contextual, não chatbot genérico: formular objetivo, sugerir sequência de aula, estratégias de avaliação, adaptações, transformar plano em atividade e apoiar reflexão pós-aula.

Guardrails: IA não inventa BNCC; resultado curricular final vem do catálogo oficial; não enviar fotos, telefones, diagnósticos, notas, observações sensíveis ou nomes reais a provedor externo por padrão.

APIs externas só entram quando resolverem problema real. Candidatas futuras: Open Library, BrasilAPI e fontes oficiais INEP. BNCC deve preferir dataset local oficial.

## 14. Android adaptativo

Um único produto deve preservar identidade e comportamento em diferentes tamanhos de tela.

`412 CSS px` é âncora de criação visual, **não largura fixa**.

Usar CSS logical pixels, `rem`, `%`, flex, grid, `minmax`, `clamp`, wrap, altura automática, viewport dinâmico e safe areas/insets.

Nunca usar resolução física do painel como breakpoint, fixar altura útil por aparelho, cortar copy essencial, reduzir texto até ficar ilegível ou quebrar palavras humanas no meio para salvar layout.

Cadência:

- microiteração: 412 + Live Design/HMR;
- candidata: checkpoint 360/412/480;
- Gate B/release: matriz ampla, texto ampliado, Android real, teclado, safe areas e Reduced Motion.

## 15. Auditoria de UX obrigatória

Para cada fluxo, perguntar:

1. O que estamos exigindo sem necessidade?
2. Há dado que deveria ser opcional?
3. A função faz sentido nesta etapa?
4. A linguagem corresponde ao trabalho real do professor?
5. O CTA realmente faz o que diz?
6. O professor sabe onde está?
7. Existe trabalho repetitivo que poderia virar ação em lote?
8. Estamos mostrando número sem gerar entendimento?
9. Informação sensível está destacada demais?
10. Existe feature pronta mas difícil de descobrir?
11. A tela parece formulário/dashboard genérico?
12. O fluxo se conecta à rotina docente?
13. O app lembra algo útil ou apenas armazena dados?
14. Há recuperação quando algo dá errado?
15. A tarefa pode ser concluída com pouco tempo e uma mão?

### Anti-patterns já identificados

- data de nascimento obrigatória;
- “Capturar foto” em Arquivos abrindo seletor genérico;
- pastas sem breadcrumb;
- tag de diagnóstico como identidade visual;
- atividade por aluno sem ação em lote;
- frequência limitada a números diários;
- tutorial apenas explicativo.

## 16. Ciclo docente integrado

O valor vem da conexão entre funções:

`Planejamento → Aula do dia → Frequência → Atividades → Registros/observações → Acompanhamento do aluno → Relatórios → Reflexão/próximo planejamento`

Evitar transformar o app em coleção de recursos isolados.

## 17. Prioridades

### Android 1.0

- três etapas corretas;
- cadastro mínimo;
- apoios/adaptações;
- planejamento profissional;
- BNCC + Computação;
- PDF institucional sem branding;
- frequência com histórico claro;
- atividades + acompanhamento simples;
- Arquivos com breadcrumb e organização pedagógica;
- tutoriais guiados;
- backup/restauração;
- offline;
- acessibilidade;
- monetização/restore;
- privacidade/LGPD;
- QA Android real.

### 1.x

Gráficos mais sofisticados, smart views avançadas, API de livros, integrações externas, automações avançadas e recursos institucionais/B2B.

### Futuro

Assistente IA contextual, plano institucional para escolas/redes e colaboração/sincronização com arquitetura de conta segura.

## 18. Regras para Codex

Antes de implementar mudança pedagógica:

1. identificar etapa afetada;
2. verificar se a regra é universal;
3. evitar campos obrigatórios sem necessidade;
4. preservar dados legados;
5. não migrar/apagar dados silenciosamente;
6. não inventar semântica BNCC;
7. não expor informação sensível;
8. não transformar decisão de UX em mega-PR;
9. usar Delivery Units pequenas;
10. mostrar resultado visual quando houver UI.

Para UI:

`EDIT → HMR → BROWSER → DOM/CSS para fatos objetivos → revisão visual para julgamento → FIX → HMR → OBSERVE AGAIN`

Screenshots formais ficam para candidata, PR, review, release ou fallback quando browser não estiver disponível.

### Escopo

Não transformar tudo deste documento em um único PR. Exemplos de unidades independentes:

1. três etapas + migração;
2. cadastro mínimo de aluno;
3. apoios/adaptações;
4. atividade por aluno;
5. frequência histórica;
6. Arquivos breadcrumb + CTAs;
7. plano/PDF;
8. BNCC Computação;
9. tutorial guiado.

Cada unidade precisa de objetivo, risco, critérios de aceite, testes e evidência visual quando aplicável.

## 19. Identidade e tom

Produto adulto e profissional, amigável e tátil, sem parecer infantil.

Nunca usar mascote, coruja, gamificação infantil, confete como padrão, culpa/manipulação ou dashboard SaaS genérico.

**Direção visual:** Friendly Professional + Candy UI + Tactile + Educational + Motion-led.

---

## Regra de evolução deste documento

Decisões explícitas mais recentes do produto podem atualizar esta autoridade. Quando houver mudança, alterar este arquivo de forma deliberada e rastreável. Não deixar uma decisão nova existir apenas em chat se ela impactar implementação.
