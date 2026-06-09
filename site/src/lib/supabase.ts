import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, FUNCTIONS_URL, SUPABASE_CONFIGURED } from './config';

// Cliente do projeto Supabase PRÓPRIO do site. É `null` enquanto não houver
// configuração (evita qualquer acesso acidental — inclusive ao backoffice).
export const supabase: SupabaseClient | null = SUPABASE_CONFIGURED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

export { SUPABASE_URL, SUPABASE_ANON_KEY, FUNCTIONS_URL, SUPABASE_CONFIGURED };
