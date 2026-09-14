# Revisão visual Apple/HIG — Assistente Pedagógico

## Objetivo

Fazer uma auditoria visual e de interação, tela a tela, do aplicativo mobile Assistente Pedagógico. O objetivo é elevar o produto para um nível de acabamento profissional, com identidade própria, hierarquia clara, acessibilidade, animações coerentes e fluxos que pareçam produto de uma big tech — sem transformar o app em um clone genérico de iOS.

## Contexto do produto

- Plataforma-alvo: Android mobile; não existe versão desktop.
- Stack: React + TypeScript + Vite + Capacitor.
- Público: professores da educação infantil e anos iniciais.
- Direção desejada: visual profissional, caloroso e editorial; motion fluido e funcional; controles claramente legíveis em claro e escuro.
- Build QA analisado: `br.com.assistentepedagogico.app.qa`, `0.3.0-qa` / versionCode 30.

## Evidências visuais QA sintéticas

Todas as imagens abaixo usam dados fictícios (`ProfessorQA`, `QATurma`, `AlunoQA`, `PlanoQA`) e foram capturadas no aparelho Android conectado. Inspecionar cada imagem individualmente e relacionar os achados ao fluxo completo:

- `android-qa-home-configured.png` — início configurado
- `android-qa-after-student.png` — turma após cadastro do aluno
- `android-qa-attendance-complete.png` — chamada concluída
- `android-qa-planning-saved.png` — planejamento salvo
- `android-qa-files.png` — biblioteca de arquivos vazia
- `android-qa-camera.png` — câmera nativa aberta
- `android-qa-camera-added.png` — foto adicionada à biblioteca
- `android-qa-photo-open.png` — visualização da foto
- `android-qa-more.png` — menu Mais
- `android-qa-settings.png` — configurações
- `android-qa-appearance.png` — aparência
- `android-qa-appearance-dark.png` — aparência escura
- `android-qa-appearance-restored.png` — aparência clara restaurada
- `android-qa-backup.png` — backup e dados
- `android-qa-restart-ready.png` — app após reinicialização, para avaliar splash/loading e persistência percebida

Não usar como evidência visual: `android-qa-initial.png` (notificação pessoal), `android-qa-file-picker.png`, `android-qa-backup-export.png` e `android-qa-backup-restored-picker.png` (mostram conteúdo real do aparelho em superfícies nativas de compartilhamento/arquivos), nem XMLs de inspeção que possam conter dados do usuário.

## Escopo da revisão

1. Avaliar cada tela e o fluxo de transição entre telas.
2. Identificar problemas críticos de contraste, ícones, alvos de toque, safe areas, tipografia escalável, dark mode, estados vazios, carregamento, erro e confirmação.
3. Avaliar o sistema visual: cores semânticas, tokens, raios, elevação, cartões, botões, tabs, navegação inferior, inputs, modais e ícones.
4. Avaliar motion: entrada/saída, feedback de sucesso, autosave, loading, troca de tema, câmera e sheets. Propor valores concretos de duração, easing, spring e comportamento com Reduce Motion.
5. Sugerir melhorias de identidade visual e direção de arte sem remover a legibilidade ou a adequação ao contexto escolar.
6. Entregar uma lista priorizada por severidade e esforço, com correções concretas para React/Capacitor e uma ordem de implementação por milestones.

## Formato esperado

Produzir um relatório com:

- diagnóstico geral;
- achados por tela, citando o arquivo de evidência;
- problemas Critical/High/Medium/Low;
- recomendações com tokens e medidas quando possível;
- mapa de componentes a consolidar;
- plano de motion e acessibilidade;
- backlog executável, começando pelo que mais aumenta a percepção de qualidade;
- exemplos de microcopy quando o texto atual prejudicar clareza.

Usar os princípios da Apple HIG como referência, traduzidos para Android/Capacitor. Não presumir que o app deva copiar componentes nativos iOS; preservar a identidade do produto e respeitar as convenções Android onde elas forem mais apropriadas.
