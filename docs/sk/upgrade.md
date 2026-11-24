---
title: Prechod na 3.0
description: 'Ako prejsť z nette-bootstrap-form 2.x na 3.0, PHP 8.4 a finálne triedy vykresľovačov; vykreslené HTML zostáva rovnaké.'
---

# Prechod z 2.x na 3.0 {#upgrading-from-2-x-to-3-0}

3.0 zachováva vykreslené HTML z 2.x bajt po bajte: formulár vykreslený vykresľovačom z 3.0 má rovnaký markup ako s 2.1.1. Nekompatibilné zmeny sa týkajú platformy a samotných tried.

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

`BootstrapRenderer`, `BootstrapVerticalRenderer` a `BootstrapInlineRenderer` sú `final`, takže sa už nedajú rozšíriť dedením. Obvyklým dôvodom na podtriedu bola zmena `$wrappers`; nastavte ich namiesto toho na inštancii. HTML, ktoré 3.0 vykreslí pre danú konfiguráciu `$wrappers`, je rovnaké ako v 2.x.

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

## Po prechode {#after-upgrading}

- Spustite testy formulárov alebo porovnajte niekoľko vykreslených formulárov pred a po: HTML musí byť rovnaké. Ako si ho uložiť ako snapshot, ukazuje kapitola [Testovanie formulárov](/sk/guide/testing).
- Ak ste dedili renderer, aby ste zmenili `$wrappers`, [referencia konfigurácie](/sk/guide/configuration) uvádza všetky kľúče.

Úplný zoznam zmien je v [zozname zmien](/sk/changelog).
