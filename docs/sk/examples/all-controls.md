---
title: 'Príklad: všetky typy prvkov'
description: 'Každý typ prvku z nette/forms, od textových a číselných vstupov cez výber dátumu, zoznamy zaškrtávacích polí, nahrávanie súborov a skryté polia až po obrázkové tlačidlá, vykreslený cez BootstrapRenderer.'
---

# Všetky typy prvkov {#every-control-type}

Profilový formulár s jedným prvkom každého typu, ktorý nette/forms ponúka, vykreslený horizontálnym vykresľovačom. Slúži ako referencia toho, čo renderer pridá ku ktorému prvku; tabuľka je v kapitole [Prvky formulára](/sk/guide/controls#what-each-control-gets).

<<< @/../examples/all-controls/run.php

## Náhľad {#preview}

<FormPreview name="all-controls" />

Na čo sa pozrieť:

- Textové vstupy, heslo, e-mail, číslo, textová oblasť aj oba výbery majú `form-control`.
- Výber farby ho **nemá**: Bootstrap 3 preň nemá štýl, takže si ponechá vzhľad prehliadača; pozrite [Polia na dátum, čas a farbu](/sk/guide/controls#date-time-and-colour-inputs).
- Zaškrtávacie pole je obalené v `div.checkbox`, každá položka zoznamu zaškrtávacích polí v `div.checkbox` a každý prepínač v `div.radio`.
- Vstupy pre súbory majú len triedu `text` z `$wrappers`. Ich limity veľkosti a počtu sú nastavené explicitne, pretože predvolené hodnoty pochádzajú z `php.ini` a na rôznych strojoch by sa líšili.
- Tri tlačidlá zdieľajú jednu `form-group`: odosielacie tlačidlo je `btn-primary`, bežné a obrázkové tlačidlo `btn-default`.
- Skryté pole sa vykreslí v `<div>` tesne pred `</form>`, za poľom `_form_`.

## Výstup {#output}

<<< @/../examples/all-controls/expected-output.txt{html}

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/all-controls
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/all-controls/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
