import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const normalizedArgs = args[0] === '--' ? args.slice(1) : args;
const [preview = 'home', ...expectedParts] = normalizedArgs;
const expectedText = expectedParts.join(' ');
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

console.log(`[adaptive-checkpoint] preview=${preview} widths=360,412,480${expectedText ? ` expect=${expectedText}` : ''}`);

const result = spawnSync(
  pnpm,
  ['exec', 'playwright', 'test', 'e2e/v2-adaptive-checkpoint.pw.ts', '--config', 'playwright.config.ts', '--reporter=line'],
  {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      V2_PREVIEW: preview,
      V2_EXPECT: expectedText,
    },
  },
);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
