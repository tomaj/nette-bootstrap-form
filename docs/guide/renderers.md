---
title: Renderers
description: The horizontal, vertical and inline Bootstrap renderers, what they change on each control, button classes, novalidate and custom wrappers.
---

# Renderers

All three renderers extend `Nette\Forms\Rendering\DefaultFormRenderer`. They differ only in the wrappers around labels and controls (`$wrappers`) and in the class they add to the `<form>` element. Before rendering, each of them adds the same Bootstrap classes to the controls (see [What the renderers change](#what-the-renderers-change)).

| Renderer | Form class | Label | Control |
|---|---|---|---|
| `BootstrapRenderer` | `form-horizontal` | `<div class="col-sm-3 control-label">` | `<div class="col-sm-9">` |
| `BootstrapVerticalRenderer` | none | bare `<label>` | bare control |
| `BootstrapInlineRenderer` | `form-inline` | bare `<label>` | bare control |

Every pair of label and control is wrapped in `<div class="form-group">` (with `required` for required controls and `has-error` when the control has an error).

## Horizontal: `BootstrapRenderer`

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('email', 'E-mail')->setRequired();
$form->addCheckbox('remember', 'Remember me');
$form->addSubmit('login', 'Log in');

$form->setRenderer(new BootstrapRenderer());
echo $form;
```

<!-- snippet: output -->
```html
<form action="" method="post" class="form-horizontal" novalidate="novalidate">
<div>
<div class="form-group required">
	<div class="col-sm-3 control-label"><label for="frm-email" class="required">E-mail</label></div>
	<div class="col-sm-9"><input type="text" name="email" class="form-control text" id="frm-email" required data-nette-rules='[{"op":":filled","msg":"This field is required."}]'></div>
</div>
<div class="form-group">
	<div class="col-sm-3 control-label"></div>
	<div class="col-sm-9"><div class="checkbox"><label for="frm-remember"><input type="checkbox" name="remember" id="frm-remember">Remember me</label></div></div>
</div>
<div class="form-group">
	<div class="col-sm-3 control-label"></div>
	<div class="col-sm-9"><input type="submit" name="login" class="btn btn-primary button" value="Log in"></div>
</div>
</div>
</form>
```

Labels and controls sit side by side in a 3 + 9 column grid. Controls without a label (the checkbox, the button) get an empty label column, so they line up with the other controls.

## Vertical: `BootstrapVerticalRenderer`

The default Bootstrap layout: each label above its control, no grid.

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addText('email', 'E-mail')->setRequired();
$form->addCheckbox('remember', 'Remember me');
$form->addSubmit('login', 'Log in');

$form->setRenderer(new BootstrapVerticalRenderer());
echo $form;
```

<!-- snippet: output -->
```html
<form action="" method="post" novalidate="novalidate">
<div class="form-group required">
	<label for="frm-email" class="required">E-mail</label>
	<input type="text" name="email" class="form-control text" id="frm-email" required data-nette-rules='[{"op":":filled","msg":"This field is required."}]'>
</div>
<div class="form-group">
	<div class="checkbox"><label for="frm-remember"><input type="checkbox" name="remember" id="frm-remember">Remember me</label></div>
</div>
<div class="form-group">
	<input type="submit" name="login" class="btn btn-primary button" value="Log in">
</div>
</form>
```

## Inline: `BootstrapInlineRenderer`

The same markup as the vertical renderer, with `form-inline` on the form. Bootstrap shows the groups on one line on screens at least 768 px wide; use it for short forms such as a search box or a filter.

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapInlineRenderer;

$form = new Form();
$form->addText('q', 'Search');
$form->addSubmit('search', 'Search');

$form->setRenderer(new BootstrapInlineRenderer());
echo $form;
```

<!-- snippet: output -->
```html
<form action="" method="post" class="form-inline" novalidate="novalidate">
<div class="form-group">
	<label for="frm-q">Search</label>
	<input type="text" name="q" class="form-control text" id="frm-q">
</div>
<div class="form-group">
	<input type="submit" name="search" class="btn btn-primary button" value="Search">
</div>
</form>
```

## What the renderers change

Before the form is rendered, every renderer changes the form and its controls:

| Element | Change |
|---|---|
| `<form>` | `form-horizontal` (horizontal) or `form-inline` (inline) is added to the existing classes, so classes such as `ajax` stay. `novalidate` is set unless the renderer was created with `false`. |
| Text inputs, passwords, text areas, selects, multi-selects | `form-control` is added. |
| Buttons (submit, button, image) | The first button without a `btn` class gets `btn btn-primary`, the others `btn btn-default`. A button that already has a class containing `btn` is left alone and does not use up the primary style. |
| Checkbox | The label is wrapped in `<div class="checkbox">`. |
| Checkbox list, radio list | Each item is wrapped in `<div class="checkbox">` or `<div class="radio">`. |
| Errors | Form errors are rendered in `<div class="alert alert-danger">`, one `<p>` per error; control errors in `<span class="help-block">` under the control. |
| Groups | A group is a `<fieldset>` with a `<legend>`; its description is a `<p>`. |
| Descriptions | `setOption('description', ...)` is rendered in `<span class="help-block">`. |

Labels, values, descriptions and errors are escaped by nette/forms exactly as with the default renderer.

The classes are added to the controls themselves, so rendering the same form again (or part by part) gives the same HTML; existing classes are kept.

## Buttons

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addSubmit('save', 'Save');
$form->addSubmit('delete', 'Delete')->setHtmlAttribute('class', 'btn btn-danger');
$form->addSubmit('cancel', 'Cancel');

$renderer = new BootstrapVerticalRenderer();
echo $renderer->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group">
	<input type="submit" name="save" class="btn btn-primary button" value="Save"> <input type="submit" name="delete" class="btn btn-danger button" value="Delete"> <input type="submit" name="cancel" class="btn btn-default button" value="Cancel">
</div>
```

`Save` is the first button without a `btn` class, so it is the primary button. `Delete` keeps its own classes. `Cancel` gets the default style. A class set with `addClass()` or as an array (`setHtmlAttribute('class', ['btn', 'btn-danger'])`) is checked the same way.

## Errors and descriptions

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addText('login', 'Login')
    ->setOption('description', 'Letters and numbers only')
    ->addError('This login is taken.');
$form->addError('Please correct the errors.');

$renderer = new BootstrapVerticalRenderer();
echo $renderer->render($form, 'errors');
echo $renderer->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="alert alert-danger">
	<p>Please correct the errors.</p>
	<p>This login is taken.</p>
</div>
<div class="form-group has-error">
	<label for="frm-login">Login</label>
	<input type="text" name="login" class="form-control text" id="frm-login"> <span class="help-block">Letters and numbers only</span>
	<span class="help-block">This login is taken.</span>
</div>
```

## HTML5 validation (`novalidate`)

By default the renderers add `novalidate` to the form, so the browser does not run its own validation and Nette's validation (`netteForms.js` and the server side) shows the errors in Bootstrap markup. Pass `false` to keep the browser validation:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$renderer = new BootstrapRenderer(novalidate: false);
echo $renderer->render($form, 'begin');
```

<!-- snippet: output -->
```html
<form action="" method="post" class="form-horizontal">
```

Nette's server-side validation runs in both cases.

## Custom wrappers

`$wrappers` is the public array from `DefaultFormRenderer`; every renderer starts with its own values (listed in the [API reference](/api/reference#wrappers)). Change it on the instance, for example for a 4 + 8 grid:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer();
$renderer->wrappers['label']['container'] = 'div class="col-sm-4 control-label"';
$renderer->wrappers['control']['container'] = 'div class=col-sm-8';

$form = new Form();
$form->addText('name', 'Name');
echo $renderer->render($form, 'body');
```

<!-- snippet: output -->
```html
<div>
<div class="form-group">
	<div class="col-sm-4 control-label"><label for="frm-name">Name</label></div>
	<div class="col-sm-8"><input type="text" name="name" class="form-control text" id="frm-name"></div>
</div>
</div>
```

The renderer classes are `final` since 3.0; configure an instance like this instead of subclassing. If several forms need the same configuration, create the renderer in a factory or register it as a service.

## Rendering part by part

Like the default renderer, `render()` takes a mode: `begin`, `errors` (all errors), `ownerrors` (only the form's own errors), `body` or `end`. The Bootstrap classes are added on the first call, so the parts match the full rendering:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addText('name', 'Name');
$form->addSubmit('send', 'Send');

$renderer = new BootstrapVerticalRenderer();
echo $renderer->render($form, 'begin');
echo $renderer->render($form, 'errors');
echo $renderer->render($form, 'body');
echo $renderer->render($form, 'end');
```

Manual rendering in Latte (`{form}` with `{label}` and `{input}`) does not call the renderer, so the Bootstrap classes are not added; write them in the template there. `{control myForm}` and `echo $form` use the renderer.
