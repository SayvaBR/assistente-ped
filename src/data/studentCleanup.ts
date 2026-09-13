import { Filesystem } from "@capacitor/filesystem";
import { deleteMedia } from "./files.js";
import { storage as defaultStorage } from "./localStore";
import type { StoragePort } from "../domain/models";

type FileSystemPort = Pick<typeof Filesystem, "deleteFile">;

function isMissing(error: unknown) {
  const message = String((error as Error)?.message || error).toLowerCase();
  return [
    "not found",
    "does not exist",
    "ausente",
    "encontrada",
    "encontrado",
    "registro não encontrado",
  ].some((term) => message.includes(term));
}

function parseJson(value: string, key: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    throw new Error(`Não foi possível ler os dados associados a ${key}.`);
  }
}

async function readJson(
  port: StoragePort,
  key: string,
): Promise<unknown | null> {
  try {
    return parseJson((await port.get(key)).value, key);
  } catch (error) {
    if (isMissing(error)) return null;
    throw error;
  }
}

async function readProfile(port: StoragePort, key: string) {
  try {
    const { value } = await port.get(key);
    try {
      return JSON.parse(value) as unknown;
    } catch {
      // Older builds could store a data URL directly instead of JSON.
      return value;
    }
  } catch (error) {
    if (isMissing(error)) return null;
    throw error;
  }
}

async function deleteMediaIfPresent(
  value: unknown,
  filesystem: FileSystemPort,
) {
  if (value && typeof value === "object" && "path" in value) {
    await deleteMedia(value, { filesystem: filesystem as typeof Filesystem });
  }
}

async function purgeStudentMedia(
  studentId: string,
  port: StoragePort,
  filesystem: FileSystemPort,
) {
  const profileKey = `foto-perfil:${studentId}`;
  const profile = await readProfile(port, profileKey);
  await deleteMediaIfPresent(profile, filesystem);
  await port.delete(profileKey).catch((error) => {
    if (!isMissing(error)) throw error;
  });

  const galleryKey = `fotos:${studentId}`;
  const gallery = await readJson(port, galleryKey);
  if (gallery !== null) {
    if (!Array.isArray(gallery))
      throw new Error("A galeria do aluno está corrompida.");
    for (const item of gallery) {
      const media =
        item && typeof item === "object" && "arquivo" in item
          ? item.arquivo
          : item;
      await deleteMediaIfPresent(media, filesystem);
    }
  }
  await port.delete(galleryKey).catch((error) => {
    if (!isMissing(error)) throw error;
  });

  const observationsKey = `obs:${studentId}`;
  const observations = await readJson(port, observationsKey);
  if (observations !== null) {
    if (!Array.isArray(observations))
      throw new Error("As observações do aluno estão corrompidas.");
    for (const observation of observations) {
      if (observation && typeof observation === "object" && "audio" in observation) {
        await deleteMediaIfPresent(observation.audio, filesystem);
      }
    }
  }
  await port.delete(observationsKey).catch((error) => {
    if (!isMissing(error)) throw error;
  });
  await port.delete(`evolucao:${studentId}`).catch((error) => {
    if (!isMissing(error)) throw error;
  });
}

async function rewriteObjectEntry(
  port: StoragePort,
  key: string,
  studentId: string,
) {
  const value = await readJson(port, key);
  if (value === null) return;
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`Os dados associados a ${key} estão corrompidos.`);
  if (!Object.prototype.hasOwnProperty.call(value, studentId)) return;
  const next = { ...(value as Record<string, unknown>) };
  delete next[studentId];
  if (Object.keys(next).length === 0) await port.delete(key);
  else await port.set(key, JSON.stringify(next));
}

async function rewriteArrayEntries(
  port: StoragePort,
  key: string,
  studentId: string,
  matches: (entry: unknown) => boolean,
) {
  const value = await readJson(port, key);
  if (value === null) return;
  if (!Array.isArray(value))
    throw new Error(`Os dados associados a ${key} estão corrompidos.`);
  const next = value.filter((entry) => !matches(entry));
  if (next.length === value.length) return;
  if (next.length === 0) await port.delete(key);
  else await port.set(key, JSON.stringify(next));
}

