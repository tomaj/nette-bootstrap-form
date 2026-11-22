# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- **BC break:** minimum PHP version raised from 7.1 to 8.3 (`"php": "^8.3"`). The package already needed PHP 8.1+ through nette/forms 3.2.
- `Checkbox` controls use `getContainerPrototype()` instead of the deprecated `getSeparatorPrototype()` alias (same element, no change in output).

### Fixed
- Rendering no longer fails with a `TypeError` when a button's class is stored as an array: set with `addClass()` or as an array, and also when the same form is rendered a second time or part by part (`render($form, 'begin')`, `'body'`, ...), because the first render adds the `btn` classes that way. The existing classes are checked for `btn`; output for forms that rendered before is unchanged.

### Added
- PHPUnit test suite that renders forms with all three renderers and compares the HTML with the output from before the fix.
- GitHub Actions CI: tests on PHP 8.3–8.6 (plus prefer-lowest, nightly 8.7 allowed to fail), php-cs-fixer (PER-CS), PHPStan level max with strict rules, composer audit.
- Dependabot for Composer and GitHub Actions.
