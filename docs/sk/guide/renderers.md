---
title: Vykresľovače
description: 'Horizontálny, vertikálny a inline Bootstrap vykresľovač vedľa seba, s HTML, ktoré každý z nich vykreslí, a náhľadom s Bootstrap 3 CSS.'
---

# Vykresľovače {#renderers}

Balík obsahuje tri vykresľovače. Všetky dedia od `Nette\Forms\Rendering\DefaultFormRenderer`, vlastného vykresľovača Nette, a líšia sa len obalmi okolo popiskov a prvkov (`$wrappers`) a triedou, ktorú pridávajú elementu `<form>`:

| Vykresľovač | Trieda formulára | Popisok | Prvok | Na čo ho použiť |
|---|---|---|---|---|
| `BootstrapRenderer` | `form-horizontal` | `<div class="col-sm-3 control-label">` | `<div class="col-sm-9">` | administrácia a formuláre nastavení s mnohými poľami |
| `BootstrapVerticalRenderer` | žiadna | samotný `<label>` | samotný prvok | úzke stĺpce, prihlásenie, stránky navrhnuté najprv pre mobil |
| `BootstrapInlineRenderer` | `form-inline` | samotný `<label>` | samotný prvok | vyhľadávacie polia, filtre nad zoznamom |

Každá dvojica popisku a prvku je obalená v `<div class="form-group">`, s triedou `required` pri povinných prvkoch a `has-error`, keď má prvok chybu.

## Ako funguje vykresľovanie {#how-rendering-works}

<img class="diagram only-light" src="/diagrams/render-flow-sk-light.svg" alt="Priebeh vykresľovania: váš Nette formulár prejde metódou render() vykresľovača, ktorá najprv pridá Bootstrap triedy formuláru a jeho prvkom, potom nechá DefaultFormRenderer obaliť každú dvojicu podľa $wrappers vykresľovača a vráti HTML." width="760" height="230">
<img class="diagram only-dark" src="/diagrams/render-flow-sk-dark.svg" alt="Priebeh vykresľovania: váš Nette formulár prejde metódou render() vykresľovača, ktorá najprv pridá Bootstrap triedy formuláru a jeho prvkom, potom nechá DefaultFormRenderer obaliť každú dvojicu podľa $wrappers vykresľovača a vráti HTML." width="760" height="230">

`render()` sa spustí pri každom vykreslení formulára: `echo $form`, `$form->render()`, `(string) $form` alebo `{control myForm}` v Latte. Najprv formulár upraví (triedy uvedené v časti [Prvky formulára](/sk/guide/controls)), potom zavolá `DefaultFormRenderer::render()`. Triedy sa pridávajú priamo prototypom prvkov, takže opakované vykreslenie toho istého formulára, aj po častiach, dá rovnaké HTML.

## Vedľa seba {#side-by-side}

Ten istý kontaktný formulár, vykreslený každým vykresľovačom s Bootstrap 3.4.1 CSS ([`examples/layouts`](/sk/examples/layouts)):

<FormPreview name="layouts" />

Horizontálne a inline rozloženie platí od breakpointu `sm` v Bootstrape (768 px). Na užšej obrazovke zobrazí každý vykresľovač popisok nad prvkom.

## Horizontálny: `BootstrapRenderer` {#horizontal-bootstraprenderer}

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

Popisky a prvky sú vedľa seba v mriežke so stĺpcami 3 + 9. Prvky bez popisku (zaškrtávacie pole, tlačidlo) dostanú prázdny stĺpec pre popisok, takže sú zarovnané s ostatnými prvkami.

## Vertikálny: `BootstrapVerticalRenderer` {#vertical-bootstrapverticalrenderer}

Predvolené rozloženie Bootstrapu: každý popisok nad svojím prvkom, bez mriežky.

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

Rovnaký markup ako pri vertikálnom vykresľovači, s triedou `form-inline` na formulári. Bootstrap zobrazí skupiny na jednom riadku na obrazovkách širokých aspoň 768 px; použite ho pre krátke formuláre, ako je vyhľadávacie pole alebo filter.

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

## Čo vykresľovače menia {#what-the-renderers-change}

Úprava formulára je pri všetkých troch vykresľovačoch rovnaká; každý typ prvku popisuje časť [Prvky formulára](/sk/guide/controls), chyby a popisy časť [Validácia a chyby](/sk/guide/errors) a zmenu obalov, mriežky alebo `novalidate` časť [Prispôsobenie](/sk/guide/customizing).

Popisky, hodnoty, popisy a chyby escapuje nette/forms presne tak ako pri predvolenom vykresľovači.

## Ako si vybrať vykresľovač {#choosing-a-renderer}

- **`BootstrapRenderer`** použite, keď je stránka dosť široká na stĺpec s popiskami: formuláre profilu a nastavení, CRUD formuláre v administrácii. Mriežka je `col-sm-3` + `col-sm-9`; zmeníte ju cez [`$wrappers`](/sk/guide/customizing#a-different-grid).
- **`BootstrapVerticalRenderer`** použite v úzkych stĺpcoch, modálnych oknách a paneloch a pri dlhých popiskoch.
- **`BootstrapInlineRenderer`** použite len pre niekoľko krátkych prvkov: vyhľadávacie pole, filter nad tabuľkou ([`examples/inline-filter`](/sk/examples/inline-filter)). Bootstrap 3 dáva inline vstupným poliam `width: auto`, takže sa zúžia podľa obsahu.

Môžete ich kombinovať: každý formulár má vlastný vykresľovač.
