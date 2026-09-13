# Android Adaptive Development Cadence — Assistente Pedagógico V2

> **Status:** regra operacional obrigatória para desenvolvimento visual Android
> **Decisão de produto:** responsividade é um requisito do produto, mas **não pode dominar nem atrasar o ciclo de construção das telas**.

## 1. Regra central

O aplicativo deve se adaptar à tela. O desenvolvimento não deve virar uma rotina de redesenhar e recapturar a mesma tela em sete larguras diferentes.

Durante construção normal de UI, use **um único viewport de trabalho** para manter velocidade e consistência visual.

### Viewport de trabalho padrão

Use **412 CSS px de largura** como viewport principal de desenvolvimento visual em telefone Android, salvo quando um target aprovado exigir outra geometria específica para comparação.

412 é uma régua de trabalho interna — não é breakpoint fixo, não é largura obrigatória do app e não representa todos os Androids.

Quando houver screenshot/target aprovado em outra largura, pode-se usar temporariamente a largura do target para comparação lado a lado. Depois, volte ao viewport de trabalho normal.

## 2. O que o Codex deve fazer enquanto cria uma tela

O loop normal deve ser:

```text
hipótese
-> implementar
-> renderizar em 412px
-> screenshot
-> comparar visualmente
-> corrigir
-> repetir
```

O foco é:

- composição;
- hierarquia;
- qualidade visual;
- fluxo funcional;
- persistência;
- estados;
- navegação;
- acessibilidade básica;
- ausência de problemas responsivos óbvios.

**Não** parar cada iteração para testar 320/360/390/412/432/480/600.

**Não** produzir screenshots manuais de todas as larguras a cada alteração.

**Não** gastar mais tempo no laboratório responsivo do que construindo o produto.

## 3. Responsividade deve vir da implementação

A tela deve nascer fluida desde o início usando:

- `flex` e `grid`;
- `minmax()` quando útil;
- `flex-wrap`;
- largura relativa;
- altura automática;
- `min-width: 0` onde necessário;
- `clamp()` com moderação;
- media/container queries apenas quando houver mudança estrutural real;
- safe areas;
- layout que reorganiza conteúdo em vez de cortar conteúdo.

A regra mental é:

> **não criar um layout para cada tela; criar um layout que sabe se adaptar.**

## 4. Texto nunca é sacrificado

Mesmo no viewport único de desenvolvimento, o Codex deve evitar soluções frágeis.

Proibido para copy essencial:

- cortar texto;
- `ellipsis` por conveniência;
- `line-clamp` em título/CTA/status importante;
- quebrar palavra artificialmente no meio;
- reduzir fonte até ficar pequena demais;
- esconder ação porque faltou espaço;
- usar largura/altura rígida que dependa de uma string curta.

Se uma palavra ou ação não cabe, mude a composição.

Exemplo de falha:

- `Presentes` -> `Present` + `es`;
- `Pendentes` -> `Pendent` + `es`.

## 5. Quando testar outras larguras

A matriz multi-device continua existindo, mas vira **checkpoint automatizado e de hardening**, não ferramenta de microiteração.

Rodar testes multi-device principalmente:

1. depois que a tela já estiver visualmente convincente;
2. antes de `PRODUCTION GATE READY`;
3. quando uma mudança estrutural de layout puder causar regressão;
4. no CI;
5. antes de release;
6. quando um bug responsivo real for encontrado.

O teste automatizado pode continuar cobrindo múltiplas larguras sem interromper o ritmo humano de desenvolvimento.

O Codex não precisa olhar manualmente cada screenshot se os testes não apontarem problema e não houver motivo visual específico.

## 6. POCO X7 Pro

O POCO X7 Pro é o principal aparelho físico disponível para QA.

Ele serve como validação de realidade do Android, não como alvo único de design.

Fluxo recomendado:

```text
construir em 412px
-> validar visual/funcional
-> continuar desenvolvimento
-> checkpoint automatizado responsivo
-> APK no POCO em marcos importantes
```

Não instalar APK no aparelho a cada ajuste pequeno.

## 7. Androids diferentes continuam protegidos

Esta simplificação **não revoga** a obrigação de o produto funcionar em aparelhos diferentes.

Antes do Gate B/release, os testes automatizados e QA devem continuar cobrindo faixas estreitas, médias e largas conforme `docs/ANDROID_MULTI_DEVICE_RESPONSIVE_POLICY.md`.

A diferença é de **cadência**:

- durante construção: um viewport principal;
- durante hardening: validação ampla;
- antes de release: matriz e aparelho real.

## 8. Gate A versus Gate B

### Gate A — direção visual

Para `READY FOR DESIGN REVIEW` / `VISUAL DIRECTION APPROVED`, não exigir ritual manual de múltiplas larguras.

Exigir:

- tela convincente no viewport de trabalho/target;
- nenhuma falha responsiva óbvia;
- sem texto essencial cortado;
- sem dependência explícita de largura fixa;
- fluxo principal visível e coerente.

### Gate B — produção

Para `PRODUCTION GATE READY`, aí sim exigir:

- testes responsivos automatizados;
- texto ampliado nas superfícies críticas;
- safe areas;
- teclado;
- Android real quando disponível;
- ausência de overflow/corte;
- validação de faixas diferentes.

## 9. Regra contra overfitting de viewport

Não escrever CSS do tipo:

```css
@media (width: 390px) { ... }
@media (width: 412px) { ... }
@media (width: 432px) { ... }
```

apenas para fazer cada screenshot passar.

Breakpoints só existem quando a composição realmente precisa mudar por falta/excesso de espaço.

A pergunta correta não é:

> “Como fazer funcionar em 390 e 412?”

É:

> “Como fazer este componente se adaptar quando o espaço disponível muda?”

## 10. Prioridade de produto

Responsividade é uma preocupação transversal, não a feature principal.

O foco do projeto continua sendo entregar:

- todas as telas;
- todos os fluxos;
- integração real;
- dados persistentes;
- offline;
- onboarding;
- planejamento;
- frequência;
- BNCC;
- arquivos;
- billing;
- acessibilidade;
- qualidade visual.

Não permitir que o laboratório de resolução substitua o desenvolvimento do aplicativo.

## 11. Regra final

> **Desenvolva rápido em um viewport Android representativo. Implemente de forma fluida. Deixe CI e checkpoints provarem a adaptação ampla.**

> **O app se adapta à tela; o time não redesenha o app para cada tela.**

Esta regra **supersede qualquer instrução anterior que exija testar manualmente várias larguras durante cada ciclo visual**. A matriz multi-device permanece obrigatória apenas como hardening/gate de produção e release.