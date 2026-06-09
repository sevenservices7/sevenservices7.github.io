// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site institucional Seven Services.
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
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-PT', en: 'en-GB', es: 'es-ES' },
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
