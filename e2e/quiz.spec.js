import { test, expect } from '@playwright/test'

// Test E2E sprawdzający główny przepływ aplikacji w prawdziwej przeglądarce:
// ekran startowy -> przejście przez wszystkie 7 pytań -> ekran wyniku.
test('główny przepływ quizu: od ekranu startowego do ekranu wyniku', async ({ page }) => {
  await page.goto('/')

  // Ekran startowy
  await expect(page.getByRole('heading', { name: 'Quiz Vue.js' })).toBeVisible()
  await page.getByRole('button', { name: 'Rozpocznij quiz' }).click()

  // Ekran pierwszego pytania
  await expect(page.getByText('Pytanie 1 / 7')).toBeVisible()

  // Odpowiadamy na wszystkie 7 pytań (wybór pierwszej odpowiedzi i przejście dalej)
  for (let i = 0; i < 7; i++) {
    await page.locator('.btn-odpowiedz').first().click()
    await page.locator('.btn-nastepne').click()
  }

  // Ekran wyniku
  await expect(page.getByRole('heading', { name: 'Wynik quizu' })).toBeVisible()
  await expect(page.getByText('Zagraj ponownie')).toBeVisible()
})
