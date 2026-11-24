---
title: 'Example: button styles'
description: 'Which Bootstrap classes the renderers give to buttons, the primary and default style, and buttons with their own btn classes set as a string, with addClass() or without btn.'
---

# Button styles

The renderers give the first button without a `btn` class `btn btn-primary` and every following one `btn btn-default`. A button whose class already contains `btn` is left alone and does not use up the primary style. This form has one button of each kind:

<<< @/../examples/button-styles/run.php

## Preview

<FormPreview name="button-styles" />

| Button | Class set in PHP | Rendered class |
|---|---|---|
| Save | none | `btn btn-primary button` |
| Delete | `btn btn-danger` | `btn btn-danger button` |
| Save as draft | `js-draft` | `js-draft btn btn-default button` |
| Cancel | `btn btn-link` with `addClass()` | `btn btn-link button` |
| Preview | none (`addButton()`) | `btn btn-default button` |

The trailing `button` class comes from the `control .submit` and `.button` entries of `$wrappers` (see [Configuration](/guide/configuration#control)).

## Output

<<< @/../examples/button-styles/expected-output.txt{html}

The buttons follow each other, so they share one `form-group`. `Cancel` skips validation (`setValidationScope([])`), which nette/forms renders as `formnovalidate`.

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/button-styles
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/button-styles/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
