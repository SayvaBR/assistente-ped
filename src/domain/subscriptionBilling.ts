import type { SubscriptionPlan } from "./subscription";

export type BillingAvailability = "preview" | "ready" | "unavailable";

export type SubscriptionOfferKind = "pro" | "vitalicio";

export type SubscriptionOffer = {
  id: string;
  kind: SubscriptionOfferKind;
  title: string;
  price: string;
  period: string;
  trialDays?: number;
};

export type BillingResult = {
  plan: SubscriptionPlan;
  cancelled?: boolean;
};

/**
 * Boundary for App Store / Google Play billing.
 * The UI depends on this contract, never on a store SDK directly.
 */
export type SubscriptionBilling = {
  getAvailability: () => Promise<BillingAvailability>;
  getOffers: () => Promise<SubscriptionOffer[]>;
  getCurrentPlan: () => Promise<SubscriptionPlan>;
  purchase: (offerId: string) => Promise<BillingResult>;
  restore: () => Promise<BillingResult>;
};
