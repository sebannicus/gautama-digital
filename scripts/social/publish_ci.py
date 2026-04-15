# publish_ci.py
# Version de publish.py para GitHub Actions.
# Lee credenciales desde variables de entorno (GitHub Secrets).
# Prepara el HTML reemplazando file:// con base64 antes de correr Playwright.

import os
import sys
import json
import time
import requests
import argparse
from pathlib import Path
from datetime import date, datetime

CAROUSELS_DIR = Path(__file__).parent.parent.parent / ".agents" / "carousels"
GRAPH_URL     = "https://graph.facebook.com/v19.0"

CAPTIONS = {
    "5-errores":          "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "test-5-errores":     "En 2026, si tu negocio no aparece en Google, tus clientes le estan comprando a la competencia.\n\nEstos son los 5 errores digitales mas comunes en negocios de la Cuarta Region.\n\n#MarketingDigital #NegociosLocales #CuartaRegion #Coquimbo #PresenciaDigital #GautamaDigital",
    "aparecer-en-google": "Tu negocio puede llevar anos funcionando... y aun asi no aparecer cuando alguien busca en Google.\n\nEso tiene solucion.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #SEOLocal #CuartaRegion #Coquimbo #LaSerena",
    "sin-web":            "Mucha gente no sabe que esta pagando cuando contrata una pagina web.\n\nAca te lo explicamos sin vueltas.\n\nPaquete Starter desde $250.000. El sitio es tuyo desde el primer dia.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #MarketingDigital #Coquimbo",
    "cuanto-cuesta":      "La pregunta mas frecuente: cuanto cuesta una pagina web en Chile?\n\nLa respuesta honesta: depende. Pero te explicamos exactamente de que depende.\n\nEn Gautama Digital te decimos el precio exacto antes de empezar. Sin sorpresas.\n\nDiagnostico gratuito -> Link en bio\n\n#GautamaDigital #PaginaWeb #CuartaRegion #Coquimbo #LaSerena #MarketingDigital",
}

def get_env(key):
    val = os.environ.get(key, "")
    if not val:
        raise SystemExit(f"ERROR: Variable de entorno {key} no configurada en GitHub Secrets.")
    return val

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

def export_slides(html_path, n_slides, output_dir):
    from playwright.sync_api import sync_playwright
    output_dir.mkdir(exist_ok=True)
    png_paths = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1350})
        page.goto(f"file://{html_path.resolve().as_posix()}")
        page.wait_for_load_state("networkidle")
        page.evaluate("document.documentElement.style.setProperty('--S', '1')")
        page.evaluate("document.querySelector('body').style.cssText = 'padding:0;margin:0;gap:0;'")
        page.evaluate("document.querySelector('.carousel').style.borderRadius = '0'")
        # Deshabilitar transición CSS para que el screenshot no capture un estado intermedio
        page.evaluate("document.querySelector('.slides-wrapper').style.transition = 'none'")
        page.wait_for_timeout(300)  # esperar a que el CSS de --S:1 se aplique
        for i in range(n_slides):
            # Mover directamente con 1080px fijos — evita el bug de slideW=1080*0.5 hardcodeado en el HTML
            page.evaluate(f"document.getElementById('slider').style.transform = 'translateX(-{i * 1080}px)'")
            page.wait_for_timeout(400)
            path = output_dir / f"slide_{i+1:02d}.png"
            page.screenshot(path=str(path), clip={"x": 0, "y": 0, "width": 1080, "height": 1350})
            print(f"  OK   slide_{i+1:02d}.png")
            png_paths.append(str(path))
        browser.close()
    return png_paths

def upload_to_github(image_path):
    """Sube imagen al repo como archivo temporal y retorna URL raw de GitHub."""
    import base64
    gh_token = os.environ.get("GITHUB_TOKEN", "")
    gh_repo  = os.environ.get("GITHUB_REPO", "")
    if not gh_token or not gh_repo:
        raise SystemExit("ERROR: GITHUB_TOKEN o GITHUB_REPO no configurados.")

    filename  = Path(image_path).name
    repo_path = f"_media/ci-temp/{filename}"
    api_url   = f"https://api.github.com/repos/{gh_repo}/contents/{repo_path}"
    headers   = {"Authorization": f"Bearer {gh_token}", "Accept": "application/vnd.github+json"}

    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    # Si ya existe el archivo, obtener su SHA para poder actualizarlo
    sha = None
    existing = requests.get(api_url, headers=headers)
    if existing.status_code == 200:
        sha = existing.json().get("sha")

    payload = {"message": f"ci: temp media {filename}", "content": b64}
    if sha:
        payload["sha"] = sha

    r = requests.put(api_url, headers=headers, json=payload)
    if not r.ok:
        print(f"  ERROR GitHub upload: {r.status_code} — {r.text}")
    r.raise_for_status()

    raw_url = f"https://raw.githubusercontent.com/{gh_repo}/main/{repo_path}"
    time.sleep(1)  # pequeña pausa para que GitHub propague el archivo
    return raw_url


