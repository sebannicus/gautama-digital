/**
 * services.ts
 * Propósito: Datos de los paquetes de servicio de Gautama Digital.
 * Principio SRP: este módulo solo conoce los servicios — no decide cómo mostrarlos.
 * Relación: Consumido por Services.astro y ServiceCard.astro.
 */

import type { Service } from '../types/service.types';

export const SERVICES: readonly Service[] = [
  {
    id: 'starter',
    name: 'Paquete Starter',
    tagline: 'Tu primera presencia digital profesional',
    description:
      'Todo lo que un negocio local necesita para aparecer en Google desde el día uno. Landing page, SEO y Google My Business optimizado.',
    features: [
      { text: 'Landing page profesional (Astro, diseño único)' },
      { text: 'SEO on-page completo con keywords locales' },
      { text: 'Google My Business creado y optimizado' },
      { text: 'Dominio y hosting por 1 año incluido' },
      { text: 'Formulario de contacto y WhatsApp integrado' },
      { text: 'Responsive: móvil y desktop' },
      { text: '1 mes de soporte post-lanzamiento' },
    ],
    price: 'desde $350.000',
    priceNote: 'Pago único. Sin mensualidades obligatorias.',
    highlighted: false,
    cta: 'Quiero el Starter',
  },
  {
    id: 'pro',
    name: 'Paquete Pro',
    tagline: 'Presencia digital completa y estratégica',
    description:
      'Para negocios que quieren dominar su categoría en La Serena y Coquimbo. Sitio completo, estrategia SEO profunda y seguimiento de resultados.',
    features: [
      { text: 'Todo lo del Paquete Starter' },
      { text: 'Sitio con múltiples páginas por servicio' },
      { text: 'Estrategia SEO con investigación de keywords' },
      { text: 'Google Analytics 4 configurado' },
      { text: 'Schema markup (rich snippets en Google)' },
      { text: 'Velocidad optimizada para Core Web Vitals' },
      { text: '3 meses de seguimiento y ajustes SEO' },
    ],
    price: 'desde $700.000',
    priceNote: 'Pago único. Seguimiento incluido por 3 meses.',
    highlighted: true,
    badge: 'Más elegido',
    cta: 'Quiero el Pro',
  },
  {
    id: 'seguimiento',
    name: 'Seguimiento Mensual',
    tagline: 'Tus métricas, controladas cada mes',
    description:
      'Reporte mensual de posicionamiento, ajustes SEO continuos y gestión proactiva de tu presencia digital. Para clientes que ya tienen su sitio.',
    features: [
      { text: 'Reporte mensual: Google, GMB y Analytics' },
      { text: '1 ajuste SEO mensual (meta tags, contenido, velocidad)' },
      { text: 'Monitoreo de posición en Google' },
      { text: 'Alerta si algo cae o falla' },
      { text: 'Acceso directo a Seba por WhatsApp' },
    ],
    price: 'desde $80.000',
    priceNote: 'Por mes. Sin contrato de permanencia.',
    highlighted: false,
    cta: 'Me interesa el seguimiento',
  },
];
