import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Graph } from './src/lib/Graph'
import graph from './src/graph.vue'
import { defaultContext } from './src/lib/settings'
import { getBounce } from './src/lib/utils'

describe('test the style of component graph', () => {
    it('should be default style', async () => {
        const wrapper = mount(graph)
        expect(wrapper.find({ ref: 'graphRef' }).exists()).toBe(true)
    })

    it('should update automatically', async () => {
        const wrapper = mount({
            template: '<canvas ref="graphRef" />'
        })
        const canvasDom = wrapper.find({ ref: 'graphRef' }).element as HTMLCanvasElement
        const graph = new Graph(canvasDom!, defaultContext)
        const initCall = vi.spyOn(graph, 'init')
        const updateCall = vi.spyOn(graph, 'update')

        await new Promise(resolve => setTimeout(resolve, 300))
        expect(initCall).toHaveBeenCalled()
        expect(updateCall).toHaveBeenCalled()
    })
})

describe('test the boundary condition of component graph', () => {
    it('should throw error when the value of position is not allowed', () => {
        const positionError = '[graph -> initialPosition] 点的初始位置未全部正确初始化'
        expect(() => {
            mount(graph, {
                props: {
                    context: {
                        point: {
                            pointCount: 4
                        }
                    }
                }
            })
        }).toThrowError(positionError)
    })

    it('should throw error when the value of connectionStatus is not allowed', () => {
        const positionError = '[graph -> connectionStatus] 连接情况应在0 ~ pointCount - 1之间'
        expect(() => {
            mount(graph, {
                props: {
                    context: {
                        edge: {
                            connectionStatus: [[4, 5]]
                        }
                    }
                }
            })
        }).toThrowError(positionError)
    })
})

describe('test the functionality of component graph', async () => {
    const wrapper = mount(graph)
    await new Promise(resolve => setTimeout(resolve, 200))

    it('should in normal operation to Query', async () => {
        await wrapper.vm.wait(1)
        wrapper.vm.getPositions()
        wrapper.vm.getPositions(0)
        wrapper.vm.getPositions(5)
        wrapper.vm.getConnectedPoints(0)
        wrapper.vm.getConnectedPoints(6)
        wrapper.vm.getGraph()
        wrapper.vm.lock(true)
    })

    it('should in normal operation to Point', async () => {
        await wrapper.vm.blink(0, 1)
        await wrapper.vm.blink(5, 1)
        await wrapper.vm.moveTo(0, { x: 100, y: 100 })
        await wrapper.vm.moveTo(4, { x: 100, y: 100 })
        await wrapper.vm.swap(0, 2)
        await wrapper.vm.swap(4, 5)
        await wrapper.vm.shallowSwap(1, 2)
        await wrapper.vm.shallowSwap(5, 6)
        wrapper.vm.addPoint('3', { x: 300, y: 200 })
        wrapper.vm.setPointColor(0)
        wrapper.vm.setPointColor(7)
        wrapper.vm.delPoint(0)
        wrapper.vm.delPoint(5)
        wrapper.vm.setContent(1, 2)
        wrapper.vm.setContent(10, 'p')
    })

    it('should in normal operation to Edge', async () => {
        wrapper.vm.addPoint('1', { x: 100, y: 100 })
        wrapper.vm.addEdge(2, 3)
        wrapper.vm.addEdge(2, 3)
        await wrapper.vm.renderEdge(2, 3, undefined)
        await wrapper.vm.renderEdge(2, 4, undefined)
        wrapper.vm.setEdgeColor(2, 3)
        wrapper.vm.setEdgeColor(10, 12)
        wrapper.vm.delEdge(2, 3)
        wrapper.vm.delEdge(2, 4)
    })

    it('should in normal operation to Text', async () => {
        const id = wrapper.vm.setText('sell', { x: 100, y: 200 })
        await new Promise(resolve => setTimeout(resolve, 1000))
        wrapper.vm.setTextColor(id, '#00ff00', 0, 1)
        await new Promise(resolve => setTimeout(resolve, 1000))
        wrapper.vm.setTextColor(`${id}2`, '#00ff00', 0, 1)
        wrapper.vm.setTextColor(id, '#00ff00', -1, -2)
        wrapper.vm.delText(id)
        wrapper.vm.delText(`${id}1`)
    })

    it('should be different position', () => {
        const sourcePoint = { x: 100, y: 100 }
        const targetPoint = { x: 200, y: 200 }
        const resPosition = getBounce(sourcePoint, targetPoint, 100, false, false, true)
        expect(resPosition).not.toBe(sourcePoint)
        getBounce(sourcePoint, targetPoint, 100, true, false, true)
        getBounce(sourcePoint, targetPoint, 100, false, true, false)
    })
})
