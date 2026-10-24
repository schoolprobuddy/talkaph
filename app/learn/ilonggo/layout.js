import { pageMetadata } from "../../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Learn Ilonggo (Hiligaynon) — Free Phrases & Audio",
    description:
      "Learn Ilonggo (Hiligaynon) with free phrases, vocabulary and native audio. Greetings, numbers, family, food, directions and more. Perfect for travelers to Iloilo, Bacolod and Western Visayas.",
    path: "/learn/ilonggo",
  }),
  keywords:
    "learn Ilonggo, Hiligaynon phrases, Ilonggo language, Ilonggo greetings, Ilonggo for travelers, basic Hiligaynon",
};

export default function IlonggoLayout({ children }) {
  return children;
}
