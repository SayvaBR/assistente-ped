import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src/v2');
const sourceExt = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);
const violations = [];

const forbiddenPatterns = [
  { re: /from\s+['"](?:\.\.\/){2,}screens(?:\/|['"])/g, why: 'import visual de src/screens legado' },
  { re: /from\s+['"](?:\.\.\/){2,}components(?:\/|['"])/g, why: 'import visual de src/components legado' },
  { re: /from\s+['"][^'"]*core\/recovered(?:\.js)?['"]/g, why: 'dependência de recovered.js' },
  { re: /from\s+['"](?:@\/|src\/)?screens(?:\/|['"])/g, why: 'import visual de src/screens legado' },
  { re: /from\s+['"](?:@\/|src\/)?components(?:\/|['"])/g, why: 'import visual de src/components legado' },
  { re: /import\s+['"][^'"]*(?:design-system|legacy)[^'"]*\.css['"]/gi, why: 'CSS visual legado importado na V2' },
];

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }

  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!sourceExt.has(path.extname(entry.name))) continue;

    const text = await readFile(file, 'utf8');
    for (const rule of forbiddenPatterns) {
      rule.re.lastIndex = 0;
      if (rule.re.test(text)) {
        violations.push(`${path.relative(process.cwd(), file)}: ${rule.why}`);
      }
    }
  }
}

await walk(root);

if (violations.length) {
  console.error('\nV2 clean-room boundary violated:\n');
  for (const violation of violations) console.error(`- ${violation}`);
  console.error('\nExtraia a lógica necessária para domain/data/adapters em vez de importar a UI V1.\n');
  process.exit(1);
}

console.log('V2 clean-room boundary: OK');
