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
    name: 'Evelyn M.',
    initial: 'E',
    business: 'CheckVital, Coquimbo',
    rating: 5,
    text: 'Quería impulsar mi negocio y gracias a la asesoría de Seba entendí lo que necesitaba. Lo aplicamos y hoy recibo constantemente pacientes nuevos sin haber pagado por publicidad, solo posicionamiento de mi web y mi GMB.',
    date: '2026-02-15',
  },
  {
    name: 'Antocarz',
    initial: 'A',
    business: 'Car Audio & Accesorios, Coquimbo',
    rating: 5,
    text: 'Queríamos hacer una renovación de nuestra imagen y conocer el comportamiento de nuestros clientes. Seba dio en el clavo con una web informando nuestros principales servicios y pudiendo medir su impacto con analíticas.',
    date: '2026-03-10',
  },
  {
    name: 'SIMA Ingeniería',
    initial: 'S',
    business: 'Ingeniería, Coquimbo',
    rating: 5,
    text: 'Necesitábamos traspasar toda nuestra experiencia a una web que pudiera informar claramente a nuestros clientes. Seba lo logró al adoptar una imagen corporativa pero novedosa y además de estar presentes en los buscadores ahora podemos medir todo nuestro tráfico.',
    date: '2026-03-20',
  },
];

/** URL de la ficha de Google My Business para el botón "Ver todas las reseñas" */
export const GMB_REVIEWS_URL = 'https://g.page/r/TU_PLACE_ID/review';
