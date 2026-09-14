import { expect, test } from '@playwright/test';

for (const width of [360, 390, 412, 432] as const) {
  test(`Onboarding Entry mantém CTA no primeiro viewport em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 720 });
    await page.goto(`/?v2-preview=onboarding-entry&width=${width}`);

    const device = page.locator('.v2-preview-device');
    const cta = device.getByRole('button', { name: 'Preparar meu assistente' });
    const title = device.getByRole('heading', { name: /Vamos montar seu assistente/ });
    await expect(cta).toBeVisible();
    await expect(title).toBeVisible();

    const metrics = await device.evaluate((root) => {
      const deviceRect = root.getBoundingClientRect();
      const buttonRect = root.querySelector('.v2-entry__continue')!.getBoundingClientRect();
      const heading = root.querySelector('#onboarding-entry-title')!;
      return {
        width: deviceRect.width,
        ctaBottom: buttonRect.bottom - deviceRect.top,
        titleHeight: heading.getBoundingClientRect().height,
        lineHeight: Number.parseFloat(getComputedStyle(heading).lineHeight),
        overflow: root.scrollWidth > root.clientWidth + 1,
      };
    });

    expect(metrics.width).toBe(width);
    expect(metrics.ctaBottom, `CTA saiu do primeiro viewport em ${width}px`).toBeLessThanOrEqual(720);
    expect(metrics.titleHeight, `headline excedeu três linhas em ${width}px`).toBeLessThanOrEqual(metrics.lineHeight * 3);
    expect(metrics.overflow).toBe(false);
  });
}

test('Onboarding Entry mantém CTA e rodapé acima do safe area inferior em runtime', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 720 });
  await page.goto('/?v2-preview=onboarding-entry&width=412');

  const device = page.locator('.v2-preview-device');
  const metrics = await device.evaluate((root) => {
    const safeBottom = 48;
    document.documentElement.style.setProperty('--v2-safe-bottom', `${safeBottom}px`);

    const screen = root.querySelector<HTMLElement>('.v2-entry__screen');
    const cta = root.querySelector<HTMLElement>('.v2-entry__continue');
    const footer = root.querySelector<HTMLElement>('.v2-entry__footer');
    const scrollRoot = document.scrollingElement;
    if (!screen || !cta || !footer || !scrollRoot) throw new Error('Onboarding runtime elements missing');

    const computedSafeBottom = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--v2-safe-bottom'));
    const paddingBottom = Number.parseFloat(getComputedStyle(screen).paddingBottom);
    const maxScroll = scrollRoot.scrollHeight - scrollRoot.clientHeight;
    scrollRoot.scrollTop = scrollRoot.scrollHeight;

    const screenRect = screen.getBoundingClientRect();
    const ctaRect = cta.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    return {
      computedSafeBottom,
      paddingBottom,
      maxScroll,
      scrollTop: scrollRoot.scrollTop,
      ctaClearance: screenRect.bottom - ctaRect.bottom,
      footerClearance: screenRect.bottom - footerRect.bottom,
    };
  });

  expect(metrics.computedSafeBottom).toBe(48);
  expect(metrics.paddingBottom).toBeGreaterThanOrEqual(metrics.computedSafeBottom);
  expect(metrics.maxScroll, 'preview perdeu rolagem vertical com inset inferior').toBeGreaterThan(0);
  expect(metrics.scrollTop, 'preview não chegou ao conteúdo inferior').toBeGreaterThan(0);
  expect(metrics.ctaClearance, 'CTA ficou sob a área reservada inferior').toBeGreaterThanOrEqual(metrics.computedSafeBottom);
  expect(metrics.footerClearance, 'rodapé ficou sob a área reservada inferior').toBeGreaterThanOrEqual(metrics.computedSafeBottom);
});

test('Onboarding Entry mantém estado de erro recuperável, foco e reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 720 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?v2-preview=onboarding-entry&width=412&state=error');

  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('alert')).toContainText('Não conseguimos carregar');
  await expect(device.getByRole('button', { name: 'Preparar meu assistente' })).toBeVisible();
  const ctaHeight = await device.locator('.v2-entry__continue').evaluate((element) => element.getBoundingClientRect().height);
  expect(ctaHeight).toBeGreaterThanOrEqual(48);
});
