---
title: Configuration reference
description: 'The constructor option and every $wrappers key of BootstrapRenderer, BootstrapVerticalRenderer and BootstrapInlineRenderer, with the value each one starts with and what it controls.'
---

# Configuration reference

The renderers have one constructor option and the public `$wrappers` array. There is nothing to register in a DI container and no global state.

## Constructor

```php
use Tomaj\Form\Renderer\BootstrapInlineRenderer;
use Tomaj\Form\Renderer\BootstrapRenderer;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$horizontal = new BootstrapRenderer();
$vertical = new BootstrapVerticalRenderer(novalidate: true);
$inline = new BootstrapInlineRenderer(novalidate: false);
```

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `$novalidate` | `bool` | `true` | Add `novalidate="novalidate"` to the `<form>` element, so the browser skips its HTML5 validation and Nette's validation shows the errors. `false` keeps the browser validation. See [HTML5 validation](/guide/errors#html5-validation-novalidate). |

The value is a `private readonly` property: it cannot be changed after the renderer is created.

## `$wrappers`

`public array $wrappers`, the same array as in `Nette\Forms\Rendering\DefaultFormRenderer`, with values for Bootstrap 3. A value is an element definition for `Nette\Utils\Html::el()` (`div class=col-sm-9`, `div class="col-sm-3 control-label"`), a class name (keys starting with a dot), a text (`suffix`, `requiredsuffix`), or `null`/`''` for "nothing". Change it on the instance before rendering:

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer();
$renderer->wrappers['control']['container'] = 'div class=col-sm-8';
```

<img class="diagram only-light" src="/diagrams/wrappers-anatomy-light.svg" alt="One label and control pair of BootstrapRenderer: div.form-group (pair container, with required and has-error from pair .required and pair .error) holds div.col-sm-3.control-label (label container) around the label, and div.col-sm-9 (control container) around the input, the description help-block and the error help-block." width="760" height="340">
<img class="diagram only-dark" src="/diagrams/wrappers-anatomy-dark.svg" alt="One label and control pair of BootstrapRenderer: div.form-group (pair container, with required and has-error from pair .required and pair .error) holds div.col-sm-3.control-label (label container) around the label, and div.col-sm-9 (control container) around the input, the description help-block and the error help-block." width="760" height="340">

In the tables, H is `BootstrapRenderer` (horizontal), V `BootstrapVerticalRenderer` and I `BootstrapInlineRenderer`. Where the three values are the same, there is one.

### `form`

| Key | H | V | I | Meaning |
|---|---|---|---|---|
| `container` | `null` | `null` | `''` | Element around everything inside `<form>` (groups, pairs). The `<form>` element itself is `$form->getElementPrototype()`. |

### `error`

Errors of the form itself, rendered above the controls (and all errors in the `errors` mode).

| Key | Value | Meaning |
|---|---|---|
| `container` | `div class="alert alert-danger"` | Element around the list of errors. |
| `item` | `p` | Element of one error. |

### `group`

Used for `$form->addGroup()`.

| Key | Value | Meaning |
|---|---|---|
| `container` | `fieldset` | Element around a group. A group can override it with `setOption('container', ...)`. |
| `label` | `legend` | Element of the group label (`addGroup('Label')`). |
| `description` | `p` | Element of the group description (`setOption('description', ...)` on the group). |

### `controls`

| Key | H | V | I | Meaning |
|---|---|---|---|---|
| `container` | `div` | `null` | `''` | Element around the pairs of the form or of one group. |

### `pair`

One label and its control (or a row of buttons).

| Key | Value | Meaning |
|---|---|---|
| `container` | `div class=form-group` | Element around the label and the control. |
| `.required` | `required` | Class of the pair when the control is required. |
| `.optional` | `null` | Class of the pair when the control is optional. |
| `.odd` | `null` | Class of every odd pair (for striped forms). |
| `.error` | `has-error` | Class of the pair when the control has an error. |

### `control`

| Key | H | V | I | Meaning |
|---|---|---|---|---|
| `container` | `div class=col-sm-9` | `''` | `null` | Element around the control, its description and its errors. |
| `.odd` | `null` | | | Class of the control container in odd pairs. |
| `description` | `span class=help-block` | | | Element of a string description (`setOption('description', ...)`). |
| `requiredsuffix` | `''` | | | Text added after a required control, before its description. |
| `errorcontainer` | `span class=help-block` | | | Element around the errors of a control. |
| `erroritem` | `''` | | | Element of one control error; empty means the errors are joined in the container. |
| `.required` | `required` | | | Class of the `<label>` of a required control. |
| `.text` | `text` | | | Class added to `<input type="text">`. |
| `.password` | `text` | | | Class added to `<input type="password">`. |
| `.file` | `text` | | | Class added to `<input type="file">`. |
| `.submit` | `button` | | | Class added to `<input type="submit">`. |
| `.image` | `imagebutton` | | | Class added to `<input type="image">`. |
| `.button` | `button` | | | Class added to `<input type="button">`. |

`DefaultFormRenderer` reads a few more `control` keys that the Bootstrap renderers do not define, so they are `null` (nothing) unless you set them: `.error` (class of a control with errors), `.multi` (class of a control container holding several controls via the `nextTo` option) and `.email`, `.number` (class of those input types; Nette's own renderer sets `text` there).

### `label`

| Key | H | V | I | Meaning |
|---|---|---|---|---|
| `container` | `div class="col-sm-3 control-label"` | `''` | `''` | Element around the `<label>`. |
| `suffix` | `null` | | | Text appended to every label. |
| `requiredsuffix` | `''` | | | Text appended to the label of a required control, for example `' *'`. |

### `hidden`

| Key | Value | Meaning |
|---|---|---|
| `container` | `div` | Element around the hidden fields, rendered just before `</form>`. |

## Classes added outside `$wrappers`

These are added by the renderer's own code before rendering, and are not configurable through `$wrappers`:

| Where | Class | When |
|---|---|---|
| `<form>` | `form-horizontal` (H), `form-inline` (I) | always, next to existing classes |
| `<form>` | `novalidate="novalidate"` attribute | unless created with `novalidate: false` |
| text inputs, text areas, selects, multi-selects | `form-control` | always |
| buttons | `btn btn-primary` / `btn btn-default` | unless the class already contains `btn` |
| checkbox | its label in `div.checkbox` | always |
| checkbox list, radio list | each item in `div.checkbox` / `div.radio` | always |

To change one of these for a control, set the class on the control yourself (a button with `btn` in its class is left alone), or wrap the renderer ([Customizing](/guide/customizing#wrapping-the-renderer)).
