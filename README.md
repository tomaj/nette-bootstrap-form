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

$form = \Nette\Application\UI\Form();
$form->setRenderer(new BootstrapRenderer());
```

For inline form you can use ```Tomaj\Form\Renderer\BootstrapInlineRenderer```
