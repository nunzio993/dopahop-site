# DopaHop OAuth proxy (Cloudflare Worker)

Decap CMS GitHub OAuth proxy. Self-hosted alternative to Netlify's `api.netlify.com/auth`.

## Deploy via Cloudflare dashboard (no CLI required)

1. Go to https://dash.cloudflare.com/?to=/:account/workers-and-pages
2. Click **"Create"** → **"Create Worker"** (NOT "Pages")
3. Name: `dopahop-oauth` → **"Deploy"** (deploys an empty worker)
4. Click **"Edit code"** → paste the full contents of [src/index.js](./src/index.js) → **"Save and deploy"**
5. Back to the Worker page → **"Settings"** → **"Variables and Secrets"**
   - Add `GITHUB_CLIENT_ID` (Type: Plaintext) → paste OAuth App Client ID
   - Add `GITHUB_CLIENT_SECRET` (Type: **Secret**) → paste OAuth App Client Secret
   - Add `ALLOWED_ORIGINS` (Type: Plaintext) → e.g. `https://dopahop-site.pages.dev,https://dopahop.app`
6. Note the Worker URL (something like `https://dopahop-oauth.<your-subdomain>.workers.dev`)
7. Update GitHub OAuth App **Authorization callback URL** to:
   `https://dopahop-oauth.<your-subdomain>.workers.dev/callback`
8. Update `site/public/admin/config.yml` `backend.base_url` to the same Worker URL (root, no `/callback`)
9. Commit + push → Cloudflare Pages rebuilds → admin login works

## Endpoints

- `GET /auth` — initiates OAuth flow, redirects to github.com
- `GET /callback` — exchanges code for token, postMessages back to opener

## Local test (optional)

```bash
npm install -g wrangler
wrangler dev
```
