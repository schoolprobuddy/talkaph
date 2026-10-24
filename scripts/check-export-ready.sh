#!/usr/bin/env bash
# Scan the repo for Next.js features that cannot be statically exported.
# Read-only. Usage: bash scripts/check-export-ready.sh [repo-root]
set -u
ROOT="${1:-.}"
cd "$ROOT" || exit 2
SRC=$(ls -d app src/app pages src/pages lib src/lib components src/components middleware.* proxy.* src/middleware.* src/proxy.* next.config.* 2>/dev/null)
[ -z "$SRC" ] && { echo "No Next.js sources found under $ROOT"; exit 2; }
fail=0; warn=0
hit() { # level pattern description
  local lvl="$1" pat="$2" desc="$3"
  local out
  out=$(grep -RInE --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' --include='*.mjs' --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out "$pat" $SRC 2>/dev/null || true)
  if [ -n "$out" ]; then
    echo "[$lvl] $desc"
    echo "$out" | sed 's/^/    /' | head -20
    [ "$lvl" = FAIL ] && fail=$((fail+1)) || warn=$((warn+1))
  fi
}
for f in middleware.ts middleware.js proxy.ts proxy.js src/middleware.ts src/proxy.ts; do
  [ -f "$f" ] && { echo "[FAIL] $f exists — middleware/proxy is unsupported in a static export"; fail=$((fail+1)); }
done
hit FAIL "^['\"]use server['\"]" "Server Actions ('use server') — unsupported"
hit FAIL "export (async )?function (POST|PUT|PATCH|DELETE)\b" "Non-GET route handlers — unsupported"
hit FAIL "force-dynamic|dynamicParams\s*=\s*true" "Forced dynamic rendering — unsupported"
hit FAIL "from ['\"]next/headers['\"]" "next/headers (cookies()/headers()/draftMode()) — needs a server"
hit FAIL "^\s*export const revalidate\s*=\s*[1-9]" "ISR (revalidate > 0) — unsupported"
hit FAIL "async\s+(redirects|headers|rewrites)\s*\(|(redirects|headers|rewrites)\s*:\s*(async|\()" "next.config redirects/headers/rewrites — move to public/_redirects / _headers"
hit WARN "from ['\"]next/image['\"]" "next/image used — images.unoptimized is set in next.config.mjs"
hit WARN "searchParams" "searchParams in a server component — only the first render is static"
hit WARN "unstable_cache|revalidatePath|revalidateTag" "Next cache APIs — no effect in a static export"

# Metadata and file routes must be prerendered. There is no opengraph-image route.
for f in app/robots.js app/robots.ts app/sitemap.js app/sitemap.ts app/ads.txt/route.js app/manifest.ts; do
  [ -f "$f" ] && ! grep -q "force-static" "$f" && { echo "[FAIL] $f lacks: export const dynamic = 'force-static'"; fail=$((fail+1)); }
done

while IFS= read -r p; do
  d=$(dirname "$p")
  grep -q "generateStaticParams" "$p" || grep -q "generateStaticParams" "$d"/layout.* 2>/dev/null || { echo "[FAIL] $p is a dynamic route without generateStaticParams()"; fail=$((fail+1)); }
done < <(find app src/app -path '*\[*\]*' -name 'page.*' 2>/dev/null)

# Phrase buttons play "/<filename>" from public/. A missing file is a broken button.
if [ -d app ] && [ -d public ]; then
  missing=0
  while IFS= read -r name; do
    [ -n "$name" ] || continue
    if [ ! -f "public/$name" ]; then
      echo "[FAIL] referenced audio public/$name does not exist"
      missing=$((missing+1))
      fail=$((fail+1))
    fi
  done < <(grep -RhoE '[A-Za-z0-9_.-]+\.mp3' app --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx' | sort -u)
  echo "Audio references checked. Missing files: $missing"
fi

echo "----"
echo "Result: $fail blocking issue(s), $warn warning(s)."
[ "$fail" -eq 0 ] && echo "Looks export-ready. Next: npm run build && npx wrangler dev --port 8787"
exit $([ "$fail" -eq 0 ] && echo 0 || echo 1)
