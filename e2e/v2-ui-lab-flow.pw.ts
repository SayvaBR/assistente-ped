import { expect, test } from '@playwright/test';

test('UI Lab abre superfícies V2 sintéticas e alterna estado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 720 });
  await page.goto('/__lab?screen=onboarding-entry&width=412');

  const device = page.locator('.ui-lab__device');
  const screen = page.getByLabel('Screen');
  await expect(screen.locator('option')).toHaveCount(4);
  await expect(device.getByRole('heading', { name: /Vamos montar seu assistente/ })).toBeVisible();

  await screen.selectOption('home');
  await expect(device.getByRole('heading', { name: /Boa noite/ })).toBeVisible();
  await expect(page).toHaveURL(/screen=home/);

  await screen.selectOption('frequency');
  await expect(device.getByText('Frequência', { exact: true }).first()).toBeVisible();
  await screen.selectOption('planning-day');
  await expect(device.getByRole('heading', { name: 'Planejamento diário' })).toBeVisible();

  await page.goto('/__lab?screen=frequency&state=error&width=412');
  await expect(device.getByRole('alert')).toContainText('não pôde ser carregada');
});

test('UI Lab preserva rolagem e não expõe overflow horizontal em 412px', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 720 });
  await page.goto('/__lab?screen=planning-day&width=412');

  const metrics = await page.evaluate(() => ({
    maxScroll: document.documentElement.scrollHeight - innerHeight,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    deviceOverflowY: getComputedStyle(document.querySelector('.ui-lab__device')!).overflowY,
    stageHorizontalOverflow: document.querySelector('.ui-lab__stage')!.scrollWidth > document.querySelector('.ui-lab__stage')!.clientWidth + 1,
  }));

  expect(metrics.maxScroll).toBeGreaterThan(0);
  expect(metrics.horizontalOverflow).toBe(false);
  expect(metrics.deviceOverflowY).toBe('auto');
  expect(metrics.stageHorizontalOverflow).toBe(false);
});
