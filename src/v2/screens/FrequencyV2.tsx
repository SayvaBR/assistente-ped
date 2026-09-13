import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  House,
  LayoutGrid,
  LoaderCircle,
  MoreHorizontal,
  Search,
  Settings2,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import * as React from 'react';
import type { AttendanceStatus } from '../../domain/models';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './frequency-v2.css';

export type FrequencyV2Student = {
  id: string;
  name: string;
  status?: AttendanceStatus;
  color?: string;
};

export type FrequencyV2Data = {
  className: string;
  studentCount: number;
  dateKey: string;
  dateLabel: string;
  students: FrequencyV2Student[];
  status?: 'loading' | 'ready' | 'empty' | 'error';
  error?: string;
  offline?: boolean;
};

type FrequencyV2Props = {
  data: FrequencyV2Data;
  activeTab?: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais';
  onBack?: () => void;
  onStatusChange?: (studentId: string, status?: AttendanceStatus) => void;
  onDateChange?: (offset: -1 | 1) => void;
  onContextChange?: (context: 'dia' | 'alunos' | 'frequencia' | 'registros') => void;
  onSave?: (attendance: Record<string, AttendanceStatus>) => Promise<void> | void;
  onRetry?: () => void;
  onTabChange?: (tab: FrequencyV2Props['activeTab']) => void;
};

const navItems = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'planejamento', label: 'Planejamento', icon: BookOpenCheck },
  { id: 'turmas', label: 'Turmas', icon: Users },
  { id: 'arquivos', label: 'Arquivos', icon: FileText },
  { id: 'mais', label: 'Mais', icon: LayoutGrid },
] as const;

const contextTabs = [
  { id: 'dia', label: 'Visão do dia', icon: CalendarDays },
  { id: 'alunos', label: 'Alunos', icon: Users },
  { id: 'frequencia', label: 'Frequência', icon: ChartNoAxesColumnIncreasing },
  { id: 'registros', label: 'Registros', icon: FileText },
] as const;

const statusLabels: Record<AttendanceStatus, string> = {
  presente: 'Presente',
  falta: 'Falta',
  atrasado: 'Atrasado',
  falta_justificada: 'Justificada',
  saida_antecipada: 'Saída',
};

