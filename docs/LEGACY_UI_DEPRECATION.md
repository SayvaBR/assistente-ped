# Legacy UI Deprecation Policy

## Decisão

A UI V1 está congelada para evolução visual.

A partir da criação de `src/v2/`, telas/componentes V1 servem apenas como:

- referência de comportamento;
- fonte temporária para descobrir ações/estados;
- fallback enquanto a equivalente V2 ainda não está pronta.

## Não adicionar à V1

- novo Design System;
- nova composição visual;
- novas abstrações de card/tile;
- motion novo;
- polish não crítico;
- feature visual que já pertence ao roadmap V2.

## Permitido na V1 durante transição

- correção P0/P1 funcional;
- segurança/privacidade;
- perda/corrupção de dados;
- billing;
- compatibilidade Android;
- bug que impeça uso enquanto não há equivalente V2.

## Regra de migração

Quando uma tela V2 estiver aprovada e funcionalmente equivalente:

1. direcionar navegação para V2;
2. executar testes de persistência/estado;
3. marcar V1 como deprecated;
4. remover V1 somente depois de confirmar que não há consumidor funcional necessário.

## Regra principal

Não melhorar visualmente o legado para fazê-lo parecer V2.

Construir V2 em clean room e conectar os contratos funcionais necessários.
