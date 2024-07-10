import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import typewrite from '../typewrite/src/typewrite.vue'
import { useTypewrite } from '.'

describe('test the style of component typewrite', () => {
    it('should not exists when mounted without any settings', () => {
        const wrapper = mount(typewrite)

        const dom = wrapper.find('.t-typewrite')
        expect(dom.exists()).toBeFalsy()
    })

    it('should appear after calling the start method and disappear after calling the stop method', async () => {
        const wrapper = mount(typewrite)
        expect(wrapper.find('.t-typewrite').exists()).toBeFalsy()

        wrapper.vm.start()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.t-typewrite').exists()).toBeTruthy()
    })
})

describe('test the boundary condition of component calendar heatmap', () => {
    it('should throw error when the value of opacity is not allowed', () => {
        const opacityError = '[typewrite -> opacity] 透明度应为长度为2的数组'
        expect(() => {
            mount(typewrite, {
                props: {
                    context: {
                        opacity: [1, 2, 3]
                    }
                }
            })
        }).toThrowError(opacityError)

        expect(() => {
            mount(typewrite, {
                props: {
                    context: {
                        opacity: [1]
                    }
                }
            })
        }).toThrowError(opacityError)
    })
})

describe('test the functionality of component typewrite', () => {
    it('should change&ignore key', async () => {
        const wrapper = mount(typewrite, {
            props: {
                context: {
                    keyboardMap: {
                        meta: '⌘',
                        Control: '𓀀'
                    },
                    ignoreList: ['Control']
                }
            }
        })
        wrapper.vm.start()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'meta' }))
        await wrapper.vm.$nextTick()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'meta' }))
        await wrapper.vm.$nextTick()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'meta' }))
        await wrapper.vm.$nextTick()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Control' }))
        await wrapper.vm.$nextTick()

        expect(wrapper.html()).toContain('⌘')
        expect(wrapper.html()).toContain('∗ 3')
        expect(wrapper.html()).not.toContain('𓀀')
    })

    it('should separate after a specific interval', async () => {
        const wrapper = mount(typewrite, {
            props: {
                context: {
                    interval: 0.6,
                    duration: 4
                }
            }
        })
        wrapper.vm.start()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }))
        await new Promise(resolve => setTimeout(resolve, 600))

        expect(wrapper.findAll('.t-typewrite-content')).toHaveLength(1)
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }))
        await wrapper.vm.$nextTick()

        expect(wrapper.findAll('.t-typewrite-content')).toHaveLength(2)
        await new Promise(resolve => setTimeout(resolve, 4000))
        expect(wrapper.findAll('.t-typewrite-content')).toHaveLength(0)
    })

    it('should call function', async () => {
        const typewrite = useTypewrite()
        const startCall = vi.spyOn(typewrite, 'start')
        expect(startCall).not.toHaveBeenCalled()
        typewrite.start()
        expect(startCall).toHaveBeenCalled()

        const stopCall = vi.spyOn(typewrite, 'stop')
        expect(stopCall).not.toHaveBeenCalled()
        typewrite.stop()
        expect(stopCall).toHaveBeenCalled()

        const unmountCall = vi.spyOn(typewrite, 'unmount')
        expect(unmountCall).not.toHaveBeenCalled()
        typewrite.unmount()
        expect(unmountCall).toHaveBeenCalled()
    })
})
