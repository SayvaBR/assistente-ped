import { describe, expect, it } from "vitest";
import { deletePlan, listPlans, loadPlansByDate, savePlan, updatePlanMetadata } from "../src/data/planRepository";
import { newLessonPlan } from "../src/domain/lessonPlans";
import { newTeachingActivity, saveActivity, listActivities } from "../src/domain/activities";
import type { StoragePort } from "../src/domain/models";
import { buildPlanningDayRows } from "../src/v2/screens/PlanningDayV2";

function memoryStorage(): StoragePort {
  const values = new Map<string, string>();
  return {
    async get(key) {
      const value = values.get(key);
      if (value === undefined) throw new Error("Registro não encontrado");
      return { value };
    },
    async set(key, value) { values.set(key, value); },
    async delete(key) { values.delete(key); },
    async list(prefix) { return { keys: [...values.keys()].filter((key) => key.startsWith(prefix)) }; },
  };
}

describe("planning repository", () => {
  it("keeps untimed moments visible after timed moments", () => {
    const plan = newLessonPlan({ turmaId: "turma-rows", dataKey: "2026-09-12" });
    plan.tituloTema = "Ciclo da água";
    plan.momentos = [
      { id: "timed", titulo: "Experimento", horario: "10:00", duracaoMin: 30, descricao: "", tipo: "aula" },
      { id: "untimed", titulo: "Fechamento", horario: "", duracaoMin: null, descricao: "Síntese coletiva", tipo: "aula" },
    ];

    expect(buildPlanningDayRows([plan])).toEqual([
      expect.objectContaining({ time: "10:00", moment: expect.objectContaining({ id: "timed" }) }),
      expect.objectContaining({ time: "", moment: expect.objectContaining({ id: "untimed" }) }),
    ]);
  });

  it("persists, moves and reloads plans by date", async () => {
    const port = memoryStorage();
    const plan = newLessonPlan({ turmaId: "turma-1", dataKey: "2026-09-12" });
    plan.tituloTema = "Frações";
    await savePlan(plan, port);
    expect((await loadPlansByDate("turma-1", "2026-09-12", port))[0].tituloTema).toBe("Frações");

    const moved = { ...plan, dataKey: "2026-09-13", atualizadoEm: new Date().toISOString() };
    await savePlan(moved, port);
    expect(await loadPlansByDate("turma-1", "2026-09-12", port)).toEqual([]);
    expect((await listPlans("turma-1", port))[0].dataKey).toBe("2026-09-13");
  });

  it("supports favorite/archive metadata and explicit deletion", async () => {
    const port = memoryStorage();
    const plan = newLessonPlan({ turmaId: "turma-2", dataKey: "2026-09-12" });
    await savePlan(plan, port);
    await updatePlanMetadata(plan, { favorito: true, arquivadoEm: new Date().toISOString() }, port);
    const archived = (await listPlans("turma-2", port))[0];
    expect(archived.favorito).toBe(true);
    expect(archived.arquivadoEm).toBeTruthy();
    await deletePlan(archived, port);
    expect(await listPlans("turma-2", port)).toEqual([]);
  });

  it("persists a real activity and rejects incomplete content", async () => {
    const port = memoryStorage();
    const activity = newTeachingActivity({ turmaId: "turma-atividade", dataKey: "2026-09-12" });
    await expect(saveActivity(activity, port)).rejects.toThrow("título");
    const saved = await saveActivity({ ...activity, titulo: "Caça às palavras", instrucoes: "Encontrar palavras no texto." }, port);
    expect(saved).toHaveLength(1);
    expect((await listActivities("turma-atividade", port))[0]).toMatchObject({ titulo: "Caça às palavras", status: "rascunho" });
  });
});
