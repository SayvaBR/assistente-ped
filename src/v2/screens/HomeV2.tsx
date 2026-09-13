import {
  BookOpenCheck,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  FileText,
  House,
  LayoutGrid,
  Sigma,
  Users,
  UserCheck,
} from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './home-v2.css';

export type HomeV2Data = {
  teacherName: string;
  dateLabel: string;
  classLabel: string;
  classMeta: string;
  lesson: {
    status: string;
    subject: string;
    theme: string;
    detail: string;
    schedule: string;
    room: string;
    code: string;
  } | null;
  agenda: Array<{
    time: string;
    title: string;
    detail: string;
    tone: 'primary' | 'warning' | 'success' | 'neutral';
  }>;
  pendingCount: number;
};

type HomeAction = 'attendance' | 'plan' | 'observation' | 'commitments';

type HomeV2Props = {
  data: HomeV2Data;
  activeTab?: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais';
  onAction?: (action: HomeAction) => void;
  onTabChange?: (tab: HomeV2Props['activeTab']) => void;
};

const navItems = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'planejamento', label: 'Planejamento', icon: BookOpenCheck },
  { id: 'turmas', label: 'Turmas', icon: Users },
  { id: 'arquivos', label: 'Arquivos', icon: FileText },
  { id: 'mais', label: 'Mais', icon: LayoutGrid },
] as const;

export function HomeV2({
  data,
  activeTab = 'inicio',
  onAction = () => undefined,
  onTabChange = () => undefined,
}: HomeV2Props) {
  return (
    <main className="v2-root v2-home" aria-labelledby="home-v2-greeting">
      <div className="v2-screen v2-home__screen">
        <header className="v2-home__header">
          <div className="v2-home__greeting">
            <p className="v2-home__date">{data.dateLabel}</p>
            <h1 id="home-v2-greeting">Bom dia, {data.teacherName}!</h1>
          </div>
          <button className="v2-home__avatar v2-pressable" type="button" aria-label="Abrir meu perfil">
            {data.teacherName.charAt(0).toUpperCase()}
          </button>
        </header>

        <section className="v2-home__hero" aria-labelledby="home-v2-focus-title">
          <div className="v2-home__hero-topline">
            <span className="v2-home__hero-kicker">Aula em foco</span>
            <span className="v2-home__hero-status">{data.lesson?.status ?? 'Sem aula agora'}</span>
          </div>
          {data.lesson ? (
            <>
              <div className="v2-home__hero-heading">
                <div>
                  <p className="v2-home__hero-subject">{data.lesson.subject}</p>
                  <h2 id="home-v2-focus-title">{data.lesson.theme}</h2>
                  <p className="v2-home__hero-detail">{data.lesson.detail}</p>
                </div>
                <div className="v2-home__hero-object" aria-hidden="true">
                  <Sigma size={42} strokeWidth={2.4} />
                </div>
              </div>
              <div className="v2-home__hero-meta" aria-label="Metadados da aula">
                <span>{data.lesson.schedule}</span>
                <span>{data.lesson.room}</span>
                <span>BNCC {data.lesson.code}</span>
              </div>
              <div className="v2-home__hero-actions">
                <button
                  type="button"
                  className="v2-home__hero-action v2-home__hero-action--primary v2-pressable"
                  onClick={() => onAction('attendance')}
                >
                  <UserCheck size={18} strokeWidth={2.8} aria-hidden="true" />
                  Fazer chamada
                </button>
                <button
                  type="button"
                  className="v2-home__hero-action v2-home__hero-action--quiet v2-pressable"
                  onClick={() => onAction('plan')}
                >
                  <ClipboardList size={18} strokeWidth={2.8} aria-hidden="true" />
                  Ver plano
                </button>
              </div>
            </>
          ) : (
            <div className="v2-home__hero-empty">
              <h2 id="home-v2-focus-title">Sua rotina está livre</h2>
              <p>Escolha um plano ou organize o próximo encontro.</p>
            </div>
          )}
        </section>

        <section className="v2-home__section" aria-labelledby="home-v2-actions-title">
          <div className="v2-home__section-heading">
            <h2 id="home-v2-actions-title">Atalhos do dia</h2>
            <span>{data.pendingCount ? `${data.pendingCount} pendente` : 'Tudo em dia'}</span>
          </div>
          <div className="v2-home__actions-grid">
            <button type="button" className="v2-home__command v2-pressable" onClick={() => onAction('observation')}>
              <FileText size={27} strokeWidth={2.4} aria-hidden="true" />
              <span>Registrar observação</span>
              <small>Deixe o contexto da aula salvo</small>
            </button>
            <button type="button" className="v2-home__command v2-pressable" onClick={() => onAction('commitments')}>
              <CalendarDays size={27} strokeWidth={2.4} aria-hidden="true" />
              <span>Compromissos</span>
              <small>Veja o que vem depois</small>
            </button>
          </div>
        </section>

        <section className="v2-home__section" aria-labelledby="home-v2-agenda-title">
          <div className="v2-home__section-heading">
            <h2 id="home-v2-agenda-title">Agenda de hoje</h2>
            <button type="button" className="v2-home__text-action v2-pressable" onClick={() => onAction('commitments')}>
              Ver tudo <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
          {data.agenda.length ? (
            <ol className="v2-home__timeline">
              {data.agenda.map((item) => (
                <li key={`${item.time}-${item.title}`} className="v2-home__timeline-item">
                  <span className={`v2-home__timeline-dot v2-home__timeline-dot--${item.tone}`} aria-hidden="true" />
                  <div className="v2-home__agenda-row">
                    <time>{item.time}</time>
                    <div className="v2-home__agenda-copy">
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </div>
                    <ChevronRight size={20} aria-hidden="true" />
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="v2-home__empty-state">
              <CalendarDays size={26} strokeWidth={2.2} aria-hidden="true" />
              <strong>Nenhum compromisso salvo</strong>
              <p>Use o planejamento para organizar o próximo encontro.</p>
            </div>
          )}
        </section>

        <nav className="v2-home__bottom-nav" aria-label="Navegação principal">
          {navItems.map(({ id, label, icon: Icon }) => {
            const selected = id === activeTab;
            return (
              <button
                key={id}
                type="button"
                className={`v2-home__nav-item v2-pressable${selected ? ' is-selected' : ''}`}
                aria-current={selected ? 'page' : undefined}
                onClick={() => onTabChange(id)}
              >
                <Icon size={23} strokeWidth={selected ? 2.8 : 2.2} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
