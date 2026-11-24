// Turns the tested output of every example (examples/<name>/expected-output.txt, which the Examples
// workflow compares with what the example prints) into a page that loads Bootstrap 3.4.1 CSS:
// docs/public/previews/<name>.html. The <FormPreview> component shows these pages in an iframe, so
// the preview on the site is always the HTML the renderers produce today. Runs before every build.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const examples = new URL('../../examples/', import.meta.url)
const target = new URL('../public/previews/', import.meta.url)
rmSync(target, { recursive: true, force: true })
mkdirSync(target, { recursive: true })

const names = readdirSync(examples, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(new URL(`${entry.name}/expected-output.txt`, examples)))
  .map((entry) => entry.name)
  .sort()

for (const name of names) {
  const html = readFileSync(new URL(`${name}/expected-output.txt`, examples), 'utf8')
  writeFileSync(new URL(`${name}.html`, target), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${name}: rendered by nette-bootstrap-form</title>
<link rel="stylesheet" href="../vendor/bootstrap-3.4.1.min.css">
<style>body { padding: 20px 5px; } form { margin-bottom: 0; } h4:first-child { margin-top: 0; }</style>
</head>
<body>
<div class="container-fluid">
<!-- examples/${name}/expected-output.txt -->
${html}</div>
<script>
// links and buttons stay inside the preview
document.addEventListener('submit', (event) => event.preventDefault())
document.addEventListener('click', (event) => { if (event.target.closest('a')) event.preventDefault() })
</script>
</body>
</html>
`)
}
console.log(`${names.length} previews written to docs/public/previews`)
