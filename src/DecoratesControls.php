<?php

declare(strict_types=1);

namespace Tomaj\Form\Renderer;

use Nette\Forms\Controls\Button;
use Nette\Forms\Controls\Checkbox;
use Nette\Forms\Controls\CheckboxList;
use Nette\Forms\Controls\DateTimeControl;
use Nette\Forms\Controls\MultiSelectBox;
use Nette\Forms\Controls\RadioList;
use Nette\Forms\Controls\SelectBox;
use Nette\Forms\Controls\TextBase;
use Nette\Forms\Form;

/**
 * Adds the Bootstrap classes and wrappers to a form and its controls before it is rendered.
 * Shared by the renderers, which differ only in their $wrappers and the form class.
 *
 * @internal
 */
trait DecoratesControls
{
    /**
     * @param string|null $formClass class added to the <form> element (form-horizontal, form-inline), null for none
     */
    private function decorateForm(Form $form, ?string $formClass, bool $novalidate): void
    {
        if ($formClass !== null) {
            $form->getElementPrototype()->addClass($formClass);
        }

        if ($novalidate) {
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
                || $control instanceof DateTimeControl
                || $control instanceof SelectBox
                || $control instanceof MultiSelectBox) {
                // ColorPicker gets nothing on purpose: Bootstrap 3 has no style for colour inputs, and
                // form-control would stretch the swatch to a full-width text box (Bootstrap 5 adds
                // form-control-color for it)
                $control->getControlPrototype()->addClass('form-control');
            } elseif ($control instanceof Checkbox) {
                $control->getContainerPrototype()->setName('div')->addClass($control->getControlPrototype()->type);
            } elseif ($control instanceof CheckboxList
                || $control instanceof RadioList) {
                $control->getSeparatorPrototype()->setName('div')->addClass($control->getControlPrototype()->type);
            }
        }
    }

    /**
     * The class attribute is a string, or an array of class => enabled after Html::addClass(),
     * or a list of class names. Only used to look for "btn", so empty names do not matter.
     */
    private function classString(mixed $class): string
    {
        if (is_array($class)) {
            $classes = [];
            foreach ($class as $name => $value) {
                if ($value === true) {
                    $classes[] = $name;
                } elseif (is_string($value)) {
                    $classes[] = $value;
                }
            }
            return implode(' ', $classes);
        }

        return is_string($class) ? $class : '';
    }
}
