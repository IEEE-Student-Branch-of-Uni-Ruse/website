/** Resolve browser language preferences against translations that actually exist.
 * Pass an explicit choice first when a language switcher is added.
 */
export function resolveLanguage(
  preferred: readonly string[],
  supported: readonly string[],
  fallback: string,
): string {
  const available = supported.map((language) => ({ original: language, normalized: language.toLowerCase() }));
  for (const preference of preferred) {
    const normalized = preference.trim().replaceAll('_', '-').toLowerCase();
    if (!normalized) continue;
    const exact = available.find((language) => language.normalized === normalized);
    if (exact) return exact.original;
    const base = normalized.split('-')[0];
    const baseMatch = available.find((language) => language.normalized === base);
    if (baseMatch) return baseMatch.original;
  }
  return fallback;
}

/** Call in the browser only. Does not redirect, store data or modify document language. */
export function getBrowserLanguage(supported: readonly string[], fallback: string): string {
  if (typeof navigator === 'undefined') return fallback;
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  return resolveLanguage(preferred, supported, fallback);
}
