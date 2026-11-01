import type { APIRoute, GetStaticPaths } from 'astro';
import { getSearchIndex } from '~/utils/search-index';

export const getStaticPaths = (() => ['en', 'bg'].map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;
export const GET: APIRoute = async ({ params }) => new Response(JSON.stringify(await getSearchIndex(params.lang === 'bg')), {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
