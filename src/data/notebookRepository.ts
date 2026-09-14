import { readJson, writeJson, storage } from './localStore';
import type { StoragePort } from '../domain/models';
import { validateNotebookEntry, type Notebook, type NotebookEntry } from '../domain/notebook';
const queues = new WeakMap<StoragePort,Map<string,Promise<unknown>>>();
function key(classId:string) {
  if (!/^[\w-]+$/.test(classId)) throw new Error('Selecione uma turma válida.');
  return `turma:${classId}:caderno:v1`;
}
export async function loadNotebook(classId:string,port:StoragePort=storage):Promise<Notebook> {
  const data = await readJson<Notebook>(key(classId),{versao:1,entradas:[]},port);
  if (data?.versao!==1 || !Array.isArray(data.entradas)) throw new Error('Não foi possível ler o caderno. Os registros foram preservados.');
  for (const entry of data.entradas) validateNotebookEntry(entry,classId);
  if(new Set(data.entradas.map(e=>e.id)).size!==data.entradas.length) throw new Error('O caderno contém identificadores duplicados.');
  return data;
}
/** Read inside the write queue so separate entries cannot overwrite each other. */
export function saveNotebookEntry(entry:NotebookEntry,port:StoragePort=storage):Promise<Notebook> {
  validateNotebookEntry(entry,entry.turmaId);
  const target=key(entry.turmaId);
  let pending=queues.get(port);
  if(!pending) { pending=new Map(); queues.set(port,pending); }
  const write=(pending.get(target)||Promise.resolve()).catch(()=>{}).then(async()=>{
    const current=await loadNotebook(entry.turmaId,port);
    const old=current.entradas.find(e=>e.id===entry.id);
    if(old && old.revisao!==entry.revisao) throw new Error('Este registro foi alterado em outra tela. Reabra a versão salva antes de editar.');
    const saved={...entry,titulo:entry.titulo.trim(),tags:[...new Set(entry.tags.map(t=>t.trim()).filter(Boolean))],revisao:(old?.revisao||0)+1,atualizadoEm:new Date().toISOString()};
    const next:Notebook={...current,entradas:old?current.entradas.map(e=>e.id===entry.id?saved:e):[saved,...current.entradas]};
    await writeJson(target,next,port);
    return next;
  });
  pending.set(target,write);
  return write;
}
