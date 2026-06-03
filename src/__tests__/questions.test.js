import { describe, it, expect } from 'vitest'
import { pytania } from '../questions.js'

// Testy danych pytań quizu (plik questions.js).
// To "czyste" dane, więc testy są banalnie proste i niezawodne.
describe('questions.js — dane pytań', () => {
  it('eksportuje niepustą tablicę pytań', () => {
    expect(Array.isArray(pytania)).toBe(true)
    expect(pytania.length).toBeGreaterThan(0)
  })

  it('każde pytanie ma treść, listę odpowiedzi i indeks poprawnej odpowiedzi', () => {
    pytania.forEach((pytanie) => {
      expect(typeof pytanie.tresc).toBe('string')
      expect(pytanie.tresc.length).toBeGreaterThan(0)
      expect(Array.isArray(pytanie.odpowiedzi)).toBe(true)
      expect(pytanie.odpowiedzi.length).toBeGreaterThanOrEqual(2)
      expect(typeof pytanie.poprawna).toBe('number')
    })
  })

  it('indeks poprawnej odpowiedzi mieści się w zakresie listy odpowiedzi', () => {
    pytania.forEach((pytanie) => {
      expect(pytanie.poprawna).toBeGreaterThanOrEqual(0)
      expect(pytanie.poprawna).toBeLessThan(pytanie.odpowiedzi.length)
    })
  })

  it('każde pytanie ma unikalne id', () => {
    const identyfikatory = pytania.map((pytanie) => pytanie.id)
    const unikalne = new Set(identyfikatory)
    expect(unikalne.size).toBe(identyfikatory.length)
  })
})
