import { describe, it, expect } from "vitest";
import { bnccCatalog, searchSkills } from "../src/domain/bncc";
import { parseStudentList } from "../src/domain/studentImport";
import { savePlan } from "../src/data/planRepository";
import { normalizeLessonPlans } from "../src/domain/lessonPlans";
import { createLessonPlan } from "../src/core/recovered.js";
import { buildPdf } from "../src/data/pdfExport";
import { mkdirSync, writeFileSync } from "node:fs";
function memory(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
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
describe("Expanded product flows", () => {
  it("preserves mixed legacy moments and modern plans when editing a migrated plan", async () => {
    const key = "turma:a:planejamento:2026-09-10";
    const modern = {
      ...createLessonPlan({ turmaId: "a", dataKey: "2026-09-10" }),
      tituloTema: "Plano atual",
    };
    const legacy = {
      id: "old",
      titulo: "Acolhida",
      hora: "08:00",
      habilidades: ["EI01EO01"],
      sub: "Texto original",
      anexo: "material-preservado",
    };
    const raw = [modern, legacy];
    const context = { turmaId: "a", dataKey: "2026-09-10" };
    const first = normalizeLessonPlans(raw, context);
    const second = normalizeLessonPlans(raw, context);
    expect(first[1].id).toBe(second[1].id);
    const port = memory({ [key]: JSON.stringify(raw) });
    await savePlan({ ...first[1], tituloTema: "Plano migrado revisado" }, port);
    const saved = JSON.parse(port.data.get(key)!);
    expect(saved).toHaveLength(2);
    expect(saved[0]).toEqual(modern);
    expect(saved[1].momentos[0]).toMatchObject({
      titulo: "Acolhida",
      descricao: "Texto original",
      anexo: "material-preservado",
    });
    await savePlan({ ...saved[1], dataKey: "2026-09-11" }, port);
    expect(JSON.parse(port.data.get(key)!)).toEqual([modern]);
  });
  it("imports pasted names and CSV with dates, quotes and row validation", () => {
    expect(
      parseStudentList("Ana Souza\nBruno Lima").map((r) => r.nome),
    ).toEqual(["Ana Souza", "Bruno Lima"]);
    const rows = parseStudentList(
      'nome;nascimento\n"Ana; Souza";15/03/2015\nBruno;31/02/2014',
    );
    expect(rows[0]).toMatchObject({
      nome: "Ana; Souza",
      dataNascimento: "2015-03-15",
      error: "",
    });
    expect(rows[1].error).toBeTruthy();
    expect(() => parseStudentList('nome\n"sem fim')).toThrow();
  });
  it("searches the official catalog by stage, code, accents and years", () => {
    expect(bnccCatalog).toHaveLength(1580);
    expect(new Set(bnccCatalog.map((s) => s.codigo)).size).toBe(1580);
    expect(
      searchSkills({ stage: "ensino_medio", query: "EM13MAT101" }),
    ).toHaveLength(1);
    expect(
      searchSkills({ stage: "educacao_infantil", query: "EM13MAT101" }),
    ).toEqual([]);
    expect(
      searchSkills({ stage: "fundamental_anos_iniciais", query: "EF01LP01" })[0]
        .texto,
    ).toContain("esquerda para a direita");
    expect(
      searchSkills({
        stage: "fundamental_anos_iniciais",
        year: "2",
        query: "EF01LP01",
      }),
    ).toEqual([]);
  });
  it("moves a lesson without duplication and preserves other classes and plans", async () => {
    const p = createLessonPlan({ turmaId: "a", dataKey: "2026-09-10" });
    const other = { ...p, id: "other" };
    const port = memory({
      "turma:a:planejamento:2026-09-10": JSON.stringify([p, other]),
      "turma:b:planejamento:2026-09-10": JSON.stringify([p]),
    });
    await savePlan({ ...p, dataKey: "2026-09-11" }, port);
    expect(
      JSON.parse(port.data.get("turma:a:planejamento:2026-09-10")!),
    ).toEqual([other]);
    expect(
      JSON.parse(port.data.get("turma:a:planejamento:2026-09-11")!)[0].id,
    ).toBe(p.id);
    expect(
      JSON.parse(port.data.get("turma:b:planejamento:2026-09-10")!),
    ).toEqual([p]);
  });
  it("rolls back a failed date move without losing the original lesson", async () => {
    const p = createLessonPlan({ turmaId: "rollback", dataKey: "2026-09-10" });
    const original = JSON.stringify([p]);
    const port = memory({ "turma:rollback:planejamento:2026-09-10": original });
    const base = port.set;
    let fail = true;
    port.set = async (key, value) => {
      if (key.endsWith("2026-09-10") && fail) {
        fail = false;
        throw Error("disk full");
      }
      await base(key, value);
    };
    await expect(
      savePlan({ ...p, dataKey: "2026-09-11" }, port),
    ).rejects.toThrow();
    expect(port.data.get("turma:rollback:planejamento:2026-09-10")).toBe(
      original,
    );
    expect(port.data.has("turma:rollback:planejamento:2026-09-11")).toBe(false);
  });
  it("generates a paginated PDF with embedded Portuguese-capable fonts", () => {
    const pdf = buildPdf({
      title: "Relatório pedagógico de validação",
      subtitle: "Turma de teste · 01/09/2026 a 10/09/2026",
      sections: Array.from({ length: 12 }, (_, i) => ({
        title: `${i + 1}. Acompanhamento da aprendizagem`,
        paragraphs: [
          "Frequência: 95%. As ausências justificadas permanecem no histórico.",
          "A observação pedagógica reúne experiências, participação e expressão. Este texto usa ç, ã, é e í para conferir a tipografia.",
          "Matemática: média 8,5. Fórmula: (8 × 1 + 9 × 1) ÷ 2 = 8,5.",
        ],
      })),
    });
    expect(pdf.getNumberOfPages()).toBeGreaterThan(1);
    const bytes = new Uint8Array(pdf.output("arraybuffer"));
    expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
    mkdirSync("tmp/pdfs", { recursive: true });
    writeFileSync("tmp/pdfs/relatorio-validacao.pdf", bytes);
  });
});
