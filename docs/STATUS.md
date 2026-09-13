# Status operacional

Atualizado em 12/09/2026.

## Entrega atual — Home no PR #2

- Redesign da Home implementado em escopo isolado: composição branca e azul, turma compacta, ação do dia, frequência, agenda, planos, atividade recente, atalhos e navegação inferior com safe area.
- Correções de acessibilidade e comportamento aplicadas: títulos com IDs únicos, linhas de planos navegáveis por clique/teclado, agenda vazia correta após carregamento e rolagem sem sobreposição em 393×873 e 375×812.
- Evidências antes/depois e estados relevantes versionadas em `docs/qa/home-pr/`; relatório em `docs/HOME-VISUAL-REVIEW.md`.
- Validação desta entrega: 46 testes Vitest, build web, sincronização Capacitor, 25 E2E e APK debug Android aprovados. A captura usa fixtures sintéticas; o Poco X7 físico não foi alterado.
- Aguardando revisão da Home no PR #2; nenhuma alteração desta rodada foi mesclada em `main`.

## Concluído nesta rodada

- Baseline local importado para a branch `codex/1-import-baseline` do PR #2; a stack React + TypeScript + Vite + Capacitor Android, o `appId` `br.com.assistentepedagogico.app`, assets, testes e documentação foram preservados sem segredos ou dados reais.
- Verificação do baseline importado: `pnpm install --frozen-lockfile`, 46 testes Vitest, build web, 25 cenários E2E, sincronização Capacitor e `assembleDebug` aprovados.
- Configuração do pnpm corrigida para permitir o postinstall seguro do `core-js`.
- 45 testes Vitest aprovados, incluindo a cascata de exclusão definitiva de aluno e a cifra/decifra do backup manual.
- TypeScript e build web de produção aprovados.
- Sincronização Capacitor/Android aprovada com 9 plugins.
- APK debug Android compilado com compile/target SDK 36.
- `lintDebug` aprovado com 0 erros; os avisos restantes estão documentados como manutenção de dependências, recursos legados e splash.
- 25 cenários E2E aprovados no navegador isolado, incluindo o Quadro mobile-only com arraste, persistência e desfazer.
- Barra inferior corrigida para permanecer visível durante a rolagem da Home, com regressão E2E.
- Auditoria visual inicial registrada em `docs/VISUAL-AUDIT.md`.
- Backup automático do Android desabilitado no Manifest para evitar cópia silenciosa de dados pedagógicos; o backup manual do app permanece disponível.
- Roadmap de lançamento criado em `docs/ROADMAP-DE-LANCAMENTO.md`.
- Matriz funcional, critérios de aceite e riscos priorizados registrados em `docs/MATRIZ-FUNCIONAL-E-ACEITE.md`.
- Direção visual/UX “Caderno Vivo” consolidada em `docs/DIRECAO-VISUAL-UX.md`; primeira implementação aplicada ao Planejamento com escopo mobile-only.
- Bloco duplicado “Acesso por área” removido da aba Mais; a navegação principal agora tem uma única fonte de verdade.
- Contraste das ações azuis da Biblioteca corrigido no token global: preenchidos usam texto branco, “Capturar foto” mantém tratamento secundário claro e o azul antigo é migrado automaticamente.
- Auditoria de contraste no DOM mobile confirmou que não há superfície azul visível com texto escuro; o ícone Android foi alinhado à identidade Caderno Vivo com caderno aberto em teal, creme e dourado.
- Pipeline de release Android reproduzível criado: valida SDK 36, falha sem keystore para release assinada e gera AAB unsigned explicitamente para validação local.
- AAB release regenerado após a correção do `FileProvider` da câmera e o ajuste da navegação mobile em `android/app/build/outputs/bundle/release/app-release.aab` (19.378.962 bytes; SHA-256 `D4256D393969453AC638BA23C15FC48B67B5AA8553B66DEFC4379F7EDEE20DD6`); verificação local confirmou que ainda está unsigned.
- Exclusão definitiva de aluno endurecida: remove perfil, observações, evolução, fotos e áudios do filesystem e limpa referências em rotina, ocorrências, chamada, justificativas, notas e Caderno; cobertura adicionada em `tests/studentCleanup.test.ts`.
- Backup manual passou a ser exportado com senha usando PBKDF2-SHA-256 + AES-GCM; a senha não é armazenada, a integridade é validada na decifra e backups legados sem senha continuam importáveis.
- Auditoria de motion corrigiu a barra de progresso do onboarding para animar `transform` em vez de `width`, evitando reflow durante a transição; typecheck, Vitest, build e E2E permaneceram aprovados.
- Teste Android em aparelho real reinstalou o APK atual `0.3.0`/`versionCode 30` (`SHA-256 1E7A02AE7DF8C711E77EF90699542EBDE4F2E7EACF1B42B20B17E6C3B6F610E5`) e registrou 10 PASS, 0 FAIL e 18 BLOCKED para a produção em `docs/ANDROID-REAL-TEST-REPORT.md`.
- Variante Android `QA` criada com `applicationId` `br.com.assistentepedagogico.app.qa`, armazenamento separado e comando reproduzível `pnpm android:qa`; após autorização USB, o APK foi instalado e validou onboarding, cadastro, chamada, planejamento, arquivos, câmera, temas, backup e persistência após reinício com dados sintéticos.
- Bug real da câmera corrigido: o `FileProvider` passou a declarar apenas o diretório externo específico do app, sem expor armazenamento externo amplo; o fluxo foi repetido com sucesso no aparelho QA.
- A auditoria especializada Apple/HIG foi delegada ao agente de design e está sendo consolidada em `docs/APPLE-DESIGN-REVIEW.md`.

## Pendências prioritárias

1. Auditar e uniformizar o visual em todos os módulos; a correção de contraste da Biblioteca já foi validada.
2. Completar os fluxos ainda não cobertos no aparelho Android QA: microfone/áudio, notificações, relatórios, sequências/BNCC, restauração efetiva e back button/retomada/rotação.
3. Completar billing real da Google Play e entitlements Free/Pro/Vitalício.
4. Finalizar revisão jurídica, contato, privacidade e exclusão/exportação de dados.
5. Configurar assinatura de produção, gerar AAB assinado e preparar teste interno da Play; o caminho local já está automatizado, mas a upload key ainda não existe no ambiente.

## Riscos conhecidos

- O projeto local ainda não possui remoto Git configurado.
- A versão atual é funcional para desenvolvimento, mas não é uma release comercial.
- O paywall ainda opera em modo de prévia quando RevenueCat não está configurado.
- O AAB atual é unsigned (`android/app/build/outputs/bundle/release/app-release.aab`); não pode ser enviado à Google Play até a upload key ser configurada.
- O aparelho físico autorizado está disponível (`2412DPC0AG`, Android 16); o binário `agent-device` e o conector mobile não estão no PATH desta sessão, então a evidência foi coletada com o `adb.exe` explícito do SDK. O AVD `Redungeon_QA` continua `offline` e não foi usado.
- A rodada QA usa somente dados sintéticos e não substitui o teste interno da Play; o app ainda precisa de validação de release assinado.
- O build mostra avisos de dependências e chunks web grandes; otimização fica depois da estabilidade funcional.
