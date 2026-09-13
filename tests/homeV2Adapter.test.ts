import { describe, expect, it } from 'vitest';
import { createHomeV2Data } from '../src/v2/adapters/home-v2-adapter';
import type { LessonPlan } from '../src/domain/models';

const plan = (overrides: Partial<LessonPlan> = {}): LessonPlan => ({
  id: 'plan-1',
  turmaId: 'class-1',
  dataKey: '2026-09-13',
  tituloTema: 'Frações equivalentes',
  horaInicio: '07:30',
  horaFim: '08:20',
  status: 'concluido',
  objetivoGeral: 'Representar partes de um todo.',
  objetivosEspecificos: [],
  bncc: { habilidades: ['EF05MA03'] },
  momentos: [{ id: 'moment-1', titulo: 'Explorar frações', horario: '07:30', duracaoMin: 50, descricao: 'Observar diferentes representações.', tipo: 'atividade' }],
  recursos: '',
  avaliacao: '',
  inclusao: '',
  observacoes: '',
  posAula: { comoFoi: null, observacoesPosAula: '' },
  criadoEm: '2026-09-13T10:00:00.000Z',
  atualizadoEm: '2026-09-13T10:00:00.000Z',
  ...overrides,
});

describe('createHomeV2Data', () => {
  it('maps real lesson, class context, attendance and agenda into the V2 view model', () => {
    const result = createHomeV2Data({
      now: new Date(2026, 8, 13, 7, 0),
      perfil: { nome: 'Marina Alves', tratamento: 'professora' },
      turma: { id: 'class-1', nome: '5º ano B', nivel: 'Ensino Fundamental' },
      planosDeHoje: [plan()],
      alunos: [{ id: 'student-1', nome: 'Aluno' }],
      frequenciaHoje: {},
      agenda: [{ data: '2026-09-13', hora: '09:20', titulo: 'Conselho de classe', tipo: 'reuniao' }],
    });

    expect(result.greeting).toBe('Bom dia, Professora Marina!');
    expect(result.classStudentCount).toBe(1);
    expect(result.lesson?.theme).toBe('Explorar frações');
    expect(result.lesson?.code).toBe('EF05MA03');
    expect(result.pendingCount).toBe(1);
    expect(result.agenda[0]).toMatchObject({ time: '09:20', title: 'Conselho de classe', tone: 'warning' });
  });

  it('preserves empty lesson and empty agenda states without inventing progress', () => {
    const result = createHomeV2Data({
      now: new Date(2026, 8, 13, 13, 0),
      perfil: null,
      turma: null,
      planosDeHoje: [],
      agenda: [],
      agendaStatus: 'empty',
    });

    expect(result.lesson).toBeNull();
    expect(result.agenda).toEqual([]);
    expect(result.agendaStatus).toBe('empty');
    expect(result.pendingCount).toBe(0);
  });
});
