/**
 * faq.types.ts
 * Propósito: Contrato de datos para preguntas frecuentes.
 * Relación: Consumido por FAQ.astro. El schema FAQPage se genera
 * desde estos mismos datos en BaseLayout, garantizando consistencia.
 */

export interface FAQItem {
  readonly question: string;
  readonly answer: string;
}
