# publish_ci.py
# Version de publish.py para GitHub Actions.
# Lee credenciales desde variables de entorno (GitHub Secrets).
# Prepara el HTML reemplazando file:// con base64 antes de correr Playwright.

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
from concurrent.futures import ThreadPoolExecutor, as_completed

CAROUSELS_DIR = Path(__file__).parent.parent.parent / ".agents" / "carousels"
GRAPH_URL     = "https://graph.facebook.com/v19.0"

# Tunables
GITHUB_UPLOAD_RETRIES   = 3
GITHUB_UPLOAD_BACKOFF   = 2          # segundos entre reintentos (escala con el intento)
GITHUB_UPLOAD_PARALLEL  = 4          # uploads en paralelo (respetar rate limit ~ok)
IG_CONTAINER_TIMEOUT    = 120        # segundos esperando FINISHED por contenedor IG
IG_POLL_INTERVAL        = 4          # segundos entre polls
META_REQUEST_TIMEOUT    = 60         # timeout en cada llamada a Meta
GITHUB_REQUEST_TIMEOUT  = 30         # timeout en cada llamada a GitHub
TOKEN_WARN_THRESHOLD    = 15 * 86400 # avisar si el token expira en menos de 15 dias
PLAYWRIGHT_GOTO_TIMEOUT = 30000      # ms

