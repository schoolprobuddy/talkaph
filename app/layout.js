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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
