# V2 Home Flow Visual Ring

> **Status:** ativo
> **Decisão de produto:** a Home V2 está aprovada como direção visual do produto e pode servir de North Star para as superfícies diretamente alcançadas a partir dela.
> **Importante:** aprovação de direção visual não significa que o PR inteiro está pronto para merge. Hardening, estados, motion/reduced-motion, acessibilidade e QA continuam obrigatórios.

## 1. Por que este documento existe

Uma Home bonita não resolve o produto se o primeiro toque joga o professor de volta para uma tela V1 com outra linguagem.

A partir de agora, **continuidade visual de fluxo** é critério de produto.

Quando uma ação existe na Home V2, o destino daquela ação deve ser auditado e, quando ainda estiver em V1 visual, migrado para a camada V2 em `src/v2/`.

O app não está visualmente coerente enquanto a Home parece V2 e seus destinos de primeiro nível parecem outro aplicativo.

## 2. North Star local

Para telas sem screenshot target explícito, usar como referências, nesta ordem:

1. screenshot/mockup aprovado específico da tela, se existir;
2. Home V2 aprovada como DNA local de produto;
3. `docs/DESIGN_AUTHORITY.md`;
4. skills V2;
5. screen spec relevante.

Não copiar a composição da Home para todas as telas. Copiar **DNA**: tipografia, cor, radius, profundidade tátil, iconografia, densidade, tom de copy, comportamento de controles e qualidade percebida.

## 3. Primeiro anel — destinos diretos da Home

Migrar e revisar nesta ordem, priorizando fluxos que o professor alcança diretamente da Home:

1. **Frequência / Fazer chamada**;
2. **Registrar observação**;
3. **Compromissos / Agenda**;
4. **Planejamento** — primeiro Dia, depois Semana e Mês;
5. **Turmas** — visão principal e abertura da turma atual;
6. **Perfil do professor** — acionado pelo avatar;
7. **Arquivos**;
8. **Mais**.

Dentro de cada módulo, aprofundar apenas o suficiente para que o fluxo principal iniciado na Home não caia abruptamente em UI legada. Não iniciar migração massiva de telas distantes sem necessidade.

## 4. Teste obrigatório de continuidade

Para cada ação da Home:

```text
HOME V2
-> tocar a ação real
-> abrir o destino real
-> screenshot do destino
-> comparar Home + destino lado a lado
-> identificar 3–5 quebras de identidade/UX
-> corrigir a maior
-> screenshot nova
-> repetir
```

Perguntas obrigatórias:

- parece o mesmo produto?
- tipografia pertence à mesma família?
- superfícies e depth têm a mesma física?
- ícones têm o mesmo peso/linguagem?
- o fundo e a proporção branco/azul continuam coerentes?
- a bottom navigation muda de personalidade ao trocar de tela?
- o usuário percebe continuidade ou parece ter aberto outro aplicativo?
- algum componente V1 reapareceu apenas por conveniência?

## 5. Regra Visual Builder

Cada tela segue:

`HIPÓTESE -> EXPERIMENTO -> OBSERVAÇÃO -> CORREÇÃO -> NOVA HIPÓTESE`

Não implementar uma tela inteira por 40 minutos e só então olhar.

Durante iteração visual ativa:

- primeiro render cedo;
- screenshot após mudança perceptiva relevante;
- comparar com target ou North Star;
- corrigir maior diferença primeiro;
- ciclos curtos de aproximadamente 5–10 minutos quando o ambiente permitir.

## 6. Dois gates diferentes

### Gate A — Visual Direction Approved

Libera o agente para avançar para a próxima tela do anel.

Exige:

- composição convincente;
- DNA V2 correto;
- screenshot real;
- navegação principal clara;
- ausência de regressão evidente para estética V1/genérica;
- usuário/design review aprovou a direção.

Não exige que todo hardening final já esteja concluído.

### Gate B — Production / Merge Ready

Continua exigindo:

- dados/repositories reais;
- loading/empty/error/offline quando aplicável;
- acessibilidade;
- touch targets;
- crescimento de texto;
- matriz Android adaptativa;
- motion + Reduced Motion quando aplicável;
- testes;
- CI;
- Android QA;
- nenhuma quebra de segurança/LGPD/billing/storage.

**Gate A libera a próxima tela. Gate B libera merge.**

Isso evita paralisar toda a produção visual esperando refinamentos finais de uma tela que já estabeleceu corretamente a linguagem.

## 7. Home V2 — decisão atual

A Home V2 está aceita como **baseline visual V2** para continuidade de produto.

Ainda devem ser polidos antes de Production / Merge Ready, se permanecerem no código atual:

- legibilidade da bottom navigation em larguras estreitas/texto ampliado;
- uso de sombras difusas onde o sistema prefere depth sólido/tátil;
- estados pressed/focus/loading/error/offline completos;
- motion e Reduced Motion;
- qualquer edge case identificado por QA.

Esses pontos não devem bloquear o início das telas do primeiro anel, mas também não devem ser esquecidos antes do merge.

## 8. Regra de branch

Para evitar nova fragmentação de arquitetura, **não criar uma nova branch visual para cada tela agora**.

Enquanto o PR #8 for a integração V2 ativa, continuar a migração do primeiro anel em `codex/5-v2-clean-room`, uma tela por vez, com commits pequenos e evidência visual por tela.

Se o PR ficar grande demais para revisão segura, dividir somente em um ponto estável, com decisão explícita e sem duplicar arquitetura V2.

## 9. Saída por tela

Quando uma tela atingir o Gate A, registrar:

`VISUAL DIRECTION APPROVED — <TELA>`

Quando atingir Gate B:

`PRODUCTION GATE READY — <TELA>`

Nunca confundir os dois estados.