<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  poprawne: Number,
  liczbaPytan: Number
})

const emit = defineEmits(['restart'])

const procent = computed(() => Math.round((props.poprawne / props.liczbaPytan) * 100))

const ocena = computed(() => {
  if (procent.value === 100) return { tekst: 'Doskonale! Bezbłędny wynik!', ikona: '🏆' }
  if (procent.value >= 80) return { tekst: 'Bardzo dobrze!', ikona: '🎉' }
  if (procent.value >= 60) return { tekst: 'Nieźle, ale jest pole do poprawy', ikona: '👍' }
  return { tekst: 'Warto powtórzyć materiał', ikona: '📚' }
})

const canvas = ref(null)
let animationId = null

onMounted(() => {
  if (procent.value < 60) return
  startKonfetti()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})

function startKonfetti() {
  const c = canvas.value
  const ctx = c.getContext('2d')

  c.width = window.innerWidth
  c.height = window.innerHeight

  const kolory = ['#6366f1', '#f43f5e', '#22c55e', '#f59e0b', '#06b6d4', '#a855f7', '#ec4899']
  const ksztalty = ['rect', 'circle', 'ribbon']

  const czasteczki = Array.from({ length: 120 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * -c.height,
    r: Math.random() * 7 + 3,
    kolor: kolory[Math.floor(Math.random() * kolory.length)],
    ksztalt: ksztalty[Math.floor(Math.random() * ksztalty.length)],
    predkoscY: Math.random() * 3 + 2,
    predkoscX: (Math.random() - 0.5) * 1.5,
    obrot: Math.random() * Math.PI * 2,
    predkoscObrotu: (Math.random() - 0.5) * 0.15,
    szerokosc: Math.random() * 10 + 5,
    wysokosc: Math.random() * 6 + 3,
  }))

  let klatka = 0

  function rysuj() {
    ctx.clearRect(0, 0, c.width, c.height)

    czasteczki.forEach((p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.obrot)
      ctx.fillStyle = p.kolor
      ctx.globalAlpha = 0.85

      if (p.ksztalt === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, p.r, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.ksztalt === 'ribbon') {
        ctx.fillRect(-p.szerokosc / 2, -p.wysokosc / 2, p.szerokosc, p.wysokosc * 0.4)
      } else {
        ctx.fillRect(-p.szerokosc / 2, -p.wysokosc / 2, p.szerokosc, p.wysokosc)
      }

      ctx.restore()

      p.y += p.predkoscY
      p.x += p.predkoscX
      p.obrot += p.predkoscObrotu

      if (p.y > c.height + 20) {
        p.y = -20
        p.x = Math.random() * c.width
      }
    })

    klatka++
    if (klatka < 300) {
      animationId = requestAnimationFrame(rysuj)
    } else {
      ctx.clearRect(0, 0, c.width, c.height)
    }
  }

  rysuj()
}
</script>

<template>
  <div class="ekran-wynik">
    <canvas v-if="procent >= 60" ref="canvas" class="konfetti-canvas"></canvas>

    <div class="ikona">{{ ocena.ikona }}</div>
    <h2>Wynik quizu</h2>

    <div class="wynik-liczba">
      <span class="duzy">{{ poprawne }}</span>
      <span class="separator">/</span>
      <span class="duzy">{{ liczbaPytan }}</span>
    </div>

    <div class="wynik-procent">{{ procent }}%</div>

    <div class="divider"></div>

    <p class="ocena">{{ ocena.tekst }}</p>

    <button class="btn-restart" @click="emit('restart')">Zagraj ponownie</button>
  </div>
</template>

<style scoped>
.ekran-wynik {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3.5rem 2.5rem;
  overflow: hidden;
}

.konfetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 100;
}

.ikona {
  font-size: 3.5rem;
  position: relative;
  z-index: 1;
}

h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #09090b;
  margin: 0;
  letter-spacing: -0.3px;
  position: relative;
  z-index: 1;
}

.wynik-liczba {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  position: relative;
  z-index: 1;
}

.duzy {
  font-size: 3.5rem;
  font-weight: 700;
  color: #6366f1;
  letter-spacing: -2px;
}

.separator {
  font-size: 2rem;
  color: #d4d4d8;
  font-weight: 300;
}

.wynik-procent {
  font-size: 1rem;
  font-weight: 600;
  color: #a1a1aa;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.ocena {
  font-size: 1rem;
  color: #3f3f46;
  text-align: center;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.divider {
  width: 40px;
  height: 1px;
  background-color: #e4e4e7;
  margin: 0.5rem 0;
  position: relative;
  z-index: 1;
}

.btn-restart {
  margin-top: 0.75rem;
  padding: 0.7rem 1.75rem;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background-color: #09090b;
  color: #fafafa;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: background-color 0.15s;
  position: relative;
  z-index: 1;
}

.btn-restart:hover {
  background-color: #27272a;
}
</style>
