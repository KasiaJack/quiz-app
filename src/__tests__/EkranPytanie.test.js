import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EkranPytanie from '../components/EkranPytanie.vue'

// Przykładowe pytanie używane w testach. Poprawna odpowiedź ma indeks 1 (czyli "B").
const przykladowePytanie = {
  id: 1,
  tresc: 'Pytanie testowe?',
  odpowiedzi: ['Odp A', 'Odp B', 'Odp C', 'Odp D'],
  poprawna: 1,
}

// Funkcja pomocnicza montująca komponent z domyślnymi propsami.
function zamontuj(props = {}) {
  return mount(EkranPytanie, {
    props: {
      pytanie: przykladowePytanie,
      numerPytania: 1,
      liczbaPytan: 7,
      ...props,
    },
  })
}

describe('EkranPytanie.vue — pojedyncze pytanie', () => {
  it('renderuje treść pytania oraz wszystkie odpowiedzi (props)', () => {
    const wrapper = zamontuj()
    expect(wrapper.text()).toContain('Pytanie testowe?')
    const przyciski = wrapper.findAll('.btn-odpowiedz')
    expect(przyciski).toHaveLength(4)
    expect(wrapper.text()).toContain('Odp A')
    expect(wrapper.text()).toContain('Odp D')
  })

  it('wyświetla licznik pytań na podstawie propsów (Pytanie 1 / 7)', () => {
    const wrapper = zamontuj({ numerPytania: 1, liczbaPytan: 7 })
    expect(wrapper.text()).toContain('Pytanie 1 / 7')
  })

  it('po wyborze poprawnej odpowiedzi emituje "odpowiedziano" z wartością true', async () => {
    const wrapper = zamontuj()
    await wrapper.findAll('.btn-odpowiedz')[1].trigger('click') // indeks 1 = poprawna
    expect(wrapper.emitted('odpowiedziano')).toBeTruthy()
    expect(wrapper.emitted('odpowiedziano')[0]).toEqual([true])
  })

  it('po wyborze błędnej odpowiedzi emituje "odpowiedziano" z wartością false', async () => {
    const wrapper = zamontuj()
    await wrapper.findAll('.btn-odpowiedz')[0].trigger('click') // indeks 0 = błędna
    expect(wrapper.emitted('odpowiedziano')[0]).toEqual([false])
  })

  it('blokuje ponowny wybór odpowiedzi (drugie kliknięcie nie emituje kolejnego zdarzenia)', async () => {
    const wrapper = zamontuj()
    const przyciski = wrapper.findAll('.btn-odpowiedz')
    await przyciski[1].trigger('click')
    await przyciski[2].trigger('click') // próba zmiany odpowiedzi
    expect(wrapper.emitted('odpowiedziano')).toHaveLength(1)
  })

  it('pokazuje napis "Następne pytanie", gdy to nie jest ostatnie pytanie', () => {
    const wrapper = zamontuj({ numerPytania: 1, liczbaPytan: 7 })
    expect(wrapper.find('.btn-nastepne').text()).toContain('Następne pytanie')
  })

  it('pokazuje napis "Zobacz wyniki", gdy to jest ostatnie pytanie', () => {
    const wrapper = zamontuj({ numerPytania: 7, liczbaPytan: 7 })
    expect(wrapper.find('.btn-nastepne').text()).toContain('Zobacz wyniki')
  })

  it('emituje zdarzenie "nastepne" po udzieleniu odpowiedzi i kliknięciu przycisku', async () => {
    const wrapper = zamontuj()
    await wrapper.findAll('.btn-odpowiedz')[1].trigger('click') // najpierw odpowiedz
    await wrapper.find('.btn-nastepne').trigger('click')
    expect(wrapper.emitted('nastepne')).toBeTruthy()
  })

  it('po potwierdzeniu w oknie dialogowym emituje zdarzenie "zakoncz"', async () => {
    const wrapper = zamontuj()
    await wrapper.find('.btn-zakoncz').trigger('click') // otwórz okno dialogowe
    expect(wrapper.find('.modal').exists()).toBe(true)
    await wrapper.find('.btn-potwierdz').trigger('click') // potwierdź
    expect(wrapper.emitted('zakoncz')).toBeTruthy()
  })
})
