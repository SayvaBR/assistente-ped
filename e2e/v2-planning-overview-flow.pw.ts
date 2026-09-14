import { expect, test } from '@playwright/test';

test('Planejamento overview V2 mantém a próxima aula dominante e abre o plano', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-overview&width=412');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Planejamento' })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Frações: conceitos e prática' })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Planos arquivados', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Restaurar', exact: true })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Atividades preparadas', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: /Caça às palavras/ })).toBeVisible();
  await device.getByRole('button', { name: 'Abrir plano' }).click();
  await expect(device.getByRole('heading', { name: 'Editar plano' })).toBeVisible();
});

test('Planejamento overview V2 encaminha as visões sem overflow em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=planning-overview&width=412');
  const device = page.locator('.v2-preview-device');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  await device.getByRole('tab', { name: 'Semana' }).click();
  await expect(device.getByRole('heading', { name: 'Planejamento semanal' })).toBeVisible();
  const overflow = await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(overflow).toBe(false);
});

test('Planejamento semanal V2 comunica o ritmo e abre o próximo plano', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-week&width=412');

  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: /preparos já no caminho/i })).toBeVisible();
  await device.getByRole('button', { name: 'Planejar próximo momento' }).click();
  await expect(device.getByRole('heading', { name: 'Editar plano' })).toBeVisible();
});

test('Novo plano V2 recupera rascunho local após sair do editor', async ({ page }) => {
  const classroom = { id: 'planning_autosave_class', nome: 'Turma do planejamento', nivel: '4º ano', turno: 'Manhã', etapa: 'fundamental_anos_iniciais', componentesCurriculares: ['Língua Portuguesa'], duracaoAulaMin: 50 };
  await page.setViewportSize({ width: 390, height: 980 });
  await page.addInitScript((value) => {
    localStorage.setItem('perfil:professor', JSON.stringify({ id: 'planning_autosave_teacher', nome: 'Docente de teste', tratamento: 'docente' }));
    localStorage.setItem('turmas:lista', JSON.stringify([value]));
    localStorage.setItem('turmas:ativa', value.id);
    localStorage.setItem(`turma:${value.id}:alunos`, '[]');
    localStorage.setItem('config:sons', 'false');
  }, classroom);
  await page.goto('/');
  await page.getByRole('button', { name: 'Planejamento', exact: true }).click();
  await page.getByRole('button', { name: 'Criar plano de aula', exact: true }).click();
  const title = page.getByRole('textbox', { name: 'Tema ou título' });
  await title.fill('Leitura compartilhada');
  await page.waitForTimeout(1100);
  const draftKeys = await page.evaluate(() => Object.keys(localStorage).filter((key) => key.startsWith('planejamento:rascunho:')));
  expect(draftKeys).toHaveLength(1);
  await page.getByRole('button', { name: 'Voltar', exact: true }).click();
  await page.getByRole('button', { name: 'Descartar', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Planejamento', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Criar plano de aula', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Tema ou título' })).toHaveValue('Leitura compartilhada');
  await page.getByRole('button', { name: /RITMO DA AULA/ }).click();
  await page.getByRole('textbox', { name: 'Momento' }).fill('Abertura');
  await page.getByRole('button', { name: 'Adicionar momento', exact: true }).click();
  await page.getByRole('button', { name: 'Marcar como pronto', exact: true }).click();
  await expect(page.getByText('Plano marcado como pronto.', { exact: true })).toBeVisible();
  await expect(page.getByText('Pronto', { exact: true })).toBeVisible();
});
