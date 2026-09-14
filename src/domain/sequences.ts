export type SequenceLessonStatus = "pendente" | "em_andamento" | "concluida";
export interface SequenceLesson {
  id: string;
  titulo: string;
  descricao: string;
  dataKey: string;
  planoId: string;
  status: SequenceLessonStatus;
}
export interface TeachingSequence {
  id: string;
  turmaId: string;
  titulo: string;
  objetivo: string;
  bnccIds: string[];
  aulas: SequenceLesson[];
  criadoEm: string;
  atualizadoEm: string;
}
export function validateSequence(sequence: TeachingSequence, turmaId: string) {
  if (
    !sequence ||
    !/^[\w-]+$/.test(sequence.id) ||
    sequence.turmaId !== turmaId
  )
    throw new Error("A sequência pertence a outra turma ou está incompleta.");
  if (
    typeof sequence.titulo !== "string" ||
    !sequence.titulo.trim() ||
    sequence.titulo.length > 180
  )
    throw new Error(
      "Informe um título de até 180 caracteres para a sequência.",
    );
  if (
    typeof sequence.objetivo !== "string" ||
    sequence.objetivo.length > 10000 ||
    !Array.isArray(sequence.bnccIds) ||
    sequence.bnccIds.some((id) => typeof id !== "string")
  )
    throw new Error("Confira o objetivo e as habilidades da sequência.");
  if (
    !Array.isArray(sequence.aulas) ||
    sequence.aulas.some(
      (lesson) =>
        !lesson ||
        !/^[\w-]+$/.test(lesson.id) ||
        !lesson.titulo.trim() ||
        !["pendente", "em_andamento", "concluida"].includes(lesson.status) ||
        (lesson.dataKey && !/^\d{4}-\d{2}-\d{2}$/.test(lesson.dataKey)),
    )
  )
    throw new Error("Preencha o título e o estado de cada aula.");
  if (
    new Set(sequence.aulas.map((lesson) => lesson.id)).size !==
    sequence.aulas.length
  )
    throw new Error("Há aulas duplicadas na sequência.");
  if (!validIso(sequence.criadoEm) || !validIso(sequence.atualizadoEm))
    throw new Error("As datas da sequência são inválidas.");
}
function validIso(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}
export function sequenceProgress(sequence: TeachingSequence) {
  const total = sequence.aulas.length;
  const concluida = sequence.aulas.filter(
    (lesson) => lesson.status === "concluida",
  ).length;
  return {
    total,
    concluida,
    percentual: total ? Math.round((concluida / total) * 100) : 0,
  };
}
