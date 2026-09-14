import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CalendarCheck2,
  ChevronRight,
  ClipboardList,
  FilePlus2,
  FileText,
  BookOpenCheck,
  House,
  History,
  Import,
  NotebookPen,
  Pencil,
  Plus,
  Search,
  Settings2,
  Users,
  LayoutGrid,
} from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './class-workspace-v2.css';
import * as React from 'react';
import type { Attendance, AttendanceStatus } from '../../domain/models';

type Student = {
  id: string;
  nome: string;
  cor?: string;
  presencas?: number;
  faltas?: number;
  atrasos?: number;
};

type Observation = { id?: string; data?: string; texto?: string };

type ClassItem = {
  id: string;
  nome: string;
  nivel?: string;
  turno?: string;
  etapa?: string;
};

type Tab = 'dia' | 'criancas' | 'registros' | 'historico' | 'gestao';

type Props = {
  turma?: ClassItem | null;
  alunos: Student[];
  carregando?: boolean;
  goTo: (route: string, data?: unknown) => void;
  onBack: () => void;
  onRenomear?: (turma: ClassItem, nome: string) => Promise<void>;
  aba: Tab;
  setAba: (tab: Tab) => void;
  dataKey: string;
  setDataKey: (key: string) => void;
  onTabChange?: (tab: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais') => void;
  loadObservations?: (studentId: string) => Promise<Observation[]>;
  loadAttendance?: () => Promise<Record<string, Attendance>>;
};

const tabs: Array<{ id: Tab; label: string; icon: typeof CalendarCheck2 }> = [
  { id: 'dia', label: 'Hoje', icon: CalendarCheck2 },
  { id: 'criancas', label: 'Alunos', icon: Users },
  { id: 'registros', label: 'Registros', icon: NotebookPen },
  { id: 'historico', label: 'Histórico', icon: History },
  { id: 'gestao', label: 'Gestão', icon: Settings2 },
];

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}

function studentAttendance(student: Student) {
  const present = student.presencas || 0;
  const absent = student.faltas || 0;
  const late = student.atrasos || 0;
  const total = present + absent + late;
  return { present, absent, late, total, percent: total ? Math.round((present / total) * 100) : null };
}

const navItems = [{ id: 'inicio', label: 'Início', icon: House }, { id: 'planejamento', label: 'Planejamento', icon: BookOpenCheck }, { id: 'turmas', label: 'Turmas', icon: Users }, { id: 'arquivos', label: 'Arquivos', icon: FileText }, { id: 'mais', label: 'Mais', icon: LayoutGrid }] as const;

