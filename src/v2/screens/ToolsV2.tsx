import { useEffect, useMemo, useState } from 'react';
import { Calculator, Clock3, Delete, Flashlight, Pause, Play, RotateCcw, Timer, ArrowLeft } from 'lucide-react';
import { Torch } from '@capawesome/capacitor-torch';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './tools-v2.css';

type ToolId = 'timer' | 'cronometro' | 'calculadora' | 'lanterna';
type Props = { onBack: () => void };
type CalculatorOperator = '+' | '−' | '×' | '÷';

const DEFAULT_TIMER_DURATION = 5 * 60 * 1000;

const tools: { id: ToolId; label: string; icon: typeof Timer; detail: string }[] = [
  { id: 'timer', label: 'Temporizador', icon: Timer, detail: 'Marque o ritmo da atividade' },
  { id: 'cronometro', label: 'Cronômetro', icon: Clock3, detail: 'Conte o tempo da turma' },
  { id: 'calculadora', label: 'Calculadora', icon: Calculator, detail: 'Faça uma conta rápida' },
  { id: 'lanterna', label: 'Lanterna', icon: Flashlight, detail: 'Ilumine um cantinho' },
];

export function formatTime(value: number, stopwatch: boolean) {
  const safeValue = Math.max(0, value);
  const totalSeconds = Math.floor(safeValue / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((safeValue % 1000) / 100);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}${stopwatch ? `.${tenths}` : ''}`;
}

export function calculateResult(operator: CalculatorOperator, left: number, right: number) {
  const result = operator === '+' ? left + right : operator === '−' ? left - right : operator === '×' ? left * right : right === 0 ? Number.NaN : left / right;
  return Number.isFinite(result) ? result : null;
}

export function ToolsV2({ onBack }: Props) {
  const [tool, setTool] = useState<ToolId>('timer');
  const [timerPreset, setTimerPreset] = useState(DEFAULT_TIMER_DURATION);
  const [duration, setDuration] = useState(DEFAULT_TIMER_DURATION);
  const [elapsed, setElapsed] = useState(DEFAULT_TIMER_DURATION);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [clearOnInput, setClearOnInput] = useState(false);
  const [torchAvailable, setTorchAvailable] = useState<boolean | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    void Torch.isAvailable().then(({ available }) => { if (mounted) setTorchAvailable(available); }).catch(() => { if (mounted) setTorchAvailable(false); });
    return () => { mounted = false; void Torch.disable().catch(() => undefined); };
  }, []);

  useEffect(() => {
    if (!running || startedAt === null) return undefined;
    const interval = window.setInterval(() => {
      const passed = Date.now() - startedAt;
      const next = tool === 'timer' ? Math.max(0, duration - passed) : duration + passed;
      setElapsed(next);
      if (tool === 'timer' && next === 0) { setDuration(0); setRunning(false); setStartedAt(null); }
    }, 100);
    return () => window.clearInterval(interval);
  }, [duration, running, startedAt, tool]);

  const activeTool = useMemo(() => tools.find((item) => item.id === tool) || tools[0], [tool]);
  const switchTool = (next: ToolId) => {
    setRunning(false); setStartedAt(null); setError(''); setTool(next);
    if (next === 'timer') { setTimerPreset(DEFAULT_TIMER_DURATION); setDuration(DEFAULT_TIMER_DURATION); setElapsed(DEFAULT_TIMER_DURATION); }
    if (next === 'cronometro') { setDuration(0); setElapsed(0); }
    if (next === 'calculadora') { setDisplay('0'); setStored(null); setOperator(null); setClearOnInput(false); }
  };
  const toggleClock = () => {
    if (running) {
      const passed = startedAt === null ? 0 : Date.now() - startedAt;
      setDuration(tool === 'timer' ? Math.max(0, duration - passed) : duration + passed);
      setElapsed(tool === 'timer' ? Math.max(0, duration - passed) : duration + passed);
      setRunning(false); setStartedAt(null);
    } else if (tool !== 'timer' || elapsed > 0) {
      setStartedAt(Date.now()); setRunning(true);
    }
  };
  const resetClock = () => { setRunning(false); setStartedAt(null); const next = tool === 'timer' ? timerPreset : 0; setDuration(next); setElapsed(next); };
  const calculate = (key: string) => {
    setError('');
    if (/^\d$/.test(key)) { setDisplay((value) => clearOnInput || value === '0' ? key : `${value}${key}`.slice(0, 14)); setClearOnInput(false); return; }
    if (key === ',') { setDisplay((value) => clearOnInput ? '0,' : value.includes(',') ? value : `${value},`); setClearOnInput(false); return; }
    if (key === 'C') { setDisplay('0'); setStored(null); setOperator(null); setClearOnInput(false); return; }
    if (key === '⌫') { setDisplay((value) => value.length > 1 ? value.slice(0, -1) : '0'); return; }
    if (key === '±') { setDisplay((value) => value.startsWith('-') ? value.slice(1) : value === '0' ? value : `-${value}`); return; }
    if (key === '%') { setDisplay(String(Number(display.replace(',', '.')) / 100).replace('.', ',')); return; }
    const current = Number(display.replace(',', '.'));
    if (key === '=') {
      if (stored === null || !operator) return;
      const result = calculateResult(operator as CalculatorOperator, stored, current);
      if (result === null) { setError('Não é possível dividir por zero.'); setDisplay('0'); } else setDisplay(String(Number(result.toFixed(8))).replace('.', ','));
      setStored(null); setOperator(null); setClearOnInput(true); return;
    }
    if (['+', '−', '×', '÷'].includes(key)) { setStored(current); setOperator(key); setClearOnInput(true); }
  };
  const toggleTorch = async () => { setError(''); try { if (torchOn) await Torch.disable(); else await Torch.enable(); setTorchOn((value) => !value); } catch { setError('Não foi possível controlar a lanterna neste aparelho.'); } };
  const calculatorKeys = ['C', '±', '%', '⌫', '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', ',', '=', '+'];

  return <main className="v2-root v2-tools"><div className="v2-screen v2-tools__screen">
    <header className="v2-tools__header"><button type="button" className="v2-tools__back v2-pressable" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23} /></button><div><span className="v2-eyebrow">PARA A SALA</span><h1>Ferramentas</h1><p>Recursos rápidos para o momento da aula.</p></div><span className="v2-tools__mark"><Timer size={22} /></span></header>
    <nav className="v2-tools__tabs" aria-label="Ferramentas de sala">{tools.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={`v2-tools__tab v2-pressable${tool === id ? ' is-active' : ''}`} aria-pressed={tool === id} onClick={() => switchTool(id)}><Icon size={19} /><span>{label}</span></button>)}</nav>
    <p className="v2-tools__context"><strong>{activeTool.label}</strong><span>{activeTool.detail}</span></p>
    {(tool === 'timer' || tool === 'cronometro') && <section className="v2-tools__clock v2-surface"><div className="v2-tools__clock-label">{tool === 'timer' ? 'TEMPO RESTANTE' : 'TEMPO DECORRIDO'}</div>{tool === 'timer' && !running && <div className="v2-tools__presets">{[1, 5, 10, 15].map((minutes) => <button type="button" className={`v2-tools__preset v2-pressable${timerPreset === minutes * 60 * 1000 ? ' is-active' : ''}`} key={minutes} onClick={() => { setTimerPreset(minutes * 60 * 1000); setDuration(minutes * 60 * 1000); setElapsed(minutes * 60 * 1000); }}>{minutes} min</button>)}</div>}<output className="v2-tools__time" aria-live="polite">{formatTime(elapsed, tool === 'cronometro')}</output>{tool === 'timer' && elapsed === 0 && <p className="v2-tools__finished" role="status">Tempo encerrado</p>}<div className="v2-tools__clock-actions"><button type="button" className="v2-tools__secondary v2-pressable" onClick={resetClock}><RotateCcw size={18} />Zerar</button><button type="button" className="v2-primary-action v2-tools__primary v2-pressable" onClick={toggleClock} disabled={tool === 'timer' && elapsed === 0}>{running ? <><Pause size={18} />Pausar</> : <><Play size={18} />Iniciar</>}</button></div></section>}
    {tool === 'calculadora' && <section className="v2-tools__calculator v2-surface"><output className="v2-tools__display" aria-label={`Resultado ${display}`}>{display}</output><div className="v2-tools__keypad">{calculatorKeys.map((key) => <button type="button" className={`v2-tools__key v2-pressable${['÷', '×', '−', '+', '='].includes(key) ? ' is-operator' : ''}`} key={key} aria-label={key === '⌫' ? 'Apagar último dígito' : key} onClick={() => calculate(key)}>{key === '⌫' ? <Delete size={20} /> : key}</button>)}</div>{error && <p className="v2-tools__error" role="alert">{error}</p>}</section>}
    {tool === 'lanterna' && <section className="v2-tools__torch v2-surface"><span className={`v2-tools__torch-icon${torchOn ? ' is-on' : ''}`}><Flashlight size={42} /></span><h2>{torchOn ? 'Lanterna ligada' : 'Lanterna desligada'}</h2><p>{torchAvailable === false ? 'Este aparelho não informou uma lanterna disponível.' : 'Use a luz traseira do aparelho sem sair do aplicativo.'}</p><button type="button" className="v2-primary-action v2-tools__primary v2-pressable" onClick={() => void toggleTorch()} disabled={!torchAvailable}>{torchOn ? 'Desligar lanterna' : 'Ligar lanterna'}<Flashlight size={18} /></button>{error && <p className="v2-tools__error" role="alert">{error}</p>}</section>}
  </div></main>;
}
