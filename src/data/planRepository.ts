import { readJson, storage, writeJson } from "./localStore";
import type { LessonPlan, StoragePort } from "../domain/models";
import { normalizeLessonPlans } from "../domain/lessonPlans";
const writes = new Map<string, Promise<unknown>>();
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function prefixFor(turmaId: string) {
  if (!turmaId || !/^[a-zA-Z0-9_-]+$/.test(turmaId))
    throw new Error("Selecione uma turma válida.");
  return `turma:${turmaId}:planejamento:`;
}

export async function loadPlansByDate(
  turmaId: string,
  dataKey: string,
  port: StoragePort = storage,
): Promise<LessonPlan[]> {
  if (!datePattern.test(dataKey)) throw new Error("Informe uma data válida.");
  const plans = normalizeLessonPlans(
    await readJson<unknown>(`${prefixFor(turmaId)}${dataKey}`, [], port),
    { turmaId, dataKey },
  );
  return plans.filter((plan) => !plan.arquivadoEm);
}

export async function listPlans(
  turmaId: string,
  port: StoragePort = storage,
): Promise<LessonPlan[]> {
  const prefix = prefixFor(turmaId);
  const rows: LessonPlan[] = [];
  for (const key of (await port.list(prefix)).keys) {
    const dataKey = key.slice(prefix.length);
    if (!datePattern.test(dataKey)) continue;
    const plans = normalizeLessonPlans(await readJson<unknown>(key, [], port), {
      turmaId,
      dataKey,
    });
    rows.push(...plans);
  }
  return rows.sort((a, b) =>
    `${b.dataKey}${b.atualizadoEm}`.localeCompare(`${a.dataKey}${a.atualizadoEm}`),
  );
}

export async function deletePlan(
  plan: LessonPlan,
  port: StoragePort = storage,
): Promise<LessonPlan[]> {
  const key = `${prefixFor(plan.turmaId || "")}${plan.dataKey}`;
  const current = normalizeLessonPlans(await readJson<unknown>(key, [], port), {
    turmaId: plan.turmaId || undefined,
    dataKey: plan.dataKey,
  });
  const next = current.filter((item) => item.id !== plan.id);
  await writeJson(key, next, port);
  return next;
}

export async function updatePlanMetadata(
  plan: LessonPlan,
  patch: Pick<LessonPlan, "favorito" | "arquivadoEm">,
  port: StoragePort = storage,
) {
  return savePlan(
    {
      ...plan,
      ...patch,
      atualizadoEm: new Date().toISOString(),
    },
    port,
  );
}
/** Save a plan to its new date and remove old copies as one rollback-protected operation. */
export function savePlan(
  plan: LessonPlan,
  port: StoragePort = storage,
): Promise<LessonPlan[]> {
  if (!plan.turmaId || !/^[a-zA-Z0-9_-]+$/.test(plan.turmaId))
    return Promise.reject(new Error("Selecione uma turma válida."));
  if (!datePattern.test(plan.dataKey))
    return Promise.reject(new Error("Informe uma data válida."));
  const prefix = prefixFor(plan.turmaId);
  const operation = (writes.get(prefix) || Promise.resolve())
    .catch(() => {})
    .then(async () => {
      const key = `${prefix}${plan.dataKey}`;
      const existing = normalizeLessonPlans(
        await readJson<unknown>(key, [], port),
        { turmaId: plan.turmaId!, dataKey: plan.dataKey },
      );
      if (!Array.isArray(existing))
        throw new Error("O planejamento salvo não pôde ser lido.");
      const updates = new Map<string, LessonPlan[]>();
      updates.set(
        key,
        existing.some((p) => p.id === plan.id)
          ? existing.map((p) => (p.id === plan.id ? plan : p))
          : [...existing, plan],
      );
      for (const oldKey of (await port.list(prefix)).keys.filter(
        (k) => k !== key && /^\d{4}-\d{2}-\d{2}$/.test(k.slice(prefix.length)),
      )) {
        const plans = normalizeLessonPlans(
          await readJson<unknown>(oldKey, [], port),
          { turmaId: plan.turmaId!, dataKey: oldKey.slice(prefix.length) },
        );
        if (!Array.isArray(plans))
          throw new Error("Um planejamento anterior não pôde ser lido.");
        if (plans.some((p) => p.id === plan.id))
          updates.set(
            oldKey,
            plans.filter((p) => p.id !== plan.id),
          );
      }
      const backup = new Map<string, string | null>();
      const keys = (await port.list(prefix)).keys;
      for (const target of updates.keys())
        backup.set(
          target,
          keys.includes(target) ? (await port.get(target)).value : null,
        );
      try {
        for (const [target, value] of updates)
          await writeJson(target, value, port);
      } catch (error) {
        for (const [target, value] of backup) {
          if (value === null) await port.delete(target);
          else await port.set(target, value);
        }
        throw error;
      }
      return updates.get(key)!;
    });
  writes.set(prefix, operation);
  return operation;
}
