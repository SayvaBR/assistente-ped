import { describe, expect, it } from "vitest";
import {
  findNotebookEntries,
  validateNotebookEntry,
  type NotebookEntry,
} from "../src/domain/notebook";
import {
  loadNotebook,
  saveNotebookEntry,
} from "../src/data/notebookRepository";

function memory() {
  const data = new Map<string, string>();
  return {
    data,
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
    async list(prefix: string) {
      return { keys: [...data.keys()].filter((key) => key.startsWith(prefix)) };
    },
  };
}
function entry(id: string, patch: Partial<NotebookEntry> = {}): NotebookEntry {
  const now = "2026-09-11T12:00:00.000Z";
  return {
    id,
    turmaId: "class_a",
    titulo: "Registro",
    texto: "Uma observação importante",
    alunoIds: ["student_a"],
    planoId: "",
    tags: ["Leitura"],
    tarefas: [{ id: `${id}-task`, texto: "Revisar", concluida: false }],
    arquivoIds: [],
    fixada: false,
    arquivadaEm: null,
    excluidaEm: null,
    lembrete: null,
    criadoEm: now,
    atualizadoEm: now,
    revisao: 0,
    ...patch,
  };
}
describe("Caderno pedagógico", () => {
  it("filters accent-insensitively, by tag and student, with pinned entries first", () => {
    const rows = [
      entry("a", { titulo: "Ação da turma", fixada: true }),
      entry("b", {
        titulo: "Leitura",
        tags: ["Avaliação"],
        alunoIds: ["student_b"],
      }),
    ];
    expect(
      findNotebookEntries(rows, { query: "acao", studentId: "student_a" })[0]
        .id,
    ).toBe("a");
    expect(findNotebookEntries(rows, { tag: "Avaliação" })[0].id).toBe("b");
  });
  it("serializes concurrent writes and rejects stale edits without losing the first one", async () => {
    const s = memory();
    const first = await saveNotebookEntry(entry("a"), s);
    const stale = { ...entry("a"), revisao: 0, titulo: "Versão antiga" };
    await expect(saveNotebookEntry(stale, s)).rejects.toThrow("outra tela");
    const second = await saveNotebookEntry(
      entry("b", { titulo: "Segundo" }),
      s,
    );
    expect(second.entradas.map((item) => item.id).sort()).toEqual(["a", "b"]);
    expect((await loadNotebook("class_a", s)).entradas[0].revisao).toBe(1);
    expect(first.entradas).toHaveLength(1);
  });
  it("preserves links when an entry is moved to the trash and restored", async () => {
    const s = memory();
    const saved = (
      await saveNotebookEntry(
        entry("a", { arquivoIds: ["doc_a"], planoId: "plan_a" }),
        s,
      )
    ).entradas[0];
    const trashed = (
      await saveNotebookEntry(
        { ...saved, excluidaEm: "2026-09-11T13:00:00.000Z" },
        s,
      )
    ).entradas[0];
    expect(trashed.arquivoIds).toEqual(["doc_a"]);
    const restored = (
      await saveNotebookEntry({ ...trashed, excluidaEm: null }, s)
    ).entradas[0];
    expect(restored.planoId).toBe("plan_a");
    expect(restored.excluidaEm).toBeNull();
  });
  it("rejects malformed entries before writing", async () => {
    const s = memory();
    expect(() =>
      validateNotebookEntry(entry("a", { texto: "" }), "class_a"),
    ).not.toThrow();
    expect(() => saveNotebookEntry(entry("../bad"), s)).toThrow();
    expect(s.data.size).toBe(0);
  });
});
