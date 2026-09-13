import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const baseUrl = process.env.V2_PREVIEW_URL || 'http://127.0.0.1:5174';
const browser = await chromium.launch({ headless: true });
await fs.mkdir('docs/qa/clean-room', { recursive: true });
for (const [view, file] of [['planning-day', 'planning-day-v2-412.png'], ['planning-week', 'planning-week-v2-412.png'], ['planning-month', 'planning-month-v2-412.png']]) {
  const page = await browser.newPage({ viewport: { width: 412, height: 980 }, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/?v2-preview=${view}&width=412`, { waitUntil: 'networkidle' });
  const box = await page.locator('.v2-preview-device').boundingBox();
  if (!box) throw new Error(`Preview device did not render for ${view}.`);
  await page.screenshot({ path: `docs/qa/clean-room/${file}`, clip: box });
  await page.close();
}
await browser.close();
console.log('Saved planning day/week/month V2 captures.');
