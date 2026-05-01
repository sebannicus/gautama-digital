# publish.py - Publica el carrusel del dia en Instagram y Facebook (modo LOCAL).
#
# Detecta automaticamente el carrusel de hoy segun la fecha de la carpeta (YYYY-MM-DD-slug).
# Si no hay carrusel para hoy, no hace nada.
#
# Uso:
#   python publish.py                    -> publica el carrusel de hoy
#   python publish.py --date 2026-04-15  -> publica el de una fecha especifica
#   python publish.py --dry-run          -> simula sin publicar
#   python publish.py --force            -> ignora published.json y republica

import os
import re
import sys
import json
import time
import base64
import requests
import argparse
import contextlib
from pathlib import Path
from datetime import date, datetime, timezone

ENV_FILE      = Path(__file__).parent / ".env.social"
CAROUSELS_DIR = Path(r"D:\dev\agencia\gautama-digital\.agents\carousels")
GRAPH_URL     = "https://graph.facebook.com/v19.0"

# Tunables
META_REQUEST_TIMEOUT = 60
IG_CONTAINER_TIMEOUT = 120
IG_POLL_INTERVAL     = 4
TOKEN_WARN_THRESHOLD = 15 * 86400

CAPTIONS = {
    "5-errores":          "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "test-5-errores":     "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "aparecer-en-google": "Tu negocio puede llevar anos funcionando... y aun asi no aparecer cuando alguien busca en Google.\n\nEso tiene solucion.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #SEOLocal #CuartaRegion #Coquimbo #LaSerena",
    "sin-web":            "Mucha gente no sabe que esta pagando cuando contrata una pagina web.\n\nAca te lo explicamos sin vueltas.\n\nPaquete Starter desde $250.000. El sitio es tuyo desde el primer dia.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #MarketingDigital #Coquimbo",
    "web-es-inversion":   "Una pagina web no es un gasto. Es la herramienta de ventas que trabaja por ti las 24 horas.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #MarketingDigital",
    "cuanto-cuesta":      "La pregunta mas frecuente: cuanto cuesta una pagina web en Chile?\n\nLa respuesta honesta: depende. Pero te explicamos exactamente de que depende.\n\nEn Gautama Digital te decimos el precio exacto antes de empezar. Sin sorpresas.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #Coquimbo #LaSerena #MarketingDigital",
    "agente-whatsapp-ia": "Cuantos clientes perdiste hoy por no responder a tiempo?\n\nA las 11 PM alguien busco exactamente lo que ofreces, te escribio por WhatsApp... y eligio al que si contesto.\n\nEl Agente WhatsApp IA responde en segundos, califica leads y te avisa cuando hay una oportunidad real. Tu negocio disponible 24/7 - sin contratar a nadie.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #WhatsAppIA #AutomatizacionIA #MarketingDigital #CuartaRegion #Coquimbo #LaSerena #NegociosLocales",
}

# ── Logging ──────────────────────────────────────────────────────────────────

def now_str():
    return datetime.now().strftime("%H:%M:%S")

def log(msg, prefix=""):
    print(f"[{now_str()}] {prefix}{msg}", flush=True)

@contextlib.contextmanager
def log_step(name):
    start = time.time()
    log(f">>> {name}")
    try:
        yield
        elapsed = time.time() - start
        log(f"<<< {name} ({elapsed:.1f}s)")
    except Exception as e:
        elapsed = time.time() - start
        log(f"!!! {name} FALLO tras {elapsed:.1f}s: {type(e).__name__}: {e}")
        raise

# ── Helpers ──────────────────────────────────────────────────────────────────

def load_env():
    env = {}
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()
    return env

def find_carousel(target_date):
    for folder in sorted(CAROUSELS_DIR.iterdir()):
        if folder.is_dir() and folder.name.startswith(target_date) and not folder.name.startswith("_"):
            html = folder / "carousel.html"
            if html.exists():
                return folder
    return None

def get_slug(folder):
    parts = folder.name.split("-", 3)
    return parts[3] if len(parts) > 3 else folder.name