CAPTIONS = {
    "5-errores":          "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "test-5-errores":     "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "aparecer-en-google": "Tu negocio puede llevar anos funcionando... y aun asi no aparecer cuando alguien busca en Google.\n\nEso tiene solucion.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #SEOLocal #CuartaRegion #Coquimbo #LaSerena",
    "sin-web":            "Mucha gente no sabe que esta pagando cuando contrata una pagina web.\n\nAca te lo explicamos sin vueltas.\n\nPaquete Starter desde $250.000. El sitio es tuyo desde el primer dia.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #MarketingDigital #Coquimbo",
    "cuanto-cuesta":      "La pregunta mas frecuente: cuanto cuesta una pagina web en Chile?\n\nLa respuesta honesta: depende. Pero te explicamos exactamente de que depende.\n\nEn Gautama Digital te decimos el precio exacto antes de empezar. Sin sorpresas.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #Coquimbo #LaSerena #MarketingDigital",
    "agente-whatsapp-ia": "Cuantos clientes perdiste hoy por no responder a tiempo?\n\nA las 11 PM alguien busco exactamente lo que ofreces, te escribio por WhatsApp... y eligio al que si contesto.\n\nEl Agente WhatsApp IA responde en segundos, califica leads y te avisa cuando hay una oportunidad real. Tu negocio disponible 24/7 - sin contratar a nadie.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #WhatsAppIA #AutomatizacionIA #MarketingDigital #CuartaRegion #Coquimbo #LaSerena #NegociosLocales",
    "analiticas-negocio": "Tu negocio tiene visitas pero no sabes de donde vienen?\n\nSin analiticas, estas tomando decisiones de marketing a ciegas. Con un panel bien configurado, ves exactamente que canal trae clientes reales - y cual solo gasta tu presupuesto.\n\nEn Gautama Digital construimos paneles de analiticas que muestran el origen de tu trafico y las maneras mas eficientes de aprovechar cada visita.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #AnaliticasWeb #GA4 #MarketingDigital #CuartaRegion #Coquimbo #LaSerena #NegociosLocales #MarketingChile",
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

# ── Helpers basicos ──────────────────────────────────────────────────────────

def get_env(key):
    val = os.environ.get(key, "")
    if not val:
        raise SystemExit(f"ERROR: Variable de entorno {key} no configurada en GitHub Secrets.")
    return val

def find_carousel(target_date):
    if not CAROUSELS_DIR.exists():
        return None
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

def already_published(folder: Path) -> dict | None:
    p = published_marker_path(folder)
    if not p.exists():
        return None
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return None

def mark_published(folder: Path, ig_media_id: str | None, fb_post_id: str | None, story_ok: bool):
    """Marca el carrusel como publicado.

    En CI tambien commitea el archivo al repo via GitHub API para que la marca
    persista entre runs (de lo contrario el filesystem del runner se borra y
    el guard anti-doble-publicacion no sirve).
    """
    data = {
        "published_at": datetime.now(timezone.utc).isoformat(),
        "ig_media_id":  ig_media_id,
        "fb_post_id":   fb_post_id,
        "story_ok":     story_ok,
    }
    body = json.dumps(data, indent=2)
    published_marker_path(folder).write_text(body, encoding="utf-8")

    # Persistir en GitHub si tenemos credenciales (CI)
    if os.environ.get("CI") and os.environ.get("GITHUB_TOKEN") and os.environ.get("GITHUB_REPO"):
        try:
            _commit_file_to_github(
                repo_path=f".agents/carousels/{folder.name}/published.json",
                content_bytes=body.encode("utf-8"),
                message=f"ci: mark published {folder.name}",
            )
        except Exception as e:
            log(f"  WARN no se pudo commitear published.json: {e}")

def _commit_file_to_github(repo_path: str, content_bytes: bytes, message: str):
    """Crea o actualiza un archivo arbitrario en el repo via GitHub API."""
    gh_repo = os.environ["GITHUB_REPO"]
    api_url = f"https://api.github.com/repos/{gh_repo}/contents/{repo_path}"
    headers = _gh_headers()

    sha = None
    existing = requests.get(api_url, headers=headers, timeout=GITHUB_REQUEST_TIMEOUT)
    if existing.status_code == 200:
        sha = existing.json().get("sha")

    payload = {
        "message": message,
        "content": base64.b64encode(content_bytes).decode(),
    }
    if sha:
        payload["sha"] = sha

    r = requests.put(api_url, headers=headers, json=payload, timeout=GITHUB_REQUEST_TIMEOUT)
    r.raise_for_status()

# ── Token health ─────────────────────────────────────────────────────────────

def check_token_expiry(token: str):
    """Avisa si el token Meta esta proximo a expirar."""
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
                log(f"  *** WARNING *** LONG_LIVED_TOKEN expira en {days} dias ({datetime.fromtimestamp(expires_at).isoformat()}) -- RENOVAR")
            else:
                log(f"  token user expira en {days} dias")
        else:
            log("  token user: sin expiracion (long-lived OK)")

        if data_access and data_access > 0:
            secs = data_access - now
            days = secs // 86400
            if secs < TOKEN_WARN_THRESHOLD:
                log(f"  *** WARNING *** data_access expira en {days} dias ({datetime.fromtimestamp(data_access).isoformat()}) -- REAUTORIZAR APP")
            else:
                log(f"  data_access expira en {days} dias")
    except Exception as e:
        log(f"  WARN check_token_expiry fallo: {e}")

# ── Playwright export ────────────────────────────────────────────────────────

def export_slides(html_path, n_slides, output_dir):
    from playwright.sync_api import sync_playwright
    output_dir.mkdir(exist_ok=True)
    png_paths = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1350})
        # domcontentloaded es mas robusto que networkidle: si Google Fonts cuelga, networkidle se queda esperando
        page.goto(f"file://{html_path.resolve().as_posix()}", wait_until="domcontentloaded", timeout=PLAYWRIGHT_GOTO_TIMEOUT)
        # damos tiempo a fuentes/CSS sin bloquearnos en networkidle
        try:
            page.wait_for_load_state("load", timeout=10000)
        except Exception:
            log("  WARN load state demoro mas de 10s, continuamos igual")
        # Esperar fonts (si fallan, no abortar)
        try:
            page.evaluate("document.fonts && document.fonts.ready")
            page.wait_for_function("document.fonts ? document.fonts.status === 'loaded' : true", timeout=8000)
        except Exception:
            log("  WARN fonts.ready timeout, continuamos")

        page.evaluate("document.documentElement.style.setProperty('--S', '1')")
        page.evaluate("document.querySelector('body').style.cssText = 'padding:0;margin:0;gap:0;'")
        page.evaluate("document.querySelector('.carousel') && (document.querySelector('.carousel').style.borderRadius = '0')")
        # Deshabilitar transición CSS para que el screenshot no capture un estado intermedio
        wrapper = page.evaluate("document.querySelector('.slides-wrapper') ? '.slides-wrapper' : (document.querySelector('.slides-track') ? '.slides-track' : null)")
        if wrapper:
            page.evaluate(f"document.querySelector('{wrapper}').style.transition = 'none'")
        page.wait_for_timeout(300)  # esperar a que el CSS de --S:1 se aplique
        for i in range(n_slides):
            # Mover directamente con 1080px fijos — evita el bug de slideW=1080*0.5 hardcodeado en el HTML
            page.evaluate(
                f"(document.getElementById('slider') || document.getElementById('track')).style.transform = 'translateX(-{i * 1080}px)'"
            )
            page.wait_for_timeout(350)
            path = output_dir / f"slide_{i+1:02d}.png"
            page.screenshot(path=str(path), clip={"x": 0, "y": 0, "width": 1080, "height": 1350})
            log(f"  OK   slide_{i+1:02d}.png")
            png_paths.append(str(path))
        browser.close()
    return png_paths

