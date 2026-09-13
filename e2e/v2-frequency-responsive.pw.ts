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
