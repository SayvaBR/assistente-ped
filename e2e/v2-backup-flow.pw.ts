import { expect, test } from '@playwright/test';

test('Backup V2 comunica cópia protegida e exige confirmação para apagar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=backup&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Backup e dados', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Criar arquivo de backup' })).toBeVisible();
  await device.getByRole('button', { name: 'Apagar todos os dados' }).click();
  await expect(device.getByRole('dialog')).toBeVisible();
  await expect(device.getByRole('button', { name: 'Apagar tudo' })).toBeDisabled();
  await device.getByLabel('Confirmação de exclusão').fill('APAGAR');
  await expect(device.getByRole('button', { name: 'Apagar tudo' })).toBeEnabled();
});

test('Backup V2 preserva layout compacto', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=backup&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasRestore: (root.textContent || '').includes('RESTAURAR') }));
  expect(result).toEqual({ overflow: false, hasRestore: true });
});
