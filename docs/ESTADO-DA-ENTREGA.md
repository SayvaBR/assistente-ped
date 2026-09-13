# Estado da entrega

Atualizado em 12/09/2026. Este documento registra evidências e pendências; não certifica que o aplicativo esteja pronto para publicação.

## Evidências disponíveis

- Verificação TypeScript e compilação web passaram na última rodada concluída.
- Recursos web e oito plugins foram sincronizados pelo Capacitor; `assembleDebug` concluiu com sucesso e gerou o APK Android 0.3.0 com compile/target SDK 36. Há avisos de dependências e tamanho do pacote a revisar; o resultado não valida os fluxos no aparelho.
- 45 testes Vitest passaram: isolamento de turmas, migração, backup e restauração, cifra/decifra de backup protegido, cálculos de notas, recuperação, fórmula personalizada, importação, BNCC, movimentação de planos, Caderno, sequências didáticas, assinatura, geração PDF e exclusão definitiva de aluno. Incluem escala da recuperação e coexistência de planos modernos com momentos legados.
- 25 cenários E2E passaram para Chrome mobile com dados fictícios: onboarding e escolha de plano, criação de sequência, notas e observações sem sair do campo; avanço por Enter; validação de nota e conceito misto; falha de armazenamento e nova tentativa; vírgulas nos componentes e turno legado; saída da edição de avaliação; saída da edição de escola; bloqueio de relatório com dados ilegíveis; conclusão e exclusão de planos com salvamento automático em andamento; abertura de Ajuda e feedback; consulta aos Termos e à Política de Privacidade; organização da aba Mais; atalhos de Ferramentas e Lembretes no Início; abertura da biblioteca sem dados previamente salvos; quadro mobile-only com arraste, persistência e desfazer.
- Quadro mobile-only validado com arraste por ponteiro, trilho horizontal de dias, foco em um dia por vez, preservação da duração do plano, movimentação de compromissos, empilhamento de conflitos, persistência local e ação de desfazer; o teste dedicado do quadro passou.
- Contraste da Biblioteca validado no navegador: filtro ativo, ações preenchidas e FAB usam texto/ícones brancos sobre azul escuro; ação secundária usa superfície clara com texto/ícone teal. Preferências antigas do azul claro são migradas.
- Auditoria automatizada no DOM mobile não encontrou superfície azul visível com texto escuro. O launcher Android foi redesenhado para o sistema Caderno Vivo, com fallback vetorial e adaptive icon.
- A exclusão definitiva na lixeira agora remove mídia física e registros derivados do aluno em todas as áreas locais cobertas pelo modelo: observações/áudios, evolução, fotos, rotina, ocorrências, frequência, justificativas, notas e vínculos do Caderno.
- Rodada visual v3 validada em viewport mobile: canvas quente neutro, tipografia de sistema, teal usado como acento único, Home com chamada/Agora em superfícies neutras, Planejamento sem duplicação no modo Agenda do dia, Mais em listas agrupadas e barra inferior sem pílula dominante. A imagem editorial `public/reference-art/onboarding-editorial-v2.png` foi integrada ao primeiro passo do onboarding.
- Fluxos de criar turma de Ensino Médio, importar alunos, configurar bimestres e registrar notas foram exercitados na interface web.
- PDF de validação foi gerado e suas três páginas foram inspecionadas visualmente, incluindo fontes e acentos.
- Catálogo offline reúne 1.580 habilidades: 93 da Educação Infantil, 1.304 do Fundamental e 183 do Ensino Médio. A proveniência está em `references/bncc-provenance.json`.
- O APK atual foi reinstalado no aparelho físico autorizado `2412DPC0AG` (Android 16), pacote `br.com.assistentepedagogico.app`, versão `0.3.0`/`versionCode 30`, com SHA-256 `1E7A02AE7DF8C711E77EF90699542EBDE4F2E7EACF1B42B20B17E6C3B6F610E5`. O smoke test seguro registrou 10 PASS, 0 FAIL e 18 BLOCKED; os bloqueios preservam dados persistidos potencialmente reais e aguardam uma base de QA limpa. Detalhes e evidências estão em `docs/ANDROID-REAL-TEST-REPORT.md`.
- Uma variante QA separada foi criada para permitir os fluxos mutáveis sem apagar a produção: `br.com.assistentepedagogico.app.qa`, `0.3.0-qa`, APK auditado com SHA-256 `BB5092B6D7CD0D7561F5285B70603F756DFD3F6C1CD9E0F280DAC4F92E876A33`. O Android recusou a instalação com `INSTALL_FAILED_USER_RESTRICTED`; falta aceitar a confirmação de instalação via USB no aparelho.
- O pipeline `pnpm android:release:unsigned` concluiu novamente build, sincronização Capacitor e `bundleRelease` após a correção de motion, gerando o AAB de validação de 19.378.906 bytes (SHA-256 `19B764EFE7C8164470359C32C645C236B1A7932437F6FABA10CBC212747CCD92`). `jarsigner` confirmou que ele está unsigned; o build assinado está configurado por variáveis de ambiente, mas a upload key ainda não está disponível.

