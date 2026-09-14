import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpenCheck, Check, Compass, Lightbulb, Sparkles } from 'lucide-react';
import type { StoragePort } from '../../domain/models';
import { storage as defaultStorage } from '../../data/localStore';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './onboarding-discovery-v2.css';

export type DiscoveryPain = 'planning' | 'attendance' | 'observations' | 'classes' | 'files' | 'everything';
export type TeacherDiscoveryProfile = {
  primaryPain?: DiscoveryPain;
  endOfDayBacklog?: string;
  branchBlocker?: string;
  completedAt?: string;
};

type Props = { onDone: (profile: TeacherDiscoveryProfile) => void; storage?: Pick<StoragePort, 'get' | 'set'> };
type Option = { value: string; label: string; detail?: string };

const draftKey = 'onboarding:descoberta:v2';
const painOptions: Option[] = [
  { value: 'planning', label: 'Planejar aulas', detail: 'Objetivos, BNCC e momentos da aula' },
  { value: 'attendance', label: 'Fazer chamada e frequência', detail: 'Registrar agora e encontrar depois' },
  { value: 'observations', label: 'Registrar o que acontece', detail: 'Guardar o contexto de cada aluno' },
  { value: 'classes', label: 'Organizar minhas turmas', detail: 'Ter o contexto certo à mão' },
  { value: 'files', label: 'Encontrar arquivos e materiais', detail: 'Saber onde está cada coisa' },
  { value: 'everything', label: 'Dar conta de tudo ao mesmo tempo', detail: 'Um pouco de cada frente' },
];
const backlogOptions: Option[] = [
  { value: 'planning', label: 'Terminar o planejamento' },
  { value: 'records', label: 'Atualizar registros' },
  { value: 'materials', label: 'Organizar materiais' },
  { value: 'attendance', label: 'Rever a frequência' },
  { value: 'tomorrow', label: 'Preparar o dia seguinte' },
  { value: 'almost-everything', label: 'Quase tudo' },
];
const branchOptions: Record<DiscoveryPain, Option[]> = {
  planning: [
    { value: 'objective', label: 'Transformar a ideia em objetivo claro' },
    { value: 'bncc', label: 'Encontrar habilidades BNCC' },
    { value: 'moments', label: 'Organizar os momentos da aula' },
    { value: 'activity', label: 'Criar atividades' },
    { value: 'materials', label: 'Separar materiais' },
  ],
  attendance: [
    { value: 'during-class', label: 'Demora durante a aula' },
    { value: 'correct-later', label: 'Corrigir depois' },
    { value: 'history', label: 'Consultar o histórico' },
    { value: 'justification', label: 'Justificar faltas' },
    { value: 'scattered', label: 'Informação espalhada' },
  ],
  observations: [
    { value: 'time', label: 'Falta de tempo' },
    { value: 'interrupt', label: 'Não interromper a aula' },
    { value: 'place', label: 'Não ter onde anotar rápido' },
    { value: 'find-later', label: 'Depois não encontrar a anotação' },
    { value: 'scattered', label: 'Informação espalhada' },
  ],
  classes: [
    { value: 'context', label: 'Perder o contexto da turma' },
    { value: 'students', label: 'Acompanhar cada aluno' },
    { value: 'switching', label: 'Alternar entre turmas' },
    { value: 'records', label: 'Manter tudo atualizado' },
  ],
  files: [
    { value: 'find', label: 'Encontrar o arquivo certo' },
    { value: 'scattered', label: 'Materiais espalhados' },
    { value: 'organize', label: 'Organizar por turma e aula' },
    { value: 'offline', label: 'Acessar quando estou offline' },
  ],
  everything: [
    { value: 'planning', label: 'Planejamento e BNCC' },
    { value: 'attendance', label: 'Chamada e frequência' },
    { value: 'records', label: 'Registros dos alunos' },
    { value: 'materials', label: 'Materiais e arquivos' },
  ],
};

