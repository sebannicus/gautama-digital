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
    name: 'Carlos Muñoz',
    initial: 'C',
    business: 'Ferretería El Maestro, La Serena',
    rating: 5,
    text: 'Antes no aparecíamos en Google para nada. Sebastián nos hizo el sitio y optimizó el Google Maps, y al mes ya teníamos gente llamando que nos encontró por ahí. Muy buen trabajo, se nota que entiende el negocio, no solo la parte técnica.',
    date: '2026-01-28',
  },
  {
    name: 'Patricia Soto',
    initial: 'P',
    business: 'Centro Dental Soto, Coquimbo',
    rating: 5,
    text: 'Lo contraté para renovar la página web de mi clínica y el resultado fue mucho mejor de lo que esperaba. El sitio quedó profesional, carga rápido y ahora aparecemos primeros cuando buscan dentista en Coquimbo. Muy recomendable.',
    date: '2026-02-11',
  },
  {
    name: 'Rodrigo Espinoza',
    initial: 'R',
    business: 'Hostal Brisas del Norte, La Serena',
    rating: 5,
    text: 'Excelente servicio. Seba es muy directo, explica todo sin tecnicismos y cumple los tiempos. El hostal ahora recibe reservas a través del sitio web y aparecemos en Google Maps con toda la información correcta. Valió cada peso.',
    date: '2026-03-04',
  },
];

/** URL de la ficha de Google My Business para el botón "Ver todas las reseñas" */
export const GMB_REVIEWS_URL = 'https://g.page/r/TU_PLACE_ID/review';
