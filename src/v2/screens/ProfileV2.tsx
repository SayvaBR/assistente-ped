import { ArrowLeft, Camera, Check, FileText, House, LayoutGrid, Save, Users } from 'lucide-react';
import * as React from 'react';
import { Capacitor } from '@capacitor/core';
import { deleteMedia, saveMedia } from '../../data/files.js';
import { Ss } from '../../data/files.js';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './profile-v2.css';

type Profile = {
  id?: string;
  nome?: string;
  tratamento?: string;
  escola?: string;
  cidade?: string;
  uf?: string;
  etapaEnsino?: string;
  foto?: unknown;
  [key: string]: unknown;
};

type Props = {
  perfil: Profile;
  onBack?: () => void;
  onConcluido?: () => void;
  onSalvar: (profile: Profile) => Promise<void> | void;
  onDirtyChange?: (dirty: boolean) => void;
  onTabChange?: (tab: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais') => void;
};

const navItems = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'planejamento', label: 'Planejamento', icon: FileText },
  { id: 'turmas', label: 'Turmas', icon: Users },
  { id: 'arquivos', label: 'Arquivos', icon: FileText },
  { id: 'mais', label: 'Mais', icon: LayoutGrid },
] as const;

const treatments = [
  { value: '', label: 'Sem preferência' },
  { value: 'professora', label: 'Professora' },
  { value: 'professor', label: 'Professor' },
  { value: 'docente', label: 'Docente' },
];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'P';
}

