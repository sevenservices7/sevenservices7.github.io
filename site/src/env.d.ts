/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  /** Base URL das Supabase Edge Functions (functions/v1). Opcional. */
  readonly PUBLIC_FUNCTIONS_URL?: string;
  /** Site key do Cloudflare Turnstile (anti-spam) — opcional. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
