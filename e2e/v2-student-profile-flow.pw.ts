import { expect, test } from '@playwright/test';

test('Perfil do aluno V2 mantém contexto, registros e edição local', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=student-profile&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Ana Clara Souza', exact: true })).toBeVisible();
  await expect(device.getByText(/5º Ano A/)).toBeVisible();
  await device.getByRole('button', { name: 'Registros' }).click();
  await expect(device.getByText(/Participou da atividade/)).toBeVisible();
  await device.getByRole('button', { name: 'Perfil' }).click();
  await device.getByRole('button', { name: /Editar/ }).click();
  await expect(device.getByRole('button', { name: 'Salvar' })).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/student-profile-v2-390.png', fullPage: true });
});

test('Perfil do aluno V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=student-profile&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(result).toBe(false);
});

test('Perfil do aluno V2 expõe galeria real vazia e ação de adicionar foto', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 980 });
  await page.goto('/?v2-preview=student-profile&width=390');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: 'Fotos' }).click();
  await expect(device.getByRole('heading', { name: 'Galeria do aluno' })).toBeVisible();
  await expect(device.getByText('Nenhuma foto registrada')).toBeVisible();
  await expect(device.getByRole('button', { name: 'Adicionar primeira foto' })).toBeVisible();
});
