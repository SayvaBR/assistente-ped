import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpenCheck } from 'lucide-react';
import { Button, Screen, useReducedMotion } from '../design-system';

export function SplashScreenV2({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const done = useRef(onDone); done.current = onDone;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const duration = reduced ? 320 : 1300;
    const started = performance.now(); let frame = 0;
    const tick = (now: number) => { const value = Math.min(100, Math.round(((now - started) / duration) * 100)); setProgress(value); if (value < 100) frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick); const timer = window.setTimeout(() => done.current(), duration);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [reduced]);
  return <Screen variant="narrative" className="v2-splash-screen" aria-label="Abrindo Assistente Pedagógico">
    <div className="v2-splash-topline"><span>Sayva</span><ArrowUpRight aria-hidden="true" /></div>
    <div className="v2-splash-center"><div className="v2-splash-mark"><BookOpenCheck aria-hidden="true" /></div><span className="v2-overline">ASSISTENTE PEDAGÓGICO</span><h1>Organize o que importa<br />para ensinar bem.</h1><p>Seu espaço de trabalho docente, com clareza para o próximo passo.</p><div className="v2-splash-progress" role="progressbar" aria-label="Preparando o aplicativo" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div></div>
    <div className="v2-splash-footer"><span>Preparando seu espaço local</span><strong>{progress}%</strong></div>
  </Screen>;
}
