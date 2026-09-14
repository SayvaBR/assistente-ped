# Relatório de apoio jurídico e LGPD — Assistente Pedagógico

**Status:** minuta técnica para revisão de advogado(a) e/ou encarregado(a) de dados. Não é parecer jurídico e não deve ser publicada sem validação.

**Data:** 12/09/2026  
**Versão examinada:** 0.3.0  
**Escopo:** inspeção estática do código, configuração Android, fluxos de tela e documentos existentes do projeto. Não foram feitas alterações de produto, publicação, cadastro de formulário ou contratação de fornecedor.

## Resumo executivo

O aplicativo foi estruturado como local-first: perfil, turmas, alunos, planejamento, frequência, observações, arquivos e relatórios são armazenados localmente no dispositivo; não foi encontrado backend, conta, login, endpoint próprio, SDK de analytics remoto ou envio automático de registros pedagógicos no código examinado.

Isso reduz a superfície de exposição, mas não elimina as obrigações de transparência, segurança, governança e atendimento de direitos. O produto manipula dados de crianças e adolescentes e pode armazenar fotos, áudios, contatos de responsáveis, frequência, notas, avaliações e textos livres que podem conter dados sensíveis. Além disso, há caminhos de duplicação ou saída do dispositivo: backup automático do Android, cópia manual em envelope JSON com conteúdo cifrado, compartilhamento de PDF/CSV/arquivos, notificações locais e, quando configurado, RevenueCat/Google Play para dados de assinatura.

Os bloqueadores mais relevantes antes de uma publicação comercial são:

1. preencher identidade, controlador(es), contato de privacidade/encarregado e canal real de solicitações;
2. substituir os textos legais atuais, que ainda contêm lacunas e placeholders, por uma política pública e uma minuta de termos coerentes com o comportamento real;
3. decidir e implementar a política de backup, incluindo `android:allowBackup="true"`, regras de backup e proteção da cópia manual;
4. definir ciclo de vida, exclusão e atendimento de direitos para registros de alunos, arquivos, lixeira, backups, compartilhamentos e dados de terceiros;
5. tratar expressamente o uso de dados de menores, fotos, áudio e texto livre, com minimização e governança da escola/rede;
6. documentar RevenueCat, Google Play, transferências internacionais e cancelamento/reembolso caso o Pro seja ativado;
7. corrigir a descrição de “métricas anônimas”: hoje há apenas telemetria local no console, e não há registro auditável de versão/data da escolha.

## 1. Inventário técnico e de fluxos

### 1.1 Arquitetura e armazenamento observado

O adaptador central em `src/data/localStore.ts` usa `window.storage` quando disponível e, no fallback, `window.localStorage`. Não foi localizado plugin de banco criptografado, Keystore/Secure Storage, PIN, biometria ou criptografia própria. Arquivos de mídia são gravados no diretório de dados do Capacitor em caminhos como `midia/<proprietarioId>/<id>.<ext>`; o catálogo e os metadados ficam no armazenamento local.

O esquema recuperado do projeto registra, entre outros:

- `perfil:professor`, configurações, tutorial, favoritos BNCC e biblioteca;
- turmas, anos letivos e escolas;
- alunos por turma, com nome, data de nascimento, responsável e contato;
- observações, evolução, ocorrências, diário, rotina e justificativas;
- chamadas e status de presença, falta, atraso, falta justificada e saída antecipada;
- planejamento, objetivos, habilidades BNCC, avaliação e observações pós-aula;
- notas, conceitos e pareceres qualitativos;
- fotos de perfil, galeria, áudios gravados e outros arquivos;
- caderno/notebook, tarefas, tags, anexos e lembretes;
- preferências, rascunho de feedback e interesse em assinatura.

**Observação jurídica:** “local” descreve onde o aplicativo grava os dados no fluxo examinado; não significa que os dados jamais saiam do aparelho. O Android pode fazer backup, e o usuário pode compartilhar/exportar conteúdo. Se `window.storage` for injetado por outro ambiente, seu comportamento e seus logs precisam ser auditados separadamente.

### 1.2 Telas e operações relevantes

