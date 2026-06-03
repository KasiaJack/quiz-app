<script setup>
const emit = defineEmits(['start'])
</script>

<template>
  <div class="ekran-start">
    <div class="logo">🧠</div>
    <h1>Quiz Vue.js</h1>
    <p class="opis">
      Sprawdź swoją wiedzę na temat Vue 3! Quiz składa się z 7 pytań jednokrotnego wyboru.
      Powodzenia!
    </p>
    <button class="btn-start" @click="emit('start')">Rozpocznij quiz</button>
  </div>
</template>

<style scoped>
.ekran-start {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3.5rem 2.5rem;
}

.logo {
  font-size: 3.5rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #09090b;
  margin: 0;
  letter-spacing: -0.5px;
}

.opis {
  font-size: 0.95rem;
  color: #71717a;
  text-align: center;
  max-width: 400px;
  line-height: 1.7;
  font-weight: 400;
}

.btn-start {
  margin-top: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background-color: #09090b;
  color: #fafafa;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: background-color 0.15s;
}

.btn-start:hover {
  background-color: #27272a;
}
</style>
