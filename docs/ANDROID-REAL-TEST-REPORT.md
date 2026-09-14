# Relatório de teste Android em aparelho real

**Data:** 12/09/2026 (America/Sao_Paulo)
**Aplicativo:** Assistente Pedagógico
**Package:** `br.com.assistentepedagogico.app`
**Versão/build:** `0.3.0`, `versionCode 30`
**APK debug SHA-256:** `1E7A02AE7DF8C711E77EF90699542EBDE4F2E7EACF1B42B20B17E6C3B6F610E5`
**Aparelho:** `2412DPC0AG` (serial `FMV455CMZXY5HYXS`)
**Android:** 16
**Atualização instalada:** `2026-09-12 19:55:40`
**Resultado geral:** 10 PASS, 0 FAIL, 18 BLOCKED

## Rodada QA isolada

**Pacote:** `br.com.assistentepedagogico.app.qa`
**Versão/build:** `0.3.0-qa`, `versionCode 30`
**APK QA SHA-256:** `6E3518954A6612959F359855E9350EC1F431AFE4B8287895D9A451960F1D17CA`
**Base:** dados sintéticos (`ProfessorQA`, `QATurma`, `AlunoQA`, `PlanoQA`), armazenamento separado do pacote de produção.

A instalação inicialmente foi recusada pelo Android com `INSTALL_FAILED_USER_RESTRICTED`; após a autorização do usuário no aparelho, a mesma instalação foi repetida e concluída com `Success`. O pacote QA permaneceu instalado ao lado da produção e nenhuma base de produção foi limpa ou alterada.

| Fluxo QA | Resultado | Evidência |
|---|---|---|
| Onboarding limpo + perfil/turma | PASS | Base criada do zero com dados sintéticos. [Home configurada](./android-qa-home-configured.png) |
| Cadastro de aluno + data de nascimento | PASS | Aluno sintético persistido na turma. [Turma após cadastro](./android-qa-after-student.png) |
| Chamada: presença + conclusão | PASS | `1 presente · 0 faltas`. [Chamada concluída](./android-qa-attendance-complete.png) |
| Planejamento + autosave + reabertura | PASS | Plano sintético salvo e visível após retorno. [Planejamento salvo](./android-qa-planning-saved.png) |
| Seletor de arquivos | PASS | DocumentsUI abriu e foi cancelado sem escolher arquivo real. |
| Câmera + permissão + captura + biblioteca | PASS após correção | A câmera abriu, capturou, retornou ao app e a foto foi visualizada. [Câmera](./android-qa-camera.png) · [Foto adicionada](./android-qa-camera-added.png) |
| Aparência claro/escuro | PASS | Tema escuro aplicado e claro restaurado. [Escuro](./android-qa-appearance-dark.png) |
| Backup manual protegido | PASS | Senha sintética gerou arquivo e abriu o compartilhamento nativo; o compartilhamento foi cancelado. O seletor de restauração também abriu e foi cancelado. [Tela de backup](./android-qa-backup.png) |
| Reinício do processo | PASS | Após force-stop e relançamento, os dados sintéticos reapareceram na Home. [Persistência após reinício](./android-qa-restart-ready.png) |

### Bug encontrado e corrigido na rodada QA

Na primeira tentativa, a câmera falhou ao criar a foto temporária porque o `FileProvider` não declarava o diretório externo específico do aplicativo usado pelo Capacitor Camera. O logcat registrou `Unable to create photo on disk` e `Failed to find configured root`. A correção adicionou somente `<external-files-path name="app_external_files" path="." />` em `android/app/src/main/res/xml/file_paths.xml`, mantendo `files-path`/`cache-path` e proibindo `external-path` amplo. O teste automatizado `tests/androidSecurityConfig.test.ts` cobre essa restrição; a captura subsequente confirmou o fluxo completo no aparelho real.

## Escopo e segurança

O teste começou pelo comando obrigatório do skill `agent-device`:

```text
agent-device open br.com.assistentepedagogico.app --foreground
```

Nesta sessão o binário não estava no PATH. O conector mobile também retornou `spawn adb ENOENT`. O diagnóstico do próprio projeto encontrou o aparelho autorizado; por isso a continuação foi feita com o `adb.exe` explícito do SDK local, sem usar AVD.

Ao abrir o app havia dados persistidos: perfil exibido como “Docente Nunes”, turma “Teste” e um aluno. Esses dados foram tratados como potencialmente reais. Não houve limpeza, desinstalação, exclusão, arquivamento, edição, importação, compartilhamento, envio de arquivo, compra ou concessão de permissão. A preferência “Sons do Aplicativo”, alternada acidentalmente durante a navegação, foi restaurada para “Ativados”.

Permissões sensíveis declaradas no manifesto e observadas no aparelho:

| Permissão | Resultado |
|---|---|
| Câmera | `granted=false` |
| Microfone | `granted=false` |
| Notificações | `granted=false` |

## Matriz de fluxos

