---
title: Nette application
description: 'Use the Bootstrap renderers in a Nette application: in a presenter or component factory, in one form factory service for all forms, with {control} in Latte, and with manual rendering in Latte.'
---

# Nette application

The renderers work with `Nette\Application\UI\Form` exactly as with `Nette\Forms\Form` (the UI form extends it). There is no DI extension: you create a renderer and set it on the form.

## In a presenter or a component

Set the renderer in the factory method of the form component:

<!-- snippet: skip -->
```php
use Nette\Application\UI\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

protected function createComponentLoginForm(): Form
{
    $form = new Form();
    $form->addEmail('email', 'E-mail')->setRequired();
    $form->addPassword('password', 'Password')->setRequired();
    $form->addSubmit('login', 'Sign in');
    $form->onSuccess[] = $this->loginFormSucceeded(...);

    $form->setRenderer(new BootstrapVerticalRenderer());

    return $form;
}
```

The template renders the whole form with the renderer:

```latte
{block content}
<div class="container">
	<h1>Sign in</h1>
	{control loginForm}
</div>
```

When the form is submitted and the validation fails, the presenter renders the same template again and `{control loginForm}` shows the [errors in Bootstrap markup](/guide/errors).

## One form factory for the whole application

When all forms should look the same, create them in one factory and register it as a service:

<!-- snippet: skip -->
```php
namespace App\Forms;

use Nette\Application\UI\Form;
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
```

```neon
services:
	- App\Forms\FormFactory
```

Presenters and components get the factory through the constructor or an `inject` method, and call `$this->formFactory->create()` instead of `new Form()`. Configure the renderer (the grid, a required marker, see [Customizing](/guide/customizing)) in one place, in `create()`.

## Ajax forms

Nette's `naja` and similar libraries select forms by a class, usually `ajax`. The renderers add their form class next to existing classes, so set it as usual:

<!-- snippet: skip -->
```php
$form->getElementPrototype()->addClass('ajax');
$form->setRenderer(new BootstrapRenderer());
```

The rendered form has `class="ajax form-horizontal"`.

## Manual rendering in Latte

`{form}`, `{label}`, `{input}` and the `n:name` attribute render the controls themselves, without the renderer, so the renderer's classes are not added. Write the Bootstrap markup in the template:

```latte
<form n:name=loginForm class="form-horizontal">
	<div n:if="$form->hasErrors()" class="alert alert-danger">
		<p n:foreach="$form->getOwnErrors() as $error">{$error}</p>
	</div>
	<div n:class="form-group, $form[email]->hasErrors() ? has-error">
		<label n:name=email class="col-sm-3 control-label">E-mail</label>
		<div class="col-sm-9">
			<input n:name=email class="form-control">
			<span class="help-block" n:ifcontent>{inputError email}</span>
		</div>
	</div>
	<div class="form-group">
		<div class="col-sm-offset-3 col-sm-9">
			<button n:name=login class="btn btn-primary">Sign in</button>
		</div>
	</div>
</form>
```

Manual rendering is the right choice for a layout the renderer cannot produce, such as two inputs in one row or an input group with an add-on. For everything else `{control}` gives you the same markup with less template code.

## Rendering parts in a template

Between the two, you can let the renderer render parts of the form and put your own markup around them. Call the renderer from the template:

```latte
{var $renderer = $control['loginForm']->getRenderer()}
<div class="panel panel-default">
	<div class="panel-heading">Sign in</div>
	<div class="panel-body">
		{$renderer->render($control['loginForm'], 'begin')|noescape}
		{$renderer->render($control['loginForm'], 'errors')|noescape}
		{$renderer->render($control['loginForm'], 'body')|noescape}
		{$renderer->render($control['loginForm'], 'end')|noescape}
	</div>
</div>
```

The output of the renderer is HTML that nette/forms has already escaped, so `|noescape` is safe here. [`examples/manual-rendering`](/examples/manual-rendering) produces the same structure in plain PHP.
