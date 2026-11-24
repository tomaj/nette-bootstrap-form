---
title: 'Example: custom wrappers'
description: 'A BootstrapRenderer configured on the instance, a col-md-4 + col-md-8 grid, a required marker, browser validation and one element per control error.'
---

# Custom wrappers

The renderer classes are `final`; you change the markup by setting `$wrappers` on an instance. This newsletter form uses a renderer created in one function, as you would in a form factory:

<<< @/../examples/custom-wrappers/run.php

## Preview

The grid is `col-md-*`, which applies from 992 px; the preview is laid out at that width:

<FormPreview name="custom-wrappers" :width="1000" />

| Change | `$wrappers` key | Result |
|---|---|---|
| 4 + 8 grid on medium screens | `label container`, `control container` | `div.col-md-4.control-label`, `div.col-md-8` |
| `*` after required labels | `label requiredsuffix` | `E-mail *` |
| one element per error | `control errorcontainer`, `control erroritem` | `div.help-block` with a `div.text-danger` per error |
| smaller help text | `control description` | `p.help-block.small` |
| browser validation | constructor `novalidate: false` | no `novalidate` on the form |

Every key is described in the [configuration reference](/guide/configuration).

## Output

<<< @/../examples/custom-wrappers/expected-output.txt{html}

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/custom-wrappers
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/custom-wrappers/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
