import { readJson, storage, writeJson } from "./localStore";
import type { StoragePort } from "../domain/models";
import { validateSequence, type TeachingSequence } from "../domain/sequences";
const pending = new WeakMap<StoragePort, Map<string, Promise<unknown>>>();
function key(turmaId: string) {
  if (!/^[\w-]+$/.test(turmaId)) throw new Error("Selecione uma turma válida.");
  return `turma:${turmaId}:sequencias:v1`;
}
export async function loadSequences(
  turmaId: string,
  port: StoragePort = storage,
): Promise<TeachingSequence[]> {
  const rows = await readJson<unknown>(key(turmaId), [], port);
  if (!Array.isArray(rows))
    throw new Error(
      "Não foi possível ler as sequências. Os dados foram preservados.",
    );
  rows.forEach((sequence) =>
    validateSequence(sequence as TeachingSequence, turmaId),
  );
  if (
    new Set(rows.map((sequence) => (sequence as TeachingSequence).id)).size !==
    rows.length
  )
    throw new Error("Há sequências duplicadas.");
  return rows as TeachingSequence[];
}
export function saveSequence(
  sequence: TeachingSequence,
  port: StoragePort = storage,
): Promise<TeachingSequence[]> {
  validateSequence(sequence, sequence.turmaId);
  const target = key(sequence.turmaId);
  let map = pending.get(port);
  if (!map) {
    map = new Map();
    pending.set(port, map);
  }
  const operation = (map.get(target) || Promise.resolve())
    .catch(() => {})
    .then(async () => {
      const current = await loadSequences(sequence.turmaId, port);
      const next = current.some((item) => item.id === sequence.id)
        ? current.map((item) =>
            item.id === sequence.id
              ? {
                  ...sequence,
                  titulo: sequence.titulo.trim(),
                  atualizadoEm: new Date().toISOString(),
                }
              : item,
          )
        : [
            {
              ...sequence,
              titulo: sequence.titulo.trim(),
              atualizadoEm: new Date().toISOString(),
            },
            ...current,
          ];
      await writeJson(target, next, port);
      return next;
    });
  map.set(target, operation);
  return operation;
}
export async function deleteSequence(
  id: string,
  turmaId: string,
  port: StoragePort = storage,
) {
  const rows = await loadSequences(turmaId, port);
  await writeJson(
    key(turmaId),
    rows.filter((sequence) => sequence.id !== id),
    port,
  );
}
