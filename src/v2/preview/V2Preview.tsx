import { useMemo, useState } from 'react';
import { HomeV2, type HomeV2Data } from '../screens/HomeV2';
import { FrequencyV2, type FrequencyV2Data } from '../screens/FrequencyV2';
import { ObservationV2 } from '../screens/ObservationV2';
import { CommitmentsV2, type CommitmentV2Event } from '../screens/CommitmentsV2';
import { PlanningDayV2 } from '../screens/PlanningDayV2';
import { PlanningCalendarV2 } from '../screens/PlanningCalendarV2';
import { PlanningOverviewV2 } from '../screens/PlanningOverviewV2';
import { ClassesV2 } from '../screens/ClassesV2';
import { ClassWorkspaceV2 } from '../screens/ClassWorkspaceV2';
import { ProfileV2 } from '../screens/ProfileV2';
import { FilesV2 } from '../screens/FilesV2';
import { MoreV2 } from '../screens/MoreV2';
import { LessonPlanV2 } from '../screens/LessonPlanV2';
import { BnccV2 } from '../screens/BnccV2';
import { ReportsV2 } from '../screens/ReportsV2';
import { SettingsV2 } from '../screens/SettingsV2';
import { AppearanceV2 } from '../screens/AppearanceV2';
import { OnboardingV2 } from '../screens/OnboardingV2';
import { OnboardingEntryV2 } from '../screens/OnboardingEntryV2';
import { SplashV2 } from '../screens/SplashV2';
import { SetupWizardV2 } from '../screens/SetupWizardV2';
import { NewStudentV2 } from '../screens/NewStudentV2';
import { SubscriptionV2 } from '../screens/SubscriptionV2';
import { PrivacyV2 } from '../screens/PrivacyV2';
import { BackupV2 } from '../screens/BackupV2';
import { NotificationsV2 } from '../screens/NotificationsV2';
import { ToolsV2 } from '../screens/ToolsV2';
import { StudentProfileV2 } from '../screens/StudentProfileV2';
import { ClassManagerV2 } from '../screens/ClassManagerV2';
import { HelpV2 } from '../screens/HelpV2';
import { LegalV2 } from '../screens/LegalV2';
import { TrashV2 } from '../screens/TrashV2';
import { OrganizationV2 } from '../screens/OrganizationV2';
import { ActivityV2 } from '../screens/ActivityV2';
import { AcademicV2 } from '../screens/AcademicV2';
import { emptyAcademic } from '../../domain/academic';
import { newTeachingActivity } from '../../domain/activities';
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
planningPreviewPlans.push({ ...planningPreviewPlans[1], id: 'plan-archived', tituloTema: 'Plano arquivado', arquivadoEm: '2024-08-27T10:00:00.000Z' });
const planningMonthPreviewPlans: LessonPlan[] = [
  ...planningPreviewPlans,
  { ...planningPreviewPlans[1], id: 'plan-untimed-month', tituloTema: 'Leitura silenciosa', horaInicio: '', horaFim: '', momentos: [] },
];
const planningWeekPreviewPlans: LessonPlan[] = [
  ...planningPreviewPlans,
  { ...planningPreviewPlans[0], id: 'plan-untimed-week', tituloTema: 'Leitura silenciosa', horaInicio: '', horaFim: '', momentos: [{ ...planningPreviewPlans[0].momentos[0], id: 'moment-untimed-week', titulo: 'Leitura silenciosa', horario: '', descricao: 'Leitura individual · Biblioteca' }] },
];
const planningDayPreviewPlans: LessonPlan[] = [
  ...planningPreviewPlans,
  { ...planningPreviewPlans[0], id: 'plan-untimed', tituloTema: 'Leitura silenciosa', horaInicio: '', horaFim: '', momentos: [{ ...planningPreviewPlans[0].momentos[0], id: 'moment-untimed', titulo: 'Leitura silenciosa', horario: '', descricao: 'Leitura individual · Biblioteca' }] },
];
const classesPreview = [{ id: 'class-a', nome: '5º Ano A', nivel: 'Ensino Fundamental', turno: 'Matutino' }, { id: 'class-b', nome: '4º Ano B', nivel: 'Ensino Fundamental', turno: 'Vespertino' }];
const classStudentsPreview = frequencyPreviewData.students.slice(0, 6).map(({ id, name, color }) => ({ id, nome: name, cor: color }));
const attendancePreviewDays: Record<string, Attendance> = {
  '2024-08-28': { ana: 'presente', bruno: 'presente', caio: 'falta', daniela: 'atrasado', enzo: 'falta_justificada', fernanda: 'saida_antecipada' },
  '2024-08-27': { ana: 'presente', bruno: 'falta', caio: 'presente', daniela: 'presente', enzo: 'falta_justificada', fernanda: 'atrasado' },
};
const studentProfilePreview = { id: 'ana', nome: 'Ana Clara Souza', cor: '#1cb0f6', dataNascimento: '2015-03-12', responsavel: 'Carolina Souza', contato: '11987654321', presencas: 18, faltas: 2, atrasos: 1 };
const reportPreviewDays: Record<string, Attendance> = { '2024-08-28': { ana: 'presente', bruno: 'presente', caio: 'falta', daniela: 'presente', enzo: 'presente', fernanda: 'falta' } };
const reportPreviewClass = { id: 'class-a', nome: '5º Ano A', nivel: 'Ensino Fundamental', turno: 'Matutino' };
const activityPreview = newTeachingActivity({ turmaId: 'preview', dataKey: '2024-08-28' });
const academicPreview = (() => { const value = emptyAcademic(); const period = { id: 'period-1', nome: '1º bimestre', inicio: '2024-08-01', fim: '2024-10-01' }; value.config.periodos = [period]; value.avaliacoes = [{ id: 'assessment-1', titulo: 'Diagnóstico de frações', componente: 'Matemática', data: '2024-08-28', periodoId: period.id, tipo: 'Diagnóstica', maximo: 10, peso: 1, descricao: 'Identificar estratégias que a turma já usa para representar frações.', notas: { ana: { valor: 8, conceito: '', parecer: '', status: 'avaliado' }, bruno: { valor: null, conceito: '', parecer: '', status: 'pendente' }, caio: { valor: 6, conceito: '', parecer: '', status: 'avaliado' }, daniela: { valor: null, conceito: '', parecer: '', status: 'pendente' }, enzo: { valor: 9, conceito: '', parecer: '', status: 'avaliado' }, fernanda: { valor: null, conceito: '', parecer: '', status: 'pendente' } } }]; return value; })();
const profilePreview = { id: 'teacher-preview', nome: 'Marina Souza', tratamento: 'professora', escola: 'Escola Horizonte', cidade: 'São Paulo', uf: 'SP', etapaEnsino: 'Ensino Fundamental' };
const previewStorage: StoragePort = { get: async (key) => key === 'biblioteca:pessoal:pastas:v1' ? { value: JSON.stringify([{ id: 'folder-plans', nome: 'Planos de aula', pastaPaiId: 'root', cor: 'primary', criadoEm: '2024-08-01T10:00:00.000Z', atualizadoEm: '2024-08-01T10:00:00.000Z' }]) } : key === 'documentos:app:v2' ? { value: JSON.stringify([{ id: 'doc-bncc', nome: 'BNCC_2024.pdf', mime: 'application/pdf', tamanho: 245760, pastaId: 'root', path: 'documentos/BNCC_2024.pdf', uri: 'file:///documentos/BNCC_2024.pdf', criadoEm: '2024-08-01T10:00:00.000Z', atualizadoEm: '2024-08-01T10:00:00.000Z' }]) } : key === 'turma:class-a:academico:v1' ? { value: JSON.stringify(academicPreview) } : { value: '[]' }, set: async () => undefined, delete: async () => undefined, list: async (prefix) => ({ keys: prefix === 'turma:class-a:academico:v1' ? [prefix] : [] }) };

