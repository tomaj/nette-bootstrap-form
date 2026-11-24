<script setup lang="ts">
// Shows docs/public/previews/<name>.html, the tested output of examples/<name> with Bootstrap 3.4.1
// CSS, in a browser-like frame. The iframe is laid out at least `width` px wide (Bootstrap's
// horizontal and inline forms need 768 px) and scaled down to the column; on a phone it is shown
// at the real width, so the preview is what a phone would show.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const props = withDefaults(defineProps<{ name: string, title?: string, width?: number }>(), { width: 800 })

const src = withBase(`/previews/${props.name}.html`)
const frame = ref<HTMLIFrameElement>()
const box = ref<HTMLDivElement>()
const scale = ref(1)
const innerWidth = ref<number | null>(null)
const height = ref(320)

function measure(): void {
  const container = box.value
  if (!container) return
  const available = container.clientWidth
  if (available < 560) {
    scale.value = 1
    innerWidth.value = null
  } else {
    innerWidth.value = Math.max(available, props.width)
    scale.value = Math.min(1, available / innerWidth.value)
  }
  const doc = frame.value?.contentDocument
  if (doc?.body) {
    // body, not documentElement: the root element is never shorter than the iframe itself,
    // so its scrollHeight could only grow
    height.value = Math.ceil(doc.body.getBoundingClientRect().height)
  }
}

let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(() => measure())
  if (box.value) observer.observe(box.value)
  measure()
})
onBeforeUnmount(() => observer?.disconnect())

function loaded(): void {
  measure()
  // the iframe height depends on its width, measure again after the scale applied
  window.setTimeout(measure, 50)
}
</script>

<template>
  <figure class="form-preview">
    <div class="form-preview-bar">
      <span class="form-preview-dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="form-preview-title">{{ title ?? `examples/${name}` }} · Bootstrap 3.4.1</span>
      <a class="form-preview-open" :href="src" target="_blank" rel="noopener">Open ↗</a>
    </div>
    <div ref="box" class="form-preview-body" :style="{ height: `${Math.ceil(height * scale)}px` }">
      <iframe
        ref="frame"
        :src="src"
        :title="`Rendered output of examples/${name} with Bootstrap 3 CSS`"
        loading="lazy"
        scrolling="no"
        :style="{
          width: innerWidth ? `${innerWidth}px` : '100%',
          height: `${height}px`,
          transform: scale < 1 ? `scale(${scale})` : undefined,
        }"
        @load="loaded"
      />
    </div>
  </figure>
</template>
