// Writes the hand-tuned SVG artwork of the site into docs/public: the logo (light and dark), the
// favicon, the hero illustration, the feature icons and the diagrams, each in a light and a dark
// variant from the same drawing. Run `node scripts/brand-svg.mjs` after changing a shape or a colour,
// then `node scripts/brand-png.mjs` for the PNG/ICO files and the OG image, and commit the result.
import { mkdirSync, writeFileSync } from 'node:fs'

const out = (path, svg) => {
  const file = new URL(`../public/${path}`, import.meta.url)
  mkdirSync(new URL('.', file), { recursive: true })
  writeFileSync(file, svg.trim().replace(/\n\s*\n/g, '\n') + '\n')
}

const sans = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Brand: Bootstrap violet with an amber accent (the primary button of the mark).
const themes = {
  light: {
    markFrom: '#7c4dd6', markTo: '#4f2a96', bar: '#ffffff', accent: '#f5a524',
    bg: '#ffffff', panel: '#faf8ff', line: '#d9cff0', soft: '#efe8fb', text: '#2b2340', muted: '#6b6283',
    brand: '#6d3fc0', brandText: '#ffffff', input: '#ffffff', inputLine: '#c9c2d8', chrome: '#f1eef8',
    code: '#1f1833', codeText: '#ede7fb', codeKey: '#c6a8ff', codeStr: '#ffd27a', error: '#c9302c', errorSoft: '#fbe9e9',
  },
  dark: {
    markFrom: '#9b6ff0', markTo: '#6a3fcf', bar: '#ffffff', accent: '#f7b84b',
    bg: '#1b1726', panel: '#221d31', line: '#3d3456', soft: '#2c2441', text: '#ece6fa', muted: '#a89fc2',
    brand: '#9f7aea', brandText: '#160f26', input: '#16121f', inputLine: '#4a4064', chrome: '#2a2339',
    code: '#120e1c', codeText: '#ede7fb', codeKey: '#c6a8ff', codeStr: '#ffd27a', error: '#f0716d', errorSoft: '#3a1f27',
  },
}

// --- logo: a rounded violet square with two inputs and an amber button --------------------------
function mark(t, id) {
  return `
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t.markFrom}"/><stop offset="1" stop-color="${t.markTo}"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="15" fill="url(#${id})"/>
  <rect x="12" y="14" width="40" height="9" rx="2.5" fill="${t.bar}"/>
  <rect x="12" y="28" width="40" height="9" rx="2.5" fill="${t.bar}" fill-opacity="0.92"/>
  <rect x="12" y="42" width="20" height="9" rx="4.5" fill="${t.accent}"/>`
}

