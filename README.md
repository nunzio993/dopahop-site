# DopaHop site

Astro project per `dopahop.app` — landing + blog multi-lingua + Decap CMS admin.

## Stack

- **Astro 5.x** — static site generator (zero JS shipped per content pages)
- **Decap CMS** — admin panel web in `/admin` (gratis, output markdown nel repo)
- **Cloudflare Pages** — deploy gratis (target hosting)
- **i18n nativo** Astro — IT default, EN/ES/DE/FR routing pronto

## Setup locale (prima volta)

Toolchain richiesta: Node 18+. La shell Claude Code vede Node 12, quindi usa PowerShell:

```powershell
cd D:/dopahop/site
npm install
npm run dev
```

Apri http://localhost:4321 — landing in dark mode.

Apri http://localhost:4321/admin — Decap CMS panel (richiede auth setup, vedi sotto).

## Decap CMS auth setup

Il `public/admin/config.yml` è impostato su backend `github` con OAuth proxy Netlify (gratuito, no hosting Netlify richiesto).

**Step setup OAuth (una tantum):**

1. Crea account Netlify (gratis): https://app.netlify.com
2. Aggiungi OAuth GitHub provider:
   - Netlify dashboard → User settings → Applications → OAuth applications
   - "Install GitHub" — autorizza accesso al tuo account GitHub
3. Push il repo Astro su GitHub: `nunzio993/dopahop-site` (o qualunque nome — aggiorna `config.yml` `repo:` campo)
4. Apri `dopahop.app/admin` → "Login with GitHub"
5. Editor visuale parte. Pubblica articoli che finiscono come `.md` nel repo.

**Alternative senza Netlify:**
- `git-gateway` backend (richiede deploy su Netlify, più rapido)
- `test-repo` backend (simulazione locale, non commit reali — buono per provare)

Per provare l'admin senza setup OAuth, modifica `config.yml`:
```yaml
backend:
  name: test-repo
```

## Deploy Cloudflare Pages (gratis)

1. Vai su `dash.cloudflare.com` → Pages → Create project
2. Connect Git → GitHub `nunzio993/dopahop-site`
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 20
4. Deploy. URL temporaneo: `dopahop-site.pages.dev`
5. Aggiungi custom domain `dopahop.app` (Cloudflare Pages → Custom domains)
6. Configura DNS del dominio per puntare a Cloudflare Pages (CNAME)

## Struttura

```
site/
├── astro.config.mjs           # config Astro + i18n + sitemap
├── src/
│   ├── layouts/BaseLayout.astro    # SEO meta, hreflang, JSON-LD schema, fonts
│   ├── pages/
│   │   ├── index.astro             # homepage IT default
│   │   └── [...future: en/, es/, de/, fr/]
│   ├── content/
│   │   ├── config.ts               # collection schema (blog post fields)
│   │   └── blog/                   # markdown files (output Decap CMS)
│   └── styles/global.css           # tutti gli stili dark theme
└── public/
    ├── admin/                       # Decap CMS panel
    │   ├── index.html
    │   └── config.yml
    ├── img/                         # asset reali (icon, widget previews)
    └── robots.txt
```

## Aggiungere lingue (da fare)

L'i18n routing Astro è configurato (IT default + EN/ES/DE/FR). Per ogni lingua extra serve:

1. `src/pages/{lang}/index.astro` — versione tradotta della homepage
2. Articoli blog tagged con `locale: {lang}` nel frontmatter
3. Hreflang già auto-generato nel `<head>` da BaseLayout

Per ora solo IT homepage. Le altre 4 lingue vanno aggiunte quando il content master è validato.

## Workflow content

1. **Scrivi article master in EN** (markdown) via Decap admin → save
2. **Mio task**: traduco in altre 9 lingue, output sono altri 9 file `.md` con `locale:` diverso
3. **Tu**: review traduzioni (almeno tier 1), commit
4. **Cloudflare Pages**: build automatico a ogni push, deploy in 1-2 min
5. **Sito**: articolo live in tutte le lingue con hreflang corretto

## Performance attese

- LCP: <1s
- FCP: <0.5s
- CLS: 0
- PageSpeed mobile: 95-100/100
- Build time: ~3-10s per pagina con immagini ottimizzate

## Out of scope v1 (future)

- Pagina blog index (lista articoli per lingua)
- Pagina single blog post (`[slug].astro` template)
- Search (Pagefind o Algolia)
- Newsletter signup (Buttondown / ConvertKit)
- Analytics opt-in (Plausible / Simple Analytics)
- Comments (Giscus su GitHub Discussions)

Tutti aggiungibili in pochi h quando serve.
