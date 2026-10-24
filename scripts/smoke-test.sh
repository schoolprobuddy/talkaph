#!/usr/bin/env bash
# Read-only HTTP checks against a static preview or the live site.
#   bash scripts/smoke-test.sh http://127.0.0.1:8787
#   bash scripts/smoke-test.sh https://talkaph.<subdomain>.workers.dev
#   bash scripts/smoke-test.sh https://talkaph.com
set -u
BASE="${1:-http://127.0.0.1:8787}"
BASE="${BASE%/}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
pass=0
fail=0

check() { # path expected_status [content_type_substring]
  local res code ctype
  res=$(curl -s -o /dev/null -w "%{http_code} %{content_type}" "$BASE$1")
  code=${res%% *}
  ctype=${res#* }
  if [ "$code" = "$2" ] && { [ -z "${3:-}" ] || [[ "$ctype" == *"$3"* ]]; }; then
    echo "PASS $1 -> $code $ctype"
    pass=$((pass+1))
  else
    echo "FAIL $1 -> $code $ctype (wanted $2 ${3:-})"
    fail=$((fail+1))
  fi
}

check_header() { # path header-name expected-substring
  local got
  got=$(curl -s -D - -o /dev/null "$BASE$1" | tr -d '\r' | awk -v h="$2" 'BEGIN{IGNORECASE=1} tolower($0) ~ "^"tolower(h)":" { sub(/^[^:]+:[ \t]*/,""); print; exit }')
  if [[ "$got" == *"$3"* ]]; then
    echo "PASS $1 $2 contains $3"
    pass=$((pass+1))
  else
    echo "FAIL $1 $2=$got (wanted *$3*)"
    fail=$((fail+1))
  fi
}

# Public pages, private recording tools, and the not-found shell.
PAGES=(
  /
  /about
  /blog
  /blog/tagalog-phrases-for-tourists
  /blog/tagalog-phrases-for-ofw-families
  /blog/cebuano-phrases-for-cebu-trip
  /blog/ilonggo-phrases-iloilo-bacolod
  /contribute
  /learn
  /learn/cebuano
  /learn/ilonggo
  /learn/tagalog
  /privacy
  /record
  /record-cebuano
  /record-tagalog
)
for p in "${PAGES[@]}"; do
  check "$p" 200 text/html
done

check /ads.txt 200 text/plain
check /robots.txt 200 text/plain
check /sitemap.xml 200 xml
check /site.webmanifest 200 manifest
check /favicon.ico 200
check /apple-touch-icon.png 200 image/png
check /this-page-does-not-exist 404 text/html
check /learn/not-a-language 404 text/html
check /contact 404 text/html
# This repo does not generate an OG image. The live site 404s this path too.
check /opengraph-image 404

ads=$(curl -s "$BASE/ads.txt")
if [ "$ads" = "google.com, pub-6818717676578570, DIRECT, f08c47fec0942fa0" ] || [ "$ads" = $'google.com, pub-6818717676578570, DIRECT, f08c47fec0942fa0\n' ]; then
  echo "PASS /ads.txt body"
  pass=$((pass+1))
else
  echo "FAIL /ads.txt body"
  fail=$((fail+1))
fi

robots=$(curl -s "$BASE/robots.txt")
if [[ "$robots" == *"Sitemap: https://talkaph.com/sitemap.xml"* && "$robots" == *"Allow: /"* ]]; then
  echo "PASS /robots.txt sitemap"
  pass=$((pass+1))
else
  echo "FAIL /robots.txt sitemap"
  fail=$((fail+1))
fi

sitemap=$(curl -s "$BASE/sitemap.xml")
for loc in \
  "https://talkaph.com" \
  "https://talkaph.com/about" \
  "https://talkaph.com/blog" \
  "https://talkaph.com/blog/tagalog-phrases-for-tourists" \
  "https://talkaph.com/blog/tagalog-phrases-for-ofw-families" \
  "https://talkaph.com/blog/cebuano-phrases-for-cebu-trip" \
  "https://talkaph.com/blog/ilonggo-phrases-iloilo-bacolod" \
  "https://talkaph.com/contribute" \
  "https://talkaph.com/learn" \
  "https://talkaph.com/learn/cebuano" \
  "https://talkaph.com/learn/ilonggo" \
  "https://talkaph.com/learn/tagalog" \
  "https://talkaph.com/privacy"
do
  if [[ "$sitemap" == *"<loc>${loc}</loc>"* ]]; then
    echo "PASS sitemap $loc"
    pass=$((pass+1))
  else
    echo "FAIL sitemap missing $loc"
    fail=$((fail+1))
  fi
done
if printf '%s' "$sitemap" | grep -q '<loc>https://talkaph.com/record'; then
  echo "FAIL sitemap lists a /record URL"
  fail=$((fail+1))
else
  echo "PASS sitemap omits recording tools"
  pass=$((pass+1))
fi
if printf '%s' "$sitemap" | grep -q '<loc>[^<]*/</loc>'; then
  echo "FAIL sitemap has a trailing slash"
  fail=$((fail+1))
else
  echo "PASS sitemap has no trailing slashes"
  pass=$((pass+1))
fi

check_page_tags() { # path expected_canonical expect_noindex(0/1)
  local html canonical
  html=$(curl -s "$BASE$1")
  if [[ "$html" == *"G-MYMFYS2P5Z"* && "$html" == *"ca-pub-6818717676578570"* && "$html" == *"adsbygoogle.js"* ]]; then
    echo "PASS $1 analytics and adsense tags"
    pass=$((pass+1))
  else
    echo "FAIL $1 missing analytics or adsense tags"
    fail=$((fail+1))
  fi
  canonical=$(printf '%s' "$html" | grep -oE 'rel="canonical" href="[^"]+"' | head -1)
  if [ "$canonical" = "rel=\"canonical\" href=\"$2\"" ]; then
    echo "PASS $1 canonical $2"
    pass=$((pass+1))
  else
    echo "FAIL $1 canonical got: $canonical"
    fail=$((fail+1))
  fi
  if [ "$3" = "1" ]; then
    if [[ "$html" == *'content="noindex'* ]]; then
      echo "PASS $1 noindex"
      pass=$((pass+1))
    else
      echo "FAIL $1 expected noindex"
      fail=$((fail+1))
    fi
  fi
}

check_page_tags / "https://talkaph.com" 0
check_page_tags /about "https://talkaph.com/about" 0
check_page_tags /learn/tagalog "https://talkaph.com/learn/tagalog" 0
check_page_tags /blog "https://talkaph.com/blog" 0
check_page_tags /blog/tagalog-phrases-for-tourists "https://talkaph.com/blog/tagalog-phrases-for-tourists" 0
check_page_tags /blog/tagalog-phrases-for-ofw-families "https://talkaph.com/blog/tagalog-phrases-for-ofw-families" 0
check_page_tags /blog/cebuano-phrases-for-cebu-trip "https://talkaph.com/blog/cebuano-phrases-for-cebu-trip" 0
check_page_tags /blog/ilonggo-phrases-iloilo-bacolod "https://talkaph.com/blog/ilonggo-phrases-iloilo-bacolod" 0
check_page_tags /contribute "https://talkaph.com/contribute" 0
check_page_tags /record "https://talkaph.com/record" 1

# Contribute form is client-side. Confirm the built page still posts to the
# same Supabase table. Do not print the publishable key.
contrib_ok=0
html=$(curl -s "$BASE/contribute")
if [[ "$html" == *"giwjutrehtfhpvrmnjsy.supabase.co"* && "$html" == *"/rest/v1/contributions"* ]]; then
  contrib_ok=1
else
  while IFS= read -r src; do
    case "$src" in
      /*)
        js=$(curl -s "$BASE$src")
        if [[ "$js" == *"giwjutrehtfhpvrmnjsy.supabase.co"* && "$js" == *"/rest/v1/contributions"* ]]; then
          contrib_ok=1
          break
        fi
        ;;
    esac
  done < <(printf '%s' "$html" | grep -oE 'src="[^"]+"' | sed -E 's/^src="//; s/"$//')
fi
if [ "$contrib_ok" = "1" ]; then
  echo "PASS /contribute still posts to the Supabase contributions endpoint"
  pass=$((pass+1))
else
  echo "FAIL /contribute is missing the Supabase contributions request"
  fail=$((fail+1))
fi

# Trailing-slash redirects must stay 308 and keep the query string.
check_redir() { # path expected_code expected_location_suffix
  local headers code loc
  headers=$(curl -s -D - -o /dev/null "$BASE$1")
  code=$(printf '%s' "$headers" | tr -d '\r' | awk 'BEGIN{c=""} /^HTTP/{c=$2} END{print c}')
  loc=$(printf '%s' "$headers" | tr -d '\r' | awk 'BEGIN{IGNORECASE=1} tolower($1)=="location:" { sub(/^[^:]+:[ \t]*/,""); print; exit }')
  if [ "$code" = "$2" ] && [[ "$loc" == *"$3" ]]; then
    echo "PASS $1 -> $code $loc"
    pass=$((pass+1))
  else
    echo "FAIL $1 -> $code $loc (wanted $2 *$3)"
    fail=$((fail+1))
  fi
}
check_redir /about/ 308 /about
check_redir "/about/?x=1" 308 "/about?x=1"
check_redir /learn/tagalog/ 308 /learn/tagalog
check_redir "/blog/tagalog-phrases-for-tourists/?q=1" 308 "/blog/tagalog-phrases-for-tourists?q=1"
check_redir /blog/tagalog-phrases-for-ofw-families/ 308 /blog/tagalog-phrases-for-ofw-families
check_redir "/blog/cebuano-phrases-for-cebu-trip/?q=1" 308 "/blog/cebuano-phrases-for-cebu-trip?q=1"
check_redir /blog/ilonggo-phrases-iloilo-bacolod/ 308 /blog/ilonggo-phrases-iloilo-bacolod
check_redir /record-cebuano/ 308 /record-cebuano

