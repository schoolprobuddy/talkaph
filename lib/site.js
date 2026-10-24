/** Canonical origin: https, non-www. */
export const SITE_URL = "https://talkaph.com";

export const SITE_NAME = "talkaPH";

/** Homepage headline. Titles and descriptions keep this wording. */
export const BRAND_TAGLINE = "Learn Filipino the way it's spoken";

export const DEFAULT_TITLE = `${SITE_NAME} — ${BRAND_TAGLINE}`;

export const DEFAULT_DESCRIPTION =
  "Learn Tagalog, Cebuano, and Ilonggo the way they're spoken, free with native Filipino audio. Greetings, food, directions, and everyday phrases.";

/**
 * AdSense client id from the loader in app/layout.js.
 * ads.txt uses the publisher id with the "ca-" prefix removed.
 */
export const ADSENSE_CLIENT = "ca-pub-6818717676578570";

export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT.replace(/^ca-/, "");
