import type { HomeV2Data } from '../screens/HomeV2';
import type { AttendanceStatus, ClassRoom, LessonPlan, Student } from '../../domain/models';

type AgendaEvent = {
  data: string;
  hora?: string;
  titulo: string;
  tipo?: string;
};

type HomeV2AdapterInput = {
  now?: Date;
  perfil?: { nome?: string; tratamento?: string } | null;
  turma?: ClassRoom | null;
  planosDeHoje?: LessonPlan[];
  alunos?: Student[];
  frequenciaHoje?: Record<string, AttendanceStatus | string | undefined>;
  agenda?: AgendaEvent[];
  agendaStatus?: HomeV2Data['agendaStatus'];
  agendaError?: string;
  onRetry?: () => void;
  offline?: boolean;
};

const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function dateLabel(value: Date) {
  return `${weekdays[value.getDay()]}, ${value.getDate()} de ${months[value.getMonth()]}`;
}

function greeting(value: Date) {
  if (value.getHours() >= 5 && value.getHours() < 12) return 'Bom dia';
  if (value.getHours() >= 12 && value.getHours() < 18) return 'Boa tarde';
  return 'Boa noite';
}

function time(value?: string) {
  return String(value || '').trim().slice(0, 5);
}

function nextMoment(plans: LessonPlan[], value: Date) {
  const now = `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
  const moments = plans
    .flatMap((plan) => (Array.isArray(plan.momentos) ? plan.momentos : []).map((moment) => ({ plan, moment })))
    .sort((a, b) => time(a.moment.horario).localeCompare(time(b.moment.horario)))
  return moments.find(({ moment }) => time(moment.horario) >= now) || moments[0];
}

function planSubject(plan: LessonPlan) {
  const candidate = plan as LessonPlan & { disciplina?: string; componenteCurricular?: string; materia?: string };
  return candidate.disciplina || candidate.componenteCurricular || candidate.materia || 'Plano de aula';
}

function planAgenda(plans: LessonPlan[]): HomeV2Data['agenda'] {
  return plans
    .flatMap((plan) => (Array.isArray(plan.momentos) ? plan.momentos : []).map((moment) => ({
      time: time(moment.horario) || time(plan.horaInicio),
      title: `${planSubject(plan)}${plan.tituloTema ? ` — ${plan.tituloTema}` : ''}`,
      detail: moment.descricao || plan.objetivoGeral || 'Plano de aula',
      tone: 'primary' as const,
    })))
    .filter((item) => item.time)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function agendaItems(events: AgendaEvent[], now: Date): HomeV2Data['agenda'] {
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return events
    .filter((event) => event.data === today)
    .sort((a, b) => time(a.hora).localeCompare(time(b.hora)))
    .map((event) => ({
      time: time(event.hora),
      title: event.titulo,
      detail: event.tipo || 'Compromisso',
      tone: event.tipo === 'reuniao' ? 'warning' : 'neutral',
    }));
}

export function createHomeV2Data({
  now = new Date(),
  perfil,
  turma,
  planosDeHoje = [],
  alunos = [],
  frequenciaHoje = {},
  agenda = [],
  agendaStatus = 'ready',
  agendaError = '',
  onRetry,
  offline = false,
}: HomeV2AdapterInput): HomeV2Data {
  const name = perfil?.nome?.trim() || 'Professora';
  const firstName = name.split(/\s+/)[0];
  const treatment = perfil?.tratamento === 'professor' ? 'Professor' : perfil?.tratamento === 'docente' ? 'Docente' : 'Professora';
  const present = alunos.filter((student) => ['presente', 'atrasado', 'saida_antecipada'].includes(frequenciaHoje[student.id] || '')).length;
  const absent = alunos.filter((student) => frequenciaHoje[student.id] === 'falta').length;
  const attendanceMarked = alunos.length > 0 && present + absent === alunos.length;
  const activePlans = planosDeHoje.filter((plan) => !plan.arquivadoEm);
  const selected = nextMoment(activePlans, now);
  const derivedAgenda = agendaItems(agenda, now);
  const planRows = planAgenda(activePlans);

  return {
    greeting: `${greeting(now)}, ${treatment} ${firstName}!`,
    teacherName: firstName,
    dateLabel: dateLabel(now),
    classLabel: turma?.nome || 'Configure sua primeira turma',
    classMeta: turma?.nivel || 'Adicione uma turma para começar',
    classStudentCount: turma ? alunos.length : undefined,
    lesson: selected
      ? {
          status: attendanceMarked ? 'Chamada concluída' : 'Chamada pendente',
          subject: planSubject(selected.plan),
          theme: selected.moment.titulo || selected.plan.tituloTema || 'Atividade planejada',
          detail: selected.moment.descricao || selected.plan.objetivoGeral || 'Organize o próximo momento da aula.',
          schedule: [time(selected.plan.horaInicio), time(selected.plan.horaFim)].filter(Boolean).join(' — '),
          room: '',
          code: selected.plan.bncc?.habilidades?.[0] || '',
        }
      : null,
    agenda: derivedAgenda.length ? derivedAgenda : planRows,
    agendaStatus,
    agendaError,
    onRetry,
    offline,
    pendingCount: alunos.length > 0 && !attendanceMarked ? 1 : 0,
  };
}
