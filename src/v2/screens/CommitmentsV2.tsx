import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  FileText,
  House,
  LayoutGrid,
  LoaderCircle,
  Plus,
  RotateCcw,
  Trash2,
  Users,
} from 'lucide-react';
import * as React from 'react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './commitments-v2.css';

export type CommitmentV2Event = {
  id: string;
  titulo: string;
  tipo: 'reuniao' | 'evento' | 'feriado' | 'tarefa' | 'lembrete';
  data: string;
  hora?: string;
  observacoes?: string;
  concluido?: boolean;
};

type CommitmentsV2Props = {
  className?: string;
  events: CommitmentV2Event[];
  initialDate?: string;
  status?: 'loading' | 'ready' | 'empty' | 'error';
  error?: string;
  offline?: boolean;
  onBack?: () => void;
  onRetry?: () => void;
  onSave?: (event: CommitmentV2Event, previous?: CommitmentV2Event) => Promise<void | CommitmentV2Event> | void;
  onDelete?: (event: CommitmentV2Event) => Promise<void> | void;
  onPeriodChange?: (period: 'day' | 'week' | 'month') => void;
  onTabChange?: (tab: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais') => void;
  activeTab?: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais';
};

const navItems = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'planejamento', label: 'Planejamento', icon: BookOpenCheck },
  { id: 'turmas', label: 'Turmas', icon: Users },
  { id: 'arquivos', label: 'Arquivos', icon: FileText },
  { id: 'mais', label: 'Mais', icon: LayoutGrid },
] as const;

const typeMeta = {
  reuniao: { label: 'Reunião', tone: 'blue' },
  evento: { label: 'Evento escolar', tone: 'purple' },
  feriado: { label: 'Feriado/recesso', tone: 'orange' },
  tarefa: { label: 'Tarefa', tone: 'green' },
  lembrete: { label: 'Data importante', tone: 'pink' },
} as const;

const pad = (value: number) => String(value).padStart(2, '0');
const dateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const fromKey = (key: string) => new Date(`${key}T12:00:00`);
const dateLabel = (key: string) => fromKey(key).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
const shortWeekday = (key: string) => fromKey(key).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').slice(0, 3);

function emptyDraft(data: string): CommitmentV2Event {
  return { id: '', titulo: '', tipo: 'reuniao', data, hora: '', observacoes: '', concluido: false };
}

