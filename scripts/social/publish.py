# publish.py - Publica el carrusel del dia en Instagram y Facebook.
#
# Detecta automaticamente el carrusel de hoy segun la fecha de la carpeta (YYYY-MM-DD-slug).
# Si no hay carrusel para hoy, no hace nada.
#
# Uso:
#   python publish.py                    -> publica el carrusel de hoy
#   python publish.py --date 2026-04-15  -> publica el de una fecha especifica
#   python publish.py --dry-run          -> simula sin publicar

import os
import sys
import json
import time
import requests
import argparse
from pathlib import Path
from datetime import date, datetime

ENV_FILE      = Path(__file__).parent / ".env.social"
CAROUSELS_DIR = Path(r"C:\Users\crman\Downloads\Claude\gautama-digital\.agents\carousels")
GRAPH_URL     = "https://graph.facebook.com/v19.0"

CAPTIONS = {
    "5-errores":          "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "test-5-errores":     "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "aparecer-en-google": "Tu negocio puede llevar anos funcionando... y aun asi no aparecer cuando alguien busca en Google.\n\nEso tiene solucion.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #SEOLocal #CuartaRegion #Coquimbo #LaSerena",
    "sin-web":            "Mucha gente no sabe que esta pagando cuando contrata una pagina web.\n\nAca te lo explicamos sin vueltas.\n\nPaquete Starter desde $250.000. El sitio es tuyo desde el primer dia.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #MarketingDigital #Coquimbo",
    "web-es-inversion":   "Una pagina web no es un gasto. Es la herramienta de ventas que trabaja por ti las 24 horas.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #MarketingDigital",
    "cuanto-cuesta":      "La pregunta mas frecuente: cuanto cuesta una pagina web en Chile?\n\nLa respuesta honesta: depende. Pero te explicamos exactamente de que depende.\n\nEn Gautama Digital te decimos el precio exacto antes de empezar. Sin sorpresas.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #Coquimbo #LaSerena #MarketingDigital",
}

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

# ── imgbb upload ──────────────────────────────────────────────────────────────

def upload_to_imgbb(image_path, api_key):
    import base64
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    r = requests.post("https://api.imgbb.com/1/upload", data={
        "key": api_key,
        "image": b64,
        "expiration": 3600,
    })
    r.raise_for_status()
    return r.json()["data"]["url"]

# ── Instagram ─────────────────────────────────────────────────────────────────

def create_ig_image_container(image_url, ig_id, token, is_carousel_item=True):
    r = requests.post(f"{GRAPH_URL}/{ig_id}/media", params={
        "image_url": image_url,
        "is_carousel_item": "true" if is_carousel_item else "false",
        "access_token": token,
    })
    r.raise_for_status()
    return r.json()["id"]

def create_ig_carousel_container(item_ids, caption, ig_id, token):
    r = requests.post(f"{GRAPH_URL}/{ig_id}/media", params={
        "media_type": "CAROUSEL",
        "children": ",".join(item_ids),
        "caption": caption,
        "access_token": token,
    })
    r.raise_for_status()
    return r.json()["id"]

def publish_ig_container(container_id, ig_id, token):
    r = requests.post(f"{GRAPH_URL}/{ig_id}/media_publish", params={
        "creation_id": container_id,
        "access_token": token,
    })
    r.raise_for_status()
    return r.json()["id"]

def publish_to_instagram(slide_paths, caption, env, dry_run=False):
    ig_id     = env["IG_BUSINESS_ACCOUNT_ID"]
    token     = env["LONG_LIVED_TOKEN"]
    imgbb_key = env["IMGBB_API_KEY"]

    print(f"\n[IG] Subiendo {len(slide_paths)} slides a imgbb...")
    image_urls = []
    for path in slide_paths:
        if dry_run:
            print(f"  [DRY] {Path(path).name}")
            image_urls.append(f"https://example.com/{Path(path).name}")
        else:
            url = upload_to_imgbb(path, imgbb_key)
            print(f"  OK   {Path(path).name} -> {url[:55]}...")
            image_urls.append(url)

    print("[IG] Creando contenedores...")
    if dry_run:
        print("  [DRY] Contenedores creados")
        return "DRY_IG_ID"

    if len(image_urls) == 1:
        container_id = create_ig_image_container(image_urls[0], ig_id, token, is_carousel_item=False)
    else:
        item_ids = []
        for url in image_urls:
            item_id = create_ig_image_container(url, ig_id, token, is_carousel_item=True)
            item_ids.append(item_id)
            time.sleep(1)
        container_id = create_ig_carousel_container(item_ids, caption, ig_id, token)

    print(f"  Contenedor: {container_id}")
    print("[IG] Publicando...")
    media_id = publish_ig_container(container_id, ig_id, token)
    print(f"  OK   Media ID: {media_id}")
    return media_id

# ── Facebook ──────────────────────────────────────────────────────────────────

