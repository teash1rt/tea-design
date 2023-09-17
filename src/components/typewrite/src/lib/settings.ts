import { PropType } from 'vue'
import type { comboMethod } from './constants'
import { isPlainObject, isString, isArray } from '../../../../common/checks'
import type { DeepRequired } from '../../../../common/generics'
import { merge } from '../../../../common/functions'
import { throwError } from '../../../../common/errors'

const TypewriteProps = {
    context: {
        type: Object as PropType<TypewriteContext>,
        default: (): TypewriteInfoRequired => defaultContext,
        validator: (value: TypewriteContext) => {
            const defaultContextCopy = JSON.parse(JSON.stringify(defaultContext))
            const mergeContext = merge(defaultContextCopy, value) as TypewriteInfoRequired
            if (!isPlainObject(mergeContext) || !mergeContext.ignoreList.every(e => isString(e))) {
                return false
            }

            if (!isArray(mergeContext.opacity) || (mergeContext.opacity as number[]).length !== 2) {
                throwError('typewrite -> opacity', '透明度应为长度为2的数组')
            }
            return true
        }
    }
}

type TypewriteContext = {
    keyboardMap?: { [key: string]: string }
    ignoreList?: string[]
    duration?: number
    interval?: number
    fontColor?: string
    backgroundColor?: string
    fontSize?: number
    bottom?: number
    right?: number
    combo?: comboMethod
    opacity?: number[]
}

type TypewriteInfoRequired = DeepRequired<TypewriteContext>

const defaultContext: TypewriteInfoRequired = {
    keyboardMap: {
        Control: 'ctrl',
        Meta: 'win',
        ArrowUp: '↑',
        ArrowDown: '↓',
        ArrowLeft: '←',
        ArrowRight: '→',
        Escape: 'esc',
        Shift: '⇧',
        Enter: '⏎ ',
        Backspace: '⌫',
        ' ': '⎵'
    },
    ignoreList: [],
    duration: 3,
    interval: 0.5,
    fontColor: '#ffffff',
    backgroundColor: '#000000',
    fontSize: 2,
    bottom: 180,
    right: 180,
    combo: 'multiple',
    opacity: [1, 1]
}

export { TypewriteProps, defaultContext }

export type { TypewriteContext, TypewriteInfoRequired }