export function V2Preview() {
  const width = useMemo(readWidth, []);
  const screen = new URLSearchParams(window.location.search).get('v2-preview') || 'home';
  const previewState = new URLSearchParams(window.location.search).get('state');
  const initialObservationStudent = new URLSearchParams(window.location.search).get('student') || undefined;
  const [activeScreen, setActiveScreen] = useState(screen);
  const [previewTheme, setPreviewTheme] = useState('claro');
  const [previewAccent, setPreviewAccent] = useState('#168be0');
  const [previewSounds, setPreviewSounds] = useState(true);
  const [planningPreviewDateKey, setPlanningPreviewDateKey] = useState('2024-08-28');
  const [attendancePreviewDateKey, setAttendancePreviewDateKey] = useState('2024-08-28');
  const [classTab, setClassTab] = useState<'dia' | 'criancas' | 'registros' | 'historico' | 'gestao'>('dia');
  const [planPrefill, setPlanPrefill] = useState<Partial<LessonPlan>>({});
  const [observationStudentId, setObservationStudentId] = useState(initialObservationStudent);
  const frequencyStateData: FrequencyV2Data = {
    ...frequencyPreviewData,
    dateKey: attendancePreviewDateKey,
    dateLabel: new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${attendancePreviewDateKey}T12:00:00`)),
    students: previewState === 'empty' ? [] : frequencyPreviewData.students.map((student) => ({ ...student, status: attendancePreviewDays[attendancePreviewDateKey]?.[student.id] })),
    status: previewState === 'loading' || previewState === 'error' || previewState === 'empty' ? previewState : 'ready',
    error: previewState === 'error' ? 'O armazenamento local demorou para responder.' : '',
    offline: previewState === 'offline',
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
          {activeScreen === 'organization' ? (
            <OrganizationV2 onBack={() => setActiveScreen('class-manager')} />
          ) : activeScreen === 'trash' ? (
            <TrashV2 storage={previewStorage} onBack={() => setActiveScreen('more')} />
          ) : activeScreen === 'help' ? (
            <HelpV2 onBack={() => setActiveScreen('more')} />
          ) : activeScreen === 'legal' ? (
            <LegalV2 onBack={() => setActiveScreen('more')} />
          ) : activeScreen === 'tools' ? (
            <ToolsV2 onBack={() => setActiveScreen('more')} />
          ) : activeScreen === 'notifications' ? (
            <NotificationsV2 onBack={() => setActiveScreen('more')} />
          ) : activeScreen === 'backup' ? (
            <BackupV2 storage={previewStorage} onBack={() => setActiveScreen('privacy')} />
          ) : activeScreen === 'privacy' ? (
            <PrivacyV2 onBack={() => setActiveScreen('more')} goTo={(route) => route === 'backup' ? undefined : undefined} />
          ) : activeScreen === 'subscription' ? (
            <SubscriptionV2 onBack={() => setActiveScreen('more')} goTo={() => undefined} />
          ) : activeScreen === 'new-student' ? (
            <NewStudentV2 turmaId="preview" onBack={() => setActiveScreen('wizard')} onConcluido={() => setActiveScreen('classes')} onSalvo={() => undefined} />
          ) : activeScreen === 'wizard' ? (
            <SetupWizardV2 storage={previewStorage} onDone={() => undefined} onBack={() => setActiveScreen('onboarding')} onFinish={(destination) => setActiveScreen(destination === 'aluno' ? 'classes' : 'home')} />
          ) : activeScreen === 'splash' ? (
            <SplashV2 autoAdvance={false} onDone={() => setActiveScreen('onboarding')} />
          ) : activeScreen === 'onboarding-entry' ? (
            <OnboardingEntryV2 state={previewState === 'error' ? 'error' : 'default'} onContinue={() => undefined} />
          ) : activeScreen === 'onboarding' ? (
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
            <CommitmentsV2 events={commitmentsPreviewEvents} initialDate="2024-08-28" className="5º Ano A" offline={previewState === 'offline'} onBack={() => setActiveScreen('home')} onSave={previewState === 'error' ? async () => { throw new Error('Falha de demonstração ao salvar.'); } : () => undefined} onDelete={() => undefined} onPeriodChange={(period) => setActiveScreen(period === 'week' ? 'planning-week' : 'planning-month')} />
          ) : activeScreen === 'planning-overview' ? (
            <PlanningOverviewV2 plans={planningPreviewPlans} activities={[{ ...activityPreview, titulo: 'Caça às palavras', disciplina: 'Língua Portuguesa', instrucoes: 'Em duplas, encontrem no texto as palavras combinadas.', status: 'pronta' }, { ...activityPreview, id: 'activity-archived', titulo: 'Atividade arquivada', status: 'arquivada' }]} className="5º Ano A" onBack={() => setActiveScreen('home')} onOpenPlan={() => setActiveScreen('plan-editor')} onOpenActivity={() => setActiveScreen('activity')} onRestorePlan={() => undefined} onCreatePlan={() => setActiveScreen('plan-editor')} onCreateActivity={() => setActiveScreen('activity')} onViewChange={(view) => setActiveScreen(view === 'day' ? 'planning-day' : view === 'week' ? 'planning-week' : 'planning-month')} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'planejamento' ? setActiveScreen('planning-overview') : tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : tab === 'mais' ? setActiveScreen('more') : undefined} />
          ) : activeScreen === 'planning-day' ? (
            <PlanningDayV2 plans={planningDayPreviewPlans} activities={[{ ...activityPreview, titulo: 'Caça às palavras', disciplina: 'Língua Portuguesa', instrucoes: 'Em duplas, encontrem no texto as palavras combinadas.', status: 'pronta' }]} dateKey="2024-08-28" className="5º Ano A" onBack={() => setActiveScreen('home')} onViewChange={(view) => setActiveScreen(view === 'week' ? 'planning-week' : 'planning-month')} onOpenPlan={() => setActiveScreen('plan-editor')} onOpenActivity={() => setActiveScreen('activity')} onCreatePlan={() => setActiveScreen('plan-editor')} />
          ) : activeScreen === 'planning-week' || activeScreen === 'planning-month' ? (
            <PlanningCalendarV2 plans={activeScreen === 'planning-week' ? planningWeekPreviewPlans : planningMonthPreviewPlans} activities={[{ ...activityPreview, titulo: 'Caça às palavras', disciplina: 'Língua Portuguesa', instrucoes: 'Em duplas, encontrem no texto as palavras combinadas.', status: 'pronta' }, { ...activityPreview, id: 'activity-archived-planning', titulo: 'Atividade arquivada', status: 'arquivada' }]} dateKey={planningPreviewDateKey} mode={activeScreen === 'planning-week' ? 'week' : 'month'} className="5º Ano A" onBack={() => setActiveScreen('home')} onViewChange={(view) => setActiveScreen(view === 'day' ? 'planning-day' : view === 'week' ? 'planning-week' : 'planning-month')} onDateChange={setPlanningPreviewDateKey} onOpenPlan={() => setActiveScreen('plan-editor')} onOpenActivity={() => setActiveScreen('activity')} onCreatePlan={() => setActiveScreen('plan-editor')} />
          ) : activeScreen === 'class-manager' ? (
            <ClassManagerV2 classes={classesPreview} activeClass={classesPreview[0]} onBack={() => setActiveScreen('more')} onAtualizar={() => undefined} onAtivar={async () => undefined} goTo={() => undefined} />
          ) : activeScreen === 'student-profile' ? (
            <StudentProfileV2 student={studentProfilePreview} className="5º Ano A" onBack={() => setActiveScreen('classes')} onEditar={async () => undefined} onExcluir={async () => undefined} loadObservations={async () => [{ id: 'obs-1', data: '12/09/2026', texto: 'Participou da atividade e explicou sua estratégia para o grupo.' }]} />
          ) : activeScreen === 'class-workspace' ? (
            <ClassWorkspaceV2 turma={classesPreview[0]} alunos={classStudentsPreview} aba={classTab} dataKey="2024-08-28" setDataKey={() => undefined} setAba={setClassTab} onBack={() => setActiveScreen('classes')} goTo={(route, data) => { if (route === 'chamada') { if (data && typeof data === 'object' && 'dataKey' in data) setAttendancePreviewDateKey(String(data.dataKey)); setActiveScreen('attendance'); } else if (route === 'observacao') setActiveScreen('observation'); else if (route === 'academico') setActiveScreen('academic'); else if (route === 'relatorios') setActiveScreen('reports'); else if (route === 'perfil') setActiveScreen('student-profile'); }} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : tab === 'mais' ? setActiveScreen('more') : undefined} loadObservations={async (studentId) => studentId === 'ana' ? [{ id: 'obs-1', data: '12/09/2026', texto: 'Participou da atividade.' }] : []} loadAttendance={async () => attendancePreviewDays} />
          ) : activeScreen === 'classes' ? (
            <ClassesV2 classes={classesPreview} activeClass={classesPreview[0]} students={classStudentsPreview} onBack={() => setActiveScreen('home')} onOpenClass={() => setActiveScreen('class-workspace')} onOpenStudent={() => setActiveScreen('student-profile')} onNewStudent={() => setActiveScreen('new-student')} onAttendance={() => setActiveScreen('attendance')} onObservation={() => setActiveScreen('observation')} onAcademic={() => setActiveScreen('academic')} />
          ) : activeScreen === 'profile' ? (
            <ProfileV2 perfil={profilePreview} onBack={() => setActiveScreen('home')} onSalvar={async () => { if (previewState === 'error') throw new Error('Falha de demonstração.'); }} onConcluido={() => undefined} onTabChange={(tab) => tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : tab === 'inicio' ? setActiveScreen('home') : undefined} />
          ) : activeScreen === 'files' ? (
            <FilesV2 storage={previewStorage} onBack={() => setActiveScreen('home')} onOpenTrash={() => undefined} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'turmas' ? setActiveScreen('classes') : undefined} />
          ) : activeScreen === 'more' ? (
            <MoreV2 goTo={(route) => route === 'ferramentas' ? setActiveScreen('tools') : route === 'bncc' ? setActiveScreen('bncc') : route === 'relatorios' ? setActiveScreen('reports') : route === 'configuracoes' ? setActiveScreen('settings') : route === 'tema' ? setActiveScreen('appearance') : route === 'notificacoes' ? setActiveScreen('notifications') : route === 'backup' ? setActiveScreen('backup') : route === 'privacidade' ? setActiveScreen('privacy') : route === 'lixeira' ? setActiveScreen('trash') : route === 'ajuda-feedback' ? setActiveScreen('help') : route === 'termos' ? setActiveScreen('legal') : route === 'perfil-professor' ? setActiveScreen('profile') : route === 'gerenciar-turmas' ? setActiveScreen('class-manager') : route === 'organizacao' ? setActiveScreen('organization') : undefined} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : undefined} />
          ) : activeScreen === 'activity' ? (
            <ActivityV2 activity={activityPreview} className="5º Ano A" onBack={() => setActiveScreen('planning-overview')} onSalvar={() => undefined} onSaved={() => setActiveScreen('planning-overview')} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'planejamento' ? setActiveScreen('planning-overview') : tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : setActiveScreen('more')} />
          ) : activeScreen === 'academic' ? (
            <AcademicV2 turma={{ ...reportPreviewClass, etapa: 'fundamental_anos_iniciais', componentesCurriculares: ['Matemática', 'Ciências'] } as any} alunos={classStudentsPreview} storage={previewStorage} onBack={() => setActiveScreen('classes')} />
          ) : activeScreen === 'plan-editor' ? (
            <LessonPlanV2 plano={planningPreviewPlans[0]} prefill={planPrefill} turmaId="5º Ano A" dataKey="2024-08-28" onBack={() => setActiveScreen('planning-day')} onSalvar={() => undefined} onConcluido={() => setActiveScreen('planning-day')} onExcluir={() => undefined} />
          ) : activeScreen === 'bncc' ? (
            <BnccV2 etapa="fundamental_anos_iniciais" storage={previewStorage} onBack={() => setActiveScreen('more')} onOpenPlan={(skill) => { setPlanPrefill({ bncc: { habilidades: [skill.codigo], descricoes: { [skill.codigo]: skill.texto } } }); setActiveScreen('plan-editor'); }} />
          ) : activeScreen === 'reports' ? (
            <ReportsV2 turma={reportPreviewClass} alunos={classStudentsPreview} storage={previewStorage} initialDays={reportPreviewDays} onBack={() => setActiveScreen('more')} />
          ) : activeScreen === 'settings' ? (
            <SettingsV2 sonsAtivados={previewSounds} onBack={() => setActiveScreen('more')} goTo={(route) => route === 'tema' ? setActiveScreen('appearance') : undefined} setSonsAtivados={setPreviewSounds} />
          ) : activeScreen === 'appearance' ? (
            <AppearanceV2 theme={previewTheme} setTheme={setPreviewTheme} accentColor={previewAccent} setAccentColor={setPreviewAccent} systemDark={false} onBack={() => setActiveScreen('settings')} />
          ) : (
            <HomeV2 data={homePreviewData} onAction={(action) => action === 'attendance' ? setActiveScreen('attendance') : action === 'observation' ? setActiveScreen('observation') : action === 'commitments' ? setActiveScreen('commitments') : action === 'plan' ? setActiveScreen('planning-day') : action === 'profile' ? setActiveScreen('profile') : undefined} onTabChange={(tab) => tab === 'inicio' ? setActiveScreen('home') : tab === 'planejamento' ? setActiveScreen('planning-overview') : tab === 'turmas' ? setActiveScreen('classes') : tab === 'arquivos' ? setActiveScreen('files') : tab === 'mais' ? setActiveScreen('more') : undefined} />
          )}
        </div>
      </div>
    </div>
  );
}
