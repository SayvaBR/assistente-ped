# Design V2 — Mapa de Recursos Técnicos e Integrações

Este arquivo diz ao Codex quais recursos técnicos já existem e quando usá-los. Não criar uma segunda implementação paralela sem motivo documentado.

## 1. Navegação e shell

### Código existente

- `src/screens/App.js`
- `src/screens/BottomNavigation.js`
- `src/components/ScreenHeader.tsx`

### Direção V2

Extrair/modernizar para primitives equivalentes a `AppShell`, `Screen`, `TopBar`, `BottomNavigation` e `Section`. A estrutura de rotas/estado existente deve ser preservada até haver migração segura.

Bottom nav raiz:

1. Início
2. Planejamento
3. Turmas
4. Arquivos
5. Mais

Telas filhas normalmente usam TopBar + back, sem duplicar bottom nav quando o fluxo exige foco.

---

## 2. Persistência local

### Recursos

- `src/data/localStore.ts`
- repositories especializados em `src/data/`

### Regra

UI nunca grava diretamente em múltiplas chaves ad hoc se já existe repository. Preferir `domain -> repository -> storage`.

Mudança de schema exige estratégia de migração e teste. Falha de storage não autoriza apagar dados.

---

## 3. Turmas e alunos

- `src/data/classes.js`
- `src/screens/ClassManager.tsx`
- `src/screens/ClassesScreen.js`
- `src/screens/ClassScreen.js`
- `src/screens/StudentScreen.js`
- `src/screens/NewStudentScreen.js`
- `src/screens/StudentImportScreen.tsx`
- `src/domain/education.ts`
- `src/domain/studentImport.ts`
- `src/data/studentCleanup.ts`

Usar para criação/edição/importação/remoção segura. Não duplicar modelos de turma/aluno em estado separado da V2.

---

## 4. Frequência

- `src/screens/AttendanceScreen.js`
- `src/domain/attendance.ts`

Cálculo de presença/faltas deve ficar no domínio. A UI apresenta e coleta estado, mas não inventa fórmula em JSX.

---

## 5. Acadêmico / notas

- `src/screens/AcademicScreen.tsx`
- `src/data/academicRepository.ts`
- `src/domain/academic.ts`
- `tests/academic.test.ts`
- `e2e/academic-saving.pw.ts`

Toda regra de cálculo deve ser coberta por teste. Ausência não vira nota zero implicitamente.

---

## 6. Planejamento

- `src/screens/PlanningScreen.jsx`
- `src/components/PlanningBoard.tsx`
- `src/screens/LessonPlanScreen.js`
- `src/screens/PedagogicalPlanningScreen.js`
- `src/data/planRepository.ts`
- `src/components/usePlanAutosave.ts`
- `src/domain/lessonPlans.ts`

A V2 pode decompor `PlanningBoard` em componentes menores. Persistência e autosave devem continuar centralizados.

---

## 7. BNCC

- `src/screens/BnccCatalogScreen.tsx`
- `src/screens/BnccInfantilScreen.js`
- `src/screens/SkillPicker.js`
- `src/domain/bncc.ts`
- `src/data/bncc.json`
- `src/data/bncc-fundamental-medio.json`
- `references/bncc-extracted.json`
- `references/bncc-provenance.json`
- `references/bncc-oficial.pdf`

Não inventar habilidade/código. Respeitar diferenças entre Educação Infantil e Fundamental/Médio.

---

## 8. Observações, caderno e anexos

- `src/screens/ObservationScreen.js`
- `src/screens/QuickRecordScreen.js`
- `src/screens/NotebookScreen.tsx`
- `src/data/notebookRepository.ts`
- `src/data/notebookAttachments.ts`
- `src/domain/notebook.ts`

Conteúdo pode conter dados sensíveis. Não usar analytics com texto/nome/aluno.

---

## 9. Agenda e câmera

- `src/data/agenda-camera.js`
- `@capacitor/camera`
- `@capacitor/local-notifications`

Câmera somente após ação explícita. Notificação somente após usuário habilitar lembrete/feature contextual.

---

## 10. Arquivos

- `src/screens/LibraryScreen.js` / `.jsx`
- `src/screens/DocumentsScreen.js`
- `src/screens/TrashScreen.jsx`
- `src/data/files.js`
- `@capacitor/filesystem`
- `@capacitor/file-viewer`
- `@capacitor/share`

Operações devem ser transacionais quando possível e nunca enviar arquivos externamente sem ação do usuário.

---

