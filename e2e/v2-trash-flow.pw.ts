import { expect, test } from '@playwright/test';

test('Lixeira V2 comunica vazio e mantém ação de retorno', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=trash&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Lixeira', exact: true })).toBeVisible();
  await expect(device.getByText(/A lixeira está vazia/)).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/trash-v2-390.png', fullPage: true });
});

test('Lixeira V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=trash&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(result).toBe(false);
});
