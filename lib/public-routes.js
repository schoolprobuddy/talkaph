import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const APP_DIR = path.join(process.cwd(), "app");
const PAGE_FILES = new Set(["page.js", "page.jsx", "page.ts", "page.tsx", "page.mdx"]);

/**
 * Recording tools (/record, /record-cebuano, /record-tagalog) are not public
 * pages. The prefix is exact so a future path like /recordings stays public.
 */
export function isPrivatePath(routePath) {
  return (
    routePath === "/record" ||
    routePath.startsWith("/record/") ||
    routePath.startsWith("/record-")
  );
}

function lastModified(file) {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) {
      const date = new Date(iso);
      if (!Number.isNaN(date.getTime())) return date;
    }
  } catch {
    // Builds without git history, or a page that is not committed yet.
  }
  return fs.statSync(file).mtime;
}

function walk(dir, route, found) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "api" || entry.name.startsWith("_")) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Parallel routes and dynamic segments are not literal public URLs.
      // A [slug] route needs a data source before it can be listed.
      if (entry.name.startsWith("@") || entry.name.includes("[") || entry.name.includes("]")) {
        continue;
      }
      const nextRoute =
        entry.name.startsWith("(") && entry.name.endsWith(")") ? route : `${route}/${entry.name}`;
      walk(full, nextRoute, found);
      continue;
    }
    if (!PAGE_FILES.has(entry.name)) continue;
    found.push({
      path: route === "" ? "/" : route,
      lastModified: lastModified(full),
    });
  }
}

/** Every public page.js route, so a newly added page is included on the next build. */
export function discoverPublicPages() {
  const found = [];
  walk(APP_DIR, "", found);

  const byPath = new Map();
  for (const page of found) {
    if (isPrivatePath(page.path)) continue;
    const existing = byPath.get(page.path);
    if (!existing || page.lastModified > existing.lastModified) {
      byPath.set(page.path, page);
    }
  }

  return [...byPath.values()].sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });
}
