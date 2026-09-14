import { describe, it, expect } from "vitest";
import { attendanceSummary, toggleAttendance } from "../src/domain/attendance";
import {
  validateBirthDate,
  calculateAge,
  classKey,
  normalizeClass,
  migrateLegacyClassData,
} from "../src/data/classes.js";
import {
  validateBackup,
  createBackup,
  restoreBackup,
} from "../src/data/backup.js";
import { createLessonPlan, migrateLessonPlans } from "../src/core/recovered.js";
import { calculateAverage } from "../src/domain/academic";

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
const backup = (registros: { chave: string; valor: string }[] = []) => ({
  formato: "assistente-pedagogico-backup",
  versao: 2,
  arquivos: [],
  registros,
});
describe("Recovered data contracts", () => {
  it("isolates students, attendance and plans by class", () => {
    expect(classKey("a", "turma:alunos")).toBe("turma:a:alunos");
    expect(classKey("b", "chamada:2026-09-09")).toBe(
      "turma:b:chamada:2026-09-09",
    );
    expect(() => classKey("../bad", "turma:alunos")).toThrow();
  });
  it("rejects impossible and future birthdays but accepts today before noon", () => {
    const now = new Date(2026, 8, 9, 7);
    expect(() => validateBirthDate("2024-02-31", now)).toThrow();
    expect(() => validateBirthDate("2023-02-29", now)).toThrow();
    expect(() => validateBirthDate("2026-09-10", now)).toThrow();
    expect(validateBirthDate("2024-02-29", now)).toBe("2024-02-29");
    expect(validateBirthDate("2026-09-09", now)).toBe("2026-09-09");
    expect(calculateAge("2023-09-10", now)).toBe("2 anos e 11 meses");
  });
  it("counts late students as attending without marking unknown days absent", () => {
    expect(
      attendanceSummary({ presencas: 1, atrasos: 1, faltas: 2 }).percentage,
    ).toBe(50);
    expect(attendanceSummary({}).percentage).toBeNull();
    expect(toggleAttendance({ a: "presente" }, "a", "presente")).toEqual({});
    expect(toggleAttendance({ a: "presente" }, "b", "atrasado")).toEqual({
      a: "presente",
      b: "atrasado",
    });
    expect(
      attendanceSummary({
        presencas: 1,
        faltas: 1,
        faltasJustificadas: 1,
        saidasAntecipadas: 1,
      }),
    ).toMatchObject({ present: 2, total: 4, percentage: 50 });
  });
  it("calculates a validated custom formula without evaluating arbitrary code", () => {
    const base = {
      id: "a",
      titulo: "A",
      componente: "Matemática",
      data: "2026-09-09",
      periodoId: "p",
      tipo: "prova",
      maximo: 10,
      peso: 1,
      descricao: "",
      notas: {
        s: { valor: 8, conceito: "", parecer: "", status: "avaliado" as const },
      },
    };
    const other = {
      ...base,
      id: "b",
      titulo: "B",
      notas: { s: { ...base.notas.s, valor: 6 } },
    };
    const result = calculateAverage("s", [base, other], {
      sistema: "nota_numerica",
      escala: 10,
      limite: null,
      metodo: "personalizada",
      formula: "A1 * 0,75 + A2 * 0,25",
      conceitos: [],
      periodos: [
        { id: "p", nome: "1º", inicio: "2026-01-01", fim: "2026-12-31" },
      ],
    });
    expect(result.value).toBe(7.5);
    expect(() =>
      calculateAverage("s", [base, other], {
        sistema: "nota_numerica",
        escala: 10,
        limite: null,
        metodo: "personalizada",
        formula: "A1; alert(1)",
        conceitos: [],
        periodos: [
          { id: "p", nome: "1º", inicio: "2026-01-01", fim: "2026-12-31" },
        ],
      }),
    ).toThrow();
  });
  it("migrates legacy class keys only once without replacing existing data", async () => {
    const s = memory({
      "turma:alunos": "[1]",
      "turma:a:alunos": "[2]",
      "chamada:2026-09-09": "{}",
    });
    await migrateLegacyClassData(s, "a");
    expect(s.data.get("turma:a:alunos")).toBe("[2]");
    expect(s.data.get("turma:a:chamada:2026-09-09")).toBe("{}");
    const second = await migrateLegacyClassData(s, "a");
    expect(second.jaExecutada).toBe(true);
  });
  it("preserves the plan schema and migrates old moments", () => {
    const plan = createLessonPlan({ turmaId: "a", dataKey: "2026-09-09" });
    expect(plan.bncc.habilidades).toEqual([]);
    expect(plan.status).toBe("rascunho");
    expect(migrateLessonPlans([plan], {})).toEqual([plan]);
    const migrated = migrateLessonPlans(
      [
        {
          id: "m",
          titulo: "Acolhida",
          hora: "08:00",
          habilidades: ["EI01EO01"],
        },
      ],
      { dataKey: "2026-09-09" },
    );
    expect(migrated[0].momentos[0].titulo).toBe("Acolhida");
    expect(migrated[0].bncc.habilidades).toEqual(["EI01EO01"]);
  });
  it("validates names for classes", () => {
    expect(() => normalizeClass({ nome: "" }, {})).toThrow();
  });
});
describe("Backup compatibility and rollback", () => {
  it("exports and restores values byte for byte", async () => {
    const original = memory({
      "perfil:professor": '{"nome":"Ação"}',
      "turma:a:alunos": "[]",
    });
    const b = await createBackup(original, {});
    const destination = memory({ old: "old" });
    await restoreBackup(destination, b, {});
    expect(Object.fromEntries(destination.data)).toEqual(
      Object.fromEntries(original.data),
    );
  });
  it("accepts v1 and rejects duplicate keys, traversal and unsupported versions", () => {
    expect(validateBackup({ ...backup(), versao: 1 }).versao).toBe(1);
    expect(() =>
      validateBackup(
        backup([
          { chave: "x", valor: "1" },
          { chave: "x", valor: "2" },
        ]),
      ),
    ).toThrow();
    expect(() =>
      validateBackup({
        ...backup(),
        arquivos: [{ path: "midia/../secret", data: "AA==" }],
      }),
    ).toThrow();
    expect(() => validateBackup({ ...backup(), versao: 99 })).toThrow();
    expect(() =>
      validateBackup({
        ...backup(),
        arquivos: [{ path: "midia/a", data: "%%%" }],
      }),
    ).toThrow();
  });
  it("rolls all records back when a write fails", async () => {
    const s = memory({ original: "safe" });
    const set = s.set;
    let failed = false;
    s.set = async (k, v) => {
      if (k === "new" && !failed) {
        failed = true;
        throw Error("quota");
      }
      return set(k, v);
    };
    await expect(
      restoreBackup(s, backup([{ chave: "new", valor: "x" }]), {}),
    ).rejects.toThrow("preservados");
    expect(Object.fromEntries(s.data)).toEqual({ original: "safe" });
  });
  it("does not change records when media staging fails", async () => {
    const s = memory({ original: "safe" });
    await expect(
      restoreBackup(
        s,
        { ...backup(), arquivos: [{ path: "midia/a.png", data: "AA==" }] },
        { filesystem: null },
      ),
    ).rejects.toThrow();
    expect(s.data.get("original")).toBe("safe");
  });
});
