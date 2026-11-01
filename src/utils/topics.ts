export const topics = {
  events: { en: 'Events and lectures', bg: 'Събития и лекции' },
  competitions: { en: 'Competitions', bg: 'Състезания' },
  community: { en: 'Community', bg: 'Общност' },
  website: { en: 'Website and projects', bg: 'Уебсайт и проекти' },
} as const;
export type Topic = keyof typeof topics;
export function postTopic(slug: string): Topic {
  if (slug === 'electroniad-2024' || slug === 'electroniad-2022-results' || slug.includes('competition') || slug === 'innovative-website') return 'competitions';
  if (slug === 'our-new-website') return 'website';
  if (slug === 'ieee-distinguished-lecture-2025' || slug === 'innovative-week-technology-2024') return 'events';
  return 'community';
}
