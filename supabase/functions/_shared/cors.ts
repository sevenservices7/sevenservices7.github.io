// Origens autorizadas do site. O GitHub Pages serve o CNAME sevenservicess.com;
// SITE_ORIGIN (lista separada por vírgulas) acrescenta origens extra sem redeploy.
const DEFAULTS = [
  'https://sevenservicess.com',
  'https://www.sevenservicess.com',
  'https://sevenservices7.github.io',
  'http://localhost:4321',
];
const EXTRA = (Deno.env.get('SITE_ORIGIN') || '').split(',').map((s) => s.trim()).filter(Boolean);
const ALLOWED = [...new Set([...DEFAULTS, ...EXTRA])];
export function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return { 'Access-Control-Allow-Origin': allow, 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', Vary: 'Origin' };
}
export function preflight(req: Request): Response | null {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(req.headers.get('origin')) });
  return null;
}
export function json(body: unknown, status = 200, origin: string | null = null): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } });
}