export function ClassWorkspaceV2({ turma, alunos, carregando = false, goTo, onBack, onRenomear, aba, setAba, dataKey, setDataKey, onTabChange = () => undefined, loadObservations = async () => [], loadAttendance = async () => ({}) }: Props) {
  const [query, setQuery] = React.useState('');
  const [editingName, setEditingName] = React.useState(false);
  const [name, setName] = React.useState(turma?.nome || '');
  const [savingName, setSavingName] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [recordState, setRecordState] = React.useState<{ status: 'idle' | 'loading' | 'ready' | 'error'; items: Record<string, Observation[]>; error: string }>({ status: 'idle', items: {}, error: '' });
  const [attendanceState, setAttendanceState] = React.useState<{ status: 'idle' | 'loading' | 'ready' | 'error'; days: Record<string, Attendance>; error: string }>({ status: 'idle', days: {}, error: '' });
  const recordLoader = React.useRef(loadObservations);
  const attendanceLoader = React.useRef(loadAttendance);
  recordLoader.current = loadObservations;
  attendanceLoader.current = loadAttendance;
  const studentIds = alunos.map((student) => student.id).join('|');
  const filteredStudents = alunos.filter((student) => student.nome.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const totals = alunos.reduce((sum, student) => {
    const item = studentAttendance(student);
    return { present: sum.present + item.present, absent: sum.absent + item.absent, late: sum.late + item.late };
  }, { present: 0, absent: 0, late: 0 });
  const activeTab = tabs.find((item) => item.id === aba) || tabs[0];

  React.useEffect(() => setName(turma?.nome || ''), [turma?.nome]);
  React.useEffect(() => {
    if (aba !== 'registros' && aba !== 'historico') return undefined;
    let active = true;
    setRecordState({ status: 'loading', items: {}, error: '' });
    setAttendanceState({ status: 'loading', days: {}, error: '' });
    Promise.all(alunos.map(async (student) => [student.id, await recordLoader.current(student.id)] as const)).then((entries) => {
      if (active) setRecordState({ status: 'ready', items: Object.fromEntries(entries), error: '' });
    }).catch((error) => {
      if (active) setRecordState((state) => ({ ...state, status: 'error', error: error instanceof Error ? error.message : 'Não foi possível carregar os registros.' }));
    });
    attendanceLoader.current().then((days) => {
      if (active) setAttendanceState({ status: 'ready', days: days || {}, error: '' });
    }).catch((error) => {
      if (active) setAttendanceState({ status: 'error', days: {}, error: error instanceof Error ? error.message : 'Não foi possível carregar as chamadas salvas.' });
    });
    return () => { active = false; };
  }, [aba, studentIds]);

  const historyEvents = alunos.flatMap((student) => (recordState.items[student.id] || []).map((record) => ({ student, record }))).slice(0, 6);
  const attendanceEvents = Object.entries(attendanceState.days)
    .filter(([, day]) => Object.keys(day || {}).length > 0)
    .sort(([first], [second]) => second.localeCompare(first))
    .slice(0, 6)
    .map(([date, day]) => {
      const counts = Object.values(day).reduce((summary, status: AttendanceStatus) => {
        if (status === 'presente') summary.present += 1;
        else if (status === 'falta' || status === 'falta_justificada') summary.absent += 1;
        else summary.other += 1;
        return summary;
      }, { present: 0, absent: 0, other: 0 });
      return { date, ...counts };
    });

  const saveName = async () => {
    const nextName = name.trim();
    if (!turma || !nextName || !onRenomear) return;
    setSavingName(true);
    setNameError('');
    try {
      await onRenomear(turma, nextName);
      setEditingName(false);
    } catch (error) {
      setNameError(error instanceof Error ? error.message : 'Não foi possível atualizar a turma.');
    } finally {
      setSavingName(false);
    }
  };

  const renderStudents = () => (
    <section className="v2-class-workspace__section" aria-labelledby="class-students-title">
      <div className="v2-class-workspace__section-heading">
        <div><span className="v2-eyebrow">ACOMPANHAMENTO</span><h2 id="class-students-title">Alunos da turma</h2></div>
        <button type="button" className="v2-class-workspace__text-action v2-pressable" onClick={() => goTo('novo-aluno')}><Plus size={17} />Adicionar</button>
      </div>
      <label className="v2-class-workspace__search"><Search size={19} aria-hidden="true" /><span className="sr-only">Buscar aluno na turma</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar aluno" /></label>
      {filteredStudents.length ? <div className="v2-class-workspace__student-list">{filteredStudents.map((student) => <button key={student.id} type="button" className="v2-class-workspace__student-row v2-pressable" onClick={() => goTo('perfil', student)}><span className="v2-class-workspace__student-avatar" style={{ background: student.cor || '#dff3ff' }}>{initials(student.nome)}</span><span className="v2-class-workspace__student-copy"><strong>{student.nome}</strong><small>Ver perfil e histórico</small></span><ChevronRight size={20} aria-hidden="true" /></button>)}</div> : <div className="v2-class-workspace__empty"><Users size={29} /><strong>{query ? 'Nenhum aluno encontrado' : 'Sua lista começa aqui'}</strong><p>{query ? 'Tente buscar por outro nome.' : 'Cadastre o primeiro aluno para fazer chamada e acompanhar registros.'}</p>{query ? <button type="button" className="v2-class-workspace__secondary v2-pressable" onClick={() => setQuery('')}>Limpar busca</button> : <button type="button" className="v2-primary-action v2-pressable" onClick={() => goTo('novo-aluno')}><Plus size={18} />Adicionar aluno</button>}</div>}
    </section>
  );

  const renderHistory = () => (
    <section className="v2-class-workspace__section" aria-labelledby="class-history-title">
      <div className="v2-class-workspace__section-heading"><div><span className="v2-eyebrow">DADOS LOCAIS</span><h2 id="class-history-title">Histórico da turma</h2></div><button type="button" className="v2-class-workspace__text-action v2-pressable" onClick={() => goTo('relatorios')}><BarChart3 size={17} />Relatórios</button></div>
      <div className="v2-class-workspace__summary" aria-label="Resumo de frequência"><div><strong>{totals.present}</strong><span>presenças</span></div><div><strong>{totals.absent}</strong><span>faltas</span></div><div><strong>{totals.late}</strong><span>atrasos</span></div></div>
      <p className="v2-class-workspace__helper">Os números abaixo vêm dos registros salvos neste aparelho. Para lançar a chamada de hoje, abra Frequência.</p>
      <button type="button" className="v2-class-workspace__wide-action v2-pressable" onClick={() => goTo('chamada')}><CalendarCheck2 size={20} /><span><strong>Consultar frequência</strong><small>Revisar presença por data</small></span><ChevronRight size={19} /></button>
      {alunos.length > 0 && <div className="v2-class-workspace__history-list">{alunos.map((student) => { const item = studentAttendance(student); return <button type="button" key={student.id} className="v2-class-workspace__history-row v2-pressable" onClick={() => goTo('perfil', student)}><span><strong>{student.nome}</strong><small>{item.total ? `${item.percent}% de presença` : 'Ainda sem lançamentos'}</small></span><span className="v2-class-workspace__history-count">{item.present}<small>pres.</small></span><ChevronRight size={18} /></button>; })}</div>}
      {recordState.status === 'loading' && <p className="v2-class-workspace__helper" role="status">Carregando os últimos registros pedagógicos…</p>}
      {attendanceState.status === 'loading' && <p className="v2-class-workspace__helper" role="status">Carregando as chamadas salvas…</p>}
      {attendanceState.status === 'error' && <p className="v2-class-workspace__error" role="alert">{attendanceState.error}</p>}
      {attendanceState.status === 'ready' && attendanceEvents.length > 0 && <div className="v2-class-workspace__attendance-events" aria-label="Chamadas recentes"><div className="v2-class-workspace__history-events-heading"><span className="v2-eyebrow">CHAMADAS RECENTES</span><span>{attendanceEvents.length} datas</span></div>{attendanceEvents.map((event) => <button type="button" key={event.date} className="v2-class-workspace__history-event v2-pressable" onClick={() => goTo('chamada', { dataKey: event.date })}><span className="v2-class-workspace__history-dot v2-class-workspace__history-dot--attendance" aria-hidden="true" /><span><strong>{formatDate(event.date)}</strong><small>{event.present} presente{event.present === 1 ? '' : 's'} · {event.absent} falta{event.absent === 1 ? '' : 's'}</small><em>{event.other ? `${event.other} lançamento${event.other === 1 ? '' : 's'} especial${event.other === 1 ? '' : 'is'}` : 'Chamada salva neste aparelho.'}</em></span><ChevronRight size={18} aria-hidden="true" /></button>)}</div>}
      {recordState.status === 'ready' && historyEvents.length > 0 && <div className="v2-class-workspace__history-events" aria-label="Últimos registros pedagógicos"><div className="v2-class-workspace__history-events-heading"><span className="v2-eyebrow">MEMÓRIA RECENTE</span><span>{historyEvents.length} registros</span></div>{historyEvents.map(({ student, record }, index) => <button type="button" key={record.id || `${student.id}-${index}`} className="v2-class-workspace__history-event v2-pressable" onClick={() => goTo('perfil', student)}><span className="v2-class-workspace__history-dot" aria-hidden="true" /><span><strong>{student.nome}</strong><small>{record.data || 'Data não informada'}</small><em>{record.texto || 'Observação pedagógica salva.'}</em></span><ChevronRight size={18} aria-hidden="true" /></button>)}</div>}
    </section>
  );

  const renderManagement = () => (
    <section className="v2-class-workspace__section" aria-labelledby="class-management-title">
      <div className="v2-class-workspace__section-heading"><div><span className="v2-eyebrow">CONTEXTO DA TURMA</span><h2 id="class-management-title">Gestão</h2></div></div>
      {editingName ? <div className="v2-class-workspace__rename"><label htmlFor="class-name">Nome da turma</label><input id="class-name" value={name} onChange={(event) => setName(event.target.value)} /><div><button type="button" className="v2-class-workspace__secondary v2-pressable" onClick={() => { setName(turma?.nome || ''); setEditingName(false); }}>Cancelar</button><button type="button" className="v2-primary-action v2-pressable" disabled={savingName} onClick={() => void saveName()}>{savingName ? 'Salvando…' : 'Salvar nome'}</button></div>{nameError && <p className="v2-class-workspace__error" role="alert">{nameError}</p>}</div> : <button type="button" className="v2-class-workspace__wide-action v2-pressable" onClick={() => setEditingName(true)}><Pencil size={20} /><span><strong>Editar nome da turma</strong><small>{turma?.nome || 'Turma atual'}</small></span><ChevronRight size={19} /></button>}
      <div className="v2-class-workspace__management-list">
        <button type="button" className="v2-class-workspace__wide-action v2-pressable" onClick={() => goTo('importar-alunos')}><Import size={20} /><span><strong>Importar alunos</strong><small>Adicionar vários nomes por lista ou arquivo</small></span><ChevronRight size={19} /></button>
        <button type="button" className="v2-class-workspace__wide-action v2-pressable" onClick={() => goTo('academico')}><BarChart3 size={20} /><span><strong>Notas e avaliações</strong><small>Lançar resultados e acompanhar a turma</small></span><ChevronRight size={19} /></button>
        <button type="button" className="v2-class-workspace__wide-action v2-pressable" onClick={() => goTo('relatorios')}><ClipboardList size={20} /><span><strong>Relatórios</strong><small>Consultar frequência e registros</small></span><ChevronRight size={19} /></button>
        <button type="button" className="v2-class-workspace__wide-action v2-pressable" onClick={() => goTo('caderno')}><BookOpen size={20} /><span><strong>Caderno pedagógico</strong><small>Notas, tarefas e observações da turma</small></span><ChevronRight size={19} /></button>
        <button type="button" className="v2-class-workspace__wide-action v2-pressable" onClick={() => goTo('sequencias')}><FilePlus2 size={20} /><span><strong>Sequências didáticas</strong><small>Organizar aulas em uma progressão</small></span><ChevronRight size={19} /></button>
      </div>
    </section>
  );

  return <main className="v2-root v2-class-workspace" aria-labelledby="class-workspace-title"><div className="v2-screen v2-class-workspace__screen">
    <header className="v2-class-workspace__header"><button type="button" className="v2-class-workspace__back v2-pressable" onClick={onBack} aria-label="Voltar"><ArrowLeft size={24} /></button><div className="v2-class-workspace__title"><span className="v2-eyebrow">TURMA ATIVA</span><h1 id="class-workspace-title">{turma?.nome || 'Sala de aula'}</h1><p>{turma ? `${turma.nivel || 'Ensino Fundamental'}${turma.turno ? ` · ${turma.turno}` : ''} · ${alunos.length} alunos` : 'Seu contexto de trabalho'}</p></div><button type="button" className="v2-class-workspace__settings v2-pressable" onClick={() => setAba('gestao')} aria-label="Abrir gestão da turma"><Settings2 size={22} /></button></header>
    <nav className="v2-class-workspace__tabs" aria-label="Seções da turma">{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-class-workspace__tab v2-pressable${aba === id ? ' is-active' : ''}`} aria-current={aba === id ? 'page' : undefined} onClick={() => setAba(id)}><Icon size={18} /><span>{label}</span></button>)}</nav>
    {carregando ? <div className="v2-class-workspace__state" role="status"><Users size={28} /><strong>Carregando turma…</strong><p>Buscando os dados salvos neste aparelho.</p></div> : !turma ? <div className="v2-class-workspace__state"><Users size={28} /><strong>Nenhuma turma selecionada</strong><p>Volte para Turmas e escolha um contexto para continuar.</p><button type="button" className="v2-primary-action v2-pressable" onClick={onBack}>Voltar para turmas</button></div> : <>
      {aba === 'dia' && <section className="v2-class-workspace__section v2-class-workspace__today" aria-labelledby="class-today-title"><div className="v2-class-workspace__section-heading"><div><span className="v2-eyebrow">ROTINA DE HOJE</span><h2 id="class-today-title">{formatDate(dataKey)}</h2></div><button type="button" className="v2-class-workspace__date-button v2-pressable" onClick={() => setDataKey(new Date().toISOString().slice(0, 10))}>Hoje</button></div><div className="v2-class-workspace__focus"><span className="v2-class-workspace__focus-number">01</span><div><span className="v2-eyebrow">PRÓXIMA AÇÃO</span><h3>Fazer chamada</h3><p>Registre a presença de {alunos.length || 'sua'} alunos e siga com o contexto da aula.</p></div><CalendarCheck2 size={28} aria-hidden="true" /></div><div className="v2-class-workspace__quick-actions"><button type="button" className="v2-primary-action v2-pressable" onClick={() => goTo('chamada')}><CalendarCheck2 size={18} />Fazer chamada</button><button type="button" className="v2-class-workspace__secondary v2-pressable" onClick={() => goTo('observacao')}><NotebookPen size={18} />Nova observação</button></div><div className="v2-class-workspace__next-line"><FileText size={20} /><span><strong>Depois da aula</strong><small>Deixe uma observação enquanto o contexto ainda está fresco.</small></span><ChevronRight size={19} /></div></section>}
      {aba === 'criancas' && renderStudents()}
      {aba === 'registros' && <section className="v2-class-workspace__section" aria-labelledby="class-records-title"><div className="v2-class-workspace__section-heading"><div><span className="v2-eyebrow">MEMÓRIA PEDAGÓGICA</span><h2 id="class-records-title">Registros da turma</h2></div><button type="button" className="v2-class-workspace__text-action v2-pressable" onClick={() => goTo('observacao')}><Plus size={17} />Novo</button></div><div className="v2-class-workspace__record-intro"><NotebookPen size={23} /><p>As observações ficam vinculadas a cada aluno para preservar o contexto e o histórico pedagógico.</p></div>{recordState.error && <p className="v2-class-workspace__error" role="alert">{recordState.error}</p>}{alunos.length ? <div className="v2-class-workspace__record-list">{alunos.map((student) => { const records = recordState.items[student.id] || []; const latest = records[0]; return <button type="button" key={student.id} className="v2-class-workspace__wide-action v2-pressable" onClick={() => goTo('perfil', student)}><span className="v2-class-workspace__student-avatar" style={{ background: student.cor || '#dff3ff' }}>{initials(student.nome)}</span><span><strong>{student.nome}</strong><small>{recordState.status === 'loading' ? 'Carregando registros…' : recordState.status === 'error' ? 'Não foi possível carregar agora' : records.length ? `${records.length} registro${records.length === 1 ? '' : 's'}${latest?.data ? ` · ${latest.data}` : ''}` : 'Nenhuma observação ainda · Abrir para adicionar'}</small></span><ChevronRight size={19} /></button>; })}</div> : <div className="v2-class-workspace__empty"><FileText size={28} /><strong>Nenhum aluno para registrar</strong><p>Cadastre um aluno antes de criar uma observação.</p></div>}</section>}
      {aba === 'historico' && renderHistory()}
      {aba === 'gestao' && renderManagement()}
    </>}
    <p className="v2-class-workspace__context-note"><Users size={16} />Dados desta turma ficam salvos no aparelho e podem ser usados offline.</p>
    <nav className="v2-class-workspace__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-class-workspace__nav-item v2-pressable${id === 'turmas' ? ' is-selected' : ''}`} aria-current={id === 'turmas' ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={22} /><span>{label}</span></button>)}</nav>
  </div></main>;
}
