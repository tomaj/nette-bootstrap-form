---
title: 'Príklad: manuálne vykresľovanie'
description: 'Prihlasovací formulár vykreslený po častiach (begin, errors, body, end) do Bootstrap panelu vykresľovačom, ktorý obaľuje BootstrapVerticalRenderer a pridáva triedu ajax.'
---

# Manuálne vykresľovanie {#manual-rendering}

Prihlasovací formulár vložený do Bootstrap panelu. Formulár sa vykresľuje po častiach, aby okolo neho mohol byť markup panelu, a to malým vykresľovačom, ktorý obaľuje `BootstrapVerticalRenderer` a pridáva triedu `ajax`: Bootstrap vykresľovače sú `final`, takže takto zmeníte formulár predtým, než ho vykreslia.

<<< @/../examples/manual-rendering/run.php

## Náhľad {#preview}

<FormPreview name="manual-rendering" />

- `AjaxFormRenderer` implementuje `Nette\Forms\FormRenderer`, takže sa dá nastaviť cez `$form->setRenderer()` ako ktorýkoľvek renderer; tu sa volá priamo.
- `begin` vypíše značku `<form>`, `errors` alert so všetkými chybami, `body` dvojice popisok – prvok a `end` skryté polia a `</form>`.
- Prvé volanie `render()` upraví prvky, takže neskoršie časti už majú triedy Bootstrapu.

## Výstup {#output}

<<< @/../examples/manual-rendering/expected-output.txt{html}

To isté v Latte šablóne nájdete v kapitole [Nette aplikácia](/sk/guide/nette-application#rendering-parts-in-a-template).

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/manual-rendering
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/manual-rendering/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