def get_caption(slug):
    for key, caption in CAPTIONS.items():
        if key in slug:
            return caption
    return "Nuevo contenido de @gautama_digital\n\nLink en bio\n\n#GautamaDigital #CuartaRegion #MarketingDigital"

# ── Guard anti-doble-publicacion ─────────────────────────────────────────────

def published_marker_path(folder: Path) -> Path:
    return folder / "published.json"

def already_published(folder: Path):
    p = published_marker_path(folder)
    if not p.exists():
        return None
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return None

def mark_published(folder: Path, ig_media_id, fb_post_id, story_ok):
    data = {
        "published_at": datetime.now(timezone.utc).isoformat(),
        "ig_media_id":  ig_media_id,
        "fb_post_id":   fb_post_id,
        "story_ok":     story_ok,
    }
    published_marker_path(folder).write_text(json.dumps(data, indent=2), encoding="utf-8")

# ── Token health ─────────────────────────────────────────────────────────────

def check_token_expiry(token: str):
    try:
        r = requests.get(
            f"{GRAPH_URL}/debug_token",
            params={"input_token": token, "access_token": token},
            timeout=META_REQUEST_TIMEOUT,
        )
        if not r.ok:
            log(f"  WARN no se pudo verificar token: {r.status_code}")
            return
        data = r.json().get("data", {})
        expires_at  = data.get("expires_at", 0)
        data_access = data.get("data_access_expires_at", 0)
        is_valid    = data.get("is_valid", False)

        if not is_valid:
            log("  WARN token reportado como NO valido por Meta")

        now = int(time.time())
        if expires_at and expires_at > 0:
            secs = expires_at - now
            days = secs // 86400
            if secs < TOKEN_WARN_THRESHOLD:
                log(f"  *** WARNING *** LONG_LIVED_TOKEN expira en {days} dias -- RENOVAR")
            else:
                log(f"  token user expira en {days} dias")
        else:
            log("  token user: sin expiracion (long-lived OK)")

        if data_access and data_access > 0:
            secs = data_access - now
            days = secs // 86400
            if secs < TOKEN_WARN_THRESHOLD:
                log(f"  *** WARNING *** data_access expira en {days} dias -- REAUTORIZAR APP")
            else:
                log(f"  data_access expira en {days} dias")
    except Exception as e:
        log(f"  WARN check_token_expiry fallo: {e}")

# ── imgbb upload ──────────────────────────────────────────────────────────────

def upload_to_imgbb(image_path, api_key):
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    r = requests.post(
        "https://api.imgbb.com/1/upload",
        data={"key": api_key, "image": b64, "expiration": 3600},
        timeout=60,
    )
    r.raise_for_status()
    return r.json()["data"]["url"]

# ── Instagram ─────────────────────────────────────────────────────────────────

def create_ig_image_container(image_url, ig_id, token, is_carousel_item=True):
    r = requests.post(
        f"{GRAPH_URL}/{ig_id}/media",
        params={
            "image_url": image_url,
            "is_carousel_item": "true" if is_carousel_item else "false",
            "access_token": token,
        },
        timeout=META_REQUEST_TIMEOUT,
    )
    r.raise_for_status()
    return r.json()["id"]

def create_ig_carousel_container(item_ids, caption, ig_id, token):
    r = requests.post(
        f"{GRAPH_URL}/{ig_id}/media",
        params={
            "media_type": "CAROUSEL",
            "children": ",".join(item_ids),
            "caption": caption,
            "access_token": token,
        },
        timeout=META_REQUEST_TIMEOUT,
    )
    r.raise_for_status()
    return r.json()["id"]

