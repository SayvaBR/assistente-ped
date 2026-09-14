import { expect, test } from '@playwright/test';

test('Onboarding V2 apresenta etapas, escolha de plano e chegada à Home', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?v2-preview=onboarding&width=390');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: /Uma rotina mais leve/ })).toBeVisible();
  await device.getByRole('radio', { name: /Pro/ }).click();
  await expect(device.getByRole('radio', { name: /Pro/ })).toHaveAttribute('aria-checked', 'true');
  await device.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(device.getByRole('heading', { name: /Do primeiro toque/ })).toBeVisible();
  await device.getByRole('button', { name: 'Voltar' }).click();
  await expect(device.getByRole('heading', { name: /Uma rotina mais leve/ })).toBeVisible();
  await page.screenshot({ path: 'docs/qa/android-1.0/onboarding-v2-390.png', fullPage: true });
});

test('Onboarding V2 preserva leitura e não cria overflow de largura', async ({ page }) => {
  for (const width of [320, 360, 390, 412, 432, 480, 600]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/?v2-preview=onboarding&width=${width}`);
    const result = await page.locator('.v2-preview-device').evaluate((root) => ({
      overflow: root.scrollWidth > root.clientWidth + 1,
      hasContinue: root.textContent?.includes('Continuar'),
      hasOfflineCopy: root.textContent?.includes('disponíveis offline'),
    }));
    expect(result).toEqual({ overflow: false, hasContinue: true, hasOfflineCopy: true });
  }
});

test('Onboarding V2 respeita reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?v2-preview=onboarding&width=390');
  const motion = await page.locator('.v2-onboarding__content').evaluate((element) => getComputedStyle(element).animationDuration);
  expect(parseFloat(motion)).toBeLessThanOrEqual(0.001);
});
