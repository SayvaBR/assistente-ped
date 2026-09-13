import { expect, test } from '@playwright/test';

test('Mais V2 organiza recursos, conta, preferências e suporte', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1100 });
  await page.goto('/?v2-preview=more');
  const device = page.locator('.v2-preview-device');
  await expect(device.locator('#more-v2-title')).toBeVisible();
  await expect(device.getByRole('button', { name: /Meu perfil/ })).toBeVisible();
  await expect(device.getByRole('button', { name: /Configurações/ })).toBeVisible();
  await expect(device.getByRole('button', { name: /Ajuda e feedback/ })).toBeVisible();
});

test('Mais V2 preserva copy em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1200 });
  await page.goto('/?v2-preview=more');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasSupport: (root.textContent || '').includes('Ajuda e feedback') }));
  expect(result).toEqual({ overflow: false, hasSupport: true });
});