## 11. Relatórios e exportação

- `src/screens/ReportsModule.tsx`
- `src/screens/ReportBuilder.tsx`
- `src/screens/ReportsScreen.js`
- `src/data/pdfExport.ts`
- `src/data/export.ts`
- `jspdf`

Gerar somente dados selecionados. PDFs precisam ser testados para quebra de página, acentos e fontes.

---

## 12. Notificações

- `src/screens/NotificationsScreen.js`
- `src/data/notifications.js`
- `@capacitor/local-notifications`

Distinguir caixa de entrada interna de notificação do sistema. Não pedir permissão ao abrir a lista.

---

## 13. Backup

- `src/screens/BackupScreen.js`
- `src/data/backup.js`
- `src/data/secureBackup.ts`
- `tests/secureBackup.test.ts`

Restaurar somente após validar arquivo/schema. Nunca destruir estado atual antes de validar. Criar ponto de recuperação quando possível.

---

## 14. Assinatura / RevenueCat

- `src/screens/SubscriptionScreen.tsx`
- `src/data/subscriptionBilling.ts`
- `src/data/subscriptionRepository.ts`
- `src/domain/subscription.ts`
- `src/domain/subscriptionBilling.ts`
- `@revenuecat/purchases-capacitor`
- `docs/billing/revenuecat-capacitor.md`
- `tests/subscription*.test.ts`
- `e2e/subscription-paywall.pw.ts`

Fonte de preço/availability: offering/package da loja. Não hardcode preço como verdade. Entitlement deve ser confirmado antes de mostrar sucesso premium.

---

## 15. Browser e links externos

- `@capacitor/browser`

Usar para Termos, Privacidade, suporte ou gerenciamento de assinatura na loja quando necessário. Nunca anexar dados pessoais/pedagógicos à URL.

---

## 16. Ferramentas nativas de sala

- `@capawesome/capacitor-torch`
- Capacitor App lifecycle quando necessário

Hardware indisponível precisa gerar estado explicativo; não crash.

---

## 17. Tipografia e ícones

- `@fontsource/nunito-sans`
- `lucide-react`

Nunito Sans é fallback/implementação atual compatível; pesos e escala seguem `FOUNDATIONS.md`. Lucide pode ser usado como base, mas ícones não devem ser enfiados em quadrados pastel por padrão. Tamanho/stroke devem obedecer tokens V2.

---

## 18. Ilustrações

`public/reference-art/` contém arte legada/referência. Não usar `splash-mascots.png` no produto. Ilustração humana pode ser usada somente nos pontos narrativos definidos e deve seguir a direção aprovada; não transformar a professora ilustrada em mascote persistente.

---

## 19. Testes

### Unit/integration

- `tests/domain.test.ts`
- `tests/planning.test.ts`
- `tests/academic.test.ts`
- `tests/files.test.ts`
- `tests/notebook.test.ts`
- `tests/sequences.test.ts`
- `tests/studentCleanup.test.ts`
- `tests/secureBackup.test.ts`
- `tests/subscription.test.ts`
- `tests/subscriptionBilling.test.ts`
- `tests/androidSecurityConfig.test.ts`

### E2E

- `e2e/onboarding-and-sequences.pw.ts`
- `e2e/planning-board.pw.ts`
- `e2e/academic-saving.pw.ts`
- `e2e/bncc.pw.ts`
- `e2e/library-access.pw.ts`
- `e2e/more-navigation.pw.ts`
- `e2e/settings-legal.pw.ts`
- `e2e/subscription-paywall.pw.ts`

Cada redesign deve atualizar testes de seletores/fluxos sem reduzir cobertura funcional.

---

## 20. Android QA

Comandos de referência:

```text
pnpm test
pnpm build
pnpm test:e2e
node scripts/android-sync.mjs
node scripts/android-qa.mjs
cd android && gradlew.bat assembleDebug
```

Usar dispositivo/emulador realista e screenshots em 360, 390 e 430 CSS px, além de dispositivo Android real quando feature nativa for afetada.

---

## 21. Proibições técnicas

- não criar mock funcional desconectado do repository real;
- não duplicar regra de negócio em componente visual;
- não guardar senha/token em texto puro;
- não versionar segredo/keystore;
- não enviar dados pedagógicos/alunos para analytics;
- não criar preço/assinatura fake;
- não apagar storage para “corrigir” migração;
- não usar permissão nativa antecipadamente sem contexto;
- não trocar stack React/TS/Vite/Capacitor sem decisão explícita.