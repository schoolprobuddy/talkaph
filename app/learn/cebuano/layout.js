import { pageMetadata } from "../../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Learn Cebuano (Bisaya) — Free Phrases & Audio",
    description:
      "Learn Cebuano (Bisaya) with free phrases, vocabulary and native audio. Greetings, numbers, family, food, directions and more. Perfect for travelers to Cebu, Davao and Visayas.",
    path: "/learn/cebuano",
  }),
  keywords:
    "learn Cebuano, Bisaya phrases, Cebuano language, Bisaya greetings, Cebuano for travelers, basic Bisaya",
};

export default function CebuanoLayout({ children }) {
  return children;
}
