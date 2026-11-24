import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import FormPreview from './FormPreview.vue'
import LinkCards from './LinkCards.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FormPreview', FormPreview)
    app.component('LinkCards', LinkCards)
  },
} satisfies Theme
