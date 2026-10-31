import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import tasks from './src/utils/tasks.mjs';

import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs';

import { ANALYTICS, SITE } from './src/utils/config.ts';

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

  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    tasks(),
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
