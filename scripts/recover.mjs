// One-time AST recovery. Vendor implementations are replaced with package imports.
// Run only to regenerate from the untouched recovery kit; subsequent edits live in src.
import fs from 'node:fs';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
import { format } from 'prettier';
const traverse = traverseModule.default;
const generate = generatorModule.default;
const source = fs.readFileSync('../Astra_Recovery_Kit_Assistente_Pedagogico/apk_recovered/public_assets/app.bundle.min.js', 'utf8');
const ast = parse(source, { sourceType: 'module' });
// Split declarations so dependencies can be recovered independently.
ast.program.body = ast.program.body.flatMap(node => t.isVariableDeclaration(node) ? node.declarations.map(d => ({...t.variableDeclaration(node.kind, [d]), start:d.start})) : [node]);
const vendor = {
  n:['react','default'], N:['react','*'], ka:['@capacitor/core','Capacitor'], vn:['@capacitor/core','registerPlugin'],
  hn:['@capacitor/filesystem','Filesystem'], jn:['@capacitor/filesystem','Directory'], wu:['@capacitor/filesystem','Encoding'],
  Uf:['@capacitor/share','Share'], vs:['@capawesome/capacitor-torch','Torch'], wh:['@capacitor/file-viewer','FileViewer'],
  Vl:['@capacitor/local-notifications','LocalNotifications'], kp:['@capacitor/camera','Camera'],
  eo:['@capacitor/camera','CameraSource'], bu:['@capacitor/camera','CameraResultType'], xs:['@capacitor/camera','CameraDirection'],
  hg:['lottie-web','default'],
};
for (const node of ast.program.body) {
  const d=node.declarations?.[0];
  if(t.isCallExpression(d?.init) && d.init.callee.name==='ut') vendor[d.id.name]=['lucide-react', d.init.arguments[0].value];
  if(t.isCallExpression(d?.init) && d.init.callee.name==='vn' && d.init.arguments[0]?.value==='App') vendor[d.id.name]=['@capacitor/app','App'];
}
const names = {Ev:'App',Qe:'repository',Fe:'storage',Fu:'validateBackup',oh:'createBackup',lh:'restoreBackup',sh:'parseBackup',ch:'clearData',uh:'serializeBackup',Op:'createLessonPlan',ap:'migrateLessonPlans',Ru:'classKey',hh:'classPrefix',jt:'dateKey',tr:'createId',er:'nowISO',dh:'validateBirthDate',Rl:'calculateAge',jl:'validatePhone',Dl:'formatPhone',Lu:'normalizeClass',Hf:'loadClasses',Nu:'saveClasses',vh:'migrateLegacyClassData',Wo:'saveMedia',gn:'deleteMedia',ju:'normalizeEvent',Du:'normalizeFolder',c:'colors',Lt:'ScreenHeader',Ve:'Card',Sr:'IconTile',rr:'Chip',qt:'Button',br:'EmptyState',wa:'LoadingState',Bp:'ErrorState',P0:'SuccessState',Uo:'confirmAction',A0:'ConfirmationDialog',At:'Input',ku:'SearchInput',Ha:'Avatar',Hu:'MotionIllustration',Uu:'PhotoCropper',_0:'SplashScreen',T0:'WelcomeScreen',I0:'SetupWizard',F0:'AppearanceScreen',L0:'SettingsScreen',N0:'HomeScreen',j0:'PlanningScreen',sp:'LibraryScreen',G0:'ClassScreen',J0:'QuickRecordScreen',X0:'AttendanceScreen',Z0:'LessonPlanScreen',ev:'NewStudentScreen',tv:'StudentScreen',rv:'ObservationScreen',av:'BnccScreen',nv:'BnccInfantilScreen',iv:'DocumentsScreen',ov:'ReportsScreen',sv:'PedagogicalPlanningScreen',lv:'TutorialsScreen',cv:'TrashScreen',uv:'GuidedTour',dv:'PrivacyScreen',fv:'BackupScreen',pv:'ClassesScreen',mv:'TeacherProfileScreen',hv:'NotificationsScreen',gv:'ToolsScreen',vv:'MoreScreen',yv:'BottomNavigation',mn:'TextArea',Ua:'Accordion',K0:'SkillPicker'};
let scope;
traverse(ast,{Program(p){scope=p.scope;}});
const selected=new Map();
function collect(name){
  if(selected.has(name))return;
  if(vendor[name]){selected.set(name,null);return;}
  const binding=scope.getBinding(name);
  if(!binding)throw new Error('Missing binding '+name);
  const path=binding.path.isVariableDeclarator()?binding.path.parentPath:binding.path;
  selected.set(name,path.node);
  path.traverse({ReferencedIdentifier(p){const b=p.scope.getBinding(p.node.name);if(b?.scope===scope && p.node.name!==name)collect(p.node.name);}});
}
collect('Ev');
for(const name of ['Fu','oh','lh','Op','ap','Ru','dh','Rl','jl','Lu','vh'])collect(name);
for(const [old,newName] of Object.entries(names))if(scope.hasBinding(old))scope.rename(old,newName);
// Descriptive prop parameters survive minification in object keys.
traverse(ast,{FunctionDeclaration(p){
  if(p.node.start<155000)return;
  for(const param of p.node.params){if(!t.isObjectPattern(param))continue;
    for(const prop of param.properties){if(!t.isObjectProperty(prop)||!t.isIdentifier(prop.key))continue;
      const value=t.isAssignmentPattern(prop.value)?prop.value.left:prop.value;
      if(t.isIdentifier(value)&&value.name!==prop.key.name&&!p.scope.hasBinding(prop.key.name))p.scope.rename(value.name,prop.key.name);
    }
  }
}});
const modules=new Map();
function group(node){
  const id=node.id?.name||node.declarations?.[0].id.name;
  if(node.start>=434957 && node.start!==437657 && t.isFunctionDeclaration(node))return `screens/${id}`;
  if(node.start>=155302&&node.start<161353)return 'data/backup';
  if(node.start>=161353&&node.start<166363)return 'data/classes';
  if(node.start>=167115&&node.start<173014)return 'data/files';
  if(node.start>=173373&&node.start<174820)return 'data/notifications';
  if(node.start>=179228&&node.start<182456)return 'data/agenda-camera';
  if(node.start>=205674&&node.start<213892)return 'components/photo';
  return 'core/recovered';
}
const owners=new Map();
for(const [old,node] of selected){if(!node)continue;const name=names[old]||old;const g=group(node);owners.set(name,g);if(!modules.has(g))modules.set(g,[]);if(!modules.get(g).includes(node))modules.get(g).push(node);}
fs.mkdirSync('src',{recursive:true});
const usedVendor=new Map([...selected].filter(([old,node])=>!node).map(([old])=>[names[old]||old,vendor[old]]));
for(const [g,nodes]of modules){
  nodes.sort((a,b)=>a.start-b.start);
  const dependencies=new Set();
  for(const node of nodes){const temp=t.file(t.program([t.cloneNode(node,true)]));traverse(temp,{ReferencedIdentifier(p){if(!p.scope.hasBinding(p.node.name))dependencies.add(p.node.name);}});}
  const imports=[];
  for(const dep of [...dependencies].sort()){
    if(usedVendor.has(dep)){const [pkg,name]=usedVendor.get(dep);imports.push(name==='default'?`import ${dep} from '${pkg}';`:name==='*'?`import * as ${dep} from '${pkg}';`:`import { ${name} as ${dep} } from '${pkg}';`);}
    else if(owners.has(dep)&&owners.get(dep)!==g)imports.push(`import { ${dep} } from '../${owners.get(dep)}.js';`);
  }
  const exports=[...owners].filter(([,owner])=>owner===g).map(([name])=>name);
  const code=`// Recovered from APK 0.2.0. Original behavior retained; vendor code uses npm packages.\n${imports.join('\n')}\n${nodes.map(n=>generate(n,{comments:false}).code).join('\n')}\nexport {${exports.join(',')}};\n`;
  fs.mkdirSync(`src/${g.split('/')[0]}`,{recursive:true});
  fs.writeFileSync(`src/${g}.js`,await format(code,{parser:'babel'}));
}
fs.mkdirSync('src/styles',{recursive:true});
fs.writeFileSync('src/styles/recovered.css',await format(fs.readFileSync('../Astra_Recovery_Kit_Assistente_Pedagogico/apk_recovered/public_assets/app.styles.css','utf8'),{parser:'css'}));
fs.mkdirSync('src/data',{recursive:true});
fs.copyFileSync('../Astra_Recovery_Kit_Assistente_Pedagogico/recovered_data/bncc_educacao_infantil.json','src/data/bncc.json');
console.log(`Recovered ${selected.size} bindings into ${modules.size} modules; ${usedVendor.size} package imports.`);
