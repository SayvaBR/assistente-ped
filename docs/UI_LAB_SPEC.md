# UI Lab — Desenvolvimento visual rápido

## Objetivo

Reduzir drasticamente o tempo entre editar código e ver/revisar resultado.

Rota sugerida em desenvolvimento:

`/__lab`

Nunca expor como feature de produção.

## Problema

Hoje o agente pode precisar atravessar Splash, onboarding, setup e navegação para validar uma tela. O Lab deve abrir a superfície V2 diretamente com fixtures sintéticas.

## MVP

Seletores mínimos:

- Screen;
- State;
- Viewport;
- Text scale;
- Reduced Motion.

### Screens iniciais

- Onboarding Entry V2;
- Home V2;
- Frequência;
- Planejamento;
- Paywall somente quando Growth estiver liberado.

### Viewports

- 360;
- 390 default;
- 430.

Sem bezel de aparelho.

### Fixtures

Separadas da produção, por exemplo:

`src/v2/lab/fixtures/`

Regras:

- apenas dados sintéticos;
- nenhum dado real de professor/aluno;
- nenhum repository de produção sobrescrito;
- Lab pode montar view-models diretamente;
- produção não depende do Lab.

## Arquitetura mínima sugerida

```text
src/v2/lab/
  UiLab.tsx
  labRegistry.ts
  fixtures/
  ui-lab.css
```

Evitar framework complexo.

## Guard de rota

Preferir `import.meta.env.DEV` ou equivalente.

Build de produção deve tornar a rota inacessível/removida.

## Fast screenshot loop

Adicionar script Playwright simples para abrir o Lab diretamente e capturar a superfície.

Meta:

`edit -> HMR -> /__lab -> screenshot -> compare -> edit`

Comandos desejados, se práticos:

- `pnpm ui:lab`
- `pnpm ui:shot onboarding-entry`

## Regras de velocidade

Durante composição:

- não inicializar Capacitor;
- não abrir Android;
- não executar toda a aplicação se a tela puder ser isolada;
- manter Vite/HMR rodando;
- 390px como default;
- não atualizar documentação a cada microajuste.

## Guardrails

O Lab não pode:

- salvar dados reais;
- executar compra real;
- disparar notificações;
- pedir permissões reais;
- alterar backups;
- esconder regressões da integração real.

Depois de aprovada no Lab, a tela ainda passa pelo fluxo real antes do PR final.

## Pronto do MVP

- `/__lab` abre em dev sem atravessar onboarding;
- Onboarding Entry V2 abre diretamente;
- 360/390/430 funcionam;
- default + pelo menos um estado secundário;
- HMR funciona;
- produção não expõe Lab;
- existe screenshot direto simples.

Prioridade: P0 DevEx, mas não bloquear a primeira candidata visual esperando o Lab ficar perfeito.
