import { expect, test } from '@playwright/test';

test('Planejamento overview V2 mantém a próxima aula dominante e abre o plano', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-overview&width=412');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Planejamento' })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Frações: conceitos e prática' })).toBeVisible();
  await device.getByRole('button', { name: 'Abrir plano' }).click();
  await expect(device.getByRole('heading', { name: 'Editar plano' })).toBeVisible();
});

test('Planejamento overview V2 encaminha as visões sem overflow em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=planning-overview&width=412');
  const device = page.locator('.v2-preview-device');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  await device.getByRole('tab', { name: 'Semana' }).click();
  await expect(device.getByRole('heading', { name: 'Planejamento semanal' })).toBeVisible();
  const overflow = await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(overflow).toBe(false);
});
