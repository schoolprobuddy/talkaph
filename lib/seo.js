import { SITE_NAME, SITE_URL } from "./site";

/**
 * Unique title, description, canonical, and social tags for one public URL.
 * `title` is the page title without " | talkaPH" unless `absoluteTitle` is set.
 * `path` is the site path ("/" or "/learn/tagalog") and is expanded to an
 * absolute https://talkaph.com URL.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
  type = "website",
}) {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
