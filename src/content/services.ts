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
    name: 'Landing Profesional',
    tagline: 'Tu negocio en Google sin pagar publicidad',
    description:
      'Para el negocio que hoy no aparece en Google. Landing page con diseño único + SEO local + Google Analytics 4. Sin plantillas, sin mensualidades.',
    features: [
      { text: 'Diagnóstico inicial gratuito — sin compromiso' },
      { text: 'Landing page profesional con diseño único (no plantillas)' },
      { text: 'SEO local: tus keywords, tu ciudad, tu categoría' },
      { text: 'Google My Business creado y optimizado' },
      { text: 'Google Analytics 4 configurado' },
      { text: 'Formulario de contacto + botón WhatsApp integrado' },
      { text: 'Optimizado para móvil y escritorio' },
      { text: 'Core Web Vitals y velocidad de carga optimizados' },
    ],
    price: '$280.000',
    priceNote: '50% al aprobar el primer avance · 50% al recibir el sitio. Hosting y dominio no incluidos.',
    highlighted: false,
    cta: 'Solicitar cotización',
  },
  {
    id: 'pro',
    name: 'Analíticas Completas',
    tagline: 'Mide todo lo que pasa con tu negocio online',
    description:
      'Sistema de analíticas completo: Google Analytics + Meta Pixel (Facebook & Instagram) + eventos de conversión configurados. Sabes exactamente qué funciona y qué no.',
    features: [
      { text: 'Todo lo incluido en Landing Profesional' },
      { text: 'Meta Pixel configurado (Facebook + Instagram Ads)' },
      { text: 'GA4 avanzado: eventos de conversión y metas configuradas' },
      { text: 'Schema markup — más visibilidad en resultados de Google' },
      { text: 'Perfil de Instagram Business optimizado' },
      { text: 'Consultoría IA: herramientas y automatizaciones para tu negocio' },
      { text: '3 meses de seguimiento y ajustes SEO incluidos' },
    ],
    price: '$380.000',
    priceNote: '50% al aprobar el primer avance · 50% al recibir el sitio. Hosting y dominio no incluidos.',
    highlighted: true,
    badge: 'Más elegido',
    cta: 'Solicitar cotización',
  },
  {
    id: 'ecommerce',
    name: 'Tienda Online',
    tagline: 'Vende en línea con carrito de compra completo',
    description:
      'Sitio profesional con catálogo de hasta 20 productos, carrito de compra, pasarela de pago integrada y panel de administración. Todo lo que necesitas para vender en línea.',
    features: [
      { text: 'Todo lo incluido en Analíticas Completas' },
      { text: 'Hasta 20 productos publicados con fotos y descripción' },
      { text: 'Carrito de compra y proceso de checkout' },
      { text: 'Pasarela de pago integrada' },
      { text: 'Panel de administración de productos' },
      { text: 'Flujo de compra optimizado para conversión' },
      { text: 'Soporte técnico primer mes incluido' },
    ],
    price: '$700.000',
    priceNote: '50% al aprobar el primer avance · 50% al recibir el sitio. Hosting y dominio no incluidos.',
    highlighted: false,
    cta: 'Solicitar cotización',
  },
  {
    id: 'whatsapp',
    name: 'Agente WhatsApp IA',
    tagline: 'Atención 24/7 automatizada para tu negocio',
    description:
      'Un agente de inteligencia artificial en tu WhatsApp que responde consultas, agenda y califica clientes en automático. Tu negocio nunca duerme.',
    features: [
      { text: 'Implementación y configuración del agente' },
      { text: 'Entrenado con la información real de tu negocio' },
      { text: 'Responde preguntas frecuentes 24/7 sin intervención' },
      { text: 'Agenda citas y califica clientes potenciales' },
      { text: 'Deriva clientes listos para comprar directo a ti' },
      { text: 'Soporte y ajustes continuos cada mes' },
    ],
    price: '$350.000',
    priceNote: 'Implementación única · + $50.000/mes suscripción',
    highlighted: false,
    cta: 'Consultar disponibilidad',
  },
];