| Área | Dados/ação observada | Risco jurídico ou operacional |
|---|---|---|
| Perfil docente | Nome, tratamento, escola, cidade, UF e foto | Dados pessoais do professor; identidade do controlador ainda ausente |
| Escolas, anos e turmas | Nome da escola, ano, turma, nível, turno e professor | Pode revelar vínculo profissional e contexto escolar |
| Cadastro/importação de alunos | Nome, nascimento, responsável e telefone; importação CSV/TXT ou texto colado | Dados de menores e de terceiros; importação aceita até 1.000 registros |
| Perfil do aluno | Alteração de nascimento, responsável, contato, foto, observações e galeria | Foto, contato e texto livre; a primeira remoção é soft delete, e a exclusão definitiva executa cascata local testada |
| Observação e registros rápidos | Texto livre e gravação de áudio vinculados ao aluno | Pode receber saúde, comportamento, deficiência, família ou outros dados sensíveis sem classificação |
| Frequência e justificativas | Presença, falta, atraso, saída antecipada, motivo e observação | Justificativa livre pode revelar saúde ou situação familiar |
| Diário, planejamento e notebook | Textos, avaliação, tags, tarefas, anexos e lembretes | Texto livre e anexos podem ampliar muito a finalidade original |
| Acadêmico | Nota, conceito, parecer e avaliação por aluno | Impacto relevante para o aluno; necessidade de exatidão, acesso e governança institucional |
| Biblioteca | Fotos, documentos, áudio, vídeo, PDF e documentos Office | Arquivos podem conter dados de qualquer titular; compartilhamento depende do destinatário escolhido |
| Relatórios | PDF/CSV/texto de aluno, turma ou período, com frequência, observações, notas e nomes | Exportações são cópias independentes e podem ser encaminhadas a terceiros |
| Backup | Cópia de todas as chaves e todos os arquivos em envelope JSON; conteúdo cifrado com senha e mídias mantidas em Base64; restauração substitui dados locais | Alta concentração de dados; risco de perda da senha, cópia indevida, retenção não definida e restauração indevida |
| Notificações | Lembretes locais com texto do usuário | Conteúdo pode aparecer na tela bloqueada; não há push nem token de servidor observado |
| Privacidade | Toggle de métricas locais e links legais/backup | Sem histórico de consentimento, versão, timestamp ou canal operacional |
| Ajuda/feedback | Rascunho local e compartilhamento pelo sistema, sem destinatário fixo | Usuário pode incluir dados em destino externo; não há canal próprio de atendimento |
| Assinatura | Ofertas, compra, restauração e status Pro via RevenueCat/loja quando configurado | Terceiro e possível transferência internacional; faltam disclosures e gestão/cancelamento |

### 1.3 Analytics e notificações

Os eventos observados (`app_opened`, `class_created`, `student_created`, `planning_created`, `attendance_registered`, `bncc_opened`, `library_opened`, `theme_changed` e `profile_created`) só são processados quando `config:analytics` é `true`. O código encontrado registra os eventos em `console.debug`; não foram encontrados `fetch`, XHR, `sendBeacon`, URL própria ou SDK remoto de analytics. Portanto, o comportamento atual aparente é **telemetria local no console**, não uma coleta remota comprovada.

O rótulo “métricas anônimas locais” deve ser revisto. Um evento não é necessariamente anônimo só por não conter nome; identificadores, ambiente, logs e eventual coleta futura podem permitir associação. Se a intenção continuar sendo somente console local, a descrição pode dizer isso claramente. Se houver coleta remota em algum ambiente, deve ser criado fluxo separado de informação, base legal, minimização, retenção e revogação.

As notificações usam `LocalNotifications` e não há token/push/servidor observado. O conteúdo do lembrete pode ser pessoal e deve ter opção de ocultar detalhes na tela bloqueada.

### 1.4 Backup, exportação, compartilhamento e exclusão

`src/data/backup.js` lista todas as chaves do armazenamento e percorre todos os arquivos de `midia`, montando uma cópia integral. Desde 12/09/2026, a tela cifra essa cópia com senha usando PBKDF2-SHA-256 e AES-GCM; a senha não é armazenada, a integridade é verificada na decifra e a interface avisa que a perda da senha impede a restauração. Backups legados sem senha continuam importáveis para evitar perda de dados, mas devem ser substituídos por uma cópia protegida.

A restauração substitui o conjunto local quando `substituir: true`; a limpeza remove chaves e a pasta de mídia. A remoção do aluno continua sendo lógica na primeira confirmação, para permitir restauração. A exclusão definitiva na lixeira agora executa uma cascata local testada: remove perfil, observações e áudios, evolução, fotos e referências em rotina, ocorrências, frequência, justificativas, notas e Caderno. A lixeira e eventuais backups/exportações continuam sendo cópias adicionais, com retenção ainda não definida.

PDF, CSV, texto e arquivos são enviados ao compartilhamento nativo ou ao mecanismo de compartilhamento do navegador. Depois que o usuário escolhe um aplicativo ou destinatário, o controle do Assistente Pedagógico sobre a cópia termina; isso precisa ser explicado sem transferir ao usuário responsabilidades legais que pertençam ao controlador institucional.

### 1.5 Assinaturas e terceiros

`src/data/subscriptionBilling.ts` configura o SDK com `VITE_REVENUECAT_API_KEY` e o entitlement `pro` quando existe chave e o ambiente é nativo. Não é passado `appUserID`; segundo a documentação do fornecedor, o SDK gera um identificador anônimo de usuário. O código lê ofertas, compra pacotes, consulta `CustomerInfo` e restaura compras.

Não foi encontrada conta própria do usuário, e-mail, senha ou backend. Também não foi encontrada configuração efetiva de produto/entitlement no código; os documentos do projeto tratam a compra real como dependente de configuração e teste nas lojas. Ainda assim, a política deve ser preparada para o cenário em que a chave é configurada: dados de compra, assinatura, entitlement, identificador do app e dados técnicos podem ser tratados pela RevenueCat e/ou loja.

