import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'src/v2/screens/OnboardingEntryV2.tsx',
  'src/v2/screens/onboarding-entry-v2.css',
  'src/v2/lab/UiLab.tsx',
  'src/v2/lab/ui-lab.css',
  'docs/qa/ui-lab/onboarding-entry-360-final.png',
  'docs/qa/ui-lab/onboarding-entry-390-final.png',
  'docs/qa/ui-lab/onboarding-entry-430-final.png',
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length) {
  console.error(`Onboarding candidate evidence missing:\n${missing.join('\n')}`);
  process.exit(1);
}

const screenCss = readFileSync('src/v2/screens/onboarding-entry-v2.css', 'utf8');
const labCss = readFileSync('src/v2/lab/ui-lab.css', 'utf8');
const screen = readFileSync('src/v2/screens/OnboardingEntryV2.tsx', 'utf8');
const assertions = [
  ['reduced motion CSS', screenCss.includes('prefers-reduced-motion'), screenCss],
  ['primary CTA target', screenCss.includes('min-height: 58px'), screenCss],
  ['Lab controls target', labCss.includes('min-height: 48px'), labCss],
  ['recoverable error state', screen.includes('role="alert"'), screen],
];
const failed = assertions.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(`Onboarding candidate assertions failed: ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}

console.log('Onboarding candidate gate: OK');
