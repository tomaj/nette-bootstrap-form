#!/usr/bin/env bash
# Runs one example against this checkout and compares its output with expected-output.txt:
#   examples/ci/example.sh all-controls
#   examples/ci/example.sh --update all-controls   # write the new output to expected-output.txt
# The example is copied to a temporary directory first, so the checkout stays untouched.
set -euo pipefail
examples="$(cd "$(dirname "$0")/.." && pwd)"
update=0
if [[ "${1:-}" == "--update" ]]; then
    update=1
    shift
fi
name="${1:?usage: $0 [--update] <example>}"
[[ -f "$examples/$name/run.php" ]] || { echo "fail: $examples/$name/run.php not found" >&2; exit 1; }
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
cp -R "$examples/$name" "$work/$name"
rm -rf "$work/$name/vendor" "$work/$name/composer.lock"
"$examples/ci/use-local-bootstrap-form.sh" "$work/$name"
(cd "$work/$name" && php -d error_reporting=-1 -d display_errors=stderr run.php) > "$work/actual.txt"
if [[ "$update" -eq 1 ]]; then
    cp "$work/actual.txt" "$examples/$name/expected-output.txt"
    echo "updated examples/$name/expected-output.txt"
    exit 0
fi
if ! diff -u "$examples/$name/expected-output.txt" "$work/actual.txt"; then
    echo "fail: the output of examples/$name differs from expected-output.txt (see the diff above)" >&2
    exit 1
fi
echo "ok examples/$name: output matches expected-output.txt"
