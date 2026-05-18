import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const CAROUSELS_DIR = path.join(ROOT, ".agents", "carousels");
const PLAN_PATH = path.join(ROOT, ".agents", "content-calendar-30-dias.md");

const logo = "../../../imagenes%20para%20historias/gautama_reel.png";
const backgrounds = [
  "../../../_media/fondos/WhatsApp%20Image%202026-04-14%20at%2012.41.24%20PM%20(2).jpeg",
  "../../../_media/fondos/WhatsApp%20Image%202026-04-14%20at%2012.41.24%20PM.jpeg",
  "../../../_media/fondos/WhatsApp%20Image%202026-04-14%20at%2012.41.24%20PM%20(1).jpeg",
  "../../../_media/fondos/WhatsApp%20Image%202026-04-14%20at%2012.41.23%20PM.jpeg",
];

const posts = [
  {
    date: "2026-05-18",
    slot: "02",
    pillar: "Automatizaciones",
    slug: "whatsapp-ia-responde-24-7",
    title: "Tu WhatsApp no puede dormir",
    accent: "Responder tarde tambien es perder ventas.",
    cta: "Pide tu diagnostico de automatizacion",
    points: [
      ["01", "El cliente no espera", "Si pregunta por precio, agenda o disponibilidad y nadie responde, otro negocio se queda con la oportunidad."],
      ["02", "La IA filtra antes de vender", "Un agente puede responder preguntas frecuentes, pedir datos clave y detectar si el contacto es una oportunidad real."],
      ["03", "Tu equipo recibe lo importante", "La automatizacion no reemplaza tu criterio. Te entrega conversaciones ordenadas para cerrar mejor."],
      ["04", "Disponible sin contratar mas gente", "Puedes atender fuera de horario, fines de semana y momentos de alta demanda sin quemarte."],
    ],
    caption: "Tu WhatsApp puede ser una puerta de entrada o un cuello de botella.\n\nUn agente IA bien configurado responde preguntas frecuentes, ordena datos del cliente y te avisa cuando hay una oportunidad real.\n\nAutomatizar no es sonar robotico. Es responder mejor, mas rapido y con menos desorden.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #WhatsAppIA #Automatizacion #MarketingDigital #NegociosLocales #Coquimbo #LaSerena",
  },
  {
    date: "2026-05-19",
    slot: "01",
    pillar: "Inteligencia de negocios",
    slug: "dashboard-clientes-reales",
    title: "No necesitas mas datos",
    accent: "Necesitas saber que datos mueven ventas.",
    cta: "Construyamos tu tablero base",
    points: [
      ["01", "Visitas no son clientes", "Un tablero muestra que canal trae consultas reales y cual solo infla numeros bonitos."],
      ["02", "El origen importa", "Google, Instagram, referidos y WhatsApp cuentan historias distintas. Verlas juntas cambia tus decisiones."],
      ["03", "Menos intuicion, mas foco", "Cuando sabes que funciona, dejas de repartir presupuesto al azar."],
      ["04", "Reportes simples", "La inteligencia de negocios sirve cuando la entiendes en 5 minutos y puedes actuar el mismo dia."],
    ],
    caption: "Un negocio no crece por mirar mas graficos. Crece cuando entiende que canal trae clientes reales.\n\nUn dashboard simple puede mostrar visitas, consultas, origen del trafico y oportunidades perdidas.\n\nMenos intuicion. Mas decisiones con evidencia.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #InteligenciaDeNegocios #Dashboard #MarketingDigital #GA4 #NegociosLocales",
  },
  {
    date: "2026-05-19",
    slot: "02",
    pillar: "Marketing digital",
    slug: "web-que-convierte",
    title: "Una web bonita no basta",
    accent: "La pregunta real es si convierte visitas en oportunidades.",
    cta: "Revisemos tu web",
    points: [
      ["01", "El diseno debe guiar", "Cada seccion debe responder dudas, reducir friccion y acercar al contacto."],
      ["02", "La confianza se construye", "Casos reales, servicios claros, precios o rangos y llamados a la accion hacen que el usuario avance."],
      ["03", "La velocidad vende", "Si tu sitio carga lento, muchos clientes se van antes de conocer tu oferta."],
      ["04", "Medir cierra el ciclo", "Una web profesional debe saber que botones se presionan y desde donde llegan los contactos."],
    ],
    caption: "Una web puede verse bien y aun asi no vender.\n\nEl objetivo no es llenar una pantalla de efectos. Es guiar al cliente, resolver dudas, construir confianza y medir que pasa despues del clic.\n\nTu sitio deberia trabajar para tu negocio todos los dias.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #DisenoWeb #MarketingDigital #PaginaWeb #NegociosLocales #Coquimbo #LaSerena",
  },
  {
    date: "2026-05-20",
    slot: "01",
    pillar: "Automatizaciones",
    slug: "seguimiento-automatico-clientes",
    title: "La venta se pierde despues del primer mensaje",
    accent: "El seguimiento automatico recupera oportunidades.",
    cta: "Automatiza tu seguimiento",
    points: [
      ["01", "Muchos leads quedan tibios", "Preguntan, cotizan y desaparecen. Sin seguimiento, quedan olvidados en WhatsApp."],
      ["02", "Recordar no es insistir", "Un mensaje bien escrito puede retomar la conversacion sin presionar."],
      ["03", "Segmenta por interes", "No todos necesitan lo mismo. La automatizacion puede separar urgentes, cotizaciones y dudas."],
      ["04", "Cierra mas sin perseguir", "El sistema trabaja mientras tu atiendes lo importante."],
    ],
    caption: "La mayoria de las ventas no se pierden por falta de interes. Se pierden por falta de seguimiento.\n\nUn flujo automatico puede recordar cotizaciones, ordenar contactos y recuperar conversaciones que quedaron a medias.\n\nAutomatizar seguimiento es vender con mas calma y mas metodo.\n\n#GautamaDigital #Automatizacion #CRM #Ventas #WhatsAppBusiness #NegociosLocales",
  },
  {
    date: "2026-05-20",
    slot: "02",
    pillar: "Marketing digital",
    slug: "contenido-autoridad-local",
    title: "Publicar por publicar no construye marca",
    accent: "El contenido debe posicionarte como la opcion obvia.",
    cta: "Planifiquemos tu contenido",
    points: [
      ["01", "Cada post debe cumplir un rol", "Educar, demostrar experiencia, mostrar resultados o activar una consulta."],
      ["02", "La repeticion ordenada crea confianza", "Un feed coherente hace que el usuario entienda rapido que haces y por que elegirte."],
      ["03", "La autoridad se disena", "Titulares, ritmo visual, ejemplos y llamados a la accion construyen percepcion profesional."],
      ["04", "El contenido debe llevar a accion", "Likes no pagan cuentas. Conversaciones, visitas y consultas si."],
    ],
    caption: "Publicar mas no significa comunicar mejor.\n\nUna marca profesional necesita contenido con estructura: educar, demostrar experiencia, mostrar criterio y abrir conversaciones comerciales.\n\nEl feed tambien vende, incluso antes de que te escriban.\n\n#GautamaDigital #MarketingDigital #Contenido #MarcaDigital #NegociosLocales #Chile",
  },
  {
    date: "2026-05-21",
    slot: "01",
    pillar: "Inteligencia de negocios",
    slug: "metricas-que-importan",
    title: "Las metricas vanidosas distraen",
    accent: "Mide lo que acerca ventas, no solo lo que se ve bonito.",
    cta: "Ordenemos tus metricas",
    points: [
      ["01", "Alcance no es resultado", "Sirve para entender visibilidad, pero no dice si el negocio esta captando oportunidades."],
      ["02", "Consultas calificadas", "La metrica clave es cuantos contactos reales llegan y desde que canal."],
      ["03", "Costo por oportunidad", "Saber cuanto cuesta generar una consulta cambia como inviertes."],
      ["04", "Decision semanal", "Un reporte util te dice que mantener, que ajustar y que pausar."],
    ],
    caption: "No todas las metricas merecen tu atencion.\n\nAlcance, likes y visitas sirven, pero el negocio necesita saber que canal trae consultas reales y cuanto cuesta conseguirlas.\n\nMedir mejor es decidir mejor.\n\n#GautamaDigital #Metricas #InteligenciaDeNegocios #MarketingDigital #Dashboard #NegociosLocales",
  },
  {
    date: "2026-05-21",
    slot: "02",
    pillar: "Automatizaciones",
    slug: "crm-simple-no-perder-leads",
    title: "Si tus clientes viven en chats, necesitas orden",
    accent: "Un CRM simple evita que las oportunidades se pierdan.",
    cta: "Disenemos tu flujo comercial",
    points: [
      ["01", "WhatsApp se desordena rapido", "Entre consultas, audios y recordatorios, es facil olvidar quien estaba listo para comprar."],
      ["02", "Estados claros", "Nuevo, cotizado, esperando respuesta, ganado o perdido. Simple, pero poderoso."],
      ["03", "Historial visible", "Cada contacto debe tener contexto para no empezar de cero."],
      ["04", "Menos memoria, mas sistema", "El negocio no deberia depender de acordarse de todo."],
    ],
    caption: "Cuando todo pasa por WhatsApp, el desorden tambien crece por WhatsApp.\n\nUn CRM simple te ayuda a saber quien pregunto, quien recibio cotizacion, quien necesita seguimiento y quien ya compro.\n\nMenos memoria. Mas sistema.\n\n#GautamaDigital #CRM #Automatizacion #Ventas #WhatsAppBusiness #NegociosLocales",
  },
  {
    date: "2026-05-22",
    slot: "01",
    pillar: "Marketing digital",
    slug: "google-business-vitrina",
    title: "Tu ficha de Google es una landing page",
    accent: "Muchos clientes deciden antes de entrar a tu sitio.",
    cta: "Auditemos tu ficha",
    points: [
      ["01", "Aparecer no alcanza", "Fotos, categorias, resenas y servicios hacen que el usuario confie o siga buscando."],
      ["02", "La ficha debe estar viva", "Publicaciones, novedades y respuestas muestran actividad real."],
      ["03", "Las resenas venden", "Una buena reputacion visible reduce la duda del cliente."],
      ["04", "Google entiende senales", "Mientras mas claro sea tu negocio, mas facil es mostrarlo en busquedas correctas."],
    ],
    caption: "Tu ficha de Google Business no es un tramite. Es una vitrina comercial.\n\nAntes de entrar a tu web, muchos clientes ya miraron fotos, resenas, horarios y servicios.\n\nSi esa ficha esta abandonada, tu competencia parte con ventaja.\n\n#GautamaDigital #GoogleBusiness #SEOLocal #MarketingDigital #NegociosLocales",
  },
  {
    date: "2026-05-22",
    slot: "02",
    pillar: "Inteligencia de negocios",
    slug: "reporte-semanal-automatico",
    title: "Tu negocio deberia reportarse solo",
    accent: "Un resumen semanal puede mostrar donde actuar.",
    cta: "Automatiza tus reportes",
    points: [
      ["01", "No esperes fin de mes", "Si algo bajo esta semana, necesitas verlo ahora, no cuando ya perdiste ventas."],
      ["02", "Pocos indicadores", "Trafico, consultas, origen, conversion y oportunidades pendientes."],
      ["03", "Formato accionable", "El reporte debe decir que cambio y que decision tomar."],
      ["04", "Menos reuniones", "Cuando la informacion llega ordenada, las conversaciones son mas productivas."],
    ],
    caption: "Un buen reporte no es una planilla eterna.\n\nEs un resumen claro de que paso, que cambio y que decision conviene tomar esta semana.\n\nTu negocio deberia reportarse solo.\n\n#GautamaDigital #Reportes #Automatizacion #InteligenciaDeNegocios #Dashboard",
  },
  {
    date: "2026-05-23",
    slot: "01",
    pillar: "Automatizaciones",
    slug: "respuestas-frecuentes-ia",
    title: "Responder lo mismo todos los dias es caro",
    accent: "Las preguntas repetidas son perfectas para automatizar.",
    cta: "Mapeemos tus preguntas frecuentes",
    points: [
      ["01", "Precio, horario, ubicacion", "Si te preguntan lo mismo cada semana, hay tiempo que puedes recuperar."],
      ["02", "La respuesta debe sonar humana", "Automatizar bien exige tono, contexto y limites claros."],
      ["03", "Escalar cuando corresponde", "El sistema debe saber cuando derivar a una persona."],
      ["04", "Mas velocidad, menos desgaste", "Tu energia queda para cerrar ventas y atender casos importantes."],
    ],
    caption: "Si respondes las mismas preguntas todos los dias, ya tienes un proceso listo para automatizar.\n\nLa clave no es responder como robot. Es responder rapido, claro y saber cuando derivar a una persona.\n\n#GautamaDigital #IA #Automatizacion #WhatsAppIA #NegociosLocales",
  },
  {
    date: "2026-05-23",
    slot: "02",
    pillar: "Marketing digital",
    slug: "landing-pages-por-ciudad",
    title: "Una ciudad, una intencion de busqueda",
    accent: "Las paginas locales ayudan a captar clientes cercanos.",
    cta: "Construyamos tu presencia local",
    points: [
      ["01", "Coquimbo no busca igual que Santiago", "Tu contenido debe hablarle al mercado que quieres captar."],
      ["02", "Servicios claros por zona", "Una landing local conecta ciudad, problema y solucion."],
      ["03", "SEO con contexto", "Mapa, testimonios, servicios y preguntas frecuentes ayudan a Google."],
      ["04", "Mas relevancia", "Mientras mas especifica sea la pagina, mas facil es convertir."],
    ],
    caption: "El SEO local empieza cuando tu web deja de hablar en generico.\n\nUna landing por ciudad puede conectar servicio, ubicacion e intencion de busqueda.\n\nSi quieres vender en Coquimbo o La Serena, tu web debe decirlo con claridad.\n\n#GautamaDigital #SEOLocal #LandingPage #DisenoWeb #Coquimbo #LaSerena",
  },
  {
    date: "2026-05-24",
    slot: "01",
    pillar: "Inteligencia de negocios",
    slug: "embudo-digital-basico",
    title: "Tu embudo existe aunque no lo mires",
    accent: "La pregunta es donde se estan cayendo los clientes.",
    cta: "Mapeemos tu embudo",
    points: [
      ["01", "Descubrimiento", "El cliente te ve en Google, Instagram, referidos o anuncios."],
      ["02", "Confianza", "Revisa tu web, tus casos, tus resenas y tu forma de comunicar."],
      ["03", "Contacto", "Llega a WhatsApp, formulario o llamada. Ahi empieza otra etapa."],
      ["04", "Cierre", "Sin seguimiento, muchas oportunidades quedan en pausa para siempre."],
    ],
    caption: "Todos los negocios tienen un embudo, incluso si nunca lo dibujaron.\n\nEl cliente descubre, evalua, pregunta y decide. Medir cada etapa permite saber donde se pierden oportunidades.\n\n#GautamaDigital #EmbudoDigital #MarketingDigital #InteligenciaDeNegocios #Ventas",
  },
  {
    date: "2026-05-24",
    slot: "02",
    pillar: "Automatizaciones",
    slug: "agenda-recordatorios",
    title: "Las agendas tambien pierden dinero",
    accent: "Recordatorios automaticos reducen ausencias y desorden.",
    cta: "Automatiza tu agenda",
    points: [
      ["01", "Confirmar citas", "Un recordatorio a tiempo evita espacios perdidos."],
      ["02", "Reagendar sin caos", "El sistema puede ordenar solicitudes y evitar conversaciones eternas."],
      ["03", "Avisos internos", "Tu equipo necesita saber que viene, no buscarlo entre chats."],
      ["04", "Mejor experiencia", "El cliente siente orden desde el primer contacto."],
    ],
    caption: "Una agenda desordenada tambien cuesta dinero.\n\nRecordatorios, confirmaciones y avisos automaticos pueden reducir ausencias, ordenar tu dia y mejorar la experiencia del cliente.\n\n#GautamaDigital #Automatizacion #Agenda #WhatsAppBusiness #NegociosLocales",
  },
  {
    date: "2026-05-25",
    slot: "01",
    pillar: "Marketing digital",
    slug: "captacion-instagram-negocios",
    title: "Instagram no es solo vitrina",
    accent: "Bien usado, puede abrir conversaciones comerciales.",
    cta: "Ordenemos tu estrategia de Instagram",
    points: [
      ["01", "Perfil claro", "El usuario debe entender que haces, para quien y como contactarte en segundos."],
      ["02", "Feed con sistema", "Las publicaciones deben educar, posicionar y activar consultas."],
      ["03", "Historias con intencion", "No todo es espontaneo. Tambien se disenan rutas hacia el contacto."],
      ["04", "Medicion minima", "Saber que temas generan mensajes cambia la estrategia."],
    ],
    caption: "Instagram no deberia ser solo una galeria bonita.\n\nUn perfil comercial debe explicar, generar confianza y abrir conversaciones con clientes reales.\n\nEl contenido tambien necesita sistema.\n\n#GautamaDigital #InstagramParaNegocios #MarketingDigital #Contenido #NegociosLocales",
  },
  {
    date: "2026-05-25",
    slot: "02",
    pillar: "Inteligencia de negocios",
    slug: "costo-de-no-medir",
    title: "No medir tambien tiene costo",
    accent: "Solo que no aparece como una factura.",
    cta: "Calculemos tus fugas digitales",
    points: [
      ["01", "Presupuesto mal usado", "Sin datos, puedes invertir meses en un canal que no convierte."],
      ["02", "Oportunidades invisibles", "Si no mides formularios, clics y WhatsApp, no sabes que funciono."],
      ["03", "Decisiones lentas", "Cuando la informacion llega tarde, el ajuste tambien llega tarde."],
      ["04", "Crecimiento desordenado", "Medir permite repetir lo que funciona y cortar lo que no."],
    ],
    caption: "No medir tambien cuesta. Solo que no aparece como una factura.\n\nCuesta en presupuesto mal usado, oportunidades invisibles y decisiones tomadas tarde.\n\nMedir es una forma de proteger tu negocio.\n\n#GautamaDigital #Analiticas #InteligenciaDeNegocios #MarketingDigital #GA4",
  },
  {
    date: "2026-05-26",
    slot: "01",
    pillar: "Automatizaciones",
    slug: "cotizaciones-automaticas",
    title: "Cotizar no deberia ser un cuello de botella",
    accent: "Automatizar el primer filtro acelera ventas.",
    cta: "Disenemos tu flujo de cotizacion",
    points: [
      ["01", "Pide datos clave", "Antes de cotizar, el sistema puede ordenar necesidades, presupuesto y urgencia."],
      ["02", "Entrega rangos claros", "Muchas consultas solo necesitan orientacion inicial para avanzar."],
      ["03", "Prioriza oportunidades", "No todos los contactos valen lo mismo. El flujo puede marcar los mas urgentes."],
      ["04", "Cotiza con contexto", "Llegas a la conversacion con informacion, no con preguntas repetidas."],
    ],
    caption: "Si cada cotizacion empieza desde cero, estas perdiendo tiempo.\n\nUn flujo automatico puede pedir datos clave, orientar al cliente y dejarte las oportunidades mas claras para cerrar.\n\n#GautamaDigital #Automatizacion #Cotizaciones #Ventas #WhatsAppIA",
  },
  {
    date: "2026-05-26",
    slot: "02",
    pillar: "Marketing digital",
    slug: "auditoria-digital-express",
    title: "Antes de vender mas, mira tu base digital",
    accent: "A veces el problema no es trafico. Es fuga.",
    cta: "Pide una auditoria digital express",
    points: [
      ["01", "Revisar presencia", "Google, Instagram, web y WhatsApp deben contar una historia coherente."],
      ["02", "Detectar friccion", "Botones confusos, carga lenta o mensajes poco claros bajan la conversion."],
      ["03", "Medir lo minimo", "Sin eventos basicos, no sabes donde mejorar primero."],
      ["04", "Priorizar accion", "Una auditoria buena termina con una lista corta y ejecutable."],
    ],
    caption: "A veces el problema no es conseguir mas trafico. Es que el trafico se fuga.\n\nUna auditoria digital express revisa presencia, claridad, velocidad, medicion y oportunidades de automatizacion.\n\n#GautamaDigital #AuditoriaDigital #MarketingDigital #DisenoWeb #NegociosLocales",
  },
  {
    date: "2026-05-27",
    slot: "01",
    pillar: "Inteligencia de negocios",
    slug: "bi-para-pymes",
    title: "Inteligencia de negocios no es solo para grandes empresas",
    accent: "Una pyme tambien puede decidir con datos.",
    cta: "Crea tu primer tablero",
    points: [
      ["01", "Empieza simple", "Ventas, consultas, origen, conversion y pendientes ya cuentan una historia potente."],
      ["02", "Une fuentes", "Web, redes, WhatsApp y planillas pueden conversar en un mismo tablero."],
      ["03", "Detecta patrones", "Dias fuertes, canales rentables y servicios mas consultados aparecen cuando ordenas datos."],
      ["04", "Mejora cada semana", "BI no es lujo. Es una rutina para decidir mejor."],
    ],
    caption: "La inteligencia de negocios no es solo para corporaciones.\n\nUna pyme tambien puede unir datos de ventas, web, WhatsApp y redes para tomar mejores decisiones cada semana.\n\n#GautamaDigital #BusinessIntelligence #Pyme #Dashboard #MarketingDigital",
  },
  {
    date: "2026-05-27",
    slot: "02",
    pillar: "Automatizaciones",
    slug: "sistema-web-datos-automatizacion",
    title: "La ventaja esta en conectar todo",
    accent: "Web, datos y automatizacion trabajando juntos.",
    cta: "Construyamos tu sistema digital",
    points: [
      ["01", "La web capta", "Explica, posiciona y convierte visitas en contactos."],
      ["02", "Los datos muestran", "Miden de donde vienen las oportunidades y que canal vale la pena."],
      ["03", "La automatizacion responde", "Ordena consultas, filtra leads y activa seguimiento."],
      ["04", "El sistema crece", "Cuando las piezas conversan, tu negocio deja de depender del caos diario."],
    ],
    caption: "La ventaja digital no esta en tener una web, un Instagram o un bot por separado.\n\nEsta en conectar presencia, datos y automatizacion para que el negocio funcione con mas orden.\n\nWeb + inteligencia de negocios + automatizacion.\n\n#GautamaDigital #Automatizacion #MarketingDigital #BusinessIntelligence #IA #NegociosLocales",
  },
];

