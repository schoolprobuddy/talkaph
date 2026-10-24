/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static files in ./out for Cloudflare Workers static assets.
  // Every page is already prerendered, and the contribute form posts from
  // the browser, so a Node server is not required.
  output: "export",
  // Keep the live URLs (/about, not /about/). This is also the Next.js default.
  trailingSlash: false,
  // No next/image usage today. Required if one is added later, because the
  // default image optimizer needs a server.
  images: { unoptimized: true },
};

export default nextConfig;
