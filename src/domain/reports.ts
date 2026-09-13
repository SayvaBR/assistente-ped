import type { Attendance, Student } from "./models";
import { attendanceSummary } from "./attendance";
export function buildAttendanceReport(
  students: Student[],
  days: Record<string, Attendance>,
  from: string,
  to: string,
) {
  if (from && to && from > to)
    throw Error("A data inicial deve vir antes da final.");
  const selected = Object.entries(days).filter(
    ([day]) => (!from || day >= from) && (!to || day <= to),
  );
  return students.map((student) => {
    const count = {
      presencas: 0,
      faltas: 0,
      atrasos: 0,
      faltasJustificadas: 0,
      saidasAntecipadas: 0,
    };
    for (const [, day] of selected) {
      if (day[student.id] === "presente") count.presencas++;
      if (day[student.id] === "falta") count.faltas++;
      if (day[student.id] === "atrasado") count.atrasos++;
      if (day[student.id] === "falta_justificada") count.faltasJustificadas++;
      if (day[student.id] === "saida_antecipada") count.saidasAntecipadas++;
    }
    return { ...student, ...count, ...attendanceSummary(count) };
  });
}
export function csvCell(value: unknown) {
  const text = String(value ?? "");
  return (
    '"' +
    (/^[=+\-@\t\r]/.test(text) ? "'" : "") +
    text.replaceAll('"', '""') +
    '"'
  );
}
export function reportCsv(rows: ReturnType<typeof buildAttendanceReport>) {
  return (
    "\uFEFF" +
    [
      [
        "Aluno",
        "Presenças",
        "Atrasos",
        "Saídas antecipadas",
        "Faltas",
        "Faltas justificadas",
        "Frequência (%)",
      ],
      ...rows.map((r) => [
        r.nome,
        r.presencas,
        r.atrasos,
        r.saidasAntecipadas,
        r.faltas,
        r.faltasJustificadas,
        r.percentage ?? "Sem marcação",
      ]),
    ]
      .map((r) => r.map(csvCell).join(";"))
      .join("\r\n")
  );
}
