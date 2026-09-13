import { expect, test } from '@playwright/test';

test('Arquivos V2 exibe biblioteca, filtros e materiais locais', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=files');
  const device = page.locator('.v2-preview-device');
  await expect(device.locator('#files-v2-title')).toBeVisible();
  await expect(device.getByRole('button', { name: /Planos de aula Abrir pasta/ })).toBeVisible();
  await expect(device.getByText('BNCC_2024.pdf')).toBeVisible();
  await device.getByRole('button', { name: 'Recentes', exact: true }).click();
  await expect(device.getByRole('button', { name: 'Recentes', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('Arquivos V2 mantém texto ampliado sem overflow horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1100 });
  await page.goto('/?v2-preview=files');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasDocument: (root.textContent || '').includes('BNCC_2024.pdf') }));
  expect(result).toEqual({ overflow: false, hasDocument: true });
});
