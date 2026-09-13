# Volume 6 — Configurações, Assinatura, Ciclo de Vida e Estados do Sistema

Este volume define as telas 46–62.

## Recursos existentes a preservar/reusar

- `src/screens/SettingsScreen.js`
- `src/screens/AppearanceScreen.js`
- `src/screens/PrivacyScreen.js`
- `src/screens/BackupScreen.js`
- `src/screens/HelpFeedbackScreen.tsx`
- `src/screens/LegalScreen.tsx`
- `src/screens/SubscriptionScreen.tsx`
- `src/screens/TeacherProfileScreen.js`
- `src/data/backup.js`
- `src/data/secureBackup.ts`
- `src/data/subscriptionBilling.ts`
- `src/data/subscriptionRepository.ts`
- `src/data/studentCleanup.ts`
- `src/data/localStore.ts`
- `@capacitor/browser`
- `@capacitor/share`
- `@capacitor/app`
- RevenueCat via `@revenuecat/purchases-capacitor`
- especificações `docs/RELATORIO_LGPD_TERMOS_PRIVACIDADE.md`, release e billing.

---

# 46. Configurações

## Objetivo

Centralizar preferências e controles do app com leitura rápida, sem card individual para cada item.

## Layout

1. TopBar `Configurações`, subtítulo curto opcional.
2. ProfileSummaryRow no topo: avatar, nome, profissão; tocar abre Perfil profissional/conta.
3. SettingsGroup `Conta`:
   - Conta e perfil;
   - Notificações.
4. SettingsGroup `Aplicativo`:
   - Aparência e acessibilidade;
   - Idioma, apenas se suportado;
   - Preferências de planejamento quando existirem.
5. SettingsGroup `Dados e segurança`:
   - Privacidade e segurança;
   - Backup e sincronização;
   - Exportar meus dados, quando previsto.
6. SettingsGroup `Plano`:
   - Meu plano / Assinatura.
7. SettingsGroup `Sobre`:
   - Ajuda e suporte;
   - Termos/Privacidade;
   - Sobre o app / versão.
8. rodapé separado com `Sair da conta`, se existir autenticação real.

## Regra visual

Usar `SettingsGroup` com rows e separators. Não empilhar dez cards brancos independentes.

---

# 47. Aparência e acessibilidade

## Layout

1. TopBar `Aparência`.
2. Section `Tema`: Claro / Escuro / Sistema em segmented/radio cards compactos.
3. Section `Tamanho do texto`: Padrão / Maior ou escala compatível com acessibilidade do sistema.
4. Section `Movimento`: respeitar redução de movimento; opção interna somente se fizer sentido além do sistema.
5. Section `Contraste` apenas se houver implementação real.
6. Preview compacto opcional de componentes.

## Comportamento

Mudanças devem aplicar imediatamente e persistir. `Sistema` acompanha preferência do SO. Não forçar cor customizada em detrimento da identidade/acessibilidade.

## Testes

Verificar zoom/font scaling, 360px, modo escuro, foco visível e `prefers-reduced-motion`.

---

# 48. Privacidade e segurança

## Objetivo

Explicar e controlar dados com linguagem simples e confiança.

## Layout

1. TopBar `Privacidade e segurança`.
2. PrivacySummary curto: `Seus dados pedagógicos ficam protegidos e não são enviados a analytics.`
3. SettingsGroup `Dados`:
   - Exportar meus dados;
   - Backup;
   - Dados locais/armazenamento.
4. SettingsGroup `Permissões`:
   - Câmera;
   - Notificações;
   - arquivos, conforme plataforma;
   - mostrar estado e ação contextual, não abrir settings sem necessidade.
5. SettingsGroup `Legal`:
   - Política de privacidade;
   - Termos de uso.
6. DangerZone separado:
   - `Excluir conta`.

## Regras LGPD

- coleta mínima;
- consentimento específico quando necessário;
- não condicionar segurança a Pro;
- exportação/exclusão devem funcionar conforme especificação legal;
- não usar padrões manipulativos para impedir exclusão.

---

# 49. Backup e sincronização

## Objetivo

Permitir backup/restauração segura sem risco de perda silenciosa.

## Layout

1. TopBar `Backup e sincronização`.
2. status atual: último backup, tamanho aproximado, local/destino quando conhecido.
3. CTA `Criar backup agora`.
4. ação `Restaurar backup`.
5. opções automáticas apenas se realmente implementadas.
6. explicação curta sobre o que entra no backup.

