/* global Deno */
import { validateReview } from './validation.ts';

const allowedOrigins = new Set([
  'https://ombatavia.com',
  'https://www.ombatavia.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]);

function cors(origin: string | null) {
  return origin && allowedOrigins.has(origin)
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        Vary: 'Origin'
      }
    : {};
}

function json(body: unknown, status: number, origin: string | null, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), 'Content-Type': 'application/json; charset=utf-8', ...extra }
  });
}

function secretKey() {
  const current = Deno.env.get('SUPABASE_SECRET_KEYS');
  if (current) return JSON.parse(current).default as string;
  return Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
}

function adminHeaders(key: string) {
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  if (!key.startsWith('sb_secret_')) headers.Authorization = `Bearer ${key}`;
  return headers;
}

async function ipHash(request: Request, key: string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0].trim();
  const address = forwarded || request.headers.get('cf-connecting-ip') || `unknown:${request.headers.get('user-agent') || ''}`;
  const bytes = new TextEncoder().encode(`${address}:${key.slice(-24)}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get('origin');

  if (request.method === 'OPTIONS') {
    return allowedOrigins.has(origin || '')
      ? new Response(null, { status: 204, headers: cors(origin) })
      : new Response(null, { status: 403 });
  }

  if (request.method === 'POST' && !allowedOrigins.has(origin || '')) {
    return json({ error: 'Origin not allowed.' }, 403, origin);
  }

  const url = Deno.env.get('SUPABASE_URL') || '';
  const key = secretKey();
  if (!url || !key) return json({ error: 'Review service is not configured.' }, 503, origin);
  const headers = adminHeaders(key);

  if (request.method === 'GET') {
    const response = await fetch(`${url}/rest/v1/portfolio_reviews?select=id,name,role,rating,review_text,created_at&approved=eq.true&order=created_at.desc&limit=50`, { headers });
    if (!response.ok) return json({ error: 'Could not load reviews.' }, 502, origin);
    return json({ reviews: await response.json() }, 200, origin, { 'Cache-Control': 'public, max-age=60' });
  }

  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, origin, { Allow: 'GET, POST, OPTIONS' });
  if (Number(request.headers.get('content-length') || 0) > 4096) return json({ error: 'Request too large.' }, 413, origin);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON.' }, 400, origin);
  }

  const validation = validateReview(payload);
  if (!validation.ok) {
    return validation.silent
      ? json({ status: 'pending' }, 202, origin)
      : json({ error: validation.error }, 400, origin);
  }

  const hash = await ipHash(request, key);
  const reservation = await fetch(`${url}/rest/v1/rpc/reserve_portfolio_review_submission`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ p_ip_hash: hash })
  });
  const allowed = reservation.ok && await reservation.json();
  if (!allowed) return json({ error: 'Too many submissions. Try again next hour.' }, 429, origin, { 'Retry-After': '3600' });

  const insert = await fetch(`${url}/rest/v1/portfolio_reviews`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify({
      name: validation.review.name,
      role: validation.review.role || null,
      rating: validation.review.rating,
      review_text: validation.review.text,
      approved: false
    })
  });

  return insert.ok
    ? json({ status: 'pending' }, 202, origin)
    : json({ error: 'Could not submit review.' }, 502, origin);
});

