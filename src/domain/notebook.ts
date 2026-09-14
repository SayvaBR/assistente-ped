export interface NotebookEntry {
  id: string;
  turmaId: string;
  titulo: string;
  texto: string;
  alunoIds: string[];
  planoId: string;
  tags: string[];
  tarefas: { id: string; texto: string; concluida: boolean }[];
  arquivoIds: string[];
  fixada: boolean;
  arquivadaEm: string | null;
  excluidaEm: string | null;
  lembrete: { id: number; quando: string } | null;
  criadoEm: string;
  atualizadoEm: string;
  revisao: number;
}
export interface Notebook {
  versao: 1;
  entradas: NotebookEntry[];
}
export function validateNotebookEntry(entry: NotebookEntry, classId: string) {
  if (!entry || !/^[\w-]+$/.test(entry.id) || entry.turmaId !== classId)
    throw new Error("O registro pertence a outra turma ou está incompleto.");
  if (
    typeof entry.titulo !== "string" ||
    typeof entry.texto !== "string" ||
    !entry.titulo.trim() ||
    entry.titulo.length > 180 ||
    entry.texto.length > 50000
  )
    throw new Error(
      "Informe um título de até 180 caracteres e um texto de até 50 mil caracteres.",
    );
  for (const values of [entry.alunoIds, entry.tags, entry.arquivoIds])
    if (
      !Array.isArray(values) ||
      values.some((value) => typeof value !== "string")
    )
      throw new Error("Confira os vínculos e as etiquetas do registro.");
  if (
    typeof entry.planoId !== "string" ||
    typeof entry.fixada !== "boolean" ||
    (typeof entry.arquivadaEm !== "string" && entry.arquivadaEm !== null) ||
    (typeof entry.excluidaEm !== "string" && entry.excluidaEm !== null) ||
    !validIsoDate(entry.criadoEm) ||
    !validIsoDate(entry.atualizadoEm)
  )
    throw new Error("Os metadados do registro estão incompletos.");
  if (
    new Set(entry.alunoIds).size !== entry.alunoIds.length ||
    new Set(entry.arquivoIds).size !== entry.arquivoIds.length
  )
    throw new Error("Há vínculos duplicados neste registro.");
  if (
    !Array.isArray(entry.tarefas) ||
    entry.tarefas.some(
      (item) =>
        !item.id || !item.texto.trim() || typeof item.concluida !== "boolean",
    ) ||
    new Set(entry.tarefas.map((item) => item.id)).size !== entry.tarefas.length
  )
    throw new Error("Preencha o texto de cada tarefa.");
  if (!Number.isInteger(entry.revisao) || entry.revisao < 0)
    throw new Error("A versão do registro é inválida.");
  if (
    entry.lembrete !== null &&
    (!entry.lembrete ||
      !Number.isInteger(entry.lembrete.id) ||
      entry.lembrete.id <= 0 ||
      !validIsoDate(entry.lembrete.quando))
  )
    throw new Error("O lembrete deste registro é inválido.");
}
function validIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}
export function findNotebookEntries(
  entries: NotebookEntry[],
  {
    query = "",
    tag = "",
    studentId = "",
    view = "ativas",
  }: { query?: string; tag?: string; studentId?: string; view?: string } = {},
) {
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return entries
    .filter((entry) => {
      const state =
        view === "lixeira"
          ? !!entry.excluidaEm
          : !entry.excluidaEm &&
            (view === "arquivadas" ? !!entry.arquivadaEm : !entry.arquivadaEm);
      return (
        state &&
        (!tag || entry.tags.includes(tag)) &&
        (!studentId || entry.alunoIds.includes(studentId)) &&
        terms.every((term) =>
          normalize(
            [
              entry.titulo,
              entry.texto,
              ...entry.tags,
              ...entry.tarefas.map((t) => t.texto),
            ].join(" "),
          ).includes(term),
        )
      );
    })
    .sort(
      (a, b) =>
        Number(b.fixada) - Number(a.fixada) ||
        b.atualizadoEm.localeCompare(a.atualizadoEm),
    );
}
