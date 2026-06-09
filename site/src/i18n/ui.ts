import pt from './pt.json';
import en from './en.json';
import es from './es.json';

export const languages = { pt: 'Português', en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

const dictionaries: Record<Lang, Record<string, string>> = { pt, en, es };

/** Detecta o idioma a partir da URL (PT na raiz; EN/ES prefixados). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'en' || seg === 'es') return seg;
  return defaultLang;
}

/** Retorna a função de tradução t() para o idioma, com fallback para PT. */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return dictionaries[lang]?.[key] ?? dictionaries[defaultLang][key] ?? key;
  };
}

/** Mapa de rotas estáticas por idioma (slug localizado). */
export const ROUTES = {
  home: { pt: '/', en: '/en/', es: '/es/' },
  about: { pt: '/sobre', en: '/en/about', es: '/es/sobre' },
  team: { pt: '/equipa', en: '/en/team', es: '/es/equipo' },
  services: { pt: '/servicos', en: '/en/services', es: '/es/servicios' },
  booking: { pt: '/agendamento', en: '/en/booking', es: '/es/agenda' },
  contact: { pt: '/contato', en: '/en/contact', es: '/es/contacto' },
  cart: { pt: '/carrinho', en: '/en/cart', es: '/es/carrito' },
  terms: { pt: '/legal/termos', en: '/en/legal/terms', es: '/es/legal/terminos' },
  privacy: { pt: '/legal/privacidade', en: '/en/legal/privacy', es: '/es/legal/privacidad' },
} as const;
export type RouteKey = keyof typeof ROUTES;

/** Caminho localizado para uma rota estática conhecida. */
export function getRoute(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang];
}

/** Caminho localizado da página de uma unidade pelo slug. */
export function unitPath(slug: string, lang: Lang): string {
  if (lang === 'en') return `/en/units/${slug}`;
  if (lang === 'es') return `/es/unidades/${slug}`;
  return `/unidades/${slug}`;
}

/** Prefixo do idioma para montar caminhos arbitrários. */
export function langPrefix(lang: Lang): string {
  return lang === 'pt' ? '' : `/${lang}`;
}
