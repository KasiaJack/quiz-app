import { describe, it, expect, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EkranWynik from '../components/EkranWynik.vue'

// EkranWynik przy wyniku >= 60% rysuje animację konfetti na elemencie <canvas>.
// jsdom (udawana przeglądarka w testach) nie implementuje canvasa ani pętli
// animacji, więc podmieniamy te API na atrapy, aby montowanie komponentu nie
// wyrzucało błędu. Testujemy logikę wyniku, a nie samą grafikę.
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    clearRect() {}, save() {}, translate() {}, rotate() {},
    fillRect() {}, beginPath() {}, arc() {}, fill() {}, restore() {},
  })
  vi.stubGlobal('requestAnimationFrame', () => 0)
  vi.stubGlobal('cancelAnimationFrame', () => {})
})

describe('EkranWynik.vue — obliczanie wyniku i oceny', () => {
  it('oblicza procent poprawnych odpowiedzi (5 z 7 daje 71%)', () => {
    const wrapper = mount(EkranWynik, { props: { poprawne: 5, liczbaPytan: 7 } })
    expect(wrapper.text()).toContain('71%')
  })

  it('zaokrągla procent do liczby całkowitej (2 z 3 daje 67%)', () => {
    const wrapper = mount(EkranWynik, { props: { poprawne: 2, liczbaPytan: 3 } })
    expect(wrapper.text()).toContain('67%')
  })

  it('pokazuje ocenę "Doskonale" przy wyniku 100%', () => {
    const wrapper = mount(EkranWynik, { props: { poprawne: 7, liczbaPytan: 7 } })
    expect(wrapper.text()).toContain('Doskonale')
  })

  it('pokazuje ocenę "Bardzo dobrze" przy wyniku co najmniej 80%', () => {
    const wrapper = mount(EkranWynik, { props: { poprawne: 6, liczbaPytan: 7 } }) // 86%
    expect(wrapper.text()).toContain('Bardzo dobrze')
  })

  it('pokazuje ocenę "Warto powtórzyć materiał" przy wyniku poniżej 60%', () => {
    const wrapper = mount(EkranWynik, { props: { poprawne: 2, liczbaPytan: 7 } }) // 29%
    expect(wrapper.text()).toContain('Warto powtórzyć materiał')
  })

  it('emituje zdarzenie "restart" po kliknięciu przycisku', async () => {
    const wrapper = mount(EkranWynik, { props: { poprawne: 0, liczbaPytan: 7 } })
    await wrapper.find('.btn-restart').trigger('click')
    expect(wrapper.emitted('restart')).toBeTruthy()
    expect(wrapper.emitted('restart')).toHaveLength(1)
  })
})
