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

test('Onboarding Discovery aplica WindowInsets no scroll após avançar uma etapa', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 720 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Preparar meu assistente' })).toBeVisible();
  await page.getByRole('button', { name: 'Preparar meu assistente' }).click();

  const scroll = page.locator('.v2-first-run-scroll');
  await expect(scroll).toBeAttached();
  await expect(page.getByRole('heading', { name: /Vamos preparar o seu espaço juntos/ })).toBeVisible();
  await page.getByRole('button', { name: 'Vamos conversar' }).click();
  await expect(page.getByRole('heading', { name: /Como está a sua rotina hoje/ })).toBeVisible();

  const metrics = await scroll.evaluate((wrapper) => {
    const safeBottom = 48;
    document.documentElement.style.setProperty('--android-safe-bottom', `${safeBottom}px`);

    const screen = wrapper.querySelector<HTMLElement>('.v2-discovery__screen');
    const cta = wrapper.querySelector<HTMLElement>('.v2-discovery__continue');
    const footer = wrapper.querySelector<HTMLElement>('.v2-discovery__footer');
    if (!screen || !cta || !footer) throw new Error('Onboarding Discovery runtime elements missing');

    const computedAndroidSafeBottom = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--android-safe-bottom'));
    const safeToken = getComputedStyle(document.documentElement).getPropertyValue('--v2-safe-bottom').trim();
    const wrapperPaddingBottom = Number.parseFloat(getComputedStyle(wrapper).paddingBottom);
    const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
    wrapper.scrollTop = wrapper.scrollHeight;

    const wrapperRect = wrapper.getBoundingClientRect();
    const screenRect = screen.getBoundingClientRect();
    const ctaRect = cta.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    return {
      computedAndroidSafeBottom,
      safeToken,
      wrapperPaddingBottom,
      overflowY: getComputedStyle(wrapper).overflowY,
      maxScroll,
      scrollTop: wrapper.scrollTop,
      ctaClearance: wrapperRect.bottom - ctaRect.bottom,
      footerClearance: wrapperRect.bottom - footerRect.bottom,
    };
  });

  expect(metrics.computedAndroidSafeBottom).toBe(48);
  expect(metrics.safeToken).toContain('48px');
  expect(metrics.wrapperPaddingBottom).toBeGreaterThanOrEqual(48);
  expect(metrics.overflowY).toBe('auto');
  expect(metrics.maxScroll, 'onboarding discovery perdeu rolagem vertical').toBeGreaterThan(0);
  expect(metrics.scrollTop, 'onboarding discovery não rolou até o conteúdo inferior').toBeGreaterThan(0);
  expect(metrics.ctaClearance, 'CTA da discovery ficou sob a área reservada inferior').toBeGreaterThanOrEqual(48);
  expect(metrics.footerClearance, 'rodapé da discovery ficou sob a área reservada inferior').toBeGreaterThanOrEqual(48);
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
