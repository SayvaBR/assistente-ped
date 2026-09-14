import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (file: string) => readFileSync(resolve(process.cwd(), file), 'utf8');

describe('onboarding Android inset contract', () => {
  it('uses the merged V2 safe-area tokens for both onboarding screens', () => {
    const entryCss = read('src/v2/screens/onboarding-entry-v2.css');
    const discoveryCss = read('src/v2/screens/onboarding-discovery-v2.css');

    for (const css of [entryCss, discoveryCss]) {
      expect(css).toContain('var(--v2-safe-top, 0px)');
      expect(css).toContain('var(--v2-safe-bottom, 0px)');
      expect(css).not.toMatch(/env\(safe-area-inset-(top|bottom)\)/);
    }
  });

  it('keeps the discovery flow scrollable with inset-aware trailing space', () => {
    const foundationCss = read('src/v2/styles/foundation.css');

    expect(foundationCss).toContain('.v2-first-run-scroll');
    expect(foundationCss).toContain('overflow-y: auto');
    expect(foundationCss).toContain('var(--v2-safe-bottom, 0px)');
  });
});
