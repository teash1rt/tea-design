import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import calendarHeatmap from './src/calendar-heatmap.vue'

describe('test the style of component calendar heatmap', () => {
    it('should be default style', () => {
        const wrapper = mount(calendarHeatmap)
        expect(wrapper.find('.t-calendar-heatmap-title').exists()).toBeFalsy()

        expect(wrapper.findAll('.col')).toHaveLength(40)

        expect(wrapper.props('mapData')).toEqual({})

        expect(wrapper.props('thresholds')).toEqual([1, 3, 5, 7])
    })
})

describe('test the boundary condition of component calendar heatmap', () => {
    it('should throw error when the value of col is not allowed', () => {
        const colError = '[calendar-heatmap -> col] 列数应为正整数'
        expect(() => {
            mount(calendarHeatmap, {
                props: {
                    col: -1
                }
            })
        }).toThrowError(colError)
    })

    it('should throw error when the value of thresholds is not allowed', () => {
        const thresholdsError = '[calendar-heatmap -> thresholds] 应为长度为4且递增的数组'
        expect(() => {
            mount(calendarHeatmap, {
                props: {
                    thresholds: [1, 2, 3]
                }
            })
        }).toThrowError(thresholdsError)

        expect(() => {
            mount(calendarHeatmap, {
                props: {
                    thresholds: [5, 5, 5, 5]
                }
            })
        }).toThrowError(thresholdsError)

        expect(() => {
            mount(calendarHeatmap, {
                props: {
                    thresholds: [7, 6, 2, 1]
                }
            })
        }).toThrowError(thresholdsError)
    })

    it('should throw error when the value of mapData is not allowed', () => {
        const mapDataError =
            "calendar-heatmap -> mapData] 确保数据类型为{ [key: string]: number }，且string应为'YYYY-MM-DD'的格式"
        expect(() => {
            mount(calendarHeatmap, {
                props: {
                    mapData: {
                        '2023-07-1': 1
                    }
                }
            })
        }).toThrowError(mapDataError)

        expect(() => {
            mount(calendarHeatmap, {
                props: {
                    mapData: {
                        '2023-13-1': 10
                    }
                }
            })
        }).toThrowError(mapDataError)
    })
})

describe('test the functionality of component calendar heatmap', () => {
    it('should have correct level', () => {
        const wrapper = mount(calendarHeatmap, {
            props: {
                mapData: {
                    '2023-08-01': 1,
                    '2023-08-02': 2,
                    '2023-08-03': 3,
                    '2023-08-04': 4,
                    '2023-08-05': 5,
                    '2023-08-06': 6,
                    '2023-08-07': 7,
                    '2023-08-08': 8,
                    '2023-08-09': 9,
                    '2023-08-10': 10,
                    '2023-08-11': 11,
                    '2023-08-12': 12,
                    '2023-08-13': 13
                },
                theme: 'wine',
                thresholds: [0, 3, 6, 9],
                tipInfo: 'hover!'
            }
        })

        expect(wrapper.findAll('.wine--level1')).toHaveLength(3)
        expect(wrapper.findAll('.wine--level2')).toHaveLength(3)
        expect(wrapper.findAll('.wine--level3')).toHaveLength(3)
        expect(wrapper.findAll('.wine--level4')).toHaveLength(4)
    })

    it('should emit data when mouse over & click', async () => {
        const date = new Date()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const dateString = `${date.getFullYear()}-${month}-${day}`
        const wrapper = mount(calendarHeatmap, {
            props: {
                mapData: {
                    [dateString]: 13
                }
            }
        })

        const domArr = wrapper.findAll('.t-calendar-heatmap-day')
        const lastDom = domArr.at(-1)!

        await lastDom.trigger('mouseover')
        expect(wrapper.emitted('hover')![0][0]).toEqual({ date: dateString, count: 13 })
    })
})
