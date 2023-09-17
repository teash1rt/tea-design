import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import rollcall from './src/rollcall.vue'

const data: string[] = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eva',
    'Frank',
    'Grace',
    'Harry',
    'Ivy',
    'Jack',
    'Kate',
    'Liam',
    'Mia',
    'Noah',
    'Olivia'
]

async function delay(interval: number) {
    return new Promise(resolve => setTimeout(resolve, interval))
}

describe('test the style of component rollcall', () => {
    it('should have footer & no-data style', () => {
        const wrapper = mount(rollcall)

        expect(wrapper.find('.t-rollcall-footer').exists()).toBeTruthy()

        expect(wrapper.text()).toContain('暂无内容')
    })

    it('should have loading style', async () => {
        const wrapper = mount(rollcall, {
            props: {
                data: data,
                rollMethod: 'byCountDown'
            }
        })

        const startDom = wrapper.find('button')
        expect(wrapper.find('.loading').exists()).toBeFalsy()

        await startDom.trigger('click')

        // after 1s
        await delay(1000)
        expect(wrapper.find('.loading').exists()).toBeTruthy()

        // after 1+2s
        await delay(2000)
        expect(wrapper.find('.loading').exists()).toBeFalsy()
    })
})

describe('test the functionality of component rollcall', () => {
    it('should have correct answer', async () => {
        const wrapper = mount(rollcall, {
            props: {
                data: data
            }
        })

        const ansDom = wrapper.find('.entity')

        for (let i = 0; i < 30; i++) {
            const startDom = wrapper.find('button')
            expect(startDom.exists()).toBeTruthy()
            expect(startDom.text()).toBe('开始')
            await startDom.trigger('click')

            const stopDom = wrapper.find('button')
            expect(stopDom.exists()).toBeTruthy()
            expect(stopDom.text()).toBe('停止')
            await stopDom.trigger('click')

            expect(data).toContain(ansDom.text())
        }
    })

    it('should have select uniquely', async () => {
        const wrapper = mount(rollcall, {
            props: {
                data: data,
                selectMethod: 'unique'
            }
        })

        const ansDom = wrapper.find('.entity')
        const selected: (string | number)[] = []
        while (selected.length < data.length) {
            const startDom = wrapper.find('button')
            await startDom.trigger('click')

            const stopDom = wrapper.find('button')
            await stopDom.trigger('click')

            expect(selected).not.toContain(ansDom.text())
            selected.push(ansDom.text())
        }
    })

    it('should in normal operation', async () => {
        const wrapper = mount(rollcall, {
            props: {
                data: data
            }
        })
        wrapper.vm.start()
        wrapper.vm.stop()
    })
})
