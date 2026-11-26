# Change Log
All notable changes to this project will be documented in this file.
Updates should follow the [Keep a CHANGELOG](http://keepachangelog.com/) principles.

## [Unreleased][unreleased]

### Changed
- **BREAKING CHANGE**: licence changed from LGPL-2.0-or-later to MIT, like the other tomaj packages. `composer.json` declares `"license": "MIT"`, and the `LICENSE` file is added and shipped in the Composer dist archive. Versions up to 2.x stay under LGPL-2.0-or-later. ([#29](https://github.com/tomaj/nette-bootstrap-form/issues/29))
- **BREAKING CHANGE**: date and time inputs (`addDate()`, `addTime()`, `addDateTime()`, `Nette\Forms\Controls\DateTimeControl`) get `form-control` in all three renderers, so Bootstrap 3 styles them like the text inputs; 2.x rendered them without a class. Colour inputs (`addColor()`) still get no class, because Bootstrap 3 has no style for them. This is the only change in the rendered HTML from 2.x; see [UPGRADE-3.0.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/UPGRADE-3.0.md). ([#33](https://github.com/tomaj/nette-bootstrap-form/issues/33))
- **BREAKING CHANGE**: minimum PHP version raised from 7.1 to 8.4 (`"php": "^8.4"`). The package already needed PHP 8.1+ through nette/forms 3.2. Stay on 2.x for older PHP versions. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20), [#24](https://github.com/tomaj/nette-bootstrap-form/issues/24))
- **BREAKING CHANGE**: `BootstrapRenderer`, `BootstrapVerticalRenderer` and `BootstrapInlineRenderer` are `final`. Instead of subclassing a renderer to change `$wrappers`, change them on the instance (`$renderer->wrappers['pair']['container'] = ...`) or wrap the renderer in your own `Nette\Forms\FormRenderer`; see [UPGRADE-3.0.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/UPGRADE-3.0.md). The rendered HTML is unchanged. ([#25](https://github.com/tomaj/nette-bootstrap-form/issues/25))
- All files declare `strict_types`; `render()` has `#[\Override]`, `$novalidate` is a promoted `readonly` property, and the control decoration shared by the three renderers lives in one internal trait. No change in output. ([#25](https://github.com/tomaj/nette-bootstrap-form/issues/25))
- `Checkbox` controls use `getContainerPrototype()` instead of the deprecated `getSeparatorPrototype()` alias (same element, no change in output). ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))
- Autoloading uses PSR-4 (`Tomaj\Form\Renderer\` → `src/`) instead of a classmap. Class names are unchanged. ([#21](https://github.com/tomaj/nette-bootstrap-form/issues/21))
- The Composer dist archive contains only `src/`, `composer.json` and the README, LICENSE, CHANGELOG and UPGRADE files; tests, fixtures and tool configs are no longer installed into `vendor/`. ([#21](https://github.com/tomaj/nette-bootstrap-form/issues/21))

### Fixed
- Rendering no longer fails with a `TypeError` when a button's class is stored as an array: set with `addClass()` or as an array, and also when the same form is rendered a second time or part by part (`render($form, 'begin')`, `'body'`, ...), because the first render adds the `btn` classes that way. The existing classes are checked for `btn`; output for forms that rendered before is unchanged. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))

### Added
- PHPUnit test suite that renders forms with all three renderers and compares the HTML with the output from before the fix. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))
- Tests for `novalidate: false`, the form class added next to existing classes, class lists given as arrays of strings and `$wrappers` changed on the instance; PHPUnit 13, 95 % statement coverage required in CI (100 % today) and mutation testing with Infection (`minMsi` and `minCoveredMsi` 95). ([#26](https://github.com/tomaj/nette-bootstrap-form/issues/26))
- GitHub Actions CI: tests on PHP 8.4–8.6 (plus prefer-lowest, nightly 8.7 allowed to fail), php-cs-fixer (PER-CS), PHPStan level max with strict rules, Rector, composer audit, statement coverage threshold with Coveralls upload. Release workflow (notes from the CHANGELOG, source archives with build provenance attestations), CodeQL and OpenSSF Scorecard. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20), [#22](https://github.com/tomaj/nette-bootstrap-form/issues/22))
- Dependabot for Composer and GitHub Actions. ([#20](https://github.com/tomaj/nette-bootstrap-form/pull/20))
- Rector (PHP 8.4 set, dead code, code quality, type declarations, early return), PHP-CS-Fixer with `declare_strict_types`, PHPStan `checkMissingOverrideMethodAttribute` and `checkUninitializedProperties`; composer scripts `rector`, `rector-fix`, `coverage`, `infection` and `check` with descriptions. ([#23](https://github.com/tomaj/nette-bootstrap-form/issues/23))
- Documentation site at https://tomaj.github.io/nette-bootstrap-form/ (getting started, renderers with their rendered HTML, API reference with the `$wrappers` of each renderer, upgrading to 3.0, changelog). Every PHP snippet in the docs, README and UPGRADE file is run by the test suite, and the links are checked in CI. ([#27](https://github.com/tomaj/nette-bootstrap-form/issues/27))
- Documentation site at presentation level: own logo, favicon set, OG image and illustrations, pages for controls, validation and errors, customizing, the `$wrappers` configuration reference, Nette application integration, testing, FAQ and security, and eight runnable examples in `examples/` (layouts, every control type, inline filter, validation errors, groups, buttons, custom wrappers, manual rendering) whose output is compared with `expected-output.txt` in the new `Examples` workflow and shown on the site with a Bootstrap 3 preview. ([#32](https://github.com/tomaj/nette-bootstrap-form/issues/32))
- Slovak translation of the documentation site ([#35](https://github.com/tomaj/nette-bootstrap-form/issues/35))
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` (supported versions, private vulnerability reporting), `RELEASING.md`, `UPGRADE-3.0.md`, issue and pull request templates. ([#21](https://github.com/tomaj/nette-bootstrap-form/issues/21))

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
