export interface EmojiItem {
  group: string
  subgroup: string
  codePoint: string
  status: string
  representation: string
  name: string
  section: string
}

export interface MandarinItem {
  codePoint: number
  pinyin: string
}

export interface CharacterInfo {
  type: 'hanzi' | 'emoji'
  codepoint: string
  pinyin?: string
  name?: string
  group?: string
  representation?: string
}
