"""
setup_tokens.py — Obtiene y almacena tokens de larga duración para Meta API.

Uso:
  1. python setup_tokens.py --token TU_SHORT_LIVED_TOKEN
  2. Sigue las instrucciones en pantalla
  3. Los tokens quedan guardados en .env.social automáticamente

Cómo obtener el short-lived token:
  1. Ve a https://developers.facebook.com/tools/explorer
  2. Selecciona la app "gautama-publicador"
  3. Haz clic en "Generar token de acceso"
  4. Marca los permisos: instagram_basic, instagram_content_publish,
     pages_manage_posts, pages_read_engagement
  5. Copia el token y pégalo aquí: python setup_tokens.py --token PEGAR_AQUI
"""

import requests
import argparse
import re
from pathlib import Path

ENV_FILE = Path(__file__).parent / ".env.social"

def load_env():
    env = {}
    for line in ENV_FILE.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()
    return env

def update_env(updates: dict):
    content = ENV_FILE.read_text()
    for key, value in updates.items():
        pattern = rf"^{key}=.*$"
        replacement = f"{key}={value}"
        content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
    ENV_FILE.write_text(content)
    print(f"  ✅ .env.social actualizado")

def get_long_lived_token(short_token, app_id, app_secret):
    print("\n📡 Obteniendo token de larga duración (60 días)...")
    r = requests.get("https://graph.facebook.com/oauth/access_token", params={
        "grant_type": "fb_exchange_token",
        "client_id": app_id,
        "client_secret": app_secret,
        "fb_exchange_token": short_token,
    })
    r.raise_for_status()
    data = r.json()
    token = data["access_token"]
    expires = data.get("expires_in", "desconocido")
    print(f"  ✅ Token obtenido — expira en {expires} segundos (~60 días)")
    return token

def get_user_pages(long_token):
    print("\n📄 Obteniendo Facebook Pages...")
    r = requests.get("https://graph.facebook.com/v19.0/me/accounts", params={
        "access_token": long_token,
        "fields": "id,name,access_token,instagram_business_account"
    })
    r.raise_for_status()
    pages = r.json().get("data", [])
    return pages

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--token", required=True, help="Short-lived User Access Token desde Graph API Explorer")
    args = parser.parse_args()

    env = load_env()
    app_id     = env["META_APP_ID"]
    app_secret = env["META_APP_SECRET"]

    # 1. Long-lived token
    long_token = get_long_lived_token(args.token, app_id, app_secret)

    # 2. Pages + Instagram Business Account
    pages = get_user_pages(long_token)

    if not pages:
        print("\n⚠️  No se encontraron páginas de Facebook. Asegúrate de tener una Page conectada a tu cuenta de IG.")
        return

    print(f"\n📋 Páginas encontradas ({len(pages)}):")
    for i, p in enumerate(pages):
        ig = p.get("instagram_business_account", {})
        ig_id = ig.get("id", "No conectado")
        print(f"  [{i}] {p['name']} — Page ID: {p['id']} — IG ID: {ig_id}")

    if len(pages) == 1:
        page = pages[0]
    else:
        idx = int(input("\n¿Cuál página usar? Número: "))
        page = pages[idx]

    fb_page_id    = page["id"]
    fb_page_token = page["access_token"]
    ig_id         = page.get("instagram_business_account", {}).get("id", "")

    if not ig_id:
        print("\n⚠️  Esta página no tiene cuenta de Instagram Business conectada.")
        print("   Ve a Instagram > Configuración > Cuenta > Cambiar a cuenta profesional")
        print("   y luego conecta tu Page de Facebook.")
        return

    print(f"\n✅ Configuración:")
    print(f"   Facebook Page ID : {fb_page_id}")
    print(f"   IG Business ID   : {ig_id}")

    update_env({
        "LONG_LIVED_TOKEN":       long_token,
        "IG_BUSINESS_ACCOUNT_ID": ig_id,
        "FB_PAGE_ID":             fb_page_id,
        "FB_PAGE_ACCESS_TOKEN":   fb_page_token,
    })

    print("\n🎉 Listo. Ahora puedes correr publish.py")

if __name__ == "__main__":
    main()
