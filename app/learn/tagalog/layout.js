import { pageMetadata } from "../../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Learn Tagalog — Free Phrases & Audio",
    description:
      "Learn Tagalog (Filipino) with free phrases, vocabulary and native audio. Greetings, numbers, family, food, directions and more. Perfect for travelers to the Philippines.",
    path: "/learn/tagalog",
  }),
  keywords:
    "learn Tagalog, Tagalog phrases, Filipino language, Tagalog greetings, Tagalog for travelers, basic Tagalog",
};

export default function TagalogLayout({ children }) {
  return children;
}
