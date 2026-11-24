---
title: 'Example: inline filter'
description: 'A GET filter above an order list rendered on one line by BootstrapInlineRenderer, with a search box, a status select, a date and two buttons.'
---

# Inline filter

A filter above a list of orders. It is sent with GET, so the filter is in the URL and the filtered list can be bookmarked, and it fits on one line with `BootstrapInlineRenderer`.

<<< @/../examples/inline-filter/run.php

## Preview

<FormPreview name="inline-filter" />

From Bootstrap's `sm` breakpoint (768 px) the `form-group`s are `inline-block` and the inputs `width: auto`. On a phone they are stacked, as in the vertical layout.

`Clear` has `setValidationScope([])`, so it submits the form without validating it; nette/forms adds `formnovalidate` to it. Avoid naming a button `reset` or `submit`: those names collide with properties of the `<form>` element in the browser, and nette/forms renames them (to `_reset`).

The date input has no `form-control` ([#33](https://github.com/tomaj/nette-bootstrap-form/issues/33)); add it with `->setHtmlAttribute('class', 'form-control')` if you want it styled like the others.

## Output

<<< @/../examples/inline-filter/expected-output.txt{html}

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/inline-filter
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/inline-filter/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
