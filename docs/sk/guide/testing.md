---
title: Testovanie formulárov
description: 'Otestujte, čo vaše Nette formuláre vykreslia s Bootstrap vykresľovačmi (HTML snapshoty) a ako sa správajú po odoslaní, bez prehliadača a webového servera.'
---

# Testovanie formulárov {#testing-your-forms}

Vykresľovač je čistá funkcia formulára: ten istý formulár dá vždy to isté HTML. Vďaka tomu sa formuláre dajú ľahko testovať bez prehliadača.

## Snapshot vykresleného HTML {#snapshot-of-the-rendered-html}

Vykreslite formulár v teste a porovnajte HTML so súborom, ktorý commitnete. Zmena vo vašom formulári alebo v závislosti sa potom pri review ukáže ako diff:

<!-- snippet: skip -->
```php
use App\Forms\FormFactory;
use PHPUnit\Framework\TestCase;

final class SignInFormTest extends TestCase
{
    public function testRendersBootstrapMarkup(): void
    {
        $form = new FormFactory()->createSignInForm();

        self::assertStringEqualsFile(__DIR__ . '/fixtures/sign-in.html', (string) $form);
    }
}
```

Tento balík sa testuje rovnako: `tests/RendererTest.php` vykreslí 23 formulárov každým vykresľovačom a porovná ich bajt po bajte s `tests/fixtures/<renderer>/<case>.html` a [príklady](/sk/examples/) porovnávajú v CI svoj výstup s `expected-output.txt`.

Niektoré atribúty závisia od prostredia: prvok na nahrávanie súborov berie limit veľkosti z `upload_max_filesize` a limit počtu z `max_file_uploads` v `php.ini`. Nastavte si vlastné limity (pozrite [`examples/all-controls`](/sk/examples/all-controls)), inak sa snapshot na vašom počítači a v CI bude líšiť.

## Kontrola jednotlivých tried {#checking-single-classes}

Keď je celý snapshot príliš prísny, skontrolujte len to podstatné:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('name', 'Name');
$form->addSubmit('send', 'Send');
$form->setRenderer(new BootstrapRenderer());

$html = (string) $form;

// in PHPUnit: self::assertStringContainsString(...)
$checks = [
    str_contains($html, 'class="form-horizontal"'),
    str_contains($html, 'class="btn btn-primary button"'),
    $form['name']->getControlPrototype()->getClass() === ['form-control' => true],
];
echo in_array(false, $checks, true) ? "failed\n" : "ok\n";
```

<!-- snippet: output -->
```html
ok
```

Po vykreslení sú triedy uložené v prototypoch prvkov, takže ich môžete kontrolovať aj priamo na prvkoch.

## Odoslanie formulára v teste {#submitting-a-form-in-a-test}

Formulár číta odoslané dáta zo svojho HTTP requestu. Dajte mu `Nette\Http\Request` s POST dátami, zavolajte `fireEvents()` a skontrolujte výsledok, potom ho vykreslite, aby ste videli chyby:

```php
use Nette\Forms\Form;
use Nette\Http\Request;
use Nette\Http\UrlScript;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->httpRequest = new Request(
    new UrlScript('https://example.com/'),
    post: ['email' => 'not an e-mail', 'send' => 'Send'],
    cookies: ['_nss' => '1'],
    headers: ['Sec-Fetch-Site' => 'same-origin'],
    method: 'POST',
);
// addText() + Form::Email rather than addEmail(): newer nette/forms add maxlength="255" to addEmail()
$form->addText('email', 'E-mail')->setRequired()->addRule(Form::Email);
$form->addSubmit('send', 'Send');
$form->onSuccess[] = static fn() => print "saved\n";
$form->fireEvents();

echo $form->isValid() ? 'valid' : 'invalid: ' . implode(', ', $form->getErrors()), "\n";

$form->setRenderer(new BootstrapVerticalRenderer());
echo $form->getRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
invalid: Please enter a valid email address.
<div class="form-group required has-error">
	<label for="frm-email" class="required">E-mail</label>
	<input type="email" name="email" class="form-control" id="frm-email" required data-nette-rules='[{"op":":filled","msg":"This field is required."},{"op":":email","msg":"Please enter a valid email address."}]' value="not an e-mail">
	<span class="help-block">Please enter a valid email address.</span>
</div>
<div class="form-group">
	<input type="submit" name="send" class="btn btn-primary button" value="Send">
</div>
```

Hlavička `Sec-Fetch-Site: same-origin` a cookie `_nss` (cookie so `SameSite=Strict`, ktorú nastavuje HTTP odpoveď Nette) sú to, čo prehliadač posiela pri requeste z toho istého webu. nette/forms bez nich odmietne POST ako cross-origin (pokiaľ formulár nezavolá `allowCrossOrigin()`); staršie verzie nette/http kontrolujú len cookie, novšie uprednostňujú hlavičku. Formulár vytvorený s menom (`new Form('register')`) potrebuje v POST dátach aj `'_form_' => 'register'`. Úplnou verziou tohto testu je [`examples/validation-errors`](/sk/examples/validation-errors).

## Testovanie v Nette aplikácii {#testing-in-a-nette-application}

Pri presenteroch vykreslí `Nette\Application\UI\Presenter::run()` s `Nette\Application\Request` v teste celú stránku. Formulár je súčasťou odpovede a vykreslí ho ten istý vykresľovač, takže postupy opísané vyššie platia aj pre HTML stránky.
