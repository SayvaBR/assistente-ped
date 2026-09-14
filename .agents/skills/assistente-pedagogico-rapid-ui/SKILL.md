---
name: assistente-pedagogico-rapid-ui
description: >
  Modo visual-first acelerado para o Assistente Pedagógico. Use quando houver target
  claro e o objetivo for chegar rapidamente a uma composição convincente, com HMR,
  validação proporcional ao risco e trabalho paralelo em worktrees/agentes.
version: 2.0.0
language: pt-BR
---

# Assistente Pedagógico — Rapid UI Skill v2

## Regra central

> **Render cedo. Corrija cedo. Paralelize espera. Endureça no checkpoint.**

Esta skill não reduz qualidade. Ela reduz tempo morto e evita validação pesada antes de existir algo digno de revisão.

## Contexto mínimo

Antes do primeiro render, leia somente:

1. `docs/WORKING_CONTEXT.md`;
2. `docs/DESIGN_AUTHORITY.md`;
3. screen spec/target atual;
4. arquivos diretamente usados pela tela.

Não abrir dezenas de docs por rotina.

## Loop visual

```text
target
-> composição mínima
-> render 390px
-> comparação
-> corrigir 3–5 maiores diferenças
-> repetir via HMR
-> candidata
-> 360/430 + estados
-> integração final
-> testes relevantes
-> design review
```

## Durante o loop

- manter `pnpm dev` rodando;
- usar `pnpm run check:fast`;
- usar teste diretamente relacionado quando necessário;
- não rodar Android, E2E completo ou documentação extensa após cada ajuste;
- não gerar 360/430 enquanto 390 ainda estiver estruturalmente errado.

## Primeira composição

Pode usar fixtures sintéticas isoladas no preview/dev harness para validar layout rapidamente.

Nunca usar dados reais de aluno. Nunca deixar fixture substituir fonte de produção.

A primeira prova deve resolver:

- shell;
- objeto dominante;
- hierarquia;
- superfícies;
- tipografia;
- ícones;
- ação principal.

Edge cases e integração profunda entram depois que a composição estiver boa.

## Paralelismo

A antiga regra “uma tela por vez para o projeto inteiro” está revogada.

Pode haver vários agentes/worktrees em paralelo quando não editarem os mesmos arquivos compartilhados.

Exemplos:

- agente A: composição da tela;
- agente B: adapters/dados;
- agente C: QA/a11y/testes;
- agente D: pesquisa/assets/microcopy;
- agente E: Android nativo.

Somente um owner por rodada para:

- tokens globais;
- shell/navegação;
- primitives V2 centrais;
- `package.json`;
- configs compartilhadas.

## Componentes

Composição primeiro, primitives depois.

Não criar Design System completo antes de provar telas reais. Extrair somente padrões que se repetiram e foram aprovados.

Duplicação temporária numa prova isolada é aceitável; duplicação relevante deve ser consolidada antes do merge.

## Target aprovado

Screenshot/mockup aprovado é target. Reproduzir a mesma família perceptiva: hierarquia, proporção, densidade, tipografia, cor, superfícies, radius, profundidade e personalidade.

Não reinterpretar automaticamente como Material, SaaS, fintech, Tailwind starter ou minimalismo corporativo.

## Linguagem

**Friendly Professional + Candy UI + Tactile + Educational + Motion-led**.

Azul-claro + branco + azul vivo + navy. Sem mascote/coruja. Ilustração humana somente quando realmente útil.

## Candidate gate

Quando 390 estiver convincente:

- validar 360/390/430;
- adicionar loading/empty/error/offline quando aplicável;
- conectar dados reais;
- validar acessibilidade/motion/reduced motion;
- rodar `pnpm run check:candidate`;
- rodar E2E diretamente relacionado.

## Deep path

Se tocar storage, migração, billing, backup/restore, criptografia, permissões, BNCC, regras pedagógicas, segurança ou LGPD, sair do fast path e usar validação profunda.

## Evidência

Durante loop: mínima.

Na candidata: screenshot principal + diferenças conhecidas + testes relevantes.

No PR: consolidar evidência final uma vez.

## Saída

Ao chegar em candidata real:

`READY FOR DESIGN REVIEW — <TELA>`

Isso bloqueia apenas expansão dependente daquela decisão visual. Outras trilhas independentes podem continuar.
