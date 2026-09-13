import { useMemo, useState } from 'react';
import { HomeV2, type HomeV2Data } from '../screens/HomeV2';
import { FrequencyV2, type FrequencyV2Data } from '../screens/FrequencyV2';
import { ObservationV2 } from '../screens/ObservationV2';
import { CommitmentsV2, type CommitmentV2Event } from '../screens/CommitmentsV2';
import { PlanningDayV2 } from '../screens/PlanningDayV2';
import { PlanningCalendarV2 } from '../screens/PlanningCalendarV2';
import { ClassesV2 } from '../screens/ClassesV2';
import { ProfileV2 } from '../screens/ProfileV2';
import { FilesV2 } from '../screens/FilesV2';
import { MoreV2 } from '../screens/MoreV2';
import { LessonPlanV2 } from '../screens/LessonPlanV2';
import { BnccV2 } from '../screens/BnccV2';
import { ReportsV2 } from '../screens/ReportsV2';
import { SettingsV2 } from '../screens/SettingsV2';
import { AppearanceV2 } from '../screens/AppearanceV2';
import { OnboardingV2 } from '../screens/OnboardingV2';
import type { Attendance } from '../../domain/models';
import type { LessonPlan } from '../../domain/models';
import type { StoragePort } from '../../domain/models';
import '../styles/foundation.css';
import './v2-preview.css';

const widths = [320, 360, 390, 412, 432, 480, 600] as const;
type PreviewWidth = (typeof widths)[number];

function readWidth(): PreviewWidth {
  const value = Number(new URLSearchParams(window.location.search).get('width'));
  return widths.includes(value as PreviewWidth) ? (value as PreviewWidth) : 390;
}

function setPreviewWidth(width: PreviewWidth) {
  const url = new URL(window.location.href);
  url.searchParams.set('width', String(width));
  window.history.replaceState({}, '', url);
  window.location.reload();
}

const homePreviewData: HomeV2Data = {
  greeting: 'Boa noite, Professora Marina!',
  teacherName: 'Marina',
  dateLabel: 'Terça-feira, 16 de setembro',
  classLabel: '5º ano B',
  classMeta: 'Ensino Fundamental',
  classStudentCount: 4,
  lesson: {
    status: 'Chamada pendente',
    subject: 'Matemática',
    theme: 'Frações equivalentes',
    detail: 'Observe, registre e converse sobre diferentes formas de representar a mesma parte.',
    schedule: '07h30 — 08h20',
    room: 'Sala 12',
    code: 'EF05MA03',
  },
  agenda: [
    { time: '07h30', title: 'Matemática — 5º B', detail: 'Frações equivalentes', tone: 'primary' },
    { time: '09h20', title: 'Conselho de classe', detail: 'Sala dos professores', tone: 'warning' },
    { time: '10h10', title: 'Português — 4º A', detail: 'Leitura compartilhada', tone: 'neutral' },
    { time: '13h00', title: 'Reunião com responsável', detail: 'Família do Théo', tone: 'success' },
  ],
  pendingCount: 1,
};

const frequencyPreviewData: FrequencyV2Data = {
  className: '5º Ano A',
  studentCount: 24,
  dateKey: '2024-08-28',
  dateLabel: 'Quinta-feira, 28 de agosto',
  students: [
    { id: 'ana', name: 'Ana Clara Souza', status: 'presente', color: '#1cb0f6' },
    { id: 'bruno', name: 'Bruno Lima', status: 'presente', color: '#5f8fda' },
    { id: 'caio', name: 'Caio Almeida', status: 'falta', color: '#eb6b6b' },
    { id: 'daniela', name: 'Daniela Martins', status: 'presente', color: '#7b61d9' },
    { id: 'enzo', name: 'Enzo Gabriel', status: 'presente', color: '#f2b84b' },
    { id: 'fernanda', name: 'Fernanda Rocha', status: 'falta', color: '#d84f9d' },
    { id: 'gabriel', name: 'Gabriel Henrique', status: 'presente', color: '#3fb980' },
    { id: 'helena', name: 'Helena Ferreira', color: '#6785c7' },
  ],
};

