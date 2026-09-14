# CLAUDE.md — Gautama Digital

Instrucciones específicas para el proyecto Gautama Digital. Leer antes de cualquier tarea.

---

## Proyecto

Gautama Digital es la **escuela de IA aplicada** de Sebastián Morales (@sebannicus), Coquimbo, Chile.
Handle Instagram: `@gautama_digital` — sitio: `gautamadigital.cl`

> **Reposicionamiento (2026-09-14): de agencia a escuela.**
> Todo lo que es servicio de agencia (webs, SEO, bots) migra a la marca **Digital Hunters**.
> Gautama Digital queda como plataforma educativa: cursos presenciales mensuales de 2 días
> donde el alumno sale con ChatGPT y Claude instalados y funcionando en su trabajo.
> No mezclar las dos voces: Gautama enseña, Digital Hunters vende servicios.

### Perfil de voz — «profesor práctico»

Audiencia: personas con trabajos de oficina en la Región de Coquimbo (contadores, abogados,
administrativos, vendedores, pymes). No son desarrolladores. Sienten que se están quedando atrás
con la IA y no saben por dónde partir.

Reglas de voz:
- **Autoridad en el resultado, cercanía en el camino.** «A mí me costó meses. Tú lo tienes en dos días.»
- Cada pieza entrega **algo ejecutable hoy**, no una reflexión.
- Números y ejemplos concretos de trabajo chileno real (un correo al SII, una cotización, un informe).
- Nunca jerga sin traducir (prompt, token, modelo) — se explica en castellano.
- **No** se usa la historia laboral personal de Sebastián como ancla de credibilidad.
- Tildes y puntuación correctas siempre. El copy sin tildes se lee amateur.
- Se acabó el registro zen/poético («los datos pueden ser amables»). Ahora se enseña.

### Los 5 pilares de contenido

| Pilar | Qué es | Frecuencia |
|---|---|---|
| **Hazlo hoy** | Un truco ejecutable en 5 minutos, sin instalar nada | 2×/semana |
| **Yo estaba ahí** | Situaciones de oficina reales + cómo la IA las cambia | 1×/semana |
| **Traducción** | Desarmar un término técnico en castellano simple | 1×/semana |
| **Antes / después** | Una tarea real cronometrada, con y sin IA | 1×/semana |
| **El curso** | Qué se lleva el alumno, quién vino, cómo salió | 1×/semana |

«Yo estaba ahí» construye la marca. Los otros cuatro construyen la venta.

---

## Sitio web — estado actual (2026-06-03)

### Precios vigentes
| Plan | Precio | Notas |
|---|---|---|
| Landing Profesional | $280.000 | GA4 + SEO local. Sin hosting/dominio. |
| Analíticas Completas | $380.000 | + Meta Pixel + GA4 avanzado. Sin hosting/dominio. |
| Tienda Online | $700.000 | Carrito + 20 productos. Sin hosting/dominio. |
| Agente WhatsApp IA | $350.000 impl. + $50.000/mes | Automatización con IA. |

### Estructura de páginas
- `/` — Home (9 secciones): **Hero → Pillars → Portfolio → StatementStrip → Connector → CaseStudy → InteractiveSelector ("Planes") → FAQ → CtaFinal**
- `/servicios` — Página propia con los 4 paquetes y precios
- `/quien-soy` — Página personal: bio, stats, clientes, proceso
- `/blog` — Listado de artículos con filtro por categoría
- `/blog/[slug]` — Posts dinámicos (23 posts en `src/content/blog.ts`)

### Blog (23 posts en `src/content/blog.ts`)
5 clusters: Diseño Web, SEO Local, Automatización IA, Analíticas, Marketing Digital.
Posts base: `landing-page-negocio-local`, `seo-local-chile-google-maps`, `agente-whatsapp-ia-ventas` + 20 artículos nuevos enero-abril 2026.

### Analytics y Search Console
- GA4: propiedad `528950140`, Measurement ID `G-7LH63DBJDK` — activo en BaseLayout
- GSC: verificado con meta tag HTML (`XyuwQkify7mF2wcyxmrWcoUX2_65RRVX8Y4zjLg6Z6Y`)

