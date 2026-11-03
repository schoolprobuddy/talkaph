export const SHELL_CACHE = "talkaph-app-shell-v1";
export const AUDIO_CACHE = "talkaph-tagalog-audio-v1";

const OPTIONAL_PATHS = ["/app.txt", "/app/__next._full.txt", "/app/__next._head.txt", "/app/__next._tree.txt"];

function sameOriginPath(value, basePath) {
  try {
    const url = new URL(value, `${location.origin}${basePath}`);
    if (url.origin !== location.origin) return null;
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

async function putResponse(cache, path, response) {
  if (response.redirected) {
    const headers = new Headers(response.headers);
    headers.delete("set-cookie");
    const clean = new Response(await response.blob(), {
      status: 200,
      statusText: "OK",
      headers,
    });
    await cache.put(path, clean);
    return;
  }
  await cache.put(path, response);
}

async function cacheUrl(cache, path, required) {
  const response = await fetch(path, { cache: "reload" });
  if (!response.ok) {
    if (required) throw new Error(`Could not download ${path} (${response.status})`);
    return null;
  }
  await putResponse(cache, path, response.clone());
  return response;
}

async function cacheCssAssets(cache, cssPaths) {
  const found = [];
  for (const cssPath of cssPaths) {
    const cached = await cache.match(cssPath);
    if (!cached) continue;
    const css = await cached.clone().text();
    for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
      const raw = match[1].replace(/["'\s]/g, "");
      if (!raw || raw.startsWith("data:")) continue;
      const path = sameOriginPath(raw, cssPath);
      if (!path || found.includes(path)) continue;
      found.push(path);
    }
  }
  for (const path of found) {
    await cacheUrl(cache, path, true);
  }
  return found;
}

export async function downloadTagalogOffline(phrases, onProgress) {
  if (typeof caches === "undefined") {
    throw new Error("This browser cannot store files for offline use.");
  }
  const shell = await caches.open(SHELL_CACHE);
  const audio = await caches.open(AUDIO_CACHE);
  const seeds = [
    "/app",
    "/app/manifest.webmanifest",
    "/sw.js",
    "/apple-touch-icon.png",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/favicon.ico",
    ...OPTIONAL_PATHS,
  ];
  const page = await cacheUrl(shell, "/app", true);
  const html = await page.clone().text();
  const urls = new Set(seeds);
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const path = sameOriginPath(match[1], "/app");
    if (path) urls.add(path);
  }

  const list = [...urls];
  const cssPaths = [];
  const total = list.length + phrases.length;
  let done = 0;
  const tick = () => onProgress?.(done / total);

  for (const path of list) {
    const required = path === "/app" || !OPTIONAL_PATHS.includes(path);
    const response = path === "/app" ? null : await cacheUrl(shell, path, required);
    if (path.endsWith(".css")) cssPaths.push(path);
    if (response && path.endsWith(".css")) cssPaths.push(path);
    done += 1;
    tick();
  }
  await cacheCssAssets(shell, [...new Set(cssPaths)]);

  const phraseData = phrases.map((phrase) => ({
    id: phrase.id,
    text: phrase.text,
    english: phrase.english,
    audio: phrase.audio,
    unitId: phrase.unitId,
    unitTitle: phrase.unitTitle,
    formal: phrase.formal,
  }));
  await shell.put(
    "/app/tagalog.json",
    new Response(JSON.stringify({ lang: "tagalog", phrases: phraseData }), {
      headers: { "Content-Type": "application/json" },
    }),
  );

  for (const phrase of phrases) {
    await cacheUrl(audio, `/${phrase.audio}`, true);
    done += 1;
    tick();
  }
  onProgress?.(1);
  return { files: list.length + phrases.length };
}