def publish_to_facebook(slide_paths, caption, env, dry_run=False):
    page_id    = env["FB_PAGE_ID"]
    page_token = env["FB_PAGE_ACCESS_TOKEN"]

    if dry_run:
        print("\n[FB] [DRY] Se publicaria en Facebook Page")
        return "DRY_FB_ID"

    print(f"\n[FB] Subiendo {len(slide_paths)} fotos...")
    photo_ids = []
    for path in slide_paths[:10]:
        with open(path, "rb") as f:
            r = requests.post(
                f"{GRAPH_URL}/{page_id}/photos",
                data={"published": "false", "access_token": page_token},
                files={"source": (Path(path).name, f, "image/png")}
            )
            r.raise_for_status()
            photo_ids.append({"media_fbid": r.json()["id"]})
            time.sleep(0.5)

    r = requests.post(f"{GRAPH_URL}/{page_id}/feed", data={
        "message": caption,
        "attached_media": json.dumps(photo_ids),
        "access_token": page_token,
    })
    r.raise_for_status()
    post_id = r.json()["id"]
    print(f"  OK   Post ID: {post_id}")
    return post_id

# ── Historia IG ───────────────────────────────────────────────────────────────

def publish_ig_story(slide_path, env, dry_run=False):
    ig_id     = env["IG_BUSINESS_ACCOUNT_ID"]
    token     = env["LONG_LIVED_TOKEN"]
    imgbb_key = env["IMGBB_API_KEY"]

    if dry_run:
        print(f"  [DRY] Historia IG: {Path(slide_path).name}")
        return

    url = upload_to_imgbb(slide_path, imgbb_key)
    r = requests.post(f"{GRAPH_URL}/{ig_id}/media", params={
        "image_url": url,
        "media_type": "STORIES",
        "access_token": token,
    })
    r.raise_for_status()
    container_id = r.json()["id"]
    time.sleep(2)
    r2 = requests.post(f"{GRAPH_URL}/{ig_id}/media_publish", params={
        "creation_id": container_id,
        "access_token": token,
    })
    r2.raise_for_status()
    print(f"  OK   Historia IG publicada")

# ── Export slides ─────────────────────────────────────────────────────────────

def export_slides(folder):
    from playwright.sync_api import sync_playwright

    html_path  = folder / "carousel.html"
    output_dir = folder / "slides"
    output_dir.mkdir(exist_ok=True)

    html_content = html_path.read_text(encoding="utf-8")
    n_slides = html_content.count('class="slide"')
    print(f"[EXPORT] {n_slides} slides desde {html_path.name}")

    png_paths = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1350})
        page.goto(f"file:///{html_path.as_posix()}")
        page.wait_for_load_state("networkidle")
        page.evaluate("document.documentElement.style.setProperty('--S', '1')")
        page.evaluate("document.querySelector('body').style.cssText = 'padding:0;margin:0;gap:0;'")
        page.evaluate("document.querySelector('.carousel').style.borderRadius = '0'")

        for i in range(n_slides):
            page.evaluate(f"cur = {i}; render()")
            page.wait_for_timeout(300)
            path = str(output_dir / f"slide_{i+1:02d}.png")
            page.screenshot(path=path, clip={"x": 0, "y": 0, "width": 1080, "height": 1350})
            print(f"  OK   slide_{i+1:02d}.png")
            png_paths.append(path)

        browser.close()
    return png_paths

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", default=None)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    target_date = args.date or date.today().isoformat()
    dry_run     = args.dry_run

    sep = "=" * 52
    print(f"\n{sep}")
    print(f"  Gautama Digital -- Publicador Social")
    print(f"  Fecha : {target_date}  {'[DRY RUN]' if dry_run else '[REAL]'}")
    print(f"{sep}")

    folder = find_carousel(target_date)
    if not folder:
        print(f"\nSin carrusel para {target_date}. Nada que publicar.")
        sys.exit(0)

    print(f"\nCarrusel : {folder.name}")

    # Exportar si no existen los PNGs
    slides_dir = folder / "slides"
    existing   = sorted(slides_dir.glob("slide_*.png")) if slides_dir.exists() else []
    if not existing:
        print("Exportando PNGs...")
        slide_paths = export_slides(folder)
    else:
        slide_paths = [str(p) for p in existing]
        print(f"PNGs ya exportados: {len(slide_paths)} slides")

    caption = get_caption(get_slug(folder))

    env = load_env()
    missing = [k for k in ["LONG_LIVED_TOKEN", "IG_BUSINESS_ACCOUNT_ID", "FB_PAGE_ID", "FB_PAGE_ACCESS_TOKEN", "IMGBB_API_KEY"] if not env.get(k)]
    if missing and not dry_run:
        print(f"\nFaltan credenciales: {', '.join(missing)}")
        sys.exit(1)

    # Publicar
    print("\n--- INSTAGRAM ---")
    publish_to_instagram(slide_paths, caption, env, dry_run)

    print("\n--- FACEBOOK ---")
    publish_to_facebook(slide_paths, caption, env, dry_run)

    print("\n--- HISTORIA ---")
    publish_ig_story(slide_paths[0], env, dry_run)

    print(f"\n{sep}")
    print(f"  Listo -- {datetime.now().strftime('%H:%M:%S')}")
    print(f"{sep}\n")

if __name__ == "__main__":
    main()
