import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { OnboardingEntryV2 } from '../screens/OnboardingEntryV2';
import './ui-lab.css';

type LabState = 'default' | 'error';
type LabWidth = 360 | 412 | 480;

export function UiLab() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [screen, setScreen] = useState(params.get('screen') || 'onboarding-entry');
  const [state, setState] = useState<LabState>(params.get('state') === 'error' ? 'error' : 'default');
  const requestedWidth = Number(params.get('width'));
  const [width, setWidth] = useState<LabWidth>(requestedWidth === 360 ? 360 : requestedWidth === 480 ? 480 : 412);
  const [textScale, setTextScale] = useState(params.get('scale') || '100');
  const [reducedMotion, setReducedMotion] = useState(params.get('motion') === 'reduced');

  const updateUrl = (key: string, value: string) => {
    const next = new URL(window.location.href);
    next.searchParams.set(key, value);
    window.history.replaceState({}, '', next);
  };

  return (
    <main className="ui-lab">
      <header className="ui-lab__header">
        <div><span>DEV ONLY</span><h1>Assistente · UI Lab</h1><p>Composição rápida, sem atravessar o aplicativo.</p></div>
        <a href="/" aria-label="Sair do UI Lab">Sair</a>
      </header>
      <section className="ui-lab__controls" aria-label="Controles do UI Lab">
        <label>Screen<select value={screen} onChange={(event) => { setScreen(event.target.value); updateUrl('screen', event.target.value); }}><option value="onboarding-entry">Onboarding Entry V2</option></select></label>
        <label>State<select value={state} onChange={(event) => { const value = event.target.value as LabState; setState(value); updateUrl('state', value); }}><option value="default">Default</option><option value="error">Erro recuperável</option></select></label>
        <label>Viewport<select value={width} onChange={(event) => { const value = Number(event.target.value) as LabWidth; setWidth(value); updateUrl('width', String(value)); }}><option value={360}>360px · compacto</option><option value={412}>412px · âncora</option><option value={480}>480px · amplo</option></select></label>
        <label>Texto<select value={textScale} onChange={(event) => { setTextScale(event.target.value); updateUrl('scale', event.target.value); }}><option value="100">100%</option><option value="115">115%</option><option value="130">130%</option><option value="150">150%</option></select></label>
        <label className="ui-lab__switch"><input type="checkbox" checked={reducedMotion} onChange={(event) => { setReducedMotion(event.target.checked); updateUrl('motion', event.target.checked ? 'reduced' : 'full'); }} /> Reduced Motion</label>
      </section>
      <section className="ui-lab__stage" aria-label="Render da superfície">
        <div className="ui-lab__device" style={{ width, '--v2-text-scale': Number(textScale) / 100 } as CSSProperties} data-reduced-motion={reducedMotion} data-screen={screen}>
          <OnboardingEntryV2 state={state} onContinue={() => setState('default')} onSkip={() => setState('default')} />
        </div>
      </section>
    </main>
  );
}
