---
title: 'Príklad: inline filter'
description: 'GET filter nad zoznamom objednávok vykreslený na jeden riadok cez BootstrapInlineRenderer, s vyhľadávacím poľom, výberom stavu, dátumom a dvoma tlačidlami.'
---

# Inline filter

Filter nad zoznamom objednávok. Odosiela sa cez GET, takže filter je v URL a vyfiltrovaný zoznam si môžete uložiť do záložiek, a s `BootstrapInlineRenderer` sa zmestí na jeden riadok.

<<< @/../examples/inline-filter/run.php

## Náhľad {#preview}

<FormPreview name="inline-filter" />

Od breakpointu `sm` Bootstrapu (768 px) sú `form-group` nastavené na `inline-block` a vstupy na `width: auto`. Na telefóne sú pod sebou, ako vo vertikálnom rozložení.

`Clear` má `setValidationScope([])`, takže odošle formulár bez validácie; nette/forms mu pridá `formnovalidate`. Tlačidlo nepomenúvajte `reset` ani `submit`: tieto názvy kolidujú s vlastnosťami elementu `<form>` v prehliadači a nette/forms ich premenuje (na `_reset`).

Vstup pre dátum dostane `form-control` ako ostatné polia (od 3.0, [#33](https://github.com/tomaj/nette-bootstrap-form/issues/33)).

## Výstup {#output}

<<< @/../examples/inline-filter/expected-output.txt{html}

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/inline-filter
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/inline-filter/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
