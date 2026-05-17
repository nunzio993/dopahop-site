# iOS Waitlist — Cloudflare setup

Una-tantum. Tutti i passi sono su free plan Cloudflare. Tempo stimato: ~15 minuti.

## 1) Prerequisiti

```powershell
npm install -g wrangler
wrangler login
```

## 2) Crea il database D1

```powershell
wrangler d1 create dopahop_waitlist
```

Output esempio:
```
✅ Successfully created DB 'dopahop_waitlist'

[[d1_databases]]
binding = "WAITLIST_DB"
database_name = "dopahop_waitlist"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Annota il `database_id`** — serve al passo 4.

## 3) Applica lo schema

```powershell
wrangler d1 execute dopahop_waitlist --remote --file=migrations/0001_waitlist_create.sql
```

Verifica:
```powershell
wrangler d1 execute dopahop_waitlist --remote --command="SELECT name FROM sqlite_master WHERE type='table'"
```
Deve elencare `ios_signups`.

## 4) Bind D1 al progetto Cloudflare Pages

1. Vai su https://dash.cloudflare.com → **Workers & Pages** → progetto `dopahop-site` (o il nome del tuo project).
2. **Settings** → **Functions** → **D1 database bindings** → **Add binding**.
3. Compila:
   - **Variable name**: `WAITLIST_DB`
   - **D1 database**: `dopahop_waitlist`
4. Salva. Applica sia a **Production** che a **Preview** se vuoi testare in preview.

## 5) Setup Cloudflare Turnstile (anti-spam, gratis)

1. Vai su https://dash.cloudflare.com → **Turnstile** → **Add site**.
2. Compila:
   - **Site name**: `DopaHop`
   - **Hostnames**: `dopahop.app`, `dopahop-site.pages.dev` (aggiungi entrambi)
   - **Widget mode**: `Managed` (raccomandato)
3. Salva. Cloudflare ti mostra:
   - **Site Key** (pubblica, prefisso `0x...` o `1x...`) — finisce nel frontend
   - **Secret Key** (privata) — finisce nelle env del Worker

## 6) Configura le environment variables del Pages project

Cloudflare Pages dashboard → progetto `dopahop-site` → **Settings** → **Environment variables**.

Aggiungi 3 variabili (sia in **Production** che in **Preview**):

| Variable name | Type | Value |
|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | **Plain text** | la Site Key del passo 5 |
| `TURNSTILE_SECRET_KEY` | **Secret** | la Secret Key del passo 5 |
| `IP_HASH_SALT` | **Secret** | una stringa random, es. output di `openssl rand -hex 32` o qualsiasi UUID |

> Nota: `PUBLIC_TURNSTILE_SITE_KEY` deve essere **Plain text** (build-time), non Secret, perché Astro la legge a build time e la incorpora nel frontend.

## 7) Redeploy

Il push su `main` triggera già una build. Se hai aggiunto le env vars dopo l'ultimo deploy, forza un **Retry deployment** dal dashboard Pages, oppure fai un commit vuoto:

```powershell
git commit --allow-empty -m "chore: trigger rebuild for D1 + Turnstile bindings"
git push
```

## 8) Test post-deploy

1. Apri `https://dopahop.app/ios-waitlist/`
2. Compila email + Turnstile + submit
3. Verifica:
```powershell
wrangler d1 execute dopahop_waitlist --remote --command="SELECT email, locale, created_at FROM ios_signups ORDER BY created_at DESC LIMIT 10"
```

## Operations — query utili

### Conta sign-up totali
```powershell
wrangler d1 execute dopahop_waitlist --remote --command="SELECT COUNT(*) AS n FROM ios_signups"
```

### Sign-up per locale
```powershell
wrangler d1 execute dopahop_waitlist --remote --command="SELECT locale, COUNT(*) AS n FROM ios_signups GROUP BY locale ORDER BY n DESC"
```

### Esporta CSV
```powershell
wrangler d1 execute dopahop_waitlist --remote --command="SELECT email, locale, use_case, created_at FROM ios_signups ORDER BY created_at" --json > waitlist-export.json
```

### Cancellazione su richiesta utente (GDPR)
```powershell
wrangler d1 execute dopahop_waitlist --remote --command="DELETE FROM ios_signups WHERE email = 'user@example.com'"
```

## Free plan limits

- **Pages Functions**: 100.000 req/giorno (più che sufficiente)
- **D1**: 5GB storage, 100.000 writes/giorno (= 100k iscritti/giorno, irrealistico)
- **Turnstile**: 1M challenges/mese gratis
- **R2 / KV**: non usati
