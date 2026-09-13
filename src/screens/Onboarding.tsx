import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { storage } from "../data/localStore";
const pages = [
  {
    title: "Comece no seu ritmo",
    accent: "Gratuito ou Pro",
    description:
      "Escolha como quer começar. Você pode alterar essa preferência depois nas configurações.",
    y: 240,
    height: 705,
    plan: true,
  },
  {
    title: "Planeje suas aulas",
    accent: "com clareza",
    description:
      "Monte planos, organize objetivos, registre atividades e conecte tudo à BNCC.",
    y: 235,
    height: 715,
  },
  {
    title: "Acompanhe",
    accent: "cada turma",
    description:
      "Faça chamada, registre ocorrências e visualize a rotina do dia com mais praticidade.",
    y: 205,
    height: 830,
  },
  {
    title: "Arquivos",
    accent: "sempre à mão",
    description:
      "Guarde materiais pedagógicos, encontre documentos rápido e mantenha tudo bem organizado.",
    y: 235,
    height: 690,
  },
  {
    title: "Tudo pronto",
    accent: "para começar",
    description:
      "Centralize sua rotina pedagógica, economize tempo e foque no que mais importa: ensinar.",
    y: 230,
    height: 755,
  },
];
export function WelcomeScreen({ onDone }: { onDone: (plan?: string) => void }) {
  const [index, setIndex] = useState(0);
  const [plan, setPlan] = useState("gratuito");
  useEffect(() => {
    storage
      .get("assinatura:interesse")
      .then(({ value }) => setPlan(value === "pro" ? "pro" : "gratuito"))
      .catch(() => {});
  }, []);
  const page = pages[index];
  const finish = async () => {
    await storage.set("assinatura:interesse", plan).catch(() => {});
    onDone(plan);
  };
  const choosePlan = (value: string) => {
    setPlan(value);
    void storage.set("assinatura:interesse", value).catch(() => {});
  };
  return (
    <section className="onboarding">
      <div className="onboarding-top">
        <button
          type="button"
          className="press-fx"
          onClick={() => void finish()}
        >
          Pular
        </button>
      </div>
      <main className="onboarding-content" key={index}>
        {/* Original reference pixels, clipped by layout to the illustration region only. */}
        <div
          className={`reference-art ${index === 0 ? "reference-art-editorial" : ""}`}
          style={{ aspectRatio: `863 / ${page.height}` }}
          aria-hidden="true"
        >
          <img
            src={index === 0 ? "/reference-art/onboarding-editorial-v2.png" : `/reference-art/onboarding-${index + 1}.png`}
            alt=""
            style={{ top: `-${(page.y / page.height) * 100}%` }}
          />
        </div>
        <h1>
          {page.title}
          <span>{page.accent}</span>
        </h1>
        <p>{page.description}</p>
        {page.plan && (
          <div
            className="subscription-choice"
            role="radiogroup"
            aria-label="Escolha de plano"
          >
            <button
              type="button"
              role="radio"
              aria-checked={plan === "gratuito"}
              className={`subscription-card ${plan === "gratuito" ? "selected" : ""}`}
              onClick={() => choosePlan("gratuito")}
            >
              <span className="subscription-card-heading">
                <strong>Gratuito</strong>
                <b>R$ 0</b>
              </span>
              <small>
                Turmas, alunos, chamada, planejamento, BNCC, arquivos e
                relatórios locais.
              </small>
              <span className="subscription-badge">Começar agora</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={plan === "pro"}
              className={`subscription-card ${plan === "pro" ? "selected" : ""}`}
              onClick={() => choosePlan("pro")}
            >
              <span className="subscription-card-heading">
                <strong>Pro</strong>
                <b>Mais recursos</b>
              </span>
              <small>
                Recursos avançados e limites ampliados. A cobrança será
                configurada na publicação da loja.
              </small>
              <span className="subscription-badge">Preferência salva</span>
            </button>
          </div>
        )}
      </main>
      <footer className="onboarding-footer">
        <div
          className="onboarding-dots"
          aria-label={`Apresentação ${index + 1} de 5`}
        >
          {pages.map((p, i) => (
            <button
              key={p.title}
              type="button"
              className="press-fx"
              aria-label={`Ver apresentação ${i + 1}`}
              aria-current={i === index ? "step" : undefined}
              onClick={() => setIndex(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="ui-button ui-button-primary"
          onClick={() => (index === 4 ? void finish() : setIndex(index + 1))}
        >
          {index === 4 ? "Começar agora" : "Continuar"}
          <ArrowRight size={24} />
        </button>
        {index > 0 ? (
          <button
            type="button"
            className="onboarding-secondary"
            onClick={() => setIndex(index - 1)}
          >
            Voltar
          </button>
        ) : (
          <p className="onboarding-local">
            Seu perfil e seus dados ficam neste aparelho.
          </p>
        )}
      </footer>
    </section>
  );
}
