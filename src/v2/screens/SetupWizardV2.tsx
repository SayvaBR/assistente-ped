import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, GraduationCap, School, UserRound, UsersRound } from 'lucide-react';
import { educationStages, levelsFor } from '../../domain/education';
import { storage as defaultStorage } from '../../data/localStore';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './setup-wizard-v2.css';

type SetupData = { perfilId: string; turmaId: string; tratamento: string; nome: string; etapaEnsino: string; escola: string; cidade: string; uf: string; ibgeCode: string | null; turma: string; nivel: string; turno: string };
type Props = { onDone: (data: SetupData) => Promise<unknown> | unknown; onBack?: () => void; onFinish?: (destination: string) => void; backSignal?: number; storage?: typeof defaultStorage };
type Step = { eyebrow: string; title: string; detail: string; icon: typeof UserRound; field: keyof SetupData; kind: 'choice' | 'text' };

const steps: Step[] = [
  { eyebrow: 'SUA PRESENÇA', title: 'Como você prefere ser chamada?', detail: 'Isso personaliza as mensagens e o seu espaço de trabalho.', icon: UserRound, field: 'tratamento', kind: 'choice' },
  { eyebrow: 'SEU PERFIL', title: 'Qual nome devemos usar?', detail: 'Você poderá ajustar seus dados depois, em Perfil.', icon: UserRound, field: 'nome', kind: 'text' },
  { eyebrow: 'SEU CONTEXTO', title: 'Em qual etapa você trabalha?', detail: 'A BNCC e os planejamentos acompanham a sua realidade.', icon: GraduationCap, field: 'etapaEnsino', kind: 'choice' },
  { eyebrow: 'PRIMEIRA TURMA', title: 'Qual é o nome da sua primeira turma?', detail: 'Use o mesmo nome que você usa na escola.', icon: School, field: 'turma', kind: 'text' },
  { eyebrow: 'PRIMEIRA TURMA', title: 'Qual é o nível da turma?', detail: 'Escolha a nomenclatura adotada pela sua escola.', icon: UsersRound, field: 'nivel', kind: 'choice' },
  { eyebrow: 'ROTINA', title: 'Qual é o turno da turma?', detail: 'O turno aparece junto ao nome da turma.', icon: Clock3, field: 'turno', kind: 'choice' },
];
const shifts = ['Manhã', 'Tarde', 'Noite', 'Integral'];
const draftKey = 'onboarding:rascunho:v2';
const createLocalId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

const initialData = (): SetupData => ({ perfilId: createLocalId('prof'), turmaId: createLocalId('turma'), tratamento: '', nome: '', etapaEnsino: 'Educação Infantil', escola: '', cidade: '', uf: '', ibgeCode: null, turma: '', nivel: '', turno: '' });

