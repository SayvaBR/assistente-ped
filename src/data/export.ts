import {Capacitor} from '@capacitor/core';
import {Filesystem,Directory,Encoding} from '@capacitor/filesystem';
import {Share} from '@capacitor/share';
export async function exportText(filename:string,text:string,mime='text/plain') {
  if(Capacitor.isNativePlatform()) {
    const result=await Filesystem.writeFile({path:filename,data:text,directory:Directory.Cache,encoding:Encoding.UTF8});
    await Share.share({title:'Assistente Pedagógico',files:[result.uri],dialogTitle:'Salvar ou compartilhar relatório'});
  } else {
    const url=URL.createObjectURL(new Blob([text],{type:mime+';charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
}
