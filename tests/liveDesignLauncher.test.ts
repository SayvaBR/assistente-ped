import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const launcher = join(repoRoot, 'scripts', 'live-design.mjs');
const testRoot = join(tmpdir(), `assistente-live-design-${process.pid}`);
const children: ChildProcessWithoutNullStreams[] = [];

mkdirSync(testRoot, { recursive: true });

beforeEach(() => mkdirSync(testRoot, { recursive: true }));

function runLauncher(args: string[], env: Record<string, string>) {
  const child = spawn(process.execPath, [launcher, ...args], {
    cwd: repoRoot,
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  children.push(child);
  let output = '';
  child.stdout.on('data', (chunk) => { output += chunk.toString(); });
  child.stderr.on('data', (chunk) => { output += chunk.toString(); });
  return { child, get output() { return output; } };
}

function waitForExit(child: ChildProcessWithoutNullStreams) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve(child.exitCode ?? 1);
  return new Promise<number>((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code) => resolve(code ?? 1));
  });
}

async function waitForOutput(run: ReturnType<typeof runLauncher>, text: string) {
  const started = Date.now();
  while (!run.output.includes(text)) {
    if (run.child.exitCode !== null) throw new Error(`launcher exited before ${text}: ${run.output}`);
    if (Date.now() - started > 20_000) throw new Error(`timed out waiting for ${text}: ${run.output}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function waitForProcessGone(pid: number) {
  const started = Date.now();
  while (Date.now() - started < 5_000) {
    try { process.kill(pid, 0); } catch { return; }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`process ${pid} did not exit`);
}

async function stop(child: ChildProcessWithoutNullStreams) {
  if (child.exitCode !== null || child.signalCode !== null) return;
  child.kill('SIGINT');
  try {
    await Promise.race([
      waitForExit(child),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('graceful stop timed out')), 5_000)),
    ]);
  } catch {
    await new Promise<void>((resolve) => {
      execFile('taskkill', ['/pid', String(child.pid), '/t', '/f'], () => resolve());
    });
    await waitForExit(child);
  }
}

afterEach(async () => {
  await Promise.all(children.map(stop));
  children.length = 0;
  rmSync(testRoot, { recursive: true, force: true });
});

describe('live design launcher ownership', () => {
  it('rejects unsupported preview and width before touching the server', async () => {
    const marker = join(testRoot, 'invalid-marker.json');
    const invalidPreview = runLauncher(['does-not-exist'], {
      LIVE_DESIGN_PORT: '46101',
      LIVE_DESIGN_MARKER: marker,
    });
    expect(await waitForExit(invalidPreview.child)).toBe(2);
    expect(invalidPreview.output).toContain('preview inválido');
    expect(existsSync(marker)).toBe(false);

    const invalidWidth = runLauncher(['home', '--width=500'], {
      LIVE_DESIGN_PORT: '46102',
      LIVE_DESIGN_MARKER: marker,
    });
    expect(await waitForExit(invalidWidth.child)).toBe(2);
    expect(invalidWidth.output).toContain('width inválida');
    expect(existsSync(marker)).toBe(false);
  });

  it('reuses only its own marker and fails closed on an occupied port', async () => {
    const port = '46103';
    const ownerMarker = join(testRoot, 'owner-marker.json');
    const foreignMarker = join(testRoot, 'foreign-marker.json');
    const owner = runLauncher(['home', '--width=412'], {
      LIVE_DESIGN_PORT: port,
      LIVE_DESIGN_MARKER: ownerMarker,
    });
    await waitForOutput(owner, 'LIVE_DESIGN_URL=http://127.0.0.1:46103/');
    expect(existsSync(ownerMarker)).toBe(true);

    const missingModeMarker = join(testRoot, 'missing-mode-marker.json');
    const ownerMarkerData = JSON.parse(readFileSync(ownerMarker, 'utf8')) as Record<string, unknown>;
    delete ownerMarkerData.mode;
    writeFileSync(missingModeMarker, JSON.stringify(ownerMarkerData));
    const missingMode = runLauncher(['home'], {
      LIVE_DESIGN_PORT: port,
      LIVE_DESIGN_MARKER: missingModeMarker,
    });
    expect(await waitForExit(missingMode.child)).not.toBe(0);
    expect(missingMode.output).toContain('Port 46103 is already in use');
    expect(existsSync(missingModeMarker)).toBe(false);

    writeFileSync(foreignMarker, JSON.stringify({ cwd: 'C:\\another-worktree', pid: process.pid }));

    const reused = runLauncher(['home', '--width=480'], {
      LIVE_DESIGN_PORT: port,
      LIVE_DESIGN_MARKER: ownerMarker,
    });
    expect(await waitForExit(reused.child)).toBe(0);
    expect(reused.output).toContain('Vite existente detectado');
    expect(reused.output).toContain('width=480');

    const occupiedMarker = join(testRoot, 'occupied-marker.json');
    const occupied = runLauncher(['home'], {
      LIVE_DESIGN_PORT: port,
      LIVE_DESIGN_MARKER: occupiedMarker,
    });
    expect(await waitForExit(occupied.child)).not.toBe(0);
    expect(occupied.output).toContain('Port 46103 is already in use');
    expect(existsSync(occupiedMarker)).toBe(false);

    const foreign = runLauncher(['home'], {
      LIVE_DESIGN_PORT: port,
      LIVE_DESIGN_MARKER: foreignMarker,
    });
    expect(await waitForExit(foreign.child)).not.toBe(0);
    expect(foreign.output).toContain('marker estrangeiro');
    expect(existsSync(foreignMarker)).toBe(true);

    await stop(owner.child);
  });

  it('discards stale markers and reports startup timeout with cleanup', async () => {
    const marker = join(testRoot, 'stale-marker.json');
    const fakeVite = join(testRoot, 'fake-vite.mjs');
    const fakePidFile = join(testRoot, 'fake-vite.pid');
    writeFileSync(marker, JSON.stringify({
      cwd: process.cwd(),
      pid: process.pid,
      viteBin: fakeVite,
    }));
    writeFileSync(fakeVite, "import { writeFileSync } from 'node:fs'; writeFileSync(process.env.FAKE_PID_FILE, String(process.pid)); setInterval(() => {}, 1000);\n");

    const timedOut = runLauncher(['home'], {
      LIVE_DESIGN_PORT: '46104',
      LIVE_DESIGN_MARKER: marker,
      LIVE_DESIGN_VITE_BIN: fakeVite,
      FAKE_PID_FILE: fakePidFile,
      LIVE_DESIGN_STARTUP_TIMEOUT_MS: '300',
      LIVE_DESIGN_POLL_INTERVAL_MS: '50',
    });
    expect(await waitForExit(timedOut.child)).toBe(1);
    expect(timedOut.output).toContain('não ficou pronto em 300ms');
    expect(existsSync(marker)).toBe(false);
    expect(existsSync(`${marker}.lock`)).toBe(false);
    await waitForProcessGone(Number(readFileSync(fakePidFile, 'utf8')));
  });

  it('fails closed when an old startup lock remains', async () => {
    const marker = join(testRoot, 'blocked-marker.json');
    writeFileSync(`${marker}.lock`, JSON.stringify({ cwd: process.cwd(), launcherPid: 999999, viteBin: 'vite.js' }));
    const blocked = runLauncher(['home'], {
      LIVE_DESIGN_PORT: '46107',
      LIVE_DESIGN_MARKER: marker,
    });
    expect(await waitForExit(blocked.child)).toBe(1);
    expect(blocked.output).toContain('startup lock ocupado');
    expect(existsSync(`${marker}.lock`)).toBe(true);
  });

  it('rolls back the child when marker ownership changes during startup', async () => {
    const marker = join(testRoot, 'claim-race-marker.json');
    const fakeVite = join(testRoot, 'claim-race-vite.mjs');
    const fakePidFile = join(testRoot, 'claim-race-vite.pid');
    writeFileSync(fakeVite, "import { writeFileSync } from 'node:fs'; writeFileSync(process.env.FAKE_PID_FILE, String(process.pid)); setInterval(() => {}, 1000);\n");
    const launching = runLauncher(['home'], {
      LIVE_DESIGN_PORT: '46105',
      LIVE_DESIGN_MARKER: marker,
      LIVE_DESIGN_VITE_BIN: fakeVite,
      LIVE_DESIGN_MARKER_UPDATE_DELAY_MS: '500',
      FAKE_PID_FILE: fakePidFile,
    });
    while (!existsSync(marker) || !readFileSync(marker, 'utf8').includes('"phase":"starting"') || !existsSync(fakePidFile)) {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    writeFileSync(marker, JSON.stringify({ cwd: 'C:\\foreign-worktree', launcherPid: process.pid, phase: 'foreign' }));
    expect(await waitForExit(launching.child)).toBe(1);
    expect(launching.output).toContain('ownership do marker');
    expect(readFileSync(marker, 'utf8')).toContain('foreign-worktree');
    expect(existsSync(`${marker}.lock`)).toBe(false);
    await waitForProcessGone(Number(readFileSync(fakePidFile, 'utf8')));
  });

  it('serializes two launchers reclaiming the same stale marker', async () => {
    const marker = join(testRoot, 'concurrent-marker.json');
    const fakeVite = join(testRoot, 'concurrent-vite.mjs');
    const fakePidFile = join(testRoot, 'concurrent-vite.pid');
    writeFileSync(marker, JSON.stringify({ cwd: process.cwd(), pid: 999999, viteBin: fakeVite }));
    writeFileSync(fakeVite, "import { writeFileSync } from 'node:fs'; writeFileSync(process.env.FAKE_PID_FILE, String(process.pid)); setInterval(() => {}, 1000);\n");

    const delayed = runLauncher(['home'], {
      LIVE_DESIGN_PORT: '46106',
      LIVE_DESIGN_MARKER: marker,
      LIVE_DESIGN_VITE_BIN: fakeVite,
      LIVE_DESIGN_CLAIM_DELAY_MS: '500',
      LIVE_DESIGN_STARTUP_TIMEOUT_MS: '1000',
      FAKE_PID_FILE: fakePidFile,
    });
    await new Promise((resolve) => setTimeout(resolve, 150));
    const winner = runLauncher(['home'], {
      LIVE_DESIGN_PORT: '46106',
      LIVE_DESIGN_MARKER: marker,
      LIVE_DESIGN_VITE_BIN: fakeVite,
      LIVE_DESIGN_STARTUP_TIMEOUT_MS: '400',
      LIVE_DESIGN_POLL_INTERVAL_MS: '50',
      FAKE_PID_FILE: fakePidFile,
    });

    const delayedCode = await waitForExit(delayed.child);
    expect(delayedCode).toBe(1);
    expect(delayed.output).toContain('startup lock ocupado');
    const winnerCode = await waitForExit(winner.child);
    expect(winnerCode).toBe(1);
    expect(winner.output).toContain('não ficou pronto em 400ms');
    expect(existsSync(marker)).toBe(false);
    expect(existsSync(`${marker}.lock`)).toBe(false);
    await waitForProcessGone(Number(readFileSync(fakePidFile, 'utf8')));
  });
});
