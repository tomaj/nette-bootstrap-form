<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

// Every control type that nette/forms has, rendered by the horizontal renderer.
$form = new Form('profile');
$form->setAction('/profile');

// text inputs: all of them get form-control
$form->addText('name', 'Name')->setHtmlAttribute('placeholder', 'Jane Doe');
$form->addPassword('password', 'Password');
$form->addEmail('email', 'E-mail');
$form->addInteger('age', 'Age');
$form->addFloat('height', 'Height (m)');
$form->addDate('birthday', 'Birthday');
$form->addTime('alarm', 'Wake-up time');
$form->addDateTime('meeting', 'Next meeting');
$form->addColor('color', 'Favourite colour')->setDefaultValue('#7952b3');
$form->addTextArea('bio', 'About you', rows: 3);

// selects: form-control as well
$form->addSelect('country', 'Country', ['sk' => 'Slovakia', 'cz' => 'Czechia', 'at' => 'Austria'])
    ->setPrompt('Choose a country');
$form->addMultiSelect('languages', 'Languages', ['en' => 'English', 'sk' => 'Slovak', 'de' => 'German']);

// checkbox and lists: wrapped in div.checkbox / div.radio
$form->addCheckbox('terms', 'I agree with the terms');
$form->addCheckboxList('topics', 'Topics', ['php' => 'PHP', 'nette' => 'Nette', 'css' => 'CSS']);
$form->addRadioList('plan', 'Plan', ['free' => 'Free', 'pro' => 'Pro'])->setDefaultValue('free');

// files: no extra class, Bootstrap 3 styles file inputs itself. nette/forms adds a size limit
// (and a count limit for several files) from php.ini; set your own instead, so the rules do not
// depend on the server's configuration
$form->addUpload('avatar', 'Avatar')
    ->getRules()->removeRule(Form::MaxFileSize)
    ->addRule(Form::MaxFileSize, 'The avatar can be up to 2 MB.', 2 * 1024 * 1024);
$form->addMultiUpload('attachments', 'Attachments')
    ->getRules()->removeRule(Form::MaxFileSize)->removeRule(Form::MaxLength)
    ->addRule(Form::MaxFileSize, 'Each attachment can be up to 10 MB.', 10 * 1024 * 1024)
    ->addRule(Form::MaxLength, 'Attach at most %d files.', 5);

// hidden fields are collected in one <div> at the end of the form
$form->addHidden('referrer', 'newsletter');

// buttons: the first one is primary, the others default
$form->addSubmit('save', 'Save');
$form->addButton('preview', 'Preview');
$form->addImageButton('publish', '/img/publish.png', 'Publish');

$form->setRenderer(new BootstrapRenderer());

echo $form;
