export const stageLabels = {
  educacao_infantil: "Educação Infantil",
  fundamental_anos_iniciais: "Fundamental — Anos Iniciais",
  fundamental_anos_finais: "Fundamental — Anos Finais",
  ensino_medio: "Ensino Médio",
} as const;
export type EducationStage = keyof typeof stageLabels;
export const educationStages = Object.values(stageLabels);
export function stageFrom(value: unknown): EducationStage | null {
  if (typeof value !== "string") return null;
  if (value in stageLabels) return value as EducationStage;
  return (
    (Object.keys(stageLabels) as EducationStage[]).find(
      (key) => stageLabels[key] === value,
    ) ?? null
  );
}
export function levelsFor(stage: string): string[] {
  switch (stageFrom(stage)) {
    case "fundamental_anos_iniciais":
      return Array.from({ length: 5 }, (_, i) => `${i + 1}º ano`);
    case "fundamental_anos_finais":
      return Array.from({ length: 4 }, (_, i) => `${i + 6}º ano`);
    case "ensino_medio":
      return ["1ª série", "2ª série", "3ª série"];
    default:
      return [
        "Berçário I",
        "Berçário II",
        "Nível I",
        "Nível II",
        "Nível III",
        "Nível IV",
        "Nível V",
      ];
  }
}
export interface EducationConfig {
  etapa?: EducationStage | null;
  rotinaInfantilHabilitada?: boolean;
  notasHabilitadas?: boolean;
  bnccHabilitada?: boolean;
  frequenciaHabilitada?: boolean;
}
export function capabilitiesFor(config?: EducationConfig | null) {
  const stage = stageFrom(config?.etapa);
  const infantil = stage === "educacao_infantil";
  return {
    needsStage: !stage,
    rotina: config?.rotinaInfantilHabilitada ?? infantil,
    notas: config?.notasHabilitadas ?? (!!stage && !infantil),
    desenvolvimento: infantil,
    componentesCurriculares: !!stage && !infantil,
    bncc: config?.bnccHabilitada ?? true,
    frequencia: config?.frequenciaHabilitada ?? true,
  };
}