export function CommitmentsV2({
  className = 'Sua turma',
  events,
  initialDate,
  status = 'ready',
  error = '',
  offline = false,
  onBack = () => undefined,
  onRetry = () => undefined,
  onSave = () => undefined,
  onDelete = () => undefined,
  onPeriodChange = () => undefined,
  onTabChange = () => undefined,
  activeTab = 'planejamento',
}: CommitmentsV2Props) {
  const [selectedDate, setSelectedDate] = React.useState(() => initialDate || dateKey(new Date()));
  const [draft, setDraft] = React.useState<CommitmentV2Event | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [localEvents, setLocalEvents] = React.useState(events);
  const [confirmDelete, setConfirmDelete] = React.useState<CommitmentV2Event | null>(null);

  React.useEffect(() => setLocalEvents(events), [events]);

  const weekDays = React.useMemo(() => {
    const selected = fromKey(selectedDate);
    const mondayOffset = (selected.getDay() + 6) % 7;
    const monday = new Date(selected);
    monday.setDate(selected.getDate() - mondayOffset);
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + index);
      return dateKey(day);
    });
  }, [selectedDate]);

  const dayEvents = localEvents.filter((event) => event.data === selectedDate).sort((a, b) => (a.hora || '99:99').localeCompare(b.hora || '99:99'));

  const moveDate = (amount: number) => {
    const date = fromKey(selectedDate);
    date.setDate(date.getDate() + amount);
    setSelectedDate(dateKey(date));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft || !draft.titulo.trim() || saving) return;
    setSaving(true);
    setSaveError('');
    try {
      const next = { ...draft, titulo: draft.titulo.trim(), observacoes: draft.observacoes?.trim() || '' };
      const persisted = await onSave(next, draft.id ? localEvents.find((item) => item.id === draft.id) : undefined);
      const savedEvent = persisted || next;
      setLocalEvents((current) => draft.id ? current.map((item) => item.id === draft.id ? savedEvent : item) : [...current, savedEvent]);
      setSelectedDate(savedEvent.data);
      setDraft(null);
      setFeedback(draft.id ? 'Compromisso atualizado.' : 'Compromisso salvo na agenda.');
      window.setTimeout(() => setFeedback(''), 2800);
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : 'Não foi possível salvar o compromisso.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirmDelete || saving) return;
    setSaving(true);
    setSaveError('');
    try {
      await onDelete(confirmDelete);
      setLocalEvents((current) => current.filter((item) => item.id !== confirmDelete.id));
      setConfirmDelete(null);
      setFeedback('Compromisso excluído.');
      window.setTimeout(() => setFeedback(''), 2800);
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : 'Não foi possível excluir o compromisso.');
    } finally {
      setSaving(false);
    }
  };

  const toggleDone = async (event: CommitmentV2Event) => {
    const next = { ...event, concluido: !event.concluido };
    setSaving(true);
    setSaveError('');
    setLocalEvents((current) => current.map((item) => item.id === event.id ? next : item));
    try {
      const persisted = await onSave(next, event);
      setLocalEvents((current) => current.map((item) => item.id === event.id ? (persisted || next) : item));
      setFeedback(next.concluido ? 'Compromisso concluído.' : 'Compromisso reaberto.');
      window.setTimeout(() => setFeedback(''), 2800);
    } catch (cause) {
      setLocalEvents((current) => current.map((item) => item.id === event.id ? event : item));
      setSaveError(cause instanceof Error ? cause.message : 'Não foi possível atualizar o compromisso.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="v2-root v2-commitments" aria-labelledby="commitments-v2-title">
      <div className="v2-screen v2-commitments__screen">
        <header className="v2-commitments__header">
          <button className="v2-commitments__back v2-pressable" type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={25} strokeWidth={2.5} aria-hidden="true" /></button>
          <div className="v2-commitments__heading"><span className="v2-eyebrow">{className}</span><h1 id="commitments-v2-title">Compromissos</h1><p>Organize sua rotina e foque no que mais importa.</p></div>
          <button className="v2-commitments__add v2-pressable" type="button" onClick={() => { setDraft(emptyDraft(selectedDate)); setSaveError(''); }} aria-label="Novo compromisso"><Plus size={27} strokeWidth={2.5} aria-hidden="true" /></button>
        </header>

        {offline && <div className="v2-commitments__notice" role="status">Você está offline. A agenda continua disponível neste dispositivo.</div>}
        {error && <div className="v2-commitments__notice is-error" role="alert"><span>{error}</span><button type="button" onClick={onRetry}>Tentar novamente</button></div>}
        {saveError && !draft && <div className="v2-commitments__notice is-error" role="alert">{saveError}</div>}

        <div className="v2-commitments__tabs" role="tablist" aria-label="Período da agenda">
          <button className="is-selected" type="button" role="tab" aria-selected="true">Dia</button>
          <button type="button" role="tab" aria-selected="false" onClick={() => onPeriodChange('week')}>Semana</button>
          <button type="button" role="tab" aria-selected="false" onClick={() => onPeriodChange('month')}>Mês</button>
        </div>

        <div className="v2-commitments__date-strip" aria-label="Escolher dia">
          {weekDays.map((day) => <button key={day} className={`v2-commitments__date v2-pressable${day === selectedDate ? ' is-selected' : ''}`} type="button" onClick={() => setSelectedDate(day)} aria-label={fromKey(day).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} aria-pressed={day === selectedDate}><span>{shortWeekday(day)}</span><strong>{fromKey(day).getDate()}</strong></button>)}
        </div>

        <div className="v2-commitments__day-heading"><button className="v2-commitments__day-arrow v2-pressable" type="button" onClick={() => moveDate(-1)} aria-label="Dia anterior"><ChevronLeft size={23} /></button><div><h2>{dateLabel(selectedDate)}</h2><p>{dayEvents.length ? `${dayEvents.length} compromisso${dayEvents.length === 1 ? '' : 's'}` : 'Um espaço para o que vem pela frente'}</p></div><button className="v2-commitments__day-arrow v2-pressable" type="button" onClick={() => moveDate(1)} aria-label="Próximo dia"><ChevronRight size={23} /></button></div>

        {status === 'loading' ? <div className="v2-commitments__state" role="status"><LoaderCircle className="is-spinning" size={25} /><strong>Carregando sua agenda...</strong><p>Buscando os compromissos salvos nesta turma.</p></div> : status === 'empty' || !dayEvents.length ? <div className="v2-commitments__state"><CalendarDays size={34} aria-hidden="true" /><strong>Nenhum compromisso neste dia</strong><p>Marque uma reunião, tarefa ou data importante para deixar sua rotina mais leve.</p><button className="v2-primary-action v2-pressable" type="button" onClick={() => setDraft(emptyDraft(selectedDate))}><Plus size={19} /> Marcar compromisso</button></div> : <section className="v2-commitments__timeline" aria-label="Compromissos do dia">{dayEvents.map((event) => { const meta = typeMeta[event.tipo] || typeMeta.evento; return <article className={`v2-commitment-row is-${meta.tone}${event.concluido ? ' is-completed' : ''}`} key={event.id}><div className="v2-commitment-time">{event.hora || 'Dia inteiro'}</div><div className="v2-commitment-rail" aria-hidden="true"><span /></div><button className="v2-commitment-main v2-pressable" type="button" onClick={() => setDraft(event)}><span className="v2-commitment-icon"><CalendarDays size={22} aria-hidden="true" /></span><span className="v2-commitment-copy"><strong>{event.titulo}</strong><small>{meta.label}{event.observacoes ? ` · ${event.observacoes}` : ''}</small></span><ChevronRight size={22} aria-hidden="true" /></button><div className="v2-commitment-actions"><button className="v2-commitment-complete v2-pressable" type="button" onClick={() => void toggleDone(event)} disabled={saving} aria-label={event.concluido ? `Reabrir ${event.titulo}` : `Concluir ${event.titulo}`} aria-pressed={!!event.concluido}>{event.concluido ? <Check size={18} /> : <Circle size={18} />}</button><button className="v2-commitment-delete v2-pressable" type="button" onClick={() => setConfirmDelete(event)} disabled={saving} aria-label={`Excluir ${event.titulo}`}><Trash2 size={17} /></button></div></article>; })}</section>}

        {draft && <div className="v2-commitments__editor" role="dialog" aria-modal="true" aria-labelledby="commitment-editor-title"><div className="v2-commitments__editor-head"><div><span className="v2-eyebrow">{draft.id ? 'EDITAR' : 'NOVO'}</span><h2 id="commitment-editor-title">{draft.id ? 'Ajustar compromisso' : 'Marcar compromisso'}</h2></div><button className="v2-commitments__close v2-pressable" type="button" onClick={() => setDraft(null)} aria-label="Fechar">×</button></div><form onSubmit={submit}><label>Título<input autoFocus required value={draft.titulo} onChange={(event) => setDraft({ ...draft, titulo: event.target.value })} placeholder="Ex.: Reunião pedagógica" /></label><div className="v2-commitments__form-grid"><label>Tipo<select value={draft.tipo} onChange={(event) => setDraft({ ...draft, tipo: event.target.value as CommitmentV2Event['tipo'] })}>{Object.entries(typeMeta).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select></label><label>Horário<input type="time" value={draft.hora || ''} onChange={(event) => setDraft({ ...draft, hora: event.target.value })} /></label></div><label>Data<input type="date" value={draft.data} onChange={(event) => setDraft({ ...draft, data: event.target.value })} /></label><label>Observações<textarea rows={3} value={draft.observacoes || ''} onChange={(event) => setDraft({ ...draft, observacoes: event.target.value })} placeholder="Local ou contexto opcional" /></label>{saveError && <p className="v2-commitments__form-error" role="alert">{saveError}</p>}<div className="v2-commitments__form-actions"><button className="v2-secondary-action v2-pressable" type="button" onClick={() => setDraft(null)}>Cancelar</button><button className="v2-primary-action v2-pressable" type="submit" disabled={saving || !draft.titulo.trim()}>{saving ? <LoaderCircle className="is-spinning" size={19} /> : <Check size={19} />}{saving ? 'Salvando...' : 'Salvar compromisso'}</button></div></form></div>}
        {confirmDelete && <div className="v2-commitments__confirm-backdrop"><div className="v2-commitments__confirm" role="dialog" aria-modal="true" aria-labelledby="delete-commitment-title"><h2 id="delete-commitment-title">Excluir compromisso?</h2><p>“{confirmDelete.titulo}” será removido desta agenda.</p>{saveError && <p className="v2-commitments__form-error" role="alert">{saveError}</p>}<div className="v2-commitments__form-actions"><button className="v2-secondary-action v2-pressable" type="button" onClick={() => setConfirmDelete(null)}>Cancelar</button><button className="v2-danger-action v2-pressable" type="button" onClick={() => void remove()} disabled={saving}><Trash2 size={18} /> Excluir</button></div></div></div>}
        {feedback && <div className="v2-commitments__feedback" role="status"><Check size={17} />{feedback}</div>}

        <nav className="v2-commitments__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => { const selected = id === activeTab; return <button key={id} type="button" className={`v2-commitments__nav-item v2-pressable${selected ? ' is-selected' : ''}`} aria-current={selected ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} strokeWidth={selected ? 2.8 : 2.2} aria-hidden="true" /><span>{label}</span></button>; })}</nav>
      </div>
    </main>
  );
}
