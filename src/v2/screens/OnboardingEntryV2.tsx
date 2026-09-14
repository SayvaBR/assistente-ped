import { ArrowRight, BookOpenCheck, CalendarDays, Check, ClipboardList, UsersRound } from 'lucide-react';
import '@fontsource/fredoka/600.css';
import '../styles/foundation.css';
import './onboarding-entry-v2.css';

type Props = {
  onContinue: () => void;
  onSkip?: () => void;
  state?: 'default' | 'error';
};

export function OnboardingEntryV2({ onContinue, onSkip = onContinue, state = 'default' }: Props) {
  return (
    <main className="v2-root v2-entry" aria-labelledby="onboarding-entry-title">
      <div className="v2-entry__screen">
        <header className="v2-entry__top">
          <span className="v2-entry__brand"><BookOpenCheck size={18} aria-hidden="true" /> Assistente <b>Pedagógico</b></span>
          <button type="button" className="v2-entry__skip v2-pressable" onClick={onSkip}>Responder depois</button>
        </header>

        <div className="v2-entry__progress" aria-label="Entrada do Assistente Pedagógico">
          <span className="v2-entry__progress-line"><i /></span>
          <small>SEU ESPAÇO · 01/04</small>
        </div>

        {state === 'error' && (
          <p className="v2-entry__error" role="alert">
            <span aria-hidden="true">!</span>
            Não conseguimos carregar uma preferência agora. Você pode começar mesmo assim.
          </p>
        )}

        <section className="v2-entry__content">
          <div className="v2-entry__workspace" aria-label="Prévia do espaço de trabalho">
            <div className="v2-entry__workspace-label"><span>UM ESPAÇO FEITO PARA A ESCOLA</span><i /></div>
            <div className="v2-entry__workspace-stage">
              <article className="v2-entry__object v2-entry__object--plan" aria-hidden="true">
                <span className="v2-entry__object-icon"><CalendarDays size={19} /></span>
                <small>PLANEJAMENTO</small>
                <strong>Aula de hoje</strong>
                <span className="v2-entry__plan-line v2-entry__plan-line--long" /><span className="v2-entry__plan-line" />
                <b>08:00 · Matemática</b>
              </article>
              <article className="v2-entry__object v2-entry__object--lesson" aria-hidden="true">
                <div className="v2-entry__lesson-head"><span className="v2-entry__object-icon"><ClipboardList size={17} /></span><small>EM FOCO</small><b>•••</b></div>
                <strong>Frações equivalentes</strong>
                <span>5º Ano A · Sala 1</span>
                <div className="v2-entry__lesson-status"><Check size={12} /> Chamada pronta</div>
              </article>
              <article className="v2-entry__object v2-entry__object--attendance" aria-hidden="true">
                <div className="v2-entry__attendance-title"><UsersRound size={17} /><strong>Presença</strong></div>
                <div className="v2-entry__attendance-row"><i className="is-present" /><span>Presentes</span><b>18</b></div>
                <div className="v2-entry__attendance-row"><i className="is-pending" /><span>Pendentes</span><b>2</b></div>
              </article>
              <span className="v2-entry__workspace-dot v2-entry__workspace-dot--one" /><span className="v2-entry__workspace-dot v2-entry__workspace-dot--two" />
            </div>
          </div>

          <div className="v2-entry__copy">
            <span className="v2-eyebrow">ANTES DA PRIMEIRA AULA</span>
            <h1 id="onboarding-entry-title">Vamos montar seu assistente para a sua rotina.</h1>
            <p>Algumas escolhas rápidas deixam a Home, o planejamento e as turmas mais úteis para você.</p>
          </div>

          <div className="v2-entry__consequence">
            <span><Check size={16} aria-hidden="true" /></span>
            <p><strong>Poucas escolhas. Home, atalhos e planejamento do seu jeito.</strong><small>Começamos pelo que mais importa no seu dia.</small></p>
          </div>
        </section>

        <footer className="v2-entry__footer">
          <button type="button" className="v2-primary-action v2-entry__continue v2-pressable" onClick={onContinue}>
            Preparar meu assistente <ArrowRight size={20} aria-hidden="true" />
          </button>
          <p>Leva menos de um minuto · seus dados ficam neste aparelho.</p>
        </footer>
      </div>
    </main>
  );
}
