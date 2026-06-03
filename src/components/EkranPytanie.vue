<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  pytanie: Object,
  numerPytania: Number,
  liczbaPytan: Number
})

const emit = defineEmits(['odpowiedziano', 'nastepne', 'zakoncz'])

const potwierdzenie = ref(false)

const wybranaOdpowiedz = ref(null)
const odpowiedziano = ref(false)

const postep = computed(() => (props.numerPytania / props.liczbaPytan) * 100)

function wybierzOdpowiedz(indeks) {
  if (odpowiedziano.value) return
  wybranaOdpowiedz.value = indeks
  odpowiedziano.value = true
  const poprawna = indeks === props.pytanie.poprawna
  emit('odpowiedziano', poprawna)
}

function nastepne() {
  wybranaOdpowiedz.value = null
  odpowiedziano.value = false
  emit('nastepne')
}

function klasaOdpowiedzi(indeks) {
  if (!odpowiedziano.value) return ''
  if (indeks === props.pytanie.poprawna) return 'poprawna'
  if (indeks === wybranaOdpowiedz.value) return 'bledna'
  return ''
}
</script>

<template>
  <div class="ekran-pytanie">
    <div class="naglowek">
      <div class="naglowek-gora">
        <span class="licznik">Pytanie {{ numerPytania }} / {{ liczbaPytan }}</span>
        <button class="btn-zakoncz" @click="potwierdzenie = true">Zakończ quiz</button>
      </div>
      <div class="pasek-postep">
        <div class="wypelnienie" :style="{ width: postep + '%' }"></div>
      </div>
    </div>

    <div v-if="potwierdzenie" class="modal-tlo" @click.self="potwierdzenie = false">
      <div class="modal">
        <p class="modal-tekst">Na pewno chcesz zakończyć quiz? Twój aktualny wynik zostanie zapisany.</p>
        <div class="modal-przyciski">
          <button class="btn-anuluj" @click="potwierdzenie = false">Anuluj</button>
          <button class="btn-potwierdz" @click="emit('zakoncz')">Zakończ</button>
        </div>
      </div>
    </div>

    <h2 class="tresc">{{ pytanie.tresc }}</h2>

    <div class="odpowiedzi">
      <button
        v-for="(odp, indeks) in pytanie.odpowiedzi"
        :key="indeks"
        class="btn-odpowiedz"
        :class="klasaOdpowiedzi(indeks)"
        :disabled="odpowiedziano"
        @click="wybierzOdpowiedz(indeks)"
      >
        <span class="litera">{{ ['A', 'B', 'C', 'D'][indeks] }}</span>
        {{ odp }}
      </button>
    </div>

    <button
      class="btn-nastepne"
      :disabled="!odpowiedziano"
      @click="nastepne"
    >
      {{ numerPytania === liczbaPytan ? 'Zobacz wyniki' : 'Następne pytanie' }} →
    </button>
  </div>
</template>

<style scoped>
.ekran-pytanie {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 2.5rem 2.5rem;
}

.naglowek {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.naglowek-gora {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.licznik {
  font-size: 0.8rem;
  color: #a1a1aa;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.btn-zakoncz {
  font-size: 0.78rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #a1a1aa;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.btn-zakoncz:hover {
  color: #f43f5e;
}

.modal-tlo {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal {
  background: white;
  border-radius: 4px;
  border: 1px solid #e4e4e7;
  padding: 1.75rem;
  max-width: 360px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-tekst {
  font-size: 0.95rem;
  color: #3f3f46;
  line-height: 1.6;
}

.modal-przyciski {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-anuluj {
  padding: 0.6rem 1.2rem;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  background: none;
  border: 1px solid #e4e4e7;
  border-radius: 4px;
  cursor: pointer;
  color: #3f3f46;
  transition: border-color 0.15s;
}

.btn-anuluj:hover {
  border-color: #a1a1aa;
}

.btn-potwierdz {
  padding: 0.6rem 1.2rem;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background-color: #f43f5e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.btn-potwierdz:hover {
  background-color: #e11d48;
}

.pasek-postep {
  height: 3px;
  background-color: #e4e4e7;
  border-radius: 999px;
  overflow: hidden;
}

.wypelnienie {
  height: 100%;
  background-color: #6366f1;
  border-radius: 999px;
  transition: width 0.4s ease;
}

.tresc {
  font-size: 1.2rem;
  font-weight: 600;
  color: #09090b;
  line-height: 1.55;
  margin: 0;
  letter-spacing: -0.2px;
}

.odpowiedzi {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.btn-odpowiedz {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 1rem;
  font-size: 0.92rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  background-color: #fafafa;
  border: 1px solid #e4e4e7;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  color: #3f3f46;
  transition: border-color 0.15s, background-color 0.15s;
}

.btn-odpowiedz:not(:disabled):hover {
  background-color: #f0f0ff;
  border-color: #6366f1;
  color: #09090b;
}

.btn-odpowiedz:disabled {
  cursor: default;
}

.btn-odpowiedz.poprawna {
  background-color: #f0fdf4;
  border-color: #22c55e;
  color: #15803d;
}

.btn-odpowiedz.bledna {
  background-color: #fff1f2;
  border-color: #f43f5e;
  color: #be123c;
}

.litera {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background-color: #e4e4e7;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
  color: #52525b;
}

.btn-odpowiedz.poprawna .litera {
  background-color: #22c55e;
  color: white;
}

.btn-odpowiedz.bledna .litera {
  background-color: #f43f5e;
  color: white;
}

.btn-nastepne {
  align-self: flex-end;
  padding: 0.65rem 1.5rem;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background-color: #09090b;
  color: #fafafa;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.2px;
  transition: background-color 0.15s, opacity 0.15s;
}

.btn-nastepne:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.btn-nastepne:not(:disabled):hover {
  background-color: #27272a;
}
</style>
