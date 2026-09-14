import { readJson, writeJson, entityId } from '../data/localStore';
import type { StoragePort } from './models';

export type ActivityStatus = 'rascunho' | 'pronta' | 'arquivada';
export interface TeachingActivity {
  id: string;
  turmaId: string;
  dataKey: string;
  titulo: string;
  objetivo: string;
  instrucoes: string;
  disciplina: string;
  recursos: string;
  status: ActivityStatus;
  criadoEm: string;
  atualizadoEm: string;
}

const keyFor = (turmaId: string) => {
  if (!turmaId || !/^[a-zA-Z0-9_-]+$/.test(turmaId)) throw new Error('Selecione uma turma válida.');
  return `turma:${turmaId}:atividades`;
};

export function newTeachingActivity({ turmaId, dataKey }: { turmaId: string; dataKey: string }): TeachingActivity {
  const now = new Date().toISOString();
  return { id: entityId('atividade'), turmaId, dataKey, titulo: '', objetivo: '', instrucoes: '', disciplina: '', recursos: '', status: 'rascunho', criadoEm: now, atualizadoEm: now };
}

export async function listActivities(turmaId: string, port: StoragePort): Promise<TeachingActivity[]> {
  const values = await readJson<unknown>(keyFor(turmaId), [], port);
  if (!Array.isArray(values)) throw new Error('As atividades salvas não puderam ser lidas.');
  return values.filter((value): value is TeachingActivity => Boolean(value && typeof value === 'object' && (value as TeachingActivity).id && (value as TeachingActivity).turmaId === turmaId));
}

export async function saveActivity(activity: TeachingActivity, port: StoragePort): Promise<TeachingActivity[]> {
  if (!activity.titulo.trim()) throw new Error('Informe um título para a atividade.');
  if (!activity.instrucoes.trim()) throw new Error('Descreva como a atividade será realizada.');
  const current = await listActivities(activity.turmaId, port);
  const next = [...current.filter((item) => item.id !== activity.id), { ...activity, titulo: activity.titulo.trim(), instrucoes: activity.instrucoes.trim(), atualizadoEm: new Date().toISOString() }];
  await writeJson(keyFor(activity.turmaId), next, port);
  return next;
}