const reflectionFor = (pain?: DiscoveryPain) => {
  const copy: Record<DiscoveryPain, { title: string; detail: string }> = {
    planning: { title: 'Planejamento não deveria consumir o tempo que sobra depois da escola.', detail: 'Vamos deixar esse caminho mais claro para você.' },
    attendance: { title: 'A chamada precisa acompanhar a aula — e continuar fácil de reencontrar depois.', detail: 'Vamos manter frequência e histórico no mesmo fluxo.' },
    observations: { title: 'O que acontece com um aluno merece um lugar simples para continuar existindo.', detail: 'Vamos aproximar o registro do momento em que ele acontece.' },
    classes: { title: 'Trocar de turma não deveria significar recomeçar o contexto.', detail: 'Vamos deixar cada espaço pronto para o trabalho real.' },
    files: { title: 'Um material útil só ajuda quando aparece no momento certo.', detail: 'Vamos organizar seus arquivos pelo contexto em que você usa.' },
    everything: { title: 'Quando tudo pesa, o primeiro passo precisa ser pequeno e útil.', detail: 'Vamos descobrir por onde o seu espaço deve começar.' },
  };
  return pain ? copy[pain] : { title: 'Vamos começar pelo que mais pesa na sua rotina.', detail: 'Uma resposta rápida já ajuda a preparar o seu espaço.' };
};