const observationPreviewStudents = frequencyPreviewData.students.map(({ id, name, color }) => ({ id, name, color }));
const commitmentsPreviewEvents: CommitmentV2Event[] = [
  { id: 'math', titulo: 'Aula de Matemática', tipo: 'evento', data: '2024-08-28', hora: '08:00', observacoes: '5º Ano A · Sala 1' },
  { id: 'meeting', titulo: 'Reunião pedagógica', tipo: 'reuniao', data: '2024-08-28', hora: '10:00', observacoes: 'Sala dos professores' },
  { id: 'family', titulo: 'Atendimento à família', tipo: 'lembrete', data: '2024-08-28', hora: '15:00', observacoes: 'João Pedro' },
];
const planningPreviewPlans: LessonPlan[] = [
  { id: 'plan-math', turmaId: 'preview', dataKey: '2024-08-28', tituloTema: 'Frações: conceitos e prática', horaInicio: '10:00', horaFim: '10:50', status: 'concluido', objetivoGeral: 'Representar frações em diferentes situações.', objetivosEspecificos: [], bncc: { habilidades: ['EF05MA03'] }, momentos: [{ id: 'moment-math', titulo: 'Matemática', horario: '10:00', duracaoMin: 50, descricao: '5º Ano A · Sala 1', tipo: 'aula' }], recursos: '', avaliacao: '', inclusao: '', observacoes: '', posAula: { comoFoi: null, observacoesPosAula: '' }, criadoEm: '2024-08-01T10:00:00.000Z', atualizadoEm: '2024-08-01T10:00:00.000Z' },
  { id: 'plan-science', turmaId: 'preview', dataKey: '2024-08-28', tituloTema: 'Experimento do ciclo da água', horaInicio: '13:00', horaFim: '13:50', status: 'rascunho', objetivoGeral: 'Observar mudanças de estado.', objetivosEspecificos: [], bncc: { habilidades: [] }, momentos: [{ id: 'moment-science', titulo: 'Ciências', horario: '13:00', duracaoMin: 50, descricao: '5º Ano A · Sala 1', tipo: 'aula' }], recursos: '', avaliacao: '', inclusao: '', observacoes: '', posAula: { comoFoi: null, observacoesPosAula: '' }, criadoEm: '2024-08-01T10:00:00.000Z', atualizadoEm: '2024-08-01T10:00:00.000Z' },
];
const classesPreview = [{ id: 'class-a', nome: '5º Ano A', nivel: 'Ensino Fundamental', turno: 'Matutino' }, { id: 'class-b', nome: '4º Ano B', nivel: 'Ensino Fundamental', turno: 'Vespertino' }];
const classStudentsPreview = frequencyPreviewData.students.slice(0, 6).map(({ id, name, color }) => ({ id, nome: name, cor: color }));
const reportPreviewDays: Record<string, Attendance> = { '2024-08-28': { ana: 'presente', bruno: 'presente', caio: 'falta', daniela: 'presente', enzo: 'presente', fernanda: 'falta' } };
const reportPreviewClass = { id: 'class-a', nome: '5º Ano A', nivel: 'Ensino Fundamental', turno: 'Matutino' };
const profilePreview = { id: 'teacher-preview', nome: 'Marina Souza', tratamento: 'professora', escola: 'Escola Horizonte', cidade: 'São Paulo', uf: 'SP', etapaEnsino: 'Ensino Fundamental' };
const previewStorage: StoragePort = { get: async (key) => key === 'biblioteca:pessoal:pastas:v1' ? { value: JSON.stringify([{ id: 'folder-plans', nome: 'Planos de aula', pastaPaiId: 'root', cor: 'primary', criadoEm: '2024-08-01T10:00:00.000Z', atualizadoEm: '2024-08-01T10:00:00.000Z' }]) } : key === 'documentos:app:v2' ? { value: JSON.stringify([{ id: 'doc-bncc', nome: 'BNCC_2024.pdf', mime: 'application/pdf', tamanho: 245760, pastaId: 'root', path: 'documentos/BNCC_2024.pdf', uri: 'file:///documentos/BNCC_2024.pdf', criadoEm: '2024-08-01T10:00:00.000Z', atualizadoEm: '2024-08-01T10:00:00.000Z' }]) } : { value: '[]' }, set: async () => undefined, delete: async () => undefined, list: async () => ({ keys: [] }) };

