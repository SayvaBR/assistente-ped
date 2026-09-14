import { describe, expect, it } from "vitest";
import { getSubscriptionBilling } from "../src/data/subscriptionBilling";

describe("preview subscription billing", () => {
  it("does not advertise offers before store configuration", async () => {
    const billing = getSubscriptionBilling();

    await expect(billing.getAvailability()).resolves.toBe("preview");
    await expect(billing.getOffers()).resolves.toEqual([]);
  });

  it("never turns the preview CTA into a fake purchase", async () => {
    const billing = getSubscriptionBilling();
    const result = await billing.purchase("pro");

    expect(result).toEqual({ plan: "gratuito", cancelled: true });
    await expect(billing.getCurrentPlan()).resolves.toBe("gratuito");
  });
});
