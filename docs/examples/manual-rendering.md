---
title: 'Example: manual rendering'
description: 'A sign-in form rendered part by part (begin, errors, body, end) into a Bootstrap panel, by a renderer that wraps BootstrapVerticalRenderer and adds an ajax class.'
---

# Manual rendering

A sign-in form placed into a Bootstrap panel. The form is rendered part by part, so the panel's markup can go around it, and by a small renderer that wraps `BootstrapVerticalRenderer` to add an `ajax` class: the Bootstrap renderers are `final`, so this is how you change the form before they render it.

<<< @/../examples/manual-rendering/run.php

## Preview

<FormPreview name="manual-rendering" />

- `AjaxFormRenderer` implements `Nette\Forms\FormRenderer`, so it can be set with `$form->setRenderer()` like any renderer; here it is called directly.
- `begin` prints the `<form>` tag, `errors` the alert with all errors, `body` the pairs, `end` the hidden fields and `</form>`.
- The first `render()` call decorates the controls, so the later parts already have the Bootstrap classes.

## Output

<<< @/../examples/manual-rendering/expected-output.txt{html}

The same in a Latte template is in [Nette application](/guide/nette-application#rendering-parts-in-a-template).

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/manual-rendering
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/manual-rendering/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
