---
title: Examples
description: 'Eight runnable nette-bootstrap-form recipes with their code, the exact HTML they print and a live preview with Bootstrap 3 CSS, all tested in CI.'
---

# Examples

Each example is a small PHP project in [`examples/`](https://github.com/tomaj/nette-bootstrap-form/tree/master/examples): a `composer.json`, a `run.php` that builds a form and prints the HTML, and `expected-output.txt` with that HTML. Each page shows the code, a preview of the HTML with Bootstrap 3.4.1 CSS and the HTML itself.

<LinkCards :items="[
  { title: 'Three layouts', text: 'One contact form rendered by the horizontal, vertical and inline renderer.', link: '/examples/layouts' },
  { title: 'Every control type', text: 'Text, number, date, select, checkbox and radio lists, uploads, hidden fields and three kinds of buttons.', link: '/examples/all-controls' },
  { title: 'Inline filter', text: 'A GET filter above an order list, on one line.', link: '/examples/inline-filter' },
  { title: 'Validation errors', text: 'A registration form submitted with invalid values: alert, has-error and help blocks.', link: '/examples/validation-errors' },
  { title: 'Checkout with groups', text: 'Fieldsets with legends and descriptions, radio lists and help texts.', link: '/examples/checkout-groups' },
  { title: 'Button styles', text: 'Primary, default and your own btn classes, string, array and addClass().', link: '/examples/button-styles' },
  { title: 'Custom wrappers', text: 'A col-md-4 + col-md-8 grid, a required marker, browser validation and one element per error.', link: '/examples/custom-wrappers' },
  { title: 'Manual rendering', text: 'A sign-in form rendered part by part into a Bootstrap panel by a decorating renderer.', link: '/examples/manual-rendering' },
]" />

## Running an example

All examples need PHP 8.4 or newer and Composer. They do not need a web server, a database or a network connection except for `composer install`:

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/layouts
composer install
php run.php
```

Until 3.0.0 is tagged, the examples require `tomaj/nette-bootstrap-form: dev-master` with `"minimum-stability": "dev"` and `"prefer-stable": true`; after the release they switch to `^3.0`.

## How the examples are tested

The [`Examples` workflow](https://github.com/tomaj/nette-bootstrap-form/blob/master/.github/workflows/examples.yml) runs every example on each push and pull request:

1. `examples/ci/example.sh <name>` copies the example to a temporary directory.
2. `examples/ci/use-local-bootstrap-form.sh` adds the repository root as a Composer path repository, installs the package from it and fails if `vendor/` holds anything else. So a pull request runs the examples against its own code.
3. `php run.php` prints the HTML, which must be byte for byte the same as `expected-output.txt` (`diff -u`).

The previews on these pages are built from the same `expected-output.txt` files when the site is built (`docs/scripts/previews.mjs`), so a preview always shows the HTML that CI has checked. Run an example against your checkout with `examples/ci/example.sh layouts`; after an intended change in the output, `examples/ci/example.sh --update layouts` writes the new `expected-output.txt`.

The PHP snippets on the other pages of this site are run by `tests/DocsSnippetsTest.php` in the PHPUnit suite, and their documented output is compared too.
