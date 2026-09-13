import type { Attendance, AttendanceStatus } from "./models";
/** A late student attended the class, so delay counts in the attendance numerator. */
export function attendanceSummary(counts: {
  presencas?: number;
  faltas?: number;
  atrasos?: number;
  faltasJustificadas?: number;
  saidasAntecipadas?: number;
}) {
  const present =
    (counts.presencas ?? 0) +
    (counts.atrasos ?? 0) +
    (counts.saidasAntecipadas ?? 0);
  const total =
    present + (counts.faltas ?? 0) + (counts.faltasJustificadas ?? 0);
  return {
    present,
    total,
    percentage: total ? Math.round((present / total) * 100) : null,
  };
}
export function toggleAttendance(
  current: Attendance,
  studentId: string,
  status: AttendanceStatus,
): Attendance {
  const next = { ...current };
  if (next[studentId] === status) delete next[studentId];
  else next[studentId] = status;
  return next;
}
