---
name: assistente-pedagogico-rapid-ui
description: >
  Modo de produção visual rápida para o Assistente Pedagógico. Use quando houver
  screenshot/mockup aprovado ou uma tela V2 claramente especificada e o objetivo for
  chegar rapidamente a uma primeira versão visual de alta fidelidade antes de fazer
  integração profunda, refatoração arquitetural ou rollout para outras telas.
version: 1.0.0
language: pt-BR
---

# Assistente Pedagógico — Rapid UI Skill

Esta skill existe para reproduzir o que ferramentas visual-first fazem bem: **ver o alvo, construir cedo, renderizar cedo, comparar cedo e corrigir cedo**.

Ela não reduz qualidade, segurança ou integridade. Ela muda a ordem do trabalho para evitar passar horas auditando/refatorando antes de existir algo visualmente revisável.

> **Regra central: primeiro provar visualmente a tela certa; depois conectar e endurecer a implementação.**

---

## 1. Quando usar

Ative esta skill quando pelo menos uma destas condições existir:

- há screenshot/mockup aprovado;
- existe uma tela V2 bem especificada;
- a tarefa é reconstruir visualmente uma tela existente;
- o objetivo é validar identidade, composição ou componente;
- o usuário pediu velocidade e quer ver resultado visual rapidamente.

Use em conjunto com `$assistente-pedagogico-ui-screen-craft`.

---

## 2. O que esta skill muda

O fluxo tradicional `auditar tudo -> abstrair tudo -> integrar tudo -> finalmente renderizar` está proibido em tarefas visuais com target claro.

O fluxo passa a ser:

`TARGET -> PRIMEIRO RENDER -> COMPARAÇÃO -> REFINO VISUAL -> CONEXÃO REAL -> ESTADOS -> QA`

A primeira entrega deve ser uma tela visualmente reconhecível, não uma arquitetura invisível.

---

## 3. Contexto mínimo antes do primeiro render

Para uma tela com screenshot aprovado, antes do primeiro render leia apenas o conjunto mínimo necessário:

1. `docs/DESIGN_AUTHORITY.md`;
2. esta skill;
3. `$assistente-pedagogico-ui-screen-craft`;
4. a `SCREEN_SPEC_*` da tela, se disponível;
5. o screenshot/mockup aprovado;
6. os arquivos/repositories diretamente usados pela tela atual.

Documentação complementar continua obrigatória antes de merge/integração final quando aplicável, mas **não deve atrasar o primeiro render visual sem motivo**.

Segurança, privacidade, billing, storage e dados continuam imutáveis.

---

## 4. Screenshot aprovado = target

Quando o usuário fornecer ou aprovar uma imagem:

- trate como target visual principal;
- replique hierarquia, proporções, densidade, ritmo, superfícies e peso visual;
- preserve o DNA, mesmo quando o conteúdo real variar;
- não “reinterpretar” para uma estética preferida pelo agente;
- não converter candy/tactile UI em minimalismo corporativo;
- não converter composição rica em uma lista de rows por conveniência.

Não usar a imagem como background. Implementar com componentes reais.

---

## 5. Primeiro passo de código: uma vertical slice visual

Antes de refatoração ampla, construir uma única tela em estado representativo.

A primeira vertical slice pode usar **fixtures sintéticas isoladas apenas no preview/dev harness** se isso for necessário para validar composição rapidamente.

Regras das fixtures:

- nunca substituir fonte real em produção;
- nunca usar dados reais de aluno;
- usar nomes/dados fictícios;
- deixar claramente isolado do fluxo de produção;
- remover ou desconectar quando a tela for ligada aos repositories reais.

A preferência continua sendo usar dados reais já disponíveis se isso não atrasar a primeira renderização.

---

## 6. Não refatorar arquitetura antes da prova visual

Antes de a tela atingir o target, não gastar ciclos em:

- renomear dezenas de arquivos;
- criar design system completo do zero;
- migrar todos os componentes legados;
- refatorar repositories não relacionados;
- redesenhar outras telas;
- criar abstrações para casos hipotéticos;
- implementar todos os estados de uma vez.

Faça somente a infraestrutura mínima necessária para a tela ficar correta.

Depois que o padrão visual for aprovado, extraia primitives/componentes reutilizáveis.

> **Código duplicado temporário em uma prova isolada é menos perigoso que uma abstração errada espalhada por 30 telas.**

Antes do merge, duplicações relevantes devem ser consolidadas.

---

## 7. Ordem de produção de cada tela

### Passo 1 — Clone visual da composição

Implementar:

- shell;
- background;
- header;
- objeto dominante;
- superfícies principais;
- tipografia;
- ícones;
- bottom navigation se existir.

Sem obsessão por edge cases nesta etapa.

### Passo 2 — Screenshot imediato

Renderizar em 390 px primeiro.

Comparar lado a lado com o target.

Não seguir adiante se visualmente parece outro produto.

### Passo 3 — Corrigir as 5 maiores diferenças

Prioridade:

1. composição;
2. proporção;
3. hierarquia;
4. tipografia;
5. cor/superfície.

Só depois ajustar microspacing.

### Passo 4 — Conectar lógica real

Conectar:

- repositories;
- selectors;
- navigation;
- persistência;
- ações;
- offline;
- domain logic.

A conexão não pode destruir a composição aprovada.

### Passo 5 — Estados

Adicionar:

- loading;
- empty;
- error;
- offline;
- disabled;
- pressed;
- success quando aplicável.

