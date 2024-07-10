import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import tooltip from './src/tooltip.vue'

describe('test the style of component tooltip', () => {
    it('should exists when hover', async () => {
        const wrapper = mount(tooltip, {
            slots: {
                trigger: h('span', { class: 'test' }, 'is this a test')
            }
        })

        const dom = wrapper.find('.test')
        expect(dom.exists()).toBeTruthy()

        // FIXME 补充这段测试 dom.trigger('mouseover')无法实现，因为triggerOutSide无法改变
        // await dom.trigger('mouseenter')
        // expect(wrapper.findComponent({ ref: 't-tooltip' }).isVisible()).toBeTruthy()
    })
})
