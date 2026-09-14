---
name: assistente-pedagogico-rapid-ui
description: >
  Modo visual-builder para o Assistente Pedagógico. Use sempre que houver trabalho de UI.
  O agente deve operar em ciclos curtos de hipótese -> experimento -> observação -> correção,
  renderizando a interface real cedo e usando screenshots como feedback de desenvolvimento.
version: 1.1.0
language: pt-BR
---

# Assistente Pedagógico — Rapid UI / Visual Builder

Esta skill existe para fazer o Codex trabalhar como um **builder visual**, e não como um agente que escreve código por longos períodos antes de olhar o resultado.

> **Loop central obrigatório:**
>
> `HIPÓTESE -> EXPERIMENTO -> OBSERVAÇÃO -> CORREÇÃO -> NOVA HIPÓTESE`

O objetivo é reduzir drasticamente o tempo entre uma decisão visual e a evidência de que ela funcionou ou não.

---

## 1. Regra principal

Para UI, código não é evidência suficiente.

Toda mudança visual relevante deve entrar rapidamente no app/preview real e produzir evidência observável.

O fluxo normal é:

```text
TARGET / PROBLEMA VISUAL
-> formular uma hipótese concreta
-> alterar somente o necessário para testá-la
-> renderizar a superfície real
-> capturar screenshot
-> comparar com o target/estado anterior
-> escrever as 3–5 diferenças mais importantes
-> corrigir a maior diferença
-> repetir
```

Não passar dezenas de minutos acumulando mudanças visuais não observadas.

---

## 2. O que é uma hipótese visual válida

Hipótese deve ser pequena, falsificável e ligada ao que se vê.

Boas hipóteses:

- “O hero está pesado porque ocupa altura demais; reduzir sua proporção deve aproximar o balanço do target.”
- “A tela parece corporativa porque faltam superfícies brancas táteis entre fundo e ações.”
- “A hierarquia está fraca porque título e metadata têm contraste tipográfico semelhante.”
- “Em 320 px o CTA quebra de forma ruim; permitir wrap e empilhar ações deve preservar a copy.”

Hipóteses ruins:

- “Vou refatorar o design system inteiro.”
- “Vou criar primitives para todas as telas.”
- “Acho que isso ficará melhor.”

A hipótese deve dizer **o que está errado, por que parece errado e qual mudança queremos observar**.

---

## 3. Experimento

O experimento deve ser o menor conjunto de alterações capaz de testar a hipótese.

Durante a fase visual:

- prefira editar a tela/componente diretamente afetado;
- evite refatoração ampla;
- não migre outras telas;
- não crie abstrações especulativas;
- fixtures sintéticas são permitidas somente no preview/dev harness para validar composição;
- dados reais de professor/aluno nunca entram em fixtures ou screenshots públicas.

Se uma hipótese puder ser testada mudando 30 linhas, não altere 20 arquivos.

---

## 4. Observação é obrigatória

Depois do experimento, **renderize e olhe**.

A observação deve responder, no mínimo:

1. Qual é o primeiro elemento que chama atenção?
2. A composição está mais perto ou mais longe do target?
3. O balanço de branco / azul-claro / azul vivo está correto?
4. Tipografia, radius, profundidade e iconografia pertencem à mesma família?
5. Existe algo quebrado em responsividade, copy ou acessibilidade?

Não continue codando baseado apenas em memória do screenshot.

---

## 5. Correção

Corrija primeiro a diferença de maior impacto perceptivo.

Prioridade padrão:

1. composição;
2. proporção;
3. hierarquia;
4. tipografia;
5. cor e superfícies;
6. iconografia;
7. spacing;
8. microdetalhes;
9. motion.

Se a composição estiver errada, microspacing não salva a tela.

---

## 6. Cadência do loop

Durante iteração visual ativa, o objetivo é obter uma nova observação visual aproximadamente a cada **5–10 minutos quando o ambiente permitir**.

Isso não significa fazer screenshot inútil a cada pequena alteração. Significa não ficar longos períodos programando UI sem verificar o resultado.

Um ciclo pode ser:

```text
09:00 hipótese
09:03 implementação
09:05 render + screenshot
09:06 observação
09:08 correção
09:10 nova screenshot
```

Se build/emulador demorar mais, preservar a lógica do ciclo, não o cronômetro literal.

---

## 7. Target aprovado

Screenshot/mockup aprovado é **target visual**, não inspiração vaga.

Reproduzir com alta fidelidade:

- hierarquia;
- proporções;
- densidade;
- ritmo;
- balanço de cores;
- superfícies;
- radius;
- tipografia;
- escala de ícones;
- profundidade;
- sensação tátil;
- personalidade.

Não usar a screenshot como background. Implementar interface real.

Não reinterpretar o target como fintech, dashboard SaaS, Material default, minimalismo editorial ou Tailwind starter.

---

## 8. Viewport-âncora não é layout fixo

Quando o target tiver uma largura conhecida, use um **viewport-âncora** para comparação lado a lado. Se o target estiver em torno de 390 px, 390 px é apenas a régua inicial.

