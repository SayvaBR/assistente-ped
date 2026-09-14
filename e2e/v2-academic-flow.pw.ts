import { expect, test } from '@playwright/test';

test('Notas V2 mantém a composição operacional em 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?v2-preview=academic');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Notas e desempenho', exact: true })).toBeVisible();
  await expect(device.getByText('Diagnóstico de frações', { exact: true })).toBeVisible();
  await expect(device.getByText('Quem precisa de atenção?', { exact: true })).toBeVisible();
  expect(await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1)).toBe(false);
});

test('Notas V2 abre avaliação, lança nota e preserva estados de acessibilidade', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1100 });
  await page.goto('/?v2-preview=academic');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: /Diagnóstico de frações/ }).click();
  await expect(device.getByRole('heading', { name: 'Diagnóstico de frações', exact: true })).toBeVisible();
  const grade = device.getByRole('textbox', { name: 'Nota de Bruno Lima' });
  await grade.fill('7,5');
  await expect(grade).toHaveValue('7,5');
  await expect(device.getByText('Salvo neste dispositivo.', { exact: true })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1)).toBe(false);
});

test('Turmas V2 encaminha para notas e avaliações sem retornar à carroceria V1', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 980 });
  await page.goto('/?v2-preview=classes');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: 'Notas e avaliações' }).click();
  await expect(device.getByRole('heading', { name: 'Notas e desempenho', exact: true })).toBeVisible();
});

test('Notas V2 preserva o fluxo de criar avaliação com período real', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1000 });
  await page.goto('/?v2-preview=academic');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: /Nova avaliação/ }).click();
  await expect(device.getByRole('heading', { name: 'Nova avaliação', exact: true })).toBeVisible();
  await device.getByRole('textbox', { name: 'Título da avaliação' }).fill('Avaliação diagnóstica de aprendizagem');
  await device.getByRole('textbox', { name: 'Descrição' }).fill('Compreender as estratégias usadas pela turma.');
  await device.getByRole('button', { name: /Salvar avaliação/ }).click();
  await expect(device.getByRole('heading', { name: 'Avaliação diagnóstica de aprendizagem', exact: true })).toBeVisible();
  expect(await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1)).toBe(false);
});
