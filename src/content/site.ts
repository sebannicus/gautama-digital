/**
 * site.ts
 * Propósito: Fuente única de verdad para datos globales del sitio.
 * Principio Information Expert (GRASP): este módulo es el único que
 * conoce el nombre, contacto y metadata de Gautama Digital.
 * Actualizar aquí afecta SEO, Schema, Header, Footer y CTAs automáticamente.
 *
 * ⚠️  REEMPLAZAR antes de lanzar:
 *     - phone / whatsapp: número real de Seba
 *     - email: correo real
 */

export const SITE = {
  name: 'Gautama Digital',
  tagline: 'Marketing Digital, Automatización IA e Inteligencia de Negocios · La Serena y Coquimbo',
  description:
    'Sistemas digitales para negocios locales en Chile. Presencia en Google sin publicidad, bots WhatsApp IA que capturan leads 24/7, y dashboards de inteligencia de negocios. Diagnóstico gratuito. Desde $280.000.',
  url: 'https://www.gautamadigital.cl',

  phone: '+56 9 9642 5227',
  whatsapp: '56996425227',
  email: 'gautamadigital33@gmail.com',

  location: {
    city: 'Coquimbo',
    region: 'IV Región de Coquimbo',
    country: 'CL',
  },

  founder: {
    name: 'Sebastián Morales',
    displayName: 'Seba',
    role: 'Consultor Digital',
  },

  social: {
    instagram: 'https://instagram.com/gautama_digital',
    linkedin: '',
  },

  nav: [
    { label: 'Servicios', href: '/servicios' },
    { label: 'Portafolio', href: '/#portafolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Quién soy', href: '/quien-soy' },
  ],
} as const;
