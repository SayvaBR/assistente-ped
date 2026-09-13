import { expect, test } from '@playwright/test';

test('Ferramentas V2 permite alternar e iniciar o temporizador', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=tools&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Ferramentas', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Iniciar' })).toBeVisible();
  await device.getByRole('button', { name: 'Calculadora' }).click();
  await expect(device.getByRole('button', { name: 'Apagar último dígito' })).toBeVisible();
  await device.getByRole('button', { name: 'Lanterna' }).click();
  await expect(device.getByText(/Lanterna desligada/)).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/tools-v2-390.png', fullPage: true });
});

test('Ferramentas V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=tools&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(result).toBe(false);
});