def delete_from_github(filename):
    """Elimina el archivo temporal del repo tras publicar."""
    gh_token = os.environ.get("GITHUB_TOKEN", "")
    gh_repo  = os.environ.get("GITHUB_REPO", "")
    repo_path = f"_media/ci-temp/{filename}"
    api_url   = f"https://api.github.com/repos/{gh_repo}/contents/{repo_path}"
    headers   = {"Authorization": f"Bearer {gh_token}", "Accept": "application/vnd.github+json"}

    existing = requests.get(api_url, headers=headers)
    if existing.status_code != 200:
        return
    sha = existing.json().get("sha")
    requests.delete(api_url, headers=headers, json={"message": f"ci: cleanup {filename}", "sha": sha})

def create_ig_image_container(image_url, ig_id, token, is_carousel_item=True):
    r = requests.post(f"{GRAPH_URL}/{ig_id}/media", params={
        "image_url": image_url,
        "is_carousel_item": "true" if is_carousel_item else "false",
        "access_token": token,
    })
    if not r.ok:
        print(f"  ERROR Meta API: {r.status_code} — {r.text}")
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

def publish_to_instagram(slide_paths, caption, ig_id, token, imgbb_key, dry_run):
    print(f"\n[IG] Subiendo {len(slide_paths)} slides a GitHub...")
    image_urls = []
    uploaded_files = []
    for path in slide_paths:
        if dry_run:
            print(f"  [DRY] {Path(path).name}")
            image_urls.append(f"https://example.com/{Path(path).name}")
        else:
            url = upload_to_github(path)
            print(f"  OK   {Path(path).name} → {url}")
            image_urls.append(url)
            uploaded_files.append(Path(path).name)

    if dry_run:
        print("  [DRY] Contenedores y publicacion simulados")
        return "DRY_IG"

    item_ids = []
    for url in image_urls:
        item_id = create_ig_image_container(url, ig_id, token)
        item_ids.append(item_id)
        time.sleep(1)

    if len(item_ids) == 1:
        container_id = item_ids[0]
    else:
        container_id = create_ig_carousel_container(item_ids, caption, ig_id, token)

    media_id = publish_ig_container(container_id, ig_id, token)
    print(f"  OK   Media ID: {media_id}")

    # Limpiar archivos temporales del repo
    print("  Limpiando archivos temporales de GitHub...")
    for fname in uploaded_files:
        delete_from_github(fname)

    return media_id

def publish_to_facebook(slide_paths, caption, page_id, page_token, dry_run):
    if dry_run:
        print("\n[FB] [DRY] Publicacion simulada")
        return "DRY_FB"
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
    print(f"  OK   Post ID: {r.json()['id']}")
    return r.json()["id"]

def publish_ig_story(slide_path, ig_id, token, imgbb_key, dry_run):
    if dry_run:
        print(f"  [DRY] Historia IG: {Path(slide_path).name}")
        return
    url = upload_to_github(slide_path)
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
    print("  OK   Historia IG publicada")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--date",    default="")
    parser.add_argument("--dry-run", default="false")
    args = parser.parse_args()

    target_date = args.date.strip() or date.today().isoformat()
    dry_run     = args.dry_run.strip().lower() == "true"

    # Credenciales desde env vars (GitHub Secrets)
    token     = get_env("LONG_LIVED_TOKEN")
    ig_id     = get_env("IG_BUSINESS_ACCOUNT_ID")
    page_id   = get_env("FB_PAGE_ID")
    page_tok  = get_env("FB_PAGE_ACCESS_TOKEN")
    imgbb_key = get_env("IMGBB_API_KEY")

    sep = "=" * 52
    print(f"\n{sep}")
    print(f"  Gautama Digital -- GitHub Actions Publisher")
    print(f"  Fecha : {target_date}  {'[DRY RUN]' if dry_run else '[REAL]'}")
    print(f"{sep}")

    folder = find_carousel(target_date)
    if not folder:
        print(f"\nSin carrusel para {target_date}. Nada que publicar.")
        sys.exit(0)

    print(f"\nCarrusel : {folder.name}")

    # Preparar HTML con imagenes base64 (para que Playwright funcione en Linux/CI)
    from prepare_for_ci import prepare_and_save
    html_original = folder / "carousel.html"
    html_ci       = prepare_and_save(str(html_original))

    # Contar slides
    html_content = Path(html_ci).read_text(encoding="utf-8")
    n_slides = html_content.count('class="slide"')
    print(f"  Slides detectados: {n_slides}")

    # Exportar PNGs
    slides_dir = folder / "slides_ci"
    print(f"\nExportando PNGs con Playwright...")
    slide_paths = export_slides(Path(html_ci), n_slides, slides_dir)

    caption = get_caption(get_slug(folder))

    # Publicar
    print("\n--- INSTAGRAM ---")
    publish_to_instagram(slide_paths, caption, ig_id, token, imgbb_key, dry_run)

    print("\n--- FACEBOOK ---")
    publish_to_facebook(slide_paths, caption, page_id, page_tok, dry_run)

    print("\n--- HISTORIA ---")
    publish_ig_story(slide_paths[0], ig_id, token, imgbb_key, dry_run)

    print(f"\n{sep}")
    print(f"  Listo -- {datetime.now().strftime('%H:%M:%S')} UTC")
    print(f"{sep}\n")

if __name__ == "__main__":
    main()
