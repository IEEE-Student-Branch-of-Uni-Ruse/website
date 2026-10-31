# Maintaining the website

## What updates automatically

`.github/dependabot.yml` groups npm and GitHub Actions version updates into one quarterly PR (including major updates). Security updates can still be opened separately and outside that schedule. `.github/workflows/check.yml` installs the exact pnpm lockfile, checks Astro types, builds every static route, and validates local links and preserved public routes. A green build is not a visual comparison: preview major framework/style changes before merging.

The repository does not enable automatic merges or change hosting settings. Publishing still follows the repository's existing deployment integration.

## AstroWind is a template, not a package

Installing the upstream Git repository would not provide a supported theme API. Its layouts assume a specific project configuration, content loader, image tree, aliases and CSS build. Wrapping the existing copy in a private npm package would move the maintenance burden rather than remove it.

This migration imports the shared presentation layer from AstroWind `1.0.0-beta.66` at commit `14e1a691f80548dcc36370847b1a02c0d0b12821`: common/blog/UI/widget components, blog routes, layouts, utilities, types and Tailwind 4 styles. See `astrowind-upstream.json` and `astrowind-LICENSE.md` alongside this file. IEEE branding components, content, configuration and locally bundled Inter fonts are preserved; demo pages, promotional announcements and newsletter forms are not imported. IEEE content is extracted to JSON and Markdown. Runtime/toolchain dependencies can now be updated through regular package PRs. There is no need to merge unrelated upstream demo pages to keep Astro current.

The previous README recorded upstream commit `f5a452e`. That object is not present in this repository, so it is not claimed as a verified merge base. The current migration does not claim a complete synchronization with upstream AstroWind.

If a useful upstream component fix appears:

1. Read the change in https://github.com/onwidget/astrowind and check its license.
2. Port the relevant component/style change only; preserve the IEEE JSON/Markdown files.
3. Run `pnpm check`, `pnpm lint`, `pnpm build`, and `pnpm check:site`.
4. Preview desktop and mobile, light/dark mode, menu, blog and images.

Do not blindly merge the entire template or replace local content with the demo site. If fully vendor-maintained theme releases become a requirement, select a different theme with a supported package API and plan a separate design migration.

## Content and URLs

Real branch content was retained, including the 17 team entries, two existing blog posts, chapter descriptions and constitution. Dates, membership statistics and names are preserved source information, not independently verified current facts. Review those editorially when updating the site.

Demo home/landing/pricing/services routes were removed. `/about`, `/contact`, `/terms`, and `/privacy` remain, with IEEE-specific content replacing template placeholders. The contact page links to the existing community channels; it does not advertise an unconfigured message delivery form.

The existing blog permalink setting is `/%slug%`. Do not change it without redirects. The timeline now links to `/our-new-website`, matching this setting.

The `/terms` and `/privacy` pages contain short factual website notices instead of the original sample-company text. An organization-specific policy can be supplied later without changing their URLs.

## CMS

Decap is loaded from a pinned CDN release in `public/decapcms/index.html`; update that pin deliberately when upgrading the CMS. The current backend is `git-gateway` on `main`, preserved from the existing setup. Verify authentication on the actual hosting service. This migration does not create an OAuth service or configure an external account.

CMS image uploads use `public/uploads` -> `/uploads`. Existing build-optimized images use `~/assets/images/...`; the post image field remains a string so both forms can be represented.

## Dependency updates

Use `pnpm outdated` to inspect pending releases. Update a compatible group, commit the package manifest and lockfile together, and run the checks above. TypeScript must remain compatible with Astro's checker; a newer npm major is not necessarily supported by the checker yet.

Keep the Node requirement in `package.json`, `.node-version`, CI, and the hosting environment aligned. Keep secrets in hosting settings rather than source files.
