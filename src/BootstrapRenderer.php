<?php

declare(strict_types=1);

namespace Tomaj\Form\Renderer;

use Nette\Forms\Form;
use Nette\Forms\Rendering\DefaultFormRenderer;

/**
 * Horizontal Bootstrap 3 form: labels in col-sm-3, controls in col-sm-9 (form-horizontal).
 *
 * Configure the markup through $wrappers on the instance; the class is final.
 */
final class BootstrapRenderer extends DefaultFormRenderer
{
    use DecoratesControls;

    public array $wrappers = [
        'form' => [
            'container' => null,
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
            'container' => 'div',
        ],
        'pair' => [
            'container' => 'div class=form-group',
            '.required' => 'required',
            '.optional' => null,
            '.odd' => null,
            '.error' => 'has-error',
        ],
        'control' => [
            'container' => 'div class=col-sm-9',
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
            'container' => 'div class="col-sm-3 control-label"',
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
        $this->decorateForm($form, 'form-horizontal', $this->novalidate);

        return parent::render($form, $mode);
    }
}
