<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

// The renderers are final: configure the $wrappers of an instance instead of subclassing.
// This one uses a 4 + 8 grid on medium screens, keeps the browser's own HTML5 validation
// (novalidate: false), shows a "*" after the label of required fields and wraps every
// control error in its own element.
function createRenderer(): BootstrapRenderer
{
    $renderer = new BootstrapRenderer(novalidate: false);
    $renderer->wrappers['label']['container'] = 'div class="col-md-4 control-label"';
    $renderer->wrappers['label']['requiredsuffix'] = ' *';
    $renderer->wrappers['control']['container'] = 'div class=col-md-8';
    $renderer->wrappers['control']['erroritem'] = 'div class=text-danger';
    $renderer->wrappers['control']['errorcontainer'] = 'div class=help-block';
    $renderer->wrappers['control']['description'] = 'p class="help-block small"';

    return $renderer;
}

$form = new Form('newsletter');
$form->setAction('/newsletter');
$form->addEmail('email', 'E-mail')
    ->setRequired('Please enter your e-mail.')
    ->addError('This e-mail is already subscribed.');
$form->addSelect('frequency', 'How often', ['weekly' => 'Weekly', 'monthly' => 'Monthly'])
    ->setOption('description', 'You can change it in every e-mail.');
$form->addSubmit('subscribe', 'Subscribe');

$form->setRenderer(createRenderer());

echo $form;
