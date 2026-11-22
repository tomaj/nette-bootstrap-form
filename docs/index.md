---
layout: home
title: Nette Bootstrap Form
titleTemplate: Bootstrap renderers for Nette Forms

hero:
  name: Nette Bootstrap Form
  text: Bootstrap markup for Nette Forms
  tagline: Set a renderer on a form and every control gets the Bootstrap 3 classes and wrappers. No templates, no per-control code.
  image:
    src: /logo.svg
    alt: Nette Bootstrap Form
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Renderers
      link: /guide/renderers
    - theme: alt
      text: GitHub
      link: https://github.com/tomaj/nette-bootstrap-form

features:
  - title: Horizontal
    details: BootstrapRenderer puts labels in col-sm-3 and controls in col-sm-9 of a form-horizontal form.
    link: /guide/renderers#horizontal-bootstraprenderer
  - title: Vertical
    details: BootstrapVerticalRenderer is the default Bootstrap layout, each label above its control.
    link: /guide/renderers#vertical-bootstrapverticalrenderer
  - title: Inline
    details: BootstrapInlineRenderer renders a form-inline form, for search boxes and one-line filters.
    link: /guide/renderers#inline-bootstrapinlinerenderer
  - title: Controls decorated for you
    details: form-control on inputs and selects, btn-primary on the first button, checkbox and radio wrappers, errors in an alert box.
    link: /guide/renderers#what-the-renderers-change
---

## Quick example

```php
use Nette\Forms\Form;
use Tomaj\Form\Renderer\BootstrapRenderer;

$form = new Form();
$form->addText('email', 'E-mail')->setRequired();
$form->addSubmit('send', 'Send');

$form->setRenderer(new BootstrapRenderer());

echo $form;
```

Install it with `composer require tomaj/nette-bootstrap-form` (PHP 8.4+, nette/forms 3.2+) and read [Getting started](/guide/getting-started).
