---
layout: home
title: Nette Bootstrap Form
titleTemplate: Bootstrap renderers for Nette Forms
description: 'Bootstrap 3 renderers (horizontal, vertical, inline) for Nette Forms. Set one renderer and every control gets the Bootstrap classes and wrappers, with no template code.'

hero:
  name: Nette Bootstrap Form
  text: Bootstrap markup for Nette Forms
  tagline: Set one renderer on a form and every control gets the Bootstrap 3 classes and wrappers. No templates, no per-control code, the same HTML on every render.
  image:
    src: /illustrations/hero-light.svg
    alt: A browser window with a horizontal Bootstrap form, made by one setRenderer() call
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Examples
      link: /examples/
    - theme: alt
      text: GitHub
      link: https://github.com/tomaj/nette-bootstrap-form

features:
  - icon:
      src: /icons/horizontal.svg
      alt: Horizontal layout
      width: 40px
      height: 40px
    title: Horizontal
    details: BootstrapRenderer puts labels in col-sm-3 and controls in col-sm-9 of a form-horizontal form.
    link: /guide/renderers#horizontal-bootstraprenderer
  - icon:
      src: /icons/vertical.svg
      alt: Vertical layout
      width: 40px
      height: 40px
    title: Vertical
    details: BootstrapVerticalRenderer is the default Bootstrap layout, each label above its control.
    link: /guide/renderers#vertical-bootstrapverticalrenderer
  - icon:
      src: /icons/inline.svg
      alt: Inline layout
      width: 40px
      height: 40px
    title: Inline
    details: BootstrapInlineRenderer renders a form-inline form, for search boxes and one-line filters.
    link: /guide/renderers#inline-bootstrapinlinerenderer
  - icon:
      src: /icons/controls.svg
      alt: Form control
      width: 40px
      height: 40px
    title: Controls decorated for you
    details: form-control on inputs, text areas and selects, div.checkbox and div.radio around checkboxes and radio lists.
    link: /guide/controls
  - icon:
      src: /icons/buttons.svg
      alt: Buttons
      width: 40px
      height: 40px
    title: Primary and default buttons
    details: The first button is btn-primary, the others btn-default. Buttons with your own btn classes are left alone.
    link: /guide/controls#buttons
  - icon:
      src: /icons/errors.svg
      alt: Errors
      width: 40px
      height: 40px
    title: Errors the Bootstrap way
    details: Form errors in an alert-danger box, control errors in a help-block under the control, has-error on the group.
    link: /guide/errors
---

<div class="home-more">

## What it looks like

Create the form as usual and set a renderer:

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('name', 'Name')->setRequired();
$form->addEmail('email', 'E-mail')->setRequired();
$form->addCheckbox('newsletter', 'Send me the newsletter');
$form->addSubmit('send', 'Send');

$form->setRenderer(new BootstrapRenderer());

echo $form;
```

The same contact form rendered by each of the three renderers, with Bootstrap 3.4.1 CSS. This is the tested output of [`examples/layouts`](/examples/layouts):

<FormPreview name="layouts" title="examples/layouts" />

## Where to go next

<LinkCards :items="[
  { title: 'Getting started', text: 'Install the package and render your first form, with the HTML it produces.', link: '/guide/getting-started' },
  { title: 'Renderers', text: 'Horizontal, vertical and inline: what each one renders and when to use it.', link: '/guide/renderers' },
  { title: 'Controls', text: 'Every nette/forms control type and the Bootstrap markup it gets.', link: '/guide/controls' },
  { title: 'Validation and errors', text: 'Form errors, control errors, descriptions and HTML5 validation.', link: '/guide/errors' },
  { title: 'Customizing', text: 'Change $wrappers on the instance, wrap the renderer, render part by part.', link: '/guide/customizing' },
  { title: 'Examples', text: 'Eight runnable recipes with their HTML and a live preview, tested in CI.', link: '/examples/' },
]" />

Install it with `composer require tomaj/nette-bootstrap-form` (PHP 8.4+, nette/forms 3.2+).

</div>