### Portafolio (6 proyectos en `src/content/portfolio.ts`) — todos con URL real
| Proyecto | URL | Acento |
|---|---|---|
| CheckVital | checkvital.cl | #0477BF |
| Vital Airpower | vital-airpower.vercel.app | #003F87 |
| SIMA Ingeniería | simaingenieria.cl | #1B3A6B |
| Antocarz | antocarz.vercel.app | #1A1A2E |
| Salvatierra Paintworks | salvatierrapaintworks.vercel.app | #7B3F00 |
| Constructora Scheidl | constructora-scheidl.vercel.app | #4A5568 |

Los screenshots se cargan dinámicamente vía `microlink.io`. Cards con URL muestran badge **LIVE** verde pulsante.

### Sistema de animaciones y componentes visuales 21st.dev (2026-06-03)

**8 componentes de 21st.dev portados a vanilla CSS/JS (sin React):**

| Componente | Ubicación | Técnica |
|---|---|---|
| GradientText | Hero h1 | Gradiente cyan→azul→púrpura en `.text-gradient-gold` |
| AuroraButton | "VER LOS 3 SISTEMAS" Hero | `conic-gradient` rotatorio con `@property --aurora-a` + mask en `Button.astro` variante `aurora` |
| SpotlightBackground | Hero fondo | 4 glows + mouse-tracking spotlight con lerp en `Hero.astro` |
| WebGLShader | Hero `<canvas id="hero-shader-canvas">` | GLSL fragment shader wave distortion, paleta azul/cyan |
| PulseBeams | `Connector.astro` (entre StatementStrip y CaseStudy) | `src/components/ui/PulseBeams.astro` — SVG stroke-dashoffset animado |
| Gallery4 | Portfolio | `Portfolio.astro` reescrito como carousel horizontal drag+snap |
| InteractiveSelector | Sección "Planes" (entre CaseStudy y FAQ) | `src/components/ui/InteractiveSelector.astro` — 3 pilares expandibles |
| MagneticDock | CtaFinal | `src/components/ui/MagneticDock.astro` — WA/Email/IG con mouse proximity |

**CSS base:**
- `src/styles/animations.css` — `@property --aurora-a`, `aurora-spin`, `text-gradient-gold` sweep, `gs-*` GSAP states
- `src/styles/global.css` — `.text-gradient-gold` con 4 stops (cyan→blue→purple→cyan)
- `src/utils/animations.ts` — `initWordReveal()` (word-by-word con ScrollTrigger), `gs-fade-up` con blur+scale

**Nuevos componentes UI (`src/components/ui/`):**
- `PulseBeams.astro` — SVG 5 paths convergentes al nodo "G" central
- `InteractiveSelector.astro` — 3 pilares, expande con precios y badges
- `MagneticDock.astro` — dock glassmorphism con physics de proximidad

**Nuevas secciones (`src/components/sections/`):**
- `Connector.astro` — usa PulseBeams, muestra los 3 sistemas convergiendo

**Button.astro variantes:** `primary` | `ghost` | `whatsapp` | `aurora`

- Botón WhatsApp: esquina **inferior izquierda** (`bottom: 28px; left: 28px`)

### SEO — estado (2026-04-27)
- Schema: `LocalBusiness` + `ProfessionalService` con geo coords Coquimbo, image, openingHours ✅
- FAQPage JSON-LD: solo en `index.astro` (slot head) ✅
- Article schema: `image`, `dateModified`, `publisher.logo` ✅
- `public/robots.txt` creado con pointer al sitemap ✅
- Sitemap: `/sitemap-index.xml` generado por `@astrojs/sitemap` ✅

### Pendientes del sitio
- [ ] Antocarz: cambiar `portfolio.ts` a `www.antocarz.cl` → URL ya actualizada ✅
- [ ] Landing pages de ciudad: `/diseno-web-la-serena` y `/diseno-web-coquimbo` (oportunidad SEO local alta)
- [ ] Testimonios reales de Salvatierra Paintworks y Constructora Scheidl
- [ ] Google Search Console → solicitar indexación manual de las 26 páginas
- [ ] GMB: descripción, categorías, fotos, Q&A, primer post
- [ ] Editar página `/servicios` con los 4 planes actualizados

---

## Sistema de contenido Instagram

