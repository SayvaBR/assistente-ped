import {
  ArrowLeft,
  BookOpenCheck,
  Check,
  ChevronRight,
  CircleStop,
  FileText,
  Frown,
  House,
  LayoutGrid,
  LoaderCircle,
  Meh,
  Mic,
  Search,
  Trash2,
  Users,
  Smile,
} from 'lucide-react';
import * as React from 'react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './observation-v2.css';

export type ObservationV2Student = {
  id: string;
  name: string;
  color?: string;
};

export type ObservationV2Payload = {
  humor: number | null;
  texto: string;
  audioDataUrl?: string | null;
};

type ObservationV2Props = {
  students: ObservationV2Student[];
  selectedStudentId?: string;
  className?: string;
  activeTab?: 'inicio' | 'planejamento' | 'turmas' | 'arquivos' | 'mais';
  onBack?: () => void;
  onChangeStudent?: () => void;
  onSelectStudent?: (studentId: string) => void;
  onSave?: (studentId: string, payload: ObservationV2Payload) => Promise<void> | void;
  onTabChange?: (tab: ObservationV2Props['activeTab']) => void;
  onDirtyChange?: (dirty: boolean) => void;
};

const navItems = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'planejamento', label: 'Planejamento', icon: BookOpenCheck },
  { id: 'turmas', label: 'Turmas', icon: Users },
  { id: 'arquivos', label: 'Arquivos', icon: FileText },
  { id: 'mais', label: 'Mais', icon: LayoutGrid },
] as const;

const moods = [
  { value: 0, label: 'Foi bem', helper: 'Participou e avançou', icon: Smile, tone: 'positive' },
  { value: 1, label: 'Em processo', helper: 'Observe mais um pouco', icon: Meh, tone: 'neutral' },
  { value: 2, label: 'Precisa de apoio', helper: 'Vale acompanhar', icon: Frown, tone: 'attention' },
] as const;

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

function readBlobAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('Não foi possível preparar o áudio.'));
    reader.readAsDataURL(blob);
  });
}

