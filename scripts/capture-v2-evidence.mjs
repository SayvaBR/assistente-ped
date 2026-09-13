import fs from 'node:fs';
import { chromium } from '@playwright/test';

const output = 'docs/qa/design-v2';
fs.mkdirSync(output, { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const classId = 'qa-turma-v2';
const students = [
  { id: 'qa-ana', nome: 'Ana Clara' },
  { id: 'qa-bruno', nome: 'Bruno Lima' },
  { id: 'qa-camila', nome: 'Camila Rocha' },
  { id: 'qa-davi', nome: 'Davi Alves' },
];
const seed = {
  'perfil:professor': JSON.stringify({ id: 'qa-prof', nome: 'Marina', tratamento: 'professora', foto: '/reference-art/home-teacher-avatar.png' }),
  'turmas:lista': JSON.stringify([{ id: classId, nome: '5º Ano A', nivel: 'Ensino Fundamental', turno: 'Manhã', professorId: 'qa-prof', criadoEm: new Date().toISOString() }]),
  'turmas:ativa': classId,
  [`turma:${classId}:alunos`]: JSON.stringify(students),
  [`turma:${classId}:planejamento:${today}`]: JSON.stringify([{ id: 'qa-plan', tituloTema: 'Ciclo da água', status: 'pronto', turmaId: classId, dataKey: today, momentos: [{ horario: '09:30', titulo: 'Experimento do ciclo da água', descricao: 'Observar, registrar e conversar sobre as mudanças de estado.', tipo: 'historia' }] }]),
  [`turma:${classId}:chamada:${today}`]: JSON.stringify({ 'qa-ana': 'presente', 'qa-bruno': 'presente', 'qa-camila': 'falta' }),
  [`turma:${classId}:agenda:eventos`]: JSON.stringify([{ id: 'qa-event-1', turmaId: classId, data: today, hora: '09:30', titulo: 'Experimento do ciclo da água', tipo: 'evento', concluido: false, criadoEm: new Date().toISOString() }, { id: 'qa-event-2', turmaId: classId, data: today, hora: '14:00', titulo: 'Revisar registros da turma', tipo: 'tarefa', concluido: false, criadoEm: new Date().toISOString() }]),
};

async function open(browser, url, width, reducedMotion = 'no-preference', entries = seed) {
  const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion });
  const page = await context.newPage();
  await page.addInitScript((entries) => { for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value); }, entries);
  await page.goto(url);
  return { context, page };
}

async function assertViewport(page, width, label) {
  const metrics = await page.evaluate(() => {
    const interactive = [...document.querySelectorAll('button, input, select, textarea')].map((element) => {
      const rect = element.getBoundingClientRect();
      return { tag: element.tagName, width: Math.round(rect.width), height: Math.round(rect.height), label: element.getAttribute('aria-label') || element.textContent?.trim().slice(0, 30) };
    });
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, interactive };
  });
  if (metrics.scrollWidth > metrics.clientWidth + 1) throw new Error(`${label} possui overflow horizontal: ${metrics.scrollWidth} > ${metrics.clientWidth}`);
  const undersized = metrics.interactive.filter((item) => item.width < 48 || item.height < 48);
  if (undersized.length) throw new Error(`${label} possui targets menores que 48px: ${JSON.stringify(undersized)}`);
  return { width, label, ...metrics, undersized: undersized.length };
}

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const metrics = [];
  const baseline = await open(browser, 'http://127.0.0.1:5183/', 390);
  await baseline.page.waitForTimeout(2500);
  await baseline.page.screenshot({ path: `${output}/before-home-390.png` });
  await baseline.context.close();

  const splash = await open(browser, 'http://127.0.0.1:5173/', 390);
  await splash.page.waitForTimeout(420);
  await splash.page.screenshot({ path: `${output}/after-splash-390.png` });
  await splash.context.close();

  for (const width of [360, 390, 430]) {
    const { page, context } = await open(browser, 'http://127.0.0.1:5173/', width);
    await page.waitForTimeout(1500);
    metrics.push(await assertViewport(page, width, 'Home'));
    await page.screenshot({ path: `${output}/after-home-${width}.png` });
    if (width === 390) {
      await page.screenshot({ path: `${output}/after-home-${width}-full.png`, fullPage: true });
      await page.locator('.v2-agenda-block').evaluate((element) => element.scrollIntoView({ block: 'center' }));
      await page.screenshot({ path: `${output}/after-home-agenda-${width}.png` });
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    await page.getByRole('button', { name: /Fazer chamada/ }).click({ timeout: 5000 });
    if (width === 390) {
      await page.waitForTimeout(60);
      await page.screenshot({ path: `${output}/after-attendance-loading-${width}.png` });
    }
    await page.waitForTimeout(250);
    metrics.push(await assertViewport(page, width, 'Chamada'));
    await page.screenshot({ path: `${output}/after-attendance-${width}.png` });
    if (width === 390) {
      await page.getByRole('button', { name: /Marcar Ana Clara como Presente/ }).click();
      await page.screenshot({ path: `${output}/after-attendance-pressed-${width}.png` });
      await page.getByLabel('Buscar aluno').focus();
      await page.screenshot({ path: `${output}/after-attendance-focus-${width}.png` });
    }
    await context.close();
  }

  const reduced = await open(browser, 'http://127.0.0.1:5173/', 390, 'reduce');
  await reduced.page.waitForTimeout(160);
  await reduced.page.screenshot({ path: `${output}/after-splash-reduced-motion-390.png` });
  await reduced.page.waitForTimeout(650);
  await reduced.page.screenshot({ path: `${output}/after-home-reduced-motion-390.png` });
  await reduced.context.close();

  const offline = await open(browser, 'http://127.0.0.1:5173/', 390);
  await offline.page.waitForTimeout(1500);
  await offline.page.evaluate(() => { Object.defineProperty(window.navigator, 'onLine', { configurable: true, get: () => false }); window.dispatchEvent(new Event('offline')); });
  await offline.page.waitForTimeout(80);
  await offline.page.screenshot({ path: `${output}/after-home-offline-390.png`, fullPage: true });
  await offline.context.close();

  const errorSeed = { ...seed, [`turma:${classId}:agenda:eventos`]: '{invalid' };
  const error = await open(browser, 'http://127.0.0.1:5173/', 390, 'no-preference', errorSeed);
  await error.page.waitForTimeout(1500);
  await error.page.locator('.v2-agenda-block').evaluate((element) => element.scrollIntoView({ block: 'center' }));
  await error.page.screenshot({ path: `${output}/after-home-error-390.png` });
  await error.context.close();
  fs.writeFileSync(`${output}/viewport-metrics.json`, JSON.stringify(metrics, null, 2));
  await browser.close();
}

async function recordMotion() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, recordVideo: { dir: output } });
  const page = await context.newPage();
  await page.addInitScript((entries) => { for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value); }, seed);
  await page.goto('http://127.0.0.1:5173/');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: /Fazer chamada/ }).click({ timeout: 5000 });
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: /Marcar Ana Clara como Presente/ }).click({ timeout: 5000 });
  await page.waitForTimeout(350);
  await page.getByRole('button', { name: 'Voltar', exact: true }).click({ timeout: 5000 });
  await page.waitForTimeout(500);
  const video = page.video();
  await context.close();
  const videoPath = await video.path();
  fs.renameSync(videoPath, `${output}/motion-v2.webm`);
  await browser.close();
}

capture().then(recordMotion).catch((error) => { console.error(error); process.exitCode = 1; });
