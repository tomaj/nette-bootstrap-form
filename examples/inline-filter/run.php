<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapInlineRenderer;

// A filter above an order list: one line, sent with GET so the filter ends up in the URL.
$form = new Form('filter');
$form->setMethod(Form::Get);
$form->setAction('/orders');

$form->addText('q', 'Search')
    ->setHtmlAttribute('placeholder', 'Order number or customer');
$form->addSelect('status', 'Status', [
    'new' => 'New',
    'paid' => 'Paid',
    'shipped' => 'Shipped',
    'cancelled' => 'Cancelled',
])->setPrompt('Any status');
$form->addDate('from', 'From');
$form->addSubmit('filter', 'Filter');
$form->addSubmit('clear', 'Clear')
    ->setValidationScope([]);

$form->setRenderer(new BootstrapInlineRenderer());

echo $form;
