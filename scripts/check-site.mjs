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
