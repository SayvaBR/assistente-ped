import { expect, test } from '@playwright/test';

const viewports = [320, 360, 390, 412, 432, 480, 600] as const;

for (const width of viewports) {
  test(`Frequência V2 adapta em ${width}px sem overflow ou corte essencial`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width >= 600 ? 960 : 900 });
    await page.goto(`/?v2-preview=attendance&width=${width}`);

    const device = page.locator('.v2-preview-device');
    await expect(device).toBeVisible();
    await expect(device).toHaveAttribute('data-preview-width', String(width));

    const problems = await device.evaluate((root) => {
      const rootRect = root.getBoundingClientRect();
      const elements = Array.from(root.querySelectorAll<HTMLElement>('h1,h2,h3,p,label,button,input,[role="alert"],[role="status"]'));
      const issues: string[] = [];

      if (root.scrollWidth > root.clientWidth + 1) issues.push('device horizontal overflow');
      for (const element of elements) {
        const text = (element.textContent || element.getAttribute('placeholder') || '').trim();
        if (!text) continue;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const outsideDevice = rect.right > rootRect.right + 1 || rect.left < rootRect.left - 1;
        if (style.textOverflow === 'ellipsis' || style.getPropertyValue('-webkit-line-clamp') !== 'none' && style.getPropertyValue('-webkit-line-clamp') !== '') issues.push(`truncation rule: ${text}`);
        if (style.whiteSpace === 'nowrap' && element.scrollWidth > element.clientWidth + 1) issues.push(`nowrap clipping: ${text}`);
        if (outsideDevice && style.position !== 'fixed') issues.push(`outside device: ${text}`);
      }
      return issues;
    });

    expect(problems, problems.join('\n')).toEqual([]);
    await testInfo.attach(`frequency-v2-${width}px`, { body: await device.screenshot({ animations: 'disabled' }), contentType: 'image/png' });
  });
}

test('Frequência V2 mantém alvos de toque de 48px e expõe o menu operacional', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/?v2-preview=attendance&width=390');

  const device = page.locator('.v2-preview-device');
  await device.locator('.v2-frequency__status').first().click();
  await expect(device.locator('.v2-frequency__status-option')).toHaveCount(6);

  const targetProblems = await device.evaluate((root) => {
    const selectors = [
      '.v2-frequency__round-button',
      '.v2-frequency__context-tab',
      '.v2-frequency__date-arrow',
      '.v2-frequency__status',
      '.v2-frequency__student-arrow',
      '.v2-frequency__status-option',
      '.v2-frequency__save-actions button',
      '.v2-frequency__nav-item',
    ];
    return selectors.flatMap((selector) =>
      Array.from(root.querySelectorAll<HTMLElement>(selector)).flatMap((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width >= 48 && rect.height >= 48 ? [] : [`${selector}: ${rect.width}x${rect.height}`];
      }),
    );
  });

  expect(targetProblems, targetProblems.join('\n')).toEqual([]);
});

for (const scale of [1.15, 1.3, 1.5] as const) {
  test(`Frequência V2 preserva copy e fluxo em texto ${scale * 100}%`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 960 });
    await page.goto('/?v2-preview=attendance&width=390');
    await page.addStyleTag({ content: `html { font-size: ${scale * 100}% !important; }` });

    const device = page.locator('.v2-preview-device');
    const result = await device.evaluate((root) => {
      const criticalCopy = ['Presentes', 'Faltas', 'Pendentes', 'Salvar frequência', 'Planejamento'];
      const text = root.textContent || '';
      const missing = criticalCopy.filter((copy) => !text.includes(copy));
      return {
        missing,
        overflow: root.scrollWidth > root.clientWidth + 1,
      };
    });

    expect(result.missing).toEqual([]);
    expect(result.overflow).toBe(false);
  });
}
