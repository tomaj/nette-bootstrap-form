---
title: Testing your forms
description: 'Test what your Nette forms render with the Bootstrap renderers (HTML snapshots) and how they behave on submission, without a browser or a web server.'
---

# Testing your forms

A renderer is a pure function of the form: the same form gives the same HTML. That makes forms easy to test without a browser.

## Snapshot of the rendered HTML

Render the form in a test and compare the HTML with a file you commit. A change in your form or in a dependency then shows up as a diff in review:

<!-- snippet: skip -->
```php
use App\Forms\FormFactory;
use PHPUnit\Framework\TestCase;

final class SignInFormTest extends TestCase
{
    public function testRendersBootstrapMarkup(): void
    {
        $form = new FormFactory()->createSignInForm();

        self::assertStringEqualsFile(__DIR__ . '/fixtures/sign-in.html', (string) $form);
    }
}
```

This package tests itself the same way: `tests/RendererTest.php` renders 22 forms with each renderer and compares them byte for byte with `tests/fixtures/<renderer>/<case>.html`, and the [examples](/examples/) compare their output with `expected-output.txt` in CI.

Some attributes depend on the environment: an upload control gets its size limit from `upload_max_filesize` and its count limit from `max_file_uploads` in `php.ini`. Set your own limits (see [`examples/all-controls`](/examples/all-controls)), or the snapshot differs between your machine and CI.

## Checking single classes

When a full snapshot is too strict, check what matters:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('name', 'Name');
$form->addSubmit('send', 'Send');
$form->setRenderer(new BootstrapRenderer());

$html = (string) $form;

// in PHPUnit: self::assertStringContainsString(...)
$checks = [
    str_contains($html, 'class="form-horizontal"'),
    str_contains($html, 'class="btn btn-primary button"'),
    $form['name']->getControlPrototype()->getClass() === ['form-control' => true],
];
echo in_array(false, $checks, true) ? "failed\n" : "ok\n";
```

<!-- snippet: output -->
```html
ok
```

After rendering, the classes are stored on the control prototypes, so you can also check them on the controls.

## Submitting a form in a test

A form reads the submitted data from its HTTP request. Give it a `Nette\Http\Request` with the POST data, call `fireEvents()` and check the result, then render it to see the errors:

```php
use Nette\Forms\Form;
use Nette\Http\Request;
use Nette\Http\UrlScript;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

$form = new Form();
$form->httpRequest = new Request(
    new UrlScript('https://example.com/'),
    post: ['email' => 'not an e-mail', 'send' => 'Send'],
    headers: ['Sec-Fetch-Site' => 'same-origin'],
    method: 'POST',
);
// addText() + Form::Email rather than addEmail(): newer nette/forms add maxlength="255" to addEmail()
$form->addText('email', 'E-mail')->setRequired()->addRule(Form::Email);
$form->addSubmit('send', 'Send');
$form->onSuccess[] = static fn() => print "saved\n";
$form->fireEvents();

echo $form->isValid() ? 'valid' : 'invalid: ' . implode(', ', $form->getErrors()), "\n";

$form->setRenderer(new BootstrapVerticalRenderer());
echo $form->getRenderer()->render($form, 'body');
```

<!-- snippet: output -->
```html
invalid: Please enter a valid email address.
<div class="form-group required has-error">
	<label for="frm-email" class="required">E-mail</label>
	<input type="email" name="email" class="form-control" id="frm-email" required data-nette-rules='[{"op":":filled","msg":"This field is required."},{"op":":email","msg":"Please enter a valid email address."}]' value="not an e-mail">
	<span class="help-block">Please enter a valid email address.</span>
</div>
<div class="form-group">
	<input type="submit" name="send" class="btn btn-primary button" value="Send">
</div>
```

The `Sec-Fetch-Site: same-origin` header is what a browser sends; without it nette/forms refuses a cross-origin POST (unless the form calls `allowCrossOrigin()`). A form created with a name (`new Form('register')`) also needs `'_form_' => 'register'` in the POST data. [`examples/validation-errors`](/examples/validation-errors) is a complete version of this test.

## Testing in a Nette application

For presenters, `Nette\Application\UI\Presenter::run()` with an `Nette\Application\Request` renders the whole page in a test. The form is part of the response, rendered by the same renderer, so the techniques above apply to the HTML of the page.
