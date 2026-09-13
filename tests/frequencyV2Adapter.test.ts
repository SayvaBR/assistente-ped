import { describe, expect, it } from 'vitest';
import { createFrequencyV2Data } from '../src/v2/adapters/frequency-v2-adapter';

describe('createFrequencyV2Data', () => {
  it('preserves all domain attendance statuses and derives the real summary input', () => {
    const data = createFrequencyV2Data({
      turma: { id: 'class-1', nome: '5º Ano A' },
      alunos: [
        { id: 'a', nome: 'Ana' },
        { id: 'b', nome: 'Bruno' },
        { id: 'c', nome: 'Caio' },
        { id: 'd', nome: 'Dani' },
        { id: 'e', nome: 'Enzo' },
      ],
      frequencia: {
        a: 'presente',
        b: 'falta',
        c: 'atrasado',
        d: 'falta_justificada',
        e: 'saida_antecipada',
      },
      dataKey: '2024-08-28',
    });

    expect(data.className).toBe('5º Ano A');
    expect(data.studentCount).toBe(5);
    expect(data.dateLabel).toBe('quarta-feira, 28 de agosto');
    expect(data.students.map((student) => student.status)).toEqual([
      'presente',
      'falta',
      'atrasado',
      'falta_justificada',
      'saida_antecipada',
    ]);
  });

  it('does not turn unknown persisted values into a visual status', () => {
    const data = createFrequencyV2Data({
      alunos: [{ id: 'a', nome: 'Ana' }],
      frequencia: { a: 'legacy-value' as never },
      dataKey: '2026-09-13',
    });

    expect(data.students[0].status).toBeUndefined();
  });
});
