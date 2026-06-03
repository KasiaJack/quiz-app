import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EkranStart from '../components/EkranStart.vue'

describe('EkranStart.vue — ekran startowy', () => {
  it('renderuje przycisk rozpoczęcia quizu', () => {
    const wrapper = mount(EkranStart)
    expect(wrapper.find('.btn-start').exists()).toBe(true)
    expect(wrapper.text()).toContain('Rozpocznij quiz')
  })

  it('emituje zdarzenie "start" po kliknięciu przycisku', async () => {
    const wrapper = mount(EkranStart)
    await wrapper.find('.btn-start').trigger('click')
    expect(wrapper.emitted('start')).toBeTruthy()
    expect(wrapper.emitted('start')).toHaveLength(1)
  })
})
