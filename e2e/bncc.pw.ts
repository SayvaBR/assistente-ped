import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const classroom = {
    id: "bncc_class",
    nome: "Turma BNCC",
    nivel: "4º ano",
    turno: "Manhã",
    etapa: "fundamental_anos_iniciais",
    componentesCurriculares: ["Língua Portuguesa"],
  };
  await page.addInitScript((value) => {
    localStorage.clear();
    localStorage.setItem(
      "perfil:professor",
      JSON.stringify({ id: "bncc_teacher", nome: "Docente BNCC", tratamento: "docente" }),
    );
    localStorage.setItem("turmas:lista", JSON.stringify([value]));
    localStorage.setItem("turmas:ativa", value.id);
    localStorage.setItem(`turma:${value.id}:alunos`, "[]");
    localStorage.setItem("config:sons", "false");
  }, classroom);
  await page.goto("/");
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByText("BNCC", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "BNCC", exact: true })).toBeVisible();
});

test("navega por etapa, componente, busca e detalhe com retorno focado", async ({ page }) => {
  const stage = page.getByRole("combobox", { name: "Etapa de ensino", exact: true });
  await expect(stage).toHaveValue("fundamental_anos_iniciais");

  await stage.selectOption("educacao_infantil");
  await expect(stage).toHaveValue("educacao_infantil");
  await expect(page.getByRole("combobox", { name: "Faixa etária", exact: true })).toBeVisible();

  await stage.selectOption("fundamental_anos_iniciais");
  await page.getByRole("combobox", { name: "Componente ou área", exact: true }).selectOption({ label: "Língua Portuguesa" });
  await page.getByLabel("Buscar código ou descrição", { exact: true }).fill("EF01LP01");
  await expect(page.getByText("1 resultado", { exact: true })).toBeVisible();
  const detailTrigger = page.getByRole("button", { name: "Ver detalhes da habilidade EF01LP01", exact: true });
  await detailTrigger.click();
  await expect(page.getByRole("heading", { name: "EF01LP01", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Voltar aos resultados", exact: true }).click();
  await expect(detailTrigger).toBeFocused();
});

test("salva favorito e filtra o catálogo sem perder o feedback", async ({ page }) => {
  await page.getByLabel("Buscar código ou descrição", { exact: true }).fill("EF01LP01");
  await page.getByRole("button", { name: "Favoritar EF01LP01", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "EF01LP01 adicionada aos favoritos" })).toBeVisible();
  const filter = page.getByRole("checkbox", { name: /Somente favoritos/ });
  await filter.check();
  await expect(page.getByText("1 resultado", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Desfavoritar EF01LP01", exact: true })).toBeVisible();
});

test("associa uma habilidade ao plano e atualiza o resumo da seleção", async ({ page }) => {
  const planKey = await page.evaluate(() => {
    const today = new Date();
    const day = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const now = today.toISOString();
    const plan = {
      id: "bncc_plan",
      turmaId: "bncc_class",
      dataKey: day,
      tituloTema: "Plano BNCC",
      horaInicio: "08:00",
      horaFim: "09:00",
      status: "rascunho",
      objetivoGeral: "Ler",
      objetivosEspecificos: [],
      bncc: { habilidades: [] },
      momentos: [],
      recursos: "",
      avaliacao: "",
      inclusao: "",
      observacoes: "",
      posAula: { comoFoi: null, observacoesPosAula: "" },
      criadoEm: now,
      atualizadoEm: now,
    };
    const key = `turma:bncc_class:planejamento:${day}`;
    localStorage.setItem(key, JSON.stringify([plan]));
    return key;
  });
  await page.getByRole("button", { name: "Voltar", exact: true }).click();
  await page.getByRole("button", { name: "Planejamento", exact: true }).click();
  await page.getByRole("button", { name: "Abrir Plano BNCC", exact: true }).first().click();
  await page.getByRole("button", { name: /^BNCC/ }).click();
  await page.getByLabel("Buscar código ou descrição", { exact: true }).fill("EF01LP01");
  await page.getByRole("button", { name: "Vincular ao plano", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "EF01LP01 vinculada ao plano" })).toBeVisible();
  await expect(page.getByText("1 habilidade selecionada", { exact: true })).toBeVisible();
  await expect.poll(async () => page.evaluate((key) => JSON.parse(localStorage.getItem(key)!)[0].bncc.habilidades, planKey)).toEqual(["EF01LP01"]);
});
