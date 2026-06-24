// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      backendHost: process.env.BACKEND_HOST || 'localhost:3000'
    }
  },
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
    // 'nuxt-charts'
  ],
  css: ['~/assets/css/main.css'],
  alias: {
    '@shared': './components/shared',
    '@widgets': './components/widgets',
  },
  nitro: {
    preset: 'bun',
    node: true,
    inlineDynamicImports: true,
    serveStatic: 'inline',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  i18n: {
    locales: [{
      code: 'ru',
      name: 'Русский',
      file: 'ru.json'
    }, {
      code: 'en',
      name: 'English',
      file: 'en.json'
    }],
    defaultLocale: 'en',
    langDir: 'locales'
  }
})
