import { useMemo } from 'react';
import { HomeV2, type HomeV2Data } from '../screens/HomeV2';
import '../styles/foundation.css';
import './v2-preview.css';

const widths = [320, 360, 390, 412, 432, 480, 600] as const;
type PreviewWidth = (typeof widths)[number];

function readWidth(): PreviewWidth {
  const value = Number(new URLSearchParams(window.location.search).get('width'));
  return widths.includes(value as PreviewWidth) ? (value as PreviewWidth) : 390;
}

function setPreviewWidth(width: PreviewWidth) {
  const url = new URL(window.location.href);
  url.searchParams.set('width', String(width));
  window.history.replaceState({}, '', url);
  window.location.reload();
}

const homePreviewData: HomeV2Data = {
  teacherName: 'Marina',
  dateLabel: 'Terça-feira, 16 de setembro',
  classLabel: '5º ano B',
  classMeta: 'Ensino Fundamental',
  lesson: {
    status: 'Chamada pendente',
    subject: 'Matemática',
    theme: 'Frações equivalentes',
    detail: 'Observe, registre e converse sobre diferentes formas de representar a mesma parte.',
    schedule: '07h30 — 08h20',
    room: 'Sala 12',
    code: 'EF05MA03',
  },
  agenda: [
    { time: '07h30', title: 'Matemática — 5º B', detail: 'Frações equivalentes', tone: 'primary' },
    { time: '09h20', title: 'Conselho de classe', detail: 'Sala dos professores', tone: 'warning' },
    { time: '10h10', title: 'Português — 4º A', detail: 'Leitura compartilhada', tone: 'neutral' },
    { time: '13h00', title: 'Reunião com responsável', detail: 'Família do Théo', tone: 'success' },
  ],
  pendingCount: 1,
};

export function V2Preview() {
  const width = useMemo(readWidth, []);
  const screen = new URLSearchParams(window.location.search).get('v2-preview') || 'home';

  return (
    <div className="v2-preview-shell">
      <header className="v2-preview-toolbar">
        <strong>Assistente Pedagógico · V2 Visual Lab</strong>
        <span className="v2-preview-toolbar__screen">{screen}</span>
        <div className="v2-preview-toolbar__widths" aria-label="Larguras Android de preview">
          {widths.map((item) => (
            <button
              className={item === width ? 'is-active' : undefined}
              key={item}
              onClick={() => setPreviewWidth(item)}
              type="button"
              aria-pressed={item === width}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <div className="v2-preview-stage">
        <div className="v2-preview-device" style={{ width }} data-preview-width={width}>
          <HomeV2 data={homePreviewData} />
        </div>
      </div>
    </div>
  );
}