### 1.6 Configuração Android e segurança

O Manifest declara `INTERNET`, `CAMERA`, `RECORD_AUDIO` e `POST_NOTIFICATIONS`. Desde a atualização de 12/09/2026, `android:allowBackup="false"`, `android:dataExtractionRules` e `android:fullBackupContent` excluem os dados locais dos caminhos de backup automático e transferência do sistema. A cópia manual continua sendo uma saída explícita do usuário e ainda precisa de revisão de proteção, retenção e compartilhamento.

O `FileProvider` foi restringido para `files-path`, `cache-path` e `external-files-path` específico do próprio aplicativo em 12/09/2026, removendo o `external-path` amplo. A exportação manual agora é cifrada antes de chegar ao compartilhamento nativo. Ainda é necessário validar o compartilhamento real no Android e revisar a permissão de microfone, usada para áudio associado ao aluno, além da governança para autorizar e reter gravações de menores.

## 2. Enquadramento LGPD e papéis — pontos a validar

### 2.1 Possíveis agentes

Os papéis abaixo são hipóteses de trabalho, não uma conclusão:

| Agente | Possível papel | O que precisa ser confirmado |
|---|---|---|
| Empresa/pessoa que oferece o Assistente | Controlador dos dados que decide coletar para conta, suporte, métricas, produto e cobrança; ou operador limitado se não tiver acesso ao conteúdo local | Identidade jurídica, finalidade efetiva, acesso técnico, decisões sobre meios e contratos |
| Escola, rede ou mantenedor | Possível controlador dos registros pedagógicos dos alunos | Quem determina finalidade, política escolar, acesso, retenção e uso dos relatórios |
| Professor | Usuário e possível agente autônomo em contexto individual; não deve ser tratado automaticamente como controlador único | Vínculo com escola, autorização e finalidade do uso |
| Aluno e responsável | Titulares; alunos podem ser crianças/adolescentes | Idade, representação e canal para exercício de direitos |
| RevenueCat/Google Play | Prestadores/terceiros de cobrança e gestão de assinatura, com responsabilidades próprias conforme seus termos e dados tratados | DPA/termos, países, suboperadores, campos recebidos e retenção |
| Android/Google Backup e aplicativos de compartilhamento | Serviços externos acionados pelo sistema ou pelo usuário | Se o backup está ativo, destino, conta, retenção, controles e responsabilidade após o compartilhamento |

A LGPD define controlador como quem toma as decisões referentes ao tratamento e operador como quem trata dados em nome do controlador. A classificação deve ser feita por operação, não apenas pelo nome do produto. Se o conteúdo permanece exclusivamente local e a empresa não acessa nem decide sobre registros escolares, sua posição pode ser diferente da posição da escola; isso precisa de análise contratual e factual.

### 2.2 Finalidades e bases legais a validar

Não é seguro declarar uma única base para toda a aplicação. A matriz inicial é:

| Operação | Finalidade | Base possível, sujeita a validação |
|---|---|---|
| Perfil do professor | Exibir e organizar o ambiente | Execução de contrato/serviço ou legítimo interesse; consentimento para campos opcionais |
| Turmas e planejamento | Prestar a funcionalidade pedagógica | Contrato, obrigação legal/política pública ou legítimo interesse, conforme o controlador |
| Registros de alunos | Executar atividade escolar e produzir registros | Obrigação legal, políticas públicas, contrato, exercício regular de direitos ou legítimo interesse; avaliar art. 11 se houver dado sensível |
| Foto, áudio e texto livre | Documentar observação/aprendizagem | Necessidade concreta e base aplicável; consentimento pode ser necessário em alguns contextos, mas não deve ser presumido nem usado para encobrir falta de finalidade |
| Suporte/feedback | Responder solicitações e diagnosticar falhas | Execução de contrato, legítimo interesse, exercício regular de direitos; evitar envio de dados de alunos |
| Métricas remotas opcionais | Medir uso e melhorar o produto | Consentimento ou outra base após avaliação documentada; nunca chamar de anônimo sem anonimização real |
| Compra/assinatura | Processar pagamento, entitlement, restauração e obrigações fiscais | Execução de contrato e obrigação legal, distribuídas entre controlador e fornecedores |
| Lembretes locais | Executar a função solicitada pelo usuário | Execução do serviço; aplicar minimização no texto exibido |

Para dados sensíveis, o art. 11 da LGPD exige hipótese específica. Para crianças e adolescentes, o art. 14 exige que qualquer tratamento observe o melhor interesse; a ANPD esclareceu que as bases dos arts. 7º e 11 podem ser usadas, desde que o melhor interesse seja sempre observado. Não se deve presumir que a simples utilização de uma conta profissional resolva autorização escolar, representação ou transparência perante famílias.

### 2.3 Dados de crianças e adolescentes

