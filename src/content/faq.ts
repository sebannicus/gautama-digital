/**
 * faq.ts
 * Propósito: Preguntas frecuentes. Cada pregunta cierra una objeción real
 * de prospectos locales en La Serena/Coquimbo.
 * Relación: Consumido por FAQ.astro. También se usa para generar el
 * schema FAQPage en BaseLayout (rich snippets en Google).
 */

import type { FAQItem } from '../types/faq.types';

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    question: '¿Cuánto cuesta diseñar una página web profesional en La Serena?',
    answer:
      'El Paquete Starter cuesta $250.000 CLP (pago único) e incluye landing page profesional, SEO local y Google Analytics. El Paquete Pro cuesta $450.000 CLP e incluye sitio multi-página, GA4 avanzado, schema markup, optimización de velocidad y 3 meses de seguimiento SEO. Sin mensualidades obligatorias — pagas una vez y el sitio es tuyo.',
  },
  {
    question: '¿Para qué sirve tener una página web?',
    answer:
      'Tu página web trabaja 24/7 atrayendo clientes nuevos sin que tengas que pagar publicidad cada mes. Con SEO local, tu negocio aparece cuando alguien en La Serena o Coquimbo busca lo que ofreces en Google. A diferencia de Instagram o Facebook, tu sitio web es tuyo — no depende de algoritmos ni de seguir pagando para que te vean.',
  },
  {
    question: '¿Cómo puedo aparecer en Google sin pagar publicidad?',
    answer:
      'Con SEO (Search Engine Optimization) y Google My Business bien configurado. La idea es construir tu sitio con las palabras exactas que tus clientes escriben en Google — así el buscador te recomienda de forma orgánica. CheckVital pasó de cero presencia a Top Google Maps en 30 días sin invertir un peso en anuncios. Eso es lo que hace un sitio bien construido desde el inicio.',
  },
  {
    question: '¿Qué es el marketing digital y cómo ayuda a mi negocio local?',
    answer:
      'Marketing digital es hacer que tu negocio sea visible donde tus clientes buscan: Google, Google Maps, Instagram. La ventaja sobre el marketing tradicional es que puedes medir todo — cuánta gente visita tu sitio, de dónde vienen, qué páginas ven. Con Analytics sabes exactamente qué funciona y qué no, sin gastar en publicidad a ciegas.',
  },
  {
    question: '¿Cuánto tiempo tarda en aparecer en Google?',
    answer:
      'El sitio queda indexado en 24-72 horas. Los primeros resultados orgánicos en Google Search empiezan a aparecer entre 2 y 6 semanas. CheckVital ya aparecía en Google Maps con palabras clave específicas dentro del primer mes de lanzamiento — sin invertir un peso en publicidad.',
  },
  {
    question: '¿Qué diferencia hay entre tener un sitio web y estar solo en redes sociales?',
    answer:
      'Instagram y Facebook te hacen depender de sus algoritmos: si mañana cambian las reglas, pierdes visibilidad. Tu sitio web en cambio es un activo permanente tuyo. Además, Google no indexa bien los perfiles de redes sociales — si alguien busca "diseño web La Serena" o tu rubro en Google, un negocio con sitio propio aparece. Uno solo con Instagram, no.',
  },
  {
    question: '¿Necesito firmar un contrato de permanencia?',
    answer:
      'No. El Paquete Starter y Pro son pago único — el sitio es tuyo desde el primer día. El Seguimiento Mensual es mes a mes, sin compromiso de permanencia. Si en algún momento no ves valor, lo cancelas sin costo adicional.',
  },
];
