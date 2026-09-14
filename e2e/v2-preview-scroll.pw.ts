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
    expect(after, `conteúdo inferior de ${preview} não foi encontrado`).not.toBeNull();
    expect(after?.top, `conteúdo inferior de ${preview} não ficou visível`).toBeGreaterThanOrEqual(0);
    expect(after?.bottom, `conteúdo inferior de ${preview} saiu do viewport`).toBeLessThanOrEqual(720);
  });
}
