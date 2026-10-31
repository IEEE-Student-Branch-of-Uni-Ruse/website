import site from './data/site.json';
import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

const resolveHref = (href) => {
  if (href === '/blog') return getBlogPermalink();
  if (href === '/rss.xml') return getAsset(href);
  return href?.startsWith('/') ? getPermalink(href) : href;
};

const resolveLinks = (links) =>
  links.map((link) => ({
    ...link,
    ...(link.href ? { href: resolveHref(link.href) } : {}),
    ...(link.links ? { links: resolveLinks(link.links) } : {}),
  }));

export const headerData = {
  links: resolveLinks(site.header.links),
};

export const footerData = {
  description: site.footer.description,
  links: resolveLinks(site.footer.links),
  secondaryLinks: resolveLinks(site.footer.secondaryLinks),
  socialLinks: resolveLinks(site.footer.socialLinks),
  footNote: `Copyright © ${site.footer.copyrightStartYear}–${new Date().getFullYear()}`,
};
