import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const args = process.argv.slice(2);
if (args[0] === '--') args.shift();

const screen = args[0] || 'onboarding-entry';
const width = Number(args[1] || 412);
const output = args[2] || `docs/qa/ui-lab/${screen}-${width}.png`;

mkdirSync('docs/qa/ui-lab', { recursive: true });
const url = screen === 'onboarding-entry'
  ? `http://127.0.0.1:5173/?v2-preview=${encodeURIComponent(screen)}&width=${width}`
  : `http://127.0.0.1:5173/__lab?screen=${encodeURIComponent(screen)}&width=${width}`;
const screenshotArgs = [
  'exec', 'playwright', 'screenshot', '--browser', 'chromium',
  '--viewport-size', `${width},844`, '--wait-for-timeout', '250', '--full-page', url, output,
];

const require = createRequire(import.meta.url);
const playwrightTestEntry = require.resolve('@playwright/test');
const playwrightCli = join(dirname(dirname(dirname(playwrightTestEntry))), 'playwright', 'cli.js');
execFileSync(process.execPath, [playwrightCli, ...screenshotArgs.slice(2)], { stdio: 'inherit' });
