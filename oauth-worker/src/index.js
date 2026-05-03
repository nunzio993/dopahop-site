// ─────────────────────────────────────────────────────────────
//  DopaHop CMS — GitHub OAuth proxy (Cloudflare Worker)
// ─────────────────────────────────────────────────────────────
// Decap CMS è client-side: non può tenere segreti. Questo Worker
// fa da proxy OAuth tra Decap e GitHub, mantenendo il
// GITHUB_CLIENT_SECRET solo lato server (env var Cloudflare).
//
// Endpoints:
//   GET /auth      → redirect a github.com/login/oauth/authorize
//   GET /callback  → exchange code for token, postMessage al opener
//
// Env vars richieste (Cloudflare Workers Settings → Variables):
//   GITHUB_CLIENT_ID        (plaintext)  — Client ID OAuth App GitHub
//   GITHUB_CLIENT_SECRET    (encrypted)  — Client Secret OAuth App GitHub
//   ALLOWED_ORIGINS         (plaintext)  — CSV di origini permesse,
//                                         es. "https://dopahop-site.pages.dev,https://dopahop.app"
// ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      return handleAuth(url, env);
    }
    if (url.pathname === '/callback') {
      return handleCallback(url, env);
    }
    return new Response('DopaHop OAuth proxy — endpoints: /auth, /callback', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  },
};

function handleAuth(url, env) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('Server misconfig: GITHUB_CLIENT_ID missing', { status: 500 });
  }
  const scope = url.searchParams.get('scope') || 'repo,user';
  const state = url.searchParams.get('state') || crypto.randomUUID();
  const callbackUrl = `${url.origin}/callback`;

  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', callbackUrl);
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('state', state);

  return Response.redirect(authUrl.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  if (!code) {
    return htmlResponse(errorPage('Authorization code missing in callback.'));
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return htmlResponse(errorPage('Server misconfig: client credentials missing.'));
  }

  let tokenData;
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'DopaHop-OAuth-Proxy',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    tokenData = await tokenRes.json();
  } catch (err) {
    return htmlResponse(errorPage(`Token exchange failed: ${err.message}`));
  }

  const allowedOrigins = (env.ALLOWED_ORIGINS || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const targetOrigin = allowedOrigins.length === 1 ? JSON.stringify(allowedOrigins[0]) : "'*'";

  if (tokenData.access_token) {
    const message = `authorization:github:success:${JSON.stringify({
      token: tokenData.access_token,
      provider: 'github',
    })}`;
    return htmlResponse(successPage(message, targetOrigin));
  } else {
    const message = `authorization:github:error:${JSON.stringify(tokenData)}`;
    return htmlResponse(successPage(message, targetOrigin));
  }
}

function htmlResponse(body) {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function successPage(message, targetOrigin) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Authorizing…</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; background: #0F0F23; color: #FAFAFA; display: grid; place-items: center; height: 100vh; margin: 0; }
  .card { text-align: center; padding: 2rem; }
  h1 { font-size: 1.4rem; margin: 0 0 .5rem; }
  p { color: #BDBDBD; margin: 0; }
</style>
</head>
<body>
<div class="card">
  <h1>Authorizing…</h1>
  <p>You can close this window.</p>
</div>
<script>
(function() {
  var msg = ${JSON.stringify(message)};
  var targetOrigin = ${targetOrigin};
  function send(target) {
    target.postMessage(msg, targetOrigin);
  }
  // Decap CMS pattern: opener listens for postMessage
  if (window.opener) {
    send(window.opener);
    setTimeout(function(){ try { window.close(); } catch(e) {} }, 800);
  } else if (window.parent && window.parent !== window) {
    send(window.parent);
  } else {
    document.querySelector('p').textContent = 'Window opener not available — login may have failed. Close and retry from /admin/.';
  }
})();
</script>
</body>
</html>`;
}

function errorPage(reason) {
  const safeReason = String(reason).replace(/[<>&"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;',
  }[c]));
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>OAuth error</title></head>
<body style="font-family: system-ui; padding: 2rem;">
<h1>OAuth error</h1>
<p>${safeReason}</p>
<p><a href="javascript:window.close()">Close window</a></p>
</body>
</html>`;
}
