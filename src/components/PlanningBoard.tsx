import React, { useMemo, useRef, useState } from "react";
import { CalendarClock, GripVertical } from "lucide-react";
import type { LessonPlan } from "../domain/models";

export type PlanningDropTarget = { dateKey: string; time: string };

type AgendaEvent = {
  id: string;
  titulo: string;
  tipo: string;
  data: string;
  hora: string;
  observacoes?: string;
};

type BoardItem = {
  id: string;
  kind: "plan" | "event";
  title: string;
  dateKey: string;
  time: string;
  meta: string;
  tone: number;
  source: LessonPlan | AgendaEvent;
};

type DragState = {
  item: BoardItem;
  x: number;
  y: number;
  target: PlanningDropTarget | null;
};

const slots = Array.from({ length: 12 }, (_, index) => `${String(index + 7).padStart(2, "0")}:00`);
const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function slotFor(time: string) {
  const hour = Number(time.slice(0, 2));
  return Number.isFinite(hour) && hour >= 7 && hour <= 18 ? `${String(hour).padStart(2, "0")}:00` : "";
}

function dayLabel(key: string) {
  const date = new Date(`${key}T12:00:00`);
  return { weekday: weekdays[date.getDay()], day: date.getDate() };
}

function toneFor(item: LessonPlan | AgendaEvent, index: number) {
  if ("tipo" in item) {
    const tones: Record<string, number> = { reuniao: 2, evento: 3, feriado: 4, tarefa: 1, lembrete: 0 };
    return tones[item.tipo] ?? index % 5;
  }
  return index % 5;
}

function getItems(plans: LessonPlan[], events: AgendaEvent[], weekDays: string[]) {
  const allowed = new Set(weekDays);
  const result: BoardItem[] = [];
  plans
    .filter((plan) => allowed.has(plan.dataKey) && !plan.arquivadoEm)
    .forEach((plan, index) => result.push({
      id: `plan-${plan.id}`,
      kind: "plan",
      title: plan.tituloTema || "Plano sem título",
      dateKey: plan.dataKey,
      time: plan.horaInicio || "",
      meta: plan.horaInicio ? `${plan.horaInicio}${plan.horaFim ? `–${plan.horaFim}` : ""}` : "Sem horário",
      tone: toneFor(plan, index),
      source: plan,
    }));
  events
    .filter((event) => allowed.has(event.data))
    .forEach((event, index) => result.push({
      id: `event-${event.id}`,
      kind: "event",
      title: event.titulo,
      dateKey: event.data,
      time: event.hora || "",
      meta: event.hora || "Dia inteiro",
      tone: toneFor(event, index + plans.length),
      source: event,
    }));
  return result;
}

