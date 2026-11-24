---
title: 'Príklad: chyby validácie'
description: 'Registračný formulár odoslaný s neplatnými hodnotami, zvalidovaný Nette a vykreslený cez BootstrapRenderer s boxom alert-danger, skupinami has-error a help blokmi.'
---

# Chyby validácie {#validation-errors}

Registračný formulár odoslaný s neplatným e-mailom, vekom pod 18 rokov, krátkym heslom a neodsúhlasenými podmienkami. Odoslané hodnoty zvaliduje Nette; renderer zobrazí výsledok.

<<< @/../examples/validation-errors/run.php

V aplikácii pochádzajú POST dáta z prehliadača. Tu je `Nette\Http\Request` zostavený ručne: hlavička `Sec-Fetch-Site` a cookie `_nss` sú to, čo prehliadač posiela pri same-site requeste (nette/forms odmieta cross-site POST), a `_form_` je skryté pole pomenovaného formulára. Techniku vysvetľuje kapitola [Testovanie formulárov](/sk/guide/testing#submitting-a-form-in-a-test).

## Náhľad {#preview}

<FormPreview name="validation-errors" />

- Chyba formulára pridaná v `onError` je v boxe `alert alert-danger` nad prvkami.
- Každý prvok s chybou má na svojej `form-group` triedu `has-error` a chybovú hlášku v `help-block` pod vstupom.
- Heslo má dva help bloky: svoj popis a svoju chybu.
- Platné meno si zachová hodnotu; heslo sa, ako vždy v nette/forms, späť nevykreslí.

## Výstup {#output}

<<< @/../examples/validation-errors/expected-output.txt{html}

Pri vykreslení celého formulára sa v alert boxe zobrazia len vlastné chyby formulára. Ak tam chcete vypísať všetky chyby, vykreslite časti s režimom `errors`; pozrite [Validácia a chyby](/sk/guide/errors#form-errors-and-control-errors).

## Spustenie {#run-it}

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/validation-errors
composer install
php run.php
```

Výstup sa v CI pri každom pull requeste porovnáva s [`expected-output.txt`](https://github.com/tomaj/nette-bootstrap-form/blob/master/examples/validation-errors/expected-output.txt); pozrite [ako sa príklady testujú](/sk/examples/#how-the-examples-are-tested).
