import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Cebuano recording",
  description: "Private talkaPH recording tool.",
  path: "/record-cebuano",
  noIndex: true,
});

export default function RecordCebuanoLayout({ children }) {
  return children;
}
