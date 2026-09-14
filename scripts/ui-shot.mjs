import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
if (args[0] === '--') args.shift();

const screen = args[0] || 'onboarding-entry';
const width = Number(args[1] || 390);
const output = args[2] || `docs/qa/ui-lab/${screen}-${width}.png`;

mkdirSync('docs/qa/ui-lab', { recursive: true });
const url = `http://127.0.0.1:5173/__lab?width=${width}`;
const shellUrl = url;
const shellOutput = output.replaceAll(' ', '^ ');
const command = `pnpm exec playwright screenshot --browser chromium --viewport-size=${width},844 --wait-for-timeout 250 --full-page ${shellUrl} ${shellOutput}`;

if (process.platform === 'win32') {
  execFileSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', command], { stdio: 'inherit' });
} else {
  execFileSync('pnpm', [
    'exec', 'playwright', 'screenshot', '--browser', 'chromium',
    '--viewport-size', `${width},844`, '--wait-for-timeout', '250', '--full-page', url, output,
  ], { stdio: 'inherit' });
}
