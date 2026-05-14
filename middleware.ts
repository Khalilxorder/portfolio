export const config = {
  matcher: ['/map', '/map/:path*', '/api/admin/:path*'],
  runtime: 'edge',
};

declare const process: {
  env: Record<string, string | undefined>;
};

function unauthorized(): Response {
  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="portfolio-map"' },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export default function middleware(request: Request): Response | undefined {
  const expected = process.env.MAP_PASSWORD;
  if (!expected) {
    return new Response('MAP_PASSWORD not configured', { status: 503 });
  }

  const header = request.headers.get('authorization');
  if (!header || !header.toLowerCase().startsWith('basic ')) {
    return unauthorized();
  }

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }
  const colon = decoded.indexOf(':');
  const password = colon === -1 ? decoded : decoded.slice(colon + 1);
  if (!timingSafeEqual(password, expected)) {
    return unauthorized();
  }
  return undefined;
}
