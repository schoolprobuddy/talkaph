/* talkaPH practice app 0.2.0-beta.
   Scope is the whole origin so the shell at /app can be controlled.
   Requests outside the app are ignored. Cache names are versioned so an
   update drops the previous shell and audio caches instead of serving them. */
const SHELL_CACHE = "talkaph-app-shell-v2";
const AUDIO_CACHE = "talkaph-audio-v2";

function isAudio(path) {
  return path.endsWith(".mp3");
}

function isAppPath(path) {
  return (
    path === "/app" ||
    path === "/app/" ||
    path === "/app.txt" ||
    path.startsWith("/app/") ||
    path === "/manifest.webmanifest" ||
    path === "/sw.js" ||
    path === "/apple-touch-icon.png" ||
    path.startsWith("/android-chrome-") ||
    path.startsWith("/maskable-icon-") ||
    path === "/favicon.ico" ||
    path.startsWith("/favicon-") ||
    path.startsWith("/_next/")
  );
}

async function cacheShell() {
  const cache = await caches.open(SHELL_CACHE);
  const response = await fetch("/app", { cache: "reload" });
  if (!response.ok) return;
  const html = await response.clone().text();
  const headers = new Headers(response.headers);
  headers.delete("set-cookie");
  await cache.put("/app", new Response(await response.blob(), { status: 200, headers }));
  const urls = new Set([
    "/manifest.webmanifest",
    "/app/manifest.webmanifest",
    "/sw.js",
    "/apple-touch-icon.png",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/maskable-icon-192.png",
    "/maskable-icon-512.png",
    "/favicon.ico",
  ]);
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    try {
      const url = new URL(match[1], self.location.origin);
      if (url.origin === self.location.origin) urls.add(`${url.pathname}${url.search}`);
    } catch {
      // Ignore malformed links in the shell.
    }
  }
  await Promise.all(
    [...urls].map(async (url) => {
      try {
        const asset = await fetch(url, { cache: "reload" });
        if (asset.ok) await cache.put(url, asset);
      } catch {
        // A missing optional file should not block install.
      }
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, AUDIO_CACHE]);
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.startsWith("talkaph-") && !keep.has(key)).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isAudio(url.pathname)) {
    event.respondWith(fromCache(AUDIO_CACHE, url.pathname));
    return;
  }
  if (!isAppPath(url.pathname)) return;
  event.respondWith(networkFirst(SHELL_CACHE, url.pathname === "/app/" ? "/app" : url.pathname, request));
});

async function fromCache(cacheName, key) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(key);
  if (hit) return hit;
  const response = await fetch(key);
  if (response.status === 200 && !response.redirected) {
    await cache.put(key, response.clone());
  }
  return response;
}

async function networkFirst(cacheName, key, request) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok && !response.redirected) {
      await cache.put(key, response.clone());
    }
    return response;
  } catch {
    const hit = (await cache.match(key)) || (request.mode === "navigate" ? await cache.match("/app") : null);
    if (hit) return hit;
    return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
  }
}
