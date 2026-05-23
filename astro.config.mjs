import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dopahop.app',
  integrations: [
    sitemap({
      // Escludi le pagine-tag: sono noindex, non vanno annunciate nel sitemap
      // (evita il segnale contraddittorio sitemap="indicizza" vs pagina="noindex").
      filter: (page) => !/\/blog\/tag\//.test(page),
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en-US',
          es: 'es-ES',
          de: 'de-DE',
          fr: 'fr-FR',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'es', 'de', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
