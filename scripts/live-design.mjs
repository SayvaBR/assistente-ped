import { execFileSync, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const args = process.argv.slice(2);
const requestedPreview = (args.find((arg) => !arg.startsWith('--')) || 'home').trim();
const preview = requestedPreview === 'frequency' ? 'attendance' : requestedPreview;
const widthArg = args.find((arg) => arg.startsWith('--width='));
const width = Number(widthArg?.split('=')[1] || 412);
const host = '127.0.0.1';
const port = Number(process.env.LIVE_DESIGN_PORT || 5173);
const startupTimeoutMs = Number(process.env.LIVE_DESIGN_STARTUP_TIMEOUT_MS || 15000);
const pollIntervalMs = Number(process.env.LIVE_DESIGN_POLL_INTERVAL_MS || 150);
const markerUpdateDelayMs = Number(process.env.LIVE_DESIGN_MARKER_UPDATE_DELAY_MS || 0);
const claimDelayMs = Number(process.env.LIVE_DESIGN_CLAIM_DELAY_MS || 0);
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
const markerPath = resolve(process.env.LIVE_DESIGN_MARKER || 'tmp/live-design-server.json');
const viteBin = resolve(process.env.LIVE_DESIGN_VITE_BIN || 'node_modules/vite/bin/vite.js');
const startupLockPath = `${markerPath}.lock`;
const liveDesignToken = randomUUID();

function removeOwnedMarker(expectedPid) {
  try {
    const marker = JSON.parse(readFileSync(markerPath, 'utf8'));
    if (marker.cwd !== process.cwd() || marker.launcherPid !== process.pid) return;
    if (expectedPid !== undefined && marker.pid !== expectedPid) return;
    unlinkSync(markerPath);
  } catch { /* stale marker already gone */ }
}

function removeStaleMarker() {
  try {
    const marker = JSON.parse(readFileSync(markerPath, 'utf8'));
    if (marker.cwd === process.cwd()) unlinkSync(markerPath);
  } catch { /* stale marker already gone */ }
}

function removeOwnedStartupLock() {
  try {
    const lock = JSON.parse(readFileSync(startupLockPath, 'utf8'));
    if (lock.cwd === process.cwd() && lock.launcherPid === process.pid) unlinkSync(startupLockPath);
  } catch { /* stale lock already gone */ }
}

function claimStartupLock() {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      mkdirSync(dirname(startupLockPath), { recursive: true });
      writeFileSync(startupLockPath, JSON.stringify({ cwd: process.cwd(), launcherPid: process.pid, viteBin, mode: liveDesignToken }), { flag: 'wx' });
      return true;
    } catch {
      try {
        const lock = JSON.parse(readFileSync(startupLockPath, 'utf8'));
        if (lock.cwd !== process.cwd()) return false;
        process.kill(lock.launcherPid, 0);
        if (isLiveLauncher(lock.launcherPid)) return false;
      } catch { /* stale lock remains fail-closed for explicit recovery */ }
      return false;
    }
  }
  return false;
}

function processCommandLine(pid) {
  try {
    let commandLine = '';
    if (process.platform === 'win32') {
      commandLine = execFileSync('powershell.exe', [
        '-NoProfile', '-NonInteractive', '-Command',
        `(Get-CimInstance Win32_Process -Filter \"ProcessId = ${pid}\").CommandLine`,
      ], { encoding: 'utf8' });
    } else if (process.platform === 'linux') {
      commandLine = readFileSync(`/proc/${pid}/cmdline`, 'utf8').replaceAll('\0', ' ');
    } else {
      commandLine = execFileSync('ps', ['-p', String(pid), '-o', 'command='], { encoding: 'utf8' });
    }
    return commandLine;
  } catch {
    return '';
  }
}

function isExpectedProcess(pid, expectedPath, expectedToken) {
  const commandLine = processCommandLine(pid).toLowerCase().replaceAll('\\', '/');
  return commandLine.includes(expectedPath.toLowerCase().replaceAll('\\', '/'))
    && (!expectedToken || commandLine.includes(`--mode ${expectedToken}`.toLowerCase()));
}

function isLiveLauncher(pid) {
  return isExpectedProcess(pid, resolve('scripts/live-design.mjs'));
}

function markerState() {
  if (!existsSync(markerPath)) return 'missing';
  try {
    const marker = JSON.parse(readFileSync(markerPath, 'utf8'));
    if (marker.cwd !== process.cwd()) return 'foreign';
    if (marker.viteBin !== viteBin) return 'stale';
    if (marker.phase === 'starting') {
      if (!Number.isInteger(marker.launcherPid)) return 'stale';
      process.kill(marker.launcherPid, 0);
      return isLiveLauncher(marker.launcherPid) ? 'foreign' : 'stale';
    }
    if (!Number.isInteger(marker.pid)) return 'stale';
    process.kill(marker.pid, 0);
    return isExpectedProcess(marker.pid, viteBin, marker.mode) ? 'owned' : 'stale';
  } catch {
    return 'stale';
  }
}

