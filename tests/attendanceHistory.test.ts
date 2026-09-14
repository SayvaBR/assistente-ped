import { describe, expect, it } from 'vitest';
import { summarizeAttendanceHistory } from '../src/v2/screens/attendance-history';

describe('summarizeAttendanceHistory', () => {
  it('orders dates newest-first and preserves every attendance status count', () => {
    const result = summarizeAttendanceHistory({
      '2024-08-27': { ana: 'presente', bruno: 'falta', caio: 'atrasado' },
      '2024-08-28': { ana: 'presente', bruno: 'falta_justificada', caio: 'saida_antecipada' },
      '2024-08-26': {},
    });

    expect(result.events).toEqual([
      { date: '2024-08-28', present: 1, absent: 1, justified: 1, late: 0, earlyExit: 1 },
      { date: '2024-08-27', present: 1, absent: 1, justified: 0, late: 1, earlyExit: 0 },
    ]);
    expect(result.totals).toEqual({ present: 2, absent: 2, justified: 1, late: 1, earlyExit: 1 });
  });

  it('limits displayed events without changing totals', () => {
    const result = summarizeAttendanceHistory({
      '2024-08-28': { ana: 'presente' },
      '2024-08-27': { ana: 'falta' },
      '2024-08-26': { ana: 'atrasado' },
    }, 2);

    expect(result.events).toHaveLength(2);
    expect(result.totals).toEqual({ present: 1, absent: 1, justified: 0, late: 1, earlyExit: 0 });
  });
});
