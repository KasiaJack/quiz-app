<script setup>
import { ref } from 'vue'
import { pytania } from './questions.js'
import EkranStart from './components/EkranStart.vue'
import EkranPytanie from './components/EkranPytanie.vue'
import EkranWynik from './components/EkranWynik.vue'

const ekran = ref('start')
const indeksPytania = ref(0)
const poprawneOdpowiedzi = ref(0)

function rozpocznij() {
  indeksPytania.value = 0
  poprawneOdpowiedzi.value = 0
  ekran.value = 'quiz'
}

function odpowiedziano(poprawna) {
  if (poprawna) poprawneOdpowiedzi.value++
}

function nastepnePytanie() {
  if (indeksPytania.value < pytania.length - 1) {
    indeksPytania.value++
  } else {
    ekran.value = 'wynik'
  }
}

function restart() {
  ekran.value = 'start'
}
</script>

<template>
  <div class="app-wrapper">
    <div class="karta">
      <EkranStart v-if="ekran === 'start'" @start="rozpocznij" />

      <EkranPytanie
        v-else-if="ekran === 'quiz'"
        :key="indeksPytania"
        :pytanie="pytania[indeksPytania]"
        :numer-pytania="indeksPytania + 1"
        :liczba-pytan="pytania.length"
        @odpowiedziano="odpowiedziano"
        @nastepne="nastepnePytanie"
        @zakoncz="ekran = 'wynik'"
      />

      <EkranWynik
        v-else-if="ekran === 'wynik'"
        :poprawne="poprawneOdpowiedzi"
        :liczba-pytan="pytania.length"
        @restart="restart"
      />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f4f4f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.karta {
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e4e4e7;
  width: 100%;
  max-width: 640px;
}
</style>
