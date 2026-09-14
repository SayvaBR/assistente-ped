import { expect, test } from '@playwright/test';

test('Criar atividade V2 valida conteúdo e mantém a ação acessível', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=planning-overview&width=412');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: 'Criar atividade', exact: true }).click();
  await expect(device.getByRole('heading', { name: 'Nova atividade', exact: true })).toBeVisible();
  const save = device.getByRole('button', { name: /Salvar atividade/ });
  await expect(save).toBeDisabled();
  await device.getByRole('textbox', { name: 'Título da atividade' }).fill('Caça às palavras');
  await device.getByRole('textbox', { name: 'Como realizar' }).fill('Em duplas, encontrem no texto as palavras combinadas.');
  await expect(save).toBeEnabled();
  await save.click();
});

test('Criar atividade V2 preserva layout compacto e reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 1200 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?v2-preview=activity&width=320');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Nova atividade', exact: true })).toBeVisible();
  expect(await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1)).toBe(false);
});
