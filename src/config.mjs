import defaultImage from './assets/images/default.png';

const CONFIG = {
  name: 'IEEE Student Branch of Uni Ruse',

  origin: 'https://sb-ieee.uni-ruse.bg/',
  basePathname: '/',
  trailingSlash: false,

  title: 'IEEE Student Branch of Uni Ruse',
  description:
    '🚀 IEEE Student Branch University of Ruse  encourages a global community to innovate for a better tomorrow by offering a wide range of learning and career enhancement to ensure skill and knowledge growth through our conferences, workshops, competitions, and educational activities',
  defaultImage: defaultImage,

  defaultTheme: 'system', // Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  language: 'en',
  textDirection: 'ltr',

  dateFormatter: new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }),

  googleAnalyticsId: '', // or "G-XXXXXXXXXX",
  googleSiteVerificationId: '',

  blog: {
    disabled: false,
    postsPerPage: 4,

    post: {
      permalink: '/blog/%slug%', // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      noindex: false,
      disabled: false,
    },

    list: {
      pathname: 'blog', // Blog main path, you can change this to "articles" (/articles)
      noindex: false,
      disabled: false,
    },

    category: {
      pathname: 'category', // Category main path /category/some-category
      noindex: true,
      disabled: false,
    },

    tag: {
      pathname: 'tag', // Tag main path /tag/some-tag
      noindex: true,
      disabled: false,
    },
  },
};

export const SITE = { ...CONFIG, blog: undefined };
export const BLOG = CONFIG.blog;
export const DATE_FORMATTER = CONFIG.dateFormatter;
