import { expect, test, type Page } from '@playwright/test';

const planningViewports = [320, 360, 390, 412, 432, 480, 600] as const;

test('Planejamento diário V2 exibe os momentos e a ação de adicionar', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-day&width=412');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Planejamento diário' })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Matemática' })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Adicionar momento' })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Atividades para levar', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: /Caça às palavras/ })).toBeVisible();
});

test('Planejamento diário V2 abre o editor pela próxima ação', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-day&width=412');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: 'Criar atividade' }).click();
  await expect(device.getByRole('heading', { name: 'Nova atividade' })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Salvar atividade' })).toBeVisible();
});

test('Planejamento diário V2 preserva copy e layout em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=planning-day&width=412');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const result = await deviceText(page);
  expect(result).toEqual({ overflow: false, hasTitle: true, hasPlan: true });
});

test('Planejamento V2 navega entre Dia, Semana e Mês', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-day&width=412');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('tab', { name: 'Semana' }).click();
  await expect(device.getByRole('heading', { name: 'Planejamento semanal' })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Atividades preparadas', exact: true })).toBeVisible();
  await device.getByRole('tab', { name: 'Mês' }).click();
  await expect(device.getByRole('heading', { name: /agosto de 2024/i })).toBeVisible();
  await device.getByRole('tab', { name: 'Dia' }).click();
  await expect(device.getByRole('heading', { name: 'Planejamento diário' })).toBeVisible();
});

for (const width of planningViewports) {
  test(`Planejamento diário V2 mantém composição adaptativa em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 600 ? 960 : 900 });
    await page.goto(`/?v2-preview=planning-day&width=${width}`);
    const device = page.locator('.v2-preview-device');
    const result = await device.evaluate((root) => {
      const rootRect = root.getBoundingClientRect();
      const critical = ['Planejamento diário', 'Adicionar momento', 'Atividades para levar'];
      const elements = Array.from(root.querySelectorAll<HTMLElement>('h1,h2,p,button,strong,small'));
      return {
        overflow: root.scrollWidth > root.clientWidth + 1,
        missing: critical.filter((copy) => !(root.textContent || '').includes(copy)),
        outside: elements.filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.right > rootRect.right + 1 || rect.left < rootRect.left - 1;
        }).map((element) => element.textContent?.trim()).filter(Boolean).slice(0, 3),
      };
    });
    expect(result.overflow, `overflow em ${width}px`).toBe(false);
    expect(result.missing, `copy ausente em ${width}px`).toEqual([]);
    expect(result.outside, `conteúdo fora do dispositivo em ${width}px`).toEqual([]);
  });
}

async function deviceText(page: Page) {
  return page.locator('.v2-preview-device').evaluate((root: HTMLElement) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasTitle: (root.textContent || '').includes('Planejamento diário'),
    hasPlan: (root.textContent || '').includes('Matemática'),
  }));
}
