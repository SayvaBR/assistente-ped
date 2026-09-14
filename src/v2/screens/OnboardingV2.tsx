import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpenCheck, CalendarDays, Check, Files, UsersRound } from 'lucide-react';
import type { StoragePort } from '../../domain/models';
import { storage as defaultStorage } from '../../data/localStore';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './onboarding-v2.css';

type OnboardingProps = {
  onDone: (plan?: string) => void;
  storage?: Pick<StoragePort, 'get' | 'set'>;
};

type Page = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  icon: typeof CalendarDays;
  kind: 'plan' | 'timeline' | 'class' | 'files' | 'finish';
};

const pages: Page[] = [
  {
    eyebrow: 'ASSISTENTE PEDAGÓGICO',
    title: 'Uma rotina mais leve',
    accent: 'começa por aqui.',
    description: 'Organize o trabalho da escola com clareza, no seu ritmo e sem perder o que importa.',
    icon: BookOpenCheck,
    kind: 'plan',
  },
  {
    eyebrow: 'PLANEJAMENTO',
    title: 'Do primeiro toque',
    accent: 'à aula pronta.',
    description: 'Planeje objetivos, conteúdos e momentos em um fluxo que acompanha a sua forma de ensinar.',
    icon: CalendarDays,
    kind: 'timeline',
  },
  {
    eyebrow: 'ACOMPANHAMENTO',
    title: 'Sua turma',
    accent: 'mais perto de você.',
    description: 'Faça chamada, registre observações e encontre o contexto de cada aluno quando precisar.',
    icon: UsersRound,
    kind: 'class',
  },
  {
    eyebrow: 'MATERIAIS',
    title: 'Tudo que apoia',
    accent: 'o seu dia.',
    description: 'Guarde planos e arquivos pedagógicos no aparelho, com acesso rápido mesmo quando estiver offline.',
    icon: Files,
    kind: 'files',
  },
  {
    eyebrow: 'PRONTO PARA COMEÇAR?',
    title: 'Mais tempo para',
    accent: 'ensinar o que importa.',
    description: 'Sua rotina pedagógica em um só lugar, feita para ser útil na escola de verdade.',
    icon: Check,
    kind: 'finish',
  },
];

function VisualMark({ page }: { page: Page }) {
  const Icon = page.icon;
  if (page.kind === 'timeline') {
    return <div className="v2-onboarding-visual v2-onboarding-visual--timeline" aria-hidden="true"><span className="v2-onboarding-line" /><span className="v2-onboarding-node is-done"><Check size={15} /></span><span className="v2-onboarding-node is-active"><Icon size={22} /></span><span className="v2-onboarding-node"><span /></span><span className="v2-onboarding-note">Hoje <b>3 aulas organizadas</b></span></div>;
  }
  if (page.kind === 'class') {
    return <div className="v2-onboarding-visual v2-onboarding-visual--class" aria-hidden="true"><span className="v2-onboarding-orbit" /><span className="v2-onboarding-orbit v2-onboarding-orbit--small" /><span className="v2-onboarding-icon-bubble"><Icon size={42} /></span><span className="v2-onboarding-stat"><b>24</b><small>alunos acompanhados</small></span></div>;
  }
  if (page.kind === 'files') {
    return <div className="v2-onboarding-visual v2-onboarding-visual--files" aria-hidden="true"><span className="v2-onboarding-file v2-onboarding-file--back" /><span className="v2-onboarding-file v2-onboarding-file--middle" /><span className="v2-onboarding-file v2-onboarding-file--front"><Icon size={33} /><i /><i /><i /></span><span className="v2-onboarding-offline">Disponível no aparelho</span></div>;
  }
  if (page.kind === 'finish') {
    return <div className="v2-onboarding-visual v2-onboarding-visual--finish" aria-hidden="true"><span className="v2-onboarding-check"><Check size={52} strokeWidth={3} /></span><span className="v2-onboarding-spark v2-onboarding-spark--one" /><span className="v2-onboarding-spark v2-onboarding-spark--two" /><span className="v2-onboarding-spark v2-onboarding-spark--three" /><strong>Seu próximo passo<br />começa agora.</strong></div>;
  }
  return <div className="v2-onboarding-visual v2-onboarding-visual--intro" aria-hidden="true"><span className="v2-onboarding-ring v2-onboarding-ring--one" /><span className="v2-onboarding-ring v2-onboarding-ring--two" /><span className="v2-onboarding-icon-bubble"><Icon size={44} /></span><span className="v2-onboarding-wordmark">planejar<br /><b>acompanhar</b><br /><em>transformar</em></span></div>;
}

