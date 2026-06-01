// Cloudflare Pages Function — runs ONLY for the apex home "/".
//
// File-based routing: `functions/index.js` maps to the "/" route and nothing else.
// Every other path (/en/, /blog/..., /es/...) is served as a pure static asset and
// never touches this code.
//
// Why it exists: someone who clicks the bare "dopahop.app" link (Reddit, word of
// mouth) currently always lands on the Italian home, regardless of their browser
// language. This serves them the home in their own language (en/es/de/fr) instead.
//
// ──────────────────────────────────────────────────────────────────────────────
// SEO SAFETY — this is load-bearing, do not weaken it:
//   • Crawlers are NEVER redirected. Googlebot/Bingbot/etc. (and any request with
//     no Accept-Language header) fall straight through to the Italian home at "/",
//     exactly as today. So "/" stays indexed as the it-IT canonical, and Google
//     keeps discovering /en/, /es/, ... via the unchanged sitemap + hreflang.
//   • Redirects are 302 (temporary), NEVER 301. "/" keeps its ranking and the link
//     equity of inbound links (e.g. the Reddit backlink) stays on "/".
//   • No canonical / hreflang / x-default / sitemap is touched anywhere. The
//     language graph Google sees is byte-identical to before.
//   • Vary: Accept-Language + no-store so no shared cache can serve the wrong
//     audience the redirect (or the IT 200).
//   This is not cloaking: a crawler requesting "/" gets the real content of "/"
//   (the Italian home) — the same a no-preference human gets — and reaches every
//   localized version through the hreflang cluster.
//
// Trap avoidance: the language switcher's "IT" link points to "/". Without a memory
// of the user's choice, an en-browser visitor who clicks "Italiano" would be bounced
// back to /en/ forever. So a deliberate choice is remembered in the `dh_lang` cookie
// (set by the switcher click handler in SiteHeader.astro, and by the auto-redirect
// below), and the cookie ALWAYS wins over Accept-Language.
// ──────────────────────────────────────────────────────────────────────────────

const SUPPORTED = ['en', 'es', 'de', 'fr']; // "it" is the default → never a redirect target
const COOKIE = 'dh_lang';
const ONE_YEAR = 60 * 60 * 24 * 365;

// User-Agents treated as "no language preference": always served the requested URL,
// never redirected. Covers search crawlers and link-unfurlers/preview bots so that
// shared-link previews stay consistent with the canonical too.
const BOT_RE = /bot|crawl|spider|slurp|mediapartners|google-inspectiontool|lighthouse|facebookexternalhit|whatsapp|telegram|discord|slack|twitter|linkedin|embedly|pinterest|applebot|archive|headless/i;

function pickFromAcceptLanguage(header) {
  if (!header) return null;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? parseFloat(qParam.split('=')[1]) : 1;
      return {
        lang: tag.trim().toLowerCase().split('-')[0],
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((x) => x.lang && x.lang !== '*')
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if (lang === 'it') return 'it';          // user explicitly prefers Italian → no redirect
    if (SUPPORTED.includes(lang)) return lang;
  }
  return null;                                // no supported match → Italian default
}

function readCookie(header, name) {
  if (!header) return null;
  for (const pair of header.split(';')) {
    const idx = pair.indexOf('=');
    if (idx === -1) continue;
    if (pair.slice(0, idx).trim() === name) return pair.slice(idx + 1).trim();
  }
  return null;
}

function redirect(location, rememberLang) {
  const headers = new Headers({
    Location: location,
    'Cache-Control': 'no-store',
    Vary: 'Accept-Language, Cookie',
  });
  if (rememberLang) {
    headers.append(
      'Set-Cookie',
      `${COOKIE}=${rememberLang}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`
    );
  }
  return new Response(null, { status: 302, headers });
}

async function passthrough(next) {
  const res = await next();
  // The response at "/" now varies by language/cookie — tell caches so none of them
  // serves the Italian 200 to a visitor who should have been redirected (or vice versa).
  const out = new Response(res.body, res);
  out.headers.append('Vary', 'Accept-Language, Cookie');
  return out;
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Defensive: only ever act on the exact apex home. Anything else → untouched.
  if (url.pathname !== '/') return next();
  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  // Crawlers / link-unfurlers → never redirect (protects indexation + previews).
  const ua = request.headers.get('user-agent') || '';
  if (BOT_RE.test(ua)) return passthrough(next);

  // 1) A remembered choice wins (switcher click, or a prior auto-redirect).
  const cookieLang = readCookie(request.headers.get('cookie'), COOKIE);
  if (cookieLang && SUPPORTED.includes(cookieLang)) return redirect(`/${cookieLang}/`, null);
  if (cookieLang === 'it') return passthrough(next); // explicitly chose Italian

  // 2) First visit, no cookie → detect from the browser's language preference.
  const detected = pickFromAcceptLanguage(request.headers.get('accept-language'));
  if (detected && detected !== 'it') return redirect(`/${detected}/`, detected);

  // Italian (default) or no supported preference → serve "/" exactly as before.
  return passthrough(next);
}
