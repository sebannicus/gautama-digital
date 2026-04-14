/**
 * portfolio.ts
 * Propósito: Datos de proyectos reales entregados por Gautama Digital.
 * Principio Information Expert: única fuente de verdad del portafolio.
 * Relación: Consumido por Portfolio.astro.
 */

export interface PortfolioProject {
  readonly id: string;
  readonly name: string;
  readonly industry: string;
  readonly description: string;
  readonly url: string | null;
  readonly href: string | null;
  readonly tags: readonly string[];
  readonly accentColor: string;
}

export const PORTFOLIO: readonly PortfolioProject[] = [
  {
    id: 'checkvital',
    name: 'CheckVital',
    industry: 'Salud & Bienestar · La Serena',
    description: 'Centro de estética médica posicionado en Google Maps para "botox la serena" y otras keywords de alto valor — sin pagar publicidad.',
    url: 'checkvital.cl',
    href: 'https://checkvital.cl',
    tags: ['Landing', 'SEO Local', 'Salud'],
    accentColor: '#0477BF',
  },
  {
    id: 'vital-airpower',
    name: 'Vital Airpower',
    industry: 'Ingeniería Industrial · Coquimbo',
    description: 'Landing corporativa para empresa de sistemas de aire comprimido industrial. Imagen profesional B2B con formulario de contacto y analíticas.',
    url: 'vital-airpower.vercel.app',
    href: 'https://vital-airpower.vercel.app',
    tags: ['Landing', 'B2B', 'Industrial'],
    accentColor: '#003F87',
  },
  {
    id: 'sima',
    name: 'SIMA Ingeniería',
    industry: 'Ingeniería · Coquimbo',
    description: 'Presencia corporativa digital para empresa de ingeniería. Imagen moderna con analíticas de tráfico y medición de contactos configuradas.',
    url: null,
    href: null,
    tags: ['Landing', 'Analíticas', 'Corporativo'],
    accentColor: '#1B3A6B',
  },
  {
    id: 'antocarz',
    name: 'Antocarz',
    industry: 'Car Audio & Accesorios · Coquimbo',
    description: 'Renovación de imagen digital para local de car audio. Web con servicios claros y analíticas para medir el comportamiento de los clientes.',
    url: 'antocarz.vercel.app',
    href: 'https://antocarz.vercel.app',
    tags: ['Landing', 'Analíticas', 'Retail'],
    accentColor: '#1A1A2E',
  },
  {
    id: 'salvatierra',
    name: 'Salvatierra Paintworks',
    industry: 'Pintura Profesional · IV Región',
    description: 'Landing orientada a captación de clientes locales para empresa de pintura. Diseño que genera confianza y convierte visitas en consultas.',
    url: null,
    href: null,
    tags: ['Landing', 'Local', 'Servicios'],
    accentColor: '#7B3F00',
  },
  {
    id: 'scheidl',
    name: 'Constructora Scheidl',
    industry: 'Construcción · IV Región',
    description: 'Sitio corporativo para constructora con catálogo de proyectos y presentación institucional. Presencia profesional que genera credibilidad.',
    url: null,
    href: null,
    tags: ['Landing', 'Construcción', 'B2B'],
    accentColor: '#4A5568',
  },
];
