// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Rascunhos (draft: true) do blog e do podcast ficam fora do sitemap.
const draftPaths = ['blog', 'podcast'].flatMap((col) => {
  const dir = new URL(`./src/content/${col}/`, import.meta.url);
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith('.md')); } catch { return []; }
  return files
    .filter((f) => /^draft:\s*true\s*$/m.test(readFileSync(new URL(f, dir), 'utf8')))
    .map((f) => `/${col}/${f.replace(/\.md$/, '')}/`);
});
const redirectPaths = ['/servicos/', '/carrinho/', '/en/services/', '/en/cart/', '/es/servicios/', '/es/carrito/'];

// Site institucional SEVEN.
// i18n: PT é o idioma padrão e fica nas URLs limpas (/, /sobre, ...).
// EN/ES ficam prefixados (/en/..., /es/...).
export default defineConfig({
  site: 'https://sevenservicess.com',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  // Páginas antigas (catálogo e carrinho) → destinos novos. Geram HTML de redirecionamento com noindex.
  redirects: {
    '/servicos': '/solucoes',
    '/carrinho': '/solucoes',
    '/en/services': '/en/',
    '/en/cart': '/en/',
    '/es/servicios': '/es/',
    '/es/carrito': '/es/',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !draftPaths.includes(path) && !redirectPaths.includes(path) && !path.startsWith('/checkout') && !path.startsWith('/en/checkout') && !path.startsWith('/es/checkout') && !/\/(pagar|pay)\/?$/.test(path);
      },
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en-GB', es: 'es-ES' },
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
