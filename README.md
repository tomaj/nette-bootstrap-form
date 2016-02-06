Nette bootstrap form renderer
=============================

Simple nette bootstrap form renderers.

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
