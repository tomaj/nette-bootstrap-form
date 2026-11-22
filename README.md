Nette bootstrap form renderer
=============================

[![CI](https://github.com/tomaj/nette-bootstrap-form/actions/workflows/ci.yml/badge.svg)](https://github.com/tomaj/nette-bootstrap-form/actions/workflows/ci.yml)

Simple nette bootstrap form renderers.

Requires PHP 8.3 or newer and nette/forms 3.2+.

Installation
------------

```sh
composer require tomaj/nette-bootstrap-form
```

Usage
-----

```php
use Tomaj\Form\Renderer\BootstrapRenderer;
use Nette\Application\UI\Form;

$form = new Form;
$form->setRenderer(new BootstrapRenderer);
```

For inline form you can use ```Tomaj\Form\Renderer\BootstrapInlineRenderer```

For vertical form (bootstrap default) you can use ```Tomaj\Form\Renderer\BootstrapVerticalRenderer```
