---
layout: home
title: Nette Bootstrap Form
titleTemplate: Bootstrap vykresľovače pre Nette Forms
description: 'Bootstrap 3 vykresľovače (horizontálny, vertikálny, inline) pre Nette Forms. Nastavte jeden renderer a každý prvok formulára dostane triedy a obaly Bootstrapu, bez kódu v šablóne.'

hero:
  name: Nette Bootstrap Form
  text: Bootstrap markup pre Nette Forms
  tagline: Nastavte formuláru jeden renderer a každý prvok dostane triedy a obaly Bootstrapu 3. Bez šablón, bez kódu pre jednotlivé prvky, pri každom vykreslení rovnaké HTML.
  image:
    src: /illustrations/hero-sk-light.svg
    alt: Okno prehliadača s horizontálnym Bootstrap formulárom, ktorý vytvorilo jedno volanie setRenderer()
  actions:
    - theme: brand
      text: Začíname
      link: /sk/guide/getting-started
    - theme: alt
      text: Príklady
      link: /sk/examples/
    - theme: alt
      text: GitHub
      link: https://github.com/tomaj/nette-bootstrap-form

features:
  - icon:
      src: /icons/horizontal.svg
      alt: Horizontálne rozloženie
      width: 40px
      height: 40px
    title: Horizontálny
    details: BootstrapRenderer dá popisky do col-sm-3 a prvky do col-sm-9 formulára form-horizontal.
    link: /sk/guide/renderers#horizontal-bootstraprenderer
  - icon:
      src: /icons/vertical.svg
      alt: Vertikálne rozloženie
      width: 40px
      height: 40px
    title: Vertikálny
    details: BootstrapVerticalRenderer je predvolené rozloženie Bootstrapu, každý popisok nad svojím prvkom.
    link: /sk/guide/renderers#vertical-bootstrapverticalrenderer
  - icon:
      src: /icons/inline.svg
      alt: Inline rozloženie
      width: 40px
      height: 40px
    title: Inline
    details: BootstrapInlineRenderer vykreslí formulár form-inline, pre vyhľadávacie polia a filtre na jeden riadok.
    link: /sk/guide/renderers#inline-bootstrapinlinerenderer
  - icon:
      src: /icons/controls.svg
      alt: Prvok formulára
      width: 40px
      height: 40px
    title: Prvky upravené za vás
    details: form-control na vstupoch, textových poliach a výberoch, div.checkbox a div.radio okolo zaškrtávacích polí a prepínačov.
    link: /sk/guide/controls
  - icon:
      src: /icons/buttons.svg
      alt: Tlačidlá
      width: 40px
      height: 40px
    title: Primárne a bežné tlačidlá
    details: Prvé tlačidlo je btn-primary, ostatné btn-default. Tlačidlá s vlastnými triedami btn zostanú nedotknuté.
    link: /sk/guide/controls#buttons
  - icon:
      src: /icons/errors.svg
      alt: Chyby
      width: 40px
      height: 40px
    title: Chyby po bootstrapovsky
    details: Chyby formulára v boxe alert-danger, chyby prvku v help-block pod prvkom, has-error na skupine.
    link: /sk/guide/errors
---

<div class="home-more">

## Ako to vyzerá {#what-it-looks-like}

Vytvorte formulár ako zvyčajne a nastavte mu renderer:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('name', 'Name')->setRequired();
$form->addEmail('email', 'E-mail')->setRequired();
$form->addCheckbox('newsletter', 'Send me the newsletter');
$form->addSubmit('send', 'Send');

$form->setRenderer(new BootstrapRenderer());

echo $form;
```

Ten istý kontaktný formulár vykreslený každým z troch vykresľovačov, s CSS Bootstrapu 3.4.1. Je to otestovaný výstup príkladu [`examples/layouts`](/sk/examples/layouts):

<FormPreview name="layouts" title="examples/layouts" />

## Kam ďalej {#where-to-go-next}

<LinkCards :items="[
  { title: 'Začíname', text: 'Nainštalujte balík a vykreslite prvý formulár, aj s HTML, ktoré vytvorí.', link: '/sk/guide/getting-started' },
  { title: 'Vykresľovače', text: 'Horizontálny, vertikálny a inline: čo ktorý vykreslí a kedy ho použiť.', link: '/sk/guide/renderers' },
  { title: 'Prvky formulára', text: 'Každý typ prvku z nette/forms a Bootstrap markup, ktorý dostane.', link: '/sk/guide/controls' },
  { title: 'Validácia a chyby', text: 'Chyby formulára, chyby prvkov, popisy a HTML5 validácia.', link: '/sk/guide/errors' },
  { title: 'Prispôsobenie', text: 'Zmeňte $wrappers na inštancii, obaľte renderer, vykresľujte po častiach.', link: '/sk/guide/customizing' },
  { title: 'Príklady', text: 'Osem spustiteľných receptov s ich HTML a živým náhľadom, otestovaných v CI.', link: '/sk/examples/' },
]" />

Nainštalujte ho cez `composer require tomaj/nette-bootstrap-form` (PHP 8.4+, nette/forms 3.2+).

</div>