# Cache headers from public/_headers.
check_header /tl_001_kamusta_ka.mp3 Cache-Control "max-age=604800"
check_header /tl_001_kamusta_ka.mp3 Content-Type "audio/mpeg"
check_header /ads.txt X-Content-Type-Options "nosniff"

# Every mp3 in public/, when the script is run from a checkout that has them.
if [ -d "$ROOT/public" ]; then
  mp3_fail=0
  mp3_n=0
  while IFS= read -r file; do
    name=$(basename "$file")
    mp3_n=$((mp3_n+1))
    res=$(curl -s -o /dev/null -w "%{http_code} %{content_type}" "$BASE/$name")
    code=${res%% *}
    ctype=${res#* }
    if [ "$code" != "200" ] || [[ "$ctype" != *"audio/mpeg"* ]]; then
      echo "FAIL /$name -> $code $ctype"
      mp3_fail=$((mp3_fail+1))
      fail=$((fail+1))
    else
      pass=$((pass+1))
    fi
  done < <(find "$ROOT/public" -name '*.mp3' | sort)
  if [ "$mp3_fail" = "0" ]; then
    echo "PASS $mp3_n mp3 files -> 200 audio/mpeg"
  else
    echo "FAIL $mp3_fail of $mp3_n mp3 files"
  fi
fi

# Client navigations request <path>.txt (static export flight data).
check /about.txt 200 text/plain
check /learn.txt 200 text/plain
check /learn/tagalog.txt 200 text/plain
check /blog.txt 200 text/plain
check /blog/tagalog-phrases-for-tourists.txt 200 text/plain
check /blog/tagalog-phrases-for-ofw-families.txt 200 text/plain
check /blog/cebuano-phrases-for-cebu-trip.txt 200 text/plain
check /blog/ilonggo-phrases-iloilo-bacolod.txt 200 text/plain
check /contribute.txt 200 text/plain
check /index.txt 200 text/plain
check /__next._head.txt 200 text/plain
check /learn/tagalog/__next._full.txt 200 text/plain

# Workers html_handling redirects extension URLs. Vercel returns 404 for these.
# INFO only, so this script still passes against today's Vercel site.
html_redir=$(curl -s -D - -o /dev/null "$BASE/about.html" | tr -d '\r' | awk 'BEGIN{c=""} /^HTTP/{c=$2} tolower($1)=="location:"{loc=$2} END{print c, loc}')
echo "INFO /about.html -> ${html_redir:-no redirect} (Cloudflare static assets: 307 /about; Vercel today: 404)"
index_redir=$(curl -s -D - -o /dev/null "$BASE/index.html" | tr -d '\r' | awk 'BEGIN{c=""} /^HTTP/{c=$2} tolower($1)=="location:"{loc=$2} END{print c, loc}')
echo "INFO /index.html -> ${index_redir:-no redirect} (Cloudflare static assets: 307 /; Vercel today: 404)"

# Hashed JS should be immutable. Discover one file from the homepage.
asset=$(curl -s "$BASE/" | grep -oE '/_next/static/[^"]+\.js' | head -1)
if [ -n "$asset" ]; then
  check "$asset" 200 javascript
  check_header "$asset" Cache-Control "immutable"
else
  echo "FAIL could not find a /_next/static script on /"
  fail=$((fail+1))
fi

if [[ "$BASE" == "https://talkaph.com" ]]; then
  w=$(curl -s -o /dev/null -D - "https://www.talkaph.com/learn?x=1" | tr -d '\r')
  echo "INFO www -> $(printf '%s' "$w" | awk 'BEGIN{c=""} /^HTTP/{c=$2} tolower($1)=="location:"{loc=$2} END{print c, loc}')"
  echo "INFO served by: $(curl -sI "$BASE/" | grep -iE '^(server|cf-ray|x-vercel-id):' | tr -d '\r' | tr '\n' ' ')"
fi

echo "----"
echo "$pass passed, $fail failed"
exit $([ "$fail" -eq 0 ] && echo 0 || echo 1)
