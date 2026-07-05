import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "talkaPH — Learn Filipino Languages Free | Tagalog, Cebuano, Ilonggo",
  description: "Learn Tagalog, Cebuano and Ilonggo free with native Filipino audio. 270+ phrases for travelers to the Philippines. Greetings, food, directions and more.",
  keywords: "learn Filipino, learn Tagalog, learn Cebuano, learn Ilonggo, Filipino language, Philippines travel, Bisaya phrases, Hiligaynon",
  openGraph: {
    title: "talkaPH — Learn Filipino Languages Free",
    description: "Learn Tagalog, Cebuano and Ilonggo with native Filipino audio. Free for travelers to the Philippines.",
    url: "https://talkaph.com",
    siteName: "talkaPH",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MYMFYS2P5Z" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MYMFYS2P5Z');
            `,
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6818717676578570"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
