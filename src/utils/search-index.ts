import { fetchPosts } from '~/utils/blog';
import translations from '~/data/posts-bg.json';
import { getCollection } from 'astro:content';

export async function getSearchIndex(bg: boolean) {
const t = (en: string, value: string) => bg ? value : en;
const pages = [
  ['/', 'Home', 'Начало', 'IEEE community technology students', 'IEEE общност технологии студенти'],
  ['/about', 'About the branch', 'За клона', 'About our student branch', 'За студентския клон'],
  ['/about/team', 'Team', 'Екип', 'Students and mentors', 'Студенти и ментори'],
  ['/about/timeline', 'History', 'История', 'Branch milestones', 'История на клона'],
  ['/about/gallery', 'Gallery', 'Галерия', 'Photographs and activities', 'Снимки и дейности'],
  ['/about/faq', 'Frequently asked questions', 'Често задавани въпроси', 'Membership and volunteering', 'Членство и доброволчество'],
  ['/events', 'Events', 'Събития', 'Activities and programmes', 'Дейности и програми'],
  ['/contact', 'Contact', 'Контакти', 'Get in touch with the branch', 'Свържи се с клона'],
  ['/chapters/computer-society', 'Computer Society', 'Компютърно общество', 'Computing and technology', 'Компютърни науки и технологии'],
  ['/chapters/electronics-packaging-society', 'Electronics Packaging Society', 'Общество по електронно пакетиране', 'Electronics and engineering', 'Електроника и инженерство'],
  ['/bip-big-data-and-ai-for-res', 'Big Data and AI programme', 'Програма за големи данни и изкуствен интелект', 'Erasmus renewable energy programme', 'Еразъм програма възобновяема енергия'],
  ['/blog', 'News', 'Новини', 'News and stories', 'Новини и публикации'],
  ['/accessibility', 'Accessibility', 'Достъпност', 'Accessibility information', 'Информация за достъпност'],
];
const rawPosts = await getCollection('post');
const posts = (await fetchPosts()).filter((post) => !bg || post.slug in translations).map((post) => {
  const translated = bg ? translations[post.slug as keyof typeof translations] : undefined;
  return { href: `${bg ? '/bg/' : '/'}${post.slug}`, title: translated?.title || post.title, description: translated?.excerpt || post.excerpt || '', body: translated?.body || rawPosts.find((entry) => entry.id.replace(/\.(md|mdx)$/, '') === post.id)?.body || '' };
});
const entries = [...pages.map(([href, en, bulgarian, description, bgDescription]) => ({ href: bg ? `/bg${href === '/' ? '' : href}` : href, title: t(en, bulgarian), description: t(description, bgDescription), body: '' })), ...posts];
return entries.map(({ href, title, description, body }) => ({ href, title, description, text: `${title} ${description} ${body}`.toLocaleLowerCase() }));
}
