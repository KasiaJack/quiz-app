export const pytania = [
  {
    id: 1,
    tresc: 'Co oznacza skrót "SPA" w kontekście aplikacji webowych?',
    odpowiedzi: [
      'Static Page Application',
      'Single Page Application',
      'Server Page API',
      'Simple Page Architecture'
    ],
    poprawna: 1
  },
  {
    id: 2,
    tresc: 'Która dyrektywa Vue służy do renderowania listy elementów?',
    odpowiedzi: ['v-if', 'v-bind', 'v-for', 'v-show'],
    poprawna: 2
  },
  {
    id: 3,
    tresc: 'Jak w Vue 3 skrótowo zapisujemy v-bind:href?',
    odpowiedzi: ['#href', '@href', ':href', '&href'],
    poprawna: 2
  },
  {
    id: 4,
    tresc: 'Jak w Vue 3 skrótowo zapisujemy v-on:click?',
    odpowiedzi: ['#click', '@click', ':click', '!click'],
    poprawna: 1
  },
  {
    id: 5,
    tresc: 'Co robi dyrektywa v-show?',
    odpowiedzi: [
      'Usuwa element z DOM gdy warunek jest fałszywy',
      'Ukrywa element przez CSS (display:none) gdy warunek jest fałszywy',
      'Pokazuje element tylko raz przy ładowaniu strony',
      'Wyświetla element zawsze, niezależnie od warunku'
    ],
    poprawna: 1
  },
  {
    id: 6,
    tresc: 'Co to są "props" w Vue?',
    odpowiedzi: [
      'Metody wywoływane przez komponent',
      'Dane przekazywane z komponentu rodzica do dziecka',
      'Zdarzenia wysyłane z dziecka do rodzica',
      'Style definiowane lokalnie w komponencie'
    ],
    poprawna: 1
  },
  {
    id: 7,
    tresc: 'Który tag w pliku .vue zawiera logikę JavaScript komponentu?',
    odpowiedzi: ['<template>', '<style>', '<script>', '<logic>'],
    poprawna: 2
  }
]
