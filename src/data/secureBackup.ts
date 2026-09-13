const ENCRYPTED_FORMAT = 'assistente-pedagogico-backup-cifrado';
const ENVELOPE_VERSION = 1;
const ITERATIONS = 310_000;
const SALT_BYTES = 16;
const IV_BYTES = 12;

type EncryptedBackupEnvelope = {
  formato: typeof ENCRYPTED_FORMAT;
  versao: typeof ENVELOPE_VERSION;
  algoritmo: 'AES-GCM';
  kdf: 'PBKDF2-SHA-256';
  iteracoes: number;
  salt: string;
  iv: string;
  dados: string;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bufferSource(bytes: Uint8Array): BufferSource {
  return bytes as unknown as BufferSource;
}

function webCrypto(): Crypto {
  if (!globalThis.crypto?.subtle || !globalThis.crypto.getRandomValues) {
    throw new Error('A criptografia deste aparelho não está disponível.');
  }
  return globalThis.crypto;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('Backup cifrado inválido.');
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function assertPassword(password: string): void {
  if (typeof password !== 'string' || password.length < 8) {
    throw new Error('Crie uma senha com pelo menos 8 caracteres para proteger o backup.');
  }
}

function parseEnvelope(value: string): EncryptedBackupEnvelope {
  let envelope: Partial<EncryptedBackupEnvelope>;
  try {
    envelope = JSON.parse(value) as Partial<EncryptedBackupEnvelope>;
  } catch {
    throw new Error('Backup cifrado inválido.');
  }

  if (
    envelope.formato !== ENCRYPTED_FORMAT ||
    envelope.versao !== ENVELOPE_VERSION ||
    envelope.algoritmo !== 'AES-GCM' ||
    envelope.kdf !== 'PBKDF2-SHA-256' ||
    envelope.iteracoes !== ITERATIONS ||
    typeof envelope.salt !== 'string' ||
    typeof envelope.iv !== 'string' ||
    typeof envelope.dados !== 'string'
  ) {
    throw new Error('Backup cifrado inválido ou incompatível.');
  }

  const salt = base64UrlToBytes(envelope.salt);
  const iv = base64UrlToBytes(envelope.iv);
  const dados = base64UrlToBytes(envelope.dados);
  if (salt.length !== SALT_BYTES || iv.length !== IV_BYTES || dados.length === 0) {
    throw new Error('Backup cifrado inválido ou corrompido.');
  }

  return envelope as EncryptedBackupEnvelope;
}

async function deriveKey(password: string, salt: Uint8Array, usages: KeyUsage[]): Promise<CryptoKey> {
  const crypto = webCrypto();
  const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: bufferSource(salt), iterations: ITERATIONS, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    usages,
  );
}

export function isEncryptedBackup(value: string | unknown): boolean {
  if (typeof value !== 'string') return false;
  try {
    return JSON.parse(value)?.formato === ENCRYPTED_FORMAT;
  } catch {
    return false;
  }
}

export async function encryptBackup(plainText: string, password: string): Promise<string> {
  assertPassword(password);
  if (typeof plainText !== 'string' || plainText.length === 0) {
    throw new Error('Não foi possível proteger um backup vazio.');
  }

  const crypto = webCrypto();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(password, salt, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: bufferSource(iv) }, key, encoder.encode(plainText));
  const envelope: EncryptedBackupEnvelope = {
    formato: ENCRYPTED_FORMAT,
    versao: ENVELOPE_VERSION,
    algoritmo: 'AES-GCM',
    kdf: 'PBKDF2-SHA-256',
    iteracoes: ITERATIONS,
    salt: bytesToBase64Url(salt),
    iv: bytesToBase64Url(iv),
    dados: bytesToBase64Url(new Uint8Array(encrypted)),
  };
  return JSON.stringify(envelope, null, 2);
}

export async function decryptBackup(encryptedText: string, password: string): Promise<string> {
  assertPassword(password);
  const envelope = parseEnvelope(encryptedText);
  try {
    const crypto = webCrypto();
    const key = await deriveKey(password, base64UrlToBytes(envelope.salt), ['decrypt']);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: bufferSource(base64UrlToBytes(envelope.iv)) },
      key,
      bufferSource(base64UrlToBytes(envelope.dados)),
    );
    return decoder.decode(decrypted);
  } catch {
    throw new Error('A senha não confere ou o backup está corrompido.');
  }
}