const existingPublishedPosts = [
  {
    date: "2026-05-18",
    slot: "01",
    pillar: "Marketing digital",
    slug: "seo-local-google",
    title: "Tu negocio existe... pero Google no lo muestra",
  },
];

const backlog = [
  ["2026-05-28", "Marketing digital", "SEO local para servicios profesionales"],
  ["2026-05-28", "Inteligencia de negocios", "Panel mensual de crecimiento"],
  ["2026-05-29", "Automatizaciones", "Lead scoring simple para WhatsApp"],
  ["2026-05-29", "Marketing digital", "Propuesta de valor en 5 segundos"],
  ["2026-05-30", "Inteligencia de negocios", "Mapa de canales rentables"],
  ["2026-05-30", "Automatizaciones", "Alertas internas para oportunidades calientes"],
  ["2026-05-31", "Marketing digital", "Pagina de servicios que vende"],
  ["2026-05-31", "Inteligencia de negocios", "Como leer Search Console sin perderse"],
  ["2026-06-01", "Automatizaciones", "Onboarding automatico de clientes"],
  ["2026-06-01", "Marketing digital", "Casos reales como motor de confianza"],
  ["2026-06-02", "Inteligencia de negocios", "Forecast simple para pymes"],
  ["2026-06-02", "Automatizaciones", "Automatizar postventa sin sonar frio"],
  ["2026-06-03", "Marketing digital", "Contenido educativo que abre ventas"],
  ["2026-06-03", "Inteligencia de negocios", "Indicadores semanales del dueno"],
  ["2026-06-04", "Automatizaciones", "Integrar formularios con WhatsApp"],
  ["2026-06-04", "Marketing digital", "Landing para campanas pagadas"],
  ["2026-06-05", "Inteligencia de negocios", "Clientes por servicio y margen"],
  ["2026-06-05", "Automatizaciones", "Flujo de renovacion y recompra"],
  ["2026-06-06", "Marketing digital", "Arquitectura de confianza digital"],
  ["2026-06-06", "Inteligencia de negocios", "Resumen ejecutivo automatico"],
  ["2026-06-07", "Automatizaciones", "Preguntas de calificacion antes de cotizar"],
  ["2026-06-07", "Marketing digital", "Por que tu web no recibe mensajes"],
  ["2026-06-08", "Inteligencia de negocios", "Tablero de oportunidades perdidas"],
  ["2026-06-08", "Automatizaciones", "Sistema de seguimiento de cotizaciones"],
  ["2026-06-09", "Marketing digital", "Oferta clara para negocios locales"],
  ["2026-06-09", "Inteligencia de negocios", "Metrica norte para tu negocio"],
  ["2026-06-10", "Automatizaciones", "Asistente IA para atencion inicial"],
  ["2026-06-10", "Marketing digital", "Calendario editorial por objetivos"],
  ["2026-06-11", "Inteligencia de negocios", "Datos para decidir precios"],
  ["2026-06-11", "Automatizaciones", "Sistema digital minimo viable"],
  ["2026-06-12", "Marketing digital", "Pagina de casos que genera confianza"],
  ["2026-06-12", "Inteligencia de negocios", "Tablero de consultas por servicio"],
  ["2026-06-13", "Automatizaciones", "Flujo de bienvenida para nuevos leads"],
  ["2026-06-13", "Marketing digital", "SEO para preguntas frecuentes"],
  ["2026-06-14", "Inteligencia de negocios", "Indicadores para detectar fuga comercial"],
  ["2026-06-14", "Automatizaciones", "Seguimiento automatico post reunion"],
  ["2026-06-15", "Marketing digital", "Oferta irresistible sin bajar precios"],
  ["2026-06-15", "Inteligencia de negocios", "Reporte de conversion por canal"],
  ["2026-06-16", "Automatizaciones", "Sistema de respuestas con tono de marca"],
  ["2026-06-16", "Marketing digital", "Feed empresarial ordenado de 3 en 3"],
];

