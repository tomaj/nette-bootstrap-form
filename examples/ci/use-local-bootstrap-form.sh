#!/usr/bin/env bash
# Points an example project at this checkout of nette-bootstrap-form instead of Packagist:
#   examples/ci/use-local-bootstrap-form.sh /path/to/project
# Adds a path repository for the repository root, requires tomaj/nette-bootstrap-form:dev-master
# from it and installs the project. Used by the Examples workflow, so a pull request runs the
# examples against its own code. It rewrites the project's composer.json: run it on a copy.
set -euo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"
project="${1:?usage: $0 /path/to/project}"
cd "$project"
# shellcheck disable=SC2016 # $argv is PHP, not shell
# json_encode, so a checkout path with quotes or backslashes still gives valid JSON
repository="$(php -r 'echo json_encode(["type" => "path", "url" => $argv[1], "options" => ["symlink" => false, "versions" => ["tomaj/nette-bootstrap-form" => "dev-master"]]], JSON_UNESCAPED_SLASHES);' "$root")"
composer config repositories.nette-bootstrap-form "$repository"
composer config minimum-stability dev
composer config prefer-stable true
composer require --no-interaction --no-progress --with-all-dependencies tomaj/nette-bootstrap-form:dev-master
# fail when Composer took the package from anywhere else
diff -rq "$root/src" vendor/tomaj/nette-bootstrap-form/src > /dev/null \
    || { echo "fail: vendor/tomaj/nette-bootstrap-form is not this checkout" >&2; exit 1; }
echo "tomaj/nette-bootstrap-form installed from $root"
