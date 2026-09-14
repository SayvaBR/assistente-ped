import { expect, test } from '@playwright/test';

test('Ferramentas V2 mantém timer, cronômetro e calculadora isolados', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 900 });
  await page.goto('/?v2-preview=tools&width=412');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Ferramentas', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Iniciar' })).toBeVisible();

  await device.getByRole('button', { name: '1 min', exact: true }).click();
  await expect(device.getByText('01:00', { exact: true })).toBeVisible();
  await device.getByRole('button', { name: 'Iniciar' }).click();
  await expect(device.getByRole('button', { name: 'Pausar' })).toBeVisible();
  await device.getByRole('button', { name: 'Pausar' }).click();
  await expect(device.getByRole('button', { name: 'Iniciar' })).toBeVisible();
  await device.getByRole('button', { name: 'Zerar' }).click();
  await expect(device.getByText('01:00', { exact: true })).toBeVisible();

  await device.getByRole('button', { name: 'Cronômetro' }).click();
  await expect(device.getByText('00:00.0', { exact: true })).toBeVisible();
  await device.getByRole('button', { name: 'Iniciar' }).click();
  await expect(device.getByRole('button', { name: 'Pausar' })).toBeVisible();
  await device.getByRole('button', { name: 'Pausar' }).click();
  await device.getByRole('button', { name: 'Zerar' }).click();
  await expect(device.getByText('00:00.0', { exact: true })).toBeVisible();

  await device.getByRole('button', { name: 'Calculadora' }).click();
  await expect(device.getByRole('button', { name: 'Apagar último dígito' })).toBeVisible();
  await device.getByRole('button', { name: '1', exact: true }).click();
  await device.getByRole('button', { name: ',', exact: true }).click();
  await device.getByRole('button', { name: '5', exact: true }).click();
  await device.getByRole('button', { name: '+', exact: true }).click();
  await device.getByRole('button', { name: '2', exact: true }).click();
  await device.getByRole('button', { name: '=', exact: true }).click();
  await expect(device.getByLabel('Resultado 3,5')).toBeVisible();
  await device.getByRole('button', { name: 'C', exact: true }).click();
  await device.getByRole('button', { name: '8', exact: true }).click();
  await device.getByRole('button', { name: '÷', exact: true }).click();
  await device.getByRole('button', { name: '0', exact: true }).click();
  await device.getByRole('button', { name: '=', exact: true }).click();
  await expect(device.getByRole('alert')).toHaveText('Não é possível dividir por zero.');

  await device.getByRole('button', { name: 'Lanterna' }).click();
  await expect(device.getByText(/Lanterna desligada/)).toBeVisible();
  await device.getByRole('button', { name: 'Calculadora' }).click();
  await expect(device.getByLabel('Resultado 0')).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/tools-v2-412.png', fullPage: true });
});

test('Ferramentas V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=tools&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => root.scrollWidth > root.clientWidth + 1);
  expect(result).toBe(false);
});
