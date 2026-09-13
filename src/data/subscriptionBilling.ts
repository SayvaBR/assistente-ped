import { Capacitor } from "@capacitor/core";
import {
  Purchases,
  type PurchasesPackage,
} from "@revenuecat/purchases-capacitor";
import type { SubscriptionPlan } from "../domain/subscription";
import type {
  BillingAvailability,
  BillingResult,
  SubscriptionBilling,
  SubscriptionOffer,
  SubscriptionOfferKind,
} from "../domain/subscriptionBilling";

const apiKey = (import.meta.env.VITE_REVENUECAT_API_KEY ?? "").trim();
const entitlementId =
  (import.meta.env.VITE_REVENUECAT_PRO_ENTITLEMENT ?? "pro").trim() || "pro";
const isNativeStore = Capacitor.getPlatform() !== "web";

let configured = false;
let configurationRequest: Promise<boolean> | null = null;
let cachedPackages = new Map<string, PurchasesPackage>();

function isProActive(customerInfo: { entitlements: { active: Record<string, unknown> } }) {
  return Boolean(customerInfo.entitlements.active[entitlementId]);
}

function periodLabel(period: string | null, kind: SubscriptionOfferKind) {
  if (kind === "vitalicio") return "acesso único";
  switch (period) {
    case "P1W":
      return "semana";
    case "P1M":
      return "mês";
    case "P3M":
      return "trimestre";
    case "P6M":
      return "semestre";
    case "P1Y":
      return "ano";
    default:
      return "período";
  }
}

function mapPackage(aPackage: PurchasesPackage): SubscriptionOffer {
  const { product } = aPackage;
  const kind: SubscriptionOfferKind =
    aPackage.packageType === "LIFETIME" ? "vitalicio" : "pro";
  const introPrice = product.introPrice;
  const trialDays =
    introPrice?.price === 0 && introPrice.periodUnit === "DAY"
      ? introPrice.periodNumberOfUnits
      : undefined;

  return {
    id: aPackage.identifier,
    kind,
    title: product.title,
    price: product.priceString,
    period: periodLabel(product.subscriptionPeriod, kind),
    ...(trialDays ? { trialDays } : {}),
  };
}

async function ensureConfigured() {
  if (!isNativeStore || !apiKey) return false;
  if (configured) return true;
  if (!configurationRequest) {
    configurationRequest = Purchases.configure({ apiKey })
      .then(() => {
        configured = true;
        return true;
      })
      .catch((error) => {
        configurationRequest = null;
        throw error;
      });
  }
  return configurationRequest;
}

async function loadPackages() {
  if (!(await ensureConfigured())) return [];
  const offerings = await Purchases.getOfferings();
  const packages = offerings.current?.availablePackages ?? [];
  cachedPackages = new Map(packages.map((aPackage) => [aPackage.identifier, aPackage]));
  return packages;
}

function wasCancelled(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "userCancelled" in error &&
    Boolean(error.userCancelled)
  );
}

/**
 * RevenueCat adapter for native builds. Web and unconfigured builds stay in
 * preview mode, so development never shows invented prices or fake purchases.
 */
export const revenueCatSubscriptionBilling: SubscriptionBilling = {
  async getAvailability(): Promise<BillingAvailability> {
    if (!(await ensureConfigured())) return "preview";
    try {
      const { canMakePayments } = await Purchases.canMakePayments();
      if (!canMakePayments) return "unavailable";
      return (await loadPackages()).length > 0 ? "ready" : "unavailable";
    } catch {
      return "unavailable";
    }
  },
  async getOffers(): Promise<SubscriptionOffer[]> {
    const packages = await loadPackages();
    return packages.map(mapPackage);
  },
  async getCurrentPlan(): Promise<SubscriptionPlan> {
    if (!(await ensureConfigured())) return "gratuito";
    const { customerInfo } = await Purchases.getCustomerInfo();
    return isProActive(customerInfo) ? "pro" : "gratuito";
  },
  async purchase(offerId: string): Promise<BillingResult> {
    if (!(await ensureConfigured())) return { plan: "gratuito", cancelled: true };
    const aPackage = cachedPackages.get(offerId);
    if (!aPackage) throw new Error("A oferta selecionada não está mais disponível.");

    try {
      const { customerInfo } = await Purchases.purchasePackage({ aPackage });
      return { plan: isProActive(customerInfo) ? "pro" : "gratuito" };
    } catch (error) {
      if (wasCancelled(error)) return { plan: "gratuito", cancelled: true };
      throw error;
    }
  },
  async restore(): Promise<BillingResult> {
    if (!(await ensureConfigured())) return { plan: "gratuito" };
    const { customerInfo } = await Purchases.restorePurchases();
    return { plan: isProActive(customerInfo) ? "pro" : "gratuito" };
  },
};

export function getSubscriptionBilling(): SubscriptionBilling {
  return revenueCatSubscriptionBilling;
}
