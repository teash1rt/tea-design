import { PropType } from 'vue'
import type { TooltipTheme } from './constants'
import { isString } from '../../../../common/checks'

const TooltipProps = {
    message: {
        type: String,
        default: null,
        validator(value: string) {
            return isString(value)
        }
    },
    theme: {
        type: String as PropType<TooltipTheme>,
        default: (): TooltipTheme => 'dark',
        validator(value: TooltipTheme) {
            return (['dark', 'light', 'grey'] as const).includes(value)
        }
    }
}

export { TooltipProps }
