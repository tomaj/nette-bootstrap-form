<?php

declare(strict_types=1);

namespace Tomaj\Form\Renderer;

use Nette\Forms\Form;
use Nette\Forms\Rendering\DefaultFormRenderer;

/**
 * Inline Bootstrap 3 form: all controls on one line (form-inline).
 *
 * Configure the markup through $wrappers on the instance; the class is final.
 */
final class BootstrapInlineRenderer extends DefaultFormRenderer
{
    use DecoratesControls;

    public array $wrappers = [
        'form' => [
            'container' => '',
        ],
        'error' => [
            'container' => 'div class="alert alert-danger"',
            'item' => 'p',
        ],
        'group' => [
            'container' => 'fieldset',
            'label' => 'legend',
            'description' => 'p',
        ],
        'controls' => [
            'container' => '',
        ],
        'pair' => [
            'container' => 'div class=form-group',
            '.required' => 'required',
            '.optional' => null,
            '.odd' => null,
            '.error' => 'has-error',
        ],
        'control' => [
            'container' => null,
            '.odd' => null,
            'description' => 'span class=help-block',
            'requiredsuffix' => '',
            'errorcontainer' => 'span class=help-block',
            'erroritem' => '',
            '.required' => 'required',
            '.text' => 'text',
            '.password' => 'text',
            '.file' => 'text',
            '.submit' => 'button',
            '.image' => 'imagebutton',
            '.button' => 'button',
        ],
        'label' => [
            'container' => '',
            'suffix' => null,
            'requiredsuffix' => '',
        ],
        'hidden' => [
            'container' => 'div',
        ],
    ];

    public function __construct(private readonly bool $novalidate = true) {}

    #[\Override]
    public function render(Form $form, ?string $mode = null): string
    {
        $this->decorateForm($form, 'form-inline', $this->novalidate);

        return parent::render($form, $mode);
    }
}
