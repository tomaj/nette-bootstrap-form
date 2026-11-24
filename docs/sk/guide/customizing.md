---
title: Prispôsobenie
description: 'Úprava bootstrapových vykresľovačov cez $wrappers na inštancii (mriežka, označenie povinných polí, chybové triedy), zdieľanie nastaveného vykresľovača, jeho obalenie vlastným vykresľovačom a vykresľovanie formulára po častiach.'
---

# Prispôsobenie {#customizing}

Triedy vykresľovačov sú `final`: namiesto dedenia nastavíte inštanciu. Takmer všetko o výslednom HTML je vo verejnom poli `$wrappers`, ktoré `DefaultFormRenderer` číta počas vykresľovania. Všetky kľúče sú v [referencii konfigurácie](/sk/guide/configuration).

## Úprava `$wrappers` {#changing-wrappers}

Zmeňte položku na inštancii pred vykreslením formulára. Obal sa zapisuje tak, ako ho prijíma `Nette\Utils\Html::el()`: názov elementu a za ním atribúty, napríklad `div class=col-sm-8` alebo `div class="col-sm-4 control-label"` (úvodzovky, keď hodnota obsahuje medzeru). `null` alebo `''` znamená žiadny element.

### Iná mriežka {#a-different-grid}

`BootstrapRenderer` používa od zlomu `sm` mriežku 3 + 9 stĺpcov. Pre mriežku 4 + 8:

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

Prvky bez popisku (zaškrtávacie polia, tlačidlá) dostanú prázdny stĺpec popiskov, takže sú zarovnané s ostatnými prvkami. Ak radšej chcete odsadenie, nastavte kontajner popisku pre tieto riadky sami v [ručnom rozložení](#rendering-part-by-part).

### Označenie povinných polí {#a-marker-on-required-fields}

`label requiredsuffix` sa pripojí k popisku každého povinného prvku. Popisok má navyše triedu `required` (`control .required`) a riadok triedu `required` (`pair .required`), takže funguje aj pravidlo CSS ako `label.required::after { content: " *"; }` bez zmeny HTML.

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

### Chybová trieda na poli {#an-error-class-on-the-input}

Bootstrap 3 zafarbí celý `form-group` cez `has-error` (`pair .error`). Ak vaše CSS potrebuje triedu priamo na poli, nastavte `control .error`, ktorú `DefaultFormRenderer` pridá prvku s chybami. Vykresľovače ju nechávajú nenastavenú:

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

### Odstránenie tried `text` a `button` {#dropping-the-text-and-button-classes}

Triedy `text`, `button` a `imagebutton` na poliach pochádzajú z položiek `control .text`, `.password`, `.file`, `.submit`, `.button` a `.image`, zdedených z predvoleného vykresľovača Nette. V Bootstrape nerobia nič; ak ich nechcete, nastavte ich na `null`:

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

[`examples/custom-wrappers`](/sk/examples/custom-wrappers) spája niekoľko takýchto zmien v jednom vykresľovači.

## Zdieľanie nastaveného vykresľovača {#sharing-a-configured-renderer}

Vykresľovač si neuchováva žiadne nastavenia pre konkrétny formulár, takže jedna nastavená inštancia môže vykresliť mnoho formulárov, jeden po druhom. Vytvorte ju na jednom mieste: vo factory funkcii, v továrni na formuláre alebo ako službu v DI kontajneri.

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

V aplikácii Nette zaregistrujte továrňu ako službu; pozrite [Aplikácia Nette](/sk/guide/nette-application#one-form-factory-for-the-whole-application).

## Obalenie vykresľovača {#wrapping-the-renderer}

Ak chcete formulár zmeniť ešte pred spustením bootstrapového vykresľovača (pridať triedu, atribút, translator), implementujte `Nette\Forms\FormRenderer` a bootstrapový vykresľovač zavolajte z neho:

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

Trieda formulára z vykresľovača (`form-horizontal`, `form-inline`) sa pridá popri existujúcich triedach, takže `ajax` zostane. `Form::render()` a `echo $form` odovzdajú vykresľovaču iba formulár; keď vykresľujete po častiach, režim odovzdajte sami, ako nižšie. Takýto obal používa [`examples/manual-rendering`](/sk/examples/manual-rendering).

## Vykresľovanie po častiach {#rendering-part-by-part}

Rovnako ako predvolený vykresľovač, aj `render()` prijíma režim: `begin`, `errors` (všetky chyby), `ownerrors` (iba vlastné chyby formulára), `body` alebo `end`. Triedy Bootstrapu sa pridajú pri prvom volaní, takže časti zodpovedajú vykresleniu celého formulára. Využite to na vloženie vlastného HTML medzi časti, napríklad panelu Bootstrapu:

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

`end` vykreslí aj skryté polia. `begin` označí všetky prvky ako ešte nevykreslené a `body` vykreslí prvky, ktoré ešte vykreslené neboli, preto vykreslite každú časť raz a v tomto poradí. Triedy Bootstrapu sa nikdy nepridajú dvakrát. [`examples/manual-rendering`](/sk/examples/manual-rendering) takto vykreslí prihlasovací formulár do panelu.

## Vykresľovanie jednotlivých prvkov {#rendering-single-controls}

`$form['name']->getControl()` a `->getLabel()` vrátia elementy jedného prvku. Vykresľovač nevolajú; triedy Bootstrapu na nich sú len vtedy, ak už vykresľovač formulár raz vykreslil (ukladajú sa na prvkoch). Keď vykresľujete prvky po jednom, napríklad v šablóne Latte cez `{input}`, pridajte triedy sami; pozrite [ručné vykresľovanie v Latte](/sk/guide/nette-application#manual-rendering-in-latte).
