# Unicode Chinese Project (Nuxt 4)

An interactive Unicode character explorer for Chinese characters and Emoji, built with Nuxt 4, Vue 3, and TypeScript.

## Features

- 🔍 Browse and search Unicode characters (Chinese characters and Emoji)
- 🎲 Random character generator with flip card animation
- 📱 Responsive design for all devices
- ⚡ Fast performance with SSR/SSG support
- 🎨 Modern component-based architecture

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Language**: TypeScript
- **Styling**: Vue scoped CSS
- **Build Tool**: Vite (built-in with Nuxt)

## Project Structure

```
unicode-chinese-project-nuxt/
├── app/
│   ├── components/          # Vue components
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── FlipCard.vue
│   │   ├── SearchBar.vue
│   │   ├── TabButtons.vue
│   │   └── BlockGrid.vue
│   ├── composables/         # Vue composables
│   │   ├── useEmojiData.ts
│   │   ├── useMandarinData.ts
│   │   └── useCharacterData.ts
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   ├── index.vue        # Home page (generator)
│   │   ├── blocks.vue       # Unicode blocks browser
│   │   ├── about.vue        # Project description
│   │   └── resources.vue    # Data sources
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   └── app.vue
├── public/
│   ├── data/                # Data files
│   │   ├── emojis.csv
│   │   └── kMandarin_8105.txt
│   └── font/                # Font files
├── nuxt.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, yarn, or bun

### Installation

```bash
# Install dependencies
npm install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Generate static site:

```bash
npm run generate
```

## Data Sources

This project utilizes the following datasets:

- `emojis.csv` from [datasets/emojis](https://github.com/datasets/emojis/tree/main) - Public Domain Dedication and License (PDDL)
- `kMandarin_8105.txt` from [mozillazg/pinyin-data](https://github.com/mozillazg/pinyin-data) - MIT License
- Unicode Character Database from [Unicode Consortium](https://www.unicode.org/Public/UCD/latest/)

## License

MIT License - Copyright © 2025 Xiaopeng Ren
