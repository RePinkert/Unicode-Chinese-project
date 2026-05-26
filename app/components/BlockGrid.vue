<template>
  <div class="blocks-container">
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
  transition: background-color 0.3s;
}

.hanzi-block:hover {
  background-color: rgba(255, 255, 255, 0.288);
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
