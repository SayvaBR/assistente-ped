import { useEffect, useRef } from 'react';
import { ArrowRight, BookOpenCheck, LoaderCircle } from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './splash-v2.css';

type Props = { onDone: () => void; autoAdvance?: boolean };

export function SplashV2({ onDone, autoAdvance = true }: Props) {
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 450 : 1800;
    if (!autoAdvance) return undefined;
    const timer = window.setTimeout(() => done.current(), duration);
    return () => window.clearTimeout(timer);
  }, [autoAdvance]);

  const status = autoAdvance ? 'Preparando seu espaço de trabalho…' : 'A inicialização está em andamento…';
  return <main className="v2-root v2-splash" role="status" aria-busy="true" aria-label="Abrindo Assistente Pedagógico"><div className="v2-splash__screen">
    <header className="v2-splash__top"><span className="v2-splash__wordmark"><span className="v2-splash__wordmark-icon" aria-hidden="true"><BookOpenCheck size={18} strokeWidth={2.2} /></span><span>Assistente <b>Pedagógico</b></span></span><span className="v2-splash__top-note">clareza para ensinar</span></header>
    <section className="v2-splash__center" aria-label="Identidade do aplicativo"><div className="v2-splash__hero"><div className="v2-splash__mark" aria-hidden="true"><span className="v2-splash__orbit" /><span className="v2-splash__book"><BookOpenCheck size={55} strokeWidth={1.9} /></span><i className="v2-splash__spark v2-splash__spark--one" /><i className="v2-splash__spark v2-splash__spark--two" /></div><span className="v2-splash__hero-label">Seu espaço de trabalho</span><h1>Assistente<br /><span>Pedagógico</span></h1><p>Mais tempo para ensinar<br />o que realmente importa.</p></div></section>
    <footer className="v2-splash__footer"><div className="v2-splash__loading" role="progressbar" aria-label="Preparando o aplicativo"><span /></div><div className="v2-splash__status"><small><LoaderCircle size={14} aria-hidden="true" />{status}</small></div>{!autoAdvance && <button type="button" className="v2-primary-action v2-splash__enter v2-pressable" onClick={onDone}>Continuar <ArrowRight size={19} aria-hidden="true" /></button>}</footer>
  </div></main>;
}
