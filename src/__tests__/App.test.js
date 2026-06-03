import { describe, it, expect, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import EkranStart from '../components/EkranStart.vue'
import EkranPytanie from '../components/EkranPytanie.vue'
import EkranWynik from '../components/EkranWynik.vue'
import { pytania } from '../questions.js'

// Ekran wyniku rysuje konfetti na <canvas>, którego jsdom nie obsługuje —
// podmieniamy potrzebne API na atrapy (jak w teście EkranWynik).
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    clearRect() {}, save() {}, translate() {}, rotate() {},
    fillRect() {}, beginPath() {}, arc() {}, fill() {}, restore() {},
  })
  vi.stubGlobal('requestAnimationFrame', () => 0)
  vi.stubGlobal('cancelAnimationFrame', () => {})
})

// Przechodzi cały quiz, emitując zdarzenia z aktualnie wyświetlanego pytania.
// liczbaPoprawnych mówi, ile pierwszych odpowiedzi ma być poprawnych.
async function przejdzQuiz(wrapper, liczbaPoprawnych) {
  for (let i = 0; i < pytania.length; i++) {
    const pytanie = wrapper.findComponent(EkranPytanie)
    await pytanie.vm.$emit('odpowiedziano', i < liczbaPoprawnych)
    await pytanie.vm.$emit('nastepne')
  }
}

describe('App.vue — przepływ quizu i liczenie wyniku', () => {
  it('na starcie wyświetla ekran startowy', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(EkranStart).exists()).toBe(true)
    expect(wrapper.findComponent(EkranPytanie).exists()).toBe(false)
  })

  it('po zdarzeniu "start" przełącza na ekran pytania', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent(EkranStart).vm.$emit('start')
    expect(wrapper.findComponent(EkranPytanie).exists()).toBe(true)
    expect(wrapper.findComponent(EkranStart).exists()).toBe(false)
  })

  it('po przejściu wszystkich pytań wyświetla ekran wyniku', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent(EkranStart).vm.$emit('start')
    await przejdzQuiz(wrapper, 0)
    expect(wrapper.findComponent(EkranWynik).exists()).toBe(true)
  })

  it('zlicza tylko poprawne odpowiedzi (wszystkie poprawne daje komplet punktów)', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent(EkranStart).vm.$emit('start')
    await przejdzQuiz(wrapper, pytania.length)
    expect(wrapper.findComponent(EkranWynik).props('poprawne')).toBe(pytania.length)
  })

  it('zlicza częściowy wynik (3 poprawne odpowiedzi z 7)', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent(EkranStart).vm.$emit('start')
    await przejdzQuiz(wrapper, 3)
    expect(wrapper.findComponent(EkranWynik).props('poprawne')).toBe(3)
  })

  it('zdarzenie "restart" wraca do ekranu startowego', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent(EkranStart).vm.$emit('start')
    await przejdzQuiz(wrapper, 0)
    await wrapper.findComponent(EkranWynik).vm.$emit('restart')
    expect(wrapper.findComponent(EkranStart).exists()).toBe(true)
  })

  it('zdarzenie "zakoncz" z ekranu pytania przerywa quiz i pokazuje wynik', async () => {
    const wrapper = mount(App)
    await wrapper.findComponent(EkranStart).vm.$emit('start')
    await wrapper.findComponent(EkranPytanie).vm.$emit('zakoncz')
    expect(wrapper.findComponent(EkranWynik).exists()).toBe(true)
  })
})
