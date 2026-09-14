import { expect, test } from '@playwright/test';

test('Aparência V2 permite escolher modo e cor de ação', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=appearance');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Aparência', exact: true })).toBeVisible();
  await device.getByRole('radio', { name: 'Escuro' }).click();
  await expect(device.getByRole('radio', { name: 'Escuro' })).toHaveAttribute('aria-checked', 'true');
  await device.getByRole('radio', { name: 'Verde' }).click();
  await expect(device.getByRole('radio', { name: 'Verde' })).toHaveAttribute('aria-checked', 'true');
});

test('Aparência V2 não cria overflow em compacto', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1200 });
  await page.goto('/?v2-preview=appearance');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasTitle: root.textContent?.includes('Como você prefere trabalhar?') }));
  expect(result).toEqual({ overflow: false, hasTitle: true });
});