def wait_for_ig_container(container_id, token, max_wait=IG_CONTAINER_TIMEOUT, poll=IG_POLL_INTERVAL):
    deadline = time.time() + max_wait
    last_status = "UNKNOWN"
    attempt = 0
    while time.time() < deadline:
        attempt += 1
        try:
            r = requests.get(
                f"{GRAPH_URL}/{container_id}",
                params={"fields": "status_code", "access_token": token},
                timeout=META_REQUEST_TIMEOUT,
            )
            if r.ok:
                last_status = r.json().get("status_code", "UNKNOWN")
        except Exception as e:
            log(f"  WARN status check fallo: {e}")
        log(f"  status: {last_status} (intento {attempt})")
        if last_status == "FINISHED":
            return True
        if last_status in ("ERROR", "EXPIRED"):
            raise SystemExit(f"ERROR: contenedor {container_id} en {last_status}")
        time.sleep(poll)
    if last_status == "IN_PROGRESS":
        log(f"  WARN timeout pero IN_PROGRESS, intentamos publicar igual")
        return False
    raise SystemExit(f"TIMEOUT contenedor {container_id} ultimo estado {last_status}")

def publish_ig_container(container_id, ig_id, token):
    r = requests.post(
        f"{GRAPH_URL}/{ig_id}/media_publish",
        params={"creation_id": container_id, "access_token": token},
        timeout=META_REQUEST_TIMEOUT,
    )
    r.raise_for_status()
    return r.json()["id"]

def get_ig_permalink(media_id, token):
    try:
        r = requests.get(
            f"{GRAPH_URL}/{media_id}",
            params={"fields": "permalink", "access_token": token},
            timeout=META_REQUEST_TIMEOUT,
        )
        if r.ok:
            return r.json().get("permalink")
    except Exception:
        pass
    return None

def publish_to_instagram(slide_paths, caption, env, dry_run=False):
    ig_id     = env["IG_BUSINESS_ACCOUNT_ID"]
    token     = env["LONG_LIVED_TOKEN"]
    imgbb_key = env["IMGBB_API_KEY"]

    log(f"[IG] Subiendo {len(slide_paths)} slides a imgbb...")
    image_urls = []
    for path in slide_paths:
        if dry_run:
            log(f"  [DRY] {Path(path).name}")
            image_urls.append(f"https://example.com/{Path(path).name}")
        else:
            url = upload_to_imgbb(path, imgbb_key)
            log(f"  OK   {Path(path).name} -> {url[:55]}...")
            image_urls.append(url)

    log("[IG] Creando contenedores...")
    if dry_run:
        log("  [DRY] Contenedores creados")
        return "DRY_IG_ID", None

    if len(image_urls) == 1:
        container_id = create_ig_image_container(image_urls[0], ig_id, token, is_carousel_item=False)
    else:
        item_ids = []
        for url in image_urls:
            item_id = create_ig_image_container(url, ig_id, token, is_carousel_item=True)
            item_ids.append(item_id)
            time.sleep(0.5)
        container_id = create_ig_carousel_container(item_ids, caption, ig_id, token)

    log(f"  Contenedor: {container_id}")
    log("  Esperando que IG procese...")
    wait_for_ig_container(container_id, token)
    media_id = publish_ig_container(container_id, ig_id, token)
    log(f"  OK   Media ID: {media_id}")
    permalink = get_ig_permalink(media_id, token)
    if permalink:
        log(f"  Permalink: {permalink}")
    return media_id, permalink

# ── Facebook ──────────────────────────────────────────────────────────────────

def publish_to_facebook(slide_paths, caption, env, dry_run=False):
    page_id    = env["FB_PAGE_ID"]
    page_token = env["FB_PAGE_ACCESS_TOKEN"]

    if dry_run:
        log("[FB] [DRY] Se publicaria en Facebook Page")
        return "DRY_FB_ID"

    log(f"[FB] Subiendo {len(slide_paths)} fotos...")
    photo_ids = []
    for path in slide_paths[:10]:
        with open(path, "rb") as f:
            r = requests.post(
                f"{GRAPH_URL}/{page_id}/photos",
                data={"published": "false", "access_token": page_token},
                files={"source": (Path(path).name, f, "image/png")},
                timeout=META_REQUEST_TIMEOUT,
            )
            r.raise_for_status()
            photo_ids.append({"media_fbid": r.json()["id"]})
            time.sleep(0.4)

    r = requests.post(
        f"{GRAPH_URL}/{page_id}/feed",
        data={
            "message": caption,
            "attached_media": json.dumps(photo_ids),
            "access_token": page_token,
        },
        timeout=META_REQUEST_TIMEOUT,
    )
    r.raise_for_status()
    post_id = r.json()["id"]
    log(f"  OK   Post ID: {post_id}")
    return post_id

