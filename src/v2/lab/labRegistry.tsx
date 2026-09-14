import { FrequencyV2 } from '../screens/FrequencyV2';
import { HomeV2 } from '../screens/HomeV2';
import { OnboardingEntryV2 } from '../screens/OnboardingEntryV2';
import { PlanningDayV2 } from '../screens/PlanningDayV2';
import type { LessonPlan } from '../../domain/models';

export type LabState = 'default' | 'error';
export type LabScreenId = 'onboarding-entry' | 'home' | 'frequency' | 'planning-day';

export const labScreens: Array<{ id: LabScreenId; label: string }> = [
  { id: 'onboarding-entry', label: 'Onboarding Entry V2' },
  { id: 'home', label: 'Home V2' },
  { id: 'frequency', label: 'Frequência' },
  { id: 'planning-day', label: 'Planejamento diário' },
];

const homeFixture = {
  greeting: 'Boa noite, Professora Marina!',
  teacherName: 'Marina',
  dateLabel: 'Terça-feira, 16 de setembro',
  classLabel: '5º ano B',
  classMeta: 'Ensino Fundamental',
  classStudentCount: 24,
  lesson: { status: 'Chamada pendente', subject: 'Matemática', theme: 'Frações equivalentes', detail: 'Observe, registre e converse sobre diferentes formas de representar a mesma parte.', schedule: '07h30 — 08h20', room: 'Sala 12', code: 'EF05MA03' },
  agenda: [{ time: '07h30', title: 'Matemática — 5º B', detail: 'Frações equivalentes', tone: 'primary' as const }, { time: '09h20', title: 'Conselho de classe', detail: 'Sala dos professores', tone: 'warning' as const }, { time: '13h00', title: 'Reunião com responsável', detail: 'Família do Théo', tone: 'success' as const }],
  pendingCount: 1,
};

const frequencyFixture = {
  className: '5º Ano A',
  studentCount: 24,
  dateKey: '2024-08-28',
  dateLabel: 'Quarta-feira, 28 de agosto',
  students: [{ id: 'ana', name: 'Ana Clara Souza', status: 'presente' as const, color: '#1cb0f6' }, { id: 'bruno', name: 'Bruno Lima', status: 'presente' as const, color: '#5f8fda' }, { id: 'caio', name: 'Caio Almeida', status: 'falta' as const, color: '#eb6b6b' }, { id: 'daniela', name: 'Daniela Martins', status: 'presente' as const, color: '#7b61d9' }, { id: 'enzo', name: 'Enzo Gabriel', status: 'presente' as const, color: '#f2b84b' }],
};

const planningFixture: LessonPlan = {
  id: 'lab-plan', turmaId: 'lab-class', dataKey: '2024-08-28', tituloTema: 'Frações: conceitos e prática', horaInicio: '10:00', horaFim: '10:50', status: 'concluido', objetivoGeral: 'Representar frações em diferentes situações.', objetivosEspecificos: [], bncc: { habilidades: ['EF05MA03'] }, momentos: [{ id: 'lab-moment', titulo: 'Matemática', horario: '10:00', duracaoMin: 50, descricao: '5º Ano A · Sala 1', tipo: 'aula' }], recursos: '', avaliacao: '', inclusao: '', observacoes: '', posAula: { comoFoi: null, observacoesPosAula: '' }, criadoEm: '2024-08-01T10:00:00.000Z', atualizadoEm: '2024-08-01T10:00:00.000Z',
};

type Props = { state: LabState; onStateChange: (state: LabState) => void };

export function renderLabScreen(screen: LabScreenId, { state, onStateChange }: Props) {
  if (screen === 'onboarding-entry') return <OnboardingEntryV2 state={state} onContinue={() => onStateChange('default')} />;
  if (screen === 'home') return <HomeV2 data={{ ...homeFixture, agendaStatus: state === 'error' ? 'error' : 'ready', agendaError: state === 'error' ? 'A agenda sintética não pôde ser carregada.' : undefined }} />;
  if (screen === 'frequency') return <FrequencyV2 data={{ ...frequencyFixture, status: state === 'error' ? 'error' : 'ready', error: state === 'error' ? 'A chamada sintética não pôde ser carregada.' : undefined }} onRetry={() => onStateChange('default')} onSave={() => undefined} />;
  return <PlanningDayV2 dateKey="2024-08-28" plans={state === 'error' ? [] : [planningFixture]} error={state === 'error' ? 'O planejamento sintético não pôde ser carregado.' : ''} onRetry={() => onStateChange('default')} onCreatePlan={() => undefined} />;
}
