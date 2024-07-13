import { PropType, InjectionKey, Ref } from 'vue'
import { isNumber } from '../../../../common/checks'
import type { FloatButtonAnimation } from './constants'

const FloatButtonProps = {
    animation: {
        type: String as PropType<FloatButtonAnimation>,
        default: (): FloatButtonAnimation => 'none',
        validator(value: FloatButtonAnimation) {
            return (['origin', 'edge', 'none'] as const).includes(value)
        }
    },
    bottom: {
        type: Number,
        default: 80,
        validator(value: number) {
            return isNumber(value)
        }
    },
    right: {
        type: Number,
        default: 60,
        validator(value: number) {
            return isNumber(value)
        }
    },
    gap: {
        type: Number,
        default: 45,
        validator(value: number) {
            return isNumber(value)
        }
    }
}

type FloatButtonContext = {
    floatVisible: Ref<boolean>
    animation: FloatButtonAnimation
    gap: number
}

const FloatButtonContextKey: InjectionKey<FloatButtonContext> = Symbol('FloatButtonContextKey')

export { FloatButtonProps, FloatButtonContextKey }

export type { FloatButtonContext }
