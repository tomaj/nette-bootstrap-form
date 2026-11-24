#!/usr/bin/env bash
# Build the VitePress site and check links at the real GitHub Pages base.
set -euo pipefail

cd "$(dirname "$0")/.."

base="/nette-bootstrap-form/"

# Private temp files: agents and CI jobs run this script in parallel.
work="$(mktemp -d "${TMPDIR:-/tmp}/nette-bootstrap-form-links.XXXXXX")"
chmod 700 "$work"
preview_log="$work/preview.log"
linkinator_log="$work/linkinator.log"
preview_pid=""

cleanup() {
  if [[ -n "$preview_pid" ]] && kill -0 "$preview_pid" 2>/dev/null; then
    kill "$preview_pid" 2>/dev/null || true
    wait "$preview_pid" 2>/dev/null || true
  fi
  rm -rf "$work"
}
trap cleanup EXIT

npm run docs:build

# A free port chosen by the OS (DOCS_LINK_PORT overrides it). The port is free when it is picked but
# could be taken before the preview binds it, so a preview that fails to start is retried on a new port.
free_port() {
  python3 -c 'import socket; s = socket.socket(); s.bind(("", 0)); print(s.getsockname()[1]); s.close()'
}

start_preview() {
  : > "$preview_log"
  ./node_modules/.bin/vitepress preview --host 127.0.0.1 --port "$port" >"$preview_log" 2>&1 &
  preview_pid=$!
  for _ in $(seq 1 40); do
    if ! kill -0 "$preview_pid" 2>/dev/null; then
      wait "$preview_pid" 2>/dev/null || true
      preview_pid=""
      return 1
    fi
    # the log line proves the server on this port is our preview, not another process
    if grep -q "localhost:${port}/" "$preview_log" && curl -sf -o /dev/null "http://127.0.0.1:${port}${base}"; then
      return 0
    fi
    sleep 0.25
  done
  return 1
}

started=0
for _ in 1 2 3; do
  port="${DOCS_LINK_PORT:-$(free_port)}"
  if start_preview; then
    started=1
    break
  fi
  if [[ -n "$preview_pid" ]]; then
    kill "$preview_pid" 2>/dev/null || true
    wait "$preview_pid" 2>/dev/null || true
    preview_pid=""
  fi
  if [[ -n "${DOCS_LINK_PORT:-}" ]]; then
    break
  fi
done

if [[ "$started" -ne 1 ]]; then
  echo "VitePress preview did not serve ${base} on port ${port}" >&2
  cat "$preview_log" >&2 || true
  exit 1
fi
echo "VitePress preview on http://127.0.0.1:${port}${base}"

# Edit links are produced by the VitePress editLink pattern. Requesting each
# one from GitHub trips the rate limit, so check that the file exists instead.
python3 - <<'PY'
import re
import sys
from pathlib import Path

prefix = "https://github.com/tomaj/nette-bootstrap-form/edit/master/docs/"
found: set[str] = set()
missing: list[str] = []
for page in Path(".vitepress/dist").rglob("*.html"):
    text = page.read_text(encoding="utf-8", errors="replace")
    for url in re.findall(re.escape(prefix) + r"[^\"'\s#\\]+", text):
        if ":path" in url or not url.endswith(".md"):
            continue
        relative = url[len(prefix):]
        found.add(relative)
        if not Path(relative).is_file():
            missing.append(f"{url} ({page})")
if not found:
    print("No generated GitHub edit links found in the built site", file=sys.stderr)
    sys.exit(1)
if missing:
    print("Edit link target is missing:", file=sys.stderr)
    for item in missing:
        print(item, file=sys.stderr)
    sys.exit(1)
print(f"ok {len(found)} edit links match files on disk")
PY

# Blob and tree links point at this repository. Requesting each one trips
# GitHub's rate limit, and links added by a pull request 404 until it is
# merged, so check that the file or folder exists in the checkout instead.
python3 - <<'PY'
import re
import sys
from pathlib import Path

repo = Path("..")
kinds = {
    "blob": ("https://github.com/tomaj/nette-bootstrap-form/blob/master/", Path.is_file),
    "tree": ("https://github.com/tomaj/nette-bootstrap-form/tree/master/", Path.is_dir),
}
pages = [(page, page.read_text(encoding="utf-8", errors="replace")) for page in Path(".vitepress/dist").rglob("*.html")]
for kind, (prefix, exists) in kinds.items():
    found: set[str] = set()
    missing: list[str] = []
    for page, text in pages:
        for url in re.findall(re.escape(prefix) + r"[^\"'\s#\\?]+", text):
            relative = url[len(prefix):].rstrip("/")
            found.add(relative)
            if not exists(repo / relative):
                missing.append(f"{url} ({page})")
    if missing:
        print(f"{kind.capitalize()} link target is missing:", file=sys.stderr)
        for item in missing:
            print(item, file=sys.stderr)
        sys.exit(1)
    print(f"ok {len(found)} {kind} links match the checkout")
PY

# github.com edit, blob and tree links are skipped so a 429 or 503 from GitHub
# cannot fail the check. Absolute links to the published site (canonical,
# og:url, og:image, sitemap) point at pages this crawl already checks
# locally; new pages only exist there after the next deploy.
skip_args=(
  --skip 'https://github\.com/tomaj/nette-bootstrap-form/edit/'
  --skip 'https://github\.com/tomaj/nette-bootstrap-form/blob/master/'
  --skip 'https://github\.com/tomaj/nette-bootstrap-form/tree/master/'
  --skip 'https://tomaj\.github\.io/nette-bootstrap-form/'
  # the rendered example forms in previews/ link to paths of an imaginary application (/sign/forgot)
  --skip '^http://127\.0\.0\.1:[0-9]+/(?!nette-bootstrap-form/)'
)

run_check() {
  npx --no-install linkinator "http://127.0.0.1:${port}${base}" \
    --recurse \
    --retry \
    --concurrency 1 \
    --timeout 20000 \
    --verbosity error \
    "${skip_args[@]}"
}

# 429 is a rate limit, not a broken link. 5xx from GitHub is retried a few times.
attempt=1
while true; do
  set +e
  run_check 2>&1 | tee "$linkinator_log"
  status=${PIPESTATUS[0]}
  set -e
  if [[ "$status" -eq 0 ]]; then
    break
  fi
  # no mapfile: macOS ships bash 3.2
  codes="$(grep -oE '\[[0-9]{3}\]' "$linkinator_log" | tr -d '[]' | sort -u || true)"
  if [[ -z "$codes" ]]; then
    exit "$status"
  fi
  only_rate_limit=1
  retryable=1
  for code in $codes; do
    if [[ "$code" != "429" ]]; then
      only_rate_limit=0
    fi
    case "$code" in
      429|500|502|503|504) ;;
      *) retryable=0 ;;
    esac
  done
  if [[ "$only_rate_limit" -eq 1 ]]; then
    echo "GitHub rate limited some links; not treating HTTP 429 as a failure." >&2
    break
  fi
  if [[ "$retryable" -eq 0 || "$attempt" -ge 3 ]]; then
    exit "$status"
  fi
  echo "GitHub returned a temporary error; retrying the link check (${attempt})..." >&2
  attempt=$((attempt + 1))
  sleep $((attempt * 8))
done
