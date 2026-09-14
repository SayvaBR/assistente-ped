import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BarChart3, CalendarDays, ChevronRight, FileDown, RotateCcw, UserRound, Users, X } from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './reports-v2.css';
import type { Attendance, ClassRoom, Student, StoragePort } from '../../domain/models';
import type { EducationConfig } from '../../domain/education';
import { buildAttendanceReport, reportCsv } from '../../domain/reports';
import { readJson } from '../../data/localStore';
import { exportText } from '../../data/export';

type Kind = 'individual' | 'turma' | 'periodo' | 'personalizado';
type Props = { turma?: (ClassRoom & EducationConfig) | null; alunos: Student[]; storage: StoragePort; initialDays?: Record<string, Attendance>; onBack: () => void; onGoToClasses?: () => void };
const options: Array<{ key: Kind; title: string; detail: string; icon: typeof Users }> = [
  { key: 'turma', title: 'Visão da turma', detail: 'Frequência e presença do grupo', icon: Users },
  { key: 'individual', title: 'Acompanhar um aluno', detail: 'Histórico de presença individual', icon: UserRound },
  { key: 'periodo', title: 'Escolher período', detail: 'Compare um intervalo de datas', icon: CalendarDays },
];

export function ReportsV2({ turma, alunos, storage, initialDays, onBack, onGoToClasses }: Props) {
  const [kind, setKind] = useState<Kind | null>(null);
  const [student, setStudent] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [days, setDays] = useState<Record<string, Attendance>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  useEffect(() => {
    let active = true;
    if (!turma?.id) { setLoading(false); return () => { active = false; }; }
    if (initialDays) { setDays(initialDays); setLoading(false); return () => { active = false; }; }
    setLoading(true);
    storage.list(`turma:${turma.id}:chamada:`).then(async ({ keys }) => {
      const entries = await Promise.all(keys.map(async (key) => [key.slice(`turma:${turma.id}:chamada:`.length), await readJson<Attendance>(key, {}, storage)] as const));
      if (active) setDays(Object.fromEntries(entries));
    }).catch(() => active && setError('Não foi possível ler as chamadas salvas neste aparelho.')).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [initialDays, turma?.id, storage]);

  const invalid = Boolean(from && to && from > to);
  const filtered = kind === 'individual' ? alunos.filter((item) => item.id === student) : alunos;
  const rows = useMemo(() => invalid ? [] : buildAttendanceReport(filtered, days, from, to), [days, filtered, from, invalid, to]);
  const hasRecords = rows.some((row) => row.percentage !== null);
  const exportCsv = async () => { setBusy(true); setError(''); try { await exportText(`frequencia-${turma?.nome || 'turma'}.csv`, reportCsv(rows), 'text/csv'); setFeedback('CSV preparado para salvar ou compartilhar.'); } catch { setError('Não foi possível exportar o CSV. Tente novamente.'); } finally { setBusy(false); } };

  if (!turma) return <main className="v2-root v2-reports"><div className="v2-screen v2-reports__screen"><header className="v2-reports__header"><button type="button" className="v2-reports__back v2-pressable" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23} /></button><div><span className="v2-eyebrow">ACOMPANHAMENTO</span><h1>Relatórios</h1><p>Leia os sinais da sua turma.</p></div><span className="v2-reports__mark"><BarChart3 size={23} /></span></header><section className="v2-reports__empty v2-surface"><BarChart3 size={32} /><h2>Escolha uma turma para começar</h2><p>Os relatórios são montados a partir das chamadas e registros salvos no dispositivo.</p>{onGoToClasses && <button type="button" className="v2-primary-action v2-pressable" onClick={onGoToClasses}>Gerenciar turmas</button>}</section></div></main>;

  return <main className="v2-root v2-reports"><div className="v2-screen v2-reports__screen"><header className="v2-reports__header"><button type="button" className="v2-reports__back v2-pressable" onClick={kind ? () => setKind(null) : onBack} aria-label={kind ? 'Voltar para tipos de relatório' : 'Voltar'}><ArrowLeft size={23} /></button><div><span className="v2-eyebrow">{turma.nome}</span><h1>{kind ? options.find((item) => item.key === kind)?.title : 'Relatórios'}</h1><p>{kind ? 'Acompanhe dados que já existem.' : 'Leia os sinais da sua turma.'}</p></div><span className="v2-reports__mark"><BarChart3 size={23} /></span></header>
    {error && <div className="v2-reports__error" role="alert"><span>{error}</span><button type="button" className="v2-text-action" onClick={() => window.location.reload()}><RotateCcw size={16} /> Tentar novamente</button></div>}
    {loading && <div className="v2-reports__loading" role="status">Lendo dados locais…</div>}
    {!kind ? <><section className="v2-reports__hero"><span className="v2-eyebrow">VISÃO PEDAGÓGICA</span><h2>Presença que ajuda você a agir.</h2><p>Comece pela turma ou aprofunde em um aluno. Nenhum dado sai deste aparelho para montar a leitura.</p><div className="v2-reports__hero-stats"><strong>{alunos.length}</strong><span>alunos na turma</span><i /> <strong>{Object.keys(days).length}</strong><span>chamadas salvas</span></div></section><section className="v2-reports__options" aria-label="Tipos de relatório">{options.map(({ key, title, detail, icon: Icon }) => <button type="button" className="v2-reports__option v2-pressable" key={key} onClick={() => setKind(key)}><span className="v2-reports__option-icon"><Icon size={22} /></span><span><strong>{title}</strong><small>{detail}</small></span><ChevronRight size={19} /></button>)}</section></> : <section className="v2-reports__workspace"><div className="v2-reports__filters"><div className="v2-reports__section-head"><div><span className="v2-eyebrow">FILTROS</span><h2>Defina o recorte</h2></div><span className="v2-reports__count">{rows.length} {rows.length === 1 ? 'aluno' : 'alunos'}</span></div>{kind === 'individual' && <label className="v2-reports__field"><span>Aluno</span><select value={student} onChange={(event) => setStudent(event.target.value)}><option value="">Selecione um aluno</option>{alunos.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></label>}<div className="v2-reports__date-grid"><label className="v2-reports__field"><span>De</span><input type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></label><label className="v2-reports__field"><span>Até</span><input type="date" value={to} onChange={(event) => setTo(event.target.value)} /></label></div>{invalid && <p className="v2-reports__validation" role="alert">A data inicial deve vir antes da data final.</p>}</div><div className="v2-reports__results"><div className="v2-reports__section-head"><div><span className="v2-eyebrow">RESULTADO LOCAL</span><h2>{hasRecords ? 'Leitura da presença' : 'Ainda sem registros'}</h2></div><span className="v2-reports__count">{hasRecords ? 'Atualizado' : 'Aguardando chamada'}</span></div>{!alunos.length ? <div className="v2-reports__empty-inline"><strong>Nenhum aluno cadastrado</strong><span>Cadastre alunos antes de gerar uma leitura.</span></div> : !hasRecords ? <div className="v2-reports__empty-inline"><strong>Não há chamadas neste recorte</strong><span>Faça uma chamada ou ajuste as datas para gerar o relatório.</span></div> : <div className="v2-reports__rows">{rows.map((row) => <div className="v2-reports__row" key={row.id}><div><strong>{row.nome}</strong><small>{row.percentage === null ? 'Sem chamada' : `${row.percentage}% de presença`}</small></div><span className="v2-reports__meter"><i style={{ width: `${Math.max(0, row.percentage || 0)}%` }} /></span><b>{row.presencas}<small> pres.</small></b></div>)}</div>}</div><div className="v2-reports__actions"><button type="button" className="v2-reports__secondary v2-pressable" disabled={busy || !hasRecords} onClick={() => void exportCsv()}><FileDown size={18} />{busy ? 'Preparando…' : 'Exportar CSV'}</button></div></section>}
    {feedback && <p className="v2-reports__feedback" role="status" aria-live="polite">{feedback}<button type="button" aria-label="Fechar mensagem" onClick={() => setFeedback('')}><X size={15} /></button></p>}<p className="v2-reports__footer">Frequência é calculada a partir das chamadas salvas. Atrasos contam como comparecimento.</p>
  </div></main>;
}
