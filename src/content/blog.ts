/**
 * blog.ts
 * Propósito: Datos de artículos del blog de Gautama Digital.
 * Principio Information Expert: única fuente de verdad del blog.
 * Relación: Consumido por BlogPreview.astro (home) y blog/[slug].astro (página individual).
 */

export type ContentBlock =
  | { readonly type: 'p';         readonly text: string }
  | { readonly type: 'h2';        readonly text: string }
  | { readonly type: 'h3';        readonly text: string }
  | { readonly type: 'ul';        readonly items: readonly string[] }
  | { readonly type: 'highlight'; readonly text: string };

export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly categoryColor: string;
  readonly gradientFrom: string;
  readonly gradientTo: string;
  readonly readTime: number;
  readonly publishedAt: string;
  readonly content: readonly ContentBlock[];
}

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'landing-page-negocio-local',
    title: 'Por qué tu negocio local necesita una landing page (y no solo Instagram)',
    excerpt:
      'Muchos negocios en Chile operan solo desde Instagram o Facebook. Funciona al principio, pero tiene un techo. Una landing page profesional hace lo que las redes sociales no pueden: convertir visitas en clientes.',
    category: 'Diseño Web',
    categoryColor: '#0477BF',
    gradientFrom: '#0477BF',
    gradientTo: '#04C4D9',
    readTime: 5,
    publishedAt: '2026-04-10',
    content: [
      {
        type: 'p',
        text: 'El 70% de los negocios locales en Chile que conocemos arrancaron igual: una cuenta de Instagram, un número de WhatsApp y el boca a boca. Funciona. Hasta que deja de funcionar.',
      },
      {
        type: 'h2',
        text: '¿Qué problema tiene usar solo Instagram?',
      },
      {
        type: 'p',
        text: 'Instagram es una plataforma excelente para mostrar tu trabajo y generar comunidad. El problema es que no está diseñada para convertir. Cuando un potencial cliente llega a tu perfil, enfrenta distracciones: la competencia aparece en sus sugerencias, pierde el hilo del mensaje, no encuentra tu dirección ni tu horario fácilmente.',
      },
      {
        type: 'p',
        text: 'Además, tú no controlas el algoritmo. Hoy te muestra, mañana te esconde. Y si la plataforma cambia sus reglas —como ha pasado varias veces— tu negocio queda a merced de decisiones que tomaron en California.',
      },
      {
        type: 'h2',
        text: 'Lo que sí hace una landing page',
      },
      {
        type: 'ul',
        items: [
          'Aparece en Google cuando alguien busca tu servicio en tu ciudad — sin pagar publicidad',
          'Muestra tu oferta de forma clara, sin distracciones ni competencia',
          'Tiene un solo objetivo: que el visitante te contacte',
          'Genera confianza visual inmediata — los clientes ven un negocio serio',
          'Funciona las 24 horas, incluso cuando tú estás durmiendo',
        ],
      },
      {
        type: 'h2',
        text: 'El caso real: CheckVital en La Serena',
      },
      {
        type: 'p',
        text: 'CheckVital es un centro de estética médica en La Serena. Antes de trabajar con nosotros, dependían completamente de Instagram. Después de lanzar su landing page con SEO local optimizado, empezaron a aparecer en los primeros resultados de Google para búsquedas como "botox la serena" y "relleno facial la serena" — sin pagar un peso en publicidad.',
      },
      {
        type: 'highlight',
        text: 'Una landing profesional no reemplaza a Instagram — la potencia. Las redes traen tráfico, tu sitio lo convierte.',
      },
      {
        type: 'h2',
        text: '¿Cuánto cuesta y cuánto tiempo toma?',
      },
      {
        type: 'p',
        text: 'En Gautama Digital entregamos landings profesionales desde $280.000 CLP, listas en 7 días hábiles. Incluyen SEO local, formulario de contacto, análisis con Google Analytics 4 y diseño a medida — sin plantillas genéricas.',
      },
      {
        type: 'p',
        text: 'Si estás en La Serena, Coquimbo o cualquier ciudad de Chile y quieres dejar de depender solo del algoritmo, conversemos. El primer diagnóstico es sin costo.',
      },
    ],
  },
  {
    slug: 'seo-local-chile-google-maps',
    title: 'SEO Local en Chile: cómo hacer que Google recomiende tu negocio a clientes cercanos',
    excerpt:
      'Cuando alguien busca "mecánico cerca de mí" o "dentista Coquimbo", Google decide quién aparece. Con las técnicas correctas de SEO local, tu negocio puede estar entre los primeros — de forma orgánica.',
    category: 'SEO Local',
    categoryColor: '#04B2D9',
    gradientFrom: '#04B2D9',
    gradientTo: '#0477BF',
    readTime: 6,
    publishedAt: '2026-04-17',
    content: [
      {
        type: 'p',
        text: 'Cada día, miles de personas en La Serena, Coquimbo y el resto de Chile escriben en Google: "plomero cerca de mí", "dentista Coquimbo centro", "restaurant italiano La Serena". Google responde con un mapa y tres negocios destacados. Ese bloque se llama Local Pack — y estar ahí puede cambiar tu negocio.',
      },
      {
        type: 'h2',
        text: '¿Qué es el SEO Local?',
      },
      {
        type: 'p',
        text: 'SEO Local es el conjunto de técnicas que optimizan tu presencia en búsquedas con intención geográfica. A diferencia del SEO tradicional — que apunta a competir a nivel nacional — el SEO local te posiciona frente a personas que están en tu ciudad y quieren un servicio ahora.',
      },
      {
        type: 'h2',
        text: 'Los 4 factores clave para aparecer en Google Maps',
      },
      {
        type: 'ul',
        items: [
          'Perfil de Google Business (GMB) completo y verificado: nombre, categoría, horario, fotos, descripción',
          'Consistencia NAP: tu Nombre, Dirección y Teléfono deben ser idénticos en todas partes (web, GMB, redes)',
          'Reseñas: cantidad, calidad y velocidad de acumulación de reseñas en Google',
          'Señales on-page: tu web menciona tu ciudad, barrio y servicios en el contenido y los metadatos',
        ],
      },
      {
        type: 'h2',
        text: 'Paso a paso: optimiza tu Google Business hoy',
      },
      {
        type: 'h3',
        text: '1. Completa tu perfil al 100%',
      },
      {
        type: 'p',
        text: 'Muchos negocios tienen un perfil de Google Business a medias. Asegúrate de tener: categoría principal correcta, horario actualizado (incluyendo feriados), descripción con tus keywords, al menos 10 fotos de calidad, y el sitio web enlazado.',
      },
      {
        type: 'h3',
        text: '2. Consigue reseñas de forma sistemática',
      },
      {
        type: 'p',
        text: 'No esperes que los clientes reseñen por su cuenta. Después de cada servicio, envía un mensaje por WhatsApp con el enlace directo a dejar una reseña. Un simple "¿quedaste conforme? Nos ayudaría muchísimo una reseña en Google" duplica la tasa de respuesta.',
      },
      {
        type: 'h3',
        text: '3. Optimiza tu landing page para tu ciudad',
      },
      {
        type: 'p',
        text: 'Tu sitio web debe mencionar tu ciudad de forma natural en el título de la página, en los encabezados H1/H2 y en el cuerpo del texto. "Diseño de jardines en Coquimbo" tiene más posibilidades de posicionar que "Diseño de jardines".',
      },
      {
        type: 'highlight',
        text: 'El SEO local no es magia — es disciplina. Un perfil bien mantenido y un sitio optimizado para tu ciudad pueden posicionarte en semanas, no meses.',
      },
      {
        type: 'h2',
        text: '¿Cuánto tiempo tarda en funcionar?',
      },
      {
        type: 'p',
        text: 'Para negocios locales con poca competencia en su ciudad, los resultados suelen verse en 4 a 8 semanas. En ciudades más competitivas, puede tomar 3 a 6 meses. La clave es la consistencia: publicar en GMB semanalmente, responder todas las reseñas y mantener el perfil actualizado.',
      },
      {
        type: 'p',
        text: 'En Gautama Digital implementamos SEO local en cada landing que construimos. Si quieres que tu negocio aparezca en Google sin pagar publicidad, podemos ayudarte.',
      },
    ],
  },
  {
    slug: 'agente-whatsapp-ia-ventas',
    title: 'Agente WhatsApp IA: automatiza tus ventas sin contratar más personal',
    excerpt:
      'Un agente de inteligencia artificial en WhatsApp responde consultas, califica clientes y agenda citas — las 24 horas del día. Para negocios que reciben muchos mensajes y no dan abasto, es un cambio de juego.',
    category: 'Automatización IA',
    categoryColor: '#04C4D9',
    gradientFrom: '#04C4D9',
    gradientTo: '#0477BF',
    readTime: 4,
    publishedAt: '2026-04-22',
    content: [
      {
        type: 'p',
        text: '¿Cuántos mensajes de WhatsApp recibe tu negocio al día? ¿5? ¿20? ¿Más? Cada mensaje que no se responde a tiempo es un cliente que se va a la competencia. Un agente de IA en WhatsApp resuelve ese problema sin que tengas que contratar a nadie.',
      },
      {
        type: 'h2',
        text: '¿Qué hace exactamente un Agente WhatsApp IA?',
      },
      {
        type: 'ul',
        items: [
          'Responde preguntas frecuentes instantáneamente — precios, horarios, servicios, ubicación',
          'Califica al cliente: distingue quién está listo para comprar de quien solo está curioseando',
          'Agenda citas o reuniones directamente en el chat',
          'Deriva al humano cuando la conversación lo requiere — sin fricción',
          'Registra cada consulta para que puedas hacer seguimiento',
        ],
      },
      {
        type: 'h2',
        text: '¿Para qué tipo de negocio funciona mejor?',
      },
      {
        type: 'p',
        text: 'Funciona especialmente bien para negocios de servicios con preguntas repetitivas: centros de estética, clínicas dentales, talleres mecánicos, inmobiliarias, academias, restaurantes con reservas, y cualquier negocio que reciba muchas consultas antes de una compra.',
      },
      {
        type: 'highlight',
        text: 'Un agente IA no reemplaza la calidez humana — filtra el ruido para que tú puedas enfocarte en las conversaciones que realmente importan.',
      },
      {
        type: 'h2',
        text: 'Cómo funciona técnicamente',
      },
      {
        type: 'p',
        text: 'El agente se conecta a la API oficial de WhatsApp Business y se entrena con la información de tu negocio: servicios, precios, políticas, horarios y el tono de comunicación que usas. No necesitas cambiar tu número ni instalar nada en tu teléfono.',
      },
      {
        type: 'h2',
        text: '¿Cuánto cuesta?',
      },
      {
        type: 'p',
        text: 'En Gautama Digital implementamos el Agente WhatsApp IA por $350.000 CLP de implementación, con una mantención mensual de $50.000 CLP. Eso incluye entrenamiento inicial, ajustes durante el primer mes y soporte continuo.',
      },
      {
        type: 'p',
        text: 'Si tu negocio recibe más de 20 consultas al día por WhatsApp, el ahorro de tiempo en el primer mes ya paga la inversión. Conversemos y te mostramos una demo.',
      },
    ],
  },
];
