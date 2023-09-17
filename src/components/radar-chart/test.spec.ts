import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import radarChart from './src/radar-chart.vue'
import { defaultContext } from './src/lib/settings'
import { RadarChart } from './src/lib/RadarChart'
import { lightenColor, isInside } from './src/lib/utils'

describe('test the style of component radar chart', () => {
    it('should be default style', async () => {
        const wrapper = mount(radarChart)
        expect(wrapper.find({ ref: 'radarRef' }).exists()).toBe(true)
    })

    it('should update automatically', async () => {
        const wrapper = mount({
            template: '<canvas ref="radarRef" />'
        })
        const canvasDom = wrapper.find({ ref: 'radarRef' }).element as HTMLCanvasElement
        const radarChart = new RadarChart(canvasDom!, defaultContext)
        const initCall = vi.spyOn(radarChart, 'init')
        const updateCall = vi.spyOn(radarChart, 'update')

        // RadarChart 继承 CanvasObject，CanvasObject update 通过 requestAnimationFrame 自动刷新
        await new Promise(resolve => setTimeout(resolve, 300))
        expect(initCall).toHaveBeenCalled()
        expect(updateCall).toHaveBeenCalled()
    })
})

describe('test the boundary condition of component calendar heatmap', () => {
    it('should throw error when the value of axisMax is not allowed', () => {
        const axisMaxError = '[radar-chart -> axisMax] 坐标最大值长度应与边数保持一致'
        expect(() => {
            mount(radarChart, {
                props: {
                    context: {
                        axis: {
                            axisMax: [1]
                        }
                    }
                }
            })
        }).toThrowError(axisMaxError)
    })

    it('should throw error when the value of data is not allowed', () => {
        const dataError = '[radar-chart -> data] 数据长度应与边数保持一致'
        expect(() => {
            mount(radarChart, {
                props: {
                    context: {
                        data: [[1]]
                    }
                }
            })
        }).toThrowError(dataError)
    })

    it('should throw error when the value of edgeCount is not allowed', () => {
        const edgeCountError = '[radar-chart -> edgeCount] 边数应为大于3的整数'
        expect(() => {
            mount(radarChart, {
                props: {
                    context: {
                        style: {
                            edgeCount: 2
                        }
                    }
                }
            })
        }).toThrowError(edgeCountError)
    })
})

describe('test the functionality of component radar chart', () => {
    it('should be different color', async () => {
        const color = ['rgb(100,100,100)', 'rgba(255,255,255,0.2)', '#0000ff']
        for (const e of color) {
            expect(lightenColor(e)).not.toBe(e)
        }
    })

    it('should be inside when on segment', async () => {
        expect(
            isInside(
                { x: 0, y: 0 },
                [
                    { x: 0, y: 100 },
                    { x: -100, y: 0 },
                    { x: 100, y: 0 }
                ],
                false
            )
        ).toBe(true)
    })
})
