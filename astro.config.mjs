import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';

import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs';

import { ANALYTICS, SITE, APP_BLOG } from './src/utils/config.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const whenExternalScripts = (items = []) =>
  ANALYTICS.vendors.googleAnalytics.id && ANALYTICS.vendors.googleAnalytics.partytown
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',

  image: { responsiveStyles: true },
  output: 'static',
  i18n: { defaultLocale: 'en', locales: ['en', 'bg'], routing: { prefixDefaultLocale: false } },
  redirects: {
    "/contact-us": "/contact",
    "/faq": "/about/faq",
    "/computer-society": "/chapters/computer-society",
    "/electronics-packaging-society": "/chapters/electronics-packaging-society",
    "/second-place-in-uni-ruses-may-innovative-website-contest": "/innovative-website",
    "/category/uncategorized": "/blog",
    "/feed": "/rss.xml"
},
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        const matches = (segment) => pathname === `/${segment}` || pathname.startsWith(`/${segment}/`);
        return !((!APP_BLOG.tag.robots.index && matches(APP_BLOG.tag.pathname)) ||
          (!APP_BLOG.category.robots.index && matches(APP_BLOG.category.pathname)) ||
          (!APP_BLOG.list.robots.index && matches(APP_BLOG.list.pathname)));
      },
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

  ],

  markdown: {
    processor: unified({ remarkPlugins: [readingTimeRemarkPlugin] }),
  },

  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