export function ProfileV2({ perfil, onBack = () => undefined, onConcluido = () => undefined, onSalvar, onDirtyChange = () => undefined, onTabChange = () => undefined }: Props) {
  const [draft, setDraft] = React.useState<Profile>({ ...perfil });
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const photoInput = React.useRef<HTMLInputElement>(null);
  const original = React.useRef(JSON.stringify(perfil || {}));
  const avatarSrc = typeof draft.foto === 'string' ? draft.foto : Ss(draft.foto, { convertFileSrc: Capacitor.convertFileSrc });
  const displayName = draft.nome?.trim() || 'Seu nome';

  React.useEffect(() => {
    onDirtyChange(JSON.stringify(draft) !== original.current);
    return () => onDirtyChange(false);
  }, [draft, onDirtyChange]);

  const update = (key: keyof Profile, value: string) => setDraft((current) => ({ ...current, [key]: value }));

  const choosePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === 'string' && setDraft((current) => ({ ...current, foto: reader.result }));
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const save = async () => {
    if (!draft.nome?.trim()) {
      setMessage('Informe seu nome para continuar.');
      return;
    }
    setSaving(true);
    setMessage('');
    let savedMedia: unknown = null;
    try {
      const previousPhoto = perfil.foto;
      if (typeof draft.foto === 'string' && draft.foto.startsWith('data:')) {
        savedMedia = await saveMedia({ dataUrl: draft.foto, tipo: 'foto', proprietarioId: perfil.id, id: 'professor' });
      }
      const next = {
        ...perfil,
        ...draft,
        foto: savedMedia || draft.foto,
        nome: draft.nome.trim(),
        escola: draft.escola?.trim() || '',
        cidade: draft.cidade?.trim() || '',
        uf: draft.uf?.trim().toUpperCase() || '',
        atualizadoEm: new Date().toISOString(),
      };
      await onSalvar(next);
      if (previousPhoto && typeof previousPhoto === 'object' && (next.foto as { path?: string } | undefined)?.path !== (previousPhoto as { path?: string }).path) {
        await deleteMedia(previousPhoto).catch(() => undefined);
      }
      setDraft(next);
      original.current = JSON.stringify(next);
      setMessage('Perfil salvo com sucesso.');
      onDirtyChange(false);
      onConcluido();
    } catch {
      if (savedMedia) await deleteMedia(savedMedia).catch(() => undefined);
      setMessage('Não foi possível salvar agora. Seus dados continuam nesta tela.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="v2-root v2-profile" aria-labelledby="profile-v2-title">
      <div className="v2-screen v2-profile__screen">
        <header className="v2-profile__header">
          <button className="v2-profile__back v2-pressable" type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={25} /></button>
          <div><span className="v2-eyebrow">SEU CONTEXTO</span><h1 id="profile-v2-title">Perfil profissional</h1><p>Seu jeito de ensinar começa aqui.</p></div>
        </header>

        <section className="v2-profile__identity" aria-label="Identidade do perfil">
          <button className="v2-profile__avatar v2-pressable" type="button" onClick={() => photoInput.current?.click()} aria-label="Alterar foto do perfil">
            {avatarSrc ? <img src={avatarSrc} alt="" /> : <span>{initials(displayName)}</span>}
            <span className="v2-profile__camera"><Camera size={17} /></span>
          </button>
          <div><span className="v2-eyebrow">PROFESSORA</span><h2>{displayName}</h2><p>{draft.escola?.trim() || 'Adicione sua escola para personalizar o app'}</p></div>
        </section>

        <section className="v2-profile__section" aria-labelledby="profile-name-heading">
          <div className="v2-profile__section-head"><div><span className="v2-eyebrow">COMO DEVEMOS CHAMAR VOCÊ?</span><h2 id="profile-name-heading">Sua identificação</h2></div><span className="v2-profile__step">01</span></div>
          <label className="v2-profile__field"><span>Nome completo</span><input value={draft.nome || ''} onChange={(event) => update('nome', event.target.value)} placeholder="Ex.: Marina Souza" autoComplete="name" /></label>
          <fieldset className="v2-profile__treatment"><legend>Tratamento</legend><div>{treatments.map((item) => <button key={item.value || 'none'} className={`v2-profile__choice v2-pressable${draft.tratamento === item.value ? ' is-selected' : ''}`} type="button" aria-pressed={draft.tratamento === item.value} onClick={() => update('tratamento', item.value)}>{item.label}</button>)}</div></fieldset>
        </section>

        <section className="v2-profile__section" aria-labelledby="profile-work-heading">
          <div className="v2-profile__section-head"><div><span className="v2-eyebrow">SEU DIA A DIA</span><h2 id="profile-work-heading">Onde você ensina</h2></div><span className="v2-profile__step">02</span></div>
          <label className="v2-profile__field"><span>Escola</span><input value={draft.escola || ''} onChange={(event) => update('escola', event.target.value)} placeholder="Nome da escola" autoComplete="organization" /></label>
          <div className="v2-profile__field-row"><label className="v2-profile__field"><span>Cidade</span><input value={draft.cidade || ''} onChange={(event) => update('cidade', event.target.value)} placeholder="Sua cidade" autoComplete="address-level2" /></label><label className="v2-profile__field v2-profile__field--uf"><span>UF</span><input maxLength={2} value={draft.uf || ''} onChange={(event) => update('uf', event.target.value.toUpperCase())} placeholder="SP" autoComplete="address-level1" /></label></div>
          <label className="v2-profile__field"><span>Etapa de ensino</span><input value={draft.etapaEnsino || ''} onChange={(event) => update('etapaEnsino', event.target.value)} placeholder="Ex.: Ensino Fundamental" /></label>
        </section>

        <div className={`v2-profile__feedback${message.includes('sucesso') ? ' is-success' : message ? ' is-error' : ''}`} role={message ? 'status' : undefined} aria-live="polite">{message && (message.includes('sucesso') ? <Check size={18} /> : null)}<span>{message}</span></div>
        <button className="v2-profile__save v2-primary-action v2-pressable" type="button" onClick={save} disabled={saving}>{saving ? <span className="v2-profile__spinner" aria-hidden="true" /> : <Save size={20} />}{saving ? 'Salvando perfil…' : 'Salvar perfil'}</button>
        <input ref={photoInput} className="v2-profile__photo-input" type="file" accept="image/*" capture="user" onChange={choosePhoto} aria-label="Selecionar foto do perfil" />

        <nav className="v2-profile__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-profile__nav-item v2-pressable${id === 'mais' ? ' is-selected' : ''}`} aria-current={id === 'mais' ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} /><span>{label}</span></button>)}</nav>
      </div>
    </main>
  );
}
