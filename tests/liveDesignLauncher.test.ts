import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const launcher = join(repoRoot, 'scripts', 'live-design.mjs');
const testRoot = join(tmpdir(), `assistente-live-design-${process.pid}`);
const children: ChildProcessWithoutNullStreams[] = [];

mkdirSync(testRoot, { recursive: true });

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

async function stop(child: ChildProcessWithoutNullStreams) {
  if (child.exitCode !== null || child.signalCode !== null) return;
  if (process.platform === 'win32') {
    await new Promise<void>((resolve) => {
      execFile('taskkill', ['/pid', String(child.pid), '/t', '/f'], () => resolve());
    });
  } else child.kill('SIGTERM');
  await waitForExit(child);
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

    const reused = runLauncher(['home', '--width=480'], {
      LIVE_DESIGN_PORT: port,
      LIVE_DESIGN_MARKER: ownerMarker,
    });
    expect(await waitForExit(reused.child)).toBe(0);
    expect(reused.output).toContain('Vite existente detectado');
    expect(reused.output).toContain('width=480');

    const foreign = runLauncher(['home'], {
      LIVE_DESIGN_PORT: port,
      LIVE_DESIGN_MARKER: foreignMarker,
    });
    expect(await waitForExit(foreign.child)).not.toBe(0);
    expect(foreign.output).toContain('Port 46103 is already in use');

    await stop(owner.child);
    if (process.platform === 'win32') rmSync(ownerMarker, { force: true });
    expect(existsSync(ownerMarker)).toBe(false);
  });
});
