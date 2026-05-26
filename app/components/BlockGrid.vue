<template>
  <div ref="containerRef" class="blocks-container">
    <div
      v-for="item in items"
      :key="item.codePoint"
      class="hanzi-block"
    >
      <div class="hanzi-char">
        {{ getCharacter(item) }}
      </div>
      <div class="codepoint">
        {{ getCodepoint(item) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmojiItem, MandarinItem } from '~/types'

interface Props {
  items: (EmojiItem | MandarinItem)[]
  type: 'hanzi' | 'emoji'
}

const props = defineProps<Props>()
const containerRef = ref<HTMLElement>()

const getCharacter = (item: EmojiItem | MandarinItem): string => {
  if (props.type === 'emoji') {
    return (item as EmojiItem).representation || '?'
  }
  return String.fromCodePoint((item as MandarinItem).codePoint)
}

const getCodepoint = (item: EmojiItem | MandarinItem): string => {
  if (props.type === 'emoji') {
    const emoji = item as EmojiItem
    return emoji.codePoint.split(' ')
      .map(cp => `U+${cp.toUpperCase().padStart(4, '0')}`)
      .join(' ')
  }
  const hanzi = item as MandarinItem
  return `U+${hanzi.codePoint.toString(16).toUpperCase().padStart(4, '0')}`
}

onMounted(() => {
  if (!containerRef.value) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '50px' }
  )

  const blocks = containerRef.value.querySelectorAll('.hanzi-block')
  blocks.forEach((block) => observer.observe(block))

  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.blocks-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
}

.hanzi-block {
  width: 130px;
  height: 130px;
  flex: none;
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  /* 初始状态 */
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.15s ease;
}

/* 可见状态 - 一旦添加就不会移除 */
.hanzi-block.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* hover 效果 - 快速响应 */
.hanzi-block.visible:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.hanzi-char {
  font-size: 2em;
  font-family: '仓耳今楷05-W01', sans-serif;
  margin-bottom: 8px;
}

.codepoint {
  font-family: "Victor Mono", monospace;
  color: var(--secondary-color);
  font-size: 0.9em;
  word-break: break-all;
}
</style>
