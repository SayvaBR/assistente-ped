# UI Lab — Desenvolvimento visual rápido

## Objetivo

Criar um ambiente interno de desenvolvimento que reduza drasticamente o tempo entre `editar código` e `ver/revisar resultado`.

Rota de desenvolvimento sugerida:

`/__lab`

A rota nunca deve ser exposta como feature de produção.

## Problema resolvido

Hoje, para validar uma tela, o agente pode precisar atravessar Splash, onboarding, setup, navegação e dados antes de chegar ao estado desejado. Isso torna refinamento visual lento.

O UI Lab deve permitir abrir diretamente uma superfície V2 com fixtures sintéticas isoladas, trocar estado e viewport e gerar evidência rapidamente.

## MVP obrigatório

### Navegação do Lab

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
- Paywall quando a frente Growth for liberada.

### States mínimos por tela

Quando aplicável:

- default;
- loading;
- empty;
- populated;
- error;
- offline;
- success;
- disabled.

Não é obrigatório que toda tela implemente todos os estados.

### Viewports rápidos

- 360;
- 390 (default);
- 430.

Não simular device bezel. O objetivo é avaliar a superfície real.

## Fixtures

Fixtures devem ficar separadas da produção, por exemplo:

`src/v2/lab/fixtures/`

Regras:

- apenas dados sintéticos;
- nenhum dado real de professor/aluno;
- nenhum repository de produção deve ser sobrescrito;
- lab deve poder montar view-models diretamente;
- produção não pode depender do Lab.

## Arquitetura sugerida

```text
src/v2/lab/
  UiLab.tsx
  labRegistry.ts
  fixtures/
  states/
  ui-lab.css
```

Cada screen registra um adapter simples:

```ts
{
  id: 'onboarding-entry',
  render: (scenario) => <OnboardingEntryV2 {...scenario.props} />,
  scenarios: [...]
}
```

Evitar framework complexo. O Lab existe para economizar tempo, não para virar outro produto.

## Entrada da rota

Preferir flag de desenvolvimento:

- `import.meta.env.DEV`;
- ou query/route guard equivalente.

Em build de produção, a rota deve ser removida, inacessível ou retornar a aplicação normal.

## Screenshot fast loop

Adicionar um pequeno script Playwright para abrir Lab diretamente e capturar a tela atual.

Meta:

```text
edit -> HMR -> /__lab -> screenshot -> compare -> edit
```

Comando desejado no package.json após implementação:

```text
pnpm ui:lab
pnpm ui:shot onboarding-entry
```

O nome final pode mudar se houver conflito com scripts existentes.

## Regras de velocidade

Durante composição visual:

- não inicializar Capacitor;
- não abrir Android;
- não executar toda a aplicação se a tela puder ser isolada;
- manter Vite rodando;
- usar 390 px como viewport default;
- usar screenshot automatizado somente quando necessário para comparação;
- não atualizar documentação a cada microajuste.

## Guardrails

O Lab não pode:

- salvar dados reais;
- executar compra real;
- disparar notificações reais;
- pedir permissões reais;
- alterar backups;
- mascarar regressões da integração real.

Depois de uma composição aprovada no Lab, a tela ainda precisa passar pelo fluxo real antes do PR final.

## Critério de pronto do MVP

- `/__lab` abre em dev sem atravessar onboarding;
- Onboarding Entry V2 pode ser visualizado diretamente;
- viewport 360/390/430 funciona;
- pelo menos default + error/loading ou outro estado relevante é selecionável;
- HMR funciona sem reiniciar o servidor;
- produção não expõe o Lab;
- existe pelo menos um comando/script de screenshot direto.

## Prioridade

P0 Dev Experience, porque cada tela V2 seguinte se beneficia do ganho de velocidade.