export function ObservationV2({
  students,
  selectedStudentId,
  className = 'Sua turma',
  activeTab = 'turmas',
  onBack = () => undefined,
  onChangeStudent = onBack,
  onSelectStudent = () => undefined,
  onSave = () => undefined,
  onTabChange = () => undefined,
  onDirtyChange = () => undefined,
}: ObservationV2Props) {
  const selectedStudent = students.find((student) => student.id === selectedStudentId);
  const [query, setQuery] = React.useState('');
  const [humor, setHumor] = React.useState<number | null>(null);
  const [texto, setTexto] = React.useState('');
  const [audioDataUrl, setAudioDataUrl] = React.useState<string | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPreparingAudio, setIsPreparingAudio] = React.useState(false);
  const [audioError, setAudioError] = React.useState('');
  const [seconds, setSeconds] = React.useState(0);
  const [saveState, setSaveState] = React.useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveError, setSaveError] = React.useState('');
  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const chunksRef = React.useRef<BlobPart[]>([]);
  const timerRef = React.useRef<number | null>(null);

  const dirty = !selectedStudent ? false : humor !== null || texto.trim().length > 0 || !!audioDataUrl;
  React.useEffect(() => {
    onDirtyChange(dirty && saveState !== 'saved');
  }, [dirty, onDirtyChange, saveState]);

  React.useEffect(() => () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    onDirtyChange(false);
  }, [onDirtyChange]);

  const stopRecording = React.useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    setIsRecording(false);
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const startRecording = async () => {
    setAudioError('');
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setAudioError('A gravação de áudio não é compatível com este aparelho. Você ainda pode salvar uma observação escrita.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((type) => MediaRecorder.isTypeSupported?.(type)) || '';
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType, audioBitsPerSecond: 64000 } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => event.data.size > 0 && chunksRef.current.push(event.data);
      recorder.onstop = async () => {
        setIsPreparingAudio(true);
        try {
          const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
          if (!blob.size) throw new Error('A gravação terminou sem áudio. Tente novamente.');
          setAudioDataUrl(await readBlobAsDataUrl(blob));
        } catch (error) {
          setAudioError(error instanceof Error ? error.message : 'Não foi possível preparar o áudio. Tente novamente.');
        } finally {
          setIsPreparingAudio(false);
        }
      };
      recorder.onerror = () => setAudioError('A gravação foi interrompida pelo aparelho. Tente novamente.');
      streamRef.current = stream;
      recorderRef.current = recorder;
      recorder.start(250);
      setSeconds(0);
      setIsRecording(true);
      timerRef.current = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    } catch (error) {
      const name = error instanceof DOMException ? error.name : '';
      setAudioError(name === 'NotAllowedError' ? 'O microfone está desativado para este aplicativo. Libere a permissão nas configurações do Android e tente novamente.' : 'Não foi possível iniciar a gravação. Tente novamente.');
    }
  };

  const save = async () => {
    if (!selectedStudent || !dirty || isRecording || isPreparingAudio) return;
    setSaveState('saving');
    setSaveError('');
    try {
      await onSave(selectedStudent.id, { humor, texto: texto.trim(), audioDataUrl });
      setSaveState('saved');
      window.setTimeout(onBack, 650);
    } catch (error) {
      setSaveState('error');
      setSaveError(error instanceof Error ? error.message : 'Não foi possível salvar a observação. Seus dados continuam nesta tela.');
    }
  };

  const visibleStudents = students.filter((student) => student.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));

  return (
    <main className="v2-root v2-observation" aria-labelledby="observation-v2-title">
      <div className="v2-screen v2-observation__screen">
        <header className="v2-observation__header">
          <button className="v2-observation__back v2-pressable" type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={25} strokeWidth={2.5} aria-hidden="true" /></button>
          <div>
            <h1 id="observation-v2-title">{selectedStudent ? 'Nova observação' : 'Registrar observação'}</h1>
            <p>{selectedStudent ? selectedStudent.name : 'Escolha um aluno para começar'}</p>
          </div>
        </header>

        {!selectedStudent ? (
          <section className="v2-observation__picker" aria-label="Escolher aluno">
            <div className="v2-observation__intro">
              <Users size={25} aria-hidden="true" />
              <div><strong>De quem você quer guardar o contexto?</strong><p>O registro fica ligado ao histórico do aluno e pode ajudar nos relatórios.</p></div>
            </div>
            <label className="v2-observation__search">
              <Search size={23} aria-hidden="true" />
              <span className="v2-visually-hidden">Buscar aluno</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar aluno..." type="search" />
            </label>
            {visibleStudents.length === 0 ? (
              <div className="v2-observation__empty" role="status"><Users size={30} aria-hidden="true" /><strong>{students.length ? 'Nenhum aluno encontrado' : 'Cadastre um aluno antes de registrar'}</strong><p>{students.length ? 'Confira o nome digitado e tente novamente.' : 'Depois volte aqui para guardar observações da rotina.'}</p></div>
            ) : (
              <div className="v2-observation__student-list">
                {visibleStudents.map((student) => <button key={student.id} className="v2-observation__student-row v2-pressable" type="button" onClick={() => onSelectStudent(student.id)}><span className="v2-observation__avatar" style={{ '--student-color': student.color || 'var(--v2-color-primary)' } as React.CSSProperties} aria-hidden="true">{initials(student.name)}</span><span><strong>{student.name}</strong><small>{className} · Criar registro pedagógico</small></span><ChevronRight size={23} aria-hidden="true" /></button>)}
              </div>
            )}
          </section>
        ) : (
          <>
            <button className="v2-observation__student-context v2-surface v2-pressable" type="button" onClick={onChangeStudent} aria-label="Trocar aluno"><span className="v2-observation__avatar" style={{ '--student-color': selectedStudent.color || 'var(--v2-color-primary)' } as React.CSSProperties} aria-hidden="true">{initials(selectedStudent.name)}</span><span><small>Aluno selecionado</small><strong>{selectedStudent.name}</strong><em>{className}</em></span><ChevronRight size={23} aria-hidden="true" /></button>

            <section className="v2-observation__surface v2-surface" aria-labelledby="observation-mood-title">
              <div className="v2-observation__section-heading"><div><h2 id="observation-mood-title">Como foi a participação hoje?</h2><p>Escolha o sinal que melhor representa o momento.</p></div><span className="v2-observation__step">01</span></div>
              <div className="v2-observation__moods" role="group" aria-label="Humor da participação">
                {moods.map(({ value, label, helper, icon: Icon, tone }) => <button key={value} className={`v2-observation__mood v2-pressable is-${tone}${humor === value ? ' is-selected' : ''}`} type="button" aria-pressed={humor === value} onClick={() => { setHumor(value); setSaveState('idle'); }}><Icon size={25} strokeWidth={2.3} aria-hidden="true" /><strong>{label}</strong><small>{helper}</small></button>)}
              </div>
            </section>

            <section className="v2-observation__surface v2-surface" aria-labelledby="observation-note-title">
              <div className="v2-observation__section-heading"><div><h2 id="observation-note-title">Anotação da aula</h2><p>Registre o que vale lembrar, com suas palavras.</p></div><span className="v2-observation__counter">{texto.length}</span></div>
              <textarea value={texto} onChange={(event) => { setTexto(event.target.value); setSaveState('idle'); }} placeholder="Ex.: participou da conversa e explicou seu raciocínio para a turma..." rows={6} aria-label="Observação livre" />
            </section>

            <section className="v2-observation__surface v2-surface" aria-labelledby="observation-audio-title">
              <div className="v2-observation__section-heading"><div><h2 id="observation-audio-title">Áudio opcional</h2><p>Guarde uma lembrança rápida sem interromper a aula.</p></div><Mic size={22} aria-hidden="true" /></div>
              {!audioDataUrl && !isRecording && !isPreparingAudio && <button className="v2-observation__audio-button v2-pressable" type="button" onClick={startRecording}><Mic size={20} aria-hidden="true" /> Gravar observação em áudio</button>}
              {isRecording && <button className="v2-observation__audio-button is-recording v2-pressable" type="button" onClick={stopRecording}><CircleStop size={20} aria-hidden="true" /> Gravando {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')} · Toque para parar</button>}
              {isPreparingAudio && <p className="v2-observation__audio-status" role="status"><LoaderCircle className="is-spinning" size={19} aria-hidden="true" /> Preparando áudio...</p>}
              {audioDataUrl && !isRecording && <div className="v2-observation__audio-ready"><audio controls src={audioDataUrl} /><button type="button" className="v2-observation__remove-audio v2-pressable" onClick={() => setAudioDataUrl(null)}><Trash2 size={17} aria-hidden="true" /> Excluir e regravar</button></div>}
              {audioError && <p className="v2-observation__inline-error" role="alert">{audioError}</p>}
            </section>

            <section className="v2-observation__save-area" aria-live="polite">
              {saveError && <p className="v2-observation__save-feedback is-error" role="alert">{saveError}</p>}
              {saveState === 'saved' && <p className="v2-observation__save-feedback is-success" role="status"><Check size={17} aria-hidden="true" /> Observação salva no histórico de {selectedStudent.name}.</p>}
              <button className="v2-primary-action v2-observation__save-button v2-pressable" type="button" disabled={!dirty || isRecording || isPreparingAudio || saveState === 'saving' || saveState === 'saved'} onClick={save}>{saveState === 'saving' ? <LoaderCircle className="is-spinning" size={20} aria-hidden="true" /> : <Check size={20} strokeWidth={2.8} aria-hidden="true" />}{saveState === 'saving' ? 'Salvando...' : saveState === 'saved' ? 'Salvo' : 'Salvar observação'}</button>
            </section>
          </>
        )}

        <nav className="v2-observation__bottom-nav" aria-label="Navegação principal">{navItems.map(({ id, label, icon: Icon }) => { const selected = id === activeTab; return <button key={id} type="button" className={`v2-observation__nav-item v2-pressable${selected ? ' is-selected' : ''}`} aria-current={selected ? 'page' : undefined} onClick={() => onTabChange(id)}><Icon size={23} strokeWidth={selected ? 2.8 : 2.2} aria-hidden="true" /><span>{label}</span></button>; })}</nav>
      </div>
    </main>
  );
}
