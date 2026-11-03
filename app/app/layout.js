import { pageMetadata } from "../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Practice Tagalog",
    description:
      "Practice Tagalog phrases with native audio. Lessons, spaced review, and a phrasebook saved on this device.",
    path: "/app",
    noIndex: true,
  }),
  manifest: "/app/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "talkaPH",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function PracticeLayout({ children }) {
  return (
    <>
      {/* iOS Safari still reads this name for Add to Home Screen standalone mode. */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      {children}
    </>
  );
}
