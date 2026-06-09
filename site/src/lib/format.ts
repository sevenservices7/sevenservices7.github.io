import type { Lang } from '../i18n/ui';
import type { Office } from './data';

const localeMap: Record<Lang, string> = { pt: 'pt-PT', en: 'en-GB', es: 'es-ES' };

export function money(value: number | null | undefined, lang: Lang): string {
  if (value == null) return '—';
  return new Intl.NumberFormat(localeMap[lang], { style: 'currency', currency: 'EUR' }).format(value);
}

export function dateLong(value: string | null | undefined, lang: Lang): string {
  if (!value) return '';
  try {
    return new Intl.DateTimeFormat(localeMap[lang], { year: 'numeric', month: 'long' }).format(new Date(value));
  } catch {
    return '';
  }
}

export function initials(name: string): string {
  const parts = (name || '').trim().split(/\s+/);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

/** Link de WhatsApp wa.me com mensagem pré-preenchida. */
export function waLink(whatsapp: string, text = ''): string {
  const num = (whatsapp || '').replace(/\D/g, '');
  const q = text ? `?text=${encodeURIComponent(text)}` : '';
  return num ? `https://wa.me/${num}${q}` : '#';
}

/** Link do Google Maps a partir da unidade. */
export function mapsLink(o: Pick<Office, 'maps_url' | 'lat' | 'lng' | 'address'>): string {
  if (o.maps_url) return o.maps_url;
  if (o.lat != null && o.lng != null) return `https://www.google.com/maps/search/?api=1&query=${o.lat},${o.lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address || 'Seven Services')}`;
}

/** URL de embed do mapa (iframe). Usa a morada real (mais fiável que as
 *  coordenadas; um link goo.gl encurtado não pode ser embebido em iframe). */
export function mapEmbed(o: Pick<Office, 'lat' | 'lng' | 'address'>): string {
  const q = o.address || (o.lat != null && o.lng != null ? `${o.lat},${o.lng}` : 'Portugal');
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}
