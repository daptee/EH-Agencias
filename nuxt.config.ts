// nuxt.config.ts

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  modules: [ '@pinia/nuxt', '@nuxt/eslint'],
  plugins: ['~/plugins/vuetify.ts', '~/plugin/vue3-toastify.client.ts'],

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
      BASE_URL:
        process.env.MODE === 'development'
          ? process.env.BASE_URL_DEV
          : process.env.BASE_URL_PROD,
    },
  },
})
