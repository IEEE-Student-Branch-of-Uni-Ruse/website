import posts from '~/data/posts-bg.json';
// Only advertise translations that have been published.
export const translatedPaths = new Set(['/', '/about', '/about/team', '/about/timeline', '/about/gallery', '/about/faq', '/events', '/contact', '/chapters/computer-society', '/chapters/electronics-packaging-society', '/bip-big-data-and-ai-for-res', '/blog', ...Object.keys(posts).map((slug) => `/${slug}`)]);
export function localePaths(pathname: string) {
  const isBg = pathname === '/bg' || pathname.startsWith('/bg/');
  const english = (isBg ? pathname.slice(3) : pathname).replace(/\/$/, '') || '/';
  return { isBg, english, bg: translatedPaths.has(english) ? `/bg${english === '/' ? '' : english}` : null };
}
