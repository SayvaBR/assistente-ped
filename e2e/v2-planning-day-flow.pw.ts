import { expect, test, type Page } from '@playwright/test';

test('Planejamento diário V2 exibe os momentos e a ação de adicionar', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-day&width=412');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Planejamento diário' })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Matemática' })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Adicionar momento' })).toBeVisible();
});

test('Planejamento diário V2 preserva copy e layout em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=planning-day&width=412');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const result = await deviceText(page);
  expect(result).toEqual({ overflow: false, hasTitle: true, hasPlan: true });
});

async function deviceText(page: Page) {
  return page.locator('.v2-preview-device').evaluate((root: HTMLElement) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasTitle: (root.textContent || '').includes('Planejamento diário'),
    hasPlan: (root.textContent || '').includes('Matemática'),
  }));
}
