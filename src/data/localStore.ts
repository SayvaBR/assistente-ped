import type { StoragePort } from "../domain/models";

/** Central adapter preserves the recovered storage contract and its optional provider. */
function provider(): StoragePort | undefined {
  return (window as unknown as { storage?: StoragePort }).storage;
}
export const storage: StoragePort = {
  async get(key) {
    if (provider()) return provider()!.get(key);
    const value = localStorage.getItem(key);
    if (value === null) throw new Error("Registro não encontrado");
    return { value };
  },
  async set(key, value) {
    if (provider()) return provider()!.set(key, value);
    localStorage.setItem(key, value);
  },
  async delete(key) {
    if (provider()) return provider()!.delete(key);
    localStorage.removeItem(key);
  },
  async list(prefix) {
    if (provider()) return provider()!.list(prefix);
    return {
      keys: Object.keys(localStorage).filter((key) => key.startsWith(prefix)),
    };
  },
};
export async function readJson<T>(
  key: string,
  fallback: T,
  port: StoragePort = storage,
): Promise<T> {
  const { keys } = await port.list(key);
  if (!keys.includes(key)) return structuredClone(fallback);
  const entry = await port.get(key);
  try {
    return JSON.parse(entry.value) as T;
  } catch {
    throw new Error(
      "Não foi possível ler os dados salvos. Restaure um backup ou tente novamente.",
    );
  }
}
export function writeJson(
  key: string,
  value: unknown,
  port: StoragePort = storage,
) {
  return port.set(key, JSON.stringify(value));
}
export function entityId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}