async function purgeClassRecords(
  studentId: string,
  classId: string,
  port: StoragePort,
) {
  if (!/^[\w-]+$/.test(classId)) return;
  const prefixes = [
    `turma:${classId}:rotina:`,
    `turma:${classId}:ocorrencias:`,
    `turma:${classId}:chamada:`,
    `turma:${classId}:justificativas:`,
  ];

  for (const prefix of prefixes) {
    const { keys } = await port.list(prefix);
    for (const key of keys) {
      if (prefix.includes(":ocorrencias:")) {
        await rewriteArrayEntries(
          port,
          key,
          studentId,
          (entry) =>
            Boolean(
              entry &&
                typeof entry === "object" &&
                "alunoId" in entry &&
                entry.alunoId === studentId,
            ),
        );
      } else {
        await rewriteObjectEntry(port, key, studentId);
      }
    }
  }

  const academicKey = `turma:${classId}:academico:v1`;
  const academic = await readJson(port, academicKey);
  if (academic !== null) {
    if (
      !academic ||
      typeof academic !== "object" ||
      !Array.isArray((academic as { avaliacoes?: unknown }).avaliacoes)
    ) {
      throw new Error(`Os dados associados a ${academicKey} estão corrompidos.`);
    }
    const next = {
      ...(academic as Record<string, unknown>),
      avaliacoes: (academic as { avaliacoes: unknown[] }).avaliacoes.map(
        (assessment) => {
          if (!assessment || typeof assessment !== "object") return assessment;
          const notas = (assessment as { notas?: unknown }).notas;
          if (!notas || typeof notas !== "object" || Array.isArray(notas))
            return assessment;
          const nextNotas = { ...(notas as Record<string, unknown>) };
          delete nextNotas[studentId];
          return { ...(assessment as Record<string, unknown>), notas: nextNotas };
        },
      ),
    };
    await port.set(academicKey, JSON.stringify(next));
  }

  const notebookKey = `turma:${classId}:caderno:v1`;
  const notebook = await readJson(port, notebookKey);
  if (notebook !== null) {
    if (
      !notebook ||
      typeof notebook !== "object" ||
      !Array.isArray((notebook as { entradas?: unknown }).entradas)
    ) {
      throw new Error(`Os dados associados a ${notebookKey} estão corrompidos.`);
    }
    const next = {
      ...(notebook as Record<string, unknown>),
      entradas: (notebook as { entradas: unknown[] }).entradas.map((entry) => {
        if (!entry || typeof entry !== "object") return entry;
        const alunoIds = (entry as { alunoIds?: unknown }).alunoIds;
        if (!Array.isArray(alunoIds)) return entry;
        return {
          ...(entry as Record<string, unknown>),
          alunoIds: alunoIds.filter((id) => id !== studentId),
        };
      }),
    };
    await port.set(notebookKey, JSON.stringify(next));
  }
}

async function classIdsFor(port: StoragePort, preferredClassId?: string) {
  const ids = new Set<string>();
  if (preferredClassId && /^[\w-]+$/.test(preferredClassId)) ids.add(preferredClassId);
  const classes = await readJson(port, "turmas:lista");
  if (Array.isArray(classes)) {
    for (const classroom of classes) {
      if (
        classroom &&
        typeof classroom === "object" &&
        typeof classroom.id === "string" &&
        /^[\w-]+$/.test(classroom.id)
      ) {
        ids.add(classroom.id);
      }
    }
  }
  return [...ids];
}

/**
 * Permanently removes the student's direct data and all class-scoped indexes.
 * Soft deletion remains the default UI action; this function is only used by
 * the explicit, confirmed action in the trash.
 */
export async function purgeStudentData(
  studentId: string,
  preferredClassId?: string | null,
  port: StoragePort = defaultStorage,
  filesystem: FileSystemPort = Filesystem,
) {
  if (!studentId || !/^[\w-]+$/.test(studentId))
    throw new Error("Aluno inválido para exclusão definitiva.");
  await purgeStudentMedia(studentId, port, filesystem);
  for (const classId of await classIdsFor(port, preferredClassId || undefined)) {
    await purgeClassRecords(studentId, classId, port);
  }
}
