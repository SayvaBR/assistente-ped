# GitHub sem jargão — Assistente Pedagógico

Este documento existe para que qualquer pessoa, mesmo sem experiência em programação, entenda como o projeto é organizado.

## Ideia principal

O GitHub guarda versões do aplicativo e permite testar mudanças antes de colocá-las na versão principal.

Pense assim:

- `main` = edição oficial do livro;
- `branch` = uma cópia de trabalho onde alguém pode editar sem estragar a edição oficial;
- `commit` = um ponto de salvamento com uma descrição do que mudou;
- `push` = enviar os salvamentos do computador para o GitHub;
- `pull`/`fetch` = trazer para o computador as mudanças que já estão no GitHub;
- `Pull Request` ou `PR` = pedido para comparar uma branch com outra e decidir se as mudanças devem ser incorporadas;
- `merge` = incorporar oficialmente as mudanças de uma branch em outra;
- `conflict` = quando duas versões mudaram a mesma parte e o Git precisa que alguém escolha como reconciliar;
- `CI` = testes automáticos executados pelo GitHub;
- `check` = um desses testes automáticos;
- `draft PR` = PR ainda em construção;
- `Ready for review` = o autor considera que a mudança já pode ser revisada por outra pessoa/agente; não significa que foi aprovada;
- `approved` = alguém revisou e aceitou;
- `release` = versão preparada para chegar ao usuário/loja.

## Estrutura atual do projeto

### `main`

É a linha oficial e deve ficar estável. Não deve receber desenvolvimento cotidiano diretamente.

### `integration/android-1.0`

É a linha de integração do Android 1.0.

Ela contém o estado atual consolidado do produto e é o ponto de partida para novas frentes enquanto o Android 1.0 está em desenvolvimento.

### Branches de feature

Trabalhos novos devem nascer de `integration/android-1.0`, por exemplo:

- `feat/onboarding-v2`
- `feat/billing-hardening`
- `feat/planning-hardening`
- `fix/android-keyboard`

Cada branch resolve um assunto pequeno e abre um PR de volta para `integration/android-1.0`.

## Fluxo simples

1. Atualizar `integration/android-1.0`.
2. Criar uma branch pequena para uma tarefa.
3. Implementar.
4. Rodar checks rápidos durante o trabalho.
5. Abrir PR para `integration/android-1.0`.
6. Revisar código, screenshots e testes.
7. Corrigir o que for necessário.
8. Fazer merge apenas quando aprovado.
9. Periodicamente, a integração validada vai para `main` por um PR de release/integration.

## O que significa `PR #8`

`PR` significa **Pull Request**.

`#8` é simplesmente o número que o GitHub deu àquele pedido de integração dentro deste repositório.

Então `PR #8` significa: **o oitavo Pull Request criado neste projeto**.

Ele não significa versão 8, tela 8 nem etapa 8 do aplicativo.

## O que significa `Ready for review`

Quer dizer literalmente **“pronto para revisão”**.

É um aviso do autor: “terminei o suficiente para outra pessoa analisar agora”.

Não quer dizer:

- que está aprovado;
- que está sem bugs;
- que será enviado para a Play Store;
- que já foi incorporado à versão principal.

Depois de `Ready for review`, ainda pode haver comentários, pedidos de mudança, testes falhando e novas correções.

## Regras para evitar bagunça

- não desenvolver diretamente em `main`;
- não usar um PR gigante para meses de trabalho novo;
- preferir PRs pequenos e temáticos;
- CI verde é obrigatório antes de integração importante;
- UI precisa de screenshot real quando a mudança é visual;
- não fazer merge automático em `main`;
- integridade de dados, LGPD, billing, backup, BNCC e segurança continuam sendo gates rígidos;
- nenhuma evidência deve conter dados reais de alunos/professores.