O app é direcionado ao professor, mas cadastra e gera registros sobre alunos que podem ter até 30 anos segundo a validação encontrada, portanto inclui crianças, adolescentes e adultos. A governança deve distinguir essas populações.

Medidas mínimas recomendadas:

- confirmar que o uso tem finalidade pedagógica específica e autorização institucional quando aplicável;
- coletar apenas os campos necessários; tornar responsável, telefone, foto e áudio opcionais e justificados;
- não permitir que estudantes sejam tratados como usuários da aplicação sem desenho específico de idade e representação;
- alertar que observações e justificativas não devem conter diagnóstico, religião, origem, biometria ou outros dados sensíveis salvo necessidade e base adequada;
- definir acesso por professor/escola, retenção por ano letivo e exclusão/correção;
- avaliar o melhor interesse por fluxo, especialmente foto, áudio, relatórios e compartilhamento;
- preservar imagem, identidade, dignidade e espaços privados dos menores, conforme também orienta o ECA.

## 3. Gaps priorizados

### P0 — bloquear publicação comercial até decidir e corrigir

1. **Identidade e canal de privacidade ausentes.** A tela legal não traz nome empresarial/pessoa, CNPJ/CPF quando aplicável, endereço, e-mail real, controlador, encarregado ou canal de solicitações. O texto atual diz que o canal será configurado antes da publicação.

2. **Política incompleta e sem versão pública operacional.** Faltam mapa de categorias, finalidades, bases, fornecedores, transferências, retenção, procedimento de direitos, incidentes, mudanças e explicação completa de backup/compartilhamento. A política deve refletir o produto real e conter placeholders preenchidos antes do lançamento.

3. **Backup manual ainda exige governança.** O backup automático Android foi desabilitado e as regras legadas/Android 12+ excluem integralmente o armazenamento local. O fluxo manual agora é cifrado com senha e tem aviso de perda da senha, mas ainda exige confirmação de destinatário, retenção, exclusão, política para backups legados e teste em Android 11 e Android 12+.

4. **Backup manual integral precisa de validação operacional.** A construção técnica atual usa Web Crypto com PBKDF2-SHA-256, salt/IV aleatórios e AES-GCM autenticado; não há algoritmo próprio. Ainda falta validar restauração em Android, falhas de permissão/compartilhamento, retenção e descarte de cópias, além de explicar que não existe recuperação da senha perdida.

5. **Ciclo de vida e exclusão ainda não definidos por completo.** A cascata técnica local do aluno foi implementada e testada para observações, evolução, fotos, áudio, rotina, ocorrências, frequência, notas e vínculos do Caderno. Ainda falta documentar retenção por categoria, anexos e relatórios locais, prazo da lixeira e correção/exportação por titular. Cópias já exportadas ou em backup do sistema exigem controles próprios e instruções ao titular/controlador.

6. **Dados de menores e dados potencialmente sensíveis sem governança suficiente.** Fotos, áudio, nascimento, contato, frequência, justificativas, notas e observações livres exigem minimização, finalidade, acesso, retenção e melhor interesse. O alerta no feedback é útil, mas não substitui controles no cadastro e nos registros.

7. **RevenueCat e Google Play precisam entrar na transparência.** Se o Pro for habilitado, identificar dados, finalidade, papéis, países/transferências, retenção, suboperadores, direitos e canal de cobrança. Confirmar contrato/DPA e fluxo de exclusão do identificador anônimo. Não enviar atributos de aluno à plataforma de assinatura.

8. **Atendimento de direitos e incidentes não é operacional.** Criar canal real, procedimento, triagem de representação de responsáveis, exportação, correção, oposição, revogação quando aplicável e eliminação. Criar plano de incidente com decisão sobre notificação à ANPD e titulares quando houver risco ou dano relevante.

### P1 — corrigir antes de escala e preferencialmente antes da loja

- registrar versão, data e evidência da escolha de métricas; permitir revogar e excluir identificadores caso exista coleta remota;
- substituir “anônimas” por “locais” enquanto forem apenas logs locais;
- revisar mensagens de notificações na tela bloqueada e oferecer modo sem conteúdo sensível;
- validar no Android o `FileProvider` já restrito e as permissões/revogação de câmera, microfone e notificações;
- inserir confirmação de destinatário e classificação no compartilhamento de PDF/CSV/backup;
- separar exportação integral de exportação de relatório e permitir omitir observações, fotos, áudio e contatos;
- definir prazo para lixeira e exclusão lógica; validar a cascata de aluno, anexos e relatórios no Android para evitar mídias órfãs;
- criar registro de operações de tratamento, matriz de acessos, política de segurança simplificada e procedimento para fornecedores;
- revisar Google Play Data safety, declarações de permissões e textos da assinatura com o fluxo real;
- testar restauração, falha no meio da restauração, reinstalação, backup do Android, dispositivo compartilhado, tela bloqueada e revogação de permissões.

### P2 — aprimoramentos

