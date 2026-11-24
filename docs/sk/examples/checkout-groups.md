---
title: 'Príklad: objednávka so skupinami'
description: 'Objednávkový formulár rozdelený do fieldsetov s legendami a popismi, prepínače pre doručenie a platbu, pomocné texty a skupina tlačidiel, vykreslený cez BootstrapRenderer.'
---

# Objednávka so skupinami {#checkout-with-groups}

Objednávkový formulár rozdelený do skupín cez `addGroup()`. Z každej skupiny je `<fieldset>` s `<legend>`; popis skupiny je `<p>` pod legendou a popisy prvkov sú `help-block`.

<<< @/../examples/checkout-groups/run.php

## Náhľad {#preview}

<FormPreview name="checkout-groups" />

- Každá skupina má vo fieldsete vlastný kontajner prvkov `div` (`controls container` horizontálneho vykresľovača).
- Posledná skupina nemá popisok, takže jej fieldset nemá legendu; oddeľuje podmienky a tlačidlá od platobných polí.
- `Back to cart` má `setValidationScope([])`, takže odíde bez validácie formulára, a dostane `btn-default`, pretože je to druhé tlačidlo.

## Výstup {#output}

<<< @/../examples/checkout-groups/expected-output.txt{html}

Skupiny sa vykreslia v poradí, v akom boli pridané. Prvky pridané pred prvým `addGroup()` nepatria do žiadnej skupiny a vykreslia sa až za všetkými skupinami.

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/checkout-groups
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/checkout-groups/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
