import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import floatButton from './src/float-button.vue'

describe('test the style of component float button', () => {
    it('should be default position', () => {
        const wrapper = mount(floatButton)
        const dom = wrapper.find('.t-float-button')

        expect(dom.exists()).toBeTruthy()
        expect(dom.attributes('style')).toBe('right: 60px; bottom: 80px;')
    })
})

describe('test the functionality of component float button', () => {
    it('should be changeVisible', async () => {
        const wrapper = mount(floatButton)
        expect(wrapper.find('.t-float-home').exists()).toBeTruthy()

        await wrapper.find('.t-float-home').trigger('click')
    })
})
