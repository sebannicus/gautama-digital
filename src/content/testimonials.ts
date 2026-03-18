/**
 * testimonials.ts
 * Propósito: Reseñas reales de Google My Business para mostrar en la página.
 * Principio Information Expert (GRASP): única fuente de verdad para testimonios.
 *
 * INSTRUCCIONES:
 * - Copia tus reseñas de Google My Business directamente aquí.
 * - El campo `googleProfileUrl` puede quedar vacío si no tienes el link directo.
 * - `date` en formato ISO 'YYYY-MM-DD'.
 */

export interface Testimonial {
  name: string;
  /** Inicial que aparece en el avatar circular */
  initial: string;
  /** Negocio o rol del cliente (opcional) */
  business?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  /** Link al perfil del reseñador en Google (opcional) */
  googleProfileUrl?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Nombre Cliente 1',
    initial: 'N',
    business: 'Negocio o rubro',
    rating: 5,
    text: 'Reemplaza este texto con la reseña real de tu Google My Business. Copia y pega el texto exacto que dejó el cliente.',
    date: '2026-01-15',
    googleProfileUrl: '',
  },
  {
    name: 'Nombre Cliente 2',
    initial: 'N',
    business: 'Negocio o rubro',
    rating: 5,
    text: 'Reemplaza este texto con la reseña real de tu Google My Business. Copia y pega el texto exacto que dejó el cliente.',
    date: '2026-02-03',
    googleProfileUrl: '',
  },
  {
    name: 'Nombre Cliente 3',
    initial: 'N',
    business: 'Negocio o rubro',
    rating: 5,
    text: 'Reemplaza este texto con la reseña real de tu Google My Business. Copia y pega el texto exacto que dejó el cliente.',
    date: '2026-02-20',
    googleProfileUrl: '',
  },
];

/** URL de la ficha de Google My Business para el botón "Ver todas las reseñas" */
export const GMB_REVIEWS_URL = 'https://g.page/r/TU_PLACE_ID/review';
