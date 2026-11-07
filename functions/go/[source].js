// Cloudflare Pages Function — tracked "smart link" to the app stores.
//
// Route: /go/<source>  (e.g. /go/instagram, /go/tiktok, /go/youtube)
// Optional ?c=<campaign> (e.g. /go/instagram?c=boost-1107) to tell paid boosts
// apart from the plain link in bio.
//
// One link for the bio / ads, the right store per device, and attribution on both:
//   • Android → Play Store with an install `referrer` carrying UTM params. Firebase
//     Analytics reads the Play Install Referrer, so the install shows up in GA4 as
//     first user source = <source>.
//   • iOS → App Store campaign link (`pt` + `ct`). App Store Connect → App Analytics
//     → Acquisition → Campaigns shows page views, installs and conversion per `ct`.
//     Without APPLE_PROVIDER_TOKEN the link still works, it just isn't attributed.
//   • Anything else (desktop, unknown) → the localized home, which has both badges.
//
// 302 + no-store: the target depends on the User-Agent, nothing may cache it.

const PLAY_ID = 'com.dopahop.android';
const APPLE_ID = '6772196314';
// Provider token from App Store Connect → App Analytics → Acquisition → Campaigns →
// "Generate a campaign link" (the `pt=` value). Same for every app of the team.
const APPLE_PROVIDER_TOKEN = '';

// Keep only what store links accept; App Store `ct` is capped at 40 characters.
const clean = (s) => (s || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);

export function onRequestGet({ request, params }) {
  const source = clean(params.source) || 'unknown';
  const campaign = clean(new URL(request.url).searchParams.get('c')) || 'bio';
  const ua = request.headers.get('User-Agent') || '';

  let target;
  if (/android/i.test(ua)) {
    const referrer = new URLSearchParams({
      utm_source: source,
      utm_medium: 'social',
      utm_campaign: campaign,
    }).toString();
    target = `https://play.google.com/store/apps/details?id=${PLAY_ID}&referrer=${encodeURIComponent(referrer)}`;
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    const ct = clean(`${source}-${campaign}`);
    const pt = APPLE_PROVIDER_TOKEN ? `pt=${APPLE_PROVIDER_TOKEN}&` : '';
    target = `https://apps.apple.com/app/apple-store/id${APPLE_ID}?${pt}ct=${ct}&mt=8`;
  } else {
    target = `/?utm_source=${source}&utm_medium=social&utm_campaign=${campaign}`;
  }

  return new Response(null, {
    status: 302,
    headers: { Location: target, 'Cache-Control': 'no-store' },
  });
}
