#!/usr/bin/env python3
"""The English pages and their Slovak twins under sk/ must stay in step.

- Every English page has a Slovak page with the same path under sk/, and the other way round.
- Both have the same fenced code blocks, `<<< @/...` imports and `<!-- snippet: ... -->` markers,
  in the same order, after `<!--@include: ...-->` files are inlined: code and example output are
  shared, only prose is translated.
- Both have the same heading levels in the same order (the Slovak headings keep the English
  anchors with `{#id}`, so a link only needs the /sk/ prefix).
- A Slovak page links to Slovak pages: an internal link without /sk/ is an error (files under
  public/, such as diagrams, are shared).
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
skip = {"node_modules", ".vitepress", "public", "scripts"}
fence = re.compile(r"^(```|~~~)")


def pages(base: Path, exclude_sk: bool) -> set[str]:
    found = set()
    for page in base.rglob("*.md"):
        relative = page.relative_to(base)
        if relative.parts[0] in skip or (exclude_sk and relative.parts[0] == "sk"):
            continue
        found.add(relative.as_posix())
    return found


def expand(page: Path) -> str:
    """The page with its `<!--@include: file-->` lines replaced by the file."""
    def include(match: re.Match[str]) -> str:
        return (page.parent / match.group(1).strip()).read_text(encoding="utf-8")
    return re.sub(r"^<!--@include:\s*(.+?)\s*-->$", include, page.read_text(encoding="utf-8"), flags=re.M)


def structure(text: str) -> tuple[list[str], list[str]]:
    """Code blocks, imports and snippet markers; heading levels outside code blocks."""
    code: list[str] = []
    headings: list[str] = []
    block: list[str] | None = None
    in_frontmatter = text.startswith("---\n")
    for number, line in enumerate(text.split("\n")):
        if in_frontmatter:
            if number > 0 and line == "---":
                in_frontmatter = False
            continue
        if block is not None:
            block.append(line)
            if fence.match(line) and line.strip() in ("```", "~~~"):
                code.append("\n".join(block))
                block = None
            continue
        if fence.match(line):
            block = [line]
        elif line.startswith("<<< ") or line.strip().startswith("<!-- snippet:"):
            code.append(line.strip())
        elif re.match(r"^#{1,6} ", line):
            headings.append(line.split(" ", 1)[0])
    return code, headings


internal_link = re.compile(r"""(?:\]\(|\blink:\s*['"]|href=["'])(/[^)'"\s]*)""")
shared = re.compile(r"^/(?:sk/|diagrams/|illustrations/|icons/|previews/|vendor/)|\.(?:svg|png|ico|html|css|txt|webmanifest)$")

english = pages(root, exclude_sk=True)
slovak = pages(root / "sk", exclude_sk=False)
problems = [f"missing sk/{p}" for p in sorted(english - slovak)]
problems += [f"sk/{p} has no English page" for p in sorted(slovak - english)]

for page in sorted(english & slovak):
    en_text = expand(root / page)
    sk_text = expand(root / "sk" / page)
    en_code, en_headings = structure(en_text)
    sk_code, sk_headings = structure(sk_text)
    if en_code != sk_code:
        for i, (a, b) in enumerate(zip(en_code, sk_code)):
            if a != b:
                problems.append(f"sk/{page}: code block {i + 1} differs from the English page:\n{b[:200]}")
                break
        else:
            problems.append(f"sk/{page}: {len(sk_code)} code blocks, the English page has {len(en_code)}")
    if en_headings != sk_headings:
        problems.append(f"sk/{page}: headings {' '.join(sk_headings)} differ from the English {' '.join(en_headings)}")
    for link in internal_link.findall(re.sub(r"```.*?```", "", sk_text, flags=re.S)):
        if not shared.search(link):
            problems.append(f"sk/{page}: link {link} points to an English page, use /sk{link}")

if problems:
    print("English and Slovak pages differ:", file=sys.stderr)
    print("\n".join(problems), file=sys.stderr)
    sys.exit(1)
print(f"ok {len(english)} pages in English and Slovak, same code blocks and headings")
