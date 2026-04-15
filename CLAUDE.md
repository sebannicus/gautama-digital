# CLAUDE.md — Gautama Digital

Instrucciones específicas para el proyecto Gautama Digital. Leer antes de cualquier tarea.

---

## Proyecto

Gautama Digital es la agencia digital de Sebastián Morales (@sebannicus), Coquimbo, Chile.
Handle Instagram: `@gautama_digital` — sitio: `gautamadigital.cl`

---

## Sitio web — estado actual (2026-04-14)

### Precios vigentes
| Plan | Precio | Notas |
|---|---|---|
| Landing Profesional | $280.000 | GA4 + SEO local. Sin hosting/dominio. |
| Analíticas Completas | $380.000 | + Meta Pixel + GA4 avanzado. Sin hosting/dominio. |
| Tienda Online | $700.000 | Carrito + 20 productos. Sin hosting/dominio. |
| Agente WhatsApp IA | $350.000 impl. + $50.000/mes | Automatización con IA. |

### Estructura de páginas
- `/` — Home: Hero → About → Portfolio → Industries → Process → CaseStudy → CtaMid → TrustedBy → FAQ → LocalMap → CtaFinal
- `/servicios` — Página propia con los 4 paquetes y precios

### Portafolio (6 proyectos en `src/content/portfolio.ts`)
CheckVital, Vital Airpower, SIMA Ingeniería, Antocarz, Salvatierra Paintworks, Constructora Scheidl

### Pendientes del sitio
- [ ] Pegar URL embed Google Maps en `src/components/sections/LocalMap.astro` (línea 21 — `MAPS_EMBED_URL`)
- [ ] Reemplazar testimonios placeholder de Salvatierra y Scheidl con citas reales en `TrustedBy.astro`
- [ ] Agregar screenshots reales de los proyectos cuando estén disponibles (`public/images/portfolio/`)

---

## Sistema de contenido Instagram

### Generar un carrusel nuevo

```
/instagram-carousel [tema]
```

El skill genera el HTML completo con el diseño aprobado. Después:

1. Agregar el caption en `CAPTIONS` de `scripts/social/publish.py` Y `scripts/social/publish_ci.py`
2. Si hay imagen de fondo nueva → copiarla a `_media/fondos/`
3. Si hay sprite Gautama nuevo → copiarlo a `_media/16-bit/`
4. Push a `main`:

```bash
git add .agents/carousels/YYYY-MM-DD-[slug]/ scripts/social/
git commit -m "Carrusel YYYY-MM-DD: [tema]"
git push origin main
```

5. Se publica solo a las 20:00 CLT. Para publicar antes:

```bash
gh workflow run publish-social.yml --field date="YYYY-MM-DD" --field dry_run="false"
```

### Publicación automática — GitHub Actions

- Cron: `23:00 UTC` = `20:00 CLT (UTC-3)`
- Archivo: `.github/workflows/publish-social.yml`
- Publica en: Instagram (carousel) + Facebook (álbum) + Historia IG (primer slide)
- Funciona aunque el PC esté apagado

### Flujo interno del publisher

1. `prepare_for_ci.py` — convierte `file:///` locales a base64 para Linux
2. Playwright (Chromium headless) — exporta PNGs 1080×1350px
3. GitHub API — sube imágenes temporalmente a `_media/ci-temp/` y usa `raw.githubusercontent.com` como URL pública (imgbb estaba bloqueado por los servidores de Meta)
4. Meta Graph API v19.0 — publica en IG y FB
5. Limpieza automática de `_media/ci-temp/` tras publicar

> **Nota exportación slides**: El HTML del carrusel tiene `const slideW = 1080 * 0.5` hardcodeado para el preview. El script NO usa `render()` sino que mueve el slider directamente con `translateX(-{i * 1080}px)` para evitar este bug.

### GitHub Secrets configurados

| Secret | Valor |
|---|---|
| `LONG_LIVED_TOKEN` | Token Meta **sin expiración** — data_access expira mediados junio 2026 |
| `IG_BUSINESS_ACCOUNT_ID` | `17841441869591123` |
| `FB_PAGE_ID` | `1104696042716629` |
| `FB_PAGE_ACCESS_TOKEN` | Token de la Facebook Page |
| `IMGBB_API_KEY` | (ya no se usa — se mantiene por si acaso) |

> El workflow necesita `permissions: contents: write` para subir imágenes temporales al repo via GitHub API.

Credenciales locales en: `scripts/social/.env.social` (no commitear).

### Archivos del sistema

```
gautama-digital/
  .github/workflows/publish-social.yml   ← cron + workflow_dispatch
  scripts/social/
    publish_ci.py                         ← publisher GitHub Actions
    publish.py                            ← publisher local
    prepare_for_ci.py                     ← file:// → base64
    .env.social                           ← credenciales locales (gitignored)
  _media/
    fondos/                               ← fondos para CI
    16-bit/                               ← sprites Gautama para CI
  .agents/carousels/
    YYYY-MM-DD-[slug]/
      carousel.html                       ← preview interactivo
      slides/                             ← PNGs exportados (local)
      slides_ci/                          ← PNGs exportados (CI)
```

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
