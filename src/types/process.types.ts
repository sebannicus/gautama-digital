/**
 * process.types.ts
 * Propósito: Contrato de datos para los pasos del proceso de trabajo.
 * Relación: Consumido por Process.astro.
 */

export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
}
