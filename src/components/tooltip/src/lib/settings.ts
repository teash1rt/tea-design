import { PropType } from 'vue'
import { isString } from '../../../../common/checks'
import type { TooltipTheme, TooltipPlacement } from './constants'

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
    },
    placement: {
        type: String as PropType<TooltipPlacement>,
        default: (): TooltipPlacement => 'top',
        validator(value: TooltipPlacement) {
            return (['top', 'bottom', 'right', 'left'] as const).includes(value)
        }
    }
}

export { TooltipProps }
