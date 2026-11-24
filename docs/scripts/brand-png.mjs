// Rasterizes the SVG artwork written by brand-svg.mjs: the favicon PNGs, favicon.ico (16, 32 and
// 48 px PNG entries), the web manifest icons and the 1200 × 630 social card og.png.
// Needs Chrome: CHROME_PATH=/path/to/chrome node scripts/brand-png.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import puppeteer from 'puppeteer-core'

const pub = (path) => new URL(`../public/${path}`, import.meta.url)
const logo = readFileSync(pub('logo.svg'), 'utf8')
const og = readFileSync(pub('og.svg'), 'utf8')

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--font-render-hinting=none'],
})
const page = await browser.newPage()

async function render(svg, width, height, background = 'transparent') {
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  const sized = svg.replace(/<svg([^>]*?) width="\d+" height="\d+"/, `<svg$1 width="${width}" height="${height}"`)
  await page.setContent(`<html><body style="margin:0;background:${background}">${sized}</body></html>`)
  return page.screenshot({ type: 'png', omitBackground: background === 'transparent', clip: { x: 0, y: 0, width, height } })
}

const icons = { 'favicon-16.png': 16, 'favicon-32.png': 32, 'icon-192.png': 192, 'icon-512.png': 512 }
for (const [name, size] of Object.entries(icons)) {
  writeFileSync(pub(name), await render(logo, size, size))
}
// iOS puts its own mask over the icon: give it a full white square with the mark inset
{
  const inset = logo.replace(/<svg[^>]*>/, (tag) => tag.replace(/ width="\d+" height="\d+"/, ''))
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 })
  await page.setContent(`<html><body style="margin:0;background:#fff"><div style="width:180px;height:180px;display:flex;align-items:center;justify-content:center">${inset.replace('<svg', '<svg width="150" height="150"')}</div></body></html>`)
  writeFileSync(pub('apple-touch-icon.png'), await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 180, height: 180 } }))
}

// ICO with PNG entries (supported by every current browser)
const entries = []
for (const size of [16, 32, 48]) {
  entries.push({ size, data: await render(logo, size, size) })
}
const header = Buffer.alloc(6 + 16 * entries.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(entries.length, 4)
let offset = header.length
entries.forEach(({ size, data }, i) => {
  const at = 6 + 16 * i
  header.writeUInt8(size, at)
  header.writeUInt8(size, at + 1)
  header.writeUInt8(0, at + 2)
  header.writeUInt8(0, at + 3)
  header.writeUInt16LE(1, at + 4)
  header.writeUInt16LE(32, at + 6)
  header.writeUInt32LE(data.length, at + 8)
  header.writeUInt32LE(offset, at + 12)
  offset += data.length
})
writeFileSync(pub('favicon.ico'), Buffer.concat([header, ...entries.map((e) => e.data)]))

writeFileSync(pub('og.png'), await render(og, 1200, 630, '#ffffff'))

await browser.close()
console.log('favicon PNGs, favicon.ico, apple-touch-icon.png and og.png written')
