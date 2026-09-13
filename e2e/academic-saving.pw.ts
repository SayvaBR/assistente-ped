import { test, expect, type Page } from "@playwright/test";

const classId = "test_class";
const key = `turma:${classId}:academico:v1`;
test.beforeEach(async ({ page }) => {
  // Each test uses Playwright's isolated browser context, never the user's tabs.
  await page.addInitScript(() => {
    if (localStorage.getItem("test:seeded")) return;
    const teacher = {
      id: "test_teacher",
      nome: "Docente de teste",
      tratamento: "professor",
    };
    const classroom = {
      id: "test_class",
      nome: "Turma de teste",
      nivel: "4º ano",
      turno: "Tarde",
      etapa: "fundamental_anos_iniciais",
      componentesCurriculares: ["Matemática"],
      duracaoAulaMin: 50,
    };
    const academic = {
      versao: 1,
      config: {
        sistema: "mista",
        escala: 10,
        limite: null,
        metodo: "ponderada",
        conceitos: ["A", "B"],
        periodos: [{ id: "p1", nome: "1º bimestre", inicio: "", fim: "" }],
      },
      avaliacoes: [
        {
          id: "a1",
          titulo: "Prova de teste",
          componente: "Matemática",
          data: "2026-09-10",
          periodoId: "p1",
          tipo: "Prova",
          maximo: 10,
          peso: 1,
          descricao: "",
          notas: {},
        },
      ],
    };
    localStorage.setItem("perfil:professor", JSON.stringify(teacher));
    localStorage.setItem("turmas:lista", JSON.stringify([classroom]));
    localStorage.setItem("turmas:ativa", "test_class");
    localStorage.setItem(
      "turma:test_class:alunos",
      JSON.stringify([
        { id: "s1", nome: "Aluno A", dataNascimento: "2016-01-01" },
        { id: "s2", nome: "Aluno B", dataNascimento: "2016-02-01" },
      ]),
    );
    localStorage.setItem(
      "turma:test_class:academico:v1",
      JSON.stringify(academic),
    );
    localStorage.setItem("config:sons", "false");
    localStorage.setItem("test:seeded", "true");
  });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Turma", exact: true }),
  ).toBeVisible();
});
async function results(page: Page) {
  await page.getByRole("button", { name: "Turma", exact: true }).click();
  await page.getByText("Gestão", { exact: true }).click();
  await page.getByRole("button", { name: /Notas e avaliações/ }).click();
  await page.getByRole("button", { name: "Resultados", exact: true }).click();
}
async function stored(page: Page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), key);
}

async function openPlanWithDelayedWrite(page: Page) {
  await page.evaluate(() => {
    const today = new Date();
    const day = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const plan = {
      id: "plan1",
      turmaId: "test_class",
      dataKey: day,
      tituloTema: "Plano de teste",
      horaInicio: "08:00",
      horaFim: "09:00",
      status: "rascunho",
      objetivoGeral: "Aprender",
      objetivosEspecificos: [],
      bncc: { habilidades: [] },
      momentos: [
        {
          id: "m1",
          titulo: "Atividade",
          horario: "08:00",
          duracaoMin: 30,
          descricao: "",
          tipo: "atividade",
        },
      ],
      recursos: "",
      avaliacao: "",
      inclusao: "",
      observacoes: "",
      posAula: { comoFoi: null, observacoesPosAula: "" },
      criadoEm: today.toISOString(),
      atualizadoEm: today.toISOString(),
    };
    (window as any).testPlanKey = `turma:test_class:planejamento:${day}`;
    localStorage.setItem((window as any).testPlanKey, JSON.stringify([plan]));
  });
  await page.getByRole("button", { name: "Planejamento", exact: true }).click();
  // O mesmo plano aparece na agenda do dia e na biblioteca; escolha o cartão da agenda.
  await page
    .getByRole("button", { name: "Abrir Plano de teste", exact: true })
    .first()
    .click();
  await page.evaluate(() => {
    (window as any).testPlanWrites = [];
    (window as any).storage = {
      get: async (key: string) => {
        const value = localStorage.getItem(key);
        if (value === null) throw Error("not found");
        return { value };
      },
      list: async (prefix: string) => ({
        keys: Object.keys(localStorage).filter((key) => key.startsWith(prefix)),
      }),
      delete: async (key: string) => localStorage.removeItem(key),
      set: async (key: string, value: string) => {
        if (key.includes(":planejamento:")) {
          (window as any).testPlanWrites.push(JSON.parse(value));
          if ((window as any).testPlanWrites.length === 1)
            await new Promise<void>((resolve) => {
              (window as any).releasePlanWrite = resolve;
            });
        }
        localStorage.setItem(key, value);
      },
    };
  });
  await page
    .getByPlaceholder("Tema do plano (ex: Cores da natureza)", { exact: true })
    .fill("Plano revisado");
  await expect
    .poll(async () =>
      page.evaluate(() => (window as any).testPlanWrites.length),
    )
    .toBe(1);
}

