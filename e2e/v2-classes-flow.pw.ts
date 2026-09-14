import { expect, test } from '@playwright/test';
test('Turmas V2 exibe contexto ativo, ações e lista de alunos', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 980 });
  await page.goto('/?v2-preview=classes&width=412');
  const device = page.locator('.v2-preview-device');
  await expect(device.getByRole('heading', { name: 'Turmas', exact: true })).toBeVisible();
  await expect(device.getByRole('heading', { name: 'Alunos da turma' })).toBeVisible();
  await expect(device.getByRole('button', { name: /Ana Clara Souza/ })).toBeVisible();
  await device.getByRole('button', { name: 'Fazer chamada' }).click();
  await expect(device.getByRole('heading', { name: '5º Ano A' })).toBeVisible();
});
test('Turmas V2 preserva copy em texto ampliado', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 1200 });
  await page.goto('/?v2-preview=classes&width=412');
  await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  const result = await page.locator('.v2-preview-device').evaluate((root) => ({ overflow: root.scrollWidth > root.clientWidth + 1, hasTitle: (root.textContent || '').includes('Turmas'), hasStudent: (root.textContent || '').includes('Ana Clara Souza') }));
  expect(result).toEqual({ overflow: false, hasTitle: true, hasStudent: true });
});

test('Turmas V2 troca a turma ativa pelo fluxo real', async ({ page }) => {
  const classes = [
    { id: 'classes_active_a', nome: '5º Ano A', nivel: 'Ensino Fundamental', turno: 'Manhã', etapa: 'fundamental_anos_iniciais' },
    { id: 'classes_active_b', nome: '4º Ano B', nivel: 'Ensino Fundamental', turno: 'Tarde', etapa: 'fundamental_anos_iniciais' },
  ];
  await page.setViewportSize({ width: 390, height: 980 });
  await page.addInitScript((value) => {
    localStorage.setItem('perfil:professor', JSON.stringify({ id: 'classes_teacher', nome: 'Docente de teste', tratamento: 'docente' }));
    localStorage.setItem('turmas:lista', JSON.stringify(value));
    localStorage.setItem('turmas:ativa', value[0].id);
    localStorage.setItem(`turma:${value[0].id}:alunos`, '[]');
    localStorage.setItem(`turma:${value[1].id}:alunos`, '[]');
    localStorage.setItem('config:sons', 'false');
  }, classes);
  await page.goto('/');
  await page.getByRole('button', { name: 'Turmas', exact: true }).click();
  await page.getByRole('button', { name: /4º Ano B/ }).click();
  await expect(page.getByText('4º Ano B', { exact: true }).first()).toBeVisible();
});
