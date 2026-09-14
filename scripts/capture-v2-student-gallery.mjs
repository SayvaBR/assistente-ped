import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const baseUrl = process.env.V2_PREVIEW_URL || 'http://127.0.0.1:5174';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 980 }, deviceScaleFactor: 1 });
await page.goto(`${baseUrl}/?v2-preview=student-profile&width=390`, { waitUntil: 'networkidle' });
const device = page.locator('.v2-preview-device');
await device.getByRole('button', { name: 'Fotos' }).click();
await fs.mkdir('docs/qa/clean-room', { recursive: true });
const box = await device.boundingBox();
if (!box) throw new Error('Preview device did not render.');
await page.screenshot({ path: 'docs/qa/clean-room/student-gallery-empty-v2-390.png', clip: box });
await browser.close();
console.log('Saved docs/qa/clean-room/student-gallery-empty-v2-390.png');