export function V2Preview() {
  const width = useMemo(readWidth, []);
  const screen = new URLSearchParams(window.location.search).get('v2-preview') || 'home';
  const previewState = new URLSearchParams(window.location.search).get('state');
  const initialObservationStudent = new URLSearchParams(window.location.search).get('student') || undefined;
  const [activeScreen, setActiveScreen] = useState(screen);
  const [previewTheme, setPreviewTheme] = useState('claro');
  const [previewAccent, setPreviewAccent] = useState('#168be0');
  const [previewSounds, setPreviewSounds] = useState(true);
  const [observationStudentId, setObservationStudentId] = useState(initialObservationStudent);
  const frequencyStateData: FrequencyV2Data = {
    ...frequencyPreviewData,
    status: previewState === 'loading' || previewState === 'error' || previewState === 'empty' ? previewState : 'ready',
    error: previewState === 'error' ? 'O armazenamento local demorou para responder.' : '',
    offline: previewState === 'offline',
    students: previewState === 'empty' ? [] : frequencyPreviewData.students,
  };

  return (
    <div className="v2-preview-shell">
      <header className="v2-preview-toolbar">
        <strong>Assistente Pedagógico · V2 Visual Lab</strong>
        <span className="v2-preview-toolbar__screen">{activeScreen}</span>
        <div className="v2-preview-toolbar__widths" aria-label="Larguras Android de preview">
          {widths.map((item) => (
            <button
              className={item === width ? 'is-active' : undefined}
              key={item}
              onClick={() => setPreviewWidth(item)}
              type="button"
              aria-pressed={item === width}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <div className="v2-preview-stage">
        <div className="v2-preview-device" style={{ width }} data-preview-width={width}>
          {activeScreen === 'onboarding' ? (
            <OnboardingV2 storage={previewStorage} onDone={() => setActiveScreen('home')} />
          ) : activeScreen === 'attendance' ? (
            <FrequencyV2 data={frequencyStateData} onBack={() => setActiveScreen('home')} onRetry={() => undefined} onSave={() => undefined} />
          ) : activeScreen === 'observation' ? (
            <ObservationV2
              students={observationPreviewStudents}
              selectedStudentId={observationStudentId}
              className="5º Ano A"
              onBack={() => observationStudentId ? setObservationStudentId(undefined) : setActiveScreen('home')}
              onChangeStudent={() => setObservationStudentId(undefined)}
              onSelectStudent={setObservationStudentId}
              onSave={() => undefined}
            />
          ) : activeScreen === 'commitments' ? (
            <CommitmentsV2 events={commitmentsPreviewEvents} initialDate="2024-08-28" className="5º Ano A" onBack={() => setActiveScreen('home')} onSave={() => undefined} onDelete={() => undefined} />
          ) : activeScreen === 'planning-day' ? (
            <PlanningDayV2 plans={planningPreviewPlans} dateKey="2024-08-28" className="5º Ano A" onBack={() => setActiveScreen('home')} onViewChange={(view) => setActiveScreen(view === 'week' ? 'planning-week' : 'planning-month')} onOpenPlan={() => setActiveScreen('plan-editor')} onCreatePlan={() => setActiveScreen('plan-editor')} />
          ) : activeScreen === 'planning-week' || activeScreen === 'planning-month' ? (
            <PlanningCalendarV2 plans={planningPreviewPlans} dateKey="2024-08-28" mode={activeScreen === 'planning-week' ? 'week' : 'month'} className="5º Ano A" onBack={() => setActiveScreen('home')} onViewChange={(view) => setActiveScreen(view === 'day' ? 'planning-day' : view === 'week' ? 'planning-week' : 'planning-month')} onDateChange={() => undefined} onOpenPlan={() => setActiveScreen('plan-editor')} onCreatePlan={() => setActiveScreen('plan-editor')} />
          ) : activeScreen === 'classes' ? (
            <ClassesV2 classes={classesPreview} activeClass={classesPreview[0]} students={classStudentsPreview} onBack={() => setActiveScreen('home')} onOpenStudent={() => undefined} onNewStudent={() => undefined} onAttendance={() => setActiveScreen('attendance')} onObservation={() => setActiveScreen('observation')} />
          ) : activeScreen === 'profile' ? (
            <ProfileV2 perfil={profilePreview} onBack={() => setActiveScreen('home')} onSalvar={() => undefined} onConcluido={() => undefined} onTabChange={(tab) => tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : tab === 'inicio' ? setActiveScreen('home') : undefined} />
          ) : activeScreen === 'files' ? (
            <FilesV2 storage={previewStorage} onBack={() => setActiveScreen('home')} onOpenTrash={() => undefined} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'turmas' ? setActiveScreen('classes') : undefined} />
          ) : activeScreen === 'more' ? (
            <MoreV2 goTo={(route) => route === 'bncc' ? setActiveScreen('bncc') : route === 'relatorios' ? setActiveScreen('reports') : route === 'configuracoes' ? setActiveScreen('settings') : route === 'tema' ? setActiveScreen('appearance') : undefined} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : undefined} />
          ) : activeScreen === 'plan-editor' ? (
            <LessonPlanV2 plano={planningPreviewPlans[0]} turmaId="5º Ano A" dataKey="2024-08-28" onBack={() => setActiveScreen('planning-day')} onSalvar={() => undefined} onConcluido={() => setActiveScreen('planning-day')} onExcluir={() => undefined} />
          ) : activeScreen === 'bncc' ? (
            <BnccV2 etapa="fundamental_anos_iniciais" storage={previewStorage} onBack={() => setActiveScreen('more')} onOpenPlan={() => setActiveScreen('plan-editor')} />
          ) : activeScreen === 'reports' ? (
            <ReportsV2 turma={reportPreviewClass} alunos={classStudentsPreview} storage={previewStorage} initialDays={reportPreviewDays} onBack={() => setActiveScreen('more')} />
          ) : activeScreen === 'settings' ? (
            <SettingsV2 sonsAtivados={previewSounds} onBack={() => setActiveScreen('more')} goTo={(route) => route === 'tema' ? setActiveScreen('appearance') : undefined} setSonsAtivados={setPreviewSounds} />
          ) : activeScreen === 'appearance' ? (
            <AppearanceV2 theme={previewTheme} setTheme={setPreviewTheme} accentColor={previewAccent} setAccentColor={setPreviewAccent} systemDark={false} onBack={() => setActiveScreen('settings')} />
          ) : (
            <HomeV2 data={homePreviewData} onAction={(action) => action === 'attendance' ? setActiveScreen('attendance') : action === 'observation' ? setActiveScreen('observation') : action === 'commitments' ? setActiveScreen('commitments') : action === 'plan' ? setActiveScreen('planning-day') : action === 'profile' ? setActiveScreen('profile') : undefined} onTabChange={(tab) => tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : tab === 'mais' ? setActiveScreen('more') : undefined} />
          )}
        </div>
      </div>
    </div>
  );
}