# ── Historia IG ───────────────────────────────────────────────────────────────

def publish_ig_story(slide_path, env, dry_run=False):
    ig_id     = env["IG_BUSINESS_ACCOUNT_ID"]
    token     = env["LONG_LIVED_TOKEN"]
    imgbb_key = env["IMGBB_API_KEY"]

    if dry_run:
        log(f"  [DRY] Historia IG: {Path(slide_path).name}")
        return False

    url = upload_to_imgbb(slide_path, imgbb_key)
    r = requests.post(
        f"{GRAPH_URL}/{ig_id}/media",
        params={"image_url": url, "media_type": "STORIES", "access_token": token},
        timeout=META_REQUEST_TIMEOUT,
    )
    r.raise_for_status()
    container_id = r.json()["id"]
    time.sleep(2)
    r2 = requests.post(
        f"{GRAPH_URL}/{ig_id}/media_publish",
        params={"creation_id": container_id, "access_token": token},
        timeout=META_REQUEST_TIMEOUT,
    )
    r2.raise_for_status()
    log("  OK   Historia IG publicada")
    return True

# ── Export slides ─────────────────────────────────────────────────────────────

def export_slides(folder):
    from playwright.sync_api import sync_playwright

    html_path  = folder / "carousel.html"
    output_dir = folder / "slides"
    output_dir.mkdir(exist_ok=True)

    html_content = html_path.read_text(encoding="utf-8")
    n_slides = len(re.findall(r'class="slide[\s"]', html_content))
    log(f"[EXPORT] {n_slides} slides desde {html_path.name}")

    png_paths = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1350})
        page.goto(f"file:///{html_path.as_posix()}", wait_until="domcontentloaded", timeout=30000)
        try:
            page.wait_for_load_state("load", timeout=10000)
        except Exception:
            log("  WARN load state demoro mas de 10s, continuamos")
        try:
            page.wait_for_function("document.fonts ? document.fonts.status === 'loaded' : true", timeout=8000)
        except Exception:
            pass

        page.evaluate("document.documentElement.style.setProperty('--S', '1')")
        page.evaluate("document.querySelector('body').style.cssText = 'padding:0;margin:0;gap:0;'")
        page.evaluate("document.querySelector('.carousel') && (document.querySelector('.carousel').style.borderRadius = '0')")

        # Soporte tanto para el HTML antiguo (con render()) como el nuevo (slider/track)
        slider_exists = page.evaluate("!!(document.getElementById('slider') || document.getElementById('track'))")
        wrapper = page.evaluate("document.querySelector('.slides-wrapper') ? '.slides-wrapper' : (document.querySelector('.slides-track') ? '.slides-track' : null)")
        if wrapper:
            page.evaluate(f"document.querySelector('{wrapper}').style.transition = 'none'")
        page.wait_for_timeout(300)

        for i in range(n_slides):
            if slider_exists:
                page.evaluate(
                    f"(document.getElementById('slider') || document.getElementById('track')).style.transform = 'translateX(-{i * 1080}px)'"
                )
            else:
                # HTML legacy con render()
                page.evaluate(f"cur = {i}; render()")
            page.wait_for_timeout(350)
            path = str(output_dir / f"slide_{i+1:02d}.png")
            page.screenshot(path=path, clip={"x": 0, "y": 0, "width": 1080, "height": 1350})
            log(f"  OK   slide_{i+1:02d}.png")
            png_paths.append(path)

        browser.close()
    return png_paths

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", default=None)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force",   action="store_true", help="Ignora published.json y republica")
    args = parser.parse_args()

    target_date = args.date or date.today().isoformat()
    dry_run     = args.dry_run
    force       = args.force

    sep = "=" * 60
    print(f"\n{sep}")
    print(f"  Gautama Digital -- Publicador Social (LOCAL)")
    print(f"  Fecha : {target_date}  {'[DRY RUN]' if dry_run else '[REAL]'}")
    print(f"  Inicio: {datetime.now(timezone.utc).isoformat()}")
    print(f"{sep}\n")

    run_started = time.time()

    folder = find_carousel(target_date)
    if not folder:
        log(f"Sin carrusel para {target_date}. Nada que publicar.")
        sys.exit(0)

    log(f"Carrusel: {folder.name}")
    slug = get_slug(folder)

    prev = already_published(folder)
    if prev and not force and not dry_run:
        log(f"  Ya publicado el {prev.get('published_at')} (ig={prev.get('ig_media_id')}, fb={prev.get('fb_post_id')}).")
        log("  Usa --force para republicar. Saliendo.")
        sys.exit(0)

    # Exportar si no existen los PNGs
    slides_dir = folder / "slides"
    existing   = sorted(slides_dir.glob("slide_*.png")) if slides_dir.exists() else []
    if not existing:
        with log_step("Exportar PNGs"):
            slide_paths = export_slides(folder)
    else:
        slide_paths = [str(p) for p in existing]
        log(f"PNGs ya exportados: {len(slide_paths)} slides")

    caption = get_caption(slug)

    env = load_env()
    missing = [k for k in ["LONG_LIVED_TOKEN", "IG_BUSINESS_ACCOUNT_ID", "FB_PAGE_ID", "FB_PAGE_ACCESS_TOKEN", "IMGBB_API_KEY"] if not env.get(k)]
    if missing and not dry_run:
        log(f"Faltan credenciales: {', '.join(missing)}")
        sys.exit(1)

    if not dry_run:
        with log_step("Health check token Meta"):
            check_token_expiry(env["LONG_LIVED_TOKEN"])

    ig_media_id, ig_permalink, fb_post_id, story_ok = None, None, None, False

    with log_step("Publicar en Instagram"):
        ig_media_id, ig_permalink = publish_to_instagram(slide_paths, caption, env, dry_run)
    if not dry_run:
        mark_published(folder, ig_media_id, fb_post_id, story_ok)

    try:
        with log_step("Publicar en Facebook"):
            fb_post_id = publish_to_facebook(slide_paths, caption, env, dry_run)
    except Exception as e:
        log(f"  ERROR FB fallo (IG ya publico): {e}")

    try:
        with log_step("Publicar Historia IG"):
            story_ok = publish_ig_story(slide_paths[0], env, dry_run)
    except Exception as e:
        log(f"  ERROR Historia fallo: {e}")

    if not dry_run:
        mark_published(folder, ig_media_id, fb_post_id, story_ok)

    elapsed_total = time.time() - run_started
    print(f"\n{sep}")
    print(f"  RESUMEN PUBLICACION")
    print(f"{sep}")
    print(f"  Carrusel : {folder.name}")
    print(f"  Slug     : {slug}")
    print(f"  Slides   : {len(slide_paths)}")
    print(f"  Duracion : {elapsed_total:.1f}s")
    print(f"  Modo     : {'DRY RUN' if dry_run else 'REAL'}")
    if ig_media_id and ig_media_id != "DRY_IG_ID":
        print(f"  IG       : {ig_media_id}")
        if ig_permalink:
            print(f"             {ig_permalink}")
    if fb_post_id and fb_post_id != "DRY_FB_ID":
        print(f"  FB       : {fb_post_id}")
        if "_" in fb_post_id:
            page_part, post_part = fb_post_id.split("_", 1)
            print(f"             https://facebook.com/{page_part}/posts/{post_part}")
    print(f"  Historia : {'OK' if story_ok else ('-' if dry_run else 'FALLO')}")
    print(f"{sep}\n")

if __name__ == "__main__":
    main()
