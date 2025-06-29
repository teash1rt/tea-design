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
        const getDateString = (offset: number) => {
            const date = new Date()
            const newDate = new Date(date.setDate(date.getDate() - offset))
            const year = newDate.getFullYear()
            const month = String(newDate.getMonth() + 1).padStart(2, '0')
            const day = String(newDate.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }

        const wrapper = mount(calendarHeatmap, {
            props: {
                mapData: {
                    [getDateString(47)]: 1,
                    [getDateString(48)]: 2,
                    [getDateString(49)]: 3,
                    [getDateString(50)]: 4,
                    [getDateString(51)]: 5,
                    [getDateString(52)]: 6,
                    [getDateString(53)]: 7,
                    [getDateString(54)]: 8,
                    [getDateString(55)]: 9,
                    [getDateString(56)]: 10,
                    [getDateString(57)]: 11,
                    [getDateString(58)]: 12,
                    [getDateString(59)]: 13
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