## Matriz de implementação

| Área | Estado observado | Trabalho restante |
| --- | --- | --- |
| Visual | Sistema visual v3 compartilhado com canvas quente, superfícies neutras, acento teal único, tipografia de sistema, listas agrupadas, Home/Planejamento/Mais revisados, onboarding editorial e navegação inferior refinada | Revisão de acessibilidade/temas nas telas restantes e validação visual no Android |
| Turmas, escolas e anos | Cadastro, edição, arquivo, filtros e associação implementados; aba Gestão reúne importação, notas e relatórios. Edição de turno legado e saída sem salvar escolas verificadas na interface | Concluir revisão integral e validar no Android |
| Alunos | Cadastro recuperado e importação com prévia e validação | Revisar todos os campos e cadastro no Android |
| Etapas de ensino | Quatro etapas e capacidades centralizadas | Concluir adaptação de todas as telas e perfis de aluno |
| Notas e avaliações | Períodos, conceitos, notas, cálculos, recuperação, CSV e fórmula personalizada segura (A1, A2...) implementados. Resultados salvos durante digitação, com validação, nova tentativa após falha e avanço por Enter | Revisão dos demais casos extremos e validação no Android |
| Frequência | Fluxo recuperado, justificativas e estados de falta justificada/saída antecipada implementados; totais e relatórios calculam os novos estados | Validar o fluxo integral no Android |
| Planejamento | Edição, salvamento automático, BNCC, PDF, Caderno pedagógico e sequências didáticas implementados. Quadro mobile-only permite navegar por dias, arrastar/remarcar planos e compromissos, preservar duração, empilhar conflitos e desfazer o último movimento. Caderno reúne notas, tarefas, tags, vínculos, anexos, arquivamento, lixeira, restauração e lembretes Android; sequências organizam aulas, datas, descrições, ordenação e progresso | Validar encerramento do aplicativo e recuperação de rascunhos no Android |
| BNCC | Busca offline por etapa, código, texto, componente e ano | Revisar integração em todos os fluxos e filtros adicionais da especificação |
| Relatórios | Prévia, filtros, frequência, observações, notas, PDF e CSV; exportação bloqueada quando há erro de leitura dos dados | Completar integração dos conteúdos previstos |
| Arquivos, câmera e lembretes | Biblioteca abre como estado vazio quando ainda não há registros; pastas, favoritos, busca, importação e lixeira preservados | Validar permissões, abertura, compartilhamento e execução no Android |
| Backup | Exportação protegida por senha com PBKDF2/AES-GCM, importação legada, compatibilidade e restauração cobertas por testes de regressão | Validar ciclo com arquivos reais, senha perdida, permissões e compartilhamento no aparelho |
| Privacidade e feedback | Tela de privacidade explica armazenamento local; Ajuda/feedback e documentos legais estão acessíveis; exclusão definitiva de aluno tem cascata de mídia e referências testada | Definir responsável e canais de contato; retenção, exportações e revisão jurídica antes da publicação |
| Pro | Especificação disponível | Integrar compras e restauração reais; configurar e testar produtos na loja |
| Código e desempenho | Separação incremental em domínio, dados e componentes | Reduzir código recuperado duplicado, tratar falhas e revisar tamanho dos pacotes |
| Publicação | APK Android de desenvolvimento 0.3.0 e AAB unsigned 0.3.0 compilados com target SDK 36; APK atual reinstalado e smoke test seguro registrado no aparelho; ícone, nome, versão, permissões e tamanho auditados | Executar mutações em base de QA limpa; fornecer upload key, conferir assinatura, configurar produção, preparar AAB assinado e ficha da loja |

## Condições para entrega

Primeiro concluir as funcionalidades locais previstas e as verificações de dados e interface. Depois compilar e validar o Android atualizado, preservando os dados instalados. A instalação para testes humanos precede a publicação.

A liberação comercial também depende da identidade do responsável, canais de suporte e privacidade, configuração da assinatura e das compras na loja. A aprovação da Google Play é externa ao projeto.

Não há data de lançamento confirmada. A passagem dos testes automatizados não substitui a validação integral dos fluxos nem elimina as pendências acima.
