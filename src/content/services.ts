import type { Service } from '../types/service.types';

export const SERVICES: readonly Service[] = [

  /* ── PILAR 1: PRESENCIA DIGITAL ── */
  {
    id: 'starter',
    name: 'Landing Profesional',
    tagline: 'Apareces en Google. Sin pagar publicidad.',
    description:
      'El 80% de tus clientes buscan en Google antes de comprar. Si no apareces, le estás regalando esos clientes a tu competencia. Landing page profesional en Astro con SEO local + GMB optimizado + GA4 — el sistema para que te encuentren desde el día 1.',
    features: [
      { text: 'Diagnóstico de posicionamiento gratuito — sin compromiso' },
      { text: 'Landing page diseñada desde cero (nunca plantillas)' },
      { text: 'SEO local: tus keywords, tu ciudad, tu categoría en Google' },
      { text: 'Google My Business optimizado — apareces en Google Maps' },
      { text: 'Google Analytics 4 configurado — sabes cuánta gente entra' },
      { text: 'Formulario de contacto + botón WhatsApp integrado' },
      { text: 'Optimizado para móvil: el 70% de visitas llegan desde celular' },
      { text: 'Core Web Vitals y velocidad optimizados para Google' },
    ],
    price: '$280.000',
    priceNote: '50% al aprobar el primer avance · 50% al recibir el sitio. Hosting y dominio no incluidos.',
    highlighted: false,
    cta: 'Solicitar cotización',
  },
  {
    id: 'pro',
    name: 'Analíticas Completas',
    tagline: 'Mide cada peso. Sabe qué convierte. Invierte donde funciona.',
    description:
      'Sin datos, estás adivinando. Con este plan sabes exactamente cuántos prospectos entraron, de dónde vinieron y cuántos convirtieron. La base para cualquier campaña de publicidad que no quieras quemar al azar.',
    features: [
      { text: 'Todo lo del plan Landing Profesional' },
      { text: 'Meta Pixel: trackea desde el anuncio hasta la conversión' },
      { text: 'GA4 avanzado: eventos de conversión y embudos configurados' },
      { text: 'Schema markup — Rich Snippets en Google: más clics, mismo ranking' },
      { text: 'Instagram Business optimizado + guía de contenido' },
      { text: 'Consultoría IA: herramientas que ya puedes usar en tu negocio' },
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
    tagline: 'Vende 24/7. Tu tienda no cierra. Sin comisión por venta.',
    description:
      'Para el negocio que quiere vender en línea sin depender de Mercado Libre ni Instagram. Catálogo de hasta 20 productos, carrito de compra, pasarela de pago chilena y panel de administración. La tienda es tuya — cada peso de venta llega directo a ti.',
    features: [
      { text: 'Todo lo del plan Analíticas Completas' },
      { text: 'Hasta 20 productos publicados con fotos y descripción' },
      { text: 'Carrito de compra y checkout optimizado para conversión' },
      { text: 'Pasarela de pago chilena integrada (Webpay, Flow o MercadoPago)' },
      { text: 'Panel de administración de productos sin código' },
      { text: 'Sin comisión por venta — el dinero llega directo a ti' },
      { text: 'Soporte técnico primer mes incluido' },
    ],
    price: '$700.000',
    priceNote: '50% al aprobar el primer avance · 50% al recibir el sitio. Hosting y dominio no incluidos.',
    highlighted: false,
    cta: 'Solicitar cotización',
  },

  /* ── PILAR 2: AUTOMATIZACIÓN IA ── */
  {
    id: 'whatsapp',
    name: 'Agente WhatsApp IA',
    tagline: 'Captura y califica leads a las 3am. Sin contratar a nadie.',
    description:
      'Pierdes clientes porque no respondes a tiempo. Un agente IA entrenado con tu negocio responde, califica y deriva prospectos en automático. En producción en Antocarz desde abril 2026 — capturando leads reales con handoffs contextualizados al equipo.',
    features: [
      { text: 'Meta Cloud API oficial — sin riesgo de ban de WhatsApp' },
      { text: 'Entrenado con la información real de tu negocio' },
      { text: 'Responde preguntas frecuentes 24/7 sin intervención tuya' },
      { text: 'Califica prospectos antes de derivarlos — sin tiempo perdido' },
      { text: 'Handoff contextualizado: el equipo recibe nombre, consulta y contexto' },
      { text: 'Log de conversaciones en Google Sheets — ves cada lead' },
      { text: 'Ajustes y mejoras incluidos cada mes' },
    ],
    price: '$350.000',
    priceNote: 'Implementación única · + $50.000/mes suscripción',
    highlighted: false,
    cta: 'Consultar disponibilidad',
  },
  {
    id: 'instagram',
    name: 'Gestión Instagram IA',
    tagline: '8 posts al mes. Tú solo apruebas. El sistema publica.',
    description:
      'Una reunión de 30 minutos al inicio del mes — el sistema genera el contenido, te lo muestra para aprobación y publica en el horario óptimo. Tu presencia en redes, sin que sea tu problema. Con el mismo pipeline que usa Gautama Digital.',
    features: [
      { text: '8 carruseles y posts al mes con tu identidad de marca' },
      { text: 'Captions con copy persuasivo y hashtags investigados' },
      { text: 'Publicación automática al horario de mayor engagement' },
      { text: 'Historia IG del primer slide en cada publicación' },
      { text: 'Solo 30 min de tu tiempo al mes — nada más' },
      { text: 'Reporte mensual de alcance y engagement' },
      { text: 'Garantía: si no quedas satisfecho al mes 1, el mes 2 sin costo' },
    ],
    price: 'Setup $280.000',
    priceNote: '+ desde $70.000/mes · Setup incluye el primer mes completo',
    highlighted: false,
    badge: 'Nuevo',
    cta: 'Consultar disponibilidad',
  },

  /* ── PILAR 3: INTELIGENCIA DE NEGOCIOS ── */
  {
    id: 'bi',
    name: 'CRM + Dashboard de Negocios',
    tagline: 'Todos tus números en un lugar. Decisiones con datos, no con intuición.',
    description:
      'CRM y dashboard personalizado para tu tipo de negocio. Sabe cuántos prospectos activos tienes, de dónde vienen y qué canal genera más retorno. Como el sistema que construimos para Hanaq Pacha Pisquera — rastreando cada oportunidad comercial en tiempo real.',
    features: [
      { text: 'Dashboard con KPIs clave de tu negocio en tiempo real' },
      { text: 'CRM: pipeline de prospectos, seguimiento y etapas' },
      { text: 'Integración con GA4 para atribución de marketing real' },
      { text: 'Exportaciones y reportes automáticos para tu equipo' },
      { text: 'Datos encriptados — tu información no depende de terceros' },
      { text: 'Entrenamiento de tu equipo incluido' },
    ],
    price: 'Cotizar',
    priceNote: 'Precio según alcance — reunión de diagnóstico gratuita para evaluar',
    highlighted: false,
    cta: 'Solicitar diagnóstico',
  },
];
