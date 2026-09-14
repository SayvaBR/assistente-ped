import { expect, test } from '@playwright/test';

test('Relatórios V2 monta leitura de frequência e exporta a partir de dados locais', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=reports');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Relatórios', exact: true })).toBeVisible();
  await device.getByRole('button', { name: /Visão da turma/ }).click();
  await expect(device.getByRole('heading', { name: 'Leitura da presença' })).toBeVisible();
  await expect(device.getByText(/\d+% de presença/).first()).toBeVisible();
  await expect(device.getByRole('button', { name: /Exportar CSV/ })).toBeEnabled();
});

test('Relatórios V2 preserva layout compacto', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1200 });
  await page.goto('/?v2-preview=reports');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasClass: root.textContent?.includes('5º Ano A') }));
  expect(result).toEqual({ overflow: false, hasClass: true });
});