- permitir bloqueio local por PIN/biometria em dispositivos compartilhados, após análise de usabilidade e recuperação;
- adicionar confirmação de versão dos termos/política sem fingir que isso é consentimento para todo tratamento;
- incluir link para gestão/cancelamento da assinatura e informações sobre renovação automática, preço, periodicidade, teste e reembolso;
- reduzir campos livres ou oferecer modelos que desestimulem dados excessivos;
- fazer revisão de dependências, logs de release e armazenamento de crash para garantir que dados pedagógicos não vazem em diagnósticos.

## 4. Perguntas para o responsável do produto e advogado/DPO

1. Qual é a pessoa jurídica ou pessoa física responsável, nome comercial, CNPJ/CPF, endereço e e-mail de privacidade?
2. Quem será controlador dos dados de alunos: empresa, escola, rede, professor ou combinação por operação? Existe contrato com escolas?
3. O aplicativo será vendido para pessoa física, escola pública, escola privada ou todos? Em quais países e lojas?
4. A empresa acessa algum dado local por suporte, crash reporting, logs, sincronização, atualização ou diagnóstico?
5. `window.storage` é sempre o fallback local ou há um provedor injetado em algum ambiente de produção?
6. O backup automático do Android é desejado? Qual é o plano para dados do diretório `Data`, `localStorage`, mídia e arquivos compartilhados?
7. Qual é a retenção pretendida por ano letivo para alunos, chamadas, notas, observações, áudio, fotos, arquivos, lixeira e backups?
8. Como escola, professor, aluno e responsável exercerão acesso, correção, eliminação, oposição, revogação e portabilidade?
9. Fotos, áudios, telefone do responsável e justificativas são realmente necessários? Em quais atividades e com qual autorização?
10. O app enviará analytics, crash logs ou diagnósticos futuramente? Quais eventos, identificadores, países e prazos?
11. RevenueCat está ou estará ativo em produção? Qual projeto/conta, regiões, suboperadores, DPA e procedimento para apagar/consultar o App User ID anônimo?
12. Quem atende cancelamento, reembolso e reclamações de cobrança? Qual é o link de gerenciamento nas lojas?
13. Há tratamento de dados por IA, suporte humano, e-mail, help desk, hospedagem de arquivos ou CDN?
14. Como o produto responderá a um incidente envolvendo telefone, foto, áudio ou relatório de aluno? Quem decide e em quanto tempo?
15. Qual é a política para notificações exibidas na tela bloqueada e para aparelhos compartilhados entre professores?
16. A distribuição terá política pública acessível antes do download e declarações do Google Play coerentes com cada versão?

## 5. Minuta inicial de Política de Privacidade

> **MINUTA — NÃO PUBLICAR SEM REVISÃO JURÍDICA E PREENCHIMENTO DOS CAMPOS ENTRE COLCHETES**

### Política de Privacidade do Assistente Pedagógico

**Versão [●] — última atualização [●]**

#### 1. Quem somos e a quem esta política se aplica

O Assistente Pedagógico é oferecido por **[NOME/RAZÃO SOCIAL]**, inscrito(a) no **[CNPJ/CPF]**, com endereço em **[ENDEREÇO]** e contato de privacidade em **[E-MAIL/FORMULÁRIO]**. Quando aplicável, o encarregado pelo tratamento de dados é **[NOME OU CANAL DO ENCARREGADO]**.

Esta política explica o tratamento relacionado ao aplicativo e ao site **[DOMÍNIOS]**. O produto é destinado a profissionais da educação. O professor pode registrar informações sobre alunos para fins pedagógicos; o aluno não deve criar conta ou usar o aplicativo como usuário sem um fluxo específico aprovado.

#### 2. O que o aplicativo armazena

Dependendo das funções usadas, podemos tratar:

- dados do profissional e da organização, como nome, escola, cidade, UF, turmas e ano letivo;
- dados de alunos e, quando necessário, responsáveis, como nome, data de nascimento, contato, frequência, notas, conceitos, pareceres, observações e ocorrências;
- fotos, áudios, documentos, anexos e relatórios escolhidos pelo usuário;
- planejamento, tarefas, lembretes e preferências;
- dados técnicos necessários para funcionamento, segurança e suporte;
- dados de compra, assinatura, entitlement, identificador técnico e recibos quando a função Pro estiver ativa;
- feedback e informações que o usuário decidir compartilhar com o suporte.

Não solicitamos dados além do necessário para a função escolhida. O usuário não deve inserir dados sensíveis ou dados de terceiros sem necessidade, autorização e base legal aplicável.

#### 3. Para que usamos os dados e qual é a base

Usamos os dados para prestar as funções escolhidas, organizar o trabalho pedagógico, gerar relatórios, manter preferências, executar lembretes, atender solicitações, proteger o serviço e processar assinaturas. A base legal de cada operação depende do contexto e do controlador responsável e será registrada em **[LINK/MATRIZ/AVISO COMPLEMENTAR]**. Podem ser aplicáveis execução de contrato, obrigação legal ou regulatória, exercício regular de direitos, legítimo interesse, consentimento ou outras hipóteses permitidas pela LGPD.

