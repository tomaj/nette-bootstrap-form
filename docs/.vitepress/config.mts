import { defineConfig } from 'vitepress'
import { base, seoHead, siteUrl } from './seo'

const repo = 'https://github.com/tomaj/nette-bootstrap-form'
const description = 'Bootstrap renderers (horizontal, vertical, inline) for Nette Forms: set one renderer and every control gets the Bootstrap classes and wrappers.'

const descriptionSk = 'Bootstrap vykresľovače (horizontálny, vertikálny, inline) pre Nette Forms: nastavte jeden renderer a každý prvok formulára dostane triedy a obaly Bootstrapu.'

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

const examplesSk = [
  { text: 'Prehľad', link: '/sk/examples/' },
  { text: 'Tri rozloženia', link: '/sk/examples/layouts' },
  { text: 'Všetky typy prvkov', link: '/sk/examples/all-controls' },
  { text: 'Inline filter', link: '/sk/examples/inline-filter' },
  { text: 'Chyby validácie', link: '/sk/examples/validation-errors' },
  { text: 'Objednávka so skupinami', link: '/sk/examples/checkout-groups' },
  { text: 'Štýly tlačidiel', link: '/sk/examples/button-styles' },
  { text: 'Vlastné obaly', link: '/sk/examples/custom-wrappers' },
  { text: 'Ručné vykreslenie', link: '/sk/examples/manual-rendering' },
]

const navEn = [
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
]

const navSk = [
  { text: 'Príručka', link: '/sk/guide/getting-started', activeMatch: '^/sk/guide/' },
  { text: 'Príklady', link: '/sk/examples/', activeMatch: '^/sk/examples/' },
  { text: 'Referencia', link: '/sk/api/reference', activeMatch: '^/sk/api/' },
  {
    text: '3.x',
    items: [
      { text: '3.x (master, zatiaľ nevydaná)', link: '/sk/' },
      { text: '2.x (README)', link: `${repo}/tree/2.1.1#readme` },
      { text: 'Prechod z 2.x na 3.0', link: '/sk/upgrade' },
      { text: 'Zoznam zmien', link: '/sk/changelog' },
      { text: 'Vydania', link: `${repo}/releases` },
    ],
  },
]

const sidebarEn = [
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
]

const sidebarSk = [
  {
    text: 'Príručka',
    items: [
      { text: 'Začíname', link: '/sk/guide/getting-started' },
      { text: 'Vykresľovače', link: '/sk/guide/renderers' },
      { text: 'Prvky formulára', link: '/sk/guide/controls' },
      { text: 'Validácia a chyby', link: '/sk/guide/errors' },
      { text: 'Prispôsobenie', link: '/sk/guide/customizing' },
      { text: 'Nette aplikácia', link: '/sk/guide/nette-application' },
      { text: 'Testovanie formulárov', link: '/sk/guide/testing' },
    ],
  },
  {
    text: 'Príklady',
    collapsed: false,
    items: examplesSk,
  },
  {
    text: 'Referencia',
    items: [
      { text: 'Referencia API', link: '/sk/api/reference' },
      { text: 'Konfigurácia ($wrappers)', link: '/sk/guide/configuration' },
      { text: 'Časté otázky', link: '/sk/faq' },
      { text: 'Prechod na 3.0', link: '/sk/upgrade' },
      { text: 'Zoznam zmien', link: '/sk/changelog' },
    ],
  },
  {
    text: 'Projekt',
    items: [
      { text: 'Ako prispieť', link: '/sk/contributing' },
      { text: 'Bezpečnosť', link: '/sk/security' },
    ],
  },
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
    return seoHead(pageData, siteConfig.srcDir, pageData.relativePath.startsWith('sk/') ? descriptionSk : description)
  },

  // English is the default locale at the site root; Slovak mirrors it under /sk/.
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description,
    },
    sk: {
      label: 'Slovenčina',
      lang: 'sk-SK',
      link: '/sk/',
      title: 'Nette Bootstrap Form',
      description: descriptionSk,
      themeConfig: {
        nav: navSk,
        sidebar: sidebarSk,
        outline: {
          level: [2, 3],
          label: 'Na tejto stránke',
        },
        docFooter: {
          prev: 'Predchádzajúca stránka',
          next: 'Nasledujúca stránka',
        },
        editLink: {
          pattern: `${repo}/edit/master/docs/:path`,
          text: 'Upraviť túto stránku na GitHube',
        },
        lastUpdated: {
          text: 'Naposledy upravené',
        },
        darkModeSwitchLabel: 'Vzhľad',
        lightModeSwitchTitle: 'Prepnúť na svetlý režim',
        darkModeSwitchTitle: 'Prepnúť na tmavý režim',
        sidebarMenuLabel: 'Ponuka',
        returnToTopLabel: 'Návrat na začiatok',
        langMenuLabel: 'Zmeniť jazyk',
        skipToContentLabel: 'Preskočiť na obsah',
        footer: {
          message: 'Vydané pod licenciou MIT.',
          copyright: 'Copyright © 2015-2026 Tomas Majer',
        },
        notFound: {
          code: '404',
          title: 'STRÁNKA SA NENAŠLA',
          quote: 'Táto stránka neexistuje alebo sa presunula.',
          linkLabel: 'prejsť na úvod',
          linkText: 'Späť na úvod',
        },
      },
    },
  },

  themeConfig: {
    logo: { light: '/logo.svg', dark: '/logo-dark.svg', alt: 'Nette Bootstrap Form' },

    nav: navEn,
    sidebar: sidebarEn,

    socialLinks: [{ icon: 'github', link: repo }],

    editLink: {
      pattern: `${repo}/edit/master/docs/:path`,
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          sk: {
            translations: {
              button: {
                buttonText: 'Hľadať',
                buttonAriaLabel: 'Hľadať',
              },
              modal: {
                displayDetails: 'Zobraziť podrobný zoznam',
                resetButtonTitle: 'Vymazať hľadanie',
                backButtonTitle: 'Zavrieť hľadanie',
                noResultsText: 'Žiadne výsledky pre',
                footer: {
                  selectText: 'vybrať',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'prejsť',
                  navigateUpKeyAriaLabel: 'šípka hore',
                  navigateDownKeyAriaLabel: 'šípka dole',
                  closeText: 'zavrieť',
                  closeKeyAriaLabel: 'escape',
                },
              },
            },
          },
        },
      },
    },

    outline: {
      level: [2, 3],
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2015-2026 Tomas Majer',
    },
  },
})
