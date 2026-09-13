import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpenCheck, Check, Circle } from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './splash-v2.css';

type Props = { onDone: () => void; autoAdvance?: boolean };

export function SplashV2({ onDone, autoAdvance = true }: Props) {
  const done = useRef(onDone);
  const [progress, setProgress] = useState(0);
  done.current = onDone;
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 450 : 1800;
    if (!autoAdvance) {
      setProgress(74);
      return undefined;
    }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const value = Math.min(100, Math.round(((now - started) / duration) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => done.current(), duration);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, [autoAdvance]);

  const status = progress < 35 ? 'Abrindo seu espaço de trabalho…' : progress < 80 ? 'Carregando seus dados locais…' : 'Tudo pronto para começar…';
  return <main className="v2-root v2-splash" role="status" aria-label="Abrindo Assistente Pedagógico"><div className="v2-splash__screen">
    <div className="v2-splash__top"><span><BookOpenCheck size={18} /> Assistente <b>Pedagógico</b></span><span className="v2-splash__version">ANDROID · 1.0</span></div>
    <section className="v2-splash__center"><div className="v2-splash__mark" aria-hidden="true"><span className="v2-splash__orbit v2-splash__orbit--one" /><span className="v2-splash__orbit v2-splash__orbit--two" /><span className="v2-splash__book"><BookOpenCheck size={58} strokeWidth={1.8} /></span><i className="v2-splash__spark v2-splash__spark--one" /><i className="v2-splash__spark v2-splash__spark--two" /><i className="v2-splash__spark v2-splash__spark--three" /></div><span className="v2-eyebrow">SEU ESPAÇO DE TRABALHO</span><h1>Assistente<br /><span>Pedagógico</span></h1><p>Mais tempo para ensinar<br />o que realmente importa.</p><div className="v2-splash__principles" aria-label="Princípios do aplicativo"><span><Check size={13} /> Planejar</span><span><Check size={13} /> Acompanhar</span><span><Check size={13} /> Transformar</span></div></section>
    <footer className="v2-splash__footer"><div className="v2-splash__progress" role="progressbar" aria-label="Preparando o aplicativo" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div><div className="v2-splash__status"><small>{status}</small><b>{progress}%</b></div>{!autoAdvance && <button type="button" className="v2-primary-action v2-splash__enter v2-pressable" onClick={onDone}>Entrar no aplicativo <ArrowRight size={19} /></button>}<div className="v2-splash__dots" aria-hidden="true"><Circle size={7} fill="currentColor" /><Circle size={7} /><Circle size={7} /><Circle size={7} /></div></footer>
  </div></main>;
}
