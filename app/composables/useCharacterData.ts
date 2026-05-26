import type { CharacterInfo } from '~/types'

export const useCharacterData = () => {
  const { emojis, loadEmojis, getRandomEmoji, searchEmojis } = useEmojiData()
  const { mandarinData, loadMandarinData, getRandomHanzi, searchHanzi, getSampleHanzi } = useMandarinData()
  
  const isEmojiMode = useState('isEmojiMode', () => false)
  const refreshCount = useState('refreshCount', () => 0)

  const initializeData = async () => {
    await Promise.all([loadMandarinData(), loadEmojis()])
  }

  const generateNew = (): CharacterInfo | null => {
    refreshCount.value++
    
    if (isEmojiMode.value) {
      const emoji = getRandomEmoji()
      if (!emoji) return null
      
      const codePoints = emoji.codePoint?.split(' ')
      const formattedCodePoints = [`U+${codePoints[0].toUpperCase()}`]
        .concat(codePoints.slice(1).map(cp => cp.toUpperCase()))
      
      return {
        type: 'emoji',
        codepoint: formattedCodePoints.join(' '),
        name: emoji.name?.trim(),
        group: emoji.group,
        representation: emoji.representation
      }
    } else {
      const hanzi = getRandomHanzi()
      if (!hanzi) return null
      
      return {
        type: 'hanzi',
        codepoint: `U+${hanzi.codePoint.toString(16).toUpperCase()}`,
        pinyin: hanzi.pinyin,
        representation: String.fromCodePoint(hanzi.codePoint)
      }
    }
  }

  const toggleEmojiMode = () => {
    isEmojiMode.value = !isEmojiMode.value
  }

  const getHanziBlocks = () => {
    return getSampleHanzi(1000)
  }

  return {
    emojis: readonly(emojis),
    mandarinData: readonly(mandarinData),
    isEmojiMode: readonly(isEmojiMode),
    refreshCount: readonly(refreshCount),
    initializeData,
    generateNew,
    toggleEmojiMode,
    getHanziBlocks,
    searchEmojis,
    searchHanzi
  }
}
