---
title: Príklady
description: 'Osem spustiteľných receptov pre nette-bootstrap-form s kódom, presným HTML, ktoré vypíšu, a živým náhľadom s CSS Bootstrapu 3, všetky otestované v CI.'
---

# Príklady {#examples}

Každý príklad je malý PHP projekt v [`examples/`](https://github.com/tomaj/nette-bootstrap-form/tree/master/examples): `composer.json`, `run.php`, ktorý zostaví formulár a vypíše HTML, a `expected-output.txt` s týmto HTML. Každá stránka ukazuje kód, náhľad HTML s CSS Bootstrapu 3.4.1 a samotné HTML.

<LinkCards :items="[
  { title: 'Tri rozloženia', text: 'Jeden kontaktný formulár vykreslený horizontálnym, vertikálnym a inline vykresľovačom.', link: '/sk/examples/layouts' },
  { title: 'Všetky typy prvkov', text: 'Text, číslo, dátum, výber, zaškrtávacie polia a prepínače, nahrávanie súborov, skryté polia a tri druhy tlačidiel.', link: '/sk/examples/all-controls' },
  { title: 'Inline filter', text: 'GET filter nad zoznamom objednávok, na jednom riadku.', link: '/sk/examples/inline-filter' },
  { title: 'Chyby validácie', text: 'Registračný formulár odoslaný s neplatnými hodnotami: alert, has-error a help bloky.', link: '/sk/examples/validation-errors' },
  { title: 'Objednávka so skupinami', text: 'Fieldsety s legendami a popismi, prepínače a pomocné texty.', link: '/sk/examples/checkout-groups' },
  { title: 'Štýly tlačidiel', text: 'Primárne, bežné a vaše vlastné triedy btn, ako reťazec, pole aj cez addClass().', link: '/sk/examples/button-styles' },
  { title: 'Vlastné obaly', text: 'Mriežka col-md-4 + col-md-8, označenie povinných polí, validácia v prehliadači a jeden element na každú chybu.', link: '/sk/examples/custom-wrappers' },
  { title: 'Manuálne vykresľovanie', text: 'Prihlasovací formulár vykreslený po častiach do Bootstrap panelu dekorujúcim vykresľovačom.', link: '/sk/examples/manual-rendering' },
]" />

## Spustenie príkladu {#running-an-example}

Všetky príklady potrebujú PHP 8.4 alebo novšie a Composer. Nepotrebujú webový server, databázu ani pripojenie k sieti, okrem `composer install`:

```bash
git clone https://github.com/tomaj/nette-bootstrap-form.git
cd nette-bootstrap-form/examples/layouts
composer install
php run.php
```

Kým nebude otagovaná verzia 3.0.0, príklady vyžadujú `tomaj/nette-bootstrap-form: dev-master` s `"minimum-stability": "dev"` a `"prefer-stable": true`; po vydaní prejdú na `^3.0`.

## Ako sa príklady testujú {#how-the-examples-are-tested}

[Workflow `Examples`](https://github.com/tomaj/nette-bootstrap-form/blob/master/.github/workflows/examples.yml) spustí každý príklad pri každom pushi a pull requeste:

1. `examples/ci/example.sh <name>` skopíruje príklad do dočasného adresára.
2. `examples/ci/use-local-bootstrap-form.sh` pridá koreň repozitára ako Composer path repozitár, nainštaluje z neho balík a zlyhá, ak je vo `vendor/` čokoľvek iné. Pull request tak spúšťa príklady proti vlastnému kódu.
3. `php run.php` vypíše HTML, ktoré sa musí bajt po bajte zhodovať s `expected-output.txt` (`diff -u`).

Náhľady na týchto stránkach sa pri zostavení webu vytvárajú z tých istých súborov `expected-output.txt` (`docs/scripts/previews.mjs`), takže náhľad vždy ukazuje HTML, ktoré CI overilo. Príklad proti svojmu checkoutu spustíte cez `examples/ci/example.sh layouts`; po zámernej zmene výstupu zapíše `examples/ci/example.sh --update layouts` nový `expected-output.txt`.

PHP ukážky na ostatných stránkach tohto webu spúšťa `tests/DocsSnippetsTest.php` v sade PHPUnit testov a porovnáva aj ich zdokumentovaný výstup.
