import { defineConfig } from 'vitepress'
import { base, seoHead, siteUrl } from './seo'

const repo = 'https://github.com/tomaj/nette-bootstrap-form'
const description = 'Bootstrap renderers (horizontal, vertical, inline) for Nette Forms: set one renderer and every control gets the Bootstrap classes and wrappers.'

const examples = [
  { text: 'Overview', link: '/examples/' },
  { text: 'Three layouts', link: '/examples/layouts' },
  { text: 'Every control type', link: '/examples/all-controls' },
  { text: 'Inline filter', link: '/examples/inline-filter' },
  { text: 'Validation errors', link: '/examples/validation-errors' },
  { text: 'Checkout with groups', link: '/examples/checkout-groups' },
  { text: 'Button styles', link: '/examples/button-styles' },
  { text: 'Custom wrappers', link: '/examples/custom-wrappers' },
  { text: 'Manual rendering', link: '/examples/manual-rendering' },
]

export default defineConfig({
  title: 'Nette Bootstrap Form',
  description,
  base,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['public/**', 'scripts/**'],

  sitemap: {
    hostname: siteUrl,
  },

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: '48x48' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${base}favicon-32.png` }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${base}favicon-16.png` }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}apple-touch-icon.png` }],
    ['link', { rel: 'manifest', href: `${base}site.webmanifest` }],
    ['meta', { name: 'theme-color', content: '#6d3fc0' }],
  ],

  markdown: {
    languageAlias: { latte: 'html', neon: 'yaml' },
  },

  transformHead({ pageData, siteConfig }) {
    return seoHead(pageData, siteConfig.srcDir, description)
  },

  themeConfig: {
    logo: { light: '/logo.svg', dark: '/logo-dark.svg', alt: 'Nette Bootstrap Form' },

    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '^/guide/' },
      { text: 'Examples', link: '/examples/', activeMatch: '^/examples/' },
      { text: 'Reference', link: '/api/reference', activeMatch: '^/api/' },
      {
        text: '3.x',
        items: [
          { text: '3.x (master, unreleased)', link: '/' },
          { text: '2.x (README)', link: `${repo}/tree/2.1.1#readme` },
          { text: 'Upgrading 2.x → 3.0', link: '/upgrade' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Releases', link: `${repo}/releases` },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Renderers', link: '/guide/renderers' },
          { text: 'Controls', link: '/guide/controls' },
          { text: 'Validation and errors', link: '/guide/errors' },
          { text: 'Customizing', link: '/guide/customizing' },
          { text: 'Nette application', link: '/guide/nette-application' },
          { text: 'Testing your forms', link: '/guide/testing' },
        ],
      },
      {
        text: 'Examples',
        collapsed: false,
        items: examples,
      },
      {
        text: 'Reference',
        items: [
          { text: 'API reference', link: '/api/reference' },
          { text: 'Configuration ($wrappers)', link: '/guide/configuration' },
          { text: 'FAQ', link: '/faq' },
          { text: 'Upgrading to 3.0', link: '/upgrade' },
          { text: 'Changelog', link: '/changelog' },
        ],
      },
      {
        text: 'Project',
        items: [
          { text: 'Contributing', link: '/contributing' },
          { text: 'Security', link: '/security' },
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

    outline: {
      level: [2, 3],
    },

    footer: {
      message: 'Released under the LGPL-2.0-or-later license.',
      copyright: 'Copyright © 2015-2026 Tomas Majer',
    },
  },
})
