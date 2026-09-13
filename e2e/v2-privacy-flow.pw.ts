import { expect, test } from '@playwright/test';

test('Privacidade V2 deixa analytics local desativado por padrão e alternável', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=privacy&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Privacidade', exact: true })).toBeVisible();
  const toggle = device.getByRole('checkbox');
  await expect(toggle).not.toBeChecked();
  await toggle.check();
  await expect(toggle).toBeChecked();
  await page.screenshot({ path: 'docs/qa/android-1.0/privacy-v2-390.png', fullPage: true });
  await device.getByRole('button', { name: /Gerenciar backup/ }).click();
  await expect(device.getByRole('heading', { name: 'Privacidade', exact: true })).toBeVisible();
});

test('Privacidade V2 mantém texto legível em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=privacy&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasLocal: (root.textContent || '').includes('armazenados localmente') }));
  expect(result).toEqual({ overflow: false, hasLocal: true });
});
