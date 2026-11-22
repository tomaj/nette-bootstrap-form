# Upgrading from 2.x to 3.0

3.0 keeps the rendered HTML of 2.x byte for byte: a form rendered by a 3.0 renderer has the same markup as with 2.1.1. The breaking changes are about the platform and the classes themselves.

## PHP 8.4 or newer

3.0 requires PHP 8.4 (`"php": "^8.4"`; 2.x allowed PHP 7.1+). Stay on 2.x until you run PHP 8.4. nette/forms 3.2, which 2.1 already required, needs PHP 8.1 anyway.

Before (`composer.json`):

```json
"require": {
    "php": ">=7.1",
    "tomaj/nette-bootstrap-form": "^2.1"
}
```

After:

```json
"require": {
    "php": "^8.4",
    "tomaj/nette-bootstrap-form": "^3.0"
}
```

## The renderers are final

`BootstrapRenderer`, `BootstrapVerticalRenderer` and `BootstrapInlineRenderer` are `final`, so they can no longer be extended. The usual reason to subclass was to change `$wrappers`; set them on the instance instead. The HTML that 3.0 renders for a given `$wrappers` configuration is the same as in 2.x.

Before:

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

class WideLabelRenderer extends BootstrapRenderer
{
    public function __construct()
    {
        parent::__construct();
        $this->wrappers['label']['container'] = 'div class="col-sm-4 control-label"';
        $this->wrappers['control']['container'] = 'div class=col-sm-8';
    }
}

$form->setRenderer(new WideLabelRenderer());
```

After:

```php
use Tomaj\Form\Renderer\BootstrapRenderer;

$renderer = new BootstrapRenderer();
$renderer->wrappers['label']['container'] = 'div class="col-sm-4 control-label"';
$renderer->wrappers['control']['container'] = 'div class=col-sm-8';

$form->setRenderer($renderer);
```

If you need the configured renderer in several places, create it in a factory function or register it as a service in your DI container. If you overrode `render()` to change the form before rendering, wrap the renderer instead of extending it:

```php
use Nette\Forms\Form;
use Nette\Forms\FormRenderer;
use Tomaj\Form\Renderer\BootstrapRenderer;

final class MyRenderer implements FormRenderer
{
    private BootstrapRenderer $inner;

    public function __construct()
    {
        $this->inner = new BootstrapRenderer();
    }

    public function render(Form $form, ?string $mode = null): string
    {
        $form->getElementPrototype()->addClass('my-form');

        return $this->inner->render($form, $mode);
    }
}
```

Note that `Nette\Forms\FormRenderer::render()` takes only the form; `Form::render()` and `echo $form` call it that way. Call `$this->inner->render($form, 'begin')` and so on directly when you render a form part by part.
