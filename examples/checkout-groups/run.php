<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

// A checkout form split into groups: each group is a <fieldset> with a <legend> and an optional
// description. Controls that are in no group would be rendered after all groups.
$form = new Form('checkout');
$form->setAction('/checkout');

$form->addGroup('Contact');
$form->addEmail('email', 'E-mail')
    ->setRequired('Please enter your e-mail.')
    ->setOption('description', 'We send the order confirmation here.');
$form->addText('phone', 'Phone')
    ->setHtmlType('tel')
    ->setOption('description', 'Only for the courier.');

$form->addGroup('Shipping address')
    ->setOption('description', 'We deliver to Slovakia and Czechia.');
$form->addText('street', 'Street')->setRequired('Please enter the street.');
$form->addText('city', 'City')->setRequired('Please enter the city.');
$form->addText('zip', 'ZIP code')->setRequired('Please enter the ZIP code.');
$form->addSelect('country', 'Country', ['sk' => 'Slovakia', 'cz' => 'Czechia'])
    ->setDefaultValue('sk');

$form->addGroup('Delivery and payment');
$form->addRadioList('delivery', 'Delivery', [
    'courier' => 'Courier (2 days)',
    'pickup' => 'Pickup point (3 days)',
])->setDefaultValue('courier');
$form->addRadioList('payment', 'Payment', [
    'card' => 'Card',
    'transfer' => 'Bank transfer',
    'cod' => 'Cash on delivery',
])->setDefaultValue('card');
$form->addTextArea('note', 'Note for the courier', rows: 2);

// a group without a label: the buttons get their own fieldset without a legend
$form->addGroup();
$form->addCheckbox('terms', 'I agree with the terms and conditions')
    ->setRequired('You have to agree with the terms.');
$form->addSubmit('order', 'Place order');
$form->addSubmit('back', 'Back to cart')
    ->setValidationScope([]);

$form->setRenderer(new BootstrapRenderer());

echo $form;
