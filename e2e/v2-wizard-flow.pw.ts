import { expect, test } from '@playwright/test';

test('Setup Wizard V2 conclui perfil e primeira turma', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=wizard&width=390');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('radio', { name: 'Professora' }).click();
  await device.getByRole('button', { name: 'Continuar', exact: true }).click();
  await device.getByLabel('Seu nome').fill('Marina Souza');
  await device.getByRole('button', { name: 'Continuar', exact: true }).click();
  await device.getByRole('radio', { name: 'Fundamental — Anos Iniciais' }).click();
  await device.getByRole('button', { name: 'Continuar', exact: true }).click();
  await device.getByLabel('Nome da primeira turma').fill('5º Ano A');
  await device.getByRole('button', { name: 'Continuar', exact: true }).click();
  await device.getByRole('radio', { name: '5º ano' }).click();
  await device.getByRole('button', { name: 'Continuar', exact: true }).click();
  await device.getByRole('radio', { name: 'Manhã' }).click();
  await device.getByRole('button', { name: 'Concluir configuração' }).click();
  await expect(device.getByRole('heading', { name: /Tudo pronto/ })).toBeVisible();
  await expect(device.getByText('5º Ano A', { exact: true })).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/setup-wizard-v2-success-390.png', fullPage: true });
});

test('Setup Wizard V2 mantém o CTA acessível em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=wizard&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasProgress: Boolean(root.querySelector('[role="progressbar"]')),
    hasContinue: root.textContent?.includes('Continuar'),
  }));
  expect(result).toEqual({ overflow: false, hasProgress: true, hasContinue: true });
});
