// Constantes públicas do SITE (projeto Supabase PRÓPRIO, separado do backoffice).
// Defina via variáveis de ambiente do build (CI / Cloudflare Pages):
//   PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
// Enquanto não estiverem definidas, o site usa dados de fallback locais
// (src/lib/fallback.ts) e NÃO acessa nenhum Supabase — em particular, nunca
// o projeto do backoffice.
export const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
export const FUNCTIONS_URL =
  import.meta.env.PUBLIC_FUNCTIONS_URL || (SUPABASE_URL ? `${SUPABASE_URL}/functions/v1` : '');

/** true quando o projeto Supabase do site está configurado. */
export const SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
