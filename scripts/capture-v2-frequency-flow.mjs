import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.V2_PREVIEW_URL || 'http://127.0.0.1:5173';
const outputDir = 'docs/qa/clean-room';

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 1700 }, deviceScaleFactor: 1 });
await page.goto(`${baseUrl}/?v2-preview=home&width=390`, { waitUntil: 'networkidle' });

const home = page.locator('.v2-preview-device');
const homeBox = await home.boundingBox();
if (!homeBox) throw new Error('Home V2 não foi renderizada');
await page.screenshot({
  path: `${outputDir}/home-to-frequency-before-390.png`,
  clip: { x: Math.round(homeBox.x), y: Math.round(homeBox.y), width: Math.round(homeBox.width), height: Math.round(homeBox.height) },
  animations: 'disabled',
});

await page.getByRole('button', { name: 'Fazer chamada', exact: true }).click();
await page.waitForTimeout(100);
await page.addStyleTag({ content: '.v2-frequency, .v2-frequency__screen { min-height: auto !important; padding-bottom: 16px !important; } .v2-frequency__bottom-nav { position: static !important; }' });
const frequency = page.locator('.v2-preview-device');
const frequencyBox = await frequency.boundingBox();
if (!frequencyBox) throw new Error('Frequência V2 não foi renderizada após o toque');
await page.screenshot({
  path: `${outputDir}/home-to-frequency-after-390.png`,
  clip: { x: Math.round(frequencyBox.x), y: Math.round(frequencyBox.y), width: Math.round(frequencyBox.width), height: Math.round(frequencyBox.height) },
  animations: 'disabled',
});

await browser.close();
console.log(`Flow screenshots saved: ${outputDir}/home-to-frequency-before-390.png, ${outputDir}/home-to-frequency-after-390.png`);
