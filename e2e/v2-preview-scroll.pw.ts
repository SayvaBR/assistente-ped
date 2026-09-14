import { expect, test } from '@playwright/test';

const surfaces = [
  { preview: 'planning-day', marker: 'Atividades para levar' },
  { preview: 'files', marker: 'BNCC_2024.pdf' },
  { preview: 'student-profile', marker: 'Remover Ana Clara Souza da turma' },
  { preview: 'planning-week', marker: 'Criar plano neste dia' },
] as const;

for (const { preview, marker } of surfaces) {
  test(`${preview} mantém rolagem vertical real no preview`, async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 720 });
    await page.goto(`/?v2-preview=${preview}&width=412`);

    const device = page.locator('.v2-preview-device');
    await expect(device.getByText(marker, { exact: false }).last()).toBeAttached();

    const before = await page.evaluate(() => ({
      maxScroll: document.documentElement.scrollHeight - innerHeight,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      toolbarPosition: getComputedStyle(document.querySelector('.v2-preview-toolbar')!).position,
      deviceOverflowY: getComputedStyle(document.querySelector('.v2-preview-device')!).overflowY,
    }));
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const after = await page.evaluate((text) => {
      const element = [...document.querySelectorAll('h1,h2,h3,p,button,a')]
        .find((candidate) => candidate.textContent?.includes(text));
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    }, marker);

    expect(before.maxScroll, `preview ${preview} não tem altura rolável`).toBeGreaterThan(0);
    expect(before.horizontalOverflow, `preview ${preview} tem scroll horizontal`).toBe(false);
    expect(before.toolbarPosition, 'toolbar não deve cobrir a superfície durante o scroll móvel').toBe('static');
    expect(before.deviceOverflowY, 'harness voltou a ocultar a rolagem vertical do device').toBe('visible');
    expect(after, `conteúdo inferior de ${preview} não foi encontrado`).not.toBeNull();
    expect(after?.top, `conteúdo inferior de ${preview} não ficou visível`).toBeGreaterThanOrEqual(0);
    expect(after?.bottom, `conteúdo inferior de ${preview} saiu do viewport`).toBeLessThanOrEqual(720);

    if (preview === 'planning-day') {
      const clearance = await page.evaluate(() => {
        const card = document.querySelector('.v2-planning-day__activity');
        const bottomNav = document.querySelector('.v2-planning-day__bottom-nav');
        return { cardBottom: card?.getBoundingClientRect().bottom, navTop: bottomNav?.getBoundingClientRect().top };
      });
      expect(clearance.cardBottom, 'card inferior não foi medido').toBeLessThanOrEqual(clearance.navTop ?? 0);
    }
  });
}

for (const width of [360, 412, 480] as const) {
  test(`UI Lab mantém rolagem vertical real em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 720 });
    await page.goto(`/__lab?screen=onboarding-entry&width=${width}`);

    const device = page.locator('.ui-lab__device');
    await expect(device).toBeAttached();

    const before = await page.evaluate(() => ({
      maxScroll: document.documentElement.scrollHeight - innerHeight,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      deviceOverflowY: getComputedStyle(document.querySelector('.ui-lab__device')!).overflowY,
    }));
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const after = await page.evaluate(() => {
      const device = document.querySelector('.ui-lab__device');
      const rect = device?.getBoundingClientRect();
      return { top: rect?.top, bottom: rect?.bottom };
    });

    expect(before.maxScroll, `UI Lab ${width}px não tem altura rolável`).toBeGreaterThan(0);
    expect(before.horizontalOverflow, `UI Lab ${width}px tem scroll horizontal`).toBe(false);
    expect(before.deviceOverflowY, 'UI Lab voltou a ocultar a rolagem vertical do device').toBe('visible');
    expect(after?.bottom, `UI Lab ${width}px não chegou ao conteúdo inferior`).toBeLessThanOrEqual(720);
  });
}

test('preview preserva rolagem vertical sem expor overflow horizontal em device estreito', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 720 });
  await page.goto('/?v2-preview=notifications&width=320');

  const metrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    deviceOverflowY: getComputedStyle(document.querySelector('.v2-preview-device')!).overflowY,
    maxScroll: document.documentElement.scrollHeight - innerHeight,
  }));

  expect(metrics.documentWidth, 'preview estreito expôs scroll horizontal no harness').toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.deviceOverflowY, 'preview estreito perdeu a rolagem vertical').toBe('visible');
  expect(metrics.maxScroll, 'preview estreito não mantém rolagem vertical').toBeGreaterThan(0);
});
