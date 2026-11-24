<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Nette\Forms\FormRenderer;
use Tomaj\Form\Renderer\BootstrapInlineRenderer;
use Tomaj\Form\Renderer\BootstrapRenderer;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

// The same contact form, built once per renderer. A renderer decorates the controls of the
// form it renders, so every layout gets its own Form instance.
function contactForm(string $name): Form
{
    $form = new Form($name);
    $form->setAction('/contact');
    $form->addText('name', 'Name')
        ->setHtmlAttribute('placeholder', 'Jane Doe')
        ->setRequired('Please enter your name.');
    $form->addEmail('email', 'E-mail')
        ->setHtmlAttribute('placeholder', 'jane@example.com')
        ->setRequired('Please enter your e-mail.');
    $form->addCheckbox('newsletter', 'Send me the newsletter');
    $form->addSubmit('send', 'Send');

    return $form;
}

$layouts = [
    'horizontal' => ['BootstrapRenderer', new BootstrapRenderer()],
    'vertical' => ['BootstrapVerticalRenderer', new BootstrapVerticalRenderer()],
    'inline' => ['BootstrapInlineRenderer', new BootstrapInlineRenderer()],
];

foreach ($layouts as $layout => [$class, $renderer]) {
    \assert($renderer instanceof FormRenderer);
    $form = contactForm($layout);
    $form->setRenderer($renderer);

    echo "<h4>{$class}</h4>\n";
    echo $form, "\n";
}
