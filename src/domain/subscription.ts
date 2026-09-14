export type SubscriptionPlan = "gratuito" | "pro";

export function normalizeSubscriptionPlan(value: string | null | undefined): SubscriptionPlan {
  return value === "pro" ? "pro" : "gratuito";
}
