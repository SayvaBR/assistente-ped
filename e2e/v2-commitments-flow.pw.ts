import { expect, test } from '@playwright/test';

test('Compromissos V2 exibe timeline e cria um compromisso', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=commitments&width=412');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Compromissos' })).toBeVisible();
  await expect(device.getByRole('button', { name: /Aula de Matemática Evento/ })).toBeVisible();
  await device.getByRole('button', { name: 'Novo compromisso' }).click();
  await device.getByLabel('Título').fill('Reunião com responsáveis');
  await device.getByLabel('Observações').fill('Sala dos professores');
  await device.getByRole('button', { name: 'Salvar compromisso' }).click();
  await expect(device.getByRole('status')).toContainText('Compromisso salvo na agenda');
});

test('Compromissos V2 preserva copy e layout em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=commitments&width=412');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasTitle: (root.textContent || '').includes('Compromissos'),
    hasAgenda: (root.textContent || '').includes('Aula de Matemática'),
  }));
  expect(result).toEqual({ overflow: false, hasTitle: true, hasAgenda: true });
});

test('Compromissos V2 leva os períodos para o planejamento correspondente', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=commitments&width=412');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('tab', { name: 'Semana' }).click();
  await expect(device.getByRole('heading', { name: 'Planejamento semanal' })).toBeVisible();
  await device.getByRole('tab', { name: 'Mês' }).click();
  await expect(device.getByRole('heading', { name: /2024/ })).toBeVisible();
});
