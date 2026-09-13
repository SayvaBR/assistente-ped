import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { vp } from './files.js';
export async function openNotebookAttachment(document: {path:string;mime:string;nome:string;[key:string]:unknown}) {
  if (!/^midia\/[\w./-]+$/.test(document.path) || document.path.split('/').includes('..'))
    throw new Error('O caminho do anexo é inválido.');
  if(Capacitor.isNativePlatform()) {
    const {uri}=await Filesystem.getUri({path:document.path,directory:Directory.Data});
    await vp({...document,uri});
  } else {
    const {data}=await Filesystem.readFile({path:document.path,directory:Directory.Data});
    const file=typeof data==='string'?new Blob([Uint8Array.from(atob(data),c=>c.charCodeAt(0))],{type:document.mime}):data;
    const url=URL.createObjectURL(file);
    const link=window.document.createElement('a');link.href=url;link.download=document.nome;link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
}
