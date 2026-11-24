---
title: Validation and errors
description: 'How the Bootstrap renderers show form errors, control errors and descriptions, which errors each render mode prints, and how novalidate and netteForms.js fit in.'
---

# Validation and errors

Validation is Nette's: rules, `onError`, `onSuccess` and `netteForms.js` work as usual. The renderers only decide how the errors look:

| What | Where it is rendered | Markup |
|---|---|---|
| Errors of the form itself (`$form->addError()`) | above the controls | `<div class="alert alert-danger">` with one `<p>` per error |
| Errors of a control (failed rules, `$control->addError()`) | under the control, in its pair | `<span class="help-block">` with all errors of the control |
| A pair whose control has an error | the `form-group` | `has-error` class, which makes the label, the input border and the help block red |
| Descriptions (`setOption('description', ...)`) | after the control | `<span class="help-block">` |

## A submitted form with errors

[`examples/validation-errors`](/examples/validation-errors) submits a registration form with invalid values, so the rules fail and `onError` adds a form error:

<FormPreview name="validation-errors" />

The e-mail, age, password and terms pairs have `has-error`; the name, which is valid, keeps its value and has no error. The password has both a description and an error, each in its own `help-block`.

## Form errors and control errors

When the whole form is rendered, the alert box shows only the form's own errors, and each control shows its errors itself. To render the errors in one place instead, render the parts yourself: the `errors` mode prints all errors, the form's and the controls':

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

| Mode | Errors printed |
|---|---|
| `null` (whole form), `'ownerrors'` | only the form's own errors (`$form->getOwnErrors()`) |
| `'errors'` | all errors (`$form->getErrors()`), the form's first, then the controls' |
| `'body'` | each control's errors under the control |

So with `errors` + `body` a control error appears twice, once in the alert and once under the control, as above. Use `ownerrors` + `body` to avoid that.

All errors of one control go into one `help-block`, without an element per error (`control erroritem` is empty). To get one element per error, set `$renderer->wrappers['control']['erroritem']`, see [`examples/custom-wrappers`](/examples/custom-wrappers).

## Descriptions

A description is help text under the control, escaped like any other text. Pass an `Html` object when you need markup in it:

```php
use Nette\Forms\Form;
use Nette\Utils\Html;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addPassword('password', 'Password')
    ->setOption('description', 'At least 8 characters, <b> is shown as text.');
$form->addCheckbox('terms', 'I agree')
    ->setOption('description', Html::el('a', ['href' => '/terms'])->setText('Read the terms'));

echo new BootstrapVerticalRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group">
	<label for="frm-password">Password</label>
	<input type="password" name="password" class="form-control text" id="frm-password"> <span class="help-block">At least 8 characters, &lt;b&gt; is shown as text.</span>
</div>
<div class="form-group">
	<div class="checkbox"><label for="frm-terms"><input type="checkbox" name="terms" id="frm-terms">I agree</label></div> <a href="/terms">Read the terms</a>
</div>
```

A string description is translated by the form's translator; an `Html` description is used as it is. An `Html` description is not wrapped in `help-block`, so give it your own class if you want the help-block look.

## HTML5 validation (`novalidate`)

By default the renderers add `novalidate` to the form. The browser then does not run its own validation on `required`, `type="email"`, `min` and so on, and Nette's validation shows its messages instead: `netteForms.js` in the browser, and the server side after the form is submitted, rendered in the Bootstrap markup above. Pass `false` to keep the browser validation:

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

Nette's server-side validation runs in both cases. Never rely on the browser alone.

## Errors in the browser (`netteForms.js`)

`netteForms.js` validates the form before it is sent, using the `data-nette-rules` attributes the renderer outputs. By default it shows the first error with the browser's `alert()` and focuses the control; it does not add `has-error` or a `help-block`. To show client-side errors in the Bootstrap markup, override `Nette.showFormErrors(form, errors)` in your JavaScript; see [Nette Forms: client-side validation](https://doc.nette.org/en/forms/validation). After a failed server-side validation the form is rendered again with the markup on this page.

## Translating error messages

The renderers do not translate anything themselves. With a translator set on the form (`$form->setTranslator()`), nette/forms translates labels, descriptions, prompts and error messages, and the renderer outputs the translated texts in the same markup.