> **Uma screenshot tem uma largura. O aplicativo não.**

Depois que a composição estiver convincente no viewport-âncora, validar a matriz Android definida em `$assistente-pedagogico-android-adaptive-ui`.

Nunca:

- fixar root em 390 px;
- cortar copy essencial;
- usar ellipsis/line-clamp em título/CTA principal;
- esconder funcionalidade porque a tela estreitou.

---

## 9. Uma tela por vez

Enquanto uma tela não estiver visualmente aprovada:

- não expandir para outra área;
- não fazer rollout em massa;
- não criar 10 telas usando um padrão ainda não provado.

O padrão nasce de telas aprovadas, não de abstração antecipada.

---

## 10. Primeiro render antes da arquitetura

Antes do primeiro render convincente, evitar:

- Design System completo;
- renomear dezenas de arquivos;
- refatorar repositories não relacionados;
- migrar todos os componentes legados;
- implementar todos os edge cases;
- auditoria estética do app inteiro.

Faça a infraestrutura mínima para provar a tela.

Depois da aprovação visual:

1. extrair primitives realmente repetidas;
2. tokenizar;
3. conectar repositories reais;
4. implementar estados;
5. endurecer acessibilidade/responsividade;
6. integrar motion;
7. executar QA.

---

## 11. Clean room V2

Toda nova UI V2 nasce em `src/v2/`.

Pode reutilizar lógica, dados, repositories, domínio, storage, BNCC, billing e adapters nativos.

Não usar como autoridade visual:

- `src/screens/**` V1;
- `src/components/**` V1;
- `src/core/recovered.js` para composição/UI;
- CSS/tokens V1;
- `Card`, `IconTile` ou equivalentes legados.

Preservar os motores; reconstruir a carroceria.

---

## 12. Linguagem positiva

A tela deve parecer:

> **Friendly Professional + Candy UI + Tactile + Educational + Motion-led**

Preservar:

- fundo azul-claro respirável;
- superfícies majoritariamente brancas;
- azul vivo para foco/ação;
- navy forte;
- tipografia rounded/chunky;
- radius generoso;
- profundidade tátil controlada;
- ícones chunky/rounded;
- densidade operacional adequada;
- composição variada.

Anti-card não significa anti-surface.
Profissional não significa corporativo.
Playful não significa infantil.

---

## 13. Loop de comparação

A cada screenshot relevante:

```text
TARGET | IMPLEMENTAÇÃO
```

Olhar por poucos segundos e registrar as maiores diferenças perceptivas.

Não usar frases como “parece bom” sem critério.

Use observações concretas, por exemplo:

- hero 20% alto demais;
- título sem força;
- excesso de azul;
- falta superfície branca;
- bottom nav muito genérica;
- ícones pequenos;
- spacing vertical apertado;
- CTA parece botão web, não tátil.

Cada observação deve alimentar a próxima hipótese.

---

## 14. Responsividade é outro experimento

Depois de a direção visual estar correta, rode hipóteses de adaptação:

- 320/360: o que precisa empilhar?
- 390: a fidelidade continua correta?
- 412/432/480: a tela fica esticada ou ganha espaço de forma elegante?
- texto 115/130/150%: continua utilizável?
- safe areas: nada fica coberto?

Responsividade não é encolher a screenshot. É preservar hierarquia e função em diferentes restrições.

---

## 15. O que nunca pode ser acelerado

O loop visual não autoriza atalhos em:

- segurança;
- LGPD;
- integridade/migração de dados;
- billing/entitlement;
- storage/backup;
- funcionamento offline;
- acessibilidade;
- Reduced Motion;
- operações destrutivas;
- testes essenciais antes de merge.

---

## 16. Critério de saída visual

Uma tela pode sair da fase de prova quando:

- pertence claramente à mesma família do target;
- composição e hierarquia estão convincentes;
- não há padrão genérico dominante;
- viewport-âncora está forte;
- matriz Android não quebra copy/fluxo;
- screenshots reais existem.

Depois disso, conectar e endurecer a implementação.

---

## 17. Reporte de cada rodada

Durante trabalho ativo, reporte de forma curta:

```text
HIPÓTESE: ...
EXPERIMENTO: ...
OBSERVAÇÃO: ...
CORREÇÃO: ...
EVIDÊNCIA: screenshot / viewport / commit
```

Não escrever longos relatórios arquiteturais entre ciclos visuais.

---

## 18. Gate final

Antes de marcar pronta:

- target identificado;
- screenshots reais;
- matriz Android responsiva;
- texto aumentado;
- lógica real conectada;
- estados relevantes;
- offline quando aplicável;
- acessibilidade;
- motion + Reduced Motion;
- build/testes;
- branch e commit informados.

Publicar:

> **READY FOR DESIGN REVIEW — <NOME DA TELA>**

Nunca declarar aprovação por conta própria.

---

## 19. Mantra

> **Hipótese. Experimento. Observação. Correção.**

> **Render cedo. Olhe o resultado. Corrija o que realmente apareceu.**

> **Código funcionando não significa UI aprovada.**
