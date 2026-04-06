# Gautama Digital — Estado del proyecto
*Última actualización: 2026-04-05*

## Sitio en producción
- URL: https://www.gautamadigital.cl
- Repo: github.com/sebannicus/gautama-digital
- Deploy: Vercel (automático al push a `main`)
- Stack: Astro + Tailwind, componentes SOLID+GRASP

---

## Sesión 2026-04-05 — Lo que se hizo

### 1. Testimonios reales
Reemplazados en `src/content/testimonials.ts`:
- **Evelyn M.** — CheckVital (clínica, Coquimbo)
- **Antocarz** — Car Audio & Accesorios, Coquimbo
- **SIMA Ingeniería** — Ingeniería, Coquimbo

### 2. Precios actualizados (`src/content/services.ts`)
- Starter: **$250.000** (antes $280.000)
- Pro: **$450.000** (sin cambio)
- Seguimiento mensual: **$35.000** (antes $60.000)

### 3. Paquete Pro ampliado
Nuevas features añadidas al Pro:
- GA4 avanzado con eventos de conversión
- Core Web Vitals optimizados
- Schema markup
- Instagram Business + estrategia de contenido (1 mes)
- Consultoría IA (herramientas, flujos, automatizaciones)
- 3 meses de seguimiento incluidos

### 4. Botones de planes
Todos usan `variant="primary"` (dorado) — antes Starter y Seguimiento usaban ghost.

### 5. Secciones eliminadas
- Authority ("Resultados reales") — eliminada de index.astro
- Testimonials ("Lo que dicen nuestros clientes en Google") — eliminada de index.astro

### 6. Nueva sección: TrustedBy ("Han confiado en mí")
`src/components/sections/TrustedBy.astro`
- Cards con quote real de cada cliente: Antocarz, CheckVital, SIMA Ingeniería
- Link al sitio donde corresponde

### 7. Botón flotante WhatsApp
En `src/layouts/BaseLayout.astro` — fijo abajo derecha, animación bounce.
Mensaje pre-cargado: "hola Gautama Digital vi tu página web y quisiera conversar contigo"

### 8. SEO — optimización completa

**Cambios en código:**
- **H1** → "Diseño web en La Serena que te pone en Google sin pagar publicidad."
- **Title tag** → keyword primero: "Diseño Web Profesional en La Serena y Coquimbo | Gautama Digital"
- **Meta description** → incluye: diseño web, páginas web, La Serena, Coquimbo, $250.000
- **H2 About** → "Diseñador web en La Serena con visión comercial."
- **H2 Process** → "Cómo creamos tu página web en La Serena — paso a paso."
- **H2 FAQ** → "Preguntas sobre diseño web en La Serena y Coquimbo."
- **FAQ** → 7 preguntas (antes 4), precios corregidos, nuevas long-tails:
  - "¿Para qué sirve tener una página web?"
  - "¿Cómo aparecer en Google sin publicidad?"
  - "¿Qué es el marketing digital?"
  - "¿Página web vs redes sociales?"
- **Schema serviceType** → 9 tipos (antes 3): marketing digital, páginas web profesionales, etc.
- **Nav** → reemplaza #resultados por #clientes
- **Footer** → texto descriptivo con keywords + links con texto ancla SEO
- **Marquee Hero** → 10 keywords: Diseño Web La Serena, Páginas Web Profesionales, Marketing Digital, etc.
- **About body** → inyección natural de: "diseño web", "páginas web profesionales", "Google Analytics", "agencias de diseño web en Chile"

**Nueva sección Industries** (`src/components/sections/Industries.astro`):
Captura long-tails por rubro:
- Salud y clínicas
- Comercios y automotriz
- Ingeniería y servicios
- Gastronomía y turismo
- Servicios profesionales
- Inmobiliaria y propiedades

### 9. Google My Business — optimización completa
*(pendiente ejecutar por Sebastián)*

**Descripción a pegar:**
> Diseño web profesional y SEO local para negocios en La Serena y Coquimbo. Creamos páginas web a medida que aparecen en Google sin pagar publicidad — con Google My Business optimizado y Google Analytics para medir cada resultado. Paquete Starter desde $250.000 · Paquete Pro desde $450.000 · Seguimiento mensual $35.000. Diagnóstico gratuito sin compromiso. Pagas en 2 cuotas. El sitio es tuyo desde el primer día.

**Categorías GMB a configurar:**
- Principal: Diseñador de sitios web
- Secundarias: Servicio de marketing en internet, Consultor de marketing, Empresa de desarrollo de software, Agencia de publicidad

**Servicios GMB creados:**
- Paquete Starter — $250.000
- Paquete Pro — $450.000
- Seguimiento Mensual SEO — $35.000/mes

**Pendientes GMB:**
- [ ] Pegar descripción
- [ ] Agregar 4 categorías secundarias
- [ ] Crear 3 servicios + 3 productos
- [ ] Subir mínimo 5 fotos (logo, portada, equipo, trabajo, resultados GA4)
- [ ] Agregar 3 Q&A propias
- [ ] Publicar primer post

---

## Estructura actual de secciones (index.astro)
```
Hero → About → Services → Industries → Process → CaseStudy → CtaMid → TrustedBy → FAQ → LocalMap → CtaFinal
```

## Pendientes globales

### Código
- [ ] URL embed Google Maps en LocalMap.astro (const MAPS_EMBED_URL = '')
- [ ] SIMA Ingeniería URL real en TrustedBy.astro (href: null actualmente)

### SEO off-page
- [ ] Google Search Console → solicitar indexación manual
- [ ] Backlinks de clientes: pedir a Antocarz, CheckVital, SIMA que pongan link al sitio
- [ ] GMB completar (ver checklist arriba)

### Contenido
- [ ] Testimonios reales con nombre completo para Antocarz y SIMA
- [ ] Imagen hero con Grok (paleta #F0F8FC, #0477BF, #04C4D9, #59343E)

### Instagram (@gautama_digital)
- Archivos listos en raíz del proyecto:
  - `plan-editorial-instagram.md` — 16 posts con copy y calendario
  - `identidad-visual-instagram.md` — sistema visual completo
- [ ] Importar a Notion
- [ ] Crear 6 templates en Canva (1080×1350px, fuente Lato)
- [ ] Producir Post 1 (presentación) y Post 9 (Reel ChatGPT)
