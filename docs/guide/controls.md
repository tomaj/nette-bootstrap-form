---
title: Controls
description: 'Every nette/forms control type and the Bootstrap 3 markup the renderers give it, including buttons, checkboxes, radio lists, uploads, hidden fields and containers.'
---

# Controls

Before a form is rendered, the renderer walks through all its controls (also those in [containers](#containers)) and adds the Bootstrap classes. Nothing else about a control changes: its name, id, value, rules and your own attributes and classes stay.

## What each control gets

| Method | Control class | Rendered as | Added by the renderer |
|---|---|---|---|
| `addText()` | `TextInput` | `<input type="text">` | `form-control` (+ `text` from `$wrappers`) |
| `addPassword()` | `TextInput` | `<input type="password">` | `form-control` (+ `text`) |
| `addEmail()` | `TextInput` | `<input type="email">` | `form-control` |
| `addInteger()`, `addFloat()` | `TextInput` | `<input type="number">` | `form-control` |
| `addTextArea()` | `TextArea` | `<textarea>` | `form-control` |
| `addSelect()` | `SelectBox` | `<select>` | `form-control` |
| `addMultiSelect()` | `MultiSelectBox` | `<select multiple>` | `form-control` |
| `addCheckbox()` | `Checkbox` | `<label><input type="checkbox">…</label>` | wrapped in `<div class="checkbox">` |
| `addCheckboxList()` | `CheckboxList` | one `<label>` per item | each item in `<div class="checkbox">` |
| `addRadioList()` | `RadioList` | one `<label>` per item | each item in `<div class="radio">` |
| `addUpload()`, `addMultiUpload()` | `UploadControl` | `<input type="file">` | nothing (+ `text` from `$wrappers`); Bootstrap 3 styles file inputs without `form-control` |
| `addDate()`, `addTime()`, `addDateTime()` | `DateTimeControl` | `<input type="date">` … | `form-control` (since 3.0), see [Date, time and colour inputs](#date-time-and-colour-inputs) |
| `addColor()` | `ColorPicker` | `<input type="color">` | nothing, see [Date, time and colour inputs](#date-time-and-colour-inputs) |
| `addHidden()` | `HiddenField` | `<input type="hidden">` | nothing; rendered in a `<div>` before `</form>` |
| `addSubmit()` | `SubmitButton` | `<input type="submit">` | `btn btn-primary` or `btn btn-default`, see [Buttons](#buttons) (+ `button`) |
| `addButton()` | `Button` | `<input type="button">` | as submit (+ `button`) |
| `addImageButton()` | `ImageButton` | `<input type="image">` | as submit (+ `imagebutton`) |

The extra classes in brackets (`text`, `button`, `imagebutton`) do not come from this package's code: they are the `control .text`, `.password`, `.file`, `.submit`, `.button` and `.image` entries of [`$wrappers`](/guide/configuration#control), which `DefaultFormRenderer` adds to `<input>` elements of that type. They have no Bootstrap meaning; remove them by setting the entry to `null`.

Here is every control type in one form, rendered by `BootstrapRenderer` ([`examples/all-controls`](/examples/all-controls)):

<FormPreview name="all-controls" />

## Text inputs, text areas and selects

`form-control` makes them full width (in the vertical and horizontal layouts) and gives them the Bootstrap look:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addText('city', 'City')->setHtmlAttribute('placeholder', 'Bratislava');
$form->addTextArea('note', 'Note', rows: 2);
$form->addSelect('size', 'Size', ['s' => 'S', 'm' => 'M', 'l' => 'L'])->setPrompt('Pick a size');

echo new BootstrapVerticalRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group">
	<label for="frm-city">City</label>
	<input type="text" name="city" placeholder="Bratislava" class="form-control text" id="frm-city">
</div>
<div class="form-group">
	<label for="frm-note">Note</label>
	<textarea name="note" rows="2" class="form-control" id="frm-note"></textarea>
</div>
<div class="form-group">
	<label for="frm-size">Size</label>
	<select name="size" class="form-control" id="frm-size"><option value="">Pick a size</option><option value="s">S</option><option value="m">M</option><option value="l">L</option></select>
</div>
```

## Checkboxes and radio lists

A single checkbox renders its caption inside its own `<label>`, so the label column of the pair is empty and the checkbox lines up with the other controls. Checkbox lists and radio lists get one `div.checkbox` or `div.radio` per item, so Bootstrap shows them one below the other:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addCheckbox('terms', 'I agree with the terms');
$form->addRadioList('plan', 'Plan', ['free' => 'Free', 'pro' => 'Pro'])->setDefaultValue('free');

echo new BootstrapVerticalRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group">
	<div class="checkbox"><label for="frm-terms"><input type="checkbox" name="terms" id="frm-terms">I agree with the terms</label></div>
</div>
<div class="form-group">
	<label>Plan</label>
	<div class="radio"><label><input type="radio" name="plan" checked value="free">Free</label></div><div class="radio"><label><input type="radio" name="plan" value="pro">Pro</label></div>
</div>
```

The label of a list (`Plan`) has no `for` attribute, because it belongs to several inputs.

## Buttons

The renderer gives the **first button without a `btn` class** `btn btn-primary` and every following one `btn btn-default`. A button whose class already contains `btn` is left alone and does not use up the primary style:

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

`Save` is the first button without a `btn` class, so it is the primary button. `Delete` keeps its own classes. `Cancel` gets the default style.

Things to know about the check:

- It looks for the text `btn` **anywhere** in the class attribute. `btn-lg` alone, or a JavaScript hook such as `js-btn-save`, counts as "already styled": the renderer adds nothing, not even the base `btn` class. Give such buttons the full classes yourself (`btn btn-default btn-lg`).
- Classes set as a string, with `addClass()` or as an array (`setHtmlAttribute('class', ['btn', 'btn-danger'])`) are checked the same way.
- Consecutive buttons share one `form-group`, separated by a space. A control between them starts a new group.
- `addButton()` and `addImageButton()` count as buttons too; [`examples/button-styles`](/examples/button-styles) shows all the cases.

## Date, time and colour inputs

`addDate()`, `addTime()` and `addDateTime()` (nette/forms 3.2+, class `DateTimeControl`) get `form-control` like the text inputs, so Bootstrap 3 gives them the same look and full width (it styles `input[type=date]`, `[type=time]` and `[type=datetime-local]` with `form-control`). 2.x added nothing to them; this is the one change in the rendered HTML between 2.x and 3.0 ([#33](https://github.com/tomaj/nette-bootstrap-form/issues/33), see [Upgrading to 3.0](/upgrade)).

`addColor()` (`ColorPicker`) gets no class on purpose. Bootstrap 3 (and 4) have no style for colour inputs: `form-control` would stretch the colour swatch into a full-width, text-box-sized bar. Bootstrap 5 has `form-control form-control-color` for it, so a renderer for Bootstrap 5 would add that. With your own CSS, set a class yourself with `->setHtmlAttribute('class', '…')`.

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addDate('from', 'From');
$form->addColor('colour', 'Colour')->setDefaultValue('#7952b3');

echo new BootstrapVerticalRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group">
	<label for="frm-from">From</label>
	<input type="date" name="from" class="form-control" id="frm-from">
</div>
<div class="form-group">
	<label for="frm-colour">Colour</label>
	<input type="color" name="colour" id="frm-colour" value="#7952b3">
</div>
```

## Uploads and hidden fields

File inputs get no `form-control`, as in the Bootstrap 3 documentation. Hidden fields are not rendered in a `form-group`: they are collected in one `<div>` (the `hidden container` wrapper) just before `</form>`, together with the `_form_` field that a named form adds:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form('upload');
$form->addUpload('avatar', 'Avatar')
    // the default limit comes from php.ini (upload_max_filesize); set your own
    ->getRules()->removeRule(Form::MaxFileSize)
    ->addRule(Form::MaxFileSize, 'The avatar can be up to 2 MB.', 2 * 1024 * 1024);
$form->addHidden('userId', '42');
$form->setRenderer(new BootstrapVerticalRenderer());

echo $form;
```

<!-- snippet: output -->
```html
<form action="" method="post" id="frm-upload" enctype="multipart/form-data" novalidate="novalidate">
<div class="form-group">
	<label for="frm-upload-avatar">Avatar</label>
	<input type="file" name="avatar" id="frm-upload-avatar" data-nette-rules='[{"op":":fileSize","msg":"The avatar can be up to 2 MB.","arg":2097152}]' class="text">
</div>
<div><input type="hidden" name="_form_" value="upload"><input type="hidden" name="userId" value="42"></div>
</form>
```

The form has `enctype="multipart/form-data"` because of the upload; nette/forms sets it.

## Containers

Controls in a container (`addContainer()`) are decorated like any other, because the renderer goes through `Form::getControls()`, which includes nested controls:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$address = $form->addContainer('address');
$address->addText('street', 'Street');
$address->addSelect('country', 'Country', ['sk' => 'Slovakia', 'cz' => 'Czechia']);

echo new BootstrapVerticalRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group">
	<label for="frm-address-street">Street</label>
	<input type="text" name="address[street]" class="form-control text" id="frm-address-street">
</div>
<div class="form-group">
	<label for="frm-address-country">Country</label>
	<select name="address[country]" class="form-control" id="frm-address-country"><option value="sk">Slovakia</option><option value="cz">Czechia</option></select>
</div>
```

## Several controls in one row

`setOption('nextTo', 'name')` is a `DefaultFormRenderer` option: the named control is rendered in the same pair, after this one. The renderers keep it:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('zip', 'ZIP and city')->setOption('nextTo', 'city')
    ->setHtmlAttribute('placeholder', 'ZIP');
$form->addText('city')->setHtmlAttribute('placeholder', 'City');

echo new BootstrapRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div>
<div class="form-group">
	<div class="col-sm-3 control-label"><label for="frm-zip">ZIP and city</label></div>
	<div class="col-sm-9"><input type="text" name="zip" placeholder="ZIP" class="form-control text" id="frm-zip"><input type="text" name="city" placeholder="City" class="form-control text" id="frm-city"></div>
</div>
</div>
```

Both inputs are `form-control`, so each takes the full width of the column; wrap them yourself (for example with a [Latte template](/guide/nette-application#manual-rendering-in-latte)) when you need a real two-column row.

## Per-pair options

Two more `DefaultFormRenderer` options work with every renderer:

| Option | Effect |
|---|---|
| `setOption('class', 'my-class')` | extra class on the `form-group` of the control |
| `setOption('id', 'row-email')` | `id` of the `form-group` |
| `setOption('description', 'text')` | help text under the control, see [Validation and errors](/guide/errors#descriptions) |

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->addText('company', 'Company')
    ->setOption('class', 'company-row')
    ->setOption('id', 'row-company');

echo new BootstrapVerticalRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
<div class="form-group company-row" id="row-company">
	<label for="frm-company">Company</label>
	<input type="text" name="company" class="form-control text" id="frm-company">
</div>
```
