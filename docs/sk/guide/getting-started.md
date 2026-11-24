---
title: Začíname
description: 'Nainštalujte nette-bootstrap-form a vykreslite svoj prvý Nette formulár s Bootstrap markupom.'
---

# Začíname {#getting-started}

## Požiadavky {#requirements}

- PHP 8.4 alebo novšie
- [nette/forms](https://doc.nette.org/en/forms) 3.2 alebo novšie
- Bootstrap 3 CSS na stránke (vykresľovače generujú [markup formulárov Bootstrap 3](https://getbootstrap.com/docs/3.4/css/#forms)), napríklad verziu 3.4.1 z CDN alebo z vášho buildu assetov

Balík nemá žiadne ďalšie závislosti ani konfiguráciu: sú to tri triedy vykresľovačov.

## Inštalácia {#installation}

```bash
composer require tomaj/nette-bootstrap-form
```

## Váš prvý formulár {#your-first-form}

Vytvorte formulár ako zvyčajne a pred vykreslením mu nastavte jeden z vykresľovačov:

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

`echo $form` zavolá vykresľovač, ktorý formuláru a jeho prvkom pridá Bootstrap triedy a vráti HTML. Formulár sa vykreslí ako horizontálny Bootstrap formulár:

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

Každý prvok dostal svoju Bootstrap triedu: `form-control` na vstupnom poli, `div.checkbox` okolo zaškrtávacieho poľa a `btn btn-primary` na tlačidle. Popisky sú v stĺpci `col-sm-3` a prvky v `col-sm-9`. `novalidate` vypne vlastnú validáciu prehliadača, takže sa použije validácia Nette a jej chybové hlášky.

## Pridajte Bootstrap CSS {#add-the-bootstrap-css}

Vykresľovač generuje iba markup. Bootstrap 3 CSS načítajte vo svojom layoute, napríklad:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
      integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
```

Horizontálny formulár potrebuje rodiča s mriežkou (`.container` alebo `.container-fluid`), pretože každá `form-group` funguje ako riadok mriežky. Takto vyzerá horizontálny formulár s Bootstrap 3.4.1 CSS z [`examples/layouts`](/sk/examples/layouts):

<FormPreview name="layouts" />

## V Nette aplikácii {#in-a-nette-application}

V presenteri alebo komponente nastavte vykresľovač v továrničke komponentu. Šablóna vykreslí formulár ako zvyčajne cez `{control loginForm}`.

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

Ak všetky formuláre aplikácie používajú rovnaký vykresľovač, vytvárajte ich v jednej továrni na formuláre namiesto opakovania `setRenderer()`:

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

Viac o presenteroch, továrňach na formuláre, službách v DI a Latte nájdete v časti [Nette aplikácia](/sk/guide/nette-application).

## Ďalšie kroky {#next-steps}

- [Vykresľovače](/sk/guide/renderers): tri rozloženia vedľa seba
- [Prvky formulára](/sk/guide/controls): čo dostane každý typ prvku a tlačidlá
- [Validácia a chyby](/sk/guide/errors): ako sa vykresľujú chyby a popisy
- [Prispôsobenie](/sk/guide/customizing): zmena `$wrappers`, obalenie vykresľovača, vykresľovanie po častiach
- [Príklady](/sk/examples/): osem spustiteľných receptov s výstupom a náhľadom
- [Prechod na 3.0](/sk/upgrade) z 2.x
