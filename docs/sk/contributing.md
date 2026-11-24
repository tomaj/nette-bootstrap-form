---
title: Ako prispieť
description: 'Ako prispieť do nette-bootstrap-form, spustiť kontroly a upraviť dokumentáciu.'
---

# Ako prispieť {#contributing}

Pull requesty sú vítané v [tomaj/nette-bootstrap-form](https://github.com/tomaj/nette-bootstrap-form). Pravidlá projektu sú v [CONTRIBUTING.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/CONTRIBUTING.md) a táto stránka s nimi súhlasí. Pri spolupráci platí [kódex správania](https://github.com/tomaj/nette-bootstrap-form/blob/master/CODE_OF_CONDUCT.md). Bezpečnostné zraniteľnosti sa hlásia neverejne, pozrite [bezpečnostnú politiku](https://github.com/tomaj/nette-bootstrap-form/blob/master/SECURITY.md).

## Zmeny, ktoré vieme zlúčiť {#changes-we-can-merge}

- Dodržujte [PER Coding Style](https://www.php-fig.org/per/coding-style/). `composer phpcs` kontroluje `src` a `tests`.
- Ku každej zmene správania pridajte testy. Testy vykresľovania porovnávajú HTML bajt po bajte so súbormi `tests/fixtures/<renderer>/<case>.html`; zmena výstupu aktualizuje fixture v tom istom pull requeste a je opísaná v zozname zmien.
- Zmeny správania zdokumentujte v `README.md`, na týchto stránkach a v `CHANGELOG.md`.
- [Sémantické verziovanie](https://semver.org/): iný HTML výstup pre existujúci formulár je nekompatibilná zmena a čaká na ďalšiu hlavnú verziu.
- Jeden pull request na jednu zmenu, z vlastnej vetvy.

## Kontroly {#checks}

```bash
composer install
composer check      # code style, PHPStan, Rector, tests
composer coverage   # HTML and Clover coverage in build/ (Xdebug or PCOV)
composer infection  # mutation testing
```

CI spúšťa testy na PHP 8.4 (aj s najnižšími závislosťami), 8.5 a 8.6 a navyše na nočnom PHP 8.7, ktoré môže zlyhať. Na PHP 8.6 sa kontroluje aj pokrytie príkazov a spúšťa sa Infection.

## Dokumentácia {#documentation}

Web sa zostavuje pomocou [VitePress](https://vitepress.dev/) z adresára `docs/`:

```bash
cd docs
npm ci
npm run docs:dev    # local preview
npm run docs:links  # build and check every link
```

Každý blok kódu `php` na týchto stránkach, v `README.md` a v `UPGRADE-3.0.md` spúšťa `tests/DocsSnippetsTest.php` v sade PHPUnit testov. Blok označený `<!-- snippet: skip -->` sa nespúšťa; blok `html` označený `<!-- snippet: output -->` sa musí zhodovať s výstupom PHP bloku pred ním.

Slovenské stránky v `docs/sk/` majú rovnaké cesty ako anglické a ich bloky kódu sú totožné; pri zmene anglickej stránky upravte aj jej slovenskú dvojičku. `python3 scripts/check-locales.py` (beží v CI) zlyhá, keď stránke chýba dvojička alebo sa bloky kódu líšia.

### Príklady {#examples}

[Príklady](/sk/examples/) sú v `examples/<name>/` (`composer.json`, `run.php`, `expected-output.txt`). Stránky príkladov vkladajú ich súbory cez `<<< @/../examples/<name>/run.php`, takže dokumentácia ukazuje otestovaný kód. `npm run docs:build` najprv spustí `scripts/previews.mjs`, ktorý z každého `expected-output.txt` vytvorí `public/previews/<name>.html` s CSS Bootstrapu 3.4.1 (uloženým v `public/vendor/`) pre komponent `<FormPreview>`.

```bash
examples/ci/example.sh layouts            # run one example against this checkout, diff the output
examples/ci/example.sh --update layouts   # write the new output after an intended change
```

Nový príklad potrebuje stránku v `docs/examples/` (a v `docs/sk/examples/`), položku v bočnom paneli (`docs/.vitepress/config.mts`) a v matici `.github/workflows/examples.yml`.

### Grafika {#artwork}

Logo, favicon, ilustrácia na úvodnej stránke, ikony funkcií a diagramy sa kreslia v `docs/scripts/brand-svg.mjs`, vo svetlej a tmavej variante. Po zmene:

```bash
cd docs
node scripts/brand-svg.mjs                    # SVG files in public/
CHROME_PATH=/path/to/chrome node scripts/brand-png.mjs   # favicon PNGs, favicon.ico, og.png
npm run check:svg                             # every SVG is well-formed XML
```

## Vydania {#releases}

Správcovia vydávajú nové verzie pushnutím tagu verzie, ako opisuje [RELEASING.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/RELEASING.md).
