import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.V2_PREVIEW_URL || 'http://127.0.0.1:5173';
const outputDir = 'docs/qa/clean-room';

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });

await page.goto(`${baseUrl}/?v2-preview=home&width=390`, { waitUntil: 'networkidle' });
const device = page.locator('.v2-preview-device');
const box = await device.boundingBox();
if (!box) throw new Error('V2 preview device was not rendered');
await page.screenshot({
  path: `${outputDir}/home-v2-clean-room-390.png`,
  clip: {
    x: Math.round(box.x),
    y: Math.round(box.y),
    width: Math.round(box.width),
    height: Math.round(box.height),
  },
  animations: 'disabled',
});

await browser.close();
console.log(`Screenshot saved: ${outputDir}/home-v2-clean-room-390.png`);
