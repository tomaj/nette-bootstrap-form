---
title: Contributing
description: 'How to contribute to nette-bootstrap-form, run the checks and change the documentation.'
---

# Contributing

Pull requests are welcome on [tomaj/nette-bootstrap-form](https://github.com/tomaj/nette-bootstrap-form). [CONTRIBUTING.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/CONTRIBUTING.md) is the project policy; this page matches it. Participation follows the [code of conduct](https://github.com/tomaj/nette-bootstrap-form/blob/master/CODE_OF_CONDUCT.md). Security vulnerabilities are reported in private, see the [security policy](https://github.com/tomaj/nette-bootstrap-form/blob/master/SECURITY.md).

## Changes we can merge

- Follow [PER Coding Style](https://www.php-fig.org/per/coding-style/). `composer phpcs` checks `src` and `tests`.
- Add tests for every behaviour change. The rendering tests compare the HTML byte for byte with `tests/fixtures/<renderer>/<case>.html`; a change in the output updates the fixture in the same pull request and is described in the changelog.
- Document behaviour changes in `README.md`, these pages and `CHANGELOG.md`.
- [Semantic Versioning](https://semver.org/): a different HTML output for an existing form is a breaking change and waits for the next major version.
- One pull request per change, from a feature branch.

## Checks

```bash
composer install
composer check      # code style, PHPStan, Rector, tests
composer coverage   # HTML and Clover coverage in build/ (Xdebug or PCOV)
composer infection  # mutation testing
```

CI runs the tests on PHP 8.4 (also with the lowest dependencies), 8.5 and 8.6, plus a nightly PHP 8.7 that may fail. PHP 8.6 also checks the statement coverage and runs Infection.

## Documentation

The site is built with [VitePress](https://vitepress.dev/) from `docs/`:

```bash
cd docs
npm ci
npm run docs:dev    # local preview
npm run docs:links  # build and check every link
```

Every `php` code block in these pages, `README.md` and `UPGRADE-3.0.md` is run by `tests/DocsSnippetsTest.php` in the PHPUnit suite. A block marked with `<!-- snippet: skip -->` is not run; an `html` block marked with `<!-- snippet: output -->` must match the output of the PHP block before it.

### Examples

The [examples](/examples/) live in `examples/<name>/` (`composer.json`, `run.php`, `expected-output.txt`). The example pages include their files with `<<< @/../examples/<name>/run.php`, so the docs show the tested code. `npm run docs:build` first runs `scripts/previews.mjs`, which turns every `expected-output.txt` into `public/previews/<name>.html` with Bootstrap 3.4.1 CSS (vendored in `public/vendor/`) for the `<FormPreview>` component.

```bash
examples/ci/example.sh layouts            # run one example against this checkout, diff the output
examples/ci/example.sh --update layouts   # write the new output after an intended change
```

A new example needs a page in `docs/examples/`, an entry in the sidebar (`docs/.vitepress/config.mts`) and in the matrix of `.github/workflows/examples.yml`.

### Artwork

The logo, favicon, hero illustration, feature icons and diagrams are drawn in `docs/scripts/brand-svg.mjs`, in a light and a dark variant. After a change:

```bash
cd docs
node scripts/brand-svg.mjs                    # SVG files in public/
CHROME_PATH=/path/to/chrome node scripts/brand-png.mjs   # favicon PNGs, favicon.ico, og.png
npm run check:svg                             # every SVG is well-formed XML
```

## Releases

Maintainers publish releases by pushing a version tag, as described in [RELEASING.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/RELEASING.md).
