# Upgrading from 2.x to 3.0

3.0 keeps the rendered HTML of 2.x byte for byte: a form rendered by a 3.0 renderer has the same markup as with 2.1.1. The breaking changes are about the platform and the classes themselves.

## PHP 8.3 or newer

3.0 requires PHP 8.3 (`"php": "^8.3"`; 2.x allowed PHP 7.1+). nette/forms 3.2, which 2.1 already required, needs PHP 8.1 anyway.

Before (`composer.json`):

```json
"require": {
    "php": ">=7.1",
    "tomaj/nette-bootstrap-form": "^2.1"
}
```

After:

```json
"require": {
    "php": "^8.3",
    "tomaj/nette-bootstrap-form": "^3.0"
}
```
