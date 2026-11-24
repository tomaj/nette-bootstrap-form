---
title: Nette aplikácia
description: 'Bootstrap vykresľovače v Nette aplikácii: v továrničke presentera alebo komponentu, v jednej službe – továrni na všetky formuláre, cez {control} v Latte a pri manuálnom vykresľovaní v Latte.'
---

# Nette aplikácia {#nette-application}

Vykresľovače fungujú s `Nette\Application\UI\Form` presne tak ako s `Nette\Forms\Form` (UI formulár od neho dedí). Žiadne DI rozšírenie nie je potrebné: vytvoríte vykresľovač a nastavíte ho formuláru.

## V presenteri alebo komponente {#in-a-presenter-or-a-component}

Nastavte vykresľovač v továrničke komponentu formulára:

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

Šablóna vykreslí celý formulár pomocou vykresľovača:

```latte
{block content}
<div class="container">
	<h1>Sign in</h1>
	{control loginForm}
</div>
```

Keď sa formulár odošle a validácia zlyhá, presenter vykreslí tú istú šablónu znova a `{control loginForm}` zobrazí [chyby v Bootstrap markupe](/sk/guide/errors).

## Jedna továreň na formuláre pre celú aplikáciu {#one-form-factory-for-the-whole-application}

Keď majú všetky formuláre vyzerať rovnako, vytvárajte ich v jednej továrni a zaregistrujte ju ako službu:

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

Presentery a komponenty dostanú továreň cez konštruktor alebo metódu `inject` a namiesto `new Form()` volajú `$this->formFactory->create()`. Vykresľovač (mriežku, označenie povinných polí, pozrite [Prispôsobenie](/sk/guide/customizing)) tak nastavíte na jednom mieste, v `create()`.

## Ajaxové formuláre {#ajax-forms}

`naja` a podobné knižnice pre Nette vyberajú formuláre podľa triedy, zvyčajne `ajax`. Vykresľovače pridávajú svoju triedu formulára vedľa existujúcich tried, takže ju nastavte ako zvyčajne:

<!-- snippet: skip -->
```php
$form->getElementPrototype()->addClass('ajax');
$form->setRenderer(new BootstrapRenderer());
```

Vykreslený formulár má `class="ajax form-horizontal"`.

## Manuálne vykresľovanie v Latte {#manual-rendering-in-latte}

`{form}`, `{label}`, `{input}` a atribút `n:name` vykresľujú prvky samy, bez vykresľovača, takže triedy vykresľovača sa nepridajú. Bootstrap markup napíšte priamo do šablóny:

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

Manuálne vykresľovanie je správna voľba pre rozloženie, ktoré vykresľovač nevie vytvoriť, napríklad dve vstupné polia v jednom riadku alebo input group s doplnkom. Na všetko ostatné vám `{control}` dá rovnaký markup s menej kódom v šablóne.

## Vykresľovanie častí v šablóne {#rendering-parts-in-a-template}

Niečo medzi tým: vykresľovač môže vykresliť časti formulára a vy okolo nich dáte vlastný markup. Zavolajte vykresľovač zo šablóny:

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

Výstup vykresľovača je HTML, ktoré nette/forms už escapoval, takže `|noescape` je tu bezpečný. [`examples/manual-rendering`](/sk/examples/manual-rendering) vytvára rovnakú štruktúru v čistom PHP.
