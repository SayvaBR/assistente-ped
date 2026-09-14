import { ArrowLeft, BookOpenCheck, CalendarDays, ChevronLeft, ChevronRight, FileText, House, LayoutGrid, LoaderCircle, Plus, Users } from 'lucide-react';
import * as React from 'react';
import type { LessonPlan } from '../../domain/models';
import type { TeachingActivity } from '../../domain/activities';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './planning-day-v2.css';

type PlanningDayV2Props = {
  className?: string;
  dateKey: string;
  plans: LessonPlan[];
  activities?: TeachingActivity[];
  loading?: boolean;
  error?: string;
  activityError?: string;
  offline?: boolean;
  onBack?: () => void;
  onRetry?: () => void;
  onDateChange?: (offset: number) => void;
  onViewChange?: (view: 'week' | 'month') => void;
  onOpenPlan?: (plan: LessonPlan) => void;
  onOpenActivity?: (activity: TeachingActivity) => void;
  onCreatePlan?: () => void;
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

const formatDate = (value: string) => new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
const formatTime = (value?: string) => value?.slice(0, 5) || '';

export type PlanningDayRow = { plan: LessonPlan; moment: LessonPlan['momentos'][number] | { titulo: string; descricao: string; horario: string }; time: string };

export function buildPlanningDayRows(plans: LessonPlan[]): PlanningDayRow[] {
  const moments = plans.flatMap((plan) => (plan.momentos || []).map((moment) => ({ plan, moment, time: formatTime(moment.horario || plan.horaInicio) }))).sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
  return moments.length ? moments : plans.filter((plan) => plan.horaInicio).map((plan) => ({ plan, moment: { titulo: plan.tituloTema || 'Plano de aula', descricao: plan.objetivoGeral || '', horario: plan.horaInicio }, time: formatTime(plan.horaInicio) }));
}

export function PlanningDayV2({ className = 'Sua turma', dateKey, plans, activities = [], loading = false, error = '', activityError = '', offline = false, onBack = () => undefined, onRetry = () => undefined, onDateChange = () => undefined, onViewChange = () => undefined, onOpenPlan = () => undefined, onOpenActivity = () => undefined, onCreatePlan = () => undefined, onTabChange = () => undefined, activeTab = 'planejamento' }: PlanningDayV2Props) {
  const visiblePlans = plans.filter((plan) => !plan.arquivadoEm);
  const visibleActivities = activities.filter((activity) => activity.status !== 'arquivada');
  const rows = buildPlanningDayRows(visiblePlans);
  return <main className="v2-root v2-planning-day" aria-labelledby="planning-day-v2-title"><div className="v2-screen v2-planning-day__screen">
    <header className="v2-planning-day__header"><button className="v2-planning-day__back v2-pressable" type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={25} strokeWidth={2.5} /></button><div><span className="v2-eyebrow">{className}</span><h1 id="planning-day-v2-title">Planejamento diário</h1></div><button className="v2-planning-day__calendar v2-pressable" type="button" onClick={() => onTabChange('planejamento')} aria-label="Abrir planejamento"><CalendarDays size={24} /></button></header>
    {offline && <div className="v2-planning-day__notice" role="status">Você está offline. Seus planos continuam disponíveis neste dispositivo.</div>}{error && <div className="v2-planning-day__notice is-error" role="alert"><span>{error}</span><button type="button" onClick={onRetry}>Tentar novamente</button></div>}{activityError && <div className="v2-planning-day__notice is-error" role="alert"><span>{activityError}</span><button type="button" onClick={onRetry}>Tentar novamente</button></div>}
    <div className="v2-planning-day__tabs" role="tablist" aria-label="Visão do planejamento"><button className="is-selected" role="tab" aria-selected="true" type="button">Dia</button><button role="tab" aria-selected="false" type="button" onClick={() => onViewChange('week')}>Semana</button><button role="tab" aria-selected="false" type="button" onClick={() => onViewChange('month')}>Mês</button></div>
    <div className="v2-planning-day__date-nav"><button className="v2-planning-day__date-arrow v2-pressable" type="button" onClick={() => onDateChange(-1)} aria-label="Dia anterior"><ChevronLeft size={22} /></button><div><strong>{formatDate(dateKey)}</strong><small>{rows.length ? `${rows.length} momento${rows.length === 1 ? '' : 's'} planejado${rows.length === 1 ? '' : 's'}` : 'Um dia de cada vez, com intenção'}</small></div><button className="v2-planning-day__date-arrow v2-pressable" type="button" onClick={() => onDateChange(1)} aria-label="Próximo dia"><ChevronRight size={22} /></button></div>
    {loading ? <div className="v2-planning-day__state" role="status"><LoaderCircle className="is-spinning" size={25} /><strong>Carregando planejamento...</strong><p>Buscando os planos salvos para este dia.</p></div> : rows.length ? <section className="v2-planning-day__timeline" aria-label="Momentos planejados">{rows.map(({ plan, moment, time }) => <div className="v2-planning-day__timeline-row" key={`${plan.id}-${('id' in moment ? moment.id : '') || moment.titulo}`}><div className="v2-planning-day__hour"><time>{time}</time><span /></div><button className="v2-planning-day__plan v2-pressable" type="button" onClick={() => onOpenPlan(plan)}><span className="v2-planning-day__plan-icon"><BookOpenCheck size={22} /></span><span><strong>{moment.titulo || plan.tituloTema || 'Plano de aula'}</strong><small>{plan.tituloTema || 'Plano de aula'}{moment.descricao ? ` · ${moment.descricao}` : ''}</small></span><ChevronRight size={22} /></button></div>)}</section> : <div className="v2-planning-day__state"><BookOpenCheck size={34} /><strong>Nenhum plano neste dia</strong><p>Comece organizando o próximo momento da sua aula.</p><button className="v2-primary-action v2-pressable" type="button" onClick={onCreatePlan}><Plus size={19} /> Criar plano de aula</button></div>}
    {rows.length > 0 && <button className="v2-planning-day__add v2-pressable" type="button" onClick={onCreatePlan}><Plus size={19} /> Criar outro plano neste dia</button>}
    {visibleActivities.length > 0 && <section className="v2-planning-day__activities" aria-labelledby="planning-day-activities-title"><div className="v2-planning-day__activities-heading"><div><span className="v2-eyebrow">PREPARO</span><h2 id="planning-day-activities-title">Atividades para levar</h2></div><span>{visibleActivities.length}</span></div>{visibleActivities.map((activity) => <button className="v2-planning-day__activity v2-pressable" type="button" key={activity.id} onClick={() => onOpenActivity(activity)}><span className="v2-planning-day__plan-icon"><BookOpenCheck size={20} /></span><span><strong>{activity.titulo}</strong><small>{activity.disciplina || 'Atividade pedagógica'} · {activity.status === 'pronta' ? 'Pronta' : 'Rascunho'}</small></span><ChevronRight size={21} /></button>)}</section>}
    <nav className="v2-planning-day__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => { const selected = id === activeTab; return <button key={id} type="button" className={`v2-planning-day__nav-item v2-pressable${selected ? ' is-selected' : ''}`} aria-current={selected ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} strokeWidth={selected ? 2.8 : 2.2} /><span>{label}</span></button>; })}</nav>
  </div></main>;
}
