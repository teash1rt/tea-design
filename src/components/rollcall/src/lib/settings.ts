import { PropType } from 'vue'
import type { rollMethod, selectMethod } from './constants'
import { isArray, isNumber, isString, isBoolean } from '../../../../common/checks'

const RollcallProps = {
    rollMethod: {
        type: String as PropType<rollMethod>,
        default: (): rollMethod => 'byClick',
        validator(value: rollMethod) {
            return (['byClick', 'byCountDown'] as const).includes(value)
        }
    },
    selectMethod: {
        type: String as PropType<selectMethod>,
        default: (): selectMethod => 'normal',
        validator(value: selectMethod) {
            return (['normal', 'unique'] as const).includes(value)
        }
    },
    data: {
        type: Array<number | string>,
        default: [],
        validator(value: []) {
            return isArray(value)
        }
    },
    duration: {
        type: Number,
        default: 2.5,
        validator(value: number) {
            return isNumber(value)
        }
    },
    startText: {
        type: String,
        default: null,
        validator(value: string) {
            return isString(value)
        }
    },
    noDataText: {
        type: String,
        default: '暂无内容',
        validator(value: string) {
            return isString(value)
        }
    },
    withoutFooter: {
        type: Boolean,
        default: false,
        validator(value: boolean) {
            return isBoolean(value)
        }
    }
}

export { RollcallProps }
