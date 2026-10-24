import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Tagalog recording",
  description: "Private talkaPH recording tool.",
  path: "/record-tagalog",
  noIndex: true,
});

export default function RecordTagalogLayout({ children }) {
  return children;
}
