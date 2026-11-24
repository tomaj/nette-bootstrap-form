# Examples

Runnable recipes for nette-bootstrap-form. Each folder has a `composer.json`, a `run.php` that builds a form and prints its HTML, and `expected-output.txt` with that HTML. The walkthroughs with a rendered preview are at <https://tomaj.github.io/nette-bootstrap-form/examples/>.

```bash
cd examples/layouts
composer install
php run.php
```

Until 3.0.0 is tagged, the examples require `tomaj/nette-bootstrap-form: dev-master` with `"minimum-stability": "dev"`; after the release they switch to `^3.0`.

## Running them against this checkout

```bash
examples/ci/example.sh layouts            # copy to a temp dir, install this checkout, diff with expected-output.txt
examples/ci/example.sh --update layouts   # write the new output after an intended change
```

The `Examples` workflow runs `examples/ci/example.sh` for every example on each push and pull request.
