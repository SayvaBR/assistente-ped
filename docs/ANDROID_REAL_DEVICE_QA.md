# Android Real-Device QA — Assistente Pedagógico V2

> **Dispositivo físico de referência atual:** POCO X7 Pro do produto.
>
> O aparelho é uma referência de aceitação real, **não** uma largura fixa de design.

## 1. Regra principal

A tela física do POCO X7 Pro é 1220 × 2712 px, mas a UI React/Capacitor não deve ser desenhada em 1220 px físicos.

Android + WebView trabalham com uma viewport lógica que depende de densidade, escala de exibição, escala de fonte, barras do sistema, modo de navegação e configuração do aparelho.

Portanto:

- `390px` continua sendo apenas viewport-âncora para comparar com targets;
- `1220px` é resolução física do painel e **não** deve virar breakpoint CSS;
- o viewport real do aparelho deve ser medido no app em execução;
- nenhuma tela pode ser otimizada exclusivamente para o POCO X7 Pro.

## 2. Durante desenvolvimento rápido

Continuar usando o Visual Lab e a matriz lógica:

- 320;
- 360;
- 390;
- 412/432;
- 480;
- 600 quando aplicável.

Esses valores servem para encontrar falhas responsivas cedo.

Não é necessário instalar APK a cada ajuste de 2 px.

## 3. Gate obrigatório em aparelho real

Antes de `PRODUCTION GATE READY` de uma superfície importante, executar o app Capacitor/Android real no POCO X7 Pro quando o aparelho estiver disponível.

A evidência deve registrar, no app real:

```js
console.table({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  devicePixelRatio: window.devicePixelRatio,
  visualViewportWidth: window.visualViewport?.width,
  visualViewportHeight: window.visualViewport?.height,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
});
```

Também registrar:

- screenshot Android real, não apenas Visual Lab;
- branch e commit;
- orientação usada;
- modo de navegação do sistema quando conhecido;
- escala de fonte/exibição quando alterada para teste;
- qualquer diferença encontrada entre preview e WebView Android.

Se o agente não tiver acesso físico ao POCO X7 Pro, não inventar resultado. Marcar:

`REAL DEVICE QA PENDING — POCO X7 PRO`

E entregar APK/build apropriado para validação no aparelho.

## 4. Texto e português real

Palavras essenciais não podem quebrar no meio só para caber em um card.

Exemplo de falha:

- `Presentes` renderizado como `Present` + `es`;
- `Pendentes` renderizado como `Pendent` + `es`.

Isso é falha responsiva/visual mesmo quando não existe overflow horizontal.

Preferir, conforme o caso:

- aumentar espaço útil;
- mudar a composição do resumo;
- permitir que o grid mude de estrutura em telas estreitas;
- ajustar tipografia moderadamente sem torná-la pequena;
- manter palavras inteiras com quebra entre palavras, não dentro delas.

Não resolver escondendo conteúdo, usando ellipsis em label essencial ou reduzindo fonte até ficar ilegível.

## 5. Safe areas e sistema Android

No aparelho real validar:

- status bar;
- recorte/câmera frontal quando interferir;
- barra/área de gestos inferior;
- bottom navigation V2;
- teclado em formulários;
- conteúdo rolável chegando ao final sem ficar atrás da navegação;
- touch targets >= 48 px.

A UI deve usar safe areas/insets corretamente e não presumir que o browser preview representa toda a geometria do Android real.

## 6. Escala de texto e exibição

Para superfícies críticas validar, quando viável no dispositivo real:

- configuração padrão;
- texto aumentado (~130%);
- texto aumentado (~150%) ou o maior nível viável sem alterar permanentemente o aparelho.

O objetivo não é manter pixels idênticos. É preservar:

- leitura;
- hierarquia;
- acesso às ações;
- palavras completas;
- ausência de scroll horizontal acidental.

## 7. Critério de produto

O POCO X7 Pro será nosso principal aparelho físico de referência enquanto for o dispositivo disponível ao produto.

Ele serve para responder:

> “A interface que parece boa no laboratório continua boa como aplicativo Android de verdade?”

Mas a aprovação final continua exigindo responsividade além dele.

> **Preview encontra problemas cedo. Aparelho real decide se a experiência Android é verdadeira.**
