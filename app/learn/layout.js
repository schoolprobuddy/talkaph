import { pageMetadata } from "../../lib/seo";
import { SITE_NAME } from "../../lib/site";

const title = "Learn Tagalog, Cebuano & Ilonggo";

export const metadata = {
  ...pageMetadata({
    title,
    description:
      "Pick Tagalog, Cebuano (Bisaya), or Ilonggo (Hiligaynon) and learn Filipino the way it's spoken, with free native audio.",
    path: "/learn",
  }),
  // A plain string title would drop the root "%s | talkaPH" template, so
  // /learn/tagalog and the other language pages would lose the brand suffix.
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
};

export default function LearnLayout({ children }) {
  return children;
}
