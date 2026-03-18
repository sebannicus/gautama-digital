/**
 * process.ts
 * Propósito: Pasos del proceso de trabajo de Gautama Digital.
 * Relación: Consumido exclusivamente por Process.astro.
 */

import type { ProcessStep } from '../types/process.types';

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnóstico y Estrategia',
    description: 'Analizamos tu negocio, tu competencia local y las keywords que usan tus clientes para buscar lo que ofreces.',
    detail: 'Llamada de 30 minutos. Sin costo. Sin compromiso.',
  },
  {
    number: '02',
    title: 'Construcción y Optimización',
    description: 'Diseñamos y desarrollamos tu presencia digital con SEO integrado desde el primer elemento — no como parche al final.',
    detail: 'Entrega en 10-15 días hábiles.',
  },
  {
    number: '03',
    title: 'Lanzamiento y Resultados',
    description: 'Lanzamos, configuramos Analytics y Google My Business, y monitoreamos los primeros resultados contigo.',
    detail: 'Reportes reales. Métricas que entiendes.',
  },
];
