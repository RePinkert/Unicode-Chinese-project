<template>
  <div class="generator-page">
    <input type="checkbox" id="toggle" class="sr-only" v-model="isEmojiMode" />
    <label id="toggle-label" for="toggle">Toggle Emoji</label>

    <div class="content">
      <div class="card-view">
        <div class="card">
          <div class="face front-face">
            <div class="character" style="border-bottom: 2px dotted var(--secondary-color);">
              {{ currentCharacter?.representation || '爱' }}
            </div>
            <div class="details">
              <p>Unicode: <span>{{ currentCharacter?.codepoint || 'U+7231' }}</span></p>
              <p>Pinyin: <span>{{ currentCharacter?.pinyin || 'ài' }}</span></p>
            </div>
            <div class="buttons-container">
              <button @click="copyCharacter">Copy</button>
              <button @click="generateNew">Re-generate</button>
            </div>
          </div>
          <div class="face back-face">
            <h3>Emoji Mode</h3>
            <div class="character">{{ currentEmoji?.representation || '♥' }}</div>
            <div class="details">
              <p>Codepoint: <span>{{ currentEmoji?.codepoint || 'U+2665' }}</span></p>
              <p>Name: <span>{{ currentEmoji?.name || 'heart suit' }}</span></p>
              <p>Category: <span>{{ currentEmoji?.group || 'Activities' }}</span></p>
            </div>
            <div class="buttons-container">
              <button @click="copyEmoji">Copy Emoji</button>
              <button @click="generateNew">Re-generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="blocks">
      <h2>Examples of used Unicode blocks of this project</h2>
      <BlockGrid :items="hanziBlocks" type="hanzi" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterInfo } from '~/types'

const { initializeData, generateNew: generateNewCharacter, isEmojiMode, getHanziBlocks } = useCharacterData()

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

/* Card flip - CSS checkbox hack */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-view {
  margin: 20px auto;
  perspective: 1000px;
  width: 400px;
  min-height: 400px;
}

.card {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
  width: 100%;
  min-height: inherit;
}

/* Flip when checkbox is checked */
#toggle:checked ~ .content .card {
  transform: rotateY(180deg);
}

/* Keep flipped on hover */
#toggle:checked ~ .content .card-view:hover .card {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  width: 100%;
  min-height: inherit;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.front-face {
  background: #fff;
  transform: rotateY(0deg);
}

.back-face {
  background: #f0f0f0;
  transform: rotateY(180deg);
}

.character {
  font-size: 96px;
  margin: 16px 0;
  font-family: '仓耳今楷05-W01', sans-serif;
}

.details {
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
  .card-view {
    width: 300px;
    min-height: auto;
  }

  .character {
    font-size: 80px;
  }

  .buttons-container {
    flex-direction: column;
  }

  .details {
    font-size: 14px;
  }
}
</style>
