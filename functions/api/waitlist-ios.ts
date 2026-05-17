/**
 * POST /api/waitlist-ios
 *
 * Body: { email: string, use_case?: string|null, locale: string, turnstile_token: string }
 *
 * Bindings required (configured in Cloudflare Pages dashboard):
 *   WAITLIST_DB                — D1 database
 *   TURNSTILE_SECRET_KEY       — env var (secret)
 *   IP_HASH_SALT               — env var (secret, any random string)
 */

interface Env {
  WAITLIST_DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  IP_HASH_SALT?: string;
}

interface SignupPayload {
  email?: unknown;
  use_case?: unknown;
  locale?: unknown;
  turnstile_token?: unknown;
}

const ALLOWED_LOCALES = new Set(['it', 'en', 'es', 'de', 'fr']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_USE_CASE_LEN = 500;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  if (!token || !secret) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: SignupPayload;
  try {
    body = (await request.json()) as SignupPayload;
  } catch {
    return json({ ok: false, code: 'invalid_json' }, 400);
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const useCaseRaw = typeof body.use_case === 'string' ? body.use_case.trim() : '';
  const useCase = useCaseRaw.slice(0, MAX_USE_CASE_LEN) || null;
  const locale = typeof body.locale === 'string' ? body.locale.toLowerCase() : 'it';
  const turnstileToken = typeof body.turnstile_token === 'string' ? body.turnstile_token : '';

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, code: 'invalid_email' }, 400);
  }

  const safeLocale = ALLOWED_LOCALES.has(locale) ? locale : 'it';

  // Turnstile is mandatory if secret is configured; soft-skip if not (dev/local).
  if (env.TURNSTILE_SECRET_KEY) {
    const ip = request.headers.get('CF-Connecting-IP') ?? '';
    const ok = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
    if (!ok) return json({ ok: false, code: 'turnstile_failed' }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const ua = request.headers.get('User-Agent') ?? '';
  const ipHash = ip && env.IP_HASH_SALT ? await sha256Hex(`${env.IP_HASH_SALT}:${ip}`) : null;

  try {
    await env.WAITLIST_DB
      .prepare(
        `INSERT INTO ios_signups (email, use_case, locale, ip_hash, user_agent)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(email, useCase, safeLocale, ipHash, ua.slice(0, 500))
      .run();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/UNIQUE constraint failed/i.test(msg)) {
      return json({ ok: false, code: 'already_joined' }, 409);
    }
    console.error('waitlist insert error', msg);
    return json({ ok: false, code: 'server_error' }, 500);
  }

  return json({ ok: true });
};

export const onRequest: PagesFunction<Env> = async () => {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
};
