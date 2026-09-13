import { useEffect, useState } from "react";
import { CalendarCheck, ClipboardList, Crown, Users } from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { Notice } from "../components/Controls";
import {
  loadSubscriptionInterest,
  saveSubscriptionInterest,
} from "../data/subscriptionRepository";
import { getSubscriptionBilling } from "../data/subscriptionBilling";
import type { SubscriptionPlan } from "../domain/subscription";
import type {
  BillingAvailability,
  SubscriptionOffer,
} from "../domain/subscriptionBilling";

type Props = { onBack: () => void; goTo?: (route: string) => void };

const benefits = [
  {
    Icon: CalendarCheck,
    title: "Planeje com clareza",
    description: "Planos, objetivos e BNCC no mesmo fluxo.",
  },
  {
    Icon: Users,
    title: "Acompanhe suas turmas",
    description: "Chamada e registros reunidos por turma.",
  },
  {
    Icon: ClipboardList,
    title: "Registros organizados",
    description: "Observações e arquivos fáceis de reencontrar.",
  },
];

export function SubscriptionScreen({ onBack, goTo }: Props) {
  const [plan, setPlan] = useState<SubscriptionPlan>("gratuito");
  const [hasActivePro, setHasActivePro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [billingLoading, setBillingLoading] = useState(true);
  const [billingAvailability, setBillingAvailability] =
    useState<BillingAvailability>("preview");
  const [offers, setOffers] = useState<SubscriptionOffer[]>([]);
  const [selectedOfferId, setSelectedOfferId] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const billing = getSubscriptionBilling();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadSubscriptionInterest()
      .then((savedPlan) => {
        if (!cancelled) setPlan(savedPlan);
      })
      .catch(() =>
        setErrorMessage(
          "Não foi possível carregar sua preferência neste aparelho.",
        ),
      )
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Store calls are intentionally independent from local UI boot. A slow or
    // offline store must not hide the free plan or block the back button.
    const availabilityRequest = billing.getAvailability();
    const offersRequest = billing.getOffers();
    billing
      .getCurrentPlan()
      .then((currentPlan) => {
        if (!cancelled && currentPlan === "pro") {
          setHasActivePro(true);
          setPlan(currentPlan);
        }
      })
      .catch(() => undefined);
    availabilityRequest
      .then((availability) => {
        if (!cancelled) setBillingAvailability(availability);
      })
      .catch(() => {
        if (!cancelled) setBillingAvailability("unavailable");
      });
    offersRequest
      .then((availableOffers) => {
        if (cancelled) return;
        setOffers(availableOffers);
        setSelectedOfferId(availableOffers[0]?.id ?? "");
      })
      .catch(() => {
        if (!cancelled) setBillingAvailability("unavailable");
      });
    Promise.allSettled([availabilityRequest, offersRequest]).then(() => {
      if (!cancelled) setBillingLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [billing]);

  const choose = async (value: SubscriptionPlan) => {
    setMessage("");
    setErrorMessage("");
    setActionLoading(true);
    try {
      if (value === "pro" && offers.length > 0 && selectedOfferId) {
        const result = await billing.purchase(selectedOfferId);
        if (result.cancelled) {
          setMessage("Compra cancelada. Você continua no plano gratuito.");
          return;
        }
        await saveSubscriptionInterest(result.plan);
        setPlan(result.plan);
        setHasActivePro(result.plan === "pro");
        setMessage(
          result.plan === "pro"
            ? "Assinatura Pro ativada neste aparelho."
            : "A compra foi concluída, mas o Pro ainda não está ativo.",
        );
        return;
      }
      await saveSubscriptionInterest(value);
      setPlan(value);
      setMessage(
        value === "pro"
          ? "Interesse pelo Pro salvo. Avisaremos quando ele estiver disponível na loja."
          : "Plano gratuito selecionado neste aparelho.",
      );
    } catch {
      setErrorMessage(
        "Não foi possível salvar sua preferência. Tente novamente.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const restore = async () => {
    setMessage("");
    setErrorMessage("");
    setActionLoading(true);
    try {
      const result = await billing.restore();
      await saveSubscriptionInterest(result.plan);
      setPlan(result.plan);
      setHasActivePro(result.plan === "pro");
      setMessage(
        result.plan === "pro"
          ? "Compra restaurada. O Pro está ativo neste aparelho."
          : "Nenhuma assinatura Pro ativa foi encontrada.",
      );
    } catch {
      setErrorMessage("Não foi possível restaurar a compra. Tente novamente.");
    } finally {
      setActionLoading(false);
    }
  };

  const hasLiveOffers = offers.length > 0;
  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
  const selectedOfferHasTrial = Boolean(selectedOffer?.trialDays);
  const selectedOfferIsLifetime = selectedOffer?.kind === "vitalicio";
  const canRestorePurchase =
    !billingLoading && billingAvailability !== "preview";
  const offerBadge = billingLoading
    ? "Verificando"
    : hasLiveOffers
      ? "Disponível agora"
      : billingAvailability === "unavailable"
        ? "Indisponível"
        : "Em breve";

  return (
    <section className="paywall-page">
      <ScreenHeader
        title="Seu plano"
        subtitle="Mais tempo para ensinar"
        onBack={onBack}
      />
      <div className="module-content paywall-content">
        {message && <Notice>{message}</Notice>}
        {errorMessage && <Notice error>{errorMessage}</Notice>}
        {loading ? (
          <Notice>Carregando plano…</Notice>
        ) : (
          <>
            <header className="paywall-hero" aria-labelledby="paywall-title">
              <div className="paywall-hero-icon" aria-hidden="true">
                <Crown size={28} strokeWidth={2.2} />
              </div>
              <span className="paywall-eyebrow">ASSISTENTE PEDAGÓGICO PRO</span>
              <h2 id="paywall-title">Deixe a rotina mais leve.</h2>
              <p>
                Uma prévia dos recursos que estamos preparando para liberar mais
                tempo para o que importa: ensinar.
              </p>
            </header>

            <article className="paywall-offer-card">
              <div className="paywall-offer-heading">
                <div>
                  <span>Próximo acesso</span>
                  <strong>Assistente Pro</strong>
                </div>
                <span className="paywall-offer-badge">{offerBadge}</span>
              </div>
              {hasLiveOffers ? (
                <>
                  <div
                    className="paywall-live-offers"
                    aria-label="Planos disponíveis"
                  >
                    {offers.map((offer) => (
                      <button
                        className={`paywall-live-offer ${selectedOfferId === offer.id ? "selected" : ""}`}
                        type="button"
                        key={offer.id}
                        aria-pressed={selectedOfferId === offer.id}
                        onClick={() => setSelectedOfferId(offer.id)}
                      >
                        <span>
                          <strong>{offer.title}</strong>
                          <small>
                            {offer.trialDays
                              ? `Teste grátis por ${offer.trialDays} ${offer.trialDays === 1 ? "dia" : "dias"} · depois por ${offer.period}`
                              : offer.kind === "vitalicio"
                                ? "Compra única · acesso vitalício"
                                : `Assinatura · por ${offer.period}`}
                          </small>
                        </span>
                        <b>{offer.price}</b>
                      </button>
                    ))}
                  </div>
                  <p className="helper-text">
                    O valor exibido é o definido pela loja para este aparelho.
                  </p>
                  <button
                    className="ui-button ui-button-primary press-fx touch-target"
                    type="button"
                    disabled={actionLoading || hasActivePro}
                    onClick={() => void choose("pro")}
                  >
                    {actionLoading
                      ? "Abrindo a loja…"
                      : hasActivePro
                        ? "Pro ativo"
                        : selectedOfferHasTrial
                        ? "Começar teste grátis"
                        : selectedOfferIsLifetime
                          ? "Comprar acesso vitalício"
                          : "Assinar Pro"}
                  </button>
                  <button
                    className="paywall-restore-button press-fx touch-target"
                    type="button"
                    disabled={actionLoading}
                    onClick={() => void restore()}
                  >
                    Restaurar compra
                  </button>
                </>
              ) : (
                <>
                  <div className="paywall-offer-price">
                    {billingLoading
                      ? "Verificando disponibilidade da loja…"
                      : billingAvailability === "unavailable"
                        ? "A loja não está disponível neste dispositivo"
                        : "Disponível na loja em breve"}
                  </div>
                  <p className="helper-text">
                    {billingLoading
                      ? "Você já pode continuar no gratuito enquanto verificamos as opções disponíveis."
                      : "Ainda não há cobrança nem compra nesta versão. Salve seu interesse e você poderá acompanhar a chegada do Pro."}
                  </p>
                  <button
                    className="ui-button ui-button-primary press-fx touch-target"
                    type="button"
                    disabled={actionLoading}
                    onClick={() => void choose("pro")}
                  >
                    {hasActivePro
                      ? "Pro ativo"
                      : plan === "pro"
                        ? "Interesse salvo"
                        : "Quero conhecer o Pro"}
                  </button>
                  {canRestorePurchase && (
                    <div className="paywall-restore-note">
                      <span>Já comprou o Pro?</span>
                      <button
                        className="paywall-restore-button press-fx touch-target"
                        type="button"
                        disabled={actionLoading}
                        onClick={() => void restore()}
                      >
                        Restaurar compra
                      </button>
                    </div>
                  )}
                </>
              )}
            </article>

            <section aria-labelledby="paywall-benefits-title">
              <h3 id="paywall-benefits-title" className="paywall-section-title">
                O que o Pro organiza
              </h3>
              <div className="paywall-benefit-grid">
                {benefits.map(({ Icon, title, description }) => (
                  <article className="paywall-benefit" key={title}>
                    <span className="paywall-benefit-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </article>
                ))}
              </div>
            </section>

            <div className="paywall-free-option">
              <p className="paywall-free-note">
                O plano gratuito continua disponível, sem cobrança e com os
                recursos essenciais.
              </p>
              <button
                className="secondary-button paywall-free-button press-fx touch-target"
                type="button"
                disabled={actionLoading}
                onClick={() => void choose("gratuito")}
              >
                {plan === "gratuito"
                  ? "Continuar no gratuito"
                  : "Continuar com gratuito"}
              </button>
            </div>

            <p className="paywall-legal">
              {hasLiveOffers
                ? selectedOfferIsLifetime
                  ? "A compra única é processada pela loja do seu aparelho. Consulte o preço e as condições antes de confirmar."
                  : "A assinatura é processada pela loja do seu aparelho. Consulte o período, a renovação e as condições antes de confirmar."
                : "Quando a loja estiver conectada, mostraremos preço, período, renovação e restauração de compra antes de qualquer pagamento."}
            </p>
            {goTo && (
              <button
                className="text-button paywall-legal-link touch-target"
                type="button"
                onClick={() => goTo("termos")}
              >
                Ver termos e privacidade
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
