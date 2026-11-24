---
title: Časté otázky
description: 'Časté otázky o nette-bootstrap-form: Bootstrap 4 a 5, Latte, polia s dátumom, tlačidlá, chyby, novalidate a dedenie od vykresľovačov.'
---

# Časté otázky {#faq}

## Funguje s Bootstrapom 4 alebo 5? {#does-it-work-with-bootstrap-4-or-5}

Nie. Vykresľovače generujú markup pre [Bootstrap 3](https://getbootstrap.com/docs/3.4/css/#forms): `form-group`, `control-label`, `help-block`, `has-error`, `btn-default`, `div.checkbox`. Bootstrap 4 a 5 používajú iné triedy (`form-check`, `invalid-feedback`, `is-invalid`, `mb-3`), takže väčšina vzhľadu by sa stratila. Čiastočne si pomôžete zmenou [`$wrappers`](/sk/guide/configuration), ale triedy tlačidiel a zaškrtávacích polí sú pevne v kóde. Pre Bootstrap 5 je lepšou voľbou samostatný vykresľovač.

## Ktoré verzie nette/forms sú podporované? {#which-nette-forms-versions-are-supported}

3.2 a novšie verzie 3.x (`"nette/forms": "^3.2"`) na PHP 8.4 alebo novšom. CI spúšťa testy s najnižšími aj najnovšími povolenými verziami.

## Prečo moje pole s dátumom nevyzerá ako ostatné vstupné polia? {#why-does-my-date-input-not-look-like-the-other-inputs}

`addDate()`, `addTime()`, `addDateTime()` a `addColor()` vytvárajú prvky, ktoré v nette/forms nie sú textové vstupy, a vykresľovače pridávajú `form-control` len textovým vstupom, textovým oblastiam a výberovým poliam. Triedu pridajte sami cez `->setHtmlAttribute('class', 'form-control')`; pozrite [Prvky formulára](/sk/guide/controls#date-time-and-colour-inputs) a [#33](https://github.com/tomaj/nette-bootstrap-form/issues/33).

## Prečo moje tlačidlo nie je modré? {#why-is-my-button-not-blue}

`btn-primary` dostane iba prvé tlačidlo bez triedy `btn`. Ak predchádzajúce tlačidlo nemá žiadnu triedu, primárne je to. Ak má vaše tlačidlo akúkoľvek triedu obsahujúcu `btn` (aj samotné `btn-lg`), vykresľovač ho nechá tak, ako je; dajte mu kompletné triedy, napríklad `btn btn-primary btn-lg`. Pozrite [Tlačidlá](/sk/guide/controls#buttons).

## Môžem od vykresľovača dediť? {#can-i-extend-a-renderer}

Od verzie 3.0 nie: triedy sú `final`. Nastavte `$wrappers` na inštancii ([Prispôsobenie](/sk/guide/customizing)) alebo vykresľovač obaľte vlastným `Nette\Forms\FormRenderer` ([Obalenie vykresľovača](/sk/guide/customizing#wrapping-the-renderer)). [Prechod na 3.0](/sk/upgrade) ukazuje obe možnosti s kódom pred a po.

## Prečo chýbajú Bootstrap triedy, keď formulár vykreslím v Latte? {#why-are-the-bootstrap-classes-missing-when-i-render-the-form-in-latte}

`{form}`, `{label}`, `{input}` a `n:name` vykresľujú prvky bez volania vykresľovača. Používajú ho iba `{control myForm}`, `echo $form` a `$form->render()`. Triedy napíšte do šablóny alebo vykreslite časti pomocou vykresľovača; pozrite [Nette aplikácia](/sk/guide/nette-application#manual-rendering-in-latte).

## Odkiaľ sa berú triedy `text` a `button`? {#where-do-the-text-and-button-classes-come-from}

Z `$wrappers` (`control .text`, `.submit`, ...), zdedených z predvoleného vykresľovača Nette. V Bootstrape nemajú žiadny význam; ak ich chcete odstrániť, nastavte tieto kľúče na `null` ([Prispôsobenie](/sk/guide/customizing#dropping-the-text-and-button-classes)).

## Prečo prehliadač nezobrazuje vlastné bubliny s validáciou? {#why-does-the-browser-not-show-its-own-validation-bubbles}

Vykresľovače predvolene pridávajú formuláru `novalidate`, takže chyby zobrazuje validácia Nette. Ak chcete validáciu prehliadača ponechať, vytvorte vykresľovač s `novalidate: false` ([HTML5 validácia](/sk/guide/errors#html5-validation-novalidate)).

## Môžem formulár vykresliť dvakrát alebo dvoma vykresľovačmi? {#can-i-render-a-form-twice-or-with-two-renderers}

Opakované vykreslenie toho istého formulára tým istým vykresľovačom dá rovnaké HTML; triedy sa nepridajú dvakrát. Pri vykreslení iným vykresľovačom zostanú triedy prvého (napríklad `form-horizontal` na `<form>`), pretože sú uložené vo formulári a jeho prvkoch. Pre každé rozloženie vytvorte nový formulár, ako to robí [`examples/layouts`](/sk/examples/layouts).

## Escapuje vykresľovač moje popisky a hodnoty? {#does-the-renderer-escape-my-labels-and-values}

Escapuje ich nette/forms, presne ako pri predvolenom vykresľovači. Objekty `Html` sa vkladajú tak, ako sú; pozrite [Bezpečnosť](/sk/security).

## Ako dám dve vstupné polia vedľa seba? {#how-do-i-put-two-inputs-side-by-side}

Voľba `nextTo` vykreslí dva prvky v jednej dvojici, ale oba sú `form-control` na celú šírku. Pre skutočný riadok (input group, dva stĺpce) vykreslite túto časť formulára ručne v Latte; pozrite [Viac prvkov v jednom riadku](/sk/guide/controls#several-controls-in-one-row).
