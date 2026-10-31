import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const exists = async (file) => access(file).then(() => true, () => false);
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }))).flat();
}
const required = ['index.html', 'about/team/index.html', 'about/timeline/index.html',
  'about/faq/index.html', 'events/index.html', 'contact/index.html',
  'chapters/computer-society/index.html', 'chapters/electronics-packaging-society/index.html',
  'branch-constitution/index.html', 'blog/index.html', 'our-new-website/index.html',
  'innovative-website/index.html', 'rss.xml', 'sitemap-index.xml', 'bip-big-data-and-ai-for-res/index.html',
  'contact-us/index.html', 'faq/index.html', 'computer-society/index.html',
  'electronics-packaging-society/index.html', 'second-place-in-uni-ruses-may-innovative-website-contest/index.html',
  'category/uncategorized/index.html', 'feed/index.html'];
const errors = [];
for (const file of required) {
  if (!await exists(path.join(root, file))) errors.push(`Missing preserved route: ${file}`);
}
const files = (await walk(root)).filter((file) => file.endsWith('.html'));
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const base = new URL(path.relative(root, file).replace(/index\.html$/, ''), 'https://local.test/');
  for (const [, target] of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) continue;
    const url = new URL(target.replaceAll('&amp;', '&'), base);
    const local = path.join(root, decodeURIComponent(url.pathname));
    const found = await exists(local) || await exists(`${local}.html`) || await exists(path.join(local, 'index.html'));
    if (!found) errors.push(`${path.relative(root, file)}: broken local link ${target}`);
  }
}
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${files.length} HTML pages, local links/assets, and ${required.length} preserved routes.`);
}

// Check representative search/social metadata and ensure the sitemap contains only indexable pages.
const home = await readFile(path.join(root, 'index.html'), 'utf8');
const post = await readFile(path.join(root, 'ieee-distinguished-lecture-2025/index.html'), 'utf8');
const notFound = await readFile(path.join(root, '404.html'), 'utf8');
const sitemap = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
const seoErrors = [];
if (!home.includes('social-card.')) seoErrors.push('Home page is missing the IEEE social card');
if (!home.includes('name="twitter:image"')) seoErrors.push('Home page is missing twitter:image');
if (!post.includes('og:image') || !post.includes('lecture-2025.')) seoErrors.push('Post social image is missing');
if (!/name="robots" content="noindex, follow"/.test(notFound)) seoErrors.push('404 page must be noindex');
if (sitemap.includes('/tag/')) seoErrors.push('Noindex tag pages must not be in the sitemap');
if (seoErrors.length) {
  console.error(seoErrors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Checked social metadata, 404 indexing and sitemap exclusions.');
}

const bgHome = await readFile(path.join(root, 'bg/index.html'), 'utf8');
const bgGallery = await readFile(path.join(root, 'bg/about/gallery/index.html'), 'utf8');
const enGallery = await readFile(path.join(root, 'about/gallery/index.html'), 'utf8');
const languageErrors = [];
if (!/<html[^>]*lang="bg"/.test(bgHome)) languageErrors.push('Bulgarian homepage must use lang=bg');
if (!bgHome.includes('hreflang="en"') || !bgHome.includes('hreflang="bg"')) languageErrors.push('Homepage language alternates are missing');
if (!bgGallery.includes('/images/news/electroniad-2024.jpg') || !enGallery.includes('/images/news/electroniad-2024.jpg')) languageErrors.push('Gallery images are missing');
if (!await exists(path.join(root, 'bg/bip-big-data-and-ai-for-res/index.html'))) languageErrors.push('Bulgarian BIP overview is missing');
if (languageErrors.length) { console.error(languageErrors.join('\n')); process.exitCode = 1; }
else console.log('Checked Bulgarian language markup, alternates and galleries.');

const imagePages = [
  ['index.html', 'home-community'],
  ['about/gallery/index.html', 'electroniad-2024'],
  ['bip-big-data-and-ai-for-res/index.html', 'benjamin-jopen'],
  ['ieee-distinguished-lecture-2025/index.html', 'lecture-2025'],
  ['bg/innovative-week-technology-2024/index.html', 'innovative-week-2024-2'],
];
for (const [file, imageName] of imagePages) {
  const html = await readFile(path.join(root, file), 'utf8');
  const pictures = html.match(/<picture\b[^>]*>[\s\S]*?<\/picture>/g) || [];
  const picture = pictures.find((item) => item.includes(imageName));
  if (!picture || !picture.includes('image/avif') || !(picture.includes('image/webp') || /<img[^>]+\.webp/.test(picture))) {
    console.error(`${file}: missing AVIF/WebP variants for ${imageName}`);
    process.exitCode = 1;
  }
}
if (!process.exitCode) console.log('Checked Astro AVIF/WebP variants for homepage, gallery, BIP and blog images.');

const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://sb-ieee.uni-ruse.bg/sitemap-index.xml')) {
  console.error('robots.txt does not point to the canonical sitemap');
  process.exitCode = 1;
} else {
  console.log('Checked robots.txt and canonical sitemap URL.');
}

for (const slug of ['about', 'about/gallery', 'bip-big-data-and-ai-for-res', 'blog', 'ieee-distinguished-lecture-2025']) {
  const en = await readFile(path.join(root, slug, 'index.html'), 'utf8');
  const bg = await readFile(path.join(root, 'bg', slug, 'index.html'), 'utf8');
  const expectedEn = `https://sb-ieee.uni-ruse.bg/${slug}`;
  const expectedBg = `https://sb-ieee.uni-ruse.bg/bg/${slug}`;
  for (const [language, html] of [['en', en], ['bg', bg]]) {
    if (!html.includes(`hreflang="en" href="${expectedEn}"`) || !html.includes(`hreflang="bg" href="${expectedBg}"`)) {
      console.error(`Invalid alternate links for ${language}/${slug}`);
      process.exitCode = 1;
    }
  }
}
if (!process.exitCode) console.log('Checked reciprocal localized URLs on key pages and posts.');

