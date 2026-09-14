import { expect, test } from '@playwright/test';

test('BNCC V2 consulta catálogo real e abre detalhe', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1100 });
  await page.goto('/?v2-preview=bncc');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'BNCC', exact: true })).toBeVisible();
  await expect(device.getByText('EF15LP01', { exact: true }).first()).toBeVisible();
  await device.getByRole('button', { name: /EF15LP01 Identificar/ }).click();
  await expect(device.getByRole('heading', { name: 'EF15LP01', exact: true })).toBeVisible();
  await expect(device.getByText(/Identificar a função social/)).toBeVisible();
  await device.getByRole('button', { name: 'Abrir no editor de plano' }).click();
  await expect(device.getByRole('heading', { name: 'Editar plano', exact: true })).toBeVisible();
  await device.getByRole('button', { name: /REFERÊNCIA CURRICULAR/ }).click();
  await expect(device.getByRole('textbox', { name: 'Códigos BNCC' })).toHaveValue('EF15LP01');
  await expect(device.getByText(/EF15LP01 Identificar a função social/)).toBeVisible();
});

test('BNCC V2 preserva busca nas larguras Android previstas', async ({ page }) => {
  for (const width of [320, 360, 390, 412, 432, 480, 600]) {
    await page.setViewportSize({ width, height: 1200 });
    await page.goto('/?v2-preview=bncc');
    const device = page.locator('.v2-preview-device');
    await device.getByPlaceholder('Buscar código ou palavra-chave').fill('EF05MA03');
    await expect(device.getByText('EF05MA03', { exact: true }).first()).toBeVisible();
    const result = await device.evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, text: root.textContent?.includes('EF05MA03') }));
    expect(result).toEqual({ overflow: false, text: true });
  }
});

test('BNCC V2 respeita reduced motion e mantém etapa acessível', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1200 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?v2-preview=bncc');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('tab', { name: 'Fundamental — Anos Iniciais' })).toHaveAttribute('aria-selected', 'true');
  await expect(device.getByPlaceholder('Buscar código ou palavra-chave')).toBeVisible();
});
