<template>
  <div class="generator-page">
    <div class="toggle-container">
      <input type="checkbox" id="toggle" class="sr-only" v-model="isEmojiMode" />
      <label id="toggle-label" for="toggle">Toggle Emoji</label>
    </div>

    <FlipCard ref="flipCard">
      <template #front>
        <div class="character" id="mainChar" style="border-bottom: 2px dotted var(--secondary-color);">
          {{ currentCharacter?.representation || '爱' }}
        </div>
        <div id="details">
          <p>Unicode: <span id="codepoint">{{ currentCharacter?.codepoint || 'U+7231' }}</span></p>
          <p v-if="!isEmojiMode">Pinyin: <span id="pinyin">{{ currentCharacter?.pinyin || 'ài' }}</span></p>
        </div>
        <div class="buttons-container">
          <button @click="copyCharacter">Copy</button>
          <button @click="generateNew">Re-generate</button>
        </div>
      </template>

      <template #back>
        <h3>Emoji Mode</h3>
        <div class="character" id="emojiChar">{{ currentEmoji?.representation || '♥' }}</div>
        <div id="emojiDetails">
          <p>Codepoint: <span id="emojiCodepoint">{{ currentEmoji?.codepoint || 'U+2665' }}</span></p>
          <p>Name: <span id="emojiName">{{ currentEmoji?.name || 'heart suit' }}</span></p>
          <p>Category: <span id="emojiGroup">{{ currentEmoji?.group || 'Activities' }}</span></p>
        </div>
        <div class="buttons-container">
          <button @click="copyEmoji">Copy Emoji</button>
          <button @click="generateNew">Re-generate</button>
        </div>
      </template>
    </FlipCard>

    <div id="blocks">
      <h2>Examples of used Unicode blocks of this project</h2>
      <BlockGrid :items="hanziBlocks" type="hanzi" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterInfo } from '~/types'

const { initializeData, generateNew: generateNewCharacter, isEmojiMode, getHanziBlocks } = useCharacterData()

const flipCard = ref<InstanceType<typeof FlipCard> | null>(null)
const currentCharacter = ref<CharacterInfo | null>(null)
const currentEmoji = ref<CharacterInfo | null>(null)
const hanziBlocks = ref<any[]>([])

onMounted(async () => {
  await initializeData()
  generateNew()
  hanziBlocks.value = getHanziBlocks()
})

const generateNew = () => {
  const newChar = generateNewCharacter()
  if (newChar) {
    if (isEmojiMode.value) {
      currentEmoji.value = newChar
    } else {
      currentCharacter.value = newChar
    }
  }
}

const copyCharacter = async () => {
  if (currentCharacter.value?.representation) {
    try {
      await navigator.clipboard.writeText(currentCharacter.value.representation)
      alert(`Copied: ${currentCharacter.value.representation}`)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
}

const copyEmoji = async () => {
  if (currentEmoji.value?.representation) {
    try {
      await navigator.clipboard.writeText(currentEmoji.value.representation)
      alert(`Copied: ${currentEmoji.value.representation}`)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
}

watch(isEmojiMode, () => {
  generateNew()
})
</script>

<style scoped>
.generator-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.toggle-container {
  margin: 20px 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

#toggle-label {
  width: 150px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  background: var(--secondary-color);
  cursor: pointer;
  display: block;
  text-align: center;
  color: white;
  margin: 20px auto;
  border-radius: 4px;
  transition: all 0.3s;
}

#toggle:checked + #toggle-label {
  background: #27ae60;
}

.character {
  font-size: 96px;
  margin: 16px 0;
  font-family: '仓耳今楷05-W01', sans-serif;
}

#details,
#emojiDetails {
  margin-top: 16px;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 16px;
}

button {
  background: var(--secondary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  z-index: 10;
}

button:hover {
  background: #0c5a8e;
}

button:active {
  background: #072031;
  color: white;
}

#blocks {
  margin-top: 40px;
  text-align: center;
}

#blocks h2 {
  margin-bottom: 20px;
}

@media (max-width: 800px) {
  .character {
    font-size: 80px;
  }

  .buttons-container {
    flex-direction: column;
  }

  #details,
  #emojiDetails {
    font-size: 14px;
  }
}
</style>