// Check structured data and every advertised language alternate against built files.
const schemas = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .flatMap(([, json]) => { const data = JSON.parse(json); return Array.isArray(data) ? data : [data]; });
for (const [file, type] of [['index.html', 'Organization'], ['bg/index.html', 'Organization'], ['ieee-distinguished-lecture-2025/index.html', 'BlogPosting'], ['bg/ieee-distinguished-lecture-2025/index.html', 'BlogPosting']]) {
  const html = await readFile(path.join(root, file), 'utf8');
  const schema = schemas(html).find((entry) => entry['@type'] === type);
  if (!schema) { console.error(`${file}: missing ${type} schema`); process.exitCode = 1; continue; }
  const asset = type === 'Organization' ? schema.logo : schema.image;
  if (!asset || !await exists(path.join(root, new URL(asset).pathname))) {
    console.error(`${file}: structured data image is missing from the build`); process.exitCode = 1;
  }
  if (type === 'BlogPosting' && !schemas(html).some((entry) => entry['@type'] === 'BreadcrumbList')) {
    console.error(`${file}: missing breadcrumb schema`); process.exitCode = 1;
  }
}
if (!/name="description" content="[^"<>]*[А-Яа-я]/u.test(bgHome)) {
  console.error('Bulgarian homepage needs a Bulgarian description'); process.exitCode = 1;
}
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="(en|bg)" href="([^"]+)"/g)];
  for (const [, lang, href] of alternates) {
    const target = new URL(href);
    const targetFile = path.join(root, decodeURIComponent(target.pathname), 'index.html');
    if (!await exists(targetFile)) { console.error(`${file}: missing ${lang} alternate ${href}`); process.exitCode = 1; continue; }
    const targetHtml = await readFile(targetFile, 'utf8');
    for (const [, otherLang, otherHref] of alternates) {
      if (!targetHtml.includes(`hreflang="${otherLang}" href="${otherHref}"`)) {
        console.error(`${file}: non-reciprocal ${lang} alternate ${href}`); process.exitCode = 1;
      }
    }
  }
}
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const pathname = new URL(url).pathname;
  const target = path.join(root, decodeURIComponent(pathname), 'index.html');
  if (!await exists(target)) { console.error(`Sitemap URL missing from build: ${url}`); process.exitCode = 1; continue; }
  const html = await readFile(target, 'utf8');
  if (/http-equiv="refresh"/i.test(html) || /name="robots" content="noindex/i.test(html)) {
    console.error(`Sitemap contains redirect or noindex page: ${url}`); process.exitCode = 1;
  }
}
if (!process.exitCode) console.log('Checked structured data assets, all language alternates and sitemap targets.');
