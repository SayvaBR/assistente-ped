# Assistente Pedagógico

Aplicativo local para Android, recuperado do APK 0.2.0 e modernizado com React, TypeScript, Vite e Capacitor. A versão de desenvolvimento é 0.3.0. Ainda não é uma versão aprovada para publicação.

## Desenvolvimento

Pré-requisitos: Node.js, pnpm, JDK 21 e Android SDK. Instale as dependências com `pnpm install --frozen-lockfile`.

```sh
pnpm dev
pnpm test
pnpm test:e2e
pnpm build
pnpm android:sync
```

`android:sync` verifica TypeScript, compila os recursos web e sincroniza os plugins e recursos no projeto Android. Também pode ser executado com `node scripts/android-sync.mjs`.

Os testes de interface usam Chrome instalado, em contexto isolado, com dados fictícios. Verificam salvamento durante digitação, recuperação após falha de armazenamento, navegação com edição pendente, relatórios e concorrência entre salvamento automático, conclusão e exclusão de planos. Não acessam os dados das abas pessoais. O Playwright inicia uma prévia local quando necessário.

No Windows, configure `JAVA_HOME`, `ANDROID_HOME` e `ANDROID_SDK_ROOT` para as instalações locais e execute:

```powershell
.\android\gradlew.bat -p android assembleDebug
```

O APK fica em `android/app/build/outputs/apk/debug/app-debug.apk`. Este APK é de desenvolvimento. A publicação exige assinatura de produção e validação dos requisitos vigentes da loja.

## Organização

- `src/domain`: regras de etapas de ensino, notas, BNCC e importação.
- `src/data`: persistência, repositórios, catálogo BNCC e exportação PDF.
- `src/components`: campos, cabeçalhos, controles e salvamento automático.
- `src/screens`: telas recuperadas e módulos modernizados.
- `src/styles`: estilos recuperados e Design System.
- `src/core/recovered.js`: funções compartilhadas recuperadas; a reorganização incremental ainda está em andamento.
- `tests`: regressões de dados, cálculos, importação, backup e PDF.
- `references`: documentos técnicos e proveniência dos conteúdos recuperados.
- `public/reference-art`: imagens originais utilizadas no onboarding.

## Dados

Os dados permanecem no aparelho. Turmas usam identificadores próprios para separar alunos, frequência, planejamento e notas. Os backups preservam os registros locais e arquivos compatíveis. Não limpe dados nem desinstale o aplicativo para resolver uma atualização sem antes assegurar a recuperação dos dados.

As credenciais de produção, chaves de assinatura e informações pessoais não devem entrar no repositório.

Consulte [o estado da entrega](docs/ESTADO-DA-ENTREGA.md) para distinguir implementação, validação e pendências.