async function isReady() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(750) });
    if (!response.ok) return false;
    const body = await response.text();
    if (!body.includes('/@vite/client') || !body.includes('/src/main.tsx') || !body.includes('assistente-pedagogico-dev-surface')) return false;
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

const initialMarkerState = markerState();
if (initialMarkerState === 'foreign') {
  console.error(`[live-design] marker estrangeiro detectado em ${markerPath}; não sobrescrevendo.`);
  process.exit(1);
}

const ownedServer = initialMarkerState === 'owned';
if (ownedServer) {
  if (await isReady()) {
    printReady(true);
  } else {
    console.error('[live-design] Vite deste checkout ainda está iniciando; não iniciando um segundo servidor.');
    process.exit(1);
  }
} else {
  if (claimDelayMs > 0) await new Promise((resolve) => setTimeout(resolve, claimDelayMs));
  if (!claimStartupLock()) {
    console.error(`[live-design] startup lock ocupado em ${startupLockPath}; não iniciando um segundo servidor.`);
    process.exit(1);
  }
  if (initialMarkerState === 'stale') removeStaleMarker();

try {
  mkdirSync(dirname(markerPath), { recursive: true });
  writeFileSync(markerPath, JSON.stringify({
    cwd: process.cwd(),
    launcherPid: process.pid,
    mode: liveDesignToken,
    phase: 'starting',
    viteBin,
  }), { flag: 'wx' });
} catch {
  console.error(`[live-design] não foi possível assumir o marker ${markerPath}; outro launcher já o possui.`);
  process.exit(1);
}

const child = spawn(process.execPath, [viteBin, '--host', host, '--port', String(port), '--strictPort', '--mode', liveDesignToken], {
  stdio: 'inherit',
  env: process.env,
});
if (!child.pid) {
  removeOwnedMarker();
  removeOwnedStartupLock();
  console.error('[live-design] não foi possível iniciar o processo Vite.');
  process.exit(1);
}
const childExit = new Promise((resolve) => child.once('exit', resolve));
const markerTempPath = `${markerPath}.${process.pid}.tmp`;
try {
  if (markerUpdateDelayMs > 0) await new Promise((resolve) => setTimeout(resolve, markerUpdateDelayMs));
  const startingMarker = JSON.parse(readFileSync(markerPath, 'utf8'));
  if (startingMarker.cwd !== process.cwd() || startingMarker.launcherPid !== process.pid || startingMarker.phase !== 'starting') {
    throw new Error('marker ownership changed before Vite became ready');
  }
  writeFileSync(markerTempPath, JSON.stringify({ cwd: process.cwd(), launcherPid: process.pid, mode: liveDesignToken, phase: 'running', pid: child.pid, viteBin }), { flag: 'wx' });
  renameSync(markerTempPath, markerPath);
} catch (error) {
  try { unlinkSync(markerTempPath); } catch { /* temporary marker already gone */ }
  if (!child.killed) child.kill('SIGTERM');
  await childExit;
  removeOwnedMarker();
  removeOwnedStartupLock();
  console.error(`[live-design] não foi possível finalizar o ownership do marker: ${error.message}`);
  process.exit(1);
}

  let readyPrinted = false;
  let startupTimedOut = false;
const startedAt = Date.now();
const poll = setInterval(async () => {
  if (readyPrinted) return;
  if (await isReady()) {
    readyPrinted = true;
    clearInterval(poll);
    printReady(false);
  } else if (Date.now() - startedAt > startupTimeoutMs) {
    clearInterval(poll);
    console.error(`[live-design] Vite não ficou pronto em ${startupTimeoutMs}ms. Verifique a saída acima.`);
    startupTimedOut = true;
    stop('SIGTERM');
    process.exitCode = 1;
  }
}, pollIntervalMs);

const stop = (signal) => {
  clearInterval(poll);
  if (!child.killed) child.kill(signal);
};

process.on('exit', () => {
  removeOwnedMarker(child.pid);
  removeOwnedStartupLock();
});
process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

  child.on('exit', (code, signal) => {
    clearInterval(poll);
    removeOwnedMarker(child.pid);
    removeOwnedStartupLock();
    if (signal) process.exit(startupTimedOut ? 1 : 0);
  process.exit(code ?? 1);
});
}
