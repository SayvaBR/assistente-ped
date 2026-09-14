import { expect, test } from '@playwright/test';

test('Gerenciar turmas V2 cria e valida uma turma', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=class-manager&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Minhas turmas', exact: true })).toBeVisible();
  await device.getByRole('button', { name: 'Criar turma' }).click();
  await expect(device.getByRole('heading', { name: /Como será seu espaço/ })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Salvar turma' })).toBeDisabled();
  await page.screenshot({ path: 'docs/qa/android-1.0/class-manager-v2-390.png', fullPage: true });
});

test('Gerenciar turmas V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=class-manager&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(result).toBe(false);
});