function esc(s) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function htmlFor(post, index) {
  const bg = backgrounds[index % backgrounds.length];
  const row = Math.floor(index / 3) % 3;
  const mode = ["authority", "diagnostic", "system"][row];
  const slideCount = 6;
  const pointSlides = post.points.map((point, i) => `
        <div class="slide ${mode === "diagnostic" ? "light-slide" : "dark-slide"}">
          <div class="slide-inner">
            <div class="bg"></div>
            <div class="veil"></div>
            <div class="frame-label">${esc(post.pillar)}</div>
            <span class="num">${point[0]}</span>
            <h2>${esc(point[1])}</h2>
            <p>${esc(point[2])}</p>
            <div class="rule"></div>
            <span class="slide-count">${i + 2} / ${slideCount}</span>
          </div>
        </div>`).join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Gautama Digital - ${esc(post.title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,900&display=swap');
    :root {
      --W: 1080px;
      --H: 1350px;
      --S: 0.5;
      --cyan: #04C4D9;
      --blue: #0477BF;
      --wine: #59343E;
      --ink: #06060F;
      --paper: #F0F8FC;
      --muted: #A9D9E8;
      --bg: url('${bg}');
      --logo: url('${logo}');
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0d0d0d;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 48px 20px;
      font-family: Outfit, sans-serif;
    }
    .carousel-wrapper {
      position: relative;
      width: calc(var(--W) * var(--S));
      height: calc(var(--H) * var(--S));
    }
    .carousel { width: 100%; height: 100%; overflow: hidden; border-radius: 6px; box-shadow: 0 24px 80px rgba(0,0,0,.6); }
    .slides-wrapper { display: flex; height: 100%; transition: transform .38s cubic-bezier(.4,0,.2,1); }
    .slide { width: calc(var(--W) * var(--S)); height: calc(var(--H) * var(--S)); flex-shrink: 0; position: relative; overflow: hidden; }
    .slide-inner { width: var(--W); height: var(--H); transform: scale(var(--S)); transform-origin: top left; position: absolute; inset: 0 auto auto 0; overflow: hidden; }
    .slide-inner::after {
      content: "";
      position: absolute;
      right: 58px;
      bottom: 50px;
      width: 150px;
      height: 150px;
      background: var(--logo) center / contain no-repeat;
      z-index: 20;
      opacity: .94;
    }
    .bg { position: absolute; inset: 0; background: var(--bg) center / cover no-repeat; transform: scale(1.04); z-index: 1; }
    .veil { position: absolute; inset: 0; z-index: 2; }
    .hero .veil, .dark-slide .veil {
      background:
        radial-gradient(circle at 22% 18%, rgba(4,196,217,.2), transparent 30%),
        linear-gradient(145deg, rgba(6,6,15,.9) 0%, rgba(89,52,62,.72) 44%, rgba(4,119,191,.78) 100%);
    }
    .light-slide .bg { opacity: .16; filter: grayscale(.2); }
    .light-slide .veil {
      background:
        linear-gradient(90deg, rgba(240,248,252,.97), rgba(240,248,252,.91)),
        radial-gradient(circle at 80% 20%, rgba(4,196,217,.12), transparent 30%);
    }
    .content { position: relative; z-index: 5; height: 100%; padding: 86px 88px 132px; display: flex; flex-direction: column; justify-content: center; }
    .kicker, .frame-label {
      position: relative;
      z-index: 5;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--cyan);
    }
    .frame-label { position: absolute; top: 76px; left: 88px; }
    .bar { width: 82px; height: 5px; border-radius: 4px; background: var(--cyan); margin: 34px 0 46px; }
    h1 {
      font-size: 88px;
      line-height: 1.02;
      letter-spacing: 0;
      color: white;
      font-weight: 900;
      max-width: 820px;
      margin-bottom: 44px;
    }
    h1 span, strong { color: var(--cyan); }
    .subtitle {
      font-size: 34px;
      line-height: 1.45;
      color: rgba(255,255,255,.78);
      max-width: 760px;
      font-weight: 400;
    }
    .dark-slide .slide-inner, .light-slide .slide-inner { padding: 170px 88px 132px; }
    .dark-slide h2, .light-slide h2 {
      position: relative;
      z-index: 5;
      font-size: 64px;
      line-height: 1.12;
      letter-spacing: 0;
      font-weight: 800;
      max-width: 840px;
      margin: 22px 0 34px;
    }
    .dark-slide h2 { color: white; }
    .light-slide h2 { color: var(--wine); }
    .dark-slide p, .light-slide p {
      position: relative;
      z-index: 5;
      font-size: 34px;
      line-height: 1.52;
      max-width: 820px;
      font-weight: 400;
    }
    .dark-slide p { color: rgba(255,255,255,.78); }
    .light-slide p { color: #0378A6; }
    .num {
      position: relative;
      z-index: 5;
      display: block;
      font-size: 132px;
      line-height: .9;
      font-weight: 900;
      color: var(--cyan);
      letter-spacing: -4px;
    }
    .rule { position: relative; z-index: 5; width: 100%; height: 1px; background: rgba(4,196,217,.35); margin-top: 46px; }
    .slide-count { position: absolute; left: 88px; bottom: 66px; z-index: 5; color: rgba(169,217,232,.9); font-size: 22px; letter-spacing: .08em; }
    .cta .slide-inner {
      background: linear-gradient(145deg, var(--wine), var(--blue));
      padding: 96px 88px 132px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cta h2 { color: white; font-size: 76px; line-height: 1.04; font-weight: 900; max-width: 850px; margin-bottom: 32px; position: relative; z-index: 5; }
    .cta p { color: rgba(255,255,255,.78); font-size: 34px; line-height: 1.45; max-width: 760px; position: relative; z-index: 5; margin-bottom: 54px; }
    .pill { position: relative; z-index: 5; display: inline-block; width: fit-content; background: var(--cyan); color: white; padding: 28px 50px; border-radius: 999px; font-size: 34px; font-weight: 800; }
    .nav-btn {
      position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%;
      border: 0; background: rgba(0,0,0,.55); color: white; cursor: pointer; z-index: 30; font-size: 18px;
    }
    .nav-prev { left: -76px; } .nav-next { right: -76px; }
    .counter { color: #555; font-size: 12px; letter-spacing: 2px; }
  </style>
</head>
<body>
  <div class="carousel-wrapper">
    <div class="carousel">
      <div class="slides-wrapper" id="slider">
        <div class="slide hero">
          <div class="slide-inner">
            <div class="bg"></div>
            <div class="veil"></div>
            <div class="content">
              <div class="kicker">${esc(post.pillar)}</div>
              <div class="bar"></div>
              <h1>${esc(post.title)}<br><span>${esc(post.accent)}</span></h1>
              <p class="subtitle">Gautama Digital convierte presencia, datos y automatizacion en sistemas comerciales para negocios locales.</p>
            </div>
          </div>
        </div>
${pointSlides}
        <div class="slide cta">
          <div class="slide-inner">
            <div class="bg"></div>
            <div class="veil"></div>
            <div class="frame-label">Gautama Digital</div>
            <h2>${esc(post.cta)}</h2>
            <p>Si quieres ordenar tu presencia digital y convertirla en un sistema que trabaja todos los dias, conversemos.</p>
            <span class="pill">Diagnostico gratuito</span>
          </div>
        </div>
      </div>
    </div>
    <button class="nav-btn nav-prev" id="prev" onclick="prevSlide()">&#8592;</button>
    <button class="nav-btn nav-next" id="next" onclick="nextSlide()">&#8594;</button>
  </div>
  <div class="counter" id="counter">1 / ${slideCount}</div>
  <script>
    let current = 0;
    const total = ${slideCount};
    const slider = document.getElementById('slider');
    const counter = document.getElementById('counter');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const sw = 1080 * 0.5;
    function update() {
      slider.style.transform = \`translateX(-\${current * sw}px)\`;
      counter.textContent = \`\${current + 1} / \${total}\`;
      prev.style.display = current === 0 ? 'none' : 'block';
      next.style.display = current === total - 1 ? 'none' : 'block';
    }
    function nextSlide() { if (current < total - 1) { current++; update(); } }
    function prevSlide() { if (current > 0) { current--; update(); } }
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
    update();
  </script>
</body>
</html>
`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

for (let i = 0; i < posts.length; i += 1) {
  const post = posts[i];
  const folder = path.join(CAROUSELS_DIR, `${post.date}-${post.slot}-${post.slug}`);
  ensureDir(folder);
  fs.writeFileSync(path.join(folder, "carousel.html"), htmlFor(post, i), "utf8");
  fs.writeFileSync(path.join(folder, "caption.txt"), post.caption + "\n", "utf8");
}

const calendarRows = [
  "# Gautama Digital - Calendario editorial 30 dias",
  "",
  "Objetivo: mantener un feed ordenado de 3 en 3 con pilares alternados: Marketing Digital, Inteligencia de Negocios y Automatizaciones.",
  "",
  "Cadencia: 2 publicaciones diarias. Cada fila de 3 posts forma una unidad visual y narrativa.",
  "",
  "## Primeros 10 dias - carruseles generados",
  "",
  "| Fecha | Slot | Pilar | Slug | Enfoque |",
  "|---|---:|---|---|---|",
  ...existingPublishedPosts.map((post) => `| ${post.date} | ${post.slot} | ${post.pillar} | ${post.slug} | ${post.title} |`),
  ...posts.map((post) => `| ${post.date} | ${post.slot} | ${post.pillar} | ${post.slug} | ${post.title} |`),
  "",
  "## Backlog dias 11 a 30",
  "",
  "| Fecha | Pilar | Tema |",
  "|---|---|---|",
  ...backlog.map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} |`),
  "",
  "## Reglas visuales",
  "",
  "- Usar siempre el icono Gautama abajo a la derecha.",
  "- Usar imagenes personales como fondo opacado con overlay azul/vino.",
  "- Alternar filas: autoridad oscura, diagnostico premium, futuro automatizado.",
  "- Mantener hooks grandes y maximo un punto por slide.",
  "- Historias IG quedan omitidas hasta redisenar ese formato.",
  "",
];

ensureDir(path.dirname(PLAN_PATH));
fs.writeFileSync(PLAN_PATH, calendarRows.join("\n"), "utf8");

console.log(`Generated ${posts.length} carousels`);
console.log(PLAN_PATH);