## Implementação

Usar `backup.js` e preferir `secureBackup.ts` quando aplicável. Validar versão/schema antes de restauração.

## Fluxo criar

- preparar snapshot;
- validar integridade;
- criptografar/proteger conforme implementação existente;
- escolher destino/compartilhar se necessário;
- mostrar sucesso com data.

## Fluxo restaurar

- selecionar arquivo;
- validar formato/versão;
- mostrar resumo do conteúdo;
- confirmar;
- criar backup preventivo do estado atual quando seguro;
- restaurar transacionalmente;
- se falhar, manter dados anteriores.

Nunca apagar o estado atual antes de validar o backup.

---

# 50. Ajuda e suporte

## Layout

1. TopBar `Ajuda e suporte`.
2. Search `Como podemos ajudar?` quando base local de ajuda existir.
3. rows:
   - Dúvidas frequentes;
   - Primeiros passos/Tutoriais;
   - Entrar em contato;
   - Enviar feedback.
4. seção de diagnóstico opcional com versão/app/Android para copiar, sem dados pessoais.

## Contato/feedback

Se abrir link externo, usar Capacitor Browser. Se houver e-mail/URL, não incluir automaticamente dados de aluno ou conteúdo pedagógico.

---

# 51. Sobre o aplicativo

## Layout

1. marca pequena;
2. `Assistente Pedagógico`;
3. versão/build;
4. texto curto de missão;
5. rows: Termos, Privacidade, Licenças de terceiros, site/contato quando real;
6. informações de copyright.

Sem easter eggs que exponham debug/secrets em produção.

---

# 52. Gerenciar assinatura

## Objetivo

Mostrar estado real do plano e ações transparentes.

## Layout

1. TopBar `Meu plano`.
2. PlanStatusCard único:
   - nome do plano;
   - preço/periodicidade real;
   - estado ativo/cancelamento pendente/expiração;
   - renovação/data quando disponível.
3. BenefitsSummary compacto.
4. CTA `Alterar plano`.
5. ação `Gerenciar na loja` quando plataforma exigir.
6. `Restaurar compras`.
7. histórico de pagamentos apenas se dados reais disponíveis; não simular.

## Dados

RevenueCat/loja é fonte da verdade; repository local é cache/snapshot, não autoridade comercial absoluta.

---

# 53. Alterar plano

## Layout

1. TopBar `Alterar plano`.
2. packages disponíveis vindos da offering;
3. plano atual claramente marcado;
4. opções comparáveis por benefício e preço;
5. CTA contextual `Mudar para {plano}`.
6. informação de cobrança/proration quando disponível; não inventar.

## Comportamento

Seguir API da loja/RevenueCat. Só confirmar alteração quando entitlement/customer info refletir novo estado.

---

# 54. Cancelar assinatura

## Objetivo

Permitir cancelamento de forma clara sem dark pattern.

## Layout

1. heading `Cancelar assinatura?` em tela/sheet focado.
2. explicação do que acontece e até quando acesso permanece.
3. benefícios perdidos podem ser listados de forma factual, sem culpa/manipulação.
4. CTA secundário `Manter assinatura`.
5. CTA destrutivo `Continuar cancelamento`.

## Plataforma

Se cancelamento precisa ocorrer na Play Store/App Store, abrir destino correto via Browser/deep link e explicar que o app não pode cancelar diretamente.

Não usar múltiplas telas de impedimento, desconto falso ou contador.

---

# 55. Estados de carregamento

## Regra global

Loading deve preservar estrutura e reduzir salto visual.

### Skeleton

Usar para conteúdo previsível: Home, listas, cards, perfil, offerings.

### Progress indicator

Usar quando há operação com duração real: exportar PDF, backup, restore, importação.

### Inline loading

Botões em ação mostram spinner pequeno + label (`Salvando…`) e ficam protegidos de duplo clique.

### Nunca

- spinner fullscreen infinito sem contexto;
- bloquear toda a aplicação porque uma seção secundária está carregando;
- esconder botão cancelar quando operação pode ser cancelada.

---

# 56. Estados vazios

## Anatomia

1. ícone/ilustração pequena opcional;
2. título concreto (`Nenhum arquivo aqui ainda`);
3. explicação de uma linha;
4. CTA único útil (`Importar arquivo`).

## Regras

Empty state deve ser contextual. Não reutilizar a mesma ilustração/texto genérico em todas as áreas. Em listas secundárias, pode ser apenas texto inline sem hero.

---

