import { PropType } from 'vue'
import type { CalendarHeatMapTheme } from './constants'
import { verifyDateString } from './utils'
import { isNumber, isInteger, isString, isPlainObject } from '../../../../common/checks'
import { throwError } from '../../../../common/errors'

const CalendarHeatMapProps = {
    theme: {
        type: String as PropType<CalendarHeatMapTheme>,
        default: (): CalendarHeatMapTheme => 'tea',
        validator(value: CalendarHeatMapTheme) {
            return (['tea', 'info', 'wine'] as const).includes(value)
        }
    },
    col: {
        type: Number,
        default: 40,
        validator(value: number) {
            if (!isInteger(value) || value < 0) {
                throwError('calendar-heatmap -> col', '列数应为正整数')
            }
            return true
        }
    },
    mapData: {
        type: Object as PropType<{ [key: string]: number }>,
        default: {},
        validator(value: { [key: string]: number }) {
            const entries = Object.entries(value)
            for (const [key, val] of entries) {
                if (!(isString(key) && isNumber(val) && verifyDateString(key))) {
                    throwError(
                        'calendar-heatmap -> mapData',
                        "确保数据类型为{ [key: string]: number }，且string应为'YYYY-MM-DD'的格式"
                    )
                }
            }
            return true
        }
    },
    thresholds: {
        type: Array<number>,
        default: [1, 3, 5, 7],
        validator(value: number[]) {
            if (!(value.length === 4 && value.every((val, idx) => isNumber(val) && (idx === 0 || val > value[idx - 1])))) {
                throwError('calendar-heatmap -> thresholds', '应为长度为4且递增的数组')
            }
            return true
        }
    },
    title: {
        type: String,
        default: null,
        validator(value: string) {
            return isString(value)
        }
    },
    tipInfo: {
        type: String,
        default: null,
        validator(value: string) {
            return isString(value)
        }
    }
}

const CalendarHeatMapEmits = {
    hover: (value: object) => isPlainObject(value),
    pick: (value: object) => isPlainObject(value)
}

const HeatMapTooltipProps = {
    tipInfo: {
        type: String,
        default: null
    },
    theme: {
        type: String,
        default: 'dark'
    }
}
export { CalendarHeatMapProps, CalendarHeatMapEmits, HeatMapTooltipProps }