Para dados sensíveis, aplicamos uma hipótese específica do art. 11 da LGPD. Para crianças e adolescentes, observamos sempre o seu melhor interesse. Quando o tratamento depender de consentimento, ele será solicitado de forma destacada, livre, informada e poderá ser revogado pelo canal **[CANAL]**.

#### 4. Onde os dados ficam

Por padrão, registros, preferências e arquivos são armazenados localmente no dispositivo, sem conta ou sincronização em nuvem **[CONFIRMAR PARA CADA PLATAFORMA]**. O sistema operacional pode possuir recursos próprios de backup. O usuário também pode exportar ou compartilhar cópias. Essas cópias podem permanecer em serviços e dispositivos escolhidos pelo usuário, sob regras próprias.

Antes de ativar backup automático, confirme a configuração do aparelho e use apenas dispositivos e contas autorizados. **[DESCREVER A POLÍTICA REAL: DESABILITAR, EXCLUIR, CIFRAR OU OUTRO CONTROLE]**

#### 5. Com quem compartilhamos

Não compartilhamos registros pedagógicos com terceiros para publicidade. O usuário pode escolher compartilhar PDF, CSV, texto, documento, foto, áudio ou backup por meio do sistema operacional; confirme o destinatário antes de concluir.

Quando a assinatura estiver disponível, usamos **[GOOGLE PLAY/APPLE APP STORE]** e **RevenueCat** ou fornecedor equivalente para ofertas, compras, restauração e status do plano. Os fornecedores recebem somente os dados necessários ao fluxo e podem tratar dados conforme seus próprios termos. A lista, os papéis, suboperadores e links atuais ficam em **[LINK]**.

Também podemos contratar **[SUPORTE/HOSPEDAGEM/CRASH REPORTING, SE EXISTIR]**. Não devemos inserir nomes de fornecedores que não estejam efetivamente ativos.

#### 6. Transferências internacionais

Alguns fornecedores podem processar dados fora do Brasil. Quando houver transferência internacional, adotaremos mecanismo válido e informaremos finalidade, países/regiões, fornecedor e salvaguardas em **[LINK/SEÇÃO]**, conforme a LGPD e a regulamentação da ANPD. **[PREENCHER APÓS DUE DILIGENCE DOS FORNECEDORES]**

#### 7. Retenção e eliminação

Mantemos cada categoria somente pelo período necessário à finalidade, à relação contratual, à obrigação legal ou ao exercício de direitos. A tabela aplicável será publicada em **[LINK]**:

| Categoria | Prazo aprovado | Método de eliminação/anonimização |
|---|---|---|
| Perfil e configurações | [●] | [●] |
| Registros pedagógicos | [●] | [●] |
| Fotos e áudios | [●] | [●] |
| Documentos, relatórios e lixeira | [●] | [●] |
| Backups e cópias exportadas | [●] | [●] |
| Cobrança e recibos | [●] | [●] |
| Suporte e incidentes | [●] | [●] |

Excluir dados do aplicativo não apaga automaticamente cópias já exportadas, compartilhadas ou retidas pelo sistema operacional e por fornecedores. Nesses casos, o pedido deve indicar o controlador/cópia correspondente para que sejam aplicados os controles disponíveis.

#### 8. Segurança e incidentes

Adotamos medidas técnicas e administrativas proporcionais ao risco, incluindo **[CIFRAGEM, CONTROLE DE ACESSO, REVISÃO DE LOGS, BACKUP SEGURO, TESTES, POLÍTICA]**. Nenhum serviço é totalmente imune a incidentes. Se ocorrer incidente que possa causar risco ou dano relevante, avaliaremos a comunicação à ANPD e aos titulares nos termos aplicáveis.

#### 9. Direitos dos titulares

O titular, ou seu representante legal quando aplicável, pode solicitar confirmação e acesso, correção, informação sobre compartilhamentos, eliminação, bloqueio, portabilidade quando regulamentada, oposição, revogação de consentimento e revisão de decisões automatizadas, além de outros direitos da LGPD. Solicite pelo **[E-MAIL/FORMULÁRIO]**, informando a relação com a escola e os dados necessários para evitar atendimento a pessoa não autorizada. O atendimento será gratuito e observará os prazos legais aplicáveis.

#### 10. Crianças e adolescentes

O aplicativo é destinado a profissionais da educação, não a crianças ou adolescentes como usuários. Registros de alunos devem ser inseridos somente para finalidade educacional legítima, com acesso restrito e observância do melhor interesse. Escolas e profissionais devem seguir suas políticas, autorizações e deveres legais e não devem inserir dados excessivos.

#### 11. Atualizações

Podemos atualizar esta política para refletir mudanças legais ou do produto. Publicaremos a nova versão em **[URL]**, com número e data. Mudanças materiais serão comunicadas por **[MEIO]** quando necessário.

## 6. Minuta inicial de Termos de Uso

