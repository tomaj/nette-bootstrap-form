// Strings that the custom theme components render. Pages carry their own text;
// these are the labels inside components shared by the English and Slovak trees.
import { computed } from 'vue'
import { useData } from 'vitepress'

const en = {
  open: 'Open ↗',
  openTitle: 'Open the rendered form in a new tab',
  previewTitle: (name: string) => `Rendered output of examples/${name} with Bootstrap 3 CSS`,
}

export type Strings = typeof en

const sk: Strings = {
  open: 'Otvoriť ↗',
  openTitle: 'Otvoriť vykreslený formulár na novej karte',
  previewTitle: (name) => `Vykreslený výstup examples/${name} s CSS Bootstrapu 3`,
}

export function stringsFor(lang: string): Strings {
  return lang.startsWith('sk') ? sk : en
}

export function useStrings() {
  const { lang } = useData()
  return computed(() => stringsFor(lang.value))
}
