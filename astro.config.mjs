// astro.config.mjs
// Propósito: Configuración del framework Astro.
// Decisión técnica: output 'static' genera HTML puro en build — máximo rendimiento,
// ideal para Core Web Vitals y hosting en Vercel/Netlify sin servidor.

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.gautamadigital.cl',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
