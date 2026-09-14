import type { Attendance, AttendanceStatus } from '../../domain/models';

export type AttendanceHistoryEvent = {
  date: string;
  present: number;
  absent: number;
  justified: number;
  late: number;
  earlyExit: number;
};

const emptyCounts = () => ({ present: 0, absent: 0, justified: 0, late: 0, earlyExit: 0 });

function countStatuses(day: Attendance) {
  return Object.values(day || {}).reduce((counts, status: AttendanceStatus) => {
    if (status === 'presente') counts.present += 1;
    if (status === 'falta') counts.absent += 1;
    if (status === 'falta_justificada') {
      counts.absent += 1;
      counts.justified += 1;
    }
    if (status === 'atrasado') counts.late += 1;
    if (status === 'saida_antecipada') counts.earlyExit += 1;
    return counts;
  }, emptyCounts());
}

export function summarizeAttendanceHistory(days: Record<string, Attendance>, limit = 6) {
  const events = Object.entries(days || {})
    .filter(([, day]) => Object.keys(day || {}).length > 0)
    .sort(([first], [second]) => second.localeCompare(first))
    .map(([date, day]) => ({ date, ...countStatuses(day) }));

  const totals = events.reduce((summary, event) => ({
    present: summary.present + event.present,
    absent: summary.absent + event.absent,
    justified: summary.justified + event.justified,
    late: summary.late + event.late,
    earlyExit: summary.earlyExit + event.earlyExit,
  }), emptyCounts());

  return { events: events.slice(0, limit), totals };
}
