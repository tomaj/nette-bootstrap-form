<?php

declare(strict_types=1);

namespace Tomaj\Form\Renderer\Tests;

use Nette\Forms\Form;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Tomaj\Form\Renderer\BootstrapInlineRenderer;
use Tomaj\Form\Renderer\BootstrapRenderer;
use Tomaj\Form\Renderer\BootstrapVerticalRenderer;

final class RendererTest extends TestCase
{
    private const array RENDERERS = [
        BootstrapRenderer::class,
        BootstrapInlineRenderer::class,
        BootstrapVerticalRenderer::class,
    ];

    /**
     * @return iterable<string, array{class-string<BootstrapRenderer|BootstrapInlineRenderer|BootstrapVerticalRenderer>, string}>
     */
    public static function rendererAndCaseProvider(): iterable
    {
        foreach (self::RENDERERS as $renderer) {
            foreach (array_keys(FormCases::all()) as $case) {
                yield self::shortName($renderer) . ' ' . $case => [$renderer, $case];
            }
        }
    }

    /**
     * @return iterable<string, array{class-string<BootstrapRenderer|BootstrapInlineRenderer|BootstrapVerticalRenderer>}>
     */
    public static function rendererProvider(): iterable
    {
        foreach (self::RENDERERS as $renderer) {
            yield self::shortName($renderer) => [$renderer];
        }
    }

    /**
     * @param class-string<BootstrapRenderer|BootstrapInlineRenderer|BootstrapVerticalRenderer> $renderer
     */
    #[DataProvider('rendererAndCaseProvider')]
    public function testRendersExpectedHtml(string $renderer, string $case): void
    {
        $html = new $renderer()->render($this->form($case));

        self::assertStringEqualsFile($this->fixture($renderer, $case), $html);
    }

    /**
     * After the first render the button classes are stored as an array; rendering again used to throw a TypeError.
     *
     * @param class-string<BootstrapRenderer|BootstrapInlineRenderer|BootstrapVerticalRenderer> $renderer
     */
    #[DataProvider('rendererAndCaseProvider')]
    public function testRenderingTwiceGivesTheSameHtml(string $renderer, string $case): void
    {
        $form = $this->form($case);
        $first = new $renderer()->render($form);

        self::assertSame($first, new $renderer()->render($form));
    }

    /**
     * @param class-string<BootstrapRenderer|BootstrapInlineRenderer|BootstrapVerticalRenderer> $renderer
     */
    #[DataProvider('rendererProvider')]
    public function testRendersFormPartByPart(string $renderer): void
    {
        $form = $this->form('complete');
        $instance = new $renderer();

        $html = $instance->render($form, 'begin')
            . $instance->render($form, 'errors')
            . $instance->render($form, 'body')
            . $instance->render($form, 'end');

        self::assertStringContainsString('<form action="/submit" method="post" id="frm-complete"', $html);
        self::assertStringContainsString('<p>Please correct the errors.</p>', $html);
        self::assertSame(1, substr_count($html, 'class="btn btn-primary button" value="Save"'));
        self::assertSame(1, substr_count($html, 'class="btn btn-default button" value="Cancel"'));
        self::assertSame(1, substr_count($html, '<input type="hidden" name="ref" value="home">'));
        self::assertStringEndsWith("</form>\n", $html);
    }

    /**
     * @param class-string<BootstrapRenderer|BootstrapInlineRenderer|BootstrapVerticalRenderer> $renderer
     */
    #[DataProvider('rendererProvider')]
    public function testButtonWithClassAddedViaAddClass(string $renderer): void
    {
        $form = new Form();
        $form->addSubmit('custom', 'Custom')->getControlPrototype()->addClass('my-button');
        $form->addSubmit('styled', 'Styled')->getControlPrototype()->addClass('btn btn-warning');
        $form->addSubmit('other', 'Other');

        $html = new $renderer()->render($form);

        self::assertStringContainsString('class="my-button btn btn-primary button" value="Custom"', $html);
        self::assertStringContainsString('class="btn btn-warning button" value="Styled"', $html);
        self::assertStringContainsString('class="btn btn-default button" value="Other"', $html);
    }

    /**
     * @param class-string<BootstrapRenderer|BootstrapInlineRenderer|BootstrapVerticalRenderer> $renderer
     */
    #[DataProvider('rendererProvider')]
    public function testNovalidateCanBeTurnedOff(string $renderer): void
    {
        self::assertStringContainsString('novalidate="novalidate"', new $renderer()->render(new Form(), 'begin'));
        self::assertStringNotContainsString('novalidate', new $renderer(false)->render(new Form(), 'begin'));
    }

    private function form(string $case): Form
    {
        return FormCases::all()[$case]();
    }

    /**
     * @param class-string $renderer
     */
    private function fixture(string $renderer, string $case): string
    {
        return __DIR__ . '/fixtures/' . self::shortName($renderer) . '/' . $case . '.html';
    }

    /**
     * @param class-string $class
     */
    private static function shortName(string $class): string
    {
        return substr($class, (int) strrpos($class, '\\') + 1);
    }
}
