# Matriz funcional e critérios de aceite

Atualizada em 12/09/2026. Esta matriz descreve o que existe no código atual, o que foi comprovado por automação e o que ainda precisa ser validado para uma release Android. Ela não transforma a existência de uma rota em garantia de qualidade.

## Legenda

- **Implementado**: há tela e comportamento local identificável; a validação Android ainda pode estar pendente.
- **Parcial**: há base funcional, mas falta integração, cobertura, tratamento de erro ou validação de lançamento.
- **Bloqueado**: depende de configuração externa ou de evidência que não está disponível no workspace.

## Matriz por área

| Área / rotas principais | Estado atual | Evidência existente | Critério de aceite para lançamento |
| --- | --- | --- | --- |
| Inicialização: `splash`, `onboarding`, `wizard` | Implementado | E2E valida escolha Gratuito/Pro e configuração inicial; splash e tour existem no código | Primeiro uso conclui sem dados órfãos; fechar/reabrir mantém a etapa; back e teclado não quebram o fluxo |
| Início: aba `inicio` | Implementado | Auditoria visual inicial; atalhos, chamada, atividade recente e navegação inferior cobertos no navegador | Hierarquia visual aprovada; estados com/sem turma/alunos; navegação fixa; leitura por acessibilidade; Android sem clipping |
| Biblioteca: aba `biblioteca`, `biblioteca`, `musica`, `videos`, `links`, `lixeira` | Parcial | E2E abre biblioteca vazia; testes cobrem pastas, lixeira e restauração | Importar, abrir, favoritar, mover, compartilhar, restaurar e excluir definitivamente funcionam com permissões e arquivos reais no Android |
| Turmas: aba `turma`, `gerenciar-turmas`, `organizacao` | Implementado | E2E e documentação cobrem criação, edição, arquivo, filtros, escola/ano e associação | CRUD persiste após reinício; turma ativa é inequívoca; mudanças não vazam para outra turma; back protege alterações |
| Alunos: `novo-aluno`, `importar-alunos`, `perfil`, `observacao` | Implementado | E2E cobre importação, validação, observações e links a registros; 42º teste cobre exclusão definitiva e referências derivadas | Cadastro individual e CSV rejeitam dados inválidos; fotos/áudios respeitam consentimento; editar/remover/restaurar preserva integridade e excluir definitivamente não deixa mídia local órfã |
| Acadêmico: `academico` | Implementado | 45 testes Vitest e E2E cobrem notas, conceitos, recuperação, autosave, falha de storage e Enter | Escalas, períodos, recuperação e conceito misto têm feedback claro; nenhum rascunho é perdido; exportação reflete o dado salvo |
| Frequência: `chamada` | Parcial | Domínio cobre presença, falta justificada e saída antecipada; Home tem atalho | Registrar, editar e reabrir chamada por data/turma; totais e relatório batem; permissão/notificação não bloqueia uso básico |
| Planejamento: aba `plano`, `plano-aula`, `planejamento-pedagogico` | Implementado | Testes de repository, E2E de autosave, exclusão e PDF; tela de planejamento e caderno existem | Criar/editar/mover/arquivar/excluir/restaurar; autosave com indicação; retomada após morte do processo; PDF/CSV coerentes |
| Sequências: `sequencias` | Implementado | E2E cria aulas e progresso; testes isolam sequências e ordenação | Aulas ordenam sem duplicar; progresso é reversível; vínculo com plano e turma permanece após reinício |
| BNCC: `bncc`, `bncc-infantil` | Implementado | E2E cobre etapa, componente, busca, detalhe, favorito e vínculo ao plano; catálogo offline versionado | Busca por código/texto/acentos/ano; detalhe acessível; vínculo aparece no plano e não depende de rede |
| Caderno: `caderno` | Implementado | Testes cobrem filtros, tags, aluno, concorrência e lixeira; tela tem anexos e vínculos | Escrita concorrente não perde dado; anexos podem ser abertos/restaurados; exclusão é recuperável e respeita turma/aluno |
| Relatórios: `relatorios` | Parcial | E2E bloqueia exportação diante de dado ilegível; ReportsModule tem prévia, filtros, PDF e CSV | Relatório de turma/aluno/frequência/notas/observações; erro aponta registro; PDF/CSV conferidos em aparelho e compartilhamento real |
| Documentos: `documentos` | Parcial | Tela existe e biblioteca preserva documentos; falta validação de arquivos reais | Listar, abrir, importar e compartilhar formatos suportados sem exposição de caminho ou falha silenciosa |
| Ferramentas: `ferramentas`, `cronometro`, `alarmes` | Parcial | Atalho aparece em Início e rota é registrada | Cronômetro e alarmes continuam corretos em background/retomada; feedback visual e sonoro respeita preferências |
| Notificações: `notificacoes` | Parcial | Tela e plugin local existem; documentação prevê lembretes | Criar/cancelar/editar lembrete; permissões Android 13+; comportamento ao reiniciar, fuso e notificação na tela bloqueada revisados |
| Configurações: `configuracoes`, `tema`, `perfil-professor` | Implementado | E2E cobre saída protegida de escola; telas e persistência existem | Tema claro/escuro/sistema, sons e perfil persistem; contraste e áreas de toque em todas as variações |
| Privacidade e suporte: `privacidade`, `ajuda-feedback`, `termos`, `tutoriais` | Parcial | E2E abre ajuda, feedback, termos e privacidade; cascata local de exclusão definitiva testada; relatório LGPD registra lacunas | Texto legal real, controlador, canal, retenção, exclusão/exportação e métricas coerentes com a ficha da loja |
| Backup: `backup` | Parcial | Exportação protegida por senha com PBKDF2/AES-GCM, importação legada e restauração/rollback cobertas por testes; backup automático Android desabilitado | Backup manual protegido, validado, restaurável e claramente explicado; senha perdida, arquivos reais e falhas de permissão testados no Android |
| Assinatura: `assinatura` | Bloqueado para lançamento | Preview não promete compra falsa; adapter RevenueCat e restauração existem | Produtos Free/Pro/Vitalício cadastrados, preços da loja, entitlement, compra, restauração, cancelamento, teste interno e disclosures aprovados |

