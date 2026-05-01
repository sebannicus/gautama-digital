# prepare_for_ci.py
# Reemplaza rutas file:/// en el HTML con imagenes base64.
# Se ejecuta automaticamente cuando corre en GitHub Actions (CI=true).

import re
import sys
import base64
from pathlib import Path
from urllib.parse import unquote

# Directorio _media/ dentro del repo (relativo a la raiz del proyecto)
REPO_ROOT  = Path(__file__).parent.parent.parent
MEDIA_DIR  = REPO_ROOT / "_media"

# Mapa de nombres de archivo originales a rutas en _media/
def build_media_index():
    index = {}
    if not MEDIA_DIR.exists():
        return index
    for f in MEDIA_DIR.rglob("*"):
        if f.is_file():
            index[f.name.lower()] = f
    return index

def file_to_base64(path: Path) -> str:
    ext  = path.suffix.lower().lstrip(".")
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp", "gif": "image/gif"}.get(ext, "image/jpeg")
    data = base64.b64encode(path.read_bytes()).decode()
    return f"data:{mime};base64,{data}"

def resolve_path(raw_path: str, media_index: dict) -> Path | None:
    decoded = unquote(raw_path)
    p = Path(decoded)

    # 1. Ruta absoluta local (funciona en Windows)
    try:
        if p.exists():
            return p
    except OSError:
        # Algunas rutas absolutas Windows fallan en Linux con OSError
        pass

    # 2. Buscar por nombre de archivo en _media/
    name = p.name.lower()
    if name in media_index:
        return media_index[name]

    return None

def prepare_html(html_path: str) -> tuple[str, list[str], list[str]]:
    """Devuelve (html_modificado, lista_resueltos, lista_no_resueltos)."""
    html = Path(html_path).read_text(encoding="utf-8")
    media_index = build_media_index()

    resolved   = []
    unresolved = []

    def replace_url_ref(match):
        raw = match.group(1)
        p = resolve_path(raw, media_index)
        if p:
            resolved.append(raw)
            return f"url('{file_to_base64(p)}')"
        unresolved.append(raw)
        return match.group(0)

    def replace_src_ref(match):
        raw = match.group(1)
        p = resolve_path(raw, media_index)
        if p:
            resolved.append(raw)
            return f'src="{file_to_base64(p)}"'
        unresolved.append(raw)
        return match.group(0)

    # url('file:///...') con comilla simple
    html = re.sub(r"url\('file:///([^']+)'\)", replace_url_ref, html)
    # url("file:///...") con comilla doble
    html = re.sub(r'url\("file:///([^"]+)"\)', replace_url_ref, html)
    # url(file:///...) sin comillas
    html = re.sub(r"url\(file:///([^)'\"]+)\)", replace_url_ref, html)
    # src="file:///..."
    html = re.sub(r'src="file:///([^"]+)"', replace_src_ref, html)
    # src='file:///...'
    html = re.sub(r"src='file:///([^']+)'", replace_src_ref, html)

    return html, resolved, unresolved

def prepare_and_save(html_path: str) -> str:
    out_path = Path(html_path).parent / "carousel_ci.html"
    result, resolved, unresolved = prepare_html(html_path)
    out_path.write_text(result, encoding="utf-8")
    print(f"  OK   HTML preparado -> {out_path.name} ({len(resolved)} imagenes resueltas)")

    if unresolved:
        # Deduplicar por nombre
        unique = sorted(set(unresolved))
        print(f"  WARN {len(unique)} referencias file:// no resueltas (quedan en el HTML):")
        for u in unique[:10]:
            print(f"    - {u}")
        if len(unique) > 10:
            print(f"    ... y {len(unique) - 10} mas")

    return str(out_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python prepare_for_ci.py ruta/carousel.html")
        sys.exit(1)
    out = prepare_and_save(sys.argv[1])
    print(out)
