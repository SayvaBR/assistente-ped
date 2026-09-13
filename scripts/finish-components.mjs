import fs from 'node:fs';
import { parse } from '@babel/parser';
import generatorModule from '@babel/generator';
const generate=generatorModule.default;
const path='src/core/recovered.js';
const ast=parse(fs.readFileSync(path,'utf8'),{sourceType:'module'});
ast.program.body=ast.program.body.filter(n=>!(n.type==='FunctionDeclaration'&&['Input','SearchInput','ScreenHeader'].includes(n.id.name)));
fs.writeFileSync(path,`import { Input, TimeInput as SearchInput } from '../components/Fields';\nimport { ScreenHeader } from '../components/ScreenHeader';\n`+generate(ast).code);
