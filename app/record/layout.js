import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Ilonggo recording",
  description: "Private talkaPH recording tool.",
  path: "/record",
  noIndex: true,
});

export default function RecordLayout({ children }) {
  return children;
}
