import { PropType } from 'vue'
import { isBoolean } from '../../../../common/checks'
import type { CalendarLang, CalendarSize, CalendarHeaderMode, CalendarTheme } from './constants'

const CalendarProps = {
    mondayFirst: {
        type: Boolean,
        default: false,
        validator(value: boolean) {
            return isBoolean(value)
        }
    },
    lang: {
        type: String as PropType<CalendarLang>,
        default: (): CalendarLang => 'zh',
        validator(value: CalendarLang) {
            return (['zh', 'en'] as const).includes(value)
        }
    },
    size: {
        type: String as PropType<CalendarSize>,
        default: (): CalendarSize => 'medium',
        validator(value: CalendarSize) {
            return (['large', 'medium', 'small', 'mini'] as const).includes(value)
        }
    },
    theme: {
        type: String as PropType<CalendarTheme>,
        default: (): CalendarTheme => 'tea',
        validator(value: CalendarTheme) {
            return (['tea', 'info', 'wine'] as const).includes(value)
        }
    },
    headerMode: {
        type: String as PropType<CalendarHeaderMode>,
        default: (): CalendarHeaderMode => 'today-between',
        validator(value: CalendarHeaderMode) {
            return (['today-between', 'month-center', 'year-month-center', 'simple-center'] as const).includes(value)
        }
    }
}

export { CalendarProps }
