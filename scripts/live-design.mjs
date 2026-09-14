import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const requestedPreview = (args.find((arg) => !arg.startsWith('--')) || 'home').trim();
const preview = requestedPreview === 'frequency' ? 'attendance' : requestedPreview;
const widthArg = args.find((arg) => arg.startsWith('--width='));
const width = Number(widthArg?.split('=')[1] || 412);
const host = '127.0.0.1';
const port = 5173;
const supportedPreviews = new Set([
  'home', 'splash', 'onboarding', 'wizard', 'new-student', 'attendance', 'observation', 'commitments',
  'planning-overview', 'planning-day', 'planning-week', 'planning-month', 'class-manager', 'classes',
  'class-workspace', 'student-profile', 'profile', 'files', 'more', 'activity', 'plan-editor', 'bncc',
  'reports', 'settings', 'appearance', 'subscription', 'privacy', 'backup', 'notifications', 'tools',
  'help', 'legal', 'trash', 'organization', 'academic',
]);
const supportedWidths = new Set([320, 360, 390, 412, 432, 480, 600]);

if (!supportedPreviews.has(preview)) {
  console.error(`[live-design] preview inválido: ${requestedPreview}. Use uma superfície suportada do V2.`);
  process.exit(2);
}

if (!supportedWidths.has(width)) {
  console.error(`[live-design] width inválida: ${width}. Use 320, 360, 390, 412, 432, 480 ou 600.`);
  process.exit(2);
}

const baseUrl = `http://${host}:${port}`;
const surfaceUrl = `${baseUrl}/?v2-preview=${encodeURIComponent(preview)}&width=${Math.round(width)}`;

async function isReady() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(750) });
    if (!response.ok) return false;
    const body = await response.text();
    if (!body.includes('/@vite/client') || !body.includes('/src/main.tsx') || !body.includes('<title>Assistente Pedagógico</title>')) return false;
    const previewModule = await fetch(`${baseUrl}/src/v2/preview/V2Preview.tsx`, { signal: AbortSignal.timeout(750) });
    return previewModule.ok && (await previewModule.text()).includes('export function V2Preview');
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
} else {

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
    stop('SIGTERM');
    process.exitCode = 1;
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
}
