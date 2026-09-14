import { expect, test } from '@playwright/test';

test('Criar atividade V2 valida conteúdo e mantém a ação acessível', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=planning-overview&width=412');
  const device = page.locator('.v2-preview-device');
  await device.getByRole('button', { name: 'Criar atividade', exact: true }).click();
  await expect(device.getByRole('heading', { name: 'Nova atividade', exact: true })).toBeVisible();
  const save = device.getByRole('button', { name: /Salvar atividade/ });
  await expect(save).toBeDisabled();
  await device.getByRole('textbox', { name: 'Título da atividade' }).fill('Caça às palavras');
  await device.getByRole('textbox', { name: 'Como realizar' }).fill('Em duplas, encontrem no texto as palavras combinadas.');
  await expect(save).toBeEnabled();
  await save.click();
});

test('Criar atividade V2 preserva layout compacto e reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 1200 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?v2-preview=activity&width=320');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Nova atividade', exact: true })).toBeVisible();
  expect(await device.evaluate((root) => root.scrollWidth > root.clientWidth + 1)).toBe(false);
});

test('Atividade salva no app real reaparece no planejamento e pode ser editada', async ({ page }) => {
  const classroom = { id: 'activity_persistence_class', nome: 'Turma das atividades', nivel: 'Ensino Fundamental', turno: 'Manhã', etapa: 'fundamental_anos_iniciais' };
  await page.setViewportSize({ width: 390, height: 980 });
  await page.addInitScript((value) => {
    localStorage.setItem('perfil:professor', JSON.stringify({ id: 'activity_persistence_teacher', nome: 'Docente de teste', tratamento: 'docente' }));
    localStorage.setItem('turmas:lista', JSON.stringify([value]));
    localStorage.setItem('turmas:ativa', value.id);
    localStorage.setItem(`turma:${value.id}:alunos`, '[]');
    localStorage.setItem('config:sons', 'false');
  }, classroom);
  await page.goto('/');
  await page.getByRole('button', { name: 'Planejamento', exact: true }).click();
  await page.getByRole('button', { name: 'Criar atividade', exact: true }).click();
  await page.getByRole('textbox', { name: 'Título da atividade' }).fill('Jogo de leitura');
  await page.getByRole('textbox', { name: 'Como realizar' }).fill('Leia as palavras em duplas e marque as que rimam.');
  await page.getByRole('button', { name: /Salvar atividade/ }).click();
  await expect(page.getByRole('heading', { name: 'Planejamento', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Atividades preparadas', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Jogo de leitura/ })).toBeVisible();
  await page.getByRole('button', { name: /Jogo de leitura/ }).click();
  await expect(page.getByRole('heading', { name: 'Editar atividade', exact: true })).toBeVisible();
});
