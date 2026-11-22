<?php

declare(strict_types=1);

namespace Tomaj\Form\Renderer\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

/**
 * Runs every ```php block of README.md, UPGRADE-3.0.md and docs/ against the current code.
 *
 * - A block runs in its own PHP process with the Composer autoloader and a `$form` (an empty
 *   Nette\Forms\Form) already defined, and must exit with status 0 without writing to stderr.
 * - A block directly after `<!-- snippet: skip -->` is not run (code that cannot run on its own,
 *   or on purpose shows code that no longer works, such as the "before" side of an upgrade step).
 * - An ```html block directly after `<!-- snippet: output -->` is the output of the PHP block
 *   before it. Both are compared line by line, ignoring indentation and blank lines.
 */
final class DocsSnippetsTest extends TestCase
{
    private const string SKIP = '<!-- snippet: skip -->';
    private const string OUTPUT = '<!-- snippet: output -->';

    /**
     * @return iterable<string, array{string, ?string}>
     */
    public static function snippetProvider(): iterable
    {
        $root = dirname(__DIR__);
        $files = [$root . '/README.md', $root . '/UPGRADE-3.0.md'];
        $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($root . '/docs', \FilesystemIterator::SKIP_DOTS));
        foreach ($iterator as $file) {
            \assert($file instanceof \SplFileInfo);
            $path = $file->getPathname();
            if ($file->getExtension() === 'md' && !str_contains($path, '/node_modules/') && !str_contains($path, '/.vitepress/')) {
                $files[] = $path;
            }
        }
        sort($files);

        foreach ($files as $path) {
            $relative = substr($path, strlen($root) + 1);
            foreach (self::blocks((string) file_get_contents($path)) as $line => [$code, $output]) {
                yield $relative . ':' . $line => [$code, $output];
            }
        }
    }

    public function testDocumentationHasSnippets(): void
    {
        $outputs = 0;
        $count = 0;
        foreach (self::snippetProvider() as [, $output]) {
            $count++;
            if ($output !== null) {
                $outputs++;
            }
        }

        self::assertGreaterThan(10, $count);
        self::assertGreaterThan(3, $outputs);
    }

    #[DataProvider('snippetProvider')]
    public function testSnippetRuns(string $code, ?string $expectedOutput): void
    {
        $script = tempnam(sys_get_temp_dir(), 'snippet');
        $prepend = tempnam(sys_get_temp_dir(), 'prepend');
        self::assertIsString($script);
        self::assertIsString($prepend);

        try {
            file_put_contents($script, "<?php\n\ndeclare(strict_types=1);\n\n" . $code);
            file_put_contents($prepend, '<?php require ' . var_export(__DIR__ . '/../vendor/autoload.php', true) . '; $form = new Nette\Forms\Form();');

            $process = proc_open(
                [PHP_BINARY, '-d', 'auto_prepend_file=' . $prepend, '-d', 'display_errors=stderr', '-d', 'error_reporting=-1', $script],
                [1 => ['pipe', 'w'], 2 => ['pipe', 'w']],
                $pipes,
            );
            self::assertIsResource($process);
            $stdout = (string) stream_get_contents($pipes[1]);
            $stderr = (string) stream_get_contents($pipes[2]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            $status = proc_close($process);
        } finally {
            unlink($script);
            unlink($prepend);
        }

        self::assertSame('', $stderr, "The snippet wrote to stderr:\n" . $code);
        self::assertSame(0, $status, "The snippet failed:\n" . $code . "\n" . $stdout);
        if ($expectedOutput !== null) {
            self::assertSame($this->normalize($expectedOutput), $this->normalize($stdout), "The documented output differs:\n" . $code);
        }
    }

    /**
     * @return array<int, array{string, ?string}> line number => [php code, expected output]
     */
    private static function blocks(string $markdown): array
    {
        $lines = explode("\n", $markdown);
        $code = [];
        $outputs = [];
        $lastPhp = null;
        $previous = '';
        $count = count($lines);
        for ($i = 0; $i < $count; $i++) {
            if (preg_match('/^```(\w+)/', $lines[$i], $match) !== 1) {
                if (trim($lines[$i]) !== '') {
                    $previous = trim($lines[$i]);
                }
                continue;
            }
            $start = $i + 1;
            $body = [];
            for ($i++; $i < $count && !str_starts_with($lines[$i], '```'); $i++) {
                $body[] = $lines[$i];
            }
            $text = implode("\n", $body) . "\n";
            if ($match[1] === 'php' && $previous !== self::SKIP) {
                $code[$start] = preg_replace('/^<\?php\s*/', '', $text);
                $lastPhp = $start;
            } elseif ($match[1] === 'html' && $previous === self::OUTPUT) {
                self::assertNotNull($lastPhp, 'An output block must follow a PHP block (line ' . $start . ').');
                $outputs[$lastPhp] = $text;
            }
            $previous = '```';
        }

        $blocks = [];
        foreach ($code as $line => $php) {
            $blocks[$line] = [$php, $outputs[$line] ?? null];
        }

        return $blocks;
    }

    private function normalize(string $html): string
    {
        $lines = array_filter(array_map(trim(...), explode("\n", $html)), static fn(string $line): bool => $line !== '');

        return implode("\n", $lines);
    }
}
