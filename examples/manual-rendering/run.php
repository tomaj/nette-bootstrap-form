<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Nette\Forms\Form;
use Nette\Forms\FormRenderer;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

// A renderer cannot be extended (the classes are final), so a decorator changes the form
// before the Bootstrap renderer does its work: here it adds an "ajax" class to the <form>.
final class AjaxFormRenderer implements FormRenderer
{
    public function __construct(
        private readonly BootstrapVerticalRenderer $inner = new BootstrapVerticalRenderer(),
    ) {}

    public function render(Form $form, ?string $mode = null): string
    {
        $form->getElementPrototype()->addClass('ajax');

        return $this->inner->render($form, $mode);
    }
}

$form = new Form('login');
$form->setAction('/sign/in');
$form->addEmail('email', 'E-mail')->setRequired('Please enter your e-mail.');
$form->addPassword('password', 'Password')->setRequired('Please enter your password.');
$form->addCheckbox('remember', 'Keep me signed in');
$form->addSubmit('login', 'Sign in');
$form->addError('The e-mail or the password is wrong.');

$renderer = new AjaxFormRenderer();

// The parts of the form placed into a Bootstrap panel. The first call decorates the controls,
// so every part has the Bootstrap classes, exactly as when the form is rendered at once.
echo '<div class="panel panel-default">', "\n";
echo '<div class="panel-heading"><h3 class="panel-title">Sign in</h3></div>', "\n";
echo '<div class="panel-body">', "\n";
echo $renderer->render($form, 'begin');
echo $renderer->render($form, 'errors');
echo $renderer->render($form, 'body');
echo $renderer->render($form, 'end');
echo '</div>', "\n";
echo '<div class="panel-footer"><a href="/sign/forgot">Forgot your password?</a></div>', "\n";
echo '</div>', "\n";
