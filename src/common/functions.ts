import { useMouseInElement } from '@vueuse/core'
import type { MaybeElement } from '@vueuse/core'
import { isPlainObject } from './checks'

const useDark = (value?: boolean): boolean => {
    const el = document.querySelector('html')!
    if (value !== undefined) {
        value ? el.classList.add('dark') : el.classList.remove('dark')
    }
    return el.classList.contains('dark')
}

const merge = (target: Record<string, unknown>, source: Record<string, unknown>) => {
    const result = Object.assign({}, target)
    if (isPlainObject(target) && isPlainObject(source)) {
        Object.keys(source).forEach(key => {
            if (isPlainObject(source[key])) {
                key in target
                    ? (result[key] = merge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>))
                    : Object.assign(result, { [key]: source[key] })
            } else {
                Object.assign(result, { [key]: source[key] })
            }
        })
    }
    return result
}

const transparentColor = (color: string, opacity: number) => {
    if (color.startsWith('#') && color.length === 7) {
        const red = parseInt(color.slice(1, 3), 16)
        const green = parseInt(color.slice(3, 5), 16)
        const blue = parseInt(color.slice(5, 7), 16)
        return `rgba(${red}, ${green}, ${blue}, ${opacity})`
    } else if (color.startsWith('rgba')) {
        const rgbaValues = color.match(/\d+(\.\d+)?/g)
        if (rgbaValues?.length === 4) {
            const red = rgbaValues[0]
            const green = rgbaValues[1]
            const blue = rgbaValues[2]
            return `rgba(${red}, ${green}, ${blue}, ${opacity})`
        }
    } else if (color.startsWith('rgb')) {
        const rgbValues = color.match(/\d+/g)
        if (rgbValues?.length === 3) {
            const red = rgbValues[0]
            const green = rgbValues[1]
            const blue = rgbValues[2]
            return `rgba(${red}, ${green}, ${blue}, ${opacity})`
        }
    }
    return color
}

const getRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
    }
    return result
}

const useMouse = (element: Element | HTMLDivElement) => {
    return useMouseInElement(element as MaybeElement)
}

export { useDark, merge, transparentColor, getRandomId, useMouse }
