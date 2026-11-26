---
title: Prvky formulára
description: 'Všetky typy prvkov formulára z nette/forms a značky Bootstrap 3, ktoré im vykresľovače pridajú, vrátane tlačidiel, zaškrtávacích polí, prepínačov, nahrávania súborov, skrytých polí a kontajnerov.'
---

# Prvky formulára {#controls}

Pred vykreslením formulára prejde vykresľovač všetky jeho prvky (aj tie v [kontajneroch](#containers)) a pridá im triedy Bootstrapu. Nič iné sa na prvku nemení: jeho názov, id, hodnota, pravidlá aj vaše vlastné atribúty a triedy zostávajú.

## Čo dostane ktorý prvok {#what-each-control-gets}

| Metóda | Trieda prvku | Vykreslí sa ako | Pridá vykresľovač |
|---|---|---|---|
| `addText()` | `TextInput` | `<input type="text">` | `form-control` (+ `text` z `$wrappers`) |
| `addPassword()` | `TextInput` | `<input type="password">` | `form-control` (+ `text`) |
| `addEmail()` | `TextInput` | `<input type="email">` | `form-control` |
| `addInteger()`, `addFloat()` | `TextInput` | `<input type="number">` | `form-control` |
| `addTextArea()` | `TextArea` | `<textarea>` | `form-control` |
| `addSelect()` | `SelectBox` | `<select>` | `form-control` |
| `addMultiSelect()` | `MultiSelectBox` | `<select multiple>` | `form-control` |
| `addCheckbox()` | `Checkbox` | `<label><input type="checkbox">…</label>` | obalí ho do `<div class="checkbox">` |
| `addCheckboxList()` | `CheckboxList` | jeden `<label>` na položku | každú položku do `<div class="checkbox">` |
| `addRadioList()` | `RadioList` | jeden `<label>` na položku | každú položku do `<div class="radio">` |
| `addUpload()`, `addMultiUpload()` | `UploadControl` | `<input type="file">` | nič (+ `text` z `$wrappers`); Bootstrap 3 štýluje polia na súbory bez `form-control` |
| `addDate()`, `addTime()`, `addDateTime()` | `DateTimeControl` | `<input type="date">` … | `form-control` (od 3.0), pozrite [Polia na dátum, čas a farbu](#date-time-and-colour-inputs) |
| `addColor()` | `ColorPicker` | `<input type="color">` | nič, pozrite [Polia na dátum, čas a farbu](#date-time-and-colour-inputs) |
| `addHidden()` | `HiddenField` | `<input type="hidden">` | nič; vykreslí sa v `<div>` pred `</form>` |
| `addSubmit()` | `SubmitButton` | `<input type="submit">` | `btn btn-primary` alebo `btn btn-default`, pozrite [Tlačidlá](#buttons) (+ `button`) |
| `addButton()` | `Button` | `<input type="button">` | ako odosielacie tlačidlo (+ `button`) |
| `addImageButton()` | `ImageButton` | `<input type="image">` | ako odosielacie tlačidlo (+ `imagebutton`) |

Ďalšie triedy v zátvorkách (`text`, `button`, `imagebutton`) nepochádzajú z kódu tohto balíčka: sú to položky `control .text`, `.password`, `.file`, `.submit`, `.button` a `.image` v [`$wrappers`](/sk/guide/configuration#control), ktoré `DefaultFormRenderer` pridáva elementom `<input>` daného typu. V Bootstrape nemajú žiadny význam; odstránite ich nastavením položky na `null`.

Takto vyzerajú všetky typy prvkov v jednom formulári, vykreslené cez `BootstrapRenderer` ([`examples/all-controls`](/sk/examples/all-controls)):

<FormPreview name="all-controls" />

## Textové polia, textové oblasti a výberové polia {#text-inputs-text-areas-and-selects}

`form-control` ich roztiahne na celú šírku (vo vertikálnom a horizontálnom rozložení) a dá im vzhľad Bootstrapu:

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

## Zaškrtávacie polia a prepínače {#checkboxes-and-radio-lists}

Samostatné zaškrtávacie pole vykreslí svoj text vo vlastnom `<label>`, takže stĺpec popiskov je v danom riadku prázdny a pole je zarovnané s ostatnými prvkami. Skupiny zaškrtávacích polí a prepínačov dostanú pre každú položku vlastný `div.checkbox` alebo `div.radio`, takže ich Bootstrap zobrazí pod sebou:

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

Popisok zoznamu (`Plan`) nemá atribút `for`, pretože patrí k viacerým poliam.

## Tlačidlá {#buttons}

Vykresľovač dá **prvému tlačidlu bez triedy `btn`** triedy `btn btn-primary` a každému ďalšiemu `btn btn-default`. Tlačidlo, ktorého trieda už obsahuje `btn`, nechá tak a primárny štýl naň nepripadne:

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

`Save` je prvé tlačidlo bez triedy `btn`, preto je primárne. `Delete` si ponechá vlastné triedy. `Cancel` dostane predvolený štýl.

Čo treba o tejto kontrole vedieť:

- Hľadá text `btn` **kdekoľvek** v atribúte class. Samotné `btn-lg` alebo JavaScriptový háčik ako `js-btn-save` sa považuje za „už naštýlované“: vykresľovač nepridá nič, ani základnú triedu `btn`. Takýmto tlačidlám nastavte celé triedy sami (`btn btn-default btn-lg`).
- Triedy nastavené reťazcom, cez `addClass()` alebo ako pole (`setHtmlAttribute('class', ['btn', 'btn-danger'])`) sa kontrolujú rovnako.
- Tlačidlá idúce za sebou zdieľajú jeden `form-group`, oddelené medzerou. Prvok medzi nimi začne novú skupinu.
- Za tlačidlá sa považujú aj `addButton()` a `addImageButton()`; všetky prípady ukazuje [`examples/button-styles`](/sk/examples/button-styles).

## Polia na dátum, čas a farbu {#date-time-and-colour-inputs}

`addDate()`, `addTime()` a `addDateTime()` (nette/forms 3.2+, trieda `DateTimeControl`) dostanú `form-control` rovnako ako textové polia, takže im Bootstrap 3 dá rovnaký vzhľad a plnú šírku (polia `input[type=date]`, `[type=time]` a `[type=datetime-local]` s `form-control` štýluje). 2.x im nepridávala nič; je to jediná zmena vo vykreslenom HTML medzi 2.x a 3.0 ([#33](https://github.com/tomaj/nette-bootstrap-form/issues/33), pozrite [Prechod na 3.0](/sk/upgrade)).

`addColor()` (`ColorPicker`) zámerne nedostane žiadnu triedu. Bootstrap 3 (ani 4) nemá štýl pre výber farby: `form-control` by farebnú vzorku roztiahol na pruh s rozmermi textového poľa cez celú šírku. Bootstrap 5 naň má `form-control form-control-color`, takže vykresľovač pre Bootstrap 5 by pridal tú. Ak máte vlastné CSS, nastavte triedu sami cez `->setHtmlAttribute('class', '…')`.

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

## Nahrávanie súborov a skryté polia {#uploads-and-hidden-fields}

Polia na súbory nedostanú `form-control`, rovnako ako v dokumentácii Bootstrapu 3. Skryté polia sa nevykresľujú vo `form-group`: zhromaždia sa v jednom `<div>` (obal `hidden container`) tesne pred `</form>`, spolu s poľom `_form_`, ktoré pridáva pomenovaný formulár:

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

Formulár má `enctype="multipart/form-data"` kvôli nahrávaniu súboru; nastaví ho nette/forms.

## Kontajnery {#containers}

Prvky v kontajneri (`addContainer()`) sa upravia ako všetky ostatné, pretože vykresľovač prechádza `Form::getControls()`, ktoré zahŕňa aj vnorené prvky:

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

## Viac prvkov v jednom riadku {#several-controls-in-one-row}

`setOption('nextTo', 'name')` je voľba `DefaultFormRenderer`: uvedený prvok sa vykreslí v tom istom riadku, za týmto prvkom. Vykresľovače ju zachovávajú:

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

Obe polia majú `form-control`, takže každé zaberie celú šírku stĺpca; keď potrebujete skutočný dvojstĺpcový riadok, obaľte ich sami (napríklad v [šablóne Latte](/sk/guide/nette-application#manual-rendering-in-latte)).

## Voľby pre jeden riadok {#per-pair-options}

S každým vykresľovačom fungujú ešte dve voľby `DefaultFormRenderer`:

| Voľba | Účinok |
|---|---|
| `setOption('class', 'my-class')` | ďalšia trieda na `form-group` prvku |
| `setOption('id', 'row-email')` | `id` elementu `form-group` |
| `setOption('description', 'text')` | pomocný text pod prvkom, pozrite [Validácia a chyby](/sk/guide/errors#descriptions) |

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
