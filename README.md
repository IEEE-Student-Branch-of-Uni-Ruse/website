# IEEE Student Branch of Uni Ruse

Static Astro website for https://sb-ieee.uni-ruse.bg, with Tailwind CSS and file-based content.

## Development

Use Node 24 LTS (24.16 or newer; see `.node-version`) and the pnpm version pinned in `package.json`.

```sh
npm install --global pnpm@12.16.1
pnpm install --frozen-lockfile
pnpm dev
```

The development server runs at http://localhost:4321.

```sh
pnpm check       # Astro and TypeScript diagnostics
pnpm lint        # ESLint
pnpm build       # Static output in dist/
pnpm check:site  # Check preserved routes and local links in dist/
pnpm preview     # Preview production output
```

Commit `pnpm-lock.yaml` when changing dependencies. Do not generate an npm lockfile.

## Editing content

| Content | Location |
| --- | --- |
| Home page, benefits, mission, statistics | `src/data/home.json` |
| BIP programme | `src/data/bip.md` |
| Team | `src/data/team.json` |
| Events | `src/data/events.json` |
| FAQ | `src/data/faq.json` |
| Timeline | `src/data/timeline.json` |
| Navigation, footer, about, contact channels | `src/data/site.json` |
| Blog posts | `src/content/post/*.md` |
| Chapters and branch constitution | `src/pages/chapters/*.md`, `src/pages/branch-constitution.md` |
| Site URL, SEO, blog routing, theme mode | `src/config.yaml` |
| Shared visual components | `src/components/`, `src/layouts/` |
| Colors, typography, styles | `src/components/CustomStyles.astro`, `src/assets/styles/tailwind.css` |

The existing post URLs stay at `/<slug>`, while the post listing is `/blog`.

Decap CMS is available at `/decapcms/`. Its configuration exposes site content as editor forms and saves changes to Git. Uploaded images live in `public/uploads` and use `/uploads/...` URLs. Existing imported images remain in `src/assets/images`.

CMS authentication still uses the existing Git Gateway configuration. Access depends on the hosting account's Identity/Git Gateway setup; it is not enabled by a local build. If moving away from that service, configure another Decap backend before relying on the editor. Files can always be edited directly in Git. See [maintenance notes](docs/maintenance.md).

## Hosting

Build command: `pnpm build`; publish directory: `dist`. Install with `pnpm install --frozen-lockfile` and use Node 24.16+.

The canonical site URL is set in `src/config.yaml`; preview deployments should not change it. A Vercel configuration is included. Hosting credentials and deployments are managed separately.

## Maintenance

GitHub Actions checks pull requests and builds the website. Dependabot groups npm dependencies and GitHub Actions into one version-update PR every quarter, including major updates. Security updates may still arrive separately and sooner. These workflows become active when committed and pushed to GitHub with Actions/Dependabot available.

The design originated from [AstroWind](https://github.com/onwidget/astrowind), under MIT. It is a local, reduced set of components, not an installed AstroWind package. See [maintenance notes](docs/maintenance.md) for the distinction between dependency updates and upstream template changes.

## License

MIT; see [LICENSE.md](LICENSE.md). Preserve the original template attribution when reusing its code.

## Navigation and future languages

Astro's `ClientRouter` in `src/layouts/Layout.astro` enables view transitions. Internal links are prefetched on hover or focus (`astro.config.mjs`); Astro respects slow connections and data-saving preferences. Test menu, theme and page scripts after changes to navigation.

The website currently has English content only. `src/utils/language.ts` provides `getBrowserLanguage(supported, fallback)` for future translated pages, using `navigator.languages` in preference order and falling back from regional tags to their base language. It does not redirect, store a preference, or change the page's `lang` attribute. When translations are added, pass only languages with real routes and let an explicit visitor choice take precedence. Until then, HTML remains `lang="en"`. Run `pnpm test` for language resolution tests.
