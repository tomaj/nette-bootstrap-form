---
title: Bezpečnosť
description: 'Ako nahlásiť zraniteľnosť v nette-bootstrap-form, podporované verzie a na čo myslieť pri escapovaní, validácii, CSRF a Bootstrape 3 pri vykresľovaní formulárov.'
---

# Bezpečnosť {#security}

## Nahlásenie zraniteľnosti {#reporting-a-vulnerability}

Bezpečnostnú zraniteľnosť nenahlasujte vo verejnom issue. Nahláste ju neverejne cez [GitHub private vulnerability reporting](https://github.com/tomaj/nette-bootstrap-form/security/advisories/new) alebo e-mailom podľa [bezpečnostnej politiky](https://github.com/tomaj/nette-bootstrap-form/blob/master/SECURITY.md), kde sú aj podporované verzie a spôsob zverejňovania opráv.

| Verzia | Podpora |
|---|---|
| 3.x | vo vývoji na `master` (zatiaľ nevydaná) |
| 2.x | opravy chýb a bezpečnostné opravy; po vydaní 3.0.0 už len bezpečnostné opravy počas šiestich mesiacov |
| < 2.0 | nie |

## Čo vykresľovače robia a čo nie {#what-the-renderers-do-and-do-not-do}

Vykresľovače pridávajú CSS triedy a obaľujúce elementy. Samy nevypisujú žiadne používateľské dáta: popisky, hodnoty, placeholdery, popisy a chybové hlášky vykresľuje nette/forms a `Nette\Utils\Html`, ktoré ich escapujú presne tak ako predvolený renderer Nette.

Za čo zodpovedáte vy:

- **Popisy, popisky a chyby typu `Html` sa neescapujú.** Objekt `Nette\Utils\Html` (alebo akýkoľvek `HtmlStringable`) odovzdaný ako popis, popisok skupiny alebo chyba sa vloží tak, ako je; pozrite [Popisy](/sk/guide/errors#descriptions). Nikdy ho nestavajte z používateľského vstupu bez escapovania.
- **Validujte na serveri.** `novalidate` a `netteForms.js` menia len to, čo sa deje v prehliadači. Nette validuje odoslané dáta na serveri vždy, keď sa formulár spracúva, bez ohľadu na renderer.
- **CSRF.** nette/forms predvolene odmieta cross-origin POST odoslania (kontroluje hlavičku `Sec-Fetch-Site` alebo svoju same-site cookie). Pre vyššiu ochranu pridá `$form->addProtection()` pole s tokenom; je to skryté pole, takže ho vykresľovače vložia do skrytého `<div>` pred `</form>` ako každé iné.
- **Samotný Bootstrap.** Vykresľovače potrebujú len **CSS** Bootstrapu 3. Bootstrap 3 dosiahol koniec životnosti v roku 2019 a bezpečnostné upozornenia zverejnené odvtedy pre jeho JavaScriptové pluginy nie sú v 3.4.1 opravené. Ak načítavate `bootstrap.js` 3.x, preverte tieto upozornenia pre pluginy, ktoré používate. Súbory z CDN načítavajte s hashom `integrity`, ako v kapitole [Začíname](/sk/guide/getting-started#add-the-bootstrap-css).

## Dodávateľský reťazec {#supply-chain}

Vydania sa tagujú z vetvy `master` a GitHub release obsahuje archívy zdrojového kódu s atestáciami pôvodu zostavenia (pozrite [RELEASING.md](https://github.com/tomaj/nette-bootstrap-form/blob/master/RELEASING.md)). Balík má jednu závislosť pre beh, nette/forms. CI spúšťa `composer audit`, CodeQL a OpenSSF Scorecard.
