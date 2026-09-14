import { describe, expect, it } from 'vitest';
import { normalizeProfile, type Profile } from '../src/v2/screens/ProfileV2';

describe('normalizeProfile', () => {
  it('preserves identity fields while normalizing editable text', () => {
    const perfil: Profile = { id: 'teacher-1', nome: 'Marina Souza', tratamento: 'professora' };
    const draft: Profile = { ...perfil, nome: '  Marina Alves  ', escola: ' Escola Horizonte ', cidade: ' São Paulo ', uf: ' sp ' };

    expect(normalizeProfile(perfil, draft, '2026-09-14T12:00:00.000Z')).toMatchObject({
      id: 'teacher-1',
      nome: 'Marina Alves',
      escola: 'Escola Horizonte',
      cidade: 'São Paulo',
      uf: 'SP',
      atualizadoEm: '2026-09-14T12:00:00.000Z',
    });
  });
});
