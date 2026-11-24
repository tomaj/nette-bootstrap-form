---
title: 'Example: validation errors'
description: 'A registration form submitted with invalid values, validated by Nette and rendered by BootstrapRenderer with an alert-danger box, has-error groups and help blocks.'
---

# Validation errors

A registration form submitted with an invalid e-mail, an age under 18, a short password and the terms not accepted. Nette validates the submitted values; the renderer shows the result.

<<< @/../examples/validation-errors/run.php

In an application the POST data come from the browser. Here a `Nette\Http\Request` is built by hand: the `Sec-Fetch-Site` header is what a browser sends for a same-origin request (nette/forms refuses cross-origin POSTs), and `_form_` is the hidden field of a named form. [Testing your forms](/guide/testing#submitting-a-form-in-a-test) explains the technique.

## Preview

<FormPreview name="validation-errors" />

- The form error added in `onError` is in the `alert alert-danger` box above the controls.
- Each control with an error has `has-error` on its `form-group` and its message in a `help-block` under the input.
- The password has two help blocks: its description and its error.
- The valid name keeps its value; the password, as always in nette/forms, is not rendered back.

## Output

<<< @/../examples/validation-errors/expected-output.txt{html}

The full rendering shows only the form's own errors in the alert box. To list all errors there, render the parts with the `errors` mode; see [Validation and errors](/guide/errors#form-errors-and-control-errors).

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/validation-errors
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/validation-errors/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
