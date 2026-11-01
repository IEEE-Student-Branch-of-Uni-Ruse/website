import posts from '~/data/posts-bg.json';
import { getRelativeLocaleUrl } from 'astro:i18n';
// Only advertise translations that have been published.
export const translatedPaths = new Set(['/', '/about', '/about/team', '/about/timeline', '/about/gallery', '/about/faq', '/events', '/contact', '/chapters/computer-society', '/chapters/electronics-packaging-society', '/bip-big-data-and-ai-for-res', '/blog', '/accessibility', ...Object.keys(posts).map((slug) => `/${slug}`)]);
export function localePaths(pathname: string) {
  const isBg = pathname === '/bg' || pathname.startsWith('/bg/');
  const english = (isBg ? pathname.slice(3) : pathname).replace(/\/$/, '') || '/';
  return { isBg, english: getRelativeLocaleUrl('en', english === '/' ? undefined : english), bg: translatedPaths.has(english) ? getRelativeLocaleUrl('bg', english === '/' ? undefined : english) : null };
}
