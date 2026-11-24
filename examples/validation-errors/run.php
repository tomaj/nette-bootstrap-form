<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Nette\Http\Request;
use Nette\Http\UrlScript;
use Tomaj\Form\Renderer\BootstrapRenderer;

// A registration form, submitted with invalid values. In an application the HTTP request comes
// from the browser; here it is built by hand, so the example runs without a web server.
$form = new Form('register');
$form->httpRequest = new Request(
    new UrlScript('https://shop.example/register'),
    post: [
        'name' => 'Jane',
        'email' => 'jane.example.com',
        'age' => '15',
        'password' => 'short',
        'send' => 'Create account',
        '_form_' => 'register', // the hidden field that tells named forms apart
    ],
    // what a browser sends with a same-site request; nette/forms refuses cross-site POSTs
    cookies: ['_nss' => '1'],
    headers: ['Sec-Fetch-Site' => 'same-origin'],
    method: 'POST',
);
$form->setAction('/register');

$form->addText('name', 'Name')
    ->setRequired('Please enter your name.');
$form->addEmail('email', 'E-mail')
    ->setRequired('Please enter your e-mail.');
$form->addInteger('age', 'Age')
    ->setRequired('Please enter your age.')
    ->addRule(Form::Min, 'You must be at least %d years old.', 18);
$form->addPassword('password', 'Password')
    ->setOption('description', 'At least 8 characters.')
    ->setRequired('Please choose a password.')
    ->addRule(Form::MinLength, 'The password must have at least %d characters.', 8);
$form->addCheckbox('terms', 'I agree with the terms')
    ->setRequired('You have to agree with the terms.');
$form->addSubmit('send', 'Create account');

$form->onSuccess[] = static function (): void {
    echo "<p>Account created.</p>\n";
};
$form->onError[] = static function (Form $form): void {
    // an error of the form itself, shown in the alert box above the fields
    $form->addError('Please correct the highlighted fields.');
};

$form->fireEvents();

$form->setRenderer(new BootstrapRenderer());

echo $form;
