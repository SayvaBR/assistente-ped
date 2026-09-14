import { expect, test } from '@playwright/test';

test('Assinatura V2 não simula compra e mantém gratuito utilizável', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=subscription&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Seu plano', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: /gratuito/i })).toBeVisible();
  await device.getByRole('button', { name: /Quero conhecer|Interesse salvo/ }).click();
  await expect(device.getByRole('status')).toContainText(/interesse.*salvo|gratuito/i);
});

test('Assinatura V2 preserva layout compacto e reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?v2-preview=subscription&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasLegalFallback: (root.textContent || '').includes('loja') }));
  expect(result).toEqual({ overflow: false, hasLegalFallback: true });
});