> **MINUTA — NÃO PUBLICAR SEM REVISÃO JURÍDICA E PREENCHIMENTO DOS CAMPOS ENTRE COLCHETES**

### Termos de Uso do Assistente Pedagógico

**Versão [●] — vigência [●]**

#### 1. Objeto e elegibilidade

Estes Termos regulam o uso do Assistente Pedagógico, oferecido por **[NOME/RAZÃO SOCIAL/CNPJ/CONTATO]**, como ferramenta de apoio à organização do trabalho educacional. O uso é destinado a adultos autorizados a exercer atividade pedagógica. Ao usar o serviço, o usuário declara que pode aceitar estes Termos e que utilizará o produto de acordo com a lei e as regras de sua instituição.

#### 2. Dados e conteúdo inserido

O usuário é responsável por confirmar a exatidão e a necessidade dos dados inseridos e por possuir autorização institucional ou outra base válida para registrar informações de alunos, responsáveis, fotos, áudios e documentos. O usuário deve evitar dados excessivos e não deve usar o app para discriminar, expor, punir ou tomar decisão automatizada injustificada sobre um aluno.

Esta cláusula não elimina deveres legais do controlador institucional nem autoriza o fornecedor a usar conteúdo para finalidade incompatível. A Política de Privacidade explica os tratamentos sob responsabilidade de cada agente.

#### 3. Funcionamento local, cópias e compartilhamento

O produto pode funcionar sem conta e armazenar dados no aparelho. O usuário deve proteger o dispositivo, revisar backup do sistema, manter cópias seguras e conferir destinatários ao exportar ou compartilhar. Relatórios são ferramentas de apoio e devem ser revisados antes de envio ou uso em decisão pedagógica.

Não garantimos recuperação de dados apagados, aparelho perdido, falha de armazenamento, incompatibilidade de backup ou cópia enviada a serviço escolhido pelo usuário. Essa disposição não limita direitos indisponíveis nem responsabilidade que a lei não permita excluir.

#### 4. Uso permitido e limites

É permitido usar o aplicativo para planejamento, registros, organização, relatórios e funções educacionais autorizadas. É proibido inserir conteúdo ilícito, violar sigilo, acessar dados de outra pessoa sem autorização, tentar comprometer o aplicativo ou usar o serviço para publicidade abusiva, discriminação ou vigilância indevida.

O Assistente Pedagógico não substitui avaliação profissional, orientação da escola, serviço público, atendimento médico, decisão administrativa ou aconselhamento jurídico. O usuário deve verificar notas, frequência, cálculos, textos e relatórios antes de utilizá-los.

#### 5. Plano Pro e compras

Quando disponível, o plano **[NOME]** oferece **[RECURSOS]** por **[PREÇO]**, cobrado **[PERIODICIDADE]**, com renovação automática **[SIM/NÃO]**, conforme a tela da loja. Antes da compra serão informados preço, periodicidade, teste, necessidade de assinatura, renovação e condições de cancelamento.

Compras são processadas pela **[LOJA]**, com apoio de **[REVENUECAT/OUTRO]**. O cancelamento, gerenciamento e reembolso seguirão a loja e a legislação aplicável; disponibilizaremos o caminho **[LINK]** e canal de suporte **[CONTATO]**. Nada nestes Termos reduz direitos do consumidor, inclusive arrependimento quando aplicável.

#### 6. Propriedade intelectual

O aplicativo, sua marca, código, layout e materiais pertencem a **[TITULAR]** ou a licenciantes. O usuário mantém os direitos que já possuía sobre os dados e arquivos inseridos. Concede apenas a autorização técnica necessária para o funcionamento solicitado, conforme a Política de Privacidade; **[DESCREVER QUALQUER USO DE SUPORTE/DIAGNÓSTICO]**.

#### 7. Disponibilidade, suporte e encerramento

Podemos corrigir, atualizar ou descontinuar recursos por razões técnicas, legais ou de segurança, comunicando quando necessário. O usuário pode apagar dados pelo recurso disponível ou pelo canal **[CONTATO]**. O suporte é prestado por **[CANAL E PRAZO]**. Não prometemos disponibilidade ininterrupta, mas mantemos as garantias e responsabilidades impostas pela legislação.

#### 8. Alterações e lei aplicável

A versão vigente estará em **[URL]**, identificada por número e data. Alterações materiais serão comunicadas por **[MEIO]**. Estes Termos serão interpretados conforme as leis brasileiras, sem prejuízo do foro legalmente competente e dos direitos do consumidor.

## 7. Mudanças de produto recomendadas

### Gate de lançamento

