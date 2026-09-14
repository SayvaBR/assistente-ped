# Roadmap de lançamento — Assistente Pedagógico

Este documento é a fonte de acompanhamento local do trabalho de preparação para a Google Play. Cada meta só pode ser marcada como concluída quando houver evidência de código, testes ou validação manual correspondente.

## Meta 0 — Fundação reproduzível

- [x] Corrigir a configuração de `allowBuilds` do pnpm.
- [x] TypeScript sem erros.
- [x] Testes de domínio e dados passando.
- [x] Build web de produção passando.
- [x] Sincronização Capacitor/Android passando.
- [x] `assembleDebug` passando com SDK 36.
- [x] `lintDebug` passando sem erros; avisos restantes registrados no status.

Evidência atual: 45 testes Vitest aprovados; APK debug gerado em `android/app/build/outputs/apk/debug/app-debug.apk`.

## Meta 1 — Inventário e critérios de aceite

- [x] Consolidar matriz de funcionalidades e rotas em `docs/MATRIZ-FUNCIONAL-E-ACEITE.md`.
- [x] Separar funcionalidades implementadas, parciais e bloqueadas.
- [x] Definir critérios de aceite por módulo e critérios transversais.
- [x] Registrar bugs e riscos reproduzíveis com prioridade.
- [x] Garantir que o projeto local tenha controle de versão antes de publicar qualquer alteração.

## Meta 2 — Design System e qualidade visual

- [x] Fazer a primeira auditoria da Home e registrar os achados em `docs/VISUAL-AUDIT.md`.
- [x] Corrigir a navegação inferior para permanecer visível durante a rolagem.
- [x] Consolidar a proposta de direção visual/UX Caderno Vivo em `docs/DIRECAO-VISUAL-UX.md`.
- [x] Implementar a primeira superfície Caderno Vivo no Planejamento: quadro mobile-only, trilho de dias, foco em um dia, cartões arrastáveis, empilhamento, preservação de duração e desfazer.
- [x] Validar a interação do quadro em viewport mobile com E2E; sincronizar os assets web para o Android e gerar APK debug.
- [x] Remover o bloco duplicado “Acesso por área” da aba Mais e manter os cinco destinos principais apenas na navegação inferior.
- [x] Corrigir o contraste das ações da Biblioteca: texto/ícones claros em superfícies azuis e tratamento secundário claro para “Capturar foto”.
- [x] Delegar auditoria Apple/HIG tela a tela com evidências QA sintéticas; relatório em `docs/APPLE-DESIGN-REVIEW.md`.
- [ ] Auditar onboarding, início, navegação, turmas, planejamento, BNCC, frequência, relatórios, arquivos e configurações.
- [ ] Uniformizar tokens, tipografia, espaçamento, estados e componentes.
- [ ] Corrigir acessibilidade, áreas de toque, contraste, safe areas e estados vazios/erro.
- [ ] Validar em 375 px, telas maiores e orientação paisagem.
- [ ] Comparar as telas com as referências visuais aprovadas.

## Meta 3 — Integridade funcional e dados

- [x] Cobrir movimentação de plano/compromisso com persistência, remoção da cópia antiga, preservação de duração e desfazer.
- [ ] Validar CRUD completo de cada módulo.
- [ ] Validar persistência após reinício do aplicativo.
- [ ] Validar autosave, concorrência, erros de armazenamento e restauração.
- [ ] Completar lacunas de BNCC, frequência, planejamento, arquivos e relatórios.
- [ ] Cobrir regressões com testes automatizados.

## Meta 4 — Android real

- [x] Instalar a versão atual no aparelho de teste; APK `0.3.0`/`versionCode 30` reinstalado e identificado por hash.
- [x] Criar uma variante QA com armazenamento separado para testar mutações sem tocar na produção.
- [x] Exercitar onboarding, aluno, chamada, planejamento, arquivos, câmera, temas, backup e persistência após reinício em base QA limpa; evidências em `docs/ANDROID-REAL-TEST-REPORT.md`.
- [x] Validar câmera, permissão de câmera, arquivos e compartilhamento nativo sem enviar conteúdo; corrigir o `FileProvider` com escopo seguro.
- [ ] Validar microfone/áudio, notificações, relatórios, restauração efetiva e permissões restantes.
- [ ] Validar back button, teclado, rotação, retomada e encerramento do processo.
- [ ] Corrigir diferenças entre navegador e WebView/Capacitor.

## Meta 5 — Monetização e privacidade

- [x] Desabilitar backup automático do Android para dados pedagógicos locais.
- [x] Proteger o backup manual exportado com senha e manter a importação de backups legados compatível.
- [ ] Implementar entitlements Free, Pro e Vitalício de forma consistente.
- [ ] Integrar compras e restauração reais da Google Play.
- [ ] Garantir que descontos e cronômetros sejam reais, persistentes e canceláveis.
- [ ] Finalizar política de privacidade, termos, contato e exclusão/exportação de dados.
- [ ] Revisar LGPD e declarações da ficha da loja.

## Meta 6 — Release candidate

- [ ] Executar testes unitários, E2E, build web e build Android limpos.
- [x] Criar pipeline reproduzível para build/sync/bundleRelease e bloquear release assinada quando a upload key não estiver configurada.
- [ ] Gerar release assinado e AAB de produção.
- [ ] Fazer smoke test no aparelho e revisar logs.
- [x] Conferir ícone, nome, versão, target SDK, permissões e tamanho do pacote no artefato local.
- [ ] Preparar checklist da Google Play e plano de rollback.

## Meta 7 — Publicação

- [ ] Confirmar conta de desenvolvedor, identidade, suporte e privacidade.
- [ ] Criar ficha da loja com textos e imagens reais.
- [ ] Enviar para teste interno.
- [ ] Corrigir bloqueios encontrados no teste interno.
- [ ] Só então solicitar produção.

## Regra de trabalho

O aplicativo não avança de meta por aparência de progresso. Cada etapa termina com evidências: diff revisável, testes executados, build correspondente e lista explícita de riscos restantes.
