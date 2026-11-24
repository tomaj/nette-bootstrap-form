---
title: Security
description: 'How to report a vulnerability in nette-bootstrap-form, the supported versions, and what to keep in mind about escaping, validation, CSRF and Bootstrap 3 when rendering forms.'
---

# Security

## Reporting a vulnerability

Do not open a public issue for a security vulnerability. Report it in private through [GitHub private vulnerability reporting](https://github.com/tomaj/nette-bootstrap-form/security/advisories/new), or by e-mail as described in the [security policy](https://github.com/tomaj/nette-bootstrap-form/blob/master/SECURITY.md), which also lists the supported versions and how fixes are disclosed.

| Version | Supported |
|---|---|
| 3.x | in development on `master` (not released yet) |
| 2.x | bug fixes and security fixes; security fixes only for six months after 3.0.0 is released |
| < 2.0 | no |

## What the renderers do and do not do

The renderers add CSS classes and wrapper elements. They do not output any user data themselves: labels, values, placeholders, descriptions and error messages are rendered by nette/forms and `Nette\Utils\Html`, which escape them exactly as with Nette's default renderer.

Things that are your responsibility:

- **`Html` descriptions, labels and errors are not escaped.** A `Nette\Utils\Html` object (or any `HtmlStringable`) passed as a description, a group label or an error is inserted as it is; see [Descriptions](/guide/errors#descriptions). Never build one from user input without escaping it.
- **Validate on the server.** `novalidate` and `netteForms.js` only change what happens in the browser. Nette validates the submitted data on the server whenever the form is processed, whatever the renderer.
- **CSRF.** nette/forms refuses cross-origin POST submissions by default (it checks the `Sec-Fetch-Site` header or its same-site cookie). For more, `$form->addProtection()` adds a token field; it is a hidden field, so the renderers put it into the hidden `<div>` before `</form>` like any other.
- **Bootstrap itself.** The renderers need only Bootstrap 3 **CSS**. Bootstrap 3 reached its end of life in 2019, and advisories published since then for its JavaScript plugins are not fixed in 3.4.1. If you load `bootstrap.js` 3.x, check those advisories for the plugins you use. Load files from a CDN with an `integrity` hash, as in [Getting started](/guide/getting-started#add-the-bootstrap-css).

## Supply chain

Releases are tagged from `master` and the GitHub release carries source archives with build provenance attestations (see [RELEASING.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/RELEASING.md)). The package has one runtime dependency, nette/forms. CI runs `composer audit`, CodeQL and OpenSSF Scorecard.
