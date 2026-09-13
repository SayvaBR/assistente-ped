import { describe, it, expect } from "vitest";
import {
  emptyAcademic,
  parseGrade,
  patchGrade,
  calculateAverage,
  validateAcademic,
  type Assessment,
} from "../src/domain/academic";
import { loadAcademic, saveAcademic } from "../src/data/academicRepository";
import { capabilitiesFor, stageFrom, levelsFor } from "../src/domain/education";
import { createBackup, restoreBackup } from "../src/data/backup.js";
function memory() {
  const data = new Map<string, string>();
  return {
    data,
    async list(prefix = "") {
      return { keys: [...data.keys()].filter((k) => k.startsWith(prefix)) };
    },
    async get(key: string) {
      if (!data.has(key)) throw Error("not found");
      return { value: data.get(key)! };
    },
    async set(key: string, value: string) {
      data.set(key, value);
    },
    async delete(key: string) {
      data.delete(key);
    },
  };
}
function assessment(
  id: string,
  value: number | null,
  weight = 1,
  max = 10,
): Assessment {
  return {
    id,
    titulo: id,
    componente: "Matemática",
    data: "2026-09-10",
    periodoId: "p",
    tipo: "Prova",
    maximo: max,
    peso: weight,
    descricao: "",
    notas: {
      s: {
        valor: value,
        conceito: "",
        parecer: "",
        status: value === null ? "pendente" : "avaliado",
      },
    },
  };
}
describe("Pedagogical configuration", () => {
  it("keeps the four stages distinct and never infers missing legacy stages", () => {
    expect(stageFrom("Ensino Fundamental")).toBeNull();
    expect(stageFrom("Ensino Médio")).toBe("ensino_medio");
    expect(capabilitiesFor({}).needsStage).toBe(true);
    expect(capabilitiesFor({ etapa: "educacao_infantil" })).toMatchObject({
      rotina: true,
      notas: false,
      desenvolvimento: true,
    });
    for (const etapa of [
      "fundamental_anos_iniciais",
      "fundamental_anos_finais",
      "ensino_medio",
    ] as const)
      expect(capabilitiesFor({ etapa })).toMatchObject({
        rotina: false,
        notas: true,
        desenvolvimento: false,
      });
    expect(levelsFor("fundamental_anos_finais")).toEqual([
      "6º ano",
      "7º ano",
      "8º ano",
      "9º ano",
    ]);
  });
  it("respects an explicit routine override without changing stored records", () =>
    expect(
      capabilitiesFor({ etapa: "ensino_medio", rotinaInfantilHabilitada: true })
        .rotina,
    ).toBe(true));
});
describe("Grades and recovery", () => {
  it("converts a replacement recovery to the original assessment scale when adding points", () => {
    const cfg = { ...emptyAcademic().config, metodo: "soma" as const };
    const original = assessment("a", 40, 1, 100);
    const recovery = {
      ...assessment("r", 9, 1, 10),
      recuperacao: { politica: "especifica" as const, avaliacaoId: "a" },
    };
    expect(calculateAverage("s", [original, recovery], cfg).value).toBe(90);
    expect(original.notas.s.valor).toBe(40);
  });
  it("rejects impossible dates, duplicated assessments and invalid settings before saving", async () => {
    const data = emptyAcademic();
    data.config.periodos = [{ id: "p", nome: "Bimestre", inicio: "", fim: "" }];
    data.avaliacoes = [assessment("a", 8)];
    const port = memory();
    await saveAcademic("classA", data, port);
    for (const bad of [
      { ...data, avaliacoes: [{ ...data.avaliacoes[0], data: "2026-02-30" }] },
      { ...data, avaliacoes: [data.avaliacoes[0], data.avaliacoes[0]] },
      {
        ...data,
        config: {
          ...data.config,
          periodos: [
            { id: "p", nome: "Bimestre", inicio: "2026-13-01", fim: "" },
          ],
        },
      },
      {
        ...data,
        config: {
          ...data.config,
          sistema: "mista" as const,
          conceitos: ["A", "A"],
        },
      },
    ])
      await expect(saveAcademic("classA", bad, port)).rejects.toThrow();
    expect(await loadAcademic("classA", port)).toEqual(data);
  });
  it("merges edits without losing mixed results or an explicit attendance status", () => {
    const initial = assessment("a", 8).notas.s;
    const concept = patchGrade(initial, { conceito: "A" }, "mista");
    const comment = patchGrade(
      concept,
      { parecer: "Participou da atividade." },
      "mista",
    );
    expect(patchGrade(comment, { valor: null }, "mista")).toMatchObject({
      conceito: "A",
      parecer: "Participou da atividade.",
      status: "avaliado",
      valor: null,
    });
    expect(
      patchGrade(
        { ...comment, status: "ausente" },
        { parecer: "Família informou ausência." },
        "nota_numerica",
      ).status,
    ).toBe("ausente");
    expect(
      patchGrade(initial, { parecer: "Parecer qualitativo" }, "qualitativa")
        .status,
    ).toBe("avaliado");
    expect(patchGrade(initial, { parecer: "" }, "qualitativa").status).toBe(
      "pendente",
    );
    expect(initial.conceito).toBe("");
  });
  it("accepts decimal comma, zero, blank and rejects invalid or out-of-scale grades", () => {
    expect(parseGrade("8,5", 10)).toBe(8.5);
    expect(parseGrade("0", 10)).toBe(0);
    expect(parseGrade("", 10)).toBeNull();
    for (const value of ["-1", "10,1", "abc", "Infinity"])
      expect(() => parseGrade(value, 10)).toThrow();
  });
  it("normalizes different scales and weights without treating absent as zero", () => {
    const cfg = emptyAcademic().config;
    const a = [
      assessment("a", 8),
      assessment("b", 70, 2, 100),
      assessment("c", 9),
      assessment("pending", null),
    ];
    expect(calculateAverage("s", a, cfg).value).toBe(7.75);
    a[1].peso = 1;
    expect(calculateAverage("s", a, cfg).value).toBe(8);
    a[1].notas.s.status = "ausente";
    expect(calculateAverage("s", a, cfg).value).toBe(8.5);
  });
  it("calculates simple, sum and all recovery policies transparently", () => {
    const cfg = emptyAcademic().config;
    const originals = [assessment("a", 4), assessment("b", 8, 2)];
    expect(
      calculateAverage("s", originals, { ...cfg, metodo: "simples" }).value,
    ).toBe(6);
    expect(
      calculateAverage("s", originals, { ...cfg, metodo: "soma" }).value,
    ).toBe(12);
    const recovery = {
      ...assessment("recovery", 9),
      recuperacao: { politica: "menor" as const },
    };
    expect(calculateAverage("s", [...originals, recovery], cfg).value).toBe(
      8.33,
    );
    expect(
      calculateAverage(
        "s",
        [
          ...originals,
          {
            ...recovery,
            recuperacao: { politica: "especifica", avaliacaoId: "b" },
          },
        ],
        cfg,
      ).value,
    ).toBe(7.33);
    expect(
      calculateAverage(
        "s",
        [...originals, { ...recovery, recuperacao: { politica: "separada" } }],
        cfg,
      ).value,
    ).toBe(6.67);
    expect(
      calculateAverage(
        "s",
        [
          ...originals,
          { ...assessment("extra", 1), recuperacao: { politica: "somar" } },
        ],
        cfg,
      ).value,
    ).toBe(7.67);
    expect(originals[0].notas.s.valor).toBe(4);
  });
  it("persists class-isolated grades and periods through backup to an empty installation", async () => {
    const port = memory();
    const d = emptyAcademic();
    d.config.periodos = [{ id: "p", nome: "1º bimestre", inicio: "", fim: "" }];
    d.avaliacoes = [assessment("a", 8)];
    await saveAcademic("classA", d, port);
    expect((await loadAcademic("classB", port)).avaliacoes).toEqual([]);
    const backup = await createBackup(port, {});
    const restored = memory();
    await restoreBackup(restored, backup, {});
    expect(await loadAcademic("classA", restored)).toEqual(d);
    expect(() =>
      validateAcademic({
        ...d,
        avaliacoes: [{ ...d.avaliacoes[0], maximo: 5 }],
      }),
    ).toThrow();
    expect(await loadAcademic("classA", port)).toEqual(d);
  });
});
