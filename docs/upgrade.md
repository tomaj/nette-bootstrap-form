---
title: Upgrading to 3.0
description: 'How to upgrade from nette-bootstrap-form 2.x to 3.0, PHP 8.4 and final renderer classes; the rendered HTML stays the same.'
---

<!--@include: ../UPGRADE-3.0.md-->

## After upgrading

- Run your form tests or compare a few rendered forms before and after: the HTML must be the same. [Testing your forms](/guide/testing) shows how to snapshot it.
- If you subclassed a renderer to change `$wrappers`, the [configuration reference](/guide/configuration) lists every key.

The full list of changes is in the [changelog](/changelog).
