import { ArrowLeft, BookOpenCheck, Check, FileText, House, LayoutGrid, Save, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { TeachingActivity } from '../../domain/activities';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './activity-v2.css';

type Props = { activity: TeachingActivity; className?: string; offline?: boolean; isEditing?: boolean; onBack: () => void; onSalvar: (activity: TeachingActivity) => Promise<unknown> | unknown; onSaved?: () => void; onTabChange?: (tab: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais') => void };

export function ActivityV2({ activity, className = 'Sua turma', offline = false, isEditing = false, onBack, onSalvar, onSaved = () => undefined, onTabChange = () => undefined }: Props) {
  const [draft, setDraft] = useState(activity);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const update = <K extends keyof TeachingActivity>(key: K, value: TeachingActivity[K]) => setDraft((current) => ({ ...current, [key]: value }));
  useEffect(() => { setDraft(activity); }, [activity]);
  const save = async () => { setSaving(true); setError(''); setMessage(''); try { await onSalvar({ ...draft, status: 'pronta' }); setMessage('Atividade salva no dispositivo.'); onSaved(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível salvar a atividade.'); } finally { setSaving(false); } };
  const navItems = [{ id: 'inicio', label: 'Início', icon: House }, { id: 'planejamento', label: 'Planejamento', icon: BookOpenCheck }, { id: 'turmas', label: 'Turmas', icon: Users }, { id: 'arquivos', label: 'Arquivos', icon: FileText }, { id: 'mais', label: 'Mais', icon: LayoutGrid }] as const;
  return <main className="v2-root v2-activity" aria-labelledby="activity-v2-title"><div className="v2-screen v2-activity__screen">
    <header className="v2-activity__header"><button className="v2-activity__back v2-pressable" type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={24} /></button><div><span className="v2-eyebrow">{className}</span><h1 id="activity-v2-title">{isEditing ? 'Editar atividade' : 'Nova atividade'}</h1><p>Prepare uma proposta para levar à turma.</p></div><span className="v2-activity__mark"><BookOpenCheck size={22} /></span></header>
    {offline && <p className="v2-activity__notice" role="status">Você está offline. A atividade será guardada neste dispositivo.</p>}
    {error && <p className="v2-activity__error" role="alert">{error}</p>}
    <section className="v2-activity__context v2-surface"><span className="v2-eyebrow">VINCULADA AO PLANEJAMENTO</span><strong>{draft.dataKey}</strong><small>O conteúdo fica disponível para esta turma.</small></section>
    <section className="v2-activity__form v2-surface"><span className="v2-eyebrow">COMECE PELA INTENÇÃO</span><h2>O que você quer propor?</h2><label><span>Título da atividade</span><input value={draft.titulo} onChange={(event) => update('titulo', event.target.value)} placeholder="Ex.: Caça às palavras" autoFocus /></label><label><span>Disciplina <em>opcional</em></span><input value={draft.disciplina} onChange={(event) => update('disciplina', event.target.value)} placeholder="Ex.: Língua Portuguesa" /></label><label><span>Objetivo <em>opcional</em></span><textarea value={draft.objetivo} onChange={(event) => update('objetivo', event.target.value)} placeholder="Que aprendizagem você quer observar?" /></label><label><span>Como realizar</span><textarea value={draft.instrucoes} onChange={(event) => update('instrucoes', event.target.value)} placeholder="Descreva as etapas para a turma..." /></label><label><span>Materiais <em>opcional</em></span><input value={draft.recursos} onChange={(event) => update('recursos', event.target.value)} placeholder="Ex.: cartões, caderno e lápis" /></label></section>
    <div className="v2-activity__feedback" role={message ? 'status' : undefined} aria-live="polite">{message}</div><button className="v2-primary-action v2-activity__save v2-pressable" type="button" onClick={() => void save()} disabled={saving || !draft.titulo.trim() || !draft.instrucoes.trim()}><Save size={19} />{saving ? 'Salvando…' : 'Salvar atividade'}<Check size={18} /></button>
    <nav className="v2-activity__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-activity__nav-item v2-pressable${id === 'planejamento' ? ' is-selected' : ''}`} aria-current={id === 'planejamento' ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={22} /><span>{label}</span></button>)}</nav>
  </div></main>;
}