export function OnboardingV2({ onDone, storage = defaultStorage }: OnboardingProps) {
  const [index, setIndex] = useState(0);
  const [plan, setPlan] = useState('gratuito');
  const page = pages[index];
  const progressLabel = useMemo(() => `Etapa ${index + 1} de ${pages.length}`, [index]);

  useEffect(() => {
    storage.get('assinatura:interesse').then(({ value }) => setPlan(value === 'pro' ? 'pro' : 'gratuito')).catch(() => undefined);
  }, [storage]);

  const choosePlan = (value: string) => {
    setPlan(value);
    void storage.set('assinatura:interesse', value).catch(() => undefined);
  };

  const finish = async () => {
    await storage.set('assinatura:interesse', plan).catch(() => undefined);
    onDone(plan);
  };

  const next = () => {
    if (index === pages.length - 1) void finish();
    else setIndex((value) => value + 1);
  };

  return <main className="v2-root v2-onboarding"><div className="v2-onboarding__screen">
    <header className="v2-onboarding__top"><span className="v2-onboarding-brand"><BookOpenCheck size={18} /> Assistente <b>Pedagógico</b></span><button type="button" className="v2-onboarding-skip v2-pressable" onClick={() => void finish()}>Pular</button></header>
    <div className="v2-onboarding-progress" aria-label={progressLabel}><span style={{ width: `${((index + 1) / pages.length) * 100}%` }} /><small>{progressLabel}</small></div>
    <section className="v2-onboarding__content" key={page.kind} aria-live="polite">
      <div className="v2-onboarding__copy"><span className="v2-eyebrow">{page.eyebrow}</span><h1>{page.title}<br /><span>{page.accent}</span></h1><p>{page.description}</p></div>
      <VisualMark page={page} />
      {page.kind === 'plan' && <div className="v2-onboarding-plans" role="radiogroup" aria-label="Escolha como começar"><button type="button" role="radio" aria-checked={plan === 'gratuito'} className={`v2-onboarding-plan v2-pressable${plan === 'gratuito' ? ' is-selected' : ''}`} onClick={() => choosePlan('gratuito')}><span><strong>Gratuito</strong><small>Para começar com o essencial</small></span><b>R$ 0</b>{plan === 'gratuito' && <Check size={18} />}</button><button type="button" role="radio" aria-checked={plan === 'pro'} className={`v2-onboarding-plan v2-pressable${plan === 'pro' ? ' is-selected' : ''}`} onClick={() => choosePlan('pro')}><span><strong>Pro</strong><small>Mais recursos para sua rotina</small></span><b>Depois</b>{plan === 'pro' && <Check size={18} />}</button></div>}
    </section>
    <footer className="v2-onboarding__footer"><div className="v2-onboarding-dots" aria-label="Navegação da apresentação">{pages.map((item, itemIndex) => <button type="button" key={item.kind} className={`v2-onboarding-dot v2-pressable${itemIndex === index ? ' is-active' : ''}`} aria-label={`Ir para etapa ${itemIndex + 1}`} aria-current={itemIndex === index ? 'step' : undefined} onClick={() => setIndex(itemIndex)}><span /></button>)}</div><div className="v2-onboarding-actions">{index > 0 && <button type="button" className="v2-onboarding-back v2-pressable" onClick={() => setIndex((value) => value - 1)} aria-label="Voltar"><ArrowLeft size={21} /></button>}<button type="button" className="v2-primary-action v2-onboarding-continue v2-pressable" onClick={next}>{index === pages.length - 1 ? 'Começar agora' : 'Continuar'}<ArrowRight size={21} /></button></div><p className="v2-onboarding-local">Seus dados ficam neste aparelho e continuam disponíveis offline.</p></footer>
  </div></main>;
}