const statusOptions: Array<{ value?: AttendanceStatus; label: string; tone: string }> = [
  { label: 'Pendente', tone: 'pending' },
  { value: 'presente', label: 'Presente', tone: 'present' },
  { value: 'falta', label: 'Falta', tone: 'absent' },
  { value: 'atrasado', label: 'Atrasado', tone: 'late' },
  { value: 'falta_justificada', label: 'Justificada', tone: 'justified' },
  { value: 'saida_antecipada', label: 'Saída', tone: 'early-leave' },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function FrequencyV2({
  data,
  activeTab = 'turmas',
  onBack = () => undefined,
  onStatusChange = () => undefined,
  onDateChange = () => undefined,
  onContextChange,
  onSave = () => undefined,
  onRetry,
  onTabChange = () => undefined,
}: FrequencyV2Props) {
  const [draft, setDraft] = React.useState<Record<string, AttendanceStatus>>(() =>
    Object.fromEntries(
      data.students.filter((student) => student.status).map((student) => [student.id, student.status as AttendanceStatus]),
    ),
  );
  const [query, setQuery] = React.useState('');
  const [openStudentId, setOpenStudentId] = React.useState<string | null>(null);
  const [saveState, setSaveState] = React.useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const sourceKey = data.students.map((student) => `${student.id}:${student.status || ''}`).join('|');

  React.useEffect(() => {
    setDraft(
      Object.fromEntries(
        data.students.filter((student) => student.status).map((student) => [student.id, student.status as AttendanceStatus]),
      ),
    );
    setSaveState('idle');
  }, [data.dateKey, sourceKey]);

  const visibleStudents = data.students.filter((student) => student.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const counts = data.students.reduce(
    (summary, student) => {
      const status = draft[student.id];
      if (!status) summary.pending += 1;
      else if (status === 'falta' || status === 'falta_justificada') summary.absent += 1;
      else summary.present += 1;
      return summary;
    },
    { present: 0, absent: 0, pending: 0 },
  );

  const chooseStatus = (studentId: string, status?: AttendanceStatus) => {
    setDraft((current) => {
      const next = { ...current };
      if (status) next[studentId] = status;
      else delete next[studentId];
      return next;
    });
    setOpenStudentId(null);
    onStatusChange(studentId, status);
    setSaveState('idle');
  };

  const save = async () => {
    setSaveState('saving');
    try {
      await onSave(draft);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
  };

  const statusFor = (student: FrequencyV2Student) => draft[student.id];

  return (
    <main className="v2-root v2-frequency" aria-labelledby="frequency-v2-title" aria-busy={data.status === 'loading'}>
      <div className="v2-screen v2-frequency__screen">
        <header className="v2-frequency__header">
          <button className="v2-frequency__round-button v2-pressable" type="button" onClick={onBack} aria-label="Voltar">
            <ArrowLeft size={25} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <div className="v2-frequency__title-block">
            <h1 id="frequency-v2-title">{data.className}</h1>
            <p>{data.studentCount} alunos</p>
          </div>
          <button className="v2-frequency__round-button v2-pressable" type="button" aria-label="Configurar turma">
            <Settings2 size={24} strokeWidth={2.35} aria-hidden="true" />
          </button>
        </header>

        <nav className="v2-frequency__context-tabs" aria-label="Contexto da turma">
          {contextTabs.map(({ id, label, icon: Icon }) => {
            const selected = id === 'frequencia';
            return (
              <button
                key={id}
                type="button"
                className={`v2-frequency__context-tab v2-pressable${selected ? ' is-selected' : ''}`}
                aria-current={selected ? 'page' : undefined}
                onClick={() => onContextChange?.(id)}
              >
                <Icon size={22} strokeWidth={selected ? 2.7 : 2.15} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <section className="v2-frequency__date-selector" aria-label="Dia da chamada">
          <button className="v2-frequency__date-arrow v2-pressable" type="button" onClick={() => onDateChange(-1)} aria-label="Dia anterior">
            <ChevronRight size={25} className="is-previous" strokeWidth={2.6} aria-hidden="true" />
          </button>
          <CalendarDays size={25} strokeWidth={2.25} aria-hidden="true" />
          <strong>{data.dateLabel}</strong>
          <button className="v2-frequency__date-arrow v2-pressable" type="button" onClick={() => onDateChange(1)} aria-label="Próximo dia">
            <ChevronRight size={25} strokeWidth={2.6} aria-hidden="true" />
          </button>
        </section>

        {data.offline && (
          <p className="v2-frequency__offline" role="status"><Clock3 size={16} aria-hidden="true" /> Offline: a chamada será salva neste dispositivo.</p>
        )}

        <section className="v2-frequency__summary" aria-label="Resumo da chamada">
          <div className="v2-frequency__summary-item v2-frequency__summary-item--present">
            <span className="v2-frequency__summary-icon"><Users size={24} strokeWidth={2.4} aria-hidden="true" /></span>
            <span><small>Presentes</small><strong>{counts.present}</strong></span>
          </div>
          <div className="v2-frequency__summary-item v2-frequency__summary-item--absent">
            <span className="v2-frequency__summary-icon"><X size={24} strokeWidth={2.6} aria-hidden="true" /></span>
            <span><small>Faltas</small><strong>{counts.absent}</strong></span>
          </div>
          <div className="v2-frequency__summary-item v2-frequency__summary-item--pending">
            <span className="v2-frequency__summary-icon"><Clock3 size={24} strokeWidth={2.35} aria-hidden="true" /></span>
            <span><small>Pendentes</small><strong>{counts.pending}</strong></span>
          </div>
        </section>

        <label className="v2-frequency__search">
          <Search size={24} strokeWidth={2.3} aria-hidden="true" />
          <span className="v2-visually-hidden">Buscar aluno</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar aluno..." type="search" />
        </label>

        {data.status === 'loading' ? (
          <div className="v2-frequency__state" role="status"><LoaderCircle className="is-spinning" size={30} aria-hidden="true" /><strong>Carregando chamada...</strong></div>
        ) : data.status === 'error' ? (
          <div className="v2-frequency__state v2-frequency__state--error" role="alert"><strong>Não foi possível carregar a chamada</strong><p>{data.error || 'Verifique o armazenamento e tente novamente.'}</p>{onRetry && <button className="v2-frequency__retry v2-pressable" type="button" onClick={onRetry}>Tentar novamente</button>}</div>
        ) : data.status === 'empty' || data.students.length === 0 ? (
          <div className="v2-frequency__state"><UserRound size={30} aria-hidden="true" /><strong>Nenhum aluno nesta turma</strong><p>Adicione alunos para iniciar a chamada.</p></div>
        ) : visibleStudents.length === 0 ? (
          <div className="v2-frequency__state"><Search size={30} aria-hidden="true" /><strong>Nenhum aluno encontrado</strong><p>Confira o nome digitado ou limpe a busca.</p></div>
        ) : (
          <section className="v2-frequency__list" aria-label="Alunos da turma">
            {visibleStudents.map((student) => {
              const status = statusFor(student);
              const tone = statusOptions.find((option) => option.value === status)?.tone || 'pending';
              const menuOpen = openStudentId === student.id;
              return (
                <article className={`v2-frequency__student${menuOpen ? ' is-open' : ''}`} key={student.id}>
                  <div className="v2-frequency__avatar" style={{ '--student-color': student.color || 'var(--v2-color-primary)' } as React.CSSProperties} aria-hidden="true">{initials(student.name)}</div>
                  <div className="v2-frequency__student-copy"><strong>{student.name}</strong><span>{status ? statusLabels[status] : 'Toque para marcar'}</span></div>
                  <button className={`v2-frequency__status v2-pressable is-${tone}`} type="button" aria-haspopup="listbox" aria-expanded={menuOpen} onClick={() => setOpenStudentId(menuOpen ? null : student.id)}>
                    <span className="v2-frequency__status-mark">{status === 'falta' || status === 'falta_justificada' ? <X size={15} strokeWidth={3} aria-hidden="true" /> : status ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : <Clock3 size={15} strokeWidth={2.6} aria-hidden="true" />}</span>
                    {status ? statusLabels[status] : 'Pendente'}
                  </button>
                  <button className="v2-frequency__student-arrow v2-pressable" type="button" aria-label={`Mais detalhes de ${student.name}`}><ChevronRight size={23} strokeWidth={2.25} aria-hidden="true" /></button>
                  {menuOpen && (
                    <div className="v2-frequency__status-menu" role="listbox" aria-label={`Marcação de ${student.name}`}>
                      {statusOptions.map((option) => (
                        <button key={option.label} type="button" role="option" aria-selected={option.value === status || (!option.value && !status)} className={`v2-frequency__status-option is-${option.tone}`} onClick={() => chooseStatus(student.id, option.value)}>
                          {option.value === 'falta' || option.value === 'falta_justificada' ? <X size={15} aria-hidden="true" /> : option.value ? <Check size={15} aria-hidden="true" /> : <Clock3 size={15} aria-hidden="true" />}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}

        <section className="v2-frequency__save-area" aria-live="polite">
          {saveState === 'error' && <p className="v2-frequency__save-feedback is-error" role="alert">A chamada não foi salva. Tente novamente.</p>}
          {saveState === 'saved' && <p className="v2-frequency__save-feedback is-success" role="status"><Check size={16} aria-hidden="true" /> Chamada salva neste dispositivo.</p>}
          <div className="v2-frequency__save-actions">
            <button className="v2-frequency__save-later v2-pressable" type="button" onClick={onBack}>Registrar depois</button>
            <button className="v2-primary-action v2-frequency__save-button v2-pressable" type="button" disabled={saveState === 'saving' || data.status === 'loading' || data.students.length === 0} onClick={save}>
              {saveState === 'saving' ? <LoaderCircle className="is-spinning" size={19} aria-hidden="true" /> : <Check size={19} strokeWidth={2.8} aria-hidden="true" />}
              {saveState === 'saving' ? 'Salvando...' : 'Salvar frequência'}
            </button>
          </div>
        </section>

        <nav className="v2-frequency__bottom-nav" aria-label="Navegação principal">
          {navItems.map(({ id, label, icon: Icon }) => {
            const selected = id === activeTab;
            return <button key={id} type="button" className={`v2-frequency__nav-item v2-pressable${selected ? ' is-selected' : ''}`} aria-current={selected ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} strokeWidth={selected ? 2.8 : 2.2} aria-hidden="true" /><span>{label}</span></button>;
          })}
        </nav>
      </div>
    </main>
  );
}
