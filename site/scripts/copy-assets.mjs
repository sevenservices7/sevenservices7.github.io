// Copia a pasta de marca compartilhada (../assets) para site/public/assets
// antes do dev/build. Assim o site reaproveita logos/parceiros/og-image do
// backoffice sem duplicar arquivos no controle de versão.
import { cp, mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, '..', '..', 'assets');
const dest = resolve(here, '..', 'public', 'assets');

try {
  await access(src);
} catch {
  console.warn(`[copy-assets] origem não encontrada: ${src} — pulando.`);
  process.exit(0);
}

await mkdir(dirname(dest), { recursive: true });
await cp(src, dest, { recursive: true });
console.log(`[copy-assets] copiado ${src} -> ${dest}`);
