import { expect, test } from '@playwright/test';

test('Editor de plano V2 mantém os campos pedagógicos e momentos', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1100 });
  await page.goto('/?v2-preview=plan-editor');
  const device = page.locator('.v2-preview-device');
  await expect(device.locator('#plan-v2-title')).toBeVisible();
  await expect(device.locator('input').first()).toHaveValue('Frações: conceitos e prática');
  await expect(device.getByText(/1 momento planejado/)).toBeVisible();
  await device.getByRole('button', { name: /REFERÊNCIA CURRICULAR/ }).click();
  await expect(device.getByLabel('Códigos BNCC')).toHaveValue('EF05MA03');
});

test('Editor de plano V2 bloqueia conclusão vazia', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1100 });
  await page.goto('/?v2-preview=plan-editor');
  const device = page.locator('.v2-preview-device');
  await device.getByLabel('Tema ou título').fill('');
  await device.getByRole('button', { name: 'Concluir plano' }).click();
  await expect(device.getByRole('status')).toContainText('Informe o tema');
});