export function PlanningBoard({
  plans,
  events,
  weekDays,
  selectedDate,
  onSelectDate,
  onOpenPlan,
  onMovePlan,
  onMoveEvent,
}: {
  plans: LessonPlan[];
  events: AgendaEvent[];
  weekDays: string[];
  selectedDate: string;
  onSelectDate: (dateKey: string) => void;
  onOpenPlan: (plan: LessonPlan) => void;
  onMovePlan: (plan: LessonPlan, target: PlanningDropTarget) => Promise<void>;
  onMoveEvent: (event: AgendaEvent, target: PlanningDropTarget) => Promise<void>;
}) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const [moving, setMoving] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [expandedStacks, setExpandedStacks] = useState<Set<string>>(new Set());
  const dragRef = useRef<DragState | null>(null);
  const movedRef = useRef(false);
  const items = useMemo(() => getItems(plans, events, weekDays), [plans, events, weekDays]);

  const targetAt = (x: number, y: number): PlanningDropTarget | null => {
    const element = document.elementsFromPoint(x, y).find((candidate) => {
      const node = candidate as HTMLElement;
      return node.dataset.dropDate && node.dataset.dropTime !== undefined;
    }) as HTMLElement | undefined;
    return element?.dataset.dropDate
      ? { dateKey: element.dataset.dropDate, time: element.dataset.dropTime || "" }
      : null;
  };

  const startDrag = (event: React.PointerEvent<HTMLElement>, item: BoardItem) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    movedRef.current = false;
    const next = { item, x: event.clientX, y: event.clientY, target: null };
    dragRef.current = next;
    setDrag(next);
  };

  const moveDrag = (event: React.PointerEvent<HTMLElement>) => {
    const current = dragRef.current;
    if (!current) return;
    const moved = Math.abs(event.clientX - current.x) > 5 || Math.abs(event.clientY - current.y) > 5;
    movedRef.current = movedRef.current || moved;
    const next = { ...current, x: event.clientX, y: event.clientY, target: targetAt(event.clientX, event.clientY) };
    dragRef.current = next;
    setDrag(next);
  };

  const endDrag = async (event: React.PointerEvent<HTMLElement>) => {
    const current = dragRef.current;
    if (!current) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const target = current.target || targetAt(event.clientX, event.clientY);
    dragRef.current = null;
    setDrag(null);
    const wasMoved = movedRef.current;
    window.setTimeout(() => { movedRef.current = false; }, 0);
    if (!wasMoved || !target) return;
    if (target.dateKey === current.item.dateKey && slotFor(current.item.time) === target.time) {
      setAnnouncement("O cartão permaneceu no mesmo horário.");
      return;
    }
    setMoving(true);
    try {
      if (current.item.kind === "plan") await onMovePlan(current.item.source as LessonPlan, target);
      else await onMoveEvent(current.item.source as AgendaEvent, target);
      setAnnouncement(`${current.item.title} movido para ${dayLabel(target.dateKey).weekday}, ${target.time || "sem horário"}.`);
    } catch (cause) {
      setAnnouncement(cause instanceof Error ? cause.message : "Não foi possível mover o cartão.");
    } finally {
      setMoving(false);
    }
  };

  const toggleStack = (key: string) => setExpandedStacks((current) => {
    const next = new Set(current);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });
  const selectDayWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!weekDays.length || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? weekDays.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + weekDays.length) % weekDays.length;
    onSelectDate(weekDays[nextIndex]);
    window.requestAnimationFrame(() => document.getElementById(`planning-board-tab-${weekDays[nextIndex]}`)?.focus());
  };
  const itemFor = (dateKey: string, slot: string) => items.filter((item) => item.dateKey === dateKey && slotFor(item.time) === slot);
  const unscheduledFor = (dateKey: string) => items.filter((item) => item.dateKey === dateKey && !slotFor(item.time));

  const activeDate = weekDays.includes(selectedDate) ? selectedDate : weekDays[0];

  return (
    <section className="planning-board" aria-label="Quadro de planejamento por dia">
      <div className="planning-board-intro">
        <div><span className="eyebrow">QUADRO TÁTIL</span><h2>Arraste para reorganizar</h2></div>
        <span className="planning-board-hint"><GripVertical size={16} /> Solte em outro horário</span>
      </div>
      <div className="planning-board-day-switcher" role="tablist" aria-label="Dias do quadro">
        {weekDays.map((key, index) => {
          const label = dayLabel(key);
          const count = items.filter((item) => item.dateKey === key).length;
          return <button type="button" key={key} id={`planning-board-tab-${key}`} className={`${key === activeDate ? "active" : ""} ${drag?.target?.dateKey === key && !drag.target.time ? "drop-target" : ""}`} onClick={() => onSelectDate(key)} onKeyDown={(event) => selectDayWithKeyboard(event, index)} role="tab" aria-selected={key === activeDate} aria-controls={`planning-board-day-${key}`} tabIndex={key === activeDate ? 0 : -1} aria-label={`${label.weekday}, dia ${label.day}${count ? `, ${count} item${count === 1 ? "" : "s"}` : ", vazio"}`} data-drop-date={key} data-drop-time=""><span>{label.weekday}</span><strong>{label.day}</strong><small>{count ? `${count} item${count === 1 ? "" : "s"}` : "vazio"}</small></button>;
        })}
      </div>
      <div className="planning-board-grid">
        {activeDate && (() => {
          const dateKey = activeDate;
          const label = dayLabel(dateKey);
          return <section className={`planning-board-day ${dateKey === activeDate ? "selected" : ""}`} id={`planning-board-day-${dateKey}`} key={dateKey} role="tabpanel" aria-labelledby={`planning-board-tab-${dateKey}`} aria-label={`${label.weekday} ${label.day}`}>
            <button type="button" className="planning-board-day-heading" onClick={() => onSelectDate(dateKey)}><span>{label.weekday}</span><strong>{label.day}</strong><small>Dia em foco</small></button>
            <BoardStack stackKey={`${dateKey}-unscheduled`} items={unscheduledFor(dateKey)} expanded={expandedStacks.has(`${dateKey}-unscheduled`)} onToggle={toggleStack} drag={drag} moving={moving} movedRef={movedRef} onStart={startDrag} onMove={moveDrag} onEnd={endDrag} onOpen={onOpenPlan} emptyLabel="Sem horário" />
            <div className="planning-board-slots">
              {slots.map((slot) => {
                const slotItems = itemFor(dateKey, slot);
                const stackKey = `${dateKey}-${slot}`;
                return <div className={`planning-board-slot ${drag?.target?.dateKey === dateKey && drag.target.time === slot ? "drop-target" : ""}`} data-drop-date={dateKey} data-drop-time={slot} key={slot}><span className="planning-board-slot-label">{slot}</span><BoardStack stackKey={stackKey} items={slotItems} expanded={expandedStacks.has(stackKey)} onToggle={toggleStack} drag={drag} moving={moving} movedRef={movedRef} onStart={startDrag} onMove={moveDrag} onEnd={endDrag} onOpen={onOpenPlan} /></div>;
              })}
            </div>
          </section>;
        })()}
      </div>
      <div className="planning-board-status" role="status" aria-live="polite">{announcement || "Toque e segure um cartão para mover."}</div>
      {drag && <div className={`planning-board-ghost planning-board-tone-${drag.item.tone}`} style={{ transform: `translate3d(${drag.x + 14}px, ${drag.y + 14}px, 0) rotate(-2deg)` }} aria-hidden="true"><CalendarClock size={15} /><span>{drag.item.title}</span></div>}
    </section>
  );
}

