import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const classroom = {
    id: "paywall_class",
    nome: "Turma de assinatura",
    nivel: "4º ano",
    turno: "Manhã",
    etapa: "fundamental_anos_iniciais",
    componentesCurriculares: ["Língua Portuguesa"],
    duracaoAulaMin: 50,
  };
  await page.addInitScript((value) => {
    localStorage.setItem(
      "perfil:professor",
      JSON.stringify({
        id: "paywall_teacher",
        nome: "Docente de teste",
        tratamento: "docente",
      }),
    );
    localStorage.setItem("turmas:lista", JSON.stringify([value]));
    localStorage.setItem("turmas:ativa", value.id);
    localStorage.setItem("turma:paywall_class:alunos", "[]");
    localStorage.setItem("assinatura:interesse", "gratuito");
    localStorage.setItem("config:sons", "false");
  }, classroom);
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Mais", exact: true }),
  ).toBeVisible();
});

async function openPaywall(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByText("Seu plano", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "Seu plano" })).toBeVisible();
}

test("apresenta valor e uma ação principal clara sem prometer uma compra falsa", async ({
  page,
}) => {
  await openPaywall(page);

  await expect(
    page.getByRole("heading", { name: "Deixe a rotina mais leve." }),
  ).toBeVisible();
  await expect(
    page.getByText("O que o Pro organiza", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Disponível na loja em breve", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Quero conhecer o Pro" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Continuar no gratuito" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ver termos e privacidade" }),
  ).toBeVisible();
});

test("abre os termos a partir do contexto de assinatura", async ({ page }) => {
  await openPaywall(page);

  await page.getByRole("button", { name: "Ver termos e privacidade" }).click();
  await expect(
    page.getByRole("heading", { name: "Termos e privacidade" }),
  ).toBeVisible();
  await expect(
    page.getByRole("tab", { name: /Termos de uso/ }),
  ).toHaveAttribute("aria-selected", "true");
});

test("salva interesse no Pro e permite seguir com o gratuito", async ({
  page,
}) => {
  await openPaywall(page);

  await page.getByRole("button", { name: "Quero conhecer o Pro" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Interesse pelo Pro salvo",
  );
  await expect(
    page.getByRole("button", { name: "Interesse salvo" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Continuar com gratuito" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Plano gratuito selecionado",
  );
});
