# Auditoria visual inicial

Captura realizada em 12/09/2026 no preview local, viewport móvel de aproximadamente 390 × 844 px, com dados fictícios já carregados.

## Tela observada — Início

### Pontos fortes

- A hierarquia principal é compreensível: professor, turma ativa, frequência de hoje, planejamento e atalhos.
- A paleta clara e os ícones Lucide dão unidade visual e boa legibilidade.
- Os estados vazios explicam o próximo passo e mantêm uma ação primária visível.
- A navegação inferior tem cinco destinos previsíveis e área de toque adequada.

### Correção aplicada

- A navegação inferior foi ancorada ao viewport do aplicativo. Antes, ao rolar até o final da Home, ela podia sair da área visível embora continuasse montada no DOM.
- Foi adicionado um teste E2E que rola a Home até o fim e verifica a posição da navegação.

### Próximos pontos de refinamento

1. Reduzir a sensação de lista longa na Home, agrupando melhor “Agora”, agenda, atividade e atalhos.
2. Dar mais destaque à ação de frequência quando houver chamada pendente, sem competir com o planejamento.
3. Rever o uso de cartões vazios para que cada estado comunique prioridade diferente.
4. Validar contraste, tamanho de texto e safe areas no Android real.
5. Repetir a auditoria nas telas de Planejamento, Turma, BNCC, Arquivos, Relatórios e Mais.

## Limites da auditoria

Esta captura não comprova câmera, arquivos, notificações, botão voltar, rotação, desempenho ou acessibilidade de leitor de tela no Android. Esses pontos dependem de validação no dispositivo ou emulador.
