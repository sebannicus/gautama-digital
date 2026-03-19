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
    question: '¿Cuánto tiempo tarda en aparecer en Google?',
    answer:
      'El sitio queda indexado en 24-72 horas. Los primeros resultados orgánicos en Google Search empiezan a aparecer entre 2 y 6 semanas. CheckVital, por ejemplo, ya aparecía en Google Maps con palabras clave específicas dentro del primer mes de lanzamiento — sin invertir un peso en publicidad.',
  },
  {
    question: '¿Cuánto cuesta un sitio web profesional en La Serena?',
    answer:
      'El Paquete Starter parte desde $350.000 CLP (pago único), e incluye landing page, SEO y Google My Business. El Paquete Pro parte desde $700.000 CLP e incluye sitio completo con múltiples páginas y 3 meses de seguimiento. Sin mensualidades obligatorias — pagas una vez y el sitio es tuyo.',
  },
  {
    question: '¿Qué pasa si no aparezco en Google después del lanzamiento?',
    answer:
      'El SEO es un proceso, no un botón. Lo que garantizo es que el sitio queda construido correctamente — con la estructura técnica, los textos y las keywords que Google necesita para posicionarte. CheckVital pasó de cero a Top Google Maps en 30 días sin invertir un peso en publicidad. Eso es exactamente lo que pasa cuando se construye bien desde el inicio.',
  },
  {
    question: '¿Necesito firmar un contrato de permanencia?',
    answer:
      'No. El Paquete Starter y Pro son pago único — el sitio es tuyo desde el primer día. El Seguimiento Mensual es mes a mes, sin compromiso de permanencia. Si en algún momento no ves valor, lo cancelas sin costo adicional.',
  },
];
