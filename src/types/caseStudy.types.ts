/**
 * caseStudy.types.ts
 * Propósito: Contrato de datos para casos de estudio del portafolio.
 * Relación: Consumido por CaseStudy.astro y Authority.astro.
 */

export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly source: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly clientName: string;
  readonly industry: string;
  readonly location: string;
  readonly url: string;
  readonly challenge: string;
  readonly solution: string;
  readonly metrics: readonly Metric[];
  readonly mapKeywords: readonly string[];
  readonly copyQuote: string;
}