test("completes a plan after an in-flight automatic draft without reverting its status", async ({
  page,
}) => {
  await openPlanWithDelayedWrite(page);
  await page
    .getByRole("button", { name: "Concluir plano", exact: true })
    .click();
  await page.evaluate(() => (window as any).releasePlanWrite());
  await expect(
    page.getByRole("button", { name: "Planejamento", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem((window as any).testPlanKey)!)[0],
    ),
  ).toMatchObject({ tituloTema: "Plano revisado", status: "concluido" });
  expect(
    await page.evaluate(() =>
      (window as any).testPlanWrites.map((plans: any[]) => plans[0]?.status),
    ),
  ).toEqual(["rascunho", "concluido"]);
});

test("waits for an automatic save before deleting a plan so it cannot reappear", async ({
  page,
}) => {
  await openPlanWithDelayedWrite(page);
  await page
    .getByRole("button", { name: "Excluir este plano", exact: true })
    .click();
  await page.getByRole("button", { name: "Confirmar", exact: true }).click();
  await page.evaluate(() => (window as any).releasePlanWrite());
  await expect(
    page.getByRole("button", { name: "Planejamento", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem((window as any).testPlanKey)!),
    ),
  ).toEqual([]);
  expect(
    await page.evaluate(() =>
      (window as any).testPlanWrites.map((plans: any[]) => plans.length),
    ),
  ).toEqual([1, 0]);
});

test("asks before abandoning an assessment editor and keeps the fields when cancelled", async ({
  page,
}) => {
  await results(page);
  await page
    .getByRole("button", { name: "Editar avaliação", exact: true })
    .click();
  await page
    .getByLabel("Título da avaliação", { exact: true })
    .fill("Título alterado");
  await page.getByRole("button", { name: "Voltar", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Sair da edição?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Cancelar", exact: true }).click();
  await expect(
    page.getByLabel("Título da avaliação", { exact: true }),
  ).toHaveValue("Título alterado");
  expect((await stored(page)).avaliacoes[0].titulo).toBe("Prova de teste");
  await page
    .getByRole("button", { name: "Salvar avaliação", exact: true })
    .click();
  await expect
    .poll(async () => (await stored(page)).avaliacoes[0].titulo)
    .toBe("Título alterado");
});

test("protects unsaved school changes and permits leaving after a successful save", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByText("Escolas e anos letivos", { exact: true }).click();
  await page
    .getByRole("button", { name: "Adicionar escola", exact: true })
    .click();
  await page
    .getByLabel("Nome da escola", { exact: true })
    .fill("Escola de teste");
  await page.getByRole("button", { name: "Voltar", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Descartar alterações?" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Continuar editando", exact: true })
    .click();
  await expect(page.getByLabel("Nome da escola", { exact: true })).toHaveValue(
    "Escola de teste",
  );
  await page
    .getByRole("button", { name: "Salvar organização", exact: true })
    .click();
  await expect(
    page.getByText("Organização salva neste dispositivo.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Voltar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Mais", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("organizacao:v1")!).escolas[0].nome,
    ),
  ).toBe("Escola de teste");
});

test("prevents exporting a partial report when a local record cannot be read", async ({
  page,
}) => {
  await page.evaluate(() => localStorage.setItem("obs:s1", "{invalid json"));
  await page.getByRole("button", { name: "Turma", exact: true }).click();
  await page.getByText("Gestão", { exact: true }).click();
  await page.getByRole("button", { name: /Relatórios Consulte/ }).click();
  await page
    .getByRole("button", { name: /Relatório da turma Acompanhe/ })
    .click();
  await expect(
    page.getByText(
      "Não foi possível ler os dados para o relatório. Tente novamente.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Revisar relatório", exact: true }),
  ).toBeDisabled();
});

