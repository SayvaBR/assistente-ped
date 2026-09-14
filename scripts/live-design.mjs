import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const preview = (args.find((arg) => !arg.startsWith('--')) || 'home').trim();
const widthArg = args.find((arg) => arg.startsWith('--width='));
const width = Number(widthArg?.split('=')[1] || 412);
const host = '127.0.0.1';
const port = 5173;

if (!/^[a-z0-9-]+$/i.test(preview)) {
  console.error('[live-design] preview inválido. Use letras, números e hífen.');
  process.exit(2);
}

if (!Number.isFinite(width) || width < 280 || width > 1200) {
  console.error('[live-design] width inválida.');
  process.exit(2);
}

const baseUrl = `http://${host}:${port}`;
const surfaceUrl = `${baseUrl}/?v2-preview=${encodeURIComponent(preview)}&width=${Math.round(width)}`;

async function isReady() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(750) });
    return response.ok || response.status < 500;
  } catch {
    return false;
  }
}

function printReady(existing) {
  console.log('');
  console.log(`[live-design] ${existing ? 'Vite existente detectado' : 'Vite pronto'}.`);
  console.log(`[live-design] LIVE_DESIGN_URL=${surfaceUrl}`);
  console.log('[live-design] Mantenha essa superfície aberta no navegador do Codex durante a iteração.');
  console.log('[live-design] Fluxo: edit -> HMR -> observe -> inspect DOM/CSS if useful -> fix -> observe again.');
  console.log('');
}

if (await isReady()) {
  printReady(true);
  process.exit(0);
}

const viteBin = resolve('node_modules/vite/bin/vite.js');
const child = spawn(process.execPath, [viteBin, '--host', host, '--port', String(port), '--strictPort'], {
  stdio: 'inherit',
  env: process.env,
});

let readyPrinted = false;
const startedAt = Date.now();
const poll = setInterval(async () => {
  if (readyPrinted) return;
  if (await isReady()) {
    readyPrinted = true;
    clearInterval(poll);
    printReady(false);
  } else if (Date.now() - startedAt > 15000) {
    clearInterval(poll);
    console.error('[live-design] Vite não ficou pronto em 15s. Verifique a saída acima.');
  }
}, 150);

const stop = (signal) => {
  clearInterval(poll);
  if (!child.killed) child.kill(signal);
};

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

child.on('exit', (code, signal) => {
  clearInterval(poll);
  if (signal) process.exit(0);
  process.exit(code ?? 1);
});