for (const [name, t] of [['logo.svg', themes.light], ['logo-dark.svg', themes.dark], ['favicon.svg', themes.light]]) {
  out(name, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Nette Bootstrap Form">${mark(t, 'nbf-mark')}
</svg>`)
}

// Text in the hero and the diagrams, per docs language (the Slovak pages under docs/sk/ use the -sk files).
const langs = {
  en: {
    suffix: '',
    heroAria: 'A browser window shows a horizontal Bootstrap form with labels on the left, inputs on the right, a radio list and a primary Save button. A code card below sets the BootstrapRenderer on the form.',
    name: 'Name', email: 'E-mail', plan: 'Plan', free: 'Free', pro: 'Pro', newsletter: 'Send me the newsletter', save: 'Save', cancel: 'Cancel',
    saveWidth: 76,
    anatomyAria: 'One label and control pair of BootstrapRenderer. The outer div.form-group is wrappers pair container, with has-error from pair .error. Inside, div.col-sm-3.control-label is label container around the label, and div.col-sm-9 is control container around the input with form-control, the description span.help-block from control description and the error span.help-block from control errorcontainer.',
    password: 'Password', hint: 'At least 8 characters.', error: 'The password must have at least 8 characters.',
    hintTag: 490, legend: 'control.description → help text,  control.errorcontainer → error',
    flowAria: "Rendering flow: your Nette Form goes to the Bootstrap renderer's render method, which adds Bootstrap classes to the form and its controls, then Nette's DefaultFormRenderer wraps every pair using the renderer's wrappers array and returns the HTML.",
    yourForm: 'Your form', formLines: ['controls, rules,', 'groups, errors'], decorate: '1. Decorate', render: '2. Render', withWrappers: 'with $wrappers',
    flowNote: 'both steps run inside BootstrapRenderer::render(), on every echo $form or {control form}',
    ogTagline: 'Bootstrap renderers for Nette Forms', ogFooter: 'Horizontal · vertical · inline',
  },
  sk: {
    suffix: '-sk',
    heroAria: 'Okno prehliadača s horizontálnym formulárom Bootstrapu: popisky vľavo, polia vpravo, prepínače a hlavné tlačidlo Uložiť. Pod ním kód, ktorý formuláru nastaví BootstrapRenderer.',
    name: 'Meno', email: 'E-mail', plan: 'Tarif', free: 'Free', pro: 'Pro', newsletter: 'Posielať mi newsletter', save: 'Uložiť', cancel: 'Zrušiť',
    saveWidth: 76,
    anatomyAria: 'Jedna dvojica popisku a prvku v BootstrapRenderer. Vonkajší div.form-group je wrappers pair container, s has-error z pair .error. Vnútri je div.col-sm-3.control-label (label container) okolo popisku a div.col-sm-9 (control container) okolo poľa s form-control, popisu span.help-block z control description a chybovej hlášky span.help-block z control errorcontainer.',
    password: 'Heslo', hint: 'Aspoň 8 znakov.', error: 'Heslo musí mať aspoň 8 znakov.',
    hintTag: 490, legend: 'control.description → popis,  control.errorcontainer → chyba',
    flowAria: 'Postup vykreslenia: váš Nette formulár prejde metódou render() Bootstrap vykresľovača, ktorá formuláru a jeho prvkom pridá triedy Bootstrapu, potom DefaultFormRenderer z Nette obalí každú dvojicu podľa poľa $wrappers vykresľovača a vráti HTML.',
    yourForm: 'Váš formulár', formLines: ['prvky, pravidlá,', 'skupiny, chyby'], decorate: '1. Doplnenie tried', render: '2. Vykreslenie', withWrappers: 's $wrappers',
    flowNote: 'oba kroky bežia v BootstrapRenderer::render() pri každom echo $form alebo {control form}',
    ogTagline: 'Bootstrap vykresľovače pre Nette Forms', ogFooter: 'Horizontálne · vertikálne · inline',
  },
}

// --- hero: a browser window with a horizontal Bootstrap form, and the line of PHP that made it ----
function hero(t, L) {
  const row = (y, label, w = 300) => `
    <text x="150" y="${y + 21}" text-anchor="end" font-family="${sans}" font-size="14" font-weight="600" fill="${t.text}">${label}</text>
    <rect x="166" y="${y}" width="${w}" height="32" rx="5" fill="${t.input}" stroke="${t.inputLine}" stroke-width="1.5"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 440" width="560" height="440" role="img" aria-label="${L.heroAria}">
  <rect x="20" y="16" width="520" height="330" rx="16" fill="${t.bg}" stroke="${t.line}" stroke-width="2"/>
  <path d="M20 32 a16 16 0 0 1 16 -16 h488 a16 16 0 0 1 16 16 v20 h-520 z" fill="${t.chrome}"/>
  <line x1="20" y1="52" x2="540" y2="52" stroke="${t.line}" stroke-width="2"/>
  <circle cx="44" cy="34" r="6" fill="#ff6159"/><circle cx="64" cy="34" r="6" fill="#ffbd2e"/><circle cx="84" cy="34" r="6" fill="#28c941"/>
  <rect x="110" y="25" width="300" height="18" rx="9" fill="${t.bg}" stroke="${t.line}"/>
  <text x="124" y="38" font-family="${sans}" font-size="11" fill="${t.muted}">shop.example/profile</text>
  ${row(76, L.name)}
  ${row(124, L.email)}
  <text x="150" y="193" text-anchor="end" font-family="${sans}" font-size="14" font-weight="600" fill="${t.text}">${L.plan}</text>
  <circle cx="176" cy="188" r="7" fill="${t.input}" stroke="${t.brand}" stroke-width="2"/><circle cx="176" cy="188" r="3.5" fill="${t.brand}"/>
  <text x="190" y="193" font-family="${sans}" font-size="14" fill="${t.text}">${L.free}</text>
  <circle cx="248" cy="188" r="7" fill="${t.input}" stroke="${t.inputLine}" stroke-width="2"/>
  <text x="262" y="193" font-family="${sans}" font-size="14" fill="${t.text}">${L.pro}</text>
  <rect x="168" y="216" width="14" height="14" rx="3" fill="${t.brand}"/>
  <path d="M171 223 l3 3 l6 -6" fill="none" stroke="${t.brandText}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="190" y="228" font-family="${sans}" font-size="14" fill="${t.text}">${L.newsletter}</text>
  <rect x="166" y="252" width="76" height="34" rx="5" fill="${t.brand}"/>
  <text x="204" y="274" text-anchor="middle" font-family="${sans}" font-size="14" font-weight="600" fill="${t.brandText}">${L.save}</text>
  <rect x="252" y="252" width="84" height="34" rx="5" fill="${t.input}" stroke="${t.inputLine}" stroke-width="1.5"/>
  <text x="294" y="274" text-anchor="middle" font-family="${sans}" font-size="14" fill="${t.text}">${L.cancel}</text>
  <line x1="158" y1="70" x2="158" y2="296" stroke="${t.brand}" stroke-width="1.5" stroke-dasharray="4 5" opacity="0.55"/>
  <text x="44" y="320" font-family="${mono}" font-size="11" fill="${t.muted}">col-sm-3</text>
  <text x="166" y="320" font-family="${mono}" font-size="11" fill="${t.muted}">col-sm-9 · form-control · btn btn-primary</text>
  <g transform="translate(58 352)">
    <rect width="444" height="64" rx="12" fill="${t.code}"/>
    <rect width="444" height="64" rx="12" fill="none" stroke="${t.brand}" stroke-opacity="0.6" stroke-width="1.5"/>
    <text x="22" y="38" font-family="${mono}" font-size="15" fill="${t.codeText}">$form-&gt;<tspan fill="${t.codeKey}">setRenderer</tspan>(<tspan fill="${t.codeStr}">new</tspan> <tspan fill="${t.codeKey}">BootstrapRenderer</tspan>());</text>
  </g>
</svg>`
}
for (const L of Object.values(langs)) {
  out(`illustrations/hero${L.suffix}-light.svg`, hero(themes.light, L))
  out(`illustrations/hero${L.suffix}-dark.svg`, hero(themes.dark, L))
}

// --- feature icons, 48 × 48 ----------------------------------------------------------------------
const icons = {
  horizontal: (t) => `
    <rect x="5" y="10" width="11" height="6" rx="2" fill="${t.brand}"/><rect x="19" y="8" width="24" height="10" rx="2.5" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/>
    <rect x="5" y="31" width="11" height="6" rx="2" fill="${t.brand}"/><rect x="19" y="29" width="24" height="10" rx="2.5" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/>`,
  vertical: (t) => `
    <rect x="6" y="5" width="16" height="5" rx="2" fill="${t.brand}"/><rect x="6" y="12" width="36" height="10" rx="2.5" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/>
    <rect x="6" y="27" width="12" height="5" rx="2" fill="${t.brand}"/><rect x="6" y="34" width="36" height="10" rx="2.5" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/>`,
  inline: (t) => `
    <rect x="3" y="19" width="17" height="10" rx="2.5" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/>
    <rect x="23" y="19" width="12" height="10" rx="2.5" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/>
    <rect x="38" y="19" width="8" height="10" rx="3" fill="${t.accent}"/>
    <path d="M3 36 h43" stroke="${t.brand}" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 4"/>`,
  controls: (t) => `
    <rect x="4" y="13" width="40" height="22" rx="4" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/>
    <path d="M12 19 v10" stroke="${t.brand}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M18 24 h18" stroke="${t.brand}" stroke-width="2" stroke-linecap="round" opacity="0.45"/>`,
  buttons: (t) => `
    <rect x="3" y="16" width="20" height="16" rx="5" fill="${t.brand}"/><path d="M8.5 24 h9" stroke="${t.brandText}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="26" y="16" width="19" height="16" rx="5" fill="${t.soft}" stroke="${t.brand}" stroke-width="2"/><path d="M31 24 h9" stroke="${t.brand}" stroke-width="2.5" stroke-linecap="round"/>`,
  errors: (t) => `
    <rect x="4" y="9" width="40" height="13" rx="3" fill="${t.errorSoft}" stroke="${t.error}" stroke-width="2"/>
    <path d="M10 15.5 h16" stroke="${t.error}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    <circle cx="11" cy="33" r="7" fill="${t.error}"/><path d="M11 29 v4.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="11" cy="37" r="1.3" fill="#fff"/>
    <path d="M22 33 h20" stroke="${t.error}" stroke-width="2.5" stroke-linecap="round"/>`,
}
for (const [name, draw] of Object.entries(icons)) {
  for (const [variant, t] of Object.entries(themes)) {
    const t2 = { ...t, accent: themes[variant].accent }
    out(`icons/${name}${variant === 'dark' ? '-dark' : ''}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">${draw(t2)}
</svg>`)
  }
}

// --- diagram: which $wrappers key draws which element of a horizontal pair -----------------------
function anatomy(t, L) {
  const key = (x, y, text, anchor = 'start') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${mono}" font-size="13" fill="${t.brand}">${text}</text>`
  const tag = (x, y, text) => `<text x="${x}" y="${y}" font-family="${mono}" font-size="12" fill="${t.muted}">${text}</text>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 340" width="760" height="340" role="img" aria-label="${L.anatomyAria}">
  <rect x="1" y="1" width="758" height="338" rx="14" fill="${t.panel}" stroke="${t.line}" stroke-width="1.5"/>
  <rect x="24" y="44" width="712" height="226" rx="10" fill="${t.bg}" stroke="${t.brand}" stroke-width="2"/>
  ${tag(36, 36, 'div.form-group.required.has-error')}
  ${key(724, 36, "pair.container · pair..required · pair..error", 'end')}
  <rect x="44" y="84" width="190" height="80" rx="8" fill="${t.soft}" stroke="${t.brand}" stroke-width="1.5" stroke-dasharray="6 4"/>
  ${tag(48, 76, 'div.col-sm-3.control-label')}
  <text x="218" y="130" text-anchor="end" font-family="${sans}" font-size="16" font-weight="700" fill="${t.text}">${L.password}</text>
  <rect x="254" y="84" width="462" height="166" rx="8" fill="${t.soft}" stroke="${t.brand}" stroke-width="1.5" stroke-dasharray="6 4"/>
  ${tag(258, 76, 'div.col-sm-9')}
  <rect x="272" y="104" width="426" height="38" rx="5" fill="${t.input}" stroke="${t.error}" stroke-width="2"/>
  <text x="286" y="128" font-family="${sans}" font-size="15" fill="${t.text}">•••••</text>
  ${tag(560, 128, 'input.form-control')}
  <text x="272" y="170" font-family="${sans}" font-size="14" fill="${t.muted}">${L.hint}</text>
  ${tag(L.hintTag, 170, 'span.help-block')}
  <text x="272" y="200" font-family="${sans}" font-size="14" fill="${t.error}">${L.error}</text>
  ${tag(272, 232, 'span.help-block')}
  ${key(44, 298, "label.container")}
  <path d="M100 286 V168" stroke="${t.brand}" stroke-width="1.5" marker-end="url(#arrow-${t.bg.slice(1)})"/>
  ${key(254, 298, "control.container")}
  ${key(254, 318, L.legend)}
  <defs><marker id="arrow-${t.bg.slice(1)}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${t.brand}"/></marker></defs>
</svg>`
}
for (const L of Object.values(langs)) {
  out(`diagrams/wrappers-anatomy${L.suffix}-light.svg`, anatomy(themes.light, L))
  out(`diagrams/wrappers-anatomy${L.suffix}-dark.svg`, anatomy(themes.dark, L))
}

// --- diagram: what render() does -------------------------------------------------------------------
function flow(t, L) {
  const box = (x, title, lines, fill = t.bg) => `
  <rect x="${x}" y="40" width="200" height="150" rx="12" fill="${fill}" stroke="${t.brand}" stroke-width="2"/>
  <text x="${x + 100}" y="72" text-anchor="middle" font-family="${sans}" font-size="16" font-weight="700" fill="${t.text}">${title}</text>
  ${lines.map((l, i) => `<text x="${x + 100}" y="${102 + i * 22}" text-anchor="middle" font-family="${mono}" font-size="12" fill="${t.muted}">${l}</text>`).join('\n  ')}`
  const arrow = (x) => `<path d="M${x} 115 h36" stroke="${t.brand}" stroke-width="2.5" marker-end="url(#flow-${t.bg.slice(1)})"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 230" width="760" height="230" role="img" aria-label="${L.flowAria}">
  <defs><marker id="flow-${t.bg.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${t.brand}"/></marker></defs>
  <rect x="1" y="1" width="758" height="228" rx="14" fill="${t.panel}" stroke="${t.line}" stroke-width="1.5"/>
  ${box(20, L.yourForm, ['Nette\\Forms\\Form', ...L.formLines])}
  ${arrow(222)}
  ${box(280, L.decorate, ['form-horizontal', 'novalidate', 'form-control · btn', 'div.checkbox · div.radio'], t.soft)}
  ${arrow(482)}
  ${box(540, L.render, ['DefaultFormRenderer', L.withWrappers, '→ Bootstrap HTML'], t.soft)}
  <text x="380" y="216" text-anchor="middle" font-family="${sans}" font-size="13" fill="${t.muted}">${L.flowNote}</text>
</svg>`
}
for (const L of Object.values(langs)) {
  out(`diagrams/render-flow${L.suffix}-light.svg`, flow(themes.light, L))
  out(`diagrams/render-flow${L.suffix}-dark.svg`, flow(themes.dark, L))
}

// --- social cards og.svg and og-sk.svg, rasterized by brand-png.mjs --------------------------------
for (const L of Object.values(langs)) {
  const t = themes.light
  out(`og${L.suffix}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs><linearGradient id="og-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#faf8ff"/><stop offset="1" stop-color="#efe8fb"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#og-bg)"/>
  <g transform="translate(80 92) scale(2)">${mark(t, 'og-mark')}</g>
  <text x="240" y="150" font-family="${sans}" font-size="64" font-weight="800" fill="#2b2340">Nette Bootstrap Form</text>
  <text x="240" y="200" font-family="${sans}" font-size="30" fill="#6b6283">${L.ogTagline}</text>
  <g transform="translate(80 270)">
    <rect width="500" height="250" rx="16" fill="#1f1833"/>
    <text x="32" y="58" font-family="${mono}" font-size="22" fill="#ede7fb">$form = <tspan fill="#ffd27a">new</tspan> <tspan fill="#c6a8ff">Form</tspan>();</text>
    <text x="32" y="98" font-family="${mono}" font-size="22" fill="#ede7fb">$form-&gt;<tspan fill="#c6a8ff">addText</tspan>(...);</text>
    <text x="32" y="138" font-family="${mono}" font-size="22" fill="#ede7fb">$form-&gt;<tspan fill="#c6a8ff">setRenderer</tspan>(</text>
    <text x="64" y="178" font-family="${mono}" font-size="22" fill="#ede7fb"><tspan fill="#ffd27a">new</tspan> <tspan fill="#c6a8ff">BootstrapRenderer</tspan>()</text>
    <text x="32" y="218" font-family="${mono}" font-size="22" fill="#ede7fb">);</text>
  </g>
  <path d="M600 395 h50" stroke="#6d3fc0" stroke-width="5" stroke-linecap="round"/><path d="M640 380 l16 15 l-16 15" fill="none" stroke="#6d3fc0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <g transform="translate(690 270)">
    <rect width="430" height="250" rx="16" fill="#ffffff" stroke="#d9cff0" stroke-width="2"/>
    <text x="104" y="62" text-anchor="end" font-family="${sans}" font-size="20" font-weight="600" fill="#2b2340">${L.name}</text>
    <rect x="122" y="36" width="280" height="40" rx="6" fill="#fff" stroke="#c9c2d8" stroke-width="2"/>
    <text x="104" y="124" text-anchor="end" font-family="${sans}" font-size="20" font-weight="600" fill="#2b2340">${L.email}</text>
    <rect x="122" y="98" width="280" height="40" rx="6" fill="#fff" stroke="#c9c2d8" stroke-width="2"/>
    <rect x="122" y="168" width="100" height="44" rx="6" fill="#6d3fc0"/>
    <text x="172" y="197" text-anchor="middle" font-family="${sans}" font-size="20" font-weight="600" fill="#fff">${L.save}</text>
    <rect x="234" y="168" width="110" height="44" rx="6" fill="#fff" stroke="#c9c2d8" stroke-width="2"/>
    <text x="289" y="197" text-anchor="middle" font-family="${sans}" font-size="20" fill="#2b2340">${L.cancel}</text>
  </g>
  <text x="80" y="580" font-family="${sans}" font-size="24" fill="#6b6283">${L.ogFooter}   ·   PHP 8.4+   ·   tomaj.github.io/nette-bootstrap-form</text>
</svg>`)
}

console.log('SVG artwork written to docs/public')
