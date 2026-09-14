import { ArchiveRestore, Bell, BookOpen, BriefcaseBusiness, ChevronRight, Crown, Database, FileText, House, LayoutGrid, LifeBuoy, Palette, School, Settings, Shield, User, Users } from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './more-v2.css';

type Props = { goTo?: (route: string) => void; onTabChange?: (tab: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais') => void };
const navItems = [{ id: 'inicio', label: 'Início', icon: House }, { id: 'planejamento', label: 'Planejamento', icon: FileText }, { id: 'turmas', label: 'Turmas', icon: Users }, { id: 'arquivos', label: 'Arquivos', icon: FileText }, { id: 'mais', label: 'Mais', icon: LayoutGrid }] as const;
const sections = [
  { title: 'Para a sala', items: [{ icon: BriefcaseBusiness, title: 'Ferramentas de sala', detail: 'Temporizador, cronômetro e calculadora', route: 'ferramentas' }, { icon: BookOpen, title: 'BNCC', detail: 'Habilidades e objetivos da etapa ativa', route: 'bncc' }, { icon: FileText, title: 'Relatórios', detail: 'Acompanhe frequência e progresso', route: 'relatorios' }] },
  { title: 'Conta e trabalho', items: [{ icon: User, title: 'Meu perfil', detail: 'Informações profissionais', route: 'perfil-professor' }, { icon: Users, title: 'Minhas turmas', detail: 'Crie, edite e troque a turma ativa', route: 'gerenciar-turmas' }, { icon: Crown, title: 'Seu plano', detail: 'Recursos e assinatura', route: 'assinatura', accent: true }] },
  { title: 'Preferências', items: [{ icon: Settings, title: 'Configurações', detail: 'Aparência, sons e dados', route: 'configuracoes' }, { icon: Palette, title: 'Aparência', detail: 'Tema e acessibilidade', route: 'tema' }, { icon: Bell, title: 'Notificações', detail: 'Lembretes locais', route: 'notificacoes' }] },
  { title: 'Dados e suporte', items: [{ icon: Database, title: 'Backup local', detail: 'Exporte ou restaure uma cópia', route: 'backup' }, { icon: ArchiveRestore, title: 'Lixeira', detail: 'Recupere itens removidos', route: 'lixeira' }, { icon: Shield, title: 'Privacidade', detail: 'Seus dados pedagógicos', route: 'privacidade' }, { icon: LifeBuoy, title: 'Ajuda e feedback', detail: 'Tire dúvidas com a equipe', route: 'ajuda-feedback' }, { icon: School, title: 'Organização', detail: 'Escolas e anos letivos', route: 'organizacao' }] },
];

export function MoreV2({ goTo = () => undefined, onTabChange = () => undefined }: Props) {
  return <main className="v2-root v2-more" aria-labelledby="more-v2-title"><div className="v2-screen v2-more__screen">
    <header className="v2-more__header"><div><span className="v2-eyebrow">SEU ESPAÇO</span><h1 id="more-v2-title">Mais</h1><p>Recursos para cuidar da sua rotina docente.</p></div><span className="v2-more__mark"><LayoutGrid size={25} /></span></header>
    <section className="v2-more__intro"><span className="v2-eyebrow">ASSISTENTE PEDAGÓGICO</span><h2>Deixe o trabalho organizado para ensinar com presença.</h2><p>Atalhos para seus recursos, conta e suporte.</p></section>
    <div className="v2-more__sections">{sections.map((section) => <section className="v2-more__section" key={section.title} aria-labelledby={`more-v2-${section.title}`}><div className="v2-more__section-label" id={`more-v2-${section.title}`}>{section.title}</div><div className="v2-more__list">{section.items.map(({ icon: Icon, title, detail, route, accent }) => <button className={`v2-more__row v2-pressable${accent ? ' is-accent' : ''}`} type="button" key={route} onClick={() => goTo(route)}><span className="v2-more__row-icon"><Icon size={20} /></span><span className="v2-more__row-copy"><strong>{title}</strong><small>{detail}</small></span><ChevronRight size={19} /></button>)}</div></section>)}</div>
    <p className="v2-more__version">Assistente Pedagógico · recursos locais e offline-first</p>
    <nav className="v2-more__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-more__nav-item v2-pressable${id === 'mais' ? ' is-selected' : ''}`} aria-current={id === 'mais' ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} /><span>{label}</span></button>)}</nav>
  </div></main>;
}
