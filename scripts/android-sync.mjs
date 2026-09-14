import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('../', import.meta.url));
const skipBuild = process.argv.includes('--skip-build');
const commands = [
  ...(skipBuild
    ? []
    : [
        ['node_modules/typescript/bin/tsc', '--noEmit'],
        ['node_modules/vite/bin/vite.js', 'build'],
      ]),
  ['node_modules/@capacitor/cli/bin/capacitor', 'sync', 'android'],
];

for (const args of commands) {
  const result = spawnSync(process.execPath, args, { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
