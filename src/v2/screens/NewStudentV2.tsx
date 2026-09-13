import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Phone, UserRound, UsersRound } from 'lucide-react';
import { calculateAge, validatePhone } from '../../data/classes.js';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './new-student-v2.css';

type StudentDraft = { id: string; turmaId: string | null; nome: string; dataNascimento: string; responsavel: string; contato: string; cor: string; presencas: number; faltas: number; criadoEm: string; atualizadoEm: string };
type Props = { turmaId?: string | null; onBack: () => void; onConcluido: () => void; onSalvo: (student: StudentDraft) => Promise<unknown> | unknown; onDirtyChange?: (dirty: boolean) => void };
const colors = ['#1cb0f6', '#7b61d9', '#3fb980', '#eb6b6b'];
const localId = () => `aluno-${crypto.randomUUID()}`;

export function NewStudentV2({ turmaId = null, onBack, onConcluido, onSalvo, onDirtyChange = () => undefined }: Props) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [guardian, setGuardian] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const dirty = Boolean(name.trim() || birthDate || guardian.trim() || phone.trim());
  useEffect(() => { onDirtyChange(dirty); return () => onDirtyChange(false); }, [dirty, onDirtyChange]);
  let age = '';
  if (birthDate) { try { age = calculateAge(birthDate); } catch { age = ''; } }
  const save = async () => {
    setError('');
    if (!name.trim() || !birthDate) { setError('Informe o nome e a data de nascimento.'); return; }
    try { calculateAge(birthDate); const normalizedPhone = validatePhone(phone); const now = new Date().toISOString(); const student: StudentDraft = { id: localId(), turmaId, nome: name.trim(), dataNascimento: birthDate, responsavel: guardian.trim(), contato: normalizedPhone, cor: colors[Math.floor(Math.random() * colors.length)], presencas: 0, faltas: 0, criadoEm: now, atualizadoEm: now }; setSaving(true); await onSalvo(student); onDirtyChange(false); onConcluido(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível salvar o aluno. Os dados continuam no formulário; tente novamente.'); }
    finally { setSaving(false); }
  };
  return <main className="v2-root v2-student-new"><div className="v2-student-new__screen"><header className="v2-student-new__header"><button type="button" className="v2-student-new__back v2-pressable" aria-label="Voltar" onClick={onBack} disabled={saving}><ArrowLeft size={23} /></button><div><span className="v2-eyebrow">SUA TURMA</span><h1>Novo aluno</h1><p>Adicione alguém à chamada e aos registros.</p></div><span className="v2-student-new__mark"><UsersRound size={22} /></span></header><section className="v2-student-new__intro"><span className="v2-student-new__avatar"><UserRound size={30} /></span><div><strong>Comece pelo essencial.</strong><p>Você poderá completar o perfil depois, sem interromper a rotina.</p></div></section><form className="v2-student-new__form" onSubmit={(event) => { event.preventDefault(); void save(); }}><label><span>Nome completo <b>*</b></span><div className="v2-student-new__input"><UserRound size={19} /><input autoFocus autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Ana Clara Souza" /></div></label><label><span>Data de nascimento <b>*</b></span><div className="v2-student-new__input"><CalendarDays size={19} /><input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />{age && <small>{age}</small>}</div></label><label><span>Responsável <em>opcional</em></span><div className="v2-student-new__input"><UsersRound size={19} /><input autoComplete="name" value={guardian} onChange={(event) => setGuardian(event.target.value)} placeholder="Nome do responsável" /></div></label><label><span>Telefone <em>opcional</em></span><div className="v2-student-new__input"><Phone size={19} /><input inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(11) 99999-9999" /></div></label>{error && <p className="v2-student-new__error" role="alert">{error}</p>}<button type="submit" className="v2-primary-action v2-student-new__submit v2-pressable" disabled={saving}>{saving ? 'Salvando…' : 'Adicionar aluno'}<ArrowRight size={20} /></button></form><p className="v2-student-new__privacy"><Check size={14} /> Dados pedagógicos ficam protegidos neste aparelho.</p></div></main>;
}
