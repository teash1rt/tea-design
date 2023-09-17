import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import calendar from './src/calendar.vue'

// https://test-utils.vuejs.org/api/#wrapper-methods
// https://cn.vitest.dev/api/expect.html

const date = new Date()
const engMonth = [
    null,
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

describe('test the style of component calendar', () => {
    it('should be in an English date format', () => {
        const wrapper = mount(calendar, {
            props: {
                lang: 'en'
            }
        })
        const month = date.getMonth()
        const year = date.getFullYear()
        expect(wrapper.text()).toContain(`${engMonth[month + 1]} ${year}`)
    })

    it('should be today-between(default header)', () => {
        const wrapper = mount(calendar)
        expect(wrapper.props()['headerMode']).toBe('today-between')
    })

    it('should be tea(default color theme)', () => {
        const wrapper = mount(calendar, {
            props: {
                headerMode: 'simple-center'
            }
        })
        expect(wrapper.find('.is-today--tea').exists()).toBeTruthy()
    })

    it('should be month-center style', () => {
        const wrapper = mount(calendar, {
            props: {
                headerMode: 'month-center'
            }
        })
        expect(wrapper.find('.header-prev').exists()).toBeTruthy()
    })
})

describe('test the boundary condition of component calendar', () => {
    it('should within 1 to 12', async () => {
        const wrapper = mount(calendar, {
            props: {
                headerMode: 'month-center'
            }
        })
        const prev = wrapper.find('.header-prev')
        const next = wrapper.find('.header-next')
        const dom = wrapper.find('.header-date--medium')

        for (let i = 0; i < 36; i++) {
            await prev.trigger('click')
            const monthStr = dom.text().split('年')[1]
            const month = parseInt(monthStr.substring(0, monthStr.length - 1))
            expect(month).toBeGreaterThanOrEqual(1)
            expect(month).toBeLessThanOrEqual(12)
        }

        for (let i = 0; i < 36; i++) {
            await next.trigger('click')
            const monthStr = dom.text().split('年')[1]
            const month = parseInt(monthStr.substring(0, monthStr.length - 1))
            expect(month).toBeGreaterThanOrEqual(1)
            expect(month).toBeLessThanOrEqual(12)
        }
    })
})

describe('test the functionality of component calendar', () => {
    const changeDate = (month: number, year: number, opMonth: number, opYear: number, lang: string) => {
        if (opMonth === -1 && month === 0) {
            year -= 1
            month = 11
        } else if (opMonth === 1 && month === 11) {
            year += 1
            month = 0
        } else {
            month += opMonth
            year += opYear
        }
        return lang === 'zh' ? `${year}年${month + 1}月` : `${engMonth[month + 1]} ${year}`
    }

    it('should change month/year in year-month-center mode', async () => {
        const wrapper = mount(calendar, {
            props: {
                headerMode: 'year-month-center',
                size: 'mini'
            }
        })

        let month = date.getMonth()
        let year = date.getFullYear()
        const today = `${year}年${month + 1}月`

        const dom = wrapper.find('.header-date--mini')
        expect(dom.text()).toBe(today)

        const prev = wrapper.findAll('.header-prev')
        // prev year
        await prev[0].trigger('click')
        expect(dom.text()).toBe(changeDate(month, year, 0, -1, 'zh'))

        // prev month
        await prev[1].trigger('click')
        expect(dom.text()).toBe(changeDate(month, year, -1, -1, 'zh'))

        const next = wrapper.findAll('.header-next')
        // next month
        await next[0].trigger('click')
        expect(dom.text()).toBe(changeDate(month, year, 0, -1, 'zh'))

        month = date.getMonth()
        year = date.getFullYear()
        // next year
        await next[1].trigger('click')
        expect(dom.text()).toBe(changeDate(month, year, 0, 0, 'zh'))
    })

    it('should back to today', async () => {
        const wrapper = mount(calendar, {
            props: {
                headerMode: 'today-between',
                size: 'large',
                lang: 'en'
            }
        })

        const month = date.getMonth()
        const year = date.getFullYear()

        const today = `${engMonth[month + 1]} ${year}`

        const dom = wrapper.find('.header-date--large')
        expect(dom.text()).toBe(today)

        const prev = wrapper.find('.header-prev')
        // prev month
        await prev.trigger('click')
        expect(dom.text()).toBe(changeDate(month, year, -1, 0, 'en'))

        const back = wrapper.find('.header-today')
        await back.trigger('click')
        expect(dom.text()).toBe(today)
    })
})
