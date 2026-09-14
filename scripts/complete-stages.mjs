import fs from 'node:fs';
import {parse}from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default,generate=generatorModule.default;
const path='src/screens/SetupWizard.js';
let source=fs.readFileSync(path,'utf8').replace('etapaEnsino: "Educação Infantil",\n                perfilId:','etapaEnsino: me.dados.etapaEnsino || "Educação Infantil",\n                perfilId:').replace('g0.map((Be)','levelsFor(b.etapaEnsino).map((Be)');
const ast=parse(source,{sourceType:'module'});
traverse(ast,{ObjectExpression(p){if(!p.node.properties.some(prop=>prop.key?.name==='titulo'&&prop.value?.value==='Educação Infantil está disponível'))return;
 const replacement=parse(`const step={icone:gi,titulo:'Em qual etapa você trabalha?',apoio:'Os planejamentos e a BNCC acompanham sua etapa de ensino.',obrigatorio:!b.etapaEnsino,body:React.createElement('div',{className:'guided-options'},educationStages.map(stage=>React.createElement(Ee,{key:stage,campo:'etapaEnsino',valor:stage,label:stage})))}`).program.body[0].declarations[0].init;p.replaceWith(replacement);p.skip();
}});
fs.writeFileSync(path,`import { educationStages,levelsFor } from '../domain/education';\n`+generate(ast).code);
// Implement all tutorial entries with existing spotlight engine and persistent progress.
const core='src/core/recovered.js';
let text=fs.readFileSync(core,'utf8');
const tutorials={
 'primeira-turma':[{tab:'mais',target:'[data-tour="nav-mais"]',titulo:'Crie uma turma',texto:'Abra Mais → Minhas turmas. Toque em Nova turma e preencha nome, nível ou ano e turno. Salve para começar.'},{tab:'turma',target:'[data-tour="nav-turma"]',titulo:'Cadastre os alunos',texto:'Na turma ativa, abra Alunos → Adicionar aluno. Informe nome e nascimento; foto e responsável são opcionais.'}],
 'primeira-chamada':[{tab:'turma',target:'[data-tour="nav-turma"]',titulo:'Escolha o dia',texto:'Abra a aba Dia na turma e selecione a data da chamada.'},{tab:'turma',target:'[data-tour="nav-turma"]',titulo:'Faça a chamada',texto:'Toque em Fazer chamada. Marque presença, atraso ou falta para cada aluno. Cada toque é salvo automaticamente. Toque na mesma marcação para removê-la.'},{tab:'turma',target:'[data-tour="nav-turma"]',titulo:'Justifique uma ausência',texto:'Ao marcar falta, use Justificar ausência para informar o motivo. O histórico mantém a justificativa associada à data.'}],
 calendario:[{tab:'plano',target:'[data-tour="nav-plano"]',titulo:'Navegue no calendário',texto:'Alterne Dia, Semana e Calendário. Use as setas para navegar entre datas; toque num dia para consultar os planos.'},{tab:'plano',target:'[data-tour="nav-plano"]',titulo:'Crie um compromisso',texto:'Em Compromissos, toque no botão +. Informe título, data e horário. Você pode marcar como concluído ou excluir depois.'}],
 'bncc-plano':[{tab:'plano',target:'[data-tour="novo-plano-dia"]',titulo:'Abra um plano',texto:'Crie ou abra um plano e entre na seção BNCC.'},{tab:'plano',target:'[data-tour="nav-plano"]',titulo:'Escolha as habilidades',texto:'Filtre por etapa e componente, procure pelo código ou palavra-chave e selecione as habilidades. Elas ficam vinculadas ao plano quando você salva.'}],
 registro:[{tab:'turma',target:'[data-tour="nav-turma"]',titulo:'Registre o acompanhamento',texto:'Na turma, use Registros para escrever o diário ou uma ocorrência. No perfil do aluno, adicione observações, fotos e áudios.'},{tab:'turma',target:'[data-tour="nav-turma"]',titulo:'Consulte o histórico',texto:'Os registros ficam associados ao aluno ou ao dia escolhido. Use Histórico para revisar datas anteriores.'}],
 frequencia:[{tab:'turma',target:'[data-tour="nav-turma"]',titulo:'Veja a frequência',texto:'Os cartões dos alunos mostram a frequência registrada. Atrasos contam como comparecimento e dias sem marcação não contam como falta.'},{tab:'mais',target:'[data-tour="nav-mais"]',titulo:'Gere um relatório',texto:'Abra Mais → Relatórios. Escolha turma, aluno ou período; confira os registros e exporte a cópia.'}]
};
text+=`\nObject.assign(Up,${JSON.stringify(tutorials)});\n`;fs.writeFileSync(core,text);
