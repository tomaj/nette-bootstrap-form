<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/public/logo-dark.svg">
    <img src="docs/public/logo.svg" width="96" height="96" alt="Nette Bootstrap Form logo">
  </picture>
</p>

# Nette Bootstrap Form

**Bootstrap renderers (horizontal, vertical, inline) for Nette Forms**

**Documentation: https://tomaj.github.io/nette-bootstrap-form/**

[Getting started](https://tomaj.github.io/nette-bootstrap-form/guide/getting-started) · [Renderers](https://tomaj.github.io/nette-bootstrap-form/guide/renderers) · [Examples](https://tomaj.github.io/nette-bootstrap-form/examples/) · [API reference](https://tomaj.github.io/nette-bootstrap-form/api/reference) · [Changelog](https://tomaj.github.io/nette-bootstrap-form/changelog)

[![Latest Stable Version](https://img.shields.io/packagist/v/tomaj/nette-bootstrap-form.svg)](https://packagist.org/packages/tomaj/nette-bootstrap-form)
[![CI](https://github.com/tomaj/nette-bootstrap-form/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/tomaj/nette-bootstrap-form/actions/workflows/ci.yml?query=branch%3Amaster)
[![Coverage Status](https://coveralls.io/repos/github/tomaj/nette-bootstrap-form/badge.svg?branch=master)](https://coveralls.io/github/tomaj/nette-bootstrap-form?branch=master)
[![PHPStan](https://img.shields.io/badge/PHPStan-level%20max-brightgreen.svg)](https://phpstan.org/)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/tomaj/nette-bootstrap-form/badge)](https://scorecard.dev/viewer/?uri=github.com/tomaj/nette-bootstrap-form)
[![Documentation](https://img.shields.io/badge/docs-3.x-4f46e5.svg)](https://tomaj.github.io/nette-bootstrap-form/)
[![License](https://img.shields.io/github/license/tomaj/nette-bootstrap-form.svg)](LICENSE)
[![PHP Version](https://img.shields.io/packagist/dependency-v/tomaj/nette-bootstrap-form/php.svg)](https://packagist.org/packages/tomaj/nette-bootstrap-form)

## What is Nette Bootstrap Form?

Nette Bootstrap Form is a set of form renderers for [Nette Forms](https://doc.nette.org/en/forms) that output [Bootstrap 3](https://getbootstrap.com/docs/3.4/css/#forms) form markup. Set a renderer on a form and every control gets the Bootstrap classes and wrappers, with no template code:

- `BootstrapRenderer`: horizontal form (`form-horizontal`, labels in `col-sm-3`, controls in `col-sm-9`)
- `BootstrapVerticalRenderer`: the default Bootstrap layout, label above the control
- `BootstrapInlineRenderer`: inline form (`form-inline`)

Text inputs, text areas and selects get `form-control`, the first button `btn btn-primary` and the others `btn btn-default` (buttons that already have a `btn` class are left alone), checkboxes and radio lists are wrapped for Bootstrap, and errors are shown in an `alert alert-danger` box.

## Installation

This library requires PHP 8.4 or later and nette/forms 3.2 or later.

```bash
composer require tomaj/nette-bootstrap-form
```

## Usage

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('name', 'Name')->setRequired();
$form->addSubmit('send', 'Send');

$form->setRenderer(new BootstrapRenderer());

echo $form;
```

Use `BootstrapVerticalRenderer` or `BootstrapInlineRenderer` the same way. All three take an optional `$novalidate` argument (default `true`); pass `false` to keep the browser's HTML5 validation. Read the [documentation](https://tomaj.github.io/nette-bootstrap-form/) for the rendered markup, every control type, errors and customizing the wrappers, and the [examples](https://tomaj.github.io/nette-bootstrap-form/examples/) for runnable forms with their HTML and a preview (the code is in [`examples/`](examples/), tested in CI).

## Upgrading

See [UPGRADE-3.0.md](UPGRADE-3.0.md) for upgrading from 2.x and [CHANGELOG.md](CHANGELOG.md) for all changes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities in private, as described in [SECURITY.md](SECURITY.md). Do not open a public issue.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information. Versions up to 2.x were released under LGPL-2.0-or-later.
