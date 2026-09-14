import { expect, test } from '@playwright/test';

test('Home V2 abre o workspace V2 da turma sem voltar para a carroceria legada', async ({ page }) => {
  await page.goto('/?v2-preview=home');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: /Abrir turma/ }).click();
  await expect(device.getByRole('heading', { name: 'Turmas', exact: true })).toBeVisible();
  await device.getByRole('button', { name: /Abrir turma/ }).click();
  await expect(device.getByRole('heading', { name: '5º Ano A', exact: true })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Fazer chamada', exact: true })).toBeVisible();
  await device.getByRole('button', { name: 'Alunos', exact: true }).click();
  await expect(device.getByText('Ana Clara Souza', { exact: true })).toBeVisible();
  await device.getByRole('button', { name: 'Registros', exact: true }).click();
  await expect(device.getByText('1 registro · 12/09/2026', { exact: true })).toBeVisible();
  await device.getByRole('button', { name: 'Histórico', exact: true }).click();
  await expect(device.getByRole('heading', { name: 'Histórico da turma', exact: true })).toBeVisible();
  await expect(device.getByText('CHAMADAS RECENTES', { exact: true })).toBeVisible();
  await expect(device.getByText('2 datas', { exact: true })).toBeVisible();
  const attendanceSummary = device.getByLabel('Resumo de frequência');
  await expect(attendanceSummary).toContainText('5');
  await expect(attendanceSummary).toContainText('4');
  await expect(attendanceSummary).toContainText('2');
  await expect(device.getByRole('button', { name: /quarta-feira, 28 de agosto/ })).toContainText('2 presentes · 2 faltas');
  await expect(device.getByRole('button', { name: /terça-feira, 27 de agosto/ })).toContainText('3 presentes · 2 faltas');
  await device.getByRole('button', { name: /terça-feira, 27 de agosto/ }).click();
  await expect(device.getByRole('heading', { name: '5º Ano A', exact: true })).toBeVisible();
  await expect(device.getByRole('region', { name: 'Dia da chamada' })).toContainText('terça-feira, 27 de agosto');
  await expect(device.getByRole('button', { name: 'Atrasado', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Salvar frequência', exact: true })).toBeVisible();
});

test('Workspace da turma preserva navegação, texto e largura compacta', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=class-workspace&width=320');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Fazer chamada', exact: true })).toBeVisible();
  await expect(device.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  expect(await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1)).toBe(false);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await device.getByRole('button', { name: 'Gestão', exact: true }).click();
  await expect(device.getByRole('heading', { name: 'Gestão', exact: true })).toBeVisible();
});
