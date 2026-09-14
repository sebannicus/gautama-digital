"""
setup_tokens.py — Renueva los tokens de Meta y (opcional) los sube a GitHub Secrets.

Uso:
  python setup_tokens.py --token SHORT_LIVED_TOKEN                # solo .env.social
  python setup_tokens.py --token SHORT_LIVED_TOKEN --push-secrets # + GitHub Secrets

Como obtener el short-lived token:
  1. https://developers.facebook.com/tools/explorer
  2. App: "gautama-publicador"
  3. "Generar token de acceso" con estos permisos:
       instagram_basic, instagram_content_publish,
       pages_manage_posts, pages_read_engagement, pages_show_list
  4. Copiar el token y pasarlo con --token

IMPORTANTE: el App Secret vive solo en .env.social (gitignored). El repo es publico:
nunca pegarlo en CLAUDE.md, README ni en un commit.
"""

import re
import sys
import argparse
import subprocess
from pathlib import Path

import requests

ENV_FILE  = Path(__file__).parent / ".env.social"
GRAPH     = "https://graph.facebook.com/v19.0"
SECRETS   = ["LONG_LIVED_TOKEN", "IG_BUSINESS_ACCOUNT_ID", "FB_PAGE_ID", "FB_PAGE_ACCESS_TOKEN"]


def load_env() -> dict:
    env = {}
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()
    return env


def update_env(updates: dict):
    content = ENV_FILE.read_text(encoding="utf-8")
    for key, value in updates.items():
        if re.search(rf"^{key}=.*$", content, flags=re.MULTILINE):
            content = re.sub(rf"^{key}=.*$", f"{key}={value}", content, flags=re.MULTILINE)
        else:
            content += f"\n{key}={value}"
    ENV_FILE.write_text(content, encoding="utf-8")
    print("  OK   .env.social actualizado")


def api_get(path: str, **params):
    r = requests.get(f"{GRAPH}{path}", params=params, timeout=45)
    data = r.json()
    if "error" in data:
        raise SystemExit(f"ERROR Meta: {data['error'].get('message')}")
    return data


def get_long_lived_token(short_token: str, app_id: str, app_secret: str) -> str:
    print("\n>>> Canjeando por token de larga duracion (60 dias)")
    data = api_get("/oauth/access_token",
                   grant_type="fb_exchange_token",
                   client_id=app_id,
                   client_secret=app_secret,
                   fb_exchange_token=short_token)
    expires = data.get("expires_in")
    print(f"  OK   token obtenido (expira en ~{int(expires)//86400 if expires else '?'} dias)")
    return data["access_token"]


def pick_page(long_token: str) -> dict:
    print("\n>>> Buscando Facebook Pages")
    pages = api_get("/me/accounts",
                    access_token=long_token,
                    fields="id,name,access_token,instagram_business_account").get("data", [])
    if not pages:
        raise SystemExit("ERROR: no hay Pages asociadas. Conecta tu cuenta IG a una Page de Facebook.")

    for i, p in enumerate(pages):
        ig = (p.get("instagram_business_account") or {}).get("id", "sin IG")
        print(f"  [{i}] {p['name']}  page={p['id']}  ig={ig}")

    if len(pages) == 1:
        return pages[0]
    if not sys.stdin.isatty():
        raise SystemExit("ERROR: hay varias Pages y no hay terminal interactiva. Corre el script a mano.")
    return pages[int(input("\n  Cual usar? numero: "))]


def push_secrets(values: dict):
    print("\n>>> Subiendo GitHub Secrets")
    for key in SECRETS:
        r = subprocess.run(["gh", "secret", "set", key, "--body", values[key]],
                           capture_output=True, text=True)
        if r.returncode == 0:
            print(f"  OK   {key}")
        else:
            print(f"  FALLO {key}: {r.stderr.strip()}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--token", required=True, help="User Access Token desde Graph API Explorer")
    ap.add_argument("--push-secrets", action="store_true", help="Tambien sube los secrets al repo con gh")
    args = ap.parse_args()

    env = load_env()
    app_id, app_secret = env["META_APP_ID"], env["META_APP_SECRET"]

    long_token = get_long_lived_token(args.token.strip(), app_id, app_secret)
    page       = pick_page(long_token)

    ig_id = (page.get("instagram_business_account") or {}).get("id", "")
    if not ig_id:
        raise SystemExit("ERROR: esa Page no tiene cuenta Instagram Business conectada.")

    values = {
        "LONG_LIVED_TOKEN":       long_token,
        "IG_BUSINESS_ACCOUNT_ID": ig_id,
        "FB_PAGE_ID":             page["id"],
        "FB_PAGE_ACCESS_TOKEN":   page["access_token"],
    }

    print(f"\n>>> Configuracion detectada")
    print(f"  Page  : {page['name']} ({page['id']})")
    print(f"  IG    : {ig_id}")

    update_env(values)
    if args.push_secrets:
        push_secrets(values)

    # Verificacion final
    print("\n>>> Verificando token nuevo")
    info = api_get("/debug_token", input_token=long_token, access_token=long_token).get("data", {})
    print(f"  valid  : {info.get('is_valid')}")
    print(f"  scopes : {', '.join(info.get('scopes', [])) or '-'}")

    print("\nListo. El bot ya puede publicar.")
    if not args.push_secrets:
        print("Recuerda: sin --push-secrets los GitHub Secrets siguen con los tokens viejos.")


if __name__ == "__main__":
    main()
