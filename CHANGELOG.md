# Change Log
All notable changes to this project will be documented in this file.
Updates should follow the [Keep a CHANGELOG](http://keepachangelog.com/) principles.

## [Unreleased][unreleased]

### Changed
- **BREAKING CHANGE**: minimum PHP version raised from 7.1 to 8.3 (`"php": "^8.3"`). The package already needed PHP 8.1+ through nette/forms 3.2. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))
- `Checkbox` controls use `getContainerPrototype()` instead of the deprecated `getSeparatorPrototype()` alias (same element, no change in output). ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))

### Fixed
- Rendering no longer fails with a `TypeError` when a button's class is stored as an array: set with `addClass()` or as an array, and also when the same form is rendered a second time or part by part (`render($form, 'begin')`, `'body'`, ...), because the first render adds the `btn` classes that way. The existing classes are checked for `btn`; output for forms that rendered before is unchanged. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))

### Added
- PHPUnit test suite that renders forms with all three renderers and compares the HTML with the output from before the fix. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))
- GitHub Actions CI: tests on PHP 8.3–8.6 (plus prefer-lowest, nightly 8.7 allowed to fail), php-cs-fixer (PER-CS), PHPStan level max with strict rules, composer audit. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))
- Dependabot for Composer and GitHub Actions. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))

## [2.1.1] - 2026-03-26

### Fixed
- PHP 8.4: `render()` declares `?string $mode = null` explicitly, so the "Implicitly marking parameter as nullable is deprecated" notice is gone. ([#19](https://github.com/tomaj/nette-bootstrap-form/pull/19))

## [2.1.0] - 2024-02-19

### Changed
- **BREAKING CHANGE**: requires `nette/forms` `^3.2` (was `^3.0`). Upgrade nette/forms together with this package. ([#17](https://github.com/tomaj/nette-bootstrap-form/pull/17))
- **BREAKING CHANGE**: the `$wrappers` property of all three renderers is typed `public array $wrappers`, as in nette/forms 3.2 `DefaultFormRenderer`. A subclass that redeclares `$wrappers` must declare it as `array` too. ([#17](https://github.com/tomaj/nette-bootstrap-form/pull/17))

### Fixed
- Using the renderers with nette/forms 3.2 no longer fails with "Type of `$wrappers` must be array". ([#17](https://github.com/tomaj/nette-bootstrap-form/pull/17))

## [2.0.1] - 2022-01-11

### Fixed
- PHP 8.1: rendering a button without a CSS class no longer triggers the "Passing null to parameter of type string" deprecation in `strpos()`. ([#15](https://github.com/tomaj/nette-bootstrap-form/pull/15))

## [2.0.0] - 2019-03-29

### Changed
- **BREAKING CHANGE**: requires PHP 7.1+ and `nette/forms` `^3.0` (was PHP 5.3.7+ and nette/forms `~2.3`). Stay on 1.x for nette/forms 2.x. ([#14](https://github.com/tomaj/nette-bootstrap-form/pull/14))
- **BREAKING CHANGE**: native types on the renderers: `__construct(bool $novalidate = true)` and `render(Form $form, string $mode = null): string`. Subclasses that override `render()` must use the same signature. ([#14](https://github.com/tomaj/nette-bootstrap-form/pull/14))
- The `license` field in composer.json uses the SPDX identifier `LGPL-2.0-or-later` (was `LGPL`).

## [1.3.0] - 2017-08-28

### Added
- All three renderers accept a `$novalidate` constructor argument (`new BootstrapRenderer(false)`) to keep the browser's HTML5 validation. The default stays `true`, so existing forms still get `novalidate`. ([#13](https://github.com/tomaj/nette-bootstrap-form/pull/13))

## [1.2.0] - 2016-02-07

### Added
- `BootstrapVerticalRenderer`: the default Bootstrap layout with the label and the control on separate lines. ([#9](https://github.com/tomaj/nette-bootstrap-form/pull/9))
- Buttons that already have a `btn` class keep their own classes instead of getting `btn btn-primary`/`btn btn-default`. ([#1](https://github.com/tomaj/nette-bootstrap-form/pull/1), [#2](https://github.com/tomaj/nette-bootstrap-form/pull/2))

### Fixed
- The renderers add `form-horizontal`/`form-inline` to the form's classes instead of replacing them, so classes such as `ajax` are kept. ([#3](https://github.com/tomaj/nette-bootstrap-form/pull/3))

## [1.1.0] - 2015-07-07

### Changed
- `BootstrapRenderer`: the controls container and the hidden-fields container are plain `<div>`s instead of `<div class="col-sm-12">`, so the horizontal form no longer wraps its rows in an extra full-width column.

## [1.0.0] - 2015-07-06

### Added
- Initial release: Bootstrap 3 renderers for Nette Forms 2.3 (PHP 5.3.7+). `BootstrapRenderer` renders a horizontal form (`form-horizontal`, labels in `col-sm-3`, controls in `col-sm-9`), `BootstrapInlineRenderer` an inline form (`form-inline`). Text inputs and selects get `form-control`, the first button `btn btn-primary` and the others `btn btn-default`, checkboxes and radio lists are wrapped for Bootstrap, errors are shown in an `alert alert-danger` box, and the form gets `novalidate`.

[unreleased]: https://github.com/tomaj/nette-bootstrap-form/compare/2.1.1...HEAD
[2.1.1]: https://github.com/tomaj/nette-bootstrap-form/compare/2.1.0...2.1.1
[2.1.0]: https://github.com/tomaj/nette-bootstrap-form/compare/2.0.1...2.1.0
[2.0.1]: https://github.com/tomaj/nette-bootstrap-form/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/tomaj/nette-bootstrap-form/compare/1.3.0...2.0.0
[1.3.0]: https://github.com/tomaj/nette-bootstrap-form/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/tomaj/nette-bootstrap-form/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/tomaj/nette-bootstrap-form/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/tomaj/nette-bootstrap-form/releases/tag/1.0.0
