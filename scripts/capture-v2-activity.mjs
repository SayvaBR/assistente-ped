import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const baseUrl = process.env.V2_PREVIEW_URL || 'http://127.0.0.1:5174';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 412, height: 1100 }, deviceScaleFactor: 1 });
await page.goto(`${baseUrl}/?v2-preview=activity&width=412`, { waitUntil: 'networkidle' });
await fs.mkdir('docs/qa/clean-room', { recursive: true });
const box = await page.locator('.v2-preview-device').boundingBox();
if (!box) throw new Error('Preview device did not render.');
await page.screenshot({ path: 'docs/qa/clean-room/activity-v2-412.png', clip: box });
await browser.close();
console.log('Saved docs/qa/clean-room/activity-v2-412.png');
