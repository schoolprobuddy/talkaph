import { discoverPublicPages } from "../lib/public-routes";
import { SITE_URL } from "../lib/site";

// Static at build time. Harmless on Vercel; required if the app is later exported.
export const dynamic = "force-static";

/**
 * Public URLs only. Phrase and category lessons (greetings, food, directions,
 * and the rest) are sections inside /learn/tagalog, /learn/cebuano, and
 * /learn/ilonggo — they are not separate routes, so they are not listed again.
 * Recording tools under /record are private and excluded.
 */
export default function sitemap() {
  return discoverPublicPages().map((page) => ({
    url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
    lastModified: page.lastModified,
  }));
}
