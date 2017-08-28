<?php

namespace Tomaj\Form\Renderer;

use Nette;
use Nette\Forms\Rendering\DefaultFormRenderer;
use Nette\Forms\Controls;

class BootstrapVerticalRenderer extends DefaultFormRenderer
{
    public $wrappers = array(
        'form' => array(
            'container' => null,
        ),
        'error' => array(
            'container' => 'div class="alert alert-danger"',
            'item' => 'p',
        ),
        'group' => array(
            'container' => 'fieldset',
            'label' => 'legend',
            'description' => 'p',
        ),
        'controls' => array(
            'container' => null,
        ),
        'pair' => array(
            'container' => 'div class=form-group',
            '.required' => 'required',
            '.optional' => null,
            '.odd' => null,
            '.error' => 'has-error',
        ),
        'control' => array(
            'container' => '',
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
        ),
        'label' => array(
            'container' => '',
            'suffix' => null,
            'requiredsuffix' => '',
        ),
        'hidden' => array(
            'container' => 'div',
        ),
    );

    /** @var bool */
    private $novalidate;

    public function __construct($novalidate = true)
    {
        $this->novalidate = $novalidate;
    }

    /**
     * Provides complete form rendering.
     * @param  Nette\Forms\Form
     * @param  string 'begin', 'errors', 'ownerrors', 'body', 'end' or empty to render all
     * @return string
     */
    public function render(Nette\Forms\Form $form, $mode = null)
    {
        if ($this->novalidate) {
            $form->getElementPrototype()->setNovalidate('novalidate');
        }

        $usedPrimary = FALSE;
        foreach ($form->getControls() as $control) {
            if ($control instanceof Controls\Button) {
                if (strpos($control->getControlPrototype()->getClass(), 'btn') === FALSE) {
                    $control->getControlPrototype()->addClass(empty($usedPrimary) ? 'btn btn-primary' : 'btn btn-default');
                    $usedPrimary = true;
                }
            } elseif ($control instanceof Controls\TextBase ||
                $control instanceof Controls\SelectBox ||
                $control instanceof Controls\MultiSelectBox) {
                $control->getControlPrototype()->addClass('form-control');
            } elseif ($control instanceof Controls\Checkbox ||
                $control instanceof Controls\CheckboxList ||
                $control instanceof Controls\RadioList) {
                $control->getSeparatorPrototype()->setName('div')->addClass($control->getControlPrototype()->type);
            }
        }

        return parent::render($form, $mode);
    }
}