test("saves decimal grades and comments before blur; Enter advances to the next student", async ({
  page,
}) => {
  await results(page);
  const first = page.getByLabel("Nota de Aluno A (0–10)", { exact: true });
  await first.pressSequentially("8,5");
  await expect(first).toHaveValue("8,5");
  await expect
    .poll(async () => (await stored(page)).avaliacoes[0].notas.s1.valor)
    .toBe(8.5);
  await first.press("Enter");
  await expect(
    page.getByLabel("Nota de Aluno B (0–10)", { exact: true }),
  ).toBeFocused();
  const comment = page
    .getByRole("textbox", { name: "Observação", exact: true })
    .first();
  await comment.fill("Resolveu a atividade com autonomia.");
  await expect(comment).toBeFocused();
  await expect
    .poll(async () => (await stored(page)).avaliacoes[0].notas.s1.parecer)
    .toBe("Resolveu a atividade com autonomia.");
  await page.reload();
  await results(page);
  await expect(first).toHaveValue("8,5");
  await expect(comment).toHaveValue("Resolveu a atividade com autonomia.");
});

test("rejects an out-of-scale edit and preserves a mixed concept when the numeric grade is cleared", async ({
  page,
}) => {
  await results(page);
  const first = page.getByLabel("Nota de Aluno A (0–10)", { exact: true });
  await first.fill("8");
  await page
    .getByRole("combobox", { name: "Conceito", exact: true })
    .first()
    .selectOption("A");
  await first.fill("11");
  await expect(
    page.getByText("A nota deve estar entre 0 e 10.", { exact: true }),
  ).toBeVisible();
  await expect
    .poll(async () => (await stored(page)).avaliacoes[0].notas.s1.valor)
    .toBe(8);
  await first.fill("");
  await expect
    .poll(async () => (await stored(page)).avaliacoes[0].notas.s1)
    .toMatchObject({ valor: null, conceito: "A", status: "avaliado" });
});

test("retains edits in memory after a storage failure and retries the latest result", async ({
  page,
}) => {
  await results(page);
  await page.evaluate(() => {
    (window as any).storage = {
      get: async (key: string) => ({ value: localStorage.getItem(key) }),
      list: async (prefix: string) => ({
        keys: Object.keys(localStorage).filter((key) => key.startsWith(prefix)),
      }),
      set: async () => {
        throw new Error("Espaço indisponível no dispositivo.");
      },
    };
  });
  await page.getByLabel("Nota de Aluno A (0–10)", { exact: true }).fill("7,5");
  await expect(
    page.getByText("Alterações ainda não salvas", { exact: true }),
  ).toBeVisible();
  await page.evaluate(() => {
    delete (window as any).storage;
  });
  await page.getByRole("button", { name: "Tentar salvar novamente" }).click();
  await expect
    .poll(async () => (await stored(page)).avaliacoes[0].notas.s1.valor)
    .toBe(7.5);
  await expect(
    page.getByText("Salvo neste dispositivo", { exact: true }),
  ).toBeVisible();
});

test("keeps commas while editing components and preserves a legacy school shift", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Mais", exact: true }).click();
  await page.getByRole("button", { name: /Minhas turmas/i, exact: true }).click();
  await page.getByRole("button", { name: "Configurar", exact: true }).click();
  await expect(
    page.getByRole("combobox", { name: "Turno", exact: true }),
  ).toHaveValue("Tarde");
  const input = page.getByLabel(
    "Componentes curriculares (separados por vírgula)",
    { exact: true },
  );
  await input.fill("");
  await input.pressSequentially("Matemática, Português, Arte");
  await expect(input).toHaveValue("Matemática, Português, Arte");
  await page.getByRole("button", { name: "Salvar turma", exact: true }).click();
  await expect
    .poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem("turmas:lista")!)[0]),
    )
    .toMatchObject({
      turno: "Tarde",
      componentesCurriculares: ["Matemática", "Português", "Arte"],
    });
});
