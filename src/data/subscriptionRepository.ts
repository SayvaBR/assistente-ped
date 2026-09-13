import type { StoragePort } from "../domain/models";
import {
  normalizeSubscriptionPlan,
  type SubscriptionPlan,
} from "../domain/subscription";
import { storage } from "./localStore";

const INTEREST_KEY = "assinatura:interesse";

function isMissingRecord(error: unknown) {
  return error instanceof Error && /não encontrado/i.test(error.message);
}

export async function loadSubscriptionInterest(
  port: StoragePort = storage,
): Promise<SubscriptionPlan> {
  try {
    const { value } = await port.get(INTEREST_KEY);
    return normalizeSubscriptionPlan(value);
  } catch (error) {
    if (isMissingRecord(error)) return "gratuito";
    throw error;
  }
}

export function saveSubscriptionInterest(
  plan: SubscriptionPlan,
  port: StoragePort = storage,
) {
  return port.set(INTEREST_KEY, plan);
}
