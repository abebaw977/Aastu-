import fs from 'fs';
import path from 'path';

const rawKey = (process.argv[2] || '').trim();
if (!rawKey) {
  console.log('Usage: npm run set-key <YOUR_GEMINI_API_KEY>');
  process.exit(1);
}

const envPath = path.resolve(process.cwd(), '.env');
let existing = '';
if (fs.existsSync(envPath)) {
  existing = fs.readFileSync(envPath, 'utf8');
}

const lines = existing
  .split(/\r?\n/)
  .filter((line) => line.trim() !== '' && !line.trim().startsWith('GEMINI_API_KEY='));

lines.unshift(`GEMINI_API_KEY=${rawKey}`);
if (!lines.some((l) => l.startsWith('PORT='))) {
  lines.push('PORT=3000');
}

fs.writeFileSync(envPath, lines.join('\n') + '\n', 'utf8');
console.log('✅ GEMINI_API_KEY has been permanently saved to .env!');
console.log('You can change it anytime by running: npm run set-key <NEW_KEY>');
