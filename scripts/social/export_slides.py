"""
export_slides.py — Exporta un carousel.html como PNGs 1080x1350px usando Playwright.

Uso:
  python export_slides.py --html ruta/carousel.html --n 5
"""

import argparse
import os
from pathlib import Path

def export(html_path: str, n_slides: int) -> list[str]:
    from playwright.sync_api import sync_playwright

    html_path = Path(html_path).resolve()
    output_dir = html_path.parent / "slides"
    output_dir.mkdir(exist_ok=True)

    png_paths = []

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1350})

        file_url = f"file:///{html_path.as_posix()}"
        page.goto(file_url)
        page.wait_for_load_state("networkidle")

        # Escalar a 1:1 para exportar resolución real
        page.evaluate("document.documentElement.style.setProperty('--S', '1')")
        page.evaluate("document.querySelector('body').style.cssText = 'padding:0;margin:0;gap:0;'")
        page.evaluate("document.querySelector('.carousel').style.borderRadius = '0'")
        # Deshabilitar transición para evitar capturas en estado intermedio
        page.evaluate("document.querySelector('.slides-wrapper').style.transition = 'none'")
        page.wait_for_timeout(300)  # esperar a que --S:1 se aplique en el CSS

        for i in range(n_slides):
            # Mover con 1080px fijos — evita el bug de slideW=1080*0.5 hardcodeado en el HTML
            page.evaluate(f"document.getElementById('slider').style.transform = 'translateX(-{i * 1080}px)'")
            page.wait_for_timeout(300)
            path = str(output_dir / f"slide_{i+1:02d}.png")
            page.screenshot(path=path, clip={"x": 0, "y": 0, "width": 1080, "height": 1350})
            print(f"  ✅ slide_{i+1:02d}.png")
            png_paths.append(path)

        browser.close()

    return png_paths

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", required=True)
    parser.add_argument("--n", type=int, required=True, help="Número de slides")
    args = parser.parse_args()

    paths = export(args.html, args.n)
    print(f"\n✅ {len(paths)} slides exportados en: {Path(args.html).parent / 'slides'}")
