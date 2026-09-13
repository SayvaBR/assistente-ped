import { expect, test } from '@playwright/test';

test('Configurações V2 organiza preferências sem UI legada', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=settings');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Configurações', exact: true })).toBeVisible();
  await expect(device.getByText('PERFIL E TRABALHO')).toBeVisible();
  await device.getByRole('button', { name: /Sons do aplicativo/ }).click();
  await expect(device.getByRole('button', { name: /Sons do aplicativo/ })).toHaveAttribute('aria-pressed', 'false');
  await device.getByRole('button', { name: /Sobre o aplicativo/ }).click();
  await expect(device.getByText(/Dados pedagógicos ficam sob seu controle/)).toBeVisible();
});

test('Configurações V2 preserva layout compacto', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1200 });
  await page.goto('/?v2-preview=settings');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasPrivacy: root.textContent?.includes('Privacidade') }));
  expect(result).toEqual({ overflow: false, hasPrivacy: true });
});
