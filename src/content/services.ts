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
    tagline: 'Presencia digital lista para conseguir clientes',
    description:
      'Para el negocio que hoy no aparece en Google y necesita cambiar eso. Sitio profesional + SEO local + Google My Business — todo en un solo paquete, sin piezas sueltas.',
    features: [
      { text: 'Diagnóstico inicial gratuito — sin compromiso' },
      { text: 'Landing page profesional con diseño único (no plantillas)' },
      { text: 'SEO local: tus keywords, tu ciudad, tu categoría' },
      { text: 'Google My Business creado y optimizado' },
      { text: 'Dominio y hosting incluidos por 1 año' },
      { text: 'Formulario de contacto + botón WhatsApp integrado' },
      { text: 'Optimizado para móvil y escritorio' },
      { text: '1 mes de soporte post-lanzamiento' },
    ],
    price: '$280.000',
    priceNote: '50% al aprobar el primer avance · 50% al recibir el sitio desplegado. Sin mensualidades. El sitio es tuyo.',
    highlighted: false,
    cta: 'Solicitar cotización',
  },
  {
    id: 'pro',
    name: 'Paquete Pro',
    tagline: 'Para el negocio que quiere liderar su categoría local',
    description:
      'Sitio completo con múltiples páginas, estrategia SEO profunda y seguimiento real de resultados. Ideal si tu competencia ya tiene presencia digital y necesitas superarla.',
    features: [
      { text: 'Diagnóstico inicial gratuito — sin compromiso' },
      { text: 'Todo lo incluido en el Paquete Starter' },
      { text: 'Sitio multi-página (inicio, servicios, contacto, más)' },
      { text: 'Investigación de keywords para tu rubro y ciudad' },
      { text: 'Google Analytics 4 configurado y explicado' },
      { text: 'Schema markup (apareces con más info en Google)' },
      { text: 'Velocidad optimizada — Core Web Vitals aprobados' },
      { text: '3 meses de seguimiento y ajustes SEO incluidos' },
    ],
    price: '$450.000',
    priceNote: '50% al aprobar el primer avance · 50% al recibir el sitio desplegado. Seguimiento de 3 meses incluido.',
    highlighted: true,
    badge: 'Más elegido',
    cta: 'Solicitar cotización',
  },
  {
    id: 'seguimiento',
    name: 'Seguimiento Mensual',
    tagline: 'Para no perder lo que ya construiste',
    description:
      'Google cambia, la competencia se mueve y tu posición puede caer si nadie la cuida. Este plan mantiene tu sitio optimizado y tu presencia en Google activa mes a mes.',
    features: [
      { text: 'Reporte mensual: posición en Google, GMB y Analytics' },
      { text: '1 ajuste SEO mensual (contenido, velocidad, meta tags)' },
      { text: 'Monitoreo continuo de tu posición local' },
      { text: 'Alerta inmediata si algo cae o falla' },
      { text: 'Acceso directo a Seba por WhatsApp' },
    ],
    price: '$60.000',
    priceNote: 'Por mes. Sin contrato de permanencia — cancelas cuando quieras.',
    highlighted: false,
    cta: 'Consultar disponibilidad',
  },
];
