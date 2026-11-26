---
title: 'Example: every control type'
description: 'Every nette/forms control type, from text and number inputs to date pickers, checkbox lists, uploads, hidden fields and image buttons, rendered by BootstrapRenderer.'
---

# Every control type

A profile form with one control of every type that nette/forms has, rendered by the horizontal renderer. It is the reference for what the renderer adds to which control; the table is in [Controls](/guide/controls#what-each-control-gets).

<<< @/../examples/all-controls/run.php

## Preview

<FormPreview name="all-controls" />

What to look for:

- Text, password, e-mail, number, date, time and date-time inputs, the text area and both selects have `form-control`.
- The colour input does **not**: Bootstrap 3 has no style for it, so it keeps the browser's look; see [Date, time and colour inputs](/guide/controls#date-time-and-colour-inputs).
- The checkbox is wrapped in `div.checkbox`, each item of the checkbox list in `div.checkbox` and each radio in `div.radio`.
- The file inputs have only the `text` class from `$wrappers`. Their size and count limits are set explicitly, because the defaults come from `php.ini` and would differ between machines.
- The three buttons share one `form-group`: the submit button is `btn-primary`, the button and the image button `btn-default`.
- The hidden field is rendered in a `<div>` just before `</form>`, after the `_form_` field.

## Output

<<< @/../examples/all-controls/expected-output.txt{html}

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/all-controls
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/all-controls/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
