import { expect, test } from '@playwright/test';

test('Ajuda V2 valida feedback e preserva aviso de privacidade', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=help&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Ajuda e feedback', exact: true })).toBeVisible();
  await device.getByRole('button', { name: /Preparar feedback/ }).click();
  await expect(device.getByRole('alert')).toContainText(/10 caracteres/);
  await expect(device.getByText(/Não escreva nomes/)).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/help-v2-390.png', fullPage: true });
});

test('Termos V2 alterna para privacidade sem overflow compacto', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=legal&width=320');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('tab', { name: /Privacidade/ }).click();
  await expect(device.getByRole('heading', { name: /Seus dados pedagógicos/ })).toBeVisible();
  const result = await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(result).toBe(false);
  await page.screenshot({ path: 'docs/qa/android-1.0/legal-v2-320.png', fullPage: true });
});
