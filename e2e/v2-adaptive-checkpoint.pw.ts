import { expect, test } from '@playwright/test';

const preview = process.env.V2_PREVIEW || 'home';
const expectedText = process.env.V2_EXPECT || '';
const widths = [360, 412, 480] as const;

for (const width of widths) {
  test(`adaptive checkpoint ${preview} at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width === 360 ? 800 : width === 412 ? 900 : 960 });
    await page.goto(`/?v2-preview=${encodeURIComponent(preview)}&width=${width}`);

    const device = page.locator('.v2-preview-device');
    await expect(device).toBeVisible();
    await expect(device).toHaveAttribute('data-preview-width', String(width));

    if (expectedText) {
      await expect(device.getByText(expectedText, { exact: false }).first()).toBeVisible();
    }

    const problems = await device.evaluate((root) => {
      const rootRect = root.getBoundingClientRect();
      const selectors = 'h1,h2,h3,p,label,button,a,[role="heading"],[role="button"]';
      const elements = Array.from(root.querySelectorAll<HTMLElement>(selectors));
      const issues: string[] = [];

      if (root.scrollWidth > root.clientWidth + 1) {
        issues.push(`horizontal overflow: scrollWidth=${root.scrollWidth}, clientWidth=${root.clientWidth}`);
      }

      for (const element of elements) {
        const text = (element.textContent || '').trim();
        if (!text) continue;

        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const nowrapOverflow = style.whiteSpace === 'nowrap' && element.scrollWidth > element.clientWidth + 1;
        const outside = rect.right > rootRect.right + 1 || rect.left < rootRect.left - 1;

        if (nowrapOverflow) issues.push(`nowrap clipping: "${text.slice(0, 80)}"`);
        if (outside && style.position !== 'fixed') issues.push(`outside device bounds: "${text.slice(0, 80)}"`);
      }

      return issues.slice(0, 10);
    });

    expect(problems, problems.join('\n')).toEqual([]);

    if (width === 412) {
      const screenshot = await device.screenshot({ animations: 'disabled' });
      await testInfo.attach(`${preview}-412-checkpoint`, {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  });
}
