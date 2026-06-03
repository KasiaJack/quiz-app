import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Na GitHub Pages aplikacja działa pod adresem /quiz-app/ (nazwa repozytorium).
  // Przy uruchomieniu lokalnym (dev) i testach bazą pozostaje '/'.
  base: command === 'build' ? '/quiz-app/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // testy jednostkowe trzymamy w src/ — folder e2e/ obsługuje Playwright
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,vue}'],
      // main.js to punkt startowy aplikacji (tylko montuje aplikację),
      // a stores/counter.js to nieużywany plik z szablonu Vue — oba pomijamy.
      exclude: ['src/main.js', 'src/stores/**'],
    },
  },
}))
