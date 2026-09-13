# CODEX — START HERE

Se você é o Codex/Astra trabalhando neste repositório, siga esta ordem antes de qualquer alteração:

1. Leia `AGENTS.md`.
2. Leia `docs/STATUS.md`.
3. Leia `docs/DESIGN_SUPERVISION_WORKFLOW.md`.
4. Abra a Issue #1.
5. Trabalhe somente na branch `codex/1-import-baseline` para a Issue #1.
6. Não faça merge em `main`.

## Tarefa atual

Importar para este repositório a base atual do Assistente Pedagógico que está disponível no computador local do usuário.

## Requisitos obrigatórios

- Preservar a stack React + TypeScript + Vite + Capacitor Android.
- Preservar `appId = br.com.assistentepedagogico.app` se ele já existir no projeto local.
- Trazer `package.json`, `src/`, `android/`, configs Vite/TS/Capacitor e assets necessários.
- NÃO versionar `.env` com segredos, tokens, credenciais, keystore privado ou dados reais de usuários/alunos.
- Criar/ajustar `.gitignore` antes do primeiro commit de código se necessário.
- Rodar instalação de dependências e build web.
- Rodar `npx cap sync android` e, quando o ambiente permitir, compilar o Android.
- Documentar qualquer bloqueio real em `docs/STATUS.md`.
- Abrir PR de `codex/1-import-baseline` para `main`.
- No PR, listar comandos executados, build, testes, riscos, arquivos faltantes e problemas conhecidos.

## Trabalho visual futuro

Não redesenhe o aplicativo inteiro de uma vez. Depois do baseline, cada fluxo visual deve ser tratado isoladamente, com screenshot antes/depois e revisão antes de seguir para outro fluxo importante.

## Definição de pronto da Issue #1

A issue só está pronta quando o código-fonte real estiver no GitHub e houver evidência de que a base compila ou, se não compilar, o bloqueio estiver reproduzível e documentado.
