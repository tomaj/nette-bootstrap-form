---
title: 'Example: three layouts'
description: 'One contact form rendered by BootstrapRenderer, BootstrapVerticalRenderer and BootstrapInlineRenderer, with the HTML each one prints and a preview.'
---

# Three layouts

The same contact form (a required name and e-mail, a checkbox and a submit button) rendered by each of the three renderers. Use it to pick a layout: compare the previews, then the HTML.

<<< @/../examples/layouts/run.php

Each layout gets its own `Form` instance: the renderer adds classes to the controls of the form it renders, and a horizontal form's `form-horizontal` class would otherwise stay on the form when another renderer renders it.

## Preview

<FormPreview name="layouts" />

- `BootstrapRenderer` puts the labels in a `col-sm-3` column. The checkbox and the button have no label, so their label column is empty and they line up with the inputs.
- `BootstrapVerticalRenderer` renders the label above each control, with no grid.
- `BootstrapInlineRenderer` renders the same markup as the vertical one with `form-inline` on the form, so from 768 px everything is on one line.

## Output

<<< @/../examples/layouts/expected-output.txt{html}

The named forms (`new Form('horizontal')`) get ids such as `frm-horizontal-name`, so the three forms can be on one page, and a hidden `_form_` field that tells Nette which form was submitted.

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/layouts
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/layouts/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
