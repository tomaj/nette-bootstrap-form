---
title: Renderers
description: 'The horizontal, vertical and inline Bootstrap renderers side by side, with the HTML each one renders and a preview with Bootstrap 3 CSS.'
---

# Renderers

The package has three renderers. All of them extend `Nette\Forms\Rendering\DefaultFormRenderer`, Nette's own renderer, and differ only in the wrappers around labels and controls (`$wrappers`) and in the class they add to the `<form>` element:

| Renderer | Form class | Label | Control | Use it for |
|---|---|---|---|---|
| `BootstrapRenderer` | `form-horizontal` | `<div class="col-sm-3 control-label">` | `<div class="col-sm-9">` | admin and settings forms with many fields |
| `BootstrapVerticalRenderer` | none | bare `<label>` | bare control | narrow columns, sign-in, mobile-first pages |
| `BootstrapInlineRenderer` | `form-inline` | bare `<label>` | bare control | search boxes, filters above a list |

Every pair of label and control is wrapped in `<div class="form-group">`, with `required` for required controls and `has-error` when the control has an error.

## How rendering works

<img class="diagram only-light" src="/diagrams/render-flow-light.svg" alt="Rendering flow: your Nette Form goes to the renderer's render() method, which first adds the Bootstrap classes to the form and its controls, then lets DefaultFormRenderer wrap every pair using the renderer's $wrappers and returns the HTML." width="760" height="230">
<img class="diagram only-dark" src="/diagrams/render-flow-dark.svg" alt="Rendering flow: your Nette Form goes to the renderer's render() method, which first adds the Bootstrap classes to the form and its controls, then lets DefaultFormRenderer wrap every pair using the renderer's $wrappers and returns the HTML." width="760" height="230">

`render()` runs whenever the form is rendered: `echo $form`, `$form->render()`, `(string) $form` or `{control myForm}` in Latte. It first decorates the form (the classes listed in [Controls](/guide/controls)), then calls `DefaultFormRenderer::render()`. The classes are added to the control prototypes themselves, so rendering the same form again, or part by part, gives the same HTML.

## Side by side

The same contact form, rendered by each renderer with Bootstrap 3.4.1 CSS ([`examples/layouts`](/examples/layouts)):

<FormPreview name="layouts" />

The horizontal and inline layouts apply from Bootstrap's `sm` breakpoint (768 px). On a narrower screen every renderer shows the label above the control.

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

The decoration is the same for all three renderers; see [Controls](/guide/controls) for every control type, [Validation and errors](/guide/errors) for errors and descriptions, and [Customizing](/guide/customizing) to change the wrappers, the grid or `novalidate`.

Labels, values, descriptions and errors are escaped by nette/forms exactly as with the default renderer.

## Choosing a renderer

- Use **`BootstrapRenderer`** when the page is wide enough for a label column: profile and settings forms, admin CRUD forms. The grid is `col-sm-3` + `col-sm-9`; change it with [`$wrappers`](/guide/customizing#a-different-grid).
- Use **`BootstrapVerticalRenderer`** in narrow columns, modals and panels, and when the labels are long.
- Use **`BootstrapInlineRenderer`** only for a few short controls: a search box, a filter above a table ([`examples/inline-filter`](/examples/inline-filter)). Bootstrap 3 gives inline inputs `width: auto`, so they shrink to their content.

You can mix them: each form has its own renderer.
