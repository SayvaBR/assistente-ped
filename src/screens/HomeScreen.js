import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  FileText,
  FolderOpen,
  GraduationCap,
  ListChecks,
  Plus,
  RefreshCw,
  Timer,
  Users,
  WifiOff,
  X,
} from "lucide-react";
import { Capacitor } from "@capacitor/core";
import {
  Avatar,
  Card,
  EmptyState,
  IconTile,
  ScreenHeader,
  S0,
  colors,
  h0,
  jp,
  storage,
  tp,
} from "../core/recovered.js";
import { Ss } from "../data/files.js";
import { Cp, Xf } from "../data/agenda-camera.js";
import { Mh } from "../data/notifications.js";

const e = React.createElement;
const touchButtonStyle = {
  minHeight: 44,
  minWidth: 44,
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  touchAction: "manipulation",
};

function todayTime(now) {
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function startOfWeek(value) {
  const result = new Date(value);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function formatDate(value, options = { day: "2-digit", month: "short" }) {
  if (!value) return "";
  const parsed = value instanceof Date ? value : new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toLocaleDateString("pt-BR", options);
}

function formatDateTime(value) {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? ""
    : parsed.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function eventKindLabel(kind) {
  return { reuniao: "Reunião", evento: "Evento", feriado: "Feriado", tarefa: "Tarefa", lembrete: "Lembrete" }[kind] || "Compromisso";
}

function activityMeta(key, value) {
  const suffix = key.split(":").slice(2).join(":");
  if (suffix === "alunos") {
    const count = Array.isArray(value) ? value.filter(Boolean).length : 0;
    return { title: count ? `${count} aluno${count === 1 ? "" : "s"} na turma` : "Turma atualizada", label: "Turma", route: "turma", time: null };
  }
  if (suffix.startsWith("planejamento:")) {
    const plans = Array.isArray(value) ? value.filter(Boolean) : [];
    const plan = [...plans].sort((a, b) => String(b.atualizadoEm || b.criadoEm || "").localeCompare(String(a.atualizadoEm || a.criadoEm || "")))[0];
    return { title: plan?.tituloTema || "Planejamento atualizado", label: "Planejamento", route: "plano", time: plan?.atualizadoEm || plan?.criadoEm || `${suffix.slice(14)}T12:00:00` };
  }
  if (suffix.startsWith("chamada:")) {
    return value && typeof value === "object" && Object.keys(value).length ? { title: "Frequência registrada", label: "Chamada", route: "chamada", time: `${suffix.slice(8)}T12:00:00` } : null;
  }
  if (suffix.startsWith("diario:")) {
    return value && typeof value === "object" ? { title: "Diário atualizado", label: "Diário", route: "registro-rapido", time: value.atualizadoEm || `${suffix.slice(7)}T12:00:00` } : null;
  }
  if (suffix.startsWith("ocorrencias:")) {
    const count = Array.isArray(value) ? value.length : 0;
    return count ? { title: `${count} registro${count === 1 ? "" : "s"} pedagógico${count === 1 ? "" : "s"}`, label: "Registros", route: "registro-rapido", time: value[0]?.criadoEm || `${suffix.slice(12)}T12:00:00` } : null;
  }
  if (suffix.startsWith("rotina:")) {
    const count = value && typeof value === "object" ? Object.keys(value).length : 0;
    return count ? { title: "Rotina da turma atualizada", label: "Rotina", route: "registro-rapido", time: `${suffix.slice(7)}T12:00:00` } : null;
  }
  return null;
}

async function loadRecentActivity(turmaId) {
  if (!turmaId) return [];
  const prefix = `turma:${turmaId}:`;
  const listed = await storage.list(prefix);
  const records = [];
  for (const key of listed?.keys || []) {
    try {
      const value = JSON.parse((await storage.get(key)).value);
      const item = activityMeta(key, value);
      if (item) records.push({ ...item, id: key });
    } catch {
      // Chaves antigas ou corrompidas não devem impedir o painel de abrir.
    }
  }
  return records.sort((a, b) => String(b.time || "").localeCompare(String(a.time || ""))).slice(0, 4);
}

function SectionHeader({ title, count, actionLabel, onAction }) {
  return e("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 } },
    e("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } },
      e("h2", { style: { margin: 0, fontSize: 17, lineHeight: 1.25, color: colors.dark, fontWeight: 800 } }, title),
      count > 0 && e("span", { style: { minWidth: 24, height: 24, padding: "0 7px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 99, background: colors.primaryLight, color: colors.primaryDark, fontSize: 12, fontWeight: 800 } }, count),
    ),
    actionLabel && e("button", { type: "button", className: "press-fx touch-target", onClick: onAction, style: { ...touchButtonStyle, minHeight: 40, padding: "0 8px", color: colors.primaryDark, background: "transparent", fontSize: 13, fontWeight: 800 } }, actionLabel),
  );
}

function InlineStatus({ tone = "info", children, onRetry }) {
  const palette = { info: { bg: colors.primaryLight, fg: colors.primaryDark, Icon: AlertTriangle }, error: { bg: `${colors.red}16`, fg: colors.red, Icon: AlertTriangle }, offline: { bg: `${colors.orange}18`, fg: colors.orange, Icon: WifiOff } }[tone];
  return e("div", { role: tone === "error" ? "alert" : "status", style: { display: "flex", alignItems: "center", gap: 9, padding: "11px 12px", borderRadius: 14, background: palette.bg, color: palette.fg, fontSize: 13, fontWeight: 700 } },
    e(palette.Icon, { size: 18, "aria-hidden": "true", strokeWidth: 2.2 }),
    e("span", { style: { flex: 1, minWidth: 0 } }, children),
    onRetry && e("button", { type: "button", onClick: onRetry, className: "press-fx touch-target", style: { ...touchButtonStyle, minHeight: 36, minWidth: 36, background: "transparent", color: palette.fg }, "aria-label": "Tentar carregar novamente" }, e(RefreshCw, { size: 17, "aria-hidden": "true" })),
  );
}

function Shortcut({ Icon, label, description, onClick, disabled = false }) {
  return e("button", { type: "button", className: "home-shortcut press-fx", onClick, disabled, style: { minHeight: 72, display: "flex", alignItems: "center", gap: 10, padding: 12, textAlign: "left", border: `1px solid ${colors.border}`, borderRadius: 16, background: colors.white, color: colors.dark, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.55 : 1, touchAction: "manipulation" } },
    e(IconTile, { color: colors.primary, Icon, size: 36 }),
    e("span", { style: { display: "flex", flexDirection: "column", minWidth: 0, gap: 1 } },
      e("strong", { style: { fontSize: 14, lineHeight: 1.25 } }, label),
      description && e("span", { style: { color: colors.gray, fontSize: 12, lineHeight: 1.25, overflowWrap: "anywhere" } }, description),
    ),
  );
}

function ConfirmDialog({ event, onCancel, onConfirm }) {
  if (!event) return null;
  const nextAction = event.concluido ? "reabrir" : "concluir";
  return e("div", { className: "modal-overlay", role: "presentation", onClick: onCancel, style: { position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: 20, background: "rgba(19, 78, 74, 0.36)" } },
    e("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "home-confirm-title", onClick: (eventClick) => eventClick.stopPropagation(), style: { width: "min(100%, 390px)", padding: 20, borderRadius: 22, background: colors.white, boxShadow: "0 18px 50px rgba(19,78,74,0.24)" } },
      e("div", { style: { display: "flex", justifyContent: "space-between", gap: 16 } },
        e("div", null,
          e("h2", { id: "home-confirm-title", style: { margin: 0, fontSize: 19, color: colors.dark } }, nextAction === "concluir" ? "Concluir compromisso?" : "Reabrir compromisso?"),
          e("p", { style: { margin: "8px 0 0", color: colors.gray, fontSize: 14 } }, event.titulo),
        ),
        e("button", { type: "button", className: "press-fx touch-target", onClick: onCancel, "aria-label": "Fechar confirmação", style: { ...touchButtonStyle, minHeight: 40, minWidth: 40, background: colors.primaryLight, color: colors.primaryDark } }, e(X, { size: 18, "aria-hidden": "true" })),
      ),
      e("div", { style: { display: "flex", gap: 8, marginTop: 20 } },
        e("button", { type: "button", className: "secondary-button press-fx", onClick: onCancel, style: { minHeight: 48, flex: 1 } }, "Cancelar"),
        e("button", { type: "button", className: "ui-button ui-button-primary press-fx", onClick: onConfirm, style: { minHeight: 48, flex: 1 } }, nextAction === "concluir" ? "Concluir" : "Reabrir"),
      ),
    ),
  );
}

function HomeScreen({ perfil, planosDeHoje = [], mudarAba, abrirTela, turma, alunos = [], frequenciaHoje = {} }) {
  const now = new Date();
  const [agendaState, setAgendaState] = useState({ status: "loading", items: [], error: "" });
  const [reminderState, setReminderState] = useState({ status: "loading", items: [], error: "" });
  const [recentState, setRecentState] = useState({ status: "loading", items: [], error: "" });
  const [isOnline, setIsOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine !== false);
  const [confirmEvent, setConfirmEvent] = useState(null);
  const [actionState, setActionState] = useState({ saving: false, message: "", error: "" });

  const loadDashboard = async () => {
    if (!turma?.id) {
      setAgendaState({ status: "empty", items: [], error: "" });
      setReminderState({ status: "empty", items: [], error: "" });
      setRecentState({ status: "empty", items: [], error: "" });
      return;
    }
    setAgendaState((state) => ({ ...state, status: "loading", error: "" }));
    setReminderState((state) => ({ ...state, status: "loading", error: "" }));
    setRecentState((state) => ({ ...state, status: "loading", error: "" }));
    const [agendaResult, reminderResult, recentResult] = await Promise.allSettled([Cp(storage, turma.id), Mh(), loadRecentActivity(turma.id)]);
    if (agendaResult.status === "fulfilled") setAgendaState({ status: agendaResult.value.length ? "ready" : "empty", items: agendaResult.value, error: "" });
    else setAgendaState({ status: "error", items: [], error: "Não foi possível carregar a agenda da turma." });
    if (reminderResult.status === "fulfilled") {
      const items = reminderResult.value || [];
      setReminderState({ status: items.length ? "ready" : "empty", items, error: "" });
    } else setReminderState({ status: "error", items: [], error: "Não foi possível consultar os lembretes locais." });
    if (recentResult.status === "fulfilled") {
      const items = recentResult.value || [];
      setRecentState({ status: items.length ? "ready" : "empty", items, error: "" });
    } else setRecentState({ status: "error", items: [], error: "Não foi possível consultar a atividade recente." });
  };

  useEffect(() => { loadDashboard(); }, [turma?.id]);
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const updateOnline = () => setIsOnline(navigator.onLine !== false);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => { window.removeEventListener("online", updateOnline); window.removeEventListener("offline", updateOnline); };
  }, []);
  useEffect(() => {
    if (!confirmEvent || typeof window === "undefined") return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setConfirmEvent(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmEvent]);

  const attendancePresent = alunos.filter((student) => ["presente", "atrasado", "saida_antecipada"].includes(frequenciaHoje[student.id])).length;
  const attendanceAbsent = alunos.filter((student) => frequenciaHoje[student.id] === "falta").length;
  const attendanceMarked = alunos.length > 0 && attendancePresent + attendanceAbsent === alunos.length;
  const moments = useMemo(() => h0(planosDeHoje || []), [planosDeHoje]);
  const nextMoment = moments.find((moment) => (moment.horario || "") >= todayTime(now)) || moments[moments.length - 1];
  const plans = (planosDeHoje || []).filter((plan) => plan && plan.status !== "arquivado");
  const weekEvents = useMemo(() => {
    const start = startOfWeek(now);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return agendaState.items.filter((item) => { const date = new Date(`${item.data}T12:00:00`); return date >= start && date < end; }).sort((a, b) => `${a.data}${a.hora || ""}`.localeCompare(`${b.data}${b.hora || ""}`));
  }, [agendaState.items]);
  const hasAnyContent = plans.length || weekEvents.length || alunos.length || reminderState.items.length || recentState.items.length;

  const showMessage = (message, error = "") => {
    setActionState({ saving: false, message, error });
    if (message && typeof window !== "undefined") window.setTimeout(() => setActionState((state) => state.message === message ? { ...state, message: "" } : state), 3000);
  };
  const toggleAgendaEvent = async () => {
    if (!confirmEvent || !turma?.id) return;
    const target = confirmEvent;
    setActionState({ saving: true, message: "", error: "" });
    try {
      const nextItems = agendaState.items.map((item) => item.id === target.id ? { ...item, concluido: !item.concluido, atualizadoEm: new Date().toISOString() } : item);
      const saved = await Xf(storage, turma.id, nextItems);
      setAgendaState({ status: saved.length ? "ready" : "empty", items: saved, error: "" });
      setConfirmEvent(null);
      showMessage(target.concluido ? "Compromisso reaberto." : "Compromisso concluído.");
    } catch (error) {
      setConfirmEvent(null);
      showMessage("", error?.message || "Não foi possível salvar a alteração.");
    }
  };
  const goToAttendance = () => alunos.length ? abrirTela("chamada") : abrirTela("novo-aluno");
  const goToRecord = () => alunos.length ? abrirTela("registro-rapido") : abrirTela("novo-aluno");
  const profilePhoto = typeof perfil?.foto === "string" ? perfil.foto : Ss(perfil?.foto, { convertFileSrc: Capacitor.convertFileSrc });
  const profileName = typeof perfil?.nome === "string" ? perfil.nome.trim() : "";
  const greeting = profileName.length > 2 ? S0(perfil, now) : "Boa noite";

  return e("div", { className: "home-screen", style: { minHeight: "100%", paddingBottom: 112 } },
    e(ScreenHeader, { title: greeting, subtitle: jp(now), action: e("button", { type: "button", className: "press-fx touch-target", "aria-label": "Editar meu perfil", onClick: () => abrirTela("perfil-professor"), style: { ...touchButtonStyle, borderRadius: "50%", padding: 0, background: "transparent" } }, e(Avatar, { nome: perfil?.nome || "Docente", cor: colors.primary, foto: profilePhoto, size: 44 })) }),
    e("main", { className: "home-content", style: { padding: "0 16px", display: "flex", flexDirection: "column", gap: 18, maxWidth: 760, margin: "0 auto" } },
      !isOnline && e(InlineStatus, { tone: "offline" }, "Você está offline. Seus dados locais continuam disponíveis."),
      actionState.message && e("div", { role: "status", "aria-live": "polite", style: { color: colors.green, fontSize: 14, fontWeight: 800 } }, e(CheckCircle2, { size: 16, style: { verticalAlign: "-3px", marginRight: 6 }, "aria-hidden": "true" }), actionState.message),
      actionState.error && e(InlineStatus, { tone: "error" }, actionState.error),
      e(Card, { className: "home-class-card", onClick: () => mudarAba("turma"), style: { padding: 14, display: "flex", alignItems: "center", gap: 12 } }, e(IconTile, { color: colors.primary, Icon: Users, size: 42 }), e("div", { style: { flex: 1, minWidth: 0 } }, e("div", { style: { fontSize: 17, fontWeight: 800, color: colors.dark, overflowWrap: "anywhere" } }, turma?.nome || "Configure sua primeira turma"), e("div", { style: { marginTop: 3, fontSize: 14, color: colors.gray } }, turma?.nivel || "Adicione uma turma para começar", turma && ` · ${alunos.length} aluno${alunos.length === 1 ? "" : "s"}`)), e(ChevronRight, { size: 20, color: colors.gray, "aria-hidden": "true" })),
      !turma?.id && e(EmptyState, { icon: GraduationCap, title: "Seu espaço começa aqui", description: "Configure seu perfil e uma turma para acompanhar aulas, alunos e frequência.", actionLabel: "Gerenciar turmas", onAction: () => abrirTela("gerenciar-turmas") }),
      turma?.id && e("section", { "aria-labelledby": "home-attendance-title" }, e(SectionHeader, { title: "Frequência de hoje", count: alunos.length, actionLabel: alunos.length ? "Abrir chamada" : null, onAction: goToAttendance }), e(Card, { className: "home-attendance-card", onClick: goToAttendance, style: { display: "flex", alignItems: "center", gap: 12, padding: 14 } }, e(IconTile, { color: attendanceMarked ? colors.green : colors.orange, Icon: ClipboardCheck, size: 42 }), e("div", { style: { flex: 1, minWidth: 0 } }, e("h3", { id: "home-attendance-title", style: { margin: 0, fontSize: 16, color: colors.dark } }, attendanceMarked ? "Chamada concluída" : "Chamada pendente"), e("p", { style: { margin: "3px 0 0", fontSize: 14, color: colors.gray } }, alunos.length ? `${attendancePresent} presente${attendancePresent === 1 ? "" : "s"} · ${attendanceAbsent} falta${attendanceAbsent === 1 ? "" : "s"}` : "Cadastre alunos para registrar a frequência")), e("span", { style: { color: attendanceMarked ? colors.green : colors.primaryDark, fontSize: 13, fontWeight: 800, whiteSpace: "nowrap" } }, alunos.length ? (attendanceMarked ? "Concluída" : "Fazer chamada") : "Começar"))),
      e("section", { "aria-labelledby": "home-focus-title" }, e(SectionHeader, { title: "Agora", actionLabel: plans.length ? "Ver planejamento" : null, onAction: () => mudarAba("plano") }), nextMoment ? e(Card, { className: "home-focus-card", onClick: () => mudarAba("plano"), style: { padding: 16, border: `1px solid ${colors.border}` } }, e("div", { style: { display: "flex", alignItems: "center", gap: 8, color: colors.primaryDark, fontSize: 12, fontWeight: 800, letterSpacing: 0.4 } }, e(BookOpen, { size: 17, "aria-hidden": "true" }), nextMoment.horario || "PLANO DE HOJE"), e("h3", { id: "home-focus-title", style: { margin: "8px 0 0", color: colors.dark, fontSize: 18 } }, nextMoment.titulo || nextMoment.planoTitulo || "Atividade planejada"), nextMoment.descricao && e("p", { style: { margin: "5px 0 0", color: colors.gray, fontSize: 14 } }, nextMoment.descricao)) : plans.length ? e(Card, { onClick: () => mudarAba("plano"), style: { padding: 14, color: colors.gray, fontSize: 14 } }, `${plans.length} plano${plans.length === 1 ? "" : "s"} disponível${plans.length === 1 ? "" : "eis"} hoje.`) : e(EmptyState, { compact: true, icon: CalendarDays, title: "Seu dia ainda está livre", description: "Crie um plano para organizar atividades e objetivos.", actionLabel: "Criar primeiro plano", onAction: () => mudarAba("plano") })),
      e("section", { "aria-labelledby": "home-week-title" }, e(SectionHeader, { title: "Agenda desta semana", count: weekEvents.length, actionLabel: "Abrir planejamento", onAction: () => mudarAba("plano") }), agendaState.status === "loading" && e(Card, { style: { color: colors.gray, fontSize: 14 } }, "Carregando agenda…"), agendaState.status === "error" && e(InlineStatus, { tone: "error", onRetry: loadDashboard }, agendaState.error), agendaState.status === "empty" && e(Card, { style: { padding: 14, color: colors.gray, fontSize: 14 } }, "Nenhum compromisso salvo para esta semana."), weekEvents.length > 0 && e(Card, { style: { padding: 10 } }, weekEvents.map((item) => e("div", { key: item.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${colors.border}66` } }, e("div", { style: { width: 52, flexShrink: 0, color: colors.gray, fontSize: 12, fontWeight: 800 } }, formatDate(item.data), item.hora && e("span", { style: { display: "block", color: colors.primaryDark } }, item.hora)), e("div", { style: { flex: 1, minWidth: 0 } }, e("strong", { style: { display: "block", color: item.concluido ? colors.gray : colors.dark, textDecoration: item.concluido ? "line-through" : "none", overflowWrap: "anywhere" } }, item.titulo), e("span", { style: { color: colors.gray, fontSize: 12 } }, eventKindLabel(item.tipo))), e("button", { type: "button", className: "press-fx touch-target", onClick: () => setConfirmEvent(item), "aria-label": `${item.concluido ? "Reabrir" : "Concluir"} ${item.titulo}`, style: { ...touchButtonStyle, background: item.concluido ? `${colors.green}18` : colors.primaryLight, color: item.concluido ? colors.green : colors.primaryDark } }, e(item.concluido ? CheckCircle2 : Check, { size: 18, "aria-hidden": "true" }))))))),
      e("section", { className: "home-plans-section", "aria-labelledby": "home-plans-title" }, e(SectionHeader, { title: "Planos de hoje", count: plans.length, actionLabel: "Ver todos", onAction: () => mudarAba("plano") }), plans.length ? e(Card, { style: { padding: 10 } }, plans.slice(0, 4).map((plan, index) => { const moment = h0([plan])[0]; const meta = tp[moment?.tipo || "acolhida"] || tp.acolhida; return e("div", { key: plan.id || index, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: index < Math.min(plans.length, 4) - 1 ? `1px solid ${colors.border}66` : "none" } }, e("div", { style: { width: 10, height: 10, flexShrink: 0, borderRadius: "50%", background: meta.color } }), e("div", { style: { flex: 1, minWidth: 0 } }, e("strong", { style: { display: "block", color: colors.dark, overflowWrap: "anywhere" } }, plan.tituloTema || "Plano sem título"), e("span", { style: { color: colors.gray, fontSize: 12 } }, moment?.horario || (plan.status === "rascunho" ? "Rascunho" : "Planejado"))), e("span", { style: { color: colors.primaryDark, fontSize: 12, fontWeight: 800 } }, plan.status === "concluido" ? "Concluído" : "Abrir")); })) : e(Card, { style: { padding: 14, color: colors.gray, fontSize: 14 } }, "Nenhum planejamento criado para hoje.")),
      reminderState.status === "error" && e(InlineStatus, { tone: "error", onRetry: loadDashboard }, reminderState.error), reminderState.items.length > 0 && e("section", { "aria-labelledby": "home-reminders-title" }, e(SectionHeader, { title: "Lembretes pendentes", count: reminderState.items.length, actionLabel: "Gerenciar", onAction: () => abrirTela("notificacoes") }), e(Card, { style: { padding: 10 } }, reminderState.items.slice(0, 3).map((item) => e("div", { key: item.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 4px" } }, e(IconTile, { color: colors.orange, Icon: Bell, size: 34 }), e("div", { style: { flex: 1, minWidth: 0 } }, e("strong", { id: "home-reminders-title", style: { display: "block", color: colors.dark, overflowWrap: "anywhere" } }, item.title || "Lembrete"), e("span", { style: { color: colors.gray, fontSize: 12 } }, item.schedule?.at ? formatDateTime(item.schedule.at) : "Horário programado")), e(ChevronRight, { size: 18, color: colors.gray, "aria-hidden": "true" }))))),
      recentState.status === "error" && e(InlineStatus, { tone: "error", onRetry: loadDashboard }, recentState.error), recentState.items.length > 0 && e("section", { "aria-labelledby": "home-recent-title" }, e(SectionHeader, { title: "Atividade recente", count: recentState.items.length }), e(Card, { style: { padding: 10 } }, recentState.items.map((item) => e("button", { key: item.id, type: "button", className: "press-fx", onClick: () => item.route === "turma" || item.route === "plano" ? mudarAba(item.route) : abrirTela(item.route), style: { display: "flex", width: "100%", alignItems: "center", gap: 10, padding: "9px 4px", textAlign: "left", border: "none", borderBottom: `1px solid ${colors.border}66`, background: "transparent", color: colors.dark, cursor: "pointer", touchAction: "manipulation" } }, e(IconTile, { color: colors.primary, Icon: item.route === "chamada" ? ClipboardCheck : item.route === "plano" ? ClipboardList : FileText, size: 34 }), e("span", { style: { flex: 1, minWidth: 0 } }, e("strong", { id: "home-recent-title", style: { display: "block", overflowWrap: "anywhere" } }, item.title), e("span", { style: { display: "block", color: colors.gray, fontSize: 12 } }, `${item.label} · ${formatDateTime(item.time)}`)), e(ChevronRight, { size: 18, color: colors.gray, "aria-hidden": "true" }))))),
      !hasAnyContent && turma?.id && e(EmptyState, { icon: ListChecks, title: "Tudo pronto para começar", description: "Use um atalho abaixo quando tiver uma aula, chamada ou registro para fazer." }),
      e("section", { "aria-labelledby": "home-shortcuts-title" }, e(SectionHeader, { title: "Atalhos" }), e("h2", { id: "home-shortcuts-title", style: { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 } }, "Atalhos"), e("div", { className: "home-shortcut-grid", style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 } }, e(Shortcut, { Icon: Plus, label: "Criar registro", description: alunos.length ? "Observação rápida" : "Primeiro aluno", onClick: goToRecord }), e(Shortcut, { Icon: ClipboardCheck, label: "Abrir chamada", description: alunos.length ? "Frequência de hoje" : "Cadastre alunos", onClick: goToAttendance }), e(Shortcut, { Icon: CalendarDays, label: "Planejamento", description: "Aulas e agenda", onClick: () => mudarAba("plano") }), e(Shortcut, { Icon: FolderOpen, label: "Arquivos", description: "Biblioteca pedagógica", onClick: () => abrirTela("biblioteca") }), e(Shortcut, { Icon: Users, label: "Turma", description: "Alunos e registros", onClick: () => mudarAba("turma") }), e(Shortcut, { Icon: BarChart3, label: "Relatórios", description: "Acompanhar evolução", onClick: () => abrirTela("relatorios") }), e(Shortcut, { Icon: Timer, label: "Ferramentas", description: "Cronômetro e apoio", onClick: () => abrirTela("ferramentas") }), e(Shortcut, { Icon: Bell, label: "Lembretes", description: "Notificações locais", onClick: () => abrirTela("notificacoes") })),
    ),
    e(ConfirmDialog, { event: confirmEvent, onCancel: () => setConfirmEvent(null), onConfirm: toggleAgendaEvent }),
  );
}

export { HomeScreen };
