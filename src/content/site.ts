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
    'Diseño web y SEO local en La Serena desde $350.000. Sin mensualidades. CheckVital pasó de cero a Top Google Maps en 30 días sin invertir en publicidad.',
  url: 'https://www.gautamadigital.cl',

  phone: '+56 9 9642 5227',
  whatsapp: '56996425227',
  email: 'hola@gautamadigital.cl',

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
    instagram: 'https://instagram.com/gautamadigital',
    linkedin: '',
  },

  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const;