export function OnboardingDiscoveryV2({ onDone, storage = defaultStorage }: Props) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<TeacherDiscoveryProfile>({});
  const [ready, setReady] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const branch = profile.primaryPain || 'everything';
  const steps = useMemo(() => ['welcome', 'pain', 'backlog', 'branch', 'reflection', 'summary'] as const, []);
  const current = steps[step];
  const options = current === 'pain' ? painOptions : current === 'backlog' ? backlogOptions : branchOptions[branch];
  const reflection = reflectionFor(profile.primaryPain);

  useEffect(() => {
    let mounted = true;
    storage.get(draftKey).then(({ value }) => {
      if (!mounted) return;
      try {
        const draft = JSON.parse(value || '');
        if (draft?.profile) setProfile(draft.profile);
        if (Number.isFinite(Number(draft?.step))) setStep(Math.max(0, Math.min(steps.length - 1, Number(draft.step))));
      } catch { /* rascunho ausente ou inválido */ }
      setReady(true);
    }).catch(() => mounted && setReady(true));
    return () => { mounted = false; };
  }, [storage, steps.length]);

  useEffect(() => {
    if (ready) void storage.set(draftKey, JSON.stringify({ step, profile })).catch(() => undefined);
  }, [profile, ready, step, storage]);

  useEffect(() => {
    const scroller = screenRef.current?.parentElement;
    scroller?.scrollTo({ top: 0, behavior: 'auto' });
  }, [step]);

  const choose = (value: string) => {
    if (current === 'pain') setProfile((old) => ({ ...old, primaryPain: value as DiscoveryPain, branchBlocker: undefined }));
    if (current === 'backlog') setProfile((old) => ({ ...old, endOfDayBacklog: value }));
    if (current === 'branch') setProfile((old) => ({ ...old, branchBlocker: value }));
    setStep((old) => old + 1);
  };
  const finish = () => onDone({ ...profile, completedAt: new Date().toISOString() });
  const back = () => setStep((old) => Math.max(0, old - 1));
  const progress = ((step + 1) / steps.length) * 100;

  if (!ready) return <main className="v2-root v2-discovery"><div className="v2-discovery__screen v2-discovery__loading"><span className="v2-discovery__loader" /><p>Preparando uma conversa para você…</p></div></main>;

  return <main className="v2-root v2-discovery"><div className="v2-discovery__screen" ref={screenRef}>
    <header className="v2-discovery__top"><span className="v2-discovery__brand"><BookOpenCheck size={19} /> Assistente <b>Pedagógico</b></span><button type="button" className="v2-discovery__skip v2-pressable" onClick={finish}>Responder depois</button></header>
    <div className="v2-discovery__progress" role="progressbar" aria-label={`Capítulo Sua rotina, etapa ${step + 1} de ${steps.length}`} aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1}><span style={{ width: `${progress}%` }} /><small>SUA ROTINA · {step + 1}/{steps.length}</small></div>
    <section className="v2-discovery__content" key={current} aria-live="polite">
      {current === 'welcome' && <><span className="v2-discovery__mark"><Compass size={28} /></span><span className="v2-eyebrow">ANTES DE CONFIGURAR</span><h1>Vamos preparar o seu espaço juntos.</h1><p className="v2-discovery__lead">Nada de formulário longo. Algumas respostas rápidas ajudam o Assistente a começar do jeito mais útil para você.</p><div className="v2-discovery__promise"><Sparkles size={20} /><span><strong>Uma conversa curta, com consequência real.</strong><small>Suas escolhas ficam neste aparelho e reaparecem na sua rotina.</small></span></div></>}
      {current === 'pain' && <><span className="v2-eyebrow">O QUE MAIS PESA</span><h1>Como está a sua rotina hoje?</h1><p className="v2-discovery__lead">Escolha o ponto em que um pouco de clareza já faria diferença.</p><div className="v2-discovery__options" role="radiogroup" aria-label="O que mais pesa na sua rotina">{options.map((option) => <button type="button" role="radio" aria-checked={profile.primaryPain === option.value} className="v2-discovery__option v2-pressable" key={option.value} onClick={() => choose(option.value)}><span><strong>{option.label}</strong><small>{option.detail}</small></span><ArrowRight size={18} /></button>)}</div></>}
      {current === 'backlog' && <><span className="v2-eyebrow">NO FIM DO DIA</span><h1>O que costuma ficar para depois?</h1><p className="v2-discovery__lead">Não existe resposta certa. Queremos encontrar o primeiro ponto de apoio.</p><div className="v2-discovery__options" role="radiogroup" aria-label="O que fica para depois">{options.map((option) => <button type="button" role="radio" aria-checked={profile.endOfDayBacklog === option.value} className="v2-discovery__option v2-pressable" key={option.value} onClick={() => choose(option.value)}><span><strong>{option.label}</strong></span><ArrowRight size={18} /></button>)}</div></>}
      {current === 'branch' && <><span className="v2-eyebrow">UM POUCO MAIS</span><h1>Em qual parte isso mais trava?</h1><p className="v2-discovery__lead">Uma escolha basta. O seu caminho muda a partir dela.</p><div className="v2-discovery__options" role="radiogroup" aria-label="Onde está o bloqueio">{options.map((option) => <button type="button" role="radio" aria-checked={profile.branchBlocker === option.value} className="v2-discovery__option v2-pressable" key={option.value} onClick={() => choose(option.value)}><span><strong>{option.label}</strong></span><ArrowRight size={18} /></button>)}</div></>}
      {current === 'reflection' && <><span className="v2-discovery__mark v2-discovery__mark--warm"><Lightbulb size={27} /></span><span className="v2-eyebrow">ENTENDI</span><h1>{reflection.title}</h1><p className="v2-discovery__lead">{reflection.detail}</p><div className="v2-discovery__insight"><Check size={19} /><span>Seu espaço vai começar priorizando <strong>{painOptions.find((item) => item.value === profile.primaryPain)?.label.toLowerCase() || 'o que você precisa hoje'}</strong>.</span></div></>}
      {current === 'summary' && <><span className="v2-discovery__mark"><Check size={29} /></span><span className="v2-eyebrow">SEU ESPAÇO ESTÁ TOMANDO FORMA</span><h1>Agora vamos colocar isso em prática.</h1><p className="v2-discovery__lead">Na próxima etapa, você configura identidade e primeira turma. A gente leva esta conversa junto.</p><div className="v2-discovery__summary"><small>PRIMEIRO FOCO</small><strong>{painOptions.find((item) => item.value === profile.primaryPain)?.label || 'Sua rotina'}</strong><span>{profile.endOfDayBacklog ? `Para depois: ${backlogOptions.find((item) => item.value === profile.endOfDayBacklog)?.label.toLowerCase()}` : 'Você continua no controle do que quer responder.'}</span></div></>}
    </section>
    <footer className="v2-discovery__footer">{current === 'welcome' ? <button type="button" className="v2-primary-action v2-discovery__continue v2-pressable" onClick={() => setStep(1)}>Vamos conversar <ArrowRight size={19} /></button> : <div className="v2-discovery__actions"><button type="button" className="v2-discovery__back v2-pressable" onClick={back} aria-label="Voltar"><ArrowLeft size={20} /></button><button type="button" className="v2-primary-action v2-discovery__continue v2-pressable" onClick={current === 'summary' || current === 'reflection' ? (current === 'summary' ? finish : () => setStep((old) => old + 1)) : () => undefined} disabled={current !== 'summary' && current !== 'reflection'}>{current === 'summary' ? 'Personalizar meu espaço' : 'Continuar'}<ArrowRight size={19} /></button></div>}<p>Suas respostas ficam neste aparelho. Você pode voltar quando quiser.</p></footer>
  </div></main>;
}