### Passo 6 — Motion

Adicionar apenas motion definido pelo sistema:

- press feedback;
- tab/shared indicator;
- transições causais;
- microfeedback;
- Reduced Motion.

### Passo 7 — Responsive

Validar 360 / 390 / 430 px.

---

## 8. Uma tela por vez

Em modo rápido:

- não implementar 5–10 telas antes de feedback;
- terminar uma tela candidata;
- publicar screenshot;
- marcar `READY FOR DESIGN REVIEW — <TELA>`;
- só expandir depois de revisão.

Isso evita multiplicar um erro visual.

---

## 9. Composição primeiro, componentes depois

Ferramentas visual-first ficam bonitas porque priorizam a composição percebida.

O Codex deve fazer o mesmo:

- resolver a tela como experiência;
- então identificar padrões reais;
- então extrair componentes.

Não começar perguntando “qual componente existente eu consigo reutilizar?”.

Começar perguntando:

> “Qual composição reproduz melhor o target e a tarefa do professor?”

Depois decidir o que reutilizar.

---

## 10. Reuso seletivo, não inercial

Reusar legado somente quando ele não prejudicar o target.

Se `Card`, `IconTile`, `recovered.js`, `ScreenHeader` ou qualquer abstraction antiga impuser formato inadequado:

- preservar a lógica;
- desacoplar apresentação;
- criar a versão V2;
- conectar a mesma lógica;
- aposentar o visual antigo depois.

Não deformar o target para caber no legado.

---

## 11. Linguagem positiva obrigatória

A tela deve preservar:

- fundo azul-claro respirável;
- superfícies brancas/azul muito claro;
- azul vivo em foco/ações;
- navy forte;
- tipografia rounded/chunky;
- radius generoso;
- elementos táteis;
- ícones com presença;
- semantic colors apenas quando significativas;
- profundidade por borda/depth controlada;
- variação de composição;
- aparência Friendly Professional + Candy UI.

Não aceitar como substituto:

- fintech/editorial austero;
- dashboard SaaS;
- Material default;
- Tailwind starter;
- rows corporativas infinitas;
- uppercase em todo heading;
- azul chapado ocupando metade da tela sem necessidade.

---

## 12. Regra de fidelidade

Com screenshot target, a primeira aprovação visual exige aproximadamente:

- mesma estrutura perceptiva;
- mesmo balanço entre branco/azul-claro/azul vivo;
- mesma força de tipografia;
- mesma escala de radius/surfaces;
- mesma densidade;
- mesma prioridade de ação;
- mesma sensação de produto.

Não é necessário copiar pixel por pixel. É necessário parecer **a mesma família e a mesma direção**, sem explicações.

---

## 13. Visual diff humano obrigatório

Após cada render:

1. target à esquerda;
2. implementação à direita;
3. olhar por 3 segundos;
4. responder:
   - qual chama mais atenção primeiro?
   - o peso visual é semelhante?
   - há superfícies faltando?
   - a tela ficou mais fria/corporativa?
   - há texto pequeno demais?
   - há azul demais?
   - há whitespace demais?
5. corrigir antes de integrar mais lógica.

---

## 14. Limite de exploração

Não criar três direções diferentes quando já existe uma referência aprovada.

Com target aprovado:

- implementar a direção;
- não abrir nova rodada conceitual;
- não inventar alternativa estética;
- não pedir confirmação para detalhes que o target já resolve.

Perguntar apenas quando houver conflito funcional, segurança, privacidade, dados, billing ou decisão realmente não resolvida.

---

## 15. Regra de velocidade

Para cada ciclo visual:

- produzir primeiro render antes de qualquer refatoração ampla;
- limitar a rodada a uma tela;
- limitar mudanças às diferenças visuais de maior impacto;
- evitar documentação adicional durante a rodada, salvo conflito real;
- não redesenhar áreas não solicitadas;
- não esperar “arquitetura perfeita” para mostrar resultado.

A revisão visual deve acontecer **durante** a construção, não no fim de uma grande implementação.

---

## 16. O que não pode ser acelerado

Nunca usar esta skill para pular:

- segurança;
- LGPD;
- integridade de dados;
- migração;
- billing/entitlement;
- acessibilidade;
- Reduced Motion;
- funcionamento offline;
- confirmação real de operações destrutivas;
- testes essenciais antes do merge.

Velocidade vale para **ciclo visual**, não para atalhos perigosos.

---

## 17. Critério de saída da fase visual

A tela pode sair da fase de prova quando:

- visualmente pertence à mesma família do target;
- a composição está aprovada;
- os principais controles parecem corretos;
- 390 px está convincente;
- não há padrão genérico dominante.

Então conectar/harden.

---

## 18. Critério final

Antes de marcar pronta:

- 360 / 390 / 430;
- lógica real conectada;
- states relevantes;
- offline quando aplicável;
- accessibility;
- motion/reduced motion;
- build/testes;
- screenshot final;
- gravação se motion relevante.

Publicar:

> **READY FOR DESIGN REVIEW — <NOME DA TELA>**

Não declarar aprovação por conta própria.

---

## 19. Mantra operacional

> **Visual primeiro. Render cedo. Compare cedo. Corrija cedo. Integre depois.**

> **Não faça arquitetura invisível por horas antes de mostrar a tela.**

> **Não tente melhorar um target aprovado; primeiro prove que consegue reproduzi-lo.**
