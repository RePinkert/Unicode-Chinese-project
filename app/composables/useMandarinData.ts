import type { MandarinItem } from '~/types'

export const useMandarinData = () => {
  const mandarinData = useState<MandarinItem[]>('mandarinData', () => [])
  const loading = useState('mandarinLoading', () => false)
  const error = useState<string | null>('mandarinError', () => null)

  const loadMandarinData = async () => {
    if (mandarinData.value.length > 0) return mandarinData.value
    
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/data/kMandarin_8105.txt')
      const text = await response.text()
      
      mandarinData.value = text.split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(line => {
          const parts = line.split(':')
          if (parts.length < 2) return null
          const codePointPart = parts[0].trim()
          const codePoint = parseInt(codePointPart.substring(2), 16)
          const pinyinPart = parts[1].trim()
          const pinyin = pinyinPart.split('#')[0].trim()
          
          return {
            codePoint,
            pinyin
          }
        })
        .filter(item => item !== null) as MandarinItem[]
      
      return mandarinData.value
    } catch (err) {
      error.value = 'Failed to load mandarin data'
      console.error(err)
      return []
    } finally {
      loading.value = false
    }
  }

  const getRandomHanzi = (): MandarinItem | null => {
    if (mandarinData.value.length === 0) return null
    const randomIndex = Math.floor(Math.random() * mandarinData.value.length)
    return mandarinData.value[randomIndex]
  }

  const searchHanzi = (searchTerm: string): MandarinItem[] => {
    if (!searchTerm) return mandarinData.value
    
    const term = searchTerm.toUpperCase()
    return mandarinData.value.filter(item => {
      const char = String.fromCodePoint(item.codePoint)
      const codePointHex = item.codePoint.toString(16).toUpperCase()
      
      return term.startsWith('U+')
        ? codePointHex.includes(term.substring(2))
        : char.includes(searchTerm)
    })
  }

  const getSampleHanzi = (sampleSize: number = 1000): MandarinItem[] => {
    const shuffled = [...mandarinData.value].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.min(sampleSize, mandarinData.value.length))
  }

  return {
    mandarinData: readonly(mandarinData),
    loading: readonly(loading),
    error: readonly(error),
    loadMandarinData,
    getRandomHanzi,
    searchHanzi,
    getSampleHanzi
  }
}
