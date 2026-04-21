// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
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
})
