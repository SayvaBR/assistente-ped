---
name: assistente-pedagogico-android-adaptive-ui
description: >
  Use em toda implementação ou revisão de UI do Assistente Pedagógico para garantir
  adaptação real a diferentes Androids sem transformar a construção de cada tela em
  uma bateria manual de múltiplos tamanhos.
---

# Assistente Pedagógico — Android Adaptive UI

Use esta skill junto com as skills visual-first do projeto.

Autoridade complementar obrigatória:

- `docs/ANDROID_ADAPTIVE_DEVELOPMENT_CADENCE.md`;
- `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md`;
- `docs/ANDROID_REAL_DEVICE_QA.md`.

## Regra principal

Uma screenshot tem uma largura. O aplicativo não.

A UI deve ser construída de forma fluida para Androids diferentes, mas o Codex **não deve testar manualmente sete larguras durante cada microiteração**.

Durante desenvolvimento visual normal use **412 CSS px** como viewport de trabalho padrão em telefone Android, salvo quando um target aprovado precisar de outra largura para comparação direta.

412 é apenas uma régua de trabalho, não breakpoint obrigatório nem largura fixa do app.

## Loop de desenvolvimento

```text
HIPÓTESE
-> IMPLEMENTAÇÃO
-> RENDER EM 412px
-> SCREENSHOT
-> OBSERVAÇÃO
-> CORREÇÃO
-> REPETIR
```

Foco do loop:

- qualidade visual;
- composição;
- hierarquia;
- fluxo real;
- persistência;
- estados;
- acessibilidade;
- ausência de problemas responsivos óbvios.

Não recapturar manualmente 320/360/390/412/432/480/600 a cada mudança.

## Responsividade vem da estrutura

Preferir:

- flex/grid;
- `minmax()`;
- `flex-wrap`;
- largura relativa;
- altura automática;
- `min-width: 0`;
- `clamp()` com moderação;
- container/media queries para mudanças estruturais reais;
- safe areas;
- componentes que reorganizam conteúdo quando falta espaço.

Evitar:

- root com largura fixa;
- heights rígidos para copy;
- CSS específico para cada screenshot;
- breakpoints por modelo de aparelho;
- posicionamento absoluto de conteúdo principal.

A regra mental é:

> **o componente deve se adaptar ao espaço disponível; não criar uma versão para cada aparelho.**

## Copy essencial nunca é sacrificada

Não use `text-overflow: ellipsis`, `line-clamp`, `white-space: nowrap`, `overflow: hidden` ou altura fixa para esconder:

- título de tela;
- título de aula/plano;
- CTA;
- label de formulário;
- item principal de navegação;
- status operacional;
- erro/sucesso importante;
- instrução necessária;
- identificação principal de aluno/professor quando necessária para a ação.

Para copy humana em PT-BR, o padrão é:

```css
word-break: normal;
overflow-wrap: normal;
white-space: normal;
```

`overflow-wrap: anywhere` não deve ser usado em labels, títulos, CTAs, status ou frases naturais.

Falhas explícitas:

- `Presentes` -> `Present` + `es`;
- `Pendentes` -> `Pendent` + `es`;
- botão com palavra cortada;
- fonte reduzida até ficar pequena demais só para caber.

Se não couber, mude a composição.

## Quando falta espaço

Preferir, conforme o caso:

1. wrap entre palavras;
2. altura automática;
3. reduzir gaps/padding moderadamente;
4. empilhar ações;
5. reduzir colunas;
6. mover metadata secundária;
7. mudar a composição mantendo prioridade visual.

Nunca esconder ação essencial ou criar scroll horizontal para salvar um layout rígido.

## Testes multi-device: checkpoint, não ritual

A matriz responsiva continua obrigatória no produto, mas deve ser executada principalmente:

- quando a tela já estiver visualmente convincente;
- antes de `PRODUCTION GATE READY`;
- quando houver mudança estrutural relevante;
- no CI;
- antes de release;
- quando aparecer bug responsivo real.

O teste automatizado pode cobrir múltiplas larguras sem forçar o Codex a revisar manualmente cada screenshot em toda iteração.

Durante microajuste visual, use o viewport de trabalho e continue construindo.

## Texto ampliado

Não precisa testar todos os níveis a cada alteração visual.

No hardening das superfícies críticas, validar crescimento equivalente a pelo menos:

- 100%;
- 130%;
- 150%;

200% quando viável em fluxos críticos.

O objetivo é preservar leitura, ações, palavras completas e ausência de overflow.

## POCO X7 Pro

O POCO X7 Pro é aparelho físico de referência de QA, não alvo exclusivo.

Não instalar APK a cada ajuste pequeno.

Usar Android real em marcos importantes e antes do Gate B/release.

Se não houver acesso físico, registrar:

`REAL DEVICE QA PENDING — POCO X7 PRO`

## Gate A

Para direção visual, exigir:

- tela convincente no viewport de trabalho/target;
- sem falha responsiva óbvia;
- sem copy essencial cortada;
- sem dependência explícita de largura fixa;
- fluxo principal coerente.

Não exigir matriz manual completa para liberar a próxima tela visual.

## Gate B

Para produção, aí sim validar:

- testes responsivos automatizados;
- faixas de largura representativas;
- texto ampliado;
- safe areas;
- teclado;
- Android real quando disponível;
- ausência de overflow e truncamento.

## Critério de falha

A tela falha se:

- copy essencial estiver cortada;
- palavra humana estiver quebrada artificialmente no meio;
- ação desaparecer por falta de espaço;
- houver scroll horizontal acidental;
- funcionar apenas em uma largura;
- depender de CSS especial para screenshots específicas;
- texto ampliado tornar o fluxo impossível;
- safe area/teclado cobrir interação essencial.

## Regra final

> **Desenvolva rápido em um viewport Android representativo. Implemente fluido. Valide amplo em checkpoints.**

> **O aplicativo se adapta à tela — não redesenhamos o aplicativo para cada tela.**