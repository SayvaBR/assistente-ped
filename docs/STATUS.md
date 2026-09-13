# Status operacional

Atualizado em 13/09/2026.

## Frente ativa — P0 Visual #5 / PR #8

A única frente visual ativa é a **Home V2 em clean room** no PR #8 (`codex/5-v2-clean-room`). O PR permanece em draft e não deve ser mesclado automaticamente.

### Progresso confirmado

- V2 visual isolada em `src/v2/`, sem usar a arquitetura visual V1 como autoridade;
- fluxo Visual Builder formalizado: `HIPÓTESE -> EXPERIMENTO -> OBSERVAÇÃO -> CORREÇÃO`;
- regra Android adaptativa alinhada entre `AGENTS.md` e `docs/DESIGN_SUPERVISION_WORKFLOW.md`;
- primeiro render real da Home V2 produzido no viewport-âncora de 390 px e anexado ao PR;
- implementação inicial inclui saudação, aula em foco, ações contextuais, agenda em timeline e bottom navigation;
- `pnpm run check:v2-boundary`, `pnpm build` e `pnpm run test:v2-responsive` foram aprovados após a integração;
- `test:v2-responsive` exercita 320 / 360 / 390 / 412 / 432 / 480 / 600 px e verifica overflow/truncamento básico.
- Home principal já recebe perfil, turma, planos do dia, frequência e agenda local por adapter V2; o Visual Lab continua usando apenas fixture sintética para evidência pública.
- O avatar abre o perfil, as linhas da agenda são controles acessíveis e o CI do PR foi publicado.

### Bloqueios do gate visual

A Home V2 **ainda não está pronta para aprovação**.

1. O head atual do PR #8 não possui CI/status publicado no GitHub e o PR continua `mergeable: false`.
2. Existe apenas o primeiro render anexado; ainda falta a sequência exigida de comparação explícita com o target/baseline, lista das 3–5 maiores diferenças, correção e nova screenshot após o refinamento.
3. A Home já está conectada aos dados locais do controlador/repositórios existentes, mas a persistência das ações iniciadas pela Home e a matriz completa de estados ainda precisam de QA específico.
4. O teste responsivo atual não cobre crescimento de texto 115/130/150%, embora isso seja requisito de gate. Também não verifica automaticamente touch targets >= 48 px.
5. A agenda renderiza chevrons em rows não interativas; se esses itens representam navegação, devem ser controles acessíveis reais. O botão de avatar também precisa ter ação real quando sair do harness visual.
6. A tipografia da bottom navigation chega a ~10,7 px e ~9,8 px abaixo de 360 px; precisa ser revista junto com o teste de crescimento de texto para não sacrificar legibilidade.
7. A Issue #5 exige a fundação aplicada em mais de um contexto real antes de ser considerada concluída; não avançar P1/P2 nem Growth #6 enquanto o gate P0 visual não fechar.

## Próxima rodada obrigatória do Codex

Sem expandir para outra tela:

1. comparar o primeiro render da Home V2 lado a lado com o target aprovado;
2. registrar as 3–5 diferenças perceptivas de maior impacto;
3. aplicar um experimento visual pequeno para a diferença principal;
4. anexar nova screenshot real ao PR;
5. repetir o ciclo enquanto houver diferenças grandes;
6. adicionar cobertura de crescimento de texto e validar touch targets/safe areas;
7. conectar dados e estados reais sem destruir a composição aprovada;
8. publicar CI/status antes de `READY FOR DESIGN REVIEW — HOME V2`.

## Prioridade e dependências

- **P0 técnico / segurança / privacidade / integridade de dados** continuam acima de refinamento visual.
- **P0 Visual #5** é o gate visual atual.
- **P0 Growth #6** permanece bloqueado até a Fundação Visual V2 estar aprovada e a base de billing estar estável.
- Splash/Onboarding e demais fluxos não devem abrir uma frente visual paralela enquanto a Home V2 estiver no gate atual.

## Baseline funcional preservado

A branch base já contém React + TypeScript + Vite + Capacitor Android, persistência/local-first, BNCC, backup, billing/RevenueCat e demais contratos funcionais. Esses motores podem ser reutilizados pela V2, mas o legado não é baseline visual.

Guardrails que permanecem imutáveis:

- LGPD e privacidade;
- nenhum dado pedagógico/aluno em analytics;
- integridade e migração de dados;
- funcionamento offline do núcleo;
- billing/entitlements reais;
- backup/restauração/exportação/exclusão;
- acessibilidade e Reduced Motion;
- nenhuma credencial, segredo ou dado real usado em evidência visual.

## Release

Ainda não há release comercial pronta. Não gerar expectativa de produção até existirem, no mínimo, assinatura de release, billing real validado, revisão de privacidade/jurídica, QA Android final e gates P0 concluídos.
