<?php

declare(strict_types=1);

namespace Tomaj\Form\Renderer;

use Nette\Forms\Controls\Button;
use Nette\Forms\Controls\Checkbox;
use Nette\Forms\Controls\CheckboxList;
use Nette\Forms\Controls\MultiSelectBox;
use Nette\Forms\Controls\RadioList;
use Nette\Forms\Controls\SelectBox;
use Nette\Forms\Controls\TextBase;
use Nette\Forms\Form;
use Nette\Forms\Rendering\DefaultFormRenderer;

class BootstrapRenderer extends DefaultFormRenderer
{
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
        $form->getElementPrototype()->addClass('form-horizontal');

        if ($this->novalidate) {
            $form->getElementPrototype()->setNovalidate('novalidate');
        }

        $usedPrimary = false;
        foreach ($form->getControls() as $control) {
            if ($control instanceof Button) {
                if (!str_contains($this->classString($control->getControlPrototype()->getClass()), 'btn')) {
                    $control->getControlPrototype()->addClass($usedPrimary ? 'btn btn-default' : 'btn btn-primary');
                    $usedPrimary = true;
                }
            } elseif ($control instanceof TextBase
                || $control instanceof SelectBox
                || $control instanceof MultiSelectBox) {
                $control->getControlPrototype()->addClass('form-control');
            } elseif ($control instanceof Checkbox) {
                $control->getContainerPrototype()->setName('div')->addClass($control->getControlPrototype()->type);
            } elseif ($control instanceof CheckboxList
                || $control instanceof RadioList) {
                $control->getSeparatorPrototype()->setName('div')->addClass($control->getControlPrototype()->type);
            }
        }

        return parent::render($form, $mode);
    }

    /**
     * The class attribute is a string, or an array of class => enabled after Html::addClass().
     */
    private function classString(mixed $class): string
    {
        if (is_array($class)) {
            $classes = [];
            foreach ($class as $name => $value) {
                if ($value === true) {
                    $classes[] = (string) $name;
                } elseif (is_string($value) && $value !== '') {
                    $classes[] = $value;
                }
            }
            return implode(' ', $classes);
        }

        return is_string($class) ? $class : '';
    }
}