function BoardStack({ stackKey, items, expanded, onToggle, drag, moving, movedRef, onStart, onMove, onEnd, onOpen, emptyLabel }: {
  stackKey: string;
  items: BoardItem[];
  expanded: boolean;
  onToggle: (key: string) => void;
  drag: DragState | null;
  moving: boolean;
  movedRef: React.MutableRefObject<boolean>;
  onStart: (event: React.PointerEvent<HTMLElement>, item: BoardItem) => void;
  onMove: (event: React.PointerEvent<HTMLElement>) => void;
  onEnd: (event: React.PointerEvent<HTMLElement>) => void;
  onOpen: (plan: LessonPlan) => void;
  emptyLabel?: string;
}) {
  if (!items.length) return emptyLabel ? <div className="planning-board-empty-lane" data-drop-date={stackKey.replace("-unscheduled", "")} data-drop-time=""><span>{emptyLabel}</span></div> : null;
  const visible = expanded ? items : items.slice(0, 1);
  return <div className={`planning-board-stack ${expanded ? "is-expanded" : ""} ${items.length > 1 ? "has-conflict" : ""}`} data-stack-count={items.length}>
    {visible.map((item) => <BoardCard key={item.id} item={item} drag={drag} moving={moving} movedRef={movedRef} onStart={onStart} onMove={onMove} onEnd={onEnd} onOpen={onOpen} />)}
    {items.length > 1 && <button className="planning-board-stack-toggle" onClick={() => onToggle(stackKey)} aria-expanded={expanded}>{expanded ? "Recolher" : `+${items.length - 1} ${items.length === 2 ? "item" : "itens"}`}</button>}
  </div>;
}

function BoardCard({ item, drag, moving, movedRef, onStart, onMove, onEnd, onOpen }: {
  item: BoardItem;
  drag: DragState | null;
  moving: boolean;
  movedRef: React.MutableRefObject<boolean>;
  onStart: (event: React.PointerEvent<HTMLElement>, item: BoardItem) => void;
  onMove: (event: React.PointerEvent<HTMLElement>) => void;
  onEnd: (event: React.PointerEvent<HTMLElement>) => void;
  onOpen: (plan: LessonPlan) => void;
}) {
  const active = drag?.item.id === item.id;
  return <article className={`planning-board-card planning-board-tone-${item.tone} ${active ? "is-dragging" : ""}`} role="button" tabIndex={0} aria-label={`${item.title}, ${item.meta}. Toque e segure para mover.`} onPointerDown={(event) => onStart(event, item)} onPointerMove={onMove} onPointerUp={onEnd} onPointerCancel={onEnd} onClick={() => { if (!movedRef.current) onOpenIfPlan(item, onOpen); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpenIfPlan(item, onOpen); } }} data-moving={moving || undefined}><span className="planning-board-card-time">{item.meta}</span><strong>{item.title}</strong><span className="planning-board-card-grip" aria-hidden="true"><GripVertical size={15} /></span></article>;
}

function onOpenIfPlan(item: BoardItem, onOpen: (plan: LessonPlan) => void) {
  if (item.kind === "plan") onOpen(item.source as LessonPlan);
}
