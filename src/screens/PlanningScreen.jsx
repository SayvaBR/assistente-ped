import React, { useEffect, useMemo, useState } from "react";
import { Archive, CalendarDays, ChevronLeft, ChevronRight, Copy, FileText, MoreHorizontal, Plus, Star, StickyNote, Trash2 } from "lucide-react";
import { ScreenHeader } from "../core/recovered.js";
import { Cp, Xf } from "../data/agenda-camera.js";
import { storage } from "../core/recovered.js";
import { deletePlan, listPlans, loadPlansByDate, savePlan, updatePlanMetadata } from "../data/planRepository";
import { newLessonPlan } from "../domain/lessonPlans";
import { entityId } from "../data/localStore";
import { PlanningBoard } from "../components/PlanningBoard";

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const todayKey = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; };
const keyToDate = (key) => new Date(`${key}T12:00:00`);
const keyFromDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const formatDate = (key) => keyToDate(key).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
const formatShort = (key) => keyToDate(key).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
const timeToMinutes = (time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time || "") ? Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) : null;
const minutesToTime = (minutes) => `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
const shiftEndTime = (start, end, nextStart) => {
  const currentStart = timeToMinutes(start), currentEnd = timeToMinutes(end), targetStart = timeToMinutes(nextStart);
  if (currentStart === null || currentEnd === null || targetStart === null || currentEnd < currentStart) return nextStart;
  return minutesToTime(Math.min(targetStart + currentEnd - currentStart, 23 * 60 + 59));
};

function StatusPill({ plan }) {
  const archived = !!plan.arquivadoEm;
  const label = archived ? "Arquivado" : plan.status === "concluido" ? "Concluído" : "Rascunho";
  return <span className={`plan-status plan-status-${archived ? "archived" : plan.status}`}>{label}</span>;
}

function PlanCard({ plan, onOpen, onFavorite, onArchive, onDuplicate, onDelete }) {
  const [menu, setMenu] = useState(false);
  const moments = (plan.momentos || []).slice().sort((a, b) => (a.horario || "").localeCompare(b.horario || ""));
  return <article className="ui-card planning-plan-card">
    <button className="planning-plan-main" onClick={() => onOpen(plan)} aria-label={`Abrir ${plan.tituloTema || "plano sem título"}`}>
      <div className="planning-plan-heading"><span className="planning-plan-icon"><FileText size={18} /></span><span className="planning-plan-title-wrap"><strong>{plan.tituloTema || "Plano sem título"}</strong><small>{plan.horaInicio ? `${plan.horaInicio}${plan.horaFim ? `–${plan.horaFim}` : ""}` : "Horário não definido"}</small></span><StatusPill plan={plan} /></div>
      {plan.objetivoGeral && <p className="planning-plan-summary">{plan.objetivoGeral}</p>}
      <div className="planning-plan-meta"><span>{moments.length} {moments.length === 1 ? "momento" : "momentos"}</span>{!!plan.bncc?.habilidades?.length && <span>{plan.bncc.habilidades.length} BNCC</span>}{plan.favorito && <Star size={14} fill="currentColor" aria-label="Favorito" />}</div>
    </button>
    <div className="planning-plan-actions"><button className="text-button" onClick={() => onFavorite(plan)} aria-label={plan.favorito ? "Remover dos favoritos" : "Favoritar plano"}><Star size={17} fill={plan.favorito ? "currentColor" : "none"} /></button><div className="planning-more-wrap"><button className="text-button" onClick={() => setMenu((value) => !value)} aria-expanded={menu} aria-label="Mais ações"><MoreHorizontal size={18} /></button>{menu && <div className="planning-action-menu" role="menu"><button onClick={() => { setMenu(false); onDuplicate(plan); }}><Copy size={15} /> Duplicar</button><button onClick={() => { setMenu(false); onArchive(plan); }}><Archive size={15} /> {plan.arquivadoEm ? "Restaurar" : "Arquivar"}</button><button className="danger-action" onClick={() => { setMenu(false); onDelete(plan); }}><Trash2 size={15} /> Excluir</button></div>}</div></div>
  </article>;
}

function FabMenu({ onClose, onCreatePlan, onNote, onSequence }) {
  return <div className="planning-fab-overlay" onClick={onClose}><div className="planning-fab-menu" role="dialog" aria-modal="true" aria-labelledby="planning-fab-title" onClick={(event) => event.stopPropagation()}><div className="planning-fab-title-row"><div><span className="eyebrow">NOVO</span><h2 id="planning-fab-title">O que você quer planejar?</h2></div><button className="text-button" onClick={onClose} aria-label="Fechar">×</button></div><button className="menu-card" onClick={onCreatePlan}><span className="menu-icon"><FileText size={21} /></span><span><strong>Plano de aula</strong><small>Organize objetivos, momentos e avaliação</small></span><ChevronRight size={18} /></button><button className="menu-card" onClick={onNote}><span className="menu-icon"><StickyNote size={21} /></span><span><strong>Anotação rápida</strong><small>Registre uma ideia para revisar depois</small></span><ChevronRight size={18} /></button><button className="menu-card" onClick={onSequence}><span className="menu-icon"><CalendarDays size={21} /></span><span><strong>Sequência de aulas</strong><small>Conecte várias aulas por um objetivo</small></span><ChevronRight size={18} /></button></div></div>;
}

export function PlanningScreen({ goTo, onAbrirPlano, turmaId, onDirtyChange, formDirty }) {
  const [view, setView] = useState("dia");
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [month, setMonth] = useState(() => { const date = keyToDate(todayKey()); return new Date(date.getFullYear(), date.getMonth(), 1); });
  const [plans, setPlans] = useState([]), [dayPlans, setDayPlans] = useState([]), [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true), [error, setError] = useState(""), [offline, setOffline] = useState(typeof navigator !== "undefined" && !navigator.onLine);
  const [fabOpen, setFabOpen] = useState(false), [filter, setFilter] = useState("todos"), [toast, setToast] = useState(""), [confirming, setConfirming] = useState(null), [undoMove, setUndoMove] = useState(null);
  const run = (action) => { if (formDirty) setConfirming({ action }); else action(); };
  const refresh = async () => {
    if (!turmaId) { setPlans([]); setDayPlans([]); setLoading(false); return; }
    setLoading(true); setError("");
    try { const [all, day, agenda] = await Promise.all([listPlans(turmaId), loadPlansByDate(turmaId, selectedDate), Cp(storage, turmaId)]); setPlans(all); setDayPlans(day); setEvents(agenda || []); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível carregar o planejamento."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void refresh(); }, [turmaId, selectedDate]);
  useEffect(() => { const online = () => setOffline(false), offlineNow = () => setOffline(true); window.addEventListener("online", online); window.addEventListener("offline", offlineNow); return () => { window.removeEventListener("online", online); window.removeEventListener("offline", offlineNow); }; }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => { setToast(""); setUndoMove(null); }, undoMove ? 5000 : 2600);
    return () => clearTimeout(timer);
  }, [toast, undoMove]);
  const visiblePlans = useMemo(() => plans.filter((plan) => filter === "todos" || (filter === "favoritos" ? plan.favorito : filter === "arquivados" ? plan.arquivadoEm : plan.status === filter)), [plans, filter]);
  const monthDays = useMemo(() => { const first = new Date(month.getFullYear(), month.getMonth(), 1).getDay(), count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); return [...Array(first).fill(null), ...Array.from({ length: count }, (_, index) => keyFromDate(new Date(month.getFullYear(), month.getMonth(), index + 1)))]; }, [month]);
  const weekDays = useMemo(() => { const date = keyToDate(selectedDate), start = new Date(date); start.setDate(date.getDate() - date.getDay()); return Array.from({ length: 7 }, (_, index) => { const current = new Date(start); current.setDate(start.getDate() + index); return keyFromDate(current); }); }, [selectedDate]);
  const hasPlan = (key) => plans.some((plan) => plan.dataKey === key && !plan.arquivadoEm);
  const selectDate = (key) => run(() => { setSelectedDate(key); setView("dia"); });
  const openNew = () => { const draft = newLessonPlan({ turmaId, dataKey: selectedDate }); onAbrirPlano?.(draft, selectedDate); setFabOpen(false); };
  const mutate = async (plan, kind) => {
    try {
      if (kind === "delete") { await deletePlan(plan); setToast("Plano excluído."); }
      else if (kind === "duplicate") { const copy = { ...structuredClone(plan), id: entityId("plano"), tituloTema: `${plan.tituloTema || "Plano"} — cópia`, criadoEm: new Date().toISOString(), atualizadoEm: new Date().toISOString(), status: "rascunho", arquivadoEm: null, favorito: false }; await savePlan(copy); setToast("Plano duplicado como rascunho."); }
      else { await updatePlanMetadata(plan, { favorito: kind === "favorite" ? !plan.favorito : plan.arquivadoEm ? null : new Date().toISOString() }); setToast(kind === "favorite" ? (plan.favorito ? "Removido dos favoritos." : "Adicionado aos favoritos.") : (plan.arquivadoEm ? "Plano restaurado." : "Plano arquivado.")); }
      await refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível atualizar o plano."); }
  };
  const movePlan = async (plan, target) => {
    if (formDirty) {
      setConfirming({ action: () => void movePlan(plan, target) });
      return;
    }
    const nextStart = target.time || "";
    const nextEnd = nextStart ? shiftEndTime(plan.horaInicio, plan.horaFim, nextStart) : "";
    await savePlan({ ...plan, dataKey: target.dateKey, horaInicio: nextStart, horaFim: nextEnd, atualizadoEm: new Date().toISOString() });
    setUndoMove({ busy: false, undo: async () => savePlan(plan) });
    setToast(`Plano movido para ${formatShort(target.dateKey)}${nextStart ? ` às ${nextStart}` : " sem horário"}.`);
    await refresh();
  };
  const moveEvent = async (event, target) => {
    if (formDirty) {
      setConfirming({ action: () => void moveEvent(event, target) });
      return;
    }
    const previousEvent = { ...event };
    await Xf(storage, turmaId, events.map((item) => item.id === event.id ? { ...item, data: target.dateKey, hora: target.time } : item));
    setUndoMove({ busy: false, undo: async () => {
      const currentEvents = await Cp(storage, turmaId);
      const restored = currentEvents.some((item) => item.id === previousEvent.id)
        ? currentEvents.map((item) => item.id === previousEvent.id ? previousEvent : item)
        : [...currentEvents, previousEvent];
      await Xf(storage, turmaId, restored);
    } });
    setToast(`Compromisso movido para ${formatShort(target.dateKey)}${target.time ? ` às ${target.time}` : " sem horário"}.`);
    await refresh();
  };
  const undoLastMove = async () => {
    if (!undoMove || undoMove.busy) return;
    const action = undoMove;
    setUndoMove({ ...action, busy: true });
    try {
      await action.undo();
      setUndoMove(null);
      setToast("Movimento desfeito.");
      await refresh();
    } catch (cause) {
      setUndoMove(null);
      setError(cause instanceof Error ? cause.message : "Não foi possível desfazer o movimento.");
    }
  };
  const dayEvents = events.filter((event) => event.data === selectedDate).sort((a, b) => (a.hora || "99:99").localeCompare(b.hora || "99:99"));
  const cardProps = (plan) => ({ plan, onOpen: (item) => onAbrirPlano?.(item, item.dataKey), onFavorite: (item) => void mutate(item, "favorite"), onArchive: (item) => void mutate(item, "archive"), onDuplicate: (item) => void mutate(item, "duplicate"), onDelete: (item) => setConfirming({ plan: item, action: () => void mutate(item, "delete") }) });
  return <section className="planning-screen">
    <ScreenHeader title="Planejamento" subtitle="Organize suas aulas e acompanhe sua agenda" action={<div className="action-row"><button className="secondary-button" onClick={() => goTo("sequencias")}><CalendarDays size={16} /> Sequências</button></div>} />
    <div className="module-content planning-content">
      {offline && <div className="notice">Você está offline. As alterações ficam salvas neste dispositivo.</div>}
      {error && <div className="notice notice-error" role="alert">{error}<button className="text-button" onClick={() => void refresh()}>Tentar novamente</button></div>}
      {!turmaId && <div className="empty-state"><CalendarDays size={32} /><h2>Selecione uma turma</h2><p>Escolha uma turma para criar e consultar seus planos.</p></div>}
      {turmaId && <>
        <div className="planning-view-tabs" role="tablist" aria-label="Visualização do planejamento">{[["dia", "Agenda do dia"], ["quadro", "Quadro"], ["semana", "Semana"], ["calendario", "Mês"]].map(([value, label]) => <button key={value} className={view === value ? "active" : ""} onClick={() => run(() => setView(value))} role="tab" aria-selected={view === value}>{label}</button>)}</div>
        {view === "dia" && <><div className="planning-date-nav"><button className="text-button" onClick={() => run(() => { const date = keyToDate(selectedDate); date.setDate(date.getDate() - 1); setSelectedDate(keyFromDate(date)); })} aria-label="Dia anterior"><ChevronLeft /></button><div><strong>{formatDate(selectedDate)}</strong><small>{selectedDate === todayKey() ? "Hoje" : formatShort(selectedDate)}</small></div><button className="text-button" onClick={() => run(() => { const date = keyToDate(selectedDate); date.setDate(date.getDate() + 1); setSelectedDate(keyFromDate(date)); })} aria-label="Próximo dia"><ChevronRight /></button></div>{selectedDate !== todayKey() && <button className="text-button planning-today" onClick={() => run(() => setSelectedDate(todayKey()))}>Ir para hoje</button>}<div className="planning-section-heading"><div><span className="eyebrow">AGENDA</span><h2>Planos de aula</h2></div><span className="count-badge">{dayPlans.length}</span></div>{loading ? <div className="notice">Carregando planejamento…</div> : dayPlans.length ? dayPlans.map((plan) => <PlanCard key={plan.id} {...cardProps(plan)} />) : <div className="empty-state planning-empty"><FileText size={28} /><h2>Nenhum plano nesta data</h2><p>Comece com um plano de aula e deixe seus objetivos organizados.</p><button className="ui-button" onClick={openNew}><Plus size={18} /> Criar plano</button></div>}{!!dayEvents.length && <div className="ui-card planning-events"><div className="planning-section-heading"><div><span className="eyebrow">COMPROMISSOS</span><h2>Agenda</h2></div><span className="count-badge">{dayEvents.length}</span></div>{dayEvents.map((event) => <div className="planning-event" key={event.id}><span className="event-dot" /><div><strong>{event.titulo}</strong><small>{event.hora || "Dia inteiro"}</small></div></div>)}</div>}</>}
        {view === "quadro" && <PlanningBoard plans={plans} events={events} weekDays={weekDays} selectedDate={selectedDate} onSelectDate={(key) => run(() => setSelectedDate(key))} onOpenPlan={(plan) => onAbrirPlano?.(plan, plan.dataKey)} onMovePlan={movePlan} onMoveEvent={moveEvent} />}
        {view === "semana" && <div className="planning-week-list">{weekDays.map((key) => <button className={`planning-week-day ${key === selectedDate ? "selected" : ""}`} key={key} onClick={() => selectDate(key)}><span>{weekdays[keyToDate(key).getDay()]}</span><strong>{keyToDate(key).getDate()}</strong><small>{hasPlan(key) ? `${plans.filter((plan) => plan.dataKey === key && !plan.arquivadoEm).length} plano(s)` : "Sem plano"}</small></button>)}</div>}
        {view === "calendario" && <div className="ui-card planning-calendar"><div className="planning-calendar-heading"><button className="text-button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Mês anterior"><ChevronLeft /></button><strong>{monthNames[month.getMonth()]} {month.getFullYear()}</strong><button className="text-button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Próximo mês"><ChevronRight /></button></div><div className="planning-calendar-grid planning-calendar-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div><div className="planning-calendar-grid">{monthDays.map((key, index) => key ? <button className={`${selectedDate === key ? "selected" : ""} ${key === todayKey() ? "today" : ""}`} key={key} onClick={() => selectDate(key)} aria-label={`${formatShort(key)}${hasPlan(key) ? ", com plano" : ""}`}><span>{keyToDate(key).getDate()}</span>{hasPlan(key) && <i />}</button> : <span key={`empty-${index}`} />)}</div></div>}
        {view !== "dia" && <div className="planning-library"><div className="planning-section-heading"><div><span className="eyebrow">BIBLIOTECA</span><h2>Seus planos</h2></div><span className="count-badge">{visiblePlans.length}</span></div><div className="planning-filters" role="tablist" aria-label="Filtrar planos">{[["todos", "Todos"], ["rascunho", "Rascunhos"], ["concluido", "Concluídos"], ["favoritos", "Favoritos"], ["arquivados", "Arquivados"]].map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div>{loading ? <div className="notice">Carregando biblioteca…</div> : visiblePlans.length ? visiblePlans.slice(0, 8).map((plan) => <PlanCard key={`library-${plan.id}`} {...cardProps(plan)} />) : <p className="helper-text">Nenhum plano corresponde a este filtro.</p>}</div>}
      </>}
    </div>
    <button className="planning-fab" onClick={() => setFabOpen(true)} aria-label="Criar planejamento"><Plus size={24} /></button>
    {fabOpen && <FabMenu onClose={() => setFabOpen(false)} onCreatePlan={openNew} onNote={() => { setFabOpen(false); goTo("caderno", { dataKey: selectedDate }); }} onSequence={() => { setFabOpen(false); goTo("sequencias"); }} />}
    {confirming && <div className="modal-overlay" role="presentation" onClick={() => setConfirming(null)}><div className="ui-card planning-confirm" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><h2>{confirming.plan ? "Excluir plano?" : "Descartar alterações?"}</h2><p>{confirming.plan ? `“${confirming.plan.tituloTema || "Plano sem título"}” será removido do dispositivo.` : "As alterações atuais ainda não foram salvas."}</p><div className="action-row"><button className="secondary-button" onClick={() => setConfirming(null)}>Cancelar</button><button className="ui-button" onClick={() => { const action = confirming.action; setConfirming(null); action?.(); }}>{confirming.plan ? "Excluir" : "Descartar"}</button></div></div></div>}
    {toast && <div className="planning-toast" role="status"><span>{toast}</span>{undoMove && <button className="planning-toast-action" onClick={() => void undoLastMove()} disabled={undoMove.busy}>{undoMove.busy ? "Desfazendo…" : "Desfazer"}</button>}</div>}
  </section>;
}
