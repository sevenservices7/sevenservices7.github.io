import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';
export function adminClient(): SupabaseClient {
  return createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false, autoRefreshToken: false } });
}
export function stripeClient(): Stripe {
  return new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20', httpClient: Stripe.createFetchHttpClient() });
}
// Domínio público do site (o GitHub Pages só serve o CNAME sevenservicess.com).
// sevens.services é apenas o domínio de e-mail — se SITE_URL apontar para lá, ignora.
const rawSiteUrl = (Deno.env.get('SITE_URL') || '').replace(/\/+$/, '');
export const SITE_URL = rawSiteUrl && !rawSiteUrl.includes('sevens.services') ? rawSiteUrl : 'https://sevenservicess.com';
export function checkoutUrls(locale: string): { success: string; cancel: string } {
  if (locale === 'en') return { success: `${SITE_URL}/en/checkout/success`, cancel: `${SITE_URL}/en/checkout/cancel` };
  if (locale === 'es') return { success: `${SITE_URL}/es/checkout/exito`, cancel: `${SITE_URL}/es/checkout/cancelado` };
  return { success: `${SITE_URL}/checkout/sucesso`, cancel: `${SITE_URL}/checkout/cancelado` };
}
