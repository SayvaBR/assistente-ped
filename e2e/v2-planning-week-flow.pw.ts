import { expect, test } from '@playwright/test';

const viewports = [320, 360, 390, 412, 432, 480, 600] as const;

test('Planejamento semanal V2 mantém preparo, planos e estados úteis', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-week&width=412');
  const device = page.locator('.v2-preview-device');

  await expect(device.getByRole('heading', { name: 'Planejamento semanal' })).toBeVisible();
  await expect(device.getByRole('button', { name: /Matemática/ })).toBeVisible();
  await expect(device.getByRole('button', { name: /Ciências/ })).toBeVisible();
  await expect(device.getByText('Leitura silenciosa', { exact: true })).toBeVisible();
  await expect(device.getByText('Sem horário', { exact: true })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Atividades preparadas', exact: true })).toBeVisible();
  await expect(device.getByRole('button', { name: /Caça às palavras/ })).toBeVisible();
  await expect(device.getByRole('button', { name: 'Criar plano neste dia' })).toBeVisible();
  await expect(device.getByRole('button', { name: /Plano arquivado/ })).toHaveCount(0);
});

test('Planejamento mensal V2 preserva a composição base fora do hardening semanal', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=planning-month&width=412');
  const device = page.locator('.v2-preview-device');

  await expect(device.locator('.v2-planning-calendar[data-mode="month"] .v2-planning-calendar__month')).toBeVisible();
  await expect(device.locator('.v2-planning-calendar[data-mode="month"] .v2-planning-calendar__plan time')).toHaveText(['10:00', '13:00']);
  await expect(device.getByText('Sem horário', { exact: true })).toHaveCount(0);
  await expect(device.getByText('Leitura silenciosa', { exact: true })).toHaveCount(0);
});

test('Planejamento semanal V2 preserva copy e layout em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=planning-week&width=412');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const device = page.locator('.v2-preview-device');
  const result = await device.evaluate((root) => ({
    overflow: root.scrollWidth > root.clientWidth + 1,
    hasTitle: (root.textContent || '').includes('Planejamento semanal'),
    hasPreparation: (root.textContent || '').includes('Atividades preparadas'),
    hasCreate: (root.textContent || '').includes('Criar plano neste dia'),
  }));
  expect(result).toEqual({ overflow: false, hasTitle: true, hasPreparation: true, hasCreate: true });
});

test('Planejamento semanal V2 mantém rótulos da navegação separados em 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/?v2-preview=planning-week&width=320');
  const labels = await page.locator('.v2-planning-calendar__nav-item span').evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect();
    return { text: element.textContent?.trim(), left: rect.left, right: rect.right };
  }));

  expect(labels).toHaveLength(5);
  expect(labels.slice(1).every((label, index) => label.left >= labels[index].right + 2)).toBe(true);
});

for (const width of viewports) {
  test(`Planejamento semanal V2 mantém composição adaptativa em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 600 ? 960 : 900 });
    await page.goto(`/?v2-preview=planning-week&width=${width}`);
    const device = page.locator('.v2-preview-device');
    const result = await device.evaluate((root) => {
      const rootRect = root.getBoundingClientRect();
      const elements = Array.from(root.querySelectorAll<HTMLElement>('h1,h2,p,button,strong,small'));
      return {
        overflow: root.scrollWidth > root.clientWidth + 1,
        missing: ['Planejamento semanal', 'Atividades preparadas', 'Criar plano neste dia'].filter((copy) => !(root.textContent || '').includes(copy)),
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