# ── GitHub upload ────────────────────────────────────────────────────────────

def _gh_headers():
    gh_token = get_env("GITHUB_TOKEN")
    return {"Authorization": f"Bearer {gh_token}", "Accept": "application/vnd.github+json"}

def upload_to_github(image_path):
    """Sube imagen al repo como archivo temporal y retorna URL raw de GitHub.

    Reintenta hasta GITHUB_UPLOAD_RETRIES veces con backoff lineal.
    """
    gh_repo  = get_env("GITHUB_REPO")
    filename  = Path(image_path).name
    repo_path = f"_media/ci-temp/{filename}"
    api_url   = f"https://api.github.com/repos/{gh_repo}/contents/{repo_path}"
    headers   = _gh_headers()

    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    last_err = None
    for attempt in range(1, GITHUB_UPLOAD_RETRIES + 1):
        try:
            # Si ya existe el archivo, obtener su SHA para poder actualizarlo
            sha = None
            existing = requests.get(api_url, headers=headers, timeout=GITHUB_REQUEST_TIMEOUT)
            if existing.status_code == 200:
                sha = existing.json().get("sha")

            payload = {"message": f"ci: temp media {filename}", "content": b64}
            if sha:
                payload["sha"] = sha

            r = requests.put(api_url, headers=headers, json=payload, timeout=GITHUB_REQUEST_TIMEOUT)
            if r.ok:
                raw_url = f"https://raw.githubusercontent.com/{gh_repo}/main/{repo_path}"
                # pequena pausa para que GitHub propague el archivo a raw.githubusercontent
                time.sleep(1)
                return raw_url
            else:
                last_err = f"{r.status_code} — {r.text[:200]}"
                log(f"  WARN upload {filename} intento {attempt}/{GITHUB_UPLOAD_RETRIES}: {last_err}")
        except Exception as e:
            last_err = repr(e)
            log(f"  WARN upload {filename} intento {attempt}/{GITHUB_UPLOAD_RETRIES}: {last_err}")
        if attempt < GITHUB_UPLOAD_RETRIES:
            time.sleep(GITHUB_UPLOAD_BACKOFF * attempt)

    raise RuntimeError(f"GitHub upload fallo definitivamente para {filename}: {last_err}")

def upload_many_parallel(paths):
    """Sube N archivos de forma secuencial (evita conflictos de SHA en commits paralelos)."""
    results = []
    for i, p in enumerate(paths):
        url = upload_to_github(p)
        log(f"  OK   {Path(p).name} ({i+1}/{len(paths)})")
        results.append(url)
    return results

