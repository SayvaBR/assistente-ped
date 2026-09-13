# Design System V2 — Visual QA Checklist

Usar esta checklist em todo PR com impacto visual relevante.

## Evidência mínima

- screenshot antes;
- screenshot depois;
- viewport informada;
- estado principal;
- estado loading quando existir;
- estado vazio quando existir;
- estado erro/retry quando existir;
- estado sucesso/confirmado quando existir;
- screenshot em 360px;
- screenshot em 390px;
- screenshot em 430px ou evidência equivalente;
- resultado de build/testes.

## Identidade

- a tela parece parte do Assistente Pedagógico sem depender do logotipo?
- existe um foco visual dominante?
- a composição é adequada ao trabalho daquela tela?
- o visual evita dashboard SaaS genérico?
- cards são usados por necessidade semântica, não por hábito?
- ícones ajudam compreensão em vez de preencher espaço?
- o azul funciona como assinatura, não como decoração indiscriminada?
- a tela não copia outro produto de forma evidente?

## Hierarquia

- título/contexto estão claros?
- primary action é inequívoca?
- secondary actions não competem?
- metadata tem peso menor que conteúdo principal?
- listas densas continuam escaneáveis?
- informações críticas aparecem antes de conteúdo secundário?

## Composição

- gutter consistente?
- espaçamento comunica agrupamento?
- alinhamentos são intencionais?
- seções têm ritmo diferente quando suas funções são diferentes?
- há excesso de containers?
- há chevron/ícone/card sem função?
- existe área vazia grande sem intenção?

## Tipografia

- títulos usam peso forte sem virar bloco enorme?
- body permanece legível?
- nenhum texto importante está <12px?
- não há texto truncado sem acesso ao valor completo?
- text scaling não quebra layout?

## Cor e contraste

- contraste AA?
- status não depende apenas de cor?
- cores de sucesso/erro/alerta aparecem apenas semanticamente?
- disabled continua legível?
- focus-visible é perceptível?

## Touch e input

- targets >=48×48px?
- teclado virtual não cobre CTA crítico?
- inputs têm label real?
- erro aparece junto ao campo?
- password has show/hide com nome acessível?
- selects/comboboxes funcionam com teclado?

## Navegação

- back funciona?
- hardware back Android respeita modal/alterações não salvas?
- bottom nav não cobre conteúdo?
- item ativo é inequívoco?
- não há CTA sem destino real?

## Motion

- pressed state existe?
- transições ajudam causalidade?
- reduced motion é respeitado?
- nada se move enquanto usuário tenta interagir?

## Estados

- loading não é spinner infinito?
- erro preserva contexto/dados?
- retry funciona?
- empty state explica próxima ação?
- sucesso não bloqueia fluxo desnecessariamente?

## Dados e privacidade

- screenshots usam fixtures sintéticas?
- nenhum dado real de aluno aparece?
- logs não contêm conteúdo pedagógico sensível?
- analytics não recebeu novos dados proibidos?

## Billing

- preço vem da fonte real quando aplicável?
- entitlement é validado?
- restaurar compra existe quando necessário?
- sem dark pattern?

## Rejeição automática

O reviewer deve pedir mudanças se houver:

- UI importante sem screenshot;
- layout principalmente formado por tiles/cards genéricos repetidos;
- target <48px;
- contraste crítico insuficiente;
- CTA falso;
- erro que perde dados digitados;
- preço comercial inventado;
- student data em analytics/log remoto;
- quebra do offline essencial;
- regressão de persistência;
- ausência de estados essenciais;
- justificativa do tipo “compila/funciona” para acabamento visual insuficiente.

## Aprovação

Aprovar somente quando função, identidade, acessibilidade, persistência e evidência visual estiverem satisfatórias ao mesmo tempo.
