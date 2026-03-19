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
  tagline: 'Diseño Web y SEO Local en La Serena',
  description:
    'Sitio web profesional + SEO local + Google My Business para negocios en La Serena y Coquimbo. Diagnóstico gratuito. Sin mensualidades. El sitio es tuyo.',
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
    { label: 'Servicios', href: '#servicios' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const;
