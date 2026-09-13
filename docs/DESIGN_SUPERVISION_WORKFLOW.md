# Fluxo de Supervisão de Design — Assistente Pedagógico

Este documento define como Codex/Astra deve trabalhar em mudanças visuais. O objetivo é impedir que o aplicativo avance com telas apenas "funcionais", porém visualmente inconsistentes, genéricas ou fora da identidade definida.

## Regra principal

Nenhum fluxo visual deve ser redesenhado em massa. Trabalhar sempre em um fluxo/tela por vez, gerar evidência visual e aguardar revisão antes de avançar para a próxima área.

## Ciclo obrigatório

1. Ler `AGENTS.md`, especificações de produto e este arquivo.
2. Implementar apenas o fluxo/tela definido na issue atual.
3. Rodar o app em viewport Android realista ou dispositivo/emulador.
4. Capturar screenshots do estado final e, quando relevante, estados intermediários/erro/empty/loading.
5. Anexar as screenshots diretamente no PR ou em comentário do PR para permitir revisão visual.
6. Explicar quais referências de design foram usadas e quais decisões foram tomadas.
7. Não iniciar outra tela importante até a revisão visual ser concluída.

## Critérios visuais obrigatórios

- Hierarquia clara: uma ação principal por estado.
- Tipografia consistente e legível.
- Espaçamento intencional e ritmo vertical coerente.
- Não usar cards para absolutamente tudo.
- Evitar aparência genérica de UI gerada por IA.
- Não usar gradiente roxo/azul genérico, glassmorphism gratuito, bento decorativo, sombras excessivas ou ícone dentro de círculo em toda parte.
- Manter identidade educacional profissional, amigável, tátil e moderna.
- Não usar mascotes.
- Ilustrações humanas, quando realmente úteis, podem seguir linguagem Soft 3D Educational Character Illustration.
- Telas utilitárias devem priorizar função e clareza sobre decoração.
- Componentes recorrentes devem obedecer o Design System.
- Estados pressed/focus/disabled/loading/error devem ser pensados quando aplicável.
- Respeitar acessibilidade de contraste e alvo de toque.

## Evidência obrigatória para revisão

Todo PR visual precisa conter:

- screenshot antes;
- screenshot depois;
- screenshots dos estados relevantes;
- resolução/viewport usado;
- resumo do que mudou;
- referências usadas;
- limitações ou problemas conhecidos;
- confirmação de build/testes.

Para revisão pelo ChatGPT, preferir anexar as imagens diretamente no corpo/comentário do PR no GitHub, em vez de apenas mencionar caminhos locais.

## Gate de aprovação

Uma tela não está aprovada porque:

- compila;
- ficou parecida com outra tela;
- tem os componentes corretos;
- "está melhor que antes".

Ela só avança quando função, hierarquia, acabamento visual, consistência e experiência estiverem satisfatórios.

## Ordem recomendada de revisão visual

1. Splash / bootstrap / estados de carregamento
2. Onboarding e primeiro sucesso
3. Home
4. Navegação principal
5. Turmas
6. Perfil do aluno
7. Planejamento
8. Chamada
9. Notas / avaliações
10. BNCC
11. Arquivos
12. Relatórios
13. Configurações
14. Monetização / paywall
15. Empty, erro, offline e estados de sistema

## Regra de iteração

Se a revisão pedir mudanças, o mesmo PR deve ser atualizado e novas screenshots devem ser anexadas. Não abrir um novo PR só para pequenos refinamentos da mesma tela, salvo necessidade técnica clara.
