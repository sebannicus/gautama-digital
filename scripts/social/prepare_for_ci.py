# prepare_for_ci.py
# Reemplaza rutas file:/// en el HTML con imagenes base64.
# Se ejecuta automaticamente cuando corre en GitHub Actions (CI=true).

import re
import base64
from pathlib import Path
from urllib.parse import unquote

# Directorio _media/ dentro del repo (relativo a la raiz del proyecto)
REPO_ROOT  = Path(__file__).parent.parent.parent
MEDIA_DIR  = REPO_ROOT / "_media"

# Mapa de nombres de archivo originales a rutas en _media/
def build_media_index():
    index = {}
    for f in MEDIA_DIR.rglob("*"):
        if f.is_file():
            index[f.name.lower()] = f
    return index

def file_to_base64(path: Path) -> str:
    ext  = path.suffix.lower().lstrip(".")
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png"}.get(ext, "image/jpeg")
    data = base64.b64encode(path.read_bytes()).decode()
    return f"data:{mime};base64,{data}"

def resolve_path(raw_path: str, media_index: dict) -> Path | None:
    decoded = unquote(raw_path)
    p = Path(decoded)

    # 1. Ruta absoluta local (funciona en Windows)
    if p.exists():
        return p

    # 2. Buscar por nombre de archivo en _media/
    name = p.name.lower()
    if name in media_index:
        return media_index[name]

    return None

def prepare_html(html_path: str) -> str:
    html = Path(html_path).read_text(encoding="utf-8")
    media_index = build_media_index()

    def replace_url_ref(match):
        raw = match.group(1)
        p = resolve_path(raw, media_index)
        if p:
            return f"url('{file_to_base64(p)}')"
        return match.group(0)

    def replace_src_ref(match):
        raw = match.group(1)
        p = resolve_path(raw, media_index)
        if p:
            return f'src="{file_to_base64(p)}"'
        return match.group(0)

    # url('file:///...')
    html = re.sub(
        r"url\('file:///([^']+)'\)",
        replace_url_ref,
        html
    )
    # src="file:///..."
    html = re.sub(
        r'src="file:///([^"]+)"',
        replace_src_ref,
        html
    )
    return html

def prepare_and_save(html_path: str) -> str:
    out_path = Path(html_path).parent / "carousel_ci.html"
    result   = prepare_html(html_path)
    out_path.write_text(result, encoding="utf-8")
    print(f"  OK   HTML preparado -> {out_path.name}")
    return str(out_path)

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Uso: python prepare_for_ci.py ruta/carousel.html")
        sys.exit(1)
    out = prepare_and_save(sys.argv[1])
    print(out)
