import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Check, Clock3, Search, UserRound, X } from 'lucide-react';
import { Dp, dateKey, repository, confirmAction } from '../core/recovered.js';
import { Button, Chip, EmptyState, ErrorState, Field, LoadingState, Row, Screen, SuccessState, TopBar } from '../design-system';
import { Y0 } from './Y0.js';

type Student = { id: string; nome: string; cor?: string };
type Status = 'presente' | 'atrasado' | 'falta' | 'falta_justificada' | 'saida_antecipada';
const statuses: Array<{ value: Status; label: string; short: string; tone: 'success' | 'warning' | 'danger' | 'neutral' }> = [
  { value: 'presente', label: 'Presente', short: 'Pres.', tone: 'success' },
  { value: 'atrasado', label: 'Atrasado', short: 'Atras.', tone: 'warning' },
  { value: 'falta', label: 'Falta', short: 'Falta', tone: 'danger' },
  { value: 'falta_justificada', label: 'Justificada', short: 'Just.', tone: 'neutral' },
  { value: 'saida_antecipada', label: 'Saída antecipada', short: 'Saída', tone: 'warning' },
];

export function AttendanceScreenV2({ alunos = [], dataKey, onBack, onSalvo, turma }: { alunos?: Student[]; dataKey: string; onBack: () => void; onSalvo: (value: Record<string, Status>) => Promise<void>; turma?: { nome?: string } }) {
  const [attendance, setAttendance] = useState<Record<string, Status>>({});
  const [justifications, setJustifications] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('todos');
  const [justifying, setJustifying] = useState<Student | null>(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<{ id: string; value: Status } | null>(null);
  const load = async () => {
    setLoading(true); setError('');
    try { const [current, reasons] = await Promise.all([repository.carregarChamadaPorData(dataKey), repository.carregarJustificativasPorData(dataKey)]); setAttendance(current || {}); setJustifications(reasons || {}); }
    catch (cause: any) { setError(cause?.message || 'Não foi possível carregar a chamada.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [dataKey]);
  const updateStatus = async (studentId: string, status: Status) => {
    const next = { ...attendance, ...(attendance[studentId] === status ? {} : { [studentId]: status }) };
    if (attendance[studentId] === status) delete next[studentId];
    setAttendance(next); setSaving(studentId); setSaveError(null); setSaved(false);
    try { await onSalvo(next); setSaved(true); window.setTimeout(() => setSaved(false), 2200); }
    catch { setSaveError({ id: studentId, value: status }); setAttendance(attendance); }
    finally { setSaving(null); }
  };
  const retryStatus = () => saveError && updateStatus(saveError.id, saveError.value);
  const clear = async () => { if (await confirmAction({ title: 'Limpar chamada?', message: 'As marcações deste dia serão removidas, mas os alunos continuam na turma.', confirmLabel: 'Limpar chamada', destructive: true })) { setAttendance({}); await onSalvo({}); } };
  const counts = { marked: alunos.filter((student) => Boolean(attendance[student.id])).length, present: alunos.filter((student) => ['presente', 'atrasado', 'saida_antecipada'].includes(attendance[student.id])).length, absent: alunos.filter((student) => ['falta', 'falta_justificada'].includes(attendance[student.id])).length };
  const filtered = useMemo(() => alunos.filter((student) => {
    const matchesQuery = !query.trim() || student.nome.toLowerCase().includes(query.trim().toLowerCase());
    const value = attendance[student.id];
    const matchesFilter = filter === 'todos' || filter === 'presentes' && value === 'presente' || filter === 'faltas' && value === 'falta' || filter === 'pendentes' && !value;
    return matchesQuery && matchesFilter;
  }), [alunos, attendance, filter, query]);
  if (loading) return <Screen variant="dense"><TopBar title={turma?.nome || 'Chamada'} subtitle="Carregando frequência…" onBack={onBack} /><LoadingState label="Carregando chamada…" /></Screen>;
  if (error) return <Screen variant="dense"><TopBar title={turma?.nome || 'Chamada'} subtitle={Dp(dataKey)} onBack={onBack} /><ErrorState message={error} onRetry={load} /></Screen>;
  return <Screen variant="dense" className="v2-attendance-screen">
    <TopBar title={turma?.nome || 'Chamada'} subtitle={`${alunos.length} aluno${alunos.length === 1 ? '' : 's'} · ${Dp(dataKey)}`} onBack={onBack} trailing={<Button variant="tertiary" onClick={clear}>Limpar</Button>} />
    <div className="v2-attendance-body">
      <div className="v2-attendance-summary" aria-label="Resumo da frequência"><div><strong>{counts.present}</strong><span>Presentes</span></div><div><strong>{counts.absent}</strong><span>Faltas</span></div><div><strong>{alunos.length - counts.marked}</strong><span>Pendentes</span></div></div>
      {saved && <SuccessState>Alteração salva neste aparelho.</SuccessState>}
      {saveError && <div className="v2-attendance-error" role="alert"><AlertCircle aria-hidden="true" /><span>A marcação não foi salva. Verifique o armazenamento.</span><Button variant="secondary" onClick={retryStatus}>Tentar novamente</Button></div>}
      <Field id="attendance-search" label="Buscar aluno" placeholder="Nome do aluno" value={query} onChange={(event) => setQuery(event.target.value)} icon={Search} />
      <div className="v2-filter-scroll" aria-label="Filtrar alunos"><Chip selected={filter === 'todos'} onClick={() => setFilter('todos')}>Todos {alunos.length}</Chip><Chip selected={filter === 'pendentes'} onClick={() => setFilter('pendentes')}>Pendentes {alunos.length - counts.marked}</Chip><Chip selected={filter === 'presentes'} onClick={() => setFilter('presentes')}>Presentes {counts.present}</Chip><Chip selected={filter === 'faltas'} onClick={() => setFilter('faltas')}>Faltas {counts.absent}</Chip></div>
      <div className="v2-student-list">{filtered.length === 0 ? <EmptyState title="Nenhum aluno neste filtro" description="Escolha outro filtro ou ajuste a busca." action={<Button variant="tertiary" onClick={() => { setFilter('todos'); setQuery(''); }}>Mostrar todos</Button>} /> : filtered.map((student) => { const selected = attendance[student.id]; return <Row key={student.id} className="v2-student-row"><span className="v2-student-avatar"><UserRound aria-hidden="true" /></span><div className="v2-student-info"><strong>{student.nome}</strong><small>{selected ? statuses.find((item) => item.value === selected)?.label : 'Ainda sem marcação'}</small></div><div className="v2-status-actions" role="group" aria-label={`Status de ${student.nome}`}>{statuses.slice(0, 3).map((item) => <button key={item.value} type="button" className={selected === item.value ? `is-${item.tone}` : ''} aria-label={`Marcar ${student.nome} como ${item.label}`} aria-pressed={selected === item.value} disabled={saving === student.id} onClick={() => updateStatus(student.id, item.value)}>{item.value === 'presente' ? <Check aria-hidden="true" /> : item.value === 'atrasado' ? <Clock3 aria-hidden="true" /> : <X aria-hidden="true" />}</button>)}</div>{(selected === 'falta' || selected === 'falta_justificada') && <button type="button" className="v2-justify-link" onClick={() => setJustifying(student)}>{justifications[student.id] ? `Justificada: ${justifications[student.id].motivo}` : '+ Justificar ausência'}</button>}</Row>; })}</div>
      <div className="v2-attendance-footer"><span><strong>{counts.marked}/{alunos.length}</strong> marcações salvas automaticamente</span><Button onClick={onBack}>{counts.marked === alunos.length ? 'Concluir chamada' : 'Voltar depois'}</Button></div>
    </div>
    {justifying && <Y0 aluno={justifying} dataKey={dateKey(new Date(dataKey))} atual={justifications[justifying.id]} onClose={() => setJustifying(null)} onSalvo={(value: any) => { setJustifications((current) => ({ ...current, [justifying.id]: value })); setJustifying(null); }} />}
  </Screen>;
}
