import { useMemo } from 'react';
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

function EmptyHomeTarget() {
  return (
    <main className="v2-root v2-preview-empty">
      <section className="v2-preview-empty__content" aria-labelledby="v2-preview-title">
        <span className="v2-preview-kicker">V2 VISUAL LAB</span>
        <h1 className="v2-title" id="v2-preview-title">Home V2</h1>
        <p>
          Substitua este placeholder pela implementação clean-room da Home. O target visual aprovado deve ser reproduzido aqui antes de integrar profundamente a navegação legado.
        </p>
        <p>
          390 px é apenas o viewport-âncora para comparação com o target. A tela final precisa se adaptar à matriz Android sem cortar conteúdo essencial.
        </p>
        <code>src/v2/screens/HomeV2.tsx</code>
      </section>
    </main>
  );
}

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
          <EmptyHomeTarget />
        </div>
      </div>
    </div>
  );
}
