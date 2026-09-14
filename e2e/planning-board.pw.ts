import { test, expect } from "@playwright/test";

function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

test("move um plano pelo Quadro e persiste a nova hora", async ({ page }) => {
  const dateKey = todayKey();
  await page.addInitScript(({ dateKey }) => {
    localStorage.setItem(
      "perfil:professor",
      JSON.stringify({ id: "board_teacher", nome: "Docente do quadro", tratamento: "professor" }),
    );
    localStorage.setItem(
      "turmas:lista",
      JSON.stringify([
        {
          id: "board_class",
          nome: "Turma do quadro",
          nivel: "4º ano",
          turno: "Manhã",
          etapa: "fundamental_anos_iniciais",
          componentesCurriculares: ["Matemática"],
        },
      ]),
    );
    localStorage.setItem("turmas:ativa", "board_class");
    localStorage.setItem("turma:board_class:alunos", "[]");
    localStorage.setItem(
      `turma:board_class:planejamento:${dateKey}`,
      JSON.stringify([
        {
          id: "board_plan",
          turmaId: "board_class",
          dataKey: dateKey,
          tituloTema: "Roda de conversa",
          horaInicio: "09:00",
          horaFim: "09:50",
          status: "rascunho",
          objetivoGeral: "Escuta e acolhimento",
          objetivosEspecificos: [],
          bncc: { habilidades: [] },
          momentos: [],
          recursos: "",
          avaliacao: "",
          inclusao: "",
          observacoes: "",
          posAula: { comoFoi: null, observacoesPosAula: "" },
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
        },
      ]),
    );
  }, { dateKey });

  await page.goto("/");
  await page.getByRole("button", { name: "Planejamento", exact: true }).click();
  await page.getByRole("tab", { name: "Quadro", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Arraste para reorganizar" })).toBeVisible();

  const card = page.locator(".planning-board-card").filter({ hasText: "Roda de conversa" });
  const target = page.locator(`[data-drop-date="${dateKey}"][data-drop-time="10:00"]`).first();
  await expect(card).toBeVisible();
  await expect(target).toBeVisible();
  await target.scrollIntoViewIfNeeded();

  const cardBox = await card.boundingBox();
  const targetBox = await target.boundingBox();
  expect(cardBox).not.toBeNull();
  expect(targetBox).not.toBeNull();
  await page.mouse.move(cardBox!.x + cardBox!.width / 2, cardBox!.y + cardBox!.height / 2);
  await page.mouse.down();
  await page.mouse.move(targetBox!.x + targetBox!.width / 2, targetBox!.y + targetBox!.height / 2, { steps: 8 });
  await page.mouse.up();

  await expect(page.locator(".planning-toast")).toContainText("Plano movido");
  await expect.poll(async () => page.evaluate((key) => {
    const values = Object.entries(localStorage)
      .filter(([name]) => name.includes("turma:board_class:planejamento:"))
      .flatMap(([, value]) => JSON.parse(value));
    return values.find((item) => item.id === "board_plan")?.horaInicio;
  }, dateKey)).toBe("10:00");

  await page.getByRole("button", { name: "Desfazer" }).click();
  await expect(page.locator(".planning-toast")).toContainText("Movimento desfeito");
  await expect.poll(async () => page.evaluate(() => {
    const values = Object.entries(localStorage)
      .filter(([name]) => name.includes("turma:board_class:planejamento:"))
      .flatMap(([, value]) => JSON.parse(value));
    return values.find((item) => item.id === "board_plan")?.horaInicio;
  })).toBe("09:00");
});
