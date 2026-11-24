---
title: FAQ
description: 'Frequently asked questions about nette-bootstrap-form, Bootstrap 4 and 5, Latte, date inputs, buttons, errors, novalidate and subclassing the renderers.'
---

# FAQ

## Does it work with Bootstrap 4 or 5?

No. The renderers output [Bootstrap 3](https://getbootstrap.com/docs/3.4/css/#forms) markup: `form-group`, `control-label`, `help-block`, `has-error`, `btn-default`, `div.checkbox`. Bootstrap 4 and 5 use other classes (`form-check`, `invalid-feedback`, `is-invalid`, `mb-3`), so most of the look would be lost. You can get part of the way by changing [`$wrappers`](/guide/configuration), but the button and checkbox classes are fixed in the code. For Bootstrap 5 a dedicated renderer is the better choice.

## Which nette/forms versions are supported?

3.2 and newer 3.x versions (`"nette/forms": "^3.2"`), on PHP 8.4 or newer. CI runs the tests with the lowest and the latest allowed versions.

## Why does my date input not look like the other inputs?

`addDate()`, `addTime()`, `addDateTime()` and `addColor()` create controls that are not text inputs in nette/forms, and the renderers add `form-control` only to text inputs, text areas and selects. Add the class yourself with `->setHtmlAttribute('class', 'form-control')`; see [Controls](/guide/controls#date-time-and-colour-inputs) and [#33](https://github.com/tomaj/nette-bootstrap-form/issues/33).

## Why is my button not blue?

Only the first button without a `btn` class gets `btn-primary`. If an earlier button has no class, it is the primary one. If your button has any class containing `btn` (even `btn-lg` alone), the renderer leaves it as it is; give it the full classes, such as `btn btn-primary btn-lg`. See [Buttons](/guide/controls#buttons).

## Can I extend a renderer?

Not since 3.0: the classes are `final`. Configure `$wrappers` on an instance ([Customizing](/guide/customizing)) or wrap the renderer in your own `Nette\Forms\FormRenderer` ([Wrapping the renderer](/guide/customizing#wrapping-the-renderer)). [Upgrading to 3.0](/upgrade) shows both with before and after code.

## Why are the Bootstrap classes missing when I render the form in Latte?

`{form}`, `{label}`, `{input}` and `n:name` render controls without calling the renderer. Only `{control myForm}`, `echo $form` and `$form->render()` use it. Write the classes in the template, or render parts with the renderer; see [Nette application](/guide/nette-application#manual-rendering-in-latte).

## Where do the `text` and `button` classes come from?

From `$wrappers` (`control .text`, `.submit`, ...), inherited from Nette's default renderer. They have no meaning in Bootstrap; set those keys to `null` to drop them ([Customizing](/guide/customizing#dropping-the-text-and-button-classes)).

## Why does the browser not show its own validation bubbles?

The renderers add `novalidate` to the form by default, so Nette's validation shows the errors. Create the renderer with `novalidate: false` to keep the browser validation ([HTML5 validation](/guide/errors#html5-validation-novalidate)).

## Can I render a form twice, or with two renderers?

Rendering the same form again with the same renderer gives the same HTML; the classes are not added twice. Rendering it with a different renderer keeps the classes of the first one (for example `form-horizontal` on the `<form>`), because they are stored on the form and its controls. Build a new form for each layout, as [`examples/layouts`](/examples/layouts) does.

## Does the renderer escape my labels and values?

nette/forms escapes them, exactly as with the default renderer. `Html` objects are inserted as they are; see [Security](/security).

## How do I put two inputs side by side?

The `nextTo` option renders two controls in one pair, but both are full-width `form-control`s. For a real row (an input group, two columns) render that part of the form by hand in Latte; see [Several controls in one row](/guide/controls#several-controls-in-one-row).
