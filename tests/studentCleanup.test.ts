import { describe, expect, it } from "vitest";
import { purgeStudentData } from "../src/data/studentCleanup";

function memory(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    async get(key: string) {
      if (!data.has(key)) throw new Error("Registro não encontrado");
      return { value: data.get(key)! };
    },
    async set(key: string, value: string) {
      data.set(key, value);
    },
    async delete(key: string) {
      data.delete(key);
    },
    async list(prefix = "") {
      return { keys: [...data.keys()].filter((key) => key.startsWith(prefix)) };
    },
  };
}

describe("exclusão definitiva de aluno", () => {
  it("remove dados diretos, mídia e referências de todas as áreas da turma", async () => {
    const port = memory({
      "turmas:lista": JSON.stringify([{ id: "turma-1" }]),
      "foto-perfil:aluno-1": JSON.stringify({ path: "midia/aluno-1/perfil.jpg" }),
      "fotos:aluno-1": JSON.stringify([
        { arquivo: { path: "midia/aluno-1/foto.jpg" } },
      ]),
      "obs:aluno-1": JSON.stringify([
        { audio: { path: "midia/aluno-1/audio.webm" } },
      ]),
      "evolucao:aluno-1": JSON.stringify([{ texto: "privado" }]),
      "turma:turma-1:rotina:2026-09-12": JSON.stringify({
        "aluno-1": { texto: "privado" },
        "aluno-2": { texto: "preservar" },
      }),
      "turma:turma-1:ocorrencias:2026-09-12": JSON.stringify([
        { alunoId: "aluno-1", descricao: "privado" },
        { alunoId: "aluno-2", descricao: "preservar" },
      ]),
      "turma:turma-1:chamada:2026-09-12": JSON.stringify({
        "aluno-1": "falta",
        "aluno-2": "presente",
      }),
      "turma:turma-1:academico:v1": JSON.stringify({
        versao: 1,
        avaliacoes: [{ id: "a1", notas: { "aluno-1": { valor: 2 }, "aluno-2": { valor: 8 } } }],
      }),
      "turma:turma-1:caderno:v1": JSON.stringify({
        versao: 1,
        entradas: [{ id: "n1", alunoIds: ["aluno-1", "aluno-2"] }],
      }),
    });
    const deletedPaths: string[] = [];
    const filesystem = {
      async deleteFile({ path }: { path: string }) {
        deletedPaths.push(path);
      },
    };

    await purgeStudentData("aluno-1", "turma-1", port, filesystem);

    expect(deletedPaths.sort()).toEqual([
      "midia/aluno-1/audio.webm",
      "midia/aluno-1/foto.jpg",
      "midia/aluno-1/perfil.jpg",
    ]);
    expect(port.data.has("obs:aluno-1")).toBe(false);
    expect(JSON.parse(port.data.get("turma:turma-1:rotina:2026-09-12")!)).toEqual({
      "aluno-2": { texto: "preservar" },
    });
    expect(JSON.parse(port.data.get("turma:turma-1:ocorrencias:2026-09-12")!)).toEqual([
      { alunoId: "aluno-2", descricao: "preservar" },
    ]);
    expect(JSON.parse(port.data.get("turma:turma-1:chamada:2026-09-12")!)).toEqual({
      "aluno-2": "presente",
    });
    expect(JSON.parse(port.data.get("turma:turma-1:academico:v1")!).avaliacoes[0].notas).toEqual({
      "aluno-2": { valor: 8 },
    });
    expect(JSON.parse(port.data.get("turma:turma-1:caderno:v1")!).entradas[0].alunoIds).toEqual([
      "aluno-2",
    ]);
  });
});
