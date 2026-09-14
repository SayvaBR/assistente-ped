import type { Attendance, AttendanceStatus, ClassRoom, Student } from '../../domain/models';
import type { FrequencyV2Data } from '../screens/FrequencyV2';

const validStatuses: AttendanceStatus[] = ['presente', 'falta', 'atrasado', 'falta_justificada', 'saida_antecipada'];
const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const avatarColors = ['#1cb0f6', '#5f8fda', '#eb6b6b', '#7b61d9', '#f2b84b', '#d84f9d', '#3fb980', '#6785c7'];

function dateLabelFromKey(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);
  return `${weekdays[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;
}

export type FrequencyV2AdapterInput = {
  turma?: ClassRoom | null;
  alunos?: Student[];
  frequencia?: Attendance;
  dataKey: string;
  status?: FrequencyV2Data['status'];
  error?: string;
  offline?: boolean;
};

export function createFrequencyV2Data({
  turma,
  alunos = [],
  frequencia = {},
  dataKey,
  status = 'ready',
  error = '',
  offline = false,
}: FrequencyV2AdapterInput): FrequencyV2Data {
  return {
    className: turma?.nome || 'Turma atual',
    studentCount: alunos.length,
    dateKey: dataKey,
    dateLabel: dateLabelFromKey(dataKey),
    status,
    error,
    offline,
    students: alunos.map((student, index) => ({
      id: student.id,
      name: student.nome,
      status: validStatuses.includes(frequencia[student.id]) ? frequencia[student.id] : undefined,
      color: avatarColors[index % avatarColors.length],
    })),
  };
}

