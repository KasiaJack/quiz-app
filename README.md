# Quiz Vue.js

Interaktywna aplikacja quizowa napisana w **Vue 3** (Composition API, `<script setup>`),
sprawdzająca wiedzę użytkownika na temat frameworka Vue. Quiz składa się z 7 pytań
jednokrotnego wyboru, a po jego zakończeniu wyświetla wynik wraz z oceną.

Projekt powstał w ramach przedmiotu **Programowanie 2** (Zadanie 3 — testy jednostkowe i raport z testów).

## 🌐 Demo online

👉 [https://kasiajack.github.io/quiz-app/](https://kasiajack.github.io/quiz-app/)

## 🧩 Funkcje

- ekran startowy, ekran pytania oraz ekran wyniku,
- pasek postępu i licznik pytań,
- natychmiastowe oznaczanie poprawnej / błędnej odpowiedzi,
- możliwość wcześniejszego zakończenia quizu (z potwierdzeniem),
- ocena słowna i animacja konfetti przy dobrym wyniku.

## 🛠️ Technologie

- **Vue 3** + **Vite**
- **Vitest** + **Vue Test Utils** — testy jednostkowe
- **Playwright** — test E2E
- **@vitest/coverage-v8** — pokrycie kodu

## 🚀 Uruchomienie

Instalacja zależności:

```sh
npm install
```

Uruchomienie wersji deweloperskiej (z przeładowaniem na żywo):

```sh
npm run dev
```

Budowanie wersji produkcyjnej:

```sh
npm run build
```

## ✅ Testy

Uruchomienie wszystkich testów jednostkowych:

```sh
npm run test:run
```

Testy wraz z raportem pokrycia kodu (raport HTML w `coverage/index.html`):

```sh
npm run coverage
```

Test E2E w Playwright (uruchamia serwer i sprawdza główny przepływ aplikacji):

```sh
npm run test:e2e
```

### Wyniki

- **28 testów jednostkowych** + **1 test E2E** — wszystkie przechodzą,
- **pokrycie linii: 95,41%** (wymóg ≥ 70%).

## 📄 Raport z testów

Pełny raport z testów (10 sekcji) znajduje się w pliku:
[`docs/raport-testow.pdf`](docs/raport-testow.pdf)
