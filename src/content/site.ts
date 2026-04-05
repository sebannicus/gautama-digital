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
  tagline: 'Diseño Web Profesional en La Serena y Coquimbo',
  description:
    'Diseño web y páginas web profesionales en La Serena y Coquimbo. SEO local + Google My Business para que tu negocio aparezca en Google sin pagar publicidad. Diagnóstico gratuito. Desde $250.000. Sin mensualidades.',
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
    { label: 'Proceso', href: '#proceso' },
    { label: 'Clientes', href: '#clientes' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const;
