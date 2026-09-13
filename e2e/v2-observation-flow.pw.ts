import { expect, test } from '@playwright/test';

test('Observação V2 percorre escolha do aluno, anotação e confirmação de salvamento', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 960 });
  await page.goto('/?v2-preview=observation&width=412');

  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Registrar observação' })).toBeVisible();
  await device.getByRole('button', { name: /Ana Clara Souza/ }).click();

  await expect(device.getByRole('heading', { name: 'Nova observação' })).toBeVisible();
  await device.getByRole('button', { name: 'Foi bem' }).click();
  await device.getByRole('textbox', { name: 'Observação livre' }).fill('Participou da conversa e explicou seu raciocínio para a turma.');
  await expect(device.getByRole('button', { name: 'Salvar observação' })).toBeEnabled();
  await device.getByRole('button', { name: 'Salvar observação' }).click();
  await expect(device.getByRole('status')).toContainText('Observação salva no histórico');
});

test('Observação V2 preserva copy e ausência de overflow em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1100 });
  await page.goto('/?v2-preview=observation&width=412&student=ana');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });

  const device = page.locator('.v2-preview-device');
  const result = await device.evaluate((root) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasCompleteTitle: (root.textContent || '').includes('Nova observação'),
    hasCompleteCta: (root.textContent || '').includes('Salvar observação'),
  }));

  expect(result).toEqual({ overflow: false, hasCompleteTitle: true, hasCompleteCta: true });
});
