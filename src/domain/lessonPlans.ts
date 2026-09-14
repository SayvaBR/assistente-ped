import type { LessonPlan } from "./models";

export function newLessonPlan({
  turmaId,
  dataKey,
}: { turmaId?: string; dataKey?: string } = {}): LessonPlan {
  const now = new Date();
  return {
    id: `plano_${crypto.randomUUID().replaceAll("-", "")}`,
    turmaId: turmaId || null,
    dataKey:
      dataKey ||
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
    tituloTema: "",
    horaInicio: "",
    horaFim: "",
    status: "rascunho",
    objetivoGeral: "",
    objetivosEspecificos: [],
    disciplina: "",
    objetoConhecimento: "",
    justificativa: "",
    bncc: { habilidades: [], descricoes: {} },
    momentos: [],
    recursos: "",
    avaliacao: "",
    inclusao: "",
    observacoes: "",
    posAula: { comoFoi: null, observacoesPosAula: "" },
    criadoEm: now.toISOString(),
    atualizadoEm: now.toISOString(),
  };
}

/** Legacy moments and modern plans can coexist after an interrupted upgrade. */
export function normalizeLessonPlans(
  raw: unknown,
  options: { dataKey?: string; turmaId?: string } = {},
): LessonPlan[] {
  if (
    !Array.isArray(raw) ||
    raw.some((item) => !item || typeof item !== "object" || Array.isArray(item))
  )
    throw new Error(
      "O planejamento salvo não pôde ser lido. Os registros foram preservados.",
    );
  const modern = raw.filter((item) => Array.isArray(item.momentos));
  const legacy = raw.filter((item) => !Array.isArray(item.momentos));
  if (!legacy.length) return modern;
  const base = newLessonPlan(options);
  // A stable ID lets editing/moving a migrated plan replace its original entry.
  const id = `plano_migrado_${options.turmaId || "local"}_${base.dataKey}`;
  return [
    ...modern,
    {
      ...base,
      id,
      tituloTema: "Plano migrado",
      status: "concluido",
      bncc: {
        habilidades: [
          ...new Set<string>(legacy.flatMap((item) => item.habilidades || [])),
        ],
      },
      momentos: legacy.map((item, index) => ({
        ...item,
        id: item.id || `${id}_momento_${index}`,
        titulo: item.titulo || "Momento",
        horario: item.horario || item.hora || "",
        duracaoMin: item.duracaoMin ?? null,
        descricao: item.descricao || item.sub || "",
        tipo: item.tipo || "acolhida",
      })),
    },
  ];
}
