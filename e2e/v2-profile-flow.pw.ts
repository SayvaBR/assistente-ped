import { expect, test } from '@playwright/test';

test('Perfil V2 exibe identidade, campos e navegação principal', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=profile');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Perfil profissional', exact: true })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Sua identificação', exact: true })).toBeVisible();
  await expect(device.getByLabel('Nome completo')).toHaveValue('Marina Souza');
  await expect(device.getByRole('button', { name: 'Professora', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(device.getByRole('button', { name: 'Salvar perfil' })).toBeVisible();
});

test('Home V2 abre Perfil V2 pelo avatar mantendo o fluxo', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=home');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: 'Abrir meu perfil' }).click();
  await expect(device.getByRole('heading', { name: 'Perfil profissional', exact: true })).toBeVisible();
});

test('Perfil V2 valida nome sem gerar CTA falso', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 980 });
  await page.goto('/?v2-preview=profile');
  const device = page.locator('.v2-preview-device');
  await device.getByLabel('Nome completo').fill('');
  await device.getByRole('button', { name: 'Salvar perfil' }).click();
  await expect(device.getByRole('status')).toContainText('Informe seu nome');
});

test('Perfil V2 preserva texto ampliado sem overflow horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=profile');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasSchool: (root.textContent || '').includes('Escola Horizonte'),
  }));
  expect(result).toEqual({ overflow: false, hasSchool: true });
});
