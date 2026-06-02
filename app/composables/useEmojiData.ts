import type { EmojiItem } from '~/types'

export const useEmojiData = () => {
  const emojis = useState<EmojiItem[]>('emojis', () => [])
  const loading = useState('emojiLoading', () => false)
  const error = useState<string | null>('emojiError', () => null)

  const loadEmojis = async () => {
    if (emojis.value.length > 0) return emojis.value
    
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/data/emojis.csv')
      const text = await response.text()
      const lines = text.trim().split('\n')
      
      emojis.value = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const parts = line.split(',').map(part => part.trim())
          return {
            group: parts[0],
            subgroup: parts[1],
            codePoint: parts[2],
            status: parts[3],
            representation: parts[4],
            name: parts[5],
            section: parts[6]
          }
        })
        .filter(item => item !== null) as EmojiItem[]
      
      return emojis.value
    } catch (err) {
      error.value = 'Failed to load emoji data'
      console.error(err)
      return []
    } finally {
      loading.value = false
    }
  }

  const getRandomEmoji = (): EmojiItem | null => {
    if (emojis.value.length === 0) return null
    const randomIndex = Math.floor(Math.random() * emojis.value.length)
    return emojis.value[randomIndex] ?? null
  }

  const searchEmojis = (searchTerm: string): EmojiItem[] => {
    if (!searchTerm) return emojis.value
    
    const term = searchTerm.toLowerCase()
    return emojis.value.filter(item => {
      const codePoints = item.codePoint.toLowerCase().split(' ')
      const codeMatch = term.startsWith('u+')
        ? codePoints.some(cp => cp === term.substring(2))
        : item.name.toLowerCase().includes(term)
      
      return item.representation.includes(searchTerm) || codeMatch
    })
  }

  return {
    emojis: readonly(emojis),
    loading: readonly(loading),
    error: readonly(error),
    loadEmojis,
    getRandomEmoji,
    searchEmojis
  }
}
