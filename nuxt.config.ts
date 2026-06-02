// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vueuse/motion', '@nuxtjs/color-mode'],
  
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '-mode'
  },
  
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Unicode Chinese Project',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'An interactive Unicode character explorer for Chinese characters and Emoji' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Victor+Mono:wght@100..700&display=swap' }
      ]
    }
  },

  routeRules: {
    '/sunburst': { ssr: false },
    '/space3d': { ssr: false },
    '/rain': { ssr: false },
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true
  }
})
