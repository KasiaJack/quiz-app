import { defineConfig, devices } from '@playwright/test'

// Konfiguracja testów E2E. Playwright sam uruchamia serwer deweloperski
// (npm run dev) przed testami i zatrzymuje go po ich zakończeniu.
export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
})
