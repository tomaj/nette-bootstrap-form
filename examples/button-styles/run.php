<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

// The renderers give the first button without a "btn" class btn-primary and every following one
// btn-default. A button whose class already contains "btn" is left as it is and does not use up
// the primary style.
$form = new Form('article');
$form->setAction('/article/42');
$form->addText('title', 'Title')->setDefaultValue('Hello, Bootstrap');

// first button without a btn class: btn btn-primary
$form->addSubmit('save', 'Save');

// own Bootstrap classes, set as a string: left alone
$form->addSubmit('delete', 'Delete')
    ->setHtmlAttribute('class', 'btn btn-danger');

// own classes without "btn": btn btn-default is added next to them
$form->addSubmit('draft', 'Save as draft')
    ->setHtmlAttribute('class', 'js-draft');

// a class added with addClass() is checked the same way: btn-link contains "btn", left alone
$form->addSubmit('cancel', 'Cancel')
    ->setValidationScope([])
    ->getControlPrototype()->addClass('btn btn-link');

// a plain <input type="button">: btn btn-default
$form->addButton('preview', 'Preview');

$form->setRenderer(new BootstrapVerticalRenderer());

echo $form;
