---
title: Validácia a chyby
description: 'Ako Bootstrap vykresľovače zobrazujú chyby formulára, chyby prvkov a popisy, ktoré chyby vypíše každý režim vykresľovania a ako do toho zapadá novalidate a netteForms.js.'
---

# Validácia a chyby {#validation-and-errors}

Validáciu má na starosti Nette: pravidlá, `onError`, `onSuccess` aj `netteForms.js` fungujú ako zvyčajne. Vykresľovače rozhodujú iba o tom, ako chyby vyzerajú:

| Čo | Kde sa vykreslí | Markup |
|---|---|---|
| Chyby samotného formulára (`$form->addError()`) | nad prvkami | `<div class="alert alert-danger">` s jedným `<p>` na každú chybu |
| Chyby prvku (nesplnené pravidlá, `$control->addError()`) | pod prvkom, v jeho dvojici | `<span class="help-block">` so všetkými chybami prvku |
| Dvojica, ktorej prvok má chybu | `form-group` | trieda `has-error`, ktorá zafarbí popisok, rámček vstupného poľa a help block na červeno |
| Popisy (`setOption('description', ...)`) | za prvkom | `<span class="help-block">` |

## Odoslaný formulár s chybami {#a-submitted-form-with-errors}

[`examples/validation-errors`](/sk/examples/validation-errors) odošle registračný formulár s neplatnými hodnotami, takže pravidlá zlyhajú a `onError` pridá chybu formulára:

<FormPreview name="validation-errors" />

Dvojice e-mailu, veku, hesla a súhlasu s podmienkami majú `has-error`; meno, ktoré je platné, si ponechá hodnotu a chybu nemá. Heslo má popis aj chybu, každú vo vlastnom `help-block`.

## Chyby formulára a chyby prvkov {#form-errors-and-control-errors}

Keď sa vykresľuje celý formulár, box s upozornením obsahuje iba vlastné chyby formulára a každý prvok zobrazuje svoje chyby sám. Ak chcete chyby vykresliť na jednom mieste, vykreslite časti sami: režim `errors` vypíše všetky chyby, formulára aj prvkov:

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

| Režim | Vypísané chyby |
|---|---|
| `null` (celý formulár), `'ownerrors'` | iba vlastné chyby formulára (`$form->getOwnErrors()`) |
| `'errors'` | všetky chyby (`$form->getErrors()`), najprv chyby formulára, potom chyby prvkov |
| `'body'` | chyby každého prvku pod daným prvkom |

Pri kombinácii `errors` + `body` sa teda chyba prvku zobrazí dvakrát, raz v upozornení a raz pod prvkom, ako vyššie. Ak tomu chcete predísť, použite `ownerrors` + `body`.

Všetky chyby jedného prvku idú do jedného `help-block`, bez samostatného elementu pre každú chybu (`control erroritem` je prázdny). Ak chcete pre každú chybu vlastný element, nastavte `$renderer->wrappers['control']['erroritem']`, pozrite [`examples/custom-wrappers`](/sk/examples/custom-wrappers).

## Popisy {#descriptions}

Popis je pomocný text pod prvkom, escapovaný ako každý iný text. Ak v ňom potrebujete markup, odovzdajte objekt `Html`:

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

Popis v podobe reťazca preloží translator formulára; popis typu `Html` sa použije tak, ako je. Popis typu `Html` nie je obalený v `help-block`, takže mu dajte vlastnú triedu, ak chcete vzhľad help blocku.

## HTML5 validácia (`novalidate`) {#html5-validation-novalidate}

Vykresľovače predvolene pridávajú formuláru `novalidate`. Prehliadač potom nespúšťa vlastnú validáciu pre `required`, `type="email"`, `min` a podobne a namiesto nej zobrazí svoje hlášky validácia Nette: `netteForms.js` v prehliadači a po odoslaní formulára serverová validácia, vykreslená v Bootstrap markupe opísanom vyššie. Ak chcete validáciu prehliadača ponechať, odovzdajte `false`:

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

Serverová validácia Nette beží v oboch prípadoch. Nikdy sa nespoliehajte iba na prehliadač.

## Chyby v prehliadači (`netteForms.js`) {#errors-in-the-browser-netteforms-js}

`netteForms.js` validuje formulár pred odoslaním podľa atribútov `data-nette-rules`, ktoré vykresľovač generuje. Predvolene zobrazí prvú chybu cez `alert()` prehliadača a presunie fokus na prvok; nepridáva `has-error` ani `help-block`. Ak chcete chyby na strane klienta zobraziť v Bootstrap markupe, prepíšte vo svojom JavaScripte `Nette.showFormErrors(form, errors)`; pozrite [Nette Forms: validácia na strane klienta](https://doc.nette.org/en/forms/validation). Po neúspešnej serverovej validácii sa formulár vykreslí znova s markupom opísaným na tejto stránke.

## Preklad chybových hlášok {#translating-error-messages}

Vykresľovače samy nič neprekladajú. Keď má formulár nastavený translator (`$form->setTranslator()`), nette/forms preloží popisky, popisy, výzvy (prompt) a chybové hlášky a vykresľovač vypíše preložené texty v rovnakom markupe.
