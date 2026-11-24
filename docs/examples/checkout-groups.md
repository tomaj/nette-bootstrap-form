---
title: 'Example: checkout with groups'
description: 'A checkout form split into fieldsets with legends and descriptions, radio lists for delivery and payment, help texts and a button group, rendered by BootstrapRenderer.'
---

# Checkout with groups

A checkout form split into groups with `addGroup()`. Each group becomes a `<fieldset>` with a `<legend>`; a group description is a `<p>` under the legend, and control descriptions are `help-block`s.

<<< @/../examples/checkout-groups/run.php

## Preview

<FormPreview name="checkout-groups" />

- Every group has its own `div` controls container (the horizontal renderer's `controls container`) inside the fieldset.
- The last group has no label, so its fieldset has no legend; it keeps the terms and the buttons apart from the payment fields.
- `Back to cart` has `setValidationScope([])`, so it leaves without validating the form, and gets `btn-default` because it is the second button.

## Output

<<< @/../examples/checkout-groups/expected-output.txt{html}

Groups are rendered in the order they were added. Controls added before the first `addGroup()` are not in any group and are rendered after all groups.

## Run it

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/checkout-groups
composer install
php run.php
```

The output is compared with [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/checkout-groups/expected-output.txt) in CI on every pull request; see [how the examples are tested](/examples/#how-the-examples-are-tested).
