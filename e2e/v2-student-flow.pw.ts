import { expect, test } from '@playwright/test';

test('Novo aluno V2 valida e conclui cadastro real do fluxo', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=new-student&width=390');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: 'Adicionar aluno' }).click();
  await expect(device.getByRole('alert')).toContainText('nome e a data');
  await device.getByLabel(/Nome completo/).fill('Ana Clara Souza');
  await device.getByLabel(/Data de nascimento/).fill('2015-05-10');
  await device.getByLabel(/Responsável/).fill('Joana Souza');
  await device.getByLabel(/Telefone/).fill('11999999999');
  await device.getByRole('button', { name: 'Adicionar aluno' }).click();
  await expect(device.getByRole('heading', { name: 'Turmas', exact: true })).toBeVisible();
});

test('Novo aluno V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=new-student&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasForm: Boolean(root.querySelector('form')), hasCta: root.textContent?.includes('Adicionar aluno') }));
  expect(result).toEqual({ overflow: false, hasForm: true, hasCta: true });
});
