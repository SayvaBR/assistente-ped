import { describe, expect, it } from 'vitest';
import { decryptBackup, encryptBackup, isEncryptedBackup } from '../src/data/secureBackup';

describe('Backup manual protegido', () => {
  const plain = JSON.stringify({
    formato: 'assistente-pedagogico-backup',
    versao: 2,
    registros: [{ chave: 'perfil', valor: '{"nome":"Ana"}' }],
    arquivos: [],
  });

  it('cifra e decifra o backup com a senha correta', async () => {
    const encrypted = await encryptBackup(plain, 'senha-segura-123');

    expect(isEncryptedBackup(encrypted)).toBe(true);
    expect(encrypted).not.toContain(plain);
    expect(await decryptBackup(encrypted, 'senha-segura-123')).toBe(plain);
  });

  it('rejeita senha curta e senha incorreta', async () => {
    await expect(encryptBackup(plain, 'curta')).rejects.toThrow('8 caracteres');
    const encrypted = await encryptBackup(plain, 'senha-segura-123');
    await expect(decryptBackup(encrypted, 'senha-errada')).rejects.toThrow('senha');
  });

  it('rejeita envelope incompatível ou corrompido', async () => {
    expect(isEncryptedBackup('{"formato":"outro"}')).toBe(false);
    await expect(decryptBackup('{"formato":"assistente-pedagogico-backup-cifrado"}', 'senha-segura-123')).rejects.toThrow('inválido');
  });
});

