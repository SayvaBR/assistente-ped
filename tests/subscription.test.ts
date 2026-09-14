import { describe, expect, it } from "vitest";
import type { StoragePort } from "../src/domain/models";
import {
  loadSubscriptionInterest,
  saveSubscriptionInterest,
} from "../src/data/subscriptionRepository";

function memoryStorage(initial: Record<string, string> = {}): StoragePort {
  const values = new Map(Object.entries(initial));
  return {
    async get(key) {
      const value = values.get(key);
      if (value === undefined) throw new Error("Registro não encontrado");
      return { value };
    },
    async set(key, value) {
      values.set(key, value);
    },
    async delete(key) {
      values.delete(key);
    },
    async list(prefix) {
      return { keys: [...values.keys()].filter((key) => key.startsWith(prefix)) };
    },
  };
}

describe("subscriptionRepository", () => {
  it("trata a ausência de preferência como plano gratuito", async () => {
    await expect(loadSubscriptionInterest(memoryStorage())).resolves.toBe("gratuito");
  });

  it("persiste apenas a preferência de interesse do paywall", async () => {
    const port = memoryStorage();
    await saveSubscriptionInterest("pro", port);
    await expect(loadSubscriptionInterest(port)).resolves.toBe("pro");
  });
});
