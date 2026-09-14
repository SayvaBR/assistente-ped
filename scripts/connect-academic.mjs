import fs from 'node:fs';
function edit(file,fn){const path=`src/${file}`;fs.writeFileSync(path,fn(fs.readFileSync(path,'utf8')));}
edit('core/recovered.js',s=>`import { storage } from '../data/localStore';\n`+s.slice(0,s.indexOf('const storage = {'))+s.slice(s.indexOf('function createId(',s.indexOf('const storage = {'))));
edit('screens/App.js',s=>{
 s=`import { stageFrom } from '../domain/education';\nimport { AcademicScreen } from './AcademicScreen';\nimport { OrganizationScreen } from './OrganizationScreen';\n`+s;
 s=s.replace('../screens/ClassesScreen.js','../screens/ClassManager').replace('../screens/ReportsScreen.js','../screens/ReportBuilder');
 s=s.replace('professorId: sr.id,','professorId: sr.id,\n            etapa: stageFrom(ae.etapaEnsino),\n            componentesCurriculares: [],\n            duracaoAulaMin: 50,');
 s=s.replace('onEditar: Ho,','onEditar: Ho,\n          turma: M,');
 s=s.replace('turmas: se,','goTo: zt,\n                                        turmas: se,');
 s=s.replace('(Re == null ? void 0 : Re.name) === "perfil"\n      ?',`(Re?.name === 'academico' && M) ? (ht = React.createElement(AcademicScreen, {onBack:_t,turma:M,alunos:Za,studentId:Re.data?.studentId,goTo:zt,onDirtyChange:pe}))
      : Re?.name === 'organizacao' ? (ht = React.createElement(OrganizationScreen, {onBack:_t}))
      : (Re == null ? void 0 : Re.name) === "perfil"\n      ?`);
 return s;
});
edit('screens/MoreScreen.js',s=>s.replace('["Minhas Turmas", to, "gerenciar-turmas"],','["Minhas Turmas", to, "gerenciar-turmas"],\n        ["Escolas e anos letivos", to, "organizacao"],').replace('["BNCC", gi, "bncc"],','["BNCC", gi, "bncc"],\n        ["Notas e avaliações", gi, "academico"],\n        ["Relatórios", gi, "relatorios"],'));
edit('screens/ClassScreen.js',s=>{
 s=`import { capabilitiesFor } from '../domain/education';\n`+s;
 s=s.replace('React.createElement(U0, {','React.createElement(U0, {\n            turma: turma,');
 s=s.replace('React.createElement(\n      "div",\n      {\n        style: {\n          padding: 16,',`capabilitiesFor(turma).needsStage && React.createElement('div', {className:'module-content'}, React.createElement('p', {className:'notice'}, 'Escolha a etapa desta turma para ajustar os recursos. Seus registros serão preservados.'), React.createElement('button', {className:'secondary-button',onClick:()=>goTo('gerenciar-turmas')}, 'Configurar etapa')),
    capabilitiesFor(turma).notas && React.createElement('div',{className:'module-content'},React.createElement('button',{className:'secondary-button',onClick:()=>goTo('academico')},'Notas e avaliações')),
    React.createElement(\n      "div",\n      {\n        style: {\n          padding: 16,`);
 return s;
});
edit('screens/U0.js',s=>`import { capabilitiesFor } from '../domain/education';\n`+s.replace('alunos: alunos,\n  goTo:', 'alunos: alunos,\n  turma,\n  goTo:').replace('yt > 0 &&','capabilitiesFor(turma).rotina && yt > 0 &&').replace('React.createElement(\n      Accordion,\n      {\n        titulo: "Rotina do Dia",','capabilitiesFor(turma).rotina && React.createElement(\n      Accordion,\n      {\n        titulo: "Rotina do Dia",'));
edit('screens/StudentScreen.js',s=>`import { capabilitiesFor } from '../domain/education';\n`+s.replace('crianca: crianca,\n  onBack:', 'crianca: crianca,\n  turma,\n  onBack:').replace('E === "perfil" &&','capabilitiesFor(turma).notas && React.createElement("button",{className:"secondary-button",onClick:()=>goTo("academico",{studentId:crianca.id})},"Notas e desempenho"),\n      E === "perfil" &&'));
