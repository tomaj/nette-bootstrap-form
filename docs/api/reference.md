---
title: API reference
description: 'The public classes of nette-bootstrap-form, their constructor, render() and the $wrappers they start with.'
---

# API reference

Namespace `Tomaj\Form\Renderer`. The package has three public classes; each is a `final` subclass of [`Nette\Forms\Rendering\DefaultFormRenderer`](https://api.nette.org/forms/master/Nette/Forms/Rendering/DefaultFormRenderer.html) and implements `Nette\Forms\FormRenderer`.

| Class | Layout | Class added to `<form>` |
|---|---|---|
| `BootstrapRenderer` | horizontal: labels in `col-sm-3`, controls in `col-sm-9` | `form-horizontal` |
| `BootstrapVerticalRenderer` | vertical: label above the control | none |
| `BootstrapInlineRenderer` | inline: everything on one line | `form-inline` |

`DecoratesControls` in `src/` is an internal trait shared by the three classes; it is not part of the public API and may change in any release.

## Constructor

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer(novalidate: true);
```

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `$novalidate` | `bool` | `true` | Add `novalidate` to the `<form>` element, so the browser skips its HTML5 validation and Nette shows the errors. `false` keeps the browser validation. |

The same constructor exists on all three classes.

## `render()`

<!-- snippet: skip -->
```php
public function render(Nette\Forms\Form $form, ?string $mode = null): string
```

Adds the Bootstrap classes to the form and its controls, then renders it with `DefaultFormRenderer::render()`. `$mode` is `null` for the whole form, or `'begin'`, `'errors'`, `'ownerrors'`, `'body'` or `'end'` for one part. Calling it several times on the same form (or part by part) gives the same HTML; the classes are not added twice.

What changes on which control (details in [Controls](/guide/controls)):

- `<form>`: the form class (see the table above), `novalidate="novalidate"` unless disabled
- `TextBase` controls (text, password, text area, …), `SelectBox`, `MultiSelectBox`: `form-control`
- `Button` controls (submit, button, image): `btn btn-primary` for the first one without a `btn` class, `btn btn-default` for the following ones; buttons whose class contains `btn` are untouched
- `DateTimeControl`, `ColorPicker`, `UploadControl`, `HiddenField`: nothing
- `Checkbox`: wrapped in `<div class="checkbox">`
- `CheckboxList`, `RadioList`: each item wrapped in `<div class="checkbox">` / `<div class="radio">`

It returns the HTML as a string and throws nothing of its own; exceptions come only from nette/forms (for example a `nextTo` option naming a control that does not exist).

Usually you do not call `render()` yourself: set the renderer with `$form->setRenderer($renderer)` and render the form with `echo $form`, `$form->render()` or `{control form}` in Latte.

## `$wrappers`

<!-- snippet: skip -->
```php
public array $wrappers
```

The wrapper definitions of `DefaultFormRenderer` (see the [Nette documentation](https://doc.nette.org/en/forms/rendering)). Every key with its meaning is in the [configuration reference](/guide/configuration). Change them on the instance:

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer();
$renderer->wrappers['control']['container'] = 'div class=col-sm-8';
```

All three renderers start with these values:

| Key | Value |
|---|---|
| `error.container` | `div class="alert alert-danger"` |
| `error.item` | `p` |
| `group.container` / `group.label` / `group.description` | `fieldset` / `legend` / `p` |
| `pair.container` | `div class=form-group` |
| `pair..required` / `pair..error` | `required` / `has-error` |
| `control.description` | `span class=help-block` |
| `control.errorcontainer` | `span class=help-block` |
| `control.erroritem` | `''` (no element per error) |
| `control.requiredsuffix`, `label.requiredsuffix` | `''` |
| `label.suffix` | `null` |
| `hidden.container` | `div` |

They differ in these keys:

| Key | `BootstrapRenderer` | `BootstrapVerticalRenderer` | `BootstrapInlineRenderer` |
|---|---|---|---|
| `form.container` | `null` | `null` | `''` |
| `controls.container` | `div` | `null` | `''` |
| `control.container` | `div class=col-sm-9` | `''` | `null` |
| `label.container` | `div class="col-sm-3 control-label"` | `''` | `''` |

`null` and `''` both mean "no wrapper element".

## Inherited methods

The renderers inherit the public methods of `DefaultFormRenderer`, which `render()` calls for each part: `renderBegin()`, `renderEnd()`, `renderErrors(?Control $control = null, bool $own = true)`, `renderBody()`, `renderControls(Container|ControlGroup $parent)`, `renderPair(Control $control)`, `renderPairMulti(array $controls)`, `renderLabel(Control $control)`, `renderControl(Control $control)` and `getWrapper(string $name)`. They work on the form of the last `render()` call, and only `render()` adds the Bootstrap classes, so call `render($form, $mode)` with a mode instead of calling them directly.
