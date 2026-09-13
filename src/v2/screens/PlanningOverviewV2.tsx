import { ArrowLeft, BookOpenCheck, CalendarDays, ChevronRight, FileText, House, LayoutGrid, LoaderCircle, Plus, Users } from 'lucide-react';
import * as React from 'react';
import type { LessonPlan } from '../../domain/models';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './planning-overview-v2.css';

type Props = {
  className?: string;
  plans: LessonPlan[];
  loading?: boolean;
  error?: string;
  offline?: boolean;
  onBack?: () => void;
  onRetry?: () => void;
  onOpenPlan?: (plan: LessonPlan) => void;
  onCreatePlan?: () => void;
  onViewChange?: (view: 'day' | 'week' | 'month') => void;
  onTabChange?: (tab: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais') => void;
};

const navItems = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'planejamento', label: 'Planejamento', icon: BookOpenCheck },
  { id: 'turmas', label: 'Turmas', icon: Users },
  { id: 'arquivos', label: 'Arquivos', icon: FileText },
  { id: 'mais', label: 'Mais', icon: LayoutGrid },
] as const;

const keyOf = (value: string) => new Date(`${value}T12:00:00`).getTime();
const dateLabel = (value: string) => new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
const shortDate = (value: string) => new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');

function statusLabel(plan: LessonPlan) {
  if (plan.arquivadoEm) return 'Arquivado';
  if (plan.status === 'concluido') return 'Concluído';
  return 'Rascunho';
}

export function PlanningOverviewV2({ className = 'Sua turma', plans, loading = false, error = '', offline = false, onBack = () => undefined, onRetry = () => undefined, onOpenPlan = () => undefined, onCreatePlan = () => undefined, onViewChange = () => undefined, onTabChange = () => undefined }: Props) {
  const activePlans = React.useMemo(() => plans.filter((plan) => !plan.arquivadoEm).sort((a, b) => keyOf(a.dataKey) - keyOf(b.dataKey) || (a.horaInicio || '99:99').localeCompare(b.horaInicio || '99:99')), [plans]);
  const nextPlan = activePlans[0];
  const drafts = activePlans.filter((plan) => plan.status !== 'concluido').length;
  const plannedMoments = activePlans.reduce((total, plan) => total + (plan.momentos?.length || 0), 0);

  return <main className="v2-root v2-planning-overview" aria-labelledby="planning-overview-v2-title">
    <div className="v2-screen v2-planning-overview__screen">
      <header className="v2-planning-overview__header"><button className="v2-planning-overview__back v2-pressable" type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={25} strokeWidth={2.5} /></button><div><span className="v2-eyebrow">{className}</span><h1 id="planning-overview-v2-title">Planejamento</h1><p>Um lugar claro para preparar a próxima aula.</p></div><button className="v2-planning-overview__add v2-pressable" type="button" onClick={onCreatePlan} aria-label="Criar novo plano"><Plus size={27} strokeWidth={2.5} /></button></header>
      {offline && <div className="v2-planning-overview__notice" role="status">Você está offline. Seus planos continuam disponíveis neste dispositivo.</div>}
      {error && <div className="v2-planning-overview__notice is-error" role="alert"><span>{error}</span><button type="button" onClick={onRetry}>Tentar novamente</button></div>}
      <div className="v2-planning-overview__tabs" role="tablist" aria-label="Visão do planejamento"><button className="is-selected" type="button" role="tab" aria-selected="true">Visão geral</button><button type="button" role="tab" aria-selected="false" onClick={() => onViewChange('day')}>Dia</button><button type="button" role="tab" aria-selected="false" onClick={() => onViewChange('week')}>Semana</button><button type="button" role="tab" aria-selected="false" onClick={() => onViewChange('month')}>Mês</button></div>
      <section className="v2-planning-overview__summary" aria-label="Resumo do planejamento"><div><strong>{activePlans.length}</strong><span>planos ativos</span></div><div><strong>{plannedMoments}</strong><span>momentos</span></div><div><strong>{drafts}</strong><span>para revisar</span></div></section>
      {loading ? <div className="v2-planning-overview__state" role="status"><LoaderCircle className="is-spinning" size={28} /><strong>Carregando seus planos...</strong><p>Buscando o planejamento salvo nesta turma.</p></div> : nextPlan ? <section className="v2-planning-overview__focus" aria-labelledby="planning-overview-focus-title"><div className="v2-planning-overview__focus-top"><span className="v2-eyebrow">PRÓXIMO NO RITMO</span><span className="v2-planning-overview__focus-date">{shortDate(nextPlan.dataKey)}</span></div><h2 id="planning-overview-focus-title">{nextPlan.tituloTema || 'Plano sem título'}</h2><p>{nextPlan.objetivoGeral || 'Defina o objetivo geral e prepare os momentos desta aula.'}</p><div className="v2-planning-overview__focus-meta"><span><CalendarDays size={18} />{dateLabel(nextPlan.dataKey)}</span><span><BookOpenCheck size={18} />{nextPlan.momentos?.length || 0} momento{nextPlan.momentos?.length === 1 ? '' : 's'}</span></div><button className="v2-planning-overview__focus-action v2-pressable" type="button" onClick={() => onOpenPlan(nextPlan)}>Abrir plano <ChevronRight size={22} /></button></section> : <section className="v2-planning-overview__empty" aria-labelledby="planning-overview-empty-title"><CalendarDays size={34} aria-hidden="true" /><h2 id="planning-overview-empty-title">Seu próximo encontro começa aqui</h2><p>Crie um plano para guardar objetivos, momentos e habilidades BNCC.</p><button className="v2-primary-action v2-pressable" type="button" onClick={onCreatePlan}><Plus size={19} /> Criar plano de aula</button></section>}
      <section className="v2-planning-overview__upcoming" aria-labelledby="planning-overview-upcoming-title"><div className="v2-planning-overview__section-heading"><div><span className="v2-eyebrow">CONTINUIDADE</span><h2 id="planning-overview-upcoming-title">O que vem depois</h2></div><button type="button" onClick={() => onViewChange('week')}>Ver semana <ChevronRight size={18} /></button></div>{activePlans.length > 1 ? activePlans.slice(1, 4).map((plan) => <button className="v2-planning-overview__plan-row v2-pressable" type="button" key={plan.id} onClick={() => onOpenPlan(plan)}><time>{plan.horaInicio || '—'}</time><span className="v2-planning-overview__plan-mark"><BookOpenCheck size={20} /></span><span className="v2-planning-overview__plan-copy"><strong>{plan.tituloTema || 'Plano sem título'}</strong><small>{dateLabel(plan.dataKey)} · {statusLabel(plan)}</small></span><ChevronRight size={21} /></button>) : <p className="v2-planning-overview__quiet">Ainda não há outro plano na sequência. Você pode criar o próximo quando quiser.</p>}</section>
      <button className="v2-planning-overview__quick-add v2-pressable" type="button" onClick={onCreatePlan}><Plus size={19} /> Preparar outro plano</button>
      <nav className="v2-planning-overview__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-planning-overview__nav-item v2-pressable${id === 'planejamento' ? ' is-selected' : ''}`} aria-current={id === 'planejamento' ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} strokeWidth={id === 'planejamento' ? 2.8 : 2.2} /><span>{label}</span></button>)}</nav>
    </div>
  </main>;
}