- preencher a identidade e o canal de privacidade em telas, loja e política pública;
- criar inventário de tratamento, matriz de papéis, bases, acessos, fornecedores, países e retenção;
- criar central de privacidade com exportação legível, exclusão por categoria, versão da política e instruções para representante;
- revisar o fluxo de aluno para explicar finalidade e reduzir campos obrigatórios;
- tratar foto, áudio, telefone do responsável e justificativas como dados de maior risco, com defaults conservadores;
- implementar exclusão em cascata e prazo de lixeira, com testes de arquivos órfãos;
- decidir a política de backup do Android e criar regras para Android 11 e Android 12+;
- validar no Android o backup manual cifrado, o aviso de senha perdida, o compartilhamento e a política de descarte;
- proteger notificações em tela bloqueada e revisar permissões; o `FileProvider` já foi restrito aos diretórios internos e ao diretório externo específico do próprio app;
- documentar e testar RevenueCat/lojas antes de ativar a compra real;
- manter métricas somente locais, ou implementar consentimento e governança completos para qualquer coleta remota;
- preparar procedimento de incidente e treinamento mínimo para suporte.

### Aceite técnico-jurídico sugerido

O release só deve ser considerado pronto quando houver evidência de: política pública acessível; contatos funcionando; testes de backup/restore/delete; revisão de permissões; mapa de terceiros; DPA ou avaliação contratual; Data safety da loja; fluxo de compra/cancelamento; e aprovação formal do responsável jurídico/DPO para as hipóteses de tratamento e retenção.

## 8. Distinção entre requisito, boa prática e hipótese

**Requisitos jurídicos a observar:** princípios, bases, dados sensíveis, crianças/adolescentes, direitos, segurança, incidentes, registros e governança da LGPD; informação clara, oferta, contratação e arrependimento do CDC e do Decreto 7.962/2013; regras da ANPD sobre transferências internacionais, incidentes e agentes de pequeno porte; regras da loja aplicáveis à assinatura e divulgação de dados.

**Boas práticas técnicas, não substitutas da análise jurídica:** desabilitar ou excluir dados do backup automático; cifrar cópias; restringir `FileProvider`; bloquear o app; minimizar notificações; criar matriz de acesso; testar restauração; registrar decisões e fornecedores. A orientação oficial do Android é evidência técnica importante, mas não transforma automaticamente uma configuração em requisito da LGPD.

**Hipóteses que não devem ser publicadas como fatos:** identidade e papel do controlador; base legal de cada registro escolar; prazos de retenção; países e transferências; existência de crash reporting; acesso da empresa ao conteúdo local; responsabilidade da RevenueCat/Google Play; e necessidade de consentimento parental em cada situação. Todos exigem confirmação factual, contratual e jurídica.

## 9. Fontes oficiais consultadas

- [Lei Geral de Proteção de Dados — texto compilado, Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)
- [ANPD — Enunciado sobre tratamento de dados de crianças e adolescentes](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-divulga-enunciado-sobre-o-tratamento-de-dados-pessoais-de-criancas-e-adolescentes)
- [ANPD — Direitos dos titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares)
- [ANPD — Transferência internacional de dados](https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados)
- [ANPD — Resolução CD/ANPD nº 19/2024, transferências internacionais](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024)
- [ANPD — Regulamento de comunicação de incidente de segurança](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-aprova-o-regulamento-de-comunicacao-de-incidente-de-seguranca)
- [ANPD — Resolução CD/ANPD nº 2/2022, agentes de pequeno porte](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022)
- [ANPD — Guia de segurança da informação para agentes de tratamento de pequeno porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_seguranca_da_informacao_para_atpps___defeso_eleitoral.pdf)
- [Estatuto da Criança e do Adolescente — Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8069compilado.htm)
- [Código de Defesa do Consumidor — Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm)
- [Decreto nº 7.962/2013 — comércio eletrônico, Planalto](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm)
- [Android — Auto Backup para apps](https://developer.android.com/identity/data/autobackup)
- [Android — práticas de segurança para backup](https://developer.android.com/privacy-and-security/risks/backup-best-practices)
- [RevenueCat — configuração do SDK](https://www.revenuecat.com/docs/getting-started/configuring-sdk)
- [RevenueCat — usuários e identificadores](https://www.revenuecat.com/docs/customers/user-ids)
- [RevenueCat — CustomerInfo](https://www.revenuecat.com/docs/customers/customer-info)
- [Google Play — política de assinaturas](https://support.google.com/googleplay/android-developer/answer/9900533?hl=en)
- [Google Play — Data safety](https://support.google.com/googleplay/answer/11416267?co=GENIE.Platform%3DAndroid&hl=en)

## 10. Evidência de verificação do projeto

Na cópia examinada, a execução direta do Vitest passou com **11 arquivos e 45 testes**, e `tsc --noEmit` e `vite build` passaram. A cobertura inclui a cifra/decifra do backup manual, mas não certifica conformidade LGPD, segurança operacional completa, comportamento do backup/compartilhamento do Android ou contratos de terceiros.

**Conclusão:** o relatório identifica uma base local-first promissora, mas o produto ainda precisa de decisões de governança e controles técnicos antes de uma afirmação pública de conformidade ou de uma publicação comercial. A aprovação final deve ser feita pelo responsável jurídico/DPO com os campos, papéis, bases, retenções e fornecedores confirmados.