def delete_from_github(filename):
    """Elimina el archivo temporal del repo tras publicar. Idempotente."""
    gh_repo  = os.environ.get("GITHUB_REPO", "")
    if not gh_repo:
        return
    repo_path = f"_media/ci-temp/{filename}"
    api_url   = f"https://api.github.com/repos/{gh_repo}/contents/{repo_path}"
    headers   = _gh_headers()

    try:
        existing = requests.get(api_url, headers=headers, timeout=GITHUB_REQUEST_TIMEOUT)
        if existing.status_code != 200:
            return
        sha = existing.json().get("sha")
        requests.delete(
            api_url,
            headers=headers,
            json={"message": f"ci: cleanup {filename}", "sha": sha},
            timeout=GITHUB_REQUEST_TIMEOUT,
        )
    except Exception as e:
        log(f"  WARN delete_from_github({filename}): {e}")

def cleanup_uploaded_files(filenames):
    """Borra los archivos subidos de forma secuencial. Nunca lanza excepcion."""
    for fname in filenames:
        delete_from_github(fname)

# ── Meta API ─────────────────────────────────────────────────────────────────

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
    if not r.ok:
        log(f"  ERROR Meta API (image container): {r.status_code} — {r.text[:300]}")
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
    if not r.ok:
        log(f"  ERROR Meta API (carousel container): {r.status_code} — {r.text[:300]}")
    r.raise_for_status()
    return r.json()["id"]

def wait_for_ig_container(container_id, token, max_wait=IG_CONTAINER_TIMEOUT, poll=IG_POLL_INTERVAL):
    """Espera hasta que el contenedor tenga status=FINISHED antes de publicar.

    Si el ultimo estado es IN_PROGRESS al timeout, igualmente intentamos publicar
    (Meta a veces tarda en transicionar a FINISHED y la publicacion funciona).
    Si el estado es ERROR o EXPIRED, abortamos.
    """
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
            else:
                log(f"  WARN status check {r.status_code}: {r.text[:200]}")
        except Exception as e:
            log(f"  WARN status check fallo: {e}")
        log(f"  status: {last_status} (intento {attempt})")
        if last_status == "FINISHED":
            return True
        if last_status in ("ERROR", "EXPIRED"):
            raise SystemExit(f"ERROR: contenedor {container_id} en estado {last_status} — no se puede publicar.")
        time.sleep(poll)

    if last_status == "IN_PROGRESS":
        log(f"  WARN timeout esperando FINISHED ({max_wait}s); ultimo estado IN_PROGRESS, intentamos publicar igual")
        return False
    raise SystemExit(f"TIMEOUT: el contenedor {container_id} no llego a FINISHED en {max_wait}s (ultimo estado: {last_status}).")

def publish_ig_container(container_id, ig_id, token):
    r = requests.post(
        f"{GRAPH_URL}/{ig_id}/media_publish",
        params={"creation_id": container_id, "access_token": token},
        timeout=META_REQUEST_TIMEOUT,
    )
    if not r.ok:
        log(f"  ERROR media_publish: {r.status_code} — {r.text[:300]}")
    r.raise_for_status()
    return r.json()["id"]

def get_ig_permalink(media_id, token):
    """Intenta resolver el permalink del post recien publicado."""
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

# ── Instagram pipeline ───────────────────────────────────────────────────────

def publish_to_instagram(slide_paths, caption, ig_id, token, dry_run, uploaded_files_sink):
    log(f"[IG] Subiendo {len(slide_paths)} slides a GitHub...")
    if dry_run:
        for p in slide_paths:
            log(f"  [DRY] {Path(p).name}")
        log("  [DRY] Contenedores y publicacion simulados")
        return "DRY_IG", None

    image_urls = upload_many_parallel(slide_paths)
    for p in slide_paths:
        uploaded_files_sink.append(Path(p).name)

    # Crear contenedores hijo (IG no permite paralelizar bien la creacion en una misma cuenta)
    item_ids = []
    for url in image_urls:
        item_id = create_ig_image_container(url, ig_id, token)
        item_ids.append(item_id)
        time.sleep(0.5)

    if len(item_ids) == 1:
        container_id = item_ids[0]
    else:
        container_id = create_ig_carousel_container(item_ids, caption, ig_id, token)

    log("  Esperando que IG procese el contenedor...")
    wait_for_ig_container(container_id, token)

    media_id = publish_ig_container(container_id, ig_id, token)
    log(f"  OK   Media ID: {media_id}")
    permalink = get_ig_permalink(media_id, token)
    if permalink:
        log(f"  Permalink: {permalink}")
    return media_id, permalink

