import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      links: [
        {
          text: 'Team',
          href: getPermalink('/about/team'),
        },
        {
          text: 'Timeline',
          href: getPermalink('/about/timeline'),
        },
        {
          text: 'FAQ',
          href: getPermalink('/about/faq'),
        },
      ],
    },
    {
      text: 'Chapters',
      links: [
        {
          text: 'Computer Sociality',
          href: '#',
        },
      ],
    },
    {
      text: 'Events',
      href: getPermalink('/events'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
    { type: 'button', text: 'Join IEEE', href: 'https://www.ieee.org/membership/join/index.html' }
  ],
};
  
export const footerData = {
  links: [
    {
      title: 'IEEE Organization',
      links: [
        { text: 'IEEE website', href: 'https://www.ieee.org/' },
        { text: 'IEEE Xplore Digital Library', href: 'https://ieeexplore.ieee.org/Xplore/home.jsp' },
        { text: 'IEEE Standards', href: 'https://standards.ieee.org/' },
        { text: 'IEEE Spectrum', href: 'https://spectrum.ieee.org/' },
        { text: 'IEEE Kerala Section', href: 'https://ieeekerala.org/' },
        { text: 'IEEE Region 10', href: 'https://www.ieeer10.org/' },
        { text: 'More sites', href: 'https://www.ieee.org/sitemap.html' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'Twitter', icon: 'tabler:brand-twitter', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/ieee-student-branch-of-university-of-ruse' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/sbieee.uniruse' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/IEEE-Student-Branch-of-Uni-Ruse/' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    Copyright © 2021-2023 IEEE Student Branch of Uni Ruse.
  `,
};
