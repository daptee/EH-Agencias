// nuxt.config.ts

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  
  app: {
    head: {
        titleTemplate: '%s - Agencias',
        title: 'EH',
        htmlAttrs: {
            lang: 'es'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
            { name: 'theme-color', content: '#ffffff' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/favicon-16x16.png' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap' }
        ]
    }
  },

  modules: [ '@pinia/nuxt', '@nuxt/eslint'],
  plugins: ['~/plugins/vuetify.ts', '~/plugins/vue3-toastify.client.ts'],

  css: ['~/assets/scss/app.scss', 'vuetify/styles'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "assets/scss/mixins.scss" as *;
            @use "assets/scss/vars.scss" as *;
          `,
        },
      },
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  runtimeConfig: {
    public: {
      MODE: process.env.MODE,
      API_URL:
        process.env.MODE === 'development'
          ? process.env.BASE_URL_DEV
          : process.env.BASE_URL_PROD,
    },
  },
})
