# CLAUDE.md — Gautama Digital

Instrucciones específicas para el proyecto Gautama Digital. Leer antes de cualquier tarea.

---

## Proyecto

Gautama Digital es la agencia digital de Sebastián Morales (@sebannicus), Coquimbo, Chile.
Handle Instagram: `@gautama_digital` — sitio: `gautamadigital.cl`

---

## Sitio web — estado actual (2026-04-27)

### Precios vigentes
| Plan | Precio | Notas |
|---|---|---|
| Landing Profesional | $280.000 | GA4 + SEO local. Sin hosting/dominio. |
| Analíticas Completas | $380.000 | + Meta Pixel + GA4 avanzado. Sin hosting/dominio. |
| Tienda Online | $700.000 | Carrito + 20 productos. Sin hosting/dominio. |
| Agente WhatsApp IA | $350.000 impl. + $50.000/mes | Automatización con IA. |

### Estructura de páginas
- `/` — Home (6 secciones): **Hero → Portfolio → StatementStrip → CaseStudy (Propuesta de Valor) → FAQ → CtaFinal**
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

### Sistema de animaciones
- `src/styles/global.css` — orbs bg-mesh (3 orbs, opacidad 0.14–0.22, más grandes y rápidos), bg-dots (puntos animados), bg-scan (línea de scan)
- `src/styles/animations.css` — `text-gradient-gold` con sweep animado, `gs-word-wrap`/`gs-word` para word reveal
- `src/utils/animations.ts` — `initWordReveal()` (word-by-word con ScrollTrigger), `gs-fade-up` con blur+scale inicial
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

1. Agregar caption en `CAPTIONS` de **ambos** `publish.py` y `publish_ci.py`
2. Si hay imagen/sprite nuevo → copiar a `_media/fondos/` o `_media/16-bit/`
3. Push a `main`:

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
| `LONG_LIVED_TOKEN` | Token Meta 60 días — **renovar mediados junio 2026** |
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

### Carruseles publicados

| Fecha | Slug | Estado |
|---|---|---|
| 2026-04-13 | aparecer-en-google | ¿publicado? — sin published.json |
| 2026-04-14 | test-5-errores | ¿publicado? — sin published.json |
| 2026-04-15 | sin-web-5-errores | ¿publicado? — sin published.json |
| 2026-04-16 | cuanto-cuesta-una-web | ¿publicado? — sin published.json |
| 2026-04-17 | web-es-inversion | ¿publicado? — sin published.json |
| 2026-04-30 | agente-whatsapp-ia | ✅ publicado — published.json en repo |

---

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

El `LONG_LIVED_TOKEN` expira cada 60 días. Próxima renovación: **mediados junio 2026**.

Para renovar, ejecutar desde `scripts/social/`:

```python
import requests
r = requests.get("https://graph.facebook.com/v19.0/oauth/access_token", params={
    "grant_type": "fb_exchange_token",
    "client_id": "2180375189398482",
    "client_secret": "404fa0f16a3694a8217ccdb18ab6c4ec",
    "fb_exchange_token": "[TOKEN_ACTUAL]",
})
print(r.json()["access_token"])
```

Luego actualizar el Secret `LONG_LIVED_TOKEN` en `github.com/sebannicus/gautama-digital/settings/secrets/actions`.