# ── Facebook pipeline ────────────────────────────────────────────────────────

def publish_to_facebook(slide_paths, caption, page_id, page_token, dry_run):
    if dry_run:
        log("[FB] [DRY] Publicacion simulada")
        return "DRY_FB"
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
            if not r.ok:
                log(f"  ERROR FB photo: {r.status_code} — {r.text[:300]}")
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
    if not r.ok:
        log(f"  ERROR FB feed: {r.status_code} — {r.text[:300]}")
    r.raise_for_status()
    post_id = r.json()["id"]
    log(f"  OK   Post ID: {post_id}")
    return post_id

# ── Historia IG ──────────────────────────────────────────────────────────────

def publish_ig_story(slide_path, ig_id, token, dry_run, uploaded_files_sink):
    if dry_run:
        log(f"  [DRY] Historia IG: {Path(slide_path).name}")
        return False
    url = upload_to_github(slide_path)
    uploaded_files_sink.append(Path(slide_path).name)
    r = requests.post(
        f"{GRAPH_URL}/{ig_id}/media",
        params={"image_url": url, "media_type": "STORIES", "access_token": token},
        timeout=META_REQUEST_TIMEOUT,
    )
    if not r.ok:
        log(f"  ERROR story container: {r.status_code} — {r.text[:300]}")
    r.raise_for_status()
    container_id = r.json()["id"]
    time.sleep(2)
    r2 = requests.post(
        f"{GRAPH_URL}/{ig_id}/media_publish",
        params={"creation_id": container_id, "access_token": token},
        timeout=META_REQUEST_TIMEOUT,
    )
    if not r2.ok:
        log(f"  ERROR story publish: {r2.status_code} — {r2.text[:300]}")
    r2.raise_for_status()
    log("  OK   Historia IG publicada")
    return True

# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--date",    default="")
    parser.add_argument("--dry-run", default="false")
    parser.add_argument("--force",   default="false", help="Ignora published.json y publica igual")
    args = parser.parse_args()

    target_date = args.date.strip() or date.today().isoformat()
    dry_run     = args.dry_run.strip().lower() == "true"
    force       = args.force.strip().lower() == "true"

    # Credenciales desde env vars (GitHub Secrets)
    token     = get_env("LONG_LIVED_TOKEN")
    ig_id     = get_env("IG_BUSINESS_ACCOUNT_ID")
    page_id   = get_env("FB_PAGE_ID")
    page_tok  = get_env("FB_PAGE_ACCESS_TOKEN")

    sep = "=" * 60
    print(f"\n{sep}")
    print(f"  Gautama Digital -- GitHub Actions Publisher")
    print(f"  Fecha : {target_date}  {'[DRY RUN]' if dry_run else '[REAL]'}")
    print(f"  Inicio: {datetime.now(timezone.utc).isoformat()}")
    print(f"{sep}\n")

    run_started = time.time()

    # Health check del token (no-op si falla, solo loguea)
    with log_step("Health check token Meta"):
        check_token_expiry(token)

    folder = find_carousel(target_date)
    if not folder:
        log(f"Sin carrusel para {target_date}. Nada que publicar.")
        sys.exit(0)

    log(f"Carrusel: {folder.name}")
    slug    = get_slug(folder)
    caption = get_caption(slug)

    # Guard anti-doble-publicacion
    prev = already_published(folder)
    if prev and not force and not dry_run:
        log(f"  Ya publicado el {prev.get('published_at')} (ig={prev.get('ig_media_id')}, fb={prev.get('fb_post_id')}).")
        log("  Usa --force=true para republicar. Saliendo sin hacer nada.")
        sys.exit(0)

    # Preparar HTML con imagenes base64 (para que Playwright funcione en Linux/CI)
    with log_step("Preparar HTML para CI"):
        from prepare_for_ci import prepare_and_save
        html_original = folder / "carousel.html"
        html_ci       = prepare_and_save(str(html_original))
        # Sanity check: si quedaron muchos file:/// es probable que falle Playwright
        ci_content = Path(html_ci).read_text(encoding="utf-8")
        leftover = len(re.findall(r'file:///', ci_content))
        if leftover > 0:
            log(f"  WARN {leftover} referencias file:/// quedaron sin reemplazar; el render puede no encontrar esos assets")

    # Contar slides
    n_slides = len(re.findall(r'class="slide[\s"]', ci_content))
    log(f"  Slides detectados: {n_slides}")
    if n_slides == 0:
        raise SystemExit("ERROR: no se detectaron slides en el HTML (regex class=\"slide\").")

    # Exportar PNGs
    slides_dir = folder / "slides_ci"
    with log_step(f"Exportar PNGs ({n_slides})"):
        slide_paths = export_slides(Path(html_ci), n_slides, slides_dir)

    # Estado para resumen y cleanup
    ig_media_id = None
    ig_permalink = None
    fb_post_id  = None
    story_ok    = False
    uploaded_files: list[str] = []

    try:
        with log_step("Publicar en Instagram"):
            ig_media_id, ig_permalink = publish_to_instagram(
                slide_paths, caption, ig_id, token, dry_run, uploaded_files
            )
        # Si IG ok, marcar antes de FB para evitar doble post si FB se cuelga
        if not dry_run:
            mark_published(folder, ig_media_id, fb_post_id, story_ok)

        try:
            with log_step("Publicar en Facebook"):
                fb_post_id = publish_to_facebook(slide_paths, caption, page_id, page_tok, dry_run)
        except Exception as e:
            log(f"  ERROR Facebook fallo (IG ya publico): {e}")
            log("  IG quedo publicado. Revisar FB manualmente.")

        try:
            with log_step("Publicar Historia IG"):
                story_ok = publish_ig_story(slide_paths[0], ig_id, token, dry_run, uploaded_files)
        except Exception as e:
            log(f"  ERROR Historia IG fallo: {e}")

        # Refrescar marca con fb_post_id y story_ok finales
        if not dry_run:
            mark_published(folder, ig_media_id, fb_post_id, story_ok)
    finally:
        # Cleanup SIEMPRE — incluso si fallo cualquier publicacion
        if uploaded_files and not dry_run:
            with log_step(f"Cleanup {len(uploaded_files)} archivos temporales en GitHub"):
                cleanup_uploaded_files(uploaded_files)

    # Resumen final
    elapsed_total = time.time() - run_started
    print(f"\n{sep}")
    print(f"  RESUMEN PUBLICACION")
    print(f"{sep}")
    print(f"  Carrusel : {folder.name}")
    print(f"  Slug     : {slug}")
    print(f"  Slides   : {len(slide_paths)}")
    print(f"  Duracion : {elapsed_total:.1f}s")
    print(f"  Modo     : {'DRY RUN' if dry_run else 'REAL'}")
    if ig_media_id and ig_media_id != "DRY_IG":
        print(f"  IG       : {ig_media_id}")
        if ig_permalink:
            print(f"             {ig_permalink}")
    if fb_post_id and fb_post_id != "DRY_FB":
        print(f"  FB       : {fb_post_id}")
        # FB feed ID viene como pageid_postid -> URL
        if "_" in fb_post_id:
            page_part, post_part = fb_post_id.split("_", 1)
            print(f"             https://facebook.com/{page_part}/posts/{post_part}")
    print(f"  Historia : {'OK' if story_ok else ('-' if dry_run else 'FALLO')}")
    print(f"{sep}\n")

if __name__ == "__main__":
    main()