export function SetupWizardV2({ onDone, onBack, onFinish, backSignal = 0, storage = defaultStorage }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<SetupData>(initialData);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ nome: string; turma: string; nivel: string; turno: string } | null>(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousBackSignal = useRef(backSignal);
  const step = steps[stepIndex];
  const selected = String(data[step.field] || '');
  const dirty = [data.tratamento, data.nome, data.turma, data.nivel, data.turno].some((value) => String(value || '').trim());
  const valid = Boolean(selected.trim());

  useEffect(() => {
    let mounted = true;
    storage.get(draftKey).then(({ value }) => {
      if (!mounted) return;
      try {
        const draft = JSON.parse(value || '');
        if (draft?.dados) setData((current) => ({ ...current, ...draft.dados }));
        if (Number.isFinite(Number(draft?.passo))) setStepIndex(Math.max(0, Math.min(steps.length - 1, Number(draft.passo))));
      } catch { /* draft ausente ou inválido: começa limpo */ }
      setReady(true);
    }).catch(() => mounted && setReady(true));
    return () => { mounted = false; };
  }, [storage]);

  useEffect(() => { if (ready && !success) void storage.set(draftKey, JSON.stringify({ passo: stepIndex, dados: data })).catch(() => undefined); }, [data, ready, stepIndex, storage, success]);
  useEffect(() => { headingRef.current?.focus(); }, [stepIndex]);
  useEffect(() => { if (backSignal !== previousBackSignal.current) { previousBackSignal.current = backSignal; if (success) onFinish?.('inicio'); else goBack(); } });

  const update = (field: keyof SetupData, value: string) => setData((current) => ({ ...current, [field]: value, ...(field === 'etapaEnsino' ? { nivel: '' } : {}) }));
  const goBack = () => { setError(''); if (stepIndex > 0) setStepIndex((value) => value - 1); else if (dirty) setConfirmExit(true); else onBack?.(); };
  const continueStep = async () => {
    setError('');
    if (!valid) { setError('Escolha uma opção ou preencha este campo para continuar.'); return; }
    if (stepIndex < steps.length - 1) { setStepIndex((value) => value + 1); return; }
    setSaving(true);
    try { await onDone(data); await storage.delete(draftKey).catch(() => undefined); setSuccess({ nome: data.nome.trim(), turma: data.turma.trim(), nivel: data.nivel, turno: data.turno }); }
    catch { setError('Não foi possível salvar sua configuração. Suas respostas continuam aqui; tente novamente.'); }
    finally { setSaving(false); }
  };
  const options = useMemo(() => step.field === 'tratamento' ? ['Professora', 'Professor', 'Docente'] : step.field === 'etapaEnsino' ? educationStages : step.field === 'nivel' ? levelsFor(data.etapaEnsino) : shifts, [data.etapaEnsino, step.field]);

  if (!ready) return <main className="v2-root v2-wizard"><div className="v2-wizard__screen v2-wizard__loading"><span className="v2-wizard__loader" /><p>Preparando sua configuração…</p></div></main>;
  if (success) return <main className="v2-root v2-wizard"><div className="v2-wizard__screen v2-wizard__success"><span className="v2-wizard__success-mark"><Check size={47} strokeWidth={3} /></span><span className="v2-eyebrow">CONFIGURAÇÃO CONCLUÍDA</span><h1>Tudo pronto,<br /><span>{success.nome.split(' ')[0]}</span>!</h1><p>Seu perfil e sua primeira turma foram criados neste aparelho.</p><div className="v2-wizard__summary"><span className="v2-wizard__summary-icon"><School size={23} /></span><span><small>SUA PRIMEIRA TURMA</small><strong>{success.turma}</strong><em>{[success.nivel, success.turno].filter(Boolean).join(' · ')}</em></span><Check size={19} /></div><div className="v2-wizard__success-actions"><button type="button" className="v2-primary-action v2-pressable" onClick={() => onFinish?.('aluno')}>Cadastrar primeiro aluno <ArrowRight size={19} /></button><button type="button" className="v2-wizard__secondary v2-pressable" onClick={() => onFinish?.('inicio')}>Ir para o início</button></div></div></main>;

  return <main className="v2-root v2-wizard"><div className="v2-wizard__screen"><header className="v2-wizard__header"><button type="button" className="v2-wizard__back v2-pressable" aria-label="Voltar uma etapa" onClick={goBack} disabled={saving}><ArrowLeft size={21} /></button><div className="v2-wizard__progress" role="progressbar" aria-label={`Etapa ${stepIndex + 1} de ${steps.length}`} aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={stepIndex + 1}><span style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} /></div><small>{stepIndex + 1} de {steps.length}</small></header><section className="v2-wizard__body" key={step.field}><span className="v2-wizard__step-icon"><step.icon size={25} /></span><span className="v2-eyebrow">{step.eyebrow}</span><h1 ref={headingRef} tabIndex={-1}>{step.title}</h1><p>{step.detail}</p>{step.kind === 'text' ? <label className="v2-wizard__field"><span>{step.field === 'nome' ? 'Seu nome' : 'Nome da primeira turma'}</span><input autoComplete={step.field === 'nome' ? 'name' : 'off'} autoFocus value={selected} placeholder={step.field === 'nome' ? 'Ex.: Marina Souza' : 'Ex.: 5º Ano A'} onChange={(event) => update(step.field, event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void continueStep(); }} /></label> : <div className="v2-wizard__choices" role="radiogroup" aria-label={step.title}>{options.map((option) => <button type="button" role="radio" aria-checked={selected === option} className={`v2-wizard__choice v2-pressable${selected === option ? ' is-selected' : ''}`} key={option} onClick={() => update(step.field, option)}><span>{option}</span>{selected === option && <Check size={17} />}</button>)}</div>}{error && <p className="v2-wizard__error" role="alert">{error}</p>}</section><footer className="v2-wizard__footer"><button type="button" className="v2-primary-action v2-wizard__continue v2-pressable" disabled={saving || !valid} onClick={() => void continueStep()}>{saving ? 'Salvando…' : stepIndex === steps.length - 1 ? 'Concluir configuração' : 'Continuar'}<ArrowRight size={19} /></button><p>Seu progresso é salvo neste aparelho para você continuar depois.</p></footer>{confirmExit && <div className="v2-wizard__dialog-backdrop" role="presentation" onClick={() => setConfirmExit(false)}><div className="v2-wizard__dialog" role="dialog" aria-modal="true" aria-labelledby="wizard-exit-title" onClick={(event) => event.stopPropagation()}><h2 id="wizard-exit-title">Sair da configuração?</h2><p>Seu progresso será mantido. Você poderá continuar de onde parou.</p><div><button type="button" className="v2-wizard__secondary v2-pressable" onClick={() => setConfirmExit(false)}>Continuar</button><button type="button" className="v2-primary-action v2-pressable" onClick={() => { setConfirmExit(false); onBack?.(); }}>Sair</button></div></div></div>}</div></main>;
}
