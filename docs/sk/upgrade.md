---
title: Prechod na 3.0
description: 'Ako prejsť z nette-bootstrap-form 2.x na 3.0, PHP 8.4, finálne triedy vykresľovačov a form-control na poliach s dátumom a časom; zvyšok vykresleného HTML zostáva rovnaký.'
---

# Prechod z 2.x na 3.0 {#upgrading-from-2-x-to-3-0}

3.0 zachováva vykreslené HTML z 2.x bajt po bajte s jednou výnimkou: polia na dátum a čas dostanú `form-control` (nižšie). Všetky ostatné prvky majú rovnaký markup ako s 2.1.1. Ostatné nekompatibilné zmeny sa týkajú platformy a samotných tried.

## PHP 8.4 alebo novšie {#php-8-4-or-newer}

3.0 vyžaduje PHP 8.4 (`"php": "^8.4"`; 2.x povoľovala PHP 7.1+). Kým nebežíte na PHP 8.4, zostaňte na 2.x. nette/forms 3.2, ktoré už 2.1 vyžadovala, aj tak potrebuje PHP 8.1.

Predtým (`composer.json`):

```json
"require": {
    "php": ">=7.1",
    "tomaj/nette-bootstrap-form": "^2.1"
}
```

Potom:

```json
"require": {
    "php": "^8.4",
    "tomaj/nette-bootstrap-form": "^3.0"
}
```

## Vykresľovače sú finálne {#the-renderers-are-final}

`BootstrapRenderer`, `BootstrapVerticalRenderer` a `BootstrapInlineRenderer` sú `final`, takže sa už nedajú rozšíriť dedením. Obvyklým dôvodom na podtriedu bola zmena `$wrappers`; nastavte ich namiesto toho na inštancii. HTML, ktoré 3.0 vykreslí pre danú konfiguráciu `$wrappers`, je rovnaké ako v 2.x (okrem polí na dátum a čas nižšie).

Predtým:

<!-- snippet: skip -->
```php
use Tomaj\Form\Renderer\BootstrapRenderer;

class WideLabelRenderer extends BootstrapRenderer
{
    public function __construct()
    {
        parent::__construct();
        $this->wrappers['label']['container'] = 'div class="col-sm-4 control-label"';
        $this->wrappers['control']['container'] = 'div class=col-sm-8';
    }
}

$form->setRenderer(new WideLabelRenderer());
```

Potom:

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer();
$renderer->wrappers['label']['container'] = 'div class="col-sm-4 control-label"';
$renderer->wrappers['control']['container'] = 'div class=col-sm-8';

$form->setRenderer($renderer);
```

Ak nakonfigurovaný renderer potrebujete na viacerých miestach, vytvorte ho v továrenskej funkcii alebo ho zaregistrujte ako službu v DI kontajneri. Ak ste prepisovali `render()`, aby ste formulár pred vykreslením zmenili, renderer namiesto dedenia obaľte:

```php
use Nette\Forms\Form;
use Nette\Forms\FormRenderer;
use Tomaj\Form\Renderer\BootstrapRenderer;

final class MyRenderer implements FormRenderer
{
    private BootstrapRenderer $inner;

    public function __construct()
    {
        $this->inner = new BootstrapRenderer();
    }

    public function render(Form $form, ?string $mode = null): string
    {
        $form->getElementPrototype()->addClass('my-form');

        return $this->inner->render($form, $mode);
    }
}
```

Pozor, `Nette\Forms\FormRenderer::render()` prijíma len formulár; `Form::render()` a `echo $form` ho tak aj volajú. Keď formulár vykresľujete po častiach, volajte priamo `$this->inner->render($form, 'begin')` a podobne.

## Polia na dátum a čas dostanú `form-control` {#date-and-time-inputs-get-form-control}

`addDate()`, `addTime()` a `addDateTime()` (`Nette\Forms\Controls\DateTimeControl`) teraz vo všetkých troch vykresľovačoch dostanú triedu `form-control`, takže ich Bootstrap 3 naštýluje ako textové polia ([#33](https://github.com/tomaj/nette-bootstrap-form/issues/33)). Je to jediná zmena vo vykreslenom HTML.

Predtým (2.x):

```html
<input type="date" name="from" id="frm-from">
```

Teraz (3.0):

```html
<input type="date" name="from" class="form-control" id="frm-from">
```

Ak ste triedu pridávali sami (`->setHtmlAttribute('class', 'form-control')`), toto volanie môžete odstrániť; ak ho necháte, nič sa nestane, trieda sa nepridá dvakrát. Ak ste sa spoliehali na úzky predvolený vzhľad prehliadača, nastavte šírku vo vlastnom CSS alebo pole vykreslite ručne. Aktualizujte HTML snapshoty formulárov s týmito poľami. `addColor()` sa nemení: stále nedostane žiadnu triedu, pretože Bootstrap 3 nemá štýl pre výber farby.

## Po prechode {#after-upgrading}

- Spustite testy formulárov alebo porovnajte niekoľko vykreslených formulárov pred a po: HTML musí byť rovnaké, okrem `class="form-control"` na poliach s dátumom a časom. Ako si ho uložiť ako snapshot, ukazuje kapitola [Testovanie formulárov](/sk/guide/testing).
- Ak ste dedili renderer, aby ste zmenili `$wrappers`, [referencia konfigurácie](/sk/guide/configuration) uvádza všetky kľúče.

Úplný zoznam zmien je v [zozname zmien](/sk/changelog).