| Fluxo | Resultado | Evidência/observação |
|---|---|---|
| Inicialização do app | PASS | App abriu em foreground e exibiu a tela inicial sem crash. |
| Onboarding limpo | BLOCKED | Não foi resetado o armazenamento por haver dados persistidos potencialmente reais. |
| Perfil — visualizar | PASS | Tela “Editar perfil” abriu e exibiu os campos existentes; nenhuma alteração foi salva. Captura removida por conter dado persistido. |
| Perfil — editar/salvar/foto | BLOCKED | Mutação e acesso à câmera não autorizados neste estado de dados. |
| Turmas — listar/turma ativa | PASS | “Minhas turmas” abriu e mostrou a turma ativa. Captura removida por conter dado persistido. |
| Turmas — criar/editar/trocar/arquivar | BLOCKED | Fluxos mutáveis não executados para preservar registros existentes. |
| Alunos — cadastrar/importar | BLOCKED | Não executado para não acrescentar ou alterar dados numa base possivelmente real. |
| Chamada | BLOCKED | Tela de turma foi alcançada, mas registrar presença/falta seria mutação. |
| Observações | BLOCKED | Registro mutável não executado. |
| Áudio/foto e permissões | BLOCKED | Câmera/microfone não concedidos; nenhum registro foi criado. |
| Planejamento — agenda/dia/semana/calendário | PASS | Tela “Planejar” abriu; estados sem plano foram exibidos. [Captura](./android-planning.png) |
| Quadro | BLOCKED | A navegação expôs Dia, Semana e Calendário; o tab Quadro não apareceu nessa instância e não foi forçado por rota interna. |
| Caderno | BLOCKED | Rota foi alcançada, mas a captura continha o identificador da turma persistida; criação de nota não foi executada por segurança. |
| Sequências | BLOCKED | Não foi criada nem editada sequência. |
| BNCC | BLOCKED | Consulta não foi forçada sem uma navegação segura confirmada; seleção/salvamento não executados. |
| Notas e recuperação | BLOCKED | Nenhuma nota ou recuperação foi criada/editada. |
| Biblioteca/arquivos — visualizar vazio | PASS | Tela “Arquivos” abriu com busca, favoritos e empty state. [Captura](./android-files.png) |
| Câmera/documentos/compartilhamento | BLOCKED | Não adicionado arquivo, não aberta câmera e não compartilhado conteúdo. |
| Relatórios PDF/CSV | BLOCKED | Exportação não executada para não processar/enviar dados persistidos. |
| Lembretes/notificações — visualizar configurações | PASS | Configurações exibiram a seção de notificações sem pedir permissão. [Captura](./android-settings-lower2.png) |
| Lembretes/notificações — criar/agendar | BLOCKED | Não alterado nem agendado lembrete. |
| Configurações — abrir | PASS | Painel completo abriu e permaneceu navegável. [Captura](./android-settings.png) |
| Aparência | PASS | Rota abriu e mostrou Claro/Escuro/OLED/Seguir sistema; nenhum tema foi alterado. |
| Ajuda e tutoriais/feedback | BLOCKED | Não enviado feedback nem mensagem externa. |
| Termos e privacidade | PASS | Privacidade e Termos abriram em leitura. [Privacidade](./android-privacy.png) |
| Backup protegido por senha | BLOCKED | Exportação/restauração não executadas sobre dados potencialmente reais. |
| Compatibilidade legada | BLOCKED | Não houve restauração de backup legado. |
| Paywall | PASS | “Seu plano” abriu, exibiu Gratuito/Pro e não iniciou compra. [Captura](./android-paywall.png) |

## Verificações complementares

Executadas no repositório, sem modificar código-fonte:

```text
pnpm test  -> 11 arquivos, 45 testes PASS
pnpm build -> PASS (tsc + vite build)
node scripts/android-device-check.mjs -> 1 dispositivo autorizado
```

O build exibiu apenas avisos já conhecidos do bundle (`eval` em `lottie-web` e chunks maiores que 500 kB); não houve erro de compilação.

## Evidências e bloqueios

Capturas neutras mantidas neste diretório: configurações, privacidade, paywall, arquivos e planejamento. Capturas que continham perfil/aluno/turma persistidos, Play Store ou uma notificação externa com nome/foto foram excluídas do conjunto de evidências do relatório. A árvore UI inicial do WebView ficou praticamente sem elementos acessíveis (`WebView` NAF), então a confirmação visual foi feita por screenshot.

Não foi identificado FAIL funcional reproduzível. Os bloqueios são de segurança dos dados existentes, permissões não concedidas, ausência do binário `agent-device` no PATH e ausência de uma superfície segura para onboarding limpo/fluxos mutáveis.

## Estado final

O app foi relançado em `br.com.assistentepedagogico.app` após o teste. Dados persistidos foram preservados; nenhuma compra, exportação, permissão sensível, envio ou exclusão foi concluído. O aparelho ficou em estado seguro para o usuário.
