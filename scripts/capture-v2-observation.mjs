import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.V2_PREVIEW_URL || 'http://127.0.0.1:5174';
const outputDir = 'docs/qa/clean-room';
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const [name, query] of [
  ['observation-picker-412', ''],
  ['observation-form-412', '&student=ana'],
]) {
  const page = await browser.newPage({ viewport: { width: 412, height: 1800 }, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/?v2-preview=observation&width=412${query}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.v2-observation, .v2-observation__screen { min-height: auto !important; padding-bottom: 16px !important; } .v2-observation__bottom-nav { position: static !important; }' });
  const device = page.locator('.v2-preview-device');
  const box = await device.boundingBox();
  if (!box) throw new Error(`Observation preview ${name} was not rendered`);
  await page.screenshot({
    path: `${outputDir}/${name}.png`,
    clip: { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) },
    animations: 'disabled',
  });
  await page.close();
}
await browser.close();
console.log('Observation V2 screenshots saved at 412px');
