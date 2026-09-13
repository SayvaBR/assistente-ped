import { describe, expect, it } from "vitest";
import { loadSequences, saveSequence } from "../src/data/sequenceRepository";
import {
  sequenceProgress,
  type TeachingSequence,
} from "../src/domain/sequences";
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
const sequence = (id = "seq_a"): TeachingSequence => ({
  id,
  turmaId: "class_a",
  titulo: "Leitura",
  objetivo: "Ampliar a fluência",
  bnccIds: ["EF15LP01"],
  aulas: [
    {
      id: "lesson_a",
      titulo: "Roda de leitura",
      descricao: "",
      dataKey: "2026-09-11",
      planoId: "",
      status: "concluida",
    },
    {
      id: "lesson_b",
      titulo: "Produção",
      descricao: "",
      dataKey: "2026-09-12",
      planoId: "",
      status: "pendente",
    },
  ],
  criadoEm: "2026-09-11T10:00:00.000Z",
  atualizadoEm: "2026-09-11T10:00:00.000Z",
});
describe("Sequências didáticas", () => {
  it("persists ordered lessons and calculates progress", async () => {
    const s = memory();
    await saveSequence(sequence(), s);
    const loaded = await loadSequences("class_a", s);
    expect(loaded[0].aulas.map((lesson) => lesson.titulo)).toEqual([
      "Roda de leitura",
      "Produção",
    ]);
    expect(sequenceProgress(loaded[0])).toEqual({
      total: 2,
      concluida: 1,
      percentual: 50,
    });
  });
  it("keeps separate sequences in the same class", async () => {
    const s = memory();
    await Promise.all([
      saveSequence(sequence("a"), s),
      saveSequence(sequence("b"), s),
    ]);
    expect(
      (await loadSequences("class_a", s)).map((item) => item.id).sort(),
    ).toEqual(["a", "b"]);
  });
});
