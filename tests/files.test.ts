import { describe, expect, it } from "vitest";
import { Ch, Ea, Jf, listTrash, normalizeFolder, restoreTrash, trashDocument, trashFolder } from "../src/data/files.js";

function memory(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    async get(key: string) { if (!data.has(key)) throw new Error("Registro não encontrado"); return { value: data.get(key)! }; },
    async set(key: string, value: string) { data.set(key, value); },
    async delete(key: string) { data.delete(key); },
    async list(prefix = "") { return { keys: [...data.keys()].filter((key) => key.startsWith(prefix)) }; },
  };
}

const document = { id: "doc-1", nome: "atividade.pdf", tamanho: 12, mime: "application/pdf", path: "midia/documentos/doc-1.pdf", uri: "file:///doc-1.pdf", pastaId: Ea, favorito: false };

describe("biblioteca de arquivos", () => {
  it("mantém pastas legadas e adiciona metadados de organização", async () => {
    const port = memory();
    const folder = normalizeFolder({ id: "folder-1", nome: "Matemática", pastaPaiId: Ea, cor: "orange", favorito: true });
    await Jf(port, [folder]);
    expect((await Ch(port))[0]).toMatchObject({ nome: "Matemática", cor: "orange", favorito: true });
  });

  it("move arquivo para a lixeira sem apagar a mídia e restaura no destino válido", async () => {
    const port = memory({ "documentos:app:v2": JSON.stringify([document]) });
    await trashDocument(document, [document], { storage: port });
    expect(JSON.parse(port.data.get("documentos:app:v2")!)).toEqual([]);
    const [entry] = await listTrash(port);
    expect(entry.type).toBe("file");
    await restoreTrash(entry, { storage: port });
    expect(JSON.parse(port.data.get("documentos:app:v2")!)[0].id).toBe(document.id);
  });

  it("impede excluir pasta que ainda tem conteúdo", async () => {
    const port = memory();
    const folder = normalizeFolder({ id: "folder-1", nome: "Projetos" });
    await Jf(port, [folder]);
    await expect(trashFolder(folder, [folder], [{ ...document, pastaId: folder.id }], { storage: port })).rejects.toThrow("Esvazie");
  });
});
