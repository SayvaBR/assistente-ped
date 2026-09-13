import fs from 'node:fs';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import { format } from 'prettier';
const traverse=traverseModule.default, generate=generatorModule.default;
const replacements={'#4FA3E3':'#1CB0F6','#2E7FC1':'#1899D6','#E8F4FC':'#EAF6FD','#F7F6FB':'#F7F7FB','#2E2B3A':'#102A56','#8A8894':'#6F7280','#716E7B':'#6F7280','#E5E2EE':'#D9E6EF','#6FCF97':'#57C995','#E6635C':'#EB6A6A','#F2A65A':'#F1B65F'};
for(const folder of ['src/core','src/screens','src/components','src/data'])for(const file of fs.readdirSync(folder).filter(x=>x.endsWith('.js'))){
 const path=`${folder}/${file}`;let text=fs.readFileSync(path,'utf8');
 for(const [old,val] of Object.entries(replacements))text=text.replaceAll(old,val);
 if(file==='App.js')text=`import { setSoundEnabled } from '../core/recovered.js';\n`+text.replaceAll('(Iu = qe)','setSoundEnabled(Boolean(qe))').replaceAll('(Iu = ae)','setSoundEnabled(Boolean(ae))');
 if(file==='recovered.js')text=text.replace('const Ps = "0.2.0"','const Ps = "0.3.0"').replace('let Iu = !0;','let Iu = !0;\nexport function setSoundEnabled(enabled) { Iu = enabled; }').replace('y = f0(u, o.white, f)','y = Gu(u)').replace('primaryLight: Ro(o.white, y, f ? 0.18 : 0.13)','primaryLight: f ? Ro(o.white, y, 0.18) : "#EAF6FD"').replace(/gradient: `linear-gradient\([^`]+`/,'gradient: y');
 const ast=parse(text,{sourceType:'module'});
 traverse(ast,{Program(p){if(p.scope.hasOwnBinding('n'))p.scope.rename('n','React');if(p.scope.hasOwnBinding('N'))p.scope.rename('N','ReactHooks');},ObjectProperty(p){
   if(p.node.key.name==='fontSize' && p.node.value.type==='NumericLiteral') {const s=p.node.value.value;p.node.value.value=s<12?12:s<14?14:s===14?16:s;}
   if(p.node.key.name==='fontFamily' && p.node.value.type==='StringLiteral')p.node.value.value='Nunito Sans, system-ui, sans-serif';
 }});
 fs.writeFileSync(path,await format(generate(ast,{comments:true}).code,{parser:'babel'}));
}
