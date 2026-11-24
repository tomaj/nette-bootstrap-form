---
title: Referencia konfigurácie
description: 'Voľba konštruktora a všetky kľúče $wrappers v BootstrapRenderer, BootstrapVerticalRenderer a BootstrapInlineRenderer, s počiatočnou hodnotou každého z nich a s tým, čo ovplyvňuje.'
---

# Referencia konfigurácie {#configuration-reference}

Vykresľovače majú jednu voľbu konštruktora a verejné pole `$wrappers`. Nič sa neregistruje do DI kontajnera a nemajú žiadny globálny stav.

## Konštruktor {#constructor}

```php
use Tomaj\Form\Renderer\BootstrapInlineRenderer;
use Tomaj\Form\Renderer\BootstrapRenderer;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$horizontal = new BootstrapRenderer();
$vertical = new BootstrapVerticalRenderer(novalidate: true);
$inline = new BootstrapInlineRenderer(novalidate: false);
```

| Parameter | Typ | Predvolené | Význam |
|---|---|---|---|
| `$novalidate` | `bool` | `true` | Pridá elementu `<form>` atribút `novalidate="novalidate"`, takže prehliadač vynechá svoju HTML5 validáciu a chyby zobrazí validácia Nette. `false` validáciu v prehliadači ponechá. Pozrite [HTML5 validácia](/sk/guide/errors#html5-validation-novalidate). |

Hodnota je vlastnosť `private readonly`: po vytvorení vykresľovača sa nedá zmeniť.

## `$wrappers`

`public array $wrappers`, rovnaké pole ako v `Nette\Forms\Rendering\DefaultFormRenderer`, s hodnotami pre Bootstrap 3. Hodnota je definícia elementu pre `Nette\Utils\Html::el()` (`div class=col-sm-9`, `div class="col-sm-3 control-label"`), názov triedy (kľúče začínajúce bodkou), text (`suffix`, `requiredsuffix`) alebo `null`/`''` pre „nič“. Zmeňte ho na inštancii pred vykreslením:

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer();
$renderer->wrappers['control']['container'] = 'div class=col-sm-8';
```

<img class="diagram only-light" src="/diagrams/wrappers-anatomy-sk-light.svg" alt="Jeden riadok s popiskom a prvkom v BootstrapRenderer: div.form-group (pair container, s triedami required a has-error z pair .required a pair .error) obsahuje div.col-sm-3.control-label (label container) okolo popisku a div.col-sm-9 (control container) okolo poľa, help-block s popisom a help-block s chybou." width="760" height="340">
<img class="diagram only-dark" src="/diagrams/wrappers-anatomy-sk-dark.svg" alt="Jeden riadok s popiskom a prvkom v BootstrapRenderer: div.form-group (pair container, s triedami required a has-error z pair .required a pair .error) obsahuje div.col-sm-3.control-label (label container) okolo popisku a div.col-sm-9 (control container) okolo poľa, help-block s popisom a help-block s chybou." width="760" height="340">

V tabuľkách je H `BootstrapRenderer` (horizontálny), V `BootstrapVerticalRenderer` a I `BootstrapInlineRenderer`. Kde sú všetky tri hodnoty rovnaké, je uvedená jedna.

### `form`

| Kľúč | H | V | I | Význam |
|---|---|---|---|---|
| `container` | `null` | `null` | `''` | Element okolo všetkého vnútri `<form>` (skupiny, riadky). Samotný element `<form>` je `$form->getElementPrototype()`. |

### `error`

Chyby samotného formulára, vykreslené nad prvkami (v režime `errors` všetky chyby).

| Kľúč | Hodnota | Význam |
|---|---|---|
| `container` | `div class="alert alert-danger"` | Element okolo zoznamu chýb. |
| `item` | `p` | Element jednej chyby. |

### `group`

Používa sa pre `$form->addGroup()`.

| Kľúč | Hodnota | Význam |
|---|---|---|
| `container` | `fieldset` | Element okolo skupiny. Skupina ho môže prepísať cez `setOption('container', ...)`. |
| `label` | `legend` | Element popisku skupiny (`addGroup('Label')`). |
| `description` | `p` | Element popisu skupiny (`setOption('description', ...)` na skupine). |

### `controls`

| Kľúč | H | V | I | Význam |
|---|---|---|---|---|
| `container` | `div` | `null` | `''` | Element okolo riadkov formulára alebo jednej skupiny. |

### `pair`

Jeden popisok a jeho prvok (alebo rad tlačidiel).

| Kľúč | Hodnota | Význam |
|---|---|---|
| `container` | `div class=form-group` | Element okolo popisku a prvku. |
| `.required` | `required` | Trieda riadku, keď je prvok povinný. |
| `.optional` | `null` | Trieda riadku, keď je prvok nepovinný. |
| `.odd` | `null` | Trieda každého nepárneho riadku (pre pruhované formuláre). |
| `.error` | `has-error` | Trieda riadku, keď má prvok chybu. |

### `control`

| Kľúč | H | V | I | Význam |
|---|---|---|---|---|
| `container` | `div class=col-sm-9` | `''` | `null` | Element okolo prvku, jeho popisu a jeho chýb. |
| `.odd` | `null` | | | Trieda kontajnera prvku v nepárnych riadkoch. |
| `description` | `span class=help-block` | | | Element textového popisu (`setOption('description', ...)`). |
| `requiredsuffix` | `''` | | | Text pridaný za povinný prvok, pred jeho popis. |
| `errorcontainer` | `span class=help-block` | | | Element okolo chýb prvku. |
| `erroritem` | `''` | | | Element jednej chyby prvku; prázdna hodnota znamená, že sa chyby spoja v kontajneri. |
| `.required` | `required` | | | Trieda elementu `<label>` povinného prvku. |
| `.text` | `text` | | | Trieda pridaná k `<input type="text">`. |
| `.password` | `text` | | | Trieda pridaná k `<input type="password">`. |
| `.file` | `text` | | | Trieda pridaná k `<input type="file">`. |
| `.submit` | `button` | | | Trieda pridaná k `<input type="submit">`. |
| `.image` | `imagebutton` | | | Trieda pridaná k `<input type="image">`. |
| `.button` | `button` | | | Trieda pridaná k `<input type="button">`. |

`DefaultFormRenderer` číta ešte niekoľko kľúčov `control`, ktoré bootstrapové vykresľovače nedefinujú, takže sú `null` (nič), kým ich nenastavíte: `.error` (trieda prvku s chybami), `.multi` (trieda kontajnera prvku, ktorý cez voľbu `nextTo` obsahuje viac prvkov) a `.email`, `.number` (trieda týchto typov polí; vlastný vykresľovač Nette tam nastavuje `text`).

### `label`

| Kľúč | H | V | I | Význam |
|---|---|---|---|---|
| `container` | `div class="col-sm-3 control-label"` | `''` | `''` | Element okolo `<label>`. |
| `suffix` | `null` | | | Text pripojený ku každému popisku. |
| `requiredsuffix` | `''` | | | Text pripojený k popisku povinného prvku, napríklad `' *'`. |

### `hidden`

| Kľúč | Hodnota | Význam |
|---|---|---|
| `container` | `div` | Element okolo skrytých polí, vykreslený tesne pred `</form>`. |

## Triedy pridávané mimo `$wrappers` {#classes-added-outside-wrappers}

Tieto triedy pridáva pred vykreslením vlastný kód vykresľovača a cez `$wrappers` sa nastaviť nedajú:

| Kde | Trieda | Kedy |
|---|---|---|
| `<form>` | `form-horizontal` (H), `form-inline` (I) | vždy, popri existujúcich triedach |
| `<form>` | atribút `novalidate="novalidate"` | ak nebol vytvorený s `novalidate: false` |
| textové polia, textové oblasti, výberové polia, viacnásobné výberové polia | `form-control` | vždy |
| tlačidlá | `btn btn-primary` / `btn btn-default` | ak trieda ešte neobsahuje `btn` |
| zaškrtávacie pole | jeho popisok v `div.checkbox` | vždy |
| skupina zaškrtávacích polí, prepínače | každá položka v `div.checkbox` / `div.radio` | vždy |

Ak chcete niektorú z nich pre prvok zmeniť, nastavte triedu na prvku sami (tlačidlo s `btn` v triede zostane bez zmeny), alebo vykresľovač obaľte ([Prispôsobenie](/sk/guide/customizing#wrapping-the-renderer)).
