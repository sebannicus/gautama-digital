/**
 * service.types.ts
 * Propósito: Contrato de datos para los servicios de Gautama Digital.
 * Principio ISP: interfaz mínima y específica — los componentes reciben
 * solo lo que necesitan, sin acoplar datos innecesarios.
 */

export interface ServiceFeature {
  text: string;
}

export interface Service {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly features: readonly ServiceFeature[];
  readonly price: string;
  readonly priceNote?: string;
  readonly highlighted: boolean;
  readonly badge?: string;
  readonly cta: string;
}
