import { expect, test } from '@playwright/test';

for (const width of [360, 390, 412] as const) {
  test(`Home V2 bottom nav keeps labels intact and touchable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/?v2-preview=home&width=${width}`);

    const device = page.locator('.v2-preview-device');
    await expect(device).toBeVisible();

    const planButton = device.locator('.v2-home__nav-item').filter({ hasText: 'Plano' });
    await expect(planButton).toHaveAttribute('aria-label', 'Planejamento');
    await planButton.click();
    await expect(device.getByRole('heading', { name: 'Planejamento', exact: true })).toBeVisible();
    await device.getByRole('button', { name: 'Início', exact: true }).click();
    await expect(device.getByRole('heading', { name: 'Boa noite, Professora Marina!', exact: true })).toBeVisible();

    const result = await device.evaluate((root) => {
      const nav = root.querySelector<HTMLElement>('.v2-home__bottom-nav');
      const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('.v2-home__nav-item'));
      const navRect = nav?.getBoundingClientRect();
      const labels = buttons.map((button) => {
        const label = button.querySelector<HTMLElement>('span');
        const buttonRect = button.getBoundingClientRect();
        const labelRect = label?.getBoundingClientRect();
        const style = label ? getComputedStyle(label) : null;
        return {
          text: label?.textContent?.trim(),
          buttonWidth: buttonRect.width,
          buttonHeight: buttonRect.height,
          labelHeight: labelRect?.height,
          labelScrollWidth: label?.scrollWidth,
          labelClientWidth: label?.clientWidth,
          whiteSpace: style?.whiteSpace,
        };
      });

      return {
        labels,
        navWithinViewport: Boolean(navRect && navRect.left >= -1 && navRect.right <= window.innerWidth + 1),
        navOverflow: nav ? nav.scrollWidth > nav.clientWidth + 1 : true,
      };
    });

    expect(result.labels.map(({ text }) => text)).toEqual(['Início', 'Plano', 'Turmas', 'Arquivos', 'Mais']);
    expect(result.navWithinViewport).toBe(true);
    expect(result.navOverflow).toBe(false);
    for (const label of result.labels) {
      expect(label.buttonWidth).toBeGreaterThanOrEqual(48);
      expect(label.buttonHeight).toBeGreaterThanOrEqual(48);
      expect(label.whiteSpace).toBe('nowrap');
      expect(label.labelScrollWidth).toBeLessThanOrEqual((label.labelClientWidth ?? 0) + 1);
      expect(label.labelHeight).toBeLessThan(20);
    }
  });
}

test('Home V2 keeps hero CTAs above the fixed nav at short 412px height', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 720 });
  await page.goto('/?v2-preview=home&width=412');

  const device = page.locator('.v2-preview-device');
  await expect(device).toBeVisible();

  const geometry = await device.evaluate(() => {
    const nav = document.querySelector<HTMLElement>('.v2-home__bottom-nav');
    const actions = document.querySelector<HTMLElement>('.v2-home__hero-actions');
    if (!nav || !actions) throw new Error('Home hero/nav geometry is unavailable');
    return {
      navTop: nav.getBoundingClientRect().top,
      actionsBottom: actions.getBoundingClientRect().bottom,
      actionHeight: actions.querySelector<HTMLElement>('button')?.getBoundingClientRect().height ?? 0,
    };
  });

  expect(geometry.actionHeight).toBeGreaterThanOrEqual(48);
  expect(geometry.actionsBottom).toBeLessThanOrEqual(geometry.navTop - 8);
});
