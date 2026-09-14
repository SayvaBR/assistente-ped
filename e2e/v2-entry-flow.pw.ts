import { expect, test } from '@playwright/test';

test('Splash V2 comunica entrada sem mascote e segue para onboarding', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?v2-preview=splash&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: /Assistente/ })).toBeVisible();
  const loading = device.getByRole('progressbar', { name: 'Preparando o aplicativo' });
  await expect(loading).toBeVisible();
  await expect(loading).not.toHaveAttribute('aria-valuenow');
  await expect(device.getByText('ANDROID · 1.0')).toHaveCount(0);
  await expect(device.getByText('Planejar')).toHaveCount(0);
  await expect(device.getByText('A inicialização está em andamento…')).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/splash-v2-390.png', fullPage: true });
  await device.getByRole('button', { name: 'Continuar' }).click();
  await expect(device.getByRole('heading', { name: /Uma rotina mais leve/ })).toBeVisible();
});

test('Splash V2 não cria overflow em compacto e suporta reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?v2-preview=splash&width=320');
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasBrand: root.textContent?.includes('Assistente Pedagógico'),
    hasLoading: Boolean(root.querySelector('[role="progressbar"]')),
  }));
  expect(result).toEqual({ overflow: false, hasBrand: true, hasLoading: true });
});
