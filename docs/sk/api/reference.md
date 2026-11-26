---
title: Referencia API
description: 'Verejné triedy nette-bootstrap-form, ich konštruktor, render() a počiatočné hodnoty $wrappers.'
---

# Referencia API {#api-reference}

Menný priestor `Tomaj\Form\Renderer`. Balíček má tri verejné triedy; každá je `final` potomok [`Nette\Forms\Rendering\DefaultFormRenderer`](https://api.nette.org/forms/master/Nette/Forms/Rendering/DefaultFormRenderer.html) a implementuje `Nette\Forms\FormRenderer`.

| Trieda | Rozloženie | Trieda pridaná k `<form>` |
|---|---|---|
| `BootstrapRenderer` | horizontálne: popisky v `col-sm-3`, prvky v `col-sm-9` | `form-horizontal` |
| `BootstrapVerticalRenderer` | vertikálne: popisok nad prvkom | žiadna |
| `BootstrapInlineRenderer` | v riadku: všetko na jednom riadku | `form-inline` |

`DecoratesControls` v `src/` je interný trait, ktorý zdieľajú všetky tri triedy; nie je súčasťou verejného API a môže sa zmeniť v ľubovoľnom vydaní.

## Konštruktor {#constructor}

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer(novalidate: true);
```

| Parameter | Typ | Predvolené | Význam |
|---|---|---|---|
| `$novalidate` | `bool` | `true` | Pridá elementu `<form>` atribút `novalidate`, takže prehliadač vynechá svoju HTML5 validáciu a chyby zobrazí Nette. `false` validáciu v prehliadači ponechá. |

Rovnaký konštruktor majú všetky tri triedy.

## `render()`

<!-- snippet: skip -->
```php
public function render(Nette\Forms\Form $form, ?string $mode = null): string
```

Pridá triedy Bootstrapu formuláru a jeho prvkom a potom ho vykreslí cez `DefaultFormRenderer::render()`. `$mode` je `null` pre celý formulár, alebo `'begin'`, `'errors'`, `'ownerrors'`, `'body'` či `'end'` pre jednu časť. Opakované volanie na tom istom formulári (aj po častiach) dá rovnaké HTML; triedy sa nepridajú dvakrát.

Čo sa mení na ktorom prvku (podrobnosti v [Prvky formulára](/sk/guide/controls)):

- `<form>`: trieda formulára (pozrite tabuľku vyššie), `novalidate="novalidate"`, ak nie je vypnuté
- prvky `TextBase` (text, heslo, textová oblasť, …), `DateTimeControl` (dátum, čas, dátum s časom), `SelectBox`, `MultiSelectBox`: `form-control`
- prvky `Button` (submit, button, image): `btn btn-primary` pre prvé tlačidlo bez triedy `btn`, `btn btn-default` pre ďalšie; tlačidlá, ktorých trieda obsahuje `btn`, zostanú bez zmeny
- `ColorPicker`, `UploadControl`, `HiddenField`: nič
- `Checkbox`: obalený do `<div class="checkbox">`
- `CheckboxList`, `RadioList`: každá položka obalená do `<div class="checkbox">` / `<div class="radio">`

Vráti HTML ako reťazec a sama nevyhadzuje žiadne výnimky; výnimky pochádzajú len z nette/forms (napríklad keď voľba `nextTo` odkazuje na prvok, ktorý neexistuje).

`render()` zvyčajne nevoláte sami: nastavte vykresľovač cez `$form->setRenderer($renderer)` a formulár vykreslite cez `echo $form`, `$form->render()` alebo `{control form}` v Latte.

## `$wrappers`

<!-- snippet: skip -->
```php
public array $wrappers
```

Definície obalov z `DefaultFormRenderer` (pozrite [dokumentáciu Nette](https://doc.nette.org/en/forms/rendering)). Každý kľúč s jeho významom je v [referencii konfigurácie](/sk/guide/configuration). Meňte ich na inštancii:

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer();
$renderer->wrappers['control']['container'] = 'div class=col-sm-8';
```

Všetky tri vykresľovače začínajú s týmito hodnotami:

| Kľúč | Hodnota |
|---|---|
| `error.container` | `div class="alert alert-danger"` |
| `error.item` | `p` |
| `group.container` / `group.label` / `group.description` | `fieldset` / `legend` / `p` |
| `pair.container` | `div class=form-group` |
| `pair..required` / `pair..error` | `required` / `has-error` |
| `control.description` | `span class=help-block` |
| `control.errorcontainer` | `span class=help-block` |
| `control.erroritem` | `''` (žiadny element pre jednotlivú chybu) |
| `control.requiredsuffix`, `label.requiredsuffix` | `''` |
| `label.suffix` | `null` |
| `hidden.container` | `div` |

Líšia sa v týchto kľúčoch:

| Kľúč | `BootstrapRenderer` | `BootstrapVerticalRenderer` | `BootstrapInlineRenderer` |
|---|---|---|---|
| `form.container` | `null` | `null` | `''` |
| `controls.container` | `div` | `null` | `''` |
| `control.container` | `div class=col-sm-9` | `''` | `null` |
| `label.container` | `div class="col-sm-3 control-label"` | `''` | `''` |

`null` aj `''` znamenajú „žiadny obalový element“.

## Zdedené metódy {#inherited-methods}

Vykresľovače dedia verejné metódy `DefaultFormRenderer`, ktoré `render()` volá pre jednotlivé časti: `renderBegin()`, `renderEnd()`, `renderErrors(?Control $control = null, bool $own = true)`, `renderBody()`, `renderControls(Container|ControlGroup $parent)`, `renderPair(Control $control)`, `renderPairMulti(array $controls)`, `renderLabel(Control $control)`, `renderControl(Control $control)` a `getWrapper(string $name)`. Pracujú s formulárom z posledného volania `render()` a triedy Bootstrapu pridáva iba `render()`, preto namiesto ich priameho volania volajte `render($form, $mode)` s režimom.
