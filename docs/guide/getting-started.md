---
title: Getting started
description: 'Install nette-bootstrap-form and render your first Nette form with Bootstrap markup.'
---

# Getting started

## Requirements

- PHP 8.4 or newer
- [nette/forms](https://doc.nette.org/en/forms) 3.2 or newer
- Bootstrap 3 CSS on the page (the renderers output [Bootstrap 3 form markup](https://getbootstrap.com/docs/3.4/css/#forms)), for example 3.4.1 from a CDN or your asset build

The package has no other dependencies and no configuration: it is three renderer classes.

## Installation

```bash
composer require tomaj/nette-bootstrap-form
```

## Your first form

Create the form as usual and set one of the renderers before it is rendered:

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

`echo $form` calls the renderer, which adds the Bootstrap classes to the form and its controls and returns the HTML. The form is rendered as a horizontal Bootstrap form:

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

Every control got its Bootstrap class: `form-control` on the input, `div.checkbox` around the checkbox and `btn btn-primary` on the button. The labels are in a `col-sm-3` column and the controls in `col-sm-9`. `novalidate` turns off the browser's own validation, so Nette's validation and its error messages are used.

## Add the Bootstrap CSS

The renderer outputs markup only. Load Bootstrap 3 CSS in your layout, for example:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
      integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
```

A horizontal form needs a parent with the grid (a `.container` or `.container-fluid`), because each `form-group` acts as a grid row. Here is a horizontal form with Bootstrap 3.4.1 CSS, from [`examples/layouts`](/examples/layouts):

<FormPreview name="layouts" />

## In a Nette application

In a presenter or a component, set the renderer in the factory method. The template renders the form with `{control loginForm}` as usual.

<!-- snippet: skip -->
```php
use Nette\Application\UI\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

protected function createComponentLoginForm(): Form
{
    $form = new Form();
    $form->addText('email', 'E-mail')->setRequired();
    $form->addPassword('password', 'Password')->setRequired();
    $form->addSubmit('login', 'Log in');
    $form->onSuccess[] = $this->loginFormSucceeded(...);

    $form->setRenderer(new BootstrapVerticalRenderer());

    return $form;
}
```

If all forms of an application use the same renderer, create them in one form factory instead of repeating `setRenderer()`:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

final class FormFactory
{
    public function create(): Form
    {
        $form = new Form();
        $form->setRenderer(new BootstrapRenderer());

        return $form;
    }
}

$form = new FormFactory()->create();
```

More about presenters, form factories, DI services and Latte is in [Nette application](/guide/nette-application).

## Next steps

- [Renderers](/guide/renderers): the three layouts side by side
- [Controls](/guide/controls): what every control type gets, and the buttons
- [Validation and errors](/guide/errors): how errors and descriptions are rendered
- [Customizing](/guide/customizing): change `$wrappers`, wrap the renderer, render part by part
- [Examples](/examples/): eight runnable recipes with their output and a preview
- [Upgrading to 3.0](/upgrade) from 2.x
