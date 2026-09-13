import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const classroom = {
    id: "more_class",
    nome: "Turma de navegação",
    nivel: "4º ano",
    turno: "Manhã",
    etapa: "fundamental_anos_iniciais",
    componentesCurriculares: ["Língua Portuguesa"],
    duracaoAulaMin: 50,
  };
  await page.addInitScript((value) => {
    localStorage.setItem("perfil:professor", JSON.stringify({ id: "more_teacher", nome: "Docente de teste", tratamento: "docente" }));
    localStorage.setItem("turmas:lista", JSON.stringify([value]));
    localStorage.setItem("turmas:ativa", value.id);
    localStorage.setItem(`turma:${value.id}:alunos`, "[]");
    localStorage.setItem("config:sons", "false");
  }, classroom);
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Mais", exact: true })).toBeVisible();
});

test("mantém Mais focada em conta, organização e suporte", async ({ page }) => {
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Mais" })).toBeVisible();
  await expect(page.getByText("Seu espaço de trabalho", { exact: true })).toBeVisible();
  await expect(page.getByText("BNCC", { exact: true })).toBeVisible();
  await expect(page.getByText("Notas e avaliações", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Configurações", { exact: true })).toBeVisible();
});

test("leva os atalhos de rotina para Início", async ({ page }) => {
  await expect(page.getByText("Ferramentas", { exact: true })).toBeVisible();
  await expect(page.getByText("Lembretes", { exact: true })).toBeVisible();
  await page.getByText("Ferramentas", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "Ferramentas de sala" })).toBeVisible();
});

test("mantém a navegação inferior visível ao chegar ao fim da Home", async ({ page }) => {
  const scrollArea = page.locator(".app-screen-scroll");
  const navigation = page.getByRole("navigation", { name: "Navegação principal" });

  await scrollArea.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect(navigation).toBeVisible();

  const box = await navigation.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThanOrEqual(844);
});

test("abre preferências sem passar por Configurações", async ({ page }) => {
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByText("Aparência", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "Aparência" })).toBeVisible();
  await page.getByRole("button", { name: "Voltar" }).click();
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByText("Notificações", { exact: true }).last().click();
  await expect(page.getByRole("heading", { name: "Lembretes" })).toBeVisible();
});
