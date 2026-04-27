/**
 * blog.ts
 * Propósito: Datos de artículos del blog de Gautama Digital.
 * Principio Information Expert: única fuente de verdad del blog.
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

  /* ─────────────────────────────────────────────
   * DISEÑO WEB
   * ───────────────────────────────────────────── */

  {
    slug: 'landing-page-negocio-local',
    title: 'Por qué tu negocio local necesita una landing page (y no solo Instagram)',
    excerpt: 'Muchos negocios en Chile operan solo desde Instagram o Facebook. Funciona al principio, pero tiene un techo. Una landing page profesional hace lo que las redes sociales no pueden: convertir visitas en clientes.',
    category: 'Diseño Web',
    categoryColor: '#0477BF',
    gradientFrom: '#0477BF',
    gradientTo: '#04C4D9',
    readTime: 5,
    publishedAt: '2026-04-10',
    content: [
      { type: 'p', text: 'El 70% de los negocios locales en Chile que conocemos arrancaron igual: una cuenta de Instagram, un número de WhatsApp y el boca a boca. Funciona. Hasta que deja de funcionar.' },
      { type: 'h2', text: '¿Qué problema tiene usar solo Instagram?' },
      { type: 'p', text: 'Instagram es una plataforma excelente para mostrar tu trabajo y generar comunidad. El problema es que no está diseñada para convertir. Cuando un potencial cliente llega a tu perfil, enfrenta distracciones: la competencia aparece en sus sugerencias, pierde el hilo del mensaje, no encuentra tu dirección ni tu horario fácilmente.' },
      { type: 'p', text: 'Además, tú no controlas el algoritmo. Hoy te muestra, mañana te esconde. Y si la plataforma cambia sus reglas —como ha pasado varias veces— tu negocio queda a merced de decisiones que tomaron en California.' },
      { type: 'h2', text: 'Lo que sí hace una landing page' },
      { type: 'ul', items: [
        'Aparece en Google cuando alguien busca tu servicio en tu ciudad — sin pagar publicidad',
        'Muestra tu oferta de forma clara, sin distracciones ni competencia',
        'Tiene un solo objetivo: que el visitante te contacte',
        'Genera confianza visual inmediata — los clientes ven un negocio serio',
        'Funciona las 24 horas, incluso cuando tú estás durmiendo',
      ]},
      { type: 'h2', text: 'El caso real: CheckVital en La Serena' },
      { type: 'p', text: 'CheckVital es un centro de estética médica en La Serena. Antes de trabajar con nosotros, dependían completamente de Instagram. Después de lanzar su landing page con SEO local, empezaron a aparecer en los primeros resultados para "botox la serena" — sin pagar un peso en publicidad.' },
      { type: 'highlight', text: 'Una landing profesional no reemplaza a Instagram — la potencia. Las redes traen tráfico, tu sitio lo convierte.' },
      { type: 'p', text: 'En Gautama Digital entregamos landings desde $280.000 CLP en 7 días hábiles. Incluyen SEO local, Analytics y diseño a medida. El diagnóstico es sin costo.' },
    ],
  },

  {
    slug: 'cuanto-cuesta-pagina-web-chile-2026',
    title: '¿Cuánto cuesta una página web en Chile en 2026? La guía honesta',
    excerpt: 'Desde $50.000 por una plantilla genérica hasta $5.000.000 por un desarrollo a medida. ¿Qué necesita realmente tu negocio y cuánto deberías pagar? Aquí la guía sin letra pequeña.',
    category: 'Diseño Web',
    categoryColor: '#0477BF',
    gradientFrom: '#0477BF',
    gradientTo: '#04C4D9',
    readTime: 6,
    publishedAt: '2026-02-03',
    content: [
      { type: 'p', text: 'Una de las primeras preguntas que hacen los dueños de negocio al buscar presencia digital es "¿cuánto cuesta una página web?". La respuesta honesta es: depende. Pero eso no te sirve de nada, así que vamos a los números reales.' },
      { type: 'h2', text: 'Los rangos de precio reales en el mercado chileno' },
      { type: 'ul', items: [
        'Plantilla WordPress + Wix DIY: $0 – $80.000 CLP — sin soporte, sin SEO real, sin identidad de marca',
        'Freelancer básico (estudiante / principiante): $80.000 – $200.000 CLP — calidad variable',
        'Landing profesional con SEO (agencia boutique): $200.000 – $450.000 CLP — esto es lo que necesita la mayoría',
        'Sitio multi-página con blog y analíticas: $400.000 – $900.000 CLP',
        'E-commerce completo: $700.000 – $2.000.000+ CLP',
        'Desarrollo a medida con integraciones complejas: $2.000.000+ CLP',
      ]},
      { type: 'h2', text: '¿Qué incluye una buena landing page?' },
      { type: 'p', text: 'Una landing page profesional para un negocio local debería incluir: diseño a medida (no plantilla genérica), SEO local configurado, formulario de contacto o CTA a WhatsApp, Google Analytics 4, versión mobile optimizada y carga rápida. Si el proveedor no menciona SEO ni Analytics, busca otro.' },
      { type: 'h2', text: '¿Por qué no comprar la plantilla más barata?' },
      { type: 'p', text: 'El problema con una plantilla genérica no es el diseño — es que Google no la indexará bien. Sin SEO local, tu sitio no aparece cuando alguien busca tu servicio en tu ciudad. Un sitio invisible no vende.' },
      { type: 'highlight', text: 'Una landing bien construida se paga sola. Si atrae 3 clientes nuevos al mes que no llegaban antes, en 60 días ya recuperaste la inversión.' },
      { type: 'p', text: 'En Gautama Digital, la Landing Profesional parte en $280.000 CLP (pago único). Sin mensualidades obligatorias. El sitio es tuyo.' },
    ],
  },

  {
    slug: 'diferencia-landing-page-sitio-web',
    title: 'Landing page vs sitio web completo: ¿cuál necesita tu negocio?',
    excerpt: 'No es lo mismo una landing page que un sitio web de varias páginas. Cada uno cumple un objetivo distinto. Aquí te explicamos qué es cada uno y cuándo conviene cada opción.',
    category: 'Diseño Web',
    categoryColor: '#0477BF',
    gradientFrom: '#0477BF',
    gradientTo: '#04C4D9',
    readTime: 4,
    publishedAt: '2026-02-28',
    content: [
      { type: 'p', text: 'Cuando un cliente nos dice "quiero una página web", lo primero que preguntamos es: ¿para qué? Porque una landing page y un sitio web son herramientas distintas con objetivos distintos.' },
      { type: 'h2', text: '¿Qué es una landing page?' },
      { type: 'p', text: 'Una landing page es una página única, diseñada con un solo objetivo: que el visitante tome una acción (llamar, escribir por WhatsApp, agendar). No tiene menú de navegación complejo ni múltiples secciones de contenido. Está optimizada para convertir.' },
      { type: 'h2', text: '¿Qué es un sitio web completo?' },
      { type: 'p', text: 'Un sitio web tiene múltiples páginas: Inicio, Servicios, Sobre Nosotros, Blog, Contacto. Es ideal para negocios con varios servicios diferenciados, que necesitan educar al cliente antes de la compra o que quieren publicar contenido para SEO de largo plazo.' },
      { type: 'h2', text: '¿Cuál necesitas?' },
      { type: 'ul', items: [
        'Landing page: negocio de un servicio principal, objetivo = consultas / reservas, presupuesto inicial ajustado',
        'Sitio multi-página: múltiples servicios o productos, necesitas posicionar muchas keywords, quieres blog para SEO',
        'E-commerce: vendes productos físicos o digitales con carrito de compra',
      ]},
      { type: 'highlight', text: 'Para la mayoría de los negocios locales en Chile, una landing page bien construida supera en conversión a un sitio de 10 páginas mediocre.' },
      { type: 'p', text: 'En Gautama Digital empezamos con la landing para validar resultados. Si el negocio escala, expandimos. Ese es el enfoque inteligente.' },
    ],
  },

  {
    slug: 'velocidad-web-por-que-importa',
    title: 'Velocidad web: por qué un sitio lento te hace perder clientes (y cómo solucionarlo)',
    excerpt: 'Google penaliza los sitios lentos en su ranking. Y tus clientes los abandonan antes de leer una palabra. La velocidad no es solo técnica — es dinero.',
    category: 'Diseño Web',
    categoryColor: '#0477BF',
    gradientFrom: '#0477BF',
    gradientTo: '#04C4D9',
    readTime: 5,
    publishedAt: '2026-03-28',
    content: [
      { type: 'p', text: 'Tienes 3 segundos. Ese es el tiempo promedio que un usuario espera antes de cerrar un sitio que carga lento. En mobile, el umbral baja a 2 segundos. Si tu sitio web tarda más en aparecer, estás perdiendo visitas — y ventas — antes de que el cliente lea una sola palabra.' },
      { type: 'h2', text: '¿Cómo afecta la velocidad al SEO?' },
      { type: 'p', text: 'Google usa los Core Web Vitals como factor de ranking: LCP (velocidad de carga del elemento principal), FID (respuesta al primer clic) y CLS (estabilidad visual). Un sitio lento queda abajo en los resultados, aunque tenga mejor contenido que la competencia.' },
      { type: 'h2', text: 'Las causas más comunes de sitios lentos' },
      { type: 'ul', items: [
        'Imágenes sin optimizar (el problema más común — a veces pesa el 90% de la página)',
        'Plantillas WordPress con docenas de plugins activos',
        'Hosting barato en servidores compartidos saturados',
        'Código CSS/JS no minificado',
        'Sin caché configurada',
      ]},
      { type: 'h2', text: 'Cómo medirlo gratis hoy mismo' },
      { type: 'p', text: 'Entra a pagespeed.web.dev, ingresa la URL de tu sitio y Google te da una nota de 0 a 100. Un puntaje bajo en mobile (bajo 50) significa que estás perdiendo posicionamiento y conversión. Un puntaje sobre 80 es el objetivo mínimo.' },
      { type: 'highlight', text: 'Los sitios que construimos en Gautama Digital parten con puntajes de 90+ en PageSpeed. La velocidad no es un extra — es parte del estándar.' },
    ],
  },

  {
    slug: 'diseno-web-que-convierte',
    title: 'Diseño web que convierte: los 7 elementos que hacen que un visitante se contacte',
    excerpt: 'Un sitio web bonito no necesariamente vende. Un sitio que convierte tiene elementos específicos en posiciones específicas. Aquí los 7 que nunca pueden faltar.',
    category: 'Diseño Web',
    categoryColor: '#0477BF',
    gradientFrom: '#0477BF',
    gradientTo: '#04C4D9',
    readTime: 5,
    publishedAt: '2026-04-07',
    content: [
      { type: 'p', text: 'Diseño web no es hacer algo que se vea bien. Es construir un camino visual que lleve al visitante a tomar una acción — llamar, escribir, agendar, comprar. Estos son los 7 elementos que nunca faltan en los sitios que mejor convierten.' },
      { type: 'h2', text: 'Los 7 elementos que sí funcionan' },
      { type: 'ul', items: [
        '1. Propuesta de valor clara en el hero — en 5 segundos el visitante sabe qué haces, para quién y por qué eres diferente',
        '2. CTA visible desde el primer scroll — un botón de acción que no necesite buscarse',
        '3. Prueba social cerca del hero — testimonios, cantidad de clientes, logos de medios',
        '4. Beneficios, no características — el cliente quiere saber qué gana, no qué incluye el plan',
        '5. Imágenes reales del negocio — las fotos de stock generan desconfianza',
        '6. Velocidad de carga bajo 2 segundos — un sitio lento mata la conversión',
        '7. Mobile-first — más del 70% del tráfico viene de teléfonos en Chile',
      ]},
      { type: 'h2', text: 'Lo que casi nadie aplica: el flujo de lectura F' },
      { type: 'p', text: 'Los estudios de eye-tracking muestran que los usuarios leen en patrón F: primero el título, luego el primer párrafo horizontal, luego bajan por el margen izquierdo. Los elementos más importantes deben estar en esa trayectoria.' },
      { type: 'highlight', text: 'El diseño no es decoración. Cada elemento tiene una función. Si no ayuda a convertir, sobra.' },
      { type: 'p', text: 'En Gautama Digital aplicamos estos principios en cada proyecto. El resultado: sitios que se ven bien Y generan contactos reales.' },
    ],
  },

  /* ─────────────────────────────────────────────
   * SEO LOCAL
   * ───────────────────────────────────────────── */

  {
    slug: 'seo-local-chile-google-maps',
    title: 'SEO Local en Chile: cómo hacer que Google recomiende tu negocio a clientes cercanos',
    excerpt: 'Cuando alguien busca "mecánico cerca de mí" o "dentista Coquimbo", Google decide quién aparece. Con las técnicas correctas de SEO local, tu negocio puede estar entre los primeros — de forma orgánica.',
    category: 'SEO Local',
    categoryColor: '#04B2D9',
    gradientFrom: '#04B2D9',
    gradientTo: '#0477BF',
    readTime: 6,
    publishedAt: '2026-04-17',
    content: [
      { type: 'p', text: 'Cada día, miles de personas en La Serena, Coquimbo y el resto de Chile escriben en Google: "plomero cerca de mí", "dentista Coquimbo centro", "restaurant italiano La Serena". Google responde con un mapa y tres negocios destacados. Ese bloque se llama Local Pack — y estar ahí puede cambiar tu negocio.' },
      { type: 'h2', text: '¿Qué es el SEO Local?' },
      { type: 'p', text: 'SEO Local es el conjunto de técnicas que optimizan tu presencia en búsquedas con intención geográfica. A diferencia del SEO tradicional, el SEO local te posiciona frente a personas que están en tu ciudad y quieren un servicio ahora.' },
      { type: 'h2', text: 'Los 4 factores clave para aparecer en Google Maps' },
      { type: 'ul', items: [
        'Perfil de Google Business completo y verificado: nombre, categoría, horario, fotos, descripción',
        'Consistencia NAP: tu Nombre, Dirección y Teléfono deben ser idénticos en todas partes',
        'Reseñas: cantidad, calidad y velocidad de acumulación en Google',
        'Señales on-page: tu web menciona tu ciudad y servicios en el contenido y metadatos',
      ]},
      { type: 'h2', text: 'Paso a paso: optimiza tu Google Business hoy' },
      { type: 'h3', text: '1. Completa tu perfil al 100%' },
      { type: 'p', text: 'Categoría principal correcta, horario actualizado, descripción con keywords, al menos 10 fotos de calidad, y sitio web enlazado.' },
      { type: 'h3', text: '2. Consigue reseñas sistemáticamente' },
      { type: 'p', text: 'Después de cada servicio, envía un mensaje por WhatsApp con el enlace directo a dejar una reseña. Un "¿quedaste conforme? Nos ayudaría una reseña en Google" duplica la tasa de respuesta.' },
      { type: 'highlight', text: 'El SEO local no es magia — es disciplina. Un perfil bien mantenido y un sitio optimizado para tu ciudad pueden posicionarte en semanas, no meses.' },
    ],
  },

  {
    slug: 'google-my-business-guia-completa',
    title: 'Guía completa de Google My Business para negocios locales en Chile',
    excerpt: 'Google My Business (ahora Google Business Profile) es la herramienta más poderosa que tiene un negocio local para aparecer en Google — y es gratis. Aquí cómo configurarlo correctamente.',
    category: 'SEO Local',
    categoryColor: '#04B2D9',
    gradientFrom: '#04B2D9',
    gradientTo: '#0477BF',
    readTime: 7,
    publishedAt: '2026-01-22',
    content: [
      { type: 'p', text: 'Google Business Profile (antes Google My Business) es la ficha que aparece a la derecha cuando alguien busca tu negocio en Google, o como resultado en Google Maps. Es gratis, es poderosa y la mayoría de los negocios en Chile la tiene incompleta o mal configurada.' },
      { type: 'h2', text: 'Paso 1: Crear o reclamar tu ficha' },
      { type: 'p', text: 'Entra a business.google.com y busca tu negocio. Si ya existe (alguien lo creó antes), reclámalo. Si no existe, créalo. Google te enviará una postal con un código de verificación a la dirección del negocio — ese paso es obligatorio.' },
      { type: 'h2', text: 'Paso 2: Los campos que sí importan para el ranking' },
      { type: 'ul', items: [
        'Categoría principal: elige la más específica posible ("Centro de estética médica" > "Salud y belleza")',
        'Descripción del negocio: 750 caracteres con tus keywords principales de forma natural',
        'Horario de atención: incluyendo días festivos y horario especial de temporada',
        'Atributos: WiFi gratis, estacionamiento, acceso para sillas de ruedas, etc.',
        'Fotografías: al menos 1 foto nueva por semana — Google las premia con más visibilidad',
      ]},
      { type: 'h2', text: 'Paso 3: Publicar en tu perfil semanalmente' },
      { type: 'p', text: 'Google Business tiene una función de "publicaciones" similar a Instagram. Publicar una vez a la semana — una oferta, un consejo, una foto nueva — le dice a Google que tu negocio está activo. Los negocios activos aparecen antes.' },
      { type: 'h2', text: 'Paso 4: Gestionar las reseñas' },
      { type: 'p', text: 'Responde todas las reseñas — las positivas y las negativas. Google valora que el negocio responda. Una respuesta profesional a una reseña negativa genera más confianza que ignorarla.' },
      { type: 'highlight', text: 'Un Google Business Profile completo y activo puede posicionarte en el Local Pack (el bloque de 3 resultados del mapa) sin que tengas sitio web. Con sitio web, el efecto se multiplica.' },
    ],
  },

  {
    slug: 'como-conseguir-resenas-google',
    title: 'Cómo conseguir reseñas en Google: la estrategia que funciona para negocios locales',
    excerpt: 'Las reseñas en Google son el factor de confianza número uno para clientes locales. Aquí la estrategia paso a paso para conseguirlas sin rogar y sin comprarlas.',
    category: 'SEO Local',
    categoryColor: '#04B2D9',
    gradientFrom: '#04B2D9',
    gradientTo: '#0477BF',
    readTime: 5,
    publishedAt: '2026-03-21',
    content: [
      { type: 'p', text: 'El 87% de los consumidores lee reseñas antes de elegir un negocio local. Y en Google Maps, la cantidad y calidad de reseñas es el factor diferenciador más visible entre competidores. Sin embargo, la mayoría de los negocios no tiene una estrategia para conseguirlas.' },
      { type: 'h2', text: 'Por qué los clientes no dejan reseñas por su cuenta' },
      { type: 'p', text: 'No es que no quieran — es que nadie se los pide. Los clientes satisfechos siguen con su vida. Los insatisfechos sí se toman el tiempo de quejarse. Por eso, sin una estrategia activa, las reseñas se acumulan más por experiencias negativas que positivas.' },
      { type: 'h2', text: 'La estrategia de 3 pasos que funciona' },
      { type: 'h3', text: '1. Crea el enlace directo a tu perfil de reseñas' },
      { type: 'p', text: 'Entra a business.google.com → tu perfil → "Obtener más reseñas" → copia el enlace corto. Ese es el enlace que enviarás a tus clientes. No los hagas buscar tu negocio manualmente.' },
      { type: 'h3', text: '2. Pídelas en el momento correcto' },
      { type: 'p', text: 'El momento ideal es justo después de que el cliente expresó satisfacción — terminó el servicio, te dijo "quedó genial", pagó y está de buen ánimo. En ese momento, di: "Me ayudarías muchísimo con una reseña en Google, te mando el enlace."' },
      { type: 'h3', text: '3. Automatiza el envío por WhatsApp' },
      { type: 'p', text: 'Crea un mensaje de WhatsApp guardado con el enlace: "Hola [nombre], fue un placer atenderte. Si te pareció bien el servicio, nos ayudaría mucho una reseña en Google: [enlace]. ¡Gracias!" Envíalo dentro de las 24 horas post-servicio.' },
      { type: 'highlight', text: 'Meta: 1 reseña nueva por semana. Con esa cadencia, en 3 meses superas a la mayoría de tu competencia en Google Maps.' },
    ],
  },

  {
    slug: 'keywords-locales-como-encontrarlas',
    title: 'Cómo encontrar las keywords locales que tus clientes escriben en Google',
    excerpt: 'El SEO local empieza por saber qué palabras exactas escriben tus clientes. Aquí el método para encontrarlas sin pagar herramientas caras.',
    category: 'SEO Local',
    categoryColor: '#04B2D9',
    gradientFrom: '#04B2D9',
    gradientTo: '#0477BF',
    readTime: 5,
    publishedAt: '2026-04-13',
    content: [
      { type: 'p', text: 'Todo el SEO parte de una pregunta: ¿qué palabras escribe tu cliente ideal en Google cuando necesita lo que tú ofreces? No lo que tú crees que escribe — lo que realmente escribe. Hay una diferencia enorme.' },
      { type: 'h2', text: 'El error más común: optimizar para palabras técnicas' },
      { type: 'p', text: 'Un dentista puede optimizar para "endodoncia" — pero sus clientes buscan "dolor de muela Coquimbo" o "dentista urgencia La Serena". El vocabulario del cliente no siempre coincide con el vocabulario del profesional.' },
      { type: 'h2', text: 'Método 1: Google Autocomplete (gratis y muy preciso)' },
      { type: 'p', text: 'Abre Google en modo incógnito, escribe tu servicio + tu ciudad y observa qué sugiere el autocompletado. Esas sugerencias son búsquedas reales que la gente hace. Anótalas todas.' },
      { type: 'h2', text: 'Método 2: Google Search Console' },
      { type: 'p', text: 'Si ya tienes sitio web, conecta Google Search Console. En "Rendimiento > Consultas" ves exactamente qué palabras usaron las personas que llegaron a tu sitio — ordenadas por clics e impresiones.' },
      { type: 'h2', text: 'Método 3: Pregúntale a tus clientes' },
      { type: 'p', text: 'Pregunta directamente: "¿Cómo nos encontraste?" y "¿Qué buscaste en Google?". 10 respuestas reales valen más que cualquier herramienta de keyword research.' },
      { type: 'ul', items: [
        'Usa las keywords en el H1 de tu página',
        'Inclúyelas en la descripción de Google Business',
        'Úsalas en los textos alt de las imágenes',
        'Menciona tu ciudad de forma natural al menos 3 veces en el texto principal',
      ]},
      { type: 'highlight', text: 'La keyword perfecta tiene tres características: la busca tu cliente, tiene intención comercial (quiere contratar, no solo informarse) y tiene poca competencia local.' },
    ],
  },

  {
    slug: 'google-search-console-para-negocios',
    title: 'Google Search Console para negocios locales: qué medir y por dónde empezar',
    excerpt: 'Google Search Console es la herramienta gratuita de Google que te dice exactamente cómo ve Google tu sitio. Aquí lo que sí necesitas mirar como dueño de negocio — sin tecnicismos.',
    category: 'SEO Local',
    categoryColor: '#04B2D9',
    gradientFrom: '#04B2D9',
    gradientTo: '#0477BF',
    readTime: 5,
    publishedAt: '2026-04-18',
    content: [
      { type: 'p', text: 'Google Search Console (GSC) es la herramienta gratuita que Google ofrece para ver cómo aparece tu sitio en sus resultados. La mayoría de los negocios no la usa — y están perdiendo información valiosa sin saberlo.' },
      { type: 'h2', text: 'Qué muestra Search Console que Analytics no muestra' },
      { type: 'p', text: 'Analytics te dice qué pasa después de que alguien llega a tu sitio. Search Console te dice qué pasa antes: cuántas veces apareciste en Google, para qué búsquedas, y en qué posición. Son herramientas complementarias.' },
      { type: 'h2', text: 'Los 3 reportes que sí tienes que revisar' },
      { type: 'h3', text: '1. Rendimiento > Consultas' },
      { type: 'p', text: 'Muestra las palabras exactas que la gente escribió en Google y que hicieron aparecer tu sitio. Ordena por "clics" para ver cuáles realmente traen visitas. Esas son tus keywords que ya funcionan — optimiza más para ellas.' },
      { type: 'h3', text: '2. Cobertura > Páginas indexadas' },
      { type: 'p', text: 'Muestra cuántas páginas de tu sitio Google conoce. Si hay errores aquí, Google no puede mostrarte. Es como tener un local con la puerta cerrada — nadie puede entrar aunque te busquen.' },
      { type: 'h3', text: '3. Core Web Vitals' },
      { type: 'p', text: 'Muestra la velocidad y experiencia de usuario de tu sitio según Google. Un "Deficiente" en este reporte afecta directamente tu ranking.' },
      { type: 'highlight', text: 'Revisa Search Console una vez al mes. 20 minutos al mes pueden darte más información sobre tu SEO que cualquier agencia cobrando mensualidades.' },
    ],
  },

  {
    slug: 'posicionar-negocio-sin-publicidad',
    title: 'Cómo posicionar tu negocio local en Google sin pagar publicidad',
    excerpt: 'Google Ads funciona mientras pagas. El SEO orgánico funciona indefinidamente. Aquí la estrategia completa para que tu negocio aparezca en Google sin gastar en anuncios.',
    category: 'SEO Local',
    categoryColor: '#04B2D9',
    gradientFrom: '#04B2D9',
    gradientTo: '#0477BF',
    readTime: 6,
    publishedAt: '2026-03-07',
    content: [
      { type: 'p', text: 'Google Ads puede posicionarte en horas. Pero cuando dejas de pagar, desapareces. El SEO orgánico tarda más en dar resultados — pero una vez que posicionas, el tráfico llega solo, mes tras mes, sin pagar un peso extra.' },
      { type: 'h2', text: 'Los tres pilares del posicionamiento orgánico local' },
      { type: 'ul', items: [
        'Google Business Profile optimizado y activo: la base de todo el SEO local',
        'Sitio web con SEO on-page: keywords locales en títulos, texto y metadatos',
        'Reseñas consistentes: acumulación constante de reseñas positivas',
      ]},
      { type: 'h2', text: 'El error que comete el 80% de los negocios locales' },
      { type: 'p', text: 'Tener un sitio web que no menciona la ciudad. Si eres un dentista en Coquimbo y tu sitio solo dice "Somos un centro dental moderno" sin mencionar Coquimbo en ningún parte, Google no sabe que eres local — y no te muestra en búsquedas locales.' },
      { type: 'h2', text: 'Cronograma realista de resultados' },
      { type: 'ul', items: [
        'Semana 1-2: Google Business Profile optimizado, sitio web con keywords locales',
        'Mes 1-2: primeras apariciones en búsquedas de baja competencia',
        'Mes 2-4: posicionamiento en Google Maps para keywords principales',
        'Mes 4-6: tráfico orgánico estable y creciente',
      ]},
      { type: 'highlight', text: 'El SEO orgánico es la inversión más rentable para un negocio local. Pagas una vez (la construcción del sitio + configuración) y recibes tráfico indefinidamente.' },
    ],
  },

  /* ─────────────────────────────────────────────
   * AUTOMATIZACIÓN IA
   * ───────────────────────────────────────────── */

  {
    slug: 'agente-whatsapp-ia-ventas',
    title: 'Agente WhatsApp IA: automatiza tus ventas sin contratar más personal',
    excerpt: 'Un agente de inteligencia artificial en WhatsApp responde consultas, califica clientes y agenda citas — las 24 horas del día. Para negocios que reciben muchos mensajes y no dan abasto, es un cambio de juego.',
    category: 'Automatización IA',
    categoryColor: '#04C4D9',
    gradientFrom: '#04C4D9',
    gradientTo: '#0477BF',
    readTime: 4,
    publishedAt: '2026-04-22',
    content: [
      { type: 'p', text: '¿Cuántos mensajes de WhatsApp recibe tu negocio al día? ¿5? ¿20? ¿Más? Cada mensaje que no se responde a tiempo es un cliente que se va a la competencia. Un agente de IA en WhatsApp resuelve ese problema sin que tengas que contratar a nadie.' },
      { type: 'h2', text: '¿Qué hace exactamente un Agente WhatsApp IA?' },
      { type: 'ul', items: [
        'Responde preguntas frecuentes instantáneamente — precios, horarios, servicios, ubicación',
        'Califica al cliente: distingue quién está listo para comprar de quien solo está curioseando',
        'Agenda citas o reuniones directamente en el chat',
        'Deriva al humano cuando la conversación lo requiere',
        'Registra cada consulta para que puedas hacer seguimiento',
      ]},
      { type: 'h2', text: '¿Para qué tipo de negocio funciona mejor?' },
      { type: 'p', text: 'Funciona especialmente bien para negocios de servicios con preguntas repetitivas: centros de estética, clínicas dentales, talleres mecánicos, academias, restaurantes con reservas, y cualquier negocio que reciba muchas consultas antes de una compra.' },
      { type: 'highlight', text: 'Un agente IA no reemplaza la calidez humana — filtra el ruido para que tú puedas enfocarte en las conversaciones que realmente importan.' },
      { type: 'p', text: 'En Gautama Digital implementamos el Agente WhatsApp IA por $350.000 CLP de implementación, con mantención mensual de $50.000 CLP. Si tu negocio recibe más de 20 consultas diarias, el primer mes ya paga la inversión.' },
    ],
  },

  {
    slug: 'ia-para-negocios-locales-chile-2026',
    title: 'IA para negocios locales en Chile: las herramientas que realmente funcionan',
    excerpt: 'La inteligencia artificial ya no es exclusiva de grandes empresas. En 2026, cualquier negocio local puede usar IA para atender clientes, crear contenido y tomar mejores decisiones — sin ser técnico.',
    category: 'Automatización IA',
    categoryColor: '#04C4D9',
    gradientFrom: '#04C4D9',
    gradientTo: '#0477BF',
    readTime: 6,
    publishedAt: '2026-01-15',
    content: [
      { type: 'p', text: 'Hace dos años, hablar de inteligencia artificial en un negocio local sonaba a ciencia ficción. Hoy, dueños de peluquerías, talleres y centros de estética en La Serena y Coquimbo ya usan IA para responder mensajes, crear contenido y entender mejor a sus clientes.' },
      { type: 'h2', text: '¿Qué puede hacer la IA por tu negocio hoy?' },
      { type: 'ul', items: [
        'Responder consultas de WhatsApp automáticamente, 24/7',
        'Generar textos para Instagram, Google My Business y tu sitio web',
        'Analizar tus ventas y predecir tendencias',
        'Crear imágenes para promociones sin contratar diseñador',
        'Transcribir y resumir reuniones con clientes',
      ]},
      { type: 'h2', text: 'Las 4 herramientas IA más útiles para negocios locales' },
      { type: 'h3', text: 'ChatGPT / Claude — para escribir y responder' },
      { type: 'p', text: 'Sirven para redactar mensajes profesionales, crear publicaciones para redes, escribir la descripción de tus servicios y generar respuestas a preguntas frecuentes. No necesitas saber programar.' },
      { type: 'h3', text: 'Canva con IA — diseño visual' },
      { type: 'p', text: 'La función Magic Design de Canva genera diseños para posts, historias y publicidad a partir de texto. Resultado profesional en segundos.' },
      { type: 'h3', text: 'Agente WhatsApp personalizado' },
      { type: 'p', text: 'Un agente entrenado con la información de tu negocio puede responder preguntas específicas sobre tus precios, horarios y servicios — con tu tono de voz.' },
      { type: 'highlight', text: 'La IA no reemplaza tu negocio — amplifica tu capacidad de atender, comunicar y crecer sin aumentar tus costos fijos.' },
    ],
  },

  {
    slug: 'chatbot-ia-vs-atencion-humana',
    title: 'Chatbot IA vs atención humana: cuándo usar cada uno en tu negocio',
    excerpt: 'No todo lo puede hacer la IA. Y no todo debe hacerlo un humano. Aquí la guía para decidir qué automatizar y qué conversaciones requieren toque personal.',
    category: 'Automatización IA',
    categoryColor: '#04C4D9',
    gradientFrom: '#04C4D9',
    gradientTo: '#0477BF',
    readTime: 4,
    publishedAt: '2026-03-07',
    content: [
      { type: 'p', text: 'El mayor error al implementar IA en atención al cliente es pensar en todo o nada: o automatizas todo o no automatizas nada. La clave es saber exactamente qué conversaciones vale la pena automatizar y cuáles necesitan un humano.' },
      { type: 'h2', text: 'Qué sí puede hacer la IA mejor que un humano' },
      { type: 'ul', items: [
        'Responder preguntas frecuentes a las 3 AM sin cansarse',
        'Capturar datos del cliente (nombre, necesidad, presupuesto) antes de derivar',
        'Enviar confirmaciones, recordatorios y seguimientos automáticos',
        'Filtrar consultas: separar clientes serios de quienes solo comparan precios',
        'Responder a decenas de chats simultáneamente sin espera',
      ]},
      { type: 'h2', text: 'Qué necesita siempre un humano' },
      { type: 'ul', items: [
        'Negociaciones de precio o condiciones especiales',
        'Clientes molestos o con quejas — la empatía humana es insustituible',
        'Ventas de alto valor donde la confianza personal es decisiva',
        'Situaciones de urgencia real que requieren criterio',
      ]},
      { type: 'highlight', text: 'El modelo ideal: IA recibe, filtra y clasifica. Humano cierra los tratos importantes y resuelve los problemas complejos.' },
      { type: 'p', text: 'En Gautama Digital diseñamos el flujo de derivación IA→humano para que no haya fricciones. El cliente nunca siente que "lo atiende un robot".' },
    ],
  },

  {
    slug: 'automatizacion-marketing-digital-pymes',
    title: 'Automatización de marketing digital para pymes: qué automatizar primero',
    excerpt: 'No necesitas un equipo de 10 personas para tener una presencia digital consistente. Con las automatizaciones correctas, tu negocio puede funcionar como uno grande con los recursos de uno pequeño.',
    category: 'Automatización IA',
    categoryColor: '#04C4D9',
    gradientFrom: '#04C4D9',
    gradientTo: '#0477BF',
    readTime: 5,
    publishedAt: '2026-04-20',
    content: [
      { type: 'p', text: 'El problema de las pymes no es falta de ideas de marketing — es falta de tiempo para ejecutarlas con consistencia. La automatización resuelve exactamente eso: hace que las cosas pasen aunque no estés mirando.' },
      { type: 'h2', text: 'Las 5 automatizaciones con mejor retorno para una pyme' },
      { type: 'ul', items: [
        '1. Respuesta automática a mensajes de WhatsApp fuera de horario (IA)',
        '2. Publicación programada en redes sociales (Buffer, Meta Business Suite)',
        '3. Email de bienvenida automático cuando alguien llena tu formulario',
        '4. Recordatorio automático de cita por WhatsApp (24h antes)',
        '5. Solicitud de reseña automática por WhatsApp post-servicio',
      ]},
      { type: 'h2', text: 'Por dónde empezar si tienes presupuesto limitado' },
      { type: 'p', text: 'Empieza por la automatización que resuelve tu dolor más grande. Si pierdes clientes por no responder rápido: agente WhatsApp. Si tu marketing es inconsistente: programación de contenido. Si tienes pocas reseñas: automatización de solicitud de reseñas.' },
      { type: 'h2', text: 'Herramientas accesibles para comenzar' },
      { type: 'ul', items: [
        'Meta Business Suite: programación gratuita de posts en Instagram y Facebook',
        'WhatsApp Business: respuestas automáticas básicas incluidas en la app',
        'Google Business Profile: publicaciones programadas y respuestas automáticas',
        'Zapier (plan gratuito): conecta apps sin código',
      ]},
      { type: 'highlight', text: 'Una automatización que funciona el 80% del tiempo es infinitamente mejor que una atención humana inconsistente. La consistencia gana.' },
    ],
  },

  {
    slug: 'herramientas-ia-crear-contenido-redes',
    title: 'Herramientas IA para crear contenido de redes sociales sin contratar diseñador',
    excerpt: 'Publicar consistentemente en redes es el mayor dolor de los dueños de negocio. Estas herramientas de IA te permiten crear contenido profesional en minutos, no en horas.',
    category: 'Automatización IA',
    categoryColor: '#04C4D9',
    gradientFrom: '#04C4D9',
    gradientTo: '#0477BF',
    readTime: 5,
    publishedAt: '2026-04-23',
    content: [
      { type: 'p', text: 'El mayor problema del marketing de contenido para negocios locales no es saber qué publicar — es el tiempo que toma crear algo que se vea bien. Las herramientas de IA resolvieron ese problema.' },
      { type: 'h2', text: 'Para crear imágenes y diseños' },
      { type: 'h3', text: 'Canva (con IA integrada)' },
      { type: 'p', text: 'La función "Magic Design" de Canva genera diseños completos a partir de texto. Escribe "post de Instagram para cafetería moderna en Coquimbo" y obttienes 10 opciones de diseño en segundos. El plan gratuito alcanza.' },
      { type: 'h3', text: 'Adobe Firefly' },
      { type: 'p', text: 'Generador de imágenes por texto. Ideal para crear fondos, texturas y elementos visuales únicos que no existen en bancos de fotos.' },
      { type: 'h2', text: 'Para escribir el copy (textos)' },
      { type: 'h3', text: 'ChatGPT / Claude' },
      { type: 'p', text: 'Dale contexto: "Soy dueño de un taller mecánico en La Serena, necesito 5 ideas de posts para Instagram esta semana orientados a propietarios de autos que no le dan mantención". Las ideas que genera son un punto de partida que tú personalizas con tu voz.' },
      { type: 'h2', text: 'Para programar y publicar' },
      { type: 'p', text: 'Meta Business Suite (gratis) te permite programar posts para Instagram y Facebook con anticipación. Dedica 1 hora los lunes para programar la semana completa.' },
      { type: 'highlight', text: 'Con IA + 2 horas a la semana puedes tener una presencia en redes más consistente que la de negocios con community managers dedicados.' },
    ],
  },

  /* ─────────────────────────────────────────────
   * ANALÍTICAS
   * ───────────────────────────────────────────── */

  {
    slug: 'google-analytics-4-negocio-local',
    title: 'Google Analytics 4 para negocios locales: qué medir y cómo interpretarlo',
    excerpt: 'GA4 es gratuito y es el estándar de analítica web. Pero la mayoría de los negocios lo tiene instalado y no lo mira. Aquí las métricas que sí importan para un negocio local.',
    category: 'Analíticas',
    categoryColor: '#1B8A5A',
    gradientFrom: '#1B8A5A',
    gradientTo: '#04B2D9',
    readTime: 6,
    publishedAt: '2026-03-14',
    content: [
      { type: 'p', text: 'Google Analytics 4 registra cada visita, cada clic, cada acción que hace un usuario en tu sitio web. Es gratuito. Es el estándar de la industria. Y el 90% de los negocios que lo tienen instalado nunca lo miran.' },
      { type: 'h2', text: 'Las métricas que sí importan para un negocio local' },
      { type: 'ul', items: [
        'Usuarios activos: cuánta gente visita tu sitio (no "visitas" — GA4 cuenta usuarios únicos)',
        'Fuente de tráfico: cómo te encuentran (Google orgánico, Google Maps, redes sociales, directo)',
        'Páginas más vistas: qué secciones revisan más antes de contactarte',
        'Tasa de conversión: qué porcentaje de visitantes hace clic en tu WhatsApp o formulario',
        'Usuarios por ciudad: de dónde vienen geográficamente',
      ]},
      { type: 'h2', text: 'Cómo crear un evento de conversión básico' },
      { type: 'p', text: 'En GA4, un "evento de conversión" es cualquier acción importante: clic en WhatsApp, envío de formulario, llamada telefónica. Configura al menos uno para saber cuántos visitantes se convierten en contactos.' },
      { type: 'h2', text: 'La pregunta que debes responder cada mes' },
      { type: 'p', text: '¿De dónde vienen las personas que sí se contactan conmigo? Si la respuesta es "de Google orgánico", invierte más en SEO. Si es "de Instagram", invierte más en contenido social. Los datos te dicen dónde poner la energía.' },
      { type: 'highlight', text: 'No necesitas entender todo GA4. Necesitas entender tres números: cuántos visitan, de dónde vienen y cuántos se contactan. Eso ya es más información de la que tiene el 80% de tus competidores.' },
    ],
  },

  {
    slug: 'meta-pixel-que-es-como-funciona',
    title: 'Meta Pixel: qué es, para qué sirve y cómo instalarlo en tu sitio web',
    excerpt: 'El Meta Pixel (antes Facebook Pixel) es el código que conecta tu sitio web con tus anuncios en Facebook e Instagram. Si algún día quieres hacer publicidad, necesitas instalarlo hoy.',
    category: 'Analíticas',
    categoryColor: '#1B8A5A',
    gradientFrom: '#1B8A5A',
    gradientTo: '#04B2D9',
    readTime: 5,
    publishedAt: '2026-02-14',
    content: [
      { type: 'p', text: 'El Meta Pixel es un fragmento de código que se instala en tu sitio web y registra lo que hacen los visitantes: qué páginas ven, cuánto tiempo pasan, si hacen clic en tu WhatsApp. Esta información va directamente a tu cuenta de Facebook/Instagram.' },
      { type: 'h2', text: '¿Para qué sirve el Meta Pixel?' },
      { type: 'ul', items: [
        'Crear audiencias de remarketing: mostrar anuncios solo a quienes ya visitaron tu sitio',
        'Crear audiencias similares (Lookalike): Facebook encuentra personas parecidas a tus visitantes',
        'Optimizar anuncios hacia conversiones reales, no solo clics',
        'Medir el ROI de tus campañas de Facebook e Instagram Ads',
      ]},
      { type: 'h2', text: 'Por qué instalarlo ANTES de hacer publicidad' },
      { type: 'p', text: 'El Pixel necesita tiempo para aprender. Si instalas el Pixel hoy y haces publicidad en 3 meses, tendrás datos de comportamiento de 3 meses para optimizar los anuncios. Si instalas el Pixel el mismo día que empiezas a hacer publicidad, empiezas desde cero.' },
      { type: 'h2', text: 'Cómo verificar si está instalado correctamente' },
      { type: 'p', text: 'Instala la extensión "Meta Pixel Helper" en Chrome. Entra a tu sitio — si el Pixel está instalado correctamente, el ícono de la extensión se pone verde.' },
      { type: 'highlight', text: 'Instala el Meta Pixel aunque no vayas a hacer publicidad hoy. Los datos se acumulan. Cuando decidas invertir en ads, tendrás ventaja sobre quienes recién empiezan.' },
    ],
  },

  {
    slug: 'medir-roi-marketing-digital',
    title: 'Cómo medir el ROI de tu marketing digital (sin ser experto en datos)',
    excerpt: 'Si no mides, estás adivinando. El retorno de inversión del marketing digital es perfectamente medible — solo necesitas saber qué números mirar y cómo interpretarlos.',
    category: 'Analíticas',
    categoryColor: '#1B8A5A',
    gradientFrom: '#1B8A5A',
    gradientTo: '#04B2D9',
    readTime: 5,
    publishedAt: '2026-04-27',
    content: [
      { type: 'p', text: 'ROI = (ganancia obtenida - inversión) / inversión × 100. Si invertiste $200.000 en tu sitio web y ese sitio te trajo 5 clientes nuevos que te pagaron $100.000 cada uno, tu ROI es del 150%. Así de simple — si tienes los datos.' },
      { type: 'h2', text: 'El problema: la mayoría no tiene los datos' },
      { type: 'p', text: 'Sin Google Analytics bien configurado, sin preguntar a los clientes "¿cómo nos encontraste?" y sin rastrear qué canal genera más contactos, es imposible saber qué funciona. Estás invirtiendo a ciegas.' },
      { type: 'h2', text: 'Las 3 métricas que sí necesitas rastrear' },
      { type: 'h3', text: '1. Costo por lead (CPL)' },
      { type: 'p', text: 'Cuánto te cuesta conseguir un contacto interesado. Si gastas $100.000 en Facebook Ads y obtienes 10 consultas, tu CPL es $10.000. ¿Es bueno o malo? Depende de cuánto ganas por cliente.' },
      { type: 'h3', text: '2. Tasa de conversión lead → cliente' },
      { type: 'p', text: 'De cada 10 personas que se contactan, ¿cuántas se convierten en clientes? Si es 3 de 10 (30%), y cada cliente te deja $80.000, cada lead vale $24.000. Si tu CPL es $10.000, tu ROI es positivo.' },
      { type: 'h3', text: '3. Fuente de los mejores clientes' },
      { type: 'p', text: 'No todos los canales traen los mismos clientes. Pregunta siempre "¿cómo nos encontraste?" y anótalo. En 3 meses tendrás claro qué canal trae clientes que pagan más y rotan menos.' },
      { type: 'highlight', text: 'La decisión de dónde invertir en marketing debería basarse en datos, no en intuición. Con tres métricas básicas, ya tienes más claridad que la mayoría.' },
    ],
  },

  /* ─────────────────────────────────────────────
   * MARKETING DIGITAL
   * ───────────────────────────────────────────── */

  {
    slug: 'embudo-ventas-digital-negocios-chile',
    title: 'Funnel de ventas digital para negocios locales: cómo atraer, convencer y cerrar',
    excerpt: 'Un funnel de ventas no es para grandes empresas. Es para cualquier negocio que quiera que sus esfuerzos de marketing sean sistemáticos y predecibles, no aleatorios.',
    category: 'Marketing Digital',
    categoryColor: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#0477BF',
    readTime: 6,
    publishedAt: '2026-04-24',
    content: [
      { type: 'p', text: 'La mayoría de los negocios locales no tiene un sistema de ventas — tiene esperanza. Esperan que lleguen clientes, esperan que el boca a boca funcione, esperan que sus publicaciones en Instagram se viralicen. Un funnel reemplaza la esperanza con un proceso.' },
      { type: 'h2', text: '¿Qué es un funnel de ventas?' },
      { type: 'p', text: 'Un funnel es el camino que recorre un desconocido hasta convertirse en cliente. Tiene tres etapas: TOFU (Top of Funnel) — el desconocido te descubre. MOFU (Middle) — considera si eres la opción correcta. BOFU (Bottom) — decide comprarte.' },
      { type: 'h2', text: 'Funnel básico para un negocio local' },
      { type: 'ul', items: [
        'TOFU: Apareces en Google Maps cuando buscan tu servicio en tu ciudad (SEO local)',
        'TOFU: Ven tus publicaciones en Instagram o te recomiendan por WhatsApp',
        'MOFU: Visitan tu sitio web — ven tu propuesta, tus precios, tus trabajos anteriores',
        'MOFU: Leen reseñas de otros clientes y se convencen de que eres confiable',
        'BOFU: Te escriben por WhatsApp o llenan el formulario (conversión)',
        'Post-compra: Quedan satisfechos y te recomiendan (nuevo inicio del ciclo)',
      ]},
      { type: 'h2', text: 'Dónde se rompe el funnel más frecuentemente' },
      { type: 'p', text: 'El punto de quiebre más común: llegaron a tu sitio web pero no se contactaron. ¿Por qué? Porque el sitio no convence. El diseño no genera confianza, el CTA no es claro, o no hay prueba social suficiente.' },
      { type: 'highlight', text: 'Un funnel no necesita ser complejo para funcionar. Necesita ser consciente: saber exactamente qué pasa en cada etapa y qué puedes mejorar.' },
    ],
  },

  {
    slug: 'instagram-vs-tener-web-propia',
    title: 'Instagram vs sitio web propio: por qué necesitas los dos (y cuál primero)',
    excerpt: 'El debate es falso. No se trata de elegir entre Instagram y una web. Se trata de entender qué hace cada canal — y usarlos juntos correctamente.',
    category: 'Marketing Digital',
    categoryColor: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#0477BF',
    readTime: 4,
    publishedAt: '2026-04-25',
    content: [
      { type: 'p', text: 'Muchos dueños de negocio piensan que tienen que elegir: "Si tengo Instagram, ¿para qué necesito una web?" o "Si tengo web, ¿para qué uso Instagram?". La pregunta está mal planteada. Cada canal tiene un trabajo distinto.' },
      { type: 'h2', text: 'Lo que Instagram hace bien — y mal' },
      { type: 'p', text: 'Instagram es excelente para generar comunidad, mostrar el proceso de tu trabajo, construir confianza a través del contenido diario y hacer remarketing pagado. Lo que no hace: aparecer en Google cuando alguien busca tu servicio, garantizarte visibilidad sin el algoritmo, y convertir visitantes en clientes de forma sistemática.' },
      { type: 'h2', text: 'Lo que un sitio web hace bien — y mal' },
      { type: 'p', text: 'Un sitio web aparece en Google (la fuente número 1 de clientes nuevos para negocios locales), te pertenece para siempre, no depende de algoritmos y convierte visitas en contactos. Lo que no hace: generar comunidad ni viralizar contenido visual.' },
      { type: 'h2', text: '¿Cuál primero si tienes presupuesto limitado?' },
      { type: 'p', text: 'El sitio web. Instagram es gratis y lo puedes hacer tú mismo. Un sitio web con SEO local requiere inversión y hecho mal no funciona. Invierte primero en lo que requiere expertise — y el expertise del SEO lo tienes contratando a alguien que sepa.' },
      { type: 'highlight', text: 'Instagram trae tráfico. Tu sitio web lo convierte. Sin el sitio, Instagram es un megáfono sin destino.' },
    ],
  },

  {
    slug: 'estrategia-contenido-redes-sociales-negocio-local',
    title: 'Estrategia de contenido para redes sociales: la guía para negocios locales sin tiempo',
    excerpt: 'No necesitas publicar todos los días para tener un Instagram efectivo. Necesitas publicar lo correcto, de forma consistente. Aquí la estrategia mínima viable para negocios locales.',
    category: 'Marketing Digital',
    categoryColor: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#0477BF',
    readTime: 5,
    publishedAt: '2026-04-26',
    content: [
      { type: 'p', text: 'El mayor error en redes sociales para negocios locales no es publicar poco — es publicar sin estrategia. 10 posts al mes enfocados en conversión valen más que 30 fotos aleatorias.' },
      { type: 'h2', text: 'Los 4 tipos de contenido que sí funcionan' },
      { type: 'ul', items: [
        'Antes/después: muestra la transformación que genera tu servicio — el formato que más convierte',
        'Proceso: muestra cómo trabajas — genera confianza y diferencia de la competencia',
        'Testimonio: el cliente contando su experiencia, ojalá en video corto',
        'Educación: un consejo útil relacionado con tu rubro — posiciona tu expertise',
      ]},
      { type: 'h2', text: 'La frecuencia mínima viable' },
      { type: 'p', text: 'Para mantener visibilidad sin agotarte: 3 posts por semana en feed + 5 historias por semana. Con eso basta para mantener el algoritmo contento y los seguidores enganchados. Si no puedes mantener esa cadencia, baja a 2 posts por semana — pero sé consistente.' },
      { type: 'h2', text: 'El sistema de 1 hora semanal' },
      { type: 'ul', items: [
        'Lunes 8 AM: planifica los 3 posts de la semana (qué tipo, qué mensaje)',
        'Lunes 9 AM: crea el contenido con Canva IA + ChatGPT para el copy',
        'Lunes 10 AM: programa en Meta Business Suite para que salga automáticamente',
        'El resto de la semana: solo responder comentarios y mensajes (10 min/día)',
      ]},
      { type: 'highlight', text: 'Consistencia > calidad perfecta. Un post imperfecto publicado vale infinitamente más que uno perfecto que nunca sale.' },
    ],
  },

];
