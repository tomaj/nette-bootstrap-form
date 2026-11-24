// Per-page SEO: title, canonical URL, Open Graph and Twitter tags, and JSON-LD.
// Used by transformHead in config.mts.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { HeadConfig, PageData } from 'vitepress'

export const base = '/nette-bootstrap-form/'
export const siteUrl = `https://tomaj.github.io${base}`
export const ogImage = `${siteUrl}og.png`
const siteName = 'Nette Bootstrap Form'
const repoUrl = 'https://github.com/tomaj/nette-bootstrap-form'

const person = {
  '@type': 'Person',
  '@id': 'https://github.com/tomaj#person',
  name: 'Tomas Majer',
  url: 'https://github.com/tomaj',
}

export function pageUrl(relativePath: string): string {
  const path = relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  return siteUrl + path
}

// Section names for the breadcrumb, from the first path segment.
const sections: Record<string, [string, string]> = {
  guide: ['Guide', 'guide/getting-started'],
  examples: ['Examples', 'examples/'],
  api: ['Reference', 'api/reference'],
}

function breadcrumb(page: PageData, url: string) {
  const items: { name: string, item: string }[] = [{ name: siteName, item: siteUrl }]
  const section = sections[page.relativePath.split('/')[0]]
  if (section && siteUrl + section[1] !== url) items.push({ name: section[0], item: siteUrl + section[1] })
  if (url !== siteUrl) items.push({ name: page.title, item: url })
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({ '@type': 'ListItem', position: i + 1, name: entry.name, item: entry.item })),
  }
}

// Markdown to plain text, enough for JSON-LD answers.
function plain(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^<<< .*$/gm, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// The `## ` headings of faq.md are the questions.
function faqEntries(source: string): { q: string, a: string }[] {
  return ('\n' + source).split('\n## ').slice(1)
    .map((part) => {
      const [q, ...rest] = part.split('\n')
      return { q: plain(q), a: plain(rest.join('\n')) }
    })
    .filter((e) => e.q && e.a)
}

export function seoHead(page: PageData, srcDir: string, siteDescription: string): HeadConfig[] {
  if (page.isNotFound || page.relativePath === '404.md' || !page.relativePath) {
    return [['meta', { name: 'robots', content: 'noindex' }]]
  }
  const url = pageUrl(page.relativePath)
  const isHome = page.frontmatter.layout === 'home'
  const title = isHome ? `${siteName}: Bootstrap renderers for Nette Forms` : `${page.title} | ${siteName}`
  const description = page.description || page.frontmatter.description || siteDescription
  const modified = page.lastUpdated ? new Date(page.lastUpdated).toISOString() : undefined

  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Nette Bootstrap Form: PHP code that sets BootstrapRenderer on a form, and the rendered Bootstrap form' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'author', content: person.name }],
  ]
  if (modified && !isHome) head.push(['meta', { property: 'article:modified_time', content: modified }])

  const logo = { '@type': 'ImageObject', '@id': `${siteUrl}#logo`, url: `${siteUrl}icon-512.png`, contentUrl: `${siteUrl}icon-512.png`, width: 512, height: 512, caption: siteName }
  const website = { '@type': 'WebSite', '@id': `${siteUrl}#website`, name: siteName, url: siteUrl, inLanguage: 'en', image: { '@id': logo['@id'] }, publisher: { '@id': person['@id'] } }
  const graph: Record<string, unknown>[] = [person, logo, website]

  if (isHome) {
    graph.push({
      '@type': ['SoftwareSourceCode', 'SoftwareApplication'],
      '@id': `${siteUrl}#software`,
      name: 'tomaj/nette-bootstrap-form',
      description: siteDescription,
      url: siteUrl,
      codeRepository: repoUrl,
      programmingLanguage: { '@type': 'ComputerLanguage', name: 'PHP' },
      runtimePlatform: 'PHP 8.4+',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      license: 'https://spdx.org/licenses/LGPL-2.0-or-later.html',
      softwareVersion: '3.x',
      author: { '@id': person['@id'] },
      image: [{ '@id': logo['@id'] }, ogImage],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    })
  } else {
    graph.push({
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: page.title,
      description,
      url,
      mainEntityOfPage: url,
      inLanguage: 'en',
      image: ogImage,
      author: { '@id': person['@id'] },
      publisher: { '@id': person['@id'] },
      isPartOf: { '@id': website['@id'] },
      about: { '@type': 'SoftwareSourceCode', name: 'tomaj/nette-bootstrap-form', codeRepository: repoUrl },
      ...(modified ? { dateModified: modified } : {}),
    })
    graph.push(breadcrumb(page, url))
  }

  if (page.relativePath === 'faq.md') {
    const faq = faqEntries(readFileSync(resolve(srcDir, page.relativePath), 'utf8'))
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      mainEntity: faq.map((e) => ({ '@type': 'Question', name: e.q, acceptedAnswer: { '@type': 'Answer', text: e.a } })),
    })
  }

  head.push(['script', { type: 'application/ld+json' }, JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })])
  return head
}
