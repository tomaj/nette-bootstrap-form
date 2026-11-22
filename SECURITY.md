# Security Policy

## Supported Versions

Security fixes are provided for the lines below.

| Version | Supported |
| ------- | --------- |
| 3.x     | In development on `master` (not released yet) |
| 2.x     | Yes: bug fixes and security fixes |
| < 2.0   | No |

2.x is the current stable line. When 3.0.0 is released, 3.x becomes the stable line and 2.x gets security fixes only, for six months after the 3.0.0 release date; there is no 2.x maintenance branch, so such a fix is released from a branch created from the last 2.x tag. Versions older than 2.0 do not receive security updates.

## Reporting a Vulnerability

Do not open a public GitHub issue for a security vulnerability.

The preferred way to report a vulnerability is [GitHub private vulnerability reporting](https://github.com/tomaj/nette-bootstrap-form/security/advisories/new).

If you cannot use private vulnerability reporting, email the details to **tomasmajer@gmail.com**.

Please include:

- A description of the vulnerability
- Steps to reproduce, or a proof of concept
- The nette-bootstrap-form and nette/forms versions
- The potential impact
- A suggested fix, if you have one

### Response

You will receive an acknowledgement within 14 days.

### Coordinated disclosure

We follow coordinated disclosure. Please give us time to prepare a fix before discussing the issue in public.

When a fix is ready, we publish a [GitHub Security Advisory](https://github.com/tomaj/nette-bootstrap-form/security/advisories) and record the security fix in the [CHANGELOG](CHANGELOG.md).

## Security considerations

The renderers turn a Nette form into HTML. They only add CSS classes and wrapper elements; labels, values, descriptions and error messages are escaped by nette/forms and `Nette\Utils\Html`, exactly as with the default renderer.

- Report anything that lets user input (a default value, a submitted value, an error message) escape that escaping when rendered through one of these renderers.
- Content you pass as an `Html` object (for example `Html::el()->setHtml(...)` as a label or description) is output as-is by design; never build it from untrusted input.
- The renderers add `novalidate` by default, so the browser skips HTML5 validation. Nette's server-side validation still runs; never rely on client-side validation alone.
