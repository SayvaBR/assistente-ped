import { expect, test } from '@playwright/test';

test('Organização V2 carrega e mantém ação de adicionar escola', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=organization&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Organização', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Adicionar escola' })).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/organization-v2-390.png', fullPage: true });
});

test('Organização V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=organization&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(result).toBe(false);
});