## Critérios transversais

Cada fluxo só passa para release candidate quando cumprir todos os critérios abaixo:

1. **Dados**: criar, editar, cancelar, excluir/restaurar quando aplicável e reabrir após reinício.
2. **Estados**: carregando, vazio, sucesso, erro recuperável, indisponível e sem permissão.
3. **Navegação**: entrada por atalho e rota direta, back do Android, back interno e saída com alterações pendentes.
4. **Visual**: tokens do Design System, hierarquia clara, contraste, alvo de toque de pelo menos 48 px e safe areas.
5. **Motion**: somente movimento com propósito, cancelável, com `prefers-reduced-motion` e sem bloquear a ação.
6. **Android**: WebView/Capacitor, teclado, rotação, retomada, permissões, arquivos e compartilhamento quando aplicável.
7. **Evidência**: teste automatizado ou roteiro manual reproduzível, com resultado e data registrados.

## Bugs e riscos reproduzíveis registrados

| Prioridade | Item | Estado |
| --- | --- | --- |
| P0 | Identidade do responsável, canal de privacidade e política pública ainda não preenchidos | Bloqueia publicação comercial |
| P0 | Compras reais e produtos Free/Pro/Vitalício não configurados na Google Play/RevenueCat | Bloqueia monetização |
| P0 | Fluxos Android mutáveis ainda não exercitados em base limpa; aparelho físico autorizado já recebeu o APK atual e passou por smoke test seguro | Repetir com dados sintéticos e permissões controladas; evidência parcial em `docs/ANDROID-REAL-TEST-REPORT.md` |
| Resolvido | FileProvider usava caminho externo amplo | Restringido a `files-path`, `cache-path` e `external-files-path` específico do próprio app; falta validar compartilhamento no Android |
| Resolvido | Backup manual era JSON/Base64 sem proteção criptográfica | Exportação atual usa PBKDF2-SHA-256 + AES-GCM; ainda falta validar Android, compartilhamento, retenção e cópias legadas |
| P1 | Chunks web principais estão acima de 500 kB após minificação | Otimizar antes de escala; não bloqueia o primeiro smoke test |
| P2 | Lint sem erros, mas com avisos de dependências antigas, recursos legados e splash | Tratar durante hardening |

## Próxima ordem de execução

1. Validar o visual e os fluxos prioritários: início, chamada, registro rápido, planejamento, turma e assinatura.
2. Implementar a direção visual aprovada sem quebrar os contratos de dados.
3. Restringir compartilhamento/backup e completar os fluxos de privacidade.
4. Fechar Free/Pro/Vitalício com produtos reais e testes da loja.
5. Repetir Android real em base de QA limpa, assinar AAB e preparar teste interno.
