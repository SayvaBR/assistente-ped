import { test, expect } from "@playwright/test";

test("apresenta a escolha Gratuito/Pro no onboarding", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Comece no seu ritmo" })).toBeVisible();
  const pro = page.getByRole("radio", { name: /Pro/ });
  await pro.click();
  await expect(pro).toHaveAttribute("aria-checked", "true");
  await expect(page.getByRole("radio", { name: /Gratuito/ })).toHaveAttribute("aria-checked", "false");
});

test("cria uma sequência com aulas e progresso", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("perfil:professor", JSON.stringify({ id: "teacher", nome: "Docente", tratamento: "docente" }));
    localStorage.setItem("turmas:lista", JSON.stringify([{ id: "sequence_class", nome: "Turma sequência", nivel: "4º ano", turno: "Manhã", etapa: "fundamental_anos_iniciais", componentesCurriculares: ["Matemática"] }]));
    localStorage.setItem("turmas:ativa", "sequence_class");
    localStorage.setItem("turma:sequence_class:alunos", "[]");
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Planejamento", exact: true }).click();
  await page.getByRole("button", { name: "Sequências", exact: true }).click();
  await page.getByRole("button", { name: "Nova sequência", exact: true }).click();
  await page.getByRole("textbox", { name: "Título da sequência" }).fill("Semana da leitura");
  await page.getByRole("button", { name: "Adicionar aula", exact: true }).click();
  await page.getByRole("textbox", { name: "Título da aula 1" }).fill("Roda de leitura");
  await page.getByRole("button", { name: "Salvar sequência", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Semana da leitura" })).toBeVisible();
  await expect(page.getByText(/0 de 1 aulas concluídas/)).toBeVisible();
});
