Nette bootstrap form renderer
=============================

Simple nette bootstrap form renderers.

Instalation
-----------

```sh
composer require tomaj/nette-bootstrap-form
```

Usage
-----

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = \Nette\UI\Form();
$form->addRenderer(new BootstrapRenderer());
```

For inline form you can use ```Tomaj\Form\Renderer\BootstrapInlineRenderer```
