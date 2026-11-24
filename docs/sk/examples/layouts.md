---
title: 'Príklad: tri rozloženia'
description: 'Jeden kontaktný formulár vykreslený cez BootstrapRenderer, BootstrapVerticalRenderer a BootstrapInlineRenderer, s HTML, ktoré každý z nich vypíše, a náhľadom.'
---

# Tri rozloženia {#three-layouts}

Ten istý kontaktný formulár (povinné meno a e-mail, zaškrtávacie pole a odosielacie tlačidlo) vykreslený každým z troch vykresľovačov. Pomôže vám vybrať rozloženie: porovnajte náhľady a potom HTML.

<<< @/../examples/layouts/run.php

Každé rozloženie dostane vlastnú inštanciu `Form`: renderer pridáva triedy prvkom formulára, ktorý vykresľuje, a trieda `form-horizontal` horizontálneho formulára by inak zostala na formulári aj vtedy, keď ho vykreslí iný renderer.

## Náhľad {#preview}

<FormPreview name="layouts" />

- `BootstrapRenderer` dá popisky do stĺpca `col-sm-3`. Zaškrtávacie pole a tlačidlo popisok nemajú, takže ich stĺpec pre popisok je prázdny a zarovnajú sa so vstupmi.
- `BootstrapVerticalRenderer` vykreslí popisok nad každým prvkom, bez mriežky.
- `BootstrapInlineRenderer` vykreslí ten istý markup ako vertikálny, len s `form-inline` na formulári, takže od 768 px je všetko na jednom riadku.

## Výstup {#output}

<<< @/../examples/layouts/expected-output.txt{html}

Pomenované formuláre (`new Form('horizontal')`) dostanú id ako `frm-horizontal-name`, takže všetky tri formuláre môžu byť na jednej stránke, a skryté pole `_form_`, podľa ktorého Nette vie, ktorý formulár bol odoslaný.

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/layouts
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/layouts/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
