# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- **BC break:** minimum PHP version raised from 7.1 to 8.3 (`"php": "^8.3"`). The package already needed PHP 8.1+ through nette/forms 3.2.
- `Checkbox` controls use `getContainerPrototype()` instead of the deprecated `getSeparatorPrototype()` alias (same element, no change in output).

### Fixed
- Rendering no longer fails with a `TypeError` when a button's class was set with `Html::addClass()` (class attribute stored as an array); the existing classes are now checked for `btn`.

### Added
- GitHub Actions CI: lint on PHP 8.3–8.6 (plus prefer-lowest, nightly 8.7 allowed to fail), php-cs-fixer (PER-CS), PHPStan with strict rules, composer audit.
- Dependabot for Composer and GitHub Actions.
