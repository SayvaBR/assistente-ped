import { expect, test } from '@playwright/test';

test('Notificações V2 apresenta criação local com CTA bloqueado sem horário', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=notifications&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Lembretes', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: /Criar lembrete/ })).toBeDisabled();
  await expect(device.getByText(/Nenhum lembrete|Carregando lembretes/)).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/notifications-v2-390.png', fullPage: true });
});

test('Notificações V2 não cria overflow em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=notifications&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasPermissionCopy: (root.textContent || '').includes('permissão do Android') }));
  expect(result).toEqual({ overflow: false, hasPermissionCopy: true });
});