> **Estado (2026-05-01): pipeline hardened y en producción.** Primer carrusel publicado con éxito: `2026-04-30-agente-whatsapp-ia`.

### Generar un carrusel nuevo

```
/instagram-carousel [tema]
```

El skill genera el HTML completo. Después:

1. Escribir `caption.txt` en la carpeta del carrusel (UTF-8, con tildes).
   La primera línea es lo único que se ve sin expandir: ahí va el gancho.
   *(El diccionario `CAPTIONS` de `publish.py` es legacy — solo se usa si falta `caption.txt`.)*
2. Escribir `story.html` (1080×1920) para la Historia. Si no existe, se omite sin fallar.
3. Si hay imagen/pose nueva → copiar a `_media/gautama-poses/` o `_media/fondos/`
4. Verificar el render **antes** de publicar:

```bash
cd scripts/social
python -c "
import sys, re; sys.path.insert(0,'.')
from pathlib import Path
from prepare_for_ci import prepare_and_save
import publish_ci as pc
f = Path('../../.agents/carousels/YYYY-MM-DD-[slug]').resolve()
ci = prepare_and_save(str(f/'carousel.html'))
n = len(re.findall(r'class=\"slide[\s\"]', Path(ci).read_text(encoding='utf-8')))
pc.export_slides(Path(ci), n, f/'slides_ci')
pc.export_story(Path(prepare_and_save(str(f/'story.html'), out_name='story_ci.html')), f/'slides_ci')
"
```

Los PNGs quedan en `slides_ci/` (gitignored). Revisarlos antes de seguir.

5. Push a `main`:

```bash
git add .agents/carousels/YYYY-MM-DD-[slug]/ scripts/social/
git commit -m "Carrusel YYYY-MM-DD: [tema]"
git push origin main
```

4. Se publica solo a las 20:00 CLT. Para publicar ahora:

```bash
gh workflow run publish-social.yml --field date="YYYY-MM-DD" --field dry_run="false"
```

Para **forzar republicación** (ignora published.json):
```bash
gh workflow run publish-social.yml --field date="YYYY-MM-DD" --field force=true
```

### Publicación automática — GitHub Actions

- Cron: `23:00 UTC` = `20:00 CLT (UTC-3)`
- Archivo: `.github/workflows/publish-social.yml`
- Publica en: Instagram (carousel) + Facebook (álbum) + Historia IG (primer slide)
- Funciona aunque el PC esté apagado
- `concurrency: group: gautama-social-publish` — evita doble publicación si se dispara dos veces

### Flujo interno del publisher (post-hardening)

1. Health check del token Meta — avisa si expira en <15 días
2. Guard anti-doble: lee `published.json` en la carpeta del carrusel — sale si ya se publicó
3. `prepare_for_ci.py` — convierte `file:///` a base64 para Linux
4. Playwright — exporta PNGs 1080×1350px (usa `domcontentloaded` no `networkidle`)
5. GitHub API — sube slides en **paralelo** (4 workers) a `_media/ci-temp/`; reintentos x3
6. Meta Graph API v19.0 — crea contenedores IG, espera `status=FINISHED`, publica carousel
7. `published.json` commiteado al repo (persiste entre runs del runner)
8. Facebook álbum + Historia IG en bloques independientes (si fallan, IG no se pierde)
9. Cleanup `_media/ci-temp/` en `try/finally` — siempre corre aunque algo falle
10. Resumen final con permalink IG, URL FB, duración total

### Estructura HTML requerida para el publisher CI

El script busca estos elementos específicos — **no cambiar los IDs/clases**:

```html
<div class="slides-wrapper" id="slider">   ← id="slider" obligatorio
  <div class="slide ...">                   ← class debe empezar con "slide"
  ...
</div>
```

Variables CSS obligatorias: `--S: 0.5` (preview) / `--S: 1` (export CI).

### Diseño real de carruseles (lo que se usa, no el template del skill)

Los carruseles publicados usan este sistema (no Playfair/Outfit):
- **Fuente**: `Lato` (300/400/700/900)
- **Hero/Frase/CTA**: gradiente `linear-gradient(145deg, #59343E 0%, #0477BF 100%)`
- **Slides de contenido**: fondo claro `#F0F8FC`, borde izquierdo cyan, número grande cyan
- **Escala**: `transform: scale(var(--S))` en `.slide-inner` (1080×1350px nativos)
- Logo: `::after` en `.slide-inner` apuntando a `../../../imagenes para historias/gautama_reel.png`