# 57. Estados de erro

## Tipos

### Erro inline

Campo inválido, seção que falhou, ação que pode retry localmente.

### ErrorNotice

Bloco com título + explicação + retry.

### ErrorScreen

Somente quando o fluxo inteiro não pode continuar.

## Regras

- preservar dados digitados;
- explicar ação possível;
- não exibir stack trace/código interno ao usuário;
- logs técnicos não podem conter dados pedagógicos/alunos;
- storage error é P0/P1 conforme impacto.

---

# 58. Estados de sucesso

## Uso

- salvar plano;
- concluir chamada;
- importar arquivo;
- gerar relatório;
- restaurar backup;
- confirmar compra.

Preferir toast/status inline para ações comuns. Tela de sucesso inteira só em marcos importantes (assinatura, onboarding, exclusão).

Motion curto e respeitando reduced motion.

---

# 59. Offline e recuperação

## Princípio

O núcleo deve funcionar offline.

## UI

- banner discreto apenas quando a ausência de rede muda algum recurso;
- operações locais continuam normalmente;
- recursos de loja/links externos explicam indisponibilidade;
- não mostrar modal bloqueante a cada perda de rede.

## Recuperação

Ao reconectar, atualizar serviços remotos de forma segura sem sobrescrever dados locais mais novos. Billing pode revalidar entitlement em background.

---

# 60. Logout

## Quando existe

Somente se autenticação real existir.

## Fluxo

1. usuário toca `Sair da conta`;
2. confirmação explica se dados locais permanecem ou serão removidos;
3. CTA `Sair`;
4. finalizar sessão remota/local sem apagar dados pedagógicos automaticamente;
5. navegar para Login.

Se houver escolha `Remover dados deste dispositivo`, ela deve ser separada e explícita.

---

# 61. Exclusão de conta

## Objetivo

Cumprir direito de exclusão com clareza e proteção contra toque acidental.

## Etapa 1 — explicação

Layout:

1. TopBar `Excluir conta`;
2. banner danger leve `Essa ação não pode ser desfeita`;
3. lista factual do que será removido:
   - conta;
   - dados de perfil;
   - dados pedagógicos vinculados conforme arquitetura;
   - turmas/alunos/registros quando realmente abrangidos;
4. explicar o que pode continuar fora do app por obrigação legal/loja, se houver;
5. checkbox/acknowledgement somente se necessário, não para criar fricção artificial;
6. CTA `Continuar`.

## Etapa 2 — confirmar identidade

- solicitar senha/reautenticação apenas se auth real suportar;
- alternativa provider reauth quando login externo;
- se app local sem auth remota, usar confirmação textual apropriada (`DIGITE EXCLUIR`) somente quando proporcional ao impacto.

## Implementação

Antes de executar:

- validar escopo;
- cancelar operações pendentes;
- não cancelar assinatura automaticamente se isso não for permitido/esperado pela loja; explicar separadamente;
- executar limpeza com funções de domínio/repository, inclusive `studentCleanup.ts` quando aplicável;
- tratar falha parcial de forma transacional/recuperável;
- registrar somente telemetria técnica não sensível se permitido.

## Privacidade

Nunca pedir motivo obrigatório para exclusão. Feedback opcional pode existir depois e não deve bloquear.

---

# 62. Confirmação final de exclusão

## Objetivo

Confirmar que o processo terminou e remover acesso ao conteúdo anterior.

## Layout

1. ícone de confirmação neutro;
2. heading `Conta excluída`;
3. texto `Seus dados foram removidos deste serviço/dispositivo conforme solicitado` ajustado ao que realmente aconteceu;
4. nota sobre assinatura na loja se ainda exigir cancelamento separado;
5. CTA `Voltar ao início`.

## Lógica

- limpar sessão e caches apropriados;
- não manter navegação back para telas privadas;
- resetar setup somente quando exclusão realmente concluiu;
- se exclusão remota estiver pendente, não dizer `Conta excluída`; usar estado `Solicitação recebida` com prazo real.

## Gate deste volume

Screenshots: Settings, Appearance claro/escuro/texto maior, Privacy, Backup normal/erro/restore preview, Help, About, Manage Subscription ativo/cancelamento pendente, change plan, cancel flow, loading/empty/error/success/offline, logout e todas as etapas de exclusão. Testes: `secureBackup.test.ts`, subscription tests, `settings-legal.pw.ts`, `subscription-paywall.pw.ts`, Android real para permissões/deep links quando aplicável.