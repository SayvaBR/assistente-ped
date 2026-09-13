import {
  emptyAcademic,
  validateAcademic,
  type AcademicData,
} from "../domain/academic";
import { readJson, writeJson, storage } from "./localStore";
import type { StoragePort } from "../domain/models";
function academicKey(classId: string) {
  if (!/^[a-zA-Z0-9_-]+$/.test(classId))
    throw new Error("Selecione uma turma válida.");
  return `turma:${classId}:academico:v1`;
}
export async function loadAcademic(
  classId: string,
  port: StoragePort = storage,
) {
  const data = await readJson<AcademicData>(
    academicKey(classId),
    emptyAcademic(),
    port,
  );
  if (data.versao !== 1 || !Array.isArray(data.avaliacoes))
    throw new Error("Formato acadêmico incompatível.");
  validateAcademic(data);
  return data;
}
export async function saveAcademic(
  classId: string,
  data: AcademicData,
  port: StoragePort = storage,
) {
  validateAcademic(data);
  await writeJson(academicKey(classId), data, port);
}
