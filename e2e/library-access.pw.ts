import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const classroom = {
    id: "library_class",
    nome: "Turma da biblioteca",
    nivel: "4º ano",
    turno: "Manhã",
    etapa: "fundamental_anos_iniciais",
    componentesCurriculares: ["Língua Portuguesa"],
    duracaoAulaMin: 50,
  };
  await page.addInitScript((value) => {
    localStorage.setItem("perfil:professor", JSON.stringify({ id: "library_teacher", nome: "Docente de teste", tratamento: "docente" }));
    localStorage.setItem("turmas:lista", JSON.stringify([value]));
    localStorage.setItem("turmas:ativa", value.id);
    localStorage.setItem(`turma:${value.id}:alunos`, "[]");
    localStorage.setItem("config:sons", "false");
    localStorage.removeItem("documentos:app:v2");
    localStorage.removeItem("biblioteca:pessoal:pastas:v1");
  }, classroom);
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Arquivos", exact: true }).last()).toBeVisible();
});

test("abre a biblioteca pela navegação principal", async ({ page }) => {
  await page.getByRole("button", { name: "Arquivos", exact: true }).last().click();
  await expect(page.getByRole("heading", { name: "Arquivos", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Meus arquivos", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Adicionar arquivo", exact: true })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Criar pasta", exact: true })).toBeEnabled();
  await expect(page.getByText("Este espaço é seu", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Criar pasta", exact: true }).click();
  await page.getByRole("textbox", { name: "Nome da pasta", exact: true }).fill("Planejamento");
  await expect(page.getByRole("button", { name: "Criar pasta", exact: true }).last()).toBeEnabled();
  await page.getByRole("button", { name: "Criar pasta", exact: true }).last().click();
  await expect(page.getByText("Planejamento", { exact: true })).toBeVisible();
});
