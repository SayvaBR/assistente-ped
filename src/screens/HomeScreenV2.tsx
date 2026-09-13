import { useEffect, useMemo, useState } from 'react';
import { Bell, CheckCircle2, ChevronRight, ClipboardCheck, FileText, WifiOff } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { h0, jp, S0, storage, tp } from '../core/recovered.js';
import { Ss } from '../data/files.js';
import { Cp, Xf } from '../data/agenda-camera.js';
import { Mh } from '../data/notifications.js';
import { AvatarMark, Button, Chip, ErrorState, EmptyState, IconButton, LoadingState, Row, Screen, SectionHeader, SuccessState, Surface, TopBar } from '../design-system';

type AnyRecord = Record<string, any>;

function startOfWeek(value: Date) {
  const result = new Date(value);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function formatDate(value: string, options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' }) {
  const parsed = new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toLocaleDateString('pt-BR', options);
}

function formatDateTime(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function activityMeta(key: string, value: any) {
  const suffix = key.split(':').slice(2).join(':');
  if (suffix.startsWith('planejamento:')) return { title: 'Planejamento atualizado', label: 'Planejamento', route: 'plano', time: value?.[0]?.atualizadoEm || value?.[0]?.criadoEm || `${suffix.slice(14)}T12:00:00` };
  if (suffix.startsWith('chamada:') && value && Object.keys(value).length) return { title: 'Frequência registrada', label: 'Chamada', route: 'chamada', time: `${suffix.slice(8)}T12:00:00` };
  if (suffix.startsWith('diario:') && value && typeof value === 'object') return { title: 'Diário atualizado', label: 'Diário', route: 'registro-rapido', time: value.atualizadoEm || `${suffix.slice(7)}T12:00:00` };
  if (suffix === 'alunos') return { title: 'Turma atualizada', label: 'Turma', route: 'turma', time: null };
  return null;
}

async function loadRecentActivity(turmaId: string) {
  const records: AnyRecord[] = [];
  for (const key of (await storage.list(`turma:${turmaId}:`))?.keys || []) {
    try {
      const item = activityMeta(key, JSON.parse((await storage.get(key)).value));
      if (item) records.push({ ...item, id: key });
    } catch { /* Legacy/corrupt keys do not block the Home. */ }
  }
  return records.sort((a, b) => String(b.time || '').localeCompare(String(a.time || ''))).slice(0, 4);
}

export function HomeScreenV2({ perfil, planosDeHoje = [], mudarAba, abrirTela, turma, alunos = [], frequenciaHoje = {} }: AnyRecord) {
  const now = new Date();
  const [agenda, setAgenda] = useState<AnyRecord>({ status: 'loading', items: [], error: '' });
  const [reminders, setReminders] = useState<AnyRecord>({ status: 'loading', items: [], error: '' });
  const [recent, setRecent] = useState<AnyRecord>({ status: 'loading', items: [], error: '' });
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine !== false);
  const [message, setMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [confirmEvent, setConfirmEvent] = useState<AnyRecord | null>(null);
  const loadDashboard = async () => {
    if (!turma?.id) { setAgenda({ status: 'empty', items: [] }); setReminders({ status: 'empty', items: [] }); setRecent({ status: 'empty', items: [] }); return; }
    setAgenda((state: AnyRecord) => ({ ...state, status: 'loading', error: '' }));
    setReminders((state: AnyRecord) => ({ ...state, status: 'loading', error: '' }));
    setRecent((state: AnyRecord) => ({ ...state, status: 'loading', error: '' }));
    const [agendaResult, reminderResult, recentResult] = await Promise.allSettled([Cp(storage, turma.id), Mh(), loadRecentActivity(turma.id)]);
    agendaResult.status === 'fulfilled' ? setAgenda({ status: agendaResult.value.length ? 'ready' : 'empty', items: agendaResult.value, error: '' }) : setAgenda({ status: 'error', items: [], error: 'Não foi possível carregar a agenda.' });
    reminderResult.status === 'fulfilled' ? setReminders({ status: reminderResult.value?.length ? 'ready' : 'empty', items: reminderResult.value || [], error: '' }) : setReminders({ status: 'error', items: [], error: 'Não foi possível consultar os lembretes locais.' });
    recentResult.status === 'fulfilled' ? setRecent({ status: recentResult.value?.length ? 'ready' : 'empty', items: recentResult.value || [], error: '' }) : setRecent({ status: 'error', items: [], error: 'Não foi possível consultar a atividade recente.' });
  };
  useEffect(() => { loadDashboard(); }, [turma?.id]);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine !== false);
    window.addEventListener('online', update); window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  const plans = (planosDeHoje || []).filter((plan: AnyRecord) => plan && plan.status !== 'arquivado');
  const moments = useMemo(() => h0(planosDeHoje || []), [planosDeHoje]);
  const nextMoment = moments.find((moment: AnyRecord) => (moment.horario || '') >= `${now.getHours()}`.padStart(2, '0') + ':' + `${now.getMinutes()}`.padStart(2, '0')) || moments[moments.length - 1];
  const weekEvents = useMemo(() => {
    const start = startOfWeek(now); const end = new Date(start); end.setDate(end.getDate() + 7);
    return (agenda.items || []).filter((item: AnyRecord) => { const date = new Date(`${item.data}T12:00:00`); return date >= start && date < end; }).sort((a: AnyRecord, b: AnyRecord) => `${a.data}${a.hora || ''}`.localeCompare(`${b.data}${b.hora || ''}`));
  }, [agenda.items]);
  const present = alunos.filter((student: AnyRecord) => ['presente', 'atrasado', 'saida_antecipada'].includes(frequenciaHoje[student.id])).length;
  const absent = alunos.filter((student: AnyRecord) => frequenciaHoje[student.id] === 'falta').length;
  const attendanceDone = alunos.length > 0 && present + absent === alunos.length;
  const goAttendance = () => abrirTela(alunos.length ? 'chamada' : 'novo-aluno');
  const goRecord = () => abrirTela(alunos.length ? 'registro-rapido' : 'novo-aluno');
  const photo = typeof perfil?.foto === 'string' ? perfil.foto : Ss(perfil?.foto, { convertFileSrc: Capacitor.convertFileSrc });
  const finishEvent = async () => {
    if (!confirmEvent || !turma?.id) return;
    setActionError('');
    try {
      const saved = await Xf(storage, turma.id, (agenda.items || []).map((item: AnyRecord) => item.id === confirmEvent.id ? { ...item, concluido: !item.concluido, atualizadoEm: new Date().toISOString() } : item));
      setAgenda({ status: saved.length ? 'ready' : 'empty', items: saved, error: '' }); setConfirmEvent(null); setMessage(confirmEvent.concluido ? 'Compromisso reaberto.' : 'Compromisso concluído.');
      window.setTimeout(() => setMessage(''), 2800);
    } catch { setActionError('Não foi possível salvar a alteração.'); }
  };
  const greeting = perfil?.nome?.trim()?.length > 2 ? S0(perfil, now) : 'Olá, professora';
  return <Screen variant="narrative" className="v2-home-screen">
    <TopBar title={greeting} subtitle={jp(now)} trailing={<IconButton label="Abrir meu perfil" onClick={() => abrirTela('perfil-professor')}><span className="v2-home-avatar-wrap">{photo ? <img src={photo} alt="" /> : <AvatarMark name={perfil?.nome} />}</span></IconButton>} />
    <div className="v2-home-body">
      {!online && <div className="v2-inline-notice"><WifiOff aria-hidden="true" /><span>Você está offline. Seus dados locais continuam disponíveis.</span></div>}
      {message && <SuccessState>{message}</SuccessState>}
      {actionError && <ErrorState message={actionError} />}
      <section className="v2-context-strip" aria-label="Contexto da turma">
        <div><span className="v2-overline">SEU ESPAÇO DE HOJE</span><strong>{turma?.nome || 'Configure sua primeira turma'}</strong><span>{turma?.nivel || 'Adicione uma turma para começar'}{turma ? ` · ${alunos.length} aluno${alunos.length === 1 ? '' : 's'}` : ''}</span></div>
        <button type="button" className="v2-context-link" onClick={() => mudarAba('turma')}>Abrir turma <ChevronRight aria-hidden="true" /></button>
      </section>
      <section aria-labelledby="v2-next-lesson-title">
        <div className="v2-overline v2-section-kicker">PRÓXIMA AÇÃO</div>
        <Surface tone="accent" className="v2-lesson-hero">
          <div className="v2-lesson-hero-top"><span>{nextMoment?.horario || 'Hoje'}</span><Chip tone="neutral">{attendanceDone ? 'Chamada feita' : 'Chamada pendente'}</Chip></div>
          <h2 id="v2-next-lesson-title">{nextMoment?.titulo || nextMoment?.planoTitulo || (turma ? 'Prepare a próxima aula' : 'Comece pelo seu contexto')}</h2>
          <p>{nextMoment?.descricao || (turma ? `${turma.nome} está pronta para o próximo passo da rotina.` : 'Crie sua primeira turma para organizar aula, frequência e planejamento.')}</p>
          <Button variant="secondary" haptic="impact" onClick={nextMoment || turma ? () => mudarAba('plano') : () => abrirTela('gerenciar-turmas')}>{nextMoment ? 'Continuar plano' : turma ? 'Planejar próxima aula' : 'Criar minha primeira turma'}</Button>
        </Surface>
      </section>
      <section aria-labelledby="v2-actions-title"><SectionHeader title="Para resolver agora" /><div className="v2-action-rail" id="v2-actions-title"><button type="button" onClick={goAttendance}><ClipboardCheck aria-hidden="true" /><span><strong>{attendanceDone ? 'Revisar chamada' : 'Fazer chamada'}</strong><small>{alunos.length ? `${present} presentes · ${absent} faltas` : 'Cadastre alunos primeiro'}</small></span><ChevronRight aria-hidden="true" /></button><button type="button" onClick={goRecord}><FileText aria-hidden="true" /><span><strong>Registrar observação</strong><small>Deixe o contexto da aula salvo</small></span><ChevronRight aria-hidden="true" /></button></div></section>
      <section aria-labelledby="v2-agenda-title"><SectionHeader title="Sua agenda" action="Ver planejamento" onAction={() => mudarAba('plano')} /><div className="v2-list-surface" id="v2-agenda-title">{agenda.status === 'loading' && <LoadingState label="Carregando agenda…" />}{agenda.status === 'error' && <ErrorState message={agenda.error} onRetry={loadDashboard} />}{agenda.status === 'empty' && <EmptyState title="Nenhum compromisso salvo" description="Use o planejamento para organizar o próximo encontro." action={<Button variant="secondary" onClick={() => mudarAba('plano')}>Abrir planejamento</Button>} />}{weekEvents.slice(0, 4).map((item: AnyRecord) => <Row key={item.id} onClick={() => setConfirmEvent(item)} trailing={<ChevronRight aria-hidden="true" />}><div className="v2-agenda-row"><time>{formatDate(item.data)}<strong>{item.hora || '—'}</strong></time><span><strong className={item.concluido ? 'is-done' : ''}>{item.titulo}</strong><small>{item.tipo || 'Compromisso'}{item.concluido ? ' · concluído' : ''}</small></span></div></Row>)}</div></section>
      <section aria-labelledby="v2-plans-title"><SectionHeader title="Próximos planos" action="Ver todos" onAction={() => mudarAba('plano')} /><div className="v2-plan-list" id="v2-plans-title">{plans.length ? plans.slice(0, 3).map((plan: AnyRecord, index: number) => { const moment = h0([plan])[0]; const meta = (tp as AnyRecord)[moment?.tipo || 'acolhida'] || (tp as AnyRecord).acolhida; return <Row key={plan.id || index} onClick={() => mudarAba('plano')} trailing={<Chip tone={plan.status === 'concluido' ? 'success' : 'neutral'}>{plan.status === 'concluido' ? 'Concluído' : 'Rascunho'}</Chip>}><span className="v2-plan-dot" style={{ background: meta.color }} /><div><strong>{plan.tituloTema || 'Plano sem título'}</strong><small>{moment?.horario || 'Sem horário definido'}</small></div></Row>; }) : <p className="v2-muted-copy">Nenhum planejamento criado para hoje.</p>}</div></section>
      {reminders.items.length > 0 && <section><SectionHeader title="Lembretes pendentes" action="Gerenciar" onAction={() => abrirTela('notificacoes')} /><div className="v2-list-surface"><Row trailing={<ChevronRight aria-hidden="true" />}><Bell aria-hidden="true" className="v2-row-symbol" /><div><strong>{reminders.items[0].title || 'Lembrete'}</strong><small>{reminders.items[0].schedule?.at ? formatDateTime(reminders.items[0].schedule.at) : 'Horário programado'}</small></div></Row></div></section>}
      {recent.items.length > 0 && <section><SectionHeader title="O que mudou" /><div className="v2-list-surface">{recent.items.map((item: AnyRecord) => <Row key={item.id} onClick={() => item.route === 'turma' || item.route === 'plano' ? mudarAba(item.route) : abrirTela(item.route)} trailing={<ChevronRight aria-hidden="true" />}><CheckCircle2 aria-hidden="true" className="v2-row-symbol" /><div><strong>{item.title}</strong><small>{item.label} · {formatDateTime(item.time)}</small></div></Row>)}</div></section>}
      {confirmEvent && <Surface tone="soft" className="v2-confirm-strip"><div><strong>{confirmEvent.concluido ? 'Reabrir compromisso?' : 'Concluir compromisso?'}</strong><span>{confirmEvent.titulo}</span></div><div><Button variant="tertiary" onClick={() => setConfirmEvent(null)}>Cancelar</Button><Button onClick={finishEvent}>{confirmEvent.concluido ? 'Reabrir' : 'Concluir'}</Button></div></Surface>}
    </div>
  </Screen>;
}
