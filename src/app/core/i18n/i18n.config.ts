/** Lingue supportate dall'app, nell'ordine in cui compaiono nel selettore */
export const AVAILABLE_LANGS = ['en', 'it'] as const;

export type AppLang = (typeof AVAILABLE_LANGS)[number];

/** Lingua di default e di fallback */
export const DEFAULT_LANG: AppLang = 'en';

/** Nome di ogni lingua scritto nella lingua stessa (endonimo) */
export const LANG_NATIVE_NAMES: Record<AppLang, string> = {
  en: 'English',
  it: 'Italiano',
};

export const LANG_STORAGE_KEY = 'lineup-builder:lang';

export function isAppLang(value: unknown): value is AppLang {
  return typeof value === 'string' && (AVAILABLE_LANGS as readonly string[]).includes(value);
}
