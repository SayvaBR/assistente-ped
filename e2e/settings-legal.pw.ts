import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const classroom = {
      id: "settings_class",
      nome: "Turma de configurações",
      nivel: "4º ano",
      turno: "Manhã",
      etapa: "fundamental_anos_iniciais",
      componentesCurriculares: ["Língua Portuguesa"],
      duracaoAulaMin: 50,
    };
    localStorage.setItem(
      "perfil:professor",
      JSON.stringify({ id: "settings_teacher", nome: "Docente de teste", tratamento: "docente" }),
    );
    localStorage.setItem("turmas:lista", JSON.stringify([classroom]));
    localStorage.setItem("turmas:ativa", classroom.id);
    localStorage.setItem("turma:settings_class:alunos", "[]");
    localStorage.setItem("config:sons", "false");
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Mais", exact: true })).toBeVisible();
});

test("abre ajuda e feedback com aviso de privacidade", async ({ page }) => {
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByText("Configurações", { exact: true }).click();
  await page.getByText("Ajuda e feedback", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "Ajuda e feedback" })).toBeVisible();
  await expect(page.getByText(/Não escreva nomes/)).toBeVisible();
});

test("permite consultar termos e política de privacidade", async ({ page }) => {
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByText("Configurações", { exact: true }).click();
  await page.getByText("Termos e privacidade", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "Termos e privacidade" })).toBeVisible();
  await expect(page.getByText(/O Assistente Pedagógico é uma ferramenta pessoal/)).toBeVisible();
  await page.getByRole("tab", { name: "Privacidade" }).click();
  await expect(page.getByText(/Perfil, turmas, alunos, frequência/)).toBeVisible();
});
