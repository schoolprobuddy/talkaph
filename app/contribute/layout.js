import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Contribute Phrases & Native Audio",
  description:
    "Suggest a phrase, correct a translation, or share native audio in Tagalog, Cebuano, Ilonggo, and other Philippine languages.",
  path: "/contribute",
});

export default function ContributeLayout({ children }) {
  return children;
}
