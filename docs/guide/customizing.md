---
title: Customizing
description: 'Change the Bootstrap renderers through $wrappers on the instance (grid, required marker, error classes), share a configured renderer, wrap it in your own renderer and render a form part by part.'
---

# Customizing

The renderer classes are `final`: you configure an instance instead of subclassing it. Almost everything about the markup is in the public `$wrappers` array, which `DefaultFormRenderer` reads while rendering. Every key is listed in the [configuration reference](/guide/configuration).

## Changing `$wrappers`

Change an entry on the instance before the form is rendered. A wrapper is written the way `Nette\Utils\Html::el()` takes it: an element name followed by attributes, such as `div class=col-sm-8` or `div class="col-sm-4 control-label"` (quotes when the value has a space). `null` or `''` means no element.

### A different grid

`BootstrapRenderer` uses a 3 + 9 column grid from the `sm` breakpoint. For a 4 + 8 grid:

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

Controls without a label (checkboxes, buttons) get an empty label column, so they line up with the other controls. If you prefer an offset instead, set the label container of those pairs yourself in a [manual layout](#rendering-part-by-part).

### A marker on required fields

`label requiredsuffix` is appended to the label of every required control. The label also has the `required` class (`control .required`) and the pair the `required` class (`pair .required`), so a CSS rule such as `label.required::after { content: " *"; }` works too, without changing the HTML.

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$renderer = new BootstrapVerticalRenderer();
$renderer->wrappers['label']['requiredsuffix'] = ' *';

$form = new Form();
$form->addText('name', 'Name')->setRequired();
echo $renderer->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group required">
	<label for="frm-name" class="required">Name *</label>
	<input type="text" name="name" class="form-control text" id="frm-name" required data-nette-rules='[{"op":":filled","msg":"This field is required."}]'>
</div>
```

### An error class on the input

Bootstrap 3 colours the whole `form-group` through `has-error` (`pair .error`). If your CSS needs a class on the input itself, set `control .error`, which `DefaultFormRenderer` adds to a control with errors. The renderers leave it unset:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$renderer = new BootstrapVerticalRenderer();
$renderer->wrappers['control']['.error'] = 'is-invalid';

$form = new Form();
$form->addText('name', 'Name')->addError('Please enter your name.');
echo $renderer->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group has-error">
	<label for="frm-name">Name</label>
	<input type="text" name="name" class="form-control text is-invalid" id="frm-name">
	<span class="help-block">Please enter your name.</span>
</div>
```

### Dropping the `text` and `button` classes

`text`, `button` and `imagebutton` on inputs come from the `control .text`, `.password`, `.file`, `.submit`, `.button` and `.image` entries, inherited from Nette's default renderer. They do nothing in Bootstrap; set them to `null` if you do not want them:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$renderer = new BootstrapVerticalRenderer();
foreach (['.text', '.password', '.file', '.submit', '.button', '.image'] as $key) {
    $renderer->wrappers['control'][$key] = null;
}

$form = new Form();
$form->addText('name', 'Name');
$form->addSubmit('send', 'Send');
echo $renderer->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group">
	<label for="frm-name">Name</label>
	<input type="text" name="name" class="form-control" id="frm-name">
</div>
<div class="form-group">
	<input type="submit" name="send" class="btn btn-primary" value="Send">
</div>
```

[`examples/custom-wrappers`](/examples/custom-wrappers) combines several of these changes in one renderer.

## Sharing a configured renderer

A renderer keeps no settings per form, so one configured instance can render many forms, one after another. Create it in one place: a factory function, a form factory, or a service in your DI container.

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

final class FormFactory
{
    public function create(): Form
    {
        $renderer = new BootstrapRenderer();
        $renderer->wrappers['label']['container'] = 'div class="col-md-2 control-label"';
        $renderer->wrappers['control']['container'] = 'div class=col-md-10';

        $form = new Form();
        $form->setRenderer($renderer);

        return $form;
    }
}

$form = new FormFactory()->create();
$form->addText('title', 'Title');
echo $form->getRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div>
<div class="form-group">
	<div class="col-md-2 control-label"><label for="frm-title">Title</label></div>
	<div class="col-md-10"><input type="text" name="title" class="form-control text" id="frm-title"></div>
</div>
</div>
```

In a Nette application, register the factory as a service; see [Nette application](/guide/nette-application#one-form-factory-for-the-whole-application).

## Wrapping the renderer

To change the form before the Bootstrap renderer runs (add a class, an attribute, a translator), implement `Nette\Forms\FormRenderer` and call the Bootstrap renderer from it:

```php
use Nette\Forms\Form;
use Nette\Forms\FormRenderer;
use Tomaj\Form\Renderer\BootstrapRenderer;

final class AjaxFormRenderer implements FormRenderer
{
    public function __construct(
        private readonly BootstrapRenderer $inner = new BootstrapRenderer(),
    ) {}

    public function render(Form $form, ?string $mode = null): string
    {
        $form->getElementPrototype()->addClass('ajax');

        return $this->inner->render($form, $mode);
    }
}

$form = new Form();
echo new AjaxFormRenderer()->render($form, 'begin');
```

<!-- snippet: output -->
```html
<form action="" method="post" class="ajax form-horizontal" novalidate="novalidate">
```

The form class of the renderer (`form-horizontal`, `form-inline`) is added next to existing classes, so `ajax` stays. `Form::render()` and `echo $form` pass only the form to the renderer; pass the mode yourself when you render part by part, as below. [`examples/manual-rendering`](/examples/manual-rendering) uses such a wrapper.

## Rendering part by part

Like the default renderer, `render()` takes a mode: `begin`, `errors` (all errors), `ownerrors` (only the form's own errors), `body` or `end`. The Bootstrap classes are added on the first call, so the parts match the full rendering. Use it to put your own markup between the parts, for example a Bootstrap panel:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addText('name', 'Name');
$form->addSubmit('send', 'Send');

$renderer = new BootstrapVerticalRenderer();
echo $renderer->render($form, 'begin');
echo '<div class="panel-body">';
echo $renderer->render($form, 'errors');
echo $renderer->render($form, 'body');
echo '</div>';
echo $renderer->render($form, 'end');
```

`end` also renders the hidden fields. `begin` marks every control as not rendered yet, and `body` renders the controls not rendered so far, so render each part once, in this order. The Bootstrap classes are never added twice. [`examples/manual-rendering`](/examples/manual-rendering) renders a sign-in form into a panel this way.

## Rendering single controls

`$form['name']->getControl()` and `->getLabel()` return the elements of one control. They do not call the renderer; the Bootstrap classes are on them only if the renderer has already rendered the form once (they are stored on the controls). When you render controls one by one, for example in a Latte template with `{input}`, add the classes yourself; see [manual rendering in Latte](/guide/nette-application#manual-rendering-in-latte).
