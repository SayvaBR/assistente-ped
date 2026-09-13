import { expect, test } from '@playwright/test';

const viewports = [320, 360, 390, 412, 432, 480, 600] as const;

for (const width of viewports) {
  test(`V2 Home adapts at ${width}px without horizontal overflow or essential text clipping`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width >= 600 ? 960 : 900 });
    await page.goto(`/?v2-preview=home&width=${width}`);

    const device = page.locator('.v2-preview-device');
    await expect(device).toBeVisible();
    await expect(device).toHaveAttribute('data-preview-width', String(width));

    const problems = await device.evaluate((root) => {
      const rootRect = root.getBoundingClientRect();
      const selectors = 'h1,h2,h3,h4,h5,h6,p,label,button,a,[role="heading"],[role="button"]';
      const elements = Array.from(root.querySelectorAll<HTMLElement>(selectors));
      const issues: string[] = [];

      if (root.scrollWidth > root.clientWidth + 1) {
        issues.push(`device horizontal overflow: scrollWidth=${root.scrollWidth}, clientWidth=${root.clientWidth}`);
      }

      for (const element of elements) {
        const text = (element.textContent || '').trim();
        if (!text) continue;

        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const lineClamp = style.getPropertyValue('-webkit-line-clamp');
        const intentionallyTruncated =
          style.textOverflow === 'ellipsis' ||
          (lineClamp !== '' && lineClamp !== 'none' && lineClamp !== '0');
        const nowrapOverflow = style.whiteSpace === 'nowrap' && element.scrollWidth > element.clientWidth + 1;
        const outsideDevice = rect.right > rootRect.right + 1 || rect.left < rootRect.left - 1;

        if (intentionallyTruncated) {
          issues.push(`truncation rule on essential candidate: "${text.slice(0, 80)}"`);
        }
        if (nowrapOverflow) {
          issues.push(`nowrap clipping: "${text.slice(0, 80)}"`);
        }
        if (outsideDevice && style.position !== 'fixed') {
          issues.push(`content outside device bounds: "${text.slice(0, 80)}"`);
        }
      }

      return issues;
    });

    expect(problems, problems.join('\n')).toEqual([]);

    const screenshot = await device.screenshot({ animations: 'disabled' });
    await testInfo.attach(`home-v2-${width}px`, {
      body: screenshot,
      contentType: 'image/png',
    });
  });
}
