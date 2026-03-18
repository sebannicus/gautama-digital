/**
 * caseStudies.ts
 * Propósito: Datos de casos de estudio reales de Gautama Digital.
 * Principio Information Expert: única fuente de métricas verificadas.
 * Relación: Consumido por CaseStudy.astro y Authority.astro.
 *
 * ⚠️  Actualizar métricas de CheckVital cuando lleguen datos de
 *     Google Search Console y Google My Business (pendiente 2026-03-19).
 */

import type { CaseStudy } from '../types/caseStudy.types';

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: 'checkvital',
    clientName: 'CheckVital',
    industry: 'Clínica de estética médica',
    location: 'La Serena, Chile',
    url: 'www.checkvital.cl',
    challenge:
      'CheckVital partió desde cero: sin sitio web, sin presencia en Google, sin historial digital. Solo captaba clientes por referidos — sin canal digital propio.',
    solution:
      'Landing page profesional en Astro con SEO on-page completo y Google My Business optimizado. Páginas individuales por cada servicio para capturar búsquedas específicas.',
    metrics: [
      {
        value: '+100',
        label: 'Visitas orgánicas desde Google',
        source: 'en los primeros 30 días',
      },
      {
        value: 'Top Maps',
        label: 'Posicionamiento en Google Maps',
        source: 'verificado manualmente Mar 2026',
      },
      {
        value: '$0',
        label: 'Invertido en publicidad',
        source: '100% tráfico orgánico',
      },
    ],
    mapKeywords: [
      'botox la serena',
      'pinkglow la serena',
      'ácido hialurónico la serena',
    ],
    copyQuote:
      'CheckVital aparece en Google Maps cuando alguien busca "botox la serena" o "pinkglow la serena". Google mismo indica que te encuentra porque esas palabras están en tu sitio. Eso es SEO bien hecho.',
  },
];
