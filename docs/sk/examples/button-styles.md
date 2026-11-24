---
title: 'Príklad: štýly tlačidiel'
description: 'Aké triedy Bootstrapu dajú vykresľovače tlačidlám, primárny a bežný štýl a tlačidlá s vlastnými triedami btn nastavenými ako reťazec, cez addClass() alebo bez btn.'
---

# Štýly tlačidiel {#button-styles}

Vykresľovače dajú prvému tlačidlu bez triedy `btn` triedy `btn btn-primary` a každému ďalšiemu `btn btn-default`. Tlačidlo, ktorého trieda už obsahuje `btn`, zostane nedotknuté a primárny štýl nespotrebuje. Tento formulár má od každého druhu jedno tlačidlo:

<<< @/../examples/button-styles/run.php

## Náhľad {#preview}

<FormPreview name="button-styles" />

| Tlačidlo | Trieda nastavená v PHP | Vykreslená trieda |
|---|---|---|
| Save | žiadna | `btn btn-primary button` |
| Delete | `btn btn-danger` | `btn btn-danger button` |
| Save as draft | `js-draft` | `js-draft btn btn-default button` |
| Cancel | `btn btn-link` cez `addClass()` | `btn btn-link button` |
| Preview | žiadna (`addButton()`) | `btn btn-default button` |

Trieda `button` na konci pochádza z položiek `control .submit` a `.button` v `$wrappers` (pozrite [Konfiguráciu](/sk/guide/configuration#control)).

## Výstup {#output}

<<< @/../examples/button-styles/expected-output.txt{html}

Tlačidlá nasledujú za sebou, takže zdieľajú jednu `form-group`. `Cancel` preskočí validáciu (`setValidationScope([])`), čo nette/forms vykreslí ako `formnovalidate`.

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/button-styles
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/button-styles/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
