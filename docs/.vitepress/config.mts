import { defineConfig } from 'vitepress'

const repo = 'https://github.com/tomaj/nette-bootstrap-form'
const description = 'Bootstrap renderers (horizontal, vertical, inline) for Nette Forms.'

export default defineConfig({
  title: 'Nette Bootstrap Form',
  description,
  base: '/nette-bootstrap-form/',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://tomaj.github.io/nette-bootstrap-form/',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/nette-bootstrap-form/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Nette Bootstrap Form' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: 'https://tomaj.github.io/nette-bootstrap-form/' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/reference' },
      {
        text: '3.x',
        items: [
          { text: '3.x (master, unreleased)', link: '/' },
          { text: '2.x (README)', link: `${repo}/tree/2.1.1#readme` },
          { text: 'Upgrading 2.x → 3.0', link: '/guide/upgrading' },
        ],
      },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Releases', link: `${repo}/releases` },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Renderers', link: '/guide/renderers' },
          { text: 'Upgrading to 3.0', link: '/guide/upgrading' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API reference', link: '/api/reference' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: repo }],

    editLink: {
      pattern: `${repo}/edit/master/docs/:path`,
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the LGPL-2.0-or-later license.',
      copyright: 'Copyright © 2015-2026 Tomas Majer',
    },
  },
})
