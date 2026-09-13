# Assistente Pedagógico — Especificação Completa de Telas V2

Este índice é a porta de entrada obrigatória para qualquer agente que implemente ou redesenhe uma tela do Assistente Pedagógico.

Ele complementa `FOUNDATIONS.md`, `COMPONENTS.md`, `SCREEN_PATTERNS_AND_FLOWS.md`, `IMPLEMENTATION_PLAYBOOK.md` e `VISUAL_QA_CHECKLIST.md` com especificações de tela em nível de implementação: posição dos blocos, comportamento, dados, estados, navegação, recursos nativos, acessibilidade, persistência e critérios de aceite.

## Ordem de autoridade

1. decisão explícita mais recente do usuário;
2. `docs/DESIGN_AUTHORITY.md`;
3. `docs/design-v2/`;
4. especificações funcionais/release/LGPD em `docs/`;
5. comportamento legado apenas quando ainda fizer sentido funcionalmente.

O código legado é referência funcional, não visual.

## Como usar cada especificação

Antes de implementar uma tela, o Codex deve:

1. localizar a tela neste índice;
2. ler o volume correspondente por inteiro;
3. localizar o código legado e os repositórios/serviços indicados;
4. separar comportamento que deve ser preservado de UI que pode ser substituída;
5. implementar usando primitives e componentes V2;
6. cobrir os estados obrigatórios;
7. executar os testes indicados;
8. anexar screenshots reais de Android/mobile ao PR.

## Volumes

### Volume 1 — Entrada, identidade e monetização
Arquivo: `SCREEN_SPEC_01_ENTRY_ACCOUNT_SUBSCRIPTION.md`

1. Splash e inicialização
2. Onboarding e apresentação do produto
3. Cadastro de conta
4. Login e recuperação de acesso
5. Configuração inicial do perfil docente
6. Criação da primeira turma
7. Personalização inicial do app
8. Escolha de plano
9. Paywall / assinatura
10. Confirmação de assinatura
11. Primeiro sucesso / entrada na Home

### Volume 2 — Home e rotina do dia
Arquivo: `SCREEN_SPEC_02_HOME_DAILY_WORK.md`

12. Home / visão do dia
13. Fazer chamada
14. Registrar observação
15. Compromissos e agenda
16. Atividade recente

### Volume 3 — Planejamento
Arquivo: `SCREEN_SPEC_03_PLANNING.md`

17. Planejamento — visão geral
18. Planejamento diário
19. Planejamento semanal
20. Planejamento mensal
21. Criar plano de aula
22. Editar plano de aula
23. Habilidades BNCC
24. Criar atividade

### Volume 4 — Turmas, alunos e acadêmico
Arquivo: `SCREEN_SPEC_04_CLASSES_STUDENTS_ACADEMIC.md`

25. Turmas — visão geral
26. Detalhe da turma
27. Lista de alunos
28. Perfil do aluno
29. Frequência
30. Registros pedagógicos
31. Histórico do aluno
32. Notas e avaliações

### Volume 5 — Arquivos, relatórios e hub Mais
Arquivo: `SCREEN_SPEC_05_FILES_REPORTS_MORE.md`

33. Arquivos — visão geral
34. Pastas
35. Arquivos recentes
36. Favoritos
37. Importar / capturar arquivo
38. Visualização de arquivo
39. Lixeira
40. Relatórios
41. Perfil profissional
42. Gerenciar turmas
43. Ferramentas de sala
44. Notificações
45. Mais / hub de ferramentas

### Volume 6 — Configurações, ciclo de vida e estados
Arquivo: `SCREEN_SPEC_06_SETTINGS_LIFECYCLE_SYSTEM_STATES.md`

46. Configurações
47. Aparência e acessibilidade
48. Privacidade e segurança
49. Backup e sincronização
50. Ajuda e suporte
51. Sobre o aplicativo
52. Gerenciar assinatura
53. Alterar plano
54. Cancelar assinatura
55. Estados de carregamento
56. Estados vazios
57. Estados de erro
58. Estados de sucesso
59. Offline e recuperação
60. Logout
61. Exclusão de conta
62. Confirmação final de exclusão

## Regras globais de layout

- Root tabs usam `BottomNavigation`; telas filhas não duplicam a bottom nav quando o fluxo pede foco total.
- `TopBar` deve preservar safe area e ter botão voltar apenas quando existe uma tela anterior real.
- Gutter horizontal: usar tokens V2; não inventar margens isoladas por tela.
- CTA primário deve ficar no fluxo natural; barra fixa inferior apenas quando a ação precisa permanecer disponível durante scroll longo.
- Não colocar todos os blocos dentro de cards.
- Listas densas usam rows e separadores; calendários usam superfície própria; formulários usam sections; telas narrativas podem usar ilustração.
- Touch target >= 48px.
- Estado de loading nunca substitui conteúdo por spinner infinito.
- Estado de erro deve oferecer recuperação quando possível.
- Ações destrutivas exigem confirmação proporcional ao impacto.

## Regras globais de dados

- Dados pedagógicos/alunos permanecem locais por padrão.
- Não enviar nomes, notas, frequência, observações, turmas ou conteúdo pedagógico a analytics.
- Reusar repositories/domain existentes antes de criar nova camada paralela.
- Migração de schema deve ser explícita e testada.
- O núcleo continua utilizável sem internet.
- Preços/compras vêm da loja/RevenueCat quando disponível; nunca hardcode comercial como verdade.

## Teste obrigatório de identidade

Uma tela falha no gate se estiver funcional, mas puder ser confundida com um template genérico de produtividade. O Codex deve demonstrar hierarquia, assinatura visual e adequação à rotina docente, além de screenshots reais.