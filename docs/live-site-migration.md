# Public WordPress migration

Source: https://sb-ieee.uni-ruse.bg/ . Route inventory: `live-migration.json`.

All eight public pages and two posts from the REST API/sitemaps are represented in Astro. The BIP programme is editable in `src/data/bip.md` and Decap CMS. Its two original photographs and the homepage wordmark are stored locally in `public/images`. Existing local team, timeline, constitution and blog images remain available.

The source contact page has no body/contact details; existing community channels are retained. Live social links are LinkedIn, GitHub, Facebook and RSS; existing Discord is retained too. Source events says “Still in development”; this status is preserved alongside the earlier repository event entries.

Old contact, FAQ, chapter, contest-post, uncategorized archive and feed URLs redirect to their Astro equivalents. Static builds emit redirect HTML; hosting should honor Astro redirect configuration where supported.

BIP source editorial issues preserved: 2026 programme but nomination deadline 20.02.2025; partner list and Bucharest travel duration contain ellipses; application instructions mention Google Form without providing a URL. These require the organization's actual corrections, not invented replacements.

Original source content and assets were inspected through HTML/API. No connected browser was available for screenshot-based desktop/mobile comparison or interaction verification. This migration does not include WordPress administration, user accounts or plugins.