### GitHub Secrets configurados

| Secret | Descripción |
|---|---|
| `LONG_LIVED_TOKEN` | Token Meta — renovado 2026-09-14. Revisar a mediados de **noviembre 2026**. |
| `IG_BUSINESS_ACCOUNT_ID` | `17841441869591123` |
| `FB_PAGE_ID` | `1104696042716629` |
| `FB_PAGE_ACCESS_TOKEN` | Token de la Facebook Page |
| `IMGBB_API_KEY` | No se usa — se mantiene por si acaso |

Credenciales locales en: `scripts/social/.env.social` (gitignored).

### Archivos del sistema

```
gautama-digital/
  .github/workflows/publish-social.yml   ← cron + workflow_dispatch + concurrency guard
  scripts/social/
    publish_ci.py                         ← publisher CI (hardened, usa en producción)
    publish.py                            ← publisher local (mismas features)
    prepare_for_ci.py                     ← file:// → base64
    .env.social                           ← credenciales locales (gitignored)
  _media/
    fondos/                               ← fondos para CI
    16-bit/                               ← sprites Gautama para CI
    ci-temp/                              ← slides temporales durante el run (se autolimpian)
  .agents/carousels/
    YYYY-MM-DD-[slug]/
      carousel.html                       ← fuente del carrusel
      carousel_ci.html                    ← generado por prepare_for_ci.py (gitignored)
      published.json                      ← guard anti-doble (commiteado por CI)
      slides_ci/                          ← PNGs exportados por CI
```

### Molde de carrusel (7 slides) — vigente desde 2026-09-14

```
1  HOOK        El dolor específico o la promesa con número. Sin panel, texto a sangre.
2  CONTEXTO    Por qué pasa. Prepara los pasos.
3  PASO 01     Ejecutable, con cita de ejemplo literal.
4  PASO 02     Ejecutable.
5  PASO 03     Ejecutable. El menos obvio va aquí.
6  PRUEBA      Comparativa sin/con. Es el slide que gana el «guardar».
7  CTA         El curso, con fecha o cupos.
```

Clases CSS por tipo de slide: `.hook` `.context` `.step` `.proof` `.cta`.
Estructura obligatoria para el publisher (no cambiar): `id="slider"` en `.slides-wrapper`,
cada slide con `class="slide ..."`, `--S: 0.5` preview / `--S: 1` export.

### Historias (9:16) — reactivadas 2026-09-14

Cada carrusel puede traer un `story.html` propio de **1080×1920**. Si existe, el publisher lo
renderiza y lo publica como Historia; si no existe, la omite sin fallar.

- Zonas seguras: `--safe-top: 300px` / `--safe-bottom: 320px` (IG tapa avatar arriba y barra abajo).
- Las guías rojas de zona segura solo se ven en preview: el export agrega `body.export` y las oculta.
- **Nunca** reciclar un slide 4:5 como historia — ese fue el motivo de que se desactivaran en mayo.

Tres formatos en rotación:
| Formato | Para qué |
|---|---|
| **El puente** | Manda al carrusel del día. Es el que se automatiza. |
| **La pregunta** | Sticker de encuesta. Alimenta el contenido de la semana. |
| **La clase de 15 s** | Un solo tip, texto grande, sin adornos. |

### Historial

- **Abril–mayo 2026:** 27 carruseles del ciclo «agencia / zen». Archivados en
  `.agents/carousels/_archivo-2026/` el 2026-09-14. El publisher ignora carpetas que empiezan con `_`.
- **2026-09-15 · `contexto-chatgpt`** — primer carrusel del molde nuevo (pilar «Hazlo hoy»),
  con historia 9:16. Listo para publicar.

## Sistema de diseño aprobado

### Fuentes

- Titulares: `Playfair Display` — serif clásica, weight 700/900
- Cuerpo: `Outfit` — sans-serif geométrica, weight 300/400/500/600

### Paleta

- `--accent: #04C4D9` — cyan principal
- `--accent2: #0477BF` — azul secundario
- `--dark: #06060F` — fondo base
- `--text: #FFFFFF`

