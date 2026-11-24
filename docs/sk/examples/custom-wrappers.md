---
title: 'Príklad: vlastné obaly'
description: 'BootstrapRenderer nakonfigurovaný na inštancii, mriežka col-md-4 + col-md-8, označenie povinných polí, validácia v prehliadači a jeden element na každú chybu prvku.'
---

# Vlastné obaly {#custom-wrappers}

Triedy vykresľovačov sú `final`; markup zmeníte nastavením `$wrappers` na inštancii. Tento formulár na odber newslettera používa renderer vytvorený v jednej funkcii, tak ako by ste to urobili v továrni na formuláre:

<<< @/../examples/custom-wrappers/run.php

## Náhľad {#preview}

Mriežka je `col-md-*`, ktorá platí od 992 px; náhľad je rozložený na túto šírku:

<FormPreview name="custom-wrappers" :width="1000" />

| Zmena | Kľúč v `$wrappers` | Výsledok |
|---|---|---|
| mriežka 4 + 8 na stredných obrazovkách | `label container`, `control container` | `div.col-md-4.control-label`, `div.col-md-8` |
| `*` za popiskami povinných polí | `label requiredsuffix` | `E-mail *` |
| jeden element na chybu | `control errorcontainer`, `control erroritem` | `div.help-block` s `div.text-danger` pre každú chybu |
| menší pomocný text | `control description` | `p.help-block.small` |
| validácia v prehliadači | konštruktor `novalidate: false` | formulár bez `novalidate` |

Každý kľúč je opísaný v [referencii konfigurácie](/sk/guide/configuration).

## Výstup {#output}

<<< @/../examples/custom-wrappers/expected-output.txt{html}

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/custom-wrappers
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/custom-wrappers/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
