import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dopahop.app',
  integrations: [
    sitemap({
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