### Fondo

- Una sola imagen por carrusel (coherencia visual), opacidad 0.28–0.32
- Overlay siempre: `linear-gradient(168deg, rgba(6,6,15,0.82) 0%, rgba(4,119,191,0.08) 50%, rgba(6,6,15,0.90) 100%)`

### Personaje Gautama 16-bit

- Posición: centrado abajo — `bottom:0; left:50%; transform:translateX(-50%)`
- Tamaño: `300px * var(--S)`
- `mix-blend-mode: screen` — elimina el fondo negro sin editar el PNG
- `filter: drop-shadow(0 0 16px rgba(4,196,217,0.5))`
- Siempre con `.char-halo` y `.bottom-fade`

| Tema del slide | Sprite |
|---|---|
| Hero / intro | `gautama 1.png` |
| Aprendizaje / tips | `gautama 3.png` |
| Lectura / conocimiento | `gautama 4.png` |
| Meditación / bienestar | `gautama 5.png` |
| CTA / cierre | `gautama 6.png` |
| SEO / Google | `gautama seo.png` |

### Escala

- Preview: `--S: 0.5`
- Exportar: `--S: 1` (1080×1350px)

---

## Skills respaldados

Todos los skills de Claude Code están en: `github.com/sebannicus/claude-skills`

Para respaldar cambios a un skill:

```bash
cd /c/Users/crman/.claude/commands
git add [skill].md
git commit -m "Update skill: [nombre]"
git push
```

---

## Checklist al crear carrusel nuevo

- [ ] `/instagram-carousel [tema]` — genera el HTML
- [ ] Caption agregado en `CAPTIONS` de `publish.py` y `publish_ci.py`
- [ ] Imágenes nuevas copiadas a `_media/` si aplica
- [ ] Commit y push a `main`
- [ ] Dry-run opcional: `gh workflow run publish-social.yml --field date="YYYY-MM-DD" --field dry_run="true"`

---

## Renovación del token Meta

El `LONG_LIVED_TOKEN` expira cada 60 días.

> **Estado 2026-09-14: renovado y operativo.** Cuenta `@gautama_digital`
> (IG `17841441869591123`, Page `1104696042716629`). El Page token quedó sin expiración.
>
> **Incidente que lo tumbó:** el App Secret estaba escrito en este mismo archivo, y el repo
> es público. GitHub lo detectó por secret scanning, avisó a Meta, y Meta invalidó todas las
> sesiones — por eso murieron el user token y el page token a la vez, y por eso el intercambio
> `fb_exchange_token` ya no servía. Se rotó el secret el 2026-09-14.
>
> **Regla:** el App Secret vive solo en `scripts/social/.env.social` (gitignored).
> Nunca en este archivo, en el README ni en un commit.

Para renovar, ejecutar desde `scripts/social/`:

> **Nunca escribir el App Secret en este archivo.** El repo es público.
> Las credenciales viven solo en `scripts/social/.env.social` (gitignored)
> y en los GitHub Secrets del repo.

```bash
# 1. Generar un User Token en https://developers.facebook.com/tools/explorer
#    App "gautama-publicador" > permisos: instagram_basic, instagram_content_publish,
#    pages_manage_posts, pages_read_engagement, pages_show_list
# 2. Convertirlo a long-lived y actualizar .env.social + GitHub Secrets:
cd scripts/social
python setup_tokens.py --token PEGAR_TOKEN_AQUI --push-secrets
```

El script lee `META_APP_ID` y `META_APP_SECRET` desde `.env.social`, obtiene el token de
60 días, detecta la Page y la cuenta IG asociadas, y sube los cuatro secrets al repo.

Luego actualizar el Secret `LONG_LIVED_TOKEN` en `github.com/sebannicus/gautama-digital/settings/secrets/actions`.

---

## Servicio de agencia → Digital Hunters

El negocio de gestión de Instagram para clientes (planes, márgenes, propuestas, prospectos)
ya no vive en este repo. Razones: este repo es público, y con el reposicionamiento ese negocio
pertenece a **Digital Hunters**.

Material local en `.agents/negocio-agencia.local.md` (gitignored). Migrar al repo de
Digital Hunters cuando exista.
